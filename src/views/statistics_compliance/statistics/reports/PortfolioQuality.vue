<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('portfolio_quality') }}</h2>
                        <!-- <p class="mb-0">{{ $t('បញ្ជីប្រាក់កម្ចី') }}</p> -->
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="8" cols="8" class="pt-0">
                    </v-col>
                    <v-col sm="2" cols="2" class="pt-0">
                        <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)" @click="search">
                            <span class="font_14">{{$t('run_report')}}</span>
                        </v-btn>
                    </v-col>
                    <v-col sm="2" cols="12" class="pt-0 text-right">
                        <downloadexcel
                            icon
                            color="black"
                            class="bg-none float-right "
                            :data="listOfLoan"
                            :fields="exfield"
                            type="xls"
                            name="listOfLoan.xls">
                            <v-icon class="font_34" style="color: black;margin-top: 3px;margin-left: 10px;">fa
                                fa-file-excel
                            </v-icon>
                        </downloadexcel>

                        <v-btn icon color="black" class="bg-none float-right ml-2">
                            <v-icon class="font_34">fa fa-print</v-icon>
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
                                    :field="'outstanding'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('loan_outstanding')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(outstanding, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'late30'"
                                    :title="$t('_1_30')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(late30, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"
                                />
                                <kendo-grid-column
                                    :field="'late60'"
                                    :title="$t('_31_60')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(late60, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"
                                />
                                <kendo-grid-column
                                    :field="'late90'"
                                    :title="$t('_61_90')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(late90, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'over90'"
                                    :title="$t('above_90_days_late')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(over90, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'provision'"
                                    :title="$t('required_provision')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(provision, numberFormat) ##= locale#</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                />
                                <kendo-grid-column
                                    :field="'provisionP'"
                                    :title="$t('provision_percentage')"
                                    :width="200"
                                    :template="'<span>#= provisionP.toFixed(2)#%</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"
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
// import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui"

const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
import downloadexcel from "vue-json-excel"
import {print} from '@/form/loan/ListOfLoan.js'


const $ = kendo.jQuery
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
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
        // 'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
        downloadexcel: downloadexcel,
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
                        window.console.log(data, 'search')
                        memberHandler.loanPortfolioReport(data).then(res => {
                            this.showLoading = false
                            this.loanList = res.data.data
                            window.console.log(this.loanList, 'loan po')
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
                                        memberId: v.memberId,
                                        disburseId: v.disbursementId,
                                        loanProduct: v.loanProduct.name,
                                        outstanding: 0,
                                        late30: 0,
                                        late60: 0,
                                        late90: 0,
                                        over90: 0,
                                        provision: 0,
                                        provisionP: 0,
                                        locale: locale,
                                        numberFormat: 'n' + fo
                                    })
                                }
                            })
                            window.console.log(lines, 'after 1')
                            if (lines.length > 0) {
                                let loan = this.loanList
                                let dAr = []
                                $.each(lines, function (i, v) {
                                    let d = loan.filter((obj) => {
                                        return obj.loanProduct.id === v.productId
                                    })
                                    if(d.length > 0){
                                        let letb = 0
                                        $.each(d, function (j,k){
                                            if ($.inArray(k.disburseId, dAr) == -1) {
                                                window.console.log(v.receiptDate)
                                                v.outstanding += parseFloat(k.outStanding)
                                                letb = parseFloat(k.data.total)
                                                // not in array
                                                dAr.push(k.disburseId)
                                            }
                                            // letb += parseFloat(k.data.total)
                                        })
                                        if(d.length == 1){
                                            v.late30 += letb
                                        }else if(d.length == 2){
                                            v.late60 += letb
                                        }else if(d.length == 3){
                                            v.late90 += letb
                                        }else{
                                            v.over90 += letb
                                        }
                                    }
                                })
                                $.each(lines, function (i, v) {
                                    let l = 0
                                    if(v.over90 > 0){
                                        v.provision = v.over90
                                        v.provisionP = (v.over90 / v.outstanding) * 100
                                    }else if(v.late90 > 0){
                                        l = v.late90 * 0.3
                                        v.provision = l
                                        v.provisionP = (l / v.outstanding) * 100
                                    }else if(v.late60){
                                        l = v.late60 * 0.1
                                        v.provision = l
                                        v.provisionP = (l / v.outstanding) * 100
                                    }
                                })
                            }
                            this.lines = lines
                            window.console.log(lines, 'linessss')
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
