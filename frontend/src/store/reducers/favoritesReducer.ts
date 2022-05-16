import { FavoritesAction, FavoritesActionTypes, FavoritesState } from "../../types/favorites";

const initialState: FavoritesState = {
    products: new Set<number>()
}

export const favoritesReducer = (state = initialState, action: FavoritesAction): FavoritesState => {
    switch (action.type) {
        case FavoritesActionTypes.UPDATE_FAVORITES:
            return {...state, products: action.payload}
        default:
            return state
    }
}