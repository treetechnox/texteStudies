import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AddUserComponent} from './add-user/add-user.component';
import {ListUserComponent} from './list-user/list-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {AddSecteurComponent} from './add-secteur/add-secteur.component';
import {ListSecteurComponent} from './list-secteur/list-secteur.component';
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




const routes: Routes = [{ path: '', redirectTo : 'login', pathMatch : 'full' },
  { path: 'lesprojets', component : ListProjetComponent/*, canActivate:[AuthGuard]*/},
  //{ path: 'lesreservations', component : ListReservationsComponent},
  //{ path: 'lessalles', component : ListSallesComponent},
  { path: 'lessecteurs', component : ListSecteurComponent},
  { path: 'lesphases', component : ListPhaseComponent},
  { path: 'lesnatures', component : ListNatureComponent},
  { path: 'lesministeres', component : ListMinistereComponent},
  { path: 'lesusers', component : ListUserComponent},

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
  exports: [RouterModule]
})
export class AppRoutingModule { }
