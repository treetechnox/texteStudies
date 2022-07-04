import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string;
  /*
    private url1: string;
  */

  constructor(private http: HttpClient) {
    this.url = 'http://172.16.90.1:8083/utilisateurs/';
    /*this.url1 = 'http://172.16.90.1:8083/utilisateur';*/
  }

  getAllUsers(): Observable<any> {
    console.log(`${this.url}`);
    return this.http.get(`${this.url}`);
  }

  getUsersList(currentPage: number, size: number): Observable<any> {
    //console.log(`${this.url}`);
    return this.http.get(`${this.url}?page=${currentPage}&size=${size}`);
  }


  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.url}${userId}`);
  }

  public saveUser(user: User): Observable<any> {
    return this.http.post(`${this.url}utilisateur`, user);
  }

  public updateUser(id: number, user: User): Observable<any> {
    /*console.log('From service side : ');
    */console.log(id,user);
    return this.http.put(`${this.url}utilisateur/${id}`, user);
  }

  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.url}utilisateur/${userId}`, { responseType: 'text' });
  }

  getSearchUsersList(username: string, page: number, size: number): Observable<any> {
    // @ts-ignore
    //console.log(`${this.url}/search/orCheck?username=${username}&page=${page}&size=${size}`);
    return this.http.get(`${this.url}/search/orCheck?username=${username}&page=${page}&size=${size}`);
  }

}
