import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {CONSTRUCTOR_PARAMS} from "@angular/compiler-cli/ngcc/src/host/esm2015_host";
import {MouvementService} from "../service/mouvement.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-delete-mouvement-dialog',
  templateUrl: './delete-mouvement-dialog.component.html',
  styleUrls: ['./delete-mouvement-dialog.component.css']
})
export class DeleteMouvementDialogComponent implements OnInit {

  phs : string ='';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef: MatDialogRef<DeleteMouvementDialogComponent>,
              private mouvementService:MouvementService,
              private translate:TranslateService) { }

  ngOnInit(): void {
    this.phs = localStorage.getItem('lge')==='ar'? this.data.phase.libelleAr:this.data.phase.libelleFr;
    console.log(this.phs);
  }

  deleteMouvement() {


    this.translate.get('DELETE-MOUVEMENT.CONFIRM-MESSAGE').subscribe(value => {

      let message = confirm(value  + this.phs )
      if(message){
        console.log('goood');
        this.mouvementService.removeMouvement(this.data.mouveId).pipe(delay(1000)).subscribe(value1 => {
          console.log(value1);
          this.mouvementService.getTopMouvementByTexteIdDesc(this.data.txtId).subscribe(topmouve =>{
            console.log(topmouve);
            topmouve.isactive = true;
            this.mouvementService.updateMouvementIsActive(topmouve.id,topmouve).subscribe(updatedmouve => {
              console.log(updatedmouve);
            })
          } )
        })

      }
      else
        console.log('baaad')
    })



    this.dialogRef.close(true);
  }
}
