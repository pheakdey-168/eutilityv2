<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0" height="750"
                    style="overflow-y: scroll;overflow-x: hidden;">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1">{{ $t('credit_biz') }}</h2>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="3" cols="12" class="py-0">
                        <v-text-field
                            class="mt-1"
                            v-model="yearQuery"
                            type="number"
                            outlined
                            required
                        />
                    </v-col>

                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)" @click="search">
                            <span class="">{{ $t('run_report') }}</span>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"/>
                            <kendo-datasource ref="gridLoan" 
                                :data="reportDataA"
                                :group="groupDefinition"/>
                            <kendo-grid
                                id="gridLoan" class="grid-function"
                                :data-source-ref="'gridLoan'"
                                :column-menu="true"
                                :noRecords="true"
                                :editable="false"
                                :groupable="false"

                                :sortable="true"
                                :excel-file-name="$t('credit_biz')+'.xlsx'"
                                :excel-filterable="true"
                                :excel-all-pages="true"
                                :toolbar="['excel']"

                                :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'title'"
                                    :title="$t('title')"
                                    :hidden="true"
                                    :groupHeaderTemplate="'<span class=`text-bold text-black`>#=value#</span>'"
                                    :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"
                                />
                                <kendo-grid-column
                                    :field="'no'"
                                    :title="$t('no.')"
                                    :column-menu="false"
                                    :width="70"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products px-1' }"
                                    :attributes="{ style: 'text-align: products'}"
                                />
                                <kendo-grid-column
                                    :field="'description'"
                                    :title="$t('description')"
                                    :width="300"
                                    :template="'<span style=#= style#>#= description#</span>'"
                                    :headerAttributes="{
                                            style: 'background-color: #EDF1F5'
                                        }"/>
                                <kendo-grid-column
                                    :field="'year1'"
                                    :title="'year1'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{
                                            style: 'background-color: #EDF1F5'
                                        }"/>
                                <kendo-grid-column
                                    :field="'year2'"
                                    :title="'year2'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{
                                            style: 'background-color: #EDF1F5,text-align: right;'
                                        }"/>
                                <kendo-grid-column
                                    :field="'percentage'"
                                    :title="$t('change')"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

    </v-row>

</template>

<script>
import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery
const {i18n} = require("@/i18n");
import JSZip from "jszip";

window.JSZip = JSZip;
const memberHandler = require("@/scripts/memberHandler")

export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        yearQuery: new Date().getFullYear(),
        reportData: [],
        reportDataA: [],
        year1Load: false,
        year2Load: false,
        // Kendo
        groupDefinition : { field:"title"},
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`)
    },
    methods: {
        search() {
            this.showLoading = true
            if(this.yearQuery){
                this.yearChange()
                this.year1Load = false
                this.year2Load = false
                memberHandler.creditBizSummaryReport(this.yearQuery).then(res => {
                    let data = res.data.data
                    this.reportData[1].year1 = data.memberSavingBalance.toFixed(2)
                    this.reportData[2].year1 = data.customerSavingBalance.toFixed(2)
                    this.reportData[3].year1 = (data.customerSavingBalance + data.customerSavingBalance).toFixed(2)
                    this.reportData[5].year1 = data.generalDeposit.toFixed(2)
                    this.reportData[6].year1 = data.termDeposit.toFixed(2)
                    this.reportData[7].year1 = (data.termDeposit + data.generalDeposit).toFixed(2)
                    this.reportData[9].year1 = data.memberLoanBalance.toFixed(2)
                    this.reportData[10].year1 = data.customerLoanBalance.toFixed(2)
                    this.reportData[11].year1 = (data.customerLoanBalance + data.memberLoanBalance).toFixed(2)
                    this.year1Load = true
                    window.console.log(this.reportData, 'year1')
                    this.checkData()
                })
                memberHandler.creditBizSummaryReport(this.yearQuery -1).then(res => {
                    let data = res.data.data
                    this.reportData[1].year2 = data.memberSavingBalance.toFixed(2)
                    this.reportData[2].year2 = data.customerSavingBalance.toFixed(2)
                    this.reportData[3].year2 = (data.customerSavingBalance + data.customerSavingBalance).toFixed(2)
                    this.reportData[5].year2 = data.generalDeposit.toFixed(2)
                    this.reportData[6].year2 = data.termDeposit.toFixed(2)
                    this.reportData[7].year2 = (data.termDeposit + data.generalDeposit).toFixed(2)
                    this.reportData[9].year2 = data.memberLoanBalance.toFixed(2)
                    this.reportData[10].year2 = data.customerLoanBalance.toFixed(2)
                    this.reportData[11].year2 = (data.customerLoanBalance + data.memberLoanBalance).toFixed(2)
                    this.year2Load = true
                    this.checkData()
                })
            }
        },
        checkData(){
            this.reportDataA = []
            if(this.year1Load == true && this.year2Load == true){
                $.each(this.reportData, function (i,v){
                    if(v.main == 0 && (v.year1 - v.year2) != 0 ) {
                        v.percentage = (((parseFloat(v.year1) - parseFloat(v.year2)) * 100) / parseFloat(v.year1)).toFixed(2) + '%'
                    }
                })
                this.reportDataA = this.reportData
                this.showLoading = false
            }
        },
        yearChange(){
            $("#gridLoan th[data-title=year1]").contents().last().replaceWith(this.yearQuery);
            $("#gridLoan th[data-title=year2]").contents().last().replaceWith(this.yearQuery - 1);
        }
    },
    computed: {},
    mounted: async function () {
        this.reportData = []
        let data = []
        data.push({
            title:"1. "+ i18n.t('saving_balance'),
            style: "",
            no: "1",
            description: i18n.t('saving_balance'),
            isTitle: true,
            year1: '',
            year2: '',
            percentage: '',
            main: 1,
            sub: 0,
        })
        data.push({
            title:"1. "+ i18n.t('saving_balance'),
            style: "",
            no: "1.1",
            description: i18n.t('member_saving_balance'),
            isTitle: true,
            year1: 0,
            year2: 0,
            percentage: 0,
            main: 0,
            sub: 1,
        })
        data.push({
            title:"1. "+ i18n.t('saving_balance'),
            style: "",
            no: "1.2",
            description: i18n.t('non_member_saving_balance'),
            isTitle: true,
            year1: 0,
            year2: 0,
            percentage: 0,
            main: 0,
            sub: 1,
        })
        data.push({
            title:"1. "+ i18n.t('saving_balance'),
            style: "",
            no: "",
            description: i18n.t('total_saving_balance'),
            isTitle: true,
            year1: 0,
            year2: 0,
            percentage: 0,
            main: 0,
            sub: 1,
        })
        data.push({
            title:"2. "+ i18n.t('type_of_saving_balance'),
            style: "",
            no: "2",
            description: i18n.t('type_of_saving_balance'),
            isTitle: true,
            year1: '',
            year2: '',
            percentage: '',
            main: 2,
            sub: 0,
        })
        data.push({
            title:"2. "+ i18n.t('type_of_saving_balance'),
            style: "",
            no: "2.1",
            description: i18n.t('general_deposit'),
            isTitle: true,
            year1: 0,
            year2: 0,
            percentage: 0,
            main: 0,
            sub: 2
        })
        data.push({
            title:"2. "+ i18n.t('type_of_saving_balance'),
            style: "",
            no: "2.2",
            description: i18n.t('term_deposit'),
            isTitle: true,
            year1: 0,
            year2: 0,
            percentage: 0,
            main: 0,
            sub: 2
        })
        data.push({
            title:"2. "+ i18n.t('type_of_saving_balance'),
            style: "",
            no: "",
            description: i18n.t('total_saving_balance_by_types'),
            isTitle: true,
            year1: '',
            year2: '',
            percentage: '',
            main: 0,
            sub: 2,
        })
        // ds.add({
        //     accounts: i18n.t('3. cash_balance_in_bank'),
        // })
        // ds.add({
        //     accounts: i18n.t('3.1 bank_name'),
        // })
        // ds.add({
        //     accounts: i18n.t('total_cash_in_bank'),
        // })
        data.push({
            title:"3. "+ i18n.t('outstanding_loan_balances'),
            style: "",
            no: "3",
            description: i18n.t('outstanding_loan_balances'),
            isTitle: true,
            year1: '',
            year2: '',
            percentage: '',
            main: 3,
            sub: 0,
        })
        data.push({
            title:"3. "+ i18n.t('outstanding_loan_balances'),
            style: "",
            no: "3.1",
            description: i18n.t('member_loan_balance'),
            isTitle: true,
            year1: 0,
            year2: 0,
            percentage: 0,
            main: 0,
            sub: 3
        })
        data.push({
            title:"3. "+ i18n.t('outstanding_loan_balances'),
            style: "",
            no: "3.2",
            description: i18n.t('non_member_loan_balance'),
            isTitle: true,
            year1: 0,
            year2: 0,
            percentage: 0,
            main: 0,
            sub: 3
        })
        data.push({
            title:"3. "+ i18n.t('outstanding_loan_balances'),
            style: "",
            no: "",
            description: i18n.t('total_loan_outstanding'),
            isTitle: true,
            year1: 0,
            year2: 0,
            percentage: 0,
            main: 0,
            sub: 3,
        })
        this.reportData = data
        this.yearChange()
    }
};
</script>

<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-size: 16px !important;
    font-family: "Niradei-Bold" !important;
    color: #000;
    border: thin solid rgba(0, 0, 0, 0.12) !important;
    text-align: center !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 16px !important;
    font-family: "Niradei-Bold" !important;
    color: #000;
    border: thin solid rgba(0, 0, 0, 0.12) !important;
    text-align: center !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
    font-size: 16px !important;
    border-bottom: none;
    border: thin solid rgba(0, 0, 0, 0.12) !important;
    height: 60px !important;
}

.tab_setting .v-item-group.v-tabs-items {
    position: relative;
    overflow: scroll !important;
}
</style>
