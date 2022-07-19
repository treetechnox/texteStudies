import {Component, Input, OnInit} from '@angular/core';
import {NatureService} from "../service/nature.service";
import {Nature} from "../Nature";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-nature-texte',
  templateUrl: './nature-texte.component.html',
  styleUrls: ['./nature-texte.component.css']
})
export class NatureTexteComponent implements OnInit {

  @Input()
  texteId!: number;

  nature :Nature = new Nature();
  constructor(private natureService:NatureService, public app:AppComponent) { }

  ngOnInit(): void {
    this.natureService.getNatureByTexteIdWithinURI(this.texteId).subscribe(ntr =>{

      this.nature = ntr._embedded.natures[0];
      console.log(this.nature);

    })
  }

}
