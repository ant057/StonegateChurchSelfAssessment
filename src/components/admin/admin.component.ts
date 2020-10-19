import { Component, OnDestroy, OnInit } from '@angular/core';

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
  peerAssessments: PeerAssessment[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {

    this.initalizeAdminData();

    this.store.pipe(select(fromApp.getSelfAssessments),
    takeWhile(() => this.componentActive)).subscribe(
      assessments => {
        this.selfAssessments = assessments;
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

}
