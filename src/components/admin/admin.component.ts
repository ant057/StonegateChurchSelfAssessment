import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// rxjs
import { Observable } from 'rxjs';

// models
import { takeWhile, map } from 'rxjs/operators';
import { SelfAssessment } from 'src/models/selfassessment';
import { PeerAssessment } from 'src/models/peerassessment';

// services
import { PDFService } from '../../services/pdf.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'assessment-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  componentActive = true;
  selfAssessments: SelfAssessment[];
  selfAssessmentsBkup: SelfAssessment[];
  peerAssessments: PeerAssessment[];
  searchCriteria = '';

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private pdfService: PDFService,
              private firebaseService: FirebaseService) { }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {

    this.initalizeAdminData();

    this.store.pipe(select(fromApp.getSelfAssessments),
      takeWhile(() => this.componentActive)).subscribe(
        assessments => {
          this.selfAssessments = assessments;
          this.selfAssessmentsBkup = assessments;
        }
      );

    this.store.pipe(select(fromApp.getPeerAssessments),
      takeWhile(() => this.componentActive)).subscribe(
        assessments => {
          this.peerAssessments = assessments;
        }
      );
  }

  initalizeAdminData(): void {
    this.store.dispatch(new appActions.LoadSelfAssessments());
    this.store.dispatch(new appActions.LoadPeerAssessments());
  }

  isAssessmentComplete(selfAssessmentId: string): boolean {
    if (this.peerAssessments) {
      const assessments = this.peerAssessments.filter(x => x.selfAssessmentId.indexOf(selfAssessmentId) !== -1);
      const completed = assessments.find(x => x.completed === false);
      if (!completed) {
        return true;
      }
    }
  }

  searchAssessments(): void {
    this.selfAssessments = this.selfAssessmentsBkup;
    if (this.searchCriteria !== '') {
      this.selfAssessments = this.selfAssessments.filter(
        a => a.selfUserFullName.toLocaleLowerCase().includes(this.searchCriteria.toLocaleLowerCase())
      );
    }
  }

  generateSelfAssessmentReport(selfAssessment: SelfAssessment): void {
    const peerAssessments = this.peerAssessments.filter(x => x.selfAssessmentId.indexOf(selfAssessment.selfAssessmentId) !== -1);
    // this.pdfService.generatePdf(selfAssessment, peerAssessments);
    // this.router.navigate(['/selfassessmentreport']);
  }

  sendReminders(selfAssessment: SelfAssessment): void {
    const peerAssessments = this.peerAssessments.filter(x => x.selfAssessmentId.indexOf(selfAssessment.selfAssessmentId) !== -1);
    // this.firebaseService.sendReminderEmails(peerAssessments.filter(x => !x.completed)).toPromise()
    // .then(res => {
    //   console.warn(res);
    // }).catch(err => {
    //   console.error(err);
    // });
    const reminders = peerAssessments.filter(x => !x.completed);
    this.firebaseService.sendReminderEmails(reminders).subscribe(
      x => {
        console.warn(x);
        console.warn('i got here');
      },
      err => {
        console.warn(err);
        console.warn('i got here 2');
      }
    );
  }

}
