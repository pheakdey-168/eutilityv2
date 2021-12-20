<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="lightGray px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
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
    
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <kendo-datasource ref="dataSource"
                            :data="payrollDetail"
                            :page-size='100'
                            :sort="sort"/>
                            <kendo-grid id="grid" class="grid-function"
                                :data-source-ref="'dataSource'"
                                :editable="false"
                                :scrollable-virtual="true"
                                :pageable="true">
                                <kendo-grid-column
                                    :width="100"
                                    :field="'monthOf'"
                                    :title="$t('month_of')"
                                    :template="'<span>#= monthOf#</span>'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :width="170"
                                    :field="'referenceNumber'"
                                    :title="$t('reference_number')"
                                    :template="'<span>#= referenceNumber#</span>'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                    :attributes="{ style: 'text-align: center'}"/>
                                <kendo-grid-column
                                    :width="70"
                                    :field="'type'"
                                    :title="$t('type')"
                                    :template="'<span>#= type#</span>'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                    :attributes="{ style: 'text-align: center'}"/>
                                <kendo-grid-column
                                    :width="120"
                                    :title="$t('employee_name')"
                                    :template="'<span>#= employeeName#</span>'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :width="120"
                                    :title="$t('amount')"
                                    :template="'<span>#= kendo.toString(netSalary,`c2`)#</span>'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5; text-align: right'}"
                                    :attributes="{style: 'text-align: right'}"/>
                            </kendo-grid>
                        <LoadingMe
                            :isLoading="showLoading"
                            :fullPage="false"
                            :myLoading="true"
                           />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui"
const payrollHandler = require("@/scripts/payrollHandler")
export default {
    data: () => ({
        showLoading: false,
        is_month: false,
        is_start_date: false,
        is_end_date: false,
        start_date: "",
        end_date: "",
        data: [],
        payrollDetail: [],
        sort:[
            { field: 'referenceNumber', dir: 'asc' }
        ],
        search: {
            start_date: "",
            end_date: ""
        },
    }),
    props: {},
    methods: {
        loadPayrollDetail(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    payrollHandler.getPayrollDetail(this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.payrollDetail = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        onSearch(){
            let start_date = this.start_date
            let end_date =this.end_date
            if(end_date && start_date){
                this.search = {
                    'start_date': kendo.toString(new Date(start_date),'yyyy-MM-dd'),
                    'end_date': kendo.toString(new Date(end_date),'yyyy-MM-dd')
                }
                this.loadPayrollDetail()
            }else{
                this.search = {
                    'start_date': '',
                    'end_date': ''
                }
                this.loadPayrollDetail()
            }
        }
    },
    async mounted() {
        await this.loadPayrollDetail()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
    watch:{
        '$route': 'loadPayrollDetail'
    }
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
