import { ProductAction, ProductActionTypes, ProductState, } from "../../types/product";

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
}

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
    switch (action.type) {
        case ProductActionTypes.FETCH_PRODUCTS:
            return {...state, loading: true, error: null}
        case ProductActionTypes.FETCH_PRODUCTS_ERROR:
            return {...state, loading: false, error: action.payload}
        case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {loading: false, error: null, products: [...action.payload]}
        default:
            return state
    }
}