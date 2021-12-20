<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('summary_report') }}</h2>
                    </v-col>
                </v-row>
                <v-row class="pb-2">
                    <v-col sm="2" cols="12" class="pt-0">
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
                                :groupable="true"
                                :server-paging="false"/>
                            <kendo-grid id="gridCollection" class="grid-function"
                                        :data-source-ref="'gridCollectionDS'"
                                        :editable="false"
                                        :groupable="true"
                                        :column-menu="true"
                                        :noRecords="true"

                                        :sortable="true"
                                        :excel-file-name="$t('operational_statistics')+'.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"

                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'mainBlock'"
                                    :title="$t('main_block')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'subBlock'"
                                    :title="$t('sub_block')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'zone'"
                                    :title="$t('zone')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'group'"
                                    :title="$t('group_ac')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'totalMember'"
                                    :title="$t('total_of_member')"
                                    :attributes="{style: 'text-align: right; '}"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'femaleP'"
                                    :title="$t('female_percentage')"
                                    :width="200"
                                    :template="'<span>#= femaleP.toFixed(2) #%</span>'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'dropOutP'"
                                    :title="$t('drop_out_percentage')"
                                    :width="200"
                                    :template="'<span>#= dropOutP.toFixed(2) #%</span>'"
                                    :attributes="{style: 'text-align: right; '}"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

<!--                                <kendo-grid-column-->
<!--                                    :field="'shgsP'"-->
<!--                                    :title="$t('shgs_percentage')"-->
<!--                                    :width="200"-->
<!--                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>-->

                            </kendo-grid>
                            <LoadingMe
                                :isLoading="showLoading"
                                :fullPage="false"
                                type="loading"
                                :myLoading="true"/>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

    </v-row>

</template>

<script>
import {print} from '@/form/form.js'
// import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
// import { i18n } from '@/i18n'
import kendo from "@progress/kendo-ui"
import JSZip from "jszip";
window.JSZip = JSZip;
const memberHandler = require("@/scripts/memberHandler")
import {loanHandler} from "@/scripts/AppHandlers";
import {dataStore} from '@/observable/store'
const $ = kendo.jQuery
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showAddress: false,
        valid: true,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        group: {field: 'type'},
        numberFormat: 'c0',
        l: [],
        decimals: [],
        memberList: [],
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
        addresses: [],
        groups: dataStore.pin.group,
        aggregateDefinition: [
            {field: "cid", aggregate: "count"}
        ],
        lines: [],
    }),
    components: {
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
                        // let data = {
                        //     asOf: this.asOf
                        // }
                        this.memberList = []
                        memberHandler.center().then(res => {
                            this.showLoading = false
                            this.l = res.data.data
                            let lines = []
                            $.each(this.groups, function (i,v){
                                lines.push({
                                    mainBlock: v.hasOwnProperty('mainBlock') ? v.mainBlock.name : '',
                                    subBlock: v.hasOwnProperty('subBlock') ? v.subBlock.name : '',
                                    zone: v.hasOwnProperty('zone') ? v.zone.name : '',
                                    groupId: v.id,
                                    group: v.name,
                                    totalMember: 0,
                                    dropOutP: 0,
                                    familyMember: 0,
                                    femaleP: 0,
                                    shgsP: 0
                                })
                            })
                            if (this.l.length > 0) {
                                // let lines = [], gAr = []
                                // $.each(this.l, function (i, v) {
                                //     if ($.inArray(v.group.id, gAr) == -1) {
                                //         gAr.push(v.group.id)
                                //         lines.push({
                                //             mainBlock: v.hasOwnProperty('group') ? v.group.hasOwnProperty('mainBlock') ? v.group.mainBlock.name : '' : '',
                                //             subBlock: v.hasOwnProperty('group') ? v.group.hasOwnProperty('subBlock') ? v.group.subBlock.name : '' : '',
                                //             zone: v.hasOwnProperty('group') ? v.group.hasOwnProperty('zone') ? v.group.zone.name : '' : '',
                                //             groupId: v.group.id,
                                //             group: v.group.name,
                                //             totalMember: 0,
                                //             dropOutP: 0,
                                //             familyMember: 0,
                                //             femaleP: 0,
                                //             shgsP: 0
                                //         })
                                //     }
                                // })
                                // window.console.log(lines)
                                if (lines.length > 0) {
                                    let self = this
                                    $.each(lines, function (i, v) {
                                        // window.console.log(self.l, v.groupId, 'com')
                                        let g = self.l.filter((obj) => {
                                            return obj.groupId == v.groupId
                                        })
                                        window.console.log(g, 'gr')
                                        if (g.length > 0) {
                                            let atm = 0, famt = 0, feamt = 0
                                            $.each(g, function (j, k) {
                                                if (k.status == 1) {
                                                    atm += 1
                                                }
                                                if (k.hasOwnProperty('gender')) {
                                                    if (k.gender == 2) {
                                                        feamt += 1
                                                    }
                                                }
                                                famt += parseInt(k.familyMember)
                                            })
                                            v.totalMember = g.length
                                            v.dropOutP = ((g.length - atm) / g.length) * 100
                                            v.familyMember = famt
                                            v.femaleP = (feamt / g.length) * 100
                                        }
                                    })
                                }
                                this.lines = lines
                            }
                        })
                    }, 300);
                })
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridCollectionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        printPDF() {
            let ds = this.$refs.gridCollectionDS.kendoWidget()
            if (ds.data().length > 0) {
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
                    'a:-webkit-any-link {' +
                    'color: -webkit-link;' +
                    'cursor: pointer;' +
                    'text-decoration: none !important;' +
                    '}' +
                    'th {' +
                    'display: table-cell;' +
                    'vertical-align: inherit;' +
                    ' font-weight: bold;' +
                    'text-align: -internal-center;' +
                    'background-color: #ffffff !important;' +
                    '}' +
                    'body {' +
                    'font-family: "Niradei-Regular" !important;' +
                    '}' +
                    'tbody, td, tfoot, th, thead, tr {' +
                    'border-color: inherit !important;' +
                    'border-style: solid !important;' +
                    'border-width: 0 !important;' +
                    '}' +
                    'table {' +
                    'caption-side: bottom !important;' +
                    'border-collapse: collapse !important;' +
                    'border-color: #dee2e6 !important;' +
                    '}' +
                    'th,a {' +
                    'color:black !important;' +
                    '}' +
                    'td {' +
                    'font-size:0.8rem !important;' +
                    '}' +
                    'div.landscape {' +
                    'width: 276mm !important;' +
                    'height: 190mm !important;' +
                    '}' +
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
        print_() {
            print("dat for form", 'invoice2')
        },
        viewAddress(e) {
            e.preventDefault();
            const grid = $("#gridCollection").data("kendoGrid"),
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            this.addresses = []
            if (dataItem.addresses.length > 0) {
                this.addresses = dataItem.addresses
                this.showAddress = true
            } else {
                this.$snotify.error('No addresses!')
            }
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
    created: async function(){
        await this.loadGroup()
    },
    mounted: async function () {
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

.k-grid th {
    padding: 8px 12px;
    border-width: 0 0 1px 1px;
    white-space: break-spaces !important;
    text-align: center !important;
}
</style>
