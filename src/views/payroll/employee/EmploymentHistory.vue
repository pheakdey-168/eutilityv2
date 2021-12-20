<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('employment_history') }}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border" color="grayBg" height="173px">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('employee_name') }}</label>
                                        <v-text-field class="mt-1"
                                            outlined
                                            v-model="name"
                                            tage="Employee Name"
                                            required/>
                                        <label class="label">{{ $t('nature_of_the_record') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="natureRecord"
                                            item-text="name"
                                            item-value="id"
                                            v-model="natureRecordSelected"
                                            tage="Nature of the Record"
                                            return-object/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{$t('date')}}</label>
                                        <app-datepicker :initialDate="recordDate"
                                            @emitDate="recordDate = $event"/>
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
                                        <label class="label">{{ $t('nature_of_the_contract') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="natureContract"
                                            item-text="name"
                                            item-value="id"
                                            v-model="natureContractSelected"
                                            tage="Nature of the Contract"
                                            return-object/>

                                        <label class="label">{{ $t('position') }}</label>
                                        <v-select class="mt-1"
                                                  outlined
                                                  :items="position"
                                                  item-text="name"
                                                  item-value="id"
                                                  v-model="positionSelected"
                                                  tage="Position"
                                                  return-object/>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-card outlined dense class="px-3" color="white">
                                <v-row>
                                    <v-col class="pb-0" sm="3" cols="12">
                                        <v-row class="border_grey">
                                            <v-col sm="12" cols="12" class="my_box_min_heihgt pa-0">
                                                <h2 class="mb-2 font_20 ">
                                                    {{ $t("salary_information") }}
                                                </h2>
                                                <p class="mb-3">{{$t('salary_information_desc')}}</p>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <label class="label">{{ $t('salary_type') }}</label>
                                                         <v-select class="mt-1"
                                                            outlined
                                                            :items="salaryType"
                                                            item-text="name"
                                                            item-value="id"
                                                            v-model="salaryTypeSelected"
                                                            tage="Salary Type"
                                                            return-object/>
                                                        <label class="label mb-0">{{ $t('salary') }}</label>
                                                        <v-text-field class="mt-1"
                                                            outlined
                                                            v-model="employmentRecord.salary"/>
                                                        <label class="label mb-0">{{ $t('nature') }}</label>
                                                        <v-select class="mt-1"
                                                            outlined
                                                            :items="natureSalary"
                                                            item-text="name"
                                                            item-value="id"
                                                            v-model="natureSalarySelected"
                                                            tage="Nature Of Salary"
                                                            return-object/>
                                                        <label class="label mb-0">{{ $t('salary_currency') }}</label>
                                                        <v-select
                                                            class=" my-2"
                                                            :items="currencyList"
                                                            item-value="id"
                                                            item-text="name"
                                                            v-model="currencySelected"
                                                            outlined
                                                            return-object
                                                            tage="currencySelector"
                                                            :rules="[v => !!v || $t('field_is_required')]"
                                                            clearable/>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col class="pb-0" sm="5" cols="12">
                                        <v-row class="border_grey">
                                            <v-col sm="12" cols="12" class="py-0">
                                                <h2 class="mb-2 font_20 ">
                                                    {{ $t("employee_benefits") }}
                                                </h2>
                                                <p class="mb-3">{{ $t("employee_benefits") }}</p>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <kendo-datasource ref="dataSource"
                                                                      :data="BenefiteList"/>
                                                        <kendo-grid id="grid" class="grid-function"
                                                                    :data-source-ref="'dataSource'"
                                                                    :editable="true"
                                                                    :scrollable-virtual="true">
                                                            <kendo-grid-column
                                                                :field="'no'"
                                                                :title="$t('no')"
                                                                :template="rowNumberTmpl"
                                                                :width="45"
                                                                :column-menu="false"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                                                :attributes="{style: 'text-align: center'}"/>
                                                            <kendo-grid-column
                                                                :field="'component'"
                                                                :title="$t('benefits')"
                                                                :width="150"
                                                                :template="'<span>#=component.name#</span>'"
                                                                :editor="benefitDropDownEditor"
                                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                            <kendo-grid-column
                                                                :field="'amount'"
                                                                :title="$t('amount')"
                                                                :width="100"
                                                                :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
                                                        </kendo-grid>
                                                        <v-btn color="greenText"
                                                                class="float-left rounded-0 white--text mt-3"
                                                                @click="addRow">
                                                            <v-icon size="" class="ma-1">mdi mdi-plus</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col class="pb-0" sm="4" cols="12">
                                        <v-row class="border_grey">
                                            <v-col sm="12" cols="12" class="py-0">
                                                <h2 class="mb-2 font_20 ">
                                                    {{ $t("attachment") }}
                                                </h2>
                                                <p class="mb-3">{{$t('related_document_to')}}</p>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <v-file-input
                                                            accept="image/*"
                                                            label="Attachment"
                                                        />
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="6" cols="12" style="height: 50px;">
                                                        <label class="label">{{$t('workday_start_on')}}</label>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" style="height: 50px; padding: 0px;">
                                                        <v-select
                                                            outlined
                                                            :items="workDay"
                                                            item-text="name"
                                                            item-value="id"
                                                            tage="Workday Start on"
                                                            v-model="workDaySelected"
                                                            return-object/>
                                                    </v-col>
                                                   <v-col sm="6" cols="12" style="height: 50px;">
                                                        <label class="label">{{$t('starting_time')}}</label>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" style="height: 50px; padding: 0px;">
                                                        <v-select
                                                            outlined
                                                            :items="startingTime"
                                                            item-text="name"
                                                            item-value="id"
                                                            v-model="startingTimeSelected"
                                                            tage="Starting time"/>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" style="height: 50px;">
                                                        <label class="label">{{$t('applying_overtime')}}</label>
                                                    </v-col>
                                                    <v-col sm="3" cols="6" style="height: 50px; padding: 0; margin-top: -10px">
                                                        <v-checkbox
                                                            v-model="applyOvertime">
                                                        </v-checkbox>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider />
                            <v-card outlined dense class="no_border function_footer">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn  outlined class="mr-2 text-capitalize rounded-pill black--text float-left" v-on="on">
                                            {{$t('select_template')}}
                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item v-for="(item, index) in templates" :key="index">
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-btn color="black"  class="text-capitalize rounded-pill white--text float-left" @click="cancel">{{$t('cancel')}}</v-btn>
                                <v-btn color="third" class="float-right white--text text-capitalize rounded-pill" @click="onSaveClose">
                                    {{$t('save_print')}}
                                </v-btn>
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
    import EmploymentRecord from "@/scripts/model/EmploymentRecord";
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent';
    import kendo from "@progress/kendo-ui";
    const currencyHandler = require("@/scripts/currency/handler/currencyHandler")        
    const locationHandler = require("@/scripts/locationHandler")
    const payrollHandler  = require('@/scripts/payrollHandler')
    const employeeHandler = require("@/scripts/employeeHandler")
    const employmentModel = new EmploymentRecord({})
    const $ = require("jquery")
    export default {
        name: "AddEmploymentRecord",
        props: ['id'],
        components: {
            LoadingMe: () => import(`@/components/Loading`),
            'app-datepicker': DatePickerComponent,
        },
        data: () => ({
            templates: [],
            showLoading: false,
            compeletLoading: false,
            position: [],
            location: [],
            recordDate: kendo.toString(new Date(), 'yyyy-MM-dd'),
            employee: {},
            employment_id:'', 
            employmentRecord: employmentModel,
            applyOvertime: false,
            BenefiteList:[],
            componentType: [],
            locationSelected: '',
            segmentSelected: '',
            natureRecordSelected: '',
            natureContractSelected: '',
            currencySelected:   {},
            workDaySelected:'',
            positionSelected: '',
            salaryTypeSelected: '',
            natureSalarySelected: '',
            startingTimeSelected: '',
            name: '',
            currencyList: [],
            salaryType:[
                {id: "hourly", name: "Hourly"},
                {id: "monthly", name: "Monthly"}
            ],
            natureSalary:[
                {id: "gross_amount", name: "Gross Amount"},
                {id: "net_amount", name: "Net Amount"}
            ],
            natureContract:[
                {id: "fixed_duration_contract", name: "Fixed Duration Contract"},
                {id: "undetermined_duration_contract", name: "Undetermined Duration Contract"},
                {id: "contractd", name: "Contracted"}
            ],
            natureRecord:[
                {id: "new_employment", name: "New Employment"},
                {id: "promotion", name: "Promotion"},
                {id: "salary_increase", name: "Salary Increase"},
                {id: "resignatio", name: "Resigntion"}
            ],
            workDay:[
                {id: "1", name: "Monday"},
                {id: "2", name: "Tursday"},
                {id: "3", name: "Wednesday"},
                {id: "4", name: "Thursday"},
                {id: "5", name: "Friday"},
                {id: "6", name: "Saturday"},
                {id: "7", name: "Sunday"}
            ],
            startingTime:[
                {id: 1, name: "1:00"},
                {id: 2, name: "2:00"},
                {id: 3, name: "3:00"},
                {id: 4, name: "4:00"},
                {id: 5, name: "5:00"},
                {id: 6, name: "6:00"},
                {id: 7, name: "7:00"},
                {id: 8, name: "8:00"},
                {id: 9, name: "9:00"},
                {id: 10, name: "10:00"},
                {id: 11, name: "11:00"},
                {id: 12, name: "12:00"},
                {id: 13, name: "13:00"},
                {id: 14, name: "14:00"},
                {id: 15, name: "15:00"},
                {id: 16, name: "16:00"},
                {id: 17, name: "17:00"},
                {id: 18, name: "18:00"},
                {id: 19, name: "19:00"},
                {id: 20, name: "20:00"},
                {id: 21, name: "21:00"},
                {id: 22, name: "22:00"},
                {id: 23, name: "23:00"},
                {id: 24, name: "24:00"},
            ]
        }),
        methods: {
            rowNumberTmpl(dataItem) {
                var ds = this.$refs.dataSource.kendoWidget(),
                    index = ds.indexOf(dataItem);
                return index + 1;
            },
            addRow() {
                let ds = this.$refs.dataSource.kendoWidget(),
                    total = ds.total();
                ds.insert(total, {
                    component: {
                        name: "-- Select --"
                    }
                })
            },
            async loadCurrency() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        currencyHandler.getAll().then(res => {
                            this.currencyList = res
                        })
                    }, 300)
                })
            },
            async loadPosition(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getPosition().then(res => {
                            this.position = res
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
            async loadComponent() {
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getComponent().then(res => {
                            this.componentType = res.data.data.filter(m => m.compoType.name === 'Benefits')
                        })
                    }, 300);
                })
            },
            benefitDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
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
                        data: this.componentType,
                    })
                })
            },
            async onSaveClose() {
                // if (!this.$refs.form.validate()) {
                //     this.$refs.form.validate()
                //     return
                // }
                let ds = this.$refs.dataSource.kendoWidget()
                this.benefit = ds.data();
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "id":               this.employmentRecord.id ? this.employmentRecord.id : '',
                            "employee":         this.employee ? this.employee : {},
                            "date":             this.recordDate,
                            "location":         this.locationSelected,
                            "natureRecord":     this.natureRecordSelected,
                            "natureContract":   this.natureContractSelected,
                            "position":         this.positionSelected,
                            "salaryType":       this.salaryTypeSelected,
                            "natureSalary":     this.natureSalarySelected,
                            "currency":         this.currencySelected,
                            "salary":           this.employmentRecord.salary,
                            "status":           1,
                            "benefit":          this.benefit,
                            "workDay":          this.workDaySelected,
                            "employmentId":     this.employment_id,
                            "startingTime":     this.startingTimeSelected,
                            "applyOvertime":    this.applyOvertime
                        }
                        employeeHandler.createEmployment(data).then(response => {
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
            cancel(){},
            isEdit(){},
            async initData() {
                if (this.$route.params.record_id !== undefined) {
                    await this.loadSingleEmployee()
                } else {
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
                            this.showLoading = false
                            this.employee = res.data.data[0]
                            if(this.employee){
                                this.name = this.employee.employeeId +'-'+this.employee.firstName + ' ' + this.employee.lastName 
                            }
                        })
                        employeeHandler.getEmploymentByEmployee(this.$route.params.record_id).then(res => {
                            this.showLoading = true
                            this.employmentSingle = res.data.data[0]
                            this.showLoading            = false
                            if(this.employmentSingle){
                                this.natureRecordSelected   = this.employmentSingle.natureRecord
                                this.natureContractSelected = this.employmentSingle.natureContract
                                this.locationSelected       = this.employmentSingle.location
                                this.positionSelected       = this.employmentSingle.position
                                this.natureSalarySelected   = this.employmentSingle.natureSalary
                                this.salaryTypeSelected     = this.employmentSingle.salaryType
                                this.currencySelected       = this.employmentSingle.currency
                                this.employmentRecord       = this.employmentSingle
                                this.workDaySelected        = this.employmentSingle.workDay
                                this.startingTimeSelected   = this.employmentSingle.startingTime
                                this.applyOvertime          = this.employmentSingle.applyOvertime
                                this.recordDate             = this.employmentSingle.date
                                this.BenefiteList           = this.employmentSingle.benefit 
                            }                   
                        })
                    }, 300);
                })
            },
            async loadEmploymentRecord(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        employeeHandler.getEmploymentListByEmployee(this.$route.params.id).then(res => {
                            this.showLoading = false
                            this.employmentList = res
                            if(this.employmentList){
                                this.employmentOld = this.employmentList.filter(m => m.status === 1)
                                this.employment_id = this.employmentOld[0].id
                            }
                        })
                    }, 500);
                })
            },
            close(){
                this.clear()
                window.history.go(-1)
            },
            clear(){
                this.natureRecordSelected   = {}
                this.natureContractSelected = {}
                this.locationSelected       = {}
                this.natureSalarySelected   = {}
                this.salaryTypeSelected     = {}
                this.employmentRecord       = {}
                this.workDaySelected        = {}
                this.startingTimeSelected   = {}
                this.applyOvertime          = false
                this.recordDate             = kendo.toString(new Date(), 'yyyy-MM-dd')
                this.BenefiteList           = ''
            }
        },
        mounted: async function () {
            this.loadPosition()
            this.loadLocation()
            this.loadComponent()
            this.initData()
            this.loadCurrency()
            await this.loadEmploymentRecord()
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