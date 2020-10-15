// angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';
import { filter, take, takeWhile } from 'rxjs/operators';

// models
import { User } from '../../models/user';
import { GenericDialogueComponent } from '../generic-dialogue/generic-dialogue.component';

@Component({
  selector: 'assessment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  read: boolean;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.store.pipe(select(fromApp.getSignedInUser)).subscribe(
      user => {
        if (user) {
          this.user = user;
        }
      }
    );

    this.store.pipe(select(fromApp.getReadSelfAssessmentSaved)).subscribe(
      read => {
        this.read = read;
      }
    );

    this.store.pipe(select(fromApp.getSelfAssessmentSaved)).subscribe(
      saved => {
        if (saved === true  && !this.read) {
          this.store.dispatch(new appActions.ReadSelfAssessmentSuccess(true));
          this.selfAssessmentSavedDialogue();
        }
      }
    );
  }

  toAssessment(): void {
    this.router.navigate(['/selfassessment']);
  }

  selfAssessmentSavedDialogue(): void {
    const dialogRef = this.dialog.open(GenericDialogueComponent, {
      width: '450px',
      data: {
        title: 'Congratulations!',
        showConfirm: false,
        message: `Your self assessment has been successfully submitted! The peer assessments will be sent to the contacts provided. When all peer assessments
        are completed, your self-awareness assessment will be ready for your evaluator.`}
    });
  }

}
