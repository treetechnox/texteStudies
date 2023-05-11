import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Secteur} from '../Secteur';

@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  url:string;
  url2:string;
  //url1:string;
  constructor(private http:HttpClient) {
    this.url = "http://localhost:8083/secteurs/";
    this.url2 = "http://localhost:8083/";
    //this.url1 = "http://localhost:8083/secteur";
  }

  getAllSecteurs():Observable<any[]>{
    console.log(this.url);
    // @ts-ignore
    return this.http.get(this.url);
  }
  getAllUsersBySecteurs(secterurId:any):Observable<any[]>{
    console.log(`${this.url2}utilisateurs/secteur/${secterurId}`);
    // @ts-ignore
    return this.http.get(`${this.url2}utilisateurs/secteur/${secterurId}`);///
  }

  ///topDesc/mouvement_secteur/{texteId}
  getSecteurByLastMouvement(texteId:number):Observable<any>{
    console.log(`${this.url}topDesc/mouvement_secteur/${texteId}`);
    return this.http.get(`${this.url}topDesc/mouvement_secteur/${texteId}`);
  }

  getSecteurById(id: any):Observable<any>{
    return this.http.get(`${this.url}${id}`);
  }

  saveSecteur(secteur:any):Observable<any>{
    return this.http.post(`${this.url}secteur`,secteur);
  }
  updateSecteur(secteurId:number,secteur:any):Observable<any>{
    console.log(`${this.url}secteur/${secteurId}`,secteur)
    return this.http.put(`${this.url}secteur/${secteurId}`,secteur);
  }
}
