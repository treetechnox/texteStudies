import { Component, OnInit } from '@angular/core';
import {PhaseService} from "../service/phase.service";
import {AppComponent} from "../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Phase} from "../phase";
import {AuthenticationService} from "../service/authentication.service";
import {Secteur} from "../Secteur";
import {SecteurService} from "../service/secteur.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../user";
import {Notification} from "../notification";
import {NotificationService} from "../service/notification.service";

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {
  public fonctionExist = false;
  //detail: Detail  = new Detail();
   users: User[] = [];
   user:User=new User();

  constructor(/*private organismeService: OrganismeService, private detailService: DetailService ,*/
              public authService:AuthenticationService,
              private _formBuilder: FormBuilder,
              public secteurService:SecteurService,
              private notificationService: NotificationService /*,private _location:Location*/,public app: AppComponent,
              private route: ActivatedRoute,private router: Router) {/*,*/ }


  /*organismes: Organisme[];
  fonctions: Fonction [];
  fonction: Fonction = new Fonction();
  //fonctionPere: Fonction = new Fonction();
  organisme: Organisme = new Organisme();*/

  // phase:Phase=new Phase();
  secteurs:Secteur[] =  [];

  notification:Notification=new Notification();

  selsect:Secteur=new Secteur();

  submitted = false;
  myformGroup!: FormGroup;
  /*

    niveau: any[] = [
      {value: 1, viewValue: 1}, {value: 2, viewValue: 2}, {value: 3, viewValue: 3},
      {value: 4, viewValue: 4}, {value: 5, viewValue: 5}, {value: 6, viewValue: 6},
      {value: 7, viewValue: 7}, {value: 8, viewValue: 8}, {value: 9, viewValue: 9},
      {value: 10, viewValue: 10}, {value: 11, viewValue: 11}, {value: 12, viewValue: 12},
      {value: 13, viewValue: 13}, {value: 14, viewValue: 14}, {value: 15, viewValue: 15}
    ];
  */


  ngOnInit() {

    this.myformGroup = this._formBuilder.group({
      secteurCtrl: ['', Validators.required],
      userCtrl: ['', Validators.required],
      messageCtrl: ['', Validators.required],
    });

    this.secteurService.getAllSecteurs().subscribe(value => {
      console.log(value);
      this.secteurs = value;
      if (this.selsect) {
        let selected = this.secteurs.find(o => o.id == this.selsect?.id);

        if (selected) {
          this.selsect = selected;
        }else {
          selected!=null
        }
      }

    });

    /*
    *
    *
    * this.secteurs = value;
      if (this.selsect) {
        let selected = this.secteurs.find(o => o.id == this.selsect?.id);

        if (selected) {
          this.selsect = selected;
        }else {
          selected!=null
        }
      }

    *
    * */

    //this.reloadDataOrganismes();

    /*this.detail.detailfctar='';
    this.detail.detailfctfr='';
    console.log(this.detail);*/
    //this.reloadDataFonctionsPere();
  }

  onSubmit() {

    this.onSave();
    //this.router.navigateByUrl('/');
    //window.location.reload();
    // this.gotoList();
  }

  /*onOrganismesSelected(value: number) {
    this.idOrg = value;
    console.log('the selected value of organisme ID is: ' + value);
    this.reloadDataFonctionsByOrganisme(value);
  }*/

  onSave() {

    console.log(this.notification,this.authService.userAuthenticated?.id)

    this.notificationService.saveNotification( this.user.id,this.authService.userAuthenticated?.id, this.notification).subscribe(value => {
      console.log(value)

      this.submitted = true;
      alert('Message envoyé: ' + value+ ' a été ajoutée avec succés');
    }, error1 => console.log('error notification .................') + error1);
    this.submitted = true;
  }



  setUsers(event:any) {
    console.log(event)
    this.selsect = event
    this.secteurService.getAllUsersBySecteurs(this.selsect.id).subscribe(value => {
      console.log(this.selsect.id);
      console.log(this.selsect);
      console.log(value);
      this.users  = value
    });
  }
}
