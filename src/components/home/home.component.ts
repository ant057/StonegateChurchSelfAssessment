// angular
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// models
import { User } from '../../models/user';

@Component({
  selector: 'assessment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(public afAuth: AngularFireAuth,
              private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit(): void {

    this.store.pipe(select(fromApp.getSignedInUser)).subscribe(
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

    this.router.navigate(['/app']);
  }

}
