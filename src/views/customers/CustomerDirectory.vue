<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-4 pb-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-text-field
                                class="mt-1"
                                @keypress.enter="onSearch(search)"
                                clearable
                                @click:clear="onSearch('')"
                                v-model="search"
                                :placeholder="$t('search_directory')"
                                outlined
                            />
                        </v-col>
                        <v-col sm="8" cols="12" class="pt-1">
                            <v-btn color="primary white--text" @click="onSearch(search)">
                                <i
                                    class="b-search"
                                    style="font-size: 18px; color:#fff !important;"
                                />
                            </v-btn>

                            <v-btn
                                color="primary"
                                class="float-right white--text capitalize ml-2"
                                to="individual_customer"
                            >{{ $t("add_new_customer") }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource
                        ref="dataSourceDirection"
                        :data="customersDirectory"
                    />
                    <kendo-grid
                        id="gridCDirectory"
                        class="grid-function"
                        :data-source-ref="'dataSourceDirection'"
                        :editable="false"
                        :groupable="true"
                        :noRecords="true"
                        :excel-file-name="'CustomerDirectory.xlsx'"
                        :excel-filterable="true"
                        :excel-all-pages="true"
                        :toolbar="['excel']"
                        :column-menu="true"
                        :scrollable-virtual="true">
                        <kendo-grid-column
                            :field="'number'"
                            :width="120"
                            :title="$t('number')"
                            :template="'<span>#= abbr #-#= number#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'name'"
                            :title="$t('name')"
                            :width="200"
                            :template="'<span>#= name#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'priceLevel'"
                            :title="$t('price_level')"
                            :width="120"
                            :hidden="true"
                            :template="'<span>#= priceLevel#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'creditLimit'"
                            :title="$t('credit_limit')"
                            :width="120"
                            :hidden="true"
                            :attributes="{style: 'text-align: right; '}"
                            :template="'<span>#=kendo.toString(creditLimit, decimalFormat)#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'customerType'"
                            :title="$t('type')"
                            :width="200"
                            :template="'<span>#= customerType#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'group'"
                            :title="$t('group')"
                            :hidden="true"
                            :width="120"
                            :template=" '<span>#= group #</span>' "
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                        <kendo-grid-column
                            :field="'saleDepositAcc'"
                            :hidden="true"
                            :title="$t('sale_deposit')"
                            :width="300"
                            :template="'<span>#= saleDepositAcc#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'receivableAcc'"
                            :hidden="true"
                            :width="300"
                            :title="$t('account_receivable')"
                            :template="'<span>#= receivableAcc#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'saleDiscountAcc'"
                            :hidden="true"
                            :width="300"
                            :title="$t('settlement_discount')"
                            :template="'<span>#= saleDiscountAcc#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'phoneNumber'"
                            :title="$t('phone')"
                            :width="120"
                            :template="'<span>#= phoneNumber#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'email'"
                            :title="$t('email')"
                            :width="120"
                            :hidden="true"
                            :template="'<span>#= email#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="''"
                            :title="$t('action')"
                            :visible="true"
                            :width="120"
                            :command="[ { iconClass: 'k-icon k-i-edit', text: ' ', click: goEdit }, ]"
                            :headerAttributes="{ style: 'text-align: right; background-color: #EDF1F5',}"
                            :attributes="{ style: 'text-align: right' }"/>
                    </kendo-grid>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                        type="loading"
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui"
// import downloadexcel from "vue-json-excel";

const customerHandler = require("@/scripts/customerHandler")
export default {
    data: () => ({
        showLoading: false,
        start_date: "",
        end_date: "",
        search: "",
        params: {
            search: "",
            type: "cus-"
        },
        customersDirectory: [],

        group: {field: 'customerType.name'},

        exfield: {
            'Number': 'number',
            'Name': 'name',
            'Phone': 'contactAddress.phoneNumber',
            'Email': 'email',
            'Payment Option': 'paymentOption.name',
            'Credit Limit': 'paymentBilling.creditLimit',
            'Type': 'customerType.name',
            'Group': 'paymentBilling.customerGroup.name',
            'Price Level': 'priceLevel.name',
            'Sale Deposit': 'saleDepositAcc.name',
            'Account Receivable': 'receivableAcc.name',
            'Settlement Discount': 'saleDiscountAcc.name'
        },
    }),
    props: {},
    methods: {
        async loadCustomerCenter() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.customers = []
                    this.showLoading = true
                    customerHandler.directory(this.params).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.customersDirectory = res.data.data
                        }
                    })
                }, 300)
            })
        },
        onSearch(search) {
            window.console.log(this.search, 'search')
            this.params = {
                search: search,
                type: 'cus-'
            }
            this.loadCustomerCenter()
            // if(this.search){
            //
            // }
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridCDirectory").data("kendoGrid");
            let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
            window.console.log(dataItem, 'dataItem1245')
            if (dataItem.type === 'Company') {
                this.$router.push({
                    path: 'company_customer' + `/${dataItem.id}`,
                    params: {id: dataItem.id},
                    query: {type: 'edit'}
                })
            } else {
                this.$router.push({
                    path: 'individual_customer' + `/${dataItem.id}`,
                    params: {id: dataItem.id},
                    query: {type: 'edit'}
                })
            }
        }
    },
    async mounted() {
        await this.loadCustomerCenter()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        // downloadexcel: downloadexcel
    },
    watch: {
        '$route': 'loadCustomerCenter'
    }
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
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
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {
    .marginTopPhone {
        margin-top: -10px;
    }

}
</style>
