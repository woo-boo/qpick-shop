import { AxiosError } from "axios";
import { ProductInterface } from "./product";

export interface CategoryInterface {
    id: number,
    categoryName: string,
    description: string,
    products: ProductInterface[]
}

export interface CategoryState {
    categories: CategoryInterface[],
    loading: boolean,
    error: AxiosError | null
}

export enum CategoryActionTypes {
    FETCH_CATEGORIES = 'FETCH_CATEGORIES',
    FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR',
}

interface FetchCategoriesAction {
    type: CategoryActionTypes.FETCH_CATEGORIES,
}

interface FetchCategoriesErrorAction {
    type: CategoryActionTypes.FETCH_CATEGORIES_ERROR,
    payload: AxiosError
}

interface FetchCategoriesSuccessAction {
    type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS
    payload: CategoryInterface[]
}


export type CategoryAction = FetchCategoriesAction
                            | FetchCategoriesErrorAction
                            | FetchCategoriesSuccessAction
