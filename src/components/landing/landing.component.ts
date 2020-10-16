// angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// models
import { User } from '../../models/user';
import { take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'assessment-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  user: User;
  componentActive = true;

  constructor(public afAuth: AngularFireAuth,
              private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {

    this.store.pipe(select(fromApp.getSignedInUser),
      takeWhile(() => this.componentActive)).subscribe(
        user => {
          if (user) {
            this.user = user;
          }
        }
      );
  }

  logout(): void {
    this.afAuth.signOut();
    this.store.dispatch(new appActions.LogoutUser());

    this.router.navigate(['/']);
  }

}
