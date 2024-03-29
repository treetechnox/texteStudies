import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TracesService {

  url:string;
  constructor(private http:HttpClient) {
    this.url = "http://localhost:8083/traces"
  }

  getAlltraces():Observable<any>{
    return this.http.get(`${this.url}`);
  }
}
