import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import userInfoReducer from './userInfo/reducers';


export default function configureStore(initialState) {
    return createStore(
        userInfoReducer,
        initialState,
        applyMiddleware(thunk)
    );
}