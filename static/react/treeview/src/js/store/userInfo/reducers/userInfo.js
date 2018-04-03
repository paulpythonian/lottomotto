import * as _type from '../../../constatns/action-type'

export function userInfoHasError(state = false, action) {
    switch (action.type){
        case _type.USERINFO_HAS_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

export function userInfoIsLoading(state = false, action) {
    switch (action.type){
        case _type.USERINFO_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}


export function userInfo(state = [], action) {
    switch (action.type){
        case _type.USERINFO_FETCH_DATA_SUCCESS:
            return action.userInfo;

        default:
            return state;
    }
}

