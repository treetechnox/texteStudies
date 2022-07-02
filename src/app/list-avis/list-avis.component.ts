import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Ministere} from "../Ministere";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MinistereService} from "../service/ministere.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AddMinistereComponent} from "../add-ministere/add-ministere.component";
import {Avis} from "../Avis";
import {AddAvisComponent} from "../add-avis/add-avis.component";
import {AvisService} from "../service/avis.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-list-avis',
  templateUrl: './list-avis.component.html',
  styleUrls: ['./list-avis.component.css']
})
export class ListAvisComponent implements OnInit {

  ngOnInit(): void {
  }

  texteId!:number;
  aviss: Avis[] = [];
  avis: Avis = new Avis();
  //organisme: Organisme = new Organisme();

  displayedColumns: string[] = ['id', 'details','ministere', 'operations'];
  dataSource!: MatTableDataSource<Avis>;
  //organismes : Organisme[]= new Array();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  panelOpenState = false;

  constructor(private avisService: AvisService,
              public app: AppComponent,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) texteId:number,
              private router: Router) {

    if(texteId>0){
      this.texteId = texteId
    }
    this.avisService.getAvisByTexte(texteId).subscribe(value => {
      // @ts-ignore

      console.log(value);
      this.aviss = value;
      /*this.ministeres = value._embedded.ministeres;*/
      console.log(this.aviss);
      this.dataSource = new MatTableDataSource(this.aviss);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public localStorageItem(id: string): string {
    // @ts-ignore
    return localStorage.getItem(id);
  }


  ngAfterViewInit() {
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditAvis(id: any) {
    this.router.navigateByUrl(`lavis/${id}`);
    console.log(id)
  }

  /*onListFonctionsByOrganisme(id: any) {
    this.router.navigateByUrl(`lesfonctions/${id}/fonctions`);
    console.log(id)
  }*/


  onAddAvis(texteId:number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = texteId;
    // @ts-ignore
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    this.dialog.open(AddAvisComponent, dialogConfig);
  }

  /*onEditSecteur(id:any) {

  }*/
}
