import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-mouvement-dialog',
  templateUrl: './delete-mouvement-dialog.component.html',
  styleUrls: ['./delete-mouvement-dialog.component.css']
})
export class DeleteMouvementDialogComponent implements OnInit {

  phs : string ='';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef: MatDialogRef<DeleteMouvementDialogComponent>) { }

  ngOnInit(): void {
  }

  deleteMouvement() {
    this.phs = localStorage.getItem('lge')==='ar'? this.data.phase.libelleAr:this.data.phase.libelleFr
    let message = confirm('voulez vous vraiment supprimer ' + this.phs )
    if(message)
      console.log('goood')
    else
      console.log('baaad')

    this.dialogRef.close(true);
  }
}
