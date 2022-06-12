import {Component, Inject, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MouvementService} from "../service/mouvement.service";
import {Mouvement} from "../Mouvement";

@Component({
  selector: 'app-show-pdf',
  templateUrl: './show-pdf.component.html',
  styleUrls: ['./show-pdf.component.css']
})
export class ShowPdfComponent implements OnInit {
link:any;

mouvement:Mouvement=new Mouvement();

  constructor(public app:AppComponent,private route: ActivatedRoute,private router: Router,
              private mouvementService:MouvementService,
              @Inject(MAT_DIALOG_DATA) public mouvementId: number) {

    console.log(mouvementId);
  }



  ngOnInit(): void {

    this.mouvementService.getMouvementById(this.mouvementId).subscribe(value => {
      this.mouvement = value;
    this.mouvementService.getPDF(this.mouvement.id).subscribe(mypdf => {
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
      const data = window.URL.createObjectURL(newBlob);

      this.link = document.createElement('a');
      console.log(this.link);
      this.link.href = data;
      this.link.download = `${this.mouvement.scanpdf}`;
      // this is necessary as link.click() does not work on the latest firefox
      this.link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      /*setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        this.link.remove();
      }, 100);*/
    });
    });
  }


}
