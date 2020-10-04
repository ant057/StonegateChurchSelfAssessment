import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FirebaseService } from '../services/firebase.service';
import * as appActions from './app.actions';
import { mergeMap, map } from 'rxjs/operators';
// import { Lists } from '../models/app/list';
// import { Plant } from '../models/plant/plant';

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

    // @Effect()
    // loadPlants$ = this.actions$.pipe(
    //     ofType(appActions.AppActionTypes.LoadPlants),
    //     mergeMap((action: appActions.LoadPlants) => this.firebase.getMyPlants(action.payload).pipe(
    //         map((plants: Plant[]) => (new appActions.LoadPlantsSuccess(plants)))
    //     ))
    // );
}
