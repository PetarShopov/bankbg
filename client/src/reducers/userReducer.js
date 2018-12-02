import * as types from '../actions/actionTypes';

export default (state = { username: null }, action) => {
    function register(state, action) {
        return state
    }

    function login(state, action) {
        let result = action.response;
        return Object.assign({}, state, {
            message: result.success,
            username: result.user.name
        })
    }

    function logout(state, action) {
        return Object.assign({}, state, {
            username: null
        })
    }

    switch (action.type) {
        case types.REGISTER_USER:
            return register(state, action);
        case types.LOGIN_USER:
            return login(state, action);
        case types.LOGOUT_USER:
            return logout(state, action);
        default:
            return state;
    }
}