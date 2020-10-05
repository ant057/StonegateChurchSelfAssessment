import { Action } from '@ngrx/store';
import { User } from '../models/user';

export enum AppActionTypes {
    SignUpUser = '[SignUpUser] Successful',
    SignInUser = '[SignInUser] Successful',
    LogoutUser = '[LogoutUser] Successful',
    SelectPlant = '[Select Plant] Success'
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

export type AppActions = SignUpUser
    | SignInUser
    | LogoutUser;
