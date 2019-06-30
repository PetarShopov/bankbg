import { ADD_BANK_ACCOUNT, ALL_BANK_ACCOUNTS, ALL_CREDITS, MONEY_TRANSFERED, CREDIT_REQUESTED } from '../actions/actionTypes';

const initialState = {
    bankAccounts: [],
    credits: []
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

    function getAllCredits(state, action) {
        return {
            ...state,
            credits: action.credits,
            creditsInfo: action.creditsInfo
        }
    }

    function transferMoney(state, action) {
        return state
    }

    function requestCredit(state, action) {
        return {
            ...state,
            credits: action.credits
        }
    }

    switch (action.type) {
        case ADD_BANK_ACCOUNT:
            return addBankAccount(state, action);
        case ALL_BANK_ACCOUNTS:
            return getAllBankAccounts(state, action);
        case ALL_CREDITS:
            return getAllCredits(state, action);
        case MONEY_TRANSFERED:
            return transferMoney(state, action);
        case CREDIT_REQUESTED:
            return requestCredit(state, action);
        default:
            return state;
    }
}