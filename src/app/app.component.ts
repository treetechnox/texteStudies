import {Component, HostListener} from '@angular/core';
//import { faHome } from '@fortawesome/angular-fontawesome';
import {Router} from '@angular/router';
import {AuthenticationService} from './service/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AproposComponent} from "./apropos/apropos.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string | undefined;

  //candidat: Candidat = new Candidat();
  //faHome = faHome;

  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event:any){
    sessionStorage.clear();
    this.router.navigateByUrl('/', { skipLocationChange: true });
  }
  constructor(private router: Router, private dialog:MatDialog,
              public authService:AuthenticationService, public translate: TranslateService) {
    translate.addLangs(['fr','ar']);
    translate.setDefaultLang('fr');
    const browserLang:any = translate.getBrowserLang();
    console.log(browserLang);
    translate.use(browserLang.match(/fr|ar/)?browserLang: 'fr');
    localStorage.setItem('lge','fr')
  }
  ngOnInit(){
    this.title = 'Application pour les reunions';
    this.authService.loadAuthenticatedUserFromLocalStorage();
  }

  reloadHome() {
    this.router.navigateByUrl('/candidats');
  }

  /*verifierCandidat(nomfr: string , prenomfr: string ) {
    this.candidatService.getCandidatByNomAndPrenom(nomfr, prenomfr ).subscribe(value => {
        this.candidat = value;
        // this.reloadDataMouvements(this.id);
        //console.log('Yes it Exists ^^');
      }, error1 => console.log('N existe pas')
    );
  }*/
  isToLogg: Boolean=false;

  onLogout() {
    const conf = confirm('Voulez vous deconnecter?');
    if (conf) {
      this.authService.removeAuthenticatedUserFromLocalStorage();
      this.router.navigateByUrl('/login');
    }
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isMinistereUser() {
    return this.authService.isMinistereUser();
  }

  actualiser() {
    window.location.reload();
  }

  changeLang(value: string) {
    localStorage.setItem('lge',value);
    this.translate.use(value);
  }

  public localStorageItem(id: string): string {
    // @ts-ignore
    return localStorage.getItem(id);
  }

  openApropos() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    //dialogConfig.data= mouvementId;
    // @ts-ignore
    dialogConfig.width = '50%';
    dialogConfig.height = '30%';
    this.dialog.open(AproposComponent, dialogConfig);
  }

  setToLog() {
    console.log(this.isToLogg);
    this.isToLogg=true;
    console.log(this.isToLogg);
  }
}
