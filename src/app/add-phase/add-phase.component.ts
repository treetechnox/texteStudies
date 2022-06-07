import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';
/*
import {Organisme} from '../organisme';
import {Fonction} from '../fonction';
import {OrganismeService} from '../service/organisme.service';
import {FonctionService} from '../service/fonction.service';
import {Location} from '@angular/common';

import {DetailService} from '../service/detail.service';
import {Detail} from '../detail';
*/
import {ActivatedRoute, Router} from '@angular/router';
import {PhaseService} from '../service/phase.service';
import {Phase} from '../phase';

@Component({
  selector: 'app-add-phase',
  templateUrl: './add-phase.component.html',
  styleUrls: ['./add-phase.component.css']
})
export class AddPhaseComponent implements OnInit {
  public fonctionExist = false;
  //detail: Detail  = new Detail();

  constructor(/*private organismeService: OrganismeService, private detailService: DetailService ,*/
              private phaseService: PhaseService /*,private _location:Location*/,public app: AppComponent,
              private route: ActivatedRoute,private router: Router) {/*,*/ }


  /*organismes: Organisme[];
  fonctions: Fonction [];
  fonction: Fonction = new Fonction();
  //fonctionPere: Fonction = new Fonction();
  organisme: Organisme = new Organisme();*/

  phase:Phase=new Phase();

  submitted = false;
  /*

    niveau: any[] = [
      {value: 1, viewValue: 1}, {value: 2, viewValue: 2}, {value: 3, viewValue: 3},
      {value: 4, viewValue: 4}, {value: 5, viewValue: 5}, {value: 6, viewValue: 6},
      {value: 7, viewValue: 7}, {value: 8, viewValue: 8}, {value: 9, viewValue: 9},
      {value: 10, viewValue: 10}, {value: 11, viewValue: 11}, {value: 12, viewValue: 12},
      {value: 13, viewValue: 13}, {value: 14, viewValue: 14}, {value: 15, viewValue: 15}
    ];
  */


  ngOnInit() {
    //this.reloadDataOrganismes();

    /*this.detail.detailfctar='';
    this.detail.detailfctfr='';
    console.log(this.detail);*/
    //this.reloadDataFonctionsPere();
  }

  verifierFonction(libellefr: string) {/*, idOrg: number*/
    this.fonctionExist = false;
    this.phaseService.getPhaseByLibellefr(libellefr).subscribe(value => {
        // @ts-ignore
        this.fonctionExist = true;
        // @ts-ignore
        this.organisme = value;
        // this.reloadDataMouvements(this.id);
        //console.log('Yes it Exists ^^');
      }, error1 => console.log('N existe pas',error1)
    );
  }

  onSubmit() {

    this.onSave();
    //this.router.navigateByUrl('/');
    //window.location.reload();
    // this.gotoList();
  }

  /*onOrganismesSelected(value: number) {
    this.idOrg = value;
    console.log('the selected value of organisme ID is: ' + value);
    this.reloadDataFonctionsByOrganisme(value);
  }*/

  onSave() {

    this.phaseService.savePhase( this.phase).subscribe(value => {
      console.log(value)
      /*this.detailService.saveDetail(this.detail).subscribe(dtl => {
        this.detail = dtl;
        console.log(dtl,this.detail);
        this.detailService.associerFonctionDetail(value.id,dtl.id).subscribe(value1 => {
          console.log(value1)
        })
        //alert('La detail: ' + value.detailfctfr + ' a été ajoutée avec succés');
      }, error1 => console.log('error detail .................') + error1);*/
      //this.fonction = value;
      this.submitted = true;
      alert('La fonction: ' + value.libelleFr + ' a été ajoutée avec succés');
    }, error1 => console.log('error fonction .................') + error1);
    this.submitted = true;
  }

  /*reloadDataOrganismes() {

    // @ts-ignore
    this.organismeService.getOrganismesList().subscribe( value => {
      // @ts-ignore
      this.organismes = value.content;
      // @ts-ignore
      if (this.organismes.content){
        console.log('nice to see it true');
      }
      console.log('tous les fonctions sont chargé ! ' + this.organismes);
    }, error1 => console.log( 'Erreur fonction list ...' + error1), () => console.log( ' Chargement de fonctions est terminé ' ) );

  }*/
  /*

    reloadDataFonctionsPere() {
      this.fonctionService.getAllFonction().subscribe(value => {
        this.fonctions = value;
      }, error1 => console.log( 'Erreur fonction list ...',error1 ), () => console.log( ' Chargement de fonctions est terminé ' ) );
    }
  */


  /*gotoList() {
    // @ts-ignore
    this.router.navigateByUrl(['/lajoutfonction']);
  }*/

  /*onFonctionPereSelected(value: number) {
    this.choosenFctId = value;
    console.log('this is what i select nowww ... ' + value);
    this.fonctionService.getFonctionByMouvement(value).subscribe(value1 => {
      this.fonction = value1;

      /!*this.organisme.lien = this.idOrganisme;
      this.organisme.niveau = value1.niveau + 1;
      this.organisme.libellefr = '';
      this.organisme.libellear = '';*!/
      console.log('this.organisme.niveau: ');
      console.log(this.organisme.niveau);
    }, error1 => console.log( 'Erreur organisme list ...' ), () => console.log( ' Chargement de orga est terminé pour org ' ) );
    console.log('the selected organisme value is :::::::::::: ' + this.choosenFctId);
  }*/

  /*teste(id: number) {
    console.log('test ' + id);
    this.fonctionService.getFonctionById(id).subscribe(value1 => {
      this.fonction = value1;
      /!*console.log('this.fonction.niveau: ');
      console.log(this.fonction.niveau);*!/
    }, error1 => console.log( 'Erreur organisme list ...' ,error1), () => console.log( ' Chargement de orga est terminé pour org ' ) );
  }*/

  backClicked() {
    //this._location.back();
  }
}
