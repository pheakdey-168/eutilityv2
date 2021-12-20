<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="8" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('timesheet_timecard')}}</h2>
                        </v-col>
                        <v-col sm="4" cols="1" class="pb-0 pt-2 pb-0">
                            <v-btn color="third white--text float-right">
                                {{$t('new_timesheet')}}
                            </v-btn>
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
                        <v-col sm="2" cols="1" class="py-1">
                            <v-btn color="third white--text text-capitalize" @click="onSearch">
                                {{$t('search')}}
                            </v-btn>
                        </v-col>
                
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource ref="dataSource"
                        :data="timsheets"
                        :page-size='100'
                        :sort="sort"/>
                        <kendo-grid id="reportTimesheet" class="grid-function"
                            :data-source-ref="'dataSource'"
                            :editable="false"
                            :pageable="true"
                            :pageable-refresh="true"
                            :column-menu="true">
                            <kendo-grid-column
                                :width="150"
                                :field="'monthOf'"
                                :title="$t('month_of')"
                                :template="'<span>#= kendo.toString(monthOf,`yyyy-MM-dd`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"/>
                            <kendo-grid-column
                                :locked="true"
                                :width="200"
                                :field="'employee'"
                                :title="$t('employee')"
                                :template="'<span>#= employee.firstName # - #= employee.lastName#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"/>
                            <kendo-grid-column
                                :width="200"
                                :field="'totalHours'"
                                :title="$t('total_hours')"
                                :template="'<span>#= kendo.toString(totalHours,`n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :attributes="{style: 'text-align: center;'}"/>
                            <kendo-grid-column
                                :width="150"
                                :field="'paidHours'"
                                :title="$t('paid_hours')"
                                :template="'<span>#= kendo.toString(paidHours,`n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :attributes="{style: 'text-align: center;'}"/>
                            <kendo-grid-column
                                :width="200"
                                :field="'unpaid_hours'"
                                :title="$t('unpaid_hours')"
                                :template="'<span>#= kendo.toString(unpaidHours,`n2`)#</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :attributes="{style: 'text-align: center;'}"/>
                            <kendo-grid-column
                                :width="250"
                                :field="'overtimeHoursWeekend'"
                                :title="$t('overtime_hours_weekend')"
                                :template="'<span>#= kendo.toString(overtimeHoursWeekend, `n2`) #</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :attributes="{style: 'text-align: center;'}"/>
                            <kendo-grid-column
                                :width="250"
                                :field="'overtimeHoursHoliday'"
                                :title="$t('overtime_hours_holiday')"
                                :template="'<span>#= kendo.toString(overtimeHoursHoliday, `n2`) #</span>'"
                                :headerAttributes="{style: 'background-color: #EDF1F5; text-align: center;'}"
                                :attributes="{style: 'text-align: center;'}"/>
                            <kendo-grid-column
                                :field="''"
                                :title="$t('action')"
                                :width="70"
                                :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit', click: EditTimesheet }]"
                                :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>
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
const $ = require("jquery")
const payrollHandler = require("@/scripts/payrollHandler")
export default {
    data: () => ({
        showLoading: false,
        start_date: "",
        end_date: "",
        timsheets: [],
        sort:[
            { field: 'monthOf', dir: 'asc' }
        ],
        search: {
            start_date: "",
            end_date: ""
        },
    }),
    props: {},
    methods: {
        loadPayrollTimesheet(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    payrollHandler.getPayrollTimesheet(this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.timsheets = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        EditTimesheet(e) {
            e.preventDefault();
            let grid = $("#reportTimesheet").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.$router.push({
                path: 'timesheet_add_list' + `/${dataItem.employee.id }` + `/${dataItem.id}`,
                params: {id: dataItem.id},
                query: {type: 'edit'}
            })
        },
        onSearch(){
            this.search = {
                'start_date': this.start_date + '-01',
                'end_date': this.end_date + '-01'
            }
            this.loadPayrollTimesheet()
        }
    },
    async mounted() {
        await this.loadPayrollTimesheet()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Krasar-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {

}
</style>
