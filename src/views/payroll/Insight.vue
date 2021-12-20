<template>
	<v-row>
        <v-col class="pb-0 pt-4" sm="12" cols="12">
			<v-row>
                <v-col class="py-0 pr-md-2" sm="4" cols="12">
                    <v-card
                        outlined
                        dense
                        color="secondary"
                        class="pa-3 mb-4 no_border niradei_bold"
                        min-height="65px">
                        <v-row>
                            <h6 class="col-sm-7 font_34 third--text">{{employeePay}}</h6>
                            <h4 class="text-right white--text py-0 col-sm-5 font_13 text-uppercase">
                                {{ $t("employee_to_pay") }}
                            </h4>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border"
                        min-height="268"
                        color="grayBg"
                    >
                        <h3 class="font_20">{{ $t("total_employee") }}</h3>
                        <p class="mb-0">
                            {{ $t('as_of_today') }}
                        </p>
                        <h2 class="primary mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">{{employeeResult.totalEmployee}}</h2>
                        <template>
                            <v-simple-table class="mb-3">
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{$t('male')}}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{employeeResult.totalMale}}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{$t('female')}}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{employeeResult.totalFemale}}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{$t('management')}}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{formatPercantage(employeeResult.totalManagement)}}
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                        <v-row>
                            <v-col sm="6" class="pr-0 py-0">
                                <v-btn to="" class="font_16 text-capitalize rounded-0 white--text"  color="greenText">
                                    + {{$t('new')}}
                                </v-btn>
                            </v-col>
                            <v-col sm="6" class="pl-0 pb-0 text-right">
                                <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        color="grayBg"
                        class="pa-4 mt-4 no_border"
                        min-height="250px"
                    >
                        <h3 class="font_20">{{ $t("total_tax_payment") }}</h3>
                        <p class="mb-0">
                            {{ $t('from_the_beginning_year') }}
                        </p>
                        <h2 class="primary mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">{{taxPayment.totalTaxPayment}}</h2>
                        <template>
                            <v-simple-table class="mb-3">
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{$t('salary_tax')}}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{Percantage((taxPayment.pctTaxSalary))}}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{$t('fringe_benefit_tax')}}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{Percantage((taxPayment.pctTaxBenefit))}}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{$t('no_of_employee')}}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{taxPayment.totalEmployee}}
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                        <v-row>
                            <v-col class="pl-0 py-0 text-right align-self-end">
                                <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                            </v-col>
                        </v-row>
                    </v-card>
				</v-col>
                <v-col class="py-md-0 px-md-2" sm="4" cols="12">
                    <v-card
                        outlined
                        dense
                        color="third"
                        class="pa-3 mb-4 no_border niradei_bold "
                        min-height="65px">
                        <v-row>
                            <h6 class="white--text col-sm-8 font_34">{{resultDay ? resultDay: 0}}</h6>
                            <h4 class="text-right col-sm-4 py-0 font_13 text-uppercase">
                                {{ $t("days_to_payroll") }}
                            </h4>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border"
                        min-height="268"
                        color="grayBg"
                    >
                        <h3 class="font_20">{{ $t("total_net_pay") }}</h3>
                        <p class="mb-0">
                            {{ $t('as_of_today') }}
                        </p>
                        <h2 class="primary mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"> {{total_payroll.total_netPay + (total_payroll.total_benefits - total_payroll.total_tax_benefit) + total_payroll.total_overtime}}</h2>
                        <template>
                            <v-simple-table class="mb-3">
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t('salary') }}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{total_payroll.total_netPay}}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t('benefit') }}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                 {{total_payroll.total_benefits - total_payroll.total_tax_benefit}}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t('overtime') }}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{total_payroll.total_overtime}}
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                        <v-row>
                            <v-col class="pl-0 py-0 text-right align-self-end">
                                <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        color="grayBg"
                        class="pa-4 mt-4 no_border"
                        min-height="250px"
                    >
                        <h3 class="font_20">{{ $t("payment_information") }}</h3>
                        <p class="mb-0">
                            {{ $t('from_the_beginning_year') }}
                        </p>
                        <h2 class="primary mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">{{totalPay.totale_amount}}</h2>
                        <template>
                            <v-simple-table>
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left text-left-percentage">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{ $t('paid_via_bank') }}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{formatPercantage(totalPay.amount_bank_percent)}}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left text-left-percentage">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{ $t('paid_via_cash') }}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                 {{formatPercantage(totalPay.amount_cash_percent)}}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left text-left-percentage">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{ $t('bank_used_for_payroll') }}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{payrollBank}}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left text-left-percentage">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{ $t('%_of_net_pay_for_women') }}
                                            </span>
                                        </td>
                                        <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                {{formatPercantage(totalPay.amount_female_percent)}}
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
				</v-col>
                <v-col class="py-0 pl-md-2" sm="4" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border"
                        min-height="353px"
                        color="grayBg"
                    >
                        <h3 class="font_20">{{ $t("total_gross_pay") }}</h3>
                        <p class="mb-3">
                            {{ $t('from_the_beginning_year') }}
                        </p>
                        <h2 class="primary mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">{{total_payroll.total_gross}}</h2>
                        <chart ref="chart"
                               :chartArea="chartArea"
                               :legend-visible="false"
                               :series-defaults-labels-visible="true"
                               :series-defaults-labels-background="'transparent'"
                               :series-defaults-labels-template="labelTemplate"
                               :series="series"
                               :tooltip-visible="true"
                               :tooltip-template="tooltipTemplate"
                               :theme="'sass'">
                        </chart>

                    </v-card>
                    <v-img class="mt-4" src="@/assets/images/forte_logo.jpg" />
                    <v-card
                        outlined
                        dense
                        color="black"
                        class="py-2 px-7 no_border text-center"
                        min-height="63px"
                    >
                        <p class="mb-0 white--text font_16">{{$t('tailored_corporate_insurance')}}</p>
    
                    </v-card>
                </v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
    import { Chart } from '@progress/kendo-charts-vue-wrapper';
    import kendo from '@progress/kendo-ui'
    const employeeHandler = require("@/scripts/employeeHandler")
    const payrollHandler = require("@/scripts/payrollHandler")
	export default {
		components: {
            chart: Chart
        },
		data: () => ({
            labelTemplate: '#= category # #= value #%',
            series: [{
                type: 'pie',
                startAngle: 180,
                data: [
                {
                    category: 'contracted 0%',
                    value: 0,
                    color: '#92D050'
                },
                {
                    category:  'fixed_duration_contact 0%',
                    value: 0,
                    color: '#70ad47'
                },
                {
                    category:  'undefined_duration_contact 0%',
                    value: 0,
                    color: '#538233'
                }]
            }],
            chartArea: {
                background: "transparent",
                height: 210,
            },
            employeeResult: {
                totalMale: 0,
                totalFemale: 0,
                totalOther: 0,
                totalEmployee: 0,
                totalManagement: 0
            },
            search:{
                start_date: "",
                end_date: ""
            },
            total_payroll:{
                total_gross:           0,
                total_benefits:        0,
                total_tax_benefit:     0,
                total_tax_payment_us:  0,
                total_netPay:          0,
                total_net_salary:      0,
                total_deduction:       0,
                total_overtime:        0,
                total_employee:        0
            },
            employeePay: 0,
            totalPay: {
                amount_bank_percent: 0,
                amount_cash_percent: 0,
                amount_female_percent: 0,
                total_amount_bank: 0,
                total_amount_cash: 0,
                total_amount_female: 0,
                totale_amount: 0
            },
            taxPayment:{
                totalTaxPayment: 0,
                totalTaxSalary: 0,
                totalTaxBenefit: 0,
                totalEmployee: 0
            },
            payrollBank: 0,
            resultDay: 0
		}),
		computed: {
		},
        methods:{
            formatPercantage(val){
                let value = val/100
                if(value > 0){
                    return kendo.toString(value,'p')
                }else{
                    return kendo.toString(0,'p')
                }
            },
            Percantage(value){
                return kendo.toString(value,'p')
            },
            async loadEmployee(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        employeeHandler.getEmployeeDashboard().then(res => {
                            this.showLoading = true;
                            if(res.statusCode === 200){
                                this.showLoading = false;
                                this.employeeResult = res.data[0]
                            }
                        })
                    }, 300);
                })
            },
            async loadPayrollSummary(){
                let date = new Date();
                let start_date = new Date(date.getFullYear(), 0, 1);
                let end_date = new Date(date.getFullYear(), 12, 0);
                this.search ={
                    start_date: kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    end_date: kendo.toString(new Date(end_date),'yyyy-MM-dd'),
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getPayrollSummary(this.search).then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                let results = res.data.data
                                this.total_payroll = results
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            async loadTaxpayment(){
                let date = new Date();
                let start_date = new Date(date.getFullYear(), 0, 1);
                let end_date = new Date(date.getFullYear(), 12, 0);
                this.search ={
                    start_date: kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    end_date: kendo.toString(new Date(end_date),'yyyy-MM-dd'),
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getTaxPayment(this.search).then(res => {
                            this.showLoading = true
                             window.console.log(res)
                            if (res.statusCode === 200) {
                                this.showLoading = false
                                let results = res.data
                                this.taxPayment = results
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            async loadEmployeePay(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getEmployeeToPay().then(res => {
                            this.showLoading = true
                            if (res.statusCode === 200) {
                                this.showLoading = false
                                let results = res.data
                                this.employeePay = results

                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            async loadPayment(){
                let date = new Date();
                let start_date = new Date(date.getFullYear(), 0, 1);
                let end_date = new Date(date.getFullYear(), 12, 0);
                let search ={
                    start_date: kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    end_date: kendo.toString(new Date(end_date),'yyyy-MM-dd'),
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getTotalPayment(search).then(res => {
                            this.showLoading = true
                            if (res.statusCode === 200) {
                                this.showLoading = false
                                let results = res.data
                                this.totalPay = results
                            }
                        }).catch()
                            {
                                this.showLoading = false
                            }
                    }, 300)
                })
            },
            async loadPayrollBank(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getBank().then(res => {
                            let resultB = res.data.data  
                            this.payrollBank = resultB.length
                            window.console.log(this.payrollBank,'payrollBank')
                        })
                    }, 300);
                })
            },
            async loadChart(){
                let date = new Date();
                let start_date = new Date(date.getFullYear(), 0, 1);
                let end_date = new Date(date.getFullYear(), 12, 0);
                let search ={
                    start_date: kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    end_date: kendo.toString(new Date(end_date),'yyyy-MM-dd'),
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getPaymentChart(search).then(res => {
                            this.showLoading = true
                            if (res.statusCode === 200) {
                                let result =  res.data
                                let totalContractd = kendo.toString(((result.totalContractd * 100) / result.totalGrossPay),'n2')
                                let totalFDContract = kendo.toString(((result.totalFDContract * 100) / result.totalGrossPay),'n2')
                                let totalUDContract = kendo.toString(((result.totalUDContract * 100 )/ result.totalGrossPay),'n2') 
                                this.series = [{
                                    type: 'pie',
                                    startAngle: 180,
                                    data: [
                                    {
                                        category: 'contracted' + totalContractd ? totalContractd: 0,
                                        value: totalContractd ? totalContractd: 0 ,
                                        color: '#92D050'
                                    },
                                    {
                                        category:  'fixed_duration_contact' + totalFDContract ? totalFDContract: 0,
                                        value: totalFDContract ? totalFDContract: 0,
                                        color: '#70ad47'
                                    },
                                    {
                                        category:  'undefined_duration_contact' + totalUDContract ? totalUDContract: 0,
                                        value: totalUDContract ? totalUDContract: 0,
                                        color: '#538233'
                                    }]
                                }]                     
                            }
                        }).catch()
                            {
                                this.showLoading = false
                            }
                    }, 300)
                })
            },
            async loadDayToPay(){
                let dateNow = kendo.toString(new Date(),'yyyy-MM-dd')
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getDayToPay(dateNow).then(res => {
                            this.showLoading = true
                            if (res.statusCode === 200) {
                                this.showLoading = false
                                this.resultDay = res.data
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            }
        },
        async mounted() {
            await this.loadEmployee()
            await this.loadPayrollSummary()
            await this.loadEmployeePay()
            await this.loadPayment()
            await this.loadChart()
            await this.loadPayrollBank()
            await this.loadDayToPay()
            await this.loadTaxpayment()
		},
	};
</script>
<style scoped>
	.theme--light.v-data-table{
		background-color: transparent !important;
	}
	.v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
		height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
	}
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }

	@media (max-width: 576px){

	}
    .text-right{
        padding: 0px !important;
    }
    .text-left-percentage{
        padding: 0px !important;
    }
</style>