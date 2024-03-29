import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {Reservation} from "../reservation";
import {ReservationService} from "../service/reservation.service";
import {AppComponent} from "../app.component";
import {Sort} from "@angular/material/sort";

import * as XLSX from 'xlsx';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {Texte} from "../Texte";
import {TexteService} from "../service/texte.service";
import {formatDate} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Mouvement} from "../Mouvement";
import {MouvementService} from "../service/mouvement.service";
/*
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
*/

interface TypeReservation {
  id: number;
  value: string;
}
interface Periode {
  id: number;
  value: string;
}

@Component({
  selector: 'app-rapport-textes-details',
  templateUrl: './rapport-textes-details.component.html',
  styleUrls: ['./rapport-textes-details.component.css']
})
export class RapportTextesDetailsComponent implements OnInit {

  sortedData: Mouvement[]=[];


  fileName= `RapportTextes_${formatDate(new Date().toDateString(),"dd-MM-yyyy",this.locale)}.xlsx`;
  texte: Texte= new Texte();
  mouvements:Mouvement[]=[];
  aujourdhui: Date =new Date();


  constructor(private texteService: TexteService,private mouvementService: MouvementService,public _translateSrvc: TranslateService,
              @Inject(LOCALE_ID) public locale :string,
              @Inject(MAT_DIALOG_DATA) public texteId: number,
              public app:AppComponent,) {
    setInterval(() => {
      this.aujourdhui = new Date();
    }, 1);

  }


  ngOnInit(){
    console.log(this.texteId);
    this.getTextesByUrl();

  }

  getTextesByUrl(){
    this.texteService.getTexteById(this.texteId).subscribe(value => {
      this.texte = value
      console.log(value);

      this.mouvementService.getMouvementByTexteId(this.texteId).subscribe(value1 => {
        this.mouvements = value1;
        console.log(this.mouvements);
      })

    });

  }

  public localStorageItem(id: string): string {
    // @ts-ignore
    return localStorage.getItem(id);
  }


  printing() {

    let originalContents = document.body.innerHTML;
    // @ts-ignore
    let printReport= document.getElementById('myTexteDetails').innerHTML;
    document.body.innerHTML = printReport;
    window.print();
    document.body.innerHTML = originalContents;

    /*window.print()*/
  }
  sortData(sort: Sort) {
    const data = this.mouvements.slice();
    console.log(sort);
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        /*case 'phase': return compare(a.phase, b.phase, isAsc);
        case 'date': return compare(a.datePhase, b.datePhase, isAsc);*/
        case 'id': return compare(a.id, b.id, isAsc);
        default: return 0;
      }
    });
  }

  exportexcel(): void
  {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  /*exportexcel(): void
  {
    /!* table id is passed over here *!/
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /!* generate workbook and add the worksheet *!/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /!* save to file *!/
    XLSX.writeFile(wb, this.fileName);

  }*/
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
