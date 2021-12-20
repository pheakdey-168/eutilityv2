<template>
  <v-row>
    <v-col class="pb-0 pt-4" sm="12" cols="12">
      <v-row>
        <v-col class="pt-0 pb-md-2 pr-md-2" sm="4" cols="12">
          <div class="d-flex">
            <v-card
              outlined
              dense
              color="primary"
              class="pa-2 mb-4 flex-1 no_border niradei_bold"
              min-height="62px"
            >
              <v-row>
                <h6 class="col-sm-12 col-md-5 font_34 white--text">
                  {{ activeLoanPayment }}
                </h6>
                <h4
                  class=" text-right flex_right white--text py-0 col-sm-12 col-md-7 font_16 text-uppercase"
                >
                  <span  class="float-right">{{
                    $t("loan_to_be_repaid")
                  }}</span>
                </h4>
              </v-row>
            </v-card>
            <v-btn style="height:62px !important;" color="primary" class="ml-1">
              <v-icon @click="loadData()" size="30" color="white"
                >mdi-reload</v-icon
              >
            </v-btn>
          </div>
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="228"
            color="grayBg"
          >
            <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
              {{ $t("outstanding_loans") }}
            </h3>
            <p class="mb-0">
              {{ $t("as_of_today") }}
            </p>
            <h2
              class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
            >
              {{ numberFormat(outstandingBalance) }}
            </h2>
            <template>
              <v-simple-table class="mb-3">
                <template>
                  <tbody>
                    <tr>
                      <td class="text-left pl-0" style="width: 50%;">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("no_of_loans") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ activeLoan }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left pl-0">
                        <span class="niradei_medium font_14 grey--text">
                          {{ $t("average_interest_rate") }}
                        </span>
                      </td>
                      <td class="text-right pr-0">
                        <span class="niradei_heavy font_18 dark_grey">
                          {{ avgInterest }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
            <v-row>
              <v-col class="pl-0 py-0 text-right align-self-end">
                <router-link
                  to=""
                  class="mb-0 niradei_bold font_16 primary--text text-right"
                  >{{ $t("view_report") }}
                </router-link>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- <v-col class="pt-0 pb-md-2 px-md-2" sm="4" cols="12">
                  <v-card
                    outlined
                    dense
                    color="third"
                    class="pa-3 mb-4 no_border niradei_bold "
                    min-height="65px"
                  >
                    <v-row>
                      <h6 class="white--text col-sm-12 col-md-5 font_34">10</h6>
                      <h4
                        class="text-right col-md-7 white--text col-sm-12 py-0 font_16 text-uppercase"
                      >
                        <span style="width: 70%;" class="float-right">{{
                          $t("active_application")
                        }}</span>
                      </h4>
                    </v-row>
                  </v-card>
                  <v-card
                    outlined
                    dense
                    class="pa-4 no_border"
                    min-height="228"
                    color="grayBg"
                  >
                    <h3 class="font_20" :class="{ line_34: this.$i18n.locale == 'kh' }">
                      {{ $t("available_credit") }}
                    </h3>
                    <p class="mb-0">
                      {{ $t("as_of_today") }}
                    </p>
                    <h2
                      class="primary--text mb-0 pa-0 niradei_black mb-0 col-sm-12 text-right"
                    >
                      150,000
                    </h2>
                    <template>
                      <v-simple-table class="mb-3">
                        <template>
                          <tbody>
                            <tr>
                              <td class="text-left pl-0" style="width: 50%;">
                                <span class="niradei_medium font_14 grey--text">
                                  {{ $t("no_of_loans") }}
                                </span>
                              </td>
                              <td class="text-right pr-0">
                                <span class="niradei_heavy font_18 dark_grey">
                                  99
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td class="text-left pl-0">
                                <span class="niradei_medium font_14 grey--text">
                                  {{ $t("average_interest_rate") }}
                                </span>
                              </td>
                              <td class="text-right pr-0">
                                <span class="niradei_heavy font_18 dark_grey">
                                  15%
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </template>
                    <v-row>
                      <v-col class="pl-0 py-0 text-right align-self-end">
                        <router-link
                          to=""
                          class="mb-0 niradei_bold font_16 primary--text text-right"
                          >{{ $t("view_report") }}</router-link
                        >
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col> -->
        <v-col class="pt-0 pb-md-2 pl-md-2" sm="8" cols="12">
          <v-card
            outlined
            dense
            color="grayBg"
            class="pa-4 no_border"
            min-height="307px"
          >
            <v-row>
              <v-col sm="12" cols="12" class="py-0">
                <h3
                  class="font_20"
                  :class="{ line_34: this.$i18n.locale == 'kh' }"
                >
                  {{ $t("loan_balance_repayment") }}
                </h3>
              </v-col>
            </v-row>
            <LoadingMe
              :isLoading="showLoadingProductGraph"
              :fullPage="false"
              :myLoading="true"
              :type="'loading'"
            />
            <!--                        <chart-->
            <!--                            ref="chart"-->
            <!--                            :legend-position="'bottom'"-->
            <!--                            :legend-visible="false"-->
            <!--                            :tooltip="tooltip"-->
            <!--                            :data-item="seriesLine"-->
            <!--                            :chartArea="chartArea1"-->
            <!--                            :category-axis-categories="categories_line"-->
            <!--                            :value-axis="valueAxis_line"-->
            <!--                            :theme="'sass'"-->
            <!--                        />-->
            <chart
              ref="revenueChart"
              :legend-position="'bottom'"
              :legend-visible="false"
              :tooltip="tooltip"
              :series="seriesLine"
              :series-defaults-type="'line'"
              :series-defaults-style="'smooth'"
              :category-axis-categories="categoryAxis"
              :value-axis-labels-format="'{0}'"
              :chartArea="chartArea1"
              :theme="'sass'"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col class="pb-0 pt-md-2 pr-md-2" sm="8" cols="12">
          <v-card
            outlined
            dense
            class="pa-4 no_border"
            min-height="220px"
            color="grayBg"
          >
            <v-row>
              <v-col sm="6" cols="12" class="py-0">
                <h3
                  class="font_20"
                  :class="{ line_34: this.$i18n.locale == 'kh' }"
                >
                  {{ $t("loan_analysis") }}
                </h3>
                <p class="mb-3">
                  {{ $t("from_the_beginning_year") }}
                </p>
                <LoanAnalysis />
              </v-col>
              <v-col sm="6" cols="12" class="py-0">
                <!--                                <chart ref="revenueChart"-->
                <!--                                       :legend-position="'bottom'"-->
                <!--                                       :legend-visible="false"-->
                <!--                                       :tooltip="tooltip"-->
                <!--                                       :series="typeLoanSeries"-->
                <!--                                       -->
                <!--                                       :series-defaults-style="'smooth'"-->
                <!--                                       :category-axis-categories="categoryAxis"-->
                <!--                                       :value-axis-labels-format="'{0}'"-->
                <!--                                       :chartArea="chartArea1"-->
                <!--                                       :theme="'sass'"-->
                <!--                                />-->
                <chart
                  ref="tLoan"
                  :legend-visible="false"
                  :series-defaults-type="'pie'"
                  :series-defaults-labels-visible="false"
                  :series="typeLoanSeries"
                  :tooltip-template="tooltipTemplate"
                  :chartArea="chartAreaChart"
                  :tooltip-visible="true"
                  :height="100"
                  :value-axis-labels-format="'{0}'"
                  :theme="'sass'"
                />
                <p class="text-center mt-n5">{{ $t("loan_by_types") }}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="pb-0 pt-md-2 pl-md-2" sm="4" cols="12">
          <v-card
            outlined
            dense
            color="grayBg"
            class="pa-4 no_border"
            min-height="239px"
          >
            <div class="d-flex">
              <img
                class="change_color"
                style="height:70px;"
                src="@/assets/images/clipboard.png"
              />

              <h3
                @click="tabActive"
                class="primary--text mt-1 font_20 pointer"
                style="line-height: 22px"
              >
                {{ $t("what_know_before_loan") }}:
              </h3>
            </div>

            <div cols="12" class="py-0 font_17">
              <ul style="padding: 0 25px">
                <li>{{ $t("what_know_before_loan_list1") }}</li>
                <li>{{ $t("what_know_before_loan_list2") }}</li>
                <li>{{ $t("what_know_before_loan_list3") }}</li>
              </ul>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { i18n } from "@/i18n";
import { Chart } from "@progress/kendo-charts-vue-wrapper";

const loanHandler = require("@/scripts/financing/handler/loanHandler");
import kendo from "@progress/kendo-ui";

const $ = kendo.jQuery;
import saleFormContentHandler from "@/scripts/saleFormContentHandler";
import Helper from "@/helper";
import { entityTypeHandler } from "@/scripts/AppHandlers";
import { EntityType } from "@/scripts/default_setup/Collections";

export default {
  components: { 
    chart: Chart,
    LoadingMe: () => import(`@/components/Loading`),
    LoanAnalysis: () => import(`./insight/LoanAnalysis`)
  },
  data: () => ({
    /* Obj */
    activeLoanPayment: 0,
    outstandingBalance: 0,
    activeLoan: 0,
    avgInterest: 0,
    loanInfo: {},
    labelTemplate: "#= category # #= value #%",
    tooltipTemplate: "#= category # : #= kendo.toString(value, `n2`)#",
    showLoadingProductGraph: false,
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
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
            color: "#c80000",
          },
          {
            category: i18n.t("working_capital"),
            value: 45,
            color: "#f44336",
          },
          {
            category: i18n.t("investment"),
            value: 11,
            color: "#d85604",
          },
          {
            category: i18n.t("overdraft"),
            value: 22,
            color: "#e88d14",
          },
        ],
      },
    ],
    typeLoanSeries: [],
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
    // line chart area
    seriesLine: [],
    categoryAxis: [],
    // seriesLine: [
    //     {
    //         type: "line",
    //         name: i18n.t('loan_balance'),
    //         data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    //         color: "#ED1A3A",
    //         border: {
    //             width: 0,
    //         },
    //     },
    //     {
    //         type: "line",
    //         name: i18n.t('repayment'),
    //         data: [12, 10, 9, 8, 7, 6, 7, 8, 9, 10, 11, 20],
    //         color: "#898C8F",
    //     },
    // ],
    categories_line: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    chartArea1: {
      background: "transparent",
      height: 245,
    },
    valueAxis_line: [
      {
        max: 100,
        // visible: false,
        labels: {
          format: "{0}",
        },
      },
    ],
    tooltip: {
      visible: true,
      template: "#= series.name #: #= kendo.toString(value, `n2`) #",
    },
    saleFormContent: {},
  }),
  methods: {
    numberFormat(value) {
      // window.console.log(this.saleFormContent.decimal,'nimol')
      return kendo.toString(value, `n${this.saleFormContent.decimal}`);
      // return value
    },
    tabActive() {
      this.$emit("tabActive", 2);
    },
    async refreshGrid() {
      this.loadLoanBalance();
      this.loadRepaymentLoan();
      /* Set Current Fiscal Date */
      let currencyFiscalDate = Helper.getFiscalDateByDate(new Date());

      /* Set Fiscal Months */
      let fiscalMonths = [],
        sdate = new Date(currencyFiscalDate.start_date),
        edate = new Date(currencyFiscalDate.end_date);
      while (sdate <= edate) {
        let currentMonth = sdate.getMonth() + 1;
        fiscalMonths.push(
          kendo.toString(
            new Date(new Date().getFullYear() + "-" + currentMonth + "-01"),
            "MMM"
          )
        );

        // Next Month
        sdate.setMonth(currentMonth);
      }

      /* Set Categories Axis */
      this.categoryAxis = fiscalMonths;

      /* Load loan balance */
      let balance = await loanHandler.getBalanceMonthly();
      let balAR = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      balance.data.data.forEach((value) => {
        let m = new Date(value.month).getMonth();
        balAR[m] = value.amount;
      });

      /* Load repayment */
      let re = await loanHandler.getRepaymentMonthly();
      let reAR = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      re.data.data.forEach((value) => {
        let m = new Date(value.month).getMonth();
        reAR[m] = value.amount;
      });
      this.seriesLine = [
        {
          name: i18n.t("loan_balance"),
          data: balAR,
          color: "#4d4848",
        },
        {
          name: i18n.t("actual"),
          data: reAR,
          color: "#c80000",
        },
      ];
      /* Refresh Chart */
      let chartA = this.$refs.revenueChart.kendoWidget();
      chartA.refresh();

      /* get loan type */
      let loanType = await entityTypeHandler.getByEntityType(EntityType.LOAN);
      if (loanType.length > 0) {
        let tAR = [];
        let ind = 0;
        loanType.forEach((value) => {
          let b = balance.data.data.filter((obj) => {
            return obj.typeId == value.uuid;
          });
          let bamt = 0;
          if (b.length > 0) {
            b.forEach((v) => {
              bamt += parseFloat(v.amount);
            });
          }
          let color = [
            "#c80000",
            "#f44336",
            "#d85604",
            "#ED1A3A",
            "#cc1e1e",
            "#e88d14",
          ];
          tAR[ind] = { category: value.name, value: bamt, color: color[ind] };
          ind++;
        });
        if (tAR.length > 0) {
          this.typeLoanSeries = [
            {
              type: "pie",
              data: tAR,
            },
          ];

          let chartB = this.$refs.tLoan.kendoWidget();
          chartB.refresh();
        }
      }
      setTimeout(() => {
        let a = kendo.jQuery("#gridCollection").data("kendoGrid");
        if (a != undefined) {
          a.dataSource.read();
        }
        // window.console.log(this.seriesLine, 'chart')
        // this.seriesLine[0].data[0] = 300
        /* Bind Series */
      }, 1000);
    },
    loadLoanBalance() {
      loanHandler.summaryLoanBalance().then((res) => {
        if (res.data) {
          if (res.data.data.length > 0) {
            let d = res.data.data[0];
            this.activeLoan = d.approveLoan;
            this.avgInterest = (d.interestRate / d.approveLoan).toFixed(2);
            this.outstandingBalance = d.outstandingBalance;
          }
        }
      });
    },
    async loadSaleFormContent() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          saleFormContentHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              const data = res.data.data;
              if (data.length > 0) {
                this.saleFormContent = data[0];
                // window.console.log(data[0])
              }
            }
          });
        }, 10);
      });
    },
    async loadRepaymentLoan() {
      this.reportData = [];
      this.showLoading = true;
      const startDate = new Date().getFullYear() + "-01-01";
      const endDate = kendo.toString(new Date(), "yyyy-MM-dd");
      let strFilter = "?start=" + startDate + "&end=" + endDate;
      loanHandler.loanRepaymentReport(strFilter).then((res) => {
        if (res.data.data.length > 0) {
          let d = res.data.data;
          let loanAr = [];
          let repaymentCount = 0;
          $.each(d, function(i, v) {
            if ($.inArray(v.loanId, loanAr) != -1) {
              loanAr.push(v.loanId);
            } else {
              repaymentCount += 1;
            }
          });
          this.activeLoanPayment = repaymentCount;
        }
        this.showLoading = false;
      });
    },
    loadData() {
      this.loadSaleFormContent();
      this.refreshGrid();
    },
  },
  mounted() {
    this.loadSaleFormContent();
    this.refreshGrid();
  },
  watch: {
    $route: "refreshGrid",
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

/* .change_color{
    filter: invert(33%) sepia(77%) saturate(2344%) hue-rotate(131deg) brightness(104%) contrast(101%);
} */
</style>
