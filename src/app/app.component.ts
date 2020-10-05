// angular
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../state/app.reducer';
import * as appActions from '../state/app.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'StonegateChurchSelfAssessment';
  user: any = null;

  constructor(private store: Store<fromApp.AppState>,
              public afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromApp.getSignedInUser)).subscribe(
      user => {
        this.user = user;
      }
    );

    console.log(this.user);
  }

  logout(): void {
    this.afAuth.signOut();
    this.store.dispatch(new appActions.LogoutUser());
  }
}
