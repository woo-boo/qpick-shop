import { Dispatch } from "redux"
import { MenuAction, MenuActionTypes } from "../../types/menu"

export const switchIsActiveAction = () => {
    return (dispatch: Dispatch<MenuAction>) => {
        dispatch({type: MenuActionTypes.SWITCH_ACTIVE})
    }
}