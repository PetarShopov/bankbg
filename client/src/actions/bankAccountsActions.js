import * as types from './actionTypes';
import bankAccountsService from '../services/bankAccountsService';
import { history } from '../configureStore';
import { toastr } from 'react-redux-toastr';

function bankAccountAdded(bankAccount) {
    return {
        type: types.ADD_BANK_ACCOUNT,
        bankAccount
    }
}

function allBankAccountRecieved(bankAccounts, bankInfo) {
    return {
        type: types.ALL_BANK_ACCOUNTS,
        bankAccounts,
        bankInfo
    }
}

function moneyTransfered() {
    return {
        type: types.MONEY_TRANSFERED
    }
}

function creditRequested() {
    return {
        type: types.CREDIT_REQUESTED
    }
}

export function getAllBankAccounts(username, isAdmin) {
    return dispatch => {
        return bankAccountsService.all(1, username, isAdmin)
            .then(response => {
                dispatch(allBankAccountRecieved(response.bankAccounts, response.bankInfo));
            })
    };
}

export function addBankAccount(bankAccount) {
    return dispatch => {
        return bankAccountsService.add(bankAccount)
            .then(response => {
                if (response.success) {
                    toastr.success('Info', response.message)
                    dispatch(bankAccountAdded(response.bankAccount));
                    history.push('/');
                } else {
                    toastr.error('Error', response.message)
                }
            })
    };
}

export function transferMoney(moneyTransfer) {
    return dispatch => {
        return bankAccountsService.transferMoney(moneyTransfer)
            .then(response => {
                dispatch(moneyTransfered());
                if (response.success) {
                    toastr.success('Info', response.message)
                    history.push('/');
                } else {
                    toastr.error('Error', response.message)
                }
            })
    };
}

export function requestCredit(credit) {
    return dispatch => {
        return bankAccountsService.requestCredit(credit)
            .then(response => {
                dispatch(creditRequested());
                if (response.success) {
                    toastr.success('Info', response.message)
                    history.push('/');
                } else {
                    toastr.error('Error', response.message)
                }
            })
    };
}