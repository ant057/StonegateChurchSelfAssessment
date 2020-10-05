import { AppActions, AppActionTypes } from './app.actions';
import { User } from '../models/user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { act } from '@ngrx/effects';

export interface AppState {
    user: User;
}

const initialState: AppState = {
    user: null
    //lists: undefined,
    //plants: undefined,
    //selectedPlant: undefined,
};

const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getSignedInUser = createSelector(
    getAppFeatureState,
    state => state.user
);

export function reducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {

        case AppActionTypes.SignUpUser:
            return {
                ...state,
                user: action.payload
            };

        case AppActionTypes.SignInUser:
            return {
                ...state,
                user: action.payload
            };

        case AppActionTypes.LogoutUser:
            return {
                ...state,
                user: null
            };

        // case AppActionTypes.LoadPlantsSuccess:
        //     return {
        //         ...state,
        //         plants: action.payload,
        //         plantsLoading: false
        //     };

        // case AppActionTypes.SelectPlant:
        //     return{
        //         ...state,
        //         selectedPlant: action.payload
        //     };

        default:
            return state;

    }
}
