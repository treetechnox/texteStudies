import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {CONSTRUCTOR_PARAMS} from "@angular/compiler-cli/ngcc/src/host/esm2015_host";

@Component({
  selector: 'app-delete-mouvement-dialog',
  templateUrl: './delete-mouvement-dialog.component.html',
  styleUrls: ['./delete-mouvement-dialog.component.css']
})
export class DeleteMouvementDialogComponent implements OnInit {

  phs : string ='';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef: MatDialogRef<DeleteMouvementDialogComponent>,
              private translate:TranslateService) { }

  ngOnInit(): void {
    this.phs = localStorage.getItem('lge')==='ar'? this.data.phase.libelleAr:this.data.phase.libelleFr
  }

  deleteMouvement() {


    this.translate.get('DELETE-MOUVEMENT.CONFIRM-MESSAGE').subscribe(value => {

      let message = confirm(value  + this.phs )
      if(message)
        console.log('goood')
      else
        console.log('baaad')
    })



    this.dialogRef.close(true);
  }
}
