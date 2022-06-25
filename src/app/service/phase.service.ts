import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Secteur} from '../Secteur';
import {Phase} from '../phase';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  url:string;
  //url1:string;
  constructor(private http:HttpClient) {
    this.url = "http://localhost:8083/phases/";
    //this.url1 = "http://localhost:8083/phase/";
  }

  getPhaseByLibellefr(libellefr: string): Observable<any> {
    // @ts-ignore
    //console.log(`${this.url11}/search/verifierFct?libellefr=${libellefr}`);
    // @ts-ignore
    return this.http.get(`${this.url}search/verifierPhase?libellefr=${libellefr}`);
  }

  getAllPhases():Observable<Phase[]>{
    console.log(this.url);
    // @ts-ignore
    return this.http.get(`${this.url}all`);
  }

  getPhaseById(id: any):Observable<any>{
    return this.http.get(`${this.url}${id}`);
  }

  savePhase(phase:any):Observable<any>{
    console.log(`${this.url}phase`,phase);
    return this.http.post(`${this.url}phase`,phase);
  }
  updatePhase(phaseId:number,phase:any):Observable<any>{
    //console.log(`${this.url1}/secteur/${secteurId}`,secteur)
    return this.http.put(`${this.url}phase/${phaseId}`,phase);
  }
}
