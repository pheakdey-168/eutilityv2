<template>
    <v-simple-table>
        <template>
            <tbody>
                <tr>
                    <td class="text-left pl-0">
                    <span class="niradei_medium font_14 grey--text">
                        {{ $t("debt_ratio") }}
                    </span>
                    </td>
                    <td class="text-right pr-0">
                    <span class="niradei_heavy font_18 dark_grey">
                        {{ Number(loanAnalysis.debt_ratio).toLocaleString() }} %
                    </span>
                    </td>
                </tr>
                <tr>
                    <td class="text-left pl-0">
                    <span class="niradei_medium font_14 grey--text">
                        {{ $t("gearing_ratio") }}
                    </span>
                    </td>
                    <td class="text-right pr-0">
                    <span class="niradei_heavy font_18 dark_grey">
                        <!-- {{ Number(loanAnalysis.gearing_ratio).toLocaleString() }} -->
                    </span>
                    </td>
                </tr>
                <tr>
                    <td class="text-left pl-0">
                    <span class="niradei_medium font_14 grey--text">
                        {{ $t("interest_coverage_ratio") }} 
                    </span>
                    </td>
                    <td class="text-right pr-0">
                    <span class="niradei_heavy font_18 dark_grey">
                        {{ Number(loanAnalysis.interest_coverage_ratio).toLocaleString() }} Time
                    </span>
                    </td>
                </tr>
                <tr>
                    <td class="text-left pl-0">
                    <span class="niradei_medium font_14 grey--text">
                        {{ $t("debt_service_coverage") }}
                    </span>
                    </td>
                    <td class="text-right pr-0">
                    <span class="niradei_heavy font_18 dark_grey">
                        {{ Number(loanAnalysis.debt_service_coverage).toLocaleString() }} Time
                    </span>
                    </td>
                </tr>
            </tbody>
        </template>
        <template slot="no-data">
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                :myLoading="true"
                :type="'loading'"
            />
        </template>
    </v-simple-table>
</template>

<script>
	// import {i18n} from '@/i18n';
	import kendo from '@progress/kendo-ui';
	const financialRatioHandler = require("@/scripts/handler/accounting/financialRatio.js");

	export default {
		components: {
			"LoadingMe": () => import('@/components/Loading'),
		},
		data: ()=>({
            loanAnalysis : [],
			// LoadingMe
			showLoading: false,
		}),
		methods:  {
			// Search
			async search () {
                this.showLoading = true;

                /* Set default */
                this.loanAnalysis = {
                    debt_ratio : 0,
                    gearing_ratio : 0,
                    interest_coverage_ratio : 0,
                    debt_service_coverage : 0,
                };

                let bm = new Date(),
                    baseMonthLastDay = new Date(bm.getFullYear(), bm.getMonth() + 1, 0);

                /* Accumulated Month */
                let accumulatedMonths = await financialRatioHandler.getReport({
                    params : {
                        month_of : kendo.toString(new Date(), 'yyyy-MM-dd') + 'T23:59:59.999Z',// Today Month (use data)
                        compare_month : kendo.toString(baseMonthLastDay, 'yyyy-MM-dd') + 'T23:59:59.999Z',// Selected Base Month (don't use data)
                    }
                })
                
                this.loanAnalysis = {
                    debt_ratio              : accumulatedMonths.data.moth_of.debtRatio,
                    gearing_ratio           : 0,
                    interest_coverage_ratio : accumulatedMonths.data.moth_of.interestCoverateRation,
                    debt_service_coverage   : accumulatedMonths.data.moth_of.debtServiceCoerageRatio,
                };
                
                this.showLoading = false;
			},
		},
        mounted(){
            this.search();
        }
	}
</script>