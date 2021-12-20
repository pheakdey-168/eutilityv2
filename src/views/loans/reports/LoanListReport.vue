<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('list_of_loan_report') }}</h2>
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
                        <v-btn icon color="black" class="bg-none  ml-2"
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
                                :groupable="true"
                                :aggregate="aggregateDefinition"
                                :server-paging="false"/>
                            <kendo-grid
                                id="gridCollection" class="grid-function"
                                :data-source-ref="'gridCollectionDS'"
                                :editable="false"
                                :groupable="true"
                                :column-menu="true"
                                :noRecords="true"

                                :sortable="true"
                                :excel-file-name="$t('list_of_loan')+'.xlsx'"
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
                                    :hidden="true"
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
                                    :field="'issued_date'"
                                    :title="$t('issue_date')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'loan_number'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :title="$t('loan_num')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'loan_product'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('product')"
                                    :width="200"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'loan_term'"
                                    :title="$t('loan_term_in_month')"
                                    :width="150"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'text-align: right, background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'loan_amount'"
                                    :title="$t('loan_amount')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(loan_amount, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'disbursed_amount'"
                                    :title="$t('disbursed_amount')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(disbursed_amount, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'status'"
                                    :title="$t('status')"
                                    :width="200"
                                    :attributes="{style: 'text-align: center; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'locale'"
                                    :title="$t('currency')"
                                    :width="200"
                                    :hidden="true"
                                    :attributes="{style: 'text-align: center; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
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
const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
import { print } from '@/form/loan/ListOfLoan.js'
import JSZip from "jszip";
import { i18n } from '@/i18n';
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
            'issued date': 'issued_date',
            'loan_term': 'loan_term',
            'loan_product': 'loan_product',
            'loan_number': 'loan_number',
            'loan_amount': 'loan_amount',
            'disbursed_amount': 'disbursed_amount',
            'status': 'status',
        },
        listOfLoan: [],
        groups: [],
        aggregateDefinition : [
            { field: "disbursed_amount", aggregate: "sum" },
        ],
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
                        // window.console.log(data, 'search')
                        memberHandler.getLoanListReport(data).then(res => {
                            this.showLoading = false
                            this.loanList = res.data.data
                            // window.console.log(this.loanList)
                            if(this.loanList.length > 0){
                                let ds = this.$refs.gridCollectionDS.kendoWidget(),
                                    self = this
                                ds.data([])
                                $.each(this.loanList, function (i,v){
                                    let locale = v.loanProduct.currency.code
                                    let dec = self.decimals.filter((obj) => {return obj.currency.code == locale})
                                    let fo = 0
                                    if(dec.length > 0){
                                        fo = dec[0].decimal
                                    }
                                    let disAmt = parseFloat(v.disburseAmount)
                                    let status = i18n.t('close')
                                    if(v.status == 1){
                                        status = i18n.t('padding')
                                    }else if(v.status == 2){
                                        status = i18n.t('approved')
                                    }else if(v.status == 3){
                                        status = i18n.t('disbursed')
                                        disAmt = parseFloat(v.amount)
                                    }else if(v.status == 4){
                                        status = i18n.t('rejected')
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
                                        loan_number: v.number,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: i18n.t(v.member.gender),
                                        mainBlock: mainBlock,
                                        subBlock: subBlock,
                                        zone: zone,
                                        group: group,
                                        issued_date: v.issuedDate,
                                        loan_term: v.term,
                                        loan_product: v.loanProduct.name,
                                        status: status,
                                        loan_amount: parseFloat(v.amount),
                                        disbursed_amount: disAmt,
                                        purpose: v.purpose ? v.purpose.name : '',
                                        locale: locale,
                                        numberFormat: 'n' + fo
                                    })
                                    self.listOfLoan.push({
                                        no: i + 1,
                                        cid: ccid[0],
                                        loan_number: v.number,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: i18n.t(v.member.gender),
                                        mainBlock: mainBlock,
                                        subBlock: subBlock,
                                        zone: zone,
                                        group: group,
                                        issued_date: v.issuedDate,
                                        loan_term: v.term,
                                        loan_product: v.loanProduct.name,
                                        status: status,
                                        loan_amount: parseFloat(v.amount),
                                        disbursed_amount: disAmt,
                                        purpose: v.purpose ? v.purpose.name : '',
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
            print(this.listOfLoan)
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
