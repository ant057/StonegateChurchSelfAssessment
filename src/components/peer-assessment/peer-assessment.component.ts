// angular
import { Component, OnInit, OnDestroy } from '@angular/core';
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

// rxjs
import { pipe } from 'rxjs';
import { map, tap, switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'assessment-peer-assessment',
  templateUrl: './peer-assessment.component.html',
  styleUrls: ['./peer-assessment.component.scss']
})
export class PeerAssessmentComponent implements OnInit, OnDestroy {

  peerAssessmentId: string;
  questions: Question[] = [];
  sections: Section[] = [];
  form: FormGroup;
  componentActive = true;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private questionControlService: QuestionControlService,
              public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('peerassessmentid');

    this.initalizeAppData();

    this.store.pipe(select(fromApp.getPeerAssessmentQuestions),
      takeWhile(() => this.componentActive)).subscribe(
        questions => {
          this.questions = questions;
          if (this.questions) {
            this.form = this.questionControlService.toFormGroup(this.questions);
            console.warn(this.form);
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

  }

  initalizeAppData(): void {
    this.store.dispatch(new appActions.LoadPeerAssessmentQuestions());
    this.store.dispatch(new appActions.LoadPeerAssessmentSections());
  }

}
