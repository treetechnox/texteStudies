import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Phase} from '../phase';

@Injectable({
  providedIn: 'root'
})
export class NatureService {
  url:string;
  //url1:string;
  constructor(private http:HttpClient) {
    this.url = "http://localhost:8083/natures/";
  }

  getPhaseByLibellefr(libellefr: string): Observable<any> {
    // @ts-ignore
    //console.log(`${this.url11}/search/verifierFct?libellefr=${libellefr}`);
    // @ts-ignore
    return this.http.get(`${this.url}search/verifierNature?libellefr=${libellefr}`);
  }

  getAllNatures():Observable<any[]>{
    console.log(this.url);
    // @ts-ignore
    return this.http.get(this.url);
  }

  getNatureById(id: any):Observable<any>{
    return this.http.get(`${this.url}nature/${id}`);
  }

  saveNature(nature:any):Observable<any>{
    console.log(`${this.url}nature`,nature);
    return this.http.post(`${this.url}nature`,nature);
  }
  updateNature(natureId:number,nature:any):Observable<any>{
    //console.log(`${this.url1}/secteur/${secteurId}`,secteur)
    return this.http.put(`${this.url}nature/${natureId}`,nature);
  }
}
