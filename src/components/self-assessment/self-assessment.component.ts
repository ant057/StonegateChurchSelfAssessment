// angular
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// services
import { QuestionControlService } from '../../services/question-control.service';

// models
import { Question } from '../../models/question';

@Component({
  selector: 'assessment-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.scss']
})
export class SelfAssessmentComponent implements OnInit {

  questions: Question[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private store: Store<fromApp.AppState>,
              private questionControlService: QuestionControlService) { }

  ngOnInit(): void {

    this.store.pipe(select(fromApp.getSelfAssessmentQuestions)).subscribe(
      questions => {
        this.questions = questions;
      }
    );

    if (this.questions) {
      this.form = this.questionControlService.toFormGroup(this.questions);
    }
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}
