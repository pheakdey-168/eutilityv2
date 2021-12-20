<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0 px-6">
            <v-row class="grayBg">
                <v-col sm="12" cols="12" class="">
                    <v-card outlined color="white" class="pa-3">
                        <v-row class="">
                            <v-col sm="4" cols="12" class="py-0">
                                <v-select class="mt-1"
                                          :items="dateSorters"
                                          v-model="mDateSorter"
                                          item-text="name"
                                          item-value="id"
                                          @change="onSorterChanges"
                                          clearable
                                          outlined
                                          placeholder="ALL"
                                />
                            </v-col>

                            <v-col sm="3" cols="12" class="py-0">
                                <app-datepicker :initialDate="startDate"
                                                @emitDate="startDate = $event"/>
                            </v-col>

                            <v-col sm="3" cols="12" class="py-0">
                                <app-datepicker :initialDate="endDate"
                                                @emitDate="endDate = $event"/>
                            </v-col>

                            <v-col sm="1" cols="1" class="pt-1">
                                <v-btn color="primary white--text" @click="searchTransaction"
                                    class="btn_search"
                                    style="background-color: rgb(237, 241, 245)">
                                    <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-row class="">
                            <v-col sm="12" cols="12" class="py-0">
                                <template>
                                    <LoadingMe
                                        :isLoading="showLoadingTxn"
                                        :fullPage="false"
                                        type="loading"
                                        :myLoading="true"/>
                                    <kendo-datasource
                                        ref="gridTransactionDS"
                                        :type="'JSON'"
                                        :data="transactions"
                                        :server-paging="false"/>
                                    <kendo-grid id="gridTransaction" class="grid-function"
                                                :data-source-ref="'gridTransactionDS'"
                                                :editable="false"
                                                :groupable="true"
                                                :column-menu="true"
                                                :noRecords="true"
                                                :sortable="true"
                                                :scrollable-virtual="true">
                                        <kendo-grid-column
                                            :title="$t('no')"
                                            :template="rowNumberTmpl"
                                            :width="40"
                                            :column-menu="false"
                                            :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products px-1' }"
                                            :attributes="{ style: 'text-align: products'}"/>
                                        <kendo-grid-column
                                            :field="'issuedDate'"
                                            :title="$t('date')"
                                            :width="120"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'number'"
                                            :attributes="{class:'tb_name_td'}"
                                            :title="$t('number')"
                                            :width="150"
                                            :template="'<span>#=number#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'transactionType'"
                                            :title="$t('type')"
                                            :width="120"
                                            :template="'<span>#=type#</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                        <kendo-grid-column
                                            :field="'amount'"
                                            :title="$t('amount')"
                                            :width="200"
                                            :attributes="{style: 'text-align: right; '}"
                                            :template="'<span>#=kendo.toString(amount, numberFormat) #</span>'"
                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    </kendo-grid>
                                </template>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            type="loading"
            :myLoading="true"/>
    </v-row>
</template>
<script>
import {i18n} from '@/i18n';
// import kendo from "@progress/kendo-ui";
import kendo from "@progress/kendo-ui"
import saleFormContentHandler from "@/scripts/saleFormContentHandler";
// const $ = kendo.jQuery
const loanHandler = require("@/scripts/financing/handler/loanHandler")
export default {
    name: "FinancingTransaction",
    props: {
        txnLoan: {}
    },
    computed: {
        dateSorters() {
            if(this.txnLoan){
                this.setData()
            }
            return [
                {id: 1, name: i18n.t('today')},
                {id: 2, name: i18n.t('this_week')},
                {id: 3, name: i18n.t('this_month')},
                {id: 4, name: i18n.t('this_year')}
            ]
        },
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': () => import('@/components/custom_templates/DatePickerComponent')
    },
    data: () => ({
        errors: [],
        loan: {},
        saleFormContent: {},
        showLoading: false,
        startDate: kendo.toString(new Date(), 'yyyy-MM-dd'),
        endDate: kendo.toString(new Date(), 'yyyy-MM-dd'),
        showLoadingTxn: false,
        mDateSorter: 3,
        transactions: []
    }),
    methods: {
        setData(){
            this.loan = this.txnLoan
            this.onSorterChanges(3)
        },
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case 1:
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')
                    break
                case 2:
                    var first = today.getDate() - today.getDay(),
                        last = first + 6
                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')
                    break
                case 3:
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')
                    break
                case 4:
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')
                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        async searchTransaction() {
            window.console.log(this.loan, 'search')
            if (this.loan.hasOwnProperty('id')) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoadingTxn = true
                        const startDate = this.startDate
                        const endDate = this.endDate
                        let data = {
                            startDate: startDate,
                            endDate: endDate,
                            loanId: this.loan.id
                        }
                        this.transactions = []
                        loanHandler.centerTxnSearch(data).then(res => {
                            if (res.data.statusCode === 200) {
                                let d = res.data.data
                                d.forEach((obj) => {
                                    obj.numberFormat = `n${this.saleFormContent.decimal}`
                                })
                                this.transactions = d
                            }
                            this.showLoadingTxn = false
                        })
                    }, 300);
                })
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
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
        numberFormata(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.saleFormContent.decimal}`);
            // return value
        },
    },
    watch: {
        txnLoan() {
            window.console.log(this.txnLoan, 'txnloan')
            this.loan = this.txnLoan
            this.onSorterChanges(3)
        }
    },
    mounted: async function () {
        await this.loadSaleFormContent()
    },
    created: async function () {
    },
}
</script>
<style scoped>
.attachment_table table tr th {
    vertical-align: baseline !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
}


.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
}

.v-application .third,
.v-application .secondary {
    border-color: #fff !important;
}
</style>