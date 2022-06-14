import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  url!:string;
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:8083/aviss/';
  }

  getAvisByTexte(texteId:number):Observable<any>{
    return this.http.get(`${this.url}${texteId}`);
  }

}
