import { Component, OnInit } from '@angular/core';
import {Salle} from '../salle';
import {ReservationService} from '../service/reservation.service';
import {SalleService} from '../service/salle.service';
import {AuthenticationService} from '../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppComponent} from '../app.component';
import {Location} from '@angular/common';
import {SecteurService} from '../service/secteur.service';
import {Secteur} from '../Secteur';

@Component({
  selector: 'app-add-secteur',
  templateUrl: './add-secteur.component.html',
  styleUrls: ['./add-secteur.component.css']
})
export class AddSecteurComponent implements OnInit {

  secteur: Secteur = new Secteur();

  submitted!:boolean;

  constructor(
    private secteurService: SecteurService,
    private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,
    private _snackBar: MatSnackBar,public app:AppComponent,
    private location: Location) { }


  ngOnInit() {
    this.submitted= false;
  }


  onSubmitSave() {
    this.secteurService.saveSecteur(this.secteur).subscribe(value => {
      console.log(value);
      if(value===null) alert("vous ne pouvez pas ajouter le meme secteur deux fois !!");
      this._snackBar.open('LA SECTEUR A ETE AJOUTE', 'AJOUTER', {
        duration: 2000,
      });
    });
    window.location.reload();//this.location.back();
  }

}
