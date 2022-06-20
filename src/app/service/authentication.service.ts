import { Injectable } from '@angular/core';
import {User} from '../user';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /*private users=[
    {username:"admin",password:"1234",role:"ADMIN"},
    {username:"user1",password:"1234",role:"USER"},
    {username:"user2",password:"1234",role:"USER"}
  ];*/

  public users : User[] | undefined ;

  public isAuthenticated: boolean | undefined;
  public userAuthenticated!: User | undefined ;
  public token:any;

  constructor(private userService: UserService, private router: Router) { }

  /*getAllUsers() {
    this.userService.getAllUsers().subscribe(value => {
      console.log(value[0].username + ' - ' +value[0].password);
      // @ts-ignore
      this.users = value;
      console.log(this.users)
    });

  }*/

  public login(username:string, password:string){
    console.log(username,password);
    // this.getAllUsers();
    this.userService.getAllUsers().subscribe(value => {
      console.log(value);
      // @ts-ignore
      this.users = value;
      /*console.log('this.users : ');
      console.log(this.users);*/
      // @ts-ignore
      this.users.forEach(u=>{
        //console.log(u)
        if(u.username===username && u.password===password){
          this.userAuthenticated = u;
          //console.log('authenticated user is : ');
          //console.log(this.userAuthenticated);
          if(this.userAuthenticated !== undefined){
            this.isAuthenticated=true;
            this.token =btoa(unescape(encodeURIComponent(JSON.stringify(
              this.userAuthenticated))));
            sessionStorage.setItem('authToken',this.token);
            if (this.isAuthenticated) {
              this.router.navigateByUrl('/lesprojets');
            }
            //localStorage.setItem("authUser",btoa(JSON.stringify(this.userAuthenticated)));
          }else{
            this.isAuthenticated=false;
            this.userAuthenticated = undefined
          }
        }
      });
    });
  }

  isAdmin () {
    //console.log('current user ' + this.userAuthenticated.role);
    if(this.userAuthenticated){
      if (this.userAuthenticated.role!==null)
        return this.userAuthenticated.role.indexOf('ADMIN')>-1;
      //return true;
    }
    return false;
  }
  isMinistereUser () {
    //console.log('current user ' + this.userAuthenticated.role);
    if(this.userAuthenticated){
      if (this.userAuthenticated.role!==null)
        /*console.log(this.userAuthenticated.role);*/
        return this.userAuthenticated.role.indexOf('MINISTERE')>-1;
      //return true;
    }
    return false;
  }

  getUserSalleByHisSecteur(){
    //this.userService.getUserById(this.userAuthenticated.id)
    // @ts-ignore
    return this.userAuthenticated.secteur.libelleFr
  }

  saveAuthenticatedUser () {
    //console.log(this.token);
    if (this.userAuthenticated) {
      sessionStorage.setItem('authToken',this.token);
    }
  }

  loadAuthenticatedUserFromLocalStorage() {
    let t = sessionStorage.getItem('authToken');
    if (t) {
      let user = JSON.parse(atob(t));
      this.userAuthenticated = {
        id:user.id ,
        nom: user.nom,
        prenom: user.prenom,
        username:user.username,
        password:user.password,
        role:user.role,
        secteur: user.secteur
      };
      this.isAuthenticated = true;
      this.token = t;
    }
  }

  removeAuthenticatedUserFromLocalStorage() {
    sessionStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.token = null;
    // @ts-ignore
    this.userAuthenticated = null;
  }

}
