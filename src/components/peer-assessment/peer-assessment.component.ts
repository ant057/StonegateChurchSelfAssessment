// angular
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// services
import { QuestionControlService } from '../../services/question-control.service';
import { FirebaseService } from 'src/services/firebase.service';

// components
import { GenericDialogueComponent } from '../generic-dialogue/generic-dialogue.component';

// models
import { Question } from '../../models/question';
import { Section } from '../../models/section';
import { PeerAssessment } from '../../models/peerassessment';

// rxjs
import { Observable, pipe } from 'rxjs';
import { map, tap, switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'assessment-peer-assessment',
  templateUrl: './peer-assessment.component.html',
  styleUrls: ['./peer-assessment.component.scss']
})
export class PeerAssessmentComponent implements OnInit, OnDestroy {

  questions: Question[] = [];
  sections: Section[] = [];
  form: FormGroup;
  peerAssessment: PeerAssessment;
  componentActive = true;
  @Input() peerAssessmentId: string;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private questionControlService: QuestionControlService,
              public dialog: MatDialog,
              private firebaseService: FirebaseService) {
              }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {
    this.initalizeAppData();

    this.firebaseService.getPeerAssessment(this.peerAssessmentId.replace('/', '')).pipe(
      takeWhile(() => this.componentActive)).subscribe(
        peerAssessment => {
          if (peerAssessment) {
            this.peerAssessment = peerAssessment;
          }
        }
      );

    this.store.pipe(select(fromApp.getPeerAssessmentQuestions),
      takeWhile(() => this.componentActive)).subscribe(
        questions => {
          this.questions = questions;
          if (this.questions) {
            this.form = this.questionControlService.toFormGroup(this.questions);
          }
        }
      );

    this.store.pipe(select(fromApp.getPeerAssessmentSections),
      takeWhile(() => this.componentActive)).subscribe(
        sections => {
          this.sections = sections;
        }
      );
  }

  onSubmit(): void {
    this.openConfirmDialogue();
  }

  openConfirmDialogue(): void {
    const dialogRef = this.dialog.open(GenericDialogueComponent, {
      width: '450px',
      data: {
        title: 'Submit Peer Assessment',
        showConfirm: true,
        message: `Well done! Are you ready to submit your peer assessment?`}
    });

    dialogRef.afterClosed().pipe(takeWhile(() => this.componentActive)).subscribe(result => {
      if (result === true) {
        this.savePeerAssessment();
      }
    });
  }

  openCompletedDialogue(): void {
    const dialogRef = this.dialog.open(GenericDialogueComponent, {
      width: '450px',
      data: {
        title: 'Congratulations!',
        showConfirm: false,
        message: `Your peer assessment has been successfully completed! Thank you!`}
    });

    dialogRef.afterClosed().pipe(takeWhile(() => this.componentActive)).subscribe(result => {
      if (result === true) {
        this.savePeerAssessment();
      }
    });
  }

  savePeerAssessment(): void {

    const questionAnswers = [];
    this.questions.forEach(q => {
      const questionControl = this.form.get(q.key) as FormControl;
      questionAnswers.push({
        questionid: q.questionId,
        answerValue: questionControl.value
      });
    });

    const peerAssessment = {
      peerAssessmentId: this.peerAssessmentId.replace('/', ''),
      completed: true,
      completedDate: new Date().toLocaleDateString(),
      questionAnswers
    };

    this.store.dispatch(new appActions.CompletePeerAssessment(peerAssessment));

    this.store.pipe(select(fromApp.getPeerAssessmentCompleted),
      takeWhile(() => this.componentActive)).subscribe(
        saved => {
          if (saved === true) {
            this.openCompletedDialogue();
          }
        }
      );
  }

  initalizeAppData(): void {
    this.store.dispatch(new appActions.LoadPeerAssessmentQuestions());
    this.store.dispatch(new appActions.LoadPeerAssessmentSections());
  }

}
