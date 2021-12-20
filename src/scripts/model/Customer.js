export default class Customer {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.type = data.type || {}
            this.crn = data.crn || ''
            this.customerType = data.customerType || {}
            this.number = data.number || ''
            this.subOfCustomer = data.subOfCustomer || {}
            this.billingType = data.billingType || {}
            this.name = data.name || ''
            this.registeredDate = data.registeredDate || new Date().toISOString().substr(0, 10)
            this.alternativeName = data.alternativeName || ''
            this.consumerId = data.consumerId || ''
            this.contactAddress = data.contactAddress || {
                gender: {},
                phoneNumber: '',
                email: '',
                dob: new Date().toISOString().substr(0, 10),
                address: [],
                latitude: '',
                longitude: '',
                website: '',
                description: ''
            }
            this.paymentBilling = data.paymentBilling || {
                customerGroup: {},
                paymentTerm: {},
                priceLevel: {},
                discountPrice: {},
                paymentMethod: {},
                assignTo: {},
                warehouse: {},
                creditLimit: 0,
                defaultDiscountRate: {},
                defaultPriceLevel: {}
            }
            this.accountTax = data.accountTax || {
                accReceivable: {},
                accSaleDeposit: {},
                accSettlementDiscount: {},
                defaultTax: {},
                defaultTaxOnShipping: {},
            }
            this.noteOnInvoice = data.noteOnInvoice || ''
            this.image = data.image || {}
            this.attachFile = data.attachFile || {}
            this.contactPerson = data.contactPerson || []
        } else {
            this.id = ''
            this.type = {}
            this.crn = ''
            this.customerType = data.customerType || {}
            this.number = ''
            this.subOfCustomer = {}
            this.billingType = {}
            this.name = ''
            this.registeredDate = new Date().toISOString().substr(0, 10)
            this.alternativeName = ''
            this.consumerId = ''
            this.contactAddress = {
                gender: {},
                phoneNumber: '',
                email: '',
                dob: new Date().toISOString().substr(0, 10),
                address: [],
                latitude: '',
                longitude: '',
                website: '',
                description: ''
            }
            this.paymentBilling = {
                customerGroup: {},
                paymentTerm: {},
                priceLevel: {},
                discountPrice: {},
                paymentMethod: {},
                assignTo: {},
                warehouse: {},
                creditLimit: 0,
                defaultDiscountRate: {},
                defaultPriceLevel: {}
            }
            this.accountTax = {
                accReceivable: {},
                accSaleDeposit: {},
                accSettlementDiscount: {},
                defaultTax: {},
                defaultTaxOnShipping: {},
                // defaultTax: {},
            }
            this.noteOnInvoice = ''
            this.image = {}
            this.attachFile = {}
            this.contactPerson = []
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}