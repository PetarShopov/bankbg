import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default (state = initialState, action) => {
    function register(state, action) {
        let result = action.response;
        return Object.assign({}, state, {
            userRegistered: result.success
        })
    }

    function login(state, action) {
        let result = action.response;
        return Object.assign({}, state, {
            userLoggedIn: result.success
        })
    }

    switch (action.type) {
        case types.REGISTER_USER:
            return register(state, action);
        case types.LOGIN_USER:
            return login(state, action);
        default:
            return state;
    }
}