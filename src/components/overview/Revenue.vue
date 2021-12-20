<template>
    <v-card
        color="white"
        outlined
        dense
    >
        <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">
            {{ Number(totalRevenue).toLocaleString() }}
        </h2>

        <chart ref="revenueChart"
            :legend-position="'bottom'"
            :legend-visible="false"
            :tooltip="tooltip"
            :series="series"
            :series-defaults-type="'line'"
            :series-defaults-style="'smooth'"
            :category-axis-categories="categoryAxis"
            :value-axis-labels-format="'{0}'"
            :chartArea="chartArea"
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
    import kendo from '@progress/kendo-ui';
    import {i18n} from '@/i18n'
    import Helper from "@/helper.js";
    import { Chart } from "@progress/kendo-charts-vue-wrapper";
    /* Models */
    import BudgetModel from "@/scripts/model/Budget.js";
    import AccountModel from "@/scripts/model/Account.js";

    const budgetHandler = require("@/scripts/handler/workingcapital/budgetHandler.js");
    const accountHandler = require("@/scripts/accountHandler.js");
    const NumberInWord = require("@/scripts/default_setup/NumberInWord.js");
    const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode.js");

    export default {
        name: "OverviewRevenue",
        components:{
            'chart' : Chart,
            "LoadingMe": () => import('@/components/Loading'),
        },
        data: () => ({
            totalRevenue : 0,
            series: [],
            categoryAxis: [],
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            },
            chartArea: {
                background: "transparent",
                height: 172,
            },
            // LoadingMe
            showLoading: false,
        }),
        methods: {
            async loadData () {
                this.showLoading = true;

                let totalRevenue = 0;

                /* Set Current Fiscal Date */
                let currencyFiscalDate = Helper.getFiscalDateByDate(new Date());

                /* Set Fiscal Months */
                let fiscalMonths = [],
                    sdate = new Date(currencyFiscalDate.start_date),
                    edate = new Date(currencyFiscalDate.end_date);
                while (sdate <= edate) {
                    let currentMonth = sdate.getMonth() + 1;
                    fiscalMonths.push(currentMonth);

                    // Next Month
                    sdate.setMonth(currentMonth);
                }
                /* Set Categories Axis */
                this.categoryAxis = fiscalMonths;

                /* Budget */
                let budgets = await budgetHandler.getBudgetForConsolidate({
                    params : {
                        fiscal_year_uuid : currencyFiscalDate.uuid,
                    }
                });
                let budget = new BudgetModel(budgets.data);

                // Load Account List
                let accounts = await accountHandler.getAll();

                /* Budget Series */
                let budgetSeries = [0,0,0,0,0,0,0,0,0,0,0,0];// Default 12 months
                
                /* Gathering from line */
                budget.lines.forEach(value => {
                    /* Set Account Information */
                    let account = new AccountModel(accounts.find(item => item.uuid === value.account_uuid));
                    
                    /* Reverse Nature */
                    if(account.account_type.nature.toLowerCase() === "cr"){
                        /* Amount */
                        value.amount = value.amount * -1;

                        /* Monthly Amount */
                        value.monthly_amount.forEach(ele => {
                            ele.amount = ele.amount * -1;
                        });
                    }

                    /* Filter Only Revenue */
                    if(account.account_type.number === AccountTypeCode.REVENUE){
                        /* Monthly Amount */
                        for (let i = 0; i < 12; i++) {
                            budgetSeries[i] += value.monthly_amount[i].amount;
                        }
                    }
                });
                /* End Budget Series */

                /* Actual Series */
                let actualSeries = [0,0,0,0,0,0,0,0,0,0,0,0];// Default 12 months

                let actuals = await budgetHandler.getActualBudgetForConsolidate({
                    params : {
                        as_of_date 		: kendo.toString(new Date(), 'yyyy-MM-dd') + 'T23:59:59.999Z',// As Of Date is Today
                        group_by 		: "12"
                    }
                });

                actuals.data.forEach(value => {
                    /* Set Account Information */
                    let account = new AccountModel(accounts.find(item => item.uuid === value.accountUUID));

                    /* Reverse Nature */
                    if(account.account_type.nature.toLowerCase() === "cr"){
                        /* Amount */
                        value.amount = value.amount * -1;

                        /* Monthly Amount */
                        value.monthly_amount.forEach(ele => {
                            ele.amount = ele.amount * -1;
                        });
                    }

                    /* Filter Only Revenue */
                    if(account.account_type.number === AccountTypeCode.REVENUE){
                        totalRevenue += value.amount;

                        for (let i = 0; i < 12; i++) {
                            const indexName = NumberInWord[i];

                            actualSeries[i] += value[indexName];
                        }
                    }
                });
                /* End Actual Series */

                /* Bind Total Revenue */
                this.totalRevenue = totalRevenue;
                
                /* Bind Series */
                this.series = [
                    {
                        name: i18n.t("budget"),
                        data: budgetSeries,
                        color: "#4d4848"
                    },
                    {
                        name: i18n.t("actual"),
                        data: actualSeries,
                        color: "#c80000"
                    }
                ];

                /* Refresh Chart */
                let revenueChart = this.$refs.revenueChart.kendoWidget();
                revenueChart.refresh();

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