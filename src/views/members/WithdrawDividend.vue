<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="12" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <div class="function_header">
                                        <h2>{{$t('dividend_payment')}}</h2>
                                        <v-icon
                                            onclick="window.history.go(-1); return false;"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </div>
                                    <div class="function_content">
                                    <!-- Form -->
                                    <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation>
                                        <v-col sm="12" col="12">
                                            <v-row>
                                                <v-col sm="6" cols="12" class="pb-0">
                                                    <label class="label mb-0">{{ $t('date') }}</label>
                                                        <app-datepicker
                                                            class="mt-1"
                                                            :initialDate="d.issuedDate"
                                                            @emitDate="d.issuedDate = $event"/>
                                                    <label class="label mb-0">{{ $t('number') }}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="d.number"
                                                            outlined
                                                            disabled
                                                            :rules="[v => !!v || 'Number is required']"
                                                        />
                                                </v-col>
                                                <v-col sm="6" cols="12" class="pb-0">
                                                    <label class="label mb-0">{{ $t('earning_allocation') }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        placeholder="Please Select..."
                                                        item-text="number"
                                                        item-value="id"
                                                        tage=""
                                                        :items="earningAllocations"
                                                        v-model="d.earningAllocation"
                                                        @change="earningAllocationChange"
                                                        return-object
                                                        outlined/>
                                                    <label class="label mb-0">{{ $t('cash_account') }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        :items="cashAccounts"
                                                        :placeholder="$t('select')"
                                                        :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                        tage=""
                                                        disabled
                                                        v-model="d.cashAccount"
                                                        :rules="[v => !!v || 'Cash account is required']"
                                                        return-object
                                                        outlined/>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-form>
                                    <!-- Grid -->
                    
                                    </div>
                                <!-- Grid -->
                                    <v-card outlined dense class="no_border" color="white">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="">
                                                <kendo-datasource
                                                    :data="dividendLines"
                                                    ref="applyToLineDS"/>
                                                <kendo-grid
                                                    id="applyToLineDS"
                                                    class="grid-function"
                                                    :data-source-ref="'applyToLineDS'"
                                                    :sortable="false"
                                                    :filterable="false"
                                                    :column-menu="false"
                                                    :editable="false"
                                                    :noRecords="true"
                                                    :scrollable-virtual="true">
                                                    <kendo-grid-column
                                                        :command="{iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, className: 'btn-plus isEditable'}"
                                                        :title="''"
                                                        :width="63"
                                                        :headerAttributes="{style:'text-align: left; background-color: #EDF1F5'}"/>
                                                    <kendo-grid-column
                                                        :title="$t('no.')"
                                                        :width="55"
                                                        :template="rowNumberTmpla"
                                                        :column-menu="false"
                                                        :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products' }"
                                                        :attributes="{ style: 'text-align: products'}"
                                                    />
                                                    <kendo-grid-column
                                                        :field="'member'"
                                                        :title="$t('shareholder')"
                                                        :template="'<span>#= member.numberName ? member.numberName : ``#</span>'"
                                                        :editable="()=>{ return false}"
                                                        :headerAttributes="{ style:'background-color: #EDF1F5'}"/>
                                                    <kendo-grid-column
                                                        :field="'number'"
                                                        :title="$t('reference_no')"
                                                        :editable="()=>{ return false}"
                                                        :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                        :attributes="{ style:'text-align: left', }"/>
                                                    <kendo-grid-column
                                                        :field="'amount'"
                                                        :title="$t('amount_to_pay')"
                                                        :editable="()=>{ return false}"
                                                        :template="'<span>#= kendo.toString(amount, format)#</span>'"
                                                        :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                        :attributes="{ style:'text-align: right', }"/>
                                                </kendo-grid>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <div class="function_footer">
                                        <v-alert type="warning"
                                                    v-model="alert"
                                                    dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
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
        </v-container>
    </v-app>
</template>

<script>
import kendo from "@progress/kendo-ui"
import {uuid} from "vue-uuid"
const $ = kendo.jQuery

import PricePerShareModel from "@/scripts/model/PricePerShare"
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import Helper from "@/helper.js"
import ShareModel from '@/scripts/model/credit/Share'

const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
const accountHandler = require("@/scripts/accountHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const store = require("@/institute.js")
const {cookies} = store.default.state
import {JournalModel, UserModel, JournalEntryModel} from "@/scripts/model/AppModels"

// const {journalHandler} = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")

import DividendPaymentModel from '@/scripts/model/credit/DividendPayment'
const DividendType = require("@/scripts/default_setup/DividendType.js");
const { prefixHandler, journalHandler } = require("@/scripts/AppHandlers");
const instituteHandler = require("@/scripts/instituteHandler")
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

export default {
    name: "AddSavingDeposit",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
        // 'dropdownlist': DropDownList
    },
    data: () => ({
        d: new DividendPaymentModel({}),
        itemLines: [],
        isHideBar: false,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        dialogM2: false,
        alert: false,
        valid: true,
        skip: 0,
        tempSkip: null,
        total: 0,
        filter: '',
        textField: 'name',
        dataItemKey: 'id',
        baseCurrencyCode: '',
        errors: [],
        yearQuery: new Date().getFullYear(),
        ////
        saveOption: '',
        //
        loggedUser: new UserModel(cookies.user),
        isSaveNew: false,
        balance: {},
        balances: [],
        currencyCode: '',
        rate: '',
        exchangeRate: {},
        segments: [],
        currency: {},
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        //data
        journalTypes: EntityType.JOURNAL_TYPES,
        totalSaleShare: 0,
        totalAmount: 0,
        remainingShare: 0,
        s: new ShareModel({}),
        cashAccounts: [],
        lines: [],
        pricePerShares: [],
        memberList: [],
        line: {},
        oldShare: 0,
        maxShareAmount: 0,
        shareType: '',
        capitalAccount: {},
        lastNumber: 1,
        decimals: [],
        format: 'n2',
        accountName: 'name',
        segment: {},
        earningAllocations: [],
        dividendLines: [],
        memDivLastNum: 1,
    }),
    methods: {
        rowNumberTmpla(dataItem) {
            let ds = this.$refs.applyToLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadEarningAllocation() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.earningAllocations = []
                    memberHandler.dividendGets().then(res => {
                        let data = res.data.data
                        if(data.length > 0){
                            this.earningAllocations = data
                        }else{
                            this.$snotify.error('Please add share in setting')
                            this.cancel()
                        }
                    })
                }, 300);
            })
        },
        async getJournalNumber() {
            window.console.log(this.journalTxnType, this.s.issuedDate, 'journal number')
            let num = await this.generateAccountingNumber(this.journalTxnType, this.s.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
            // this.d.number = num.number
        },
        async generateAccountingNumber (prefixType, transactionDate) {
            // Prefix
            const prefixes = await prefixHandler.getAll();
            let pf = prefixes.find(value => value.type.toLowerCase() === prefixType.toLowerCase());
            // Prefix Format "JE-yymm-00000"
            let shortPrefix = pf.abbr + pf.prefixSeparator + pf.structure + pf.numberSeparator,
                fullPrefix = shortPrefix + '0'.repeat(pf.format);
            // Last Number
            const lastNumbers = await prefixHandler.lastNumber(fullPrefix, transactionDate, shortPrefix);
            return this.applyPrefixNumber(lastNumbers.data.last_number, prefixType, transactionDate);
        },
        async applyPrefixNumber (lastNumber, prefixType, transactionDate){
            let num = {
                number: '',
                last_number: lastNumber,
                prefix_format: '',
                prefix: {}
            };
            // Prefix
            const prefixes = await prefixHandler.getAll();
            let pf = prefixes.find(value => value.type.toLowerCase() === prefixType.toLowerCase());
            num.prefix = pf
            if (pf) {
                // Prefix Format "JE-yymm-00000"
                num.prefix_format = pf.abbr + pf.prefixSeparator + pf.structure + pf.numberSeparator + '0'.repeat(pf.format);
                // Structure
                let structure = '', txnDate = new Date(transactionDate);
                switch (pf.structure.toLowerCase()) {
                    case 'yyyy':
                        structure = txnDate.getFullYear().toString();
                        break;
                    case 'yy':
                        structure = txnDate.getFullYear().toString().substr(2);
                        break;
                    case 'yyyymm':
                        structure = txnDate.getFullYear().toString() + (txnDate.getMonth() + 1).toString().padStart(2, '0');
                        break;
                    case 'yymm':
                        structure = txnDate.getFullYear().toString().substr(2) + (txnDate.getMonth() + 1).toString().padStart(2, '0');
                        break;
                    default:// None structure
                        break;
                }
                // Last Number
                let number = num.last_number;
                // Starting Number
                if (number === 0) {
                    number = pf.number;
                } else {
                    // Sequencing Number (Reset Number)
                    pf.sequcencing = 'prefix';// will change later
                    switch (pf.sequcencing.toLowerCase()) {
                        case 'month':// Month
                            number = 1;
                            break;
                        case 'year':// Year
                            number = 1;
                            break;
                        default:// Prefix
                            number++;
                            break;
                    }
                }
                num.number = pf.abbr + pf.prefixSeparator + structure + pf.numberSeparator + number.toString().padStart(pf.format, '0');
            }
            return num;
        },
        errorMessage() {
        },
        async loadAccount() {
            this.showLoading = true
            accountHandler.getAll().then(res => {
                this.showLoading = false
                //Receivable Account
                this.cashAccounts = res.filter(m => m.account_type.number === 1).map(itm => {
                    return {
                        id: itm.uuid,
                        name: itm.name,
                        local_name: itm.local_name,
                        number: itm.number,
                        is_taxable: itm.is_taxable,
                        banhjiAccCode: itm.banhjiAccCode,
                        group_code: itm.group_code,
                        parent_account: itm.parent_account,
                        type_code: itm.type_code,
                        uuid: itm.uuid,
                    }
                })
                if (this.cashAccounts.length > 0) {
                    this.d.cashAccount = this.cashAccounts[0]
                }
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.d.issuedDate).toISOString().substr(0, 10)
                    let code = this.currencyCode
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const response = res.data.data[0]
                                this.showLoading = false
                                if(Object.keys(response).length > 0){
                                    this.exchangeRate = response
                                    this.rate = response.rate
                                    this.d.exchangeRate = response
                                }else{
                                    this.$snotify.error('Please set exchange rate on currency setting')
                                    this.cancel()
                                }
                            }
                        })
                    }
                }, 300)
            })
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segment = {}
                    this.cashAccounts = []
                    loanHandler.businessSettingGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let s = res.data.data.filter((obj) => {
                                return obj.type == "Member"
                            })
                            if (s.length > 0) {
                                this.segment = s[0].segment
                                this.d.segment = s[0].segment
                                this.cashAccounts.push(s[0].cashAccount)
                                this.d.cashAccount = s[0].cashAccount
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
        //function
        cancel() {
            window.history.go(-1)
        },
        removeEmptyLine() {
            const grid = $("#applyToLineDS").data("kendoGrid"),
                dataSource = grid.dataSource
            dataSource.data().forEach(m => {
                if (m.member.id === undefined) {
                    dataSource.remove(m)
                }
            })
        },
        addEmpty() {
            this.d = new DividendPaymentModel({})
            this.getJournalNumber()
            if (this.cashAccounts.length > 0) {
                this.d.cashAccount = this.cashAccounts[0]
            } else {
                this.loadAccount()
            }
            this.currencyCode = ''
            this.rate = ''
            this.lines = []
            this.d.journalType = this.journalTypes[0]
            // this.removeEmptyLine()
            this.addRow()
            this.addRow()
        },
        saveNew() {
            this.isSaveNew = true
            this.saveOption = 'saveNew'
            this.save()
        },
        saveClose() {
            this.isSaveNew = false
            this.saveOption = 'saveClose'
            this.save()
        },
        addJournal() {
            let entries = [];
            let dr = new JournalEntryModel({
                account: this.d.earningAllocation.payableAccount,
                description: '',
                amount: parseFloat(this.d.totalAmount),
                currency: this.currency,
                exchange_rate: parseFloat(this.exchangeRate.rate), // Will change later
                exchanged_amount: parseFloat(this.d.totalAmount) * parseFloat(this.exchangeRate.rate),
            });
            entries.push(dr);
            // Cr
            let cr = new JournalEntryModel({
                account: this.d.cashAccount,
                description: '',
                amount: parseFloat(this.d.totalAmount) * -1,
                currency: this.currency,
                exchange_rate: parseFloat(this.exchangeRate.rate), // Will change later
                exchanged_amount: parseFloat(this.d.totalAmount) * parseFloat(this.exchangeRate.rate),
            });
            entries.push(cr);
            this.journalEntries = entries;
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            const grid = $("#applyToLineDS").data("kendoGrid"),
                dataSource = grid.dataSource
            if(dataSource.data().length === 0){
                this.$snotify.error('Please insert member to withdraw')
                return
            }
            window.console.log(this.exchangeRate, 'exchange')
            if(Object.keys(this.exchangeRate).length == 0){
                this.$snotify.error('Please check with your currency rate')
                return
            }
            this.removeEmptyLine()
            this.d.dividendLines = this.dividendLines
            this.addJournal()
            this.journal = new JournalModel({
                description: '',
                transaction_type: DividendType.DIVIDENDPAYMENT,
                journal_type: DividendType.DIVIDENDPAYMENT,
            });
            this.journal.created_by = this.loggedUser
            this.journal.journal_date = Helper.toISODate(this.d.issuedDate)
            this.journal.journal_entries = this.journalEntries
            this.journal.currency_code = this.currency.code
            this.journal.prefix_format = this.journalPrefix
            this.journal.segment_uuid = this.segment.id
            this.journal.number = this.d.number
            // API Journal
            let self = this;
            this.showLoading = true
            journalHandler.save(new JournalModel(this.journal))
                .then(function (response) {
                    self.d.journalId = response.data.uuid
                    self.d.journal = JSON.stringify(response)
                    memberHandler.dividendPaymentCreate(new DividendPaymentModel(self.d)).then(() => {
                        self.showLoading = false
                        self.$snotify.success('Successfully')
                        window.history.go(-1);
                    }).catch(e => {
                        self.$snotify.error('Something went wrong')
                        self.errors.push(e)
                        window.console.log(e)
                    })
                })
                .catch(function (error) {
                    Helper.alertErrorMsg(error)
                    window.console.log(error)
                })
                .finally(() => {
                    self.showLoading = false;
                });
        },
        async updatePrice(s){
            let r = parseFloat(s.pricePerShare.saleShare) + s.totalShare
            let d = s.pricePerShare
            d.saleShare = r
            loanHandler.pricePerShareCreate(new PricePerShareModel(d)).then(response => {
                window.console.log(response, 'update price share')
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
                window.console.log(e)
            })
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]
                let total = 0
                switch (e.field) {
                    case "shareAmount":
                        total = parseFloat(dataRow.shareAmount) * parseFloat(dataRow.sharePrice)
                        dataRow.set('amount', total)
                        break
                    default:
                        break
                }
                if (e.field) {
                    this.changes()
                }
            }
        },
        changes(){
            let totalAmount = 0
            let ds = this.$refs.applyToLineDS.kendoWidget()
            ds.data().forEach(v => {
                totalAmount += parseFloat(v.amount)
            })
            this.d.totalAmount = totalAmount
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.shareList.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        addRow() {
            if(this.s.pricePerShare.hasOwnProperty('id')) {
                let ds = this.$refs.shareList.kendoWidget(),
                    total = ds.total()
                let type = ''
                if (this.s.pricePerShare.typeOfShare) {
                    type = this.s.pricePerShare.typeOfShare.name
                }
                let p = 0
                if (this.s.pricePerShare.hasOwnProperty('pricePerShare')) {
                    p = parseFloat(this.s.pricePerShare.pricePerShare)
                }
                let newNum = ''
                let abbr = this.s.pricePerShare.abbr
                let lnum = this.zeroPad(this.lastNumber, 6)
                newNum = abbr + '-' + lnum
                ds.insert(total, {
                    id: 'ac-lstsh-' + uuid.v1(),
                    member: {},
                    typeOfShare: type,
                    shareAmount: 0,
                    sharePrice: p,
                    amount: 0,
                    lastNumber: this.lastNumber,
                    number: newNum,
                    locale: this.currencyCode,
                    format: this.format
                })
                this.lastNumber += 1
            }
        },
        removeRow(e) {
            e.preventDefault();
            const grid = $("#applyToLineDS").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem)
                this.changes()
            }
        },
        clear() {
            this.saleDeposit = {}
            this.depositLine = []
        },
        memberTemplate(dataItem) {
            const acc = dataItem.member
            if (acc) {
                return `<span>${acc.numberName ? acc.numberName : ``}</span>`
            } else {
                return ``
            }
        },
        memberDropDownEditor(container, options) {
            $('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "numberName",
                    dataValueField: "id",
                    template: "<span>#= numberName#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.memberList
                    })
                })
        },
        generateNumber(){
            let newNum = ''
            let abbr = 'DIVP'
            let lnum = this.zeroPad(this.d.lastNumber, 6)
            newNum = abbr+lnum
            this.d.abbr = abbr
            this.d.number = newNum
        },
        async getLastNumber() {
            let data = {
                pk: 'ac-divpayment-',
                module: 'func',
                lastSk: ''
            }
            memberHandler.getLastNumber(data).then(res => {
                this.lastNumber = res.data.data.lastNumber
                this.d.lastNumber = res.data.data.lastNumber
                this.generateNumber()
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
            })
            let d = {
                pk: 'ac-memdivpay-',
                module: 'func',
                lastSk: ''
            }
            memberHandler.getLastNumber(d).then(res => {
                this.memDivLastNum = res.data.data.lastNumber
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
            })
        },
        numberFormat(value) {
            if (this.currencyCode) {
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                this.format = 'n' + fo
                return kendo.toString(value, 'n' + fo)
            }
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
        async earningAllocationChange(){
            if(this.d.earningAllocation) {
                let lines = []
                this.dividendLines = []
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                this.format = 'n' + fo
                let self = this
                this.showLoading = true
                memberHandler.memberDividendGet(this.d.earningAllocation.id).then(res => {
                    this.showLoading = false
                    if (res.data.statusCode === 200) {
                        this.showLoading = false
                        if (res.data.data.length > 0) {
                            let d = res.data.data
                            $.each(d, function (i,v){
                                v.format = 'n' + fo
                                v.lastNumber = self.memDivLastNum + i
                                v.number = 'MDP-' + self.zeroPad(self.memDivLastNum + i, 6)
                            })
                            lines = res.data.data
                            this.changes()
                        }else{
                            this.$snotify.error('No member to withdraw')
                        }
                    }
                    this.dividendLines = lines
                    this.changes()
                }).catch()
                {
                    this.showLoading = false
                }
            }
        },
        async loadInstituteInfo() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(instituteId).then(res => {
                        this.currencyCode = res.baseCurrency.code
                        this.currency = res.baseCurrency
                        this.loadTransactionRate()
                    })
                    resolve('resolved');
                }, 200);
            });
        },
    },
    watch: {},
    mounted: async function () {
        await this.loadSegment()
        await this.loadEarningAllocation()
        await this.loadDecimal()
        await this.getJournalNumber()
        this.getLastNumber()
        this.addEmpty()
    },
    created: async function () {
        await this.loadAccount()
        await this.loadAccountName()
        await this.loadInstituteInfo()
    },
    computed: {},
    destroyed() {
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


.v-input__control {
    height: 25px !important;
}
h3{
    font-size:24px;
}
</style>
