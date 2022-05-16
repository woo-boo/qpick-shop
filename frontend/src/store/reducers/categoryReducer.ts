import { CategoryAction, CategoryActionTypes, CategoryState } from "../../types/category"

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null
}


export const categoryReducer = (state = initialState, action: CategoryAction): CategoryState => {
    switch (action.type) {
        case CategoryActionTypes.FETCH_CATEGORIES:
            return {...state, loading: true}
        case CategoryActionTypes.FETCH_CATEGORIES_ERROR:
            return {...state, loading: false, error: action.payload}
        case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {...state, loading: false, categories: [...action.payload]}
        default:
            return state
    }
}