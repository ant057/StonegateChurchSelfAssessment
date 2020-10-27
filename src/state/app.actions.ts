// ngrx
import { Action } from '@ngrx/store';

// models
import { Question } from '../models/question';
import { User } from '../models/user';
import { Section } from '../models/section';
import { SelfAssessment } from '../models/selfassessment';
import { PeerAssessment } from '../models/peerassessment';

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
    LoadPeerAssessmentQuestions = '[Load Peer Assessment Questions] Try',
    LoadPeerAssessmentQuestionsSuccess = '[Load Peer Assessment Questions] Successful',
    LoadPeerAssessmentQuestionsError = '[Load Peer Assessment Questions] Error',
    LoadPeerAssessmentSections = '[Load Peer Assessment Sections] Try',
    LoadPeerAssessmentSectionsSuccess = '[Load Peer Assessment Sections] Successful',
    LoadPeerAssessmentSectionsError = '[Load Peer Assessment Sections] Error',
    CreateSelfAssessment = '[Create Self Assessment] Try',
    CreateSelfAssessmentSuccess = '[Create Self Assessment] Successful',
    CreateSelfAssessmentError = '[Create Self Assessment] Error',
    ReadSelfAssessmentSuccess = '[Read Self Assessment] Successful',
    LoadSelfAssessments = '[Load Self Assessments] Try',
    LoadSelfAssessmentsSuccess = '[Load Self Assessments] Successful',
    LoadSelfAssessmentsError = '[Load Self Assessments] Error',
    LoadPeerAssessments = '[Load Peer Assessments] Try',
    LoadPeerAssessmentsSuccess = '[Load Peer Assessments] Successful',
    LoadPeerAssessmentsError = '[Load Peer Assessments] Error',
    CompletePeerAssessment = '[Complete Peer Assessment] Try',
    CompletePeerAssessmentSuccess = '[Complete Peer Assessment] Successful',
    CompletePeerAssessmentError = '[Complete Peer Self Assessment] Error',
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

export class LoadPeerAssessmentQuestions implements Action {
    readonly type = AppActionTypes.LoadPeerAssessmentQuestions;

    constructor() { }
}

export class LoadPeerAssessmentQuestionsSuccess implements Action {
    readonly type = AppActionTypes.LoadPeerAssessmentQuestionsSuccess;

    constructor(public payload: Question[]) { }
}

export class LoadPeerAssessmentQuestionsError implements Action {
    readonly type = AppActionTypes.LoadPeerAssessmentQuestionsError;

    constructor() { }
}

export class LoadPeerAssessmentSections implements Action {
    readonly type = AppActionTypes.LoadPeerAssessmentSections;

    constructor() { }
}

export class LoadPeerAssessmentSectionsSuccess implements Action {
    readonly type = AppActionTypes.LoadPeerAssessmentSectionsSuccess;

    constructor(public payload: Section[]) { }
}

export class LoadPeerAssessmentSectionsError implements Action {
    readonly type = AppActionTypes.LoadPeerAssessmentSectionsError;

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

export class ReadSelfAssessmentSuccess implements Action {
    readonly type = AppActionTypes.ReadSelfAssessmentSuccess;

    constructor(public payload: boolean) { }
}

export class LoadSelfAssessments implements Action {
    readonly type = AppActionTypes.LoadSelfAssessments;

    constructor() { }
}

export class LoadSelfAssessmentsSuccess implements Action {
    readonly type = AppActionTypes.LoadSelfAssessmentsSuccess;

    constructor(public payload: SelfAssessment[]) { }
}

export class LoadSelfAssessmentsError implements Action {
    readonly type = AppActionTypes.LoadSelfAssessmentsError;

    constructor() { }
}

export class LoadPeerAssessments implements Action {
    readonly type = AppActionTypes.LoadPeerAssessments;

    constructor() { }
}

export class LoadPeerAssessmentsSuccess implements Action {
    readonly type = AppActionTypes.LoadPeerAssessmentsSuccess;

    constructor(public payload: PeerAssessment[]) { }
}

export class LoadPeerAssessmentsError implements Action {
    readonly type = AppActionTypes.LoadPeerAssessmentsError;

    constructor() { }
}

export class CompletePeerAssessment implements Action {
    readonly type = AppActionTypes.CompletePeerAssessment;

    constructor(public payload: object) { }
}

export class CompletePeerAssessmentSuccess implements Action {
    readonly type = AppActionTypes.CompletePeerAssessmentSuccess;

    constructor(public payload: boolean) { }
}

export class CompletePeerAssessmentError implements Action {
    readonly type = AppActionTypes.CompletePeerAssessmentError;

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
    | LoadPeerAssessmentQuestions
    | LoadPeerAssessmentQuestionsError
    | LoadPeerAssessmentQuestionsSuccess
    | LoadPeerAssessmentSections
    | LoadPeerAssessmentSectionsError
    | LoadPeerAssessmentSectionsSuccess
    | CreateSelfAssessment
    | CreateSelfAssessmentSuccess
    | CreateSelfAssessmentError
    | CompletePeerAssessment
    | CompletePeerAssessmentSuccess
    | CompletePeerAssessmentError
    | ReadSelfAssessmentSuccess
    | LoadSelfAssessments
    | LoadSelfAssessmentsSuccess
    | LoadSelfAssessmentsError
    | LoadPeerAssessments
    | LoadPeerAssessmentsSuccess
    | LoadPeerAssessmentsError;
