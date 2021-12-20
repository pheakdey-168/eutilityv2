<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="12" cols="12" style="transition: .3s ease-in;">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <div class="function_header">
                                        <h2>{{ $t('close_loan') }}</h2>
                                        <v-icon
                                            onclick="window.history.go(-1); return false;"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </div>
                                    <div class="">
                                        <!-- Form -->
                                        <v-form
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation>
                                            <v-col>
                                                <v-row>
                                                    <v-col sm="6" cols="12" class="pl-0 pb-0">
                                                        <label class="label mb-0">{{ $t('date') }}</label>
                                                        <app-datepicker
                                                            class="mt-1"
                                                            :initialDate="l.issuedDate"
                                                            @emitDate="l.issuedDate = $event"/>
                                                        <label
                                                            class="label mb-0">{{ $t('transaction_number') }}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="l.number"
                                                            outlined
                                                            disabled
                                                            :rules="[v => !!v || 'Number is required']"
                                                        />
                                                        <label class="label  mb-0">{{ $t('loan') }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="loanList"
                                                            :placeholder="$t('select')"
                                                            item-text="name"
                                                            item-value="id"
                                                            tage=""
                                                            v-model="l.loan"
                                                            @change="loanChange"
                                                            :rules="[v => !!v || 'Loan is required']"
                                                            return-object
                                                            outlined/>
                                                        <label class="label  mb-0">{{ $t('cash_account') }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="cashAccounts"
                                                            :placeholder="$t('select')"
                                                            :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                            tage=""
                                                            v-model="l.cashAccount"
                                                            :rules="[v => !!v || 'Cash account is required']"
                                                            return-object
                                                            outlined/>
                                                        <label class="label">{{ $t('penalty_account') }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            outlined
                                                            return-object
                                                            id=""
                                                            :items="penaltyAccounts"
                                                            item-text="name"
                                                            item-value="id"
                                                            v-model="l.penaltyAccount"
                                                        />
                                                    </v-col>

                                                    <v-col sm="6" cols="6" class="pb-0 function_content pa-3">
                                                        <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                                min-height="50px" color="primary">
                                                            <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                                {{ $t('amount_remaining') }}:</h3>
                                                            <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                                                {{ numberFormata(totalRemainning) }}</h3>

                                                        </v-card>
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <tbody>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{
                                                                            $t('principal_remaining')
                                                                        }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">
                                                                        {{ numberFormata(l.principal) }}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{
                                                                            $t('interest_remaining')
                                                                        }} ({{ numberFormata(oldInterest) }})
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right pl-2 pt-2">
                                                                        <vue-numeric
                                                                            style="width: 100%;font-size: 18px;background-color: #ffff;border-radius: 4px;text-align: right;border: 1px solid #ddd !important; padding: 9px !important; margin-bottom: 15px;"
                                                                            class="mt-1 mr-2 mt-0 text-bold pa-4"
                                                                            currency=""
                                                                            separator=","
                                                                            v-bind:minus="false"
                                                                            v-bind:precision="inputDec"
                                                                            v-model="l.interest"
                                                                            @change="interestChange"
                                                                            outlined
                                                                        >
                                                                        </vue-numeric>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{
                                                                            $t('penalty_amount')
                                                                        }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right pl-2 pt-2">
                                                                        <vue-numeric
                                                                            style="width: 100%;font-size: 18px;background-color: #ffff;border-radius: 4px;text-align: right;border: 1px solid #ddd !important; padding: 9px !important; margin-bottom: 15px;"
                                                                            class="mt-1 mr-2 mt-0 text-bold pa-4"
                                                                            currency=""
                                                                            separator=","
                                                                            v-bind:minus="false"
                                                                            v-bind:precision="inputDec"
                                                                            v-model="l.penalty"
                                                                            @change="penaltyChange"
                                                                            outlined
                                                                        >
                                                                        </vue-numeric>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{
                                                                            $t('reference_no')
                                                                        }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right pl-2 pt-2">
                                                                        <v-text-field
                                                                            class="mt-1"
                                                                            v-model="l.referenceNumber"
                                                                            outlined
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{
                                                                            $t('currency')
                                                                        }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">
                                                                        {{currencyCode}}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-left pr-0">{{
                                                                            $t('rate')
                                                                        }}
                                                                    </td>
                                                                    <td class="text-center">:</td>
                                                                    <td class="text-right">
                                                                        {{ rate }}
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </template>

                                                        </v-simple-table>
                                                        <v-textarea
                                                            v-model="l.note"
                                                            class="mt-4"
                                                            solo
                                                            :label="$t('note')+'...'"
                                                            name="input-7-4">
                                                        </v-textarea>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-form>
                                        <!-- Grid -->
                                    </div>
                                    <div class="function_footer">
                                        <v-btn outlined color="#494846" class="float-left text-capitalize"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>

                                        <v-btn color="primary" class="float-right white--text text-capitalize"
                                               @click="saveClose">
                                            {{ $t('save_close') }}
                                        </v-btn>
                                    </div>
                                </v-form>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"/>
            <LoadingMe
                :isLoading="showLoadingData"
                :fullPage="true"
                :myLoading="true"/>
            <LoadingMe
                :isLoading="showLoadingLoan"
                :fullPage="true"
                :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
import Helper from "@/helper.js"
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
// import {DropDownList} from "@progress/kendo-vue-dropdowns"
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
import CloseLoanModel from '@/scripts/financing/model/CloseLoan'

const memberHandler = require("@/scripts/memberHandler")
const customerHandler = require("@/scripts/customerHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
// const loanHandler = require("@/scripts/loanHandler")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const prefixHandler = require("@/scripts/prefixHandler")
// const accountHandler = require("@/scripts/accountHandler")
import {accountHandler} from "@/scripts/AppHandlers";

const textField = 'name'
const keyField = 'id'
const customerItem = {[textField]: 'Select Customer...', [keyField]: null}
const memberItem = {[textField]: 'Select Member...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const store = require("@/institute.js")
const {cookies} = store.default.state

// journal
import {JournalModel, UserModel} from "@/scripts/model/AppModels"
import saleFormContentHandler from "@/scripts/saleFormContentHandler";
const { journalHandler } = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")
const loanHandler = require("@/scripts/financing/handler/loanHandler")
import VueNumeric from 'vue-numeric'
import LoanType from "@/scripts/default_setup/LoanType.js";
export default {
    data: () => ({
        valid: true,
        showLoading: false,
        showLoadingData: false,
        showLoadingLoan: false,
        errors: [],
        user: new UserModel(cookies.user),
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        textField: 'name',
        dataItemKey: 'id',
        selectMember: 'isMember',
        isMember: true,
        isCustom: false,
        cashAccounts: [],
        saleFormContent: {},
        currencyCode: '',
        invoiceType: {},
        lastNumber: {},
        scheduleAR: [],
        loanAmount: 0,
        rate: 1,
        //
        disbursList: [],
        l: new CloseLoanModel({}),
        loan: {},
        loanList: [],
        totalPayment: 0,
        monthlyPayment: 0,
        totalInterest: 0,
        //customer
        cusBaseUrl: customerHandler.search(),
        customerList: [],
        customerItem: customerItem,
        customerfilter: '',
        //member
        memBaseUrl: memberHandler.search(),
        memberList: [],
        memberItem: memberItem,
        memberfilter: '',
        decimals: [],
        numberFormat: 'c0',
        memberData: [],
        //journal
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        loggedUser: new UserModel(cookies.user),
        segments: [],
        segment: {},
        accountName: 'name',
        totalRemainning: 0,
        penaltyAccount: {},
        oldInterest: 0,
        inputDec: 2,
        penaltyAccounts: [],
        transactionType: {},
        suffix: ''
    }),
    components: {
        'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
        VueNumeric
    },
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.scheduleAR.kendoWidget(),
                index = ds.indexOf(dataItem);
            if (index === (this.scheduleAR.length - 1)) {
                return ''
            } else {
                return index + 1
            }
        },
        async loanChange() {
            window.console.log(this.l.loan, 'loan')
            this.currencyCode = this.l.loan.currency.code
            await this.loadTransactionRate()
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoadingLoan = true
                    loanHandler.loanScheduleGet(this.l.loan.id).then(res => {
                        this.showLoading = false
                        if (res.data.statusCode === 200) {
                            this.showLoadingLoan = false
                            let data = res.data.data
                            window.console.log(data, 'schedule')
                            let total = 0, self = this, int = 0
                            this.scheduleAR = []
                            $.each(data, function (i,v){
                                if(v.status == 1){
                                    total += parseFloat(v.data.principal)
                                    int += parseFloat(v.data.interest)
                                    self.scheduleAR.push(v)
                                }
                            })
                            this.totalRemainning = total + int
                            this.l.interest = int
                            this.oldInterest = int
                            this.l.principal = total
                            this.getLastNum()
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        addTotal() {
            this.scheduleAR.push({
                principal_r: '',
                principal: parseFloat(this.loan.amount),
                interest: this.totalInterest,
                total: this.totalPayment,
                date: 'Total',
                locale: this.currencyCode,
                numberFormat: this.numberFormat,
                transaction_number: '',
            })
            // window.console.log(this.scheduleAR, 'loan schedule')
        },
        makeBalance(amt) {
            let idx = parseFloat(this.loan.period) - 1
            let oamt = this.scheduleAR[idx].principal
            let namt = oamt + amt
            namt = parseFloat(namt.toFixed(this.saleFormContent.decimal))
            this.scheduleAR[idx].principal = namt
            this.scheduleAR[idx].total = this.scheduleAR[idx].interest + namt
        },
        fixRate(P, r, t) {
            // var C = 0;
            // var a = P*r;
            // var b = Math.pow((1+r), t);
            //     b = parseFloat(b.toFixed(2));
            // var c = 1/b;
            // var d = 1 - c;
            //     d = parseFloat(d.toFixed(2));
            // C = a/d;
            // console.log(P+"--"+r+"--"+t);
            // return C;
            let l = 1 / t, i = r * l, n = t
            let emi = i * P / [1 - Math.pow((1 + i), -n)]
            return emi
        },
        errorMessage() {
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        // async loadPrefix() {
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve('resolved');
        //             prefixHandler.get('invoice').then(res => {
        //                 if (res.data.statusCode === 200) {
        //                     this.showLoading = false
        //                     this.invoiceType = res.data.data[0]
        //                     this.getInvoiceLastNumber()
        //                 }
        //             })
        //         }, 300);
        //     })
        // },
        getInvoiceLastNumber() {
            let data = {
                abbr: this.invoiceType.abbr,
                structure: this.invoiceType.structure,
                transactionDate: this.l.issuedDate,
                sequcencing: this.invoiceType.sequcencing,
                type: 'Invoice',
                entity: 1
            }
            billingHandler.lastNumber(data).then(response => {
                if (response.data.statusCode === 200) {
                    this.lastNumber = response.data.data
                    // window.console.log(this.lastNumber, 'last number')
                }
            }).catch(e => {
                this.errors.push(e)
            })
        },
        getLoan() {
            window.console.log(this.l.member)
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    memberHandler.getLoanByMemberId(this.l.member.id).then(res => {
                        this.showLoading = false
                        this.loanList = res.data.data.filter((obj) => {
                            return obj.status == 3
                        })
                    })
                }, 300);
            })
        },
        //customer
        onCustomerChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.customer = value
            this.l.customer = value
            this.getLoan()
        },
        onCustomerFilterChange(event) {
            const filter = event.filter.value
            this.customerRequestData(0, filter, this.cusBaseUrl)
            this.customerfilter = filter
        },
        customerRequestData(skip, filter, baseUrl) {
            // window.console.log(baseUrl, 'requ')
            const url = baseUrl +
                `?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.customerAfterFetch)
        },
        customerAfterFetch(json) {
            this.customerList = json.data
        },
        //member
        selectMemberChange() {
            if (this.selectMember == 'isMember') {
                this.loan.isMember = 1
                this.memberData = this.memberList
            } else {
                this.loan.isMember = 2
                this.memberData = this.customerList
            }
            this.loan.member = {}
        },
        onMemberChange() {
            this.getLoan()
        },
        onMemberFilterChange(event) {
            const filter = event.filter.value
            this.memberRequestData(0, filter, this.memBaseUrl)
            this.memberfilter = filter
        },
        memberRequestData(skip, filter, baseUrl) {
            // window.console.log(baseUrl, 'requ')
            const url = baseUrl +
                `?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.memberAfterFetch)
        },
        memberAfterFetch(json) {
            this.memberList = json.data
        },
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.l.issuedDate).toISOString().substr(0, 10)
                    let code = this.currencyCode
                    if (code !== undefined || code !== '') {
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                const response = res.data.data[0]
                                // window.console.log(response, 'currency rate')
                                if(Object.keys(response).length > 0){
                                    this.exchangeRate = response
                                    this.l.exchangeRate = this.exchangeRate
                                    this.l.rate = response.rate
                                    this.rate = response.rate
                                }else{
                                    this.$snotify.error('Please set exchange rate on currency setting')
                                    this.cancel()
                                }
                                this.showLoading = false
                            }
                        })
                    }
                }, 300)
            })
        },
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
        numberFormata(value) {
            if (this.currencyCode) {
                value = parseFloat(value)
                return kendo.toString(value, this.numberFormat)
            }
        },
        //function
        async addEmpty() {
            this.l = new CloseLoanModel({})
            this.loan = {}
            this.customer = {}
            this.member = {}
            this.l.cashAccount = this.cashAccounts[0]
            this.currencyCode = ''
            await this.loadLoan()
        },
        cancel() {
            window.history.go(-1)
        },
        saveNew() {
            this.isSaveNew = true
            this.saveOption = 'saveNew'
            this.save()
        },
        saveClose() {
            this.isSaveNew = false
            this.saveOption = 'saveClose'
            this.addJournal()
        },
        async save() {
            this.l.saveOption = this.saveOption
            this.showLoadingData = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.closeLoanCreate(new CloseLoanModel(this.l)).then(response => {
                        this.showLoadingData = false
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Successfully')
                            window.history.go(-1)
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        window.console.log(e, 'error')
                    })
                }, 300);
            })
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
                            let s = res.data.data.filter((obj) => {return obj.type == "Credit"})
                            if(s.length > 0){
                                this.segment = s[0].segment
                            }else{
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
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        // window.console.log(res, 'acc')
                        //Receivable Account
                        this.cashAccounts = res.data.filter(m => m.account_type.number === 1).map(itm => {
                            return {
                                id: itm.uuid,
                                uuid: itm.uuid,
                                name: itm.name,
                                local_name: itm.local_name,
                                number: itm.number,
                                is_taxable: itm.is_taxable,
                                banhjiAccCode: itm.banhjiAccCode,
                                group_code: itm.group_code,
                                parent_account: itm.parent_account,
                                type_code: itm.type_code
                            }
                        })
                        this.penaltyAccounts = res.data.filter(m => m.account_type.number === 38).map(itm => {
                            return {
                                id: itm.uuid,
                                uuid: itm.uuid,
                                name: itm.name,
                                local_name: itm.local_name,
                                number: itm.number,
                                is_taxable: itm.is_taxable,
                                banhjiAccCode: itm.banhjiAccCode,
                                group_code: itm.group_code,
                                parent_account: itm.parent_account,
                                type_code: itm.type_code
                            }
                        })
                        if (this.penaltyAccounts.length > 0) {
                            this.l.penaltyAccount = this.penaltyAccounts[0]
                        }
                        if (this.cashAccounts.length > 0) {
                            this.l.cashAccount = this.cashAccounts[0]
                        }
                    })
                }, 300);
            })
        },
        // jounal
        async getJournalNumber() {
            let num = await Helper.generateAccountingNumber(this.journalTxnType, this.l.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
            this.l.journalNumber = num.number
        },
        async addJournal(){
            const obj = this.l
            // const seg = this.segment
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            if(this.scheduleAR.length == 0){
                this.l.user = this.loggedUser
                this.l.totalAmount = this.totalRemainning
                this.l.schedules = this.scheduleAR
                this.save()
                return
            }
            // let customer = obj.member
            // if(Object.keys(customer).length == 0){
            //     this.$snotify.error('Please select a member or customer')
            //     return
            // }
            if(Object.keys(obj.loan).length == 0){
                this.$snotify.error('Please select a loan number')
                return
            }
            this.showLoading = true
            let amt = parseFloat(this.totalRemainning) + parseFloat(obj.penalty)
            let journLine = []
            journLine.push({
                "uuid": "",
                "account": obj.loan.loanAccount,
                "description": obj.note,
                "primary_contact": {},
                "third_contacts": [],
                "ref_number": '',
                "amount": parseFloat(amt),
                "discount": {},
                "mark_up": 0,
                "billable": 0,
                "tax_code": "",
                "payment_method": {},
                "currency": this.exchangeRate,
                "exchange_rate_uuid": "",
                "exchange_rate": this.rate,
                "exchanged_amount": parseFloat(amt) * parseFloat(this.rate),
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
            journLine.push({
                "uuid": "",
                "account": obj.cashAccount,
                "description": this.journal.description,
                "primary_contact": {},
                "third_contacts": [],
                "ref_number": '',
                "amount": (parseFloat(this.totalRemainning) * -1),
                "discount": {},
                "mark_up": 0,
                "billable": 0,
                "tax_code": "",
                "payment_method": {},
                "currency": this.exchangeRate,
                "exchange_rate_uuid": "",
                "exchange_rate": this.rate,
                "exchanged_amount": ((parseFloat(this.totalRemainning) * -1)*parseFloat(this.rate)),
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
            if(obj.penalty > 0){
                journLine.push({
                    "uuid": "",
                    "account": obj.penaltyAccount,
                    "description": '',
                    "primary_contact": {},
                    "third_contacts": [],
                    "ref_number": '',
                    "amount": (parseFloat(obj.penalty) * -1),
                    "discount": {},
                    "mark_up": 0,
                    "billable": 0,
                    "tax_code": "",
                    "payment_method": {},
                    "currency": this.exchangeRate,
                    "exchange_rate_uuid": "",
                    "exchange_rate": this.rate,
                    "exchanged_amount": ((parseFloat(obj.penalty) * -1)*parseFloat(this.rate)),
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
            // API Journal
            let self = this;
            // let data = {
            //     "number": this.journalNumber,
            //     "description": obj.note,
            //     "journal_type": "general_journal",
            //     "journal_date": new Date(obj.issuedDate),
            //     "currency_code": this.currencyCode,
            //     "buinsess_unit_uuid": "",
            //     "location_uuid": "",
            //     "project_uuid": "",
            //     "segment_uuid": '',
            //     "journal_entries": journLine,
            //     "transaction_type": "journal",
            //     "is_draft": 0,
            //     "is_reversed": 0,
            //     "prefix_format": this.journalPrefix,
            //     "created_by": this.loggedUser
            // }
            this.journal.prefix_format = this.journalPrefix
            this.journal.journal_entries = journLine
            this.journal.currency_code = this.currencyCode
            this.journal.journal_date = Helper.toISODate(this.l.issuedDate)
            this.journal.created_by = this.loggedUser
            if(obj.loan.hasOwnProperty('segment')){
                this.journal.segment_uuid = obj.loan.segment.id
            }
            if(obj.loan.hasOwnProperty('location')){
                this.journal.location_uuid = obj.loan.location.id
            }
            journalHandler.save(new JournalModel(this.journal))
                .then(function (response) {
                    self.l.user = self.loggedUser
                    self.l.totalAmount = self.totalRemainning
                    self.l.schedules = self.scheduleAR
                    self.l.journalId =  response.data.uuid
                    self.save()
                })
                .catch(function (error) {
                    Helper.alertErrorMsg(error)
                    window.console.log(error)
                })
                .finally(() => {
                    self.showLoading = false;
                });
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
        //number
        // async getLastNumber() {
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve('resolved');
        //             let data = {
        //                 type: "CloseLoan",
        //             };
        //             loanHandler
        //                 .getLastNumber(data).then(res => {
        //                 this.l.lastNumber = res.data.data.lastNumber
        //                 this.generateNumber()
        //             }).catch(e => {
        //                 this.$snotify.error('Something went wrong')
        //                 this.errors.push(e)
        //                 // window.console.log(e)
        //             })
        //         }, 300);
        //     })
        // },
        // generateNumber(){
        //     let newNum = ''
        //     let abbr = 'CLOAN'
        //     let lnum = this.zeroPad(this.l.lastNumber, 6)
        //     newNum = abbr+lnum
        //     this.l.abbr = abbr
        //     this.l.number = newNum
        // },
        penaltyChange(){
            if(this.l.penalty > 0){
                this.totalRemainning += parseFloat(this.l.penalty)
            }
        },
        async loadSinglePenalty() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.penaltyGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if(res.data.data.length > 0) {
                                let a = res.data.data[0].Account
                                this.penaltyAccount = {
                                    id: a.id,
                                    uuid: a.id,
                                    banhjiAccCode: a.banhjiAccCode,
                                    group_code: a.group_code,
                                    is_taxable: a.is_taxable,
                                    local_name: a.local_name,
                                    name: a.name,
                                    number: a.number,
                                    parent_account: a.parent_account,
                                    type_code: a.type_code
                                }
                            }else{
                                this.$snotify.error('Please set penalty account on general setting')
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
        interestChange(){
            if(this.l.interest > this.oldInterest){
                this.$snotify.error('Interest amount invalid')
                this.l.interest = this.oldInterest
            }else{
                let int = this.oldInterest - this.l.interest
                this.totalRemainning -= int
            }
        },
        async loadSaleFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    saleFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.saleFormContent = data[0];
                                this.numberFormat = 'n' + this.saleFormContent.decimal
                                this.inputDec = parseInt(this.saleFormContent.decimal)
                            }
                        }
                    });
                }, 10);
            });
        },
        loadLoan() {
            this.showLoading = true
            this.loanList = []
            loanHandler.loanGets().then((res) => {
                if (res.data.statusCode === 200) {
                    const data = res.data.data;
                    if (data.length > 0) {
                        let d = data.filter((obj) => {return obj.status == 'active'})
                        if(d.length > 0) {
                            this.loanList = d
                        }else{
                            this.cancel()
                        }
                    }
                }
            })
        },
        generateNumber() {
            let data = {
                abbr: this.transactionType.abbr,
                structure: this.transactionType.structure,
                transactionDate: this.l.issuedDate,
                type: "Close Loan",
            };
            billingHandler
                .lastNumber(data)
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        const res = response.data.data;
                        this.suffix = res.suffix;
                        this.getLastNum();
                    }
                })
                .catch((e) => {
                    this.errors.push(e);
                });
        },
        getLastNum(){
            let d = {
                type: "CloseLoan",
            };
            loanHandler
                .getLastNumber(d)
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        this.showLoading = false
                        const res = response.data.data;
                        const lastNumber = this.zeroPad(
                            parseInt(res.lastNumber),
                            this.transactionType.format
                        );
                        this.l.lastNumber = parseInt(res.lastNumber)
                        const number =
                            this.suffix +
                            this.transactionType.numberSeparator +
                            lastNumber;
                        let des = ''
                        if(Object.keys(this.l.loan).length > 0){
                            des = `Close Loan from ${this.l.loan.financialInstitutions.name} For Loan Number ${this.l.loan.approveNumber}`;
                        }
                        window.console.log()
                        this.journal = new JournalModel({
                            description: des,
                            transaction_type: LoanType.CLOSE,
                            journal_type: LoanType.CLOSE,
                        });
                        this.journal.abbr = this.transactionType.abbr
                        // this.loan.activeDate = new Date().toISOString().substr(0, 10);

                        // Add 2 default rows
                        // this.addRowT(this.$refs.cashBankAccountDS.kendoWidget());
                        // for (let index = 0; index < 2; index++) {
                        //     this.addRow(this.$refs.relatedCostDS.kendoWidget());
                        // }
                        this.journal.number = this.transactionType.abbr + this.transactionType.numberSeparator + number
                        this.l.abbr = this.transactionType.abbr
                        this.l.number = this.transactionType.abbr + this.transactionType.numberSeparator + number;
                    }
                })
                .catch((e) => {
                    window.console.log(e);
                });
        },
        async loadPrefix() {
            this.showLoading = true
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("close loan").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionType = res.data.data[0];
                            this.generateNumber();
                        }
                    });
                }, 10);
            });
        },
    },
    computed: {},
    mounted: async function () {
        // await this.loadDecimal()
        await this.loadSaleFormContent()
        await this.getJournalNumber()
    },
    created: async function () {
        this.addEmpty()
        await this.loadPrefix()
        await this.loadAccount()
    },
};
</script>

<style scoped>
.k-dropdown {
    width: 100%;
    margin-top: 4px;
}


.function_content .label {
    margin-bottom: 10px;
    display: inline-block;
}


.color_green {
    color: #03b154;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1250px; */
        max-width: 1080px;
    }
}

@media (max-width: 576px) {
    .pt-6.col-sm-5.col-12 {
        padding-top: 0 !important;
    }

    .code_text {
        width: 100%;
    }

    .phone_no_pt {
        padding-top: 0 !important;
    }

    .select_template,
    .save_option {
        margin-bottom: 10px;
    }
}


.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Krasar-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
    border-bottom: 1px solid #000 !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.v-slide-group__content {
    background-color: #F8F8F9 !important;
}

.v-tab--active {
    background-color: #ffffff !important;
    border-left: none;
}

.function_content {
    padding: 0;
    background-color: #F8F8F9;
}

.v-input--radio-group--row {
    margin-top: 0px !important;
    padding: 0px;
}

.v-input__control {
    height: 25px !important;
}
</style>
