<template>
    <v-row>
        <v-col class="pb-0 pt-4" sm="7" cols="12">
            <v-row>
                <v-col class="pt-0 pb-2 pr-2" sm="6" cols="12">
                    <v-card
                        outlined
                        dense
                        color="third"
                        class="pa-3 mb-4 no_border niradei_bold"
                        height="65px"
                    >
                        <v-row>
                            <h6 class="col-sm-7 font_34 primary--text">
                                {{ Number(loanInfo.number_loan_to_pay).toLocaleString() }}
                            </h6>
                            <h4 class="text-right white--text py-0 col-sm-5 font_13 text-uppercase">
                                {{ $t("loan_to_be_repaid") }}
                            </h4>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border"
                        height="268"
                        color="grayBg"
                    >
                        <h3 class="font_20">{{ $t("outstanding_loans") }}</h3>
                        <p class="mb-0">
                            {{ $t('as_of_today') }}
                        </p>
                        <h2 class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">
                            {{ Number(loanInfo.outstanding_amount).toLocaleString() }}
                        </h2>
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <td class="text-left greyText--text text-uppercase ">{{ $t("no_of_loans") }}</td>
                                    <td class="text-right text-bold"> {{ Number(loanInfo.acitve_loan).toLocaleString()}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left greyText--text text-uppercase ">
                                        {{ $t('average_interest_rate') }}
                                    </td>
                                    <td class="text-right text-bold"> {{
                                            Number(
                                                loanInfo.weighted_avg_int_rate_outstanding
                                            ).toLocaleString()
                                        }}
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </v-col>
                <v-col class="pt-0 pb-2 px-2" sm="6" cols="12">
                    <v-card
                        outlined
                        dense
                        color="primary"
                        class="pa-3 mb-5 no_border"
                        height="65px"
                    >
                        <v-row>
                            <v-col sm="6" cols="6" class="pt-1">
                                <h3 class="mt-2 white--text text-bold font_34 d-block pr-2">
                                    {{ Number(loanInfo.number_loan_to_close).toLocaleString() }}
                                </h3>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <h4 class="text-right font_16 text-uppercase">
                                    {{ $t("active_application") }}
                                </h4>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border text-center"
                        color="grayBg"
                        height="190px"
                    >
                        <h3>{{ $t("available_credit") }}</h3>
                        <h2 class="primary--text text-right pr-3 d-block">
                            {{ Number(loanInfo.available_credit).toLocaleString() }}
                        </h2>
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <td class="text-left greyText--text text-uppercase ">{{ $t("no_of_loans")
                                        }}
                                    </td>
                                    <td class="text-right text-bold">
                                        {{ Number(loanInfo.number_pending_loan).toLocaleString() }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left greyText--text text-uppercase ">
                                        {{ $t('average_interest_rate') }}
                                    </td>
                                    <td class="text-right text-bold"> {{
                                            Number(
                                                loanInfo.weighted_avg_int_rate_available_cr
                                            ).toLocaleString()
                                        }}
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="pb-0 pt-2 pr-2" sm="12" cols="12">
                    <v-card
                        outlined
                        dense
                        class="px-5 pt-3 pb-5 no_border text-center"
                        height="220px"
                        color="grayBg"
                    >
                        <v-row>
                            <v-col sm="6" cols="12" class="pr-1">
                                <h3 class="col-sm-6 pa-0 mb-0">{{ $t('loan_analysis') }}</h3>
                                <template>
                                    <v-simple-table class="mt-3">
                                        <template v-slot:default>
                                            <tbody>
                                            <tr>
                                                <td class="text-right greyText--text text-uppercase ">
                                                    {{ $t('debt_ratio') }}
                                                </td>
                                                <td class="text-right text-bold">60%</td>
                                            </tr>
                                            <tr>
                                                <td class="text-right greyText--text text-uppercase">
                                                    {{ $t('gearing_ration') }}
                                                </td>
                                                <td class="text-right text-bold">50%</td>
                                            </tr>
                                            <tr>
                                                <td class="text-right greyText--text text-uppercase">
                                                    {{ $t('interest_coverage') }}
                                                </td>
                                                <td class="text-right text-bold">40%</td>
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
                                <p class="text-center mt-n5">{{ $t('loan_by_types') }}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col class="pb-0 pt-4 pl-2" sm="5" cols="12">
            <v-row>
                <v-col sm="12" cols="12" class="pt-0 pb-2">
                    <v-card
                        outlined
                        dense
                        color="grayBg"
                        class="pa-4 no_border"
                        height="275px"
                    >
                        <v-row>
                            <v-col sm="4">
                                <v-img src="@/assets/images/clipboard.png"/>
                            </v-col>
                            <v-col sm="8">
                                <h3 @click="tabActive" class="primary--text mt-4 text-bold pointer">
                                    {{ $t('what_know_before_loan') }}:</h3>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <ul>
                                    <li>{{ $t('what_know_before_loan_list1') }}</li>
                                    <li>{{ $t('what_know_before_loan_list2') }}</li>
                                    <li>{{ $t('what_know_before_loan_list3') }}</li>
                                </ul>
                            
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12" cols="12" class="pb-0 pt-2">
                    <v-card
                        outlined
                        dense
                        class=" no_border text-center"
                        color="transparent"
                        height=""
                    >
                        <p class="mb-2 text-left line_18">{{ $t("finacial_insight_desc") }}</p>
                        <v-img src="@/assets/images/UNCDF.png"/>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import {i18n} from "@/i18n";
import {Chart} from "@progress/kendo-charts-vue-wrapper";
import {loanHandler} from "@/scripts/AppHandlers";

export default {
    components: {chart: Chart},
    data: () => ({
        /* Obj */
        loanInfo: {},
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
    }),
    methods: {
        tabActive() {
            this.$emit('tabActive', 3)
        },
        loadInsight() {
            loanHandler.getInsight().then((res) => {
                this.loanInfo = res.data;
            });
        },
    },
    mounted() {
        this.loadInsight();
    },
};
</script>

<style scoped>
ul {
    list-style-type: square !important;
}

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

.line_18 {
    line-height: 18px !important;
}
</style>
