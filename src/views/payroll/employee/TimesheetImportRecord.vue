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
                            <v-card outlined dense class="px-3 pb-3 no_border" color="grayBg">
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
                                    <v-col sm="4" cols="12" class=" pb-0">
                                        <label class="label  mb-0">{{ $t('for_the_month_of') }}</label>
                                            <v-menu
                                                v-model="is_month"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px">
                                                <template v-slot:activator="{ on }">
                                                <v-text-field class="pt-0"
                                                    v-model="monthOf"
                                                    prepend-icon="event"
                                                    readonly
                                                    v-on="on"/>
                                                </template>
                                                <v-date-picker
                                                v-model="monthOf"
                                                type="month"
                                                no-title @input="is_month = false">
                                                </v-date-picker>
                                            </v-menu>

                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mt-3"/>
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
    import UploadExcelComponent from '@/components/upload_excel/Timesheet.vue';
    import Timesheet from "@/scripts/model/Timesheet";
    const timesheetModel = new Timesheet({})
    const employeeHandler = require("@/scripts/employeeHandler")
    const locationHandler = require("@/scripts/locationHandler")
    export default {
        name: "AddTimesheet",
        props: ['id'],
        components: {
            'upload-excel-component':UploadExcelComponent,
            LoadingMe: () => import(`@/components/Loading`),
        },
        data: () => ({
            showLoading: false,
            locationSelected: '',
            location:[],
            name:'',
            monthOf: '',
            tableData: [],
            tableHeader: [],
            timesheet: timesheetModel,
            date: new Date().toISOString().substr(0, 7),
            menu: false,
            modal: false,
            is_month: false,
        }),
        methods: {
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
                this.tableData = results
                this.tableHeader = header
            },
            onSaveClose(){
                 new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "id":               this.timesheet.id ? this.timesheet.id : '',
                            "employee":         this.employee ? this.employee : {},
                            "monthOf":          this.monthOf + "-01",
                            "location":         this.locationSelected,
                            "timeSheetRecord":  this.tableData,
                        }
                        employeeHandler.createTimesheet(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Success')
                                this.close()
                                this.clear()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            cancel(){
                
            },
            close(){
                window.history.go(-1)
            },
            async initData() {
                if (this.$route.params.id !== undefined) {
                    await this.loadSingleEmployee()
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
                                this.showLoading = false
                                this.employee = res.data.data[0]
                                if(this.employee){
                                    this.name = this.employee.employeeId +'-'+this.employee.firstName + ' ' + this.employee.lastName 
                                }
                            }
                        })
                    }, 300);
                })
            },

        },
        mounted: async function () {
            this.initData()
            this.loadLocation()
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