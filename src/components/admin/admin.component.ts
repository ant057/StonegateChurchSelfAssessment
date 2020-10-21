import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ngrx store
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as appActions from '../../state/app.actions';

// rxjs
import { Observable } from 'rxjs';

// models
import { takeWhile } from 'rxjs/operators';
import { SelfAssessment } from 'src/models/selfassessment';
import { PeerAssessment } from 'src/models/peerassessment';

@Component({
  selector: 'assessment-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  componentActive = true;
  selfAssessments: SelfAssessment[];
  selfAssessmentsBkup: SelfAssessment[];
  peerAssessments: PeerAssessment[];
  searchCriteria = '';

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {

    this.initalizeAdminData();

    this.store.pipe(select(fromApp.getSelfAssessments),
      takeWhile(() => this.componentActive)).subscribe(
        assessments => {
          this.selfAssessments = assessments;
          this.selfAssessmentsBkup = assessments;
        }
      );

    this.store.pipe(select(fromApp.getPeerAssessments),
      takeWhile(() => this.componentActive)).subscribe(
        assessments => {
          this.peerAssessments = assessments;
        }
      );
  }

  initalizeAdminData(): void {
    this.store.dispatch(new appActions.LoadSelfAssessments());
    this.store.dispatch(new appActions.LoadPeerAssessments());
  }

  isAssessmentComplete(selfAssessmentId: string): boolean {
    if (this.peerAssessments) {
      const assessments = this.peerAssessments.filter(x => x.selfAssessmentId.indexOf(selfAssessmentId) !== -1);
      const completed = assessments.find(x => x.completed === false);
      if (!completed) {
        return true;
      }
    }
  }

  searchAssessments(): void {
    this.selfAssessments = this.selfAssessmentsBkup;
    if (this.searchCriteria !== '') {
      this.selfAssessments = this.selfAssessments.filter(
        a => a.selfUserFullName.toLocaleLowerCase().includes(this.searchCriteria.toLocaleLowerCase())
      );
    }
  }

  generateSelfAssessmentReport(): void {
    this.router.navigate(['/selfassessmentreport']);
  }

}
