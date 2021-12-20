const store = require("@/institute.js")
const {institute} = store.default.state
export default class PayrollRun {
    constructor(data = {}) {
        this.timeFormat             = 'hh:mm:ss tt' 
        this.monthOf                = data.monthOf || ''
        this.number                 = data.number   || ''
        this.PayNumber              = data.PayNumber || {}
        this.abbr                   = data.abbr || ''
        this.lastNumber             = data.lastNumber || 0
        this.referenceNumber        = data.referenceNumber || ''
        this.type                   = data.type || ''
        this.location               = data.location || {}
        this.currency               = data.currency || {}
        this.exchangeRate           = data.exchangeRate || {}
        this.totalEmployee          = data.totalEmployee || 0
        this.totalGross             = data.totalGross || 0
        this.totalBenefits          = data.totalBenefits || 0
        this.totalTaxBenefit        = data.totalTaxBenefit || 0
        this.status                 = data.status || 0
        this.payrollList            = data.payrollList || []
        this.step                   = data.step || 0
        this.totalNetSalary         = data.totalNetSalary || 0
        this.totalDeduction         = data.totalDeduction || 0
        this.totalTaxPaymentUS      = data.totalTaxPaymentUS || 0
        this.totalTaxPaymentKHM     = data.totalTaxPaymentKHM || 0
        this.final                  = data.final || ''
        this.adjustment             = data.adjustment || []
        this.dateFormat             = data.dateFormat || institute.dateFormat
        this.payrollLiabilitieName  = data.payrollLiabilitieName || ''
        this.payrollLiabilitieNumber= data.payrollLiabilitieNumber || ''
        this.payrollLiabilitieUuid  = data.payrollLiabilitieUuid || ''
    }
    constuct(data) {
        this.constructor(data);
    }
}