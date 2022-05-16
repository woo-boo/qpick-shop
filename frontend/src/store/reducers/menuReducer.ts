import { MenuAction, MenuActionTypes, MenuState } from "../../types/menu";


const initialState: MenuState = {
    isActive: false,
}


export const menuReducer = (state = initialState, action: MenuAction): MenuState => {
    switch (action.type) {
        case MenuActionTypes.SET_ACTIVE_TRUE:
            return {isActive: true}
        case MenuActionTypes.SET_ACTIVE_FALSE:
            return {isActive: false}
        case MenuActionTypes.SWITCH_ACTIVE:
            return {isActive: !state.isActive}
        default:
            return state
    }
}