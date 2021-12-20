<template>
    <v-row>
        <v-col cols="12" class="pt-0">
            <v-row>
                <v-col sm="9" cols="12" class="pb-0">
                    <h3 class="text-uppercase">{{$t('finalize')}}</h3>
                    <p>{{$t('finalize_payroll_desc')}}</p>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" class="mt-1">
            <v-simple-table class="attachment_table">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>{{$t('sl_no')}} </th>
                            <th>{{$t('current_month')}} </th>
                            <th>{{$t('previous_month')}} </th>
                            <th>{{$t('variance')}} </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Month</td>
                            <td style="text-align: right;">{{ payrollFinal.monthOf }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Number of Employee</td>
                            <td style="text-align: right;">{{ payrollFinal.totalEmployee }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Total Gross Salary</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalGross)}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Total Deduction</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalDeduction)}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Total Benefits</td>
                            <td style="text-align: right;">{{ numberFormat(payrollFinal.totalBenefits) }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Total Tax Payment</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalTaxPaymentUS)}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Total Tax Benefit</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalTaxBenefit)}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Total Net Salary</td>
                            <td style="text-align: right;">{{ numberFormat(payrollFinal.totalNetSalary + payrollFinal.totalBenefits - payrollFinal.totalTaxBenefit)}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Total Net Pay</td>
                            <td style="text-align: right;">{{numberFormat(payrollFinal.totalNetPay + payrollFinal.totalBenefits - payrollFinal.totalTaxBenefit)}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Download Salary Register</td>
                            <td>Download Salary Register</td>
                            <td>
                                <v-btn width="160" color="third" @click="downloadPayslip"
                                    class="rounded-pill white--text float-right text-capitalize ml-5">
                                    {{ $t('download_payslip') }}
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
    </v-row>
</template>
<script>
    import kendo from "@progress/kendo-ui"
    import Helper from "@/helper.js";
    import {JournalModel,
    JournalEntryModel,
    AccountModel,
	CurrencyModel,} from "@/scripts/model/AppModels";
    import  jsPDF  from "jspdf";
    const $ = require("jquery")
    const { EntityType, } = require("@/scripts/default_setup/Collections");
    const settingsHandler = require("@/scripts/settingsHandler")
    const payrollHandler = require("@/scripts/payrollHandler")
    const accountHandler = require("@/scripts/accountHandler");
    const {journalHandler} = require("@/scripts/AppHandlers");
    export default {
        props:['loadPayrolls'],
        data: () =>({
            journal: new JournalModel(),
            journal_date: "",
            dialogm: false,
            showLoading: false,
            payrollFinal: {
                monthOf: '',
                totalEmployee: 0,
                totalGross: 0,
                totalDeduction: 0,
                totalBenefits: 0,
                totalTaxPaymentUS: 0,
                totalNetSalary: 0,
                totalNetPay: 0,
                totalTaxBenefit: 0,
            },
            account: {}
        }),
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
        methods:{
            numberFormat(value){
                return kendo.toString( kendo.parseFloat(value),"c2")
            },
            loadPayrollList(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true;
                        payrollHandler.getPayroll(this.$route.params.id).then(res => {
                            this.showLoading = true;
                            if(res.data.statusCode === 200){
                                this.showLoading = true;
                                const resultPay = res.data.data[0]
                                this.payrolls = resultPay.payrollList
                                this.payrollFinal = resultPay
                                window.console.log(this.payrollFinal,'payrollFinal')
                                this.result()
                                this.generateNumber()
                            }
                        })
                    }, 300);
                })
            },
            loadPrefixes() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        settingsHandler.getPrefixes().then(res => {
                            if (res.data.statusCode === 200) {
                                let result = res.data.data
                                this.prefixList = result.filter(p => p.type =='pay_slip')
                                this.prefix = this.prefixList[0]
                                this.payNumber = this.prefix
                            }
                        })
                    }, 300)
                })
            },
            generateNumber() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            abbr: this.payNumber.abbr,
                            structure: this.payNumber.structure,
                            date: this.payrollFinal.monthOf,
                            type: 'pay_slip',
                            pkId: 'psn-'
                        }
                        payrollHandler.getPrefixNumber(data).then(res => {
                            this.showLoading = true;
                            if(res.data.statusCode === 200){
                                this.showLoading = false;
                                const result = res.data.data
                                const lastNumber = this.zeroPad(parseInt(result.lastNumber), this.payNumber.format)
                                this.lastNumber = lastNumber
                                this.suffix  =   result.suffix
                            }
                        })
                    }, 300);
                })
            },
            zeroPad(num, places) {
                return String(num).padStart(places, '0')
            },
            result(){
                let dataResult =  this.payrolls
                let helper = {};
                let result = dataResult.reduce(function(r, o) {
                    let key = o.payrollLiabilitie.number + '-' + o.payrollLiabilitie.name;
                    if(!helper[key]) {
                        helper[key] = Object.assign({}, o); // create a copy of o
                        r.push(helper[key]);
                    } else {
                        helper[key].netSalary += o.netSalary;
                    }
                    return r;
                }, []);
                let payrollAccount = [];
                result.forEach(function(p){
                    payrollAccount.push(new JournalEntryModel({
                        'description': p.payrollLiabilitie.name,
                        'account': new AccountModel(p.payrollLiabilitie),
                        'amount':           p.netSalary * -1,
                        'currency': new CurrencyModel({
                            'code':     'USD',
                            'name':     'US Dollar',
                            'symbol':   '$'
                        }),
                    }))
                    
                })
                this.payrollAccount = payrollAccount
            },
            saveFinalize(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "id":                       this.$route.params.id,
                            "status":                   1, 
                            "final":                    'done',
                            "monthOf":                  this.payrollFinal.monthOf,
                            "payDate":                  this.payrollFinal.payDate,
                            "type":                     this.payrollFinal.type,
                            "currency":                 this.payrollFinal.currency,
                            "exchangeRate":             this.payrollFinal.exchangeRate,
                            "payrollReferenceNumber":   this.payrollFinal.referenceNumber,
                            "payrollList":              this.payrolls,
                            "lastNumber":               this.lastNumber,
                            "payslip":                  this.prefix,
                            "suffix":                   this.suffix
                        }; 
                        this.loadAccount()
                        payrollHandler.createPayroll(data).then(response => {
                            this.showLoading = true
                            if (response.data.statusCode === 201) {
                                this.saveJournal()
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
            },
            downloadPayslip(){
                var doc = new jsPDF();
                var specialElementHandlers = {
                    '#pdfPay': function(){
                    return true;
                    },
                    '.controls': function(){
                    return true;
                    }
                };
                doc.fromHTML($('.pdfPay').get(0), 15, 15, {
                    'width': 170, 
                    'elementHandlers': specialElementHandlers
                });

                doc.save('Generated.pdf');
            },
            saveJournal(){
                this.payrollFinal
                let payrollAcc =  this.payrollAccount
                let journals = []
                journals.push(
                    new JournalEntryModel({
                        'description':  'Salary Expence',
                        'account': new AccountModel(this.salaryExpence),
                        'currency': new CurrencyModel(this.payrollFinal.currency),
                        'amount':           this.payrollFinal.totalGross - this.payrollFinal.totalDeduction // dr,
                    }),
                    new JournalEntryModel({
                        'description': 'Salary Tax',
                        'account': new AccountModel(this.taxPayble),
                        'currency': new CurrencyModel(this.payrollFinal.currency),
                        'amount':           this.payrollFinal.totalTaxPaymentUS * -1 //cr,
                    }),
                    new JournalEntryModel({
                        'description': 'Benefit',
                        'account': new AccountModel(this.accountBenefit),
                        'currency': new CurrencyModel(this.payrollFinal.currency),
                        'amount':           this.payrollFinal.totalBenefits + this.payrollFinal.totalTaxBenefit // dr,
                    }),
                    new JournalEntryModel({
                        'description': 'Benefit Tax',
                        'account': new AccountModel(this.taxBenefit),
                        'currency': new CurrencyModel(this.payrollFinal.currency),
                        'amount':           this.payrollFinal.totalTaxBenefit * -1 // cr,
                    }),
                    new JournalEntryModel({
                        'description': 'Benefit Payble',
                        'account': new AccountModel(this.benefitPayble),
                        'currency': new CurrencyModel(this.payrollFinal.currency),
                        'amount':           this.payrollFinal.totalBenefits * -1 // cr,
                    }),
                )
                payrollAcc.forEach(function(pa){
                    journals.push(pa)
                })
                let data = new JournalModel({
                    'description':                  'Salary Expense',
                    'number':                       this.payrollFinal.referenceNumber,
                    'ref_number':                   '',
                    'currency_code':                '',  
                    'journal_date':                 Helper.toISODate(this.journal.journal_date),
                    'month_of':                     Helper.toISODate(new Date(this.payrollFinal.monthOf).toISOString().substr(0, 7)),//'2021-02-01',   
                    'journal_type':                 EntityType.GENERAL_JOURNAL,
                    'transaction_type':             EntityType.JOURNAL,
                    'referral_transaction_uuid':    this.payrollFinal.id,
                    'journal_entries':              journals,
                })
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        journalHandler.save(data).then(response => {
                            this.showLoading = true
                            if (response.status === 200) {
                                this.showLoading = false
                                this.$snotify.success('Success')
                                this.loadSuccess(response.data.statusCode)
                                window.history.go(-1)
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            loadAccount(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        accountHandler.getAll()
                        .then(res => {
                            if(res){
                                let acountList = res
                                let salaryExpence = acountList.filter(t => t.number == '634010');
                                this.salaryExpence = salaryExpence[0]

                                let taxPayble = acountList.filter(t => t.number == '221020');
                                this.taxPayble = taxPayble[0]

                                let accountBenefit = acountList.filter(t => t.number == '634020');
                                this.accountBenefit = accountBenefit[0]

                                let taxBenefit = acountList.filter(t => t.number == '221040');
                                this.taxBenefit = taxBenefit[0]

                                let benefitPayble = acountList.filter(t => t.number == '221040');
                                this.benefitPayble = benefitPayble[0]
                                
                                this.showLoading = false
                            }
                        })
                    }, 300);
                })
            },
        },
        async mounted(){
            await this.loadPayrollList()
            await this.loadAccount()
            await this.loadPrefixes()
        },
        watch: {
            loadPayrolls() {
                if (this.loadPayrolls !== undefined) {
                    this.loadPayrollList()
                    this.loadPrefixes()
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