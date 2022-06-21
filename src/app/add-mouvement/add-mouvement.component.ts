import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {Secteur} from '../Secteur';
import {Mouvement} from '../Mouvement';
import {Ministere} from '../Ministere';
import {Texte} from '../Texte';
import {Phase} from '../phase';
import {Nature} from '../Nature';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {NatureService} from '../service/nature.service';
import {PhaseService} from '../service/phase.service';
import {SecteurService} from '../service/secteur.service';
import {MinistereService} from '../service/ministere.service';
import {TexteService} from '../service/texte.service';
import {MouvementService} from '../service/mouvement.service';
import {AuthenticationService} from '../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppComponent} from '../app.component';
import {MouvementMinistere} from '../add-projet/add-projet.component';
import {DatePipe, formatDate, getLocaleDirection} from '@angular/common';

@Component({
  selector: 'app-add-mouvement',
  templateUrl: './add-mouvement.component.html',
  styleUrls: ['./add-mouvement.component.css']
})
export class AddMouvementComponent implements OnInit {

  @Input() selsect:Secteur = this.authService.userAuthenticated!.secteur;
  //dir: string = getLocaleDirection(this.locale);
  /** list of banks */
  //protected organismes: Ministere[] = [];

/*  setLocalDirection(dir: string){
    return this.dir = dir
  }*/

  mouvement: Mouvement = new Mouvement();
  lastmouvement: Mouvement = new Mouvement();

  myformGroup!: FormGroup;

  mouvementMinistere:MouvementMinistere = new class implements MouvementMinistere {
    id!: number;
    ministere!: Ministere;
    mouvement!: Mouvement;
  }

  texte: Texte = new Texte();
  texteExist = false;
  phase: Phase = new Phase();
  phases: Phase[] = [];

  nature:Nature=new Nature();
  natures:Nature[]=[];
  secteurs:Secteur[]=[];
  ministeres:Ministere[]=[];
  selectedSecteur:Secteur=new Secteur();
  secteur:Secteur=new Secteur();
  ministere:Ministere = new Ministere();

  selectedMinisteres: Ministere[] = [];
  slctMinisteres: Ministere[] = [];

  submitted = false;

  date = new Date((new Date().getTime()));

  constructor(private _formBuilder: FormBuilder/*, private texteService: TexteService*/,
              private natureService:NatureService,
              private datePipe:DatePipe,
              private phaseService:PhaseService,
              private secteurService:SecteurService,
              private ministereService:MinistereService,
              private texteService:TexteService,
              private mouvementService: MouvementService,
              public authService:AuthenticationService,@Inject(LOCALE_ID) public locale :string,
              private router: Router, private route: ActivatedRoute, private _adapter: DateAdapter<any>,
              private dialog: MatDialog, private _snackBar: MatSnackBar, public app: AppComponent,
              @Inject(MAT_DIALOG_DATA) public texteId: number
              /*private location: Location ,*/ /*private detailService: DetailService*/) {


    if (this.selsect===null){
      this.secteurService.getSecteurByLastMouvement(this.texteId).subscribe(sect =>{
        this.selsect = sect;
      })
    }
    /*      console.log(this.selsect);*/
    //;

    /*this.authService.userAuthenticated.secteur?alert('secteur existe !!! '):alert('secteur n\'existe pas !!! ');
    this.secteur = this.authService.userAuthenticated.secteur;*/
    console.log(this.selsect);
  }

  ngOnInit() {

  /*  let d= new Date();
    //console.log(this.datePipe.transform(this.date,"yyyy-MM-dd"));

    this.mouvement.datePhase = d.getDay()+'-'+d.getMonth()+'-'+d.getFullYear();*/




    this.texteService.getTexteById(this.texteId).subscribe(value => {
      this.texte = value;
      console.log(this.texte);
    });

    this.mouvementService.getTopMouvementByTexteId(this.texteId).subscribe(value => {
      this.selsect = value.secteur;
    })
    this.ministereService.getAllMouvementMinistereByTopMouvementAndByTexteId(this.texteId).subscribe(value => {
      this.mouvement.mouvementMinistere = value;
      console.log(this.mouvement.mouvementMinistere);
    });

    this.ministereService.getAllMinistereByTopMouvementAndByTexteId(this.texteId).subscribe(value => {
      this.ministeres = value;
      console.log(this.ministeres);
    });


    this.myformGroup = this._formBuilder.group({
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
    /*this.ministereService.getAllMinisteres().subscribe(value => {
      //console.log(value);
      this.ministeres = value;
      this.selectedMinisteres = value;

    })*/

  }

  setNullTexteToVide() {
    if (this.texte.refer === null) {
      this.texte.refer = '';
    }
  }

  toFormattedDate(date: any) {
/*    console.log(iso)
    this._adapter.setLocale('fr');*/
    this.mouvement.datePhase = date
    formatDate(this.date.toDateString(),"dd-MM-yyyy",this.locale);
    console.log(this.mouvement.datePhase)

  }

  onAjoutMouvement() {
    this.router.navigateByUrl('lestextes/' + this.texte.id + '/mouvements/ajoutmouvement').then(r => console.log(r));
  }

  onEditMouvement() {
    this.router.navigateByUrl('lestextes/' + this.texte.id + '/mouvements').then(r => console.log(r));

  }

  onSubmitSaveMouvement() {
    /*this.mouvement.mouvementMinistere*/


    this.mouvementService.getTopMouvementByTexteIdDesc(this.texteId).subscribe(topmouve => {
      topmouve.isactive = false;
      this.mouvementService.updateMouvementIsActive(topmouve.id,topmouve).subscribe(updatedmouve => {
        console.log(updatedmouve);
      })
    })

    if(this.mouvement.phase.libelleFr = 'TEXTE PUBLIE'){
      this.texteService.updateTexte(this.texteId,this.texte).subscribe(value => {
        console.log(value);
      })
    }

    this.mouvement.secteur = this.selsect
    this.mouvement.isactive = true;
    this.mouvement.datePhase = this.date;
    console.log(this.mouvement);
    this.mouvementService.saveMouvement(this.texteId,this.mouvement).subscribe(value => {
      console.log(value)
      this.mouvement=value;
      //this.mouvementMinistere.mouvement = this.mouvement;
      console.log(this.ministeres);

      this.ministeres.forEach(slcmins => {
        console.log(slcmins);
        //this.mouvementMinistere.ministere = slcmins;
        this.mouvementService.saveMouvementMinistere(this.mouvement.id,slcmins.id).subscribe(minmouv => {
          console.log(minmouv);
        })
      })
      window.location.reload();
    },error => console.log(error))
  }

  reloadTexte() {}

  /*  onSubmitSave() {
      this.submitted = true;
      this.saveTexte();
    }*/

  onClose(): void {
    this.dialog.closeAll();
  }

  onMinistereSelected(event:any){
    console.log(event)
  }

  makeNominat(event: any) {
    console.log(event);

  }
  getSelectedPhase(event: any) {
    console.log(event.value);
    //this.mouvement.secteur = this.selsect;

  }


  /* la recherche d'une fonction au niveau de la liste*/


  onKeyFct(event:any) {
    console.log(event.code,event.target.value);
    this.selectedMinisteres = this.searchMinist(event.target.value);
  }

  searchMinist(value: string) {
    console.log(value);
    let filter = this.ministeres.filter(item => {
        return item.libelleFr && item.libelleFr.toLowerCase().includes(value.toLowerCase());

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

  teste(target:any) {
    console.log(target)
  }

  getTypeDecret($event: any) {
    console.log($event)
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  getTexte() {
    console.log(this.texte);
  }
}
