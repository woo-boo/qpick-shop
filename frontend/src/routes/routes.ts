import { FC } from "react"
import { CART_ROUTE, CATEGORY_ROUTE, CONTACTS_ROUTE, FAVORITES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, SIGNUP_ROUTE, TERMS_ROUTE } from "./consts"

import Home from "../pages/Home"
import Category from "../pages/Category"
import Product from "../pages/Product"
import Cart from "../pages/Cart"
import LogIn from "../pages/LogIn"
import SignUp from "../pages/SignUp"
import Contacts from "../pages/Contacts"
import Favorites from "../pages/Favorites"
import Terms from "../pages/Terms"


interface RouteInterface {
    path: string,
    title?: string,
    Component: FC
}


export const publicRoutes: RouteInterface[] = [
    {
        path: LOGIN_ROUTE,
        Component: LogIn
    },
    {
        path: SIGNUP_ROUTE,
        Component: SignUp
    },
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: CATEGORY_ROUTE + '/:id',
        Component: Category
    },
    {
        path: PRODUCT_ROUTE + "/:id",
        Component: Product
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: FAVORITES_ROUTE,
        Component: Favorites
    },
    {
        path: TERMS_ROUTE,
        Component: Terms
    }

]
