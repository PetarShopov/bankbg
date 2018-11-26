import * as types from './actionTypes';
import userService from '../services/userService';
import authService from '../services/authService'

function userRegistered(response,user) {
    return {
        type: types.REGISTER_USER,
        user,
        response
    }
}

function allUsers() {
    return {
        type: types.ALL_USERS
    }
}

function userLogin(response, user) {
    return {
        type: types.LOGIN_USER,
        user,
        response
    }
}

export function register(user) {
    return dispatch => {
        userService.register(user)
            .then(response => {
                dispatch(userRegistered(response, user));
            })
    }
}

export function login(user) {
    return dispatch => {
        userService.login(user)
            .then(response => {
                authService.saveUser(response.user);
                authService.authenticateUser(response.token);
                dispatch(userLogin(response, user));
            })
    }
}

export function all() {
    return dispatch => {
        //
        dispatch(allUsers());
    }
}
