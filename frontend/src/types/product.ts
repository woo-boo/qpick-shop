import { AxiosError } from "axios"

interface ImageInterface {
    uuid: string,
    url: string
}

export interface ProductInterface {
    id: number,
    productName: string,
    description: string,
    priceRub: number,
    categoryId: number,
    discount: number,
    images: ImageInterface[]
    mainImage: ImageInterface
}

export interface ProductState {
    products: ProductInterface[],
    loading: boolean,
    error: AxiosError | null
}


export enum ProductActionTypes {
    FETCH_PRODUCTS = 'FETCH_PRODUCTS',
    FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR',
}

interface FetchProductsAction {
    type: ProductActionTypes.FETCH_PRODUCTS,
}

interface FetchProductsErrorAction {
    type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
    payload: AxiosError,
}

interface FetchProductsSuccessAction {
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: ProductInterface[]
}


export type ProductAction = FetchProductsAction
                            | FetchProductsErrorAction
                            | FetchProductsSuccessAction