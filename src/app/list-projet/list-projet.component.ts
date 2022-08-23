import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
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
import {FormGroup, NgForm, Validators} from "@angular/forms";
import {AddPhaseComponent} from "../add-phase/add-phase.component";
import {AddAvisComponent} from "../add-avis/add-avis.component";
import {Avis} from "../Avis";
import {AvisService} from "../service/avis.service";
import {noAuto} from "@fortawesome/fontawesome-svg-core";
import {ListAvisComponent} from "../list-avis/list-avis.component";
import {User} from "../user";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {Nature} from "../Nature";
import {NatureService} from "../service/nature.service";
import {formatDate} from "@angular/common";
import {AddCorrespondanceComponent} from "../add-correspondance/add-correspondance.component";
import {ListCorrespondanceComponent} from "../list-correspondance/list-correspondance.component";
import {RapportJournalierComponent} from "../rapport-journalier/rapport-journalier.component";
import {MatInput} from "@angular/material/input";
import {ThemePalette} from "@angular/material/core";
import {delay} from "rxjs";

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

  @ViewChild('myForm') myForm!: NgForm;

  filter:any;
  columnsToDisplay: string[] = ['id', 'nature','sommaireAr', 'sommaireFr','refer','details'];

  texte:Texte=new Texte();

  dateFrom: string='';
  dateTo: string='';

  allAvis:string='';

  totalElements : number | undefined;
  totalPages: number | undefined;
  page: number =0;
  size: number =15;


  mouvement:Mouvement = new Mouvement();
  mouvements:Mouvement[] = [];
  ministere:Ministere = new Ministere();
  ministeres:Ministere[] = [];

  phase:Phase = new Phase();
  phases:Phase[] = [];

  nature:Nature = new Nature();
  natures:Nature[] = [];

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

  //public page = 1;

  public pageLabel!: string;
  disabled: boolean=false;
  isFilter: boolean = false;

  authenticated!:User | undefined;

  nodeTree: any;
  direction: string = this.app.localStorageItem('lge') === 'fr' ? 'ltr' : 'rtl';
  isActive!:boolean;

/*  myActivity = new Map();*/

  activityAR:Array<string>=['لا','نعم']!;
  activityFR:Array<string>=['NON','OUI']!;

  isLoading=true;

  constructor(private texteService: TexteService,
              private avisService:AvisService,
              private mouvementService:MouvementService,
              private phaseService:PhaseService,
              private natureService:NatureService,
              private secteurService:SecteurService,
              private ministereService:MinistereService,
              private authService:AuthenticationService,
              @Inject(LOCALE_ID) public locale :string,
              /*private fonctionService: FonctionService,*/
              private router: Router,public app:AppComponent,
              private dialog:MatDialog) {
    this.loadTextes();
  }


  loadTextes(){
    this.isLoading=true;
    this.isFilter=false;
    this.authenticated = this.authService.userAuthenticated;
    console.log(this.authenticated?.id);
    if (this.isAdmin()){
      this.texteService.getAllTextesByPages(this.page,this.size)
        .pipe(delay(1000))
        .subscribe(value => {
        this.isLoading = false;
        // @ts-ignore
        this.textes = value.content;
        // @ts-ignore
        this.totalElements = value.totalElements;
        //console.log(this.textes);
        this.dataSource = new MatTableDataSource(this.textes);
        // @ts-ignore
        //this.dataSource.paginator = this.paginator;
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
      /*    this.ministereService.getMinistereById(result).subscribe(value => {
            console.log(value.libelleFr);*/
      this.texteService.getAllTextesByMinistere(result as unknown as number)
        .pipe(delay(1000)).subscribe(value1 => {
        this.isLoading = false;

        // @ts-ignore
        this.textes = value1.sort((a:any,b:any) => b.id - a.id);
        this.dataSource = new MatTableDataSource(this.textes);
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
        // @ts-ignore
        this.dataSource.sort = this.sort;
      })
      /*     })*/
    }else {
      // @ts-ignore
      this.texteService.getAllTextesBySecteur(this.authService.userAuthenticated.secteur.id)
        .pipe(delay(1000)).subscribe(value => {
        this.isLoading = false;
        this.textes = value.sort((a:any,b:any) => b.id - a.id);
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

    this.phaseService.getAllPhases().subscribe(phe => {
      this.phases = phe;
    },error => console.log('phases not found'));
    this.natureService.getAllNatures().subscribe(ntr => {
      this.natures = ntr;
    },error => console.log('phases not found'));
    this.secteurService.getAllSecteurs().subscribe(sct => {
      this.secteurs = sct;
    },error => console.log('secteurs not found'));
    this.ministereService.getAllMinisteres().subscribe(mnst => {
      this.ministeres = mnst;
    },error => console.log('phases not found'));
    //this.columns = this.app.localStorageItem('lge') === 'fr' ? this.columnsToDisplayFr: this.columnsToDisplayAr;
    // @ts-ignore
    const paginatorIntl= this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.itemsPerPageLabel=this.app.localStorageItem('lge') === 'fr' ? 'NOMBRE PAR PAGE:' : 'العدد في كل صفحة:';
    /*paginatorIntl.itemsPerPageLabel='';*/
    paginatorIntl.previousPageLabel = '';
  }


  @ViewChild('fromInput', {read: MatInput}) fromInput!: MatInput;
  @ViewChild('toInput', {read: MatInput}) toInput!: MatInput;

  @ViewChild('phs', {read: MatSelect}) phs!: MatSelect;
  @ViewChild('ntr', {read: MatSelect}) ntr!: MatSelect;
  @ViewChild('atv', {read: MatSelect}) atv!: MatSelect;
  @ViewChild('sct', {read: MatSelect}) sct!: MatSelect;
  @ViewChild('mst', {read: MatSelect}) mst!: MatSelect;



  resetFrom() {
    this.fromInput.value = '';
    this.dateFrom='';

  }
  resetTo() {
    this.toInput.value = '';
    this.dateTo = '';
  }

  /*    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      console.log(filterValue);*/

  applyFilter(input: any) {
    this.isFilter=true;
    this.isLoading = true;
    const filterValue = input;
    console.log(filterValue);

    this.texteService.getAllTextesLikeSommaire(filterValue).pipe(delay(1000)).subscribe(value => {
      this.isLoading = false;
      this.textes = value.sort((a:any,b:any) => b.id - a.id);
      console.log(this.textes);
      this.dataSource = new MatTableDataSource(this.textes);
      this.dataSource.paginator = this.paginator!;
      this.totalElements = this.textes.length
      console.log(this.textes.length);
      this.dataSource.sort = this.sort!;
    });

  /*  this.dataSource.filter = filterValue.trim().toLowerCase();*/
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
    this.mouvement.phase = this.phase;
    // @ts-ignore

    if(this.authService.isUser()){
      // @ts-ignore
      this.mouvement.secteur = this.authService.userAuthenticated.secteur;
      console.log( '111'+this.mouvement.secteur)
    }else{
      this.mouvement.secteur= this.secteur;
      console.log('222'+this.mouvement.secteur)
    }

    if(this.isMinistereUser()){
      console.log(this.authService.userAuthenticated?.role);
    }

    // @ts-ignore
    this.mouvement.texte?.nature=this.nature;
    this.mouvement.isactive = this.isActive;

    this.mouvementService.getFilter(this.mouvement.phase.id,
      this.nature.id,
      this.mouvement.secteur.id,
      this.ministere.id,
      this.mouvement.isactive,
      this.dateFrom,
      this.dateTo,
      100000)
      .subscribe(value => {
       /* this.mouvements=value._embedded.mouvements.sort((a,b) => a.id.rendered.localeCompare(b.id.rendered));*/
      this.mouvements = value._embedded.mouvements;

        //this.totalElements = value.page.totalElements;
/*
        this.totalPages = value.page.totalPages;
        this.actualPage = value.page.number;

      console.log(this.totalElements,this.totalPages,this.actualPage);
*/

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
          this.dataSource.paginator = this.paginator!;
          this.dataSource.sort = this.sort!;
          console.log(this.textes)
        })
      })
    });
    console.log(this.mouvement);
  }

  OnPrint() {

    let sub_url = 'http://localhost:8083/mouvements?';
    if(this.mouvement.phase?.id>0)
      sub_url+=`&phase=${this.mouvement.phase?.id}`;
    if(this.nature.id>0)
      sub_url+=`&texte.nature.id=${this.nature.id}`;
    // @ts-ignore
    if(this.mouvement.secteur?.id>0)
      sub_url+=`&secteur=${this.mouvement.secteur?.id}`;
    if(this.ministere.id>0)
      sub_url+=`&mouvementMinisteres.ministere=${this.ministere.id}`;
    if(this.isActive===true)
      sub_url+=`&isactive=${this.isActive}`
    else if (this.isActive===false)
      sub_url+=`&isactive=${this.isActive}`;
    if (this.dateFrom!=='')
      sub_url+=`&datePhase=${this.dateFrom}`;
    if (this.dateTo!=='')
      sub_url+=`&datePhase=${(this.dateTo)}`;

    sub_url+='&sort=id,desc&size='+100000;
    console.log(sub_url);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data=sub_url;
    // @ts-ignore
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    this.dialog.open(RapportJournalierComponent, dialogConfig);


  }

  onGetPhase(event: any) {
    this.phase=event.value;
    console.log(this.phase);
    if (this.phase=== undefined ){
      this.phase = new Phase();
    }
  }
  onGetNature(event: any) {
    this.nature=event.value;
    console.log(this.nature);
    if (this.nature=== undefined ){
      this.nature = new Phase();
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
      dialogConfig.width = '50%';
      dialogConfig.height = '50%';
      this.dialog.open(AddAvisComponent, dialogConfig);

  }

  ajouterCorrespondance(texteId:number) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data=texteId;
      // @ts-ignore
      dialogConfig.width = '50%';
      dialogConfig.height = '50%';
      this.dialog.open(AddCorrespondanceComponent, dialogConfig);
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

  onShowListCorrespondance(texteId:number) {
    const dialogConfigList = new MatDialogConfig();
    dialogConfigList.disableClose = false;
    dialogConfigList.autoFocus = true;
    dialogConfigList.data=texteId;
    // @ts-ignore
    dialogConfigList.width = '60%';
    dialogConfigList.height = '50%px';
    this.dialog.open(ListCorrespondanceComponent, dialogConfigList);
  }

  onGetIsActive($event: MatSelectChange) {
    console.log( $event.value);
    $event.value === '1'? this.isActive=true:this.isActive=false;
    if ($event.value===undefined)
      { // @ts-ignore
        this.isActive= null;
      }
    console.log(this.isActive);
  }

  toFormattedDate(date: any) {
    /*    console.log(iso)
        this._adapter.setLocale('fr');*/
    /*this.mouvement.datePhase = date*/
    formatDate(date.toDateString(),"yyyy-MM-dd",this.locale);
    console.log(this.mouvement.datePhase)

  }

  /*nextPage($event: PageEvent) {
    console.log($event);
  }*/
  background: ThemePalette = "primary";

  getTextes(page:number,size:number){
    this.isLoading=true;
    this.texteService.getAllTextesByPages(this.page,this.size).pipe(delay(1000))
      .subscribe(data => {
          this.isLoading = false;
        console.log(data)
          // @ts-ignore
          this.textes = data.content;
          console.log(this.textes);
          this.dataSource = new MatTableDataSource(this.textes);
          // @ts-ignore
          this.totalElements = data.totalElements;
          console.log(this.totalElements);
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  nextPage(event: PageEvent) {
    console.log(event);
    if (this.isAdmin() && !this.isFilter){
      // @ts-ignore
      this.page = event.pageIndex.toString();
      // @ts-ignore
      this.size = event.pageSize.toString();
      this.getTextes(this.page,this.size);
    }
  }

  setDateFrom(value: any) {
    this.dateFrom =formatDate(value.toDateString(),"yyyy-MM-dd",this.locale);
    console.log(this.dateFrom);
  }

  setDateTo(value: any) {
    this.dateTo =formatDate(value.toDateString(),"yyyy-MM-dd",this.locale);
    console.log(this.dateTo);
  }

  resetForm() {

    this.page=0;
    this.size=15;

    /* Phase */
    this.phase=new Phase();
    this.phs.value = null;

    /* Nature */
    this.nature=new Nature();
    this.ntr.value = null;

    /* Secteur */
    this.mouvement.secteur=new Secteur();
    this.sct.value = null;

    /* Active */
    this.isActive = null as any;
    this.atv.value = -1;

    /* Ministere */
    this.ministere= new Ministere();
    this.mst.value = null;

    /* Date From */
    this.dateFrom='';
    this.fromInput.value = '';

    /* Date To */
    this.dateTo='';
    this.toInput.value = '';

    this.loadTextes();
  }
}

