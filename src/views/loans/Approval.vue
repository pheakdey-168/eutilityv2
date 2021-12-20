<template>
    <v-app>
        <v-container fluid>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="12" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <div class="function_header">
                                        <h2>{{ $t('loan_approval') }}</h2>
                                        <v-icon
                                            onclick="window.history.go(-1); return false;"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </div>
                                    <div class="function_content">
                                        <!-- Form -->
                                        <v-form
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation>
                                            <v-col sm="12" col="12">
                                                <v-row>
                                                    <v-col sm="4" cols="12" class="pt-0">
                                                        <v-card color="#f8f8f9" class="pa-1 no_border">
                                                            <h3 class="">{{ $t('total_agreement') }}</h3><br/>
                                                            <h2>{{ creditAmount }}</h2>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col sm="4" cols="12" class="pt-0">
                                                        <v-card color="#f8f8f9" class="pa-1 no_border">
                                                            <h3 class="">{{ $t('credit_balance') }}</h3><br/>
                                                            <h2>{{ numberFormat(creditBalance) }}</h2>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-form>
                                        <!-- Grid -->

                                    </div>
                                    <v-col sm="12" col="12" class="px-0"> 
                                        <v-row>
                                            <v-col sm="12" cols="12" class="py-0">
                                                <template>
                                                    <LoadingMe
                                                        :isLoading="showLoading"
                                                        :fullPage="false"
                                                        :myLoading="true"/>
                                                    <kendo-datasource ref="gridLoan" :data="loanList"/>
                                                    <kendo-grid
                                                        id="gridLoan" class="grid-function"
                                                        :data-source-ref="'gridLoan'"
                                                        :column-menu="true"
                                                        :noRecords="true"
                                                        :editable="false"
                                                        :groupable="true"
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
                                                            :field="'cid'"
                                                            :title="$t('cid')"
                                                            :template="'<span>#= cid #</span>'"
                                                            :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>
                                                        <kendo-grid-column
                                                            :field="'name'"
                                                            :title="$t('name')"
                                                            :template="'<span>#= name #</span>'"
                                                            :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>
                                                        <kendo-grid-column
                                                            :field="'number'"
                                                            :title="$t('loan_number')"
                                                            :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>
                                                        <kendo-grid-column
                                                            :field="'loanProduct'"
                                                            :title="$t('loan_product')"
                                                            :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>

                                                        <kendo-grid-column
                                                            :field="'term'"
                                                            :title="$t('term')"
                                                            :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>
                                                        <kendo-grid-column
                                                            :field="'purpose'"
                                                            :title="$t('purpose')"
                                                            :attributes="{style: 'text-align: right'}"
                                                            :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>
                                                        <kendo-grid-column
                                                            :field="'amount'"
                                                            :title="$t('amount')"
                                                            :template="'<span>#= kendo.toString(parseFloat(amount), `n0`) #</span>'"
                                                            :attributes="{style: 'text-align: right'}"
                                                            :headerAttributes="{
                                                            style: 'background-color: #EDF1F5'
                                                        }"/>
                                                        <kendo-grid-column
                                                            :field="'action'"
                                                            :title="$t('action')"
                                                            :command="{  
                                                            text: textReview,
                                                            click: reviewLoan, class: 'btn-plus' }"
                                                            :attributes="{style: 'text-align: center'}"
                                                            :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
                                                        />
                                                    </kendo-grid>
                                                </template>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-form>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
import { i18n } from '@/i18n';
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
export default {
    name: "LoanApproval",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        isHideBar: false,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        dialogM2: false,
        alert: false,
        valid: true,
        skip: 0,
        tempSkip: null,
        total: 0,
        filter: '',
        textField: 'name',
        dataItemKey: 'id',
        baseCurrencyCode: '',
        errors: [],
        creditAmount: 0,
        creditBalance: 0,
        creditApproved: 0,
        loanList: [],
        decimals: []
    }),
    methods: {
        errorMessage() {
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        //function
        cancel() {
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridLoan.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        reviewLoan(e) {
            e.preventDefault();
            const grid = $("#gridLoan").data("kendoGrid"),
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            window.console.log(dataItem, 'loan review')
            this.$router.push({
                path: 'loan_agreement' + `/${dataItem.id}`,
                params: {id: dataItem.id},
                query: {type: 'approve'}
            })
        },
        async loadLoan() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.creditAmount = 0
                    this.creditBalance = 0
                    memberHandler.loanApprovGet().then(res => {
                        if(res.data.data.length > 0){
                            let t = 0, self = this
                            $.each(res.data.data, function (i,v){
                                t += parseFloat(v.amount)
                                let dec = self.decimals.filter((obj) => {
                                    return obj.currency.code == v.locale
                                })
                                let fo = 0
                                if (dec.length > 0) {
                                    fo = dec[0].decimal
                                }
                                self.loanList.push({
                                    amount: v.amount,
                                    cid: v.cid,
                                    id: v.id,
                                    issuedDate: v.issuedDate,
                                    loanMethod: v.loanMethod,
                                    loanProduct: v.loanProduct,
                                    locale: v.locale,
                                    name: v.name,
                                    number: v.number,
                                    purpose: v.purpose,
                                    term: v.term,
                                    format: 'n' + fo,
                                })
                            })
                            this.creditAmount = res.data.data.length
                            this.creditBalance = t
                        }
                    })
                }, 300);
            })
        },
        numberFormat(value) {
            value = parseFloat(value.toFixed(2))
            return kendo.toString(value, 'n0')
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
    },
    watch: {
    },
    mounted: async function () {
        await this.loadDecimal()
        await this.loadLoan()
    },
    created: async function () {
    },
    computed: {
        textReview(){
            return i18n.t('review')
        }
    },
    destroyed() {
    },
};
</script>

<style scoped>
.k-dropdown {
    width: 100%;
    margin-top: 4px;
}


.function_content .label {
    margin-bottom: 10px;
    display: inline-block;
}


@media (max-width: 576px) {
    .pt-6.col-sm-5.col-12 {
        padding-top: 0 !important;
    }

    .code_text {
        width: 100%;
    }

    .phone_no_pt {
        padding-top: 0 !important;
    }

    .select_template,
    .save_option {
        margin-bottom: 10px;
    }
}


.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Krasar-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
    border-bottom: 1px solid #000 !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.v-slide-group__content {
    background-color: #F8F8F9 !important;
}

.v-tab--active {
    background-color: #ffffff !important;
    border-left: none;
}

.function_content {
    padding: 0;
    background-color: #F8F8F9;
}

.v-input--radio-group--row {
    margin-top: 0px !important;
    padding: 0px;
}

.v-input__control {
    height: 25px !important;
}
</style>