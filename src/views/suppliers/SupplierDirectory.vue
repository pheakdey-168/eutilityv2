<template>
    <v-row class="">
        <!-- <v-col sm="10" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("supplier_directory") }}</h2>
            <p class="mb-0">
                {{ $t("supplier_directory_desc") }}
            </p>
        </v-col> -->
        <v-col sm="12" cols="12" class="pt-4">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-text-field
                                class="mt-1"
                                v-model="search"
                                @keypress.enter="onSearch(search)"
                                @click:clear="onSearch('')"
                                clearable
                                :placeholder="$t('search_directory')"
                                outlined
                            />
                        </v-col>
                        <v-col sm="2" cols="12" class="py-1">
                            <v-btn
                                color="primary"
                                class="white--text capitalize marginTopPhone"
                                @click="onSearch(search)"
                            >
                                {{ $t("search") }}
                            </v-btn>
                        </v-col>
                        <v-col sm="6" cols="12" class="py-1">
                            <v-menu
                                nudge-bottom="4"
                                bottom
                                offset-y
                                class="float-right"
                                origin="bottom top"
                                transition="scroll-y-reverse-transition"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        color="primary"
                                        v-on="on"
                                        link route to="individual_supplier"
                                        class=" white--text  float-right text-capitalize"
                                    >
                                        {{ $t("new_vendor") }}
                                    </v-btn>
                                </template>
                            </v-menu>
                            <v-dialog v-model="dialogm2" max-width="500px">
                                <!-- <template v-slot:activator="{ on }">
                                    <v-btn outlined class="secondary--text mx-3 capitalize float-right" color="primary" v-on="on" @click="importShow">
                                        {{ $t('import') }}
                                    </v-btn>
                                </template> -->
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card>
                                        <v-card-title>{{ $t('import_vendor') }}</v-card-title>
                                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                                        <v-divider/>
                                        <v-card-text style="background-color: #EDF1F5; color: #333333;">
                                            <v-row>
                                                <v-col sm="12" cols="12" class="pb-0">
                                                    <label class="label">{{ $t('customer_type') }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        :placeholder="$t('select_type')"
                                                        outlined
                                                        v-model="impVendorType"
                                                        :items="vendorTypes"
                                                        item-value="value.id"
                                                        item-text="name"
                                                        @change="vendorTypeChange"
                                                        return-object
                                                        required
                                                    />
                                                    <label class="mb-0">{{$t("default_price_level")}}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        v-model="impPriceLevel"
                                                        :items="priceLevels"
                                                        item-value="id"
                                                        item-text="name"
                                                        return-object
                                                        placeholder="Price Level"
                                                        tage="Default Price Level"
                                                        outlined/>
                                                    <label class="label mb-0">{{
                                                            $t("expense_account")
                                                        }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        v-model="impExpenseAcc"
                                                        :items="expenseAccs"
                                                        item-value="id"
                                                        :item-text="(item) => `${item.number} - ${item.name}`"
                                                        return-object
                                                        placeholder="Expense Account"
                                                        outlined=""
                                                    >
                                                    </v-select>
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

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource
                        ref="dataSourceSupply"
                        :data="supplierDirectory"/>
                    <kendo-grid
                        id="gridSDirectory"
                        class="grid-function"
                        :data-source-ref="'dataSourceSupply'"
                        :editable="false"
                        :groupable="true"
                        :noRecords="true"
                        :excel-file-name="'SupplierDirectory.xlsx'"
                        :excel-filterable="true"
                        :excel-all-pages="true"
                        :toolbar="['excel']"
                        :column-menu="true"
                        :scrollable-virtual="true">
                        
                        <kendo-grid-column
                            :field="'number'"
                            :title="$t('number')"
                            :template="'<span>#= abbr #-#= number#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'name'"
                            :title="$t('name')"
                            :template="'<span>#= name#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'priceLevel'"
                            :title="$t('price_level')"
                            :hidden="true"
                            :template="'<span>#= priceLevel#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'creditLimit'"
                            :title="$t('credit_limit')"
                            :hidden="true"
                            :attributes="{style: 'text-align: right; '}"
                            :template="'<span>#=kendo.toString(creditLimit, decimalFormat)#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'phoneNumber'"
                            :title="$t('phone')"
                            :template="'<span>#= phoneNumber#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'email'"
                            :title="$t('email')"
                            :hidden="true"
                            :template="'<span>#= email#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'supplierType'"
                            :title="$t('type')"
                            :template="'<span>#= supplierType#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'sAccountPayable'"
                            :title="$t('account_payable')"
                            :hidden="true"
                            :template="'<span>#= sAccountPayable#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'sPurchaseDeposit'"
                            :title="$t('purchase_deposit')"
                            :hidden="true"
                            :template="'<span>#= sPurchaseDeposit#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="'sPurchaseDiscountAcc'"
                            :hidden="true"
                            :title="$t('settlement_discount')"
                            :template="'<span>#= sPurchaseDiscountAcc#</span>'"
                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                        />
                        <kendo-grid-column
                            :field="''"
                            :title="$t('action')"
                            :visible="true"
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
import kendo from "@progress/kendo-ui";

const supplierHandler = require("@/scripts/supplierHandler");
import JSZip from "jszip";
import priceLevelHandler from "@/scripts/priceLevelHandler";
import supplierTypeHandler from "@/scripts/supplierTypeHandler";
import accountHandler from "@/scripts/handler/accounting/account";

window.JSZip = JSZip;
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
import UploadExcelComponent from '@/components/upload_excel/TimeCard.vue';
import customerHandler from "@/scripts/customerHandler";
export default {
    data: () => ({
        dialogm2: false,
        valid: true,
        showLoading: false,
        start_date: "",
        end_date: "",
        supplierDirectory: "",
        search: "",
        params: {
            search: "",
            type: "sup-",
        },
        group: {field: "supplierType"},
        impVendorType: {},
        vendorTypes: [],
        impPriceLevel: {},
        priceLevels: [],
        impExpenseAcc: {},
        expenseAccs: [],
        loggedUser: {
            id: cookie.creator,
            name: cookie.email
        },
    }),
    props: {},
    methods: {
        importShow(){
            //
            this.impVendorType = this.vendorTypes[0]
            if(this.priceLevels.length > 0){
                this.impPriceLevel = this.priceLevels[0]
            }
            if(this.expenseAccs.length > 0){
                this.impExpenseAcc = this.expenseAccs[0]
            }
            this.vendorTypeChange()
        },
        vendorTypeChange() {
            const c = this.impVendorType
            window.console.log(c, 'cust type')
        },
        saveImport(){
            if(this.tableData.length > 0) {
                let data ={
                    data: this.tableData
                }
                this.showLoading = true
                window.console.log(data, 'here data')
                customerHandler.importVendorCreate(data).then(response => {
                    this.showLoading = false
                    if (response.data.statusCode === 201) {
                        this.$refs.form.reset()
                        this.$snotify.success('Successfully')
                        this.dialogm2 = false
                    }
                }).catch(e => {
                    this.showLoading = false
                    this.$snotify.error('Something went wrong')
                    this.errors.push(e)
                })
            }
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
                const c = this.impVendorType
                element.supplierType = c
                element.type = "Individual"
                element.abbr = c.abbr
                element.taxId = ""
                let a = element.gender
                let g = a.charAt(0).toUpperCase() + a.slice(1);
                element.contactAddress = {
                    gender: g,
                    phoneNumber: element.phoneNumber,
                    email: element.email,
                    dob: element.dob,
                    address: [],
                    latitude: "",
                    longitude: "",
                    website: "",
                    description: "",
                }
                element.accountTax = {
                    apAcc: c.apAcc,
                    purchaseDepositAcc: c.purchaseDepositAcc,
                    purchaseDiscountAcc: c.purchaseDiscountAcc,
                    purchaseTax: c.purchaseTax,
                    expenseAcc: this.impExpenseAcc,
                }
                element.loggedUser = this.loggedUser
                element.priceLevel = this.impPriceLevel
                element.cashPayment = {}
                element.chequePayment = {}
                element.bankDisbursement = {}
                element.saveOption = 'imported'
            });
            this.tableData = results
            this.tableHeader = header
            window.console.log(this.tableData, this.tableHeader, 'dataaaaa')
        },
        dataBound: function () {
            const grid = kendo.jQuery("#gridSDirectory").data("kendoGrid");
            if (grid) {
                if (grid.columns) {
                    for (let i = 0; i < grid.columns.length; i++) {
                        grid.autoFitColumn(i);
                    }
                }
            }
        },
        async loadSupplierDirectory() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    supplierHandler.directory(this.params).then((res) => {
                        this.showLoading = true;
                        window.console.log(res)
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.supplierDirectory = res.data.data;
                        } else {
                            this.showLoading = false;
                        }
                    });
                }, 10);
            });
        },
        onSearch(search) {
            this.params = {
                search: search,
                type: "sup-",
            };
            this.loadSupplierDirectory();
        },
        goEdit(e) {
            e.preventDefault();
            let grid = kendo.jQuery("#gridSDirectory").data("kendoGrid");
            let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
            if (dataItem.type === "Individual") {
                this.$router.push({
                    path: "individual_supplier" + `/${dataItem.id}`,
                    params: {id: dataItem.id},
                    query: {type: "edit"},
                });
            } else {
                this.$router.push({
                    path: "company_supplier" + `/${dataItem.id}`,
                    params: {id: dataItem.id},
                    query: {type: "edit"},
                });
            }
        },
        async loadPriceLevel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = "?nature=purchase";
                    priceLevelHandler.get(strFilter).then((res) => {
                        this.priceLevels = res;
                    });
                }, 10);
            });
        },
        async loadSupplierType() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    supplierTypeHandler.get().then((res) => {
                        this.vendorTypes = res.filter((m) => {
                            return m.nature.name.includes("Individual");
                        });
                    });
                }, 10);
            });
        },
        async loadAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    accountHandler.getAll().then((res) => {
                        this.showLoading = false;
                        this.expenseAccs = res.data
                            .filter(
                                (m) =>
                                    m.account_type.number >= 33 && m.account_type.number <= 43
                            )
                            .map((item) => {
                                return {
                                    id: item.uuid,
                                    uuid: item.uuid,
                                    name: item.name,
                                    local_name: item.local_name,
                                    number: item.number,
                                    is_taxable: item.is_taxable,
                                    banhjiAccCode: item.banhjiAccCode,
                                    group_code: item.group_code,
                                    parent_account: item.parent_account,
                                    type_code: item.type_code,
                                    account_type: item.account_type,
                                };
                            });
                        if (this.expenseAccs.length > 0) {
                            this.impExpenseAcc = this.expenseAccs[0];
                        }
                    });
                }, 10);
            });
        },
    },
    async mounted() {
        await this.loadSupplierDirectory();
        await this.loadPriceLevel()
        await this.loadSupplierType()
        await this.loadAccount()
    },
    computed: {},
    components: {
        LoadingMe: LoadingMe,
        'upload-excel-component':UploadExcelComponent,
    },
    watch: {
        $route: "loadSupplierDirectory",
    },
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

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> thead
> tr
> th {
    font-family: "Niradei-Bold", serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> thead
> tr
> td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:last-child
td {
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
