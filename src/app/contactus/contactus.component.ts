import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Secteur} from "../Secteur";
import {SecteurService} from "../service/secteur.service";

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(public app:AppComponent, private secteurService:SecteurService) { }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
    secteur:new FormControl('',Validators.required)
  });
  secteurs: Secteur[]=[];

  ngOnInit(): void {
    this.secteurService.getAllSecteurs().subscribe(value => {
      this.secteurs = value;
    })
  }

  get f(){
    return this.form.controls;
  }

  sendMessage() {
    console.log(this.form.value);
  }
}
