import { AppAction, AppActionTypes, AppState } from "../../types/app"

const initialState: AppState = {
    headerTitle: null
}

export const appReducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case AppActionTypes.CHANGE_HEADER_TITLE:
            return {headerTitle: action.payload}
        default:
            return state
    }
}