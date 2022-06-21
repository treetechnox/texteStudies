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
  selector: 'app-rapport-journalier',
  templateUrl: './rapport-journalier.component.html',
  styleUrls: ['./rapport-journalier.component.css']
})
export class RapportJournalierComponent implements OnInit {

  sortedData: Texte[]=[];


  fileName= `RapportTextes_${formatDate(new Date().toDateString(),"dd-MM-yyyy",this.locale)}.xlsx`;
  textes: Texte[]=[];

  /*periode_fr: Periode[] = [
    {id: 0, value: 'MATIN'},
    {id: 1, value: 'APRES MIDI'}
  ];
  periode_ar: Periode[] = [
    {id: 0, value: 'الصباح'},
    {id: 1, value: 'بعد الظهيرة'}
  ];*/
  aujourdhui: Date =new Date();


  constructor(private texteService: TexteService,public _translateSrvc: TranslateService,
              @Inject(LOCALE_ID) public locale :string,
              public app:AppComponent,) {
    setInterval(() => {
      this.aujourdhui = new Date();
    }, 1);

  }


  ngOnInit(){
    this.getTextes();

  }

  getTextes(){
    this.texteService.getAllTextes().subscribe(value => {
      console.log(value)
      this.textes = value;

      console.log(value[0])
      this.sortedData = value; console.log(this.sortedData)
    });
  }

  public localStorageItem(id: string): string {
    // @ts-ignore
    return localStorage.getItem(id);
  }


  printing() {
    window.print()
  }
  sortData(sort: Sort) {
    const data = this.textes.slice();
    console.log(sort);
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'sommaireFr': return compare(a.sommaireFr, b.sommaireFr, isAsc);
        case 'sommaireAr': return compare(a.sommaireAr, b.sommaireAr, isAsc);
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
