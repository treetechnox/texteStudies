import {Component, OnInit, ViewChild} from '@angular/core';
import {Salle} from '../salle';
import {MatSort} from '@angular/material/sort';
import {SalleService} from '../service/salle.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Phase} from '../phase';
import {PhaseService} from '../service/phase.service';
import {AddPhaseComponent} from '../add-phase/add-phase.component';

@Component({
  selector: 'app-list-phase',
  templateUrl: './list-phase.component.html',
  styleUrls: ['./list-phase.component.css']
})
export class ListPhasesComponent implements OnInit {

  ngOnInit(): void {
  }

  phases: Phase[] = [];
  phase: Phase = new Phase();
  //organisme: Organisme = new Organisme();

  displayedColumns: string[] = ['id', 'libelleAr','libelleFr', 'operations'];
  dataSource:any;
  //organismes : Organisme[]= new Array();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  panelOpenState = false;

  constructor(private phaseService: PhaseService,
              private dialog: MatDialog,
              private router: Router) {

    this.phaseService.getAllPhases().subscribe(value => {
      this.phases = value;
      console.log(value);
      this.dataSource = new MatTableDataSource(value);
      console.log(this.dataSource._data._value[0]);
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

  onEditPhase(id: any) {
    this.router.navigateByUrl(`laphase/${id}`);
    //console.log(id)
  }

  onListFonctionsByOrganisme(id: any) {
    this.router.navigateByUrl(`lesfonctions/${id}/fonctions`);
    //console.log(id)
  }


  onAddPhase() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // @ts-ignore
    dialogConfig.width = '400px';
    dialogConfig.height = '330px';
    this.dialog.open(AddPhaseComponent, dialogConfig);
  }

  /*  onEditPOPUPSalle() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      // @ts-ignore
      dialogConfig.width = '50%';
      dialogConfig.height = '20%';
      this.dialog.open(EditSalleComponent, dialogConfig);
    }*/

}


