import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Correspondance} from "../Correspondance";

@Injectable({
  providedIn: 'root'
})
export class CorrespondanceService {

  url!:string;
  constructor(private http:HttpClient) {
    this.url = 'http://172.16.90.1:8083/correspondances/';
  }

  getCorrespondanceByTexte(texteId:number):Observable<any>{
    return this.http.get(`${this.url}texte/${texteId}`);
  }

  saveCorrespondance(texteId:number, correspondance:Correspondance):Observable<any>{
    return this.http.post(`${this.url}correspondance/${texteId}`,correspondance);
  }

  public getPDF(correspondanceId:number): Observable<Blob> {
//const options = { responseType: 'blob' }; there is no use of this
    let uri = `${this.url}getpdf/${correspondanceId}`;
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.http.get(uri, { responseType: 'blob' });
  }

  uploadPdfScanService(file: File, idCorrespondance: any) : Observable<HttpEvent<{}>>{
    let formData : FormData = new FormData();
    formData.append('file',file);
    console.log(this.url+'uploadPdfScan/'+idCorrespondance);
    const req = new HttpRequest('POST', this.url+'uploadPdfScan/'+idCorrespondance, formData,{
      reportProgress:true,
      responseType:'text'
    });
    return this.http.request(req);
  }
}
