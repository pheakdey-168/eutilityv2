<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0" height= "750" style="overflow-y: scroll;overflow-x: hidden;">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1">{{$t('input_supply_biz')}}</h2>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>
                       
                    </v-col>

                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)"  @click="search">
                            <span class="">{{$t('run_report')}}</span>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"/>
                            <kendo-datasource ref="gridLoan" :data="loanList"/>
                            <kendo-grid
                                id="gridLoan" class="grid-function"
                                :data-source-ref="'gridLoan'"
                                :column-menu="true"
                                :noRecords="true"
                                :editable="false"
                                :groupable="false"

                                :sortable="true"
                                :excel-file-name="$t('input_supply_biz')+'.xlsx'"
                                :excel-filterable="true"
                                :excel-all-pages="true"
                                :toolbar="['excel']"

                                :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'accounts'"
                                    :title="$t('accounts')"
                                    :width="200"
                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                                <kendo-grid-column
                                    :field="'uom'"
                                    :title="$t('uom')"
                                    :width="100"
                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                                <kendo-grid-column
                                    :field="'qty'"
                                    :title="$t('qty')"
                                    :width="100"
                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                                    <kendo-grid-column
                                    :field="'amount'"
                                    :title="$t('amount')"
                                    :width="150"
                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                                <kendo-grid-column
                                    :field="'uom2'"
                                    :title="$t('uom')"
                                    :width="100"
                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                                <kendo-grid-column
                                    :field="'qty2'"
                                    :title="$t('qty')"
                                    :width="100"
                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                                    <kendo-grid-column
                                    :field="'amount2'"
                                    :title="$t('amount')"
                                    :width="150"
                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                                <kendo-grid-column
                                    :field="'change'"
                                    :title="$t('change')"
                                    :width="150"
                                    :headerAttributes="{
                                    style: 'background-color: #EDF1F5'
                                }"/>
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
		
    </v-row>
	
</template>

<script>
const { i18n } = require("@/i18n");
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import JSZip from "jszip";
window.JSZip = JSZip;
export default {
    data: () => ({
		asOf: new Date().toISOString().substr(0, 10),
		showLoading: false,
		loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
    }),
    components: {
		'app-datepicker': DatePickerComponent,

    },
    methods: {
		search() {
            this.showLoading = true
                setTimeout(() => {
                        this.showLoading = false
                    }, 300);
                }
    },
    computed: {

	},
    mounted: async function () {
        let ds = this.$refs.gridLoan.kendoWidget()
        ds.data([])
        ds.add({
            uom: i18n.t('year1'),
            uom2: i18n.t('year2')
        })
        ds.add({
            accounts: i18n.t('supply_revenue_fertilizers')
        })
        ds.add({
            accounts: i18n.t('supply_revenue_feeds'),
        })
        ds.add({
            accounts: i18n.t('supply_revenue_remedies_resticides_related_products'),
        })
        ds.add({
            accounts: i18n.t('supply_revenue_seeds'),
        })
        ds.add({
            accounts: i18n.t('other_supply_revenues'),
        })
        ds.add({
            accounts: i18n.t('total')
        })
    }
};
</script>

<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        font-size: 16px !important;
        font-family: "Niradei-Bold" !important;
        color: #000;
        border: thin solid rgba(0, 0, 0, 0.12) !important;
        text-align: center !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        font-size: 16px !important;
        font-family: "Niradei-Bold" !important;
        color: #000;
        border: thin solid rgba(0, 0, 0, 0.12) !important;
        text-align: center !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, 
    .v-data-table > .v-data-table__wrapper > table > thead > tr > td, 
    .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
        font-size: 16px !important;
        border-bottom: none;
        border: thin solid rgba(0, 0, 0, 0.12) !important;
        height: 60px !important;
    }
    .tab_setting .v-item-group.v-tabs-items {
        position: relative;
        overflow: scroll !important;
    }
</style>
