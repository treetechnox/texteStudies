import {Component, Inject, OnInit, ViewChild} from '@angular/core';
//import {Correspondance} from "../Correspondance";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
//import {CorrespondanceService} from "../service/Correspondance.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../service/authentication.service";
import {AppComponent} from "../app.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
//import {AddCorrespondanceComponent} from "../add-Correspondance/add-Correspondance.component";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Correspondance} from "../Correspondance";
import {CorrespondanceService} from "../service/correspondance.service";
import {AddCorrespondanceComponent} from "../add-correspondance/add-correspondance.component";

@Component({
  selector: 'app-list-correspondance',
  templateUrl: './list-correspondance.component.html',
  styleUrls: ['./list-correspondance.component.css']
})
export class ListCorrespondanceComponent implements OnInit {

  ngOnInit(): void {
  }

  texteId!:number;
  correspondances: Correspondance[] = [];
  correspondance: Correspondance = new Correspondance();
  //organisme: Organisme = new Organisme();
  selectedFiles: any;
  progress!: number;
  currentFileUpload: any;

  displayedColumns: string[] = ['id', 'details','ministere', 'operations'];
  dataSource!: MatTableDataSource<Correspondance>;
  //organismes : Organisme[]= new Array();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  panelOpenState = false;

  constructor(private correspondanceService: CorrespondanceService,
              private _snackBar: MatSnackBar,
              private authService:AuthenticationService,
              public app: AppComponent,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) texteId:number,
              private router: Router) {

    if(texteId>0){
      this.texteId = texteId
    }
    this.correspondanceService.getCorrespondanceByTexte(texteId).subscribe(value => {
      console.log(value);
      this.correspondances = value;
      /*this.ministeres = value._embedded.ministeres;*/
      console.log(this.correspondances);
      this.dataSource = new MatTableDataSource(this.correspondances);
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

  onEditCorrespondance(id: any) {
    this.router.navigateByUrl(`lcorrespondance/${id}`);
    console.log(id)
  }

  /*onListFonctionsByOrganisme(id: any) {
    this.router.navigateByUrl(`lesfonctions/${id}/fonctions`);
    console.log(id)
  }*/


  onAddCorrespondance(texteId:number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = texteId;
    // @ts-ignore
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    this.dialog.open(AddCorrespondanceComponent, dialogConfig);
  }

  isMinistereUser() {
    return this.authService.isMinistereUser();
  }

  onSelectFile(event: any,correspondanceId:number) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles.item(0));
    if(this.selectedFiles){
      this.uploadPdf(correspondanceId);
    }
  }

  uploadPdf(correspondanceId:number){
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    this.correspondanceService.uploadPdfScanService(this.currentFileUpload, correspondanceId).subscribe(event =>{
      console.log(event);
      if(event.type === HttpEventType.UploadProgress){
        // @ts-ignore
        this.progress = Math.round(100 * event.loaded/event.total);
        this._snackBar.open('LE PDF A ETE AJOUTE', 'FERMER', {
          duration: 2000,

        });
        alert('le Fichier est chargé');
        window.location.reload();
      }else if(event instanceof HttpResponse){
        console.log('Erreur au niveau de telechargement');
      }
      //
    }, error1 => alert("Erreur de chargement"));
  }

  showPdf(correspondanceId:number) {
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data= correspondanceId;
    // @ts-ignore
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    this.dialog.open(ShowPdfComponent, dialogConfig);*/

    this.correspondanceService.getPDF(correspondanceId).subscribe(mypdf => {
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
       this.link.download = `${this.correspondance.scanpdf}`;
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
