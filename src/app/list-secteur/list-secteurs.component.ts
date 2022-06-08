import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {Secteur} from '../Secteur';
import {AddSecteurComponent} from '../add-secteur/add-secteur.component';
import {SecteurService} from '../service/secteur.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Ministere} from "../Ministere";

@Component({
  selector: 'app-list-secteurs',
  templateUrl: './list-secteurs.component.html',
  styleUrls: ['./list-secteurs.component.css']
})
export class ListSecteursComponent implements OnInit {



  ngOnInit(): void {
  }

  secteurs: Secteur[] = [];
  secteur: Secteur = new Secteur();
  //organisme: Organisme = new Organisme();

  displayedColumns: string[] = ['id', 'libelleAr','libelleFr', 'operations'];
  dataSource: any;
  //organismes : Organisme[]= new Array();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  panelOpenState = false;

  constructor(private secteurService: SecteurService,
              private dialog: MatDialog,
              private router: Router) {

    this.secteurService.getAllSecteurs().subscribe(value => {
      // @ts-ignore

      console.log(value);
      this.secteurs = value;
      /*this.secteurs = value._embedded.secteurs;*/
      console.log(this.secteurs);
      this.dataSource = new MatTableDataSource(this.secteurs);
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

  onEditSecteur(id: any) {
    this.router.navigateByUrl(`lesecteur/${id}`);
    console.log(id)
  }

  onListFonctionsByOrganisme(id: any) {
    this.router.navigateByUrl(`lesfonctions/${id}/fonctions`);
    console.log(id)
  }


  onAddSalle() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // @ts-ignore
    dialogConfig.width = '50%';
    dialogConfig.height = '20%';
    this.dialog.open(AddSecteurComponent, dialogConfig);
  }
}
