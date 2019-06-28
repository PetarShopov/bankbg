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