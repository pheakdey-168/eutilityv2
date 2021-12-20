import { UserModel, ContactModel, CurrencyModel } from "@/scripts/model/AppModels";

const store = require("@/institute");
const { institute } = store.default.state;
const { instituteId } = store.default.state.cookies;

export default class CashAdvance {
    constructor(data = {}) {
        this.uuid                       = data.uuid || '';
        this.number                     = data.number || '';
        this.ref_number                 = data.ref_number || '';
        this.description                = data.description || '';

        this.advance_date               = data.advance_date || new Date().toISOString().substr(0, 10);
        this.expected_date              = data.expected_date || null;
        this.expected_settlement_date   = data.expected_settlement_date || null;
        this.request_date               = data.request_date || null;
        this.approve_date               = data.approve_date || null;
        this.status                     = data.status || '';
        this.currency                   = data.currency || new CurrencyModel(institute.baseCurrency);
        this.details                    = data.details || [];

        this.is_settled                 = data.is_settled || 0;
        this.settled_date               = data.settled_date || null;
        this.settlement_uuid            = data.settlement_uuid || null;
        this.requested_by               = data.requested_by || new ContactModel();
        this.approved_by                = data.approved_by || new ContactModel();

        this.journal_uuid               = data.journal_uuid || '';
        this.institute_id               = data.institute_id || instituteId;
        this.is_draft                   = data.is_draft || 0;

        //Sidebar
        this.project_uuid               = data.project_uuid || '';
        this.segment_uuid               = data.segment_uuid || '';
        this.month_of                   = data.month_of || '';
        
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