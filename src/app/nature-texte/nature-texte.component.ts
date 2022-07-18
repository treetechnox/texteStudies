import {Component, Input, OnInit} from '@angular/core';
import {NatureService} from "../service/nature.service";
import {Nature} from "../Nature";

@Component({
  selector: 'app-nature-texte',
  templateUrl: './nature-texte.component.html',
  styleUrls: ['./nature-texte.component.css']
})
export class NatureTexteComponent implements OnInit {

  @Input()
  texteId!: number;

  nature :Nature = new Nature();
  constructor(private natureService:NatureService) { }

  ngOnInit(): void {
    this.natureService.getNatureByTexteIdWithinURI(this.texteId).subscribe(ntr =>{
      console.log(ntr);
      this.nature = ntr._embedded.natures[0];
    })
  }

}
