export default class Supplier {
    constructor(data = {}) {
        this.id = data.id || ''
        this.type = data.type || {}
        this.supplierType = data.supplierType || {}
        this.number = data.number || ''
        this.subOfSupplier = data.subOfSupplier || {}
        this.name = data.name || ''
        this.registeredDate = data.registeredDate || new Date().toISOString().substr(0, 10)
        this.alternativeName = data.alternativeName || ''
        this.consumerId = data.consumerId || ''
        this.taxId = data.taxId || ''
        this.contactAddress = data.contactAddress || {
            gender: {},
            phoneNumber: '',
            email: '',
            address: [],
            latitude: '',
            longitude: '',
            website: '',
            description: ''
        }
        this.paymentBilling = data.paymentBilling || {
            paymentTerm: {},
            paymentMethod: {},
            creditLimit: 0,
            bankName: '',
            bankAccountName: '',
            bankAccountNumber: '',
            bankAccountCheque: '',
        }
        this.accountTax = data.accountTax || {
            apAcc: {},
            purchaseDepositAcc: {},
            purchaseDiscountAcc: {},
            purchaseTax: {},
            expenseAcc: {},
        }
        this.noteOnInvoice = data.noteOnInvoice || ''
        this.image = data.image || {}
        this.attachFile = data.attachFile || {}
        this.priceLevel = data.priceLevel || {}
        this.cashPayment = data.cashPayment || {}
        this.bankDisbursement = data.bankDisbursement || {}
        this.chequePayment = data.chequePayment || {}

        // Map with B Kethya's fields
        if (data.uuid) {
            this.id = data.uuid;
        } else if (data.id) {
            this.uuid = data.id;
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}