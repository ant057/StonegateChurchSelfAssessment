import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FirebaseService } from '../services/firebase.service';
import * as appActions from './app.actions';
import { mergeMap, map } from 'rxjs/operators';
import { Question } from '../models/question';
import { Section } from '../models/section';
import { pipe } from 'rxjs';
import { SelfAssessment } from '../models/selfassessment';
import { PeerAssessment } from '../models/peerassessment';

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions,
                private firebase: FirebaseService) {
    }

    @Effect()
    loadSelfAssesementQuestions$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadSelfAssessmentQuestions),
        mergeMap((action: appActions.LoadSelfAssessmentQuestions) => this.firebase.getSelfAssessmentQuestions().pipe(
            map((questions: Question[]) => (new appActions.LoadSelfAssessmentQuestionsSuccess(questions)))
        ))
    );

    @Effect()
    loadSelfAssesementSections$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadSelfAssessmentSections),
        mergeMap((action: appActions.LoadSelfAssessmentSections) => this.firebase.getSelfAssessmentSections().pipe(
            map((Sections: Section[]) => (new appActions.LoadSelfAssessmentSectionsSuccess(Sections)))
        ))
    );

    @Effect()
    loadPeerAssesementQuestions$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadPeerAssessmentQuestions),
        mergeMap((action: appActions.LoadPeerAssessmentQuestions) => this.firebase.getPeerAssessmentQuestions().pipe(
            map((questions: Question[]) => (new appActions.LoadPeerAssessmentQuestionsSuccess(questions)))
        ))
    );

    @Effect()
    loadPeerAssesementSections$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadPeerAssessmentSections),
        mergeMap((action: appActions.LoadPeerAssessmentSections) => this.firebase.getPeerAssessmentSections().pipe(
            map((Sections: Section[]) => (new appActions.LoadPeerAssessmentSectionsSuccess(Sections)))
        ))
    );

    @Effect()
    createSelfAssessment$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.CreateSelfAssessment),
        mergeMap((action: appActions.CreateSelfAssessment) => this.firebase.createSelfAssessment(action.payload).pipe(
            map(res => new appActions.CreateSelfAssessmentSuccess(true))
        ))
    );

    @Effect()
    loadSelfAssesements$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadSelfAssessments),
        mergeMap((action: appActions.LoadSelfAssessments) => this.firebase.getSelfAssessments().pipe(
            map((selfAssessments: SelfAssessment[]) => (new appActions.LoadSelfAssessmentsSuccess(selfAssessments)))
        ))
    );

    @Effect()
    loadPeerAssesements$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadPeerAssessments),
        mergeMap((action: appActions.LoadPeerAssessments) => this.firebase.getPeerAssessments().pipe(
            map((PeerAssessments: PeerAssessment[]) => (new appActions.LoadPeerAssessmentsSuccess(PeerAssessments)))
        ))
    );

    // @Effect()
    // createSelfAssessment$ = this.actions$.pipe(
    //     ofType(appActions.AppActionTypes.CreateSelfAssessment),
    //     mergeMap((action: appActions.CreateSelfAssessment) => this.firebase.createSelfAssessment(action.payload)
    //     .then(res =>
    //         {
    //             console.log(res);
    //             new appActions.CreateSelfAssessmentSuccess(true)
    //         })
    //     .catch(err => new appActions.CreateSelfAssessmentError()))
    // );
}
