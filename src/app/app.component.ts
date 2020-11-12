// angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../state/app.reducer';
import * as appActions from '../state/app.actions';

// rxjs
import { from, Observable, empty } from 'rxjs';
import { takeWhile, map, filter, mergeMap } from 'rxjs/operators';

// models
import { Question } from '../models/question';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user';

@Component({
  selector: 'assessment-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  user: User = null;
  showLoader = true;
  componentActive = true;
  showPeerAssessment = false;
  peerAssessmentId = '';
  applicationError = '';

  constructor(private store: Store<fromApp.AppState>,
              private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private router: Router,
              private firebaseService: FirebaseService,
              private snackBar: MatSnackBar) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeWhile(() => this.componentActive)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.indexOf('peerassessment') !== -1) {
        this.peerAssessmentId = event.url.substring(event.url.lastIndexOf('/'), event.url.length);
        this.showPeerAssessment = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {
    setTimeout(() => this.showLoader = false, 1000);

    this.initalizeAppData();

    this.afAuth.authState.pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(response => {
      if (response) {
        // signed in
        this.firebaseService.getIsUserAdmin(response.uid).pipe(
          takeWhile(() => this.componentActive)
        ).subscribe(u => {
          if (u) {
            this.store.dispatch(new appActions.SignInUser({
              userId: response.uid,
              emailAddress: response.email,
              fullName: response.displayName,
              admin: u.admin
            }));
          }
        });
      }
    });

    this.store.pipe(select(fromApp.getSignedInUser),
    takeWhile(() => this.componentActive)).subscribe(
      user => {
        this.user = user;
      }
    );

    this.store.pipe(select(fromApp.getError),
      takeWhile(() => this.componentActive)).subscribe(
        err => {
          if (err !== '') {
            this.snackBar.open(err, 'Close', null);
          }
      });
  }

  initalizeAppData(): void {
    this.store.dispatch(new appActions.LoadSelfAssessmentQuestions());
    this.store.dispatch(new appActions.LoadSelfAssessmentSections());
  }

}
