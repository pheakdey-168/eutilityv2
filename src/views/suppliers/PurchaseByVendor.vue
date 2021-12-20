<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-3 no_border" elevation="0">
                <!-- <h2 class="mb-0 font_20">{{ $t("purchase_by_vendors") }}</h2>
                <p class="mb-0">{{ $t("purchase_by_vendors_desc") }}</p> -->
                <!-- loading -->
                <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true">
                </LoadingMe>
                <v-row class="">
                    <v-col sm="3" cols="12" class="pb-0">
                        <v-select
                            class="mt-1"
                            :items="dateSorters"
                            @change="onSorterChanges"
                            v-model="mDateSorter"
                            clearable
                            outlined
                            placeholder="ALL"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="pb-0 paddingTop">
                        <app-datepicker
                            :initialDate="startDate"
                            @emitDate="startDate = $event"
                        />
                    </v-col>

                    <v-col sm="3" cols="12" class="pb-0 paddingTop">
                        <app-datepicker
                            :initialDate="endDate"
                            @emitDate="endDate = $event"
                        />
                    </v-col>

                    <v-col sm="3" cols="1" class="pb-0 pt-4 paddingTop">
                        <v-btn color="primary white--text" @click="searchTransaction">
                            <i class="b-search" style="font-size: 18px; color:#fff"/>
                        </v-btn>
                        <v-btn color="primary" class="capitalize float-right white--text" to="credit_purchase">{{
                                $t("new_purchase")
                            }}
                        </v-btn>
                    </v-col>
                    <!-- <v-col sm="2" cols="2" class="pb-0">
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

                    </v-col> -->
                </v-row>
                <v-row class="mt-0">
                    <v-col sm="12" cols="12" class="py-0">
                        <kendo-datasource
                            ref="gridTransactionDS"
                            :group="group"
                            :data="transactions"
                        />
                        <kendo-grid
                            id="gridTransaction"
                            class="grid-function"
                            :data-source-ref="'gridTransactionDS'"
                            :sortable="false"
                            :groupable="true"
                            :filterable="false"
                            :column-menu="true"
                            :editable="false"
                            :noRecords="true"
                            :scrollable-virtual="true"
                        >
                            <kendo-grid-column
                                :field="'name'"
                                :attributes="{ class: 'tb_name_td' }"
                                :title="$t('name')"
                                :template="'<span>#=name#</span>'"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'transactionDate'"
                                :title="$t('date')"
                                :template="'<span>#=transactionDate#</span>'"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'referenceNo'"
                                :title="$t('reference')"
                                :template="referenceTemplate"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'exchangeAmount'"
                                :title="$t('amount')"
                                :template="
                  '<span>#= kendo.toString(exchangeAmount, decimalFormat)#</span>'
                "
                                :attributes="{ style: 'text-align: right' }"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                            <kendo-grid-column
                                :field="'status'"
                                :title="$t('status')"
                                :template="status"
                                :headerAttributes="{
                  style: 'background-color: #EDF1F5',
                }"
                            />
                        </kendo-grid>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import InvoiceModel from "@/scripts/invoice/model/Invoice";

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const purchaseModel = new InvoiceModel({});
const TRANSACTION_TYPE = "Purchase";
import {dataStore} from '@/observable/store'
const loanHandler = require("@/scripts/loanHandler")
export default {
    name: "PurchaseAnalysis",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ["Today", "This Week", "This Month", "This Year"],
        mDateSorter: "Today",
        journal_entries: [],
        transactions: [],
        group: {field: "name"},
        purchase: purchaseModel,
        showLoading: false,
        isLoaded: false,
        segment: {}
    }),
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        onSorterChanges(val) {
            let today = new Date();
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, "yyyy-MM-dd");
                    this.endDate = kendo.toString(today, "yyyy-MM-dd");

                    break;
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6;

                    this.startDate = kendo.toString(
                        new Date(today.setDate(first)),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.setDate(last)),
                        "yyyy-MM-dd"
                    );

                    break;
                case "This Month":
                    this.startDate = kendo.toString(
                        new Date(today.getFullYear(), today.getMonth(), 1),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.getFullYear(), today.getMonth(), 31),
                        "yyyy-MM-dd"
                    );

                    break;
                case "This Year":
                    this.startDate = kendo.toString(
                        new Date(today.getFullYear(), 0, 1),
                        "yyyy-MM-dd"
                    );
                    this.endDate = kendo.toString(
                        new Date(today.getFullYear(), 11, 31),
                        "yyyy-MM-dd"
                    );

                    break;
                default:
                    this.startDate = "";
                    this.endDate = "";
            }
        },
        referenceTemplate(data) {
            let url = "";
            if (data.transactionType === "Expenses") {
                url = `expenses/view/${data.id.replace("txn-", "")}`;
            } else {
                url = `credit_purchase_view/${data.id}`;
            }

            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            };
            return {
                template: LinkTemplate,
                templateArgs: args,
            };
        },
        async searchTransaction() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    const startDate = this.startDate;
                    const endDate = this.endDate;
                    let strFilter = "";
                    strFilter =
                        "?start=" +
                        startDate +
                        "&end=" +
                        endDate +
                        "&type=" +
                        TRANSACTION_TYPE;
                    billingHandler.listPurchase(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.transactions = res.data.data.filter((obj) => {return obj.segmentId == this.segment.id});
                            // const result = res.data.result
                            // this.totalRevenue = kendo.toString(result.Revenue, result.decimalFormat)
                            // this.totalSaleLead = kendo.toString(result.SaleLead, result.decimalFormat)
                            // this.totalSaleOrder = kendo.toString(result.SaleOrder, result.decimalFormat)
                            // this.totalSaleQuote = kendo.toString(result.SaleQuote, result.decimalFormat)
                        }
                        this.showLoading = false;
                    });
                }, 300);
            });
        },
        status(dataItem) {
            let status = "";
            switch (dataItem.status) {
                case 1:
                    status = "Open";
                    break;
                case 2:
                    status = "Partially Paid";
                    break;
                case 3:
                    status = "Paid";
                    break;
                case 4:
                    status = "Void";
                    break;
            }
            return status;
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segment = {}
                    loanHandler.businessSettingGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let s = res.data.data.filter((obj) => {
                                return obj.type == dataStore.businessType
                            })
                            if (s.length > 0) {
                                this.segment = s[0].segment
                            } else {
                                this.$snotify.error('Please select segment on setting page')
                                this.cancel()
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
    },
    mounted() {
    },
    computed: {},
    created: async function(){
        await this.loadSegment()
    },
};
</script>
<style scoped>
@media (max-width: 576px) {
    .paddingTop {
        padding-top: 0 !important;
    }
}

.b-search:before {
    color: #fff !important;
}
</style>
