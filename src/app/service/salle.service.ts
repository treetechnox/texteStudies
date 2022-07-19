import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Salle} from '../salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  url:string;

  constructor(private http:HttpClient) {
    this.url = "http://172.16.90.1:8083/";
  }

  getSalles():Observable<any>{
    return this.http.get(`${this.url}les_salles`);
  }

  getAllSalleFilteredByLibelle(libelle:string):Observable<any>{
    return this.http.get(`${this.url}filteredSalle/${libelle}`);
  }

  getSalleById(salleId:number):Observable<any>{
    return this.http.get(`${this.url}salle/${salleId}`)
  }

  saveSalle(salle:Salle): Observable<any>{
    // @ts-ignore
    return this.http.post(`${this.url}ajoutsalle`,salle);
  }

  updateSalle(salleId:number,salle:Salle): Observable<any>{
    //console.log(salleId,salle);
    return this.http.put(`${this.url}salle/${salleId}`,salle);
  }

}
