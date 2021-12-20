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
                                        <h2>{{$t('saving_withdraws')}}</h2>
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
                                                            :initialDate="withdraw.issuedDate"
                                                            @emitDate="withdraw.issuedDate = $event"/>
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
                                                                v-model="withdraw.member"
                                                                :items="memberData"
                                                                :search-input.sync="searchMember"
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
                                                                v-model="withdraw.savingAccount"
                                                                @change="savingAccountChange"
                                                                return-object
                                                                outlined/>
                                                        </div>
                                                        <label class="label mb-0">{{$t('saving_account_num')}}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="withdraw.number"
                                                            outlined
                                                            disabled
                                                            :rules="[v => !!v || 'Number is required']"
                                                        />
                                                        
                                                        <label class="label  mb-0">{{$t('withdraw_from')}}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="withdrawFroms"
                                                            placeholder="select"
                                                            item-text="name"
                                                            tage=""
                                                            v-model="withdraw.withdrawFrom"
                                                            @change="withdrawFromChange"
                                                            return-object
                                                            outlined/>
                                                        <label class="label  mb-0">{{$t('cash_account')}}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="cashAccounts"
                                                            placeholder="select"
                                                            :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                            tage=""
                                                            v-model="withdraw.cashAccount"
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
                                                                class="mr-2 mt-0 text-bold pa-4"
                                                                v-bind:minus="false"
                                                                v-bind:precision="inputDec"
                                                                currency=""
                                                                separator=","
                                                                @change="amountChange"
                                                                v-model="withdraw.amount"
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
                                                                            $t('amount_can_be_withdraw')
                                                                        }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right pl-2 pt-2">
                                                                            {{ numberFormat(amountCanWithdraw) }}
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
                                                                                v-model="withdraw.referenceNumber"
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
                                                            v-model="withdraw.note"
                                                            class="mt-4"
                                                            solo
                                                            :label="$t('note')+'...'"
                                                            name="input-7-4">
                                                            
                                                        </v-textarea>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-form>
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
                                               class="float-right  white--text text-capitalize mr-3 " @click="saveNew">
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
import { i18n } from '@/i18n';
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import Helper from "@/helper.js"
import {dataStore} from '@/observable/store'
import SavingWithdrawModel from '@/scripts/model/SavingWithdraw'
const loanHandler = require("@/scripts/loanHandler")
const memberHandler = require("@/scripts/memberHandler")
const customerHandler = require("@/scripts/customerHandler")
// const settingsHandler = require("@/scripts/settingsHandler")
const accountHandler = require("@/scripts/accountHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")

import {JournalModel, UserModel} from "@/scripts/model/AppModels"
import kendo from "@progress/kendo-ui";
const { journalHandler } = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")
const $ = require("jquery")
const textField = 'name'
const keyField = 'id'
const customerItem = {[textField]: 'Select Customer...', [keyField]: null}
const memberItem = {[textField]: 'Select Member...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const store = require("@/institute.js")
const {cookies} = store.default.state

const pageSize = 10
const loadingData = [];
while (loadingData.length < pageSize) {
    loadingData.push({...emptyItem})
}
import VueNumeric from 'vue-numeric'

export default {
    name: "SavingWithdraw",
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
        total: 0,
        filter: '',
        textField: 'name',
        dataItemKey: 'id',
        baseCurrencyCode: '',
        currencyCode: '',
        rate: '',
        errors: [],
        ////
        // withdrawFroms:[
        //     {id: 1, name: i18n.t('deposit')},
        //     {id: 2, name: i18n.t('interest')}
        // ],
        deposits: [],
        amountCanWithdraw: 0,
        selectMember: 'isMember',
        isMember: true,
        isCustom: false,
        withdraw: new SavingWithdrawModel({}),
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
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        segments: [],
        user: new UserModel(cookies.user),
        balances: [],
        exchangeRate: {},
        depositAmount: 0,
        interestAmount: 0,
        withdrawAmount: 0,
        segment: {},
        accountName: 'name',
        pin: dataStore.pin,
        decimals: [],
        searchMember: null,
        inputDec: 0,
    }),
    methods: {
        numberFormat(value) {
            if (this.currencyCode) {
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                value = parseFloat(value)
                value = parseFloat(value.toFixed(fo))
                return kendo.toString(value, 'n' + fo)
            }
        },
        async getJournalNumber() {
            let num = await Helper.generateAccountingNumber(this.journalTxnType, this.withdraw.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
            this.withdraw.journalNumber = num.number
        },
        //
        errorMessage() {
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
                            this.withdraw.cashAccount = this.cashAccounts[0]
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
                    resolve('resolved');
                    let data = {
                        pk: 'ac-savw-',
                        module: 'func'
                    }
                    memberHandler.getLastNumber(data).then(res => {
                        // window.console.log(res.data.data, 'last number')
                        this.withdraw.lastNumber = res.data.data.lastNumber
                        this.generateNumber()
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        // window.console.log(e)
                    })
                }, 300);
            })
        },
        generateNumber(){
            let newNum = ''
            let abbr = 'SAVW'
            let lnum = this.zeroPad(this.withdraw.lastNumber, 6)
            newNum = abbr+lnum
            this.withdraw.abbr = abbr
            this.withdraw.number = newNum
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        getSavingAccount(){
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    memberHandler.getSavingAccountById(this.withdraw.member.id).then(res => {
                        this.showLoading = false
                        this.savingAccountList = res.data.data.filter((obj) => {return obj.savingType.id === 1})
                    })
                }, 300);
            })
        },
        savingAccountChange(){
            if(this.withdraw.savingAccount){
                let s = this.withdraw.savingAccount
                this.currencyCode = s.savingProduct.currency.code
                //add
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                if (dec.length > 0) {
                    this.inputDec = parseInt(dec[0].decimal)
                }
                this.rate = s.savingProduct.currency.rate
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        memberHandler.getDepositAccountById(this.withdraw.savingAccount.id).then(res => {
                            this.showLoading = false
                            this.deposits = res.data.data
                            if(this.deposits.length > 0){
                                let d = 0, w = 0, int = 0

                                $.each(this.deposits, function (i,v){
                                    if(v.type == 'deposit') {
                                        d += parseFloat(v.amount)
                                    }else if(v.type == 'withdraw'){
                                        d -= parseFloat(v.amount)
                                        w += parseFloat(v.amount)
                                    }else{
                                        int += parseFloat(v.amount)
                                    }
                                })
                                this.depositAmount = d
                                this.withdrawAmount = w
                                this.interestAmount = int
                                if(this.withdraw.withdrawFrom){
                                    if(this.withdraw.withdrawFrom.id === 1){
                                        this.amountCanWithdraw = this.depositAmount
                                    }else{
                                        this.amountCanWithdraw = this.interestAmount
                                    }
                                }
                            }
                        })
                    }, 300);
                })
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        memberHandler.getBalanceAccountById(s.id).then(res => {
                            this.showLoading = false
                            if(res.data.data.length > 0){
                                this.balances = res.data.data
                            }
                        })
                    }, 300);
                })
                this.loadTransactionRate()
            }
        },
        amountChange(){
            let valid = this.amountCanWithdraw > 0 && this.withdraw.amount <= this.amountCanWithdraw
            if(!valid){
                this.$snotify.error('Something went wrong')
                this.withdraw.amount = 0
            }
        },
        //customer
        onCustomerChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.withdraw.customer = value
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
        //         this.withdraw.customer = {}
        //     }else{
        //         this.withdraw.member = {}
        //     }
        //     this.withdraw.savingAccount = {}
        // },
        //member
        selectMemberChange() {
            if (this.selectMember == 'isMember') {
                this.withdraw.isMember = 1
                this.memberData = this.memberList
            } else {
                this.withdraw.isMember = 2
                this.memberData = this.customerList
            }
            this.withdraw.member = {}
        },
        onMemberChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.withdraw.member = value
            this.getSavingAccount(value)
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
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.withdraw.issuedDate).toISOString().substr(0, 10)
                    const currency = this.withdraw.savingAccount.savingProduct.currency
                    let code = ''
                    if (currency.hasOwnProperty('code')) {
                        code = currency.code
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
        withdrawFromChange(){
            if(this.withdraw.withdrawFrom){
                if(this.withdraw.withdrawFrom.id === 1){
                    this.amountCanWithdraw = this.depositAmount
                }else{
                    this.amountCanWithdraw = this.interestAmount
                }
            }
        },
        //function
        cancel() {
            window.history.go(-1)
        },
        addEmpty(){
            this.withdraw = new SavingWithdrawModel({})
            this.getLastNumber()
            this.withdraw.customer = {}
            this.withdraw.member = {}
            this.withdraw.withdrawFrom = this.withdrawFroms[0]
            this.selectMember = 'isMember'
            this.withdraw.cashAccount = this.cashAccounts[0]
            this.amountCanWithdraw = 0
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
            //check amount
            this.withdraw.amount = parseFloat(this.withdraw.amount)
            if(this.withdraw.amount <= 0){
                this.$snotify.error('Withdraw amount must over 0')
                return
            }
            // check member
            if(Object.keys(this.withdraw.member).length == 0){
                this.$snotify.error('Please select member or customer')
                return
            }
            // check member
            if(Object.keys(this.withdraw.savingAccount).length == 0){
                this.$snotify.error('Please select saving account')
                return
            }
            const obj = this.withdraw
            let customer = obj.member
            const seg = this.segment
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            this.withdraw.isMember = 1
            if(this.selectMember != 'isMember'){
                this.withdraw.isMember = 2
            }
            this.withdraw.userPin = this.pin
            this.showLoading = true
            this.withdraw.saveOption = this.saveOption
            let self = this
            let dracc = {}
            let isInterestWithdraw = 0
            if(this.withdraw.withdrawFrom.id === 1){
                dracc = obj.savingAccount.savingProduct.Account
            }else{
                dracc = obj.savingAccount.savingProduct.interestPayableAccount
                isInterestWithdraw = 1
            }
            let data = {
                "number": this.journalNumber ? this.journalNumber : obj.number,
                "description": "Saving Withdraw",
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
                        "account": dracc,
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
                        "account": obj.cashAccount,
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
                "created_by": this.user
            }
            journalHandler.save(new JournalModel(data))
                .then(function (response) {
                    let d = self.balances
                    let balance = self.withdraw.amount * -1
                    let duration = new Date(obj.issuedDate).getDate() - new Date(obj.savingAccount.issuedDate).getDate()
                    let balances = []
                    let ordered = 0
                    if(isInterestWithdraw != 1) {
                        if (d.length > 0) {
                            let dd = d[0]
                            ordered = d[0].ordered + 1
                            balance = parseFloat(dd.balance) + (parseFloat(obj.amount) * -1)
                            if (new Date(obj.issuedDate).getMonth() == new Date(dd.issuedDate).getMonth()) {
                                duration = new Date(obj.issuedDate).getDate() - parseInt(dd.day);
                                if (duration < 0) {
                                    duration = 0;
                                }
                            } else {
                                //deferent month
                                let odate = new Date(dd.issuedDate);
                                let lastDay = new Date(odate.getFullYear(), odate.getMonth() + 1, 0);
                                let oduration = lastDay.getDate() - odate.getDate();
                                duration = oduration + new Date(obj.issuedDate).getDate();
                            }
                            if (duration > 0) {
                                if (d.length == 1) {
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
                            txnId: response ? response.data.uuid : ''
                        })
                    }
                    self.withdraw.balances = balances
                    self.withdraw.currency = self.currency
                    self.withdraw.exchangeRate = self.exchangeRate
                    self.withdraw.journal = JSON.stringify(data)
                    self.withdraw.user = new UserModel(cookies.user)
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve('resolved');
                            memberHandler.createSavingWithdraw(new SavingWithdrawModel(self.withdraw)).then(response => {
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
                                window.console.log(e, 'error')
                            })
                        }, 300);
                    })
                })
                .catch(function (error) {
                    Helper.alertErrorMsg(error);
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
        },
        searchMember(val){
            if(val != '' && val != null) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        if (this.selectMember == 'isMember') {
                            memberHandler.memberLessSearch(val).then(res => {
                                if(res.data.data.length > 0) {
                                    this.memberData = res.data.data
                                }else{
                                    this.$snotify.error('No data found!')
                                    this.memberData = []
                                }
                            })
                        }else{
                            memberHandler.customerLessSearch(val).then(res => {
                                if(res.data.data.length > 0) {
                                    this.memberData = res.data.data
                                }else{
                                    this.$snotify.error('No data found!')
                                    this.memberData = []
                                }
                            })
                        }
                    }, 500);
                })
            }else{
                if (this.selectMember == 'isMember') {
                    this.memberData = this.memberList
                } else {
                    this.memberData = this.customerList
                }
            }
        }
    },
    mounted: async function () {
        this.getLastNumber()
        this.getJournalNumber()
        this.addEmpty()
        await this.loadDecimal()
    },
    created: async function () {
        await this.loadAccount()
        await this.loadSegment()
        await this.loadAccountName()
        await this.loadLessMember()
        await this.loadLessCustomer()
    },
    computed: {
        withdrawFroms(){
         return [
            {id: 1, name: i18n.t('principal')},
            {id: 2, name: i18n.t('interest')}
            ]
        }
    },
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
