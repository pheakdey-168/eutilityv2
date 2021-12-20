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
                                        <h2>{{$t('withdraw_share')}}</h2>
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
                                                    <v-col sm="7" cols="12" class="pb-0 pl-0">
                                                        <label class="label mb-0">{{ $t('date') }}</label>
                                                            <app-datepicker
                                                                class="mt-1"
                                                                :initialDate="withdraw.issuedDate"
                                                                @emitDate="withdraw.issuedDate = $event"/>
                                                        <label class="label mb-0">{{ $t('member') }}</label>
                                                        <div
                                                                class="kendo_dropdown_custom pb-2">
                                                            <v-select
                                                                class="mt-1"
                                                                :items="memberData"
                                                                :placeholder="$t('select')"
                                                                item-text="numberName"
                                                                tage=""
                                                                v-model="withdraw.member"
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
                                                                    disabled
                                                                    v-model="withdraw.cashAccount"
                                                                    return-object
                                                                    outlined/>
                                                        <v-row>  
                                                            <v-col sm="6" cols="6" class="py-0"> 
                                                                <label class="label mb-0">{{$t('number')}}</label>
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        v-model="withdraw.number"
                                                                        outlined
                                                                        disabled
                                                                        :rules="[v => !!v || 'Number is required']"
                                                                    />
                                                            </v-col>
                                                            <v-col sm="6" cols="6" class="py-0"> 

                                                                <label class="label mb-0">{{$t('reference_no')}}</label>
                                                                <v-text-field
                                                                    class="mt-1"
                                                                    v-model="withdraw.referenceNumber"
                                                                    outlined
                                                                />
                                                            </v-col>

                                                            <v-col sm="6" cols="6" class="py-0"> 
                                                                <label class="label mb-0">{{ $t('share_product') }}</label>
                                                                <div class="kendo_dropdown_custom mt-1">
                                                                    <v-select
                                                                        class="mt-1"
                                                                        :items="shareList"
                                                                        :placeholder="$t('select')"
                                                                        item-text="name"
                                                                        item-value="id"
                                                                        tage=""
                                                                        v-model="withdraw.pricePerShare"
                                                                        @change="priceShareChange"
                                                                        return-object
                                                                        outlined/>
                                                                </div>
                                                            </v-col>
<!--                                                            <v-col sm="6" cols="6" class="py-0"> -->
<!--                                                                <label class="label  mb-0">{{$t('withdraw_from')}}</label>-->
<!--                                                                <v-select-->
<!--                                                                    class="mt-1"-->
<!--                                                                    :items="withdrawFroms"-->
<!--                                                                    placeholder="select"-->
<!--                                                                    item-text="name"-->
<!--                                                                    item-value="id"-->
<!--                                                                    tage=""-->
<!--                                                                    v-model="withdraw.withdrawFrom"-->
<!--                                                                    @change="withdrawFromChange"-->
<!--                                                                    outlined/>-->
<!--                                                                <div v-if="withdraw.withdrawFrom == 2"-->
<!--                                                                    class="kendo_dropdown_custom  mt-1">-->
<!--                                                                    <label class="label mb-0">{{$t('amount_can_be_withdraw')}}</label>-->
<!--                                                                    <p style="font-weight: bold;font-size: 20px;">{{numberFormat(amountCanWithdraw)}}</p>-->
<!--                                                                </div>-->
<!--                                                            </v-col>-->
                                                        </v-row>
                                                            
                                                    </v-col>
                                                    <v-col sm="5" cols="12" class="pb-0 function_content pa-3">
                                                        <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                                min-height="50px" color="primary">
                                                            <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                            {{ $t('amount') }}</h3>
                                                            <h3  v-if="!isAmount" class="text-bold float-right text-white" style="font-size: 22px">
                                                            {{numberFormat(withdraw.amount)}}</h3>
                                                            <v-text-field v-else
                                                                class="mt-1  pb-2"
                                                                @change="amountChange"
                                                                v-model="withdraw.amount"
                                                                placeholder=""
                                                                outlined
                                                                :disabled="!isAmount"
                                                                :rules="[v => !!v || 'Amount is required']"
                                                            />
                                                        </v-card>
                                                        <v-simple-table>
                                                                <template v-slot:default>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="text-left pr-0">{{ $t('price_per_share') }}</td>
                                                                            <td class="text-center">:</td>
                                                                            <td class="text-right">
                                                                            {{ numberFormatA(sharePrice) }}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="text-left pr-0">{{
                                                                                $t('remaining_share')
                                                                            }}
                                                                            </td>
                                                                            <td class="text-center">:</td>
                                                                            <td class="text-right">
                                                                                {{ numberFormatA(shareRemain) }}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="text-left pr-0">{{ $t('currency') }}</td>
                                                                            <td class="text-center">:</td>
                                                                            <td class="text-right">
                                                                                {{ (currencyCode) }}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="text-left pr-0">{{
                                                                                    $t('rate')
                                                                                }}
                                                                            </td>
                                                                            <td class="text-center">:</td>
                                                                            <td class="text-right">
                                                                                {{ (rate) }}
                                                                            </td>
                                                                        </tr>

                                                                    </tbody>
                                                                </template>
                                                        </v-simple-table>
                                                        <v-textarea
                                                            v-model="withdraw.note"
                                                            class="mt-4"
                                                            solo
                                                            name="input-7-4"
                                                            :label="$t('note')+'...'">
                                                        </v-textarea>
                                                    </v-col>
                                                    <v-col sm="12" cols="12" class="pb-0 px-0">
                                                        <div  class="kendo_dropdown_custom  mt-1">
                                                            <!-- Grid -->
                                                            <v-card outlined dense class="no_border" color="white">
                                                                <v-row>
                                                                    <v-col sm="12" cols="12" class="py-0">
                                                                        <kendo-datasource
                                                                            ref="shareList"
                                                                            :change="dataSourceChanged"
                                                                            :data="lines"/>
                                                                        <kendo-grid
                                                                            id="gridSaleDeposit" class="grid-function"
                                                                            :data-source-ref="'shareList'"
                                                                            :sortable="true"
                                                                            :filterable="false"
                                                                            :column-menu="true"
                                                                            :editable="true"
                                                                            :scrollable-virtual="true"
                                                                        >
                                                                            <kendo-grid-column
                                                                                :field="'withdrawAmount'"
                                                                                :title="$t('withdraw_share')"
                                                                                :width="200"
                                                                                :template="'<span>#= withdrawAmount#</span>'"
                                                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                                            />
                                                                            <kendo-grid-column
                                                                                :field="'shareAmount'"
                                                                                :title="$t('share_amount')"
                                                                                :width="200"
                                                                                :editable="()=>{ return false}"
                                                                                :template="'<span>#= shareAmount#</span>'"
                                                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                                            />
                                                                            <kendo-grid-column
                                                                                :field="'shareRemain'"
                                                                                :title="$t('remaining_share')"
                                                                                :width="200"
                                                                                :format="'{0:n}'"
                                                                                :editable="()=>{ return false}"
                                                                                :template="'<span>#= shareRemain#</span>'"
                                                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                                            />
                                                                            <kendo-grid-column
                                                                                :field="'issuedDate'"
                                                                                :title="$t('issue_date')"
                                                                                :width="200"
                                                                                :format="'{0:n}'"
                                                                                :editable="()=>{ return false}"
                                                                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                                            />
                                                                        </kendo-grid>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-card>
                                                        </div> 
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
import kendo from "@progress/kendo-ui"
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import Helper from "@/helper.js"
// import {uuid} from 'vue-uuid'
// import {DropDownList} from '@progress/kendo-vue-dropdowns'
import ShareWithdrawModel from '@/scripts/model/credit/ShareWithdraw'

const memberHandler = require("@/scripts/memberHandler")
const customerHandler = require("@/scripts/customerHandler")
// const accountHandler = require("@/scripts/accountHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const loanHandler = require("@/scripts/loanHandler")

import {JournalModel, UserModel} from "@/scripts/model/AppModels"
const { journalHandler } = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")
const $ = kendo.jQuery
const textField = 'name'
const keyField = 'id'
const memberItem = {[textField]: 'Select Member...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const store = require("@/institute.js")
const {cookies} = store.default.state

// const pageSize = 10
// const loadingData = [];
// while (loadingData.length < pageSize) {
//     loadingData.push({...emptyItem})
// }

export default {
    name: "SavingWithdraw",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
        // 'dropdownlist': DropDownList
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
        shareList: [],
        withdrawFroms:[
            {id: 1, name: 'Share'},
            {id: 2, name: 'Dividend'}
        ],
        withdrawTypes: [
            {id: 1, name: 'Share'},
            {id: 2, name: 'Amount'}
        ],
        isAmount: false,
        deposits: [],
        amountCanWithdraw: 0,
        selectMember: 'isMember',
        isMember: true,
        isCustom: false,
        withdraw: new ShareWithdrawModel({}),
        saveOption: '',
        //member
        memBaseUrl: memberHandler.search(),
        memberList: [],
        memberItem: memberItem,
        memberfilter: '',
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
        dividendAmount: 0,
        shareAmount: 0,
        withdrawAmount: 0,
        decimals: [],
        sharePrice: 0,
        shareRemain: 0,
        shareAmountPrice: 0,
        oldShareAmount: 0,
        accounts: [],
        dividendAccount: {},
        capitalAccount: {},
        lines: [],
        accountName: 'name',
        memberData: []
    }),
    methods: {
        async getJournalNumber() {
            let num = await Helper.generateAccountingNumber(this.journalTxnType, this.withdraw.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
            this.withdraw.journalNumber = num.number
            this.withdraw.number = num.number
        },
        //
        errorMessage() {
        },
        // async loadAccount() {
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve('resolved');
        //             accountHandler.getAll().then(res => {
        //                 this.showLoading = false
        //                 //Receivable Account
        //                 this.cashAccounts = res.filter(m => m.account_type.number === 1).map(itm => {
        //                     return {
        //                         id: itm.uuid,
        //                         name: itm.name,
        //                         local_name: itm.local_name,
        //                         number: itm.number,
        //                         is_taxable: itm.is_taxable,
        //                         banhjiAccCode: itm.banhjiAccCode,
        //                         group_code: itm.group_code,
        //                         parent_account: itm.parent_account,
        //                         type_code: itm.type_code,
        //                         uuid: itm.uuid
        //                     }
        //                 })
        //                 if (this.cashAccounts.length > 0) {
        //                     this.withdraw.cashAccount = this.cashAccounts[0]
        //                 }
        //             })
        //         }, 300);
        //     })
        // },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        getSavingAccount(member){
            window.console.log(member)
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    memberHandler.getSavingAccountById(member.id).then(res => {
                        this.showLoading = false
                        this.savingAccountList = res.data.data.filter((obj) => {return obj.savingType.id === 1})
                    })
                }, 300);
            })
        },
        priceShareChange(){
            if(this.withdraw.member && this.withdraw.pricePerShare){
                let s = this.withdraw.pricePerShare
                this.currencyCode = s.currency.code
                window.console.log(s, 'share price')
                this.rate = s.currency.rate
                this.showLoading = true
                this.sharePrice = parseFloat(s.pricePerShare)
                let data = {
                    shareId: this.withdraw.pricePerShare.id,
                    memberId: this.withdraw.member.id
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        memberHandler.getShareByMemberId(data).then(res => {
                            this.showLoading = false
                            let lines = res.data.data
                            if(lines.length > 0){
                                let sh = 0, di = 0, w = 0, self = this
                                $.each(lines, function (i,v){
                                    sh += v.shareAmount
                                    di += v.dividendAmount
                                    w += v.withdrawShare
                                    if(parseFloat(v.shareAmount) - parseFloat(v.withdrawShare) > 0) {
                                        self.lines.push({
                                            pk: v.pk,
                                            sk: v.sk,
                                            withdrawAmount: 0,
                                            shareAmount: parseFloat(v.shareAmount) - parseFloat(v.withdrawShare),
                                            shareRemain: parseFloat(v.shareAmount) - parseFloat(v.withdrawShare),
                                            issuedDate: v.issuedDate,
                                            shareType: v.typeOfShare,
                                        })
                                    }
                                })
                                this.shareAmount = sh
                                this.oldShareAmount = sh
                                this.shareRemain = sh
                                this.dividendAmount = di
                                this.shareAmountPrice = (sh - w) * this.sharePrice
                                if(this.withdraw.withdrawFrom){
                                    if(this.withdraw.withdrawFrom === 1){
                                        this.amountCanWithdraw = this.shareAmountPrice
                                    }else{
                                        this.amountCanWithdraw = this.dividendAmount
                                    }
                                }
                            }
                        })
                    }, 300);
                })
                this.loadTransactionRate()
                this.capitalAccount = s.capitalAccount
                this.dividendAccount = s.dividendAccount
            }
        },
        amountChange(){
            let valid = this.amountCanWithdraw > 0 && this.withdraw.amount <= this.amountCanWithdraw
            if(!valid){
                this.$snotify.error('Something went wrong')
                this.withdraw.amount = 0
                this.shareRemain = this.shareAmount
            }else{
                let remain = this.withdraw.amount / this.sharePrice
                this.shareRemain = (this.shareAmount - remain)
            }
        },
        //member
        selectMemberChange(){
            if(this.selectMember == 'isMember'){
                this.withdraw.customer = {}
            }else{
                this.withdraw.member = {}
            }
            this.withdraw.savingAccount = {}
        },
        onMemberChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.withdraw.member = value
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
                    this.cashAccounts = []
                    loanHandler.businessSettingGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let s = res.data.data.filter((obj) => {
                                return obj.type == "Member"
                            })
                            if (s.length > 0) {
                                this.cashAccounts.push(s[0].cashAccount)
                                this.withdraw.cashAccount = s[0].cashAccount
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
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.withdraw.issuedDate).toISOString().substr(0, 10)
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
                            }
                        })
                    }
                }, 300)
            })
        },
        withdrawFromChange(){
            if(this.withdraw.withdrawFrom){
                this.withdraw.amount = 0
                if(this.withdraw.withdrawFrom === 1){
                    this.amountCanWithdraw = this.shareAmountPrice
                    this.isAmount = false
                }else{
                    if(this.dividendAmount > 0) {
                        this.amountCanWithdraw = this.dividendAmount
                        this.isAmount = true
                    }else{
                        this.withdraw.withdrawFrom = 1
                        this.$snotify.error('Dividend Amount is 0')
                    }
                }
                this.shareAmount = this.shareAmountPrice
                this.shareRemain = this.shareAmount
            }
        },
        async loadShare() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.pricePerShareGet().then(res => {
                        let data = res.data.data
                        if(data.length > 0){
                            this.shareList = data
                        }else{
                            this.$snotify.error('Please add share in setting')
                            this.cancel()
                        }
                    })
                }, 300);
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
        numberFormat(value) {
            if (this.currencyCode) {
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                value = parseFloat(value.toFixed(fo))
                return kendo.toString(value, 'n' + fo)
            }
        },
        numberFormatA(value) {
            if (this.currencyCode) {
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                value = parseFloat(value.toFixed(fo))
                return kendo.toString(value, 'n' + fo)
            }
        },
        async loadShareAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.shareAccountGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if(res.data.data.length > 0) {
                                this.capitalAccount = res.data.data[0].capitalAccount
                                this.dividendAccount = res.data.data[0].dividendAccount
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        //lines
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]
                let total = 0
                switch (e.field) {
                    case "withdrawAmount":
                        if(parseFloat(dataRow.shareAmount) < parseFloat(dataRow.withdrawAmount)){
                            break
                        }
                        total = parseFloat(dataRow.shareAmount) - parseFloat(dataRow.withdrawAmount)
                        dataRow.set('shareRemain', total)
                        this.calShareRemain()
                        break
                    default:
                        break
                }
            }
        },
        calShareRemain(){
            let r = 0, s = 0
            let d = this.$refs.shareList.kendoWidget()
            $.each(d.data(), function (i,v){
                r += parseFloat(v.shareRemain)
                s += parseFloat(v.withdrawAmount)
            })
            this.shareRemain = r
            this.withdraw.amount = s * this.sharePrice
            this.withdraw.totalWithdrawShare = s
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.shareList.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        //function
        cancel() {
            window.history.go(-1)
        },
        addEmpty(){
            this.withdraw = new ShareWithdrawModel({})
            this.withdraw.member = {}
            this.withdraw.withdrawFrom = 1
            this.withdraw.cashAccount = this.cashAccounts[0]
            this.amountCanWithdraw = 0
            this.sharePrice = 0
            this.shareRemain = 0
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
        async savea() {
            window.console.log(this.withdraw, 'item');
        },
        async save() {
            let customer = this.withdraw.member
            this.withdraw.amount = parseFloat(this.withdraw.amount)
            const obj = this.withdraw
            // const seg = this.segments[0]
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            if(!this.withdraw.member){
                return
            }
            let ds = this.$refs.shareList.kendoWidget()
            this.showLoading = true
            this.withdraw.saveOption = this.saveOption
            let self = this
            let dracc = {}
            if(this.withdraw.withdrawFrom === 1){
                dracc = this.capitalAccount
            }else{
                dracc = this.dividendAccount
            }
            let data = {
                "number": this.journalNumber ? this.journalNumber : obj.number,
                "description": "Share Withdraw",
                "journal_type": "general_journal",
                "journal_date": new Date(obj.issuedDate),
                "currency_code": this.currencyCode,
                "buinsess_unit_uuid": "",
                "location_uuid": "",
                "project_uuid": "",
                "segment_uuid": "",//seg.id,
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
                    self.withdraw.amount = parseFloat(self.withdraw.amount)
                    self.withdraw.currency = self.currency
                    self.withdraw.exchangeRate = self.exchangeRate
                    self.withdraw.journal = JSON.stringify(data)
                    self.withdraw.user = new UserModel(cookies.user)
                    self.withdraw.journalId = response.data.uuid
                    let lines = []
                    $.each(ds.data(), function (i,v){
                        lines.push({
                            pk: v.pk,
                            sk: v.sk,
                            withdrawAmount: v.withdrawAmount,
                            shareAmount: v.shareAmount,
                            shareRemain: v.shareRemain,
                            issuedDate: v.issuedDate,
                            shareType: v.typeOfShare,
                        })
                    })
                    self.withdraw.lines = lines
                    self.withdraw.member = {
                        "id": customer.id,
                        "name": customer.name,
                        "numberName": customer.numberName
                    }
                    self.withdraw.exchangeRate = self.exchangeRate
                    memberHandler.createShareWithdraw(new ShareWithdrawModel(self.withdraw)).then(response => {
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
        }
    },
    watch: {},
    mounted: async function () {
        await this.loadLessMember()
        this.getJournalNumber()
        this.addEmpty()
        await this.loadShare()
        await this.loadDecimal()
    },
    created: async function () {
        // await this.loadAccount()
        await this.loadSegment()
        await this.loadAccountName()
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
