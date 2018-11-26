import * as types from './actionTypes';
import bankAccountsService from '../services/bankAccountsService'

export function getAllBankAccounts() {
    return dispatch => {
        return bankAccountsService.all(1)
            .then(response => {
                let bankAccounts = response.bankAccounts
                dispatch({ type: types.ALL_BANK_ACCOUNTS, bankAccounts })
            })
    };
}

export function addBankAccount(bankAccount) {
    return dispatch => {
        return bankAccountsService.add(bankAccount)
            .then(response => {
                let bankAccount = response.bankAccount
                dispatch({ type: types.ADD_BANK_ACCOUNT, bankAccount })
            })
    };
}