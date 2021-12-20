<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border reports_list" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('summary_report') }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="3" class="py-0">
                        <label class="label pr-3">{{ $t('base_month') }}</label>
                        <app-month-of-picker
                            :initMonthOf="baseMonthOf"
                            @emitMonthOf="baseMonthOf = $event"
                            @change="monthChange"
                        />
                    </v-col>

                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn class="btn_search mt-5" style="background-color: rgb(237, 241, 245)" @click="search">
                            <span class="">{{ $t('run_report') }}</span>
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
                            <kendo-datasource
                                ref="gridLoan"
                                :data="reportDataA"
                                :group="groupDefinition"
                            />
                            <kendo-grid
                                id="gridLoan" class="grid-function"
                                :data-source-ref="'gridLoan'"
                                :column-menu="true"
                                :noRecords="true"
                                :editable="false"
                                :groupable="false"
                                :sortable="false"

                                :excel-file-name="$t('summary')+'.xlsx'"
                                :excel-filterable="true"
                                :excel-all-pages="true"
                                :toolbar="['excel']"

                                :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'title'"
                                    :title="$t('title')"
                                    :hidden="true"
                                    :groupHeaderTemplate="'<span class=`text-bold text-black`>#=value#</span>'"
                                    :headerAttributes="{
                                        style: 'background-color: #EDF1F5'
                                    }"
                                />
                                <kendo-grid-column
                                    :field="'no'"
                                    :title="$t('no.')"
                                    :width="50"
                                    :template="'<span style=#= style#>#= no#</span>'"
                                    :headerAttributes="{
                                            style: 'background-color: #EDF1F5'
                                        }"/>
                                <kendo-grid-column
                                    :field="'description'"
                                    :title="$t('description')"
                                    :width="200"
                                    :template="'<span style=#= style#>#= description#</span>'"
                                    :headerAttributes="{
                                            style: 'background-color: #EDF1F5'
                                        }"/>
                                <kendo-grid-column
                                    :field="'currentMonth'"
                                    :title="'currentMonth'"
                                    :width="100"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{
                                            style: 'background-color: #EDF1F5'
                                        }"/>
                                <kendo-grid-column
                                    :field="'accumulated'"
                                    :title="$t('accumulated')"
                                    :width="100"
                                    :attributes="{style: 'text-align: right; '}"
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
const {i18n} = require("@/i18n");
import JSZip from "jszip";
const loanHandler = require("@/scripts/loanHandler")
const memberHandler = require("@/scripts/memberHandler")
window.JSZip = JSZip;
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
export default {
    data: () => ({
        baseMonthOf: new Date().toISOString().substr(0, 7),
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        loanProducts: [],
        reportData: [],
        reportDataA: [],
        monthTitle: '',
        accumulateData: {},
        periodData: {},
        // Kendo
        groupDefinition : { field:"title"},
    }),
    components: {
        'app-month-of-picker': () => import("@/components/kendo_templates/MonthOfPicker"),
        LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        monthChange() {
            this.monthTitle = kendo.toString(new Date(this.baseMonthOf+'-01'), 'MM yyyy')
            $("#gridLoan th[data-title=currentMonth]").contents().last().replaceWith(this.monthTitle);
        },
        getNumberOfDays(start, end) {
            const date1 = new Date(start);
            const date2 = new Date(end);

            // One day in milliseconds
            const oneDay = 1000 * 60 * 60 * 24;

            // Calculating the time difference between two dates
            const diffInTime = date2.getTime() - date1.getTime();

            // Calculating the no. of days between two dates
            const diffInDays = Math.round(diffInTime / oneDay);

            return diffInDays;
        },
        search() {
            this.monthChange()
            if (this.asOf) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        this.reportDataA = []
                        $.each(this.reportData, function (i,v){
                            if(v.sub > 0){
                                v.currentMonth = 0
                                v.accumulated = 0
                            }
                        })
                        let d = new Date(this.baseMonthOf+'-01')
                        let l = kendo.toString(new Date(d.getFullYear(), d.getMonth(), 31), 'yyyy-MM-dd')
                        let period = {
                            startDate: kendo.toString(d, 'yyyy-MM-dd'),
                            endDate: l,
                            type: 'betweendate',
                        }
                        this.periodData = {}
                        memberHandler.loanStatisticSummaryReport(period).then(res => {
                            let data = res.data.data
                            this.periodData = data
                            // window.console.log(data, 'period data')
                            this.mixData()
                        })

                        let asOf = {
                            asOfDate: kendo.toString(new Date(d.getFullYear(), d.getMonth() - 1, 31), 'yyyy-MM-dd'),
                            type: 'asOf',
                        }
                        this.accumulateData = {}
                        memberHandler.loanStatisticSummaryReport(asOf).then(res => {
                            let data = res.data.data
                            this.accumulateData = data
                            // window.console.log(data, 'accumulate data')
                            this.mixData()
                        })
                    }, 300);
                })
            }
        },
        mixData(){
            if(this.periodData.hasOwnProperty('numLoan') && this.accumulateData.hasOwnProperty('numLoan')){
                let self = this, pbal = [], cbal = []
                $.each(this.reportData, function (i,v){
                    //num loan
                    pbal = self.periodData.numLoan.filter((obj) => {return obj.product_id == v.id && v.sub == 1})
                    if(pbal.length > 0){
                        v.currentMonth = pbal.length
                    }
                    cbal = self.accumulateData.numLoan.filter((obj) => {return obj.product_id == v.id && v.sub == 1})
                    if(cbal.length > 0){
                        v.accumulated = cbal.length
                    }
                    //balance
                    pbal = self.periodData.balance.filter((obj) => {return obj.att == v.id && v.sub == 2})
                    window.console.log(pbal, 'balance')
                    if(pbal.length > 0){
                        let b = 0
                        $.each(pbal, function (j,k){
                            b += parseFloat(k.amount)
                        })
                        v.currentMonth = b
                    }
                    cbal = self.accumulateData.balance.filter((obj) => {return obj.att == v.id && v.sub == 2})
                    if(cbal.length > 0){
                        let c = 0
                        $.each(cbal, function (j,k){
                            c += parseFloat(k.amount)
                        })
                        v.accumulated = c
                    }
                    //new loan
                    pbal = self.periodData.newLoan.filter((obj) => {return obj.product_id == v.id && v.sub == 3})
                    if(pbal.length > 0){
                        v.currentMonth = pbal.length
                    }
                    cbal = self.accumulateData.newLoan.filter((obj) => {return obj.product_id == v.id && v.sub == 3})
                    if(cbal.length > 0){
                        v.accumulated = cbal.length
                    }
                    //disburse
                    pbal = self.periodData.disburse.filter((obj) => {return obj.att == v.id && v.sub == 4})
                    if(pbal.length > 0){
                        let b = 0
                        $.each(pbal, function (j,k){
                            b += parseFloat(k.amount)
                        })
                        v.currentMonth = b
                    }
                    cbal = self.accumulateData.disburse.filter((obj) => {return obj.att == v.id && v.sub == 4})
                    if(cbal.length > 0){
                        let c = 0
                        $.each(cbal, function (j,k){
                            c += parseFloat(k.amount)
                        })
                        v.accumulated = c
                    }
                    // loan paid
                    pbal = self.periodData.paids.filter((obj) => {return obj.att == v.id && v.sub == 5})
                    if(pbal.length > 0){
                        let b = 0
                        $.each(pbal, function (j,k){
                            b += parseFloat(k.amount)
                        })
                        v.currentMonth = b
                    }
                    cbal = self.accumulateData.paids.filter((obj) => {return obj.att == v.id && v.sub == 5})
                    if(cbal.length > 0){
                        let c = 0
                        $.each(cbal, function (j,k){
                            c += parseFloat(k.amount)
                        })
                        v.accumulated = c
                    }
                    // overdue
                    pbal = self.periodData.overDue.filter((obj) => {return obj.productId == v.id && v.sub == 6})
                    if(pbal.length > 0){
                        let p = 0
                        $.each(pbal, function (j,k){
                            p += parseFloat(k.principal)
                        })
                        v.currentMonth = p
                    }
                    cbal = self.accumulateData.overDue.filter((obj) => {return obj.productId == v.id && v.sub == 6})
                    if(cbal.length > 0){
                        let c = 0
                        $.each(cbal, function (j,k){
                            c += parseFloat(k.principal)
                        })
                        v.accumulated = c
                    }
                    pbal = self.periodData.overDue.filter((obj) => {return obj.productId == v.id && v.sub == 7})
                    if(pbal.length > 0){
                        let p = 0
                        $.each(pbal, function (j,k){
                            p += parseFloat(k.interest)
                        })
                        v.currentMonth = p
                    }
                    cbal = self.accumulateData.overDue.filter((obj) => {return obj.productId == v.id && v.sub == 7})
                    if(cbal.length > 0){
                        let c = 0
                        $.each(cbal, function (j,k){
                            c += parseFloat(k.interest)
                        })
                        v.accumulated = c
                    }
                    // over due 30
                    pbal = self.periodData.overDue.filter((obj) => {return obj.productId == v.id && v.sub == 8})
                    if(pbal.length > 0){
                        let p = 0
                        $.each(pbal, function (j,k){
                            let com = self.getNumberOfDays(k.receiptDate, new Date())
                            if(com > 30) {
                                p += parseFloat(k.principal) + parseFloat(k.interest)
                            }
                        })
                        v.currentMonth = p
                    }
                    cbal = self.accumulateData.overDue.filter((obj) => {return obj.productId == v.id && v.sub == 8})
                    if(cbal.length > 0){
                        let c = 0
                        $.each(cbal, function (j,k){
                            let com = self.getNumberOfDays(k.receiptDate, new Date())
                            if(com > 30) {
                                c += parseFloat(k.principal) + parseFloat(k.interest)
                            }
                        })
                        v.accumulated = c
                    }
                    // over due 30 %
                    pbal = self.periodData.overDue.filter((obj) => {return obj.productId == v.id && v.sub == 9})
                    if(pbal.length > 0){
                        let p = 0, t = 0
                        $.each(pbal, function (j,k){
                            let com = self.getNumberOfDays(k.receiptDate, new Date())
                            if(com > 30) {
                                p += parseFloat(k.principal) + parseFloat(k.interest)
                            }
                            t += parseFloat(k.principal) + parseFloat(k.interest)
                        })
                        v.currentMonth = (p * t) / 100
                    }
                    cbal = self.accumulateData.overDue.filter((obj) => {return obj.productId == v.id && v.sub == 9})
                    if(cbal.length > 0){
                        let c = 0, t = 0
                        $.each(cbal, function (j,k){
                            let com = self.getNumberOfDays(k.receiptDate, new Date())
                            if(com > 30) {
                                c += parseFloat(k.principal) + parseFloat(k.interest)
                            }
                            t += parseFloat(k.principal) + parseFloat(k.interest)
                        })
                        v.accumulated = (c * t) / 100
                    }
                })
                // window.console.log(this.reportData, 'loan product')
                this.reportDataA = this.reportData
                this.showLoading = false
            }
        },
        async loadLoanProduct() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.productGet().then(res => {
                        this.loanProducts = res.data.data
                        this.addDefaultField()
                    })
                }, 300);
            })
        },
        addDefaultField(){
            let data = []
            // data.push({
            //     title:"1. "+ i18n.t('number_of_loan_account'),
            //     style: "",
            //     no: "",
            //     description: "",
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 1,
            //     sub: 0,
            // })
            $.each(this.loanProducts, function (i,v){
                data.push({
                    title:"1. "+ i18n.t('number_of_loan_account'),
                    style: "",
                    no: "1."+(i+1),
                    id: v.id,
                    description: v.name,
                    isTitle: false,
                    currentMonth: 0,
                    accumulated: 0,
                    main: 0,
                    sub: 1,
                })
            })
            // data.push({
            //     title:"2. "+ i18n.t('loan_balances'),
            //     style: "",
            //     no: "2",
            //     description: i18n.t('loan_balances'),
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 2,
            //     sub: 0
            // })
            $.each(this.loanProducts, function (i,v){
                data.push({
                    title:"2. "+ i18n.t('loan_balances'),
                    style: "",
                    no: "2."+(i+1),
                    id: v.id,
                    description: v.name,
                    isTitle: false,
                    currentMonth: 0,
                    accumulated: 0,
                    main: 0,
                    sub: 2
                })
            })
            // data.push({
            //     title:"3. "+ i18n.t('new_loan_account'),
            //     style: "",
            //     no: "3",
            //     description: i18n.t('new_loan_account'),
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 3,
            //     sub: 0,
            // })
            $.each(this.loanProducts, function (i,v){
                data.push({
                    title:"3. "+ i18n.t('new_loan_account'),
                    style: "",
                    no: "3."+(i+1),
                    description: v.name,
                    isTitle: false,
                    currentMonth: 0,
                    accumulated: 0,
                    main: 0,
                    sub: 3,
                })
            })
            // data.push({
            //     title:"4. "+ i18n.t('amount_disbursed_in_the_period'),
            //     style: "",
            //     no: "4",
            //     description: i18n.t('amount_disbursed_in_the_period'),
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 4,
            //     sub: 0,
            // })
            $.each(this.loanProducts, function (i,v){
                data.push({
                    title:"4. "+ i18n.t('amount_disbursed_in_the_period'),
                    style: "",
                    no: "4."+(i+1),
                    id: v.id,
                    description: v.name,
                    isTitle: false,
                    currentMonth: 0,
                    accumulated: 0,
                    main: 0,
                    sub: 4,
                })
            })
            // data.push({
            //     title:"5. "+ i18n.t('amount_repaid_in_the_period'),
            //     style: "",
            //     no: "5",
            //     description: i18n.t('amount_repaid_in_the_period'),
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 5,
            //     sub: 0,
            // })
            $.each(this.loanProducts, function (i,v){
                data.push({
                    title:"5. "+ i18n.t('amount_repaid_in_the_period'),
                    style: "",
                    no: "5."+(i+1),
                    id: v.id,
                    description: v.name,
                    isTitle: false,
                    currentMonth: 0,
                    accumulated: 0,
                    main: 0,
                    sub: 5,
                })
            })
            // data.push({
            //     title:"6. "+ i18n.t('overdue_principle_balance'),
            //     style: "",
            //     no: "6",
            //     description: i18n.t('overdue_principle_balance'),
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 6,
            //     sub: 0,
            // })
            $.each(this.loanProducts, function (i,v){
                data.push({
                    title:"6. "+ i18n.t('overdue_principle_balance'),
                    style: "",
                    no: "6."+(i+1),
                    id: v.id,
                    description: v.name,
                    isTitle: false,
                    currentMonth: 0,
                    accumulated: 0,
                    main: 0,
                    sub: 6,
                })
            })
            // data.push({
            //     title:"7. "+ i18n.t('overdue_interest_balance'),
            //     style: "",
            //     no: "7",
            //     description: i18n.t('overdue_interest_balance'),
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 7,
            //     sub: 0,
            // })
            $.each(this.loanProducts, function (i,v){
                data.push({
                    title:"7. "+ i18n.t('overdue_interest_balance'),
                    style: "",
                    no: "7."+(i+1),
                    id: v.id,
                    description: v.name,
                    isTitle: false,
                    currentMonth: 0,
                    accumulated: 0,
                    main: 0,
                    sub: 7,
                })
            })
            // data.push({
            //     title:"8. "+ i18n.t('portfolio_at_risk_30_days_amount'),
            //     style: "",
            //     no: "8",
            //     description: i18n.t('portfolio_at_risk_30_days_amount'),
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 8,
            //     sub: 0,
            // })
            $.each(this.loanProducts, function (i,v){
                data.push({
                    title:"8. "+ i18n.t('portfolio_at_risk_30_days_amount'),
                    style: "",
                    no: "8."+(i+1),
                    id: v.id,
                    description: v.name,
                    isTitle: false,
                    currentMonth: 0,
                    accumulated: 0,
                    main: 0,
                    sub: 8,
                })
            })
            // data.push({
            //     title:"9. "+ i18n.t('portfolio_at_risk_30_days'),
            //     style: "",
            //     no: "9",
            //     description: i18n.t('portfolio_at_risk_30_days'),
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 9,
            //     sub: 0,
            // })
            $.each(this.loanProducts, function (i,v){
                data.push({
                    title:"9. "+ i18n.t('portfolio_at_risk_30_days'),
                    style: "",
                    no: "9."+(i+1),
                    id: v.id,
                    description: v.name,
                    isTitle: false,
                    currentMonth: 0,
                    accumulated: 0,
                    main: 0,
                    sub: 9,
                })
            })
            // data.push({
            //     style: "font-weight:bold;text-transform:uppercase;",
            //     no: "10",
            //     description: i18n.t('loan_written_off_recovery'),
            //     isTitle: true,
            //     currentMonth: '',
            //     accumulated: '',
            //     main: 10,
            //     sub: 0,
            // })
            // $.each(this.loanProducts, function (i,v){
            //     data.push({
            //         style: "",
            //         no: "",
            //         description: v.name,
            //         isTitle: false,
            //         currentMonth: '',
            //         accumulated: '',
            //         main: 0,
            //         sub: 10,
            //     })
            // })
            // window.console.log(data)
            this.reportData = data
        }
    },
    computed: {},
    created: async function () {
        await this.loadLoanProduct()
    },
    mounted: async function () {
        this.monthChange()
    }
}
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

.k-grid th {
    padding: 8px 12px;
    border-width: 0 0 1px 1px;
    white-space: break-spaces !important;
    text-align: center !important;
}

</style>
