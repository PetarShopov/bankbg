import * as types from './actionTypes';
import bankAccountsService from '../services/bankAccountsService';
import { history } from '../store/configureStore';
import { toastr } from 'react-redux-toastr';

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

function moneyTransfered() {
    return { 
        type: types.MONEY_TRANSFERED
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
                history.push('/');
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
                    toastr.error('Info', response.message)
                }
            })
    };
}