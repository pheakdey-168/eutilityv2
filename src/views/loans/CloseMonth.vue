<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12" class="lightGray px-12">
                    <v-card color="white" class="pa-3 no_border" elevation="0">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0" style="padding: 0 10px;">
                                <h2>{{ $t('interest_calculation') }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;position: absolute;z-index: 100;right: 5px;top: 5px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-col>
                            <v-col sm="2" cols="12" class="py-0">
                                <label class="label">{{ $t('month_of') }}</label>
                                <div style="margin-top:4px;">
                                    <app-monthof-picker
                                        :initMonthOf="monthOf"
                                        @emitMonthOf="monthOf = $event"
                                    />
                                </div>
                            </v-col>
                            <v-col sm="3" cols="12" class="py-0">
                                <label class="label">{{ $t('currency') }}</label>
                                <v-select
                                    class="mt-1"
                                    outlined
                                    return-object
                                    id=""
                                    :items="currencyList"
                                    item-text="name"
                                    item-value="id"
                                    @change="loadTransactionRate"
                                    v-model="currency"
                                />
                            </v-col>
                            <v-col sm="1" cols="12" class="pb-0">
                                <v-btn color="primary" class="text-capitalize white--text mt-3" @click="search">
                                    <v-icon size="18">b-search</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="4" cols="12" class="pt-0">
                                <v-card outlined dense
                                        class="pa-3 no_border white--text d-flex justify-space-between align-center"
                                        color="secondary" height="80px">
                                    <h3 class="text-left text-uppercase font_13 flex-1">{{
                                            $t('number_of_loan_accounts')
                                        }}</h3>
                                    <h3 class="text-right font_20 flex-1">{{ totalSavingAcc }}</h3>
                                </v-card>
                            </v-col>
                            <v-col sm="4" cols="12" class="pt-0">
                                <v-card outlined dense
                                        class="pa-3 no_border white--text d-flex justify-space-between align-center"
                                        color="third" height="80px">
                                    <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('loan_amount') }}</h3>
                                    <h3 class="text-right font_20 flex-1">{{ totalBalance }}</h3>
                                </v-card>
                            </v-col>
                            <v-col sm="4" cols="12" class="pt-0">
                                <v-card outlined dense
                                        class="pa-3 no_border white--text d-flex justify-space-between align-center"
                                        color="third" height="80px">
                                    <h3 class="text-left text-uppercase font_13 flex-1">{{ $t('total_interest') }}</h3>
                                    <h3 class="text-right font_20 flex-1">{{ totalInterest }}</h3>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <template>
                                    <LoadingMe
                                        :isLoading="showLoading"
                                        :fullPage="false"
                                        :myLoading="true"/>
                                    <kendo-datasource ref="dataSource" :data="savingList"/>
                                    <kendo-grid
                                        id="gridReceivable" class="grid-function"
                                        :data-source-ref="'dataSource'"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :editable="false"
                                        :groupable="true"
                                        :sortable="true"
                                        :scrollable-virtual="true">
                                        <kendo-grid-column
                                            :title="$t('no.')"
                                            :width="55"
                                            :template="rowNumberTmpl"
                                            :column-menu="false"
                                            :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products' }"
                                            :attributes="{ style: 'text-align: products'}"
                                        />
                                        <kendo-grid-column
                                            :field="'number'"
                                            :title="$t('loan_number')"
                                            :template="'<span>#= number #</span>'"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                   
                                        <kendo-grid-column
                                            :field="'name'"
                                            :title="$t('name')"
                                            :template="'<span>#= name #</span>'"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                        <kendo-grid-column
                                            :field="'ending'"
                                            :title="$t('ending_balance')"
                                            :template="'<span>#= group #</span>'"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                        <kendo-grid-column
                                            :field="'interest'"
                                            :title="$t('interest')"
                                            :template="'<span>#= kendo.toString(interest, numberFormat) #</span>'"
                                            :attributes="{style: 'text-align: right'}"
                                            :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
             
                                    </kendo-grid>
                                </template>
                                <div class="function_footer">
                                    <v-alert type="warning"
                                             v-model="alert"
                                             dismissible>
                                        <span v-html="errorMessage"/>
                                    </v-alert>
                                    <v-btn outlined color="#494846" class="float-left text-capitalize"
                                           @click="cancel">{{ $t('cancel') }}
                                    </v-btn>
                                    <!--                            <v-btn color="secondary" class="float-right white&#45;&#45;text text-capitalize"-->
                                    <!--                                   @click="saveClose">-->
                                    <!--                                {{ $t('save_close') }}-->
                                    <!--                            </v-btn>-->
                                    <v-btn color="primary"
                                           class="float-right  white--text text-capitalize mr-3 "
                                           @click="save">
                                        {{ $t('save') }}
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import Helper from "@/helper.js"
import kendo from "@progress/kendo-ui"
import SavingCloseMonthModel from '@/scripts/model/credit/SavingCloseMonth'

const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const currencyType = {
    FUNCTIONAL_CURRENCY: 'fun-c',
    TRANSACTION_CURRENCY: 'txn-c',
    REPORTING_CURRENCY: 'rpt-c',
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}
const $ = kendo.jQuery

const store = require("@/institute.js")
const {cookies} = store.default.state
import {JournalModel, UserModel} from "@/scripts/model/AppModels"
const { journalHandler } = require("@/scripts/AppHandlers");
import {dataStore} from '@/observable/store'

export default {
    data: () => ({
        //
        isHideBar: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        savingAccountList: [],
        savingAccount: {},
        savingList: [],
        dataItemKey: 'id',
        filter: '',
        showLoading: false,
        errorMessage: [],
        alert: false,
        //data
        monthOf: new Date().toISOString().substr(0, 10),
        savingProducts: [],
        savingProduct: {},
        //select member
        selectMember: 'isMember',
        isMember: true,
        isCustom: false,
        //
        totalCustomer: 0,
        percentOfSale: 0,
        balance: 0,
        decimals: [],
        totalBalance: 0,
        totalInterest: 0,
        totalSavingAcc: 0,
        numberFormat: '',
        locale: '',
        currency: {},
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: 'journal',
        loggedUser: new UserModel(cookies.user),
        segments: [],
        journalLine: [],
        rate: 1,
        exchangeRate: {},
        currencyList: [],
        balances: [],
        edate: '',
        interests: [],
        pin: dataStore.pin,
        groups: [],
        segment: {},
        lastNumber: 1,
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-monthof-picker": () => import('@/components/kendo_templates/MonthOfPicker'),
    },
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
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
        async loadCurrencyData() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    currencyHandler.list(currencyType.FUNCTIONAL_CURRENCY).then(response => {
                        if (response.data.statusCode === 200) {
                            this.currencyList = response.data.data
                            if(this.currencyList.length > 0){
                                this.currency = this.currencyList[0]
                                this.loadTransactionRate()
                            }
                            this.showLoading = false
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        //function
        async search() {
            let dt = new Date(this.monthOf)
            let month = dt.getMonth()
            let year = dt.getFullYear()
            let lastDate = new Date(year, month + 1, 0)
            window.console.log(month, year, lastDate)
            let edate = kendo.toString(new Date(lastDate), 'yyyy-MM-dd')
            let data = {
                monthOf: edate
            }
            this.edate = edate
            this.showLoading = true
            this.savingList = []
            this.totalSavingAcc = 0
            this.totalBalance = 0
            this.totalInterest = 0
            memberHandler.savingCloseMonth(data).then(res => {
                this.showLoading = false
                let savingList = res.data.data
                if(savingList.length > 0) {
                    let total = 0, self = this
                    this.journalLine = []
                    this.savingList = []
                    this.interests = []
                    $.each(savingList, function (i, v) {
                        let int = 0
                        let s = v.savingAccount
                        let p = s.savingProduct
                        if(p.currency.code === self.currency.code) {
                            $.each(v.balance, function (j, k) {
                                total += k.base_amount
                                self.balances.push({
                                    pk: k.pk,
                                    sk: k.sk,
                                    issuedDate: k.issuedDate,
                                    saving_account_id: k.saving_account_id,
                                    balance: k.balance,
                                    day: k.day,
                                    duration: k.duration,
                                    txnId: k.txnId,
                                    ordered: k.ordered,
                                    status: 1,
                                    closingDay: k.closingDay ? k.closingDay : '',
                                    base_amount: k.base_amount
                                })
                            })
                            if (total > 0) {
                                //add op balance
                                var date = new Date(self.edate)
                                date.setDate(date.getDate() + 1)
                                self.balances.push({
                                    pk: '',
                                    sk: '',
                                    issuedDate: kendo.toString(new Date(date), 'yyyy-MM-dd'),
                                    saving_account_id: v.balance[0].saving_account_id,
                                    balance: parseFloat(v.balance[0].balance),
                                    day: 0,
                                    duration: 0,
                                    txnId: '',
                                    ordered: parseInt(v.balance[0].ordered) + 1,
                                    status: 0,
                                    closingDay: '',
                                    base_amount: 0
                                })
                                let locale = s.savingProduct.currency.code
                                self.locale = locale
                                let dec = self.decimals.filter((obj) => {
                                    return obj.currency.code == locale
                                })
                                let fo = 0
                                if (dec.length > 0) {
                                    fo = dec[0].decimal
                                }
                                total = total / new Date(edate).getDate()
                                total = parseFloat(total.toFixed(fo))
                                let pb = parseFloat(s.interestRate.interestRate) * (new Date(edate).getDate() / parseFloat(s.daysInYear.id))
                                pb = parseFloat(pb.toFixed(3))
                                int = (total * pb) / 100
                                int = parseFloat(int.toFixed(fo))
                                let bal = parseFloat(v.balance[0].balance) + int
                                bal = parseFloat(bal.toFixed(fo))
                                let m = s.member ? s.member : s.customer
                                // cid
                                let ccid = s.member.numberName.split(' - ')
                                let cid = ccid[0]
                                // group name
                                let gname = ''
                                let gn = self.groups.filter((obj) => {return obj.id == m.groupId})
                                if(gn.length > 0){
                                    gname = gn[0].name
                                }
                                self.savingList.push({
                                    number: s.number,
                                    cid: cid,
                                    name: m.name,
                                    group: gname,
                                    interest: int,
                                    referenceNumber: 'SAVI-' + self.zeroPad(self.lastNumber + i, 6),
                                    lastNumber: self.lastNumber + i,
                                    balance: parseFloat(v.balance[0].balance),
                                    total: bal,
                                    savingAccount: v.savingAccount,
                                    member: m,
                                    locale: locale,
                                    numberFormat: 'n' + fo,
                                    baseAmount: total
                                })
                                self.numberFormat = 'n' + fo
                                if (int > 0) {
                                    self.interests.push({
                                        amount: int,
                                        withdrawAmount: 0,
                                        member: m,
                                        number: 'SAVI-' + self.zeroPad(self.lastNumber + i, 6),
                                        lastNumber: self.lastNumber + i,
                                        savingAccount: v.savingAccount
                                    })
                                    self.journalLine.push({
                                        "uuid": "",
                                        "account": p.interestExpenseAccount,
                                        "description": '',
                                        "primary_contact": m,
                                        "third_contacts": [],
                                        "ref_number": null,
                                        "amount": int,
                                        "discount": {},
                                        "mark_up": 0,
                                        "billable": 0,
                                        "tax_code": "",
                                        "payment_method": {},
                                        "currency": self.exchangeRate,
                                        "exchange_rate_uuid": "",
                                        "exchange_rate": self.rate,
                                        "exchanged_amount": parseFloat(int) * parseFloat(self.rate),
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
                                    self.journalLine.push({
                                        "uuid": "",
                                        "account": p.interestPayableAccount,
                                        "description": '',
                                        "primary_contact": m,
                                        "third_contacts": [],
                                        "ref_number": '',
                                        "amount": (parseFloat(int) * -1),
                                        "discount": {},
                                        "mark_up": 0,
                                        "billable": 0,
                                        "tax_code": "",
                                        "payment_method": {},
                                        "currency": self.exchangeRate,
                                        "exchange_rate_uuid": "",
                                        "exchange_rate": self.rate,
                                        "exchanged_amount": ((parseFloat(int) * -1)*parseFloat(self.rate)),
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
                            }
                        }
                    })
                    this.changes()
                    window.console.log(this.journalLine)
                }
            })
        },
        changes(){
            this.totalSavingAcc = 0
            this.totalBalance = 0
            this.totalInterest = 0
            if(this.savingList.length > 0) {
                this.totalSavingAcc = this.savingList.length
                let tbal = 0, tint = 0
                $.each(this.savingList, function (i, v) {
                    tbal += v.balance
                    tint += v.interest
                })
                this.totalBalance = kendo.toString(tbal, this.numberFormat)
                this.totalInterest = kendo.toString(tint, this.numberFormat)
            }
        },
        cancel() {
            window.history.go(-1)
        },
        async save() {
            let self = this
            const seg = this.segment
            this.balances.sort(function (a, b) {
                return new Date(b.ordered) - new Date(a.ordered)
            })
            let data = {
                "number": this.journalNumber ? this.journalNumber : '',
                "description": "Saving Interest",
                "journal_type": "general_journal",
                "journal_date": new Date(),
                "currency_code": this.currency.code,
                "buinsess_unit_uuid": "",
                "location_uuid": "",
                "project_uuid": "",
                "segment_uuid": seg.id,
                "journal_entries": this.journalLine,
                "transaction_type": "journal",
                "is_draft": 0,
                "is_reversed": 0,
                "prefix_format": this.journalPrefix,
                "created_by": this.loggedUser
            }
            this.showLoading = true
            journalHandler.save(new JournalModel(data))
                .then(function (response) {
                    self.balances[0].txnId = response ? response.data.uuid : ''
                    let interests = []
                    if(self.interests.length > 0){
                        $.each(self.interests, function (i,v){
                            interests.push({
                                amount: v.amount,
                                withdrawAmount: v.withdrawAmount,
                                member: v.member,
                                savingAccount: v.savingAccount,
                                exchangeRate: self.exchangeRate,
                                lastNumber: v.lastNumber,
                                number: v.number,
                            })
                        })
                    }
                    let d = {
                        issuedDate: new Date().toISOString().substr(0, 10),
                        balances: self.balances,
                        user: self.loggedUser,
                        userPin: self.pin,
                        journal: JSON.stringify(data),
                        journalNumber: self.journalNumber,
                        interests: interests,
                        exchangeRate: self.exchangeRate,
                    }
                    window.console.log(d, 'saving close month')
                    memberHandler.createSavingCloseMonth(new SavingCloseMonthModel(d)).then(response => {
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
                        self.showLoading = false
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
        async getJournalNumber() {
            let num = await Helper.generateAccoutingNumber(this.journalTxnType, new Date().toISOString().substr(0, 10))
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
        },
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date().toISOString().substr(0, 10)
                    let code = this.currency.code
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
        async loadGroup() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.groupMemberGet().then(res => {
                        this.groups = res.data.data
                    })
                }, 300);
            })
        },
        async getLastNumber() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        pk: 'ac-savi-',
                        module: 'func'
                    }
                    memberHandler.getLastNumber(data).then(res => {
                        this.lastNumber = res.data.data.lastNumber
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        // window.console.log(e)
                    })
                }, 300);
            })
        },
    },
    computed: {},
    mounted: async function () {
        await this.getJournalNumber()
        await this.loadSegment()
        await this.loadDecimal()
        await this.loadCurrencyData()
        await this.loadGroup()
        await this.getLastNumber()
    }
};
</script>
<style scoped>
.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.v-input__control {
    height: 25px !important;
}

.v-input__slot {
    height: 0px !important;
}

table tr td {
    padding: 2px;
}
</style>