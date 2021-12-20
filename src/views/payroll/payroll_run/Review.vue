<template>
    <v-row>
        <v-col cols="12" class="pt-0">
            <v-row>
                <v-col sm="4" cols="12" class="pb-0">
                    <h3>{{$t('review_payroll')}}</h3>
                    <p>{{$t('review_payroll_desc')}}</p>
                </v-col>
                <v-col sm="8" cols="12" class="pt-0">
                
                    <v-dialog v-model="dialogm" max-width="350px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="third" class="rounded-pill white--text float-right text-capitalize mt-5" v-on="on">
                                {{$t('create_new')}}
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>{{$t('adjustment')}}</v-card-title>
                            <v-icon class="btn_close" @click="dialogm = false">close</v-icon>
                            <v-card-text style="height: 250px;">
                                <v-row class="">
                                    <v-col sm="12" cols="12" class="py-0">
                                        <label>{{$t('employee_name')}}</label>
                                        <v-select class=" my-2"
                                            outlined 
                                            tage="Employee Name"
                                            clearable />
                                    </v-col>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <label class="label">{{$t('payroll_component')}}</label>
                                        <v-select class=" my-2"
                                            outlined 
                                            tage="Payroll Component"
                                            clearable />  
                                    </v-col>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <label>{{$t('amount')}}</label>
                                        <v-text-field class=" my-2" tage="Amount" outlined clearable />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="function_footer">
                                <v-btn class="btn_cancel float-left ml-4 mb-2" @click="dialogm = false">{{$t('cancel')}}</v-btn>
                                <v-btn color="lightBlue" class="white--text float-right mr-4 mb-2">
                                    {{$t('save_close')}}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <kendo-datasource ref="dataSourceReview"
                :data="payrollList"/>
                <kendo-grid id="grid" class="grid-function"
                    :data-source-ref="'dataSourceReview'"
                    :scrollable-virtual="true"
                    :column-menu="true">
                <kendo-grid-column
                    :field="'no'"
                    :title="$t('no')"
                    :template="rowNumberTmpl"
                    :width="60"
                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                    :attributes="{style: 'text-align: center'}"/>
                <kendo-grid-column
                    :field="'employeeId'"
                    :title="$t('employee_id')"
                    :width="150"
                    :template="'<span>#= employeeId#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="200"
                    :field="'employeeName'"
                    :title="$t('employee_name')"
                    :template="'<span>#= employeeName#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="150"
                    :field="'salary'"
                    :title="$t('earnings')"
                    :template="'<span>#= kendo.toString(salary,`c2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'deduction'"
                    :title="$t('deduction')"
                    :template="'<span>#= kendo.toString(deduction,`c2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="120"
                    :field="'totalBenefit'"
                    :title="$t('benefit')"
                    :template="'<span>#= kendo.toString(totalBenefit,`c2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right;'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'taxAmountBenefit'"
                    :title="$t('tax_benefit')"
                    :template="'<span>#= kendo.toString(taxAmountBenefit,`c2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="250"
                    :field="'salaryKHM'"
                    :title="$t('salary_to_be_paid_KHR')"
                    :template="'<span>#= kendo.toString(salaryKHM,`n`)# KHM</span>'"
                    :format="'{0:n}'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="100"
                    :field="'taxRate'"
                    :title="$t('rate')"
                    :template="'<span>#= kendo.toString((taxRate/100),`p0`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="200"
                    :field="'taxRateKHM'"
                    :title="$t('tax_on_salary_KHR')"
                    :template="'<span>#= kendo.toString(taxRateKHM, `n`)# KHM</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="200"
                    :field="'taxSalaryUS'"
                    :title="$t('tax_on_Salary_USD')"
                    :template="'<span>#= kendo.toString(taxSalaryUS,`c2`) #</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="100"
                    :field="'netSalary'"
                    :title="$t('net_salary')"
                    :template="'<span>#= kendo.toString(netSalary + totalBenefit - taxAmountBenefit,`c2`)#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'natureEmployee'"
                    :title="$t('nature_employee')"
                    :hidden="true"
                    :template="'<span>#= natureEmployee#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="150"
                    :field="'natureContract'"
                    :title="$t('nature_ontract')"
                    :hidden="true"
                    :template="'<span>#= natureContract.name#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="150"
                    :field="'bank'"
                    :title="$t('bank_name')"
                    :template="'<span>#= bank.name ? bank.name: ``#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="150"
                    :field="'bankAccount'"
                    :title="$t('bank_account')"
                    :template="'<span>#= bankAccount ? bankAccount: ``#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="250"
                    :field="'payrollLiabilitie'"
                    :title="$t('payroll_liabilitie')"
                    :hidden="true"
                    :template="'<span>#= payrollLiabilitie.number# - #= payrollLiabilitie.name#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :width="200"
                    :field="'paymentMethod'"
                    :title="$t('payment_method')"
                    :template="'<span>#= paymentMethod#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
            </kendo-grid>
        </v-col>
    </v-row>
</template>
<script>
const payrollHandler = require("@/scripts/payrollHandler")
export default {
    props:['loadPayrolls'],
    data: () =>({
        journal_date: "",
        dialogm: false,
        payrollList: [],
        payrollTax: [],
        payrolls: [],
    }),
    components: {
        // 'app-datepicker': DatePickerComponent,
    },
    methods:{
        rowNumberTmpl(dataItem) {
            var ds = this.$refs.dataSourceReview.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        loadPayrollList(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getPayroll(this.$route.params.id).then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            this.showLoading = false;
                            const resultPay = res.data.data[0]
                            this.payrolls = resultPay.payrollList
                            this.payroll = resultPay
                            this.loadTaxSalary()
                        }
                    })
                }, 300);
            })
        },
        loadTaxSalary(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getTax().then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            this.showLoading = false;
                            this.payrollTax = res.data.data
                            this.qurytaxPay()
                        }
                    })
                }, 300);
            })
        },
        qurytaxPay(){
            if(this.payrolls !== undefined){
                let dataSource = this.payrolls
                let exchangeRate  = this.payroll.exchangeRate
                let tax = this.payrollTax;
                let resultTax = tax.filter(t => t.nature === 'Resident_Salary');
                let TaxNoResident = tax.filter(t => t.nature === 'No_resident_Salary');
                let taxBenefit = tax.filter(t => t.nature === 'Fringe_Benefit');
                let payrollsAR = [];
                dataSource.forEach(function(tc) {
                    let exchange            = parseFloat(exchangeRate.rate);
                    let spouse              = 0;
                    let minorChildren       = 0;
                    let exchangeSalary      = 0;
                    let rateBenefit         = 0;
                    let grossSalary         = 0;
                    let amountBenefit       = 0;
                    let totalBenefit        = 0;
                    let currencyKHM         = "";
                    let result              =  0;
                    let taxRate             =  0;
                    let taxAmount           =  0;
                    let taxSalary           = 0;
                    let taxSalaryUS         = 0;
                    let netSalary           = 0;
                    let netPay              = 0;
                    if(tc.natureEmployee == 'Resident'){
                        exchangeSalary      = (tc.salary - tc.deduction - spouse - minorChildren) * exchange;
                        rateBenefit         = taxBenefit[0].rate
                        grossSalary         = tc.salary
                        amountBenefit       = (tc.totalBenefit * rateBenefit)/100
                        totalBenefit        = tc.totalBenefit
                        currencyKHM         = "km-KH";
                        result              =  resultTax[0].rate.filter(r => r.from <= exchangeSalary && r.to > exchangeSalary)
                        taxRate             =  parseFloat(result[0].taxRate)
                        taxAmount           =  parseFloat(result[0].amount)
                        taxSalary           = (exchangeSalary * taxRate)/100 - taxAmount
                        taxSalaryUS         = taxSalary / exchange
                        netSalary           = ((exchangeSalary - taxSalary)/ exchange) + totalBenefit
                        netPay              = ((exchangeSalary - taxSalary) / exchange) + totalBenefit
                    }else{
                        exchangeSalary      = (tc.salary - tc.deduction) * exchange;
                        rateBenefit         = taxBenefit[0].rate
                        grossSalary         = tc.salary
                        amountBenefit       = (tc.totalBenefit * rateBenefit)/100
                        totalBenefit        = tc.totalBenefit
                        currencyKHM         = "km-KH";
                        result              =  TaxNoResident[0]
                        taxRate             =  parseFloat(result.rate)
                        taxSalary           = (exchangeSalary * taxRate)/100 - taxAmount
                        taxSalaryUS         = taxSalary / exchange
                        netSalary           = ((exchangeSalary - taxSalary)/ exchange)
                        netPay              = ((exchangeSalary - taxSalary) / exchange)
                    }
                    payrollsAR.push({
                        taxSalary:                  taxSalary,
                        taxRate:                    taxRate,
                        bank:                       tc.bank,
                        bankAccount:                tc.bankAccount,
                        deduction:                  tc.deduction,
                        employeeId:                 tc.employeeId,
                        employeeName:               tc.employeeName,
                        employeeUuid:               tc.employeeUuid,
                        natureEmployee:             tc.natureEmployee,
                        payrollLiabilitie:          tc.payrollLiabilitie,
                        paymentMethod:              tc.paymentMethod,
                        overTimeHoliday:            tc.overTimeHoliday,
                        overTimeWeekend:            tc.overTimeWeekend,
                        position:                   tc.position,
                        natureContract:             tc.natureContract,
                        salary:                     tc.salary,
                        salaryType:                 tc.salaryType,
                        startingTime:               tc.startingTime,
                        totalBenefit:               totalBenefit,
                        taxAmountBenefit:           amountBenefit,
                        workDay:                    tc.workDay,
                        workTime:                   tc.workTime,
                        location:                   tc.location,
                        salaryKHM:                  exchangeSalary,
                        currencyKHM:                currencyKHM,
                        netPay:                     netPay,
                        netSalary:                  netSalary,
                        taxRateKHM:                 taxSalary,
                        taxSalaryUS:                taxSalaryUS,
                        grossSalary:                grossSalary,
                    })
                })
                this.payrollList = payrollsAR
            }
        },
        autoCalculate() {
            let ds              = this.$refs.dataSourceReview.kendoWidget(),
            totalTaxPaymentKHM  = 0,
            totalNetSalary      = 0,
            totalBenefits       = 0,
            totalTaxBenefit     = 0,
            totalDeduction      = 0,
            totalTaxPaymentUS   = 0,
            totalEmployee       = 0,
            totalGross          = 0,
            totalNetPay         = 0
            ds.data().forEach(value => {
                totalEmployee       += 1
                totalTaxPaymentKHM  += parseFloat(value.taxSalary)
                totalNetPay         += parseFloat(value.netPay)
                totalNetSalary      += parseFloat(value.netSalary)
                totalBenefits       += parseFloat(value.totalBenefit)
                totalDeduction      += parseFloat(value.deduction)
                totalTaxPaymentUS   += parseFloat(value.taxSalaryUS)
                totalGross          += parseFloat(value.grossSalary)
                totalTaxBenefit     += parseFloat(value.taxAmountBenefit)
            })
            this.totalEmployee          = parseFloat(totalEmployee.toFixed(2));
            this.totalNetPay            = parseFloat(totalNetPay.toFixed(2));
            this.totalTaxPaymentKHM     = parseFloat(totalTaxPaymentKHM.toFixed(2));
            this.totalNetSalary         = parseFloat(totalNetSalary.toFixed(2));
            this.totalBenefits          = parseFloat(totalBenefits.toFixed(2));
            this.totalTaxBenefit        = parseFloat(totalTaxBenefit.toFixed(2));
            this.totalDeduction         = parseFloat(totalDeduction.toFixed(2));
            this.totalTaxPaymentUS      = parseFloat(totalTaxPaymentUS.toFixed(2));
            this.totalGross             = parseFloat(totalGross.toFixed(2));
        },
        saveReview(){
            this.autoCalculate()
            let ds          = this.$refs.dataSourceReview.kendoWidget();
            let payList  = ds.data()
            let payrolls = this.payroll
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        "id":                   this.$route.params.id,
                        "totalEmployee":        payrolls.totalEmployee,
                        "monthOf":              payrolls.monthOf, 
                        "payDate":              payrolls.payDate,
                        "adjustment":           payrolls.adjustment,
                        "number":               payrolls.number,
                        "abbr":                 payrolls.abbr,
                        "lastNumber":           payrolls.lastNumber,
                        "referenceNumber":      payrolls.referenceNumber,
                        "type":                 payrolls.type,
                        "payNumber":            payrolls.payNumber,
                        "currency":             payrolls.currency,
                        "exchangeRate":         payrolls.exchangeRate,
                        "totalGross":           this.totalGross,
                        "totalNetPay":          this.totalNetPay,
                        "totalTaxPaymentKHM":   this.totalTaxPaymentKHM,
                        "totalTaxPaymentUS":    this.totalTaxPaymentUS,
                        "totalDeduction":       this.totalDeduction,
                        "totalBenefits":        this.totalBenefits,
                        "totalTaxBenefit":      this.totalTaxBenefit,
                        "payrollList":          payList,
                        "totalNetSalary":       this.totalNetSalary,
                        "status":               0,
                        "step":                 3, 
                    };
                    payrollHandler.createPayroll(data).then(response => {
                        this.showLoading = true
                        if (response.data.statusCode === 201) {
                            this.showLoading = false
                            this.$snotify.success('Success')
                            this.loadSuccess(response.data.statusCode)
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        loadSuccess(data){
            this.$emit('headline',data)
        }
    },
    mounted(){
        this.loadPayrollList()
    },
    watch: {
        loadPayrolls() {
            if (this.loadPayrolls !== undefined) {
                this.loadPayrollList()
            }
        },
    }
}
</script>
<style scoped>
    .grayBg{
        background-color: #f3f8ff;
    }
    .my_table_darkv .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: #222a35;
        color: #fff !important;
    }