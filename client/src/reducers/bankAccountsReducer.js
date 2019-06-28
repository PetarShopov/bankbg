import { ADD_BANK_ACCOUNT, ALL_BANK_ACCOUNTS, MONEY_TRANSFERED, CREDIT_REQUESTED } from '../actions/actionTypes';

const initialState = {
    bankAccounts: []
};

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
        return {
            ...state,
            bankAccounts: action.bankAccounts,
            bankInfo: action.bankInfo
        }
    }

    function transferMoney(state, action) {
        return state
    }

    function requestCredit(state, action) {
        return state
    }

    switch (action.type) {
        case ADD_BANK_ACCOUNT:
            return addBankAccount(state, action);
        case ALL_BANK_ACCOUNTS:
            return getAllBankAccounts(state, action);
        case MONEY_TRANSFERED:
            return transferMoney(state, action);
        case CREDIT_REQUESTED:
            return requestCredit(state, action);
        default:
            return state;
    }
}