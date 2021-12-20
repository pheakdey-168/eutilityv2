export default class SavingInterest {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.interestRate = data.interestRate || 1
        this.year = data.year || new Date().getFullYear()
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}