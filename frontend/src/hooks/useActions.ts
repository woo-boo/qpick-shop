import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

import * as meActions from '../store/action-creators/meActions'


const UserActionCreators = {
    ...meActions,
}


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(UserActionCreators, dispatch)
}