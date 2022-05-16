export interface AppState {
    headerTitle: string | null
}

export enum AppActionTypes{
    CHANGE_HEADER_TITLE = 'CHANGE_HEADER_TITLE',
    // CHANGE_APP_TITLE = 'CHANGE_APP_TITLE',
}

interface ChangeAppHeaderTitleAction {
    type: AppActionTypes.CHANGE_HEADER_TITLE,
    payload: string | null
}

// interface ChangeAppTitleAction {

// }


export type AppAction = ChangeAppHeaderTitleAction