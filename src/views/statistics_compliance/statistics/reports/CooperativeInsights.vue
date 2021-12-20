<template>
        <v-row>
            <v-col sm="12" cols="12" class="pt-0"> 
                <v-card color="white" class="no_border reports_list" elevation="0">
                    <v-row>
                        <v-col sm="12" cols="12" class="pt-0">
                            <h2 class="mb-1">{{$t('cooperative_insights')}}</h2>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3"  class="py-0">
                            <label class="label pr-3">{{$t('base_year')}}</label>
                            <app-fiscal-year-picker 
                                :initFiscalDate="baseFiscalDate"
                                @emitFiscalDate="baseFiscalDate = $event"/>
                        </v-col>
                        <v-col cols="12" sm="3"  class="py-0">
                            <label class="label pr-3">{{$t('compare_year')}}</label>
                            <app-fiscal-year-picker 
                                :initFiscalDate="compareFiscalDate"
                                @emitFiscalDate="compareFiscalDate = $event"/>
                        </v-col>

                        <v-col sm="2" cols="12" class="py-0">
                            <v-btn class="btn_search mt-6" style="background-color: rgb(237, 241, 245)"  @click="search">
                                <span class="">{{$t('run_report')}}</span>
                            </v-btn>
                        </v-col>
                    </v-row>


                    <v-row>
                        <v-col sm="12" cols="12" class="py-0">
                            <template>
                                    <LoadingMe
                                        type="loading"
                                        :isLoading="showLoading"
                                        :fullPage="false"
                                        :myLoading="true"/>

                                    <kendo-datasource 
                                        ref="cooperativeDS" 
                                        :data="cooperativeList"
                                        :group="groupDefinition" />

                                    <kendo-grid
                                        id="cooperativeGrid" class="grid-function"
                                        :data-source-ref="'cooperativeDS'"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :sortable="true"
                                        :excel-file-name="$t('cooperative_insights')+'.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"
                                        :scrollable-virtual="true">
                                        <kendo-grid-column
                                            :field="'title'"
                                            :title="$t('title')"
                                            :hidden="true"
                                            :groupHeaderTemplate="'<span class=`text-bold text-black`>#=value#</span>'"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"
                                        />
                                        <kendo-grid-column
                                            :field="'number'"
                                            :title="$t('no.')"
                                            :width="75"
                                            :headerAttributes="{
                                                style: 'background-color: #EDF1F5'
                                            }"
                                            :attributes="{
                                                style: 'text-align: center;',
                                            }"
                                        />
                                        <kendo-grid-column
                                            :field="'description'"
                                            :title="$t('description')"
                                            :headerAttributes="{
                                            style: 'background-color: #EDF1F5'
                                        }"/>
                                        <kendo-grid-column
                                            :field="'type'"
                                            :title="$t('type')"
                                            :width="100"
                                            :headerAttributes="{
                                                style: 'text-align: center; background-color: #EDF1F5'
                                            }"
                                            :attributes="{
                                                style: 'text-align: center;',
                                            }"
                                        />
                                        <kendo-grid-column
                                            :field="'baseAmount'"
                                            :title="baseYearTitle"
                                            :width="150"
                                            :format="'{0:n}'"
                                            :headerAttributes="{
                                                style: 'text-align: right; background-color: #EDF1F5'
                                            }"
                                            :attributes="{
                                                style: 'text-align: right;',
                                            }"
                                        />
                                        <kendo-grid-column
                                            :field="'compareAmount'"
                                            :title="compareYearTitle"
                                            :width="150"
                                            :format="'{0:n}'"
                                            :headerAttributes="{
                                                style: 'text-align: right; background-color: #EDF1F5'
                                            }"
                                            :attributes="{
                                                style: 'text-align: right;',
                                            }"
                                        />
                                        <kendo-grid-column
                                            :field="'changePercentage'"
                                            :title="$t('change')"
                                            :width="150"
                                            :format="'{0:p}'"
                                            :headerAttributes="{
                                                style: 'text-align: right; background-color: #EDF1F5'
                                            }"
                                            :attributes="{
                                                style: 'text-align: right;',
                                            }"
                                        />
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

const segmentHandler = require("@/scripts/segmentHandler");
const balanceSheetHandler = require("@/scripts/handler/accounting/balanceSheet");
const incomeStatementHandler = require("@/scripts/handler/accounting/incomeStatementHandler");
const memberHandler = require("@/scripts/memberHandler")

export default {
    data: () => ({
        baseFiscalDate : null,
		compareFiscalDate : null,
        baseYearTitle : "",
        compareYearTitle : "",
        cooperativeList : [],
        cooperativeListA: [],
        segmentList : [],
        // LoadingMe
		showLoading: false,
        // Kendo
        groupDefinition : { field:"title" },
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-fiscal-year-picker': () => import(`@/components/kendo_templates/FiscalYearDropDownList`),
    },
    methods: {
        loadData(){
            segmentHandler.getAll()
                .then((res)=>{
                    this.segmentList = res;
                });
        },
		// Search
        async search () {
            // Empty dataSource
            let ds = this.$refs.cooperativeDS.kendoWidget();
            ds.data([]);
            
            if(this.baseFiscalDate !== null && this.compareFiscalDate !== null){
                this.showLoading = true;

                // Column titles
                this.baseYearTitle = this.baseFiscalDate.end_date.substr(0, 4);
                this.compareYearTitle = this.compareFiscalDate.end_date.substr(0, 4);
                
                // Grouping as array object
                let g = {};

                // 1. NUMBER OF MEMBERS
                g["member"] = {
                    title : "1. NUMBER OF MEMBERS",
                    number : "1.1",
                    description : "Number Of Members",
                    type : "KHR",
                    baseAmount : 0,
                    compareAmount : 0,
                    changePercentage : 0,
                };

                // 2. OPERATING CAPITAL
                g["equity"] = {
                    title : "2. OPERATING CAPITAL",
                    number : "2.1",
                    description : "Total Equity",
                    type : "KHR",
                    baseAmount : 0,
                    compareAmount : 0,
                    changePercentage : 0,
                };
                g["liabilities"] = {
                    title : "2. OPERATING CAPITAL",
                    number : "2.2",
                    description : "Total Liabilities",
                    type : "KHR",
                    baseAmount : 0,
                    compareAmount : 0,
                    changePercentage : 0,
                };
                // Query
                let bsBase = await balanceSheetHandler.getBalanceSheet({
                    params : {
                        group_by : 1,
                        as_of_date : kendo.toString(new Date(this.baseFiscalDate.end_date), 'yyyy-MM-dd') + 'T23:59:59.999Z'
                    }
                })
                let bsCompare = await balanceSheetHandler.getBalanceSheet({
                    params : {
                        group_by : 1,
                        as_of_date : kendo.toString(new Date(this.compareFiscalDate.end_date), 'yyyy-MM-dd') + 'T23:59:59.999Z'
                    }
                })
                bsBase.data.forEach(value => {
                    if(value.groupNature.toLowerCase() === "equity"){
                        g.equity.baseAmount += value.balance * -1;
                    }
                    if(value.groupNature.toLowerCase() === "liabilities"){
                        g.liabilities.baseAmount += value.balance * -1;
                    }
                });
                bsCompare.data.forEach(value => {
                    if(value.groupNature.toLowerCase() === "equity"){
                        g.equity.compareAmount += value.balance * -1;
                    }
                    if(value.groupNature.toLowerCase() === "liabilities"){
                        g.liabilities.compareAmount += value.balance * -1;
                    }
                });
                // Change Percentage
                g.equity.changePercentage = this.findPercentage(g.equity.baseAmount, g.equity.compareAmount);
                g.liabilities.changePercentage = this.findPercentage(g.liabilities.baseAmount, g.liabilities.compareAmount);
                // End 2. OPERATING CAPITAL
                

                // 3. BUSINESS VALUE
                let segmentIds = [];
                for (let i = 0; i < this.segmentList.length; i++) {
                    let segId = this.segmentList[i].id;

                    segmentIds.push(segId);

                    g[segId] = {
                        title : "3. BUSINESS VALUE",
                        number : "3." + (i +1),
                        description : this.segmentList[i].name,
                        type : "KHR",
                        baseAmount : 0,
                        compareAmount : 0,
                        changePercentage : 0,
                    };
                }
                // Query
                let bvBase = await incomeStatementHandler.getBySegments(
                    this.baseFiscalDate.start_date + "T00:00:00.000Z", 
                    this.baseFiscalDate.end_date + "T23:59:59.999Z", 
                    segmentIds
                );
                let bvCompare = await incomeStatementHandler.getBySegments(
                    this.compareFiscalDate.start_date + "T00:00:00.000Z", 
                    this.compareFiscalDate.end_date + "T23:59:59.999Z", 
                    segmentIds
                );
                // Bind data
                for (let i = 0; i < this.segmentList.length; i++) {
                    let segId = this.segmentList[i].id;
                    bvBase[i].forEach(value => {
                        if(value.groupNature.toLowerCase() === "revenue"){
                            g[segId]["baseAmount"] += value.balance;
                        }
                    });
                }
                for (let i = 0; i < this.segmentList.length; i++) {
                    let segId = this.segmentList[i].id;
                    bvCompare[i].forEach(value => {
                        if(value.groupNature.toLowerCase() === "revenue"){
                            g[segId]["compareAmount"] += value.balance;
                        }
                    });
                }
                // Change Percentage
                for (let i = 0; i < this.segmentList.length; i++) {
                    let segId = this.segmentList[i].id;
                    g[segId]["changePercentage"] = this.findPercentage(g[segId]["baseAmount"], g[segId]["compareAmount"]);
                }
                // End 3. BUSINESS VALUE


                // 4. PERFORMANCE
                g["income"] = {
                    title : "4. PERFORMANCE",
                    number : "4.1",
                    description : "Income",
                    type : "KHR",
                    baseAmount : 0,
                    compareAmount : 0,
                    changePercentage : 0,
                };
                g["expense"] = {
                    title : "4. PERFORMANCE",
                    number : "4.2",
                    description : "Expense",
                    type : "KHR",
                    baseAmount : 0,
                    compareAmount : 0,
                    changePercentage : 0,
                };
                g["netincome"] = {
                    title : "4. PERFORMANCE",
                    number : "4.3",
                    description : "Net Income",
                    type : "KHR",
                    baseAmount : 0,
                    compareAmount : 0,
                    changePercentage : 0,
                };
                // Query
                let isBase = await incomeStatementHandler.getIncomeStatement({
                    params: {
                        start_date: this.baseFiscalDate.start_date + "T00:00:00.000Z",
                        end_date: this.baseFiscalDate.end_date + "T23:59:59.999Z",
                        group_by: 1
                    },
                });
                let isCompare = await incomeStatementHandler.getIncomeStatement({
                    params: {
                        start_date: this.compareFiscalDate.start_date + "T00:00:00.000Z",
                        end_date: this.compareFiscalDate.end_date + "T23:59:59.999Z",
                        group_by: 1
                    },
                });
                // Bind data
                let incomeTypeIds = [32, 40],
                    expenseTypeIds = [33, 34, 35, 36, 37, 38, 39, 41, 42];
                isBase.data.forEach((value) => {
                    /* Sum Incomes */
                    if (~incomeTypeIds.indexOf(value.account_type_number)) {
                        g.income.baseAmount += value.balance;
                    }

                    /* Sum Expenses */
                    if (~expenseTypeIds.indexOf(value.account_type_number)) {
                        g.expense.baseAmount += value.balance;
                    }
                });
                isCompare.data.forEach((value) => {
                    /* Sum Incomes */
                    if (~incomeTypeIds.indexOf(value.account_type_number)) {
                        g.income.compareAmount += value.balance;
                    }

                    /* Sum Expenses */
                    if (~expenseTypeIds.indexOf(value.account_type_number)) {
                        g.expense.compareAmount += value.balance;
                    }
                });
                g.netincome.baseAmount = g.income.baseAmount - g.expense.baseAmount;
                g.netincome.compareAmount = g.income.compareAmount - g.expense.compareAmount;
                // Change Percentage
                g.income.changePercentage = this.findPercentage(g.income.baseAmount, g.income.compareAmount);
                g.expense.changePercentage = this.findPercentage(g.expense.baseAmount, g.expense.compareAmount);
                g.netincome.changePercentage = this.findPercentage(g.netincome.baseAmount, g.netincome.compareAmount);
                // End 4. PERFORMANCE


                // Bind data grid
                // check member
                this.cooperativeListA = Object.values(g);
                await this.checkMember()
                this.showLoading = false;
            }
        },
        checkMember(){
            memberHandler.loadLessMember().then(res => {
                if(res.data.data.length > 0){
                    let fyear = new Date(this.baseFiscalDate.end_date).getFullYear()
                    let inyear = res.data.data.filter((obj) => {
                        return new Date(obj.registeredDate).getFullYear() == fyear
                    })
                    if(inyear.length > 0){
                        this.cooperativeListA[0].baseAmount = inyear.length
                    }
                    let cyear = new Date(this.compareFiscalDate.end_date).getFullYear()
                    let cinyear = res.data.data.filter((obj) => {
                        return new Date(obj.registeredDate).getFullYear() == cyear
                    })
                    if(cinyear.length > 0){
                        this.cooperativeListA[0].compareAmount = cinyear.length
                    }
                    // window.console.log(inyear.length, cinyear.length)
                    this.cooperativeListA[0].changePercentage = (((inyear.length - cinyear.length) * 100) / inyear.length).toFixed(2) + '%'
                    this.cooperativeList = this.cooperativeListA
                }
            })
        },
        findPercentage(num1, num2){
            let result = 0;

            if(num2 !== 0){
                result = (num1 - num2) / num2;
            }

            return result;
        }
    },
    created () {
        this.loadData();
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
