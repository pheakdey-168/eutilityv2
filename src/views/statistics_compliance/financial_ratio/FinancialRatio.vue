<template>
	<v-row>
		<v-col cols="12" sm="12" class="pt-3">
			<v-row>
				<v-col cols="12" sm="12" class="py-0">
					<h2 class="mb-3 font_20 float-left">
						{{ $t("financial_ratio") }}
					</h2>
				</v-col> 
				<v-col cols="12" sm="12" class="py-0">
					<v-row>
						<v-col cols="12" sm="3"  class="py-0">
							<label class="label pr-3">{{$t('base_month')}}</label>
							<app-month-of-picker :initMonthOf="baseMonthOf" @emitMonthOf="baseMonthOf = $event" />
						</v-col>
						<v-col cols="12" sm="3"  class="py-0">
							<label class="label pr-3">{{$t('compare_month')}}</label>
							<app-month-of-picker :initMonthOf="compareMonthOf" @emitMonthOf="compareMonthOf = $event" />
						</v-col>
						<v-col cols="12" sm="3"  class="py-0">
							<v-btn color="primary"
								class=" white--text mt-6 float-right text-capitalize"
								@click="search">
								{{$t('run_report')}}
							</v-btn>
						</v-col>
						<v-col cols="12" sm="3"  class="py-0">
							<v-select
								label="Reporting Language"
								v-model="lang"
								:items="languages"
								item-text="text"
								item-value="value"
							></v-select>
						</v-col>
					</v-row>
				</v-col>
				<v-col sm="12" cols="12" class="pb-0">
					<template>
						<v-simple-table>
							<template v-slot:default>
							<thead>
								<tr>
									<th class="text-left">
										{{$t('financial_ratio')}}
									</th>
									<th class="text-left">
										
									</th>
									<th class="text-right">
										{{$t('accumulated')}}
									</th>
									<th class="text-right">
										{{$t('base_month')}}
									</th>
									<th class="text-right">
										{{$t('compare_month')}}
									</th>
									<th class="text-right">
										%
									</th>
									<th class="text-right">
										{{$t('previous_month')}}
									</th>
									<th class="text-right">
										%
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="item in ratios"
									:key="item.en"
								>
									<template v-if="item.isHeader !== undefined">
										<td class="grayBg text-bold text-uppercase" colspan="8">{{ item[lang] }}</td>
									</template>
									<template v-else>
										<td>{{ item[lang] }}</td>
										<td>{{ item.measurement }}</td>
										<td class="text-right">{{ Number(item.accumulate).toLocaleString() }}</td>
										<td class="text-right">{{ Number(item.base).toLocaleString() }}</td>
										<td class="text-right">{{ Number(item.compare).toLocaleString() }}</td>
										<td class="text-right">{{ item.comparePercentage }}</td>
										<td class="text-right">{{ Number(item.previous).toLocaleString() }}</td>
										<td class="text-right">{{ item.previousPercentage }}</td>
									</template>
								</tr>
							</tbody>
							</template>
						</v-simple-table>
					</template>

					<LoadingMe
						:isLoading="showLoading"
						:fullPage="false"
						:myLoading="true"
						type="loading"
					/>

				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>
<script>
	// import {i18n} from '@/i18n';
	import kendo from '@progress/kendo-ui';
	const financialRatioHandler = require("@/scripts/handler/accounting/financialRatio.js");

	export default {
		components: {
			"LoadingMe": () => import('@/components/Loading'),
			'app-month-of-picker': () => import("@/components/kendo_templates/MonthOfPicker"),
		},
		data: ()=>({
			baseMonthOf : new Date().toISOString().substr(0, 7),
			compareMonthOf : new Date().toISOString().substr(0, 7),
			lang : "en",
			languages : [
				{ text: "English", value: "en" },
				{ text: "Local", value: "kh" },
			],
			ratios : [],
			defaultRatios : {
				/* Profitablility Measures */
				profitabilityMeasures : { en: "Profitability Measures", kh: "ការវិភាគលើអត្រាលទ្ធផលហិរញ្ញវត្ថុ", isHeader: "h1" },
				returnOnCapitalEmp : { en: "Return on Capital Employes", kh: "អត្រាផល​​វិនិយោគ", measurement: "%" },
				profitMargin : { en: "Profit Margin", kh: "អត្រាផលចំណេញសុទ្ធ", measurement: "%" },
				assetTurnOver : { en: "Asset Turnover", kh: "Asset Turnover", measurement: "Time" },
				returnOnAsset : { en: "Return On Asset", kh: "អត្រាផលបង្វិលពីទ្រព្យសកម្ម", measurement: "%" },
				returnOnEquity : { en: "Return On Equity", kh: "អត្រាផលបង្វិលពីដើមទុន", measurement: "%" },
				grossProfitMargin : { en: "Gross Profit Margin", kh: "អត្រាប្រាក់ចំណេញដុល", measurement: "%" },
				ebitdamargin : { en: "EBITDA Margin", kh: "អត្រាប្រាក់ចំណេញមុនបង់ ការប្រាក់​ ពន្ធ និងរំលស់", measurement: "%" },
				momsaleGrowth : { en: "MOM Sale Growth", kh: "អត្រាកំណើនការលក់ពីខែមួយទៅខែមួយ", measurement: "%" },

				/* Financial Strength Measure */
				financialStrengthMeasure : { en: "Financial Strength Measure", kh: "ការវិភាគលើស្ថានភាពហិរញ្ញវត្ថុ", isHeader: "h1" },
				debtRatio : { en: "Debt Ratio", kh: "អនុបាតបំណុលសរុប", measurement: "%" },
				debtServiceCoerageRatio : { en: "Debt Service Coverage Ratio", kh: "អនុបាតលទ្ធភាពទូទាត់បំណុលឥណទាន", measurement: "Time" },
				interestCoverateRation : { en: "Interest Coverage Ratio", kh: "អនុបាតលទ្ធភាពទូទាត់ការប្រាក់", measurement: "Time" },
				fundFromOperationNetDebt : { en: "Fund From Operation/ Net Debt", kh: "", measurement: "%" },//NO DATA
				debtEBITDA : { en: "Debt/ EBITDA", kh: "", measurement: "Time" },//NO DATA

				/* Liquidity Measure */
				liquidityMeasure: { en: "Liquidity Measure", kh: "ការវិភាគលើអត្រាលទ្ធភាពទូទាត់សាច់ប្រាក់", isHeader: "h1" },
				currentRatio: { en: "Current Ratio", kh: "អនុបាតចរន្ត", measurement: "Time" },
				cashRatio: { en: "Cash Ratio", kh: "អនុបាតសាច់ប្រាក់", measurement: "Time" },
				quickRation: { en: "Quick Ratio", kh: "អនុបាតបំន្ទាន់", measurement: "Time" },
				workingCapitalToSaleRation: { en: "Working Capital To Sale Ratio", kh: "អនុបាតទុនបង្វិលធៀបនឹងចំណូលលក់", measurement: "%" },

				/* Working Capital Measures */
				workingCapitalMeasures: { en: "Working Capital Measures", kh: "ការវិភាគលើអត្រាគ្រប់គ្រងទុនបង្វិល", isHeader: "h1" },
				payablePaymentDay: { en: "Payable Payment Days (PPD)", kh:"រយះពេលនៃការទូទាត់បំណុលអ្នកផ្គត់ផ្គង់", measurement: "Days" },
				inventoryTurnoverDays: { en: "Inventory Turnover Days", kh: "៉រយះពេលសន្និធិក្នុងសហគ្រាស", measurement: "Days" },
				receivableCollectionDays: { en: "Receivable Collection Days", kh:"រយះពេលនៃការទូទាត់បំណុលអតិថិជន", measurement: "Days" },
				cashConversionCycle: { en: "Cash Conversion Cycle", kh: "ចំនួនរយះបង្វិលសាច់ប្រាក់", measurement: "%" },

				/* Expense Control Measures */
				expenseControlMeasures: { en: "Expense Control Measures", kh: "ការវិភាគលើអត្រាការគ្រប់គ្រងចំណាយ", isHeader: "h1" },
				cogstoSale: { en: "Cost of Revenue to Sale Ratio", kh: "អត្រាថ្លៃដើមធៀបចំណូល", measurement: "%" },
				operatingExpToSale: { en: "Operating Expenses to Sale Ratio ", kh: "អត្រាចំណាយប្រតិបត្តិការធៀបចំណូល", measurement: "%" },
				salaryRatio: { en: "Salary Expenses to Sale Ratio", kh: "អត្រាចំណាយប្រាក់បៀវត្សធៀបនឹងចំណូលសរុប", measurement: "%" },
				saleMarketingRatio: { en: "Sale & Marketing to Sale Ratio", kh: "អត្រាចំណាយផ្នែកទីផ្សា និងការលក់ធៀបនឹងចំណូលសរុប", measurement: "%" },
				genAdminExpRatio: { en: "General Admin to Sale Ratio ", kh: "អត្រាចំណាយរដ្ឋបាលធៀបនឹងចំណូលសរុប", measurement: "%" },

				/* Z Score */
				zScore: { en: "Z Score", kh: "Z Score", isHeader: "h1" },
				ebittoAsset: { en: "EBIT/ Total Assets", kh: "អត្រាប្រាក់ចំណេញមុនបង់ ការប្រាក់​ ពន្ធ និងរំលស់ធៀបនឹងទ្រព្យសកម្មសរុប", measurement: "%", privateFirmWeight: 3.107 },
				revenueToAsset: { en: "Total Revenue / Total Assets", kh: "អត្រាចំណូលសរុបធៀបនឹងទ្រព្យសកម្មសរុប", measurement: "Time", privateFirmWeight: 0.998 },
				equitisToAsset: { en: "Total Equities / Total Liabilities", kh: "អត្រាដើមទុននឹងទ្រព្យសកម្មសរុប", measurement: "Time", privateFirmWeight: 0.42 },
				assetScoring : { en: "Working Capital / Total Assets", kh: "", measurement: "%", privateFirmWeight: 0.717 },
				retainEarningToAsset: { en: "Retained Earning / Total Assets", kh: "",  measurement: "%", privateFirmWeight: 0.847 },
				totalZScore : { en: "Total Z Score", kh: "", measurement: "Points", accumulate: 0, base: 0, compare: 0, previous: 0 },//NO DATA
				
				// basicEarningPower: { en: "Basic Earning Power", kh: "Basic Earning Power", isHeader: "" },
				// marketabilityOfProductOrServiceMeasure: { en: "Marketability of Product or Service Measure", kh: "ការវិភាគលើអត្រានៃចំណែកទីផ្សាររបស់ផលិតផលឬសេវាកម្ម", isHeader: "h2" },
				// leverageCapitalStructureMeasure: { en: "Leverage / Capital Structure Measure", kh: "ការវិភាគលើអត្រាអានុភាព /រចនាសម្ព័នដើមទុន", isHeader: "h2" },
				// longTernDebtRation: { en: "Long Term Debt Ratio", kh: "អនុបាតលើបំណុលរយៈពេលវែង", isHeader: "" },
				// ownerEquitytoAsset: { en: "Owner's Equity to Total Asset", kh: "ដើមទុនធៀបនឹងទ្រព្យសកម្មសរុប", isHeader: "" },
				// cashThrowOffToCurrentLiability: { en: "Cash Throw Off To Current Liability", kh: "អនុបាតការទូទាត់សាច់ប្រាក់ចំពោះបំណុលរយៈពេលខ្លី", isHeader: "" },
				
				// other: { en: "Other", kh: "អនុបាតផ្សេងទៀត", isHeader: "h1" },
				// nonCurrentAssetTurnOver: { en: "Non Current Asset Turnover", kh: "អត្រាផលបង្វិលពីទ្រព្យសកម្ម", isHeader: "h2" },
				// costRatio: { en: "Cost Ratio", kh: "អត្រាថ្លៃដើមធៀបនឹងចំណូលសរុប", isHeader: "" },
				// legalProfFeeRation: { en: "Legal & Professional Fee Ratio", kh: "អត្រាចំណាយសេវាច្បាប់ និងសេវាវិជ្ជាជីវផ្សេងៗធៀបនឹងចំណូលសរុប", isHeader: "" },
				// inventoryTurnover: { en: "Inventory Turenover", kh: "អត្រាផលបង្វិលពីសន្និធិ", isHeader: "" },
				// operating_exp_ration: { en: "Operating Expense Ratio", kh: "អត្រាចំណាយប្រតិបតិ្តធៀបនឹងចំណូល", isHeader: "" },
				// recievableTurnOver: { en: "Receivable Turnover", kh: "អត្រាផលបង្វិលបំណុលអតិថិជន", isHeader: "" },
				// payablePayment: { en: "Payable Payment", kh: "Payable Payment", isHeader: "" },
			},
			// LoadingMe
			showLoading: false,
		}),
		methods:  {
			// Search
			async search () {
				// Empty dataSource
				let ratios = this.defaultRatios;
				
				if(this.baseMonthOf && this.compareMonthOf){
					this.showLoading = true;

					let bm = new Date(this.baseMonthOf),
						baseMonthLastDay = new Date(bm.getFullYear(), bm.getMonth() + 1, 0),
						cm = new Date(this.compareMonthOf),
						compareMonthLastDay = new Date(cm.getFullYear(), cm.getMonth() + 1, 0),
						previousMonthLastDay = new Date(bm.getFullYear(), bm.getMonth() - 1, 0);

					/* Accumulated Month */
					let accumulatedMonths = await financialRatioHandler.getReport({
						params : {
							month_of : kendo.toString(new Date(), 'yyyy-MM-dd') + 'T23:59:59.999Z',// Today Month (use data)
							compare_month : kendo.toString(baseMonthLastDay, 'yyyy-MM-dd') + 'T23:59:59.999Z',// Selected Base Month (don't use data)
						}
					})

					/* Compare Month */
					let compareMonths = await financialRatioHandler.getReport({
						params : {
							month_of : kendo.toString(baseMonthLastDay, 'yyyy-MM-dd') + 'T23:59:59.999Z',// Selected Base Month
							compare_month : kendo.toString(compareMonthLastDay, 'yyyy-MM-dd') + 'T23:59:59.999Z',// Selected Compare Month
						}
					})

					/* Previous Month */
					let previousMonths = await financialRatioHandler.getReport({
						params : {
							month_of : kendo.toString(baseMonthLastDay, 'yyyy-MM-dd') + 'T23:59:59.999Z',// Selected Base Month (don't use data)
							compare_month : kendo.toString(previousMonthLastDay, 'yyyy-MM-dd') + 'T23:59:59.999Z',// Selected Base Month -1 (use data)
						}
					})

					/* Accumulate Month */
					for (let key in accumulatedMonths.data.moth_of){
						if(ratios[`${key}`]){
							ratios[`${key}`]["accumulate"] = accumulatedMonths.data.moth_of[`${key}`];

							/* Sum up for Z Score */
							if(ratios[`${key}`]["privateFirmWeight"]){
								ratios["totalZScore"]["accumulate"] += accumulatedMonths.data.moth_of[`${key}`] * ratios[`${key}`]["privateFirmWeight"];
							}
						}
					}
					
					/* Base Month */
					for (let key in compareMonths.data.moth_of){
						if(ratios[`${key}`]){
							ratios[`${key}`]["base"] = compareMonths.data.moth_of[`${key}`];

							/* Sum up for Z Score */
							if(ratios[`${key}`]["privateFirmWeight"]){
								ratios["totalZScore"]["base"] += compareMonths.data.moth_of[`${key}`] * ratios[`${key}`]["privateFirmWeight"];
							}
						}
					}
					
					/* Compare Month */
					for (let key in compareMonths.data.compare_month){
						if(ratios[`${key}`]){
							ratios[`${key}`]["compare"] = compareMonths.data.compare_month[`${key}`];
							ratios[`${key}`]["comparePercentage"] = this.convertPercentage(ratios[`${key}`]["base"], ratios[`${key}`]["compare"]);

							/* Sum up for Z Score */
							if(ratios[`${key}`]["privateFirmWeight"]){
								ratios["totalZScore"]["compare"] += compareMonths.data.compare_month[`${key}`] * ratios[`${key}`]["privateFirmWeight"];
							}
						}
					}

					/* Previous Month */
					for (let key in previousMonths.data.compare_month){
						if(ratios[`${key}`]){
							ratios[`${key}`]["previous"] = previousMonths.data.compare_month[`${key}`];
							ratios[`${key}`]["previousPercentage"] = this.convertPercentage(ratios[`${key}`]["base"], ratios[`${key}`]["previous"]);

							/* Sum up for Z Score */
							if(ratios[`${key}`]["privateFirmWeight"]){
								ratios["totalZScore"]["previous"] += previousMonths.data.compare_month[`${key}`] * ratios[`${key}`]["privateFirmWeight"];
							}
						}
					}

					this.ratios = ratios;
					
					this.showLoading = false;
				}
			},
			convertPercentage (baseAmount, compareAmount) {
				let amt = 0;
				if(compareAmount !== 0){
					amt = (baseAmount / compareAmount) - 1;
				}
				
				return kendo.toString(amt, "n2");
			},
		},
	}
</script>
<style scoped>
	.attachment_table.v-data-table > .v-data-table__wrapper > table > thead > tr > th, .attachment_table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
		border-right: none !important;
	}
	@media (max-width: 576px) {
		.mt-6 {
			margin-top: 0 !important;
			margin-bottom: 15px;
		}
		.row + .row {
			margin-top: 0 !important;
		}
	}
</style>