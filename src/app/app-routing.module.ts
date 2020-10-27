import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { SelfAssessmentComponent } from 'src/components/self-assessment/self-assessment.component';
import { PeerAssessmentComponent } from 'src/components/peer-assessment/peer-assessment.component';
import { AdminComponent } from 'src/components/admin/admin.component';
import { LandingComponent } from 'src/components/landing/landing.component';
import { SelfAssessmentReportComponent } from 'src/components/self-assessment-report/self-assessment-report.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'selfassessment', component: SelfAssessmentComponent },
  { path: 'peerassessment/:peerassessmentid', component: PeerAssessmentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'selfassessmentreport', component: SelfAssessmentReportComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
