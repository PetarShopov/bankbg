import * as types from './actionTypes';
import userService from '../services/userService';
import authService from '../services/authService';
import { history } from '../configureStore';
import { toastr } from 'react-redux-toastr';

function userRegistered(response, user) {
    return {
        type: types.REGISTER_USER,
        user,
        response
    }
}

function userLogin(response, user) {
    return {
        type: types.LOGIN_USER,
        user,
        response
    }
}

function userLogout() {
    return {
        type: types.LOGOUT_USER,
        user: ''
    }
}

function allUsers() {
    return {
        type: types.ALL_USERS
    }
}

export function register(user) {
    return dispatch => {
        userService.register(user)
            .then(response => {
                dispatch(userRegistered(response, user));
                if (response.success) {
                    history.push('/');
                    toastr.success('Info', response.message)
                } else {
                    toastr.error('Error', response.message)
                }
            })
    }
}

export function login(user) {
    return dispatch => {
        userService.login(user)
            .then(response => {
                if (response.success) {
                    toastr.success('Info', response.message)
                    authService.saveUser(response.user);
                    authService.authenticateUser(response.token);
                    dispatch(userLogin(response, user));
                    history.push('/');
                } else {
                    toastr.error('Error', response.message)
                }
            })
    }
}


export function logout() {
    return dispatch => {
        authService.deauthenticateUser()
        authService.removeUser()
        dispatch(userLogout());
        toastr.success('Info', 'Successfully logout')
        history.push('/users/login');
    }
}

export function all() {
    return dispatch => {
        //
        dispatch(allUsers());
    }
}
