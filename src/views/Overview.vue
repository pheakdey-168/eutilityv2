<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                    <v-row>
                        <v-col sm="4" cols="12" class="hide_form_alert pr-md-2 pt-0 pb-md-4">
                            <v-card
                                color="white"
                                outlined
                                dense
                                class="pa-4 mt-4 no_border"
                                min-height="338"
                            >
                                <h3 class="font_20">{{ $t("your_cash_position") }}</h3>
                                <p class="mb-0">
                                    {{ $t("cash_balance_its_reconciliation_as_of_today") }}
                                </p>
                                <v-row>
                                    <v-col sm="12" class="py-0" cols="12">
                                        <CashPosition />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="6" class="pr-0 py-0">
                                        <v-btn
                                            to="cash"
                                            class="mt-1 font_16 text-capitalize rounded-0 white--text"
                                            color="primary"
                                        >
                                            + {{ $t("cash") }}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" class="pl-0 text-right pt-2">
                                        <span
                                            @click="ReporttAmontBudget"
                                            class="mb-0 pointer py-5 niradei_bold font_16 primary--text text-right"
                                        >{{ $t("view_report") }}
                                        </span>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card
                                color="white"
                                outlined
                                dense
                                class="pa-4 mt-4 no_border"
                                min-height="338"
                            >
                                <h3 class="font_20 pb-1">{{ $t("revenue") }}</h3>
                                <p class="mb-0">{{ $t("from_beginning_year") }}</p>
                                <h2 class="primary mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right">100,000</h2>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-1  py-0">
                                        <chart
                                            ref="chart"
                                            :legend-position="'bottom'"
                                            :legend-visible="false"
                                            :tooltip-visible="true"
                                            :tooltip-template="$t('revenue') + ': #: value #'"
                                            :series="series_line"
                                            :category-axis-categories="categories_line"
                                            :value-axis="valueAxis_line"
                                            :theme="'sass'"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="6" class="pr-0 py-0">
                                        <v-btn to="invoice" class="mt-2 font_16 text-capitalize rounded-0 white--text"  color="primary">
                                            + {{$t('invoice')}}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" class="pl-0 text-right pt-2">
                                        <router-link to="" class="mb-0 py-5 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col class="py-0 px-md-2" sm="4" cols="12">
                            <v-card
                                color="white"
                                outlined
                                dense
                                class="pa-4 no_border"
                                min-height="338"
                            >
                                <h3 class="font_20 pb-1">{{ $t("expected_due") }}</h3>
                                <p class="mb-0">{{ $t("amount_to_receive") }}</p>
                                <h2 class="col-sm-12 niradei_black pa-0 primary text-right mb-1">USD 10,500</h2>
                                <v-row>
                                    <v-col sm="6" cols="12" class="pr-0 pb-0">
                                        <template>
                                            <v-simple-table>
                                                <template>
                                                    <tbody>
                                                        <tr>
                                                            <td class="text-right">
                                                                <span class="niradei_heavy font_18 dark_grey">
                                                                    500
                                                                </span>
                                                                <br/>
                                                                <span class="niradei_medium font_14 grey--text" >
                                                                    {{ $t("1weeks") }}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-right">
                                                                <span class="niradei_heavy font_18 dark_grey">
                                                                    8,000
                                                                </span>
                                                                <br/>
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    1 – 2 {{ $t("weeks") }}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-right">
                                                                <span class="niradei_heavy font_18 dark_grey">
                                                                    2,000
                                                                </span>
                                                                <br/>
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    > 2 {{ $t("weeks") }}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="pl-0 py-0">
                                        <chart
                                            ref="chart"
                                            :legend-visible="false"
                                            :series-defaults-labels-visible="false"
                                            :series="series"
                                            :tooltip-template="tooltipTemplate"
                                            :tooltip-visible="true"
                                            :height="300"
                                            :theme="'sass'"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="6" class="pr-0 py-0">
                                        <v-btn to="receipt" class="text-capitalize font_16 rounded-0 white--text"  color="primary">
                                            + {{$t('receipt')}}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" class="pl-0 text-right pt-2">
                                        <router-link to="" class="mb-0 py-5 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card
                                color="white"
                                outlined
                                dense
                                class="pa-4 mt-4 no_border"
                                min-height="338"
                            >
                                <h3 class="font_20 pb-1">{{ $t("expense") }}</h3>
                                <p class="mb-0">{{ $t("from_beginning_year") }}</p>
                                <h2 class="primary mb-0 niradei_black pa-0 col-sm-12 text-right">80,000</h2>
                                <v-row>
                                    <v-col sm="6" cols="12" class="pr-0 pb-0">
                                        <template>
                                            <v-simple-table>
                                                <template>
                                                    <tbody>
                                                    <tr>
                                                        <td class="text-right">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                50%
                                                            </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text" >
                                                                {{ $t("cost_of_sale") }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                30%
                                                            </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{ $t("operating_expense") }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_18 dark_grey">
                                                                    20%
                                                                </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{ $t("other_expenses") }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="pl-0 py-0">
                                        <chart
                                            ref="chart"
                                            :legend-position="'bottom'"
                                            :legend-visible="false"
                                            :tooltip-visible="true"
                                            :tooltip-template="$t('expense') + ': #: value #'"
                                            :series="series_round"
                                            :value-axis="valueAxis_round"
                                            :theme="'sass'"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="6" class="pr-0 py-0">
                                        <v-btn to="purchase" class="text-capitalize font_16 rounded-0 white--text"  color="primary">
                                            + {{$t('purchase')}}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" class="pl-0 text-right pt-2">
                                        <router-link to="" class="mb-0 py-5 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col class="py-0 pl-md-2" sm="4" cols="12">
                            <v-card
                                color="white"
                                outlined
                                dense
                                class="pa-4 no_border"
                                min-height="338"
                            >
                                <h3 class="font_20 pb-1">{{ $t("amount_to_pay") }}</h3>
                                <p class="mb-0">{{ $t("amount_to_pay_to_suppliers") }}</p>
                                <h2 class="primary niradei_black mb-1 pa-0 text-right col-sm-12">USD 5,500</h2>
                                <v-row>
                                    <v-col sm="6" cols="12" class="pr-1 pb-0">
                                        <template>
                                            <v-simple-table>
                                                <template>
                                                    <tbody>
                                                    <tr>
                                                        <td class="text-right">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                500
                                                            </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{ $t("1weeks") }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                8,000
                                                            </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                1 – 2 {{ $t("weeks") }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right">
                                                            <span class="niradei_heavy font_18 dark_grey">
                                                                2,000
                                                            </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                > 2 {{ $t("weeks") }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                    </v-col>
                                    <v-col sm="6" cols="12" class="pl-0 py-0">
                                        <chart
                                            ref="chart"
                                            :legend-visible="false"
                                            :series-defaults-labels-visible="false"
                                            :series="series"
                                            :tooltip-template="tooltipTemplate"
                                            :tooltip-visible="true"
                                            :height="100"
                                            :theme="'sass'"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="6" class="pr-0 py-0">
                                        <v-btn to="payment" class="text-capitalize font_16 rounded-0 white--text"  color="primary">
                                            + {{$t('payment')}}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" class="pl-0 text-right pt-2">
                                        <router-link to="" class="mb-0 py-5 niradei_bold font_16 primary--text text-right">{{$t('view_report')}}</router-link>
                                    </v-col>
                                </v-row>
                            </v-card>
    
                            <v-card
                                color="white"
                                outlined
                                dense
                                class="pa-4 mt-4 no_border"
                                min-height="338"
                            >
                                <p class="mb-0 font_19 pr-md-10" style="line-height: 22px;">
                                    <span class="niradei_bold">{{$t('accept_your_customer_payment')}}</span>
                                    {{$t('with_your_partners')}}
                                </p>
                                <v-row class="mx-auto" style="width: 95%">
                                    <v-col sm="3">
                                        <v-img class="borderRadius20" width="50px" src="@/assets/images/aba_mobile.png" ></v-img>
                                    </v-col>
        
                                    <v-col sm="3">
                                        <v-img class="borderRadius20" width="50px" src="@/assets/images/acelida_mobile.png" ></v-img>
                                    </v-col>
                                    <v-col sm="3">
                                        <v-img class="borderRadius20" width="50px" src="@/assets/images/wing_mobile.png" ></v-img>
                                    </v-col>
        
                                    <v-col sm="3">
                                        <v-img class="borderRadius20" width="50px" src="@/assets/images/amk_mobile.png" ></v-img>
                                    </v-col>
                                </v-row>
                                <v-row class="mx-auto" style="width: 95%">
                                    <v-col sm="3" class="py-md-0">
                                        <v-img class="borderRadius20" width="50px" src="@/assets/images/ppcbank_mobile.jpg" ></v-img>
                                    </v-col>
        
                                    <v-col sm="3" class="py-md-0">
                                        <v-img class="borderRadius20" width="50px" src="@/assets/images/emoney_mobile.png" ></v-img>
                                    </v-col>
                                    <v-col sm="3" class="py-md-0">
                                        <v-img class="borderRadius20" width="50px" src="@/assets/images/sathapana_mobile.jpg" ></v-img>
                                    </v-col>
        
                                    <v-col sm="3" class="py-md-0">
                                        <v-img class="borderRadius20" width="50px" src="@/assets/images/lyhour_mobile.png" ></v-img>
                                    </v-col>
                                </v-row>
                                <v-row class="mx-auto" style="width: 95%">
                                    <v-col sm="3">
                                        <v-img width="50px" src="@/assets/images/lolc_mobile.png" ></v-img>
                                    </v-col>
        
                                    <v-col sm="3">
                                        <v-img width="50px" src="@/assets/images/amret_mobile.jpg" ></v-img>
                                    </v-col>
                                </v-row>
    
                                <v-card outlined dense color="third" class="pa-2 white--text rounded-0" height="40">
                                    <v-row>
                                        <v-col md="3" cols="2" class="text-right pr-0 py-0">
                                            <v-icon size="20" class="primary--text mx-1">fa fa-lock</v-icon>
                                        </v-col>
                                        <v-col md="9" cols="10" class="py-0">
                                            <p class="mb-0 text-bold font_18 text-left">{{$t('accepting_payments')}}</p>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-card>
                           
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from "@/i18n";
import {Chart} from "@progress/kendo-charts-vue-wrapper";

const instituteHandler = require("@/scripts/instituteHandler");
const otherHandler = require("@/scripts/otherHandler");
const store = require("@/institute");
import { setTabActiveBudget } from '@/observable/store';
export default {
    components: {
        chart: Chart,
        'CashPosition': () => import(`@/components/overview/CashPosition`),
    },
    data: () => ({
        //Bar
        seriesBar: [
            {
                name: "Total Visits",
                data: [56000, 63000, 74000, 91000, 117000, 138000],
                color: '#92d050',
                border: {
                    width: 0
                },
            },
            {
                name: "Unique visitors",
                data: [52000, 34000, 23000, 48000, 67000, 83000],
                color: '#00b050',
                border: {
                    width: 0
                },
            },
        ],
        valueAxisBar: [{
            max: 140000,
            line: {
                visible: false
            },
            minorGridLines: {
                visible: false
            },
            labels: {
                rotation: "auto"
            },
            visible: false,
            majorGridLines: {
                visible: false
            }
        }],
        categoryAxisBar: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            majorGridLines: {
                visible: true
            }
        },
        tooltipBar: {
            visible: true,
            template: "#= series.name #: #= value #"
        },
        institutes: [],
        mInstitute: {},
        check: ["1"],
        categories: [
            i18n.t("jan"),
            i18n.t("feb"),
            i18n.t("mar"),
            i18n.t("apr"),
            i18n.t("may"),
            i18n.t("jun"),
        ],
        // series: [
        //     {data: [20, 25, 32, 50, 34, 45], color: "#92d050"},
        //     {data: [40, 50, 80, 70, 45, 46], color: "#00b050"}
        // ],'
        labelTemplate: "#= category # #= value #%",
        tooltipTemplate: "#= category # : #= value #%",
        series: [
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
        series_line: [
            {
                type: "line",
                name: "Price",
                data: [0, 50, 40, 60, 90, 20],
                color: "#92d050",
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
        valueAxis_line: [
            {
                max: 100,
                // visible: false,
                labels: {
                    format: "{0}",
                },
            },
        ],
        series_round: [
            {
                type: "donut",
                name: "Price",
                data: [
                    {
                        value: 22,
                        color: "#a0c490",
                    },
                    {
                        value: 22,
                        color: "#6fac46",
                    },
                    {
                        value: 45,
                        color: "#528233",
                    },
                    {
                        value: 11,
                        color: "#61993d",
                    },
                ],
                color: "#92d050",
            },
        ],
        valueAxis_round: [
            {
                labels: {
                    format: "{0}",
                },
            },
        ],
    }),
    mounted: async function () {
        await this.loadInstitute();
        await this.loadInstitutes();
        await this.getCookieData();
    },
    methods: {
        ReporttAmontBudget(){
            setTabActiveBudget(1,2)
            this.$router.push({name: "WorkingCapital"});
        },
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === " ") c = c.substring(1);
                if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
            }
            return "";
        },
        async getCookieData() {
            var cookie = this.getCookie("banhji-token");
            if (cookie !== "") {
                let data = JSON.parse(cookie);
                this.mInstitute = {
                    id: data.instituteId,
                    name: data.email,
                    email: data.email,
                    user: data.user,
                    creator: data.creator,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                };
                if (
                    data.user.hasOwnProperty("custom:firstName") ||
                    data.user.hasOwnProperty("custom:lastName")
                ) {
                    if (
                        data.user["custom:firstName"] !== "" ||
                        data.user["custom:lastName"] !== ""
                    ) {
                        let avatar =
                            data.user["custom:firstName"].charAt(0).toUpperCase() +
                            data.user["custom:lastName"].charAt(0).toUpperCase();
                        store.default.commit("setAvatarLetter", avatar);
                    }
                }
            }
            window.console.log(this.mInstitute, "avatar");
        },
        writeToCookie() {
            window.console.log(this.mInstitute);
            const cookie = {
                accessToken:
                    this.mInstitute.accessToken ||
                    "eyJraWQiOiIzT3hCSStYOWZCYzFOYTc3YW9qVnFIdlwvSWxXREV6NFJMYUluUmE5anNyQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1OWNkMTY4ZS1mNzBmLTQ4ODctYWE5Ny1kMWMwYWZiNDE0ZDkiLCJldmVudF9pZCI6IjA3ZmZiOTEyLWJiZTgtNDg3ZS1hODk5LWQ5MDM4NjcyNjBkYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDc5MzU0NDMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9nc2F0MmxiakwiLCJleHAiOjE2MDc5MzkwNDMsImlhdCI6MTYwNzkzNTQ0MywianRpIjoiNTc5NzE4ZDQtYmM0Zi00YzNhLThmMTItNmRjZGQyZmYxNDczIiwiY2xpZW50X2lkIjoiM3ZhOTNkMjVxbzZrcHYzNHJmMWwwNDNqZ3IiLCJ1c2VybmFtZSI6ImJhbmhqaTU1NUBnbWFpbC5jb20ifQ.Z-g9DNbRn5AX32xFWHmkt8iXe7FNly1azaOXTpORL4i7X_EDLybiYtbYsR3MWXbTNcFfKABPwOXYk541SJZPgnck8PWvHanyKIVvrlzaVy9JEo_E35jOO72Rjt0MgB2eG1u2k70R2cywQmKfsffp_5yk1RKaesZq0yLucUJDrSHnRv8Jm-U-S-buHs_fAxL_Vt6l3o2DcKtKRb-eUOHjTLs8WnHvtPvraXC7dY6PmJuA4K4v2RMfrSuv5wx2EvomqlOEtCgvbK8jDtu4zvHRTY-2TcnfK2dXwxZRkduF26YbezejBZpejsoVFBOi617NGH8b_2DikvSyCBBCjmh3qg",
                refreshToken:
                    this.mInstitute.refreshToken ||
                    "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.dsantoqyFlkftIr9z_7P5uc2fjlc0w_R4wt1My1fT70grVmvW0crc_aqHcm-Vc3gpjgndX2Xxn3lTx7nqpVp59Lzeab2JIKE520LBhePWuz5y3LW5WMQhAcZteXNf6JATvDHrmRXs3R0e4m-vSZhlvLCMH5EIYB0bwsFMBdSVNrNNLLVzMuuzDCXywWlrLU1MIHJuEG9Z5c-fca1xB-1fwyI8wpGV6OVnfNSo4OfOeQ-O9ufKmKjym24yxE40i_8UrOEca_12Y5XrQGov30wkou6stixLDFWu05BncG2nfgCEjNERlJC97LPtyI__tLGL2kYuWgJKghebKkuq9ds_A.wvSOFOu7pMLZFghf.4DLhcyHLwJqf3fcyq8A3KmSQL8UAd_ADPZxBuPnnSDaRVEWqDTRq_bJDPFjWBf4uJkI6ye45XJ8AkdZQFutP-x_nUT2Qw0NbLjGFW3nUh2GVd8yP2JIyQJ2h2_onLvUPpLp-E0crIEdbVXZRpQM7y7aOP4rOVPPVBCiAxapMNX9_5utgzKpfWGrS8D6t7dvq4pHieXeZbomkoY7h_eLflehQ_RLcaK3i7Dnvxjn6_UiHmXx0X9gplFJx_rrIlveIrha94E6fBQ9eCwT0WHROrAQIbyW24D_6ytSAuKVq-383svntFUeBuggDRujVdR8uQ9HIbsftDvDvnKZchQ1yFiToTC-NPCfizaw6nuJ5LQAw0TVtY3RSeYfm6jAX77ymsuYi557UZNWCJs_0WRKBaqKnvKx6m-YwFtft5dPmW1rPi6ARJ20z6JocYLWjfKYBL3AITgzt2gY8POsgzBOhWZ9c2UcM7X8eY5EMtAQyhZ3iLHQ_21cnNAH_PNBmn4mZGuT0VePpeopmX3e4J1-BmAFq5LvqJW4KTIiFRdrcTbnLWT8JrR-SGiOMOLS_WUivc3wQZn20xm2JlrJZDemT4IGdHLmrxARsvlSwKaQ94Rywly8WjIaj-wzqA5_MURryW1xHUpwwO-lvZ1dTK9Wh80AY_LSL19fcPi1pXz_NCSKOniSgoT3qvaL1zLcxFKr5D_lI8LkI4wyC7tzRbvbkY6t8-L269Y7BVO7SXMIDu6nT1XyuUElFMnnfuDr_iCWPjDjbEA2f5hl6V1m3BFEkroHQp97RnJUnualVpnQ1QsuBvRFZnvEI0OuPUpMNMic6gnuxNV_ILlxhH7JspafqbeAN5PYauLsI6A70b4mZWf0XGZu0UeV93QZZn_9156yytgU3-3-mcDR4dV2L0bnICz1lCVsqw9EE6MUJhHneNNqDn9pWykD3kSxbtS-0jTTyOVJaGjmwP6K80hH3S6C6cEnkPr83Or-FBkmB61_2RHjyB6o5QkebyPv2L5z8eF14r15UZiFEI6HyyEeZBWpEgYREvkVmjsLg2koHcieQ_AmUmwy9rF8oW5qM1LO-NPHIqnR1uwSvu2ZPBDBxigjgZ3m8q8lirVwSgHmY4OVEb1MWBa5uHCFKYKlEZCdeU_DKl3eb52Nnou7nKyBphgarI7LZ5-ufQPCxzeablED4rAnzTEoov3HQ1vHjS_nF71aZ4tNAR98vFpbhH1sBJolvf65omWa15ezCEsbyhCrvKmcZuGJHXMSXkxcbZOJWivV6sLLNQDZq6FF8AOKMDXTHFVJDYO94eB_F9GAEW4q9evuZaQ.fN1JXyIfuzoK0yAG4om3LQ",
                expiresIn: 1607939043,
                email: this.mInstitute.email,
                instituteId: this.mInstitute.id,
                creator: this.mInstitute.creator,
                user: this.mInstitute.user,
            };
            // document.cookie =
            //     "banhji-token=" +
            //     JSON.stringify(cookie) +
            //     ";domain=.localhost;path=/;expires=Fri, 31 Dec 9999 12:00:00 GMT;";
            let value = JSON.stringify(cookie);
            let expires = "";
            let name = "banhji-token";
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        onChanged() {
            this.writeToCookie();
            //reload
            this.$router.go(this.$router.currentRoute);
            // this.$router.push({
            //     name: 'Suppliers', params: {
            //         data: data
            //     }
            // })
            // window.console.log(this.mInstitute)
        },
        async loadInstitutes() {
            window.console.log(this.mInstitute.creator);
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    instituteHandler.getCompany(this.mInstitute.creator).then((res) => {
                        window.console.log(res);
                        res.forEach((i) => {
                            this.institutes.push({
                                id: i.id,
                                banhjiId: i.banhjiId,
                                name: i.name,
                                email: this.mInstitute.email,
                                user: this.mInstitute.user,
                                creator: this.mInstitute.creator,
                            });
                        });
                    });
                }, 300);
            });
        },
        async loadInstitute() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    otherHandler.institute().then((res) => {
                        window.console.log(res, "--");
                        this.institutes = res;
                    });
                }, 300);
            });
        },
    },
    computed: {
    },
};
</script>
<style scoped>
.k-chart {
    height: 173px !important;
}

.five {
    font-weight: 700;
    font-size: 26px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

/*.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {*/
/*    border-top: thin solid rgba(0, 0, 0, 0.12) !important;*/
/*}*/

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
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

.round_checkbox label:after {
    content: "";
    height: 7px;
    left: 3px !important;
    opacity: 0;
    position: absolute;
    top: 4px !important;
}

.round_checkbox label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 20px !important;
    left: 0;
    position: absolute;
    top: 0;
    width: 20px !important;
}

.dark_grey {
    color: #7e7a7a;
}
.font_19{
    font-size: 19px;
}

@media (max-width: 576px) {
}
</style>
