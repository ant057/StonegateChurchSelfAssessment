// ngrx
import { AppActions, AppActionTypes } from './app.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { act } from '@ngrx/effects';

// models
import { User } from '../models/user';
import { Question } from '../models/question';

export interface AppState {
    user: User;
    selfAssessmentQuestions: Question[];
}

const initialState: AppState = {
    user: null,
    selfAssessmentQuestions: null
};

const getAppFeatureState = createFeatureSelector<AppState>('app');

export const getSignedInUser = createSelector(
    getAppFeatureState,
    state => state.user
);

export const getSelfAssessmentQuestions = createSelector(
    getAppFeatureState,
    state => state.selfAssessmentQuestions
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

        case AppActionTypes.LoadSelfAssessmentQuestions:
            return {
                ...state
            };

        case AppActionTypes.LoadSelfAssessmentQuestionsSuccess:
            return {
                ...state,
                selfAssessmentQuestions: action.payload
            };

        case AppActionTypes.LoadSelfAssessmentQuestionsError:
            return {
                ...state
            };


        // case AppActionTypes.SelectQuestion:
        //     return{
        //         ...state,
        //         selectedQuestion: action.payload
        //     };

        default:
            return state;

    }
}
