<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('indicators_report') }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="4" cols="12" class="py-0">
                        <app-datepicker
                            :initialDate="asOf"
                            @emitDate="asOf = $event"
                        />
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
                            <kendo-datasource
                                ref="gridCollectionDS"
                                :type="'JSON'"
                                :data="lines"
                                :server-paging="false"/>
                            <kendo-grid
                                id="gridCollection" class="grid-function"
                                :data-source-ref="'gridCollectionDS'"
                                :editable="false"
                                :groupable="false"
                                :column-menu="true"
                                :noRecords="true"

                                :sortable="true"
                                :excel-file-name="$t('indicator_report')+'.xlsx'"
                                :excel-filterable="true"
                                :excel-all-pages="true"
                                :toolbar="['excel']"

                                :scrollable-virtual="true">
                                <kendo-grid-column
                                    :title="$t('no.')"
                                    :width="55"
                                    :template="rowNumberTmpl"
                                    :column-menu="false"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products' }"
                                    :attributes="{ style: 'text-align: products'}"
                                />
                                <kendo-grid-column
                                    :field="'loanProduct'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('loan_product')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'members'"
                                    :title="$t('members')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"
                                    :attributes="{style: 'text-align: right; '}"
                                />
                                <kendo-grid-column
                                    :field="'activeBorrowers'"
                                    :title="$t('active_borrowers')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"
                                    :attributes="{style: 'text-align: right; '}"
                                />
                                <kendo-grid-column
                                    :field="'womenBorrowers'"
                                    :title="$t('women_borrowers')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    :attributes="{style: 'text-align: right; '}"
                                />
                                <kendo-grid-column
                                    :field="'womenP'"
                                    :title="$t('_women')"
                                    :width="150"
                                    :template="'<span>#= womenP.toFixed(2) #%</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    :attributes="{style: 'text-align: right; '}"
                                />
                                <kendo-grid-column
                                    :field="'loanDisbursed'"
                                    :title="$t('loan_disbursed')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(loanDisbursed, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    :attributes="{style: 'text-align: right; '}"
                                />
                                <kendo-grid-column
                                    :field="'loanOutstanding'"
                                    :title="$t('loan_outstanding')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(loanOutstanding, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"
                                    :attributes="{style: 'text-align: right; '}"
                                />
                                <kendo-grid-column
                                    :field="'loanOutP'"
                                    :title="$t('_loan_outstanding')"
                                    :width="200"
                                    :template="'<span>#= loanOutP.toFixed(2) #%</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"
                                    :attributes="{style: 'text-align: right; '}"
                                />
                            </kendo-grid>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"
                                :alertMessage="loadingAlert"
                                :color="loadingColorAlert"
                                :alertText="loadingTextAlert"/>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

    </v-row>

</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui"

const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
import {print} from '@/form/loan/ListOfLoan.js'
import JSZip from "jszip";
window.JSZip = JSZip;

const $ = kendo.jQuery
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        group: {field: 'type'},
        numberFormat: 'c0',
        loanList: [],
        decimals: [],
        lines: [],
        exfield: {
            'No': 'no',
            'cid': 'cid',
            'name': 'name',
            'dob': 'dob',
            'gender': 'gender',
            'group': 'group',
            'issued date': 'issued_date',
            'loan_term': 'loan_term',
            'loan_product': 'loan_product',
            'loan_number': 'loan_number',
            'loan_amount': 'loan_amount',
            'disbursed_amount': 'disbursed_amount',
            'status': 'status',
        },
        listOfLoan: [],
    }),
    components: {
        'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        search() {
            this.showLoading = true
            if (this.asOf) {
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            asOf: this.asOf
                        }
                        // window.console.log(data, 'search')
                        memberHandler.getLoanDisburseReport(data).then(res => {
                            this.showLoading = false
                            this.loanList = res.data.data
                            // window.console.log(this.loanList)
                            if (this.loanList.length > 0) {
                                let ds = this.$refs.gridCollectionDS.kendoWidget(),
                                    self = this, lines = [], pAr = []
                                ds.data([])
                                $.each(this.loanList, function (i, v) {
                                    let locale = v.loanProduct.currency.code
                                    let dec = self.decimals.filter((obj) => {
                                        return obj.currency.code == locale
                                    })
                                    let fo = 0
                                    if (dec.length > 0) {
                                        fo = dec[0].decimal
                                    }
                                    if ($.inArray(v.loanProduct.id, pAr) == -1) {
                                        pAr.push(v.loanProduct.id)
                                        lines.push({
                                            productId: v.loanProduct.id,
                                            memberId: v.member.id,
                                            loanProduct: v.loanProduct.name,
                                            members: 0,
                                            activeBorrowers: 0,
                                            womenBorrowers: 0,
                                            womenP: 0,
                                            loanDisbursed: 0,
                                            loanOutstanding: 0,
                                            loanOutP: 0,
                                            locale: locale,
                                            numberFormat: 'n' + fo
                                        })
                                    }
                                })
                                if (lines.length > 0) {
                                    let loan = this.loanList
                                    $.each(lines, function (i, v) {
                                        let d = loan.filter((obj) => {
                                            return obj.loanProduct.id === v.productId
                                        })
                                        // window.console.log(d, 'loanp')
                                        if (d.length > 0) {
                                            let dis = 0, atb = 0, paid = 0
                                            $.each(d, function (j, k) {
                                                dis += parseFloat(k.totalPayment)
                                                atb += 1
                                                paid += parseFloat(k.paid)
                                            })
                                            v.loanDisbursed = dis
                                            v.activeBorrowers = atb
                                            v.loanOutstanding = dis - paid
                                            v.loanOutP = ((dis - paid) / dis) * 100
                                        }
                                        let cus = loan.filter((obj) => {
                                            return obj.loanProduct.id === v.productId && obj.member.id === v.memberId
                                        })
                                        v.members = cus.length
                                        // window.console.log(cus, 'mem')
                                        if (cus.length > 0) {
                                            let f = 0
                                            $.each(cus, function (a, b) {
                                                if (b.member.hasOwnProperty('gender')) {
                                                    if (b.member.gender != 'male') {
                                                        f += 1
                                                    }
                                                }
                                            })
                                            v.womenBorrowers = f
                                            v.womenP = (f / cus.length) * 100
                                        }
                                    })
                                }
                                this.lines = lines
                                // window.console.log(lines, 'linessss')
                            }
                        })
                    }, 300);
                })
            }
        },
        async loadDecimal() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.decimalGet().then(res => {
                        this.decimals = res.data.data
                    })
                }, 300);
            })
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridCollectionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        print_() {
            print(this.listOfLoan)
        }
    },
    computed: {},
    mounted: async function () {
        await this.loadDecimal()
    },
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

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
</style>
