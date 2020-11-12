import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FirebaseService } from '../services/firebase.service';
import * as appActions from './app.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Question } from '../models/question';
import { Section } from '../models/section';
import { of, pipe } from 'rxjs';
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
            map((questions: Question[]) => (new appActions.LoadSelfAssessmentQuestionsSuccess(questions))),
            catchError(error => of(new appActions.LoadSelfAssessmentQuestionsError(error)))
        ))
    );

    @Effect()
    loadSelfAssesementSections$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadSelfAssessmentSections),
        mergeMap((action: appActions.LoadSelfAssessmentSections) => this.firebase.getSelfAssessmentSections().pipe(
            map((Sections: Section[]) => (new appActions.LoadSelfAssessmentSectionsSuccess(Sections))),
            catchError(error => of(new appActions.LoadSelfAssessmentSectionsError(error)))
        ))
    );

    @Effect()
    loadPeerAssesementQuestions$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadPeerAssessmentQuestions),
        mergeMap((action: appActions.LoadPeerAssessmentQuestions) => this.firebase.getPeerAssessmentQuestions().pipe(
            map((questions: Question[]) => (new appActions.LoadPeerAssessmentQuestionsSuccess(questions))),
            catchError(error => of(new appActions.LoadPeerAssessmentQuestionsError(error)))
        ))
    );

    @Effect()
    loadPeerAssesementSections$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadPeerAssessmentSections),
        mergeMap((action: appActions.LoadPeerAssessmentSections) => this.firebase.getPeerAssessmentSections().pipe(
            map((sections: Section[]) => (new appActions.LoadPeerAssessmentSectionsSuccess(sections))),
            catchError(error => of(new appActions.LoadPeerAssessmentSectionsError(error)))
        ))
    );

    @Effect()
    createSelfAssessment$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.CreateSelfAssessment),
        mergeMap((action: appActions.CreateSelfAssessment) => this.firebase.createSelfAssessment(action.payload).pipe(
            map(res => new appActions.CreateSelfAssessmentSuccess(true)),
            catchError(error => of(new appActions.CreateSelfAssessmentError(error)))
        ))
    );

    @Effect()
    completePeerAssessment$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.CompletePeerAssessment),
        mergeMap((action: appActions.CompletePeerAssessment) => this.firebase.completePeerAssessment(action.payload).pipe(
            map(res => new appActions.CompletePeerAssessmentSuccess(true)),
            catchError(error => of(new appActions.CompletePeerAssessmentError(error)))
        ))
    );

    @Effect()
    loadSelfAssesements$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadSelfAssessments),
        mergeMap((action: appActions.LoadSelfAssessments) => this.firebase.getSelfAssessments().pipe(
            map((selfAssessments: SelfAssessment[]) => (new appActions.LoadSelfAssessmentsSuccess(selfAssessments))),
            catchError(error => of(new appActions.LoadSelfAssessmentsError(error)))
        ))
    );

    @Effect()
    loadPeerAssesements$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadPeerAssessments),
        mergeMap((action: appActions.LoadPeerAssessments) => this.firebase.getPeerAssessments().pipe(
            map((peerAssessments: PeerAssessment[]) => (new appActions.LoadPeerAssessmentsSuccess(peerAssessments))),
            catchError(error => of(new appActions.LoadPeerAssessmentsError(error)))
        ))
    );

}
