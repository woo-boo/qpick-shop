import { Dispatch } from "redux"
import { AppAction, AppActionTypes } from "../../types/app"


export const setHeaderTitleAction = (title: string | null) => {
    return (dispatch: Dispatch<AppAction>) => {
        dispatch({type: AppActionTypes.CHANGE_HEADER_TITLE, payload: title})
    }
}