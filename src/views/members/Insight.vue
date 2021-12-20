<template>
    <v-row class="">
        <v-col class="pb-0" sm="7" cols="12">
            <v-row>
                <v-col sm="6" cols="12">
                    <v-card
                        outlined
                        dense
                        color="secondary"
                        class="pa-3 mb-5 no_border"
                        height="65px"
                    >
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <h6 class="third--text">10</h6>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <h4 class="white--text text-right font_16 text-uppercase">
                                    {{ $t("due_this_week") }}
                                </h4>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="pa-5 no_border text-center"
                        height="217px"
                        color="grayBg"
                    >
                        <h3>{{ $t("expected_due") }}</h3>
                        <h6 class="primary">10,500</h6>
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                    <tr v-for="item in expected_due" :key="item.name">
                                        <td class="text-left greyText--text ">
                                            {{ item.name }} {{ $t("weeks") }}
                                        </td>
                                        <td class="text-right text-bold">{{ item.value }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card
                        outlined
                        dense
                        color="third"
                        class="pa-3 mb-5 no_border"
                        height="65px"
                    >
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <h6 class="white--text">10</h6>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <h4 class="text-right font_16 text-uppercase">
                                    {{ $t("recurring_invoice") }}
                                </h4>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="px-5 pt-3 pb-5 no_border text-center"
                        height="217px"
                        color="grayBg"
                    >
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <h3 class="text-left">{{ $t("sale") }}</h3>
                            </v-col>
                            <v-col sm="6" cols="6" class="pa-0">
                                <v-select
                                    class="no_border float-right mt-n4"
                                    :items="fields"
                                    label="This month"
                                    dense
                                />
                            </v-col>
                        </v-row>
                        <h6 class="primary">10,500</h6>
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                    <tr v-for="item in sale" :key="item.name">
                                        <td class="text-left greyText--text ">{{ item.name }}</td>
                                        <td class="text-right text-bold">{{ item.value }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="pb-0" sm="6" cols="12">
                    <v-card
                        outlined
                        dense
                        color="grayBg"
                        class="pa-5 no_border"
                        min-height="220px"
                    >
                        <p class="text-left text-uppercase mb-0">
                            {{ $t("total_no_of_customers") }}
                        </p>
                        <h6 class="primary text-right">1,000</h6>
                        
                        <v-card
                            outlined
                            dense
                            class="no_border py-2 px-5 mb-4 mt-2"
                            height="40px"
                            color="green"
                        >
              <span class="text-left float-left text-capitalize white--text">{{
                      $t("new")
                  }}</span>
                            <span class="text-right float-right text-capitalize white--text"
                            >1</span
                            >
                        </v-card>
                        <div class="d-flex justify-space-between">
              <span class="text-left float-left text-uppercase">{{
                      $t("no_of_overdue_customers")
                  }}</span>
                            <h3 class="text-right float-right">500</h3>
                        </div>
                    </v-card>
                </v-col>
                <v-col class="pb-0" sm="6" cols="12">
                    <v-card
                        outlined
                        dense
                        class="px-5 pt-3 pb-5 no_border text-center"
                        height="220px"
                        color="grayBg"
                    >
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
                                <h3 class="mb-3 font_18">{{ $t('sale_funnel') }}</h3>
                                <chart ref="chart" class="funnel"
                                       :title-text="''"
                                       :title-position="'bottom'"
                                       :legend-visible="false"
                                       :series-defaults-labels-visible="true"
                                       :series-defaults-labels-background="'transparent'"
                                       :series-defaults-labels-color="'white'"
                                       :chart-area-background="''"
                                       :series-defaults-labels-format="'N0'"
                                       :series-defaults-dynamic-slope="false"
                                       :series-defaults-dynamic-height="false"
                                       :series="funnel"
                                       :theme="'sass'">
                                </chart>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col class="pb-0" sm="5" cols="12">
            <v-row>
                <v-col sm="12" cols="12" class="">
                    <v-card
                        outlined
                        dense
                        color="grayBg"
                        class="pa-5 no_border"
                        min-height="210px"
                    >
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <h3 class="text-left mb-3 font_22">{{ $t("revenue") }}</h3>
                                <p>{{ $t("from_the_beginning") }}</p>
                            </v-col>
                            <v-col sm="6" cols="6" class="pa-0">
                                <h2 class="primary d-block text-right mr-3">10,500</h2>
                            </v-col>
                        </v-row>
                        <chart
                            ref="chart"
                            :legend-position="'bottom'"
                            :legend-visible="false"
                            :tooltip="tooltip"
                            :series="series_line"
                            :chartArea="chartArea"
                            :category-axis-categories="categories_line"
                            :value-axis="valueAxis_line"
                            :theme="'sass'"
                        />
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                    <v-card
                        outlined
                        dense
                        class="px-5 pt-3 pb-5 no_border text-center"
                        height="220px"
                        color="grayBg"
                    >
                        <v-row>
                            <v-col sm="6" cols="12" class="pr-1">
                                <template>
                                    <v-simple-table class="mt-2">
                                        <template v-slot:default>
                                            <tbody>
                                            <tr
                                                v-for="item in sale_serry"
                                                :key="item.name"
                                            >
                                                <td class="text-right text-uppercase">
                              <span class="text-bold font_18 dark_grey">
                                {{ item.value }}
                              </span>
                                                    <br/>
                                                    <span class="font_14 grey--text">
                                {{ $t(item.name) }}
                              </span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </template>
                            </v-col>
                            <v-col sm="6" cols="12" class="pl-0 pt-0">
                                <chart
                                    ref="chart"
                                    :legend-visible="false"
                                    :series-defaults-labels-visible="false"
                                    :series="series_chart"
                                    :tooltip-template="tooltipTemplate"
                                    :chartArea="chartAreaChart"
                                    :tooltip-visible="true"
                                    :height="100"
                                    :theme="'sass'"
                                />
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import {i18n} from "@/i18n";
import {Chart} from "@progress/kendo-charts-vue-wrapper";

export default {
    components: {
        chart: Chart,
    },
    data: () => ({
        expected_due: [
            {
                name: "< 1 ",
                value: 500,
            },
            {
                name: "1 – 2 ",
                value: "8,000",
            },
            {
                name: "> 2 ",
                value: "2,000",
            },
        ],
        sale_serry: [
            {
                name: "sale_cycle_days",
                value: 500,
            },
            {
                name: "cross_margin",
                value: "50%",
            },
            {
                name: "working_capital",
                value: "40%",
            },
        ],
        funnel: [{
            type: 'funnel',
            data: [
                {
                    category: 'Impressions ',
                    value: '100,000',
                    color: '#92d050'
                },
                {
                    category: 'Clicks',
                    value: '80,000',
                    color: '#2CA01C'
                },
                {
                    category: 'Unique Visitors',
                    value: '30,000',
                    color: '#385622'
                }
            ]
        }],
        sale: [
            {
                name: i18n.t("customer"),
                value: 500,
            },
            {
                name: i18n.t("items"),
                value: "8,000",
            },
            {
                name: i18n.t("sale"),
                value: "8,000",
            },
        ],
        invoices: [
            {
                name: i18n.t("draft"),
                value: "2",
            },
            {
                name: i18n.t("sent"),
                value: "10",
            },
            {
                name: i18n.t("await_receipt"),
                value: "50",
            },
            {
                name: i18n.t("repeat_invoice"),
                value: "1",
            },
        ],
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #",
        },
        series_line: [
            {
                type: "line",
                name: "Sale",
                data: [4, 2, 6, 8, 2, 8],
                color: "#92d050",
            },
            {
                type: "line",
                name: "Purchase",
                data: [1, 6, 9, 5, 4, 5],
                color: "#00b050",
            },
        ],
        categories_line: [
            i18n.t("jan"),
            i18n.t("feb"),
            i18n.t("mar"),
            i18n.t("apr"),
            i18n.t("may"),
            i18n.t("jun"),
        ],
        chartArea: {
            background: "transparent",
            height: 170,
        },
        valueAxis_line: [
            {
                max: 10,
                // visible: false,
                labels: {
                    format: "{0}",
                },
            },
        ],
        // pie chart
        labelTemplate: "#= category # #= value #%",
        tooltipTemplate: "#= category # : #= value #%",
        chartAreaChart: {
            background: "transparent",
            height: 190,
        },
        series_chart: [
            {
                type: "pie",
                startAngle: 180,
                data: [
                    {
                        category: i18n.t("credit_card"),
                        value: 22,
                        color: "#a0c490",
                    },
                    {
                        category: i18n.t("working_capital"),
                        value: 45,
                        color: "#528233",
                    },
                    {
                        category: i18n.t("investment"),
                        value: 11,
                        color: "#61993d",
                    },
                    {
                        category: i18n.t("overdraft"),
                        value: 22,
                        color: "#6fac46",
                    },
                ],
            },
        ],
        
    }),
    mounted() {
    },
    computed: {
        fields() {
            return ["30 " + i18n.t("days_summary"), "60 " + i18n.t("days_summary")];
        },
        days_summary() {
            return [
                {
                    name: i18n.t("today_balance"),
                    value: "500",
                },
                {
                    name: i18n.t("expected_due"),
                    value: "8,000",
                },
                {
                    name: i18n.t("amount_to_pay"),
                    value: "(3,000)",
                },
                {
                    name: i18n.t("forecated_balance") + " 6/8/20",
                    value: "5,500",
                },
            ];
        },
        collection_day() {
            return [
                {
                    name: i18n.t("collection_days"),
                    value: "30",
                },
                {
                    name: i18n.t("payment_days"),
                    value: "15",
                },
                {
                    name: i18n.t("turnover_days"),
                    value: "40",
                },
            ];
        },
        quick_ratio() {
            return [
                {
                    name: i18n.t("quick_ratio"),
                    value: "0.8",
                },
                {
                    name: i18n.t("cash_ratio"),
                    value: "0.5",
                },
                {
                    name: i18n.t("current_ratio"),
                    value: "2.0",
                },
            ];
        },
    },
};
</script>
<style scoped>
.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.k-chart {
    height: 160px;
}

@media (max-width: 576px) {
}
</style>
