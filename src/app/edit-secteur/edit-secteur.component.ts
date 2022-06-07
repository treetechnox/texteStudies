import { Component, OnInit } from '@angular/core';
import {Secteur} from "../Secteur";
import {SecteurService} from "../service/secteur.service";
import {AuthenticationService} from "../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppComponent} from "../app.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-secteur',
  templateUrl: './edit-secteur.component.html',
  styleUrls: ['./edit-secteur.component.css']
})
export class EditSecteurComponent implements OnInit {

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
    console.log(this.route.snapshot.params)
    this.secteurService.getSecteurById(this.route.snapshot.params['id']).subscribe(value => {
      this.secteur = value;
    })
  }


  onSubmitSave() {
    this.secteurService.updateSecteur(this.route.snapshot.params['id'],this.secteur).subscribe(value => {
      console.log(value);
      if(value===null) alert("vous ne pouvez pas ajouter le meme secteur deux fois !!");
      this._snackBar.open('LA SECTEUR A ETE AJOUTE', 'AJOUTER', {
        duration: 2000,
      });
    });

    window.location.reload();this.location.back();
  }
}
