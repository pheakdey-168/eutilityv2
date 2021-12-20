<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('list_of_loans_due') }}</h2>
                        <!-- <p class="mb-0">{{ $t('បញ្ជីប្រាក់កម្ចី') }}</p> -->
                    </v-col>
                </v-row>
                <v-row class="mb-2">
                    <v-col sm="2" cols="12" class="pt-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)"  @click="search">
                            <span class="">{{$t('run_report')}}</span>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource
                                ref="gridCollectionDS"
                                :type="'JSON'"
                                :groupable="true"
                                :aggregate="aggregateDefinition"
                                :server-paging="false"/>
                            <kendo-grid
                                id="gridCollection"
                                class="grid-function"
                                :data-source-ref="'gridCollectionDS'"
                                :editable="false"
                                :groupable="true"
                                :column-menu="true"
                                :noRecords="true"

                                :sortable="true"
                                :excel-file-name="$t('list_of_loans_due')+'.xlsx'"
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
                                    :hidden="true"
                                    :width="150"
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
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'gender'"
                                    :title="$t('gender')"
                                    :width="90"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'mainBlock'"
                                    :title="$t('main_block')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'subBlock'"
                                    :title="$t('sub_block')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'zone'"
                                    :title="$t('zone')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'group'"
                                    :title="$t('group')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'loan_number'"
                                    :title="$t('loan_number')"
                                    :width="150"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'payment_date'"
                                    :title="$t('payment_date')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'loan_term'"
                                    :title="$t('loan_term_in_month')"
                                    :width="150"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'disburse_amount'"
                                    :title="$t('disbursed_amt')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(disburse_amount, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'balance'"
                                    :title="$t('balance_credit')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(balance, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'principal_due'"
                                    :title="$t('principal_due')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(principal_due, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'interest'"
                                    :title="$t('interest')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(interest, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'total'"
                                    :title="$t('total_due')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(total, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'locale'"
                                    :title="$t('currency')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
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
// import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui"

const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
import { print } from '@/form/loan/LoansDueNextMonth.js'
import JSZip from "jszip";
import {i18n} from "../../../i18n";
window.JSZip = JSZip;

const $ = kendo.jQuery
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        group: {field: 'type'},
        numberFormat: 'c0',
        loanList: [],
        decimals: [],
        exfield: {
            'No': 'no',
            'cid': 'cid',
            'name': 'name',
            'dob': 'dob',
            'gender': 'gender',
            'mainBlock': 'mainBlock',
            'subBlock': 'subBlock',
            'zone': 'zone',
            'group': 'group',
            'loan_number': 'loan_number',
            'payment_date': 'payment_date',
            'loan_term': 'loan_term',
            'disburse_amount': 'disburse_amount',
            'balance': 'balance',
            'principal_due': 'principal_due',
            'interest': 'interest',
            'total': 'total',
        },
        
        aggregateDefinition : [
            { field: "total", aggregate: "sum" },
        ],
        LoansDueNextMonth: [],
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),

    },
    methods: {
        search() {
            this.showLoading = true
            if (this.asOf) {
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        // start date
                        let dt = new Date();
                        dt.setMonth( dt.getMonth() + 1 );
                        let sdate = dt.setDate(1)
                        sdate = new Date(sdate).toISOString().substr(0, 10)
                        // last date
                        let month = dt.getMonth()
                        let year = dt.getFullYear()
                        let lastDate = new Date(year, month + 1, 0)
                        // window.console.log(month, year, lastDate)
                        let edate = kendo.toString( new Date(lastDate), 'yyyy-MM-dd')
                        let data = {
                            startDate: sdate,
                            endDate: edate
                        }
                        // window.console.log(data, 'search')
                        memberHandler.getLoanNextReport(data).then(res => {
                            this.showLoading = false
                            this.loanList = res.data.data
                            // window.console.log(this.loanList)
                            if (this.loanList.length > 0) {
                                let ds = this.$refs.gridCollectionDS.kendoWidget(),
                                    self = this
                                ds.data([])
                                $.each(this.loanList, function (i, v) {
                                    let locale = v.loan.loanProduct.currency.code
                                    let dec = self.decimals.filter((obj) => {
                                        return obj.currency.code == locale
                                    })
                                    let fo = 0
                                    if (dec.length > 0) {
                                        fo = dec[0].decimal
                                    }
                                    let ccid = v.member.numberName.split(' - ')
                                    let g = self.groups.filter((obj) => {return obj.id == v.member.groupId})
                                    // window.console.log(g, 'compare')
                                    let mainBlock = '', subBlock = '', zone = '', group = ''
                                    if(g.length > 0){
                                        mainBlock = g[0].hasOwnProperty('mainBlock') ? g[0].mainBlock.name : ''
                                        subBlock = g[0].hasOwnProperty('subBlock') ? g[0].subBlock.name : ''
                                        zone = g[0].hasOwnProperty('zone') ? g[0].zone.name : ''
                                        group = g[0].name
                                    }
                                    ds.add({
                                        cid: ccid[0],
                                        loan_number: v.loan.number,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: i18n.t(v.member.gender),
                                        mainBlock: mainBlock,
                                        subBlock: subBlock,
                                        zone: zone,
                                        group: group,
                                        open_date: v.issuedDate,
                                        loan_term: v.loan.period,
                                        loan_product: v.loan.loanProduct.name,
                                        balance: parseFloat(v.data.principal_r),
                                        principal_due: parseFloat(v.data.principal),
                                        interest: parseFloat(v.data.interest),
                                        disburse_amount: parseFloat(v.loan.amount),
                                        total: parseFloat(v.data.total),
                                        payment_date: v.receiptDate,
                                        locale: locale,
                                        numberFormat: 'n' + fo
                                    })
                                    self.LoansDueNextMonth.push({
                                        no: i + 1,
                                        cid: ccid[0],
                                        loan_number: v.loan.number,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: i18n.t(v.member.gender),
                                        mainBlock: mainBlock,
                                        subBlock: subBlock,
                                        zone: zone,
                                        group: group,
                                        open_date: v.issuedDate,
                                        loan_term: v.loan.period,
                                        loan_product: v.loan.loanProduct.name,
                                        balance: parseFloat(v.data.principal_r),
                                        principal_due: parseFloat(v.data.principal),
                                        interest: parseFloat(v.data.interest),
                                        disburse_amount: parseFloat(v.loan.amount),
                                        total: parseFloat(v.data.total),
                                        payment_date: v.receiptDate,
                                        locale: locale,
                                        numberFormat: 'n' + fo
                                    })
                                })
                                // window.console.log(ds, 'report data')
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
        print_(){
            print(this.LoansDueNextMonth)
        },
        async loadMemberGroup() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    loanHandler.groupMemberGet().then(res => {
                        this.showLoading = false
                        this.groups = res.data.data
                    })
                }, 300);
            })
        },
    },
    computed: {},
    mounted: async function () {
        await this.loadDecimal()
        await this.loadMemberGroup()
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
