import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { categoryReducer } from "./categoryReducer";
import { menuReducer } from "./menuReducer";

import { meReducer } from "./meReducer";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
    app: appReducer,
    menu: menuReducer,
    me: meReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
})


export type RootState = ReturnType<typeof rootReducer>