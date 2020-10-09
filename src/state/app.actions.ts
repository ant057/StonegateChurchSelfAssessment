// ngrx
import { Action } from '@ngrx/store';

// models
import { Question } from '../models/question';
import { User } from '../models/user';
import { Section } from '../models/section';

export enum AppActionTypes {
    SignUpUser = '[SignUpUser] Successful',
    SignInUser = '[SignInUser] Successful',
    LogoutUser = '[LogoutUser] Successful',
    SelectQuestion = '[Select Question] Success',
    LoadSelfAssessmentQuestions = '[Load Questions] Try',
    LoadSelfAssessmentQuestionsSuccess = '[Load Questions] Successful',
    LoadSelfAssessmentQuestionsError = '[Load Questions] Error',
    LoadSelfAssessmentSections = '[Load Sections] Try',
    LoadSelfAssessmentSectionsSuccess = '[Load Sections] Successful',
    LoadSelfAssessmentSectionsError = '[Load Sections] Error'
}

export class SignUpUser implements Action {
    readonly type = AppActionTypes.SignUpUser;

    constructor(public payload: User) { }
}

export class SignInUser implements Action {
    readonly type = AppActionTypes.SignInUser;

    constructor(public payload: User) { }
}

export class LogoutUser implements Action {
    readonly type = AppActionTypes.LogoutUser;

    constructor() { }
}

export class LoadSelfAssessmentQuestions implements Action {
    readonly type = AppActionTypes.LoadSelfAssessmentQuestions;

    constructor() { }
}

export class LoadSelfAssessmentQuestionsSuccess implements Action {
    readonly type = AppActionTypes.LoadSelfAssessmentQuestionsSuccess;

    constructor(public payload: Question[]) { }
}

export class LoadSelfAssessmentQuestionsError implements Action {
    readonly type = AppActionTypes.LoadSelfAssessmentQuestionsError;

    constructor() { }
}

export class LoadSelfAssessmentSections implements Action {
    readonly type = AppActionTypes.LoadSelfAssessmentSections;

    constructor() { }
}

export class LoadSelfAssessmentSectionsSuccess implements Action {
    readonly type = AppActionTypes.LoadSelfAssessmentSectionsSuccess;

    constructor(public payload: Section[]) { }
}

export class LoadSelfAssessmentSectionsError implements Action {
    readonly type = AppActionTypes.LoadSelfAssessmentSectionsError;

    constructor() { }
}

export type AppActions = SignUpUser
    | SignInUser
    | LogoutUser
    | LoadSelfAssessmentQuestions
    | LoadSelfAssessmentQuestionsError
    | LoadSelfAssessmentQuestionsSuccess
    | LoadSelfAssessmentSections
    | LoadSelfAssessmentSectionsError
    | LoadSelfAssessmentSectionsSuccess;
