<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('timesheet') }}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border" color="grayBg" height="92px">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('employee_name') }}</label>
                                        <v-text-field class="mt-1"
                                            outlined
                                            v-model="name"
                                            tage="Employee Name"
                                            required/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('business_unit_branch') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="location"
                                            item-text="name"
                                            item-value="id"
                                            v-model="locationSelected"
                                            tage="Business Unit/Branch"
                                            return-object/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{$t('for_the_month_of')}}</label>
                                        <month-picker :initialMonth="monthOf" @emitMonth="monthOf = $event"/>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card outlined dense class="no_border" color="white">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pt-3">
                                        <kendo-datasource ref="dataSource"
                                                          :data="timesheetList"
                                                          :change="onChanges"/>
                                        <kendo-grid id="gridTimesheetList" class="grid-function"
                                                    :data-source-ref="'dataSource'"
                                                    :editable="true"
                                                    :scrollable-virtual="true">
                                            <kendo-grid-column
                                                    :field="'no'"
                                                    :title="$t('no')"
                                                    :template="rowNumberTmpl"
                                                    :width="60"
                                                    :column-menu="false"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                                    :attributes="{style: 'text-align: center'}"/>
                                            <kendo-grid-column
                                                    :field="'date'"
                                                    :title="$t('date')"
                                                    :width="120"
                                                    :template="'<span>#= kendo.toString(new Date(date), `yyyy-MM-dd`)#</span>'"
                                                    :editor="TimesheetDateEditor"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                            <kendo-grid-column
                                                    :field="'checkIn'"
                                                    :title="$t('check_in')"
                                                    :width="120"
                                                    :template="'<span>#= kendo.toString(new Date(checkIn), `HH:mm tt`)#</span>'"
                                                    :editor="TimesheetCheckInEditor"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                            <kendo-grid-column
                                                    :field="'checkOut'"
                                                    :title="$t('check_out')"
                                                    :width="120"
                                                    :template="'<span>#= kendo.toString(new Date(checkOut), `HH:mm tt`)#</span>'"
                                                    :editor="TimesheetcheckOutEditor"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                            <kendo-grid-column
                                                    :field="'hours'"
                                                    :title="$t('hours')"
                                                    :width="100"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                    :field="'typeOFWork'"
                                                    :title="$t('type_of_work')"
                                                    :width="200"
                                                    :template="'<span>#=typeOFWork.name#</span>'"
                                                    :editor="typeOfWordDropDownEditor"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                    :field="'specificWork'"
                                                    :title="$t('specific_work')"
                                                    :width="150"
                                                    :template="'<span>#=specificWork.name ? specificWork.name: ``#</span>'"
                                                    :editor="spesificDropDownEditor"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                    :field="'engagement_project'"
                                                    :title="$t('engagement_project')"
                                                    :width="240"
                                                    :template="'<span>#=engagement_project.name ? engagement_project.name: ``#</span>'"
                                                    :editor="projectDropDownEditor"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="250"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                            <kendo-grid-column
                                                    :width="100"
                                                    :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                    :title="$t('action')"
                                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                        </kendo-grid>
                                        <v-btn color="greenText"
                                               class="float-left rounded-0 white--text mt-3"
                                               @click="addRow">
                                            <v-icon size="" class="ma-1">mdi mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn color="third" class="float-right white--text text-capitalize rounded-pill" @click="onSaveClose">
                                    {{$t('save')}}
                                </v-btn>
                                <v-btn color="black"  class="text-capitalize rounded-pill white--text float-left" @click="cancel">{{$t('cancel')}}</v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
    import Timesheet from "@/scripts/model/Timesheet";
    import TimesheetLine from "@/scripts/model/TimesheetLine";
    import kendo from "@progress/kendo-ui";
    const timesheetModel = new Timesheet({})
    const timesheetLineModel = new TimesheetLine({})
    const employeeHandler = require("@/scripts/employeeHandler")
    const locationHandler = require("@/scripts/locationHandler")
    const payrollHandler = require("@/scripts/payrollHandler")
    const projectHandler = require("@/scripts/projectHandler")
    const $ = require("jquery")
    export default {
        name: "AddTimesheet",
        props: ['id'],
        components: {
            LoadingMe: () => import(`@/components/Loading`),
            'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
        },
        data: () => ({
            showLoading: false,
            locationSelected: '',
            location:[],
            name:'',
            monthOf: '',
            timesheet: timesheetModel,
            timesheetLine: timesheetLineModel,
            date: new Date().toISOString().substr(0, 7),
            menu: false,
            modal: false,
            is_month: false,
            specificWork: {
                'name': ''
            },
            timesheetList: [
            ],
            engagement_project:{
                'name': ''
            },
        }),
        methods: {
            TimesheetDateEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDatePicker()
            },
            TimesheetCheckInEditor(container, options){
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoTimePicker()
            },
            TimesheetcheckOutEditor(container, options){
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoTimePicker()
            },
            onChanges(e){
                let dataRow = e.items[0]
                if (e.field === "typeOFWork") {
                    this.typeofworkclick = e.items[0].typeOFWork
                    this.loadSpecificByType()
                    
                }
                if(e.field === "checkIn"){
                    let cin = dataRow.checkIn
                    let cinM = cin.getTime()
                    this.CIN = cinM
                }
                if(e.field === "checkOut"){
                    let cOut = dataRow.checkOut
                    let cOutM = cOut.getTime()
                    this.COUT = cOutM
                }
                this.hours = parseFloat((this.COUT - this.CIN) / (1000 * 60 * 60));
                if(this.hours){
                    dataRow.set('hours',this.hours)
                }
                this.autoCalculate()
            },
            async loadSpecificByType(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getSpecificByType(this.typeofworkclick.id).then(res => {
                            this.spesificWork = res.data.data
                        })
                    }, 300);
                })
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
            async loadProject() {
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        projectHandler.list().then(res => {
                            if(res.data.statusCode === 200){
                                this.project = res.data.data
                            }
                        })
                    }, 300);
                })
            },
            rowNumberTmpl(dataItem) {
                var ds = this.$refs.dataSource.kendoWidget(),
                    index = ds.indexOf(dataItem);
                return index + 1;
            },
            addRow() {
                let ds = this.$refs.dataSource.kendoWidget(),
                    total = ds.total();
                ds.insert(total, {
                    date: new Date(),
                    hours: 0,
                    checkIn: new Date(),
                    checkOut: new Date(),
                    typeOFWork:{
                        name: ''
                    },
                    specificWork:{
                        name: ''
                    },
                    engagement_project: {
                        name: ''
                    },
                    description: '',
                });
            },
            removeRow(e) {
                e.preventDefault();
                const grid = $("#gridTimesheetList").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            async loadTypeOfWork() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getTypeOfWork().then(res => {
                            this.typeOFWork = res.data
                        })
                    }, 300);
                })
            },
            typeOfWordDropDownEditor(container, options) {
                $('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.typeOFWork,
                    })
                })
            },
            spesificDropDownEditor(container, options) {
                $('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                       data: this.spesificWork,
                    })
                })
            },
            projectDropDownEditor(container, options){
                $('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                       data: this.project,
                    })
                })
            },
            onSaveClose(){
                let ds = this.$refs.dataSource.kendoWidget()
                let timesheetData = ds.data()
                let timesheet_list = timesheetData.map(item => {
                    return {
                        date:                 item.date ? item.date: ``,
                        hours:                item.hours ? item.hours: 0,
                        checkIn:              item.checkIn ? item.checkIn: ``,
                        checkOut:             item.checkOut ? item.checkOut: '',
                        typeOFWork:           item.typeOFWork ? item.typeOFWork: {name: ''},
                        specificWork:         item.specificWork ?item.specificWork: {name: ''},
                        engagement_project:   item.engagement_project ? item.engagement_project: {name: ''},
                        description:          item.description ? item.description: ``
                    }
                });
                let totalHN = this.totaleHoursByNature;
                this.paid_hours              = totalHN.paid_hours? totalHN.paid_hours: 0;
                this.unpaid_hours            = totalHN.unpaid_hours? totalHN.unpaid_hours: 0;
                this.overtime_hours_weekend  = totalHN.overtime_hours_weekend? totalHN.overtime_hours_weekend:0;
                this.overtime_hours_holiday  = totalHN.overtime_hours_holiday? totalHN.overtime_hours_holiday: 0;
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "id":                       this.timesheet.id ? this.timesheet.id : '',
                            "employee":                 this.employee ? this.employee : {},
                            "monthOf":                  this.monthOf + '-01',
                            "location":                 this.locationSelected,
                            "timeSheetRecord":          timesheet_list,
                            "totalHours":               this.totalHours,
                            "totalHoursBytype":         this.totaleHoursByNature,
                            "paidHours":               this.paid_hours,
                            "unpaidHours":             this.unpaid_hours,
                            "overtimeHoursWeekend":   this.overtime_hours_weekend,
                            "overtimeHoursHoliday":   this.overtime_hours_holiday
                        }
                        employeeHandler.createTimesheet(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Success')
                                this.cancel()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            cancel(){
                this.timesheetList = ''
                this.monthOf = ''
                this.close()
            },
            close(){
                window.history.go(-1)
            },
            async initData() {
                if (this.$route.params.timesheet_id !== undefined) {
                    await this.loadSingleEmployee()
                }else {
                    let ds = this.$refs.dataSource.kendoWidget()
                    ds.data([])
                    this.addRow()
                }
            },
            async loadSingleEmployee() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        employeeHandler.get(this.$route.params.id).then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.employee = res.data.data[0]
                                if(this.employee){
                                    this.showLoading = false
                                    this.name = this.employee.employeeId +'-'+this.employee.firstName + ' ' + this.employee.lastName 
                                }
                            }
                        })
                        employeeHandler.getTimesheetSingle(this.$route.params.timesheet_id).then(res => {
                            this.showLoading = true
                            this.timesheetDS = res.data[0]
                            if(this.timesheetDS){
                                this.timesheet       = this.timesheetDS
                                this.locationSelected    = this.timesheetDS.location 
                                this.monthOf = kendo.toString(new Date(this.timesheetDS.monthOf),'yyyy-MM')
                                this.timesheetList = this.timesheetDS.timeSheetRecord
                            }  
                            this.showLoading = false             
                        })
                    }, 300);
                })
            },
            autoCalculate() {
                let ds = this.$refs.dataSource.kendoWidget(),
                    specificWorks = [],
                    totalHours = 0;
                    ds.data().forEach(value => {
                        totalHours += kendo.parseFloat(value.hours)
                        if(value.specificWork){
                            if (value.specificWork.hasOwnProperty('id')) {
                                specificWorks.push({
                                    name: value.specificWork.specificWork.nature.id,
                                    hour: value.hours,
                                    id: value.typeOFWork.id
                                })
                            }
                        }
                    })
                    this.totalHours  = totalHours
                    this.autoCalculateSpicificWork(specificWorks)
            },
            autoCalculateSpicificWork(works) {
            // return by a key
                const groupAll = list => list.reduce((works, item) => {
                    const totalHours = works[item.name] || 0
                    return Object.assign({}, works, {[item.name]: totalHours + parseFloat(item.hour)})
                }, {})
                this.totaleHoursByNature = groupAll(works)
            },
        },
        mounted: async function () {
            this.initData()
            this.loadLocation()
            this.loadTypeOfWork()
            this.loadSingleEmployee()
            await this.loadProject()
        },
        watch: {
            '$route': 'loadSingleEmployee'
        }
    }

</script>
<style scoped>
    .small_sidebar {
        height: 97%;
        position: relative;
        padding: 12px;
    }
    .hide_small_bar_class {
        max-width: 0;
        transition: .5s ease-in;
        flex: 0 0 0;
        padding: 0;
    }

    .hide_big_bar_class {
        max-width: 100%;
        transition: .5s ease-in;
        flex: 0 0 100%;
    }
    .iconArrow {
        right: -35px;
        position: absolute;
        bottom: -10px;
    }
    .iconArrowHide {
        position: absolute;
        right: -7px;
        bottom: -10px;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }
    .detial_smallside_p{
        position: absolute;
        bottom: 10px;
    }   
    .k-scrollbar .k-scrollbar-vertical .k-grid-header{
        width: 0px!important;
        padding-right: 16px!important;
        
    }
</style>