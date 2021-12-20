<template>
    <v-row>
        <v-col sm="3">
            <label>{{$t('business_unit_branch')}}</label>
             <v-select class="mt-1"
                outlined
                :items="location"
                item-text="name"
                item-value="id"
                v-model="locationSelected"
                tage="Business Unit/Branch"
                return-object/>
        </v-col>
        <v-col sm="3">
            <label class="label">{{$t('for_the_month_of')}}</label>
            <month-picker :initialMonth="monthOf" @emitMonth="monthOf = $event" @onChanged="monthOfChange"/>
        </v-col>
        <v-col sm="3">
            <label class="label">{{$t('Pay Date')}}</label>
            <date-picker :initialDate="date" @emitDate="date = $event"/>
        </v-col>
        <v-col sm="3">
            <p>{{$t('approved_exch_rate_month')}}</p>
            <h2 class="green--text">{{numberFormat(exchangeRate)}}</h2>
        </v-col>
        <v-col sm="3">
            <v-row class="my-3 mr-0">
                <v-col sm="3" cols="3" class="pt-0 pr-0">
                    <div class="code_text text-bold">{{
                        prefix.abbr}}
                    </div>
                </v-col>
                <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                    <v-text-field class=" custom-border "
                        v-model="number"
                        outlined
                        :rules="[v => !!v || 'Number is required']"
                        required
                        readonly/>
                </v-col>
                <v-col sm="2" cols="2" class="pt-0 px-0">
                    <v-icon color="black" size="30" class="border_qrcode"
                            @click="generateNumber">mdi-qrcode
                    </v-icon>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="8">
            <v-row>
                <v-col sm="4" cols="12">
                    <v-select class="mt-1"
                        id="acc_type_selector"
                        :items="natureInput"
                        item-text="name"
                        item-value="id"
                        v-model="natureInputSelected"
                        @change="ChangeNature"
                        outlined
                        clearable/>
                </v-col>
                <v-col sm="8" cols="12">
                    <v-btn color="third" @click="search()" class="rounded-pill white--text float-right text-capitalize">
                        {{$t('search')}}
                    </v-btn>
                    <v-row>
                        <v-dialog v-model="dialogm" max-width="1080px">
                        <template v-slot:activator="{ on }">
                            <!-- <v-card-text :class="{'setCardHeight': setCardHeight,'setCardHeightOther': !setCardHeight}"> -->
                                <!-- <div v-if="natureInputSelected === 'Timecard'" > -->
                                    <v-btn :disabled="btnEnabled"  color="green" class="rounded-pill white--text float-right text-capitalize mr-5" v-on="on">
                                        {{$t('import_timecard')}}
                                    </v-btn>
                                <!-- </div> -->
                            <!-- </v-card-text> -->
                        </template>
                        <v-card>
                            <v-card-title>{{$t('import_data')}}</v-card-title>
                            <v-icon class="btn_close" @click="dialogm = false">close</v-icon>
                            <v-card-text>
                                <v-row class="grayBg">
                                    <v-col sm="2" class="pr-2 pt-2">
                                        <label class="label mt-2">{{$t('location')}}</label>
                                    </v-col>
                                    <v-col sm="2" class="pl-0">
                                    <v-select class="mt-1"
                                        outlined
                                        :items="location"
                                        item-text="name"
                                        item-value="id"
                                        v-model="locationSelected"
                                        tage="Business Unit/Branch"
                                        return-object/>
                                    </v-col>
                                    <v-col sm="2" class="pr-2 pt-2">
                                        <label class="label mt-2">{{$t('segment')}}</label>
                                    </v-col>
                                    <v-col sm="2" class="pl-0">
                                        <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="segment"
                                        item-text="name"
                                        item-value="id"
                                        v-model="segmentSelected"
                                        outlined
                                        return-object/>
                                    </v-col>
                                    <v-col sm="2" class="pr-2 pt-2">
                                        <label class="label mt-3">{{$t('month_of')}}</label>
                                    </v-col>
                                    <v-col sm="2" class="pl-0">
                                        <month-picker :initialMonth="monthOf" @emitMonth="monthOf = $event"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="3" cols="12">
                                        <p>Download file format for import</p>
                                    </v-col>
                                    <v-col sm="3" cols="12">
                                        <v-btn color="greenSky" class="rounded-pill white--text float-right text-capitalize mr-5" @click="downloadTimeCard">
                                            {{$t('file_format')}}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="3" cols="12">
                                        <p>Or start importing if you are ready</p>
                                    </v-col>
                                    <v-col sm="3" cols="12">
                                        <v-col sm="12" cols="12" class="py-0">
                                            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                                        </v-col>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <kendo-datasource ref="dataSourceInput"
                                            :data="tableData"/>
                                        <kendo-grid id="gridTimecard" class="grid-function"
                                            :data-source-ref="'dataSourceInput'"
                                            :editable="false"
                                            :scrollable-virtual="true">
                                            <kendo-grid-column
                                                :field="'date'"
                                                :title="$t('date')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= kendo.toString(new Date(date),`yyyy-MM-dd`)#</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'employeeId'"
                                                :title="$t('employee_id')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= employeeId#</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'employeeName'"
                                                :title="$t('employee_name')"
                                                :width="120"
                                                :template="'<span>#= employeeName#</span>'"
                                                readonly
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'timeTable'"
                                                :title="$t('time_table')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= timeTable#</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'clockedIn'"
                                                :title="$t('clocked_in')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= kendo.toString(new Date(clockedIn), timeFormat)#</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'clockedOut'"
                                                :title="$t('clocked_out')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= kendo.toString(new Date(clockedOut), timeFormat)#</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'overTimeWeekend'"
                                                :title="$t('over_time_weekend')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= overTimeWeekend#</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'overTimeHoliday'"
                                                :title="$t('over_time_holiday')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= overTimeHoliday#</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                            <kendo-grid-column
                                                :field="'work_time'"
                                                :title="$t('work_time')"
                                                :width="120"
                                                readonly
                                                :template="'<span>#= workTime#</span>'"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'
                                                }"/>
                                        </kendo-grid>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="function_footer">
                                <v-btn class="btn_cancel float-left ml-4 mb-2" @click="dialogm = false">{{$t('cancel')}}</v-btn>
                                <v-btn color="greenSky" class="white--text float-right mr-4 mb-2" @click="onSaveClose">
                                    {{$t('confirm_report')}}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <kendo-datasource ref="dataSourceTimeCard"
                :data="timeCardLine"/>
            <kendo-grid id="gridInput" class="grid-function"
                :data-source-ref="'dataSourceTimeCard'"
                :editable="false"
                :scrollable-virtual="true"
                :column-menu="false">
                <kendo-grid-column
                    :field="'employeeId'"
                    :title="$t('employee_id')"
                    :template="'<span>#= employeeId#</span>'"
                    readonly
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'employeeName'"
                    :title="$t('employee_name')"
                    readonly
                    :template="'<span>#= employeeName#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'workDay'"
                    :title="$t('workDay')"
                    readonly
                    :template="'<span>#= workDay#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'workTime'"
                    :title="$t('workTime')"
                    readonly
                    :template="'<span>#= workTime#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'overTimeHoliday'"
                    :title="$t('over_time_holiday')"
                    readonly
                    :template="'<span>#= overTimeHoliday#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'overTimeWeekend'"
                    :title="$t('over_time_weekend')"
                    readonly
                    :template="'<span>#= overTimeWeekend#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'totalBenefit'"
                    :title="$t('total_benefit')"
                    :hidden="true"
                    :template="'<span>#= totalBenefit ? totalBenefit: 0#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'salary'"
                    :title="$t('salary')"
                    :hidden="true"
                    :template="'<span>#= salary#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'salaryType'"
                    :title="$t('salary_type')"
                    :hidden="true"
                    :template="'<span>#= salaryType#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'payrollLiabilitie'"
                    :title="$t('payroll_liabilitie')"
                    :hidden="true"
                    :template="'<span>#= payrollLiabilitie.name#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'paymentMethod'"
                    :title="$t('payment_method')"
                    :hidden="true"
                    :template="'<span>#= paymentMethod.name#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
            </kendo-grid>
        </v-col>
    </v-row>
</template>
<script>
import UploadExcelComponent from '@/components/upload_excel/Timesheet.vue';
import kendo from "@progress/kendo-ui";
import TimeCardLine from "@/scripts/model/TimeCardLine";
import EmployeeModel from '@/scripts/model/Employee'
import TimeCard from "@/scripts/model/TimeCard";
import PayrollRun from "@/scripts/model/PayrollRun";
const store = require("@/institute.js")
const {instituteId} = store.default.state.cookies
const instituteHandler = require("@/scripts/instituteHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const axios 	= require('axios');
const timeCardLineModel = new TimeCardLine({})
const employeeModel = new EmployeeModel({})
const timeCardModel = new TimeCard({})
const payrollRunModel = new PayrollRun({})
const employeeHandler = require("@/scripts/employeeHandler")
const payrollHandler = require("@/scripts/payrollHandler")
const locationHandler = require("@/scripts/locationHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const currencyType = {
    FUNCTIONAL_CURRENCY: 'fun-c',
    TRANSACTION_CURRENCY: 'txn-c',
    REPORTING_CURRENCY: 'rpt-c',
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}
export default {
    props:['loadPayrolls'],
    data: () =>({
        journal_date: "",
        dialogm: false,
        tableData: [],
        tableHeader: [],
        dateFormat: timeCardLineModel.dateFormat,
        timeFormat: timeCardLineModel.timeFormat,
        employeeData: [],
        monthOf: '',
        date: '',
        location: [],
        segment: [],
        employee: employeeModel,
        timeCard: timeCardModel,
        payrollRun: payrollRunModel,
        locationSelected: '',
        segmentSelected: '',
        setCardHeight: false,
        natureInput:[
            {name: 'Timesheet'},
            {name: 'Timecard'}
        ],
        timeCardLine: [],
        recordList: [],
        natureInputSelected:'Timesheet',
        number: '',
        prefix: '',
        payNumber: {},
        result: '',
        exchangeRate: {},
        btnEnabled: true
    }),
    components: {
        'upload-excel-component':UploadExcelComponent,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker'),
        'date-picker' : ()=> import('@/components/custom_templates/DatePickerComponent')
    },
    methods: {
        numberFormat(value){
            return kendo.toString( kendo.parseFloat(value.rate),`n2`)
        },
        returnData(data){
            this.$emit('returnData', data)
        },
        ChangeNature() {
            if (this.natureInputSelected === 'Timecard') {
                this.btnEnabled = false
            } else {
                this.btnEnabled = true
            }
        },
        monthOfChange(){
            this.generateNumber()
        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1
            if (isLt1M) {
                return true
            }
            this.$message({
                message: 'Please do not upload files larger than 1m in size.',
                type: 'warning'
            })
            return false
        },
        handleSuccess({ results, header }) {
            results.forEach(element => {
                var utc_days  = Math.floor(element.date - 25569);
                var utc_value = utc_days * 86400;                                        
                var date_info = new Date(utc_value * 1000);
                var fractional_day = element.date - Math.floor(element.date) + 0.0000001;
                var total_seconds = Math.floor(86400 * fractional_day);
                var seconds = total_seconds % 60;
                total_seconds -= seconds;
                var hours = Math.floor(total_seconds / (60 * 60));
                var minutes = Math.floor(total_seconds / 60) % 60;
                var current_datetime =  new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
                element.date    = current_datetime
                element.dateFormat = this.dateFormat


                var utc_days_time_in  = Math.floor(element.clockedIn - 25569);
                var utc_value_time_in = utc_days_time_in * 86400;                                        
                var date_info_time_in = new Date(utc_value_time_in * 1000);
                var fractional_time_in = element.clockedIn - Math.floor(element.clockedIn) + 0.0000001;
                var total_seconds_time_in = Math.floor(86400 * fractional_time_in);
                var seconds_time_in = total_seconds_time_in % 60;
                total_seconds_time_in -= seconds_time_in;
                var hours_time_in = Math.floor(total_seconds_time_in / (60 * 60));
                var minutes_time_in = Math.floor(total_seconds_time_in / 60) % 60;
                var current_time_in =  new Date(date_info_time_in.getFullYear(), date_info_time_in.getMonth(), date_info_time_in.getDate(), hours_time_in, minutes_time_in, seconds_time_in);
                element.clockedIn    = current_time_in

                var utc_days_time_out  = Math.floor(element.clockedOut - 25569);
                var utc_value_time_out = utc_days_time_out * 86400;                                        
                var date_info_time_out = new Date(utc_value_time_out * 1000);
                var fractional_time_out = element.clockedOut - Math.floor(element.clockedOut) + 0.0000001;
                var total_seconds_time_out = Math.floor(86400 * fractional_time_out);
                var seconds_time_out = total_seconds_time_out % 60;
                total_seconds_time_out -= seconds_time_out;
                var hours_time_out = Math.floor(total_seconds_time_out / (60 * 60));
                var minutes_time_out = Math.floor(total_seconds_time_out / 60) % 60;
                var current_time_out =  new Date(date_info_time_out.getFullYear(), date_info_time_out.getMonth(), date_info_time_out.getDate(), hours_time_out, minutes_time_out, seconds_time_out);
                element.clockedOut    = current_time_out
                element.timeFormat  = this.timeFormat
            });
            this.tableData = results
            this.tableHeader = header
        },
        onSaveClose(){
            this.autoCalculate()
            this.groupBy()
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let dataTimeCard = {
                        "id":                       this.timeCard.id ? this.timeCard.id : '',
                        "monthOf":                  kendo.toString(new Date(this.monthOf),'yyyy-MM-dd'),
                        "timeCardLine":             this.timeCardLine,
                        "totalWork":                this.totalWork,
                        "totalOverTimeWeekend":     this.totalOverTimeWeekend,
                        "totalOverTimeHoliday":     this.totalOverTimeHoliday,
                        "location":                 this.locationSelected,
                        "locationId":               this.locationSelected.id,
                        "segment":                  this.segmentSelected,
                        "segmentId":                this.segmentSelected.id,
                    };
                    payrollHandler.createTimeCard(dataTimeCard).then(response => {
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Success')
                            this.close()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        autoCalculate() {
            let ds = this.$refs.dataSourceInput.kendoWidget(),
            // specificWorks = [],
            totalWork = 0,
            totalOverTimeWeekend = 0,
            totalOverTimeHoliday = 0;
            ds.data().forEach(value => {
                totalWork += kendo.parseFloat(value.workTime)
                totalOverTimeWeekend += kendo.parseFloat(value.overTimeWeekend)
                totalOverTimeHoliday += kendo.parseFloat(value.overTimeHoliday)
            })
            this.totalWork              = totalWork
            this.totalOverTimeWeekend   = totalOverTimeWeekend
            this.totalOverTimeHoliday   = totalOverTimeHoliday
        },
        groupBy() {
            let ds = this.$refs.dataSourceInput.kendoWidget();
            let helper = {};
            let result = ds.data().reduce(function(r, o) {
                let key = o.date + '-' + o.employeeId;
                if(!helper[key]) {
                    helper[key] = Object.assign({}, o); // create a copy of o
                    r.push(helper[key]);
                } else {
                    helper[key].workTime += o.workTime;
                    helper[key].workDay = 1;
                }
                return r;
            }, []);
            let lastResult = {}
            let employees = this.employees
            let last_result = result.reduce(function(m, n) {
                let key = n.employeeId
                if(!lastResult[key]) {
                    lastResult[key] = Object.assign({}, n); // create a copy of o
                    m.push(lastResult[key]);
                } else {
                    employees.forEach(function(em) {
                        if(key == em.employeeId){
                            lastResult[key].workTime += n.workTime;
                            lastResult[key].workDay += n.workDay;
                            lastResult[key].employeeUuid  = em.id;
                        }
                    });
                }
                return m;
            }, []);
            this.timeCardLine = last_result;
        },
        async loadEmployee(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employees = []
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
            this.dialogm = false
        },
        async loadLocation() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    locationHandler.list().then(res => {
                        if(res.data.statusCode === 200){
                            this.location = res.data.data
                        }
                        
                    })
                }, 300);
            })
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    settingsHandler.getSeg().then(res => {
                        if(res.data.statusCode === 200){
                            this.segment = res.data.data        
                        }
                    })
                }, 300);
            })
        },
        search(){
            let param =  {
                'monthOf':      kendo.toString( new Date(this.monthOf),'yyyy-MM-dd'),
                'selectTime':   this.natureInputSelected
                }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getTimeCard(param).then(res => {
                        if(res.data.statusCode === 200){
                            let result = res.data.data;
                            if(result[0].timeCardLine){
                                let result_timecard = result[0].timeCardLine;
                                let result_record = this.recordList;
                                let timeCardList = [];
                                result_timecard.forEach(function(tc) {
                                    let time_employeeId = tc.employeeId;
                                    let totalBenefit = 0;
                                    let deduction = 0;
                                    let netPay = 0;
                                    const re =  result_record.filter(m => m.employeeId ===  time_employeeId).map(item =>{
                                        item.benefit.forEach(function(b){
                                            if(b.amount){
                                                totalBenefit += parseFloat(b.amount)
                                            }
                                        }) 
                                        let payrollLiabilitie =  item.employee.payrollLiabilitie
                                        return {
                                            employeeUuid:               item.employee.id ? item.employee.id: '',
                                            salary:                     parseFloat(item.salary),
                                            employeeId:                 tc.employeeId,
                                            bank:                       item.employee.bank ,
                                            bankAccount:                item.employee.bankAccount,
                                            employeeName:               tc.employeeName,
                                            natureEmployee:             item.employee.natureEmployee,
                                            payrollLiabilitie:          payrollLiabilitie,
                                            paymentMethod:              item.employee.paymentMethod,
                                            overTimeHoliday:            tc.overTimeHoliday,
                                            overTimeWeekend:            tc.overTimeWeekend,
                                            workDay:                    tc.workDay,
                                            workTime:                   tc.workTime,
                                            totalBenefit:               parseFloat(totalBenefit) ,
                                            location:                   item.location,
                                            salaryType:                 item.salaryType.name,
                                            startingTime:               item.startingTime,
                                            position:                   item.position,
                                            natureContract:             item.natureContract,
                                            earning:                    parseFloat(item.salary) + parseFloat(totalBenefit),
                                            deduction:                  deduction,
                                            netPay:                     netPay,
                                        }
                                    })
                                    if(re.length >0){
                                        timeCardList.push(re[0])
                                    }
                                });
                                this.timeCardLine = timeCardList
                            }else{
                                let result_record = this.recordList;
                                let timesheet = []
                                result.forEach(function(tc) {
                                    let time_employee_id = tc.employee.id;
                                    let totalBenefit = 0;
                                    let deduction = 0;
                                    let netPay = 0;
                                    const re =  result_record.filter(m => m.employee_id ===  time_employee_id).map(item =>{
                                        item.benefit.forEach(function(b){
                                            if(b.amount){
                                                totalBenefit += parseFloat(b.amount)
                                            }
                                        })  
                                        return {
                                            employeeUuid:        tc.employee.id,
                                            salary:             parseFloat(item.salary),
                                            employeeId:         tc.employee.employeeId,
                                            payrollLiabilitie:  tc.employee.payrollLiabilitie,
                                            bank:               tc.employee.bank,
                                            bankAccount:        tc.employee.bankAccount,
                                            paymentMethod:      tc.employee.paymentMethod,
                                            natureEmployee:     tc.employee.natureEmployee,
                                            employeeName:       tc.employee.firstName +' '+   tc.employee.lastName,
                                            overTimeHoliday:    tc.overtimeHoursHoliday,
                                            overTimeWeekend:    tc.overtimeHoursWeekend,
                                            workDay:            tc.totalHours/8,
                                            workTime:           tc.totalHours,
                                            totalBenefit:       parseFloat(totalBenefit),
                                            location:           item.location,
                                            salaryType:         item.salaryType.name,
                                            startingTime:       item.startingTime,
                                            position:           item.position,
                                            natureContract:     item.natureContract,
                                            earning:            parseFloat(item.salary) + parseFloat(totalBenefit),
                                            deduction:          deduction,
                                            netPay:             netPay,
                                        }
                                    })
                                    if(re.length > 0){
                                        timesheet.push(re[0])
                                    }
                                })
                                this.timeCardLine = timesheet
                            }
                        }
                    })
                }, 300);
            })
        },
        async loadRecord(){
            let param ={
                'status': 1
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    employeeHandler.getRecord(param).then(res => {
                        if(res.data.statusCode === 200){
                            this.recordList = res.data.data
                        }
                    })
                }, 300);
            })
        },
        saveNext(){
            let ds = this.$refs.dataSourceTimeCard.kendoWidget()
            let totalEmployee = 0;
            ds.data().forEach(value => {
                if(value){
                    totalEmployee += 1
                }
            })
            this.totalEmployee = totalEmployee
            this.payrollList = ds.data();
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = new PayrollRun({
                        "id":                   this.$route.params.id,
                        "location":             this.locationSelected,
                        "monthOf":              kendo.toString(new Date(this.monthOf),'yyyy-MM-dd'),
                        "totalEmployee":        this.totalEmployee,
                        "currency":             this.baseCurrency,
                        "exchangeRate":         this.exchangeRate,
                        "payDate":              kendo.toString(new Date(this.date),'yyyy-MM-dd'),
                        "payNumber":            this.payNumber,
                        "number":               this.number,
                        "lastNumber":           this.lastNumber,
                        "abbr":                 this.payNumber.abbr,
                        "type":                 'payroll',
                        "referenceNumber":      this.payNumber.abbr+this.payNumber.numberSeparator + this.number,
                        "payrollList":          this.payrollList,
                        "step":                 1,          
                    });
                    payrollHandler.createPayroll(data).then(response => {
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Success')
                            this.loadSuccess(response.data.statusCode)
                            this.close()
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
        loadPayrollList(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getPayroll(this.$route.params.id).then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            this.showLoading = false;
                            const resultPay = res.data.data[0]
                            this.result = resultPay
                            this.timeCardLine = resultPay.payrollList
                            if(resultPay.monthOf){
                                this.monthOf = kendo.toString(new Date(resultPay.monthOf), "yyyy-MM")
                            }
                            this.locationSelected = resultPay.location
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
                            this.prefixList = result.filter(p => p.type =='payroll')
                            this.prefix = this.prefixList[0]
                            this.payNumber = this.prefix
                        }
                    })
                }, 300)
            })
        },
        generateNumber() {
            let resultNumber = this.result
            let montOf_format = kendo.toString(new Date(this.monthOf),'yyyy-MM-dd');
            if(montOf_format == ""){
                let month_year = kendo.toString(new Date(),'yyyy-MM-dd')
                montOf_format = month_year.setDate(1)
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        abbr: this.payNumber.abbr,
                        structure: this.payNumber.structure,
                        date: montOf_format,
                        type: 'payroll',
                        pkId: 'par-'
                    }
                    payrollHandler.getPrefixNumber(data).then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            const result = res.data.data
                            const lastNumber = this.zeroPad(parseInt(result.lastNumber), this.payNumber.format)
                            const number = result.suffix + this.payNumber.numberSeparator + lastNumber
                            this.lastNumber = lastNumber
                            if(resultNumber.number){
                                this.number = this.result.number
                            }else{
                                this.number = number
                            }
                        }
                    })
                }, 300);
            })
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        downloadTimeCard(){
            axios.get('https://s3-ap-southeast-1.amazonaws.com/images.banhji/files/Timecard+.xlsx', {
            // If you forget this, your download will be corrupt.
                responseType: 'blob'
            }).then((response) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                link.setAttribute('download', 'Timecard.xlsx');
                document.body.appendChild(link);
                link.click();
            }); 
        },
        async loadBaseCurrency() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(instituteId).then(res => {
                        this.baseCurrency = res.baseCurrency
                    })
                    resolve('resolved');
                }, 200);
            });
        },
        async loadLastExchangeRate(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let date = new Date().toISOString().substr(0, 10)
                    let code = 'KHR'
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.exchangeRate = res.data.data[0]
                            }
                        })
                    }

                }, 300)
            })
        },
        async loadCurrencyData(type) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    currencyHandler.list(type).then(response => {
                        if (response.data.statusCode === 200) {
                            if (type === currencyType.FUNCTIONAL_CURRENCY) {
                                this.funcCurrencyList = response.data.data
                            } else if (type === currencyType.TRANSACTION_CURRENCY) {
                                this.currencyList = response.data.data
                            }
                            this.showLoading = false
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
    },
    mounted() {
        this.loadEmployee()
        this.loadLocation()
        this.loadSegment()
        this.loadRecord()
        this.loadPrefixes()
        this.loadBaseCurrency()
        this.loadLastExchangeRate()
        this.loadCurrencyData(currencyType.TRANSACTION_CURRENCY)
    },
    watch: {
        loadPayrolls(){
            if (this.loadPayrolls !== undefined) {
                this.loadPayrollList()
                this.loadLastExchangeRate()
            }
        }
    },
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