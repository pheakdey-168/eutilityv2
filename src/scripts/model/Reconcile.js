import { AccountModel, UserModel } from "@/scripts/model/AppModels";

const store = require("@/institute");
const { instituteId } = store.default.state.cookies;

export default class Reconciliation {
    constructor(data = {}) {
        this.uuid                   = data.uuid || ''
        this.number                 = data.number || ''        
        this.type                   = data.type || ''
        this.start_date             = data.start_date || null
        this.end_date               = data.end_date || null
        this.date                   = data.date || new Date().toISOString().substr(0, 10)
        this.ending_balance_date    = data.ending_balance_date || new Date().toISOString().substr(0, 10)
        this.actual_amount          = data.actual_amount || 0
        this.variance_amount        = data.variance_amount || 0        
        this.opening_balance        = data.opening_balance || 0
        this.ending_balance         = data.ending_balance || 0
        this.account                = data.account || new AccountModel()
        this.adjustment_account     = data.adjustment_account || new AccountModel()
        this.notes                  = data.notes || [] // List of money note
        this.reconcile_entries      = data.reconcile_entries || [] // List of entry_uuid to update is_reconciled = 1
        this.bank_statement_uuid    = data.bank_statement_uuid || '' // Use in bank feed
        this.is_draft               = data.is_draft || 0
        this.is_bank_reconcile      = data.is_bank_reconcile || 0
        this.institute_id           = data.institute_id || instituteId        
        
        // Trackable Entity
        this.created_by                 = data.created_by || new UserModel();
        this.modified_by                = data.modified_by || new UserModel();
        this.created_date               = data.created_date || null;
        this.modified_date              = data.modified_date || null;
    }
    
    constuct(data) {
        this.constructor(data)
    }
}