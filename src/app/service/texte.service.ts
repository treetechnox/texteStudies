import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Texte} from '../Texte';

@Injectable({
  providedIn: 'root'
})
export class TexteService {

  url:string;
  url1:string;
  constructor(private http:HttpClient) {
    this.url='http://localhost:8083/textes/';
    this.url1='http://localhost:8083/mouvements/';
  }

  getAllTextes():Observable<any[]>{
    console.log(this.url);
    // @ts-ignore
    return this.http.get(this.url);
  }

  getAllTextesLikeSommaire(keyword:string):Observable<any[]>{
    console.log(`${this.url}filterSommaire/${keyword}`);
    // @ts-ignore
    return this.http.get(`${this.url}filterSommaire/${keyword}`);
  }

  getAllTextesByPages(page:number, size:number):Observable<any[]>{
    const request:string = (page!== undefined && size!== undefined)
      ? `?page=${page}&size=${size}`
      : ``;
    console.log(`${this.url}all${request}`);
    // @ts-ignore
    return this.http.get(`${this.url}all${request}`);
  }

  getAllTextesByUrl(url:string):Observable<any[]>{
    console.log(url);
    // @ts-ignore
    return this.http.get(url);
  }

  getAllTextesByMinistere(ministere:number):Observable<any[]>{
    console.log(`${this.url1}mimo/${ministere}/textes`);
    // @ts-ignore
    return this.http.get(`${this.url1}mimo/${ministere}/textes`);
  }
  getAllTextesBySecteur(secteurId:number):Observable<any[]>{
    console.log(`${this.url1}sect/${secteurId}/textes`);
    // @ts-ignore
    return this.http.get(`${this.url1}sect/${secteurId}/textes`);
  }

  getTexteById(id: any):Observable<any>{
    return this.http.get(`${this.url}${id}`);
  }

  saveTexte(texte:Texte):Observable<any>{
    console.log(`${this.url}texte`,texte);
    return this.http.post(`${this.url}texte`,texte);
  }
  updateTexte(texteId:number,texte:any):Observable<any>{
    //console.log(`${this.url1}/secteur/${secteurId}`,secteur)
    console.log(`${this.url}texte/${texteId}`,texte);
    return this.http.put(`${this.url}texte/${texteId}`,texte);
  }

  getTexteBySommaireArFr(nomfr: string, prenomfr: string):Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getTexteByMouvementId(mouvementId:any):Observable<any>{
    console.log(`${this.url}mouvement/${mouvementId}`);
    return this.http.get(`${this.url}mouvement/${mouvementId}`)
  }

  removeTexte(id:number):Observable<any>{
    return this.http.delete(`${this.url}texte/${id}`);
  }
}
