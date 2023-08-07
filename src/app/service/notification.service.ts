import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/internal/Observable';
import {Notification} from "../notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url:string;
  //url1:string;
  constructor(private http:HttpClient) {
    this.url = "http://localhost:8083/notifications/";
    //this.url1 = "http://localhost:8083/phase/";
  }
  getAllNotifications():Observable<Notification[]>{
    // @ts-ignore
    return this.http.get(`${this.url}`);
  }

  getAllNotificationsByUser():Observable<Notification[]>{
    // @ts-ignore
    return this.http.get(`${this.url}`)
  }

  getNotificationByRecipientId(recipientId:any):Observable<any>{
    console.log(`${this.url}topuser/${recipientId}`);
    return this.http.get(`${this.url}topuser/${recipientId}`);
  }

  saveNotification(rid: number, sid: number | undefined, notification: Notification):Observable<any>{
    console.log(rid, sid, notification);
    return this.http.post(`${this.url}${rid}/${sid}`,notification);
  }


}
// getPhaseByLibellefr(libellefr: string): Observable<any> {
//   // @ts-ignore
//   //console.log(`${this.url11}/search/verifierFct?libellefr=${libellefr}`);
//   // @ts-ignore
//   return this.http.get(`${this.url}search/verifierPhase?libellefr=${libellefr}`);
// }
//
//
// getAllPhases():Observable<Phase[]>{
//   console.log(this.url);
//   // @ts-ignore
//   return this.http.get(`${this.url}all`);
// }
//
// getAllPhasesWithoutParent():Observable<Phase[]>{
//   // @ts-ignore
//   return this.http.get(`${this.url}all_with_no_parent`);
// }
//
// getAllPhasesWithParent(parent_id:number):Observable<Phase[]>{
//   //@ts-ignore
//   return this.http.get(`${this.url}parent/${parent_id}`);
// }
//
// getAllPhasesEnCours():Observable<Phase[]>{
//   console.log(`${this.url}encours`);
//   // @ts-ignore
//   return this.http.get(`${this.url}encours`);
// }
// getPhaseById(id: any):Observable<any>{
//   return this.http.get(`${this.url}${id}`);
// }
//
// savePhase(phase:any):Observable<any>{
//   console.log(`${this.url}phase`,phase);
//   return this.http.post(`${this.url}phase`,phase);
// }
// updatePhase(phaseId:number,phase:any):Observable<any>{
//   //console.log(`${this.url1}/secteur/${secteurId}`,secteur)
//   return this.http.put(`${this.url}phase/${phaseId}`,phase);
// }
