import * as types from './actionTypes';
import bankAccountsService from '../services/bankAccountsService';

function bankAccountAdded(bankAccount) {
    return { 
        type: types.ADD_BANK_ACCOUNT, 
        bankAccount 
    }
}

function allBankAccountRecieved(bankAccounts) {
    return { 
        type: types.ALL_BANK_ACCOUNTS, 
        bankAccounts 
    }
}

export function getAllBankAccounts() {
    return dispatch => {
        return bankAccountsService.all(1)
            .then(response => {
                dispatch(allBankAccountRecieved(response.bankAccounts));
            })
    };
}

export function addBankAccount(bankAccount) {
    return dispatch => {
        return bankAccountsService.add(bankAccount)
            .then(response => {
                dispatch(bankAccountAdded(response.bankAccount));
            })
    };
}