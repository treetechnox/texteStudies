import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Texte} from "../Texte";
import {TexteService} from "../service/texte.service";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-portail-ministeres',
  templateUrl: './portail-ministeres.component.html',
  styleUrls: ['./portail-ministeres.component.css']
})
export class PortailMinisteresComponent implements OnInit {


  selectedResult: any;
  textes:Texte[] = [];


  length: number | undefined;
  pageSize = 2;
  pageSizeOptions: number[] = [10, 15, 20, 100];
  pageEvent: PageEvent | undefined;

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private texteService:TexteService,private authenticationService:AuthenticationService) {
    this.authenticationService.loadAuthenticatedUserFromLocalStorage();
    //this.texteService.getAllTextesByMinistere(this.authenticationService.userAuthenticated)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  getData( event?: PageEvent) {
    console.log(event);
    // @ts-ignore
    this.selectedResult = this.textes.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
    console.log(this.selectedResult);
    return event;
  }

  ngOnInit() {
    console.log('this is ok');
    // this.adminService.getCandidateResult().subscribe(response => {
    //   this.results = response.resultList;
    this.length = this.textes.length;
    this.selectedResult = this.textes.slice(0, this.pageSize);
    //   this.isLoading = false;
    // });
    //


  }

}
