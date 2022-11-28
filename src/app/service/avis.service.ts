import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Avis} from "../Avis";

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  url!:string;
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:8083/aviss/';
  }

  getAvisByTexte(texteId:number):Observable<any>{
    return this.http.get(`${this.url}texte/${texteId}`);
  }

  saveAvis(texteId:number, avis:Avis):Observable<any>{
    return this.http.post(`${this.url}avis/${texteId}`,avis);
  }

  public getPDF(avisId:number): Observable<Blob> {
//const options = { responseType: 'blob' }; there is no use of this
    let uri = `${this.url}getpdf/${avisId}`;
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.http.get(uri, { responseType: 'blob' });
  }

  uploadPdfScanService(file: File, idMouvement: any) : Observable<HttpEvent<{}>>{
    let formData : FormData = new FormData();
    formData.append('file',file);
    console.log(this.url+'uploadPdfScan/'+idMouvement);
    const req = new HttpRequest('POST', this.url+'uploadPdfScan/'+idMouvement, formData,{
      reportProgress:true,
      responseType:'text'
    });
    return this.http.request(req);
  }
}
