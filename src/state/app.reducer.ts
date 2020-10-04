import { AppActions, AppActionTypes } from './app.actions';
//import { Lists } from '../models/app/list';

import { createFeatureSelector, createSelector } from '@ngrx/store';
//import { Plant } from '../models/plant/plant';

export interface AppState {
    // lists: Lists[];
    // plants: Plant[];
    // selectedPlant: Plant;
    plantsLoading: boolean;
}

const initialState: AppState = {
    //lists: undefined,
    //plants: undefined,
    //selectedPlant: undefined,
    plantsLoading: false
};

const getAppFeatureState = createFeatureSelector<AppState>('app');
// export const getLists = state => state.lists;

// export const getLists = createSelector(
//      getAppFeatureState,
//      state => state.lists
//  );

// export const getPlants = createSelector(
//     getAppFeatureState,
//     state => state.plants
// );

// export const getSelectedPlant = createSelector(
//     getAppFeatureState,
//     state => state.selectedPlant
// );

export const getPlantsLoading = createSelector(
    getAppFeatureState,
    state => state.plantsLoading
);

export function reducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {

        case AppActionTypes.LoadLists:
            return {
                ...state
            };

        // case AppActionTypes.LoadListsSuccess:
        //     return {
        //         ...state,
        //         lists: action.payload
        //     };

        case AppActionTypes.LoadListsError:
            return {
                ...state
            };

        case AppActionTypes.LoadPlants:
            return {
                ...state,
                plantsLoading: true
            };

        // case AppActionTypes.LoadPlantsSuccess:
        //     return {
        //         ...state,
        //         plants: action.payload,
        //         plantsLoading: false
        //     };

        case AppActionTypes.LoadPlantsError:
            return {
                ...state,
                plantsLoading: false
            };

        // case AppActionTypes.SelectPlant:
        //     return{
        //         ...state,
        //         selectedPlant: action.payload
        //     };

        default:
            return state;

    }
}
