<template>
		<v-row>
			<v-col cols="12" sm="12" class="pa-0">
				<div class="reports_list">
						<h2>{{$t('statement_financial_position_by_segments')}}</h2>
					<!-- <v-icon 
						onclick="window.history.go(-1); return false;" 
						style="cursor: pointer; color: #333; font-size: 40px;"
						class="float-right"
					>close</v-icon> -->

					<div class="report_filter mb-3">
						<v-row>
							<v-col sm="12" cols="12" class="pb-0">
								<v-row>
									<v-col sm="12" cols="12" class="py-0">
										<label class="label text-uppercase">{{$t('segment')}}</label>
										<app-segment-list-item-group
											class="px-0 pb-0"
											:initSegment="selectedSegmentIds"
											@emitSegment="selectedSegmentIds = $event"
										/>
									</v-col>
									<v-col sm="4" cols="12" class="py-0">
										<label class="label  text-uppercase pt-5">{{$t('as_of')}}</label>
										<app-datepicker :initialDate="asOfDate" @emitDate="asOfDate = $event" />
									</v-col>
									<v-col sm="4" cols="12" class="py-0">
										<div class="report_export">
											<label class="mb-1">{{$t('reporting_language')}}:</label>
											<app-reporting-language :initLanguage="reportingLanguage" @emitLanguage="reportingLanguage = $event" />
										</div>
									</v-col>
									<v-col sm="4" cols="12" class="pt-6">
										<v-btn class="white--text" color="primary" @click="search">
											{{$t('run_report')}}
										</v-btn>
									</v-col>
									
								</v-row>
							</v-col>
							
						</v-row>
					</div>

					<div class="report_block">
						<v-row>
							<v-col sm="6" cols="12">
								<v-card color="third" class="pa-3 white--text no_border option rounded-0">
									<p class="text">{{$t('asset')}}</p>
									<p class="number text-bold">{{ Number(totalAsset).toLocaleString() }}</p>
								</v-card>
							</v-col>
							<v-col sm="6" cols="12">
								<v-card color="third" class="pa-3 white--text rounded-0 option no_border">
									<p class="text">{{$t('liabilities_and_equity')}}</p>
									<p class="number text-bold">{{ Number(totalLiabilityAndEquity).toLocaleString() }}</p>
								</v-card>
							</v-col>
						</v-row>
					</div>
					
					<div class="reports_table">
						<v-row>
							<v-col sm="12" cols="12" class="pt-0">

								<kendo-datasource ref="balanceSheetDS"
									:data="statementFPList"
									:schema="schemaDefinition"
									:group="groupDefinition"
									:aggregate="aggregateDefinition"/>

								<kendo-grid id="gridSFP" class="custom_grid" 
									:data-source-ref="'balanceSheetDS'"
									:change="onGridChanges"
									:selectable="true"
									:persistSelection="true" 
									:sortable="true"
									:column-menu="true"
									:reorderable="true"
									:resizable="true"
									:noRecords="true"
									:toolbar="['excel']"
									:excel-file-name="'balanceSheetReport.xlsx'"
									:excel-filterable="true"
									:columns="columns"/>

							</v-col>
						</v-row>
					</div>
					<LoadingMe 
						:isLoading ="showLoading" 
						:fullPage  ="false" 
						:myLoading ="true"/>
					
				</div>
			</v-col>
		</v-row>
</template>

<script>
	import kendo from '@progress/kendo-ui';
	import { i18n } from '@/i18n';
	import Helper from "@/helper.js";

	// const store = require("@/institute.js");
	// const { institute } = store.default.state;
	const { balanceSheetHandler, segmentHandler } = require("@/scripts/AppHandlers");
	
	export default {
		components:{
			"LoadingMe": () => import('@/components/Loading'),
			'app-datepicker': () => import('@/components/custom_templates/DatePickerComponent'),
			'app-reporting-language': () => import('@/components/kendo_templates/ReportingLanguageDropDownList'),
            "app-segment-list-item-group": () => import('@/components/kendo_templates/SegmentListItemGroup'),
		},
		data: () => ({
			asOfDate : new Date().toISOString().substr(0, 10),
            statementFP : [],
			statementFPList : [],
            selectedSegmentIds : [],
			totalAsset: 0,
			totalLiabilityAndEquity: 0,
			Helper : Helper,
			// Reporting Language
			reportingLanguage: 'english',
			fieldName : 'name',
			fieldType : 'type',
			// LoadingMe
			showLoading : false,
			/* KENDO */
			columns : [],
			groupDefinition : [],
			aggregateDefinition : [],
			schemaDefinition	: {
				model: { id: "accountUUID" }
			},
		}),
		methods:  {
			/* KENDO */
			/* On grid changes => link to GL */
			onGridChanges () {
				let grid = kendo.jQuery("#gridSFP").data("kendoGrid");
				let selectedItem = grid.dataItem(grid.select());

				let asOf = new Date(this.asOfDate);

				/* if day = 1 need to minus 1 month */
				if(asOf.getDate() === 1){
					asOf.setMonth(asOf.getMonth() - 1);
				}
				asOf.setDate(1);

				this.$router.push({ 
					path: 'general_ledger', 
					query: { 
						account_id 	: selectedItem.accountUUID,
						start_date	: kendo.toString(asOf, "yyyy-MM-dd"),
						end_date	: this.asOfDate,
					}
				})
			},
			// Search
			search () {
				// Empty dataSource
				let ds = this.$refs.balanceSheetDS.kendoWidget();
				ds.data([]);
				
				if(this.selectedSegmentIds.length > 0){
					let asOfDate = new Date(this.asOfDate);

					// Query
					this.showLoading = true;
					balanceSheetHandler.getBySegments(
                        kendo.toString(asOfDate, 'yyyy-MM-dd') + 'T23:59:59.999Z', 
                        this.selectedSegmentIds
                    )
					.then(res => {
						if(res){
							this.statementFP = res;
                            this.bindData();
						}
					})
					.finally(() => {
						this.showLoading = false;
					});
				}else{
                    Helper.alertErrorMsg("Please select segment");
                }
			},
            /* Bind Data */
			bindData () {
                let entries = {}, totalAsset = 0, totalLiabilityAndEquity = 0;

                for (let i = 0; i < this.selectedSegmentIds.length; i++) {
                    this.statementFP[i].forEach(value => {
                        let entry = value;
                        
                        // Order
                        if(entry.groupNature.toLowerCase() === "equity"){// Equity
                            entry.order = entry.account_type_number * 100;
                        }else{
                            entry.order = entry.account_type_number;
                        }

                        // Sum Asset, Liabilities and Equtity
                        if(entry.groupNature.toLowerCase() === "asset"){// Asset
                            totalAsset += entry.balance;
                        }else{// Liability and Equity
                            // Covert Cr side to normal
                            entry.balance = entry.balance * -1;
                            totalLiabilityAndEquity += entry.balance;
                        }

                        // Group Nature local name
                        entry.group_nature_local_name = this.localTranslation(entry.groupNature);

                        // Statement Group local name
                        entry.statement_group_local_name = this.localTranslation(entry.statementGroup);

                        /* Grouping */
                        let groupName = String(value.accountUUID) + String(value.account_type_number);
                        if(entries[groupName]){
                            entries[groupName]["s"+i] = value.balance;
                        }else{
                            entries[groupName] = entry;

                            /* Add all segments to columns */
                            for (let j = 0; j < 50; j++) {
                                entries[groupName]["s"+j] = 0;
                            }

                            entries[groupName]["s"+i] = value.balance;
                        }
                    });
                }

                this.totalAsset = totalAsset;
                this.totalLiabilityAndEquity = totalLiabilityAndEquity;
                
                this.statementFPList = Object.values(entries);
                this.generateColumn();
			},
			// Transalate to local language
			localTranslation(lang){
				let word = lang;

				if(lang.toLowerCase() === "asset"){
					word = "ទ្រព្យសកម្ម";
				}else if(lang.toLowerCase() === "current asset"){
					word = "ទ្រព្យសកម្មរយៈពេលខ្លី";
				}else if(lang.toLowerCase() === "non-current asset"){
					word = "ទ្រព្យសកម្មរយៈពេលវែង";
				}else if(lang.toLowerCase() === "liabilities"){
					word = "បំណុល";
				}else if(lang.toLowerCase() === "current liabilities"){
					word = "បំណុលរយៈពេលខ្លី";
				}else if(lang.toLowerCase() === "non-current liabilities"){
					word = "បំណុលរយៈពេលវែង";
				}else if(lang.toLowerCase() === "equity"){
					word = "ដើមទុន";
				}else if(lang.toLowerCase() === "retained earning"){
					word = "ប្រាក់ចំណេញរក្សាទុក";
				}

				return word;
			},
			// Row Template
			accountTmpl(dataItem) {
				let name = dataItem.number;

				if(this.reportingLanguage === "local"){
					name += " - " + dataItem.local_name;
				}else{
					name += " - " + dataItem.name;
				}

				return name;
			},
			typeGroupHeaderTmpl(dataItem) {
				let name = dataItem.items[0].type;

				if(this.reportingLanguage === "local"){
					name = dataItem.items[0].type_local_name;
				}

				return "<span class='text-bold text-black'>"+ name +"</span>";
			},
			statementGroupHeaderTmpl(dataItem) {
				let name = dataItem.value;

				if(this.reportingLanguage === "local"){
					name = this.localTranslation(name);
				}
				
				return "<span class='text-bold text-black'>"+ name +"</span>";
			},
			natureGroupHeaderTmpl(dataItem) {
				let name = dataItem.value;

				if(this.reportingLanguage === "local"){
					name = this.localTranslation(name);
				}
				
				return "<span class='text-bold text-black'>"+ name +"</span>";
			},
			async generateColumn () {
				let columns = [
					{ field: this.fieldName, title: i18n.t('account'), locked: true, width:300, template: this.accountTmpl },
					{ field: "type", title: "TYPE", hidden: true,  width:300, groupHeaderTemplate:this.typeGroupHeaderTmpl },
					{ field: "statementGroup", title: "STATEMENT GROUP", hidden: true,  width:300, groupHeaderTemplate:this.statementGroupHeaderTmpl },
					{ field: "groupNature", title: "NATURE", hidden: true,  width:300, groupHeaderTemplate:this.natureGroupHeaderTmpl },
				]
                
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
                        format: "{0:#,##0.##;(#,##0.##)}",
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
			onReportingLanguageChanges () {
				this.fieldName = "name";
				this.fieldType = "type";
				if(this.reportingLanguage === "local"){
					this.fieldName = "local_name";
					this.fieldType = "type_local_name";
				}

				// Generate column with new language
				this.generateColumn();
			},
			// Generate Group By
			generateGroupBy(){
                /* Aggregate Defintion */
                let aggregateDefinition = [];
                for (let i = 0; i < 50; i++) {
                    aggregateDefinition.push({ field: "s"+i, aggregate: "sum" });
                }
                this.aggregateDefinition = aggregateDefinition;

				this.groupDefinition = [
					{ 
						field: "groupNature", 
						aggregates : this.aggregateDefinition,
						compare: function(a, b) {
							if (a.items[0].order === b.items[0].order) {
								return 0;
							} else if (a.items[0].order > b.items[0].order) {
								return 1;
							} else {
								return -1;
							}
						}
					},
					{ field: "statementGroup", aggregates : this.aggregateDefinition },
					{ 
						field: "type", 
						aggregates : this.aggregateDefinition,
						compare: function(a, b) {
							if (a.items[0].account_type_number === b.items[0].account_type_number) {
								return 0;
							} else if (a.items[0].account_type_number > b.items[0].account_type_number) {
								return 1;
							} else {
								return -1;
							}
						}
					},
				]
			},
		},
		watch: {
            reportingLanguage () {
				this.onReportingLanguageChanges();
            }
        },
		mounted () {
			// Generate Group By
			this.generateGroupBy();
			
			// Initial Grid Columns
			this.generateColumn();
		},
	};
</script>

<style scoped>
	.reports_list{
		width: 100%;
		background-color: #fff;
		padding: 20px 20px 5px;
	}
	.report_filter{
		background-color: #F8F8F9;
		padding: 0 20px 5px 20px;
	}
	.dv_mt{
		margin-top: 20px;
	}
	.dv_mt8{
		margin-top: 30px;
	}
	.report_block .v-card.third{
		border: none;
		box-shadow: none;
		color: #fff;
		text-transform: uppercase;
	}
	.report_block .v-card.third p.text{ 
		text-align: left;
		font-size: 16px;
	}
	.report_block .v-card.third p.number{ 
		text-align: center; 
		font-size: 25px;
		font-weight: 700;
		margin-bottom: 0;
	}
	.report_block .v-card.bg_gray{
		background-color: #F8F8F9;
		border: none;
		box-shadow: none;
		color: #000;
		float: left;
		width: 100%;
	}
	.report_block .v-card.bg_gray p span.text{
		width: 25%;
	}
	.report_block .v-card.bg_gray p span.number{
		width: 70%;
		font-size: 19px;
		font-weight: 700;
		padding: 7px 0 0 0;
		text-align: right;
	}
	@media (max-width: 576px){
		.dv_mt, .dv_mt8{ margin-top: 0;}
		.reports_list{ margin-top: 0; }
	}
</style>