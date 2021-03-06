import dataService from './dataService'
const baseUrl = 'bankAccounts'

class BankAccountsService {
    static all(page, username, isAdmin) {
        page = page || 1
        if (isAdmin) {
            return dataService.get(`${baseUrl}/all?page=${page}`)
        }
        return dataService.get(`${baseUrl}/all?page=${page}&username=${username}`)
    }

    static allCredits(page, username, isAdmin) {
        page = page || 1
        if (isAdmin) {
            return dataService.get(`${baseUrl}/allCredits?page=${page}`)
        }
        return dataService.get(`${baseUrl}/allCredits?page=${page}&username=${username}`)
    }

    static approveCredit(id) {
        return dataService.post(`${baseUrl}/approveCredit`, { _id: id }, true)
    }

    static add(bankAccount) {
        return dataService.post(`${baseUrl}/add`, bankAccount, true)
    }

    static transferMoney(moneyTransfer) {
        return dataService.post(`${baseUrl}/transferMoney`, moneyTransfer, true)
    }

    static requestCredit(credit) {
        return dataService.post(`${baseUrl}/requestCredit`, credit, true)
    }
}

export default BankAccountsService