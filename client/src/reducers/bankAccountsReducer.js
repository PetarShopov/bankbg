import initialState from './initialState';
import { ADD_BANK_ACCOUNT, ALL_BANK_ACCOUNTS } from '../actions/actionTypes';

export default (state = initialState, action) => {
    function addBankAccount(state, action) {
        return {
            ...state,
            bankAccounts: action.error ?
                null :
                (state.bankAccounts || []).concat([action.bankAccount])
        };
    }

    function getAllBankAccounts(state, action) {
        return action.bankAccounts
    }

    switch (action.type) {
        case ADD_BANK_ACCOUNT:
            return addBankAccount(state, action);
        case ALL_BANK_ACCOUNTS:
            return getAllBankAccounts(state, action);
        default:
            return state;
    }
}