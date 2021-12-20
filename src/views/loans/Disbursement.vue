<template>
    <v-row>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <div class="function_header">
                                <h2>{{ $t('loan_disbursement') }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </div>
                            <v-col sm="12" col="12">
                                <v-row>
                                    <v-col sm="6" cols="12" class="pb-0 pl-0">
                                        <label class="label mb-0">{{ $t('date') }}</label>
                                        <app-datepicker :initialDate="disburs.issuedDate"
                                                        @emitDate="disburs.issuedDate = $event"/>

                                        <label class="label mb-0">{{ $t('first_payment') }}</label>
                                        <app-datepicker :initialDate="disburs.startPaymentDate"
                                                        @emitDate="disburs.startPaymentDate = $event"/>

                                        <label class="label mb-0">{{ $t('cash_account') }}</label>
                                        <v-select
                                            class="mt-1"
                                            :items="cashAccounts"
                                            :placeholder="$t('select')"
                                            disabled
                                            :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                            tage=""
                                            v-model="disburs.cashAccount"
                                            :rules="[v => !!v || 'Cash account is required']"
                                            return-object
                                            outlined/>

                                        <v-radio-group height=""
                                                       v-model="selectMember" @change="selectMemberChange" row
                                                       class="mt-1 mb-0 check-box">
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
                                        <div style="">
                                            <div
                                                class="kendo_dropdown_custom">
                                                <v-autocomplete
                                                    class="pt-0 mb-0"
                                                    v-model="disburs.member"
                                                    :items="memberData"
                                                    item-text="numberName"
                                                    @change="onMemberChange"
                                                    return-object
                                                    outlined
                                                ></v-autocomplete>
                                            </div>
                                        </div>

                                        <label class="label  mb-0">{{ $t('agreement_num') }}</label>
                                        <v-select
                                            class="mt-1"
                                            :items="loanList"
                                            :placeholder="$t('select')"
                                            item-text="number"
                                            item-value="id"
                                            tage=""
                                            v-model="disburs.loan"
                                            @change="loanChange"
                                            :rules="[v => !!v || 'Loan is required']"
                                            return-object
                                            outlined/>

                                    </v-col>

                                    <v-col sm="6" cols="12" class="function_content pa-3">
                                        <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                min-height="50px" color="primary">
                                            <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                {{ $t('name') }}</h3>
                                            <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                                {{ (disburs.member.name) }}
                                            </h3>

                                        </v-card>
                                        <v-simple-table>
                                            <template v-slot:default>
                                                <tbody>
                                                <tr>
                                                    <td class="text-left pr-0">{{ $t('monthly_payment') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ (disburs.monthlyPayment) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left pr-0">{{
                                                            $t('total_interest')
                                                        }}
                                                    </td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">
                                                        {{ (totalInterest) }}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>{{ $t('total_payment') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">{{ totalPayment }}</td>
                                                </tr>
                                                <tr>
                                                    <td>{{ $t('contract_number') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">{{ loan.number }}</td>
                                                </tr>
                                                <tr>
                                                    <td>{{ $t('principal_amount') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">{{ loanAmount }}</td>
                                                </tr>

                                                <tr>
                                                    <td>{{ $t('monthly_interest_rate') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">{{
                                                            loan.interestRatePerMonth ? loan.interestRatePerMonth.name : ''
                                                        }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>{{ $t('loan_term') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">{{ loan.period }}</td>
                                                </tr>
                                                <tr>
                                                    <td>{{ $t('payment_code') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">{{ loan.paymentCode }}</td>
                                                </tr>
                                                <tr>
                                                    <td>{{ $t('currency') }}</td>
                                                    <td class="text-center">:</td>
                                                    <td class="text-right">{{ currencyCode }}</td>
                                                </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-form>
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <template>
                                    <kendo-datasource
                                        ref="scheduleAR"
                                        :data="scheduleAR"/>
                                    <kendo-grid
                                        id="scheduleAR" class="grid-function"
                                        :data-source-ref="'scheduleAR'"
                                        :column-menu="false"
                                        :noRecords="true"
                                        :editable="false"
                                        :groupable="false"
                                        :scrollable-virtual="true">
                                        <kendo-grid-column
                                            :title="$t('no.')"
                                            :width="55"
                                            :column-menu="false"
                                            :template="rowNumberTmpl"
                                            :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products'}"
                                            :attributes="{style: 'text-align: center'}"
                                        />
                                        <kendo-grid-column
                                            :field="'date'"
                                            :title="$t('date')"
                                            :template="'<span>#= date!=`Total` ? date : `` #</span>'"
                                            :width="200"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            :attributes="{style: 'text-align: left'}"
                                        />
                                        <kendo-grid-column
                                            :field="'disbursed_amt'"
                                            :title="$t('disbursed_amt')"
                                            :template="'<span>#= kendo.toString(principal_r, numberFormat) #</span>'"
                                            :width="200"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                            :attributes="{style: 'text-align: right'}"
                                        />
                                        <kendo-grid-column
                                            :field="'amount_to_be_paid'"
                                            :title="$t('amount_to_be_paid')"
                                            :template="'<span>#= kendo.toString(total, numberFormat) #</span>'"
                                            :width="150"
                                            :headerAttributes="{style: 'background-color: #EDF1F5' }"
                                            :attributes="{style: 'text-align: right; font-weight: bold'}"
                                        />
                                        <kendo-grid-column
                                            :field="'principal_amount'"
                                            :title="$t('principal_amount')"
                                            :template="'<span>#= kendo.toString(principal, numberFormat) #</span>'"
                                            :width="150"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                            :attributes="{style: 'text-align: right'}"
                                        />
                                        <kendo-grid-column
                                            :field="'interest'"
                                            :title="$t('interest')"
                                            :template="'<span>#= kendo.toString(interest, numberFormat) #</span>'"
                                            :width="200"
                                            :attributes="{style: 'text-align: right'}"
                                            :headerAttributes="{style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'ending_balance'"
                                            :title="$t('ending_balance')"
                                            :template="'<span>#= date!=`Total` ? kendo.toString(principal_r - principal, numberFormat) : `` #</span>'"
                                            :width="200"
                                            :attributes="{style: 'text-align: right'}"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                        />
                                    </kendo-grid>
                                </template>
                                <div class="function_footer">
                                    <v-btn outlined color="#494846" class="float-left text-capitalize"
                                           @click="cancel">{{ $t('cancel') }}
                                    </v-btn>
                                    <v-btn color="secondary" class="float-right white--text text-capitalize"
                                           @click="saveClose">
                                        {{ $t('save_close') }}
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
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
            </v-row>
        </v-container>
    </v-row>
</template>

<script>
import Helper from "@/helper.js"
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
// import {DropDownList} from "@progress/kendo-vue-dropdowns"
import kendo from "@progress/kendo-ui"
import DisbursementModel from '@/scripts/model/LoanDisbursement'
import {dataStore} from '@/observable/store'

const memberHandler = require("@/scripts/memberHandler")
const customerHandler = require("@/scripts/customerHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const loanHandler = require("@/scripts/loanHandler")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const prefixHandler = require("@/scripts/prefixHandler")
// const accountHandler = require("@/scripts/accountHandler")

const textField = 'name'
const keyField = 'id'
const customerItem = {[textField]: 'Select Customer...', [keyField]: null}
const memberItem = {[textField]: 'Select Member...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const store = require("@/institute.js")
const {cookies} = store.default.state

// journal
import {JournalModel, UserModel} from "@/scripts/model/AppModels"

const {journalHandler} = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")
export default {
    data: () => ({
        valid: true,
        showLoading: false,
        showLoadingData: false,
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
        disburs: new DisbursementModel({}),
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
        //journal
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        loggedUser: new UserModel(cookies.user),
        segments: [],
        segment: {},
        accountName: 'name',
        memberData: [],
        pin: dataStore.pin
    }),
    components: {
        'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
        // 'dropdownlist': DropDownList
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
        loanChange() {
            // window.console.log(this.disburs.loan, 'loan')
            this.loan = this.disburs.loan
            if (this.disburs.loan.hasOwnProperty('loanProduct')) {
                this.currencyCode = this.disburs.loan.loanProduct.currency.code
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                this.numberFormat = 'n' + fo
                this.loanAmount = kendo.toString(parseFloat(this.loan.amount), this.numberFormat)
                this.loadTransactionRate()
                this.scheduleAR = []
                if (this.loan.loanMethod.id === 'lpm-57bb825e-984a-11eb-a8b3-0242ac130003') {
                    this.schedule1()
                } else if (this.loan.loanMethod.id === 'lpm-57bb84ac-984a-11eb-a8b3-0242ac130003') {
                    this.schedule2()
                } else if (this.loan.loanMethod.id === 'lpm-57bb85a6-984a-11eb-a8b3-0242ac130003') {
                    this.schedule3()
                } else if (this.loan.loanMethod.id === 'lpm-57bb884e-984a-11eb-a8b3-0242ac130003') {
                    this.schedule4()
                } else if (this.loan.loanMethod.id === 'lpm-2e381d5a-3612-11ec-8d3d-0242ac130003') {
                    this.schedule6()
                } else {
                    this.schedule5()
                }
            }
        },
        schedule1() {
            let p = parseFloat(this.loan.amount)
            let t = parseFloat(this.loan.period)
            let dd = t / 3;
            let timeamount = p / dd;
            let ir = parseFloat(this.loan.interestRatePerMonth.interestRate)
            let sd = this.disburs.startPaymentDate
            let fp = 0
            let self = this
            let tInterest = 0
            for (let i = 0; i < t; i++) {
                let ite = (p * ir) / 100;
                ite = parseFloat(ite.toFixed(self.saleFormContent.decimal));
                tInterest += ite;
                let isEnd = false
                if (i == (t - 1)) {
                    fp = p;
                    isEnd == true;
                } else {
                    fp = 0;
                }
                //Interest rate
                //date
                let sda = sd;
                if (i > 0) {
                    sd = new Date(sd);
                    sd.setMonth(sd.getMonth() + 1);
                    sda = sd;
                }
                if(i == 0){
                    let tdate = self.daysBetween(self.disburs.issuedDate, self.disburs.startPaymentDate)

                    let date = new Date(self.disburs.issuedDate);
                    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    let con = lastDay.getDate() - tdate
                    if(con > 0){
                        let int = ite / lastDay.getDate()
                        ite -= con * int
                    }
                }
                self.scheduleAR.push({
                    principal_r: parseFloat(p),
                    principal: parseFloat(fp),
                    interest: parseFloat(ite),
                    total: parseFloat(ite + fp),
                    date: kendo.toString(sda, "yyyy-MM-dd"),
                    locale: self.currencyCode,
                    numberFormat: self.numberFormat,
                })
                if (isEnd) {
                    p = parseFloat(p) - parseFloat(timeamount)
                }
            }
            if (this.scheduleAR.length > 0) {
                this.disburs.monthlyPayment = kendo.toString(parseFloat(this.scheduleAR[0].total), this.numberFormat)
            }
            this.totalInterest = kendo.toString(tInterest, this.numberFormat)
            this.disburs.totalInterest = tInterest
            this.totalPayment = kendo.toString(tInterest + parseFloat(this.disburs.loan.amount), this.numberFormat)
            this.disburs.totalPayment = tInterest + parseFloat(this.disburs.loan.amount)
            this.addTotal()
        },
        schedule2() {
            let p = parseFloat(this.loan.amount)
            let t = parseFloat(this.loan.period)
            let dd = t / 3
            let timeamount = p / dd
            let ir = parseFloat(this.loan.interestRatePerMonth.interestRate)
            let sd = this.disburs.startPaymentDate
            let fp = 0
            let self = this
            let tInterest = 0
            for (let i = 0; i < t; i++) {
                let ite = (p * ir) / 100
                ite = parseFloat(ite.toFixed(self.saleFormContent.decimal))
                tInterest += ite;
                let isEnd = false
                if (i != 0) {
                    if ((i + 1) % 3 == 0) {
                        isEnd = true
                        fp = timeamount
                    } else {
                        isEnd = false
                        fp = 0
                    }
                }
                //Interest rate
                //date
                let sda = sd
                if (i > 0) {
                    sd = new Date(sd);
                    sd.setMonth(sd.getMonth() + 1);
                    sda = sd;
                }
                if(i == 0){
                    let tdate = self.daysBetween(self.disburs.issuedDate, self.disburs.startPaymentDate)

                    let date = new Date(self.disburs.issuedDate);
                    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    let con = lastDay.getDate() - tdate
                    if(con > 0){
                        let int = ite / lastDay.getDate()
                        ite -= con * int
                    }
                }
                self.scheduleAR.push({
                    principal_r: p,
                    principal: fp,
                    interest: ite,
                    total: ite + fp,
                    date: kendo.toString(sda, "yyyy-MM-dd"),
                    locale: self.currencyCode,
                    numberFormat: self.numberFormat,
                })
                if (isEnd) {
                    p = parseFloat(p) - parseFloat(timeamount)
                }
            }
            if (this.scheduleAR.length > 0) {
                this.disburs.monthlyPayment = kendo.toString(parseFloat(this.scheduleAR[0].total), this.numberFormat)
            }
            this.totalInterest = kendo.toString(tInterest, this.numberFormat)
            this.disburs.totalInterest = tInterest
            this.totalPayment = kendo.toString(tInterest + parseFloat(this.disburs.loan.amount), this.numberFormat)
            this.disburs.totalPayment = tInterest + parseFloat(this.disburs.loan.amount)
            this.addTotal()
        },
        schedule3() {
            let p = parseFloat(this.loan.amount)
            let t = parseFloat(this.loan.period)
            let dd = t / 6;
            let timeamount = p / dd;
            let ir = parseFloat(this.loan.interestRatePerMonth.interestRate)
            let sd = this.disburs.startPaymentDate
            let fp = 0
            let self = this
            let tInterest = 0
            for (let i = 0; i < t; i++) {
                let ite = (p * ir) / 100;
                ite = parseFloat(ite.toFixed(self.saleFormContent.decimal))
                tInterest += ite;
                let isEnd = false
                if (i != 0) {
                    if ((i + 1) % 6 == 0) {
                        isEnd = true;
                        fp = timeamount;
                    } else {
                        isEnd = false;
                        fp = 0;
                    }
                }
                //Interest rate
                //date
                let sda = sd;
                if (i > 0) {
                    sd = new Date(sd);
                    sd.setMonth(sd.getMonth() + 1);
                    sda = sd;
                }
                if(i == 0){
                    let tdate = self.daysBetween(self.disburs.issuedDate, self.disburs.startPaymentDate)

                    let date = new Date(self.disburs.issuedDate);
                    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    let con = lastDay.getDate() - tdate
                    if(con > 0){
                        let int = ite / lastDay.getDate()
                        ite -= con * int
                    }
                }
                self.scheduleAR.push({
                    principal_r: p,
                    principal: fp,
                    interest: ite,
                    total: ite + fp,
                    date: kendo.toString(sda, "yyyy-MM-dd"),
                    locale: self.currencyCode,
                    numberFormat: self.numberFormat,
                })
                if (isEnd) {
                    p = parseFloat(p) - parseFloat(timeamount)
                }
            }
            if (this.scheduleAR.length > 0) {
                this.disburs.monthlyPayment = kendo.toString(parseFloat(this.scheduleAR[0].total), this.numberFormat)
            }
            this.totalInterest = kendo.toString(tInterest, this.numberFormat)
            this.disburs.totalInterest = tInterest
            this.totalPayment = kendo.toString(tInterest + parseFloat(this.disburs.loan.amount), this.numberFormat)
            this.disburs.totalPayment = tInterest + parseFloat(this.disburs.loan.amount)
            this.addTotal()
        },
        schedule4() {
            let p = parseFloat(this.loan.amount)
            let t = parseFloat(this.loan.period)
            let ir = parseFloat(this.loan.interestRatePerMonth.interestRate)
            let sd = this.disburs.startPaymentDate
            //Principle for every month
            let fp = (p / t).toFixed(this.saleFormContent.decimal)
            fp = parseFloat(fp)
            //Total by month
            // eslint-disable-next-line no-unused-vars
            let ft = 0
            let self = this
            let tInterest = 0
            for (let i = 0; i < t; i++) {
                ft += fp
                let ite = (p * ir) / 100;
                ite = parseFloat(ite.toFixed(self.saleFormContent.decimal));
                tInterest += ite;
                //Interest rate
                //date
                let sda = sd;
                if (i > 0) {
                    sd = new Date(sd);
                    sd.setMonth(sd.getMonth() + 1);
                    sda = sd;
                }
                if(i == 0){
                    let tdate = self.daysBetween(self.disburs.issuedDate, self.disburs.startPaymentDate)

                    let date = new Date(self.disburs.issuedDate);
                    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    let con = lastDay.getDate() - tdate
                    if(con > 0){
                        let int = ite / lastDay.getDate()
                        ite -= con * int
                    }
                }
                self.scheduleAR.push({
                    principal_r: p,
                    principal: fp,
                    interest: ite,
                    total: ite + fp,
                    date: kendo.toString(sda, "yyyy-MM-dd"),
                    locale: self.currencyCode,
                    numberFormat: self.numberFormat,
                });
                p = parseFloat((p - fp).toFixed(self.saleFormContent.decimal));
                // console.log(sd);
            }
            //Find balance
            p = parseFloat(p.toFixed(self.saleFormContent.decimal));
            if (p != 0) {
                this.makeBalance(p);
            }
            if (this.scheduleAR.length > 0) {
                this.disburs.monthlyPayment = kendo.toString(parseFloat(this.scheduleAR[0].total), this.numberFormat)
            }
            this.totalInterest = kendo.toString(tInterest, this.numberFormat)
            this.disburs.totalInterest = tInterest
            this.totalPayment = kendo.toString(tInterest + parseFloat(this.disburs.loan.amount), this.numberFormat)
            this.disburs.totalPayment = tInterest + parseFloat(this.disburs.loan.amount)
            this.addTotal()
        },
        schedule5() {
            let self = this
            let fprice = this.fixRate(parseFloat(this.loan.amount), ((parseFloat(this.loan.interestRatePerMonth.interestRate) * parseFloat(this.loan.period)) / 100), parseFloat(this.loan.period))
            fprice = parseFloat(fprice.toFixed(this.saleFormContent.decimal))
            this.disburs.monthlyPayment = this.disburs.monthlyPayment = kendo.toString(parseFloat(fprice), this.numberFormat)
            let p = parseFloat(this.loan.amount)
            let t = parseFloat(this.loan.period)
            let sd = this.disburs.startPaymentDate
            let ir = parseFloat(this.loan.interestRatePerMonth.interestRate)
            //add 1 hour
            let oldDate = new Date(sd)
            let hour = oldDate.getHours()
            let newDate = oldDate.setHours(hour + 1)
            sd = new Date(newDate)
            let tInterest = 0
            for (let i = 0; i < t; i++) {
                //date
                let start = 0,
                    end = 0,
                    diff = 0,
                    days = 0;
                if (i > 0) {
                    sd = new Date(self.scheduleAR[i - 1].date);
                    sd.setMonth(sd.getMonth() + 1);
                    // let d = new Date(sd);
                    //calculate day
                    start = new Date(self.scheduleAR[i - 1].date);
                    end = new Date(sd);
                    diff = new Date(end - start);
                    days = diff / 1000 / 60 / 60 / 24;
                } else if (i == 0) {
                    //calculate day
                    start = new Date();
                    end = new Date(sd);
                    diff = new Date(end - start);
                    days = diff / 1000 / 60 / 60 / 24;
                }
                if (days < 0) days = 0;
                // let cadate = parseInt(days);
                //interest
                // let ite = p * ((parseFloat(this.interest_rate) * 12) / 100) / 360 * cadate;
                let ite = (p * ir) / 100;
                ite = parseFloat(ite.toFixed(2));
                tInterest += ite;
                let sda = sd;
                if(i == 0){
                    let tdate = self.daysBetween(self.disburs.issuedDate, self.disburs.startPaymentDate)

                    let date = new Date(self.disburs.issuedDate);
                    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    let con = lastDay.getDate() - tdate
                    if(con > 0){
                        let int = ite / lastDay.getDate()
                        ite -= con * int
                    }
                }
                self.scheduleAR.push({
                    principal_r: p,
                    principal: fprice - ite,
                    interest: ite,
                    total: fprice,
                    date: kendo.toString(sda, "yyyy-MM-dd"),
                    locale: self.currencyCode,
                    numberFormat: self.numberFormat,
                });
                p = parseFloat((p - (fprice - ite)).toFixed(self.saleFormContent.decimal));
            }
            // console.log(p);
            p = parseFloat(p.toFixed(self.saleFormContent.decimal));
            if (p != 0) {
                this.makeBalance(p);
            }
            this.totalInterest = kendo.toString(tInterest, this.numberFormat)
            this.disburs.totalInterest = tInterest
            this.totalPayment = kendo.toString(tInterest + parseFloat(this.disburs.loan.amount), this.numberFormat)
            this.disburs.totalPayment = tInterest + parseFloat(this.disburs.loan.amount)
            this.addTotal()
        },
        schedule6() {
            let p = parseFloat(this.loan.amount)
            let t = parseFloat(this.loan.period)
            let ir = parseFloat(this.loan.interestRatePerMonth.interestRate)
            let sd = this.disburs.startPaymentDate
            // date
            let sda = sd;
            sd = new Date(sd)
            sd.setMonth(sd.getMonth() + t)
            sda = sd
            // interest
            let ite = ((p * ir) / 100) * t;
            window.console.log(p, ir, t, 'lll')
            ite = parseFloat(ite.toFixed(this.saleFormContent.decimal));
            this.scheduleAR.push({
                principal_r: parseFloat(p),
                principal: parseFloat(p),
                interest: parseFloat(ite),
                total: parseFloat(ite + p),
                date: kendo.toString(sda, "yyyy-MM-dd"),
                locale: this.currencyCode,
                numberFormat: this.numberFormat,
            })
            if (this.scheduleAR.length > 0) {
                this.disburs.monthlyPayment = kendo.toString(0, this.numberFormat)
            }
            this.totalInterest = kendo.toString(ite, this.numberFormat)
            this.disburs.totalInterest = ite
            this.totalPayment = kendo.toString(ite + parseFloat(this.disburs.loan.amount), this.numberFormat)
            this.disburs.totalPayment = ite + parseFloat(this.disburs.loan.amount)
            this.addTotal()
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
            // this.checkFirstPayment();
        },
        checkFirstPayment() {
        },
        treatAsUTC(date) {
            var result = new Date(date);
            result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
            return result;
        },
        daysBetween(startDate, endDate) {
            var millisecondsPerDay = 24 * 60 * 60 * 1000;
            return (this.treatAsUTC(endDate) - this.treatAsUTC(startDate)) / millisecondsPerDay;
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
        async loadPrefix() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    prefixHandler.get('invoice').then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.invoiceType = res.data.data[0]
                            this.getInvoiceLastNumber()
                        }
                    })
                }, 300);
            })
        },
        getInvoiceLastNumber() {
            let data = {
                abbr: this.invoiceType.abbr,
                structure: this.invoiceType.structure,
                transactionDate: this.disburs.issuedDate,
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
            window.console.log(this.disburs.member, 'member')
            // this.disburs.member = member
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    memberHandler.getLoanByMemberId(this.disburs.member.id).then(res => {
                        this.showLoading = false
                        this.loanList = res.data.data.filter((obj) => {
                            return obj.status == 2
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
            // if (this.selectMember == 'isMember') {
            //     this.customer = {}
            //     this.disburs.isMember = 1
            // } else {
            //     this.member = {}
            //     this.disburs.isMember = 2
            // }
            if (this.selectMember == 'isMember') {
                this.disburs.isMember = 1
                this.memberData = this.memberList
            } else {
                this.disburs.isMember = 2
                this.memberData = this.customerList
            }
            // this.loan = {}
            this.addEmpty()
        },
        onMemberChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.member = value
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
                    const date = new Date(this.disburs.issuedDate).toISOString().substr(0, 10)
                    let code = this.currencyCode
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const response = res.data.data[0]
                                // window.console.log(response, 'currency rate')
                                if (Object.keys(response).length > 0) {
                                    this.exchangeRate = response
                                    this.disburs.exchangeRate = this.exchangeRate
                                    this.disburs.rate = response.rate
                                    this.rate = response.rate
                                } else {
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
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                value = parseFloat(value)
                value = parseFloat(value.toFixed(fo))
                return kendo.toString(value, 'n' + fo) + this.currencyCode
            }
        },
        //function
        addEmpty() {
            this.disburs = new DisbursementModel({})
            this.loan = {}
            this.customer = {}
            this.member = {}
            this.totalPayment = 0
            this.monthlyPayment = 0
            this.totalInterest = 0
            let d = new Date()
            d.setMonth(d.getMonth() + 1);
            d.setDate(1)
            this.disburs.startPaymentDate = new Date(d).toISOString().substr(0, 10)
            this.disburs.cashAccount = this.cashAccounts[0]
            this.scheduleAR = []
            this.loanAmount = 0
            this.currencyCode = ''
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
            this.disburs.userPin = this.pin
            this.disburs.paymentSchedule = this.scheduleAR
            this.disburs.saveOption = this.saveOption
            this.showLoadingData = true
            memberHandler.createDisbursement(new DisbursementModel(this.disburs)).then(response => {
                this.showLoadingData = false
                if (response.data.statusCode === 201) {
                    this.$snotify.success('Successfully')
                    window.history.go(-1)
                }
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
                this.showLoadingData = false
                window.console.log(e, 'error')
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
        async loadAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true
                    this.cashAccounts = []
                    loanHandler.businessSettingGet().then((res) => {
                        this.showLoading = false
                        if (res.data.data.length > 0) {
                            let d = res.data.data.filter((obj) => {
                                return obj.type == 'Credit'
                            })
                            //Receivable Account
                            if (d.length > 0) {
                                this.cashAccounts.push(d[0].cashAccount)
                                this.disburs.cashAccount = this.cashAccounts[0]
                            } else {
                                this.$snotify.error('Please set cash account on credit setting')
                                this.cancel()
                            }
                        } else {
                            this.$snotify.error('Please set cash account on credit setting')
                            this.cancel()
                        }
                    });
                }, 10)
            });
            // new Promise(resolve => {
            //     setTimeout(() => {
            //         resolve('resolved');
            //         accountHandler.getAll().then(res => {
            //             this.showLoading = false
            //             //Receivable Account
            //             this.cashAccounts = res.filter(m => m.account_type.number === 1).map(itm => {
            //                 return {
            //                     id: itm.uuid,
            //                     uuid: itm.uuid,
            //                     name: itm.name,
            //                     local_name: itm.local_name,
            //                     number: itm.number,
            //                     is_taxable: itm.is_taxable,
            //                     banhjiAccCode: itm.banhjiAccCode,
            //                     group_code: itm.group_code,
            //                     parent_account: itm.parent_account,
            //                     type_code: itm.type_code
            //                 }
            //             })
            //             if (this.cashAccounts.length > 0) {
            //                 this.disburs.cashAccount = this.cashAccounts[0]
            //             }
            //         })
            //     }, 300);
            // })
        },
        // jounal
        async getJournalNumber() {
            let num = await Helper.generateAccoutingNumber(this.journalTxnType, this.disburs.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
            this.disburs.journalNumber = num.number
        },
        async addJournal() {
            const obj = this.disburs
            const seg = this.segment
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            if (this.scheduleAR.length == 0) {
                this.$snotify.error('Please select a loan number')
                return
            }
            let customer = obj.member
            if (Object.keys(customer).length == 0) {
                this.$snotify.error('Please select a member or customer')
                return
            }
            if (Object.keys(obj.loan).length == 0) {
                this.$snotify.error('Please select a loan number')
                return
            }
            this.showLoading = true
            let amt = parseFloat(obj.loan.amount)
            // API Journal
            let self = this;
            let data = {
                "number": this.journalNumber,
                "description": "Loan Disbursement",
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
                        "account": obj.loan.loanProduct.loanAccount,
                        "description": '',
                        "primary_contact": customer,
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
                    },
                    {
                        "uuid": "",
                        "account": obj.cashAccount,
                        "description": '',
                        "primary_contact": customer,
                        "third_contacts": [],
                        "ref_number": '',
                        "amount": (parseFloat(amt) * -1),
                        "discount": {},
                        "mark_up": 0,
                        "billable": 0,
                        "tax_code": "",
                        "payment_method": {},
                        "currency": this.exchangeRate,
                        "exchange_rate_uuid": "",
                        "exchange_rate": this.rate,
                        "exchanged_amount": ((parseFloat(amt) * -1) * parseFloat(this.rate)),
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
            this.disburs.exchangeAmount = parseFloat(amt) * parseFloat(this.rate)
            journalHandler.save(new JournalModel(data))
                .then(function (response) {
                    self.showLoading = false
                    self.disburs.journalId = response.data.uuid
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
    },
    computed: {},
    mounted: async function () {
        // this.customerRequestData(0, this.customerfilter, this.cusBaseUrl)
        // this.memberRequestData(0, this.memberfilter, this.memBaseUrl)
        await this.loadDecimal()
        await this.loadSegment()
        await this.getJournalNumber()
    },
    created: async function () {
        this.addEmpty()
        await this.loadPrefix()
        await this.loadAccount()
        await this.loadAccountName()
        await this.loadLessMember()
        await this.loadLessCustomer()
    },
};
</script>
<style scoped>

.v-input__control {
    height: 25px !important;
}

.v-input__slot {
    height: 0px !important;
}

</style>