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
                                        <h2>{{ $t('issue_share') }}</h2>
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
                                            <v-col sm="12" col="12">
                                                <v-row>
                                                    <v-col sm="6" cols="12" class="pb-0 pl-0">
                                                        <label class="label mb-0">{{ $t('date') }}</label>
                                                        <app-datepicker
                                                            class="mt-1"
                                                            :initialDate="s.issuedDate"
                                                            @emitDate="s.issuedDate = $event"/>
                                                        
                                                        <label class="label mb-0">{{ $t('journal_number') }}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="s.number"
                                                            outlined
                                                            disabled
                                                            :rules="[v => !!v || 'Number is required']"
                                                        />

                                                        <label class="label mb-0">{{ $t('journal_type') }}</label>
                                                        <div class="kendo_dropdown_custom mt-1">
                                                            <v-select
                                                                class="mt-1"
                                                                :items="journalTypes"
                                                                item-value="value"
                                                                item-text="text"
                                                                v-model="s.journalType"
                                                                :rules="[(v) => !!v || 'Journal Type is required',]"
                                                                outlined
                                                                required
                                                            />
                                                        </div>

                                                        <label class="label  mb-0">{{ $t('cash_account') }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="cashAccounts"
                                                            placeholder="select"
                                                            :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                            tage=""
                                                            v-model="s.cashAccount"
                                                            :rules="[v => !!v || 'Cash account is required']"
                                                            return-object
                                                            outlined/>

                                                        <label class="label mb-0">{{
                                                                $t('share_price')
                                                            }}</label>
                                                        <div class="kendo_dropdown_custom mt-1">
                                                            <v-select
                                                                class="mt-1"
                                                                placeholder="Please Select..."
                                                                item-text="name"
                                                                item-value="id"
                                                                tage=""
                                                                :items="pricePerShares"
                                                                v-model="s.pricePerShare"
                                                                @change="priceChange"
                                                                return-object
                                                                outlined/>
                                                        </div>

                                                    </v-col>

                                                    <v-col sm="6" cols="12" class="pb-0 function_content pa-3">
                                                        <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                                min-height="50px" color="primary">
                                                            <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                            {{ $t('maximum_share') }}</h3>
                                                            <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                                            {{ numberFormat(maxShareAmount) }}</h3>
                                                            
                                                        </v-card>
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{
                                                                            $t('share_type')
                                                                        }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ (shareType) }}
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
                                                                v-model="s.note"
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
                                    <v-col sm="12" col="12" class="pt-0">
                                        <!-- Grid -->
                                        <v-card outlined dense class="no_border" color="white">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pa-0">
                                                    <kendo-datasource
                                                        ref="shareList"
                                                        :change="dataSourceChanged"
                                                        :data="lines"/>
                                                    <kendo-grid
                                                        id="gridSaleDeposit" class="grid-function"
                                                        :data-source-ref="'shareList'"
                                                        :sortable="true"
                                                        :filterable="false"
                                                        :column-menu="false"
                                                        :editable="true"
                                                        :scrollable-virtual="true"
                                                    >
                                                        <kendo-grid-column
                                                            :title="$t('no.')"
                                                            :width="55"
                                                            :template="rowNumberTmpl"
                                                            :column-menu="false"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products' }"
                                                            :attributes="{ style: 'text-align: products'}"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'member'"
                                                            :title="$t('member')"
                                                            :width="150"
                                                            :template="memberTemplate"
                                                            :editor="memberDropDownEditor"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'shareType'"
                                                            :title="$t('share_type')"
                                                            :width="200"
                                                            :editable="()=>{ return false}"
                                                            :template="'<span>#=typeOfShare#</span>'"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'shareAmount'"
                                                            :title="$t('ចំនួនហ៊ុនដែលទិញ')"
                                                            :width="200"
                                                            :template="'<span>#=shareAmount#</span>'"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'share'"
                                                            :title="$t('ភាគហ៊ុនដែលមាន')"
                                                            :width="200"
                                                            :editable="()=>{ return false}"
                                                            :template="'<span>#= share#</span>'"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'sharePrice'"
                                                            :title="$t('share_price')"
                                                            :width="200"
                                                            :editable="()=>{ return false}"
                                                            :template="'<span>#= kendo.toString(sharePrice, format) #</span>'"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'amount'"
                                                            :title="$t('amount')"
                                                            :width="200"
                                                            :editable="()=>{ return false}"
                                                            :format="'{0:n}'"
                                                            :template="'<span>#= kendo.toString(amount, format) #</span>'"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'number'"
                                                            :title="$t('reference_no')"
                                                            :width="200"
                                                            :editable="()=>{ return false}"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                        />
                                                        <kendo-grid-column
                                                            :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                            :title="'&nbsp;'"
                                                            :width="100"
                                                            :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                        />
                                                    </kendo-grid>
                                                </v-col>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <v-row>
                                                        <v-col sm="7" cols="12" class="pb-1 pt-0 pl-0">
                                                            <v-btn
                                                                class="float-left btn_plus white--text mr-2"
                                                                color="primary" @click="addRow">
                                                                <v-icon size="" class="ma-1">mdi mdi-plus
                                                                </v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col sm="12" col="12" style="border-top: 1px solid gainsboro;">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pt-0 pl-0">
                                                <v-card color="" class="pa-1 no_border">
                                                    <label class="">{{
                                                            $t('total_sale_share')
                                                        }}</label><br/>
                                                    <h3 class="primary--text">{{ numberFormat(s.totalShare) }}</h3>
                                                </v-card>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pt-0">
                                                <v-card color="" class="pa-1 no_border">
                                                    <label class="">{{ $t('total_amount') }}</label><br/>
                                                    <h3 class="primary--text">{{ numberFormat(s.totalAmount) }}</h3>
                                                </v-card>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pt-0">
                                                <v-card color="" class="pa-1 no_border">
                                                    <label class="">{{ $t('remaining_share') }}</label><br/>
                                                    <h3 class="primary--text">{{ s.remainingShare }}</h3>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-col>
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
import {JournalModel, UserModel} from "@/scripts/model/AppModels"

const {journalHandler} = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")

export default {
    name: "AddSavingDeposit",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
        // 'dropdownlist': DropDownList
    },
    data: () => ({
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
    }),
    methods: {
        async loadMemberCenter() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.members = []
                    memberHandler.loadLessMember().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.memberList = res.data.data
                        }
                    })
                }, 300)
            })
        },
        async loadPrice() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.pricePerShareGet().then(res => {
                        let data = res.data.data
                        let self = this
                        if(data.length > 0){
                            $.each(data,function (i,v){
                                if(v.allowShareAmount == true) {
                                    if (parseFloat(v.shareAmount) - parseFloat(v.saleShare) > 0) {
                                        self.pricePerShares.push(v)
                                    }
                                }else{
                                    self.pricePerShares.push(v)
                                }
                            })
                        }else{
                            this.$snotify.error('Please add share in setting')
                            this.cancel()
                        }
                    })
                }, 300);
            })
        },
        async getJournalNumber() {
            let num = await Helper.generateAccountingNumber(this.journalTxnType, this.s.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
            this.s.number = num.number
        },
        errorMessage() {
        },
        //
        // async loadShareAccount() {
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve('resolved')
        //             loanHandler.shareAccountGet().then(res => {
        //                 this.showLoading = true
        //                 if (res.data.statusCode === 200) {
        //                     this.showLoading = false
        //                     if(res.data.data.length > 0) {
        //                         this.s.cashAccount = res.data.data[0].cashAccount
        //                         this.capitalAccount = res.data.data[0].capitalAccount
        //                     }
        //                 }
        //             }).catch()
        //             {
        //                 this.showLoading = false
        //             }
        //         }, 300)
        //     })
        // },
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
                            this.s.cashAccount = this.cashAccounts[0]
                        }
                    })
                }, 300);
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.s.issuedDate).toISOString().substr(0, 10)
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
                                    this.s.exchangeRate = response
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
                    this.segments = []
                    loanHandler.segmentGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.segments = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        priceChange() {
            // if (this.s.pricePerShare) {
            let p = this.s.pricePerShare
            this.currency = this.s.pricePerShare.currency
            this.currencyCode = this.currency.code
            this.loadTransactionRate()
            let ds = this.$refs.shareList.kendoWidget()
            ds.data().forEach(v => {
                v.typeOfShare = p.typeOfShare.name
                v.sharePrice = parseFloat(p.pricePerShare)
            })
            window.console.log(p, 'share price')
            if(p.allowShareAmount == true) {
                this.s.remainingShare = kendo.toString(parseFloat(p.shareAmount) - parseFloat(p.saleShare), 'n0')
                this.maxShareAmount = parseFloat(p.shareAmount) - parseFloat(p.saleShare)
            }
            this.oldShare = parseFloat(p.shareAmount) - parseFloat(p.saleShare)
            this.shareType = p.typeOfShare.abbr + '-' + p.typeOfShare.name
            let cap =this.s.pricePerShare.capitalAccount
            this.capitalAccount = {
                banhjiAccCode: cap.banhjiAccCode,
                group_code: cap.group_code,
                id: cap.id,
                uuid: cap.id,
                is_taxable: cap.is_taxable,
                local_name: cap.local_name,
                name: cap.name,
                number: cap.number,
                type_code: cap.type_code
            }
            let cac = this.s.pricePerShare.cashAccount
            this.s.cashAccount = {
                banhjiAccCode: cac.banhjiAccCode,
                group_code: cac.group_code,
                id: cac.id,
                uuid: cac.id,
                is_taxable: cac.is_taxable,
                local_name: cac.local_name,
                name: cac.name,
                number: cac.number,
                type_code: cac.type_code
            }
            this.getLastNumber()

            // }
        },
        //function
        cancel() {
            window.history.go(-1)
        },
        removeEmptyLine() {
            const grid = $("#gridSaleDeposit").data("kendoGrid"),
                dataSource = grid.dataSource
            dataSource.data().forEach(m => {
                if (m.member.id === undefined) {
                    dataSource.remove(m)
                }
            })
        },
        addEmpty() {
            this.s = new ShareModel({})
            this.getJournalNumber()
            if (this.cashAccounts.length > 0) {
                this.s.cashAccount = this.cashAccounts[0]
            } else {
                this.loadAccount()
            }
            this.currencyCode = ''
            this.rate = ''
            this.lines = []
            this.s.journalType = this.journalTypes[0]
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
        async save() {
            const obj = this.s
            // const seg = this.segments[0]
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            const grid = $("#gridSaleDeposit").data("kendoGrid"),
                dataSource = grid.dataSource
            if(dataSource.data().length === 0){
                this.$snotify.error('Please insert member')
                return
            }
            if(this.s.remainingShare < 0 && this.s.pricePerShare.allowShareAmount == true){
                this.$snotify.error('Remaining Share less than 0')
                return
            }
            window.console.log(this.exchangeRate, 'exchange')
            if(Object.keys(this.exchangeRate).length == 0){
                this.$snotify.error('Please check with your currency rate')
                return
            }
            let customer = {}
            this.showLoading = true
            this.s.saveOption = this.saveOption
            this.s.exchangeRate = this.exchangeRate
            this.removeEmptyLine()
            // API Journal
            let self = this;
            let data = {
                "number": this.journalNumber,
                "description": "Add Share",
                "journal_type": obj.journalType.name,
                "journal_date": new Date(obj.issuedDate),
                "currency_code": this.currencyCode,
                "buinsess_unit_uuid": "",
                "location_uuid": "",
                "project_uuid": "",
                "segment_uuid": "",//seg.id,
                "journal_entries": [
                    {
                        "uuid": "",
                        "account": obj.cashAccount,
                        "account_uuid": obj.cashAccount.id,
                        "description": obj.note,
                        "primary_contact": customer,
                        "third_contacts": [],
                        "ref_number": '',
                        "amount": parseFloat(obj.totalAmount),
                        "discount": {},
                        "mark_up": 0,
                        "billable": 0,
                        "tax_code": "",
                        "payment_method": {},
                        "currency": this.exchangeRate,
                        "exchange_rate_uuid": "",
                        "exchange_rate": this.rate,
                        "exchanged_amount": parseFloat(obj.totalAmount) * parseFloat(this.rate),
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
                        "account": this.capitalAccount,
                        "account_uuid": this.capitalAccount.id,
                        "description": obj.note,
                        "primary_contact": customer,
                        "third_contacts": [],
                        "ref_number": '',
                        "amount": (parseFloat(obj.totalAmount) * -1),
                        "discount": {},
                        "mark_up": 0,
                        "billable": 0,
                        "tax_code": "",
                        "payment_method": {},
                        "currency": this.exchangeRate,
                        "exchange_rate_uuid": "",
                        "exchange_rate": this.rate,
                        "exchanged_amount": ((parseFloat(obj.totalAmount) * -1) * parseFloat(this.rate)),
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
                    self.s.journalId = response.data.uuid
                    self.s.journal = JSON.stringify(response)
                    self.s.lines = dataSource.data()
                    self.updatePrice(self.s)
                    memberHandler.createShare(new ShareModel(self.s)).then(response => {
                        self.showLoading = false
                        if (response.data.statusCode === 201) {
                            self.$snotify.success('Successfully')
                            if (self.isSaveNew == true) {
                                self.addEmpty()
                            } else {
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
        async dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]
                let total = 0
                let data = {
                    shareId: this.s.pricePerShare.id,
                    memberId: dataRow.member.id
                }
                let totalshare = 0
                switch (e.field) {
                    case "shareAmount":
                        total = parseFloat(dataRow.shareAmount) * parseFloat(dataRow.sharePrice)
                        dataRow.set('amount', total)
                        break
                    case "member":
                        this.showLoading = true
                        await memberHandler.getShareByMemberId(data).then(res => {
                            this.showLoading = false
                            let lines = res.data.data
                            if(lines.length > 0){
                                $.each(lines, function (i,v){
                                    totalshare += parseFloat(v.shareAmount) - parseFloat(v.withdrawShare)
                                })
                            }
                        })
                        window.console.log(totalshare, 'total share', this.s.pricePerShare)
                        dataRow.set('share', totalshare)
                        if(this.s.pricePerShare.allowMaxSell == true){
                            let result = true
                            let p = this.s.pricePerShare
                            let mtype = p.maxSellType
                            if(p.allowShareAmount == true){
                                mtype = '$'
                            }
                            if(mtype == '%'){
                                let perc = (totalshare * this.oldShare) / 100
                                if(perc > parseFloat(p.maxSellAmount)){
                                    result = false
                                }
                            }else{
                                if(totalshare > parseFloat(p.maxSellAmount)){
                                    result = false
                                }
                            }
                            if(result == false){
                                this.$snotify.error('Member is limit with buy share')
                                const grid = $("#gridSaleDeposit").data("kendoGrid"),
                                    dataSource = grid.dataSource
                                dataSource.remove(dataRow)
                            }
                        }
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
            let totalShare = 0
            let ds = this.$refs.shareList.kendoWidget()
            ds.data().forEach(v => {
                totalAmount += parseFloat(v.amount)
                totalShare += parseFloat(v.shareAmount)
            })
            window.console.log(totalAmount, totalShare, 'cal')
            this.s.totalAmount = totalAmount
            this.s.totalShare = totalShare
            let p = this.s.pricePerShare
            if(p.allowShareAmount == true) {
                this.s.remainingShare = this.oldShare - totalShare
            }
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
                    share: 0,
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
            const grid = $("#gridSaleDeposit").data("kendoGrid"),
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
        async getLastNumber() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        pk: 'ac-shlin-',
                        productId: this.s.pricePerShare.id,
                        module: 'shar'
                    }
                    memberHandler.getLastNumber(data).then(res => {
                        this.lastNumber = res.data.data.lastNumber
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
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
        await this.getJournalNumber()
        await this.loadSegment()
        await this.loadPrice()
        await this.loadMemberCenter()
        // await this.loadShareAccount()
        await this.loadDecimal()
        this.addEmpty()
    },
    created: async function () {
        await this.loadAccount()
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

.v-input--radio-group--row {
    margin-top: 0px !important;
    padding: 0px;
}

.v-input__control {
    height: 25px !important;
}
</style>
