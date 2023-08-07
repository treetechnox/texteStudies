import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-autorise-dialog',
  templateUrl: './autorise-dialog.component.html',
  styleUrls: ['./autorise-dialog.component.css']
})
export class AutoriseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AutoriseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
