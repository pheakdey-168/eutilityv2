<template>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" class="pa-0">
          <div class="reports_list">
            <h2>{{ $t("statement_of_profit_or_loss") }}</h2>
            <!-- <v-icon
              onclick="window.history.go(-1); return false;"
              style="cursor: pointer; color: #333; font-size: 40px;"
              class="float-right"
              >close</v-icon
            > -->

            <div class="report_filter">
              <v-row>
                <v-col sm="12" cols="12">
                  <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                      <div v-if="columnBy === '1'">
                        <app-searchdate
                          :initStartDate="startDate"
                          @emitStartDate="startDate = $event"
                          :initEndDate="endDate"
                          @emitEndDate="endDate = $event"
                        />
                      </div>
                      <div v-else>
                        <app-fiscal-date-dropdownlist
                          :initFiscalDate="fiscalDate"
                          @emitFiscalDate="fiscalDate = $event"
                        />
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col class="py-0" sm="4" cols="4">
                      <label class="label text-uppercase">{{
                        $t("disable_column_by")
                      }}</label>
                      <v-select
                        class="mt-1"
                        :items="columnsBy"
                        item-text="text"
                        item-value="value"
                        v-model="columnBy"
                        clearable
                        outlined
                      />
                    </v-col>
                    <v-col sm="3" cols="4" class="py-0">
                      <div class="report_expor">
                        <label class="mb-1"
                          >{{ $t("reporting_language") }}:</label
                        >
                        <app-reporting-language
                          :initLanguage="reportingLanguage"
                          @emitLanguage="reportingLanguage = $event"
                        />
                      </div>
                    </v-col>
                    <v-col class="py-0" sm="3" cols="4">
                      <v-btn
                        class="white--text dv_mt"
                        color="primary"
                        @click="search"
                      >
                        {{ $t("run_report") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>

            <div class="reports_table">
              <v-row>
                <v-col sm="12" cols="12" class="custom_expansion mt-2">
                  <kendo-datasource
                    ref="statementPLDS"
                    :data="statementPLList"
                    :schema="schemaDefinition"
                    :sort="sortDefinition"
                    :group="groupDefinition"
                    :aggregate="aggregateDefinition"
                  />

                  <kendo-grid
                    id="gridSPL"
                    class="custom_grid"
                    :data-source-ref="'statementPLDS'"
                    :dataBound="dataBound"
                    :change="onGridChanges"
                    :selectable="true"
                    :persistSelection="true"
                    :sortable="true"
                    :column-menu="true"
                    :reorderable="true"
                    :resizable="true"
                    :noRecords="true"
                    :toolbar="['excel']"
                    :excel-file-name="'incomeStatement.xlsx'"
                    :excel-filterable="true"
                    :columns="columns"
                  />
                </v-col>
              </v-row>
            </div>
            <LoadingMe
              :isLoading="showLoading"
              :fullPage="false"
              :myLoading="true"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";

// const $ = require("jquery");
const store = require("@/institute.js");
const { institute } = store.default.state;
const { incomeStatementHandler } = require("@/scripts/AppHandlers");
const { columnsBy } = require("@/scripts/default_setup/DateSearch.js");
const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");
const NumberInWord = require("@/scripts/default_setup/NumberInWord.js");

export default {
  components: {
    LoadingMe: () => import("@/components/Loading"),
    "app-searchdate": () => import("@/components/custom_templates/SearchDate"),
    "app-reporting-language": () =>
      import("@/components/kendo_templates/ReportingLanguageDropDownList"),
    "app-fiscal-date-dropdownlist": () =>
      import("@/components/kendo_templates/FiscalYearDropDownList"),
  },
  data: () => ({
    // Obj
    startDate: "",
    endDate: "",
    statementPLList: [],
    columnBy: "1", //Default Total
    columnsBy: columnsBy,
    fiscalDate: institute.fiscalDate[0],
    fiscalDates: institute.fiscalDate,
    fiscalMonths: Helper.generateFiscalMonths(
      institute.fiscalDate[0].start_date,
      institute.fiscalDate[0].end_date,
      "12"
    ),
    Helper: Helper,
    // Reporting Language
    reportingLanguage: "english",
    fieldName: "name",
    fieldType: "type",
    // LodingMe
    showLoading: false,
    /* KENDO */
    columns: [],
    sortDefinition: { field: "number", dir: "asc" },
    groupDefinition: [],
    aggregateDefinition: [
      { field: "balance", aggregate: "sum" },
      { field: "zero", aggregate: "sum" },
      { field: "one", aggregate: "sum" },
      { field: "two", aggregate: "sum" },
      { field: "three", aggregate: "sum" },
      { field: "four", aggregate: "sum" },
      { field: "five", aggregate: "sum" },
      { field: "six", aggregate: "sum" },
      { field: "seven", aggregate: "sum" },
      { field: "eight", aggregate: "sum" },
      { field: "nine", aggregate: "sum" },
      { field: "ten", aggregate: "sum" },
      { field: "eleven", aggregate: "sum" },
    ],
    schemaDefinition: {
      model: { id: "accountUUID" },
    },
  }),
  methods: {
    /* KENDO */
    /* On grid changes => link to GL */
    onGridChanges() {
      let grid = kendo.jQuery("#gridSPL").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());

      this.$router.push({
        path: "general_ledger",
        query: {
          account_id: selectedItem.accountUUID,
          start_date: this.startDate,
          end_date: this.endDate,
        },
      });
    },
    // Search journals
    search() {
      let sdate = this.startDate,
        edate = this.endDate;

      // Generate Fiscal Months
      if (this.columnBy !== "1") {
        sdate = this.fiscalDate.start_date;
        edate = this.fiscalDate.end_date;

        this.fiscalMonths = Helper.generateFiscalMonths(
          sdate,
          edate,
          this.columnBy
        );
      }

      if (sdate && edate) {
        sdate =
          kendo.toString(new Date(sdate), "yyyy-MM-dd") + "T00:00:00.000Z";

        edate = new Date(edate);
        edate = kendo.toString(edate, "yyyy-MM-dd") + "T23:59:59.999Z";
      } else {
        sdate = 0;
        edate = 0;
      }

      // Empty dataSource
      let ds = this.$refs.statementPLDS.kendoWidget();
      ds.data([]);

      // Query
      this.showLoading = true;
      incomeStatementHandler
        .getIncomeStatement({
          params: {
            start_date: sdate,
            end_date: edate,
            group_by: this.columnBy,
          },
        })
        .then((res) => {
          if (res.data) {
            let entries = [];
            res.data.forEach((value) => {
              let entry = value;

              // Order
              if (
                value.account_type_number == OrderNumberPL.GrossProfit.number
              ) {
                // Gross Profit
                entry.order = OrderNumberPL.GrossProfit.order;
              } else if (
                value.account_type_number == OrderNumberPL.OtherRevenue.number
              ) {
                // Other Revenue
                entry.order = OrderNumberPL.OtherRevenue.order;
              } else if (
                value.account_type_number ==
                OrderNumberPL.OperatingExpense.number
              ) {
                // Operating Expense
                entry.order = OrderNumberPL.OperatingExpense.order;
              } else if (
                value.account_type_number ==
                OrderNumberPL.OperatingIncomeEBITDA.number
              ) {
                // Operating Income (EBITDA)
                entry.order = OrderNumberPL.OperatingIncomeEBITDA.order;
              } else if (
                value.account_type_number ==
                OrderNumberPL.EarningBeforeInterestAndTaxEBIT.number
              ) {
                // Earning Before Interest And Tax(EBIT)
                entry.order =
                  OrderNumberPL.EarningBeforeInterestAndTaxEBIT.order;
              } else if (
                value.account_type_number ==
                OrderNumberPL.ProfitBeforeTax.number
              ) {
                // Profit Before Tax
                entry.order = OrderNumberPL.ProfitBeforeTax.order;
              } else if (
                value.account_type_number ==
                OrderNumberPL.ProfitForThePeriod.number
              ) {
                // Profit For The Period
                entry.order = OrderNumberPL.ProfitForThePeriod.order;
              } else {
                entry.order = value.account_type_number;
              }

              entries.push(entry);
            });

            this.statementPLList = entries;
            this.generateColumn();
          }
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    // Row Template
    accountTmpl(dataItem) {
      let name = dataItem.number;

      if (this.reportingLanguage === "local") {
        name += " - " + dataItem.local_name;
      } else {
        name += " - " + dataItem.name;
      }

      return name;
    },
    typeGroupHeaderTmpl(dataItem) {
      let name = dataItem.items[0].type;

      if (this.reportingLanguage === "local") {
        name = dataItem.items[0].type_local_name;
      }

      return "<span class='text-bold text-black'>" + name + "</span>";
    },
    /* Databound */
    dataBound(e) {
      let grid = e.sender;

      grid.dataSource.data().forEach((value) => {
        if (value.account_type_number >= 100) {
          let row = grid.tbody
            .find("tr[data-uid='" + value.uid + "']")
            .prev(".k-grouping-row");
          grid.collapseGroup(row);
        }
      });
    },
    // Generate Columns
    generateColumn() {
      let defaultColumns = [
        {
          field: this.fieldName,
          title: i18n.t("account"),
          template: this.accountTmpl,
          locked: true,
          width: 300,
        },
        {
          field: this.fieldType,
          title: "TYPE",
          hidden: true,
          groupHeaderTemplate: this.typeGroupHeaderTmpl,
          width: 300,
        },
        {
          field: "statementGroup",
          title: "STATEMENT GROUP",
          hidden: true,
          groupHeaderTemplate:
            "<span class='text-bold text-black'>#=value#</span>",
          width: 300,
        },
        {
          field: "groupNature",
          title: "NATURE",
          hidden: true,
          groupHeaderTemplate:
            "<span class='text-bold text-black'>#=value#</span>",
          width: 300,
        },
      ];

      let headerAttributes = {
          class: "table-header-cell",
          style: "text-align: right; font-size: 14px",
        },
        attributes = {
          class: "table-cell",
          style: "text-align: right; font-size: 14px",
        };

      switch (this.columnBy) {
        case "12": // MONTH
          for (let i = 0; i < 12; i++) {
            defaultColumns.push({
              field: NumberInWord[i],
              title: this.fiscalMonths[i],
              format: "{0:n}",
              width: 200,
              aggregates: "['sum']",
              groupHeaderColumnTemplate:
                "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
              headerAttributes: headerAttributes,
              attributes: attributes,
            });
          }

          this.columns = defaultColumns;

          break;

        case "4": // QUARTER
          for (let i = 0; i < 4; i++) {
            defaultColumns.push({
              field: NumberInWord[i],
              title: this.fiscalMonths[i],
              format: "{0:n}",
              width: 200,
              aggregates: "['sum']",
              groupHeaderColumnTemplate:
                "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
              headerAttributes: headerAttributes,
              attributes: attributes,
            });
          }

          this.columns = defaultColumns;

          break;

        case "2": // SEMI-ANNUAL
          // Expand Column [0] width
          defaultColumns[0].width = 400;

          for (let i = 0; i < 2; i++) {
            defaultColumns.push({
              field: NumberInWord[i],
              title: this.fiscalMonths[i],
              format: "{0:n}",
              width: 300,
              aggregates: "['sum']",
              groupHeaderColumnTemplate:
                "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
              headerAttributes: headerAttributes,
              attributes: attributes,
            });
          }

          this.columns = defaultColumns;

          break;

        default:
          // TOTAL
          // Expand Column [0] width
          defaultColumns[0].width = 600;

          defaultColumns.push({
            field: "balance",
            title: i18n.t("total"),
            format: "{0:n}",
            width: 300,
            aggregates: "['sum']",
            groupHeaderColumnTemplate:
              "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
            headerAttributes: headerAttributes,
            attributes: attributes,
          });

          this.columns = defaultColumns;

          break;
      }
    },
    // On Reporint Language Changes
    onReportingLanguageChanges() {
      this.fieldName = "name";
      this.fieldType = "type";
      if (this.reportingLanguage === "local") {
        this.fieldName = "local_name";
        this.fieldType = "type_local_name";
      }

      // Generate Group By
      this.generateGroupBy();

      // Generate column with new language
      this.generateColumn();
    },
    // Generate Group By
    generateGroupBy() {
      this.groupDefinition = {
        field: this.fieldType,
        aggregates: this.aggregateDefinition,
        compare: function(a, b) {
          if (a.items[0].order === b.items[0].order) {
            return 0;
          } else if (a.items[0].order > b.items[0].order) {
            return 1;
          } else {
            return -1;
          }
        },
      };
    },
  },
  watch: {
    reportingLanguage() {
      this.onReportingLanguageChanges();
    },
  },
  mounted() {
    // Generate Group By
    this.generateGroupBy();

    // Initial Grid Columns
    this.generateColumn();
  },
};
</script>

<style scoped>
.reports_list {
  width: 100%;
  background-color: #fff;
}
.report_filter {
  background-color: #f8f8f9;
  padding: 0 20px 5px 20px;
  position: relative;
}
.dv_mt {
  margin-top: 24px;
}
.report_export {
  position: absolute;
  top: 15px;
}
.report_total {
  padding: 12.5px;
  text-align: right;
  text-transform: uppercase;
  font-weight: 700;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
}
.custom_expansion
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  display: none !important;
}
.v-expansion-panel {
  border-bottom: 1px solid #cccccc;
  border-radius: 0;
}
.v-expansion-panel::before {
  box-shadow: none;
}
.v-expansion-panel-header {
  padding: 15px;
}
.v-expansion-panel-content__wrap {
  padding: 0 35px 10px;
}
@media (max-width: 576px) {
  .dv_mt,
  .dv_mt8 {
    margin-top: 0;
  }
  .reports_list {
    margin-top: 0;
  }
}
</style>
