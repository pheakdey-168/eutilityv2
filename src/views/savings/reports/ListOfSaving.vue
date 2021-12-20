<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('list_of_saving') }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="4" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>
                    </v-col>
                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)"  @click="search">
                            <span class="">{{$t('run_report')}}</span>
                        </v-btn>
                    </v-col>
                    
                    <!-- <v-col sm="2" cols="12" class="py-0 mt-1">
                        <v-btn icon color="black" class="bg-none ml-2"
                        @click="print_">
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>
                    </v-col> -->
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource
                                ref="gridCollectionDS"
                                :type="'JSON'"
                                :groupable="true"
                                :aggregate="aggregateDefinition"
                                :server-paging="false"/>
                            <kendo-grid
                                id="gridCollection" class="grid-function"
                                :data-source-ref="'gridCollectionDS'"
                                :editable="false"
                                :groupable="true"
                                :column-menu="true"
                                :noRecords="true"
                                
                                :sortable="true"
                                :excel-file-name="$t('list_of_saving')+'.xlsx'"
                                :excel-filterable="true"
                                :excel-all-pages="true"
                                :toolbar="['excel']"

                                :scrollable-virtual="true">
                                <kendo-grid-column
                                    :title="$t('no.')"
                                    :width="40"
                                    :template="rowNumberTmpl"
                                    :column-menu="false"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products px-1' }"
                                    :attributes="{ style: 'text-align: products'}"
                                />
                                <kendo-grid-column
                                    :field="'cid'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('cid')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'dob'"
                                    :title="$t('dob')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'gender'"
                                    :title="$t('gender')"
                                    :width="90"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'group'"
                                    :title="$t('group')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'issued_date'"
                                    :title="$t('issue_date')"
                                    :attributes="{class:'tb_name_td'}"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'number'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :title="$t('number')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'type'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('type')"
                                    :width="200"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'status'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('status')"
                                    :width="200"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'deposit'"
                                    :title="$t('total_deposit')"
                                    :width="150"
                                    :attributes="{style: 'text-align: right; '}"
                                    :aggregates="['sum']"
                                    :footerTemplate="'Total deposit: #=sum#'"
                                    :template="'<span>#= kendo.toString(deposit, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'text-align: right, background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'withdraw'"
                                    :title="$t('total_withdraw')"
                                    :width="200"
                                    :aggregates="['sum']"
                                    :footerTemplate="'Total withdraw: #=sum#'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(withdraw, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'interest'"
                                    :title="$t('total_interest')"
                                    :width="200"
                                    :hidden="true"
                                    :aggregates="['sum']"
                                    :footerTemplate="'Total interest: #=sum#'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(interest, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'total'"
                                    :title="$t('total')"
                                    :width="200"
                                    :aggregates="['sum']"
                                    :footerTemplate="'Total: #=sum#'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(total, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'locale'"
                                    :title="$t('currency')"
                                    :width="200"
                                    :hidden="true"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
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
import { print } from '@/form/form.js'
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
// import { i18n } from '@/i18n'
import kendo from "@progress/kendo-ui"
const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
import JSZip from "jszip";
import {i18n} from "../../../i18n";
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
        l: [],
        decimals: [],
        exfield: {
            'No': 'no',
            'cid': 'cid',
            'name': 'name',
            'dob': 'dob',
            'gender': 'gender',
            'group': 'group',
            'issued date': 'issued_date',
            'number': 'number',
            'type': 'type',
            'status': 'status',
            'deposit amount': 'deposit',
            'withdraw amount': 'withdraw',
            'interest amount': 'interest',
            'total': 'total'
        },
        listsaving: [],
        aggregateDefinition : [
            { field: "deposit", aggregate: "sum" },
            { field: "withdraw", aggregate: "sum" },
            { field: "interest", aggregate: "sum" },
            { field: "total", aggregate: "sum" },
        ],
        groups: [],
    }),
    components: {
        'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        search() {
            this.showLoading = true
            if(this.asOf){
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            asOf: this.asOf
                        }
                        // window.console.log(data, 'search')
                        memberHandler.getSavingListReport(data).then(res => {
                            this.showLoading = false
                            this.l = res.data.data
                            // window.console.log(this.l)
                            if(this.l.length > 0){
                                let ds = this.$refs.gridCollectionDS.kendoWidget(),
                                    self = this
                                ds.data([])
                                this.listsaving = []
                                $.each(this.l, function (i,v){
                                    let locale = v.product.currency.code
                                    let dec = self.decimals.filter((obj) => {return obj.currency.code == locale})
                                    let fo = 0
                                    if(dec.length > 0){
                                        fo = dec[0].decimal
                                    }
                                    let status = 'close'
                                    if(v.status == 1){
                                        status = 'active'
                                    }
                                    let ccid = v.member.numberName.split(' - ')
                                    let g = self.groups.filter((obj) => {return obj.id == v.member.groupId})
                                    window.console.log(g, 'compare')
                                    let mainBlock = '', subBlock = '', zone = '', group = ''
                                    if(g.length > 0){
                                        mainBlock = g[0].hasOwnProperty('mainBlock') ? g[0].mainBlock.name : ''
                                        subBlock = g[0].hasOwnProperty('subBlock') ? g[0].subBlock.name : ''
                                        zone = g[0].hasOwnProperty('zone') ? g[0].zone.name : ''
                                        group = g[0].name
                                    }
                                    ds.add({
                                        cid: ccid[0],
                                        number: v.number,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: i18n.t(v.member.gender),
                                        mainBlock: mainBlock,
                                        subBlock: subBlock,
                                        zone: zone,
                                        group: group,
                                        issued_date: v.issuedDate,
                                        type: v.type.name,
                                        deposit: parseFloat(v.deposit),
                                        status: i18n.t(status),
                                        withdraw: parseFloat(v.withdraw),
                                        interest: parseFloat(v.interest),
                                        total: (parseFloat(v.deposit) + parseFloat(v.interest)) - parseFloat(v.withdraw),
                                        locale: locale,
                                        numberFormat: 'n' + fo
                                    })
                                    self.listsaving.push({
                                        no: i + 1,
                                        cid: ccid[0],
                                        number: v.number,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: i18n.t(v.member.gender),
                                        mainBlock: mainBlock,
                                        subBlock: subBlock,
                                        zone: zone,
                                        group: group,
                                        issued_date: v.issuedDate,
                                        type: v.type.name,
                                        deposit: parseFloat(v.deposit),
                                        status: i18n.t(status),
                                        withdraw: parseFloat(v.withdraw),
                                        interest: parseFloat(v.interest),
                                        total: (parseFloat(v.deposit) + parseFloat(v.interest)) - parseFloat(v.withdraw),
                                        locale: locale,
                                        numberFormat: 'n' + fo
                                    })
                                })
                                // window.console.log(ds, 'report data')
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
        printPDF(){
            let ds = this.$refs.gridCollectionDS.kendoWidget()
            if(ds.data().length > 0) {
                let Win
                Win = window.open('', '', 'width=1048, height=900')
                let printableContent = '',
                    win = Win,
                    doc = win.document.open();
                let htmlStart =
                    '<!DOCTYPE html>' +
                    '<html>' +
                    '<head>' +
                    '<meta charset="utf-8" />' +
                    '<title></title>' +
                    '<link rel="stylesheet" href="<?php echo base_url(); ?>resources/js/kendoui/styles/kendo.bootstrap.min.css">' +
                    '<link rel="stylesheet" href="<?php echo base_url(); ?>assets/bootstrap.css">' +
                    '<link href="https://fonts.googleapis.com/css?family=Content:400,700" rel="stylesheet" type="text/css">' +
                    '<link href="https://fonts.googleapis.com/css?family=Moul" rel="stylesheet">' +
                    '<link href="https://fonts.googleapis.com/css?family=Preahvihear" rel="stylesheet">' +
                    '<link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&display=swap" rel="stylesheet">' +
                    '<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300" rel="stylesheet">' +
                    '<style type="text/css" media="print">' +
                    '.inv1 .main-color th { color: #fff!important; }' +
                    '@page { size: landscape; margin:0.05cm;' +
                    '} ' +
                    '@media print {' +
                    'html, body {' +
                    '}' +
                    '.main-color {' +
                    '-webkit-print-color-adjust:exact; ' +
                    '} ' +
                    'a:-webkit-any-link {'+
                        'color: -webkit-link;'+
                        'cursor: pointer;'+
                        'text-decoration: none !important;'+
                    '}'+
                    'th {'+
                        'display: table-cell;'+
                        'vertical-align: inherit;'+
                       ' font-weight: bold;'+
                        'text-align: -internal-center;'+
                        'background-color: #ffffff !important;'+
                    '}'+
                    'body {'+
                        'font-family: "Niradei-Regular" !important;'+
                    '}'+
                    'tbody, td, tfoot, th, thead, tr {'+
                        'border-color: inherit !important;'+
                        'border-style: solid !important;'+
                        'border-width: 0 !important;'+
                    '}'+
                    'table {'+
                        'caption-side: bottom !important;'+
                        'border-collapse: collapse !important;'+
                        'border-color: #dee2e6 !important;'+
                    '}'+
                    'th,a {'+
                        'color:black !important;'+
                    '}'+
                    'td {'+
                        'font-size:0.8rem !important;'+
                    '}'+
                    'div.landscape {'+
                    'width: 276mm !important;'+
                    'height: 190mm !important;'+
                    '}'+
                    '* {' +
                    '-webkit-print-color-adjust:exact; ' +
                    '} ' +
                    '}' +
                    '}</style>' +
                    '</head>' +
                    '<body><div class="row-fluid" ><div id="invoicecontent" style="background: none!important;color: #000!important;" class="k-content document-body">';
                let htmlEnd =
                    '</div></div></body>' +
                    '</html>';
                printableContent = $('#gridCollection').html();
                doc.write(htmlStart + printableContent + htmlEnd);
                doc.close();
                setTimeout(function () {
                    win.print()
                    // win.close()
                }, 1000)
            }
        },
        print_(){
            print(this.listsaving, 'invoice2')
        },
        async loadGroup() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.groupMemberGet().then(res => {
                        this.groups = res.data.data
                    })
                }, 300);
            })
        },
    },
    computed: {},
    mounted: async function () {
        await this.loadGroup()
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
