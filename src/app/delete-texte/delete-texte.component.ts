import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {delay} from "rxjs";
import {TexteService} from "../service/texte.service";

@Component({
  selector: 'app-delete-texte',
  templateUrl: './delete-texte.component.html',
  styleUrls: ['./delete-texte.component.css']
})
export class DeleteTexteComponent implements OnInit {


  str : string ='';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef: MatDialogRef<DeleteTexteComponent>,
              private texteService:TexteService,
              private translate:TranslateService) { }

  ngOnInit(): void {
    this.str = localStorage.getItem('lge')==='ar'? this.data.texte.sommaireAr:this.data.texte.sommaireFr;
  }

  deleteTexte() {
    this.translate.get('DELETE-TEXTE.CONFIRM-MESSAGE').subscribe(value => {
      let message = confirm(value  + this.str )
      if(message){
        console.log('goood');
        this.texteService.removeTexte(this.data.id).pipe(delay(1000)).subscribe(value1 => {
          console.log(value1);
        });
      }
      else
        console.log('baaad')
    })
    this.dialogRef.close(true);
  }
}
