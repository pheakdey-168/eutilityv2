<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border" elevation="0">
                <v-row>
                    <v-col sm="8"  class="py-0">
                        <h2 class="mb-0 font_20">{{$t('loan_payments')}}</h2>
                    </v-col>
                    <!-- <v-col sm="4" class="py-0">
                        <v-select outlined/>
                    </v-col> -->
                </v-row>
                <LoadingMe
                        :isLoading="compeletLoading"
                        :fullPage="false"
                        :myLoading="true">

                </LoadingMe>
                <v-row class="">
                    <v-col sm="8" cols="12" class="py-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                    </v-col>
                    <v-col sm="1" cols="12" class="py-1">
                        <v-btn color="primary white--text"
                            @click="search"
                        >
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                    <v-col sm="3" cols="12" class="py-1" >
                        <v-btn
                                icon
                                color="black"
                                class="bg-none float-right ml-2"
                        >
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>
                        <v-btn
                                icon
                                color="black"
                                class="bg-none float-right ml-2"
                        >
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>

                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <kendo-datasource
                                    ref="gridAddressDS"
                                    :data="reportData"/>
                                <kendo-grid
                                    id="gridAddress"
                                    class="grid-function"
                                    :data-source-ref="'gridAddressDS'"
                                    :editable="false"
                                    :scrollable-virtual="true">
                                    <kendo-grid-column
                                        :field="'no'"
                                        :title="$t('no')"
                                        :template="rowNumberTmpl"
                                        :column-menu="false"
                                        :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-center'}"
                                        :attributes="{ style: 'text-align: center' }"
                                        width="5%"
                                    />
                                    <kendo-grid-column
                                        :field="'date'"
                                        :title="$t('date')"
                                        :attributes="{ class: 'tb_name_td' }"
                                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                    />
                                    <kendo-grid-column
                                        :field="'total'"
                                        :title="$t('repayment')"
                                        :template="repaymentTmpl"
                                        :attributes="{style: 'text-align: right; '}"
                                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                    />
                                    <kendo-grid-column
                                        :field="'number'"
                                        :title="$t('loan_account_no')"
                                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                    />
                                    <kendo-grid-column
                                        :field="'name'"
                                        :title="$t('name')"
                                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                    />
                                    <kendo-grid-column
                                        :field="'principal'"
                                        :title="$t('principal_amount')"
                                        :template="principalTmpl"
                                        :attributes="{style: 'text-align: right; '}"
                                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                    />
                                    <kendo-grid-column
                                        :field="'interest'"
                                        :template="interestTmpl"
                                        :attributes="{style: 'text-align: right; '}"
                                        :title="$t('interest_amount')"
                                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                    />
                                </kendo-grid>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import LoadingMe from '@/components/Loading'
    const loanHandler = require("@/scripts/financing/handler/loanHandler")
    import kendo from '@progress/kendo-ui'
    import saleFormContentHandler from "@/scripts/saleFormContentHandler";
    const $ = kendo.jQuery

    export default {
        name: "",
        components: {
            LoadingMe,
            // 'app-datepicker': DatePickerComponent,
            'app-searchdate' : ()=> import('@/components/custom_templates/SearchDate'),
            // BankConnection,
        },
        data: () => ({
            startDate: "",
            endDate: "",
            dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
            journal_entries: [],
            // LoadingMe
            compeletLoading: false,
            isLoaded: false,
            reportData: [],
            saleFormContent: {}
        }),
        methods: {
            rowNumberTmpl(dataItem) {
                let ds = this.$refs.gridAddressDS.kendoWidget(),
                    index = ds.indexOf(dataItem);
                return index + 1;
            },
            repaymentTmpl(dataItem) {
                return this.numberFormat(dataItem.total)
            },
            principalTmpl(dataItem) {
                return this.numberFormat(dataItem.principal)
            },
            interestTmpl(dataItem) {
                return this.numberFormat(dataItem.interest)
            },
            numberFormat(value) {
                // window.console.log(this.saleFormContent.decimal,'nimol')
                return kendo.toString(value, `n${this.saleFormContent.decimal}`);
                // return value
            },
            async loadSaleFormContent() {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        saleFormContentHandler.list().then((res) => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data;
                                if (data.length > 0) {
                                    this.saleFormContent = data[0]
                                }
                            }
                        });
                    }, 10);
                });
            },
            search(){
                this.reportData = []
                this.showLoading = true
                const startDate = this.startDate
                const endDate = this.endDate
                let strFilter =  '?start=' + startDate + '&end=' + endDate
                loanHandler.loanRepaymentReport(strFilter).then(res => {
                    if(res.data.data.length > 0){
                        let d = res.data.data
                        let ar = []
                        $.each(d, function (i,v){
                            ar.push(v)
                        })
                        this.reportData = ar
                        window.console.log(this.reportData, ar, 'report data')
                    }
                    this.showLoading = false
                })
            }
        },
        mounted() {
            this.loadSaleFormContent()
        },
        computed: {
        },
    };
</script>
<style scoped>
</style>