// angular
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../state/app.reducer';
import * as appActions from '../state/app.actions';

// rxjs
import { Observable } from 'rxjs';

// models
import { Question } from '../models/question';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'assessment-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: any = null;
  showLoader = true;
  questions$: Observable<Question[]>;

  constructor(private store: Store<fromApp.AppState>,
              public afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    // this.fbs.createQuestions();

    setTimeout(() => this.showLoader = false, 1000);
    this.initalizeAppData();

    this.afAuth.authState.subscribe({
      next: (response) => {
        if (response) {
          this.store.dispatch(new appActions.SignInUser(
            {
              userId: response.uid,
              emailAddress: response.email,
              fullName: response.displayName
            }));
        } else {

        }
      }
    });

    this.store.pipe(select(fromApp.getSignedInUser)).subscribe(
      user => {
        this.user = user;
      }
    );

    this.questions$ = this.store.pipe(select(fromApp.getSelfAssessmentQuestions));
  }

  initalizeAppData(): void {
    this.store.dispatch(new appActions.LoadSelfAssessmentQuestions());
    this.store.dispatch(new appActions.LoadSelfAssessmentSections());
  }

}
