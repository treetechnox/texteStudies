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
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddPhaseComponent} from "../add-phase/add-phase.component";
import {ShowPdfComponent} from "../show-pdf/show-pdf.component";

@Component({
  selector: 'app-list-mouvement',
  templateUrl: './list-mouvement.component.html',
  styleUrls: ['./list-mouvement.component.css']
})
export class ListMouvementComponent implements OnInit {

  @Input()
  texteId!: number;

  link: any;

  dataSource: any;

  mouvement:Mouvement=new Mouvement();
  mouvements:Mouvement[] = [];

  ministere:Ministere=new Ministere();
  ministeres:Ministere[] = [];

  etat:boolean=false;


  displayedColumns: string[] = ['id','libelleAr','libelleFr','date','etat','operations'];

  //organismes : Organisme[]= new Array();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
   date!: Date;
   progress!: number;
   selectedFiles: any;
   currentFileUpload: any;

  constructor(private mouvementService:MouvementService,
              private _snackBar: MatSnackBar,
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

  onSelectFile(event: any,mouvementId:number) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles.item(0));
    if(this.selectedFiles){
      this.uploadPdf(mouvementId);
    }
  }

  uploadPdf(mouvementId:number){
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    this.mouvementService.uploadPdfScanService(this.currentFileUpload, mouvementId).subscribe(event =>{
      console.log(event);
      if(event.type === HttpEventType.UploadProgress){
        // @ts-ignore
        this.progress = Math.round(100 * event.loaded/event.total);
        this._snackBar.open('LE PDF A ETE AJOUTE', 'FERMER', {
          duration: 2000,

        });
        alert('le Fichier est chargé');
      }else if(event instanceof HttpResponse){
        console.log('Erreur au niveau de telechargement');
      }
      window.location.reload();
    }, error1 => alert("Erreur de chargement"));
  }

  showPdf(mouvementId:number) {
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data= mouvementId;
    // @ts-ignore
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    this.dialog.open(ShowPdfComponent, dialogConfig);*/

      this.mouvementService.getPDF(mouvementId).subscribe(mypdf => {
        var newBlob = new Blob([mypdf],{type:"application/pdf"});
        // @ts-ignore
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // @ts-ignore
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const downloadURL = URL.createObjectURL(newBlob);
        window.open(downloadURL);


        /**
         * TO DOWNLOAD THE PDF


        const data = window.URL.createObjectURL(newBlob);

        this.link = document.createElement('a');
        console.log(this.link);
        this.link.href = data;
        this.link.download = `${this.mouvement.scanpdf}`;
        // this is necessary as link.click() does not work on the latest firefox
        this.link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));


         */
        /*setTimeout(() => {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(window.URL.createObjectURL(newBlob));
          this.link.remove();
        }, 100);*/
      });

  }

}

