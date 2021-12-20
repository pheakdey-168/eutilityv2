<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1">{{$t('share_capital_analysis')}}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-fiscal-year-picker 
                            :initFiscalDate="fiscalYear"
                            @emitFiscalDate="fiscalYear = $event"/>
                    </v-col>

                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)"  @click="search">
                            <span class="">{{$t('run_report')}}</span>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                                <LoadingMe
                                    :isLoading="showLoading"
                                    :fullPage="false"
                                    type="loading"
                                    :myLoading="true"/>
                                <kendo-datasource ref="trialBalanceDS" :data="trialBalanceList"/>
                                <kendo-grid
                                    id="trialBalanceGrid" class="grid-function"
                                    :data-source-ref="'trialBalanceDS'"
                                    :column-menu="true"
                                    :noRecords="true"
                                    :sortable="true"
                                    :excel-file-name="$t('share_capital_analysis')+'.xlsx'"
                                    :excel-filterable="true"
                                    :excel-all-pages="true"
                                    :toolbar="['excel']"
                                    :scrollable-virtual="true">
                                    <kendo-grid-column
                                        :field="'account'"
                                        :title="$t('accounts')"
                                        :width="200"
                                        :headerAttributes="{
                                            style: 'background-color: #EDF1F5'
                                        }" />
                                    <kendo-grid-column
                                        :field="'baseAmount'"
                                        :title="baseYear"
                                        :format="'{0:n}'"
                                        :width="100"
                                        :headerAttributes="{
                                            style: 'text-align: right; background-color: #EDF1F5'
                                        }"
                                        :attributes="{
                                            style: 'text-align: right;',
                                        }"/>
                                    <kendo-grid-column
                                        :field="'prevAmount'"
                                        :title="prevYear"
                                        :format="'{0:n}'"
                                        :width="100"
                                        :headerAttributes="{
                                            style: 'text-align: right; background-color: #EDF1F5'
                                        }"
                                        :attributes="{
                                            style: 'text-align: right;',
                                        }"/>
                                    <kendo-grid-column
                                        :field="'changePercentage'"
                                        :title="$t('change')"
                                        :format="'{0:p}'"
                                        :width="100"
                                        :headerAttributes="{
                                            style: 'text-align: right; background-color: #EDF1F5'
                                        }"
                                        :attributes="{
                                            style: 'text-align: right;',
                                        }"/>
                                </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
		
    </v-row>
	
</template>

<script>
// const { i18n } = require("@/i18n");
import kendo from '@progress/kendo-ui';
import JSZip from "jszip";
window.JSZip = JSZip;

const balanceSheetHandler = require("@/scripts/handler/accounting/balanceSheet");

export default {
    components: {
		'app-fiscal-year-picker': () => import(`@/components/kendo_templates/FiscalYearDropDownList`),
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
		fiscalYear : null,
        baseYear : '',
        prevYear : '',
        trialBalance : [],
        trialBalanceList : [],
		showLoading : false,
    }),
    methods: {
		// Search
        async search () {
            // Empty dataSource
            let ds = this.$refs.trialBalanceDS.kendoWidget();
            ds.data([]);
            
            if(this.fiscalYear){
                this.showLoading = true;

                // Dates
                let baseYear = this.fiscalYear.end_date;
                this.baseYear = String(new Date(baseYear).getFullYear());
                let prevYear = new Date(new Date(baseYear).setFullYear(new Date(baseYear).getFullYear() - 1));
                this.prevYear = String(prevYear.getFullYear());
                
                // Base Year
                const basetb = await balanceSheetHandler.getBalanceSheet({
                    params : {
                        group_by : 1,
                        as_of_date: kendo.toString(baseYear, 'yyyy-MM-dd') + 'T23:59:59.999Z'
                    }
                })

                // Previous Year
                const prevtb = await balanceSheetHandler.getBalanceSheet({
                    params : {
                        group_by : 1,
                        as_of_date: kendo.toString(prevYear, 'yyyy-MM-dd') + 'T23:59:59.999Z'
                    }
                })

                // Filter data
                let g = {},
                    dividendIds = [29,30,31,105];

                basetb.data.forEach(value => {
                    if (~dividendIds.indexOf(value.account_type_number)) {
                        let amt = value.balance * -1;

                        g[value.account_type_number] = {
                            account : value.number + " " + value.name,
                            baseAmount : amt,
                            prevAmount : 0,
                            changePercentage : 0,
                        };
                    }
                });
            
                prevtb.data.forEach(value => {
                    if (~dividendIds.indexOf(value.account_type_number)) {
                        let amt = value.balance * -1;
                        
                        g[value.account_type_number]["prevAmount"] = amt;
                        g[value.account_type_number]["changePercentage"] = this.findPercentage(g[value.account_type_number]["baseAmount"], amt);
                    }
                });

                this.trialBalanceList = Object.values(g);
                
                this.showLoading = false;
            }
        },
        findPercentage(num1, num2){
            let result = 0;

            if(num2 !== 0){
                result = (num1 - num2) / num2;
            }

            return result;
        },
    },
    mounted() {
        
    }
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
.k-grid th {
    padding: 8px 12px;
    border-width: 0 0 1px 1px;
    white-space: break-spaces !important;
    text-align: center !important;
}
</style>
