<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
			<v-row class="report_block">
				<v-col sm="6" cols="12">
					<v-row>
						<v-col sm="6" cols="12">
							<v-card color="primary" outlined dense class="pa-3 rounded-0" height="100px" @click="filterActiveLoan">
								<p class="text-white font_18 text-uppercase">{{$t('no_of_loans')}}</p>
								<p class="text-white mt-7 text-bold font_22 mb-0 text-right">{{ Number(loanInfo.acitve_loan).toLocaleString() }}</p>
							</v-card>
						</v-col>
						<v-col sm="6" cols="12">
                            <v-card color="primary" outlined dense class="pa-3 rounded-0" height="100px">
                                <p class="text-white mb-2 font_18 text-uppercase">{{$t('average_interest_rate')}}</p>
                                <p class="text-white text-bold font_22 mb-0 text-right">{{ Number(loanInfo.weighted_avg_int_rate_outstanding).toLocaleString() }}</p>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
				<v-col sm="4" cols="12" class="mt-3">
                    <v-card color="primary" outlined dense class="pa-3 mb-2 rounded-0" height="45px" @click="filterOutstandingBalance">
						<p class="float-left text-white font_14 text-uppercase">{{$t('outstanding_balance')}}</p>
						<p class=" float-right text-white text-bold font_16 mb-0">{{ Number(loanInfo.outstanding_amount).toLocaleString() }}</p>
					</v-card>
                    <v-card color="primary" outlined dense class="pa-3 rounded-0" height="45px" @click="filterAvailableCredit">
						<p class="float-left text-white font_14 text-uppercase">{{$t('available_credit')}}</p>
						<p class=" float-right text-white text-bold font_16 mb-0">{{ Number(loanInfo.available_credit).toLocaleString() }}</p>
					</v-card>
				</v-col>
				<v-col sm="2" cols="12" class="pb-0 mt-10">
                    <v-btn
                            icon
                            color="black"
                            class="bg-none float-right ml-4"
                    >
                        <v-icon class="font_34">fa fa-print</v-icon>
                    </v-btn>
                    <v-btn
                            icon
                            color="black"
                            class="bg-none float-right ml-4"
                    >
                        <v-icon class="font_34">fa fa-file-excel</v-icon>
                    </v-btn>
                    <v-btn
                            icon
                            color="black"
                            class="bg-none float-right"
                    >
                        <v-icon class="font_34">fa fa-file-pdf</v-icon>
                    </v-btn>
				</v-col>
			</v-row>

			<v-row>
				<v-col sm="12" cols="12" class="py-0">
					<v-btn @click="refreshFilter" color="primary" class="white--text text-capitalize mb-3">
						<v-icon>mdi-cached</v-icon> {{$t('refresh')}}
					</v-btn>
					<kendo-datasource 
						ref="loanDS"
						:data="loans"
						page="1"
						page-size="20" />

					<kendo-grid id="loanGrid"
						:data-source-ref="'loanDS'"
						:noRecords="true"
						:pageable-page-sizes="true"
						:pageable-button-count="5">
						<kendo-grid-column
							:title="$t('no.')"
							:template="rowNumberTmpl"
							:width="50"
							:headerAttributes="{
								style: 'background-color: #EDF1F5;',
								class: 'text-products;'
							}"
							:attributes="{
								style: 'text-align: center'
							}"/>
						<kendo-grid-column 
							:field="'number'"
							:title="$t('number')"
							:headerAttributes="{
								style: 'text-align: center; background-color: #EDF1F5; width: 90px; height: 45px',
							}"
							:attributes="{ style: 'text-align: center; width: 90px' }" />
						<kendo-grid-column 
							:field="'type'"
							:title="$t('type_of_debt')"
							:template="'<span>#=type.name#</span>'"
							:headerAttributes="{
								style: 'text-align: center; background-color: #EDF1F5; width: 120px;',
							}"
							:attributes="{ style: 'text-align: center; width: 120px;' }" />
						<kendo-grid-column 
							:field="'bank'"
							:title="$t('financial_inst')"
							:template="'<span>#=bank.name#</span>'"
							:headerAttributes="{
								style: 'text-align: center; background-color: #EDF1F5; width: 160px;',
							}"
                            :attributes="{ style: 'width: 160px;' }" />
						<kendo-grid-column
							:field="'approved_amount'"
							:title="$t('approved_amount')"
							:format="'{0:n}'"
							:width="150"
							:headerAttributes="{
								style: 'text-align: right; background-color: #EDF1F5',
							}"
							:attributes="{ style: 'text-align: right;' }" />
						<kendo-grid-column 
							:field="'outstanding_amount'"
							:title="$t('outstanding_amount')"
							:format="'{0:n}'"
							:width="150"
							:headerAttributes="{
								style: 'text-align: right; background-color: #EDF1F5',
							}"
							:attributes="{ style: 'text-align: right;' }" />
						<kendo-grid-column 
							:field="'available_credit'"
							:title="$t('available_credit')"
							:format="'{0:n}'"
							:width="150"
							:headerAttributes="{
								style: 'text-align: right; background-color: #EDF1F5',
							}"
							:attributes="{ style: 'text-align: right;' }" />
						<kendo-grid-column 
							:field="'interest_rate'"
							:title="$t('interest_rate')"
							:format="'{0:n}'"
							:width="150"
							:headerAttributes="{
								style: 'text-align: right; background-color: #EDF1F5',
							}"
							:attributes="{ style: 'text-align: right;' }" />
					</kendo-grid>
				</v-col>
			</v-row>
        </v-col>
    </v-row>
</template>

<script>
	// import {i18n} from '@/i18n';
	import kendo from '@progress/kendo-ui'
	import { loanHandler } from "@/scripts/AppHandlers";
	
	const { LoanStatus } = require("@/scripts/default_setup/Collections");

    export default {
        data: () => ({
            /* Obj */
			loanInfo 	: {},
			loans 		: [],
			loansBK 	: [],
        }),
        methods: {
            loadInsight () {
                loanHandler.getInsight()
                .then(res => {
                    this.loanInfo = res.data;
                });
			},
			loadLoans () {
                loanHandler.getAll()
                .then(res => {
					if(res.data){
						this.loans = res.data;
						this.loansBK = res.data;
					}
                });
			},
			// Row Number Template
			rowNumberTmpl (dataItem) {
				let ds = this.$refs.loanDS.kendoWidget(),
					index = ds.indexOf(dataItem);

				return index + 1
			},
			dateTmpl(dataItem) {
                return kendo.toString(new Date(dataItem.date), "dd-MM-yyyy");
			},
			/* Filter Active Loan */
			filterActiveLoan () {
				this.loans = this.loansBK.filter(
					value => value.status === LoanStatus.ACTIVE
				)
			},
			filterOutstandingBalance () {
				this.loans = this.loansBK.filter(
					value => value.outstanding_amount > 0
				)
			},
			filterAvailableCredit () {
				this.loans = this.loansBK.filter(
					value => value.available_credit > 0
				)
			},
			refreshFilter () {
				this.loans = this.loansBK;
			}
        },
        mounted() {
			this.loadInsight();
			this.loadLoans();
        },
    };
</script>

<style scoped>
	.attachment_table table tr th{
		height: 55px !important;
	}
    @media (max-width: 576px) {
    }
</style>
