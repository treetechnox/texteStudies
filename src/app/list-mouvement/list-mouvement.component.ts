import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Nature} from '../Nature';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NatureService} from '../service/nature.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {AddNatureComponent} from '../add-nature/add-nature.component';
import {Mouvement} from '../Mouvement';
import {MouvementService} from '../service/mouvement.service';
import {AddMouvementComponent} from '../add-mouvement/add-mouvement.component';
import {MinistereService} from '../service/ministere.service';
import {Ministere} from '../Ministere';

@Component({
  selector: 'app-list-mouvement',
  templateUrl: './list-mouvement.component.html',
  styleUrls: ['./list-mouvement.component.css']
})
export class ListMouvementComponent implements OnInit {

  @Input()
  texteId!: number;

  dataSource: any;

  mouvement:Mouvement=new Mouvement();
  mouvements:Mouvement[] = [];

  ministere:Ministere=new Ministere();
  ministeres:Ministere[] = [];



  displayedColumns: string[] = ['id','libelleAr','libelleFr','date','etat','operations'];

  //organismes : Organisme[]= new Array();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  private date!: Date;

  constructor(private mouvementService:MouvementService,
              private  ministereService:MinistereService,
              private dialog: MatDialog,
              private router: Router) { }

  ngAfterViewInit() {
    let paginatorIntl: any;
    paginatorIntl = this.paginator?._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  ngOnInit(): void {
    this.ministereService.getAllMinistereByTopMouvementAndByTexteId(this.texteId).subscribe(value => {
      this.ministeres = value;
    });
    this.mouvementService.getMouvementByTexteId(this.texteId).subscribe(value => {
      //console.log(value);
      this.mouvements = value;
      console.log(this.mouvements);
      this.dataSource = new MatTableDataSource(this.mouvements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  addMouvement(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data=this.texteId;
    // @ts-ignore
    dialogConfig.width = '70%';
    dialogConfig.height = '50%';
    this.dialog.open(AddMouvementComponent, dialogConfig);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toFormattedDate(iso: any) {
    this.date = new Date(iso);
    //console.log(`${this.date.getDate() + 1}-${this.date.getMonth() + 1}-${this.date.getFullYear()}`);
    return `${this.date.getDate() }-${this.date.getMonth() + 1}-${this.date.getFullYear()}`;
  }

  onEditNature(id:any) {

  }
}
