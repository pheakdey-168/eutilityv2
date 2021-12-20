import { ContactModel, JournalModel, CurrencyModel, UserModel } from "@/scripts/model/AppModels";

const store = require("@/institute")
// const { institute } = store.default.state
const { instituteId } = store.default.state.cookies

export default class Reimbursement {
    constructor(data = {}) {
        this.uuid                       = data.uuid || ''
        this.number                     = data.number || ''
        this.description                = data.description || ''
        this.reimbursement_date         = data.reimbursement_date || new Date().toISOString().substr(0, 10)
        this.expenses                   = data.expenses || []
        this.currency                   = data.currency || new CurrencyModel()

        this.is_draft                   = data.is_draft || 0
        this.reciever                   = data.reciever || new ContactModel()
        this.payer                      = data.payer || new ContactModel()
        this.institute_id               = data.institute_id || instituteId

        this.details                    = data.details || []
        this.journal                    = data.journal || new JournalModel()
        this.journal_entries            = data.journal_entries || []

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