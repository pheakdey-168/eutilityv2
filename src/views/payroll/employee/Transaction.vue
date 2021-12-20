<template>
    <v-row class="pa-2 pt-0">
        <v-row class="mt-n3">
            <v-col sm="10" cols="12" class="">
                <app-searchdate :initStartDate="start_date" @emitStartDate="start_date = $event"
                    :initEndDate="end_date" @emitEndDate="end_date = $event" />
            </v-col>
            <v-col sm="1" cols="1" class="px-0">
                <v-btn class="btn_search" @click="searchTransaction" style="background-color: rgb(237, 241, 245)">
                    <v-icon size="18">b-search</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-col sm="12" cols="12" class="pa-0">
            <kendo-datasource ref="dataSource"
                :data="transactionList"/>
            <kendo-grid id="grid" class="grid-function"
                :data-source-ref="'dataSource'"
                :editable="false"
                :scrollable-virtual="true"
                :column-menu="true">
                <kendo-grid-column
                    :field="'monthOf'"
                    :title="$t('month_of')"
                    :template="'<span>#=monthOf#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/> 
                <kendo-grid-column
                    :field="'Type'"
                    :title="$t('type')"
                    :hidden="true"
                    :width="60"
                    :template="'<span>#=type#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'referenceNumber'"
                    :title="$t('payroll_number')"
                    :width="150"
                    :template="'<span>#=referenceNumber#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                <kendo-grid-column
                    :field="'status'"
                    :title="$t('status')"
                    :width="70"
                    :template="status"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    :attributes="{style: 'text-align: center'}"/>
                <kendo-grid-column
                    :field="'netSalary'"
                    :title="$t('amount')"
                    :width="100"
                    :template="'<span>#=kendo.toString(netSalary,`c2`)#</span>'"
                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                    :attributes="{style: 'text-align: right'}"/>                      
            </kendo-grid>
        </v-col>
        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
    </v-row>
</template>
<script>
    // import kendo from '@progress/kendo-ui'
    import SearchDateComponent from '@/components/custom_templates/SearchDate'
    const employeeHandler = require("@/scripts/employeeHandler")

    export default {
        name: "",
        props: {
            employee: {}
        },
        components:{
            LoadingMe: () => import(`@/components/Loading`),
            'app-searchdate': SearchDateComponent,
        },
        data: () => ({
            transactionList : [],
            start_date		: "",
            end_date		: "",
            showLoading	    : false,
            isLoaded	   	: false,
        }),
        methods: {
            searchTransaction(){

            },
            // Load Transaction
            loadTransaction(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.employees = []
                        employeeHandler.getEmployeeTransactions(this.employee.id).then(res => {
                            this.showLoading = true
                            if (res.statusCode === 200) {
                                this.showLoading = false
                                this.transactionList = res.data
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            callback() {
                if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                    this.$emit('onUpdate', this.$route.params.data)
                }
                this.loadTransaction()
            },
            status(dataItem){
                if(dataItem.status > 0){
                    return 'Paid'
                }else{
                    return 'Open'
                }
            }
        },
        mounted() {
           
        },
        watch: {
            employee() {
                if (this.employee !== undefined) {
                    this.loadTransaction()
                }
            },
        }
    };
</script>
<style scoped>
</style>