<template>
	<v-row>
		<v-col cols="12" sm="12" class="pa-0">
		<div class="reports_list">
			<h2>{{ $t("statement_profit_lose_by_multi_segment") }}</h2>
			<!-- <v-icon
				onclick="window.history.go(-1); return false;"
				style="cursor: pointer; color: #333; font-size: 40px;"
				class="float-right"
			>close</v-icon> -->

			<div class="report_filter pt-4">
				<v-row class="mt-0">
					<v-col sm="12" cols="12" class="py-0">
                        <app-searchdate
                            :initStartDate="startDate"
                            @emitStartDate="startDate = $event"
                            :initEndDate="endDate"
                            @emitEndDate="endDate = $event"
                        />
					</v-col>
				</v-row>
				<v-row class="mt-0">
                    
					<v-col class="py-0" sm="12" cols="12">
						<label class="label text-uppercase">{{ $t("segment") }}</label>
						<app-segment-list-item-group
                            class="px-0 pb-0"
							:initSegment="selectedSegmentIds"
							@emitSegment="selectedSegmentIds = $event"
						/>
					</v-col>
					<v-col sm="4" cols="4" class="py-0">
						<div class="report_expor">
							<label class="mb-1">{{ $t("reporting_language") }}:</label>
							<app-reporting-language
								:initLanguage="reportingLanguage"
								@emitLanguage="reportingLanguage = $event"
							/>
						</div>
					</v-col>
					<v-col class="py-0" sm="4" cols="4">
						<v-btn
							class="white--text dv_mt"
							color="primary"
							@click="search"
						>
							{{ $t("run_report") }}
						</v-btn>
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
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import Helper from "@/helper.js";

// const store = require("@/institute.js");
// const { institute } = store.default.state;
const { incomeStatementHandler, segmentHandler } = require("@/scripts/AppHandlers");
const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");

export default {
	components: {
		LoadingMe: () => import("@/components/Loading"),
		"app-searchdate": () => import("@/components/custom_templates/SearchDate"),
		"app-reporting-language": () => import("@/components/kendo_templates/ReportingLanguageDropDownList"),
		"app-segment-list-item-group": () => import('@/components/kendo_templates/SegmentListItemGroup'),
	},
	data: () => ({
		// Obj
		startDate: "",
		endDate: "",
		statementPLList: [],
        selectedSegmentIds : [],
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
		aggregateDefinition: [],
		schemaDefinition: {
			model: { id: "accountUUID" },
		},
	}),
	methods: {
		/* KENDO */
		/* On grid changes => link to GL */
		onGridChanges() {
            let grid = kendo.jQuery("#gridSPL").data("kendoGrid");
            let selectedSegmentIds = grid.dataItem(grid.select());

            this.$router.push({
                path: "general_ledger",
                query: {
                account_id: selectedSegmentIds.accountUUID,
                start_date: this.startDate,
                end_date: this.endDate,
                },
            });
        },
        // Search journals
        search() {
            if(this.selectedSegmentIds.length > 0){
                let sdate = this.startDate,
                    edate = this.endDate;
                
                if (sdate && edate) {
                    sdate = kendo.toString(new Date(sdate), "yyyy-MM-dd") + "T00:00:00.000Z";

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
                    .getBySegments(sdate, edate, this.selectedSegmentIds)
                    .then((response) => {
                        this.statements = response;
                        this.bindData();
                    })
                    .finally(() => {
                        this.showLoading = false;
                    });
            }else{
                Helper.alertErrorMsg("Please select segment");
            }
        },
        /* Bind Data */
        async bindData(){
            let entries = {};

            for (let i = 0; i < this.selectedSegmentIds.length; i++) {
                this.statements[i].forEach(value => {
                    let entry = value;

                    // Order
                    if (value.account_type_number == OrderNumberPL.GrossProfit.number) {
                        // Gross Profit
                        entry.order = OrderNumberPL.GrossProfit.order;
                    } else if ( value.account_type_number == OrderNumberPL.OtherRevenue.number ) {
                        // Other Revenue
                        entry.order = OrderNumberPL.OtherRevenue.order;
                    } else if ( value.account_type_number == OrderNumberPL.OperatingExpense.number ) {
                        // Operating Expense
                        entry.order = OrderNumberPL.OperatingExpense.order;
                    } else if ( value.account_type_number == OrderNumberPL.OperatingIncomeEBITDA.number ) {
                        // Operating Income (EBITDA)
                        entry.order = OrderNumberPL.OperatingIncomeEBITDA.order;
                    } else if ( value.account_type_number == OrderNumberPL.EarningBeforeInterestAndTaxEBIT.number ) {
                        // Earning Before Interest And Tax(EBIT)
                        entry.order = OrderNumberPL.EarningBeforeInterestAndTaxEBIT.order;
                    } else if ( value.account_type_number == OrderNumberPL.ProfitBeforeTax.number ) {
                        // Profit Before Tax
                        entry.order = OrderNumberPL.ProfitBeforeTax.order;
                    } else if ( value.account_type_number == OrderNumberPL.ProfitForThePeriod.number ) {
                        // Profit For The Period
                        entry.order = OrderNumberPL.ProfitForThePeriod.order;
                    } else {
                        entry.order = value.account_type_number;
                    }
                    
                    /* Grouping */
                    let groupName = String(value.accountUUID) + String(value.account_type_number);
                    if(entries[groupName]){
                        entries[groupName]["s"+i] = value.balance;
                    }else{
                        entries[groupName] = entry;

                        /* Add all segments to columns */
                        for (let j = 0; j < this.selectedSegmentIds.length; j++) {
                            entries[groupName]["s"+j] = 0;
                        }

                        entries[groupName]["s"+i] = value.balance;
                    }
                });
            }

            this.statementPLList = Object.values(entries);
			this.generateColumn();
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
        async generateColumn() {
            let columns = [
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

            /* Get Segments */
            let segments = await segmentHandler.getAll();

            /* Set Column Segments */
            for (let i = 0; i < this.selectedSegmentIds.length; i++) {
                /* Segment */
                let segment = segments.find(item => item.id === this.selectedSegmentIds[i]);
                
                /* Column Segment */
                columns.push({
                    field: "s"+i,
                    title: segment.name,
                    format: "{0:n}",
                    width: 200,
                    aggregates: "['sum']",
                    groupHeaderColumnTemplate: "<div class='text-right text-bold text-black'>#=kendo.toString(sum, 'n')#</div>",
                    headerAttributes: headerAttributes,
                    attributes: attributes,
                });
            }

            this.columns = columns;
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
            /* Aggregate Defintion */
            let aggregateDefinition = [];
            for (let i = 0; i < 50; i++) {
                aggregateDefinition.push({ field: "s"+i, aggregate: "sum" });
            }
            this.aggregateDefinition = aggregateDefinition;

			this.groupDefinition = {
                field: this.fieldType,
                aggregates: aggregateDefinition,
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
padding: 20px 20px 5px;
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