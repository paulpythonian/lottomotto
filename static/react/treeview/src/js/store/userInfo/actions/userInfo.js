import * as _type from '../../../constatns/action-type'


export function userInfoHasError(bool){
    return{
        type: _type.USERINFO_HAS_ERROR,
        hasError: bool
    }
}

export function userInfoIsLoading(bool){
    return {
        type: _type.USERINFO_IS_LOADING,
        isLoading: bool
    }
}

export function userInfoFetchDataSuccess(userInfo) {
    return{
        type: _type.USERINFO_FETCH_DATA_SUCCESS,
        userInfo

    }
}

export function userInfoFetchData(url){
    return(dispatch) => {
        dispatch(userInfoIsLoading(true));

        fetch(url)
            .then((res) => {
                if(!res.ok){
                    throw Error(res.statusText);
                }

                dispatch(userInfoIsLoading(false));

                return res
            })
            .then((res) => res.json())
            .then((userInfo) => dispatch(userInfoFetchDataSuccess(userInfo)))
            .catch(() => dispatch(userInfoHasError(true)));
    };
}

