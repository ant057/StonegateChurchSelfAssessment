// ngrx
import { AppActions, AppActionTypes } from './app.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { act } from '@ngrx/effects';

// models
import { User } from '../models/user';
import { Question } from '../models/question';
import { Section } from '../models/section';
import { SelfAssessment } from '../models/selfassessment';
import { PeerAssessment } from '../models/peerassessment';

export interface AppState {
    user: User;
    selfAssessmentQuestions: Question[];
    selfAssessmentSections: Section[];
    selfAssessmentSaved: boolean;
    readSelfAssessmentSaved: boolean;
    selfAssessments: SelfAssessment[];
    peerAssessments: PeerAssessment[];
}

const initialState: AppState = {
    user: null,
    selfAssessmentQuestions: null,
    selfAssessmentSections: null,
    selfAssessmentSaved: false,
    readSelfAssessmentSaved: false,
    selfAssessments: null,
    peerAssessments: null
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

export const getReadSelfAssessmentSaved = createSelector(
    getAppFeatureState,
    state => state.readSelfAssessmentSaved
);

export const getSelfAssessments = createSelector(
    getAppFeatureState,
    state => state.selfAssessments
);

export const getPeerAssessments = createSelector(
    getAppFeatureState,
    state => state.peerAssessments
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

        case AppActionTypes.ReadSelfAssessmentSuccess:
            return {
                ...state,
                readSelfAssessmentSaved: action.payload
            };

        case AppActionTypes.LoadSelfAssessments:
            return {
                ...state
            };

        case AppActionTypes.LoadSelfAssessmentsSuccess:
            return {
                ...state,
                selfAssessments: action.payload
            };

        case AppActionTypes.LoadSelfAssessmentsError:
            return {
                ...state
            };

        case AppActionTypes.LoadPeerAssessments:
            return {
                ...state
            };

        case AppActionTypes.LoadPeerAssessmentsSuccess:
            return {
                ...state,
                peerAssessments: action.payload
            };

        case AppActionTypes.LoadPeerAssessmentsError:
            return {
                ...state
            };

        default:
            return state;

    }
}
