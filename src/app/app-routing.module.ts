import {InjectionToken, NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRouteSnapshot} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AddUserComponent} from './add-user/add-user.component';
import {ListUserComponent} from './list-user/list-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {AddSecteurComponent} from './add-secteur/add-secteur.component';
import {ListSecteursComponent} from "./list-secteur/list-secteurs.component";
import {EditSecteurComponent} from "./edit-secteur/edit-secteur.component";
import {AddPhaseComponent} from './add-phase/add-phase.component';
import {ListPhaseComponent} from './list-phase/list-phase.component';
import {AddMinistereComponent} from './add-ministere/add-ministere.component';
import {ListMinistereComponent} from './list-ministere/list-ministere.component';
import {AddProjetComponent} from './add-projet/add-projet.component';
import {ListProjetComponent} from './list-projet/list-projet.component';
import {EditProjetComponent} from './edit-projet/edit-projet.component';
import {ListNatureComponent} from './list-nature/list-nature.component';
import {AddNatureComponent} from './add-nature/add-nature.component';
import {EditPhaseComponent} from './edit-phase/edit-phase.component';
import {EditMinistereComponent} from './edit-ministere/edit-ministere.component';
import {EditNatureComponent} from './edit-nature/edit-nature.component';
import {AuthGuard} from './auth.guard';
import {EditTexteComponent} from "./edit-texte/edit-texte.component";
import {ListAvisComponent} from "./list-avis/list-avis.component";
import {ObservateurComponent} from "./observateur/observateur.component";
import {AproposComponent} from "./apropos/apropos.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {RapportJournalierComponent} from "./rapport-journalier/rapport-journalier.component";
import {PortailMinisteresComponent} from "./portail-ministeres/portail-ministeres.component";
import {ListCorrespondanceComponent} from "./list-correspondance/list-correspondance.component";
import {ContactusComponent} from "./contactus/contactus.component";


const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const deactivateGuard = new InjectionToken('deactivateGuard');

const routes: Routes = [{ path: '', redirectTo : 'login', pathMatch : 'full' },
  { path: 'lesprojets', component : ListProjetComponent, canActivate:[AuthGuard]},
  { path: 'lesrapports', component : RapportJournalierComponent},
  { path: 'lesavis', component : ListAvisComponent},
  { path: 'lecorrespondances', component : ListCorrespondanceComponent},
  { path: 'lessecteurs', component : ListSecteursComponent},
  { path: 'lesphases', component : ListPhaseComponent},
  { path: 'lesnatures', component : ListNatureComponent},
  { path: 'lesministeres', component : ListMinistereComponent},
  { path: 'poetailministeres', component : PortailMinisteresComponent},
  { path: 'lesusers', component : ListUserComponent},
  { path: 'lesobservateurs', component : ObservateurComponent},
  { path: 'apropos', component : AproposComponent},
  { path: 'contactus', component : ContactusComponent},

  {
    path: 'externalRedirect',
    canActivate: [externalUrlProvider],
    // We need a component here because we cannot define the route otherwise
    component: NotFoundComponent,
  },

  { path: 'lajoutphase', component : AddPhaseComponent},
  { path: 'lajoutprojet', component : AddProjetComponent},
  { path: 'lajoutnature', component : AddNatureComponent},
  { path: 'lamodificationprojet', component : EditProjetComponent},
  { path: 'lajoutministere', component : AddMinistereComponent},
  { path: 'lajoutsecteur', component : AddSecteurComponent},
  { path: 'signup', component : AddUserComponent},

  { path: 'leuser/:id', component : EditUserComponent},
  { path: 'letexte/:id', component : EditTexteComponent},
  { path: 'lesecteur/:id', component : EditSecteurComponent},
  { path: 'laphase/:id', component : EditPhaseComponent},
  { path: 'leministere/:id', component : EditMinistereComponent},
  { path: 'lanature/:id', component : EditNatureComponent},
  { path: 'leprojet/:id', component : EditProjetComponent},

  { path: 'login', component : LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {

        const externalUrl = route.paramMap.get('externalUrl');
        // @ts-ignore
        window.open(externalUrl, '_blank');
      },
    },
    {
      provide: deactivateGuard,
      useValue: () => {
        console.log('Guard function is called!')

        return false;
      }
    },
  ],
})
export class AppRoutingModule { }
