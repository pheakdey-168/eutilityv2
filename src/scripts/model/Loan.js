const store = require("@/institute.js")
const {institute} = store.default.state

export default class Loan {
    constructor (data = {}) {
        this.id = data.id || ''
        this.lastNumber = data.lastNumber || 1
        this.abbr = data.abbr || ''
        this.loanProduct = data.loanProduct || {}
        this.number = data.number || ''
        this.isMember = data.isMember || 1
        this.member = data.member || {}
        this.amount = data.amount || 100
        this.period = data.period || 12
        this.interestRatePerMonth = data.interestRatePerMonth || {}
        this.loanLevel = data.loanLevel || {}
        this.loanMethod = data.loanMethod || {}
        this.purpose = data.purpose || {}
        this.referenceNumber = data.referenceNumber || ''
        this.dueOneMonth = data.dueOneMonth || 0
        this.dueTwoMonth = data.dueTwoMonth || 0
        this.dueThreeMonth = data.dueThreeMonth || 0
        this.issuedDate = data.issuedDate ||new Date().toISOString().substr(0, 10)
        this.saveOption = data.saveOption || ''
        this.deleted = data.deleted || 0
        this.status = data.status || 0
        this.ownerShipType = data.ownerShipType || 1
        this.guarantors = data.guarantors || []
        this.collaterals = data.collaterals || []
        this.borrowers = data.borrowers || []
        this.disburseAmount = data.disburseAmount || 0
        this.paidAmount = data.paidAmount || 0
        this.principalPaidAmount = data.principalPaidAmount || 0
        this.interestPaidAmount = data.interestPaidAmount || 0
        this.userPin = data.userPin || {}
        this.exchangeRate = data.exchangeRate || {}
        this.dateFormat = data.dateFormat || institute.dateFormat
        this.isEdit = data.isEdit || false
        this.sortIndex = data.sortIndex || 1
        this.rescheduled = data.rescheduled || 0
    }

    construct(data) {
        this.constructor(data)
    }

}
