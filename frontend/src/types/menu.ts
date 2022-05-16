export interface MenuState {
    isActive: boolean
}

export enum MenuActionTypes {
    SET_ACTIVE_TRUE = 'SET_ACTIVE_TRUE',
    SET_ACTIVE_FALSE = 'SET_ACTIVE_FALSE',
    SWITCH_ACTIVE = 'SWITCH_ACTIVE',
}

interface SetActiveTrueAction {
    type: MenuActionTypes.SET_ACTIVE_TRUE
}

interface SetActiveFalseAction {
    type: MenuActionTypes.SET_ACTIVE_FALSE
}

interface SwitchActiveAction {
    type: MenuActionTypes.SWITCH_ACTIVE
}


export type MenuAction = SetActiveTrueAction
                        | SetActiveFalseAction
                        | SwitchActiveAction