// angular
import { Component, Input, OnInit, ViewChild, Self, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
import { Contact } from '../../models/contact';
import { User } from '../../models/user';

// components
import { AssessmentContactsComponent } from '../assessment-contacts/assessment-contacts.component';
import { GenericDialogueComponent } from '../generic-dialogue/generic-dialogue.component';

// rxjs
import { pipe } from 'rxjs';
import { map, tap, switchMap, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'assessment-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.scss']
})
export class SelfAssessmentComponent implements OnInit, OnDestroy {

  @ViewChild(AssessmentContactsComponent) assessmentContactsComponent: AssessmentContactsComponent;

  questions: Question[] = [];
  sections: Section[] = [];
  form: FormGroup;
  user: User;
  componentActive = true;
  submitted = false;

  constructor(private store: Store<fromApp.AppState>,
              private questionControlService: QuestionControlService,
              public dialog: MatDialog,
              private firebaseService: FirebaseService,
              private router: Router) { }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {
    this.store.pipe(select(fromApp.getSignedInUser),
      takeWhile(() => this.componentActive)).subscribe(
        user => {
          this.user = user;
        }
      );

    this.store.pipe(select(fromApp.getSelfAssessmentQuestions),
      takeWhile(() => this.componentActive)).subscribe(
        questions => {
          this.questions = questions;
          if (this.questions) {
            this.form = this.questionControlService.toFormGroup(this.questions);
          }
        }
      );

    this.store.pipe(select(fromApp.getSelfAssessmentSections),
      takeWhile(() => this.componentActive)).subscribe(
        sections => {
          this.sections = sections;
        }
      );
  }

  contactsValid(): boolean {
    return this.assessmentContactsComponent.contactListForm.valid;
  }

  getContacts(): Contact[] {

    const contacts: Contact[] = [];
    contacts.push({
      fullName: this.assessmentContactsComponent.contactListForm.get('familyOneName').value,
      emailAddress: this.assessmentContactsComponent.contactListForm.get('familyOneEmail').value
    });
    contacts.push({
      fullName: this.assessmentContactsComponent.contactListForm.get('spiritualOneName').value,
      emailAddress: this.assessmentContactsComponent.contactListForm.get('spiritualOneEmail').value
    });
    contacts.push({
      fullName: this.assessmentContactsComponent.contactListForm.get('friendOneName').value,
      emailAddress: this.assessmentContactsComponent.contactListForm.get('friendOneEmail').value
    });
    contacts.push({
      fullName: this.assessmentContactsComponent.contactListForm.get('familyTwoName').value,
      emailAddress: this.assessmentContactsComponent.contactListForm.get('familyTwoEmail').value
    });
    contacts.push({
      fullName: this.assessmentContactsComponent.contactListForm.get('spiritualTwoName').value,
      emailAddress: this.assessmentContactsComponent.contactListForm.get('spiritualTwoEmail').value
    });
    contacts.push({
      fullName: this.assessmentContactsComponent.contactListForm.get('friendTwoName').value,
      emailAddress: this.assessmentContactsComponent.contactListForm.get('friendTwoEmail').value
    });
    contacts.push({
      fullName: this.assessmentContactsComponent.contactListForm.get('familyThreeName').value,
      emailAddress: this.assessmentContactsComponent.contactListForm.get('familyThreeEmail').value
    });
    contacts.push({
      fullName: this.assessmentContactsComponent.contactListForm.get('spiritualThreeName').value,
      emailAddress: this.assessmentContactsComponent.contactListForm.get('spiritualThreeEmail').value
    });
    contacts.push({
      fullName: this.assessmentContactsComponent.contactListForm.get('friendThreeName').value,
      emailAddress: this.assessmentContactsComponent.contactListForm.get('friendThreeEmail').value
    });

    return contacts;
  }

  onSubmit(): void {
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
        message: 'Please verify all requried contact names and email addresses are entered.'
      }
    });
  }

  openConfirmDialogue(): void {
    const dialogRef = this.dialog.open(GenericDialogueComponent, {
      width: '450px',
      data: {
        title: 'Submit Self Assessment',
        showConfirm: true,
        message: `Well done! Are you ready to submit your self assessment?
        Your results will be available to your evaluator, and instructions will be emailed to
        the contacts provided to complete their peer evaluation.`}
    });

    dialogRef.afterClosed().pipe(takeWhile(() => this.componentActive)).subscribe(result => {
      if (result === true) {
        this.saveSelfAssessment();
        this.submitted = true;
      }
    });
  }

  saveSelfAssessment(): void {

    const questionAnswers = [];
    this.questions.forEach(q => {
      const questionControl = this.form.get(q.key) as FormControl;
      questionAnswers.push({
        questionId: q.questionId,
        questionType: q.type,
        questionKey: q.key,
        questionOrder: q.orderBy,
        questionLabel: q.label,
        assessmentType: q.assessmentType,
        section: this.sections.find(s => s.sectionId === q.sectionId).text,
        answerValue: questionControl.value,
        reportSection: q.reportSection ? q.reportSection : ''
      });
    });

    let userId;
    let fullName;
    userId = this.user.userId;
    fullName = this.user.fullName;
    const contacts = this.getContacts();

    const selfAssessment = {
      userId,
      fullName,
      questionAnswers,
      contacts
    };

    this.store.dispatch(new appActions.CreateSelfAssessment(selfAssessment));

    this.store.pipe(select(fromApp.getSelfAssessmentSaved),
      takeWhile(() => this.componentActive)).subscribe(
        saved => {
          if (saved === true) {
            this.submitted = false;
            this.router.navigate(['./home']);
          }
        }
      );
  }

}
