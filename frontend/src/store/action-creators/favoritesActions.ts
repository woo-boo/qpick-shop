import { Dispatch } from "redux";
import { FavoritesAction, FavoritesActionTypes, FavoritesState } from "../../types/favorites";

export const addToFavorites = (newItems: number[]) => {
    return (dispatch: Dispatch<FavoritesAction>) => {
        const storageFavorites = localStorage.getItem('favorites')
        let favorites = new Set<number>()
        if (storageFavorites) {
            favorites = JSON.parse(storageFavorites)
        }
        newItems.forEach(item => favorites.add(item))
        localStorage.setItem('favorites', JSON.stringify(favorites))
        dispatch({
            type: FavoritesActionTypes.UPDATE_FAVORITES,
            payload: favorites
        })
    }
}

export const removeFromFavorites = (item: number) => {
    return (dispatch: Dispatch<FavoritesAction>) => {
        const storageFavorites = localStorage.getItem('favorites')
        let favorites = new Set<number>()
        if (storageFavorites) {
            favorites = JSON.parse(storageFavorites)
            favorites.delete(item)
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
        dispatch({
            type: FavoritesActionTypes.UPDATE_FAVORITES,
            payload: favorites
        })
    }
}

export const readFavoritesFromStorage = () => {
    return (dispatch: Dispatch<FavoritesAction>) => {
        const favoriteStorage = localStorage.getItem('favorites')
        if (favoriteStorage) {
            const favorites = JSON.parse(favoriteStorage)
            dispatch({
                type: FavoritesActionTypes.UPDATE_FAVORITES,
                payload: favorites
            })
        }
    }
}