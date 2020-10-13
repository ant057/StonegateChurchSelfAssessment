// ngrx
import { Action } from '@ngrx/store';

// models
import { Question } from '../models/question';
import { User } from '../models/user';
import { Section } from '../models/section';
import { SelfAssessment } from '../models/selfassessment';

export enum AppActionTypes {
    SignUpUser = '[SignUpUser] Successful',
    SignInUser = '[SignInUser] Successful',
    LogoutUser = '[LogoutUser] Successful',
    SelectQuestion = '[Select Question] Success',
    LoadSelfAssessmentQuestions = '[Load Self Assessment Questions] Try',
    LoadSelfAssessmentQuestionsSuccess = '[Load Self Assessment Questions] Successful',
    LoadSelfAssessmentQuestionsError = '[Load Self Assessment Questions] Error',
    LoadSelfAssessmentSections = '[Load Self Assessment Sections] Try',
    LoadSelfAssessmentSectionsSuccess = '[Load Self Assessment Sections] Successful',
    LoadSelfAssessmentSectionsError = '[Load Self Assessment Sections] Error',
    // prob don tneed to store in state?
    CreateSelfAssessment = '[Create Self Assessment] Try',
    CreateSelfAssessmentSuccess = '[Create Self Assessment] Successful',
    CreateSelfAssessmentError = '[Create Self Assessment] Error'
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

export class CreateSelfAssessment implements Action {
    readonly type = AppActionTypes.CreateSelfAssessment;

    constructor(public payload: object) { }
}

export class CreateSelfAssessmentSuccess implements Action {
    readonly type = AppActionTypes.CreateSelfAssessmentSuccess;

    constructor(public payload: boolean) { }
}

export class CreateSelfAssessmentError implements Action {
    readonly type = AppActionTypes.CreateSelfAssessmentError;

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
    | LoadSelfAssessmentSectionsSuccess
    | CreateSelfAssessment
    | CreateSelfAssessmentSuccess
    | CreateSelfAssessmentError;
