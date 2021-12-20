<template>
    <v-card outlined dense color="white" class="pa-4 no_border" elevation="0">
        <v-row>
            <v-col sm="12" cols="12" class="pt-0">
                <v-card color="white" class="pl-2 no_border" elevation="0">
                    <v-row>
                        <v-col sm="12" cols="12" class="pt-0">
                            <h2 class="mb-1 font_20">{{ $t('member_list') }}</h2>
                        </v-col>
                    </v-row>
                    <v-row class="">
                        <v-col sm="12" cols="12" class="py-0">
                            <v-row class="pb-4">
                                <!-- <v-col sm="2" cols="12" class="py-1">
                                    <v-btn class="btn_search" style="background-color: rgb(237, 241, 245)"  @click="search">
                                        <span class="">{{$t('run_report')}}</span>
                                    </v-btn>
                                </v-col> -->
                                <!-- <v-col sm="2" cols="12" class="py-0 pl-0">
                                    <v-btn icon color="black" class="bg-none ml-2"
                                        @click="print_">
                                        <v-icon class="font_34">fa fa-print</v-icon>
                                    </v-btn>
                                </v-col> -->
                                <v-col sm="12" cols="12" class="py-1">
                                    <v-btn to="members/member" color="primary" class="white--text capitalize float-right">
                                        {{$t('new_member')}}
                                    </v-btn>
                                    <v-dialog v-model="dialogm2" max-width="500px">
                                        <template v-slot:activator="{ on }">
                                            <v-btn outlined class="secondary--text mx-3 capitalize float-right" color="primary" v-on="on" @click="importShow">
                                                {{ $t('import') }}
                                            </v-btn>
                                        </template>
                                        <v-form ref="form" v-model="valid" lazy-validation>
                                            <v-card>
                                                <v-card-title>{{ $t('import_member') }}</v-card-title>
                                                <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                                                <v-divider/>
                                                <v-card-text style="background-color: #EDF1F5; color: #333333;">
                                                    <v-row>
                                                        <v-col sm="12" cols="12" class="pb-0">
                                                            <label class="label">{{ $t('member_type') }}</label>
                                                            <v-select
                                                                class="mt-1"
                                                                :placeholder="$t('select_type')"
                                                                outlined
                                                                v-model="impMemberType"
                                                                :items="memberTypes"
                                                                item-value="value.id"
                                                                item-text="name"
                                                                return-object
                                                                required
                                                            />
                                                            <label class="label">{{ $t('group') }}</label>
                                                            <v-select
                                                                class="mt-1"
                                                                :placeholder="$t('select_group')"
                                                                outlined
                                                                v-model="impGroup"
                                                                :items="groups"
                                                                item-value="value.id"
                                                                item-text="name"
                                                                return-object
                                                                required
                                                            />
                                                            <v-row>
                                                                <v-col sm="6" cols="6" class="pb-0">
                                                                    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                                                                
                                                                </v-col>
                                                                <v-col sm="6" cols="6" class="pb-0">
                                                                    <v-btn outlined class="secondary--text  capitalize float-right" href="/files/member.xlsx" download>
                                                                        <span class="">{{$t('download_file')}}</span>
                                                                    </v-btn>
                                                                </v-col>
                                                            </v-row>
                                                            
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                                <v-divider/>
                                                <v-col sm="12" cols="12" class="py-0">
                                                    <v-card-actions class="pa-4">
                                                        <v-row>
                                                            <v-col sm="6" cols="6" class="py-0 pl-0">
                                                                <v-btn color="black"
                                                                       outlined
                                                                       class=" text-capitalize black--text float-left"
                                                                       @click="dialogm2 = false">{{ $t('cancel') }}
                                                                </v-btn>
                                                            </v-col>
                                                            <v-col sm="6" cols="6" class="py-0 pr-0">
                                                                <v-btn color="secondary"
                                                                       class="px-3  white--text text-capitalize float-right"
                                                                       @click="saveImport">
                                                                    {{ $t('save_close') }}
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-actions>
                                                </v-col>
                                            </v-card>
                                        </v-form>
                                    </v-dialog>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>

                        <v-dialog v-model="showAddress" max-width="800px">
                            <template v-slot:activator="{ }">
                            </template>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-card>
                                    <v-card-title>{{ $t('address') }}</v-card-title>
                                    <v-icon class="btn_close" @click="showAddress = false">close</v-icon>
                                    <v-divider/>
                                    <v-card-text style="height: 430px; background-color: #EDF1F5; color: #333333;">
                                        <template>
                                            <v-simple-table class="attachment_table">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th class="text-uppercase">{{ $t('address_name') }}</th>
                                                        <th class="text-uppercase">{{ $t('address_type') }}</th>
                                                        <th class="text-uppercase">{{ $t('country') }}</th>
                                                        <th class="text-uppercase">{{ $t('address_line_1') }}</th>
                                                        <th class="text-uppercase">{{ $t('address_line_2') }}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="d in addresses" v-bind:key="d.id">
                                                        <td>{{ d.name ? d.name : '' }}</td>
                                                        <td class="">{{ d.type ? d.type : '' }}</td>
                                                        <td class="">{{ d.country ? d.country.country : '' }}</td>
                                                        <td class="">{{ d.line1 ? d.line1 :'' }}</td>
                                                        <td class="">{{ d.line2 ? d.line2 :'' }}</td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                    </v-card-text>
                                    <v-divider/>
                                </v-card>
                            </v-form>
                        </v-dialog>
                    </v-row>
                    <v-row>
                        <v-col sm="12" cols="12" class="py-0">
                            <template>
                                <kendo-datasource
                                    ref="gridCollectionDS"
                                    :transport-read-url="reportListURL"
                                    :groupable="true"
                                    :aggregate="aggregateDefinition"
                                    :schema-data="'data'"
                                    :schema-total="'total'"
                                    :page-size='100'
                                    :server-paging="true"/>
                                <kendo-grid
                                    id="gridCollection" class="grid-function"
                                    :data-source-ref="'gridCollectionDS'"
                                    :editable="false"
                                    :groupable="true"
                                    :column-menu="true"
                                    :noRecords="true"
                                    :pageable="true"
                                    :sortable="true"
                                    :excel-file-name="$t('member_list')+'.xlsx'"
                                    :excel-filterable="true"
                                    :excel-all-pages="true"
                                    :toolbar="['excel']"
                                    :scrollable-virtual="false">
                                    <kendo-grid-column
                                        width="5%"
                                        :title="$t('no.')"
                                        :template="rowNumberTmpl"
                                        :column-menu="false"
                                        :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products px-1' }"
                                        :attributes="{ style: 'text-align: products', class: 'px-1'}"
                                    />
                                    <kendo-grid-column
                                        :attributes="{style: 'text-align: right; '}"
                                        :title="$t('cid')"
                                        :field="'cid'"
                                        :aggregates="['count']"
                                        :footerTemplate="'Total member: #=count#'"
                                        :hidden="true"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'name'"
                                        :title="$t('name')"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                    <kendo-grid-column
                                        :field="'dob'"
                                        :title="$t('dob')"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                    <kendo-grid-column
                                        :field="'gender'"
                                        :title="$t('gender')"
                                        :template="genderTmpl"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'type'"
                                        :title="$t('type')"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'mainBlock'"
                                        :title="$t('main_block')"
                                        :hidden="true"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'subBlock'"
                                        :title="$t('sub_block')"
                                        :hidden="true"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'zone'"
                                        :title="$t('zone')"
                                        :hidden="true"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'group'"
                                        :title="$t('group')"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'idNumber'"
                                        :title="$t('id_card_number')"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'phoneNumber'"
                                        :attributes="{class:'tb_name_td'}"
                                        :title="$t('phone')"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'familyMember'"
                                        :attributes="{class:'tb_name_td'}"
                                        :title="$t('number_of_families')"
                                        :hidden="true"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'spouseName'"
                                        :attributes="{class:'tb_name_td'}"
                                        :title="$t('spouse_name')"
                                        :hidden="true"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :field="'registeredDate'"
                                        :attributes="{class:'tb_name_td'}"
                                        :title="$t('registered_date')"
                                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                    <kendo-grid-column
                                        :title="$t('address')"
                                        :attributes="{class: 'btn-int'}"
                                        :command="{ iconClass: 'k-icon', text: 'View Address', click: viewAddress, class: 'btn-plus' }"
                                        :hidden="true"
                                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                    />
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
    </v-card>

</template>

<script>
import UploadExcelComponent from '@/components/upload_excel/TimeCard.vue';
import { i18n } from '@/i18n';
import { print } from '@/form/form.js'
import kendo from "@progress/kendo-ui"
const memberHandler = require("@/scripts/memberHandler")
import JSZip from "jszip";
window.JSZip = JSZip;
import {dataStore} from '@/observable/store'
const loanHandler = require("@/scripts/loanHandler")
const $ = kendo.jQuery
const apiUrl = require('../../../apiUrl.js')
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
        listsaving: [],
        addresses: [],
        groups: dataStore.pin.group,
        aggregateDefinition : [
            { field: "cid", aggregate: "count"}
        ],
        memberTypes: [],
        impMemberType: {},
        imgFile: [],
        files: [],
        dialogm2: false,
        tableData: [],
        tableHeader: [],
        impGroup: {},
        totalMember: 1000,
        totalFemaleMember: 0,
        activePage: 1,
        pageLimit: 99,
        skip: 0,
        total: 0,
        listReport: [],
        transl: i18n,
        reportListURL: apiUrl.member.memberListReport,
    }),
    components: {
        // 'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
        'upload-excel-component':UploadExcelComponent,
    },
    methods: {
        dataStore: function (url){
            const o = new kendo.data.DataSource({
                transport: {
                    read    : {
                        url: url,
                        type: "GET",
                        dataType: 'json'
                    },
                    parameterMap: function(options, operation) {
                        if(operation === 'read') {
                            return {
                                totalPage: options.totalPage,
                                page: options.page,
                                limit: options.pageSize,
                                filter: JSON.stringify(options.filter),
                                sort: options.sort
                            };
                        } else {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                schema  : {
                    model: {
                        id: 'id'
                    },
                    data: 'data',
                    total: 'total'
                },
                batch: true,
                serverFiltering: true,
                serverSorting: true,
                serverPaging: true,
                page: 1,
                pageSize: 100
            });
            return o
        },
        pageChangeHandler: function(event) {
            this.skip = event.page.skip;
            this.pageLimit = event.page.take;
            window.console.log(event.page)
        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1
            if (isLt1M) {
                return true
            }
            this.$message({
                message: 'Please do not upload files larger than 1m in size.',
                type: 'warning'
            })
            return false
        },
        handleSuccess({ results, header }) {
            results.forEach(element => {
                element.memberType = this.impMemberType
                element.group = this.impGroup
                element.saveOption = 'imported'
            });
            this.tableData = results
            this.tableHeader = header
            window.console.log(this.tableData, this.tableHeader, 'dataaaaa')
        },
        async loadMemberType() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.memberTypeGet().then(res => {
                        this.memberTypes = res.data.data
                    })
                }, 300);
            })
        },
        importShow(){
            //
            this.impMemberType = this.memberTypes[0]
            this.impGroup = this.groups[0]
        },
        saveImport(){
            if(this.tableData.length > 0) {
                let data ={
                    data: this.tableData
                }
                this.showLoading = true
                memberHandler.importMember(data).then(response => {
                    this.showLoading = false
                    if (response.data.statusCode === 201) {
                        this.$refs.form.reset()
                        this.$snotify.success('Successfully')
                    }
                }).catch(e => {
                    this.showLoading = false
                    this.$snotify.error('Something went wrong')
                    this.errors.push(e)
                })
            }
        },
        search() {
            if(this.asOf){
                this.showLoading = true
                this.memberList = []
                this.total = this.totalMember
                let st = this.totalMember - (this.pageLimit * this.activePage)
                let en = (this.pageLimit + this.totalMember) - (this.pageLimit * this.activePage)
                let self = this
                this.listReport = this.dataStore(apiUrl.member.member_center_get);
                this.listReport.query({
                    totalPage: this.totalMember,
                    limit: 100,
                    page: 1,
                    filter: [
                        {
                            field: "sortIndex",
                            operation: "between",
                            start: st,
                            end: en
                        }
                    ],
                    sort: {
                        field: "sortIndex",
                        dir: "desc"
                    }
                }).then(function (){
                    if(self.listReport.data().length > 0){
                        self.showLoading = false
                        let gAR = []
                        $.each(self.groups, function (i,v){
                            gAR.push(v.id)
                        })
                        let data = []
                        // window.console.log(self.listReport.data(), 'list data')
                        $.each(self.listReport.data(), function (i,v){
                            if($.inArray(v.groupId, gAR) != -1) {
                                data.push(v)
                            }
                        })
                        if(data.length > 0){
                            let listsaving = []
                            $.each(data, function (i,v){
                                let gname = i18n.t('others')
                                if(v.gender == 1){
                                    gname = i18n.t('male')
                                }else if(v.gender == 2){
                                    gname = i18n.t('female')
                                }
                                window.console.log(v, 'dd')
                                listsaving.push({
                                    no: i + 1,
                                    cid: v.abbr + v.number,
                                    name: v.fullName,
                                    dob: v.dob,
                                    gender: gname,
                                    type: v.memberTypeName,
                                    mainBlock: v.hasOwnProperty('group') ? v.group.hasOwnProperty('mainBlock') ? v.group.mainBlock.name:'' : '',
                                    subBlock: v.hasOwnProperty('group') ? v.group.hasOwnProperty('subBlock') ? v.group.subBlock.name:'' : '',
                                    zone: v.hasOwnProperty('group') ? v.group.hasOwnProperty('zone') ? v.group.zone.name:'' : '',
                                    group: v.hasOwnProperty('group') ? v.group.name : '',
                                    idNumber: v.idNumber,
                                    phoneNumber: v.phoneNumber,
                                    familyMember: v.familyMember,
                                    spouseName: v.spouseName,
                                    registeredDate: v.registeredDate,
                                    addresses: v.addresses
                                })
                            })
                            self.memberList = listsaving
                        }
                    }
                })
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridCollectionDS.kendoWidget()
            window.console.log(ds.total(), 'total', ds)
            let num = (ds.total() - parseInt(dataItem.sortIndex))
            return num + 1
        },
        genderTmpl(dataItem) {
            let gen = i18n.t('male')
            if(parseInt(dataItem.gender) == 2){
                gen = i18n.t('female')
            }
            return gen
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
            print("dat for form", 'invoice2')
        },
        viewAddress(e){
            e.preventDefault();
            const grid = $("#gridCollection").data("kendoGrid"),
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            this.addresses = []
            if(dataItem.addresses.length > 0){
                this.addresses = dataItem.addresses
                this.showAddress = true
            }else{
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
        async loadCountMember() {
            memberHandler.memberCountGet().then(res => {
                let d = res.data.data[0]
                this.totalMember = d.totalCount
                this.totalFemaleMember = d.totalFemale
            })
        },
    },
    computed: {
    },
    mounted: async function () {
        await this.loadMemberType()
        await this.loadCountMember()
    },
    created: async function () {
        await this.loadGroup()
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