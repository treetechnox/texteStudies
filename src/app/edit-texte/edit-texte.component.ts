import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, ViewChild} from '@angular/core';
import {Ministere} from "../Ministere";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {Secteur} from "../Secteur";
import {Mouvement} from "../Mouvement";
import {Texte} from "../Texte";
import {Phase} from "../phase";
import {Nature} from "../Nature";
import {NatureService} from "../service/nature.service";
import {PhaseService} from "../service/phase.service";
import {SecteurService} from "../service/secteur.service";
import {MinistereService} from "../service/ministere.service";
import {TexteService} from "../service/texte.service";
import {MouvementService} from "../service/mouvement.service";
import {AuthenticationService} from "../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppComponent} from "../app.component";
import {take, takeUntil} from "rxjs/operators";
import {MouvementMinistere} from "../add-projet/add-projet.component";

@Component({
  selector: 'app-edit-texte',
  templateUrl: './edit-texte.component.html',
  styleUrls: ['./edit-texte.component.css']
})
export class EditTexteComponent implements OnInit {

  @Inject(LOCALE_ID) public locale!: string
  //dir: string = getLocaleDirection(this.locale) || 'ltr';
  /** list of banks */
  //protected organismes: Ministere[] = [];

  /*  setLocalDirection(dir: string){
      this.dir = dir
    }*/


  /** control for the selected bank for multi-selection */
  @Input() selectedValues: Ministere[] = [];
  // 3. output whenever a change is made to selectedValues
  @Output() selectionChange = new EventEmitter();

  /** control for the MatSelect filter keyword multi-selection */
  public ministereMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredMinisteresMulti: ReplaySubject<Ministere[]> = new ReplaySubject<Ministere[]>(1);

  @ViewChild('multiSelect') multiSelect!: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  @Input() selsect:Secteur = this.authService.userAuthenticated!.secteur;

  mouvement: Mouvement = new Mouvement();
  lastmouvement: Mouvement = new Mouvement();

  mouvementMinistere:MouvementMinistere = new class implements MouvementMinistere {
    id!: number;
    ministere!: Ministere;
    mouvement!: Mouvement;
  }
  texte: Texte = new Texte();
  texteExist = false;
  phase: Phase = new Phase();
  phases: Phase[] = [];

  nature!:Nature;
  natures:Nature[]=[];
  secteurs:Secteur[]=[];
  ministeres:Ministere[]=[];
  selectedSecteur:Secteur=new Secteur();
  secteur:Secteur=new Secteur();
  ministere:Ministere = new Ministere();

  //selectedMinisteres: Ministere[] = [];
  //slctMinisteres: Ministere[] = [];
  submitted = false;
  date!: Date;
  natr!: Nature;



  constructor(private _formBuilder: FormBuilder/*, private texteService: TexteService*/,
              private natureService:NatureService,
              private phaseService:PhaseService,
              private secteurService:SecteurService,
              private ministereService:MinistereService,
              private texteService:TexteService,
              private mouvementService: MouvementService,
              public authService:AuthenticationService,
              /*private fonctionService: FonctionService, private organismeService: OrganismeService,*/
              private router: Router, private route: ActivatedRoute, private _adapter: DateAdapter<any>,
              private dialog: MatDialog, private _snackBar: MatSnackBar, public app: AppComponent) {

    this.secteur = this.authService.userAuthenticated!.secteur;
    this.mouvement.datePhase = new Date();
    console.log(this.mouvement.datePhase,this.toFormattedDate(new Date()))
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      natureCtrl: ['', Validators.required],
      sommaireFrCtrl: ['', Validators.required],
      sommaireArCtrl: ['', Validators.required],
    });

    this.texteService.getTexteById(this.route.snapshot.params['id']).subscribe(value => {
      this.texte = value;
      this.natr = this.texte.nature;
      console.log(this.texte);
    })
    this.natureService.getAllNatures().subscribe(value => {
      console.log(value);
      this.natures = value;
    });

    this.phaseService.getAllPhases().subscribe(value => {
      console.log(value);
      this.phases = value;
    });
  }

  ngAfterViewInit() {
    //this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */


  setNullTexteToVide() {
    if (this.texte.refer === null) {
      this.texte.refer = '';
    }
  }

  toFormattedDate(iso: any) {
    //console.log(this.etatMouvement.proposition);
    this.date = new Date(iso);
    //console.log(`${this.date.getDate() + 1}-${this.date.getMonth() + 1}-${this.date.getFullYear()}`);
    return `${this.date.getDate() + 1}-${this.date.getMonth() + 1}-${this.date.getFullYear()}`;
  }

  updateTexte() {
    this.texte.nature = this.nature;
    console.log(this.texte);
    this.texteService.updateTexte(this.route.snapshot.params['id'],this.texte)
      .subscribe(data => {
        console.log(data);
        this.texte = data;
      });
  }




  onSubmitUpdate() {
    this.submitted = true;
    console.log(this.mouvement)
    this.updateTexte();
  }

  onClose(): void {
    this.dialog.closeAll();
  }




  getSelectedSecteur(event: any) {
    console.log(event);
    this.mouvement.secteur = this.selsect;
  }

  /*onKeyFct(event) {
    console.log(event.code,event.target.value);
    this.selectedMinisteres = this.searchMinist(event.target.value);
  }*/

  searchMinist(value: string) {
    console.log(value);
    let filter = this.ministeres.filter(item=> {

        return item.libelleFr && item.libelleFr?.toLowerCase().includes(value?.toLowerCase());

      }
    );
    console.log(filter);
    return [...filter];
  }


  reinisialize() {
    this.texte.sommaireAr = '';
    this.texte.sommaireFr = '';
  }


  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  chckedOccupe(event: any) {
    console.log(event);
  }

  teste(target: any) {
    console.log(target)
  }

  getTypeDecret($event: any) {
    console.log($event)
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  getMinistere(event: any) {
    this.selectedValues=event
    console.log( event)

  }

  getEvent(f1:any,f2: any) {
    console.log(f1.valid,f2.valid)
  }

  getNature(nature: Nature) {
    console.log(nature);
  }

}
