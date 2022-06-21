import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
// @ts-ignore
//import {MatDialog, MatSort} from '@angular/material';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AppComponent} from '../app.component';
import {Texte} from '../Texte';
import {TexteService} from '../service/texte.service';
import {Mouvement} from '../Mouvement';
import {Phase} from '../phase';
import {Secteur} from '../Secteur';
import {MouvementService} from '../service/mouvement.service';
import {PhaseService} from '../service/phase.service';
import {SecteurService} from '../service/secteur.service';
import {MinistereService} from '../service/ministere.service';
import {Ministere} from '../Ministere';
import {AuthenticationService} from '../service/authentication.service';
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {pdfDefaultOptions} from "ngx-extended-pdf-viewer";
import {NgForm} from "@angular/forms";
import {AddPhaseComponent} from "../add-phase/add-phase.component";
import {AddAvisComponent} from "../add-avis/add-avis.component";
import {Avis} from "../Avis";
import {AvisService} from "../service/avis.service";
import {noAuto} from "@fortawesome/fontawesome-svg-core";
import {ListAvisComponent} from "../list-avis/list-avis.component";
import {User} from "../user";

export interface MouvementMinistere{
  id: number;
  mouvement:Mouvement;
  ministere:Ministere;
}



/** Constants used to fill up our data base. */

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ListProjetComponent implements AfterViewInit {

  filter:any;
  columnsToDisplay: string[] = ['id', 'sommaireAr', 'sommaireFr','refer','details'];

  texte:Texte=new Texte();

  allAvis:string='';

  mouvement:Mouvement = new Mouvement();
  mouvements:Mouvement[] = [];
  ministere:Ministere = new Ministere();
  ministeres:Ministere[] = [];

  phase:Phase = new Phase();
  phases:Phase[] = [];
  mouvementMinistere:MouvementMinistere=new class implements MouvementMinistere {
    id!: number;
    ministere!: Ministere;
    mouvement!: Mouvement;
  }

  secteur:Secteur = new Secteur();
  secteurs:Secteur[] = [];

  dataSource: MatTableDataSource<Texte> = new MatTableDataSource<Texte>();

  avis:Avis=new Avis();
  aviss: Avis[]=[];
  textes : Texte[]= new Array();
  textes1 : Texte[]= new Array();
  expandedElement: Texte | null | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  public page = 1;

  public pageLabel!: string;
  private disabled: boolean=false;

  authenticated!:User | undefined;

  constructor(private texteService: TexteService,
              private avisService:AvisService,
              private mouvementService:MouvementService,
              private phaseService:PhaseService,
              private secteurService:SecteurService,
              private ministereService:MinistereService,
              private authService:AuthenticationService,
              /*private fonctionService: FonctionService,*/
              private router: Router,public app:AppComponent,
              private dialog:MatDialog) {
    this.authenticated = this.authService.userAuthenticated;
    console.log(this.authenticated?.id);
    if (this.isAdmin()){
      this.texteService.getAllTextes().subscribe(value => {
        this.textes = value;
        //console.log(this.textes);
        this.dataSource = new MatTableDataSource(this.textes);
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
        // @ts-ignore
        this.dataSource.sort = this.sort;
      })
    }else if (this.isMinistereUser()){
      let str= this.authenticated?.username;
      let n!: any;
      if(str !==''){
        n = str?.lastIndexOf('_');
        console.log(n);
      }
      let result = str?.substring(n + 1)
      console.log(result);
      this.ministereService.getMinistereById(result).subscribe(value => {
        this.texteService.getAllTextesByMinistere(value.libelleFr).subscribe(value1 => {
          this.textes = value1;
          this.dataSource = new MatTableDataSource(this.textes);
          // @ts-ignore
          this.dataSource.paginator = this.paginator;
          // @ts-ignore
          this.dataSource.sort = this.sort;
        })
      })
    }else {
      // @ts-ignore
      this.texteService.getAllTextesBySecteur(this.authService.userAuthenticated.secteur.id).subscribe(value => {
        this.textes = value;
        console.log(this.textes);
        this.dataSource = new MatTableDataSource(this.textes);
        this.dataSource.paginator = this.paginator!;
        this.dataSource.sort = this.sort!;
      })
    }
  }

  ngAfterViewInit() {

    type DirectionStatus = 'ltr' | 'rtl';

// 👇️ type is EmailStatus (not string)
    let status = 'ltr' as DirectionStatus; // 👈️ use type assertion
    status = 'rtl';

    const current: DirectionStatus = status;

    console.log(current); // 👉️ "read"

    this.phaseService.getAllPhases().subscribe(value => {
      this.phases = value;
    },error => console.log('phases not found'));
    this.secteurService.getAllSecteurs().subscribe(value => {
      this.secteurs = value;
    },error => console.log('secteurs not found'));
    this.ministereService.getAllMinisteres().subscribe(value => {
      this.ministeres = value;
    },error => console.log('phases not found'));
    //this.columns = this.app.localStorageItem('lge') === 'fr' ? this.columnsToDisplayFr: this.columnsToDisplayAr;
    // @ts-ignore
    const paginatorIntl= this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.itemsPerPageLabel=this.app.localStorageItem('lge') === 'fr' ? 'NOMBRE DES ORGANISMES PAR PAGE:' : 'عدد المنظمات في كل صفحة:';
    /*paginatorIntl.itemsPerPageLabel='';*/
    paginatorIntl.previousPageLabel = '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    // @ts-ignore
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditTexte(id: any) {
    this.router.navigateByUrl(`letexte/${id}`);
    //console.log(id)
  }

  onListFonctionsByOrganisme(id: any) {
    this.router.navigateByUrl(`lesorganismes/${id}/fonctions`);
    //console.log(id)
  }

  toggle(item:any) {
    console.log(item);
    item.isOpen = !item.isOpen;
  }

  searchOrg(value: string):any {
    this.filter = this.textes.filter(item =>{
        return item.sommaireFr && item.sommaireFr.toLowerCase().includes(value.toLowerCase());

      }
    );
    return [...this.filter];
  }

  private nodeTree: any;
  direction: string = this.app.localStorageItem('lge') === 'fr' ? 'ltr' : 'rtl';


  public localStorageItem(id: string): string {
    // @ts-ignore
    return localStorage.getItem(id);
  }


  onAddProjet() {
    this.router.navigateByUrl(`lajoutprojet`);
  }

  getTree(element: any) {
    console.log(element.children.sort((a: { id: number; }, b: { id: number; })=>a.id-b.id));
    this.nodeTree = element;
  }



  setMinistere(event: any) {
    console.log(event);
  }

  OnFilter() {
    // @ts-ignore
    this.mouvements=[];

    this.textes=[];
    this.textes1=[];

    this.dataSource = new MatTableDataSource();
    this.mouvement.phase = this.phase
    this.mouvement.secteur= this.secteur;

    this.mouvementService.getFilter(this.mouvement.phase.id,this.mouvement.secteur.id,this.ministere.id)
      .subscribe(value => {
       /* this.mouvements=value._embedded.mouvements.sort((a,b) => a.id.rendered.localeCompare(b.id.rendered));*/
      this.mouvements = value._embedded.mouvements;
      console.log(this.mouvements);

      this.mouvements.forEach(value1 => {
        this.texteService.getTexteByMouvementId(value1.id).subscribe(texte=>{

          if (!this.textes1.some((item) => item.id == texte.id)) {
            this.textes1.push(texte);
          }
          /*
          this.textes1.indexOf(texte.id) === -1 ? this.textes1.push(texte) : console.log("This item already exists");*/
          this.textes = this.textes1;
          this.dataSource= new MatTableDataSource(this.textes.sort((a: { id: number; }, b: { id: number; }) => b.id-a.id));
          console.log(this.textes)
        })
      })
    });
    console.log(this.mouvement);
  }

  onGetPhase(event: any) {
    this.phase=event.value;
    console.log(this.phase);
    if (this.phase=== undefined ){
      this.phase = new Phase();
    }
  }
  onGetSecteur(event: any) {
    this.secteur=event.value;
    console.log(this.secteur);
    if (this.secteur=== undefined ){
      this.secteur = new Secteur();
    }
  }
  onGetMinistere(event: any) {
    this.ministere=event.value;
    console.log(this.ministere);
    if (this.ministere=== undefined ){
      this.ministere = new Ministere();
    }
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isMinistereUser() {
    //console.log(this.authService.isMinistereUser());
    return this.authService.isMinistereUser();
  }

  reset(form:NgForm) {
    console.log(form)
    form.reset();
  }

  ajouterAvis(texteId:number) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data=texteId;
      // @ts-ignore
      dialogConfig.width = '400px';
      dialogConfig.height = '330px';
      this.dialog.open(AddAvisComponent, dialogConfig);

  }

  getListAvissByTxtId(texteId:number) {
    this.avisService.getAvisByTexte(texteId).subscribe({
      next:value => {
        console.log(value);
          this.aviss = value;
        this.aviss.forEach(value => {
          this.allAvis+=('- '+value.ministere.libelleFr+': '+value.details+'\n');
        })
        console.log(this.allAvis)
      },
      complete:() => console.log("Avis chargées"),
      error:err => console.log(err)
    })
  }

  makeDisabled(texteId:number) {
    this.aviss=[];this.allAvis='';
    console.log(texteId,this.disabled);
    this.disabled = false;
    this.getListAvissByTxtId(texteId);


  }


  onShowListAvis(texteId:number) {
    const dialogConfigList = new MatDialogConfig();
    dialogConfigList.disableClose = false;
    dialogConfigList.autoFocus = true;
    dialogConfigList.data=texteId;
    // @ts-ignore
    dialogConfigList.width = '60%';
    dialogConfigList.height = '50%px';
    this.dialog.open(ListAvisComponent, dialogConfigList);
  }
}

