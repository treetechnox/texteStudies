import { Component, OnInit } from '@angular/core';
import {Ministere} from "../Ministere";
import {MinistereService} from "../service/ministere.service";
import {AuthenticationService} from "../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppComponent} from "../app.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-ministere',
  templateUrl: './edit-ministere.component.html',
  styleUrls: ['./edit-ministere.component.css']
})
export class EditMinistereComponent implements OnInit {

  ministere: Ministere = new Ministere();

  submitted!:boolean;

  minstereId!:number;

  constructor(
    private ministereService: MinistereService,
    private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,
    private _snackBar: MatSnackBar,public app:AppComponent,
    private location: Location) {}


  ngOnInit() {
    this.minstereId = this.route.snapshot.params['id'];
    console.log(this.minstereId);
    this.ministereService.getMinistereById(this.minstereId).subscribe({
      next: value => this.ministere =value,
      complete: () => console.log('MINISTERE CHARGE'),
      error:err => console.log('erreur au niveau de modification de Ministere'+err)
    })
    this.submitted= false;
  }


  onSubmitUpdate() {
    this.ministereService.updateMinistere(this.minstereId,this.ministere).subscribe(value => {
      if(value===null) alert("vous ne pouvez pas modifier !!");
      this._snackBar.open('MINISTERE A ETE MODIFIER', 'MODIFIER', {
        duration: 2000,
      });
    });

    window.location.reload();this.location.back();
  }
}
