// angular
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// services
import { QuestionControlService } from '../../services/question-control.service';
import { FirebaseService } from 'src/services/firebase.service';

// models
import { Question } from '../../models/question';
import { Section } from '../../models/section';

// components
import { AssessmentContactsComponent } from '../assessment-contacts/assessment-contacts.component';
import { GenericDialogueComponent } from '../generic-dialogue/generic-dialogue.component';
import { escapeRegExp } from '@angular/compiler/src/util';

@Component({
  selector: 'assessment-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.scss']
})
export class SelfAssessmentComponent implements OnInit {

  @ViewChild(AssessmentContactsComponent) assessmentContactsComponent: AssessmentContactsComponent;

  questions: Question[] = [];
  sections: Section[] = [];
  form: FormGroup;
  payLoad = '';
  userId: string;

  constructor(private store: Store<fromApp.AppState>,
              private questionControlService: QuestionControlService,
              public dialog: MatDialog,
              private firebaseService: FirebaseService) { }

  ngOnInit(): void {

    this.store.pipe(select(fromApp.getSignedInUser)).subscribe(
      user => {
        this.userId = user.userId;
      }
    );

    this.store.pipe(select(fromApp.getSelfAssessmentQuestions)).subscribe(
      questions => {
        this.questions = questions;
      }
    );

    if (this.questions) {
      this.form = this.questionControlService.toFormGroup(this.questions);
    }

    this.store.pipe(select(fromApp.getSelfAssessmentSections)).subscribe(
      sections => {
        this.sections = sections;
      }
    );
  }

  contactsValid(): boolean {
    return this.assessmentContactsComponent.contactListForm.valid;
  }

  onSubmit(): void {
    const questionAnswers = [];
    this.questions.forEach(q => {
      const questionControl = this.form.get(q.key) as FormControl;
      questionAnswers.push({
        questionid: q.questionId,
        answerValue: questionControl.value
      });
    });

    let userId;
    userId = this.userId;
    const selfAssessment = {
      userId,
      questionAnswers
    };

    if (!this.contactsValid()) {
      this.openValidationDialogue();
    }
    else {
      this.openConfirmDialogue();
    }
  }

  openValidationDialogue(): void {
    const dialogRef = this.dialog.open(GenericDialogueComponent, {
      width: '450px',
      data: {
        title: 'Verify Contacts',
        showConfirm: false,
        message: 'Please verify all requried contact names and email addresses are entered.'}
    });
  }

  openConfirmDialogue(): void {
    const dialogRef = this.dialog.open(GenericDialogueComponent, {
      width: '450px',
      data: {
        title: 'Confirm Self Assessment',
        showConfirm: true,
        message: `Well done! Are you ready to submit your self assessment?
        Your results will be available to your evaluator, and instructions will be emailed to
        the contacts provided to complete their peer evaluation.`}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === true) {
        this.saveSelfAssessment();
      }
    });
  }

  saveSelfAssessment(): void {
    const questionAnswers = [];
    this.questions.forEach(q => {
      const questionControl = this.form.get(q.key) as FormControl;
      questionAnswers.push({
        questionid: q.questionId,
        answerValue: questionControl.value
      });
    });

    let userId;
    userId = this.userId;
    const selfAssessment = {
      userId,
      questionAnswers
    };

    this.firebaseService.createSelfAssessment(selfAssessment);
  }

}
