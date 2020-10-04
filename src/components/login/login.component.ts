// angular
import { Component, OnInit } from '@angular/core';

// angular ui
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { AngularFireAuth } from '@angular/fire/auth';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';
//import * as fromAuth from './state/auth.reducer';
//import * as authActions from './state/auth.actions';

// models
//import { User } from '../models/auth/user';
import { auth } from 'firebase/app';

// rxjs
import { pipe } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'assessment-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  logout() {
    // this.afAuth.auth.signOut();
    // this.store.dispatch(new authActions.LogoutSuccess());
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    // console.log('success callback');
    // this.store.dispatch(new authActions.LoginSuccess(signInSuccessData.authResult.user.uid));
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    // console.log('fail callback');
  }

  ngOnDestroy() {

  }

}
