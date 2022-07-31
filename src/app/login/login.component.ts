import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {User} from '../user';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  isLoading: boolean | undefined;
  message_erreur:undefined | boolean=true;
  hide = true;

  constructor(public authenticationService: AuthenticationService, private router:Router,
              public app: AppComponent) { }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated) {
      this.router.navigate(['/lesprojets']);
    }
    /*// @ts-ignore
    this.userService.getAllUsers().subscribe(value => {
      // @ts-ignore
      this.users = value;
      console.log('utilisateur ::: ' + value[0]);
    });*/
    //console.log('Voir si active ... ' + this.authenticationService.isAuthenticated);
  }

  onLogin() {
    this.isLoading = true;
    setTimeout( () => {
      this.isLoading = false;
      this.authenticationService
        .login(this.user.username, this.user.password);

    }, 400 );
    console.log(this.authenticationService.isAuthenticated);
    this.message_erreur= this.authenticationService.isAuthenticated;
  }

}
