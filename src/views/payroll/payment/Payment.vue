<template>
    <v-row>
        <v-col cols="12" sm="12" class="py-0">
            <v-col sm="12" cols="12" class="py-0">
                <h2 class="mb-0 font_20">{{$t('payment')}}</h2>
                <v-dialog v-model="dialogm2" max-width="600px" eager>
                    <template v-slot:activator="{ on }">
                         <v-menu
                            nudge-bottom="4"
                            bottom
                            offset-y
                            origin="bottom top"
                            transition="scroll-y-reverse-transition">
                            <template v-slot:activator="{ on }">
                            <span class="hidden-sm-and-up">
                                <div class="dropdown_transactions">
                                    <v-icon v-on="on" left>mdi-attachment</v-icon>
                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                </div>
                            </span>
                                <span class="hidden-sm-and-down">
                                <v-btn color="third" v-on="on"
                                    class="dropdown_transactions white--text float-right text-capitalize">
                                    {{$t('create_new')}}
                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                </v-btn>
                            </span>
                            </template>
                            <v-list>
                                <v-list-item v-on="on" @click="addNewPayment">
                                    <v-list-item-title>{{$t('cash_payment')}}</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-on="on" @click="addNewPayment">
                                    <v-list-item-title>{{$t('bank_payment')}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                    <v-card>
                        <v-card-title>{{$t('Cash Payment')}}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                        <v-divider/>
                        <v-card-text style="height: 190px; background-color: #EDF1F5; color: #333;">
                            <v-form ref="form">
                                <v-row>
                                    <v-col style="line-height: 0px;" sm="6" cosl="12">
                                        <label>{{ $t('Employee') }}</label>
                                        <v-autocomplete
                                            v-model="employeeSelect"
                                            style="padding-top: 0px"
                                            :items="employees"
                                            item-value="id"
                                            :filter="employeeFilter"
                                            item-text="name"
                                            :search-input.sync="search"
                                            hide-no-data
                                            hide-selected
                                            placeholder="Start typing to Search"
                                            prepend-icon="mdi-database-search"
                                        />
                                    </v-col>
                                    <v-col style="line-height: 0px;" sm="6" cosl="12">
                                        <label>{{ $t('payslip') }}</label>
                                        <v-row class="my-3 mr-0">
                                            <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                <div style="line-height: 20px;" class="code_text text-bold">{{
                                                    prefix.abbr}}
                                                </div>
                                            </v-col>
                                            <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                                                <v-text-field class=" custom-border "
                                                    v-model="number"
                                                    outlined
                                                    :rules="[v => !!v || 'Number is required']"
                                                    required/>
                                            </v-col>
                                            <v-col sm="2" cols="2" class="pt-0 px-0">
                                                <v-icon color="black" size="30" class="border_qrcode"
                                                        @click="generateNumber">mdi-qrcode
                                                </v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col style="line-height: 0px;" sm="6" cosl="12">
                                        <label class="label">{{$t('for_the_month_of')}}</label>
                                        <v-menu
                                            v-model="is_month_search"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width>
                                            <template v-slot:activator="{ on }">
                                            <v-text-field class="pt-0"
                                                v-model="monthOfSearch"
                                                prepend-icon="event"
                                                v-on="on"/>
                                            </template>
                                            <v-date-picker
                                            v-model="monthOfSearch"
                                            @change="monthOfChang"
                                            type="month"
                                            no-title @input="is_month_search = false">
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col style="line-height: 0px;" sm="6" cosl="12">
                                        <label>{{ $t('payroll_number') }}</label>
                                        <v-select
                                            class=" my-2"
                                            outlined
                                            :items="payrolls"
                                            filter="true"
                                            item-value="id"
                                            item-text="referenceNumber"
                                            v-model="payrollSelected"
                                            :disabled="changMonthOf"
                                            @change="payrollNumberChang"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            tage="unitOfMeasureSelector"
                                        />
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        <v-card-text style="padding: 0px; height: 260px; background-color: #fff; color: #333;">
                            <template>
                                <v-simple-table class="attachment_table">
                                    <template v-slot:default>
                                        <tbody style="width: 100%">
                                            <tr>
                                                <td style="padding-left: 30px; height: 40px;"><span> Salary</span></td>
                                                <td style="text-align: right; height: 40px;">{{numberFormat(transaction.grossSalary)}}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding-left: 30px; height: 40px;"><span>Deduction</span></td>
                                                <td style="text-align: right; height: 40px;">{{numberFormat(transaction.deduction * -1)}}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding-left: 30px; height: 40px;"><span>Tax Salary</span></td>
                                                <td style="text-align: right; height: 40px;">{{numberFormat(transaction.taxSalaryUS * -1)}}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding-left: 30px; height: 40px;"><span>Benefit</span></td>
                                                <td style="text-align: right; height: 40px;">{{numberFormat(transaction.totalBenefit- transaction.taxAmountBenefit)}}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding-left: 30px; height: 40px;"><span>Net Salary</span></td>
                                                <td style="text-align: right; height: 40px;">{{numberFormat(transaction.netSalary +(transaction.totalBenefit- transaction.taxAmountBenefit))}}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td style="padding-left: 30px; height: 40px;"><span>Net Pay</span></td>
                                                <td style="text-align: right; height: 40px; padding: 0px">
                                                    <v-text-field class="mt-1"
                                                        type="number"
                                                        outlined
                                                        tage="Name"
                                                        v-model="amountPay"
                                                        placeholder=""/>
                                                    <!-- {{numberFormat(transaction.netPay + (transaction.totalBenefit- transaction.taxAmountBenefit))}} -->
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </template>
                                </v-simple-table>
                            </template>
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions class="pa-4">
                            <v-row>
                                <v-col sm="6" cols="6" class="py-0 text-left">
                                    <v-btn color="black" outlined class=" text-capitalize rounded-pill black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0 text-right">
                                    <v-btn color="secondary" class="px-3 rounded-pill white--text text-capitalize" @click="onSaveClose">{{$t('save_close')}}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
            <div class="reports_table">
                <kendo-datasource ref="dataSource"
                    :data="payments"/>
                    <kendo-grid id="grid" class="grid-function"
                        :data-source-ref="'dataSource'"
                        :editable="false"
                        :scrollable-virtual="true">
                    <kendo-grid-column
                        :width="150"
                        :field="'employees'"
                        :title="$t('employee')"
                        :template="'<span>#= employees.employeeName#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                        :attributes="{ style: 'text-align: center'}"/>
                    <kendo-grid-column
                        :width="200"
                        :field="'referenceNumber'"
                        :title="$t('reference_number')"
                        :template="'<span>#= referenceNumber#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                        :attributes="{ style: 'text-align: center'}"/>
                    <kendo-grid-column
                        :width="120"
                        :field="'monthOf'"
                        :title="$t('month_of')"
                        :template="'<span>#= monthOf#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="120"
                        :field="'netPay'"
                        :title="$t('net_pay')"
                        :template="'<span>#= kendo.toString(netPay,`c2`)#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="120"
                        :field="'amountPay'"
                        :title="$t('amount_pay')"
                        :template="'<span>#= kendo.toString(amountPay,`c2`)#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="120"
                        :field="'createdAt'"
                        :title="$t('date')"
                        :template="'<span>#= kendo.toString(new Date(createdAt), `yyyy-MM-dd` )#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="150"
                        :field="'method'"
                        :title="$t('method')"
                        :template="'<span>#= method #</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    </kendo-grid>
            </div>
        </v-col>
        <!-- <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/> -->
    </v-row>
</template>

<script>
    import kendo from "@progress/kendo-ui"
    const payrollHandler = require("@/scripts/payrollHandler")
    const employeeHandler = require("@/scripts/employeeHandler")
    const settingsHandler = require("@/scripts/settingsHandler")
    export default {
        name: "Payment",
        components: {
            // LoadingMe: () => import(`@/components/Loading`)
        },
        data: () => ({
            loading: false,
            search: null,
            select: null,
            showLoading: false,
            dialogm2: false,
            changMonthOf: true,
            payrolls: [],
            employees:[],
            items: [],
            is_month: false,
            is_month_search: false,
            monthOf: '',
            monthOfSearch: '',
            payrollSelected: '',
            cashAccountSelected: {},
            employeeSelect: '',
            payNumber: {},
            prefix:'',
            number: '',
            result:{},
            cashAccount:[{
                id: 'cash_payment',
                name: 'Cash Payment'
            },{
                id: 'bank_payment',
                name: 'Bank Payment'
            }],
            transaction: {
                grossSalary: 0,
                deduction: 0,
                taxSalaryUS: 0,
                totalBenefit: 0,
                netSalary:  0,
                taxAmountBenefit: 0,
                netPay: 0
            },
            amountPay: 0,
            payments: [],
        }),
        methods: {
            numberFormat(value){
                return kendo.toString( kendo.parseFloat(value),"c2")
            },
            monthOfChang(){
                let param =  {
                    'monthOf':      this.monthOfSearch + '-01',
                    'selectTime':   this.natureInputSelected,
                    'employee_id':  this.employeeSelect,
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getPayrollList(param).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.payrolls = res.data.data
                                this.changMonthOf = false
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            payrollNumberChang(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getTransaction(this.employeeSelect, this.payrollSelected).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                let result = res.data.data
                                this.transaction = result[0]
                                this.amountPay = this.transaction.netPay + (this.transaction.totalBenefit- this.transaction.taxAmountBenefit)
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
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
                            monthOf: '2021-01-01',
                            type: 'pay_slip',
                            pkId: 'psn-'
                        }
                        payrollHandler.getPrefixNumber(data).then(res => {
                            this.showLoading = true;
                            if(res.data.statusCode === 200){
                                const result = res.data.data
                                const lastNumber = this.zeroPad(parseInt(result.lastNumber), this.payNumber.format)
                                const number = result.suffix + this.payNumber.numberSeparator + lastNumber
                                this.lastNumber = lastNumber
                                this.number = number
                            }
                        })
                    }, 300);
                })
            },
            zeroPad(num, places) {
                return String(num).padStart(places, '0')
            },
            async loadEmployee(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        employeeHandler.center().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.employees = res.data.data
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            close() {
                this.dialogm2 = false
                this.payrollSelected = ''
                this.employeeSelect = ''
                this.monthOfSearch = ''
            },
            employeeFilter(item, queryText){
                const textOne = item.name.toLowerCase()
                const textTwo = item.employeeId.toLowerCase()
                const searchText = queryText.toLowerCase()
                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
            onSaveClose(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "payroll_id":           this.payrollSelected,
                            "monthOf":              this.monthOfSearch + '-01',
                            "employee_id":          this.employeeSelect,
                            "employees":            this.transaction,
                            "amountPay":            parseInt(this.amountPay),
                            "number":               this.number,
                            "payNumber":            this.payNumber,
                            "referenceNumber":      this.payNumber.abbr+this.payNumber.numberSeparator + this.number,
                            "type":                 "pay_slip",
                            "abbr":                 this.payNumber.abbr,
                            "netPay":               this.transaction.netPay,
                            "method":               "cash_payment",
                            "lastNumber":           this.lastNumber,
                        };
                        payrollHandler.createPayment(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Success')
                                this.close()        
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                            this.close()
                        })
                    }, 300);
                })
            },
            addNewPayment(){
                this.generateNumber()
            },
            loadPayment(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getPayment().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.payments = res.data.data
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            }
        },
        mounted() {
            this.loadEmployee()
            this.loadPrefixes()
            this.loadPayment()
        },
        computed: {
        },
        watch: {
            dialogm2(val) {
                val || this.close()
                this.loadPayment()
            },
            
        },
    };
</script>
<style scoped>
</style>