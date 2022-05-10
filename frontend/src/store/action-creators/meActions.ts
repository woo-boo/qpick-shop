import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { $authHost, $host } from "../../http"
import { FETCH_ME_URL, LOGIN_URL, SIGNUP_URL } from "../../http/urls"
import { MeAction, MeActionTypes, SignInInterface, SignUpInterface } from "../../types/me"


export const fetchMeAction = () => {
    return async (dispatch: Dispatch<MeAction>) => {
        try {
            dispatch({type: MeActionTypes.FETCH_ME})
            const response = await $authHost.get(FETCH_ME_URL)
            dispatch({type: MeActionTypes.FETCH_ME_SUCCESS, payload: response.data})
        } catch (e) {
            const error = e as AxiosError
            dispatch({
                type: MeActionTypes.FETCH_ME_ERROR, 
                payload: error
            })
        }
    }
}

export const logInAction = (data: SignInInterface) => {
    return async (dispatch: Dispatch<MeAction>) => {
        try {
            const response = await $host.post(LOGIN_URL, data)
            const token = response.data['access_token']
            localStorage.setItem('token', token)
            fetchMeAction()
        } catch (e) {
            const error = e as AxiosError
            dispatch({
                type: MeActionTypes.FETCH_ME_ERROR,
                payload: error
            })
        }
    }
}

export const logOutAction = () => {
    return (dispatch: Dispatch<MeAction>) => {
        localStorage.removeItem('token')
        dispatch({type: MeActionTypes.LOG_OUT_ME})
    }
}

export const signUpAction = (data: SignUpInterface) => {
    return async (dispatch: Dispatch<MeAction>) => {
        try {
            dispatch({type: MeActionTypes.SIGN_UP})
            const response = await $host.post(SIGNUP_URL, data)
            dispatch({type: MeActionTypes.SIGN_UP_SUCCESS})

        } catch (e) {
            const error = e as AxiosError
            dispatch({type: MeActionTypes.SIGN_UP_ERROR, payload: error})
        }
    }
}
