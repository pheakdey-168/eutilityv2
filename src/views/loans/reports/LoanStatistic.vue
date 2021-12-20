<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('statistics_report') }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>

                    </v-col>

                    <v-col sm="2" cols="12" class="py-0">
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
                                :data="lines"
                                :groupable="true"
                                :aggregate="aggregateDefinition"
                                :server-paging="false"/>
                            <kendo-grid id="gridCollection" class="grid-function"
                                        :data-source-ref="'gridCollectionDS'"
                                        :editable="false"
                                        :groupable="true"
                                        :column-menu="true"
                                        :noRecords="true"

                                        :sortable="true"
                                        :excel-file-name="$t('credit_statistics')+'.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"

                                        :scrollable-virtual="true">
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
                                    :title="$t('group_ac')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'activeMember'"
                                    :title="$t('active_member')"
                                    :width="150"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'activeBorrower'"
                                    :title="$t('active_borrower')"
                                    :width="150"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'disbursedAmount'"
                                    :title="$t('disbursed_amount')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(disbursedAmount, numFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'outStandingAmount'"
                                    :title="$t('outstanding_amount')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(outStandingAmount, numFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'avgBorrower'"
                                    :title="$t('avg_loan_per_borrower')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(avgBorrower, numFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>

                            </kendo-grid>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"/>
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
import {print} from '@/form/loan/LoanOutstandingBalance.js'
import JSZip from "jszip";
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
            'open_date': 'open_date',
            'loan_number': 'loan_number',
            'loan_term': 'loan_term',
            'loan_product': 'loan_product',
            'principal': 'principal',
            'interest': 'interest',
            'paid_amount': 'paid_amount',
            'balance': 'balance',

        },
        
        aggregateDefinition: [
            {field: "balance", aggregate: "sum"},
        ],
        LoanOutstandingBalance: [],
        memberList: [],
        lines: [],
    }),
    components: {
        'app-datepicker': DatePickerComponent,
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
                        let data = {
                            asOf: this.asOf
                        }
                        memberHandler.getLoanDisburseReport(data).then(res => {
                            this.showLoading = false
                            this.loanList = res.data.data
                            this.checkReport();
                        })
                    }, 300);
                })
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        memberHandler.center().then(res => {
                            this.memberList = res.data.data
                            this.checkReport();
                        })
                    }, 300);
                })
            }
        },
        checkReport() {
            if (this.loanList.length > 0 && this.memberList.length > 0) {
                let g = [], loan = this.loanList, gAr = []
                $.each(this.memberList, function (i, v) {
                    if ($.inArray(v.group.id, gAr) == -1) {
                        gAr.push(v.group.id)
                        g.push({
                            mainBlock: v.hasOwnProperty('group') ? v.group.hasOwnProperty('mainBlock') ? v.group.mainBlock.name:'' : '',
                            subBlock: v.hasOwnProperty('group') ? v.group.hasOwnProperty('subBlock') ? v.group.subBlock.name:'' : '',
                            zone: v.hasOwnProperty('group') ? v.group.hasOwnProperty('zone') ? v.group.zone.name:'' : '',
                            groupId: v.group.id,
                            group: v.group.name,
                            activeMember: 0,
                            activeBorrower: 0,
                            disbursedAmount: 0,
                            outStandingAmount: 0,
                            avgBorrower: 0,
                            locale: '',
                            numFormat: 'n0'
                        })
                    }
                })
                if (g.length > 0) {
                    let self = this
                    $.each(g, function (i, v) {
                        let l = loan.filter((obj) => {
                            return obj.member.groupId = v.groupId
                        })
                        // window.console.log(loan, v.groupId, l, 'compare group and loan')
                        if (l.length > 0) {
                            let dis = 0, outs = 0, atm = 0, btm = 0, cAr = [], locale = '', fo = 0
                            $.each(l, function (j, k) {
                                locale = k.loanProduct.currency.code
                                let dec = self.decimals.filter((obj) => {return obj.currency.code == locale})
                                fo = 0
                                if(dec.length > 0){
                                    fo = dec[0].decimal
                                }
                                outs += parseFloat(k.totalPayment) - parseFloat(k.paid)
                                dis += parseFloat(k.loan.amount)
                                if(outs > 0){
                                    btm += 1
                                }
                                if ($.inArray(k.member.id, cAr) == -1) {
                                    cAr.push(k.member.id)
                                    if (k.member.id.indexOf('ac-mem-') >= 0) {
                                        let mm = self.memberList.filter((obj) => {
                                            return obj.id == k.member.id
                                        })
                                        // window.console.log(mm, k.member.id, self.memberList, 'compare member active')
                                        if (mm[0].status == 1) {
                                            atm += 1
                                        }
                                    }else{
                                        atm += 1
                                    }
                                }
                            })
                            v.disbursedAmount = dis
                            v.outStandingAmount = outs
                            v.activeMember = atm
                            v.activeBorrower = btm
                            v.avgBorrower = dis / btm
                            v.locale = locale
                            v.numFormat = 'n'+fo
                        }
                    })
                    // window.console.log(g, 'group')
                    this.lines = g
                }
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
        print_() {
            print(this.LoanOutstandingBalance)
        }
    },
    computed: {},
    mounted: async function () {
        await this.loadDecimal()
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

.k-grid th {
    padding: 8px 12px;
    border-width: 0 0 1px 1px;
    white-space: break-spaces !important;
    text-align: center !important;
}
</style>
