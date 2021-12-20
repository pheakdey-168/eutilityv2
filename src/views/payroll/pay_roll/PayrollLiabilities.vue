<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="9" cols="12" class="pt-0">
                            <h2 class="mb-0 font_20">{{$t('payroll_liabilities_balance')}}</h2>
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
                                {{$t('search')}}
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
                                    <th class="text-bold text-uppercase">{{ $t('total') }}</th>
                                    <th class="text-bold text-uppercase liabilities-header" v-for="liabilitiesh in liabilities" v-bind:key="liabilitiesh.id">{{ dateFormat(liabilitiesh.monthOf)}}</th>
                                </tr>
                            </thead>
                            <tbody>
                               <tr>
                                    <td>{{ $t('employee_payroll_liabilites') }}</td>
                                    <td class="liabilities-amount">{{amountFormat(total_liabilities.total_netPay)}}</td>
                                    <td class="liabilities-amount" v-for="liabilitiesemp in liabilities" v-bind:key="liabilitiesemp.id">{{ amountFormat(liabilitiesemp.netPay)}}</td>
                                </tr>
                            <tr>
                                <td>{{ $t('salary_tax_liablities') }}</td>
                                <td class="liabilities-amount">{{ amountFormat(total_liabilities.total_tax_payment_us)}}</td>
                                <td class="liabilities-amount" v-for="salaryTax in liabilities" v-bind:key="salaryTax.id">{{ amountFormat(salaryTax.taxSalaryUS)}}</td>
                            </tr>
                            <tr>
                                <td>{{ $t('fringe_benefit_tax_liabilities') }}</td>
                                <td class="liabilities-amount">{{amountFormat(total_liabilities.total_tax_benefit)}}</td>
                                <td class="liabilities-amount" v-for="benefitTax in liabilities" v-bind:key="benefitTax.id">{{ amountFormat(benefitTax.taxAmountBenefit)}}</td>
                            </tr>
                            <tr>
                                <td class="green white--text text-bold">{{ $t('total_liabilities') }}</td>
                                <td class="green white--text    liabilities-amount">{{amountFormat(total_liabilities.total_netPay + total_liabilities.total_tax_payment_us + total_liabilities.total_tax_benefit)}}</td>
                                <td class="green white--text    liabilities-amount" v-for="totalLiabilities in liabilities" v-bind:key="totalLiabilities.id">{{ amountFormat(totalLiabilities.netPay + totalLiabilities.taxSalaryUS + totalLiabilities.taxAmountBenefit)}}</td>
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
        start_date: "",
        end_date: "",
        data: [],
        liabilities: [],
        total_liabilities:{},
        search:{
            start_date: "",
            end_date: ""
        },
    }),
    props: {},
    methods: {
        loadPayrollLiabilities(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    payrollHandler.getPayrollLiabilites(this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let results = res.data.data
                            this.total_liabilities = results
                            this.liabilities = results.payrolls
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
            return kendo.toString( kendo.parseFloat(value),"n2")
        },
        onSearch(){
            let start_date = this.start_date
            let end_date =this.end_date
            if(end_date && start_date){
                this.search = {
                    'start_date': kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    'end_date': kendo.toString(new Date(end_date),'yyyy-MM-dd')
                }
                this.loadPayrollLiabilities()
            }else{
                this.search = {
                    'start_date': '',
                    'end_date': ''
                }
                this.loadPayrollLiabilities()
            }
        }
    },
    async mounted() {
        await this.loadPayrollLiabilities()
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
    .liabilities-amount {
        text-align: right !important;;
    }
    .liabilities-header {
        text-align: center !important;
    }
</style>
