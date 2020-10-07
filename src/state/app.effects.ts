import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FirebaseService } from '../services/firebase.service';
import * as appActions from './app.actions';
import { mergeMap, map } from 'rxjs/operators';
import { Question } from '../models/question';

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions,
                private firebase: FirebaseService) {
    }

    // @Effect()
    // loadLists$ = this.actions$.pipe(
    //     ofType(appActions.AppActionTypes.LoadLists),
    //     mergeMap((action: appActions.LoadLists) => this.firebase.getLists().pipe(
    //         map((lists: Lists[]) => (new appActions.LoadListsSuccess(lists)))
    //     ))
    // );

    @Effect()
    loadQuestions$ = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadSelfAssessmentQuestions),
        mergeMap((action: appActions.LoadSelfAssessmentQuestions) => this.firebase.getSelfAssessmentQuestions().pipe(
            map((questions: Question[]) => (new appActions.LoadSelfAssessmentQuestionsSuccess(questions)))
        ))
    );
}
