import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
// @ts-ignore
import {User} from '../user';
import {AuthenticationService} from '../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MyErrorStateMatcher} from '../add-user/add-user.component';
import {AppComponent} from '../app.component';
import {Secteur} from '../Secteur';
import {SecteurService} from '../service/secteur.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  user: User = new User();

  myForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  private userId: number;

  selected='ADMIN';
  secteurs: Secteur[]=[];

  constructor(private userService: UserService, private router:Router,
              public app:AppComponent, private secteurSerice:SecteurService,
              private authenticationService: AuthenticationService,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];
    this.myForm = this.formBuilder.group({
      username:[''],nom:[''],prenom:[''],
      role:[''],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }

  ngOnInit() {
    this.secteurSerice.getAllSecteurs().subscribe(secteurs =>{
      this.secteurs = secteurs ;
    })
    this.userService.getUserById(this.userId).subscribe(value => {
      this.user = value;
      console.log(this.user.secteur);
    })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }

  /*{username: "treeteq", role: "ADMIN", password: "chardon1234"}
*/

  /*updateUser() {
    //console.log(this.myForm.value.username);
    this.user.username = this.myForm.value.username;
    this.user.nom = this.myForm.value.nom;
    this.user.prenom = this.myForm.value.prenom;
    this.user.role = this.myForm.value.role;
    this.user.secteur = this.myForm.value.secteur;
    this.user.password = this.myForm.value.password;
    console.log(this.user);
    this.userService.updateUser(this.userId,this.user).subscribe(value => {
      console.log('When update');
      //this.user=value;
      /!*
      console.log('user id: ' + this.userId);
      console.log(value);*!/
    });
    this.authenticationService.removeAuthenticatedUserFromLocalStorage();
    this.router.navigateByUrl('');
  }*/
  saveUser() {
    console.log(this.route.snapshot.params['id'],this.user);
    this.userService.updateUser(this.userId,this.user).subscribe(value => {
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

}
