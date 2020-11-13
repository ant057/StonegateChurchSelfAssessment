// environment vars
import { environment } from '../environments/environment';

// angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// angular material
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

// routing
import { AppRoutingModule } from './app-routing.module';

// services
import { FirebaseService } from '../services/firebase.service';
import { QuestionControlService } from '../services/question-control.service';
import { PDFService } from '../services/pdf.service';

// ngrx store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from '../state/app.reducer';
import { AppEffects } from '../state/app.effects';

// firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

// firebase ui
import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiAuthConfig } from '../firebase/firebaseui.config';

// pipes
import { FilterArrayPipe } from '../pipes/filter-array.pipe';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { NavComponent } from '../components/nav/nav.component';
import { AdminComponent } from '../components/admin/admin.component';
import { SelfAssessmentComponent } from '../components/self-assessment/self-assessment.component';
import { PeerAssessmentComponent } from '../components/peer-assessment/peer-assessment.component';
import { LandingComponent } from '../components/landing/landing.component';
import { QuestionComponent } from '../components/question/question.component';
import { SectionComponent } from '../components/section/section.component';
import { AssessmentContactsComponent } from '../components/assessment-contacts/assessment-contacts.component';
import { GenericDialogueComponent } from '../components/generic-dialogue/generic-dialogue.component';
import { SelfAssessmentReportComponent } from '../components/self-assessment-report/self-assessment-report.component';
import { FourofournotfoundComponent } from '../components/fourofournotfound/fourofournotfound.component';
import { AllAnswersComponent } from '../components/all-answers/all-answers.component';

// directives
import { MatElevationHoverDirective } from '../directives/mat-elevation-hover.directive';

// utility
import { HttpCacheService } from '../core/http-cache.service';
import { AddHeaderInterceptor } from '../core/add-header.interceptor';
import { LogResponseInterceptor } from '../core/log-response.interceptor';
import { CacheInterceptor } from '../core/cache.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    AdminComponent,
    SelfAssessmentComponent,
    PeerAssessmentComponent,
    LandingComponent,
    QuestionComponent,
    SectionComponent,
    AssessmentContactsComponent,
    GenericDialogueComponent,
    SelfAssessmentReportComponent,
    MatElevationHoverDirective,
    FilterArrayPipe,
    FourofournotfoundComponent,
    AllAnswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    HttpClientModule,
    StoreModule.forRoot({ app: reducer}),
    EffectsModule.forRoot([AppEffects]),
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatRadioModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    MatChipsModule,
    MatSnackBarModule,
    MatTableModule,
    StoreDevtoolsModule.instrument({
      name: 'Tony Robinson Coaching Dev tools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers:
    [
    FirebaseService,
    QuestionControlService,
    PDFService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
