<template>
    <v-card
        color="white"
        outlined
        dense
    >
        <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">
            {{ Number(totalExpense).toLocaleString() }}
        </h2>

        <chart ref="expenseChart"
            :legend-visible="false"
            :series="series"
            :series-defaults-type="'pie'"
            :series-defaults-labels-visible="false"
            :series-defaults-labels-position="'outsideEnd'"
            :series-defaults-labels-background="'transparent'"
            :series-defaults-labels-template="labelTemplate"
            :tooltip-visible="true"
            :tooltip-template="tooltipTemplate"
            :theme="'sass'"
        />

        <LoadingMe
            type="loading"
            :isLoading="showLoading"
            :myLoading="true"
            :fullPage="false" />
    </v-card>
</template>

<script>
    // import kendo from '@progress/kendo-ui';
    // import {i18n} from '@/i18n'
    import Helper from "@/helper.js";
    import { Chart } from "@progress/kendo-charts-vue-wrapper";

    const IncomeStatementHandler = require("@/scripts/handler/accounting/incomeStatementHandler");
    
    export default {
        name: "OverviewExpense",
        components:{
            'chart' : Chart,
            "LoadingMe": () => import('@/components/Loading'),
        },
        data: () => ({
            totalExpense : 0,
            series: [],
            labelTemplate: "#= category # - #= kendo.format('{0:P}', percentage)#",
            tooltipTemplate: "#= category # - #= kendo.format('{0:P}', percentage) #",
            // LoadingMe
            showLoading: false,
        }),
        methods: {
            async loadData () {
                this.showLoading = true;

                /* Set Current Fiscal Date */
                let currencyFiscalDate = Helper.getFiscalDateByDate(new Date());

                /* Set Fiscal Months */
                let fiscalMonths = [],
                    sdate = new Date(currencyFiscalDate.start_date),
                    edate = new Date(currencyFiscalDate.end_date);

                /* Set Categories Axis */
                this.categoryAxis = fiscalMonths;

                /* Income Statement */
                let incomeStatements = await IncomeStatementHandler.getIncomeStatement({
                    params : {
                        start_date 		: sdate,
                        end_date 		: edate,
                        group_by 		: "12",
                    }
                });

                /* Bind Statement */
                let statementList = [], totalExpense = 0, g = [];
                incomeStatements.data.forEach(value => {
                    if(value.statementGroup.toLowerCase() === "expenses"){
                        totalExpense += value.balance;
                        
                        /* Grouping */
                        if(g[value.type]){
                            g[value.type].value += value.balance;
                        }else{
                            g[value.type] = { category: value.type, value: value.balance };
                        }
                    }
                });

                /* Add to statement */
                for (let key in g)
                statementList.push(g[key]);
                
                /* Bind Total Expense */
                this.totalExpense = totalExpense;

                /* Bind Series */
                this.series = [
                    {
                        type: 'pie',
                        data: statementList
                    }
                ];

                /* Refresh Chart */
                let expenseChart = this.$refs.expenseChart.kendoWidget();
                expenseChart.refresh();

                this.showLoading = false;
			},
        },
        mounted() {
            this.loadData();
        },
    };
</script>

<style scoped>
    .theme--light.v-data-table {
        background-color: transparent !important;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
        border-right: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .v-data-table.simple1_table.theme--light,
    .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .theme--light.v-data-table.simple1_table > .v-data-table__wrapper > table > thead > tr:last-child > th:last-child{
        border-right: none !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    .border-bottom {
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .font-small {
        font-size: 12px;
        line-height: 15px;
    }

    .font-26 {
        font-size: 26px !important;
    }
    .v-data-table.simple_table.theme--light{
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th{
        border-bottom: none !important;
        border-right: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:last-child,
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:last-child,
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:last-child{
        border-right: none !important;
    }

    @media (max-width: 576px) {

    }
</style>