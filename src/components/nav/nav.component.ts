// angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// models
import { User } from '../../models/user';
import { take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'assessment-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  user: User;
  componentActive = true;
  defaultElevation = 0;
  menuLinks = [
    { path: '/home', label: 'Home' }
  ];

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {

    this.store.pipe(select(fromApp.getSignedInUser),
      takeWhile(() => this.componentActive)).subscribe(
        user => {
          if (user) {
            this.user = user;
            if (user.admin) {
              this.menuLinks.push({path: '/admin', label: 'Admin'});
            }
          }
        }
      );

  }

  navigate(label: string): void {
    const link = this.menuLinks.find(c => c.label === label);
    this.router.navigate([link.path]);
  }

}
