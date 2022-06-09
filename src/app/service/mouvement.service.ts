import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Mouvement} from '../Mouvement';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {

  url:string;url1:string;
  url2:string;

  constructor(private http:HttpClient) {
    this.url='http://localhost:8083/mouvements/';
    this.url1='http://localhost:8083/mouvements';
    this.url2='http://localhost:8083/mouvements_ministeres/';
  }

  getAllMouvements():Observable<any[]>{
    console.log(this.url);
    // @ts-ignore
    return this.http.get(this.url);
  }

  getMouvementById(id: any):Observable<any>{
    return this.http.get(`${this.url}mouvement/${id}`);
  }

  getAllMouvementsByMinistere(ministere:string):Observable<any[]>{
    console.log(`${this.url}mimo/${ministere}`);
    // @ts-ignore
    return this.http.get(`${this.url1}mimo/${ministere}`);
  }

  /*GET ALL MINISTERES BY THE FIRST MOUVEMENT OF THE PROJECT TEXTE */
  getTopMouvementByTexteId(texteId:number):Observable<any>{
    console.log(`${texteId}`);
    console.log(`${this.url}top/mouvement/${texteId}`);
    return this.http.get(`${this.url}top/mouvement/${texteId}/`);
  }

  getTopMouvementByTexteIdDesc(texteId:number):Observable<any>{
    console.log(`${texteId}`);
    console.log(`${this.url}topDesc/mouvement/${texteId}`);
    return this.http.get(`${this.url}topDesc/mouvement/${texteId}/`);
  }

  getMouvementByTexteId(id: any):Observable<any>{
    console.log(`${this.url}texte/${id}`);
    return this.http.get(`${this.url}texte/${id}`);
  }

  saveMouvement(texteTd:number,mouvement:Mouvement):Observable<any>{
    console.log(`${this.url}textes/${texteTd}`,mouvement);
    return this.http.post(`${this.url}textes/${texteTd}`,mouvement);
  }

// /active_mouvement/{id}
  updateMouvementIsActive(mouvementId:number,mouvement:any):Observable<any>{
    return this.http.put(`${this.url}active_mouvement/${mouvementId}`,mouvement);
  }

  updateMouvement(mouvementId:number,mouvement:any):Observable<any>{
    //console.log(`${this.url1}/secteur/${secteurId}`,secteur)
    return this.http.put(`${this.url}mouvement/${mouvementId}`,mouvement);
  }

  getRelationBetweenMouvementMinistere(mouvementId:number,ministereId:number):Observable<any>{
    ///relation/mouvement/{mouvementId}/ministere/{ministereId}
    console.log(`${this.url2}relation/mouvement/${mouvementId}/ministere/${ministereId}`);
    return this.http.get(`${this.url2}relation/mouvement/${mouvementId}/ministere/${ministereId}`);
  }

  //mouvement/{mouvementId}/ministere/{ministereId}
  saveMouvementMinistere(mouvementId:number,ministereId:number):Observable<any>{
    console.log(`${this.url2}mouvement/${mouvementId}/ministere/${ministereId}`);
    return this.http.get(`${this.url2}mouvement/${mouvementId}/ministere/${ministereId}`,
      {responseType: 'text'});
  }

  /*getTexteBySommaireArFr(nomfr: string, prenomfr: string):Observable<any> {
    return this.http.get(`${this.url}`);
  }*/
  getFilter(phaseId: number, secteurId: number | undefined, ministereId: number):Observable<any> {
    let sub_url = '?';
    if(phaseId>0)
      sub_url+=`&phase=${phaseId}`;
    // @ts-ignore
    if(secteurId>0)
      sub_url+=`&secteur=${secteurId}`;
    if(ministereId>0)
      sub_url+=`&mouvementMinisteres.ministere=${ministereId}`;
    console.log(`${this.url1}${sub_url}`);

    return this.http.get(`${this.url1}${sub_url}`);
  }
}
