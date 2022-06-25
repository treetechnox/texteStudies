import { Component, OnInit } from '@angular/core';
import {PhaseService} from "../service/phase.service";
import {AppComponent} from "../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Phase} from "../phase";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-phase',
  templateUrl: './edit-phase.component.html',
  styleUrls: ['./edit-phase.component.css']
})
export class EditPhaseComponent implements OnInit {

  public fonctionExist = false;
  //detail: Detail  = new Detail();
  phase:Phase=new Phase();
  submitted = false;

  constructor(/*private organismeService: OrganismeService, private detailService: DetailService ,*/
              private phaseService: PhaseService ,private _location:Location,public app: AppComponent,
              private route: ActivatedRoute,private router: Router) {/*,*/ }

  ngOnInit() {
    this.phaseService.getPhaseById(this.route.snapshot.params['id']).subscribe({
      next:value => {this.phase = value; console.log(this.phase)},
      complete:() => console.log('LOADED'),
      error:err => console.log('Phase not loaded')
    })
  }

  verifierFonction(libellefr: string) {/*, idOrg: number*/
    this.fonctionExist = false;
    this.phaseService.getPhaseByLibellefr(libellefr).subscribe(value => {
        // @ts-ignore
        this.fonctionExist = true;
        // @ts-ignore
        this.organisme = value;
      }, error1 => console.log('N existe pas',error1)
    );
  }

  onSubmitUpdate() {
    this.onUpdate();
  }


  onUpdate() {
    this.phaseService.updatePhase( this.route.snapshot.params['id'],this.phase).subscribe(
      {
        next: value => {
        console.log(value)
        this.submitted = true;
        alert('La fonction: ' + value.libelleFr + ' a été ajoutée avec succés');
       },
        complete: () => console.log('LOADED !!!'),
        error: err => console.log('error fonction .................')
      });
    this.backClicked();
  }


  backClicked() {
    this._location.back();
  }
}
