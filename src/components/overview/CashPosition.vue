<template>
    <v-card
        color="white"
        outlined
        dense
    >
        <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">
            {{ Number(totalCash).toLocaleString() }}
        </h2>

        <chart ref="cashBankChart"
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
    // import kendo from '@progress/kendo-ui';
    import {i18n} from '@/i18n'
    import Helper from "@/helper.js";
    import { Chart } from "@progress/kendo-charts-vue-wrapper";

    const insightHandler = require("@/scripts/handler/workingcapital/insightHandler.js");

    export default {
        name: "OverviewRevenue",
        components:{
            'chart' : Chart,
            "LoadingMe": () => import('@/components/Loading'),
        },
        data: () => ({
            totalCash : 0,
            series: [],
            categoryAxis: [],
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            },
            chartArea: {
                background: "transparent",
                height: 176,
            },
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
                while (sdate <= edate) {
                    let currentMonth = sdate.getMonth() + 1;
                    fiscalMonths.push(currentMonth);

                    // Next Month
                    sdate.setMonth(currentMonth);
                }
                /* Set Categories Axis */
                this.categoryAxis = fiscalMonths;

                /* Cash and Bank Balance */
                let cashAndBankBalances = await insightHandler.getCashAndBankBalance();
                let cashAndBankBalance = cashAndBankBalances.data;

                /* Bind Total Cash */
                this.totalCash = cashAndBankBalance.on_hand + cashAndBankBalance.in_bank;
                
                /* Bind Series */
                this.series = [
                    {
                        name: i18n.t("cash_in"),
                        data: cashAndBankBalance.cash_in,
                        color: "#4d4848"
                    },
                    {
                        name: i18n.t("cash_out"),
                        data: cashAndBankBalance.bank_out,
                        color: "#c80000"
                    }
                ];

                /* Refresh Chart */
                let cashBankChart = this.$refs.cashBankChart.kendoWidget();
                cashBankChart.refresh();

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