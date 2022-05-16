import { Set } from "typescript"

export interface FavoritesState {
    products: Set<number>
}

export enum FavoritesActionTypes {
    // READ_FAVORITES = 'READ_FAVORITES',
    UPDATE_FAVORITES = 'UPDATE_FAVORITES',
}

interface UpdateFavoritesAction {
    type: FavoritesActionTypes.UPDATE_FAVORITES,
    payload: Set<number>
}


export type FavoritesAction = UpdateFavoritesAction