import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Ministere} from "../Ministere";
import {MinistereService} from "../service/ministere.service";
import {AuthenticationService} from "../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppComponent} from "../app.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {formatDate, Location} from "@angular/common";
import {Correspondance} from "../Correspondance";
import {CorrespondanceService} from "../service/correspondance.service";

@Component({
  selector: 'app-add-correspondance',
  templateUrl: './add-correspondance.component.html',
  styleUrls: ['./add-correspondance.component.css']
})
export class AddCorrespondanceComponent implements OnInit {

  correspondance: Correspondance = new Correspondance();
  ministere: Ministere= new Ministere();
  ministeres: Ministere[]=[];

  submitted!:boolean;

  date = new Date((new Date().getTime()));

  constructor(
    private correspondanceService: CorrespondanceService,
    private ministereService:MinistereService,
    private authService: AuthenticationService,@Inject(LOCALE_ID) public locale :string,
    private router: Router, private route: ActivatedRoute,
    private _snackBar: MatSnackBar,public app:AppComponent,
    @Inject(MAT_DIALOG_DATA) public texteId: number,
    private location: Location) { }


  ngOnInit() {
    formatDate(this.date.toDateString(),"dd-MM-yyyy",this.locale);
    this.correspondance.dateCorrespond = this.date;
    this.ministereService.getAllMinisteres().subscribe({next: value => {
        this.ministeres = value;
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('Request complete');
      }})
    this.submitted= false;
  }


  onSubmitSave() {
    //console.log(this.correspondance);
    this.correspondanceService.saveCorrespondance(this.texteId,this.correspondance).subscribe({
      next:value => {
        console.log(value);
        if(value===null) alert("vous ne pouvez pas ajouter le meme secteur deux fois !!");
        this._snackBar.open('LA SECTEUR A ETE AJOUTE', 'FERMER', {duration: 2000})
      },
      complete:()=>console.log('Correspondance sauvgardé'),
      error:err => console.log(err),
    });
    //window.location.reload();//this.location.back();
  }

  onGetMinistere($event: any) {
    console.log($event);
    this.ministere = $event
    this.correspondance.ministere = this.ministere;
  }

  toFormattedDate(event:any) {
    console.log(event);
    /*
        this._adapter.setLocale('fr');*/
    //formatDate(this.date.toDateString(),"dd-MM-yyyy",this.locale);
  }
}
