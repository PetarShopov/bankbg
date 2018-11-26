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
}

export default BankAccountsService