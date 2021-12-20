<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1">{{$t('asset_ac')}}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOfDate"
                                        @emitDate="asOfDate = $event"/>
                       
                    </v-col>

                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)"  @click="search">
                            <span class="">{{$t('run_report')}}</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12" col="12" class="pt-0">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <template>
                                    <kendo-datasource ref="trialBalanceDS" :data="trialBalanceList"/>
                                    <kendo-grid
                                        id="trialBalanceGrid" class="grid-function"
                                        :data-source-ref="'trialBalanceDS'"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :sortable="true"
                                        :excel-file-name="$t('asset_ac')+'.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"
                                        :scrollable-virtual="true">
                                        <kendo-grid-column
                                            :field="'account'"
                                            :title="$t('accounts')"
                                            :template="'<span>#=account.number# - #=account.name#</span>'"
                                            :width="200"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"/>
                                        <kendo-grid-column
                                            :field="'amount'"
                                            :title="$t('cost')"
                                            :format="'{0:#,##0.##;(#,##0.##)}'"
                                            :width="100"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"
                                            :attributes="{
                                                class: 'table-cell',
                                                style: 'text-align: right; font-size: 14px',
                                            }"/>
                                        <kendo-grid-column
                                            :field="'accumulated_depreciation'"
                                            :title="$t('accumulated_depreciation')"
                                            :format="'{0:#,##0.##;(#,##0.##)}'"
                                            :width="200"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"
                                            :attributes="{
                                                class: 'table-cell',
                                                style: 'text-align: right; font-size: 14px',
                                            }"/>
                                         <kendo-grid-column
                                            :field="'balance'"
                                            :title="$t('balance')"
                                            :format="'{0:#,##0.##;(#,##0.##)}'"
                                            :width="150"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"
                                            :attributes="{
                                                class: 'table-cell text-bold',
                                                style: 'text-align: right; font-size: 14px;',
                                            }"/>
                                    </kendo-grid>
                                    <LoadingMe
                                        :isLoading="showLoading"
                                        :fullPage="false"
                                        type="loading"
                                        :myLoading="true"/>
                                </template>
                                
                            </v-col>

                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
		
    </v-row>
	
</template>

<script>
import kendo from '@progress/kendo-ui';
import JSZip from "jszip";
window.JSZip = JSZip;

// const { i18n } = require("@/i18n");
const TrialBalanceHandler = require("@/scripts/handler/accounting/trialBalance");

export default {
    data: () => ({
		asOfDate : new Date().toISOString().substr(0, 10),
        trialBalance : [],
        trialBalanceList : [],
		showLoading: false,
        pairAccounts : {
            111010 : null,
            111020 : 113010,
            111030 : null,
            111040 : 113020,
            111050 : 113030,
            111060 : 113040,
            111070 : 113050,
            111080 : 113060,
            111090 : 113070,
            112010 : 113090,
            112020 : 113100,
            112030 : 113110,
            114000 : 113080,
        },
    }),
    components: {
		'app-datepicker': () => import('@/components/custom_templates/DatePickerComponent'),
        LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
		// Search
        search () {
            // Empty dataSource
            let ds = this.$refs.trialBalanceDS.kendoWidget();
            ds.data([]);
            
            if(this.asOfDate){
                let asOfDate = new Date(this.asOfDate);

                // Query
                this.showLoading = true;
                TrialBalanceHandler.getReport({
                    params : {
                        as_of_date: kendo.toString(asOfDate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
                    }
                })
                .then(res => {
                    if(res.data){
                        this.trialBalance = res.data;
                        this.bindData();
                    }
                })
                .finally(() => {
                    this.showLoading = false;
                })
            }
        },
        //Bind Data
        bindData (){
            let g = {}, entries = [];

            this.trialBalance.tbdetails.forEach(value => {
                // Grouping
                const typeIds = [11,12,13];
                if(~typeIds.indexOf(value.account.account_type.number)) { // Filter by account type number
                    g[value.account.banhji_account_number] = value;
                }
            })

            for (let key in this.pairAccounts){
                if(g[key] !== undefined){
                    const ppeTypeIds = [11,12];
                    if(~ppeTypeIds.indexOf(g[key].account.account_type.number)) {
                        if(g[`${this.pairAccounts[key]}`] !== undefined){
                            entries.push({
                                account : g[key].account,
                                amount : g[key].balance,
                                accumulated_depreciation : g[`${this.pairAccounts[key]}`].balance,
                                balance : g[key].balance + g[`${this.pairAccounts[key]}`].balance,
                            });
                        }else{
                            entries.push({
                                account : g[key].account,
                                amount : g[key].balance,
                                accumulated_depreciation : 0,
                                balance : g[key].balance,
                            });
                        }
                    }
                }
            }
            
            // Bind entries
            this.trialBalanceList = entries;
        },
    },
    mounted () {
        
    }
};
</script>

<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        font-size: 16px !important;
        font-family: "Niradei-Bold" !important;
        color: #000;
        border: thin solid rgba(0, 0, 0, 0.12) !important;
        text-align: center !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, 
    .v-data-table > .v-data-table__wrapper > table > thead > tr > td, 
    .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
        font-size: 16px !important;
        border-bottom: none;
        border: thin solid rgba(0, 0, 0, 0.12) !important;
    }
</style>
