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
                                        <h2>{{$t('close_saving_account')}}</h2>
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
                                                            :initialDate="closeSaving.issuedDate"
                                                            @emitDate="closeSaving.issuedDate = $event"/>
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
                                                                v-model="closeSaving.member"
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
                                                                v-model="closeSaving.savingAccount"
                                                                @change="savingAccountChange"
                                                                return-object
                                                                outlined/>
                                                        </div>
                                                        <label class="label  mb-0">{{$t('cash_account')}}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="cashAccounts"
                                                            placeholder="select"
                                                            :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                            tage=""
                                                            v-model="closeSaving.cashAccount"
                                                            return-object
                                                            outlined/>
                                                        
                                                    </v-col>

                                                    <v-col sm="6" cols="12" class="pb-0 function_content pa-3">
                                                        <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                                min-height="50px" color="primary">
                                                            <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                            {{ $t('remaining_amount') }}:</h3>
                                                            <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                                            {{ numberFormat(closeSaving.amountWithdraw) }}</h3>
                                                            
                                                        </v-card>
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{
                                                                            $t('penalty_amount')
                                                                        }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right pl-2 py-2">
                                                                            <vue-numeric
                                                                                style="border: 1px solid gainsboro;width: 100%;font-size: 14px;background-color: #ffff;border-radius: 2px;"
                                                                                class="mr-2 mt-0 text-bold pa-4 py-2"
                                                                                currency=""
                                                                                separator=","
                                                                                v-bind:minus="false"
                                                                                v-bind:precision="inputDec"
                                                                                v-model="closeSaving.amountPenalty"
                                                                                :rules="[v => !!v || 'Amount is required']"
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
                                                                                v-model="closeSaving.referenceNumber"
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
                                                            v-model="closeSaving.note"
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
// import {DropDownList} from '@progress/kendo-vue-dropdowns'
import CloseSavingAccountModel from '@/scripts/model/CloseSavingAcccount'
import SavingWithdrawModel from '@/scripts/model/SavingWithdraw'
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const loanHandler = require("@/scripts/loanHandler")
const {EntityType} = require("@/scripts/default_setup/Collections")
const memberHandler = require("@/scripts/memberHandler")
const customerHandler = require("@/scripts/customerHandler")
const accountHandler = require("@/scripts/accountHandler")
import {JournalModel, UserModel} from "@/scripts/model/AppModels"
const { journalHandler } = require("@/scripts/AppHandlers");
const store = require("@/institute.js")
const {cookies} = store.default.state

const $ = require("jquery")
const textField = 'name'
const keyField = 'id'
const customerItem = {[textField]: 'Select Customer...', [keyField]: null}
const memberItem = {[textField]: 'Select Member...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}

const pageSize = 10
const loadingData = [];
while (loadingData.length < pageSize) {
    loadingData.push({...emptyItem})
}
import {dataStore} from '@/observable/store'
import kendo from "@progress/kendo-ui";
import VueNumeric from 'vue-numeric'

export default {
    name: "CloseSavingAccount",
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
        deposits: [],
        amountCanWithdraw: 0,
        selectMember: 'isMember',
        isMember: true,
        isCustom: false,
        closeSaving: new CloseSavingAccountModel({}),
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
        exchangeRate: {},
        journalTxnType: EntityType.JOURNAL,
        journalNumber: '',
        journalPrefix: '',
        user: new UserModel(cookies.user),
        accountName: 'name',
        segment: {},
        pin: dataStore.pin,
        decimals: [],
        inputDec: 0,
    }),
    methods: {
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
                            this.closeSaving.cashAccount = this.cashAccounts[0]
                        }
                    })
                }, 300);
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        getSavingAccount(){
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    memberHandler.getSavingAccountById(this.closeSaving.member.id).then(res => {
                        this.showLoading = false
                        this.savingAccountList = res.data.data
                    })
                }, 300);
            })
        },
        savingAccountChange(){
            if(this.closeSaving.savingAccount){
                // window.console.log(this.closeSaving.savingAccount)
                let s = this.closeSaving.savingAccount
                if(s.hasOwnProperty('savingProduct')){
                    this.currencyCode = s.savingProduct.currency.code
                    this.rate = s.savingProduct.currency.rate
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
                        memberHandler.getDepositAccountById(this.closeSaving.savingAccount.id).then(res => {
                            this.showLoading = false
                            this.deposits = res.data.data
                            if(this.deposits.length > 0){
                                let t = 0
                                $.each(this.deposits, function (i,v){
                                    if(v.type == 'deposit' || v.type == 'interest') {
                                        t += parseFloat(v.amount)
                                    }else{
                                        t -= parseFloat(v.amount)
                                    }
                                })
                                this.closeSaving.amountWithdraw = t
                                if(t > 0){
                                    this.withdraw = new SavingWithdrawModel({})
                                    this.withdraw.member = this.closeSaving.member
                                    this.withdraw.savingAccount = this.closeSaving.savingAccount
                                    this.withdraw.issuedDate = this.closeSaving.issuedDate
                                    this.withdraw.cashAccount = this.closeSaving.cashAccount
                                    this.withdraw.amount = t
                                }
                            }
                        })
                    }, 300);
                })
                this.loadTransactionRate()
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
                    const date = new Date(this.closeSaving.issuedDate).toISOString().substr(0, 10)
                    const currency = this.closeSaving.savingAccount.savingProduct.currency
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
                                this.exchangeRate = response
                                this.rate = response.rate
                                this.showLoading = false
                            }
                        })
                    }
                }, 300)
            })
        },
        //customer
        onCustomerChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.closeSaving.customer = value
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
        //         this.closeSaving.customer = {}
        //     }else{
        //         this.closeSaving.member = {}
        //     }
        //     this.closeSaving.savingAccount = {}
        // },
        //member
        selectMemberChange() {
            if (this.selectMember == 'isMember') {
                this.closeSaving.isMember = 1
                this.memberData = this.memberList
            } else {
                this.closeSaving.isMember = 2
                this.memberData = this.customerList
            }
            this.closeSaving.member = {}
        },
        onMemberChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.closeSaving.member = value
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
        async getJournalNumber() {
            let num = await Helper.generateAccountingNumber(this.journalTxnType, this.closeSaving.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
        },
        //function
        cancel() {
            window.history.go(-1)
        },
        addEmpty(){
            this.closeSaving = new CloseSavingAccountModel({})
            this.closeSaving.customer = {}
            this.closeSaving.member = {}
            this.selectMember = 'isMember'
            this.closeSaving.cashAccount = this.cashAccounts[0]
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
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            let customer = {}
            const obj = this.closeSaving
            const seg = this.segment
            if(this.selectMember == 'isMember'){
                customer = obj.member
                if(!this.closeSaving.member){
                    return
                }
            }else{
                customer = obj.customer
                if(!this.closeSaving.customer){
                    return
                }
            }
            this.showLoading = true
            this.closeSaving.userPin = this.pin
            this.closeSaving.exchangeRate = this.exchangeRate
            this.closeSaving.saveOption = this.saveOption
            //add withdraw
            if(this.closeSaving.amountWithdraw > 0){
                this.addWithdraw()
                //add journal
                let self = this;
                let data = {
                    "number": this.journalNumber,
                    "description": "Close Saving Account",
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
                            "amount": parseFloat(obj.amountWithdraw),
                            "discount": {},
                            "mark_up": 0,
                            "billable": 0,
                            "tax_code": "",
                            "payment_method": {},
                            "currency": this.exchangeRate,
                            "exchange_rate_uuid": "",
                            "exchange_rate": this.rate,
                            "exchanged_amount": parseFloat(obj.amountWithdraw) * parseFloat(this.rate),
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
                            "amount": (parseFloat(obj.amountWithdraw) * -1),
                            "discount": {},
                            "mark_up": 0,
                            "billable": 0,
                            "tax_code": "",
                            "payment_method": {},
                            "currency": this.exchangeRate,
                            "exchange_rate_uuid": "",
                            "exchange_rate": this.rate,
                            "exchanged_amount": ((parseFloat(obj.amountWithdraw) * -1)*parseFloat(this.rate)),
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
                        window.console.log(response)
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve('resolved');
                                self.createCloseSaving(response.data.uuid)
                            }, 300);
                        })
                    })
                    .catch(function (error) {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(error)
                        window.console.log(error);
                    });
            }else{
                this.createCloseSaving('')
            }
        },
        async createCloseSaving(txnId){
            this.closeSaving.txnId = txnId
            this.closeSaving.isMember = 1
            if (this.selectMember != 'isMember') {
                this.closeSaving.isMember = 2
            }
            memberHandler.createCloseSaving(new CloseSavingAccountModel(this.closeSaving)).then(res => {
                this.showLoading = false
                if (res.data.statusCode === 201) {
                    this.$snotify.success('Successfully')
                    if(this.isSaveNew == true){
                        this.addEmpty()
                    }else{
                        window.history.go(-1);
                    }
                }
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
                window.console.log(e)
            })
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
        async addWithdraw(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.withdraw.isMember = 1
                    if (this.selectMember != 'isMember') {
                        this.withdraw.isMember = 2
                    }
                    this.withdraw.exchangeRate = this.exchangeRate
                    memberHandler.createSavingWithdraw(new SavingWithdrawModel(this.withdraw)).then(response => {
                        window.console.log(response)
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
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
        await this.getJournalNumber()
        await this.loadSegment()
        await this.loadAccountName()
        await this.loadLessMember()
        await this.loadLessCustomer()
        await this.loadDecimal()
    },
    created: async function () {
        await this.loadAccount()
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
