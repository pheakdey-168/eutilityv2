<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col class="py-0" sm="12" cols="12">
                        <v-card outlined dense color="white" class="no_border mb-5" >
                            <v-row>
                                <v-col sm="7" cols="6" class="pt-0">
                                    <h3 class="text-left mb-0 font_20 line_24">{{$t('customers_balance_payments')}}</h3>
                                </v-col>
                            </v-row>
                            <chart ref="chart"
                                :legend-position="'bottom'"
                                :legend-visible="false"
                                :tooltip="tooltip"
                                :series="series_line"
                                :category-axis-categories="categories_line"
                                :value-axis="valueAxis_line"
                                :chartArea="chartArea"
                                :theme="'sass'"
                            />
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="py-0 pr-md-2" sm="4" cols="12">
                        <v-card outlined dense color="secondary" class="niradei_bold pa-3 white--text mb-4 no_border d-flex justify-space-between align-center" min-height="78">
                            <h4 class="pa-0 text-uppercase col-md-5 col-xs-12 font_13 flex-1">
                                {{$t('average_collection_days')}}</h4>
                            <h6 class="pa-0 text-right font_34 col-md-7 col-xs-12">100</h6>
                        </v-card>
    
                        <v-card outlined dense color="third" class="niradei_bold pa-3 white--text mb-4 no_border d-flex justify-space-between align-center" min-height="78">
                            <h4 class="pa-0 text-uppercase col-md-6 col-xs-12 font_13 flex-1">
                                {{$t('no_of_customers_over_credit_limit')}}</h4>
                            <h6 class="pa-0 text-right font_34 col-md-6 col-xs-12">1</h6>
                        </v-card>
                        <v-card outlined dense color="third" class="niradei_bold pa-3 white--text no_border d-flex justify-space-between align-center" min-height="78">
                            <h4 class="pa-0 text-uppercase col-md-6 col-xs-12 font_13 flex-1">
                                {{$t('no_of_customers_with_overdue_invoices')}}</h4>
                            <h6 class="pa-0 text-right font_34 col-md-6 col-xs-12 flex-1">500</h6>
                        </v-card>
                    </v-col>
                    <v-col class="py-md-0 px-md-2" sm="4" cols="12">
                        <v-card
                            outlined
                            dense
                            class="pa-4 no_border"
                            min-height="268"
                            color="grayBg"
                        >
                            <h3 class="font_20">{{ $t("expected_due") }}</h3>
                            <p class="mb-0">
                                {{ $t('as_of_today') }}
                            </p>
                            <h2 class="primary mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">10,500</h2>
                            <template>
                                <v-simple-table class="mb-3">
                                    <template>
                                        <tbody>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                {{ $t("1weeks") }}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                500
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                1 – 2 {{ $t("weeks") }}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                8,000
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text">
                                                > 2 {{ $t("weeks") }}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                2,000
                                            </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                            <v-row>
                                <v-col sm="6" class="pr-0 py-0">
                                    <v-btn to="receipt" class="font_16 text-capitalize rounded-0 white--text"  color="greenText">
                                        + {{$t('receipt')}}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" class="pl-0 pb-0 text-right">
                                    <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col class="py-0 pl-md-2" sm="4" cols="12">
                        <v-card
                            outlined
                            dense
                            color="grayBg"
                            class="pa-4 no_border"
                            min-height="268px"
                        >
                            <h3 class="font_20">{{ $t("total_customers") }}</h3>
                            <p class="mb-0">
                                {{ $t('as_of_today') }}
                            </p>
                            <h2 class="primary mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">1,000</h2>
                            <template>
                                <v-simple-table class="mb-3">
                                    <template>
                                        <tbody>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{$t('new')}}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                50
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{$t('overdue')}}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                100
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">
                                            <span class="niradei_medium font_14 grey--text text-capitalize">
                                                {{$t('inactive')}}
                                            </span>
                                            </td>
                                            <td class="text-right">
                                            <span class="niradei_heavy font_18 dark_grey">
                                                10
                                            </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                            <v-row>
                                <v-col sm="6" class="pr-0 py-0">
                                    <v-btn to="" class="font_16 text-capitalize rounded-0 white--text"  color="greenText">
                                        + {{$t('new')}}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" class="pl-0 pb-0 text-right">
                                    <router-link to="" class="mb-0 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {i18n} from '@/i18n'
    import { Chart } from "@progress/kendo-charts-vue-wrapper";
    export default {
        components:{
            'chart' : Chart
        },
        data: () => ({
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            },
            series_line: [
                {
                    type: 'line',
                    name: 'Sale',
                    data: [4, 2, 6,8,2,8],
                    color: "#92d050"
                },
                {
                    type: 'line',
                    name: 'Purchase',
                    data: [1, 6, 9,5,4,5],
                    color: "#00b050"
                }
            ],
            categories_line: [
                i18n.t("jan"),
                i18n.t("feb"),
                i18n.t("mar"),
                i18n.t("apr"),
                i18n.t("may"),
                i18n.t("jun"),
            ],
            valueAxis_line: [{
                max: 10,
                // visible: false,
                labels: {
                    format: "{0}"
                }
            }],
            chartArea: {
                background: "transparent",
                height: 280,
            },
         
        }),
        computed: {
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
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
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

    @media (max-width: 576px) {

    }
</style>