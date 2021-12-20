<template>
    <v-row>
        <v-col sm="12" cols="12" class="pb-0">
            <v-row class="">
                <v-col sm="3" cols="12" class="py-0">
                    <v-select
                        class=""
                        :items="dateSorters"
                        v-model="mDateSorter"
                        @change="onSorterChanges"
                        clearable
                        outlined
                        placeholder="ALL"
                    />
                </v-col>

                <v-col sm="3" cols="12" class="py-0">
                    <app-datepicker
                        :initialDate="startDate"
                        @emitDate="startDate = $event"
                    />
                </v-col>

                <v-col sm="3" cols="12" class="py-0">
                    <app-datepicker
                        :initialDate="endDate"
                        @emitDate="endDate = $event"
                    />
                </v-col>

                <v-col sm="1" cols="1" class="pt-1">
                    <v-btn @click="searchTransaction"
                           class="btn_search"
                           style="background-color: rgb(237, 241, 245)">
                        <v-icon size="18">b-search</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>

        <v-col sm="12" cols="12">
            <template>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true">
                </LoadingMe>
                <kendo-datasource ref="gridDepositTransactionDS"
                                  :data="transactions"
                                  :group="group"
                                  :server-paging="false"/>
                <kendo-grid id="gridDepositTransaction" class="grid-function"
                            :data-source-ref="'gridDepositTransactionDS'"
                            :editable="false"
                            :groupable="true"
                            :column-menu="true"
                            :noRecords="true"
                            :scrollable-virtual="true">
                    <kendo-grid-column
                        :field="'no'"
                        :title="$t('no')"
                        :template="rowNumberTmpl"
                        :width="60"
                        :column-menu="false"
                        :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                        :attributes="{style: 'text-align: center'}"/>
                    <kendo-grid-column
                        :field="'transactionDate'"
                        :title="$t('date')"
                        :width="120"
                        :template="dateFormat"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'name'"
                        :title="$t('name')"
                        :attributes="{class:'tb_name_td'}"
                        :width="120"
                        :template="'<span>#=name#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="'referenceNo'"
                        :title="$t('reference_no')"
                        :width="120"
                        :template="referenceTemplate"
                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                    <kendo-grid-column
                        :field="'saleOrderNo'"
                        :title="$t('so_number')"
                        :width="120"
                        :template="soTemplate"
                        :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                    <kendo-grid-column
                        :field="'amount'"
                        :title="$t('amount')"
                        :width="120"
                        :template="'<span>#=kendo.toString(exchangeAmount, decimalFormat)#</span>'"
                        :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="100"
                        :command="[{  text: 'Edit', click: goEdit }]"
                        :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                </kendo-grid>
            </template>
        </v-col>
    </v-row>
</template>
<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
import kendo from "@progress/kendo-ui";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
const $ = require("jquery")

export default {
    name: "DepositTransaction",
    components: {
        "app-datepicker": DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        mDateSorter: 'Today',
        showLoading: false,
        transactions: [],
        group: {field: 'name'},
    }),
    methods: {
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6

                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case "This Month":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case "This Year":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridDepositTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        dateFormat(dataItem) {
            return kendo.toString(new Date(dataItem.transactionDate), dataItem.dateFormat)
        },
        referenceTemplate(data) {
            let url = `sale_deposit_view/${data.id}`
            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        soTemplate(data) {
            let url = `sale_order/${data.id}`
            let args = {
                text: data.soNumber,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        goEdit(e) {
            e.preventDefault()
            let grid = $("#gridDepositTransaction").data("kendoGrid");
            let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            this.$router.push({
                path: 'sale_deposit' + `/${dataItem.id}`,
                params: {id: dataItem.id},
                query: {type: 'edit'}
            })
        },
        async searchTransaction() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    const startDate = this.startDate
                    const endDate = this.endDate
                    const strFilter = '?start=' + startDate + '&end=' + endDate
                    billingHandler.depositList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.transactions = res.data.data
                        }
                        this.showLoading = false
                    })
                }, 300);
            })
        },
    }
};
</script>
<style scoped>
</style>