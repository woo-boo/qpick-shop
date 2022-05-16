import axios, { AxiosError } from "axios"
import { Dispatch } from "redux"
import { $host } from "../../http"
import { CATEGORIES_URL } from "../../http/urls"
import { CategoryAction, CategoryActionTypes } from "../../types/category"


export const fetchCategoriesAction = (limit: number = 100, offset: number = 0) => {
    return async (dispatch: Dispatch<CategoryAction>) => {
        try {
            dispatch({type: CategoryActionTypes.FETCH_CATEGORIES})
            const response = await $host.get(CATEGORIES_URL, {
                params: {limit: limit, offset: offset}
            })
            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
                payload: response.data
            })
        } catch (e) {
            const error = e as AxiosError
            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORIES_ERROR,
                payload: error
            })
        }
    }
}

export const fetchCategoryAction = (id: number) => {
    return async (dispatch: Dispatch<CategoryAction>) => {
        try {
            dispatch({type: CategoryActionTypes.FETCH_CATEGORIES})
            const response = await axios.get(CATEGORIES_URL + `/${id}`)
            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
                payload: [response.data]
            })
        } catch (e) {
            const error = e as AxiosError
            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORIES_ERROR,
                payload: error
            })
        }
    }
}