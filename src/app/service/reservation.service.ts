import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url_base: string;

  constructor(private http: HttpClient) {
    this.url_base = 'http://localhost:8083';
  }

  getResource(id: number): Observable<any> {

    //console.log( 'this is my url_base ....... ' + this.url_base + '/reservations/' + id);
    return this.http.get(`${this.url_base}/reservations/${id}`);
  }

  getReservationsList(page: number, size: number): Observable<any> {
    //console.log(`${this.url_base}/reservations?page=${page-1}&size=${size}`);
    // @ts-ignore
    return this.http.get(`${this.url_base}/reservations?page=${page}&size=${size}`);
  }

  getAllReservationsList(): Observable<any> {
    //console.log(`${this.url_base}/reservations`);
    // @ts-ignore
    return this.http.get(`${this.url_base}/reservations`);
  }

  getAllReservationsListAfterCurrentDay(): Observable<any> {
    //console.log(`${this.url_base}/reservationAfterCurrentDay`);
    ///reservationAfterCurrentDay
    // @ts-ignore
    return this.http.get(`${this.url_base}/reservationAfterCurrentDay`);
  }

  getAllReservationsListAfterCurrentDayNotDisabled(): Observable<any> {
    //console.log(`${this.url_base}/reservationAfterCurrentDayNotDisabled`);
    ///reservationAfterCurrentDay
    // @ts-ignore
    return this.http.get(`${this.url_base}/reservationAfterCurrentDayNotDisabled`);
  }

  getAllReservationsListByDate(date:any): Observable<any> {
    //console.log(`${this.url_base}/reservationByDate/${date}`);
    // @ts-ignore
    return this.http.get(`${this.url_base}/reservationByDate/${date}`);
  }

  getReservationsByUtilisateur(utilisateurId):Observable<any>{
    return this.http.get(`${this.url_base}/reservations/ByUtilisateur/${utilisateurId}`);
  }

  getReservationById(resId):Observable<any>{
    return this.http.get(`${this.url_base}/reservation/${resId}`)
  }

  saveReunion(reservation: Reservation): Observable<any>{
    //console.log(reservation.utilisateur.id,reservation.salle.id, reservation);
    return this.http.post(`${this.url_base}/reservations/utilisateur/${reservation.utilisateur.id}/salle/${reservation.salle.id}`,reservation);
  }

  updateReunion(reservationId, reservation: Reservation): Observable<any>{
    return this.http.put(`${this.url_base}/reservations/${reservationId}/modifierDisabledReservation`,reservation);
  }

  verifierDateBySalleAndPeriodeAndDisabled(salleId:number,periodeId:string,date:any,typeId:string):Observable<any>{
    ///reservations/salles/{salleId}/periode/{periodeId}/date/{date}/type/{typeId}
    return this.http.get(`${this.url_base}/reservations/salles/${salleId}/periode/${periodeId}/date/${date}/type/${typeId}`)
  }

  verifierIfDateWithTwoPeriodeNotDisabled(date:any):Observable<any>{
    return this.http.get(`http://localhost:8083/findByTwoPeriodes/${date}`)
  }

  getCountingByDate(date:any, salleId:number):Observable<any>{
    //console.log((`${this.url_base}/countingRows/date/${date}/salle/${salleId}`));
    return this.http.get(`${this.url_base}/countingRows/date/${date}/salle/${salleId}`)
  }




  //------------------------------------------------------Section textProjrct



  getAllTextesProjects():Observable<any>{
    console.log(`${this.url_base}/textes/`);
    return this.http.get(`${this.url_base}/textes/`);
  }


}
