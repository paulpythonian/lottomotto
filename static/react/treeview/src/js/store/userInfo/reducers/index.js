import { combineReducers } from 'redux'
import { userInfo, userInfoHasError, userInfoIsLoading } from './userInfo'



export default combineReducers({
    userInfo,
    userInfoHasError,
    userInfoIsLoading
})