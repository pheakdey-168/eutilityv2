<template>
    <v-row>
        <v-col sm="2" class="pr-2 pt-4">
            <label class="label mt-3">{{$t('for_the_month_of')}}</label>
        </v-col>
        <v-col sm="4" class="pl-0">
            <v-menu
                v-model="is_month"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width>
                <template v-slot:activator="{ on }">
                <v-text-field class="pt-0"
                    v-model="monthOf"
                    prepend-icon="event"
                    v-on="on"/>
                </template>
                <v-date-picker
                v-model="monthOf"
                type="month"
                no-title @input="is_month = false">
                </v-date-picker>
            </v-menu>
        </v-col>
        <v-row>
            <v-col sm="3" cols="12">
                <p>Download file format for import</p>
            </v-col>
            <v-col sm="3" cols="12">
                <v-btn color="greenSky" class="rounded-pill white--text float-right text-capitalize mr-5" >
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
            <v-col sm="12" cols="12">
                <kendo-datasource ref="dataSource"
                    :data="tableData"/>
                <kendo-grid id="grid" class="grid-function"
                    :data-source-ref="'dataSource'"
                    :editable="true"
                    :scrollable-virtual="true">
                    <kendo-grid-column
                        :field="'date'"
                        :title="$t('date')"
                        :template="'<span>#= kendo.toString(new Date(date), dateFormat)#</span>'"
                        :headerAttributes="{
                            style: 'background-color: #EDF1F5'
                        }"/>
                    <kendo-grid-column
                        :field="'employeeId'"
                        :title="$t('employee_id')"
                        :template="'<span>#= employeeId#</span>'"
                        :headerAttributes="{
                            style: 'background-color: #EDF1F5'
                        }"/>
                    <kendo-grid-column
                        :field="'employeeName'"
                        :title="$t('employee_name')"
                        :template="'<span>#= employeeName#</span>'"
                        :headerAttributes="{
                            style: 'background-color: #EDF1F5'
                        }"/>
                    <kendo-grid-column
                        :field="'timeTable'"
                        :title="$t('time_table')"
                        :template="'<span>#= timeTable#</span>'"
                        :headerAttributes="{
                            style: 'background-color: #EDF1F5'
                        }"/>
                    <kendo-grid-column
                        :field="'clockedIn'"
                        :title="$t('clocked_in')"
                        :template="'<span>#= kendo.toString(new Date(clockedIn), timeFormat)#</span>'"
                        :headerAttributes="{
                            style: 'background-color: #EDF1F5'
                        }"/>
                    <kendo-grid-column
                        :field="'clockedOut'"
                        :title="$t('clocked_out')"
                        :template="'<span>#= kendo.toString(new Date(clockedOut), timeFormat)#</span>'"
                        :headerAttributes="{
                            style: 'background-color: #EDF1F5'
                        }"/>
                    <kendo-grid-column
                        :field="'overTimeWeekend'"
                        :title="$t('over_time_weekend')"
                        :template="'<span>#= overTimeWeekend#</span>'"
                        :headerAttributes="{
                            style: 'background-color: #EDF1F5'
                        }"/>
                    <kendo-grid-column
                        :field="'overTimeHoliday'"
                        :title="$t('over_time_holiday')"
                        :template="'<span>#= overTimeHoliday#</span>'"
                        :headerAttributes="{
                            style: 'background-color: #EDF1F5'
                        }"/>
                    <kendo-grid-column
                        :field="'work_time'"
                        :title="$t('work_time')"
                        :template="'<span>#= workTime#</span>'"
                        :headerAttributes="{
                            style: 'background-color: #EDF1F5'
                        }"/>
                </kendo-grid>
            </v-col>
        </v-row>
    </v-row>
</template>
<script>
import UploadExcelComponent from '@/components/upload_excel/Timesheet.vue';
import kendo from "@progress/kendo-ui";
import TimeCardLine from "@/scripts/model/TimeCardLine";
import EmployeeModel from '@/scripts/model/Employee'
import TimeCard from "@/scripts/model/TimeCard";
const timeCardLineModel = new TimeCardLine({})
const employeeModel = new EmployeeModel({})
const timeCardModel = new TimeCard({})
const employeeHandler = require("@/scripts/employeeHandler")
const payrollHandler = require("@/scripts/payrollHandler")
export default {
    data: () =>({
        journal_date: "",
        dialogm: false,
        tableData: [],
        tableHeader: [],
        dateFormat: timeCardLineModel.dateFormat,
        timeFormat: timeCardLineModel.timeFormat,
        employeeData: [],
        is_month: false,
        monthOf: '',
        employee: employeeModel,
        timeCard: timeCardModel,
    }),
    components: {
        'upload-excel-component':UploadExcelComponent,
    },
    methods: {
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
        nextStpes(){
            this.autoCalculate()
            this.groupBy()
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        "id":                       this.timeCard.id ? this.timeCard.id : '',
                        "monthOf":                  this.monthOf,
                        "timeCardLine":             this.timeCardLine,
                        "totalWork":                this.totalWork,
                        "totalOverTimeWeekend":     this.totalOverTimeWeekend,
                        "totalOverTimeHoliday":     this.totalOverTimeHoliday
                    };
                    payrollHandler.createTimeCard(data).then(response => {
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
            let ds = this.$refs.dataSource.kendoWidget(),
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
            let ds = this.$refs.dataSource.kendoWidget();
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
                            lastResult[key].employeeUid  = em.id;
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
                    employeeHandler.center(this.search).then(res => {
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
    },
    mounted(){
        this.loadEmployee()
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