import { SupplierModel, CurrencyModel, ContactModel, UserModel } from "@/scripts/model/AppModels";

const store = require("@/institute")
const { instituteId } = store.default.state.cookies

export default class Expense {
    constructor(data = {}) {
        this.uuid                       = data.uuid || ''
        this.journal_uuid               = data.journal_uuid || ''
        this.number                     = data.number || ''
        this.date                       = data.date || new Date().toISOString().substr(0, 10)
        this.due_date                   = data.due_date || new Date().toISOString().substr(0, 10)
        this.bill_date                  = data.bill_date || new Date().toISOString().substr(0, 10)
        this.bill_number                = data.bill_number || ''
        this.bill_currency              = data.bill_currency || new CurrencyModel()
        this.supplier                   = data.supplier ||new ContactModel()
        this.employee                   = data.employee ||new ContactModel()
        this.payment_term               = data.payment_term || '' //uuid
        this.segment_uuid               = data.segment_uuid || ''
        this.location_uuid              = data.location_uuid || ''
        this.project_uuid               = data.project_uuid || ''
        this.month_of                   = data.month_of || ''
        this.additional_cost_supplier   = data.additional_cost_supplier || new SupplierModel()
        this.use_for_option             = data.use_for_option || 0 // 1=Reimburst, 2=Cash Advance
        this.made_with_option           = data.made_with_option || 1 // 1=Cash, 2=Credit, 3=R/C
        this.use_for_transaction_uuid   = data.use_for_transaction_uuid || ''
        this.voucher_note               = data.voucher_note || ''
        this.journal_note               = data.journal_note || ''
        this.expense_entries            = data.expense_entries || []
        this.template                   = data.template || null
        this.institute_id               = data.institute_id || instituteId
        this.is_draft                   = data.is_draft || 0

        // Trackable Entity
        this.created_by                 = data.created_by || new UserModel();
        this.modified_by                = data.modified_by || new UserModel();
        this.created_date               = data.created_date || null;
        this.modified_date              = data.modified_date || null;
    }
    
    constuct(data) {
        this.constructor(data);
    }
}