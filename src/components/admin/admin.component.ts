// angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// rxjs
import { Observable } from 'rxjs';

// models
import { takeWhile, map } from 'rxjs/operators';
import { SelfAssessment } from '../../models/selfassessment';
import { PeerAssessment } from '../../models/peerassessment';
import { User } from '../../models/user';

// services
import { PDFService } from '../../services/pdf.service';
import { FirebaseService } from '../../services/firebase.service';

// components
import { GenericDialogueComponent } from '../generic-dialogue/generic-dialogue.component';
import { AllAnswersComponent } from '../all-answers/all-answers.component';

@Component({
  selector: 'assessment-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  user: User = null;
  componentActive = true;
  selfAssessments: SelfAssessment[];
  selfAssessmentsBkup: SelfAssessment[];
  peerAssessments: PeerAssessment[];
  searchCriteria = '';

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private pdfService: PDFService,
              private firebaseService: FirebaseService,
              public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {

    this.initalizeAdminData();

    this.store.pipe(select(fromApp.getSelfAssessments),
      takeWhile(() => this.componentActive)).subscribe(
        assessments => {
          if (assessments) {
            this.selfAssessments = assessments;
            this.selfAssessmentsBkup = assessments;
          }
        }
      );

    this.store.pipe(select(fromApp.getPeerAssessments),
      takeWhile(() => this.componentActive)).subscribe(
        assessments => {
          this.peerAssessments = assessments;
        }
      );

    this.store.pipe(select(fromApp.getSignedInUser),
      takeWhile(() => this.componentActive)).subscribe(
        user => {
          if (user) {
            if (!user.admin) {
              this.router.navigate(['/home']);
            }
          }
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
    const peerAssessments = this.getPeerAssessmentsBySelfId(selfAssessment.selfAssessmentId);
    this.pdfService.generatePdf(selfAssessment, this.getCompletedPeerAssessments(peerAssessments));
    // this.router.navigate(['/selfassessmentreport']);
  }

  sendReminders(selfAssessment: SelfAssessment): void {
    const peerAssessments = this.getPeerAssessmentsBySelfId(selfAssessment.selfAssessmentId);
    const reminders = peerAssessments.filter(x => !x.completed);
    this.firebaseService.sendReminderEmails(reminders).subscribe(
      x => {
        console.warn(x);
      },
      err => {
        console.error(err);
      }
    );
  }

  openReminderDialogue(selfAssessment: SelfAssessment): void {
    const dialogRef = this.dialog.open(GenericDialogueComponent, {
      width: '450px',
      data: {
        title: 'Send Reminder E-mail?',
        showConfirm: true,
        message: `Reminders will be emailed to all incomplete peer assessments.`
      }
    });

    dialogRef.afterClosed().pipe(takeWhile(() => this.componentActive)).subscribe(result => {
      if (result === true) {
        this.sendReminders(selfAssessment);
      }
    });
  }

  openAllAnswers(selfAssessment: SelfAssessment): void {
    const peerAssessments = this.getPeerAssessmentsBySelfId(selfAssessment.selfAssessmentId);
    const completedPeerAssessment = this.getCompletedPeerAssessments(peerAssessments);
    let answersData = [];

    const peer1 = completedPeerAssessment[0] ? completedPeerAssessment[0].fullName : 'peer1';
    const peer2 = completedPeerAssessment[1] ? completedPeerAssessment[1].fullName : 'peer2';
    const peer3 = completedPeerAssessment[2] ? completedPeerAssessment[2].fullName : 'peer3';
    const peer4 = completedPeerAssessment[3] ? completedPeerAssessment[3].fullName : 'peer4';
    const peer5 = completedPeerAssessment[4] ? completedPeerAssessment[4].fullName : 'peer5';
    const peer6 = completedPeerAssessment[5] ? completedPeerAssessment[5].fullName : 'peer6';
    const peer7 = completedPeerAssessment[6] ? completedPeerAssessment[6].fullName : 'peer7';
    const peer8 = completedPeerAssessment[7] ? completedPeerAssessment[7].fullName : 'peer8';
    const peer9 = completedPeerAssessment[8] ? completedPeerAssessment[8].fullName : 'peer9';
    const self1 = selfAssessment.selfUserFullName;
    const displayColumns = ['question', self1, peer1, peer2, peer3, peer4, peer5, peer6, peer7, peer8, peer9];

    for (const i of selfAssessment.questionAnswers) {
      answersData.push({
        question: i.questionLabel,
        order: i.section,
        [self1]: i.answerValue,
        [peer1]: completedPeerAssessment[0]?.questionAnswers.find(x => x.questionKey === i.questionKey).answerValue,
        [peer2]: completedPeerAssessment[1]?.questionAnswers.find(x => x.questionKey === i.questionKey).answerValue,
        [peer3]: completedPeerAssessment[2]?.questionAnswers.find(x => x.questionId === i.questionId).answerValue,
        [peer4]: completedPeerAssessment[3]?.questionAnswers.find(x => x.questionId === i.questionId).answerValue,
        [peer5]: completedPeerAssessment[4]?.questionAnswers.find(x => x.questionId === i.questionId).answerValue,
        [peer6]: completedPeerAssessment[5]?.questionAnswers.find(x => x.questionId === i.questionId).answerValue,
        [peer7]: completedPeerAssessment[6]?.questionAnswers.find(x => x.questionId === i.questionId).answerValue,
        [peer8]: completedPeerAssessment[7]?.questionAnswers.find(x => x.questionId === i.questionId).answerValue,
        [peer9]: completedPeerAssessment[8]?.questionAnswers.find(x => x.questionId === i.questionId).answerValue
      });
    }

    answersData = answersData.sort(this.sortByQuestion);
    const dialogRef = this.dialog.open(AllAnswersComponent, {
      width: '1200px',
      data: {
        title: 'Answers',
        message: `Reminders will be emailed to all incomplete peer assessments.`,
        answersData,
        displayColumns
      }
    });
  }

  sortByQuestion(a, b): number {
    if (a.order < b.order) { return 1; }
    if (b.order < a.order) { return -1; }

    return 0;
  }

  getPeerAssessmentsBySelfId(selfAssessmentId: string): PeerAssessment[] {
    return this.peerAssessments.filter(x => x.selfAssessmentId.indexOf(selfAssessmentId) !== -1);
  }

  getCompletedPeerAssessments(peerAssessments: PeerAssessment[], complete?: boolean): PeerAssessment[] {
    if (!complete) { complete = true; }
    return complete ? peerAssessments.filter(x => x.completed) : peerAssessments.filter(x => !x.completed);
  }

}
