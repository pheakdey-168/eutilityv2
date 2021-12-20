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
                                        <h2>{{$t('saving_deposits')}}</h2>
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
                                                    <v-col sm="6" cols="12" class="pb-0 pl-0">
                                                        <label class="label mb-0">{{ $t('date') }}</label>
                                                        <app-datepicker
                                                            class="mt-1"
                                                            :initialDate="deposit.issuedDate"
                                                            @emitDate="deposit.issuedDate = $event"/>
                                                        <!-- <v-radio-group height="0px"
                                                                        v-model="selectMember" @change="selectMemberChange" row class="mt-1 mb-0 check-box">
                                                            <v-radio
                                                                color="red"
                                                                :label="$t('member')"
                                                                value="isMember">
                                                            </v-radio>
                                                            <v-radio
                                                                color="red"
                                                                :label="$t('customer')"
                                                                value="isCusomer">
                                                            </v-radio>
                                                        </v-radio-group>
                                                        <div v-if="selectMember == 'isMember'"
                                                                class="kendo_dropdown_custom pb-2">
                                                            <dropdownlist
                                                                class="v-input__slot"
                                                                :data-items="memberList"
                                                                @change="onMemberChange"
                                                                :value="deposit.member"
                                                                :data-item-key="dataItemKey"
                                                                :text-field="textField"
                                                                :default-item="memberItem"
                                                                :filterable="true"
                                                                @filterchange="onMemberFilterChange">
                                                            </dropdownlist>
                                                        </div>
                                                        <div v-else class="kendo_dropdown_custom pb-2">
                                                            <dropdownlist
                                                                class="v-input__slot"
                                                                :data-items="customerList"
                                                                @change="onCustomerChange"
                                                                :value="deposit.customer"
                                                                :data-item-key="dataItemKey"
                                                                :text-field="textField"
                                                                :default-item="customerItem"
                                                                :filterable="true"
                                                                @filterchange="onCustomerFilterChange">
                                                            </dropdownlist>
                                                        </div> -->

                                                        <v-radio-group
                                                            height=""
                                                            v-model="selectMember"
                                                            @change="selectMemberChange" row
                                                            class="mt-1 mb-0 check-box">
                                                            <v-radio
                                                                color="red"
                                                                :label="$t('member')"
                                                                value="isMember">
                                                            </v-radio>
                                                            <v-radio
                                                                color="red"
                                                                :label="$t('customer')"
                                                                value="isCustomer">
                                                            </v-radio>
                                                        </v-radio-group>
                                                        <div
                                                                class="kendo_dropdown_custom  mt-1 pb-2">
                                                            <v-autocomplete
                                                                v-model="deposit.member"
                                                                :items="memberData"
                                                                item-text="numberName"
                                                                @change="getSavingAccount"
                                                                return-object
                                                                outlined
                                                            ></v-autocomplete>
                                                        </div>

                                                        <label class="label mb-0">{{ $t('saving_account') }}</label>
                                                        <div class="kendo_dropdown_custom mt-1">
                                                            <v-select
                                                                class="mt-1"
                                                                :items="savingAccountList"
                                                                :placeholder="$t('select')"
                                                                item-text="number"
                                                                item-value="id"
                                                                tage=""
                                                                v-model="deposit.savingAccount"
                                                                @change="savingAccountChange"
                                                                return-object
                                                                outlined/>
                                                        </div>
                                                        <label class="label mb-0">{{$t('saving_account_num')}}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="deposit.number"
                                                            outlined
                                                            disabled
                                                            :rules="[v => !!v || 'Number is required']"
                                                        />
                                                        <label class="label  mb-0">{{$t('cash_account')}}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="cashAccounts"
                                                            :placeholder="$t('select')"
                                                            :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                            tage=""
                                                            v-model="deposit.cashAccount"
                                                            :rules="[v => !!v || 'Cash account is required']"
                                                            return-object
                                                            outlined/>
                                                        
                                                    </v-col>

                                                    <v-col sm="6" cols="12" class="pb-0 function_content pa-3">
                                                        <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                                min-height="50px" color="primary">
                                                            <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                            {{ $t('amount') }}:</h3>
                                                            <vue-numeric
                                                                style="width: 70%;font-size: 18px;background-color: #ffff;border-radius: 2px;"
                                                                v-bind:minus="false"
                                                                v-bind:precision="inputDec"
                                                                class="mr-2 mt-0 text-bold pa-4"
                                                                currency=""
                                                                separator=","
                                                                v-model="deposit.amount"
                                                                :rules="[v => !!v || 'Amount is required']"
                                                                outlined
                                                            >
                                                            </vue-numeric>
                                                            
                                                        </v-card>
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{
                                                                            $t('reference_no')
                                                                        }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right pl-2 pt-2">
                                                                            <v-text-field
                                                                                class="mt-1"
                                                                                v-model="deposit.referenceNumber"
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
                                                            v-model="deposit.note"
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
                                        <v-alert type="warning"
                                                 v-model="alert"
                                                 dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-btn outlined color="#494846" class="float-left text-capitalize"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>

                                        <v-btn color="secondary" class="float-right white--text text-capitalize"
                                               @click="saveClose">
                                            {{ $t('save_close') }}
                                        </v-btn>

                                        <v-btn color="primary"
                                               class="float-right  white--text text-capitalize mr-3 "
                                               @click="saveNew">
                                            {{ $t('save_new') }}
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
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import Helper from "@/helper.js"
import {dataStore} from '@/observable/store'
import SavingDepositModel from '@/scripts/model/SavingDeposit'

const memberHandler = require("@/scripts/memberHandler")
const customerHandler = require("@/scripts/customerHandler")
const loanHandler = require("@/scripts/loanHandler")
const accountHandler = require("@/scripts/accountHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
// const settingsHandler = require("@/scripts/settingsHandler")
const prefixHandler = require("@/scripts/prefixHandler")
const paymentOptionHandler = require("@/scripts/paymentOptionHandler")
const store = require("@/institute.js")
const {cookies} = store.default.state
import {JournalModel, UserModel} from "@/scripts/model/AppModels"
import kendo from "@progress/kendo-ui";
const { journalHandler } = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")

// const $ = require("jquery")
const textField = 'name'
const keyField = 'id'
const customerItem = {[textField]: 'Select Customer...', [keyField]: null}
const memberItem = {[textField]: 'Select Member...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const OPTION_TYPE = 'Supplier'
const strFilter = '?optionType=' + OPTION_TYPE

const pageSize = 10
const loadingData = [];
while (loadingData.length < pageSize) {
    loadingData.push({...emptyItem})
}
import VueNumeric from 'vue-numeric'
export default {
    name: "AddSavingDeposit",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
        // 'dropdownlist': DropDownList
        VueNumeric
    },
    data: () => ({
        isHideBar: false,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        dialogM2: false,
        alert: false,
        addressType: ['Billing', 'Delivery', 'Contact'],
        deliveryMethod: [],
        genderItem: customerHandler.gender(),
        valid: true,
        skip: 0,
        tempSkip: null,
        inputDec: 0,
        total: 0,
        filter: '',
        textField: 'name',
        dataItemKey: 'id',
        baseCurrencyCode: '',
        errors: [],
        ////
        selectMember: 'isMember',
        isMember: true,
        isCustom: false,
        deposit: new SavingDepositModel({}),
        saveOption: '',
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
        memberData: [],
        //
        loggedUser: new UserModel(cookies.user),
        savingAccountList: [],
        cashAccounts: [],
        savingProducts: [],
        dayInYears: [
            {id: "diy-eafb935c-9849-11eb-a8b3-0242ac130003", name: 365},
            {id: "diy-eafb95c8-9849-11eb-a8b3-0242ac130003", name: 366}
        ],
        savingTypes: [
            {id: "savingt-7a9096ce-9b75-11eb-a8b3-0242ac130003", name: "បញ្ញើសន្សំធម្មតា"},
            {id: "savingt-7a9098f4-9b75-11eb-a8b3-0242ac130003", name: "បញ្ញើសន្សំមានការកំណត់"}
        ],
        isSaveNew: false,
        balance: {},
        balances: [],
        currencyCode: '',
        rate: '',
        exchangeRate: {},
        segments: [],
        depositNumber: '',
        depositTxnType: {},
        paymentMethod: {},
        currency: {},
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        segment: {},
        accountName: 'name',
        pin: dataStore.pin,
        decimals: [],
    }),
    methods: {
        async getJournalNumber() {
            let num = await Helper.generateAccountingNumber(this.journalTxnType, this.deposit.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
            this.deposit.journalNumber = num.number
        },
        errorMessage() {
        },
        //
        async loadPaymentOption() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.paymentMethod = []
                    paymentOptionHandler.list(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.paymentMethod = res.data.data[0]
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        savingAccountChange(){
            if(this.deposit.savingAccount){
                this.balance = {}
                let s = this.deposit.savingAccount
                if(s.hasOwnProperty('savingProduct')){
                    this.currencyCode = s.savingProduct.currency.code
                    this.rate = s.savingProduct.currency.rate
                    this.currency = s.savingProduct.currency
                    this.loadTransactionRate()
                    //add
                    let dec = this.decimals.filter((obj) => {
                        return obj.currency.code == this.currencyCode
                    })
                    if (dec.length > 0) {
                        this.inputDec = parseInt(dec[0].decimal)
                    }
                }
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        memberHandler.getBalanceAccountById(this.deposit.savingAccount.id).then(res => {
                            this.showLoading = false
                            if(res.data.data.length > 0){
                                this.balances = res.data.data
                                //check saving product with limit
                                if(this.deposit.savingAccount.savingProduct.savingType.id === 2 && this.balances.length === 1){
                                    this.$snotify.error('Saving Type allow deposit one time only')
                                    window.history.go(-1)
                                }
                            }
                        })
                    }, 300);
                })
            }
        },
        addMonths(date, months) {
            let d = date.getDate();
            date.setMonth(date.getMonth() + +months);
            if (date.getDate() != d) {
                date.setDate(0);
            }
            return date;
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        //Receivable Account
                        this.cashAccounts = res.filter(m => m.account_type.number === 1).map(itm => {
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
                        if (this.cashAccounts.length > 0) {
                            this.deposit.cashAccount = this.cashAccounts[0]
                        }
                    })
                }, 300);
            })
        },
        async loadSavingProduct() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.savingGet().then(res => {
                        this.savingProducts = res.data.data
                        // window.console.log(res, 'member type')
                        if (this.savingProducts.length > 0) {
                            this.saving.savingProduct = this.savingProducts[0]
                        }
                    })
                }, 300);
            })
        },
        savingProductChange() {
            let s = this.saving.savingProduct
            if(s.hasOwnProperty('savingType')){
                this.saving.savingType = s.savingType
            }
            if(s.hasOwnProperty('interestRatePerYear')){
                this.saving.interestRatePerYear = s.interestRatePerYear
            }
            if(s.hasOwnProperty('daysInYear')){
                this.saving.daysInYear = s.daysInYear
            }
            this.generateNumber()
        },
        async getLastNumber() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let data = {
                        module: 'func',
                        pk: 'ac-savd-'
                    }
                    memberHandler.getLastNumber(data).then(res => {
                        window.console.log(res.data.data, 'last number')
                        this.deposit.lastNumber = res.data.data.lastNumber
                        this.generateNumber()
                    }).catch(e => {
                        // this.$snotify.error('Something went wrong')
                        // this.errors.push(e)
                        window.console.log(e)
                    })
                }, 300);
            })
        },
        generateNumber(){
            let newNum = ''
            let abbr = 'SAVD'
            let lnum = this.zeroPad(this.deposit.lastNumber, 6)
            newNum = abbr+lnum
            this.deposit.number = newNum
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        getSavingAccount(){
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    memberHandler.getSavingAccountById(this.deposit.member.id).then(res => {
                        this.showLoading = false
                        this.savingAccountList = res.data.data
                    })
                }, 300);
            })
        },
        getDepositNumber() {
            if (this.deposit.issuedDate !== '') {
                let data = {
                    abbr: this.depositTxnType.abbr,
                    structure: this.depositTxnType.structure,
                    transactionDate: this.deposit.issuedDate,
                    sequcencing: this.depositTxnType.sequcencing,
                    type: 'Sale Deposit',
                    entity: 1
                }
                billingHandler.lastNumber(data).then(response => {
                    if (response.data.statusCode === 200) {
                        const res = response.data.data
                        const lastNumber = this.zeroPad(parseInt(res.lastNumber), this.depositTxnType.format)
                        this.depositNumber = res.suffix + this.depositTxnType.numberSeparator + lastNumber
                    }
                }).catch(e => {
                    this.errors.push(e)
                })
            }
        },
        async loadPrefix() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    prefixHandler.get('sale deposit').then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if (res.data.data.length > 0) {
                                this.depositTxnType = res.data.data[0]
                                this.getDepositNumber()
                            }
                        }

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
            this.deposit.customer = value
            this.getSavingAccount(value)
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
        // selectMemberChange(){
        //     if(this.selectMember == 'isMember'){
        //         this.deposit.customer = {}
        //     }else{
        //         this.deposit.member = {}
        //     }
        // },

        //member
        selectMemberChange() {
            if (this.selectMember == 'isMember') {
                this.deposit.isMember = 1
                this.memberData = this.memberList
            } else {
                this.deposit.isMember = 2
                this.memberData = this.customerList
            }
            this.deposit.member = {}
        },
        onMemberChange() {
            this.getSavingAccount()
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
                    const date = new Date(this.deposit.issuedDate).toISOString().substr(0, 10)
                    let code = ''
                    if (this.currency.hasOwnProperty('code')) {
                        code = this.currency.code
                    }
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
        async loadAccountName() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
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
        //function
        cancel() {
            window.history.go(-1)
        },
        addEmpty(){
            this.deposit = new SavingDepositModel({})
            this.getLastNumber()
            this.deposit.customer = {}
            this.deposit.member = {}
            this.selectMember = 'isMember'
            this.deposit.cashAccount = this.cashAccounts[0]
            this.currencyCode = ''
            this.rate = ''
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
        async save() {
            const obj = this.deposit
            this.deposit.amount = parseFloat(obj.amount)
            //check amount
            if(this.deposit.amount <= 0){
                this.$snotify.error('Withdraw amount must over 0')
                return
            }
            // check member
            if(Object.keys(this.deposit.member).length == 0){
                this.$snotify.error('Please select member or customer')
                return
            }
            // check member
            if(Object.keys(this.deposit.savingAccount).length == 0){
                this.$snotify.error('Please select saving account')
                return
            }
            const seg = this.segment
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            if(Object.keys(obj.member).length == 0){
                return
            }
            let customer = obj.member
            if(this.deposit.amount <= 0){
                this.$snotify.error('Amount must be over 0')
                return
            }
            this.showLoading = true
            this.deposit.saveOption = this.saveOption
            this.deposit.exchangeRate = this.exchangeRate
            // API Journal
            let self = this;
            let data = {
                "number": this.journalNumber ? this.journalNumber : obj.number,
                "description": "Saving Deposit",
                "journal_type": "general_journal",
                "journal_date": new Date(obj.issuedDate),
                "currency_code": this.currencyCode,
                "buinsess_unit_uuid": "",
                "location_uuid": "",
                "project_uuid": "",
                "segment_uuid": seg.id,
                "journal_entries": [
                    {
                        "uuid": "",
                        "account": obj.cashAccount,
                        "description": obj.note,
                        "primary_contact": customer,
                        "third_contacts": [],
                        "ref_number": obj.referenceNumber,
                        "amount": parseFloat(obj.amount),
                        "discount": {},
                        "mark_up": 0,
                        "billable": 0,
                        "tax_code": "",
                        "payment_method": {},
                        "currency": this.exchangeRate,
                        "exchange_rate_uuid": "",
                        "exchange_rate": this.rate,
                        "exchanged_amount": parseFloat(obj.amount) * parseFloat(this.rate),
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
                    },
                    {
                        "uuid": "",
                        "account": obj.savingAccount.savingProduct.Account,
                        "description": obj.note,
                        "primary_contact": customer,
                        "third_contacts": [],
                        "ref_number": obj.referenceNumber,
                        "amount": (parseFloat(obj.amount) * -1),
                        "discount": {},
                        "mark_up": 0,
                        "billable": 0,
                        "tax_code": "",
                        "payment_method": {},
                        "currency": this.exchangeRate,
                        "exchange_rate_uuid": "",
                        "exchange_rate": this.rate,
                        "exchanged_amount": ((parseFloat(obj.amount) * -1)*parseFloat(this.rate)),
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
                    }
                ],
                "transaction_type": "journal",
                "is_draft": 0,
                "is_reversed": 0,
                "prefix_format": this.journalPrefix,
                "created_by": this.loggedUser
            }
            journalHandler.save(new JournalModel(data))
                .then(function (response) {
                    let d = self.balances
                    let balance = self.deposit.amount
                    let duration = new Date(obj.issuedDate).getDate() - new Date(obj.savingAccount.issuedDate).getDate()
                    let balances = []
                    let ordered = 0
                    // calculate closing day
                    let closingDay = ''
                    if(obj.savingAccount.savingProduct.savingType.id === 2){
                        let edate = kendo.toString( new Date(self.addMonths(new Date(obj.issuedDate),obj.savingAccount.numberOfMonth)), 'yyyy-MM-dd')
                        closingDay = edate
                    }
                    if(d.length > 0){
                        let dd = d[0]
                        ordered = d[0].ordered + 1
                        balance = parseFloat(dd.balance) + parseFloat(obj.amount);
                        window.console.log(new Date(obj.issuedDate).getMonth(), new Date(dd.issuedDate).getMonth(), 'check month')
                        if(new Date(obj.issuedDate).getMonth() == new Date(dd.issuedDate).getMonth()){
                            duration = new Date(obj.issuedDate).getDate() - parseInt(dd.day);
                            if(duration < 0){
                                duration = 0;
                            }
                        }else{
                            //deferent month
                            let odate = new Date(dd.issuedDate);
                            let lastDay = new Date(odate.getFullYear(), odate.getMonth() + 1, 0);
                            let oduration = lastDay.getDate() - odate.getDate();
                            duration = oduration + new Date(obj.issuedDate).getDate();
                        }
                        window.console.log(duration, '')
                        if(duration > 0){
                            if(d.length == 1){
                                duration += 1;
                            }
                            let baseAmount = duration * parseFloat(dd.balance)
                            balances.push({
                                pk: d[0].pk,
                                sk: d[0].sk,
                                issuedDate: d[0].issuedDate,
                                saving_account_id: d[0].saving_account_id,
                                balance: d[0].balance,
                                day: d[0].day,
                                duration: duration,
                                txnId: d[0].txnId,
                                ordered: d[0].ordered,
                                status: d[0].status,
                                closingDay: closingDay,
                                base_amount: baseAmount
                            })
                        }
                    }
                    balances.push({
                        pk: '',
                        sk: '',
                        issuedDate: obj.issuedDate,
                        saving_account_id: obj.savingAccount.id,
                        balance: balance,
                        day: new Date(obj.issuedDate).getDate(),
                        duration: 0,
                        base_amount: 0,
                        ordered: ordered,
                        status: 0,
                        closingDay: closingDay,
                        txnId: response ? response.data.uuid : ''
                    })
                    self.deposit.isMember = 1
                    if(self.selectMember != 'isMember'){
                        self.deposit.isMember = 2
                    }
                    self.deposit.balance = balances
                    self.deposit.currency = self.currency
                    self.deposit.exchangeRate = self.exchangeRate
                    self.deposit.journal = JSON.stringify(data)
                    self.deposit.userPin = self.pin
                    self.deposit.user = new UserModel(cookies.user)
                    memberHandler.createSavingDeposit(new SavingDepositModel(self.deposit)).then(response => {
                        self.showLoading = false
                        if (response.data.statusCode === 201) {
                            self.$snotify.success('Successfully')
                            if(self.isSaveNew == true){
                                self.addEmpty()
                            }else{
                                window.history.go(-1);
                            }
                        }
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
        async loadLessMember() {
            new Promise(resolve => {
                resolve('resolved');
                setTimeout(() => {
                    this.showLoading = true
                    memberHandler.loadLessMember().then(res => {
                        this.showLoading = false
                        this.memberList = res.data.data
                        this.memberData = this.memberList
                    })
                }, 500)
            })
        },
        async loadLessCustomer() {
            new Promise(resolve => {
                resolve('resolved');
                setTimeout(() => {
                    this.showLoading = true
                    memberHandler.loadLessCustomer().then(res => {
                        this.showLoading = false
                        this.customerList = res.data.data
                    })
                }, 500)
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
    },
    watch: {
        id() {
            // this.product = this.selectedProduct
            // window.console.log(this.id, 'watch')
            // if (this.id !== undefined) {
            //   this.loadSingleCustomer()
            // }
        }
    },
    mounted: async function () {
        await this.getLastNumber()
        // this.customerRequestData(0, this.customerfilter, this.cusBaseUrl)
        // this.memberRequestData(0, this.memberfilter, this.memBaseUrl)
        this.loadPrefix()
        await this.loadDecimal()
    },
    created: async function () {
        await this.loadAccount()
        await this.loadSegment()
        await this.getJournalNumber()
        await this.loadAccountName()
        await this.loadLessMember()
        await this.loadLessCustomer()
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
</style>