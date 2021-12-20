<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('loan_balance') }}</h2>
            <v-row class="report_block">
                <v-col sm="12" cols="12" class="py-0">
                    <v-row>
                        <v-col sm="4" cols="12">
                            <v-card @click="filterActiveLoan" outlined dense class="pa-3 no_border rounded-4 white--text" color="secondary"
                                    height="60px">
                                <h3 class="text-left flex-1 font_12 text-uppercase">{{ $t('no_of_loans') }}</h3>
                                <h3 class="font_20 mt-0 flex-1 text-right white--text">{{ numberFormat(activeLoan) }}</h3>
                            </v-card>
                        </v-col>
                        <v-col sm="4" cols="12">
                            <v-card outlined dense color="third"
                                    class="pa-3 rounded-4 white--text no_border "
                                    height="60px">
                                <h3 class="text-left flex-1 font_12 text-uppercase">
                                    {{ $t('average_interest_rate') }}</h3>
                                <h3 class="font_20 mt-0 flex-1 text-right white--text">
                                    {{ numberFormat(avgInterest) }}</h3>
                            </v-card>
                        </v-col>
                        <v-col sm="4" cols="12">
                            <v-card outlined dense color="third"
                                    class="pa-3 rounded-4 white--text no_border"
                                    height="60px">
                                <h3 class="text-left flex-1 font_12 text-uppercase">
                                    {{ $t('outstanding_balance') }}</h3>
                                <h3 class="font_20 mt-0 flex-1 text-right white--text">{{
                                        numberFormat(outstandingBalance)
                                    }}</h3>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource
                        ref="gridCollectionDS"
                        :transport-read-url="reportListURL"
                        :groupable="true"
                        :aggregate="aggregateDefinition"
                        :schema-data="'data'"
                        :schema-total="'total'"
                        :page-size='100'
                        :server-paging="true"/>
                    <kendo-grid
                        id="gridCollection" class="grid-function"
                        :data-source-ref="'gridCollectionDS'"
                        :editable="false"
                        :groupable="true"
                        :column-menu="true"
                        :noRecords="true"
                        :pageable="true"
                        :sortable="true"
                        :excel-file-name="$t('loan_list')+'.xlsx'"
                        :excel-filterable="true"
                        :excel-all-pages="true"
                        :toolbar="['excel']"
                        :scrollable-virtual="false">
                        <kendo-grid-column
                            width="5%"
                            :title="$t('no.')"
                            :template="rowNumberTmpl"
                            :column-menu="false"
                            :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products px-1' }"
                            :attributes="{ style: 'text-align: center', class: 'px-1'}"
                        />
                        <kendo-grid-column
                            :attributes="{style: 'text-align: left; '}"
                            :title="$t('number')"
                            :field="'number'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        <kendo-grid-column
                            :field="'name'"
                            :title="$t('name')"
                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                        <kendo-grid-column
                            :field="'bankName'"
                            :title="$t('financial_institution')"
                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                        <kendo-grid-column
                            :field="'approvedAmount'"
                            :template="approveAmountTmpl"
                            :title="$t('approved_amount')"
                            :attributes="{style: 'text-align: right; '}"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        <kendo-grid-column
                            :field="'interestRate'"
                            :template="interestRateTmpl"
                            :title="$t('interest_rate')"
                            :attributes="{style: 'text-align: right; '}"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        <kendo-grid-column
                            :field="'outstandingAmount'"
                            :template="outstandingAmountTmpl"
                            :title="$t('outstanding_amount')"
                            :attributes="{style: 'text-align: right; '}"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        <kendo-grid-column
                            :field="'interestAmount'"
                            :title="$t('interest_amount')"
                            :template="interestAmountTmpl"
                            :attributes="{style: 'text-align: right; '}"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        <kendo-grid-column
                            :field="'currency'"
                            :title="$t('currency')"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                        <kendo-grid-column
                            :field="'status'"
                            :title="$t('status')"
                            :template="statusTmpl"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    </kendo-grid>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        type="loading"
                        :myLoading="true"/>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import {i18n} from '@/i18n';
import kendo from '@progress/kendo-ui'
const saleFormContentHandler = require("@/scripts/saleFormContentHandler");
const apiUrl = require('../../../apiUrl.js')
const {LoanStatus} = require("@/scripts/default_setup/Collections");
const loanHandler = require("@/scripts/financing/handler/loanHandler")

export default {
    data: () => ({
        /* Obj */
        reportListURL: apiUrl.financing.loanOutstandingReport,
        loanInfo: {},
        loans: [],
        loansBK: [],
        avgInterest: 0,
        activeLoan: 0,
        outstandingBalance: 0,
        saleFormContent: {}
    }),
    methods: {
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
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridCollectionDS.kendoWidget()
            let num = (ds.total() - parseInt(dataItem.sortIndex))
            return num + 1
        },
        approveAmountTmpl(dataItem) {
            return this.numberFormat(dataItem.approvedAmount)
        },
        interestRateTmpl(dataItem) {
            return this.numberFormat(dataItem.interestRate) + '%'
        },
        outstandingAmountTmpl(dataItem) {
            return this.numberFormat(dataItem.outstandingAmount)
        },
        interestAmountTmpl(dataItem) {
            return this.numberFormat(dataItem.interestAmount)
        },
        statusTmpl(dataItem) {
            return i18n.t(dataItem.status)
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.saleFormContent.decimal}`);
            // return value
        },
        dateTmpl(dataItem) {
            return kendo.toString(new Date(dataItem.date), "dd-MM-yyyy");
        },
        /* Filter Active Loan */
        filterActiveLoan() {
            this.loans = this.loansBK.filter(
                value => value.status === LoanStatus.ACTIVE
            )
        },
        filterOutstandingBalance() {
            this.loans = this.loansBK.filter(
                value => value.outstanding_amount > 0
            )
        },
        filterAvailableCredit() {
            this.loans = this.loansBK.filter(
                value => value.available_credit > 0
            )
        },
        refreshFilter() {
            this.loans = this.loansBK;
        },
        refreshGrid(){
            this.loadLoanBalance()
            setTimeout(() => {
                let a = kendo.jQuery('#gridCollection').data("kendoGrid");
                if(a != undefined) {
                    a.dataSource.read();
                }
            }, 1000);
        },
        loadLoanBalance(){
            loanHandler.summaryLoanBalance()
            .then(res => {
                if (res.data) {
                    if(res.data.data.length > 0) {
                        let d = res.data.data[0]
                        this.activeLoan = d.approveLoan
                        this.avgInterest = d.interestRate / d.approveLoan
                        this.outstandingBalance = d.outstandingBalance
                    }
                }
            });
        }
    },
    mounted() {
        this.loadSaleFormContent()
        this.refreshGrid()
    },
    watch: {
        '$route': 'refreshGrid'
    },
};
</script>

<style scoped>
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {
}
</style>
