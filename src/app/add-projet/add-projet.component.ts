import {
  AfterViewInit, Component, EventEmitter,
  Input, OnDestroy, OnInit, Output, ViewChild, LOCALE_ID, Inject
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {FormStyle,
  getLocaleDirection,
  TranslationWidth }
  from '@angular/common';
import {AppComponent} from '../app.component';
import {DateAdapter} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog/*, MatDialogConfig*/} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {TexteService} from '../service/texte.service';
import {MouvementService} from '../service/mouvement.service';
import {Texte} from '../Texte';
import {Mouvement} from '../Mouvement';
import {Phase} from '../phase';
import {Nature} from '../Nature';
import {NatureService} from '../service/nature.service';
import {PhaseService} from '../service/phase.service';
import {AuthenticationService} from '../service/authentication.service';
import {Secteur} from '../Secteur';
import {SecteurService} from '../service/secteur.service';
import {Ministere} from '../Ministere';
import {MinistereService} from '../service/ministere.service';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {take, takeUntil} from 'rxjs/operators';


export interface MouvementMinistere{
  id: number;
  mouvement:Mouvement;
  ministere:Ministere;
}

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.css']
})
export class AddProjetComponent implements OnInit, AfterViewInit, OnDestroy  {

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

  date = new Date((new Date().getTime()));

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
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      natureCtrl: ['' , Validators.required],
      sommaireFrCtrl: ['', Validators.required],
      sommaireArCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      etatMouvementCtrl: ['', Validators.required],
      secteurMouvementCtrl: ['', Validators.required],
    });
    this.setNullTexteToVide();
    //this.reloadDataOrganismes();

    this.natureService.getAllNatures().subscribe(value => {
      console.log(value);
      this.natures=value;
    });

    this.phaseService.getAllPhases().subscribe(value => {
      console.log(value);
      this.phases = value;
    });

    this.secteurService.getAllSecteurs().subscribe(value => {
      console.log(value);
      this.secteurs = value;
      if (this.selsect) {
        let selected = this.secteurs.find(o => o.id == this.selsect?.id);

        if (selected) {
          this.selsect = selected;
        }else {
          selected!=null
        }
      }

    });
    this.ministereService.getAllMinisteres().subscribe(value => {
      //console.log(value);
      this.ministeres = value;
      //this.selectedMinisteres = value;

    });




    /********************** BEGIN OF METHODS OF THE FILTER            *************************/

    //this.ministereMultiCtrl.setValue([this.ministeres[10], this.ministeres[11], this.ministeres[12]]);

    // load the initial bank list
    this.selectedValues=[...this.ministeres];
    this.filteredMinisteresMulti.next(this.ministeres.slice());

    // listen for search field value changes
    this.ministereMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });

  }/** END OF TH ngOnInit() */

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredMinisteresMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Ministere, b: Ministere) => a && b && a.id === b.id;
      });
  }

  protected filterBanksMulti() {
    if (!this.ministeres) {
      return;
    }
    // get the search keyword
    let search = this.ministereMultiFilterCtrl.value || '';
    if (!search) {
      this.filteredMinisteresMulti.next(this.ministeres.slice());
      return;
    } else {
      search = search?.toLowerCase();
    }
    // filter the banks
    this.filteredMinisteresMulti.next(
      this.ministeres.filter(bank => bank.libelleFr?.toLowerCase().indexOf(search) > -1)
    );
  }
  /* ***********************************    END OF FILTER       **************************************** */


  setNullTexteToVide() {
    if (this.texte.refer === null) {
      this.texte.refer = '';
    }
  }

  toFormattedDate(date: any) {
    /*console.log(iso)
    this._adapter.setLocale('fr');*/
    this.mouvement.datePhase = date/*formatDate(this.date.toDateString(),"dd-MM-yyyy",this.locale);*/
    console.log(this.mouvement.datePhase)
  }


  verifierTexte(nomfr: string, prenomfr: string) {
    this.texteExist = false;
    this.texteService.getTexteBySommaireArFr(nomfr, prenomfr).subscribe(value => {
        this.texteExist = true;
        this.texte = value;
      }, error1 => console.log('N existe pas'+error1)
    );
  }

  saveTexte() {
    this.texte.nature = this.nature;
    console.log(this.texte);
    this.texteService.saveTexte(this.texte)
      .subscribe(data => {
        console.log(data);
        this.texte = data;
        this.mouvement.isactive = true;
        this.onSubmitSaveMouvement(this.texte,this.mouvement);
        this.router.navigateByUrl('/lajoutprojet', { skipLocationChange: true }).then(() => {
          this.router.navigate(['lesprojets']).then((r) => console.log(r));
        });
        this._snackBar.open('LE Texte A ETE AJOUTE', 'AJOUTER', {
          duration: 2000,
        });
      }, error1 => console.log(error1));
  }

  onAjoutMouvement() {
    this.router.navigateByUrl('lestextes/' + this.texte.id + '/mouvements/ajoutmouvement').then(r => console.log(r));
  }

  onEditMouvement() {
    // textes/{{texte.id}}/mouvements/
    this.router.navigateByUrl('lestextes/' + this.texte.id + '/mouvements').then(r => console.log(r));
  }


  onSubmitSaveMouvement(texte:Texte,mouvement:Mouvement) {
    console.log(mouvement);
    this.mouvementService.saveMouvement(texte.id,mouvement).subscribe(value => {
      console.log(value)
      this.mouvement=value;
      //this.mouvementMinistere.mouvement = this.mouvement;
      console.log(this.selectedValues);

      this.selectedValues.forEach(slcmins => {
        console.log(slcmins);
        //this.mouvementMinistere.ministere = slcmins;
        this.mouvementService.saveMouvementMinistere(this.mouvement.id,slcmins.id).subscribe(minmouv => {
          console.log(minmouv);
        })
      })


    },error => console.log(error))


  }

  onSubmitSave() {
    this.submitted = true;
    this.saveTexte();
  }

  onClose(): void {
    this.dialog.closeAll();
  }

  onMinistereSelected(event:any){
    console.log(event)
  }

  makeNominat(event: any) {
    console.log(event);

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
    // window.location.reload();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['lajouttexte']).then(r => console.log(r));
    });
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
}
