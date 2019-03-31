import dataService from './dataService'
const baseUrl = 'bankAccounts'

class BankAccountsService {
    static all(page) {
        page = page || 1
        return dataService.get(`${baseUrl}/all?page=${page}`)
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