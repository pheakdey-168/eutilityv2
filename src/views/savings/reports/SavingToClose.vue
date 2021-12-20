<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('saving_to_be_close') }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="4" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>
                    </v-col>
                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)"  @click="search">
                            <span class="">{{$t('run_report')}}</span>
                        </v-btn>
                    </v-col>
                    
                    <!-- <v-col sm="2" cols="12" class="py-0 mt-1">
                        <v-btn icon color="black" class="bg-none ml-2"
                        @click="print_">
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>
                    </v-col> -->
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource
                                ref="gridCollectionDS"
                                :type="'JSON'"
                                :server-paging="false"/>
                            <kendo-grid
                                id="gridCollection" class="grid-function"
                                :data-source-ref="'gridCollectionDS'"
                                :editable="false"
                                :groupable="true"
                                :column-menu="true"
                                :noRecords="true"
                                
                                :sortable="true"
                                :excel-file-name="$t('saving_to_be_close')+'.xlsx'"
                                :excel-filterable="true"
                                :excel-all-pages="true"
                                :toolbar="['excel']"

                                :scrollable-virtual="true">
                                <kendo-grid-column
                                    :title="$t('no.')"
                                    :width="40"
                                    :template="rowNumberTmpl"
                                    :column-menu="false"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products px-1' }"
                                    :attributes="{ style: 'text-align: products'}"
                                />
                                <kendo-grid-column
                                    :field="'cid'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :title="$t('cid')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'number'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :title="$t('number')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'dob'"
                                    :title="$t('dob')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'gender'"
                                    :title="$t('gender')"
                                    :width="90"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'phoneNumber'"
                                    :title="$t('phone')"
                                    :width="100"
                                    :hidden="false"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'group'"
                                    :title="$t('group')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'issued_date'"
                                    :title="$t('issue_date')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                
                                <kendo-grid-column
                                    :field="'closing_day'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('closing_day')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'deposit'"
                                    :title="$t('total_deposit')"
                                    :width="150"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(deposit, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'text-align: right, background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'interest'"
                                    :title="$t('total_interest')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(interest, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'total'"
                                    :title="$t('total')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(total, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'action'"
                                    :title="$t('action')"
                                    :attributes="{class: 'btn-int'}"
                                    :command="{ iconClass: 'k-icon', text: 'add_interest', click: addInterest, class: 'btn-plus' }"
                                    :width="190"
                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                />
                            </kendo-grid>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"
                                :alertMessage="loadingAlert"
                                :color="loadingColorAlert"
                                :alertText="loadingTextAlert"/>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

    </v-row>

</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui"
import Helper from "@/helper.js"
const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
import SavingCloseMonthModel from '@/scripts/model/credit/SavingCloseMonth'
const $ = kendo.jQuery

const store = require("@/institute.js")
const {cookies} = store.default.state
import {JournalModel, UserModel} from "@/scripts/model/AppModels"
const { journalHandler } = require("@/scripts/AppHandlers")
import { print } from '@/form/saving/SavingToClose.js'
import JSZip from "jszip";
window.JSZip = JSZip;
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        group: {field: 'type'},
        numberFormat: 'c0',
        l: [],
        decimals: [],
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
        exfield: {
            'No': 'no',
            'cid': 'cid',
            'number': 'number',
            'name': 'name',
            'dob': 'dob',
            'gender': 'gender',
            'phoneNumber': 'phoneNumber',
            'group': 'group',
            'issued date': 'issued_date',
            'closing day': 'closing_day',
            'deposit': 'deposit',
            'interest': 'interest',
            'total': 'total'
        },
        SavingToClose: [],
    }),
    components: {
        'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        search() {
            this.showLoading = true
            if(this.asOf){
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            asOf: this.asOf
                        }
                        window.console.log(data, 'search')
                        memberHandler.getSavingToCloseReport(data).then(res => {
                            this.showLoading = false
                            this.l = res.data.data
                            window.console.log(this.l)
                            if(this.l.length > 0){
                                let ds = this.$refs.gridCollectionDS.kendoWidget(),
                                    self = this
                                ds.data([])
                                $.each(this.l, function (i,v){
                                    let locale = v.product.currency.code
                                    let dec = self.decimals.filter((obj) => {return obj.currency.code == locale})
                                    let fo = 0
                                    if(dec.length > 0){
                                        fo = dec[0].decimal
                                    }
                                    ds.add({
                                        cid: v.member.abbr + v.member.number,
                                        number: v.number,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: v.member.gender.name,
                                        phoneNumber: v.member.phoneNumber ? v.member.phoneNumber : '',
                                        group: v.member.hasOwnProperty('group') ? v.member.group.name : '',
                                        issued_date: v.issuedDate,
                                        closing_day: v.closing_day,
                                        deposit: parseFloat(v.deposit),
                                        interest: parseFloat(v.interest),
                                        total: parseFloat(v.deposit) + parseFloat(v.interest),
                                        locale: locale,
                                        numberFormat: 'n' + fo,
                                        savingAccount: v.savingAccount,
                                        product: v.product,
                                        balances: v.balances,
                                        member: v.member
                                    })
                                    self.SavingToClose.push({
                                        no: i + 1,
                                        cid: v.member.abbr + v.member.number,
                                        number: v.number,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: v.member.gender.name,
                                        phoneNumber: v.member.phoneNumber ? v.member.phoneNumber : '',
                                        group: v.member.hasOwnProperty('group') ? v.member.group.name : '',
                                        issued_date: v.issuedDate,
                                        closing_day: v.closing_day,
                                        deposit: parseFloat(v.deposit),
                                        interest: parseFloat(v.interest),
                                        total: parseFloat(v.deposit) + parseFloat(v.interest),
                                        locale: locale,
                                        numberFormat: 'n' + fo,
                                        savingAccount: v.savingAccount,
                                        product: v.product,
                                        balances: v.balances,
                                        member: v.member
                                    })
                                })
                                window.console.log(ds.data(), 'report data')
                            }
                        })
                    }, 300);
                })
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
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridCollectionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        exportEX(){
            let ds = this.$refs.gridCollectionDS.kendoWidget()
            if(ds.data().length() > 0){
                window.console.log(ds.data())
            }
        },
        async addInterest(e){
            e.preventDefault();
            const grid = $("#gridCollection").data("kendoGrid"),
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            let balance = dataItem.balances
            await this.getJournalNumber()
            await this.loadTransactionRate(dataItem.product.currency.code)
            let p = dataItem.product
            let m = dataItem.member
            let s = dataItem.savingAccount
            let self = this
            const seg = this.segments[0]
            this.journalLine.push({
                "uuid": "",
                "account": p.interestExpenseAccount,
                "description": '',
                "primary_contact": m,
                "third_contacts": [],
                "ref_number": null,
                "amount": dataItem.interest,
                "discount": {},
                "mark_up": 0,
                "billable": 0,
                "tax_code": "",
                "payment_method": {},
                "currency": this.exchangeRate,
                "exchange_rate_uuid": "",
                "exchange_rate": this.rate,
                "exchanged_amount": parseFloat(dataItem.interest) * parseFloat(this.rate),
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
            this.journalLine.push({
                "uuid": "",
                "account": p.interestPayableAccount,
                "description": '',
                "primary_contact": m,
                "third_contacts": [],
                "ref_number": '',
                "amount": (parseFloat(dataItem.interest) * -1),
                "discount": {},
                "mark_up": 0,
                "billable": 0,
                "tax_code": "",
                "payment_method": {},
                "currency": this.exchangeRate,
                "exchange_rate_uuid": "",
                "exchange_rate": this.rate,
                "exchanged_amount": ((parseFloat(dataItem.interest) * -1)*parseFloat(this.rate)),
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
            window.console.log(this.journalLine, 'journal line')
            let data = {
                "number": this.journalNumber ? this.journalNumber : '',
                "description": "Saving Interest",
                "journal_type": "general_journal",
                "journal_date": new Date(),
                "currency_code": p.currency.code,
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
                    balance[0].txnId = response ? response.data.uuid : ''
                    balance[0].status = 1
                    let interests = []
                    interests.push({
                        amount: dataItem.interest,
                        withdrawAmount: 0,
                        member: m,
                        savingAccount: s
                    })
                    let d = {
                        issuedDate: new Date().toISOString().substr(0, 10),
                        balances: balance,
                        user: self.loggedUser,
                        journal: JSON.stringify(data),
                        journalNumber: self.journalNumber,
                        interests: interests
                    }
                    window.console.log(d, 'saving close month')
                    memberHandler.createSavingCloseMonth(new SavingCloseMonthModel(d)).then(response => {
                        if (response.data.statusCode === 201) {
                            self.showLoading = false
                            self.$snotify.success('Successfully')
                            self.search()
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
        async getJournalNumber() {
            let num = await Helper.generateAccoutingNumber(this.journalTxnType, new Date().toISOString().substr(0, 10))
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
        },
        async loadTransactionRate(code) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date().toISOString().substr(0, 10)
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
        print_(){
            print(this.SavingToClose)
        }
    },
    computed: {},
    mounted: async function () {
        await this.loadDecimal()
        await this.loadSegment()
    },
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

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
</style>
