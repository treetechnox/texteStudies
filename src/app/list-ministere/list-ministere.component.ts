import {Component, OnInit, ViewChild} from '@angular/core';
import {Ministere} from '../Ministere';
import {MatSort} from '@angular/material/sort';
import {MinistereService} from '../service/ministere.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {AddMinistereComponent} from '../add-ministere/add-ministere.component';

@Component({
  selector: 'app-list-ministere',
  templateUrl: './list-ministere.component.html',
  styleUrls: ['./list-ministere.component.css']
})
export class ListMinistereComponent implements OnInit {

  ngOnInit(): void {
  }

  ministeres: Ministere[] = [];
  ministere: Ministere = new Ministere();
  //organisme: Organisme = new Organisme();

  displayedColumns: string[] = ['id', 'libelleAr','libelleFr', 'operations'];
  dataSource!: MatTableDataSource<Ministere>;
  //organismes : Organisme[]= new Array();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  panelOpenState = false;

  constructor(private ministereService: MinistereService,
              private dialog: MatDialog,
              private router: Router) {

    this.ministereService.getAllMinisteres().subscribe(value => {
      // @ts-ignore

      console.log(value);
      this.ministeres = value;
      /*this.ministeres = value._embedded.ministeres;*/
      console.log(this.ministeres);
      this.dataSource = new MatTableDataSource(this.ministeres);
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

  onEditMinistere(id: any) {
    this.router.navigateByUrl(`leministere/${id}`);
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
    dialogConfig.height = '40%';
    this.dialog.open(AddMinistereComponent, dialogConfig);
  }


}
