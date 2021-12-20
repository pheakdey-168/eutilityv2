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
                        @change="monthChange"/>
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
                                    :column-menu="false"
                                    :width="70"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products px-1' }"
                                    :attributes="{ style: 'text-align: products'}"
                                />
                                <kendo-grid-column
                                    :field="'description'"
                                    :title="$t('description')"
                                    :template="'<span style=#= style#>#= description#</span>'"
                                    :headerAttributes="{
                                            style: 'background-color: #EDF1F5'
                                        }"/>
                                <kendo-grid-column
                                    :field="'currentMonth'"
                                    :title="'currentMonth'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{
                                            style: 'background-color: #EDF1F5'
                                        }"/>
                                <kendo-grid-column
                                    :field="'accumulated'"
                                    :title="$t('accumulated')"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{
                                            style: 'background-color: #EDF1F5,text-align: right;'
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
import kendo from "@progress/kendo-ui";
const loanHandler = require("@/scripts/loanHandler")
const {i18n} = require("@/i18n");
import JSZip from "jszip";
const $ = kendo.jQuery
window.JSZip = JSZip;
const memberHandler = require("@/scripts/memberHandler")
export default {
    data: () => ({
        baseMonthOf: new Date().toISOString().substr(0, 7),
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        monthTitle: '',
        reportData: [],
        reportDataA: [],
        savingProducts: [],
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
        numberFormat(value) {
            value = parseFloat(value)
            value = parseFloat(value.toFixed(2))
            return kendo.toString(value, 'n0')
        },
        search() {
            this.monthChange()
            if (this.asOf) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        let d = new Date(this.baseMonthOf+'-01')
                        let l = kendo.toString(new Date(d.getFullYear(), d.getMonth(), 31), 'yyyy-MM-dd')
                        let period = {
                            startDate: kendo.toString(d, 'yyyy-MM-dd'),
                            endDate: l,
                            type: 'betweendate',
                        }
                        this.periodData = {}
                        memberHandler.savingStatisticSummaryReport(period).then(res => {
                            let data = res.data.data
                            this.periodData = data
                            this.reportData[0].currentMonth = this.numberFormat(data.numberSavingAccount)
                            this.reportData[1].currentMonth = this.numberFormat(data.memberFemale)
                            this.reportData[2].currentMonth = this.numberFormat(data.memberMale)
                            this.reportData[3].currentMonth = this.numberFormat(data.nonMemberFemale)
                            this.reportData[4].currentMonth = this.numberFormat(data.nonMemberMale)
                            this.reportData[5].currentMonth = this.numberFormat(data.savingAmount)
                            this.reportData[6].currentMonth = this.numberFormat(data.opBalance)
                            this.reportData[7].currentMonth = this.numberFormat(data.depositPeriod)
                            this.reportData[8].currentMonth = this.numberFormat(data.withdrawalPeriod)
                            this.reportData[9].currentMonth = this.numberFormat(data.numberNewSavingAccount)
                            this.mixData()
                        })

                        let asOf = {
                            asOfDate: kendo.toString(new Date(), 'yyyy-MM-dd'),
                            type: 'asOf',
                        }
                        this.accumulateData = {}
                        memberHandler.savingStatisticSummaryReport(asOf).then(res => {
                            let data = res.data.data
                            this.accumulateData = data
                            this.reportData[0].accumulated = this.numberFormat(data.numberSavingAccount)
                            this.reportData[1].accumulated = this.numberFormat(data.memberFemale)
                            this.reportData[2].accumulated = this.numberFormat(data.memberMale)
                            this.reportData[3].accumulated = this.numberFormat(data.nonMemberFemale)
                            this.reportData[4].accumulated = this.numberFormat(data.nonMemberMale)
                            this.reportData[5].accumulated = this.numberFormat(data.savingAmount)
                            this.reportData[6].accumulated = this.numberFormat(data.opBalance)
                            this.reportData[7].accumulated = this.numberFormat(data.depositPeriod)
                            this.reportData[8].accumulated = this.numberFormat(data.withdrawalPeriod)
                            this.reportData[9].accumulated = this.numberFormat(data.numberNewSavingAccount)
                            this.mixData()
                        })
                    }, 300);
                })
            }
        },
        mixData(){
            if(this.periodData.hasOwnProperty('savingAccount') && this.accumulateData.hasOwnProperty('savingAccount')){
                // window.console.log(this.periodData, this.accumulateData)
                let self = this
                // slice array
                this.reportData.splice(11,this.reportData.length);
                window.console.log(this.reportData, 'report after slice')
                $.each(this.savingProducts, function (i,v){
                    let pro = self.periodData.savingAccount.filter((obj) => {return obj.productId == v.id})
                    let pamt = 0
                    let pnum = 0
                    if(pro.length > 0){
                        $.each(pro, function (j,k){
                            pamt += parseFloat(k.balance)
                        })
                        pnum = pro.length
                    }
                    let proa = self.accumulateData.savingAccount.filter((obj) => {return obj.productId == v.id})
                    let pamta = 0
                    let pnuma = 0
                    if(proa.length > 0){
                        $.each(proa, function (j,k){
                            pamta += parseFloat(k.balance)
                        })
                        pnuma = pro.length
                    }
                    self.reportData.push({
                        title:"4. "+ i18n.t('by_products'),
                        style: "",
                        no: "4."+i+1,
                        description: v.name+' – Amount',
                        isTitle: false,
                        currentMonth: self.numberFormat(pamt),
                        accumulated: self.numberFormat(pamta),
                        main: 0,
                        sub: 10,
                    })
                    self.reportData.push({
                        title:"4. "+ i18n.t('by_products'),
                        style: "",
                        no: "",
                        description: v.name + ' – Saving Account',
                        isTitle: false,
                        currentMonth: self.numberFormat(pnum),
                        accumulated: self.numberFormat(pnuma),
                        main: 0,
                        sub: 10,
                    })
                })
                this.reportDataA = this.reportData
                window.console.log(this.reportData, 'report data')
                this.showLoading = false
            }
        },
        async loadSavingProduct() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.savingGet().then(res => {
                        this.savingProducts = res.data.data
                        this.addDefaultField()
                    })
                }, 300);
            })
        },
        addDefaultField(){
            
            let data = []
            data.push({
                title:"1. "+ i18n.t('number_of_saving_account'),
                style: "",
                no: "1",
                description: i18n.t('number_of_saving_account'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"1. "+ i18n.t('number_of_saving_account'),
                style: "",
                no: "1.1",
                description: i18n.t('female'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"1. "+ i18n.t('number_of_saving_account'),
                style: "",
                no: "1.2",
                description: i18n.t('male'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"1. "+ i18n.t('number_of_saving_account'),
                style: "",
                no: "1.3",
                description: i18n.t('non_member_female'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"1. "+ i18n.t('number_of_saving_account'),
                style: "",
                no: "1.4",
                description: i18n.t('non_member_male'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"2. "+ i18n.t('saving_amount'),
                style: "",
                no: "2",
                description: i18n.t('saving_amount'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"2. "+ i18n.t('saving_amount'),
                style: "",
                no: "2.1",
                description: i18n.t('opening_balance'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"2. "+ i18n.t('saving_amount'),
                style: "",
                no: "2.2",
                description: i18n.t('deposit_during_the_period'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"2. "+ i18n.t('saving_amount'),
                style: "",
                no: "2.3",
                description: i18n.t('withdrawal_during_the_period'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"3. "+ i18n.t('number_of_new_saving_accounts'),
                style: "",
                no: "3",
                description: i18n.t('number_of_new_saving_accounts'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            data.push({
                title:"4. "+ i18n.t('by_products'),
                style: "",
                no: "4",
                description: i18n.t('by_products'),
                isTitle: true,
                currentMonth: '',
                accumulated: '',
                main: 1,
                sub: 0,
            })
            // $.each(this.savingProducts, function (i,v){
            //     data.push({
            //         style: "",
            //         no: "4."+i+1,
            //         description: v.name+' – Amount',
            //         isTitle: false,
            //         currentMonth: '',
            //         accumulated: '',
            //         main: 0,
            //         sub: 10,
            //     })
            //     data.push({
            //         style: "",
            //         no: "",
            //         description: v.name + ' – Saving Account',
            //         isTitle: false,
            //         currentMonth: '',
            //         accumulated: '',
            //         main: 0,
            //         sub: 10,
            //     })
            // })
            // window.console.log(data)
            this.reportData = data
        },
        
    },
    computed: {},
    created: async function () {
        await this.loadSavingProduct()
        this.monthChange()
    },
    mounted: async function () {
    }
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

.k-grid th {
    padding: 8px 12px;
    border-width: 0 0 1px 1px;
    white-space: break-spaces !important;
    text-align: center !important;
}

</style>
