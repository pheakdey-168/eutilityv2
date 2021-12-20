<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="text-uppercase">{{ $t('ending_balance') }}</td>
                        <td class="">:</td>
                        <td class="text-left text-bold">{{ numberFormata(outStandingBalance) }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('total_paid') }}</td>
                        <td class="">:</td>
                        <td class="text-left text-bold">{{ numberFormata(totalPaid) }}</td>
                    </tr>
                    <tr>
                        <td class="third white--text text-uppercase mt-5">{{ $t('loan_number') }}</td>
                        <td class="third white--text ">:</td>
                        <td class="third white--text text-left text-bold mt-5">{{ loanNumber }}</td>
                    </tr>
                    <tr>
                        <td class="third white--text text-uppercase mt-5">{{ $t('total_payment') }}</td>
                        <td class="third white--text ">:</td>
                        <td class="third white--text text-left text-bold mt-5">{{ numberFormata(totalPayment) }}</td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('total_interest') }}</td>
                        <td class="secondary white--text">:</td>
                        <td class="secondary white--text text-left text-bold mt-5">{{numberFormata(Interest)}}</td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('currency') }}</td>
                        <td class="secondary white--text">:</td>
                        <td class="secondary white--text text-left text-bold mt-5">{{currencyCode}}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="pt-0">
            <v-simple-table>
                <template>
                    <v-simple-table class="attachment_table">
                        <template>
                            <kendo-datasource
                                ref="loanSchedule"
                                :change="dataSourceChanged"
                                :page-size='10'
                                :data="scheduleAR"/>
                            <kendo-grid
                                id="loanSchedule" class="grid-function"
                                :data-source-ref="'loanSchedule'"
                                :sortable="false"
                                :filterable="false"
                                :column-menu="false"
                                :editable="true"
                                :data-items="items"
                                :skip= "skip"
                                :take="take"
                                :total="total"
                                :pageable="true"
                                :page-size="pageSize"
                                :scrollable-virtual="false"
                                v-on:databound="dataBound"
                            >
                                <kendo-grid-column
                                    :field="'date'"
                                    :title="$t('date')"
                                    :width="200"
                                    :editable="()=>{ return false}"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                />
                                <kendo-grid-column
                                    :field="'totalAmount'"
                                    :title="$t('pay')"
                                    :width="150"
                                    :editable="()=>{ return false}"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                />
                                <kendo-grid-column
                                    :field="'principalAmount'"
                                    :title="$t('principal')"
                                    :width="150"
                                    :format="'{0:n}'"
                                    :editable="()=>{ return false}"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                />
                                <kendo-grid-column
                                    :field="'interestAmount'"
                                    :title="$t('interest')"
                                    :width="150"
                                    :format="'{0:n}'"
                                    :editable="()=>{ return false}"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                />
                                <kendo-grid-column
                                    :field="'endingBalance'"
                                    :title="$t('balance')"
                                    :width="150"
                                    :format="'{0:n}'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                />
                                <kendo-grid-column
                                    :field="'numStatus'"
                                    :title="$t('action')"
                                    :command="[{text: $t('pay'), click: searchLoanPaid }]"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                            </kendo-grid>
                        </template>
                        <!--                                    :template="actionTmpl"-->
<!--                        <template v-slot:default>-->
<!--                            <thead>-->
<!--                            <tr>-->
<!--                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('date') }}</th>-->
<!--                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('pay') }}</th>-->
<!--                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('principal') }}</th>-->
<!--                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('interest') }}</th>-->
<!--                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('balance') }}</th>-->
<!--                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('action') }}</th>-->
<!--                            </tr>-->
<!--                            </thead>-->
<!--                            <tbody>-->
<!--                            <tr v-for="d in scheduleAR" v-bind:key="d.no">-->
<!--                                <td>{{ d.date != 'Total' ? d.date : $t('total') }}</td>-->
<!--                                <td class="px-2" style="text-align: right;">{{ d.totalAmount }}</td>-->
<!--                                <td class="px-2" style="text-align: right;">{{ d.principalAmount }}</td>-->
<!--                                <td class="px-2" style="text-align: right;">{{ d.interestAmount }}</td>-->
<!--                                <td class="px-2" style="text-align: right;">{{ d.date != 'Total' ? d.endingBalance : '' }}</td>-->
<!--                                <td class="px-2 py-1" style="text-align: center;">-->
<!--                                    {{ d.numStatus == 2 ? d.status : '' }}-->
<!--                                    <v-btn color="primary" class="" v-show="d.numStatus == 1" @click="searchLoanPaid(d)" style="font-size: 14px;">-->
<!--                                        {{ $t('pay') }}-->
<!--                                    </v-btn>-->
<!--                                </td>-->
<!--                            </tr>-->
<!--                            </tbody>-->
<!--                        </template>-->
                    </v-simple-table>
                </template>

            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <v-dialog v-model="showReceipt" max-width="850px">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card>
                                <v-card-title><h3>{{ loanName }}</h3></v-card-title>
                                <v-icon class="btn_close" @click="showReceipt = false"  
                                    style="cursor: pointer; color: #333; font-size: 40px;">close</v-icon>
                                <v-divider/>
                                <v-card-text style="height: 450px; color: #333333;">
                                    <v-row class="px-4 mb-4">
                                        <v-col sm="6" cols="12" class="">
                                            <label class="label">{{ $t('date') }}</label>
                                            <app-datepicker
                                                class="mt-1"
                                                :initialDate="r.issuedDate"
                                                @emitDate="r.issuedDate = $event"/>
                                            <label class="label">{{ $t('cash_account') }}</label>
                                            <v-select
                                                class="mt-1"
                                                outlined
                                                return-object
                                                id=""
                                                :items="cashAccounts"
                                                item-text="name"
                                                item-value="id"
                                                v-model="r.cashAccount"
                                            />
                                            <label class="label">{{ $t('penalty_account') }}</label>
                                            <v-select
                                                class="mt-1"
                                                outlined
                                                return-object
                                                id=""
                                                :items="penaltyAccounts"
                                                item-text="name"
                                                item-value="id"
                                                v-model="r.penaltyAccount"
                                            />
                                        </v-col>
                                        <v-col sm="6" cols="12" class="function_content pa-3">
                                            <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                    min-height="50px" color="primary">
                                                <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                {{ $t('pay_amount') }}</h3>
                                                <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                                {{(receiptAmount) }}</h3>
                                                
                                            </v-card>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                        <tr>
                                                            <td class="text-left pr-0" style="height: 48px !important;">{{
                                                                $t('currency')
                                                            }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-right">
                                                                {{ (currencyCode) }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left pr-0" style="height: 48px !important;">{{
                                                                    $t('rate')
                                                                }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-right">
                                                                {{ (rate) }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left pr-0">{{
                                                                $t('number')
                                                            }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-right">
                                                                <v-text-field
                                                                    v-model="r.number"
                                                                    style="text-align:right;direction: rtl;display: inline;"
                                                                    disabled/>
                                                            </td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                    <template>
                                        <kendo-datasource
                                            ref="receiptList"
                                            :change="dataSourceChanged"
                                            :data="schedule"/>
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
            :myLoading="true"/>
    </v-row>
</template>
<script>
import { i18n } from '@/i18n';
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
import LoanReceiptModel from '@/scripts/financing/model/LoanReceipt'
import {dataStore} from '@/observable/store'
const loanHandler = require("@/scripts/financing/handler/loanHandler")
const accountHandler = require("@/scripts/handler/accounting/account")
// journal
const store = require("@/institute.js")
const {cookies} = store.default.state
import {JournalModel, UserModel} from "@/scripts/model/AppModels"
import Helper from "@/helper.js"
import saleFormContentHandler from "@/scripts/saleFormContentHandler";
import billingHandler from "@/scripts/invoice/handler/billingHandler";
// import LoanType from "@/scripts/default_setup/LoanType.js";
import {prefixHandler} from "@/scripts/AppHandlers";
const { journalHandler } = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")
const LoanType = require("@/scripts/default_setup/LoanType.js");
export default {
    name: "ListOfLoan",
    props: {listOfLoan: {}},
    computed: {
        loanNumber() {
            if (this.listOfLoan) {
                this.makeSchedule()
                return this.listOfLoan.approveNumber
            }
            return ''
        },
        currencyCode() {
            if (this.listOfLoan) {
                if (this.listOfLoan.hasOwnProperty('currency')) {
                    return this.listOfLoan.currency.code
                }
            }
            return ''
        },
        loanName() {
            if (this.listOfLoan) {
                return this.listOfLoan.approveNumber + '-' + this.listOfLoan.name
            }
            return ''
        },
        outStandingBalance(){
            if (this.listOfLoan) {
                return this.listOfLoan.outStandingBalance
            }
            return ''
        },
        Interest(){
            if (this.listOfLoan) {
                return this.listOfLoan.totalInterest
            }
            return ''
        },
        items: {
            get: function() {
                return this.scheduleAR.slice(this.skip, this.take + this.skip);
            }
        },
        total () {
            return this.scheduleAR ? this.scheduleAR.length : 0;
        }
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': () => import('@/components/custom_templates/DatePickerComponent')
    },
    data: () => ({
        errors: [],
        skip: 0,
        take: 10,
        pageSize: 10,
        pageable: {
            info: true,
            type: 'numeric',
            pageSizes: true,
            previousNext: true
        },
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        loggedUser: new UserModel(cookies.user),
        scheduleAR: [],
        info: {},
        totalPayment: 0,
        format: '',
        totalPaid: '',
        endingBalance: '',
        numberFormat: 'n0',
        exchangeRate: {},
        rate: 1,
        r: new LoanReceiptModel({}),
        isPaid: false,
        segment: {},
        pin: dataStore.pin,
        segments: [],
        cashAccounts: [],
        schedule: [],
        penaltyAccount: {},
        showReceipt: false,
        valid: true,
        receiptAmount: 0,
        interestAmount: 0,
        showLoading: false,
        penaltyAccounts: [],
        saleFormContent: {},
        transactionType: {},
        suffix: '',
        loan: {},
        journal: {}
    }),
    watch: {},
    methods: {
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]
                window.console.log(dataRow)
            }
        },
        // async loadDecimal() {
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve('resolved');
        //             loanHandler.decimalGet().then(res => {
        //                 this.decimals = res.data.data
        //             })
        //         }, 300);
        //     })
        //     new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve("resolved");
        //             saleFormContentHandler.list().then((res) => {
        //                 if (res.data.statusCode === 200) {
        //                     const data = res.data.data;
        //                     if (data.length > 0) {
        //                         this.saleFormContent = data[0];
        //                         this.numberFormat = 'n' + this.saleFormContent.decimal
        //                         this.loan.decimal = data[0].decimal
        //                     }
        //                 }
        //             });
        //         }, 10);
        //     });
        // },
        actionTmpl(dataItem) {
            window.console.log(dataItem)
            if(dataItem.numStatus == 2){
                return i18n.t('paid')
            }else{
                return `<v-btn color="primary" class="" v-show="d.numStatus == 1" @click="{searchLoanPaid(dataItem)}" style="font-size: 14px;">` + i18n.t('pay') + `</v-btn>`
            }
        },
        rowNumberTmpl(dataItem) {
            if(dataItem) {
                let ds = this.$refs.scheduleAR.kendoWidget(),
                    index = ds.indexOf(dataItem);
                if (index === (this.scheduleAR.length - 1)) {
                    return ''
                } else {
                    return index + 1
                }
            }
            return  ''
        },
        async makeSchedule(){
            this.scheduleAR = []
            this.endingBalance = ''
            this.totalPaid = ''
            this.totalPayment = ''
            window.console.log('a')
            if(this.listOfLoan.status == "active" || this.listOfLoan.status == "close") {
                this.loan = this.listOfLoan
                window.console.log(this.listOfLoan, 'b')
                await this.loadSchedule(this.listOfLoan.id)
            }
        },
        dataBound: function (e) {
            const items = e.sender.items()
            if(items.length > 0){
                const grid = kendo.jQuery("#loanSchedule").data("kendoGrid")
                if(grid){
                    items.each(function () {
                        let dataItem = grid.dataItem(this);
                        window.console.log(dataItem.numStatus)
                        // kendo.jQuery("tr[data-uid='" + dataItem.uid + "']").find(".isStatus").each(function () {
                            if (dataItem.numStatus == 2) {
                                window.console.log(kendo.jQuery(this), 'wow')
                                kendo.jQuery(this).find('td').eq(5).text(i18n.t('paid'));
                                // kendo.jQuery(this).removeClass('k-state-disabled')
                            }else if(dataItem.numStatus == 3){
                                kendo.jQuery(this).find('td').eq(5).text('');
                            }
                        // )
                        // })
                    })
                }
            }
        },
        async searchLoanPaid(e){
            e.preventDefault();
            let grid = kendo.jQuery("#loanSchedule").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            // window.console.log(dataItem)
            await this.loadPrefix()
            this.loadTransactionRate()
            let data = []
            data.push(dataItem)
            this.calReceipt(data)
        },
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.r.issuedDate).toISOString().substr(0, 10)
                    let code = this.currencyCode
                    // window.console.log(this.currencyCode, 'transaction rate')
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const response = res.data.data[0]
                                this.exchangeRate = response
                                this.rate = response.rate
                                this.showLoading = false
                                // this.r.userPin = this.pin
                                // this.r.rate = response.rate
                                this.r.exchangeRate = response
                            }
                        })
                    }
                }, 300)
            })
        },
        calReceipt(data) {
            if (data.length > 0) {
                let total = 0
                let interest = 0
                // let s = []
                let self = this
                let penalty = 0
                let ss = []
                // window.console.log(data, 'cal receipt')
                $.each(data, function (i, v) {
                    interest += parseFloat(v.interest)
                    let p = self.listOfLoan
                    let int = 0
                    let startdate = new Date(v.date)
                    let enddate = new Date()
                    let months = enddate.getMonth() - startdate.getMonth() + (12 * (enddate.getFullYear() - startdate.getFullYear()))
                    if (months >= 3) {
                        int = (parseFloat(v.interest) * parseFloat(p.product.dueThreeMonth)) / 100
                    } else if (months < 3 && months >= 2) {
                        int = (parseFloat(v.interest) * parseFloat(p.product.dueTwoMonth)) / 100
                    } else if (months == 1) {
                        int = (parseFloat(v.interest) * parseFloat(p.product.dueOneMonth)) / 100
                    }
                    // window.console.log(parseFloat(v.principal), 'principal')
                    ss.push({
                        id: v.id,
                        date: v.date,
                        principal: kendo.toString(parseFloat(v.principal), v.numberFormat),
                        interest: kendo.toString(parseFloat(v.interest), v.numberFormat),
                        total: kendo.toString(parseFloat(v.total), v.numberFormat),
                        penalty: int
                    })
                    total += parseFloat(v.total) + int
                    penalty += int
                })
                if (ss.length > 0) {
                    this.schedule = ss
                }
                if (total > 0) {
                    this.r.penaltyAmount = penalty
                    this.r.schedules = this.schedule
                    window.console.log(this.listOfLoan, 'list loan')
                    this.r.loan = {
                        id: this.listOfLoan.id,
                        name: this.listOfLoan.name
                    }
                    this.receiptAmount = kendo.toString(total, this.numberFormat)
                    this.interestAmount = kendo.toString(interest, this.numberFormat)
                    this.r.receiptAmount = total
                    this.r.interestAmount = interest
                    this.r.principalAmount = total - interest
                    this.showReceipt = true
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
        loadSchedulea(data){
            window.console.log(data, 'schedule')
            let self = this
            // let iamt = 0
            let tamt = 0
            let pamt = 0
            let isCheckFirst = false
            $.each(data, function (i,v){
                let status = ''
                let nStatus = 3
                if(v.status == 2){
                    status = i18n.t('paid')
                    pamt += v.data.total
                    nStatus = 2
                }else{
                    if(isCheckFirst == false) {
                        nStatus = v.status
                        isCheckFirst = true
                    }
                }
                self.scheduleAR.push({
                    id: v.pk,
                    no: i +1,
                    date: v.data.date,
                    interest: v.data.interest,
                    interestAmount: kendo.toString(v.data.interest, v.data.numberFormat),
                    locale: v.data.locale,
                    numberFormat: v.data.numberFormat,
                    principal: v.data.principal,
                    principalAmount: kendo.toString(v.data.principal, v.data.numberFormat),
                    principal_r: kendo.toString(v.data.principal_r, v.data.numberFormat),
                    totalAmount: kendo.toString(v.data.total, v.data.numberFormat),
                    total: v.data.total,
                    status: status,
                    numStatus: nStatus,
                    endingBalance: kendo.toString(v.data.principal_r - v.data.principal, v.data.numberFormat)
                })
                // iamt += v.interest
                tamt += v.data.total
                // self.currencyCode = v.data.locale
                self.numberFormat = v.data.numberFormat
            })
            window.console.log(tamt)
            this.totalPayment = kendo.toString(tamt, this.numberFormat)
            this.totalPaid = kendo.toString(pamt, this.numberFormat)
            this.endingBalance = kendo.toString(tamt - pamt, this.numberFormat)
            // this.addTotal()
        },
        loadSchedule(loanId){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.loanScheduleGet(loanId).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let data = res.data.data
                            let self = this
                            let s = []
                            this.scheduleAR = []
                            if(data.length > 0){
                                let iamt = 0
                                let tamt = 0
                                let pamt = 0
                                let isCheckFirst = false
                                $.each(data, function (i,v){
                                    let status = ''
                                    let nStatus = 3
                                    if(v.status == 2){
                                        status = i18n.t('paid')
                                        pamt += v.data.total
                                        nStatus = 2
                                    }else{
                                        if(isCheckFirst == false) {
                                            nStatus = v.status
                                            isCheckFirst = true
                                        }
                                    }
                                    s.push({
                                        id: v.id,
                                        no: i +1,
                                        date: v.data.date,
                                        interest: v.data.interest,
                                        interestAmount: kendo.toString(v.data.interest, v.data.numberFormat),
                                        locale: v.data.locale,
                                        numberFormat: v.data.numberFormat,
                                        principal: v.data.principal,
                                        principalAmount: kendo.toString(v.data.principal, v.data.numberFormat),
                                        principal_r: kendo.toString(v.data.principal_r, v.data.numberFormat),
                                        totalAmount: kendo.toString(v.data.total, v.data.numberFormat),
                                        total: v.data.total,
                                        status: status,
                                        numStatus: nStatus,
                                        endingBalance: kendo.toString(v.data.principal_r - v.data.principal, v.data.numberFormat)
                                    })
                                    iamt += v.data.interest
                                    tamt += v.data.total
                                    // self.currencyCode = v.data.locale
                                    self.numberFormat = v.data.numberFormat
                                })
                                window.console.log(tamt)
                                this.totalInterest = kendo.toString(iamt, this.numberFormat)
                                this.totalPayment = kendo.toString(tamt, this.numberFormat)
                                this.totalPaid = kendo.toString(pamt, this.numberFormat)
                                this.endingBalance = kendo.toString(tamt - pamt, this.numberFormat)
                                // this.addTotal()
                                if(s.length > 0) {
                                    this.scheduleAR = s
                                }
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        addTotal() {
            window.console.log(this.listOfLoan)
            this.scheduleAR.push({
                id: '',
                no: this.scheduleAR.length + 1,
                principal_r: '',
                principalAmount: kendo.toString(parseFloat(this.listOfLoan.approvedAmount), this.numberFormat),
                interestAmount: kendo.toString(this.totalInterest, this.numberFormat),
                totalAmount: kendo.toString(this.totalPayment, this.numberFormat),
                date: 'Total',
                locale: this.currencyCode,
                numberFormat: this.numberFormat,
                transaction_number: '',
                status: '',
                endingBalance: ''
            })
            // let ds = this.$refs.scheduleAR.kendoWidget()
            // ds.setDataSource(this.scheduleAR)
            // $.each(this.scheduleAR, function (i,v){
            //     ds.add({
            //         principal_r: v.principal_r,
            //         principal: v.principal,
            //         interest: v.interest,
            //         total: v.total,
            //         date: v.date,
            //         locale: v.locale,
            //         numberFormat: v.numberFormat,
            //         transaction_number: v.transaction_number,
            //         status: v.status
            //     })
            // })
            // window.console.log(this.scheduleAR, 's')
        },
        async loadAccount() {
            window.console.log(this.listOfLoan, 'list')
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        window.console.log(res, 'account')
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
                        if (this.cashAccounts.length > 0) {
                            this.r.cashAccount = this.cashAccounts[0]
                        }
                        if(this.penaltyAccounts.length > 0){
                            this.r.penaltyAccount = this.penaltyAccounts[0]
                        }
                    })
                }, 300);
            })
        },
        // jounal
        async getJournalNumber() {
            let num = await Helper.generateAccountingNumber(this.journalTxnType, this.r.issuedDate)
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
        async addJournal() {
            let int = 0
            $.each(this.schedules, function (i, v) {
                int += parseFloat(v.int)
            })
            this.r.penaltyAmount = int
            const obj = this.r
            // const seg = this.segment
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
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
                "description": this.journal.description,
                "third_contacts": [],
                "ref_number": '',
                "amount": parseFloat(obj.receiptAmount) * -1,
                "discount": {},
                "mark_up": 0,
                "billable": 0,
                "tax_code": "",
                "payment_method": {},
                "currency": this.exchangeRate,
                "exchange_rate_uuid": "",
                "exchange_rate": this.rate,
                "exchanged_amount": (parseFloat(obj.receiptAmount) * -1) * parseFloat(this.rate),
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
                    "account": this.listOfLoan.loanAccount,
                    "description": '',
                    "third_contacts": [],
                    "ref_number": '',
                    "amount": parseFloat(obj.principalAmount),
                    "discount": {},
                    "mark_up": 0,
                    "billable": 0,
                    "tax_code": "",
                    "payment_method": {},
                    "currency": this.exchangeRate,
                    "exchange_rate_uuid": "",
                    "exchange_rate": this.rate,
                    "exchanged_amount": parseFloat(obj.principalAmount) * parseFloat(this.rate),
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
                    "account": this.listOfLoan.interestAccount,
                    "description": '',
                    "third_contacts": [],
                    "ref_number": '',
                    "amount": parseFloat(obj.interestAmount),
                    "discount": {},
                    "mark_up": 0,
                    "billable": 0,
                    "tax_code": "",
                    "payment_method": {},
                    "currency": this.exchangeRate,
                    "exchange_rate_uuid": "",
                    "exchange_rate": this.rate,
                    "exchanged_amount": parseFloat(obj.interestAmount) * parseFloat(this.rate),
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
                if (Object.keys(this.r.penaltyAccount).length == 0) {
                    this.$snotify.error('Please select penalty account')
                    return
                }
                jj.push({
                    "uuid": "",
                    "account": this.penaltyAccount,
                    "description": '',
                    "third_contacts": [],
                    "ref_number": '',
                    "amount": parseFloat(obj.penaltyAmount),
                    "discount": {},
                    "mark_up": 0,
                    "billable": 0,
                    "tax_code": "",
                    "payment_method": {},
                    "currency": this.exchangeRate,
                    "exchange_rate_uuid": "",
                    "exchange_rate": this.rate,
                    "exchanged_amount": parseFloat(obj.penaltyAmount) * parseFloat(this.rate),
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
            // let data = {
            //     "number": this.journalNumber,
            //     "description": "Loan Receipt",
            //     "journal_type": "general_journal",
            //     "journal_date": new Date(obj.issuedDate),
            //     "currency_code": this.currencyCode,
            //     "buinsess_unit_uuid": "",
            //     "location_uuid": "",
            //     "project_uuid": "",
            //     "segment_uuid": "",
            //     "journal_entries": jj,
            //     "transaction_type": "journal",
            //     "is_draft": 0,
            //     "is_reversed": 0,
            //     "prefix_format": this.journalPrefix,
            //     "created_by": this.loggedUser
            // }
            this.journal.prefix_format = this.journalPrefix
            this.journal.journal_entries = jj
            this.journal.currency_code = this.currencyCode
            this.journal.journal_date = Helper.toISODate(this.r.issuedDate)
            this.journal.created_by = this.loggedUser
            if(this.listOfLoan.hasOwnProperty('segment')){
                this.journal.segment_uuid = this.listOfLoan.segment.id
            }
            if(this.listOfLoan.hasOwnProperty('location')){
                this.journal.location_uuid = this.listOfLoan.location.id
            }
            journalHandler.save(new JournalModel(this.journal))
                .then(function (response) {
                    // window.console.log(response, 'res')
                    self.r.user = self.loggedUser
                    self.r.loan = self.listOfLoan
                    self.r.journal = JSON.stringify(self.journal)
                    self.r.journalId = response.data.uuid
                    window.console.log(self.r, 'receipt obj')
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
        saveReceipt() {
            loanHandler.loanPaymentCreate(new LoanReceiptModel(this.r)).then(response => {
                this.showLoading = false
                if (response.data.statusCode === 201) {
                    this.$snotify.success('Successfully')
                    this.showReceipt = false
                    this.makeSchedule()
                }
            }).catch(e => {
                this.showLoading = false
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
                window.console.log(e, 'error')
            })
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
                                // window.console.log(data[0])
                            }
                        }
                    });
                }, 10);
            });
        },
        numberFormata(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.saleFormContent.decimal}`);
            // return value
        },
        generateNumber() {
            let data = {
                abbr: this.transactionType.abbr,
                structure: this.transactionType.structure,
                transactionDate: this.r.issuedDate,
                type: "Record Loan Periodic Payment",
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
                type: "RecordPayment",
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
                        this.r.lastNumber = parseInt(res.lastNumber)
                        const number =
                            this.suffix +
                            this.transactionType.numberSeparator +
                            lastNumber;
                        let des = ''
                        if(Object.keys(this.loan).length > 0){
                            des = `Pay Loan from ${this.loan.financialInstitutions.name} For Loan Number ${this.loan.approveNumber}`;
                        }

                        this.journal = new JournalModel({
                            description: des,
                            transaction_type: LoanType.REPAYMENT,
                            journal_type: LoanType.REPAYMENT,
                        });
                        this.journal.abbr = this.transactionType.abbr
                        // this.loan.activeDate = new Date().toISOString().substr(0, 10);

                        // Add 2 default rows
                        // this.addRowT(this.$refs.cashBankAccountDS.kendoWidget());
                        // for (let index = 0; index < 2; index++) {
                        //     this.addRow(this.$refs.relatedCostDS.kendoWidget());
                        // }
                        this.journal.number = this.transactionType.abbr + this.transactionType.numberSeparator + number
                        this.r.abbr = this.transactionType.abbr
                        this.r.number = this.transactionType.abbr + this.transactionType.numberSeparator + number;
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
                    prefixHandler.get("record loan periodic payment").then((res) => {
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
    mounted: async function () {
        // await this.loadCurrencyData()
        // await this.loadDecimal()
        // await this.loadSegment()
        await this.getJournalNumber()
        await this.loadSaleFormContent()
        // await this.loadSinglePenalty()
    },
    created: async function () {
        await this.loadAccount()
    },
}
</script>
<style scoped>
.attachment_table table tr th {
    vertical-align: baseline !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
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