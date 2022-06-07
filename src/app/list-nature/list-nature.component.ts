import {Component, OnInit, ViewChild} from '@angular/core';
import {Nature} from '../Nature';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NatureService} from '../service/nature.service';
import {MatTableDataSource} from '@angular/material/table';
import {AddMinistereComponent} from '../add-ministere/add-ministere.component';
import {AddNatureComponent} from '../add-nature/add-nature.component';

@Component({
  selector: 'app-list-nature',
  templateUrl: './list-nature.component.html',
  styleUrls: ['./list-nature.component.css']
})
export class ListNatureComponent implements OnInit {
  dataSource: any;

  nature:Nature=new Nature();
  natures:Nature[] = [];

  displayedColumns: string[] = ['id','libelleAr','libelleFr'];

  //organismes : Organisme[]= new Array();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private natureService:NatureService,
              private dialog: MatDialog,
              private router: Router) { }

  ngAfterViewInit() {
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  ngOnInit(): void {
    this.natureService.getAllNatures().subscribe(value => {
      this.natures = value;
      this.dataSource = new MatTableDataSource(this.natures);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  addNature(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // @ts-ignore
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    this.dialog.open(AddNatureComponent, dialogConfig);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditNature(id:any) {

  }
}
