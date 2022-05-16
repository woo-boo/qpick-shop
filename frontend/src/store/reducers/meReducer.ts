import { MeState, MeAction, MeActionTypes } from "../../types/me";


const initialState: MeState = {
    isAuth: false,
    loading: false,
    error: null,
    data: null,
    signUpState: {
        loading: false,
        success: false,
        error: null
    }
}

export const meReducer = (state = initialState, action: MeAction): MeState => {
    switch (action.type) {
        case MeActionTypes.FETCH_ME:
            return {...state, loading: true}
        case MeActionTypes.FETCH_ME_SUCCESS:
            return {...state ,isAuth: true, loading: false, error: null, data: action.payload}
        case MeActionTypes.FETCH_ME_ERROR:
            return {...state, isAuth: false, loading: false, error: action.payload, data: null}
        case MeActionTypes.LOG_OUT_ME:
            return {...state, isAuth: false, loading: false, error: null, data: null}
        case MeActionTypes.SIGN_UP:
            return {...state, signUpState: {...state.signUpState, loading: true}}
        case MeActionTypes.SIGN_UP_SUCCESS:
            return {...state, signUpState: {loading: false, success: true, error: null}}
        case MeActionTypes.SIGN_UP_ERROR:
            return {...state, signUpState: {loading: false, success: false, error: action.payload}}
        default:
            return state
    }
}