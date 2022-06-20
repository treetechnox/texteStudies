import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
// @ts-ignore
import {User} from '../user';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AppComponent} from '../app.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Secteur} from '../Secteur';
import {SecteurService} from '../service/secteur.service';
import {Ministere} from "../Ministere";
import {MinistereService} from "../service/ministere.service";
import {MatSelectChange} from "@angular/material/select";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // @ts-ignore
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  secteurs: Secteur[]=[];
  ministeres: Ministere[]=[];
  myForm!: FormGroup;

  matcher = new MyErrorStateMatcher();



  constructor(private userService: UserService,private secteurService:SecteurService,
              private ministereService:MinistereService,private authService:AuthenticationService,
              private router:Router,private formBuilder: FormBuilder,private _snackBar: MatSnackBar,
              public app:AppComponent) {
    /* this.myForm = this.formBuilder.group({
       nom:[''],
       prenom:[''],
       username:[''],
       secteur:[''],
       role:[''],
       password: ['', [Validators.required]],
       confirmPassword: ['']
     }, { validator: this.checkPasswords });*/

  }

  ngOnInit() {
    this.ministereService.getAllMinisteres().subscribe({
      next:  value => this.ministeres = value,
      complete: () => console.log("ministeres chargé"),
      error:err => console.log(err)
  });

    this.secteurService.getAllSecteurs().subscribe(value => {
      // @ts-ignore
      this.secteurs = value;
      console.log(this.secteurs);

    });
  }

  onLogout() {
    const conf = confirm('Voulez vous deconnecter?');
    if (conf) {
      this.authService.removeAuthenticatedUserFromLocalStorage();
      this.router.navigateByUrl('/login');
    }
  }

  /*resetForm(){
    //this.myForm.reset();
    this.router.navigateByUrl("/login")
   // console.log(this.myForm.value)
  }*/

  /*checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }
  }*/

  /*{username: "treeteq", role: "ADMIN", password: "chardon1234"}
*/
  selected='ADMIN';

  saveUser() {
    /*console.log(this.myForm.value.secteur);
    this.user.nom = this.myForm.value.nom;
    this.user.prenom = this.myForm.value.prenom;
    this.user.username = this.myForm.value.username;
    this.user.secteur = this.myForm.value.secteur
    this.user.role = this.myForm.value.role;
    this.user.password = this.myForm.value.password;*/

    //console.log(this.user);

    this.userService.saveUser(this.user).subscribe(value => {
      //console.log('verified',this.user);
      this.user=value;
      if(value===null) {
        alert("Vous ne pouvez pas ajouter la meme salle deux fois !!");
      }else {
        this._snackBar.open('LA SALLE A ETE AJOUTE', 'AJOUTER', {
          duration: 2000,
        });
        window.location.reload();
      }
      this._snackBar.open('LE MOUVEMENT A ETE AJOUTE', 'AJOUTER', {
        duration: 2000,
      });
      //console.log(this.user);
    });

    //this.resetForm();
    //this.router.navigateByUrl('/');
    //window.location.reload();
  }

  public localStorageItem(id: string): string {
    // @ts-ignore
    return localStorage.getItem(id);
  }

  getResult($event: MatSelectChange) {
    console.log($event.value);
  }


  getUserMinistere($event: MatSelectChange) {
    let s = $event.value.libelleFr;
     if(s.indexOf("MINISTERE DE L\'")>-1){
       s=s.replace("MINISTERE DE L\'",'');
       console.log(s);
    }else if(s.indexOf("MINISTERE DE LA")>-1){
       s=s.replace("MINISTERE DE LA",'');
       console.log(s);
     }else if(s.indexOf("MINISTERE DE ")>-1){
       s=s.replace("MINISTERE DE ",'');
       console.log(s);
     }

    let x = s.replace(/['"]+/g, '');
    console.log(x);
    let y='';
    if(/\s/g.test(s)){
      y= x.replace(/\s/g,'');
    }
    y= x.replace(/\s/g,'');
    y+='_'+$event.value.id
    console.log(y.toLowerCase());
    this.user.username = y.toLowerCase();
    this.user.nom = y.toLowerCase();
    this.user.prenom = y.toLowerCase();

    this.user.password = s+"00"+$event.value.id;
    console.log(this.user);


  }

  getSelection($event: MatSelectChange) {

  }
}
