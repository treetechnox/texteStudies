import {Component, Input, OnInit} from '@angular/core';
import {Nature} from "../Nature";
import {NatureService} from "../service/nature.service";
import {AppComponent} from "../app.component";
import {Ministere} from "../Ministere";
import {MinistereService} from "../service/ministere.service";

@Component({
  selector: 'app-ministere-texte',
  templateUrl: './ministere-texte.component.html',
  styleUrls: ['./ministere-texte.component.css']
})
export class MinistereTexteComponent implements OnInit {


  @Input()
  texteId!: number;

  ministeres :Ministere[] = [];
  constructor(private ministereService:MinistereService, public app:AppComponent) { }

  ngOnInit(): void {

    console.log(this.texteId)

    this.ministereService.getAllMinistereByTopMouvementAndByTexteId(this.texteId).subscribe(mnstr =>{
      this.ministeres = mnstr;
      console.log(this.ministeres[0]);
    })
  }

}
