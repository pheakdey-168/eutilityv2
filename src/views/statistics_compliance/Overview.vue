<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12" class="pb-0">
                    <v-row>
                        <v-col class="py-0 px-md-2" sm="4" cols="12">
                            <v-card
                                color="white"
                                outlined
                                dense
                                class="pa-4 mt-4 no_border"
                                min-height="338"
                                style="margin-top: 0!important;text-align: center;"
                            >
                                <img
                                    :src="logoUrl"
                                    width="55%"
                                    :alt="$t('please_upload_your_logo')"
                                    class="mt-4"
                                />
                                <h3 class="font_20 pb-1 mt-4">{{ institute.name }}</h3>
                                <p class="mb-0">
                                    {{ $t("Here is your business at a glance") }}
                                </p>
                            </v-card>
                            <v-card
                                color="white"
                                outlined
                                dense
                                class="pa-4 mt-4 no_border"
                                min-height="338"
                            >
                                <h3 class="font_20 pb-1">{{ $t("marketing_business") }}</h3>
                                <p class="mb-0">{{ $t("from_the_beginning_of_the_year") }}</p>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pr-0 pb-0">
                                        <template>
                                            <v-simple-table>
                                                <template>
                                                    <tbody>
                                                    <tr>
                                                        <td colspan="2" class="text-right ">
                                                            <h2 class="primary--text mb-0 niradei_black pa-0 col-sm-12 text-right">
                                                                0
                                                            </h2>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("total_revenue") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left tdbig" style="width: 45%;">
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("gross_profit_margin") }}
                                                                </span>
                                                        </td>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_20 dark_grey">
                                                                   0%
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left tdbig" style="width: 45%;">
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("budget_completion") }}
                                                                </span>
                                                        </td>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_20 dark_grey">
                                                                   0%
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left tdbig" style="width: 45%;">
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("of_the_total_revenue") }}
                                                                </span>
                                                        </td>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_20 dark_grey">
                                                                   0%
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
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
                                <h3 class="font_20 pb-1">{{ $t("member_share") }}</h3>
                                <p class="mb-0">{{ $t("as_of_today") }}</p>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pr-0 pb-0">
                                        <template>
                                            <v-simple-table>
                                                <template>
                                                    <tbody>
                                                    <tr>
                                                        <td class="text-right ">
                                                            <h2 class="primary--text mb-0 niradei_black pa-0 col-sm-12 text-right">
                                                                {{totalShare}}
                                                            </h2>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("subscribed_share") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right ">
                                                            <h2 class="primary--text mb-0 niradei_black pa-0 col-sm-12 text-right">
                                                                {{totalMember}}
                                                            </h2>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("total_number_of_member") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right ">
                                                                <span class="niradei_heavy font_18 dark_grey">
                                                                    {{avgSharePerMember}}
                                                                </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("average_share_per_member") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right ">
                                                                <span class="niradei_heavy font_18 dark_grey">
                                                                    0
                                                                </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("total_liabilities") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
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
                                <h3 class="font_20 pb-1">{{ $t("supply_business") }}</h3>
                                <p class="mb-0">{{ $t("from_the_beginning_of_the_year") }}</p>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pr-0 pb-0">
                                        <template>
                                            <v-simple-table>
                                                <template>
                                                    <tbody>
                                                    <tr>
                                                        <td colspan="2" class="text-right ">
                                                            <h2 class="primary--text mb-0 niradei_black pa-0 col-sm-12 text-right">
                                                                0
                                                            </h2>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("total_revenue") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left tdbig" style="width: 45%;">
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("gross_profit_margin") }}
                                                                </span>
                                                        </td>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_20 dark_grey">
                                                                   0%
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left tdbig" style="width: 45%;">
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("budget_completion") }}
                                                                </span>
                                                        </td>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_20 dark_grey">
                                                                   0%
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left tdbig" style="width: 45%;">
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("of_the_total_revenue") }}
                                                                </span>
                                                        </td>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_20 dark_grey">
                                                                   0%
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
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
                                <h3 class="font_20 pb-1">{{ $t("saving_credit_business") }}</h3>
                                <p class="mb-0">{{ $t("from_the_beginning_of_the_year") }}</p>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pr-0 pb-0">
                                        <template>
                                            <v-simple-table>
                                                <template>
                                                    <tbody>
                                                    <tr>
                                                        <td class="text-right ">
                                                            <h2 class="primary--text mb-0 niradei_black pa-0 col-sm-12 text-right">
                                                                {{totalLoan}}
                                                            </h2>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("loan_outstanding") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right ">
                                                            <h2 class="primary--text mb-0 niradei_black pa-0 col-sm-12 text-right">
                                                                {{totalSavingAmount}}
                                                            </h2>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("saving_balance") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right ">
                                                                <span class="niradei_heavy font_18 dark_grey">
                                                                    {{ numberFormat(avgDepositPerMember) }}
                                                                </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                {{ $t("average_deposit_per_member") }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-right ">
                                                                <span class="niradei_heavy font_18 dark_grey">
                                                                    {{avgLoanPerMember}}
                                                                </span>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("average_loan_per_member") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
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
                                <h3 class="font_20 pb-1">{{ $t("service_business") }}</h3>
                                <p class="mb-0">{{ $t("from_the_beginning_of_the_year") }}</p>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pr-0 pb-0">
                                        <template>
                                            <v-simple-table>
                                                <template>
                                                    <tbody>
                                                    <tr>
                                                        <td colspan="2" class="text-right ">
                                                            <h2 class="primary--text mb-0 niradei_black pa-0 col-sm-12 text-right">
                                                                0
                                                            </h2>
                                                            <br/>
                                                            <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("total_revenue") }}
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left tdbig" style="width: 45%;">
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("gross_profit_margin") }}
                                                                </span>
                                                        </td>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_20 dark_grey">
                                                                   0%
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left tdbig" style="width: 45%;">
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("budget_completion") }}
                                                                </span>
                                                        </td>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_20 dark_grey">
                                                                   0%
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-left tdbig" style="width: 45%;">
                                                                <span class="niradei_medium font_14 grey--text">
                                                                    {{ $t("of_the_total_revenue") }}
                                                                </span>
                                                        </td>
                                                        <td class="text-right">
                                                                <span class="niradei_heavy font_20 dark_grey">
                                                                   0%
                                                                </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                    </v-col>
                                </v-row>
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
// import {Chart} from "@progress/kendo-charts-vue-wrapper";
import kendo from "@progress/kendo-ui"

const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
const instituteHandler = require("@/scripts/instituteHandler");
const otherHandler = require("@/scripts/otherHandler");
const store = require("@/institute");
import {setTabActiveBudget} from '@/observable/store';

const $ = kendo.jQuery
export default {
    components: {
        // chart: Chart,
    },
    data: () => ({
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
        categoryAxisBar: [],
        valueAxisBar: [],
        tooltipBar: [],
        memberSeries: [
            {
                type: "pie",
                startAngle: 180,
                data: [
                    {
                        category: i18n.t("bad_loans"),
                        value: 22,
                        color: "#D85604",
                    },
                    {
                        category: i18n.t("total_loan_to_members"),
                        value: 70,
                        color: "#c80000",
                    },
                    {
                        category: i18n.t("total_loan_to_customers"),
                        value: 20,
                        color: "#F44336",
                    },
                    // {
                    //     category: i18n.t("overdraft"),
                    //     value: 22,
                    //     color: "#E88D14",
                    // },
                ],
            },
        ],
        //Bar
        seriesBar: [
            {
                name: "Total Visits",
                data: [56000, 63000, 74000, 900, 117000, 138000],
                color: '#4d4848',
                border: {
                    width: 0
                },
            },
            {
                name: "Unique visitors",
                data: [52000, 34000, 23000, 48000, 67000, 83000],
                color: '#898C8F',
                border: {
                    width: 0
                },
            },
        ],
        labelTemplate: "#= category # #= value #%",
        tooltipTemplate: "#= category # : #= value #%",
        series: [
            {
                type: "pie",
                startAngle: 180,
                data: [
                    {
                        category: i18n.t("bad_loans"),
                        value: 22,
                        color: "#D85604",
                    },
                    {
                        category: i18n.t("total_loan_to_members"),
                        value: 70,
                        color: "#c80000",
                    },
                    {
                        category: i18n.t("total_loan_to_customers"),
                        value: 20,
                        color: "#F44336",
                    },
                    // {
                    //     category: i18n.t("overdraft"),
                    //     value: 22,
                    //     color: "#E88D14",
                    // },
                ],
            },
        ],
        series1: [
            {
                type: "pie",
                startAngle: 180,
                data: [
                    {
                        category: i18n.t("total_share"),
                        value: 60,
                        color: "#D85604",
                    },
                    {
                        category: i18n.t("total_saving"),
                        value: 30,
                        color: "#c80000",
                    },
                    {
                        category: i18n.t("other_capital"),
                        value: 10,
                        color: "#F44336",
                    },
                    // {
                    //     category: i18n.t("overdraft"),
                    //     value: 22,
                    //     color: "#E88D14",
                    // },
                ],
            },
        ],
        series_line: [
            {
                type: "line",
                name: "Price",
                data: [0, 500000, 400000, 600000, 900000, 200000],
                color: "#F44336",
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
                max: 1,
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
                        color: "#D85604",
                    },
                    {
                        value: 22,
                        color: "#E88D14",
                    },
                    {
                        value: 45,
                        color: "#c80000",
                    },
                    {
                        value: 11,
                        color: "#F44336",
                    },
                ],
                color: "#F44336",
            },
        ],
        valueAxis_round: [
            {
                labels: {
                    format: "{0}",
                },
            },
        ],
        totalMember: 0,
        totalMaleMember: 0,
        totalFemaleMember: 0,
        //share
        totalShare: 0,
        totalFemaleShare: 0,
        totalMaleShare: 0,
        totalFemaleP: 0,
        totalSharePrice: 0,
        asOf: new Date(),
        shareList: [],
        decimals: [],
        //loan
        loanList: [],
        totalLoanMember: 0,
        totalLMember: 0,
        totalLoanCustomer: 0,
        totalLoan: 0,
        //par
        provision: 0,
        late30: 0,
        late60: 0,
        late90: 0,
        over90: 0,
        totalProvision: 0,
        //saving
        totalSaving: 0,
        totalSavingAmount: 0,
        totalSavingFemaleA: 0,
        totalSavingFemaleP: 0,
        l: [],
        logoUrl: '@/assets/images/sample_logo.png',
        institute: {},
        memberList: [],
        avgSharePerMember: 0,
        avgLoanPerMember: 0,
        avgDepositPerMember: 0,
    }),
    mounted: async function () {
        await this.loadDecimal()
        await this.loadInstitute();
        await this.loadInstitutes();
        await this.getCookieData();
        await this.loadMember()
        // await this.loadShare()
        // await this.loadLoan()
        await this.loadPar()
        await this.loadSaving()
        await this.loadInstLogo()
        // await this.loadDeposit()
    },
    methods: {
        ReporttAmontBudget() {
            setTabActiveBudget(1, 2)
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
                let data = store.default.state.cookies
                this.mInstitute = {
                    id: data.instituteId,
                    name: data.email,
                    email: data.email,
                    user: data.user,
                    creator: data.creator,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                };
                // if (
                //     data.user.hasOwnProperty("custom:firstName") ||
                //     data.user.hasOwnProperty("custom:lastName")
                // ) {
                //     if (
                //         data.user["custom:firstName"] !== "" ||
                //         data.user["custom:lastName"] !== ""
                //     ) {
                //         let avatar =
                //             data.user["custom:firstName"].charAt(0).toUpperCase() +
                //             data.user["custom:lastName"].charAt(0).toUpperCase();
                //         store.default.commit("setAvatarLetter", avatar);
                //     }
                // }
            }
            // window.console.log(this.mInstitute, "avatar");
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
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    // this.loadInstLogo()
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
        async loadDecimal() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.decimalGet().then(res => {
                        this.decimals = res.data.data
                    })
                }, 300);
            })
        },
        async loadMember() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.memberList = []
                    memberHandler.center().then(res => {
                        this.showLoading = false
                        this.l = res.data.data
                        this.memberList = res.data.data
                        this.totalMember = this.l.length
                        if(this.l.length > 0){
                            let femal = 0
                            let mal = 0
                            $.each(this.l, function (i,v){
                                if(v.gender == 1){
                                    mal += 1
                                }else{
                                    femal += 1
                                }
                            })
                            this.totalFemaleMember = femal
                            this.totalMaleMember = mal
                            this.loadShare()
                            this.loadLoan()
                            this.loadDeposit()
                        }
                    })
                }, 300);
            })
        },
        async loadShare() {
            if (this.asOf) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            asOf: this.asOf
                        }
                        memberHandler.listShareReport(data).then(res => {
                            this.shareList = res.data.data
                            if (this.shareList.length > 0) {
                                let totalShare = 0, mal = 0, femal = 0, fo = 0, locale = '', self = this,
                                    totalSharePr = 0
                                $.each(this.shareList, function (i, v) {
                                    totalShare += parseInt(v.shareAmount) - parseInt(v.withdrawShare)
                                    if (v.member.genderName == "Male" || v.member.genderName == "ប្រុស") {
                                        mal += totalShare * v.sharePrice
                                    } else {
                                        femal += totalShare * v.sharePrice
                                    }
                                    locale = v.pricePerShare.currency.code
                                    let dec = self.decimals.filter((obj) => {
                                        return obj.currency.code == locale
                                    })
                                    if (dec.length > 0) {
                                        fo = dec[0].decimal
                                    }
                                    totalSharePr += (parseInt(v.shareAmount) - parseInt(v.withdrawShare)) * v.sharePrice
                                })
                                let fp = (femal / mal) * 0
                                this.totalFemaleP = fp + '%'
                                this.totalMaleShare = kendo.toString(mal, 'n' + fo) + locale
                                this.totalFemaleShare = kendo.toString(femal, 'n' + fo) + locale
                                this.totalShare = totalShare
                                this.avgSharePerMember = (totalShare / this.totalMember).toFixed(2)
                                this.totalSharePrice = kendo.toString(totalSharePr, 'n' + fo) + locale
                            }
                        })
                    }, 300);
                })
            }
        },
        async loadLoan() {
            if (this.asOf) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            asOf: this.asOf
                        }
                        memberHandler.getLoanDisburseReport(data).then(res => {
                            this.showLoading = false
                            this.loanList = res.data.data
                            if (this.loanList.length > 0) {
                                let self = this, totalM = 0, totalMA = 0, totalCA = 0, total = 0, fo = 0, locale = ''
                                $.each(this.loanList, function (i, v) {
                                    locale = v.loan.loanProduct.currency.code
                                    let dec = self.decimals.filter((obj) => {
                                        return obj.currency.code == locale
                                    })
                                    fo = 0
                                    if (dec.length > 0) {
                                        fo = dec[0].decimal
                                    }
                                    total += parseFloat(v.totalPayment) - parseFloat(v.totalInterest)
                                    let a = v.member.id.substr(0, 4)
                                    if (a == 'ac-m') {
                                        totalM += 1
                                        totalMA += parseFloat(v.totalPayment) - parseFloat(v.totalInterest)
                                    } else {
                                        totalCA += parseFloat(v.totalPayment) - parseFloat(v.totalInterest)
                                    }
                                })
                                this.totalLoan = kendo.toString(total, 'n' + fo)
                                this.totalLMember = totalM
                                this.totalLoanMember = kendo.toString(totalMA, 'n' + fo)
                                this.totalLoanCustomer = kendo.toString(totalCA, 'n' + fo)
                            }
                        })
                    }, 300);
                })
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    memberHandler.loanCenterGet().then(res => {
                        window.console.log(res.data.data.length, 'loan center')
                        if(res.data.data.length > 0) {
                            this.avgLoanPerMember = (res.data.data.length / this.totalMember).toFixed(2)
                            // window.console.log(this.avgLoanPerMember, 'avg loan')
                        }
                    })
                }, 300);
            })
        },
        async loadPar() {
            if (this.asOf) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            asOf: this.asOf
                        }
                        memberHandler.loanPortfolioReport(data).then(res => {
                            this.showLoading = false
                            this.loanList = res.data.data
                            window.console.log(this.loanList, 'loan po')
                            let self = this, lines = [], pAr = [], locale = '', fo = 0
                            $.each(this.loanList, function (i, v) {
                                locale = v.loanProduct.currency.code
                                let dec = self.decimals.filter((obj) => {
                                    return obj.currency.code == locale
                                })
                                if (dec.length > 0) {
                                    fo = dec[0].decimal
                                }
                                if ($.inArray(v.loanProduct.id, pAr) == -1) {
                                    pAr.push(v.loanProduct.id)
                                    lines.push({
                                        productId: v.loanProduct.id,
                                        memberId: v.memberId,
                                        disburseId: v.disbursementId,
                                        loanProduct: v.loanProduct.name,
                                        outstanding: 0,
                                        late30: 0,
                                        late60: 0,
                                        late90: 0,
                                        over90: 0,
                                        provision: 0,
                                        provisionP: 0,
                                        locale: locale,
                                        numberFormat: 'n' + fo
                                    })
                                }
                            })
                            if (lines.length > 0) {
                                let loan = this.loanList
                                let dAr = []
                                $.each(lines, function (i, v) {
                                    let d = loan.filter((obj) => {
                                        return obj.loanProduct.id === v.productId
                                    })
                                    if (d.length > 0) {
                                        let letb = 0
                                        $.each(d, function (j, k) {
                                            if ($.inArray(k.disburseId, dAr) == -1) {
                                                window.console.log(v.receiptDate)
                                                v.outstanding += parseFloat(k.outStanding)
                                                letb = parseFloat(k.data.total)
                                                // not in array
                                                dAr.push(k.disburseId)
                                            }
                                            // letb += parseFloat(k.data.total)
                                        })
                                        if (d.length == 1) {
                                            v.late30 += letb
                                        } else if (d.length == 2) {
                                            v.late60 += letb
                                        } else if (d.length == 3) {
                                            v.late90 += letb
                                        } else {
                                            v.over90 += letb
                                        }
                                    }
                                })
                                $.each(lines, function (i, v) {
                                    let l = 0
                                    if (v.over90 > 0) {
                                        v.provision = v.over90
                                        v.provisionP = (v.over90 / v.outstanding) * 0
                                    } else if (v.late90 > 0) {
                                        l = v.late90 * 0.3
                                        v.provision = l
                                        v.provisionP = (l / v.outstanding) * 0
                                    } else if (v.late60) {
                                        l = v.late60 * 0.1
                                        v.provision = l
                                        v.provisionP = (l / v.outstanding) * 0
                                    }
                                })
                            }
                            if (lines.length > 0) {
                                let l30 = 0, l60 = 0, l90 = 0, o90 = 0, p = 0
                                $.each(lines, function (i, v) {
                                    if (v.over90 > 0) {
                                        o90 += v.over90
                                    } else if (v.late90 > 0) {
                                        l90 += v.late90
                                    } else if (v.late60 > 0) {
                                        l60 += v.late60
                                    } else if (v.late30 > 0) {
                                        l30 += v.late30
                                    } else if (v.provision > 0) {
                                        p += v.provision
                                    }
                                })
                                this.late30 = kendo.toString(l30, 'n' + fo) + locale
                                this.late60 = kendo.toString(l60, 'n' + fo) + locale
                                this.late90 = kendo.toString(l90, 'n' + fo) + locale
                                this.over90 = kendo.toString(o90, 'n' + fo) + locale
                                this.provision = kendo.toString(p, 'n' + fo) + locale
                                this.totalProvision = kendo.toString(l30 + l60 + l90 + o90 + p, 'n' + fo) + locale
                            }
                        })
                    }, 300);
                })
            }
        },
        async loadSaving() {
            if (this.asOf) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            asOf: this.asOf
                        }
                        memberHandler.getSavingListReport(data).then(res => {
                            this.showLoading = false
                            this.l = res.data.data
                            window.console.log(this.l)
                            if (this.l.length > 0) {
                                this.totalSaving = this.l.length
                                let self = this, locale = '', fo = 0, total = 0, mal = 0, femal = 0
                                this.listsaving = []
                                $.each(this.l, function (i, v) {
                                    locale = v.product.currency.code
                                    let dec = self.decimals.filter((obj) => {
                                        return obj.currency.code == locale
                                    })
                                    if (dec.length > 0) {
                                        fo = dec[0].decimal
                                    }
                                    if (v.member.gender == 1) {
                                        mal += (parseFloat(v.deposit) + parseFloat(v.interest)) - parseFloat(v.withdraw)
                                    } else {
                                        femal += (parseFloat(v.deposit) + parseFloat(v.interest)) - parseFloat(v.withdraw)
                                    }
                                    total += (parseFloat(v.deposit) + parseFloat(v.interest)) - parseFloat(v.withdraw)
                                })
                                this.totalSavingAmount = kendo.toString(total, 'n' + fo)
                                this.totalSavingFemaleA = kendo.toString(femal, 'n' + fo)
                                let p = (femal / mal) * 0
                                this.totalSavingFemalP = p + '%'
                            }
                        })
                    }, 300);
                })
            }
        },
        loadInstLogo() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    window.console.log(store.default.state.institute, 'insti')
                    this.institute = store.default.state.institute
                    if (store.default.state.institute.imgProfile) {
                        this.logoUrl = store.default.state.institute.imgProfile.bigThumb
                    }
                }, 500);
            })
        },
        numberFormat(value) {
            value = parseFloat(value)
            value = parseFloat(value.toFixed(2))
            return kendo.toString(value, 'n0')
        },
        async loadDeposit() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        asOf: kendo.toString(new Date(this.asOf), 'yyyy-MM-dd')
                    }
                    memberHandler.getSavingDepositReport(data).then(res => {
                        this.showLoading = false
                        if(res.data.data.length > 0){
                            let amt = 0
                            $.each(res.data.data, function (i,v){
                                amt += v.amount
                            })
                            this.avgDepositPerMember = (amt / this.totalMember).toFixed(2)
                        }
                    })
                }, 300);
            })
        },
    },
    computed: {
        lang() {
            return "/" + i18n.locale;
        },
    }
};
</script>
<style scoped>
.k-chart {
    height: 177px !important;
}

.five {
    font-weight: 700;
    font-size: 26px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.tdbig {
    height: 50px !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

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

.path {
    stroke: gainsboro !important;
}

h3 {
    text-transform: uppercase;
}

@media (max-width: 576px) {
}
</style>
