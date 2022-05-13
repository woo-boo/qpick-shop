import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { menuReducer } from "./menuReducer";

import { meReducer } from "./meReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
    app: appReducer,
    menu: menuReducer,
    me: meReducer,
    user: userReducer,
})


export type RootState = ReturnType<typeof rootReducer>