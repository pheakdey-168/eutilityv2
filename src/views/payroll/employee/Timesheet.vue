<template>
    <v-row class="pa-2">
        <v-col sm="12" cols="12" class="pa-0">
            <h2 class="mb-0">{{$t('timesheet')}}</h2>
            <!-- <router-link
                :to="{path: routerTo}">
                <v-btn width="100" color="third" :disabled="btnEnabled"
                        class="rounded-pill white--text float-right text-capitalize">
                    {{ $t('add_new') }}
                </v-btn>
            </router-link> -->
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
                            <v-btn color="third" v-on="on" :disabled="btnEnabled"
                                   class="dropdown_transactions white--text float-right text-capitalize">
                                {{$t('add_new_timesheet')}}
                                <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                        </span>
                        </template>

                        <v-list>
                            <v-list-item link route :to="{path: routerTo}">
                                <v-list-item-title>{{$t('import_timesheet')}}</v-list-item-title>
                            </v-list-item>
                            <v-list-item link route :to="{path: routerAddlist}">
                                <v-list-item-title>{{$t('create_timesheet')}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
        </v-col>
        <v-col sm="12" cols="12" class="px-0 ">
            <v-row class="">
                <v-col sm="12" cols="12">
                    <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
                    <template>
                        <kendo-datasource ref="dataSourceTime"
                                          :data="timesheetList"/>
                        <kendo-grid id="gridTimesheet" class="grid-function"
                                :data-source-ref="'dataSourceTime'"
                                :editable="false"
                                :scrollable-virtual="true"
                                :column-menu="true">
                            <kendo-grid-column
                                :field="'monthOf'"
                                :title="$t('month_of')"
                                :width="80"
                                :template="'<span>#=timesheetRecord.monthOf#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>   
                            <kendo-grid-column
                                :field="'paidHour'"
                                :title="$t('paid_hour')"
                                :width="80"
                                :template="'<span>#=timesheetRecord.paidHours#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>  
                            <kendo-grid-column
                                :field="'unpaidHours'"
                                :title="$t('unpaid_hours')"
                                :width="80"
                                :template="'<span>#=timesheetRecord.unpaidHours#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/> 
                            <kendo-grid-column
                                :field="'overtimeHoursHoliday'"
                                :title="$t('overtime_hours_holiday')"
                                :width="80"
                                :template="'<span>#=timesheetRecord.overtimeHoursHoliday#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>   
                            <kendo-grid-column
                                :field="'overtimeHoursWeekend'"
                                :title="$t('overtime_hours_weekend')"
                                :width="80"
                                :template="'<span>#=timesheetRecord.overtimeHoursWeekend#</span>'"
                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/> 
                            <kendo-grid-column
                                :field="''"
                                :title="$t('action')"
                                :width="70"
                                :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEditTimesheet }]"
                                :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>                       
                            </kendo-grid>                   
                    </template>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
    const employeeHandler  = require('@/scripts/employeeHandler')
    const $ = require("jquery")
    export default {
        name: "",
        props: {
            employee: {}
        },
        components:{
             LoadingMe: () => import(`@/components/Loading`),
        },
        computed:{
            routerTo() {
                return  'timesheet_import' + `/${this.employee ? this.employee.id : ''}`
            },
            routerAddlist(){
                return  'timesheet_add_list' + `/${this.employee ? this.employee.id : ''}`
            },
            btnEnabled() {
                if (this.employee) {
                    return !this.employee.id
                } else {
                    return false
                }
            }
        },
        data: () => ({
            timesheetList: [],
            showLoading: false
        }),
        methods: {
            async loadTimesheet(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        employeeHandler.getTimesheet(this.employee.id).then(res => {
                            this.showLoading = false
                            this.timesheetList = res.data
                        })

                    }, 300);
                })
            },
            goEditTimesheet(e) {
                e.preventDefault();
                let grid = $("#gridTimesheet").data("kendoGrid");
                let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                this.$router.push({
                    path: 'timesheet_add_list' + `/${this.employee ? this.employee.id : ''}` + `/${dataItem.id}`,
                    params: {id: dataItem.id},
                    query: {type: 'edit'}
                })
            },
            callback() {
                if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                    this.$emit('onUpdate', this.$route.params.data)
                    
                }
                this.loadTimesheet()
            }
        },
        mounted(){
            this.loadTimesheet()
        },
        watch: {
            employee() {
                if (this.employee !== undefined) {
                    this.loadTimesheet()
                }
            },
        }
    };
</script>
<style scoped>
    h2{
        font-size: 25px;
    }
</style>