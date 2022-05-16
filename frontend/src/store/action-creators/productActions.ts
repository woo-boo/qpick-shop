import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { $host } from "../../http"
import { PRODUCTS_URL } from "../../http/urls"
import { ProductAction, ProductActionTypes } from "../../types/product"

export const fetchProductsAction = (limit: number = 0, offset: number = 100) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({type: ProductActionTypes.FETCH_PRODUCTS})
            const response = await $host.get(PRODUCTS_URL, {
                params: {limit: limit, offset: offset}
            })
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
                payload: response.data
            })
        } catch (e) {
            const error = e as AxiosError
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
                payload: error
            })
        }
    }
}

export const fetchProductAction = (id: number) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({type: ProductActionTypes.FETCH_PRODUCTS})
            const response = await $host.get(PRODUCTS_URL+`/${id}`)
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
                payload: [response.data]
            })
        } catch (e) {
            const error = e as AxiosError
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
                payload: error
            })
        }
    }
}