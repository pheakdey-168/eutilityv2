<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="8" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('payroll_summary')}}</h2>
                        </v-col>
                        <v-col sm="4" cols="12" class="py-0">
                            <dropdownlist 
                                :data-items='employees'
                                :text-field="'name'"
                                :text-value="'id'"
                                :filterable="true"
                                :default-item="defaultItem"
                                @open="loadEmployee"
                                @filterchange="filterChange"
                                :loading="loading"
                                v-model="employeeSelected"
                            ></dropdownlist>
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
                        <v-col sm="2" cols="1" class="py-1" @click="onSearch">
                            <v-btn color="third white--text text-capitalize">
                                {{$t('search')}}
                            </v-btn>
                        </v-col>
                
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource ref="dataSource"
                        :data="payrolls"
                        :page-size='100'
                        :sort="sort"/>
                        <kendo-grid id="grid" class="grid-function"
                            :data-source-ref="'dataSource'"
                            :editable="false"
                            :pageable="true"
                            :pageable-refresh="true"
                            :column-menu="true">
                            <kendo-grid-column
                                :locked="true"
                                :width="200"
                                :field="'employeeName'"
                                :title="$t('employee_name')"
                                :template="'<span>#= employeeName#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :locked="true"
                                :width="130"
                                :field="'employeeId'"
                                :title="$t('employee_id')"
                                :hidden="true"
                                :template="'<span>#= employeeId#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :width="120"
                                :field="'salary'"
                                :title="$t('salary')"
                                :template="'<span>#= kendo.toString(salary,`n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                :attributes="{style: 'text-align: right;'}"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'overTimePay'"
                                :title="$t('overtime_pay')"
                                :template="'<span>#= kendo.toString(overTimePay,`n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                :attributes="{style: 'text-align: right;'}"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'Benefit'"
                                :title="$t('fringe_benefit')"
                                :template="'<span>#= kendo.toString(totalBenefit,`n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                :attributes="{style: 'text-align: right;'}"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'grossSalary'"
                                :title="$t('gross_pay')"
                                :template="'<span>#= kendo.toString(grossSalary, `n2`) #</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                :attributes="{style: 'text-align: right;'}"/>
                            <kendo-grid-column
                                :width="120"
                                :field="'taxSalaryUS'"
                                :title="$t('salary_tax')"
                                :template="'<span>#= kendo.toString(taxSalaryUS, `n2`) #</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                :attributes="{style: 'text-align: right;'}"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'taxAmountBenefit'"
                                :title="$t('benefit_tax')"
                                :template="'<span>#= kendo.toString(taxAmountBenefit, `n2`) #</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                :attributes="{style: 'text-align: right;'}"/>
                            <kendo-grid-column
                                :width="120"
                                :field="'deduction'"
                                :title="$t('deduction')"
                                :template="'<span>#= kendo.toString(deduction, `n2`) #</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                :attributes="{style: 'text-align: right;'}"/>
                            <kendo-grid-column
                                :width="120"
                                :field="'netPay'"
                                :title="$t('net_pay')"
                                :template="'<span>#= kendo.toString(netPay,`n2`) #</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                :attributes="{style: 'text-align: right;'}"/>
                        </kendo-grid>
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
import { DropDownList } from '@progress/kendo-vue-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
const payrollHandler = require("@/scripts/payrollHandler")
const employeeHandler = require("@/scripts/employeeHandler")
export default {
    data: () => ({
        showLoading: false,
        loading: false,
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",
        payrolls: [],
         search:{
            start_date: "",
            end_date: "",
            employeeUid: ""
        },
        sort:[
            { field: 'referenceNumber', dir: 'asc' }
        ],
        employees: [],
        employeeSelected: {
            'name': '',
            'id': ''
        },
        defaultItem:{
            'name': 'Select Employee....',
            'id': ''
        }
    }),
    props: {},
    methods: {
        loadPayrollDetail(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    payrollHandler.getPayrollEmployee(this.search).then(res => {
                        // this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.payrolls = res.data.data
                            window.console.log(this.payrolls, 99)
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        dataFormat(value){
            return  kendo.toString(new Date(value), "y")
        },
        onSearch(){
            let start_date = this.start_date
            let end_date = this.end_date
            if(end_date && end_date){
                this.search = {
                    'start_date': kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    'end_date': kendo.toString(new Date(end_date),'yyyy-MM-dd'),
                    'employeeUid': this.employeeSelected.id
                }
                this.loadPayrollDetail()
            }else{
                this.search = {
                    'start_date': '',
                    'end_date': '',
                    'employeeUid': this.employeeSelected.id
                }
                this.loadPayrollDetail()
            }

        },
        loadEmployee(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employees = []
                    employeeHandler.center().then(res => {
                        this.loading = false
                        if (res.data.statusCode === 200) {
                            this.loading = false
                            this.employees = res.data.data
                        }
                    }).catch()
                    {
                        this.loading = false
                    }
                }, 300)
            })
        },
        filterChange (event) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                 this.employees = this.filterData(event.filter);
                this.loading = false;
            }, 300);
    
            this.loading = true;
        },
        filterData(filter) {
            let employees = this.employees
            const data = employees.slice();
            return filterBy(data, filter);
        }
    },
    async mounted() {
        await this.loadPayrollDetail()
    },
    computed: {},
    components: {
        'dropdownlist': DropDownList,
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
</style>
