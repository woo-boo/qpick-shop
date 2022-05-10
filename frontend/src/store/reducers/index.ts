import { combineReducers } from "redux";

import { meReducer } from "./meReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
    me: meReducer,
    user: userReducer,
})


export type RootState = ReturnType<typeof rootReducer>