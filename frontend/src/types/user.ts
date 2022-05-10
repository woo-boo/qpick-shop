export interface UserInterface {
    id: number,
    email: string,
    firstName: string,
    surname: string,
    is_superuser: boolean
}

export interface UserCreateInterface {
    email: string,
    firstName: string,
    surname: string,
    password: string
}

export interface UserState {
    users: UserInterface[],
    loading: boolean,
    error: null | string
}

export enum UserActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'
}

interface FetchUsersAction {
    type: UserActionTypes.FETCH_USERS
}

interface FetchUsersSuccessAction {
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload: any[]
}

interface FetchUsersErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR,
    payload: string
}

export type UserAction = FetchUsersAction
                    | FetchUsersErrorAction
                    | FetchUsersSuccessAction