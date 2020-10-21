import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { SelfAssessmentComponent } from 'src/components/self-assessment/self-assessment.component';
import { AdminComponent } from 'src/components/admin/admin.component';
import { LandingComponent } from 'src/components/landing/landing.component';
import { SelfAssessmentReportComponent } from 'src/components/self-assessment-report/self-assessment-report.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'selfassessment', component: SelfAssessmentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'selfassessmentreport', component: SelfAssessmentReportComponent },
  { path: '*', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
