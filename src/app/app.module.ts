import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Material from '@angular/material';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';

import {MatStepperModule} from '@angular/material/stepper';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {NgxPaginationModule} from 'ngx-pagination';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { LocationStrategy, PathLocationStrategy } from '@angular/common';
// import {NgxPaginationModule} from 'ngx-pagination';
// import {FlexLayoutModule} from '@angular/flex-layout';
import {FlexLayoutModule} from '@angular/flex-layout';/*
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ListSallesComponent } from './list-salles/list-salles.component';
import { AddSalleComponent } from './add-salle/add-salle.component';
import { ListSecteursComponent } from './list-secteurs/list-secteurs.component';
import { AddSecteurComponent } from './add-secteur/add-secteur.component';
import { DisableReservationComponent } from './disable-reservation/disable-reservation.component';
import { TraceUtilisateurComponent } from './trace-utilisateur/trace-utilisateur.component';
import { EditSalleComponent } from './edit-salle/edit-salle.component';
import { EditSecteurComponent } from './edit-secteur/edit-secteur.component';*/
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {A11yModule} from "@angular/cdk/a11y";
import {BidiModule} from "@angular/cdk/bidi";
import {ObserversModule} from "@angular/cdk/observers";
import {OverlayModule} from "@angular/cdk/overlay";
import {PlatformModule} from "@angular/cdk/platform";
import {PortalModule} from "@angular/cdk/portal";
//import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CdkTableModule} from "@angular/cdk/table";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ListProjetComponent } from './list-projet/list-projet.component';
import { ListMouvementComponent } from './list-mouvement/list-mouvement.component';
import { AddMouvementComponent } from './add-mouvement/add-mouvement.component';
import { AddNatureComponent } from './add-nature/add-nature.component';
import { AddMinistereComponent } from './add-ministere/add-ministere.component';
import { AddPhaseComponent } from './add-phase/add-phase.component';
import { AddReunionComponent } from './add-reunion/add-reunion.component';
import { AddSecteurComponent } from './add-secteur/add-secteur.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { EditNatureComponent } from './edit-nature/edit-nature.component';
import { EditMinistereComponent } from './edit-ministere/edit-ministere.component';
import { EditPhaseComponent } from './edit-phase/edit-phase.component';
import { EditReunionComponent } from './edit-reunion/edit-reunion.component';
import { EditSecteurComponent } from './edit-secteur/edit-secteur.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListNatureComponent } from './list-nature/list-nature.component';
import { ListMinistereComponent } from './list-ministere/list-ministere.component';
import { ListPhaseComponent } from './list-phase/list-phase.component';
import { ListSecteurComponent } from './list-secteur/list-secteur.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditProjetComponent } from './edit-projet/edit-projet.component';
import { EditTexteComponent } from './edit-texte/edit-texte.component';
/*import { RapportJournalierComponent } from './rapport-journalier/rapport-journalier.component';
import { AddPhaseComponent } from './add-phase/add-phase.component';
import { ListPhasesComponent } from './list-phases/list-phases.component';
import { AddMinistereComponent } from './add-ministere/add-ministere.component';
import { EditMinistereComponent } from './edit-ministere/edit-ministere.component';
import { ListMinistereComponent } from './list-ministere/list-ministere.component';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { AddReunionComponent } from './add-reunion/add-reunion.component';
import { EditReunionComponent } from './edit-reunion/edit-reunion.component';
import { ListReunionComponent } from './list-reunion/list-reunion.component';
import { ListProjetComponent } from './list-projet/list-projet.component';
import { EditProjetComponent } from './edit-projet/edit-projet.component';
import { AddNatureComponent } from './add-nature/add-nature.component';
import { EditNatureComponent } from './edit-nature/edit-nature.component';
import { ListNatureComponent } from './list-nature/list-nature.component';
import { EditPhaseComponent } from './edit-phase/edit-phase.component';
import { AddMouvementComponent } from './add-mouvement/add-mouvement.component';
import { ListMouvementComponent } from './list-mouvement/list-mouvement.component';
import { EditTexteComponent } from './edit-texte/edit-texte.component';*/

import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';




FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);


//import { JoradpMouvementComponent } from './joradp-mouvement/joradp-mouvement.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListProjetComponent,
    ListMouvementComponent,
    AddMouvementComponent,
    AddNatureComponent,
    AddMinistereComponent,
    AddPhaseComponent,
    AddReunionComponent,
    AddSecteurComponent,
    AddUserComponent,
    AddProjetComponent,
    EditNatureComponent,
    EditMinistereComponent,
    EditPhaseComponent,
    EditReunionComponent,
    EditSecteurComponent,
    EditUserComponent,
    ListNatureComponent,
    ListMinistereComponent,
    ListPhaseComponent,
    ListSecteurComponent,
    ListUserComponent,
    EditProjetComponent,
    EditTexteComponent,
    /*AddUserComponent,
    ListUserComponent,
    EditUserComponent,
    ConfirmDialogComponent,
    ListReservationsComponent,
    AddReservationComponent,
    ListSallesComponent,
    AddSalleComponent,
    ListSecteursComponent,*/
    //AddSecteurComponent,
    /*DisableReservationComponent,
    TraceUtilisateurComponent,
    EditSalleComponent,*/
    //EditSecteurComponent,
   /* RapportJournalierComponent,
    AddProjetComponent,
    AddPhaseComponent,
    ListPhasesComponent,
    AddMinistereComponent,
    EditMinistereComponent,
    ListMinistereComponent,
    AddReunionComponent,
    EditReunionComponent,
    ListReunionComponent,
    ListProjetComponent,
    EditProjetComponent,
    AddNatureComponent,
    EditNatureComponent,
    ListNatureComponent,
    EditPhaseComponent,
    AddMouvementComponent,
    ListMouvementComponent,
    EditTexteComponent,*/
  ],
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, FontAwesomeModule,
    BrowserModule, Ng2SearchPipeModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    // sNgxPaginationModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    MatListModule,
    MatExpansionModule,
    MatStepperModule,
    MatChipsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatProgressBarModule,
    NgxPaginationModule,
    // FlexLayoutModule
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FullCalendarModule,

    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    //ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatPaginatorModule,
    DragDropModule,
    MatSortModule
  ],
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,/*
    ScrollDispatchModule,*/
    CdkStepperModule,
    CdkTableModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatSliderModule,
    MatListModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatPaginatorModule,
    DragDropModule,
    MatSortModule,
    // FlexLayoutModule,
  ],
  providers: [
    DatePipe,
    MatDatepickerModule, { provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}, AppComponent,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    PdfViewerComponent,
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ /*ConfirmDialogComponent,AddMouvementComponent*/]
})
export class AppModule { }
