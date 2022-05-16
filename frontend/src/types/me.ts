import { AxiosError } from "axios";
import { UserInterface } from "./user";


export interface SignUpInterface {
    email: string,
    firstName: string,
    surname: string,
    password: string
}

export interface SignInInterface {
    email: string,
    password: string
}


export interface SignUpState {
    loading: boolean,
    success: boolean,
    error: null | AxiosError
}

export interface MeState {
    isAuth: boolean,
    loading: boolean,
    error: null | AxiosError,
    data: null | UserInterface
    signUpState: SignUpState
}


export enum MeActionTypes {
    FETCH_ME = 'FETCH_ME',
    FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS',
    FETCH_ME_ERROR = 'FETCH_ME_ERROR',
    LOG_OUT_ME = 'LOG_OUT_ME',
    SIGN_UP = 'SIGN_UP',
    SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
    SIGN_UP_ERROR = 'SIGN_UP_ERROR'
}


interface FetchMeAction {
    type: MeActionTypes.FETCH_ME
}

interface FetchMeSuccessAction {
    type: MeActionTypes.FETCH_ME_SUCCESS,
    payload: any
}

interface FetchMeErrorAction {
    type: MeActionTypes.FETCH_ME_ERROR,
    payload: AxiosError
}

interface LogOutMeAction {
    type: MeActionTypes.LOG_OUT_ME,
}

interface SignUpAction {
    type: MeActionTypes.SIGN_UP
}

interface SignUpSuccessAction {
    type: MeActionTypes.SIGN_UP_SUCCESS
}

interface SignUpErrorAction {
    type: MeActionTypes.SIGN_UP_ERROR,
    payload: AxiosError
}

export type MeAction = FetchMeAction
                    | FetchMeSuccessAction
                    | FetchMeErrorAction
                    | LogOutMeAction
                    | SignUpAction
                    | SignUpSuccessAction
                    | SignUpErrorAction