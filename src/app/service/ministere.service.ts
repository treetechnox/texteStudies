import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Ministere} from '../Ministere';

@Injectable({
  providedIn: 'root'
})
export class MinistereService {

  url:string;
  url1:string;
  constructor(private http:HttpClient) {
    this.url = "http://localhost:8083/ministeres/";
    this.url1 = "http://localhost:8083/mouvements_ministeres/";
  }

  getAllMinisteres():Observable<any[]>{
    console.log(this.url);
    // @ts-ignore
    return this.http.get(this.url);
  }

  /*GET ALL MINISTERES BY THE FIRST MOUVEMENT OF THE PROJECT TEXTE */
  getAllMinistereByTopMouvementAndByTexteId(texteId:number):Observable<any>{
    return this.http.get(`${this.url}top/texte/${texteId}`);
  }

  /*GET ALL MINISTERES BY THE FIRST MOUVEMENT OF THE PROJECT TEXTE */
  getAllMouvementMinistereByTopMouvementAndByTexteId(texteId:number):Observable<any>{
    return this.http.get(`${this.url1}texte/${texteId}`);
  }

  getAllMinisteresByMouvemet():Observable<[Ministere]>{
    // @ts-ignore
    return this.http.get(this.url);
  }

  getMinistereById(id: any):Observable<any>{
    return this.http.get(`${this.url}ministere/${id}`);
  }

  saveMinistere(ministere:any):Observable<any>{
    return this.http.post(`${this.url}ministere`,ministere);
  }
  updateMinistere(ministereId:number,ministere:any):Observable<any>{
    //console.log(`${this.url1}/secteur/${secteurId}`,secteur)
    return this.http.put(`${this.url}ministere/${ministereId}`,ministere);
  }
}
