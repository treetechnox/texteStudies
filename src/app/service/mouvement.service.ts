import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Mouvement} from '../Mouvement';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {

  url:string;url1:string;
  url2:string;

  constructor(private http:HttpClient) {
    this.url='http://172.16.90.1:8083/mouvements/';
    this.url1='http://172.16.90.1:8083/mouvements';
    this.url2='http://172.16.90.1:8083/mouvements_ministeres/';
  }

  getAllMouvements():Observable<any[]>{
    console.log(this.url);
    // @ts-ignore
    return this.http.get(this.url);
  }

  getMouvementById(id: any):Observable<any>{
    return this.http.get(`${this.url}${id}`);
  }

  getAllMouvementsByMinistere(ministere:string):Observable<any[]>{
    console.log(`${this.url}mimo/${ministere}`);
    // @ts-ignore
    return this.http.get(`${this.url1}mimo/${ministere}`);
  }

  /*GET ALL MINISTERES BY THE FIRST MOUVEMENT OF THE PROJECT TEXTE */
  getTopMouvementByTexteId(texteId:number):Observable<any>{
    console.log(`${texteId}`);
    console.log(`${this.url}top/mouvement/${texteId}`);
    return this.http.get(`${this.url}top/mouvement/${texteId}/`);
  }

  getTopMouvementByTexteIdDesc(texteId:number):Observable<any>{
    console.log(`${texteId}`);
    console.log(`${this.url}topDesc/mouvement/${texteId}`);
    return this.http.get(`${this.url}topDesc/mouvement/${texteId}/`);
  }

  getMouvementByTexteId(id: any):Observable<any>{
    console.log(`${this.url}texte/${id}`);
    return this.http.get(`${this.url}texte/${id}`);
  }

  saveMouvement(texteTd:number,mouvement:Mouvement):Observable<any>{
    console.log(`${this.url}textes/${texteTd}`,mouvement);
    return this.http.post(`${this.url}textes/${texteTd}`,mouvement);
  }

// /active_mouvement/{id}
  updateMouvementIsActive(mouvementId:number,mouvement:any):Observable<any>{
    return this.http.put(`${this.url}active_mouvement/${mouvementId}`,mouvement);
  }

  updateMouvement(mouvementId:number,mouvement:any):Observable<any>{
    //console.log(`${this.url1}/secteur/${secteurId}`,secteur)
    return this.http.put(`${this.url}mouvement/${mouvementId}`,mouvement);
  }

  getRelationBetweenMouvementMinistere(mouvementId:number,ministereId:number):Observable<any>{
    ///relation/mouvement/{mouvementId}/ministere/{ministereId}
    console.log(`${this.url2}relation/mouvement/${mouvementId}/ministere/${ministereId}`);
    return this.http.get(`${this.url2}relation/mouvement/${mouvementId}/ministere/${ministereId}`);
  }

  //mouvement/{mouvementId}/ministere/{ministereId}
  saveMouvementMinistere(mouvementId:number,ministereId:number):Observable<any>{
    console.log(`${this.url2}mouvement/${mouvementId}/ministere/${ministereId}`);
    return this.http.get(`${this.url2}mouvement/${mouvementId}/ministere/${ministereId}`,
      {responseType: 'text'});
  }

  /*getTexteBySommaireArFr(nomfr: string, prenomfr: string):Observable<any> {
    return this.http.get(`${this.url}`);
  }*/
  getFilter(phaseId: number,natureId: number, secteurId: number | undefined, ministereId: number,isactive:boolean,
            dateFrom:string,dateTo:string, totalelt:number):Observable<any> {
    console.log('phaseId:'+phaseId,'natureId:'+natureId,'secteurId:'+secteurId,
      'ministereId:'+ministereId,'isactive:'+isactive,'dateFrom:'+dateFrom,'dateTo:'+dateTo);
    let sub_url = '?';
    if(phaseId>0)
      sub_url+=`&phase=${phaseId}`;
    if(natureId>0)
      sub_url+=`&texte.nature.id=${natureId}`;
    // @ts-ignore
    if(secteurId>0)
      sub_url+=`&secteur=${secteurId}`;
    if(ministereId>0)
      sub_url+=`&mouvementMinisteres.ministere=${ministereId}`;
    if(isactive===true)
      sub_url+=`&isactive=${isactive}`
    else if (isactive===false)
      sub_url+=`&isactive=${isactive}`;
    if (dateFrom!=='')
      sub_url+=`&datePhase=${dateFrom}`;
    if (dateTo!=='')
      sub_url+=`&datePhase=${dateTo}`;

    sub_url+='&sort=id,desc&size='+totalelt;
    console.log(`${this.url1}${sub_url}`);

    return this.http.get(`${this.url1}${sub_url}`);
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


  public getPDF(mouvementId:number): Observable<Blob> {
//const options = { responseType: 'blob' }; there is no use of this
    let uri = `${this.url}getpdf/${mouvementId}`;
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.http.get(uri, { responseType: 'blob' });
  }


}
