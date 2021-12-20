<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-3">
            <v-card color="white" class=" no_border" elevation="0">
                <v-row>
                    <v-col sm="4" cols="12" class="kendo_dropdown_custom py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>
                    </v-col>
                    <v-col sm="4" cols="12" class="kendo_dropdown_custom py-1">
                        <dropdownlist
                            :data-items="supplierList"
                            @change="onChange"
                            :value="supplier"
                            :data-item-key="dataItemKey"
                            :text-field="textField"
                            :default-item="defaultItem"
                            :filterable="true"
                            @filterchange="onFilterChange">
                        </dropdownlist>
                    </v-col>
                    <v-col sm="4" cols="12" class="pt-1">
                        <v-btn color="primary white--text" @click="loadPayable">
                            <i class="b-search" style="font-size: 18px; color:#fff"/>
                        </v-btn>
                        <v-btn color="primary" class="capitalize float-right white--text" to="cash_payment">{{
                                $t("new_cash_payment")
                            }}
                        </v-btn>
                    </v-col>
                </v-row>

                <!-- <v-row>
                  <v-col sm="4" cols="12" class="pt-0">
                    <v-card outlined dense class="pa-3 no_border white--text "
                            color="secondary" height="85px">
                      <h3 class="text-left font_13 text-uppercase flex-1">{{ $t('overdue_amount') }}</h3>
                      <h3 class="text-right  font_20 flex-1 mt-6">{{ overDueAmount }}</h3>
                    </v-card>
                  </v-col>
                  <v-col sm="4" cols="12" class="pt-0">
                    <v-card outlined dense class="pa-3 no_border white--text"
                            color="third" height="85px">
                      <h3 class="text-left font_13 flex-1 text-uppercase">{{ $t('receivable_balance') }}</h3>
                      <h3 class="text-right flex-1 font_20 mt-6">{{ payableBalance }}</h3>
                    </v-card>
                  </v-col>
                  <v-col sm="4" cols="12" class="pt-0">
                    <v-card outlined dense class="pa-3 no_border black--text "
                            color="grayBg" height="85px">
                      <h3 class="text-left font_13 flex-1 text-uppercase">{{ $t('to_be_collected') }}</h3>
                      <h3 class="text-right flex-1 font_20 mt-6">{{ tobeCollected }}</h3>
                    </v-card>
                  </v-col>
                </v-row> -->


                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"/>
                            <kendo-datasource ref="dataSource"
                                              
                                              :data="payableList"/>
                            <kendo-grid id="gridReceivable" class="grid-function"
                                        :data-source-ref="'dataSource'"
                                        :sortable="false"
                                        :groupable="true"
                                        :filterable="false"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :editable="false"
                                        v-on:databound="dataBound"
                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'transactionDate'"
                                    :title="$t('transaction_date')"
                                    :template="'<span>#=transactionDate#</span>'"
                                    :group-footer-template="'Total: '"
                                    :width="200"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :attributes="{class:'tb_name_td'}"
                                    :template="'<span>#=name#</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'empName'"
                                    :title="$t('employee_name')"
                                    :template="'<span>#=empName#</span>'"
                                    :width="200"
                                    :hidden="true"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <kendo-grid-column
                                    :field="'referenceNo'"
                                    :title="$t('reference_no')"
                                    :template="referenceTemplate"
                                    :width="200"
                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5'
                                                    }"/>
                                <!--                <kendo-grid-column-->
                                <!--                    :field="'code'"-->
                                <!--                    :title="$t('payment_code')"-->
                                <!--                    :template="'<span>#=code#</span>'"-->
                                <!--                    :width="200"-->
                                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>-->
                                <kendo-grid-column
                                    :field="'amount'"
                                    :title="$t('open_amount')"
                                    :template="'<span>#= kendo.toString(amount, decimalFormat)#</span>'"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :aggregates="['sum']"
                                    :group-footer-template="'<div style=text-align:right><span class=text-bold>#= kendo.toString(sum, `n2`)#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'paymentTerm'"
                                    :title="$t('term')"
                                    :template="'<span>#=paymentTerm.name#</span>'"
                                    :width="200"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'overDue'"
                                    :title="$t('over_due')"
                                    :template="'<span>#=overDue#</span>'"
                                    :width="180"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5'}"/>
                                <kendo-grid-column
                                    :field="'status'"
                                    :title="$t('status')"
                                    :template="status"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <!--                <kendo-grid-column-->
                                <!--                    :field="'action'"-->
                                <!--                    :title="$t('action')"-->
                                <!--                    :width="120"-->
                                <!--                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"-->
                                <!--                    :command="[{  text: 'Receive', click: goToCashPayment , className: 'k-state-disabled status' }]"-->
                                <!--                />-->

                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { i18n } from '@/i18n';

import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import kendo from "@progress/kendo-ui";
import {dataStore} from '@/observable/store'
const loanHandler = require("@/scripts/loanHandler")

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const defaultItem = {['numberName']: 'Select vendor...', ['id']: null}
const supplierHandler = require("@/scripts/supplierHandler")
const emptyItem = {['numberName']: 'loading ...'}
const $ = require("jquery")
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        group: [],
        aggregateDefinition: [
            {field: "name", aggregate: "count"},
            {field: "amount", aggregate: "sum"},
            {field: "code", aggregate: "count"}
        ],
        payableList: [],
        supplierList: [],
        supplier: {},
        textField: 'numberName',
        defaultItem: defaultItem,
        dataItemKey: 'id',
        filter: '',
        supBaseUrl: supplierHandler.search(),
        overDueAmount: 0,
        payableBalance: 0,
        tobeCollected: 0,
        segment: {},
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
        'dropdownlist': DropDownList,
    },
    methods: {
        dataBound: function (e) {
            const grid = kendo.jQuery("#gridReceivable").data("kendoGrid")
            const items = e.sender.items()
            items.each(function () {
                let dataItem = grid.dataItem(this);
                $("tr[data-uid='" + dataItem.uid + "']").find(".status").each(function () {
                    if (dataItem.status !== 3) {
                        $(this).removeClass('k-state-disabled')
                    }
                })
            })
        },
        goToCashPayment(e) {
            e.preventDefault()
            let grid = kendo.jQuery("#gridReceivable").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.$router.push({
                path: 'cash_payment' + `/${dataItem.code}`,
                params: {id: dataItem.code},
                query: {type: 'id', option: 'Payment Code'}
            })
            // let grid = kendo.jQuery("#gridAddress").data("kendoGrid")
            // let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            // this.address = dataItem
            // this.mCountry = dataItem.country
            // this.dialogM2 = true
        },
        referenceTemplate(data) {
            let url = `credit_purchase_view/${data.id}`
            if (data.type === 'Purchase') {
                url = `credit_purchase_view/${data.id}`
            } else if (data.type === 'Sale Quote') {
                url = `sale_quote_view/${data.id}`
            } else if (data.type === 'Delayed Invoice') {
                url = `delayed_invoice_view/${data.id}`
            }
            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        async loadPayable() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    let strFilter = ''
                    strFilter = '?asOf=' + this.asOf
                    if (this.supplier) {
                        if (this.supplier.id !== undefined && this.supplier.id !== null) {
                            strFilter = '?asOf=' + this.asOf + '&id=' + this.supplier.id
                        }
                    }
                    window.console.log(strFilter, 'filter')
                    this.showLoading = true
                    billingHandler.wcpPayableList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.payableList = res.data.data.filter((obj) => {
                                return obj.segmentId == this.segment.id
                            })
                            const result = res.data.result
                            this.payableBalance = kendo.toString(result.receivableBalance, result.decimalFormat)
                            this.overDueAmount = kendo.toString(result.overDueAmount, result.decimalFormat)
                            this.tobeCollected = kendo.toString(result.tobeCollected, `n0`)
                            this.showLoading = false
                        }
                    })
                }, 300)
            })
        },
        status(dataItem) {
            let status = ''
            switch (dataItem.status) {
                case 1:
                    status = i18n.t('open')
                    break
                case 2:
                    status = i18n.t('partially_paid')
                    break
                case 3:
                    status = i18n.t('paid')
                    break
                case 4:
                    status = i18n.t('void')
                    break
            }
            return status
        },
        onFilterChange(event) {
            const filter = event.filter.value
            this.requestData(0, filter, this.supBaseUrl)
            this.filter = filter
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl +
                `?filter=${filter}`
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.afterFetch)
        },
        afterFetch(json) {
            this.supplierList = json.data
        },
        onChange(event) {
            const value = event.value
            if (value && value['numberName'] === emptyItem['numberName']) {
                return;
            }
            this.supplier = value
        },
        sumGroupAmount(dataItem) {
            if (dataItem.hasOwnProperty('sum')) {
                return '<span>#= kendo.toString(sum, `n2`)#</span>'
            }
            return `<span>#= kendo.toString(sum, 'n2')#</span>`
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segment = {}
                    window.console.log(dataStore, 'datastorye')
                    loanHandler.businessSettingGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let s = res.data.data.filter((obj) => {
                                return obj.type == dataStore.businessType
                            })
                            if (s.length > 0) {
                                this.segment = s[0].segment
                            } else {
                                this.$snotify.error('Please select segment on setting page')
                                this.cancel()
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
    },
    computed: {},
    mounted: async function () {
        this.group = [
            {
                field: "name",
                aggregates: this.aggregateDefinition,
            }
        ]
        this.requestData(0, this.filter, this.supBaseUrl)
    },
    created: async function () {
        await this.loadSegment()
    },
};
</script>
<style scoped>
.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.b-search:before {
    color: #fff !important;
}
</style>