<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="9" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('payroll_summary')}}</h2>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="4" cols="12" class="py-0 d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('from')}}</label>
                            <month-picker :initialMonth="start_date" @emitMonth="start_date = $event"/>
                        </v-col>

                        <v-col sm="4" cols="12" class="py-0  d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('to')}}</label>
                            <month-picker :initialMonth="end_date" @emitMonth="end_date = $event" :min="start_date"/>
                        </v-col>
                        <v-col sm="2" cols="1" class="py-1">
                            <v-btn color="third white--text text-capitalize" @click="onSearch">
                                {{$t('view')}}
                            </v-btn>
                        </v-col>
                
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th class="text-bold text-uppercase head-summary">{{ $t('total') }}</th>
                                    <th class="text-bold text-uppercase head-summary" v-for="summaryh in summary" v-bind:key="summaryh.id">{{ dateFormat(summaryh.monthOf)}}</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-bold">{{ $t('gross_pay') }}</td>
                                <td></td>
                                <td class="amount" v-for="summaryGoss in summary" v-bind:key="summaryGoss.id"></td>
                            </tr>
                            <tr>
                                <td>{{ $t('salary') }}</td>
                                <td class="amount">{{amountFormat(total_summary.total_gross)}}</td>
                                <td class="amount" v-for="salary in summary" v-bind:key="salary.id">{{ amountFormat(salary.totalGross)}}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('overtime_pay') }}</td>
                                <td class="amount">{{amountFormat(0)}}</td>
                                <td class="amount" v-for="overTime in summary" v-bind:key="overTime.id">{{amountFormat(0)}}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('benefit') }}</td>
                                <td class="amount">{{amountFormat(total_summary.total_benefits)}}</td>
                                <td class="amount" v-for="benefit in summary" v-bind:key="benefit.id">{{ amountFormat(benefit.totalBenefits)}}</td>
                            </tr>
                            <tr>
                                <td class="whiteGreen">{{ $t('total_gross_pay') }}</td>
                                <td class="whiteGreen amount">{{amountFormat(total_summary.total_gross)}}</td>
                                <td class="whiteGreen amount" v-for="grossPay in summary" v-bind:key="grossPay.id">{{ amountFormat(grossPay.totalGross)}}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">{{ $t('tax_withheld') }}</td>
                                <td></td>
                                <td class="amount" v-for="taxWithheld in summary" v-bind:key="taxWithheld.id"></td>
                            </tr>
                            <tr>
                                <td>{{ $t('salary_tax') }}</td>
                                <td class="amount">{{amountFormat(total_summary.total_tax_payment_us)}}</td>
                                <td class="amount" v-for="salaryTax in summary" v-bind:key="salaryTax.id">{{ amountFormat(salaryTax.totalTaxPaymentUS)}}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('fringe_benefit_tax') }}</td>
                                <td class="amount">{{amountFormat(total_summary.total_tax_benefit)}}</td>
                                <td class="amount" v-for="benefitTax in summary" v-bind:key="benefitTax.id">{{ amountFormat(benefitTax.totalTaxBenefit)}}</td>
                            </tr>
                            <tr>
                                <td class="whiteGreen">{{ $t('total_tax_withheld') }}</td>
                                <td class="whiteGreen amount">{{amountFormat(total_summary.total_tax_benefit + total_summary.total_tax_payment_us)}}</td>
                                <td class="whiteGreen amount" v-for="totalTax in summary" v-bind:key="totalTax.id">{{ amountFormat(totalTax.totalTaxPaymentUS + totalTax.totalTaxBenefit)}}</td>
                            </tr>
                            <tr>
                                <td class="whiteGreen text-bold">{{ $t('deduction') }}</td>
                                <td class="whiteGreen amount">{{amountFormat(total_summary.total_deduction)}}</td>
                                <td class="whiteGreen amount" v-for="deduction in summary" v-bind:key="deduction.id">{{ amountFormat(deduction.totalDeduction)}}</td>
                            </tr>
                            <tr>
                                <td class="green white--text text-bold">{{ $t('net_pay') }}</td>
                                <td class="green white--text amount">{{amountFormat(total_summary.total_netPay)}}</td>
                                <td class="green white--text amount" v-for="netPay in summary" v-bind:key="netPay.id">{{ amountFormat(netPay.totalNetPay)}}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                       />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui"
const payrollHandler = require("@/scripts/payrollHandler")
export default {
    data: () => ({
        showLoading: false,
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",
        data: [],
        summary:[],
        search:{
            start_date: "",
            end_date: ""
        },
        total_summary:{
            total_gross:           0,
            total_benefits:        0,
            total_tax_benefit:     0,
            total_netPay:          0,
            total_net_salary:      0,
            total_deduction:       0,
            total_tax_payment_us:  0,
            total_tax_payment_khm: 0,
        }
    }),
    props: {},
    methods: {
        loadPayrollSummary(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    payrollHandler.getPayrollSummary(this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let results = res.data.data
                            this.total_summary = results
                            this.summary = results.payrolls
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        dateFormat(value){
            return  kendo.toString(new Date(value), "y")
        },
        amountFormat(value){
            return kendo.toString( kendo.parseFloat(value),"c2")
        },
        onSearch(){
            let start_date = this.start_date
            let end_date =this.end_date
            if(end_date && start_date){
                this.search = {
                    'start_date': kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    'end_date': kendo.toString(new Date(end_date),'yyyy-MM-dd')
                }
                this.loadPayrollSummary()
            }else{
                this.search = {
                    'start_date': '',
                    'end_date': ''
                }
                this.loadPayrollSummary()
            }
        }
    },
    async mounted() {
        await this.loadPayrollSummary()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
};
</script>
<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #92d050 !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-top: thin solid #ddd;
        border-bottom: thin solid #ddd;
        border-radius: 0 !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .v-application .third,
    .v-application .secondary {
        border-color: #fff !important;
    }

    .amount {
        text-align: right !important;
    }
    .head-summary {
        text-align: right !important;
    }
</style>
