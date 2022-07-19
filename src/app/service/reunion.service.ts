import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  url:string;
  //url1:string;
  constructor(private http:HttpClient) {
    this.url = "http://172.16.90.1:8083/reunions/";
    //this.url1 = "http://172.16.90.1:8083/reunion";
  }

  getAllReunions():Observable<any[]>{
    console.log(this.url);
    // @ts-ignore
    return this.http.get(this.url);
  }

  getReunionById(id:any):Observable<any>{
    return this.http.get(`${this.url}reunion/${id}`);
  }

  saveReunion(reunion:any):Observable<any>{
    return this.http.post(`${this.url}reunion`,reunion);
  }
  updateReunion(reunionId:number,reunion:any):Observable<any>{
    //console.log(`${this.url1}/reunion/${reunionId}`,reunion)
    return this.http.put(`${this.url}reunion/${reunionId}`,reunion);
  }
}
