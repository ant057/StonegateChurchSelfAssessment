// angular
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// angular ui
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { AngularFireAuth } from '@angular/fire/auth';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// models
import { User } from '../../models/user';
import { auth } from 'firebase/app';

// rxjs
import { pipe } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';


@Component({
  selector: 'assessment-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  user: User;

  constructor(public afAuth: AngularFireAuth,
              private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit(): void {

    // this.afAuth.authState.pipe(
    //   map(response => {
    //     if (response) {
    //       console.log(response);
    //       this.store.dispatch(new appActions.SignInUser(
    //         {
    //           userId: response.uid,
    //           emailAddress: response.email,
    //           fullName: response.displayName
    //         }));
    //     }
    //   }
    //   )).subscribe();

    this.store.pipe(select(fromApp.getSignedInUser)).subscribe(
      user => {
        if (user) {
          this.user = user;
        }
      }
    );
  }

  ngAfterViewInit(): void {
    document.getElementsByClassName('mat-card-header-text')[0].setAttribute('style', 'margin: 0 0');
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult): void {
    console.log('success callback');
    this.store.dispatch(new appActions.SignInUser(
      {
        userId: signInSuccessData.authResult.user.uid,
        emailAddress: signInSuccessData.authResult.user.email,
        fullName: signInSuccessData.authResult.user.displayName
      }));

    this.router.navigate(['/home']);
  }

  errorCallback(errorData: FirebaseUISignInFailure): void {
    console.warn('fail callback');
  }

  ngOnDestroy(): void {

  }

}
