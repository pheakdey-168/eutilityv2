<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('member_shares') }}</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>

                    </v-col>

                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)"  @click="search">
                            <span class="">{{$t('run_report')}}</span>
                        </v-btn>
                    </v-col>
                    
                    <!-- <v-col sm="2" cols="12" class="py-0 mt-1">
                        <v-btn icon color="black" class="bg-none  ml-2"
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

                                :excel-file-name="$t('member_shares')+'.xlsx'"
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
                                    :attributes="{style: 'text-align: right; '}"
                                    :title="$t('cid')"
                                    :width="150"
                                    :aggregates="['count']"
                                    :footerTemplate="'Total member: #=count#'"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :title="$t('name')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'phone'"
                                    :title="$t('phone')"
                                    :width="150"
                                    :hidden="true"
                                    :attributes="{style: 'text-align: right; '}"
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
                                    :title="$t('group')"
                                    :width="150"
                                    :hidden="true"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'issued_date'"
                                    :title="$t('issue_date')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'type_of_share'"
                                    :title="$t('type_of_share')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'share_amount'"
                                    :title="$t('share_amount')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(share_amount, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'withdraw'"
                                    :title="$t('share_withdraw')"
                                    :width="200"
                                    :attributes="{style: 'text-align: right; '}"
                                    :template="'<span>#= kendo.toString(withdraw, numberFormat) #</span>'"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'total'"
                                    :title="$t('total')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(total, numberFormat) #</span>'"
                                    :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                    :aggregates="['sum']"
                                    :footerTemplate="'Total share balance: #=sum#'"
                                    :footerAttributes="{ style: 'text-align: right; ' }"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'totalPrice'"
                                    :title="$t('amount')"
                                    :width="200"
                                    :template="'<span>#= kendo.toString(totalPrice, numberFormat) #</span>'"
                                    :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                    :aggregates="['sum']"
                                    :footerTemplate="'Total amount: #= sum #'"
                                    :footerAttributes="{ style: 'text-align: right; ' }"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'locale'"
                                    :title="$t('currency')"
                                    :width="200"
                                    :hidden="true"
                                    :attributes="{style: 'text-align: right; ', class:'tb_name_td'}"
                                    :footerAttributes="{ style: 'text-align: right; ' }"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
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
import {dataStore} from '@/observable/store'
import { i18n } from '@/i18n';
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui"
const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
import { print } from '@/form/member/MemberShare.js'
let numberFormat = 'n0'
const $ = kendo.jQuery

import JSZip from "jszip";
window.JSZip = JSZip;
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        group: {field: 'type'},
        numberFormat: numberFormat,
        shareList: [],
        decimals: [],
        exfield: {
            'No': 'no',
            'cid': 'cid',
            'name': 'name',
            'phone': 'phone',
            'dob': 'dob',
            'gender': 'gender',
            'mainBlock': 'mainBlock',
            'subBlock': 'subBlock',
            'zone': 'zone',
            'group': 'group',
            'issued date': 'issued_date',
            'type_of_share': 'type_of_share',
            'share_amount': 'share_amount',
            'withdraw': 'withdraw',
            'total': 'total',
        },
        MemberShare: [],
        aggregateDefinition : [
            { field: "cid", aggregate: "count"},
            { field: "total", aggregate: "sum" },
            { field: "totalPrice", aggregate: "sum"}
        ],
        locale: '',
        groups: dataStore.pin.group,
        memberList: [],
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
                        memberHandler.listShareReport(data).then(res => {
                            this.showLoading = false
                            // let gAR = []
                            // $.each(this.groups, function (i,v){
                            //     gAR.push(v.id)
                            // })
                            // let data = []
                            // $.each(res.data.data, function (i,v){
                            //     if($.inArray(v.member.groupId, gAR) != -1) {
                            //         data.push(v)
                            //     }
                            // })
                            this.shareList = res.data.data
                            // window.console.log(this.shareList)
                            if(this.shareList.length > 0){
                                let ds = this.$refs.gridCollectionDS.kendoWidget()
                                let self = this
                                ds.data([])
                                $.each(this.shareList, function (i,v){
                                    let locale = v.pricePerShare.currency.code
                                    let dec = self.decimals.filter((obj) => {
                                        return obj.currency.code == locale
                                    })
                                    let fo = 0
                                    if (dec.length > 0) {
                                        fo = dec[0].decimal
                                    }
                                    // let gname = i18n.t('others')
                                    // let gmem = self.memberList.filter((obj) => {return obj.id == v.member.id})
                                    // let g = v.member
                                    // if(gmem.length > 0){
                                    //     g = gmem[0]
                                    // }
                                    // if(g.gender == 1){
                                    //     gname = i18n.t('male')
                                    // }else if(g.gender == 2){
                                    //     gname = i18n.t('female')
                                    // }
                                    let ccid = v.member.numberName.split(' - ')
                                    let g = self.groups.filter((obj) => {return obj.id == v.member.groupId})
                                    // window.console.log(g, 'compare')
                                    let mainBlock = '', subBlock = '', zone = '', group = ''
                                    if(g.length > 0){
                                        mainBlock = g[0].hasOwnProperty('mainBlock') ? g[0].mainBlock.name : ''
                                        subBlock = g[0].hasOwnProperty('subBlock') ? g[0].subBlock.name : ''
                                        zone = g[0].hasOwnProperty('zone') ? g[0].zone.name : ''
                                        group = g[0].name
                                    }
                                    ds.add({
                                        cid: ccid[0],
                                        phone: v.member.phone,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: i18n.t(v.member.gender),
                                        mainBlock: mainBlock,
                                        subBlock: subBlock,
                                        zone: zone,
                                        group: group,
                                        issued_date: v.issuedDate,
                                        share_amount: v.shareAmount,
                                        withdraw: v.withdrawShare,
                                        total: parseInt(v.shareAmount) - parseInt(v.withdrawShare),
                                        totalPrice: (parseInt(v.shareAmount) - parseInt(v.withdrawShare)) * v.sharePrice,
                                        type_of_share: v.pricePerShare ? v.pricePerShare.typeOfShare.name : '',
                                        locale: locale,
                                        numberFormat: 'n' + fo
                                    })
                                    self.MemberShare.push({
                                        cid: ccid[0],
                                        phone: v.member.phone,
                                        name: v.member.name,
                                        dob: v.member.dob,
                                        gender: i18n.t(v.member.gender),
                                        mainBlock: mainBlock,
                                        subBlock: subBlock,
                                        zone: zone,
                                        group: group,
                                        issued_date: v.issuedDate,
                                        share_amount: v.shareAmount,
                                        withdraw: v.withdrawShare,
                                        total: parseInt(v.shareAmount) - parseInt(v.withdrawShare),
                                        totalPrice: (parseInt(v.shareAmount) - parseInt(v.withdrawShare)) * v.sharePrice,
                                        type_of_share: v.pricePerShare ? v.pricePerShare.typeOfShare.name : '',
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
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridCollectionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        print_(){
            print(this.MemberShare)
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
        async loadMember() {
            this.showLoading = true
            if(this.asOf){
                this.showLoading = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.memberList = []
                        memberHandler.center().then(res => {
                            this.showLoading = false
                            let gAR = []
                            $.each(this.groups, function (i,v){
                                gAR.push(v.id)
                            })
                            let data = []
                            $.each(res.data.data, function (i,v){
                                if($.inArray(v.groupId, gAR) != -1) {
                                    data.push(v)
                                }
                            })
                            this.memberList = data
                        })
                    }, 300);
                })
            }
        },
        async loadMemberGroup() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    loanHandler.groupMemberGet().then(res => {
                        this.showLoading = false
                        this.groups = res.data.data
                    })
                }, 300);
            })
        },
    },
    computed: {},
    created: async function(){
        await this.loadMember()
    },
    mounted: async function () {
        await this.loadDecimal()
        await this.loadMemberGroup()
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
