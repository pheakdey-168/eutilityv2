export default class LoanReschedule {
    constructor(data = {}) {
        this.id = data.id || ''
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.userPin = data.userPin || {}
        this.newLoan = data.newLoan || {}
        this.oldLoan = data.oldLoan || {}
        this.journalId = data.journalId || ''
        this.rescheduleHistories = data.rescheduleHistories || []
        this.paymentSchedule = data.paymentSchedule || []
        this.principalPaidAmount = data.principalPaidAmount || 0
        this.exchangeRate = data.exchangeRate || {}
        this.interestRatePerMonth = data.interestRatePerMonth || {}
        this.period = data.period || 0
        this.member = data.member || {}
        this.oldSchedule = data.oldSchedule || []
    }

    constuct(data) {
        this.constructor(data);
    }
}