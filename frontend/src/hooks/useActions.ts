import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

import * as appActions from '../store/action-creators/appActions'
import * as menuActions from '../store/action-creators/menuActions'
import * as meActions from '../store/action-creators/meActions'


const UserActionCreators = {
    ...appActions,
    ...menuActions,
    ...meActions
}


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(UserActionCreators, dispatch)
}