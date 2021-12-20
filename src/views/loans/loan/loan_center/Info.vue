<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="text-uppercase" style="width: 50%;">{{ $t('name') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ name }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('type') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ type }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('contract_number') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ loanNumber }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('loan_status') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ loanStatus }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('loan_product') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ loanProduct }}</td>
                    </tr>
                    <tr>
                        <td class="third white--text text-uppercase mt-5" style="width: 50%;">{{
                                $t('disbursed_amt')
                            }}
                        </td>
                        <td class="third  white--text text-center">:</td>
                        <td class="third white--text text-left text-bold mt-5">{{ amount }}</td>
                    </tr>
                    <tr>
                        <td class="third white--text text-uppercase">{{ $t('interest_rate') }}</td>
                        <td class="third  white--text text-center">:</td>
                        <td class="third white--text text-left text-bold">{{ interestRate }}</td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('loan_term') }}</td>
                        <td class=" secondary white--text text-center">:</td>
                        <td class="secondary white--text text-left text-bold mt-5">{{ loanTerm }}</td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('payment_code') }}</td>
                        <td class=" secondary white--text text-center">:</td>
                        <td class="secondary white--text text-left text-bold mt-5">{{ paymentCode }}</td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('currency') }}</td>
                        <td class=" secondary white--text text-center">:</td>
                        <td class="secondary white--text text-left text-bold mt-5">{{ currencyCode }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <v-dialog v-model="showReceipt" max-width="800px">
                        <template v-slot:activator="{ }">
                            <v-btn width="200" v-show="btnEnabled" color="primary"
                                   class="float-right  white--text text-capitalize mr-3 "
                                   @click="receiptLoan(false)">
                                {{ $t('reciept_') }}
                            </v-btn>
                        </template>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card>
                                <v-card-title>{{ loanName }}</v-card-title>
                                <v-icon class="btn_close" @click="showReceipt = false">close</v-icon>
                                <v-divider/>
                                <v-card-text style="height: 430px; background-color: #EDF1F5; color: #333333;">
                                    <v-row>
                                        <v-col sm="4" cols="12" class="pb-0">
                                            <label class="label">{{ $t('date') }}</label>
                                            <app-datepicker
                                                class="mt-1"
                                                :initialDate="r.issuedDate"
                                                @emitDate="r.issuedDate = $event"/>
                                        </v-col>
                                        <v-col sm="4" cols="12" class="pb-0">
                                            <label class="label">{{ $t('number') }}</label>
                                            <v-text-field
                                                v-model="r.number"
                                                class="mt-1"
                                                outlined
                                                placeholder=""/>
                                        </v-col>
                                        <v-col sm="4" cols="12" class="pb-0">
                                            <label class="label">{{ $t('currency') }}</label>
                                            <p style="font-weight: bold; font-size: 18px; margin-bottom: 0; margin-top: 10px;">
                                                {{ currencyCode }}</p>
                                        </v-col>
                                        <v-col sm="4" cols="12" class="pb-0">
                                            <label class="label">{{ $t('cash_account') }}</label>
                                            <v-select
                                                class="mt-1"
                                                :items="cashAccounts"
                                                :placeholder="$t('select')"
                                                disabled
                                                :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                tage=""
                                                v-model="r.cashAccount"
                                                :rules="[v => !!v || 'Cash account is required']"
                                                return-object
                                                outlined/>
                                        </v-col>
                                        <v-col sm="4" cols="12" class="pb-0">
                                            <label class="label">{{ $t('receipt_amount') }}</label>
                                            <p style="font-weight: bold; font-size: 22px; margin-bottom: 0; margin-top: 10px;">
                                                {{ receiptAmount }}</p>
                                        </v-col>
                                    </v-row>
                                    <template>
                                        <kendo-datasource
                                            ref="receiptList"
                                            :change="dataSourceChanged"
                                            :data="schedules"/>
                                        <kendo-grid
                                            id="gridSaleDeposit" class="grid-function"
                                            :data-source-ref="'receiptList'"
                                            :sortable="true"
                                            :filterable="false"
                                            :column-menu="false"
                                            :editable="true"
                                            :scrollable-virtual="true"
                                        >
                                            <kendo-grid-column
                                                :field="'date'"
                                                :title="$t('payment_date')"
                                                :width="200"
                                                :editable="()=>{ return false}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'principal'"
                                                :title="$t('principle_amount')"
                                                :width="200"
                                                :editable="()=>{ return false}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'interest'"
                                                :title="$t('interest')"
                                                :width="200"
                                                :format="'{0:n}'"
                                                :editable="()=>{ return false}"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'total'"
                                                :title="$t('total_payment')"
                                                :width="200"
                                                :format="'{0:n}'"
                                                :editable="()=>{ return false}"
                                                :hidden="true"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                            <kendo-grid-column
                                                :field="'penalty'"
                                                :title="$t('penalty')"
                                                :width="200"
                                                :format="'{0:n}'"
                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            />
                                        </kendo-grid>
                                        <!--                                        <v-simple-table class="attachment_table">-->
                                        <!--                                            <template v-slot:default>-->
                                        <!--                                                <thead>-->
                                        <!--                                                <tr>-->
                                        <!--                                                    <th class="text-uppercase">{{ $t('payment_date') }}</th>-->
                                        <!--                                                    <th class="text-uppercase">{{ $t('principle_amount') }}</th>-->
                                        <!--                                                    <th class="text-uppercase">{{ $t('interest_amount') }}</th>-->
                                        <!--                                                    <th class="text-uppercase">{{ $t('total_payment') }}</th>-->
                                        <!--                                                    <th class="text-uppercase">{{ $t('penalty') }}</th>-->
                                        <!--                                                </tr>-->
                                        <!--                                                </thead>-->
                                        <!--                                                <tbody>-->
                                        <!--                                                <tr v-for="d in schedules" v-bind:key="d.id">-->
                                        <!--                                                    <td>{{ d.date }}</td>-->
                                        <!--                                                    <td class="">{{ d.principal }}</td>-->
                                        <!--                                                    <td class="">{{ d.interest }}</td>-->
                                        <!--                                                    <td class="">{{ d.total }}</td>-->
                                        <!--                                                    <td class="">{{ d.penalty }}</td>-->
                                        <!--                                                </tr>-->
                                        <!--                                                </tbody>-->
                                        <!--                                            </template>-->
                                        <!--                                        </v-simple-table>-->
                                    </template>
                                </v-card-text>
                                <v-divider/>
                                <v-card-actions class="pa-4">
                                    <v-row>
                                        <v-col sm="6" cols="6" class="py-0">
                                            <v-btn color="black"
                                                   outlined
                                                   class=" text-capitalize rounded-pill black--text float-left"
                                                   @click="showReceipt = false">{{ $t('cancel') }}
                                            </v-btn>
                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-0">
                                            <v-btn color="secondary"
                                                   v-show="!isPaid"
                                                   class="px-3 rounded-pill white--text text-capitalize float-right"
                                                   @click="addJournal">
                                                {{ $t('save') }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-col>
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            type="loading"
            :myLoading="true"
            :alertMessage="loadingAlert"
            :color="loadingColorAlert"
            :alertText="loadingTextAlert"/>
    </v-row>
</template>
<script>
import {i18n} from '@/i18n';
import kendo from "@progress/kendo-ui"
import Helper from "@/helper.js"

const memberHandler = require('@/scripts/memberHandler')
const saleFormContentHandler = require("@/scripts/saleFormContentHandler")
const $ = kendo.jQuery
import LoanReceiptModel from '@/scripts/model/credit/LoanReceipt'

// const accountHandler = require("@/scripts/accountHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const loanHandler = require("@/scripts/loanHandler")
// journal
const store = require("@/institute.js")
const {cookies} = store.default.state
import {JournalModel, UserModel} from "@/scripts/model/AppModels"

const {journalHandler} = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")
import {dataStore} from '@/observable/store'

export default {
    name: "LoanInfo",
    props: {loan: {}},
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': () => import('@/components/custom_templates/DatePickerComponent')
    },
    computed: {
        name() {
            if (this.loan) {
                // window.console.log(this.loan, 'loan info')
                if (this.loan.hasOwnProperty('name')) {
                    return this.loan.name
                }
            }
            return ''
        },
        loanNumber() {
            if (this.loan) {
                if (this.loan.hasOwnProperty('number')) {
                    return this.loan.number
                }
            }
            return ''
        },
        type() {
            if (this.loan) {
                if (this.loan.hasOwnProperty('type')) {
                    return i18n.t(this.loan.type.toLowerCase())
                }
            }
            return ''
        },
        loanProduct() {
            if (this.loan) {
                // window.console.log(this.loan, 'loan product')
                if (this.loan.hasOwnProperty('product')) {
                    return this.loan.product.name
                }
            }
            return ''
        },
        interestRate() {
            if (this.loan) {
                if (this.loan.hasOwnProperty('interestRatePerMonth')) {
                    return this.loan.interestRatePerMonth.interestRate + "%"
                }
            }
            return ''
        },
        paymentCode() {
            if (this.loan) {
                if (this.loan.hasOwnProperty('paymentCode')) {
                    return this.loan.paymentCode
                }
            }
            return ''
        },
        amount() {
            if (this.loan) {
                if (this.loan.hasOwnProperty('disburseAmount')) {
                    return kendo.toString(parseFloat(this.loan.disburseAmount), this.numberFormat)
                }
            }
            return ''
        },
        disburse() {
            if (this.loan) {
                if (this.loan.hasOwnProperty('amount')) {
                    return kendo.toString(parseFloat(this.loan.amount), this.numberFormat)
                }
            }
            return ''
        },
        // btnEnabled() {
        //     return !this.loan.id
        // },
        loanName() {
            if (this.loan) {
                return this.loan.number + '-' + this.loan.name
            }
            return ''
        },
        loanStatus() {
            if (this.loan) {
                if (this.loan.hasOwnProperty('number')) {
                    let v = this.loan
                    let status = i18n.t('close')
                    if (v.status == 1) {
                        status = i18n.t('padding')
                    } else if (v.status == 2) {
                        status = i18n.t('approved')
                    } else if (v.status == 3) {
                        status = i18n.t('disbursed')
                    } else if (v.status == 4) {
                        status = i18n.t('rejected')
                    }
                    if(v.status == 3){
                        this.receiptLoan(true)
                    }
                    return status
                }
            }
            return ''
        },
        loanTerm() {
            if (this.loan) {
                return this.loan.period
            }
            return ''
        },
        currencyCode() {
            if (this.loan) {
                if (this.loan.hasOwnProperty('currency')) {
                    return this.loan.currency.code
                }
            }
            return ''
        },
        textDelete() {
            return i18n.t('delete')
        }
    },
    data: () => ({
        errors: [],
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        loggedUser: new UserModel(cookies.user),
        valid: true,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        balance: 0,
        saleFormContent: {},
        receiptAmount: 0,
        interestAmount: 0,
        showReceipt: false,
        currencyList: [],
        cashAccounts: [],
        decimals: [],
        numberFormat: 'n0',
        exchangeRate: {},
        rate: 1,
        r: new LoanReceiptModel({}),
        schedules: [],
        penaltyAccount: {},
        isPaid: false,
        segment: {},
        pin: dataStore.pin,
        btnEnabled: false,
        accountName: ''
    }),
    watch: {},
    methods: {
        async loadDecimal() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.decimalGet().then(res => {
                        this.decimals = res.data.data
                    })
                }, 300);
            })
        },
        async loadSaleFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.saleFormContent = data[0]
                            }
                        }
                    })
                }, 300)
            })
        },
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.r.issuedDate).toISOString().substr(0, 10)
                    let code = this.currencyCode
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const response = res.data.data[0]
                                this.exchangeRate = response
                                this.rate = response.rate
                                this.showLoading = false
                                this.r.userPin = this.pin
                                this.r.rate = response.rate
                                this.r.exchangeRate = response
                            }
                        })
                    }
                }, 300)
            })
        },
        async loadAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true
                    this.cashAccounts = []
                    loanHandler.businessSettingGet().then((res) => {
                        this.showLoading = false
                        if (res.data.data.length > 0) {
                            let d = res.data.data.filter((obj) => {return obj.type == 'Credit'})
                            //Receivable Account
                            if(d.length > 0) {
                                this.cashAccounts.push(d[0].cashAccount)
                                this.r.cashAccount = this.cashAccounts[0]
                            }else{
                                this.$snotify.error('Please set cash account on credit setting')
                                this.cancel()
                            }
                        }else{
                            this.$snotify.error('Please set cash account on credit setting')
                            this.cancel()
                        }
                    });
                }, 10)
            });
        },
        saveReceipt() {
            // window.console.log(this.r)
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    memberHandler.createLoanReceipt(new LoanReceiptModel(this.r)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Successfully')
                            // window.history.go(-1);
                        }
                    }).catch(e => {
                        this.showLoading = false
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        window.console.log(e, 'error')
                    })
                }, 300)
            })
        },
        async addJournal() {
            let int = 0
            $.each(this.schedules, function (i, v) {
                int += parseFloat(v.int)
            })
            this.r.penaltyAmount = int
            const obj = this.r
            const seg = this.segment
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            // let customer = this.loan.member
            let customer = {
                id: this.loan.member.id,
                name: this.loan.member.name
            }
            if (this.r.receiptAmount <= 0) {
                this.$snotify.error('Amount must be over 0')
                return
            }
            this.showLoading = true
            // API Journal
            let self = this;
            let jj = []
            jj.push({
                "uuid": "",
                "account": obj.cashAccount,
                "description": '',
                "primary_contact": customer,
                "third_contacts": [],
                "ref_number": '',
                "amount": parseFloat(obj.receiptAmount),
                "discount": {},
                "mark_up": 0,
                "billable": 0,
                "tax_code": "",
                "payment_method": {},
                "currency": this.exchangeRate,
                "exchange_rate_uuid": "",
                "exchange_rate": this.rate,
                "exchanged_amount": parseFloat(obj.receiptAmount) * parseFloat(this.rate),
                "tax_amount": 0,
                "exchanged_tax_amount": 0,
                "is_reconciled": 0,
                "is_settled": 0,
                "class_1_uuid": "",
                "class_2_uuid": "",
                "class_3_uuid": "",
                "class_4_uuid": "",
                "class_5_uuid": "",
                "payment_method_as": "",
                "created_by": null,
                "modified_by": null,
                "created_date": null,
                "modified_date": null
            })
            if (obj.principalAmount > 0) {
                jj.push({
                    "uuid": "",
                    "account": this.loan.product.loanAccount,
                    "description": '',
                    "primary_contact": customer,
                    "third_contacts": [],
                    "ref_number": '',
                    "amount": (parseFloat(obj.principalAmount) * -1),
                    "discount": {},
                    "mark_up": 0,
                    "billable": 0,
                    "tax_code": "",
                    "payment_method": {},
                    "currency": this.exchangeRate,
                    "exchange_rate_uuid": "",
                    "exchange_rate": this.rate,
                    "exchanged_amount": ((parseFloat(obj.principalAmount) * -1) * parseFloat(this.rate)),
                    "tax_amount": 0,
                    "exchanged_tax_amount": 0,
                    "is_reconciled": 0,
                    "is_settled": 0,
                    "class_1_uuid": "",
                    "class_2_uuid": "",
                    "class_3_uuid": "",
                    "class_4_uuid": "",
                    "class_5_uuid": "",
                    "payment_method_as": "",
                    "created_by": null,
                    "modified_by": null,
                    "created_date": null,
                    "modified_date": null
                })
            }
            if (obj.interestAmount > 0) {
                jj.push({
                    "uuid": "",
                    "account": this.loan.product.interestRevenueAccount,
                    "description": '',
                    "primary_contact": customer,
                    "third_contacts": [],
                    "ref_number": '',
                    "amount": (parseFloat(obj.interestAmount) * -1),
                    "discount": {},
                    "mark_up": 0,
                    "billable": 0,
                    "tax_code": "",
                    "payment_method": {},
                    "currency": this.exchangeRate,
                    "exchange_rate_uuid": "",
                    "exchange_rate": this.rate,
                    "exchanged_amount": ((parseFloat(obj.interestAmount) * -1) * parseFloat(this.rate)),
                    "tax_amount": 0,
                    "exchanged_tax_amount": 0,
                    "is_reconciled": 0,
                    "is_settled": 0,
                    "class_1_uuid": "",
                    "class_2_uuid": "",
                    "class_3_uuid": "",
                    "class_4_uuid": "",
                    "class_5_uuid": "",
                    "payment_method_as": "",
                    "created_by": null,
                    "modified_by": null,
                    "created_date": null,
                    "modified_date": null
                })
            }
            if (obj.penaltyAmount > 0) {
                jj.push({
                    "uuid": "",
                    "account": this.penaltyAccount,
                    "description": '',
                    "primary_contact": customer,
                    "third_contacts": [],
                    "ref_number": '',
                    "amount": (parseFloat(obj.penaltyAmount) * -1),
                    "discount": {},
                    "mark_up": 0,
                    "billable": 0,
                    "tax_code": "",
                    "payment_method": {},
                    "currency": this.exchangeRate,
                    "exchange_rate_uuid": "",
                    "exchange_rate": this.rate,
                    "exchanged_amount": ((parseFloat(obj.penaltyAmount) * -1) * parseFloat(this.rate)),
                    "tax_amount": 0,
                    "exchanged_tax_amount": 0,
                    "is_reconciled": 0,
                    "is_settled": 0,
                    "class_1_uuid": "",
                    "class_2_uuid": "",
                    "class_3_uuid": "",
                    "class_4_uuid": "",
                    "class_5_uuid": "",
                    "payment_method_as": "",
                    "created_by": null,
                    "modified_by": null,
                    "created_date": null,
                    "modified_date": null
                })
            }
            let data = {
                "number": this.journalNumber,
                "description": "Loan Receipt",
                "journal_type": "general_journal",
                "journal_date": new Date(obj.issuedDate),
                "currency_code": this.currencyCode,
                "buinsess_unit_uuid": "",
                "location_uuid": "",
                "project_uuid": "",
                "segment_uuid": seg.id,
                "journal_entries": jj,
                "transaction_type": "journal",
                "is_draft": 0,
                "is_reversed": 0,
                "prefix_format": this.journalPrefix,
                "created_by": this.loggedUser
            }
            journalHandler.save(new JournalModel(data))
                .then(function (response) {
                    self.r.journalId = response.data.uuid
                    self.saveReceipt()
                })
                .catch(function (error) {
                    Helper.alertErrorMsg(error)
                    window.console.log(error)
                })
                .finally(() => {
                    self.showLoading = false;
                });
        },
        async receiptLoan(isSelectRow) {
            let dec = this.decimals.filter((obj) => {
                return obj.currency.code == this.currencyCode
            })
            let fo = 0
            if (dec.length > 0) {
                fo = dec[0].decimal
            }
            this.numberFormat = 'n' + fo
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        loanId: this.loan.id,
                        requestedDate: kendo.toString(new Date(), 'yyyy-MM-dd')
                    }
                    this.showLoading = true
                    this.schedules = []
                    this.receiptAmount = 0
                    this.interestAmount = 0
                    this.btnEnabled = false
                    memberHandler.receiptLoan(data).then(res => {
                        this.showLoading = false
                        if (res.data.statusCode === 200) {
                            if(isSelectRow == false) {
                                if(res.data.data.length == 0){
                                    this.btnEnabled = false
                                }else {
                                    this.btnEnabled = true
                                    const data = res.data.data
                                    this.loadTransactionRate()
                                    this.calReceipt(data)
                                }
                            }else{
                                if(res.data.data.length == 0){
                                    this.btnEnabled = false
                                }else{
                                    this.btnEnabled = true
                                }
                            }
                        }
                    })
                }, 300)
            })
        },
        calReceipt(data) {
            if (data.length > 0) {
                let total = 0
                let interest = 0
                let s = []
                let self = this
                let penalty = 0
                let ss = []
                $.each(data, function (i, v) {
                    interest += parseFloat(v.data.interest)
                    s.push(v.data)
                    let p = self.loan
                    // window.console.log(p, 'ss')
                    let int = 0
                    let startdate = new Date(v.data.date)
                    let enddate = new Date()
                    let months = enddate.getMonth() - startdate.getMonth() + (12 * (enddate.getFullYear() - startdate.getFullYear()))
                    if (months >= 3) {
                        int = (parseFloat(v.data.interest) * parseFloat(p.product.dueThreeMonth)) / 100
                    } else if (months < 3 && months >= 2) {
                        int = (parseFloat(v.data.interest) * parseFloat(p.product.dueTwoMonth)) / 100
                    } else if (months == 1) {
                        int = (parseFloat(v.data.interest) * parseFloat(p.product.dueOneMonth)) / 100
                    }
                    ss.push({
                        id: v.id,
                        date: v.data.date,
                        principal: kendo.toString(parseFloat(v.data.principal), v.data.numberFormat),
                        interest: kendo.toString(parseFloat(v.data.interest), v.data.numberFormat),
                        total: kendo.toString(parseFloat(v.data.total), v.data.numberFormat),
                        penalty: int
                    })
                    total += parseFloat(v.data.total) + int
                    penalty += int
                })
                if (ss.length > 0) {
                    this.schedules = ss
                }
                if (total > 0) {
                    this.r.penaltyAmount = penalty
                    this.r.schedules = this.schedules
                    this.r.loan = {
                        id: this.loan.id,
                        name: this.loan.name,
                        product: {
                            id: this.loan.product.id,
                            name: this.loan.product.name
                        }
                    }
                    this.r.member = {
                        id: this.loan.member.id,
                        name: this.loan.member.name
                    }
                    this.r.paidAmount = this.loan.paidAmount
                    this.r.principalPaidAmount = this.loan.principalPaidAmount
                    this.r.interestPaidAmount = this.loan.interestPaidAmount
                    this.receiptAmount = kendo.toString(total, this.numberFormat)
                    this.interestAmount = kendo.toString(interest, this.numberFormat)
                    this.r.receiptAmount = total
                    this.r.interestAmount = interest
                    this.r.principalAmount = total - interest
                    this.showReceipt = true
                    // window.console.log(this.r, 'recepot data')
                } else {
                    this.isPaid = true
                    this.$snotify.success('Already paid!')
                    // this.schedules = []
                    this.showReceipt = true
                }
            } else {
                this.isPaid = true
                this.$snotify.success('Already paid!')
                // this.schedules = []
                this.showReceipt = true
            }
        },
        // jounal
        async getJournalNumber() {
            let num = await Helper.generateAccoutingNumber(this.journalTxnType, this.r.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
            this.r.number = num.number
            this.r.journalNumber = num.number
        },
        async loadSinglePenalty() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.penaltyGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if (res.data.data.length > 0) {
                                this.penaltyAccount = res.data.data[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]
                window.console.log(dataRow)
            }
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segment = {}
                    loanHandler.businessSettingGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let s = res.data.data.filter((obj) => {
                                return obj.type == "Credit"
                            })
                            if (s.length > 0) {
                                this.segment = s[0].segment
                            } else {
                                this.$snotify.error('Please select segment on setting page')
                                this.cancel()
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadAccountName() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    loanHandler.accountNameGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if (res.data.data.length > 0) {
                                this.accountName = res.data.data[0].name
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
    },
    mounted: async function () {
        // await this.loadCurrencyData()
        await this.loadDecimal()
        await this.loadSegment()
        await this.getJournalNumber()
        await this.loadSinglePenalty()
        await this.loadAccountName()
    },
    created: async function () {
        await this.loadAccount()
    }
}
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
}

.theme--light.v-data-table {
    background-color: transparent !important;
    border-top: thin solid #ddd;
    border-bottom: thin solid #ddd;
    border-radius: 0 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
}

.v-application .third,
.v-application .secondary {
    border-color: #fff !important;
}
</style>