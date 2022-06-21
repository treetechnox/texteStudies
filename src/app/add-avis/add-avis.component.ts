import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppComponent} from "../app.component";
import {formatDate, Location} from "@angular/common";
import {Avis} from "../Avis";
import {AvisService} from "../service/avis.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSelectChange} from "@angular/material/select";
import {Ministere} from "../Ministere";
import {MinistereService} from "../service/ministere.service";

@Component({
  selector: 'app-add-avis',
  templateUrl: './add-avis.component.html',
  styleUrls: ['./add-avis.component.css']
})
export class AddAvisComponent implements OnInit {

  avis: Avis = new Avis();
  ministere: Ministere= new Ministere();
  ministeres: Ministere[]=[];

  submitted!:boolean;

  date = new Date((new Date().getTime()));

  constructor(
    private avisService: AvisService,
    private ministereService:MinistereService,
    private authService: AuthenticationService,@Inject(LOCALE_ID) public locale :string,
    private router: Router, private route: ActivatedRoute,
    private _snackBar: MatSnackBar,public app:AppComponent,
    @Inject(MAT_DIALOG_DATA) public texteId: number,
    private location: Location) { }


  ngOnInit() {
    this.avis.date_avis = new Date();
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
    //console.log(this.avis);
    this.avisService.saveAvis(this.texteId,this.avis).subscribe({
      next:value => {
        console.log(value);
        if(value===null) alert("vous ne pouvez pas ajouter le meme secteur deux fois !!");
        this._snackBar.open('LA SECTEUR A ETE AJOUTE', 'FERMER', {duration: 2000})
      },
      complete:()=>console.log('Avis sauvgardé'),
      error:err => console.log(err),
    });
    //window.location.reload();//this.location.back();
  }

  onGetMinistere($event: any) {
    console.log($event);
    this.ministere = $event
    this.avis.ministere = this.ministere;
  }

  toFormattedDate(date: any) {
    /*    console.log(iso)
        this._adapter.setLocale('fr');*/
    formatDate(this.date.toDateString(),"dd-MM-yyyy",this.locale);


  }
}
