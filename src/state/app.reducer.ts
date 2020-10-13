// ngrx
import { AppActions, AppActionTypes } from './app.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { act } from '@ngrx/effects';

// models
import { User } from '../models/user';
import { Question } from '../models/question';
import { Section } from '../models/section';

export interface AppState {
    user: User;
    selfAssessmentQuestions: Question[];
    selfAssessmentSections: Section[];
    selfAssessmentSaved: boolean;
}

const initialState: AppState = {
    user: null,
    selfAssessmentQuestions: null,
    selfAssessmentSections: null,
    selfAssessmentSaved: false
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

export const getSelfAssessmentSections = createSelector(
    getAppFeatureState,
    state => state.selfAssessmentSections
);

export const getSelfAssessmentSaved = createSelector(
    getAppFeatureState,
    state => state.selfAssessmentSaved
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

        case AppActionTypes.LoadSelfAssessmentSections:
            return {
                ...state
            };

        case AppActionTypes.LoadSelfAssessmentSectionsSuccess:
            return {
                ...state,
                selfAssessmentSections: action.payload
            };

        case AppActionTypes.LoadSelfAssessmentSectionsError:
            return {
                ...state
            };

        case AppActionTypes.CreateSelfAssessmentSuccess:
            return {
                ...state,
                selfAssessmentSaved: true
            };

        default:
            return state;

    }
}
