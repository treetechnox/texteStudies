import { Component, OnInit } from '@angular/core';
import {Secteur} from '../Secteur';
import {SecteurService} from '../service/secteur.service';
import {AuthenticationService} from '../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppComponent} from '../app.component';
import {Location} from '@angular/common';
import {Ministere} from '../Ministere';
import {MinistereService} from '../service/ministere.service';
// npm install http - parser - js

@Component({
  selector: 'app-add-ministere',
  templateUrl: './add-ministere.component.html',
  styleUrls: ['./add-ministere.component.css']
})
export class AddMinistereComponent implements OnInit {

  ministere: Ministere = new Ministere();

  submitted!:boolean;

  constructor(
    private ministereService: MinistereService,
    private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,
    private _snackBar: MatSnackBar,public app:AppComponent,
    private location: Location) { }


  ngOnInit() {
    this.submitted= false;
  }


  onSubmitSave() {
    this.ministereService.saveMinistere(this.ministere).subscribe(value => {
      console.log(value);
      if(value===null) alert("vous ne pouvez pas ajouter le meme secteur deux fois !!");
      this._snackBar.open('LA SECTEUR A ETE AJOUTE', 'AJOUTER', {
        duration: 2000,
      });
    });
    //window.location.reload();//this.location.back();
  }


}
