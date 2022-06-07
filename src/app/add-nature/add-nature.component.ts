import { Component, OnInit } from '@angular/core';
import {Nature} from '../Nature';
import {NatureService} from '../service/nature.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {AuthenticationService} from '../service/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-nature',
  templateUrl: './add-nature.component.html',
  styleUrls: ['./add-nature.component.css']
})
export class AddNatureComponent implements OnInit {

  nature:Nature=new Nature();

  submitted: any;

  constructor(private natureService:NatureService, public app:AppComponent,
              private authService: AuthenticationService,
              private router: Router, private route: ActivatedRoute,
              private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }

  onSubmitSaveNature() {
    this.natureService.saveNature(this.nature).subscribe(value => {
      // console.log(value);
      if (value === null) alert("vous ne pouvez pas ajouter la meme nature deux fois !!");
      this._snackBar.open('LA NATURE A ETE AJOUTE', 'AJOUTER', {
        duration: 2000,
      });
    });
  }
}
