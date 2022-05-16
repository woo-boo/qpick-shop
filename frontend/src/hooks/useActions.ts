import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

import * as appActions from '../store/action-creators/appActions'
import * as menuActions from '../store/action-creators/menuActions'
import * as meActions from '../store/action-creators/meActions'
import * as categoryActions from '../store/action-creators/categoryActions'
import * as productActions from '../store/action-creators/productActions'


const UserActionCreators = {
    ...appActions,
    ...menuActions,
    ...meActions,
    ...categoryActions,
    ...productActions,
}


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(UserActionCreators, dispatch)
}