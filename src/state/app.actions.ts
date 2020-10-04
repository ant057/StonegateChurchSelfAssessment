import { Action } from '@ngrx/store';
//import { Lists } from '../models/app/list';
//import { Plant } from '../models/plant/plant';

export enum AppActionTypes {
    LoadLists = '[Load Lists] Try',
    LoadListsSuccess = '[Load Lists] Successful',
    LoadListsError = '[Load Lists] Error',
    LoadPlants = '[Load Plants] Try',
    LoadPlantsSuccess = '[Load Plants] Successful',
    LoadPlantsError = '[Load Plants] Error',
    SelectPlant = '[Select Plant] Success'
}

export class LoadLists implements Action {
    readonly type = AppActionTypes.LoadLists;

    constructor() { }
}

// export class LoadListsSuccess implements Action {
//     readonly type = AppActionTypes.LoadListsSuccess;

//     constructor(public payload: Lists[]) { }
// }

export class LoadListsError implements Action {
    readonly type = AppActionTypes.LoadListsError;

    constructor(public payload: string) { }
 }

export class LoadPlants implements Action {
    readonly type = AppActionTypes.LoadPlants;

    constructor(public payload: string) { }
}

// export class LoadPlantsSuccess implements Action {
//     readonly type = AppActionTypes.LoadPlantsSuccess;

//     constructor(public payload: Plant[]) { }
// }

export class LoadPlantsError implements Action {
    readonly type = AppActionTypes.LoadPlantsError;

    constructor() { }
}

// export class SelectPlant implements Action {
//     readonly type = AppActionTypes.SelectPlant;

//     constructor(public payload: Plant) { }
// }

export type AppActions = LoadPlants
    | LoadPlantsError
    //| LoadPlantsSuccess
    //| SelectPlant
    | LoadLists
    //| LoadListsSuccess
    | LoadListsError;
