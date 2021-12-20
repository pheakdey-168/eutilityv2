<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-row>
                            <v-col
                                class="bigSide py-0"
                                sm="12"
                                cols="12"
                                style="transition: .3s ease-in;"
                                :class="{ hide_big_bar_class: isHideBar }">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">
                                            {{ $t("cash_payment") }}
                                        </h2>
                                        <v-icon
                                            v-if="!isHideBar"
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="7" cols="12" class="pb-0">
                                                <label class="label">{{ $t("vendor_name") }}</label>
                                                <div class="pt-0 mb-4 kendo_dropdown_custom d-flex mt-0">
                                                    <dropdownlist
                                                        :data-items="suppliers"
                                                        @change="onCustomerChanged"
                                                        :value="mSupplier"
                                                        :disabled="enabled"
                                                        :data-item-key="'id'"
                                                        :text-field="'name'"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onCustomerFilterChanged"
                                                    >
                                                    </dropdownlist>
                                                    <v-btn
                                                        color="primary mt-1 ml-2 white--text"
                                                        @click="searchPurchaseOrderExpense"
                                                        :disabled="enabled"
                                                    >
                                                        <i
                                                            class="b-search"
                                                            style="font-size: 18px; color:#fff"
                                                        />
                                                    </v-btn>

                                                </div>

                                                <!-- <label class="label">{{ $t("type") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="cashPayment.transactionType"
                                                    :items="transactionTypes"
                                                    item-value="id"
                                                    item-text="name"
                                                    return-object
                                                    @change="onTypeChanged"
                                                    :placeholder="$t('type')"
                                                    outlined
                                                >
                                                </v-select> -->
                                                <label class="label">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="cashPayment.transactionDate"
                                                    @onChanged="onTransactionDateChanged"
                                                    @emitDate="cashPayment.transactionDate = $event"
                                                />
                                            </v-col>
                                            <v-col sm="5" cosl="12">
                                                <!-- <label class="label">{{ $t("payment_request") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="requestPaymentList"
                                                    @change="onPaymentRequestChange"
                                                    item-value="id"
                                                    item-text="referenceNo"
                                                    v-model="cashPayment.requestPayment"
                                                    :placeholder="$t('payment_request')"
                                                    return-object
                                                    clearable
                                                    outlined
                                                /> -->
                                                <label class="label">{{ $t("name") }}</label>
                                                <v-text-field
                                                    class="mt-1"
                                                    v-model="name"
                                                    readonly="readonly"
                                                    outlined
                                                />
                                                <label class="label mb-0">{{ $t("number") }}</label>
                                                <div class="d-flex mt-1">

                                                    <div class="code_text flex-1 text-bold">
                                                        {{ cashPayment.transactionType.abbr }}
                                                    </div>
                                                    <v-text-field
                                                        class=" custom-border  flex-2"
                                                        v-model="cashPayment.number"
                                                        outlined
                                                        disabled
                                                        :rules="[(v) => !!v || 'Number is required']"
                                                        required
                                                    />
                                                    <v-icon
                                                        color="black"
                                                        size="30"
                                                        style=" height: 40px;"
                                                        class="border_qrcode ml-2"
                                                        @click="generateNumber"
                                                    >mdi-qrcode
                                                    </v-icon>

                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <LoadingMe
                                                :isLoading="showLoading"
                                                :fullPage="false"
                                                :myLoading="true"
                                            />
                                            <kendo-datasource
                                                ref="itemLineDS"
                                                :change="dataSourceChanged"
                                                :schema="schemaDefinition"
                                                :data="itemLines"/>
                                            <kendo-grid
                                                id="gridCashPayment"
                                                ref="gridCashPayment"
                                                class="grid-function"
                                                :data-source-ref="'itemLineDS'"
                                                :sortable="false"
                                                :groupable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="true"
                                                :change="onGridCashPayment"
                                                v-on:databound="dataBound"
                                                :noRecords="true">
                                                <!-- <kendo-grid-column
                                                                          :field="'check'"
                                                                          :title="''"
                                                                          :headerTemplate="headerTemplate"
                                                                          :template="checkTemplate"
                                                                          :width="60"
                                                                          :column-menu="false"
                                                                          :editable="
                                                                            () => {
                                                                              return false;
                                                                            }
                                                                          "
                                                                          :locked="true"
                                                                          :headerAttributes="{
                                                                            style: 'background-color: #EDF1F5;',
                                                                            class: 'text-center',
                                                                          }"
                                                                          :attributes="{ style: 'text-align: center' }"
                                                                        /> -->
                                                <kendo-grid-column
                                                    :locked="true"
                                                    :selectable="true"
                                                    :selected="true"
                                                    :width="40"/>
                                                <kendo-grid-column
                                                    :field="'billNumber'"
                                                    :title="$t('bill_number')"
                                                    :width="180"
                                                    :editable=" () => { return false;}"
                                                    :template="billNumberTmp"
                                                    :locked="true"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5',}"
                                                />
                                                <kendo-grid-column
                                                    :field="'referenceNo'"
                                                    :title="$t('transaction_num')"
                                                    :width="210"
                                                    :hidden="false"
                                                    :locked="true"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="referenceNoTmp"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'dueDate'"
                                                    :title="$t('due_date')"
                                                    :width="150"
                                                    :lockable="false"
                                                    :template="formatDate"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :hidden="true"
                                                    :field="'txnNote'"
                                                    :title="$t('note')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'paymentOption'"
                                                    :title="$t('payment_option')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :template="PMTTemplate"
                                                    :editor="PaymentOptionEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                                <kendo-grid-column
                                                    :hidden="true"
                                                    :field="'currencyCode'"
                                                    :title="$t('currency')"
                                                    :width="150"
                                                    :lockable="false"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="currency"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :hidden="true"
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="150"
                                                    :lockable="false"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="amount"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />

                                                <kendo-grid-column
                                                    :hidden="true"
                                                    :field="'discount'"
                                                    :title="$t('discount')"
                                                    :editor="discountEditor"
                                                    :template="discount"
                                                    :width="150"
                                                    :lockable="false"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />

                                                <kendo-grid-column
                                                    :field="'amountTobePaid'"
                                                    :title="$t('amount_to_be_paid')"
                                                    :width="210"
                                                    :lockable="false"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="amountTobePaid"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />

                                                <kendo-grid-column
                                                    :field="'paidAmount'"
                                                    :title="$t('paid_amount')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :editor="paidAmountEditor"
                                                    :template="paidAmountTmp"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'overDue'"
                                                    :title="$t('over_due')"
                                                    :width="150"
                                                    :lockable="false"
                                                    :hidden="true"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="overDue"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />

                                                <kendo-grid-column
                                                    :field="'paymentTerm'"
                                                    :title="$t('payment_term')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :hidden="true"
                                                    :template="settlementDiscount"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />

                                                <kendo-grid-column
                                                    :field="'bankReferenceNo'"
                                                    :title="$t('bank_reference_no')"
                                                    :width="180"
                                                    :lockable="false"
                                                    :hidden="true"
                                                    :template="bankReferenceNo"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'status'"
                                                    :title="$t('status')"
                                                    :width="100"
                                                    :lockable="false"
                                                    :template="status"
                                                    :hidden="true"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="6" cols="12" class="">
                                                    <v-card class="no-boxshadow pa-3" color="grayBg">
                                                        <v-row>
                                                            <v-col class="py-0" sm="6" cols="6">
                                                                <label>{{ $t("message_on_receipt") }}</label>
                                                                <v-textarea
                                                                    class="mt-1"
                                                                    outlined
                                                                    v-model="cashPayment.transactionNote"
                                                                    no-resize
                                                                    height="70px"
                                                                    rows="3"
                                                                    placeholder="This will appear on the invoice"
                                                                />
                                                            </v-col>
                                                            <v-col class="py-0" sm="6" cols="6">
                                                                <label>{{ $t("message_for_journal") }}</label>
                                                                <v-textarea
                                                                    class="mt-1"
                                                                    outlined
                                                                    v-model="cashPayment.journalNote"
                                                                    no-resize
                                                                    height="70px"
                                                                    rows="3"
                                                                    placeholder="This will appear on the invoice"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                    </v-card>
                                                    <!--                                                    <template>-->
                                                    <!--                                                        <v-file-input class="mt-0 pt-0 " sm="3" cols="6"-->
                                                    <!--                                                                      v-model="files"-->
                                                    <!--                                                                      :placeholder="$t('attachment')"-->
                                                    <!--                                                                      multiple-->
                                                    <!--                                                                      prepend-icon="mdi-paperclip">-->
                                                    <!--                                                            <template v-slot:selection="{ text }">-->
                                                    <!--                                                                <v-chip-->
                                                    <!--                                                                    small-->
                                                    <!--                                                                    label-->
                                                    <!--                                                                    color="primary">-->
                                                    <!--                                                                    {{ text }}-->
                                                    <!--                                                                </v-chip>-->
                                                    <!--                                                            </template>-->
                                                    <!--                                                        </v-file-input>-->
                                                    <!--                                                    </template>-->
                                                </v-col>
                                                <v-col sm="6" cols="12">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t("discount") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-left primary--text text-bold">
                                                                    {{ numberFormat(cashPayment.discount) }}
                                                                </td>
                                                            </tr>
                                                            <!--                                                            <tr>-->
                                                            <!--                                                                <td class="text-left text-uppercase">{{ $t('total') }}-->
                                                            <!--                                                                </td>-->
                                                            <!--                                                                <td class="text-center">:</td>-->
                                                            <!--                                                                <td class="text-left primary--text text-bold">-->
                                                            <!--                                                                    {{ numberFormat(cashReceipt.total) }}-->
                                                            <!--                                                                </td>-->
                                                            <!--                                                            </tr>-->
                                                            <tr>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t("exchange_amount") }} -
                                                                    {{ baseCurrencyCode }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-left primary--text text-bold">
                                                                    {{
                                                                        numberFormat(cashPayment.exchangeAmount)
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr hidden>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t("dr") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-left primary--text text-bold">
                                                                    {{ numberFormat(dr) }}
                                                                </td>
                                                            </tr>
                                                            <tr hidden>
                                                                <td class="text-left text-uppercase">
                                                                    {{ $t("cr") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-left primary--text text-bold">
                                                                    {{ numberFormat(cr) }}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer">
                                        <!-- <v-menu>
                                                              <template v-slot:activator="{ on }">
                                                                <v-btn color="black" outlined
                                                                       class="mr-2 text-capitalize  black--text float-left"
                                                                       v-on="on">
                                                                  {{ $t('select_template') }}
                                                                  <v-icon size="" class="ma-1">expand_more</v-icon>
                                                                </v-btn>
                                                              </template>
                                                              <v-list>
                                                                <v-list-item v-for="(item, index) in templates" :key="index">
                                                                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                                </v-list-item>
                                                              </v-list>
                                                            </v-menu> -->
                                        <v-btn
                                            color="primary"
                                            outlined
                                            class="text-capitalize  black--text float-left"
                                            @click="cancel"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <!--                    <v-menu>-->
                                        <!--                      <template v-slot:activator="{ on }">-->
                                        <!--                        <v-btn-->
                                        <!--                            class="ml-2 float-right text-capitalize  black&#45;&#45;text"-->
                                        <!--                            v-on="on"-->
                                        <!--                        >-->
                                        <!--                          {{ $t("save_option") }}-->
                                        <!--                          <v-icon size="" class="ma-1">expand_more</v-icon>-->
                                        <!--                        </v-btn>-->
                                        <!--                      </template>-->
                                        <!--                      <v-list rounded>-->
                                        <!--                        <v-list-item-group>-->
                                        <!--                          <v-list-item @click="onSaveClose(true)">-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title-->
                                        <!--                              >{{ $t("save_print") }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item>-->
                                        <!--                          &lt;!&ndash; <v-list-item>-->
                                        <!--                            <v-list-item-content>-->
                                        <!--                              <v-list-item-title>{{ $t('save_draft') }}-->
                                        <!--                              </v-list-item-title>-->
                                        <!--                            </v-list-item-content>-->
                                        <!--                          </v-list-item> &ndash;&gt;-->
                                        <!--                        </v-list-item-group>-->
                                        <!--                      </v-list>-->
                                        <!--                    </v-menu>-->
                                        <v-btn
                                            color="primary"
                                            v-if="!isView"
                                            class="float-right white--text text-capitalize "
                                            @click="onSaveClose(false)">
                                            {{ $t("save_close") }}
                                        </v-btn>
                                        <v-btn v-if="!isView" color="secondary"
											style="margin-right: 10px !important"
											class="white--text float-right text-capitalize"
											@click="onSaveClose(true)" :hidden="hiddenButton">{{ $t("save_new") }}
										</v-btn>
                                        <v-btn v-if="isView" color="primary"
											style="margin-right: 10px !important"
                                            @click="_print"
											class="white--text float-right text-capitalize"
											>{{ $t("print") }}
										</v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import {i18n} from "@/i18n";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import CashPaymentModel from "@/scripts/cash-payment/model/CashPayment";
import ItemLineModel from "@/scripts/cash-payment/model/ItemLine";
import kendo from "@progress/kendo-ui";
import {getPrint} from "@/form/paymentVoucher";
import PaymentOptionEditor from "@/scripts/kendo_editor/PaymentOptionEditor";


const prefixHandler = require("@/scripts/prefixHandler");
const purchaseFormContentHandler = require("@/scripts/purchaseFormContentHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const supplierHandler = require("@/scripts/supplierHandler");

const $ = kendo.jQuery
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const paymentOptionHandler = require("@/scripts/paymentOptionHandler");
const settingHandler = require("@/scripts/settingsHandler");

const cashPaymentModel = new CashPaymentModel({});
const itemLineModel = new ItemLineModel({});

const keyField = "id";
const textField = "numberName";
const defaultItem = {[textField]: "Select vendor...", [keyField]: null};
const emptyItem = {[textField]: "loading ..."};
const OPTION_TYPE = "Supplier";
const strFilter = "?optionType=" + OPTION_TYPE;
const TXN_TYPE = "cash payment";
const TRANSACTION_TYPE = "Cash Payment";
const loanHandler = require("@/scripts/loanHandler")
import {dataStore} from '@/observable/store'
export default {
    name: "CashPayment",
    props: ["id"],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        dropdownlist: DropDownList,
    },
    data: () => ({
        PaymentOptionEditor: PaymentOptionEditor,
        showLoading: false,
        alert: false,
        files: [],
        errors: [],
        valid: true,
        loggedUser: {
            id: cookie.creator,
            name: cookie.email,
        },
        itemLines: [],
        templates: [
            {title: "Draft"},
            {title: "Open"},
            {title: "Partially Closed"},
            {title: "Closed"},
        ],
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        typeAs: ['Cash', 'Bank'],
        paymentOptions: ["Vendor"],
        mPaymentOption: "Vendor",
        paymentMethod: ["Cash", "Cheque"],
        transactionDate: new Date().toISOString().substr(0, 10),
        cashPayment: cashPaymentModel,
        itemLine: itemLineModel,
        purchaseFormContent: {},
        search: "",
        transactionTypes: [],
        suppliers: [],
        mSupplier: {},
        defaultItem: defaultItem,
        supBaseUrl: supplierHandler.search(),
        filter: "",
        name: "",
        referenceNo: "",
        oldTotal: 0,
        dateFormat: itemLineModel.dateFormat,
        group: {field: "supplier.name"},
        banks: [],
        txnList: [],
        currencyCode: "",
        transactionRate: 1,
        schemaDefinition: {
            model: {id: "lineId"},
        },
        baseCurrency: {},
        baseCurrencyCode: "",
        jRaw: [],
        gainLossAcc: {},
        otherRevenueAcc: {},
        gainOrLossDescription: "gain/loss on exchange rate",
        penaltyDescription: "penalty",
        requestPaymentList: [],
        selectedExpenseIds: [],
        cr: 0,
        dr: 0,
        isEdit: true,
        checked: false,
        isView: false
    }),
    methods: {
        isEditable() {
            return this.isEdit
        },
        savePrint() {
        },
        currency(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("currencyCode")) {
                    return dataItem.currencyCode;
                }
            }
            return "";
        },
        referenceNoTmp(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("referenceNo")) {
                    return dataItem.referenceNo;
                }
            }
            return "";
        },
        billNumberTmp(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("billNumber")) {
                    return dataItem.billNumber;
                }
            }
            return "";
        },
        paidAmountTmp(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("paidAmount")) {
                    return kendo.toString(dataItem.paidAmount, dataItem.decimalFormat);
                }
            }
            return "";
        },
        amountTobePaid(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("amountTobePaid")) {
                    return kendo.toString(
                        dataItem.amountTobePaid,
                        dataItem.decimalFormat
                    );
                }
            }
            return "";
        },
        discount(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("discount")) {
                    return kendo.toString(dataItem.discount, dataItem.decimalFormat);
                }
            }
            return "";
        },
        amount(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("amount")) {
                    return kendo.toString(dataItem.amount, dataItem.decimalFormat);
                }
            }
            return "";
        },
        bankReferenceNo(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("overDue")) {
                    return dataItem.bankReferenceNo;
                }
            }
            return "";
        },
        overDue(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("overDue")) {
                    return dataItem.overDue;
                }
            }
            return 0;
        },
        // async loadTransactionRate(code) {
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve('resolved')
        //             const date = new Date(this.transactionDate).toISOString().substr(0, 10)
        //             // const priceLevel = this.invoice.priceLevel
        //             if (code !== undefined || code !== '') {
        //                 this.showLoading = true
        //                 currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
        //                     if (res.data.statusCode === 200) {
        //                         this.showLoading = false
        //                         const exchangeRate = res.data.data
        //                         this.currencyCode = exchangeRate.code
        //                         this.transactionRate = exchangeRate.rate
        //                         this.cashReceipt.txnRate = exchangeRate.rate
        //                         this.cashReceipt.exchangeRate = exchangeRate
        //                         this.showLoading = false
        //                     }
        //                 })
        //             }
        //
        //         }, 10)
        //     })
        // },
        async initData() {
            if (this.$route.params.id !== undefined) {
                const queryString = this.$route.query;
                let type = "";
                let option = 0;
                if (queryString.hasOwnProperty("type")) {
                    type = queryString.type;
                    option = queryString.option;
                    if (type === "pmt") {
                        this.mPaymentOption = option;
                        this.search = this.$route.params.id;
                        this.searchPurchaseOrderExpense();
                    }
                } else {
                    await this.loadCashPaymentView();
                }
            } else {
                this.initRow();
            }
        },
        paidAmountEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    format: `n${this.purchaseFormContent.decimal}`,
                    min: 0,
                });
        },
        discountEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    format: `n${this.purchaseFormContent.decimal}`,
                    min: 0,
                });
        },
        onTransactionDateChanged() {
            if (this.cashPayment.supplier) {
                const supplier = this.cashPayment.supplier || {};
                const supId = supplier.id || "";
                if (supId) {
                    this.generateNumber();
                    this.searchPurchaseOrderExpense();
                }
            }
        },
        generateNumber() {
            if (this.$route.params.id) {
                const tranDate = new Date(this.cashPayment.transactionDate);
                const tranDateReceipt = new Date(this.cashPayment.transactionDate);
                const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                const tranDateReceiptM =
                    tranDateReceipt.getFullYear() + tranDateReceipt.getMonth();
                if (tranDateM === tranDateReceiptM) {
                    this.cashPayment.referenceNo = this.referenceNo;
                    return;
                }
            }
            window.console.log('this.cashPayment.transactionType', this.cashPayment.transactionType)
            if (this.cashPayment.transactionDate !== "" && this.transactionTypes.length > 0) {
                let data = {
                    abbr: this.cashPayment.transactionType.abbr,
                    structure: this.cashPayment.transactionType.structure,
                    transactionDate: this.transactionDate,
                    sequcencing: this.cashPayment.transactionType.sequcencing,
                    type: TRANSACTION_TYPE,
                    entity: 1,
                };
                billingHandler
                    .lastNumber(data)
                    .then((response) => {
                        if (response.data.statusCode === 200) {
                            const res = response.data.data;
                            const lastNumber = this.zeroPad(
                                parseInt(res.lastNumber),
                                this.cashPayment.transactionType.format
                            );
                            const number =
                                res.suffix +
                                this.cashPayment.transactionType.numberSeparator +
                                lastNumber;
                            this.cashPayment.number = number;
                            if (
                                this.cashPayment.transactionType.hasOwnProperty(
                                    "prefixSeparator"
                                )
                            ) {
                                const prefixSep = this.cashPayment.transactionType
                                    .prefixSeparator;
                                this.cashPayment.referenceNo =
                                    this.cashPayment.transactionType.abbr + prefixSep + number;
                            }
                        }
                    })
                    .catch((e) => {
                        this.errors.push(e);
                    });
            }
        },
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        autoCalculate() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                receiptAmount = 0,
                discount = 0,
                convertedAmount = 0,
                exchangeDiscount = 0,
                exchangeDiscountTxn = 0,
                paidAmountTxn = 0;
            this.jRaw = [];
            const rows = ds.data().filter((m) => m.paidAmount > 0 || m.discount > 0);
            window.console.log('cashPayment', ds.data())
            rows.forEach((value) => {
                if (~this.selectedExpenseIds.indexOf(value.lineId)) {
                    let nature = "",
                        purchaseRate = 0,
                        paymentRate = 0,
                        rawPaidAmount = 0,
                        rawDiscountAmount = 0,
                        currencyCode = "";
                    let discountAmount = 0,
                        apAmount = 0,
                        refNo = "",
                        payOption = {},
                        currency = {},
                        gainLoss = 0,
                        lastXRate = {},
                        location = {},
                        segment = {},
                        project = {},
                        locationId = "",
                        segmentId = "",
                        projectId = "",
                        txnId = "",
                        invRate = 1;
                    if (value.referenceNo) {
                        refNo = value.referenceNo;
                    }
                    if (value.id) {
                        txnId = value.id || "";
                    }
                    if (value.txnRate) {
                        purchaseRate = parseFloat(value.txnRate);
                    }
                    if (value.currencyCode) {
                        currencyCode = value.currencyCode || "";
                    }
                    if (value.currency) {
                        currency = value.currency || {};
                    }
                    if (value.location) {
                        location = value.location || {};
                        if (location.hasOwnProperty("id")) {
                            locationId = location.id;
                        }
                    }
                    if (value.segment) {
                        segment = value.segment || {};
                        if (segment.hasOwnProperty("id")) {
                            segmentId = segment.id;
                        }
                    }
                    if (value.project) {
                        project = value.project || {};
                        if (project.hasOwnProperty("id")) {
                            projectId = project.id;
                        }
                    }
                    if (value.exchangeRate) {
                        lastXRate = value.exchangeRate || {};
                    }
                    if (value.txnRate) {
                        invRate = parseFloat(value.txnRate);
                    }
                    if (value.rateTobase) {
                        paymentRate = parseFloat(value.rateTobase);
                    }
                    if (value.paidAmount) {
                        receiptAmount += kendo.parseFloat(value.paidAmount);
                        convertedAmount +=
                            kendo.parseFloat(value.paidAmount) * value.rateTobase;
                        paidAmountTxn += kendo.parseFloat(value.paidAmount) * invRate;
                        // paidAmt = kendo.parseFloat(value.paidAmount) * purchaseRate
                        rawPaidAmount = kendo.parseFloat(value.paidAmount);
                    }
                    if (value.discount) {
                        // discount += kendo.parseFloat(value.discount)
                        discount += kendo.parseFloat(value.discount) * value.rateTobase;
                        exchangeDiscount +=
                            kendo.parseFloat(value.exchangeDiscount) * value.rateTobase;
                        exchangeDiscountTxn += kendo.parseFloat(value.discount) * invRate;
                        discountAmount = kendo.parseFloat(value.discount) * paymentRate;
                        rawDiscountAmount = kendo.parseFloat(value.discount);
                    }
                    // todo: gain or loss exchange rate
                    gainLoss =
                        parseFloat(
                            (purchaseRate - paymentRate) * (rawPaidAmount + rawDiscountAmount)
                        ) * -1;
                    if (gainLoss !== 0) {
                        if (gainLoss > 0) {
                            nature = "dr";
                        } else {
                            nature = "cr";
                        }
                        window.console.log("gainLoss", gainLoss);
                        if (gainLoss) {
                            if (this.gainLossAcc.hasOwnProperty("id")) {
                                this.jRaw.push({
                                    id:
                                        this.gainLossAcc.id +
                                        "-" +
                                        nature +
                                        "-" +
                                        currencyCode +
                                        "-" +
                                        purchaseRate +
                                        "-" +
                                        locationId +
                                        "-" +
                                        projectId +
                                        "-" +
                                        segmentId +
                                        "-" +
                                        txnId,
                                    txnId: txnId,
                                    project: project,
                                    location: location,
                                    segment: segment,
                                    projectId: projectId,
                                    locationId: locationId,
                                    segmentId: segmentId,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    lastXRate: lastXRate,
                                    line: new ItemLineModel(value),
                                    receiptRate: gainLoss > 0 ? paymentRate : purchaseRate,
                                    description: this.gainOrLossDescription,
                                    account: this.gainLossAcc,
                                    accountId: this.gainLossAcc.id,
                                    amount: 0,
                                    exchangeAmount: gainLoss,
                                    type: nature,
                                    typeAs: "GainOrLoss",
                                });
                            }
                        }
                    }
                    //Todo: AP  Dr
                    apAmount = rawPaidAmount + rawDiscountAmount;
                    if (apAmount > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    if (value.hasOwnProperty("apAcc")) {
                        const apAcc = value.apAcc;
                        if (apAcc) {
                            if (apAcc.hasOwnProperty("id")) {
                                this.jRaw.push({
                                    id:
                                        apAcc.id +
                                        "-" +
                                        nature +
                                        "-" +
                                        currencyCode +
                                        "-" +
                                        purchaseRate +
                                        "-" +
                                        locationId +
                                        "-" +
                                        projectId +
                                        "-" +
                                        segmentId +
                                        "-" +
                                        txnId,
                                    txnId: txnId,
                                    project: project,
                                    location: location,
                                    segment: segment,
                                    projectId: projectId,
                                    locationId: locationId,
                                    segmentId: segmentId,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    lastXRate: lastXRate,
                                    line: new ItemLineModel(value),
                                    receiptRate: purchaseRate,
                                    description: refNo,
                                    account: apAcc,
                                    accountId: apAcc.id,
                                    amount: apAmount,
                                    exchangeAmount: apAmount * purchaseRate,
                                    type: nature,
                                    typeAs: "AP",
                                });
                            }
                        }
                    }
                    //Todo: Cash Account  CR
                    if (value.paymentOption) {
                        payOption = value.paymentOption;
                        const cashAmount = rawPaidAmount * -1; //+ ((purchaseRate - paymentRate) * (rawPaidAmount + rawDiscountAmount))
                        // const cashAmount = rawPaidAmount + (gainLoss ) + rawPaidAmount
                        if (cashAmount > 0) {
                            nature = "dr";
                        } else {
                            nature = "cr";
                        }
                        if (payOption.hasOwnProperty("account")) {
                            const payOptionAcc = payOption.account;
                            if (payOptionAcc.hasOwnProperty("id")) {
                                this.jRaw.push({
                                    id:
                                        payOptionAcc.id +
                                        "-" +
                                        nature +
                                        "-" +
                                        currencyCode +
                                        "-" +
                                        purchaseRate +
                                        "-" +
                                        locationId +
                                        "-" +
                                        projectId +
                                        "-" +
                                        segmentId +
                                        "-" +
                                        txnId,
                                    txnId: txnId,
                                    project: project,
                                    location: location,
                                    segment: segment,
                                    projectId: projectId,
                                    locationId: locationId,
                                    segmentId: segmentId,
                                    currencyCode: currencyCode,
                                    currency: currency,
                                    lastXRate: lastXRate,
                                    line: new ItemLineModel(value),
                                    receiptRate: purchaseRate,
                                    description: refNo,
                                    account: payOptionAcc,
                                    accountId: payOptionAcc.id,
                                    amount: cashAmount,
                                    exchangeAmount: cashAmount * paymentRate,
                                    type: nature,
                                    typeAs: "CashAccount",
                                });
                            }
                        }
                    }
                    //Todo: Settlement Discount  Cr
                    if (value.paymentTerm) {
                        const settlementDisc = value.paymentTerm;
                        if (discountAmount > 0) {
                            if (discountAmount * -1 > 0) {
                                nature = "dr";
                            } else {
                                nature = "cr";
                            }
                            window.console.log(settlementDisc, "settlementDisc");
                            if (settlementDisc.hasOwnProperty("account")) {
                                const settlementDiscAcc = settlementDisc.account;
                                if (settlementDiscAcc.hasOwnProperty("id")) {
                                    this.jRaw.push({
                                        id:
                                            settlementDiscAcc.id +
                                            "-" +
                                            nature +
                                            "-" +
                                            currencyCode +
                                            "-" +
                                            purchaseRate +
                                            "-" +
                                            locationId +
                                            "-" +
                                            projectId +
                                            "-" +
                                            segmentId +
                                            "-" +
                                            txnId,
                                        txnId: txnId,
                                        project: project,
                                        location: location,
                                        segment: segment,
                                        projectId: projectId,
                                        locationId: locationId,
                                        segmentId: segmentId,
                                        currencyCode: currencyCode,
                                        currency: currency,
                                        lastXRate: lastXRate,
                                        line: new ItemLineModel(value),
                                        receiptRate: paymentRate,
                                        description: "Purchase Payment Discount",
                                        account: settlementDiscAcc,
                                        accountId: settlementDiscAcc.id,
                                        amount: rawDiscountAmount * -1,
                                        exchangeAmount: discountAmount * -1,
                                        type: nature,
                                        typeAs: "Settlement Discount",
                                    });
                                }
                            }
                        }
                    }
                }
            });
            // this.invoiceTxn(txnIds)

            this.cashPayment.total = receiptAmount;
            this.cashPayment.exchangeAmount = convertedAmount;
            this.cashPayment.discount = discount;
            this.cashPayment.exchangeDiscount = exchangeDiscount;
            this.cashPayment.paidAmountTxn = paidAmountTxn;
            this.cashPayment.exchangeDiscountTxn = exchangeDiscountTxn;
            this.shrinkData(this.jRaw);
        },
        removeDuplicate(array) {
            const result = [];
            const map = new Map();
            for (const item of array) {
                if (!map.has(item.id)) {
                    map.set(item.id, true); // set any value to Map
                    result.push(item);
                }
            }
            return result;
        },
        shrinkData(obj) {
            const uniques = this.removeDuplicate(obj);
            uniques.forEach((n) => {
                const found = obj.filter((m) => m.id === n.id);
                let amount = 0,
                    exchangeAmount = 0;
                found.forEach((z) => {
                    amount += parseFloat(z.amount || 0);
                    exchangeAmount += parseFloat(z.exchangeAmount || 0);
                });
                n.exchangeAmount = parseFloat(exchangeAmount); //this.numberFormat(amount)
                n.amount = parseFloat(amount); //parseFloat(parseFloat(amount / parseFloat(n.receiptRate))) //this.numberFormat(amount * parseFloat(this.invoice.txnRate)) //.toFixed(this.saleFormContent.decimal)
            });
            this.jRaw = uniques;
            let dr = 0,
                cr = 0;
            this.jRaw.forEach((j) => {
                switch (j.type) {
                    case "cr":
                        cr += parseFloat(j.exchangeAmount);
                        break;
                    case "dr":
                        dr += parseFloat(j.exchangeAmount);
                        break;
                    default:
                        break;
                }
            });
            // window.console.log(JSON.stringify(this.jRaw), 'uniques')
            const txnId = this.jRaw.map((o) => o.txnId);
            var uSet = new Set(txnId);
            const uniqueSet = [...uSet];
            let jRaws = [];
            // window.console.log(JSON.stringify(uniqueSet), 'uniques')
            uniqueSet.forEach((n) => {
                const found = this.jRaw.filter((m) => m.txnId === n);
                const line = found[0].line;
                const refNo = line.referenceNo;
                jRaws.push({
                    id: n,
                    currencyCode: found[0].currencyCode,
                    projectId: found[0].projectId,
                    segmentId: found[0].segmentId,
                    locationId: found[0].locationId,
                    referenceNo: refNo || "",
                    entries: found,
                });
            });
            this.jRaw = jRaws;
            this.dr = dr;
            this.cr = cr;
            window.console.log("dr=", dr, "cr=", cr, "dr+cr = ", dr + cr);
            window.console.log(JSON.stringify(jRaws), "uniques");
        },
        purchaseTxn() {
            let txnIds = [],
                ids = [];
            this.itemLines.forEach((value) => {
                if (value.id) {
                    txnIds.push({
                        id: value.id,
                        status: 1,
                    });
                }
            });
            ids = Object.values(txnIds.reduce((r, o) => ((r[o.id] = o), r), {}));
            ids.forEach((m) => {
                const lines = this.itemLines.filter((n) => n.id === m.id);
                let paidAmt = 0;
                let amountTobePaid = 0;
                lines.forEach((x) => {
                    if (x.paidAmount) {
                        paidAmt += x.paidAmount;
                    }
                    if (x.amountTobePaid) {
                        amountTobePaid += x.amountTobePaid;
                    }
                });
                const pAmt = this.numberFormat(paidAmt);
                const amtTobePaid = this.numberFormat(amountTobePaid);
                if (pAmt === amtTobePaid) {
                    m["status"] = 3; //Paid
                } else {
                    m["status"] = 2; // Partially Paid
                }
            });
            this.txnList = ids;
        },
        initRow() {
            let ds = this.$refs.itemLineDS.kendoWidget();
            ds.insert([this.itemLine]);
        },
        async initGrid(that) {
            let grid = kendo.jQuery("#gridCashPayment").data("kendoGrid");
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    $("#header-chb").change(function (ev) {
                        let checked = ev.target.checked;
                        data = [];
                        kendo.jQuery(".row-checkbox").each(function (idx, item) {
                            if (checked) {
                                if (
                                    !$(item)
                                        .closest("tr")
                                        .is(".k-state-selected")
                                ) {
                                    $(item).click();
                                    let mRow = $(item).closest("tr");
                                    let dataItem = grid.dataItem(mRow);
                                    data.push(dataItem);
                                }
                            } else {
                                $(item).click();
                            }
                        });
                        that.checkedChanged(data);
                    });
                }, 10);
            });

            //
            // let checkedIds = {}
            let data = [];
            //
            // function selectRow(that) {
            //     let checked = this.checked,
            //         row = $(this).closest("tr"),
            //         grid = $('#itemLine').data('kendoGrid'),
            //         dataItem = grid.dataItem(row)
            //
            //     checkedIds[dataItem.paymentCode] = checked;
            //     window.console.log('here',dataItem)
            //     if (checked) {
            //         //-select the row
            //         row.addClass("k-state-selected")
            //         data.push(dataItem)
            //
            //         that.checkedChanged(dataItem)
            //     } else {
            //         //-remove selection
            //         row.removeClass("k-state-selected")
            //     }
            // }
            // if (grid) {
            //     grid.table.on("click", ".row-checkbox", selectRow(that))
            // }
        },
        checkedChanged(data) {
            data.forEach((m) => {
                if (parseFloat(m.paidAmount) === 0) {
                    m.paidAmount = m.amountTobePaid;
                }
                const index = this.itemLines.findIndex((item) => {
                    return (
                        m.paymentCode === item.paymentCode &&
                        parseFloat(item.paidAmount) === 0
                    );
                });
                this.itemLines.splice(index, 1, m);
            });
            this.autoCalculate();
        },
        headerTemplate() {
            return `<input type='checkbox' id='header-chb' class='k-checkbox header-checkbox'>`;
        },
        checkTemplate(dataItem) {
            return `<input type='checkbox' #= ${dataItem.check} ? \\'checked="checked"\\' : '' # class='k-checkbox row-checkbox' />`;
        },
        formatDate(dataItem) {
            if (dataItem.hasOwnProperty("dueDate")) {
                return kendo.toString(new Date(dataItem.dueDate), this.dateFormat);
            }
            return "";
        },
        settlementDiscount(dataItem) {
            if (dataItem.hasOwnProperty("paymentTerm")) {
                return dataItem.paymentTerm.name;
            }
            return "";
        },
        status(dataItem) {
            if (dataItem) {
                if (dataItem.hasOwnProperty("status")) {
                    const status = dataItem.status;
                    let statusText = "";
                    switch (status) {
                        case 1:
                            statusText = "OPEN";
                            break;
                        case 2:
                            statusText = "Partially Paid";
                            break;
                        case 4:
                            statusText = "VOID";
                            break;
                        case 3:
                            statusText = "PAID";
                            break;
                    }
                    return statusText;
                }
            }
            return "";
        },
        onCustomerChanged(event) {
            this.isEdit = true
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.mSupplier = value;
            this.cashPayment.supplier = value;
            this.loadRequestPayment();
        },
        onCustomerFilterChanged(event) {
            const filter = event.filter.value;
            this.loadData(0, filter, this.supBaseUrl);
            this.filter = filter;
        },
        loadData(skip, filter, baseUrl) {
            const url = baseUrl + `?filter=${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.afterFetch);
        },
        afterFetch(json) {
            this.suppliers = json.data;
        },
        numberFormat(value) {
            return kendo.toString(value, `n${this.purchaseFormContent.decimal}`);
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        dataSourceChanged(e) {
            let amtTobePaid = 0, amount = 0, discount = 0,
                paidAmount = 0;
            let dataRow = e.items[0] || {}
            if (Object.keys(dataRow).length > 0) {
                dataRow.set('optionType', OPTION_TYPE)
            }
            if (e.field) {
                let dataRow = e.items[0];
                switch (e.field) {
                    case "discount":
                        amount = dataRow.amount || 0
                        discount = dataRow.discount || 0
                        if (discount > amount) {
                            dataRow.set("discount", amount);
                        }
                        dataRow.set("amountTobePaid", parseFloat(dataRow.amount) - parseFloat(dataRow.discount));
                        dataRow.set("exchangeDiscount", parseFloat(dataRow.discount) * parseFloat(dataRow.rateTobase));
                        dataRow.set("exchangeDiscountTxn", parseFloat(dataRow.discount) * parseFloat(dataRow.txnRate));
                        amtTobePaid = parseFloat(dataRow.amountTobePaid || 0);
                        paidAmount = parseFloat(dataRow.paidAmount || 0);
                        if (paidAmount > amtTobePaid) {
                            paidAmount = amtTobePaid;
                            dataRow.set("paidAmount", parseFloat(paidAmount));
                            dataRow.set("paidAmountTobase", parseFloat(paidAmount) * parseFloat(dataRow.rateTobase || 1));
                            dataRow.set("paidAmountTxn", paidAmount * parseFloat(dataRow.txnRate || 1));
                        }
                        break;
                    case "paidAmount":
                        amtTobePaid = parseFloat(dataRow.amountTobePaid);
                        paidAmount = parseFloat(dataRow.paidAmount);
                        if (paidAmount > amtTobePaid) {
                            paidAmount = amtTobePaid;
                        }
                        dataRow.set("paidAmount", parseFloat(paidAmount));
                        dataRow.set("paidAmountTobase", parseFloat(paidAmount) * parseFloat(dataRow.rateTobase));
                        dataRow.set("paidAmountTxn", paidAmount * parseFloat(dataRow.txnRate));
                        break;
                    default:
                        break;
                }

                this.purchaseTxn();
                this.autoCalculate();
            }
        },
        onTypeChanged() {
            window.console.log(this.$route.params.id, 'pp')
            if (this.$route.params.id === null || this.$route.params.id === "" || this.$route.params.id === undefined) {
                this.generateNumber();
            }
            // this.templateHandle();
        },
        cancel() {
            this.$swal({
                title: i18n.t("msg_title_warning"),
                text: i18n.t("msg_discard"),
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: i18n.t("cancel"),
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: i18n.t("discard"),
            }).then((resultCen) => {
                window.console.log(resultCen);
                if (resultCen.value) {
                    this.$router.go(-1);
                }
            });
        },
        PMTTemplate(dataItem) {
            const pmt = dataItem.paymentOption || {};
            if (pmt) {
                return `<span>${pmt.bankAccountName || ``}</span>`;
            } else {
                return ``;
            }
        },
        async loadPaymentOption() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.paymentMethod = [];
                    paymentOptionHandler
                        .list(strFilter)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.paymentMethod = res.data.data;
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        PaymentMethodDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    dataTextField: "name",
                    dataValueField: "id",
                    template: "<span>#=name#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.paymentMethod,
                    }),
                });
        },
        hideSmallSidebar() {
            this.isHideBar = !this.isHideBar;
        },
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get(TXN_TYPE).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionTypes = res.data.data;
                            if (this.transactionTypes.length > 0) {
                                this.cashPayment.transactionType = this.transactionTypes[0];
                                if (!this.$route.params.id) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 10);
            });
        },
        async loadSaleFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    purchaseFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.purchaseFormContent = data[0];
                            }
                        }
                    });
                }, 10);
            });
        },
        async searchPurchaseOrderExpense() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.checked = false
                    this.isEdit = true
                    let data = {};
                    this.cashPayment.requestPayment = {}
                    this.showLoading = true;
                    if (this.mPaymentOption === "Vendor") {
                        data = {
                            search: this.mSupplier.id,
                            type: "Vendor",
                            transactionDate: this.transactionDate,
                        };
                    }
                    this.itemLines = [];
                    if (data.search) {
                        if (data.search.length > 4) {
                            this.showLoading = true;
                            try {
                                this.itemLines = []
                                this.cashPayment.itemLine = []
                                billingHandler.searchCashPayment(data).then((res) => {
                                    this.showLoading = false;
                                    if (res.data.statusCode === 200) {
                                        const response = res.data.data;
                                        const result = res.data.result;
                                        this.showLoading = false;
                                        if (response.length > 0) {
                                            this.itemLines = response;
                                            this.cashPayment.itemLine = response
                                            // this.$refs.lineDS.kendoWidget().setDataSource(this.itemLines)
                                            const obj = response[0];
                                            // this.autoCalculate();
                                            // this.dataSourceChanged()
                                            if (obj.hasOwnProperty("supplier")) {
                                                this.cashPayment.supplier = obj.supplier;
                                                if (obj.supplier.hasOwnProperty("name")) {
                                                    this.name = obj.supplier.name;
                                                }
                                            }
                                        }
                                        const baseCurrency = result;
                                        this.baseCurrency = baseCurrency;
                                        this.cashPayment.currency = baseCurrency;
                                        if (baseCurrency) {
                                            if (baseCurrency.hasOwnProperty("code")) {
                                                this.baseCurrencyCode = baseCurrency.code;
                                                // if (code) {
                                                //     this.loadTransactionRate(baseCurrency.code)
                                                // }
                                            }
                                        }
                                    }
                                });
                            } catch (e) {
                                this.showLoading = false;
                            }
                        } else {
                            this.showLoading = false;
                        }
                    } else {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        async onSaveClose(isPrint) {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let itemLineDS = this.$refs.itemLineDS.kendoWidget();
                    let dataValidate = 0;
                    let itemLines = []
                    itemLineDS
                        .data()
                        .filter((n) => n.paidAmount > 0 || n.discount > 0)
                        .map((n) => {
                            if (~this.selectedExpenseIds.indexOf(n.lineId)) {
                                n['id'] = n['txnId_']
                                itemLines.push(new ItemLineModel(n))
                            }
                            // return new ItemLineModel(n);
                        });

                    if (itemLines.length > 0) {
                        /*todo: check payment option */
                        itemLines.forEach((value, index) => {
                            const paymentOption = value.paymentOption || {};
                            const paymentOptionId = paymentOption.id || "";
                            if (paymentOptionId === "" || paymentOptionId === undefined) {
                                this.$snotify.error(
                                    "Please select payment option at row " + (index + 1)
                                );
                            } else {
                                dataValidate += 1;
                            }
                        });
                        /*****************************/
                        if (itemLines.length === dataValidate) {
                            let isAutoGenerate = 1;
                            this.autoCalculate();
                            if (this.$route.params.id) {
                                const tranDate = new Date(this.transactionDate);
                                const tranDateReceipt = new Date(
                                    this.cashPayment.transactionDate
                                );
                                const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                                const tranDateReceiptM =
                                    tranDateReceipt.getFullYear() + tranDateReceipt.getMonth();
                                if (tranDateM === tranDateReceiptM) {
                                    isAutoGenerate = 0;
                                }
                            }
                            // let data = {
                            //   "id": this.cashPayment.id ? this.cashPayment.id : '',
                            //   "type": TRANSACTION_TYPE,
                            //   "number": this.cashPayment.number,
                            //   "abbr": this.cashPayment.transactionType.abbr,
                            //   "transactionDate": this.transactionDate,
                            //   "supplier": this.cashPayment.supplier,
                            //   "transactionType": this.cashPayment.transactionType,
                            //   "itemLine": dataRow,
                            //   "transactionNote": this.cashPayment.transactionNote,
                            //   "journalNote": this.cashPayment.journalNote,
                            //   "referenceNo": this.cashPayment.referenceNo,
                            //   "total": this.cashPayment.total, // not used
                            //   "currency": this.cashPayment.currency,
                            //   "exchangeAmount": this.cashPayment.exchangeAmount,// amount to base currency
                            //   "paidOption": this.mPaymentOption,
                            //   "paidOptionText": this.mSupplier,
                            //   "discount": this.cashPayment.discount,
                            //   "status": 1,
                            //   "approvedBy": this.cashPayment.approvedBy,
                            //   "formTemplate": {},
                            //   "createdAt": this.cashPayment.createdAt,
                            //   "loggedUser": this.loggedUser,
                            //   "txnList": this.txnList,
                            //   "isAutoGenerate": isAutoGenerate,
                            //   "oldTotal": this.oldTotal,
                            //   "jRaw": this.jRaw,
                            //   "actionType": this.$route.params.id ? this.$route.query.type : 'new'
                            // }
                            //todo: match Cash Payment model
                            this.cashPayment.paidOption = this.mPaymentOption;
                            this.cashPayment.paidOptionText = this.mSupplier;
                            this.cashPayment.itemLine = itemLines;
                            this.cashPayment["jRaw"] = this.jRaw;
                            this.cashPayment["type"] = TRANSACTION_TYPE;
                            this.cashPayment.loggedUser = this.loggedUser;
                            this.cashPayment["oldTotal"] = this.oldTotal;
                            this.cashPayment["isAutoGenerate"] = isAutoGenerate;
                            this.cashPayment["txnList"] = this.txnList;
                            this.cashPayment["transactionDate"] = this.transactionDate;
                            this.cashPayment["actionType"] = this.$route.params.id
                                ? this.$route.query.type
                                : "new";
                            this.cashPayment["loggedUser"] = this.loggedUser;

                            this.showLoading = true;
                            // if(isPrint == true){
                            //     this.clear();
                            // }
                            billingHandler.createCashPayment(this.cashPayment).then((response) => {
                                if (response.data.statusCode === 201) {
                                    // this.close(response.data.data)
                                    this.showLoading = false;
                                    this.$snotify.success("Successfully");
                                    if (isPrint == 'Print') {
                                        getPrint(response.data.data);
                                        this.clear();
                                    } else if (isPrint == true){
                                        this.clear();
                                    }
                                    else {
                                        this.clear();
                                        window.history.go(-1);
                                    }
                                }
                            })
                            .catch((e) => {
                                this.showLoading = false;
                                this.$snotify.error("Something went wrong");
                                this.errors.push(e);
                            });
                        }
                    }
                }, 20);
            });
        },
        _print(){
            this.cashPayment["jRaw"] = this.jRaw;
            getPrint(this.cashPayment);
        },
        async loadCashPaymentView() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.itemLines = [];
                    if (this.$route.params.id) {
                        const strFilter = "?id=" + this.$route.params.id;
                        billingHandler
                            .txnCashPayment(strFilter)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    const response = res.data.data;
                                    if (response.length > 0) {
                                        this.cashPayment = response[0];
                                        this.referenceNo = this.cashPayment.referenceNo;
                                        this.mSupplier = this.cashPayment.supplier;
                                        this.oldTotal = this.cashPayment.total;
                                        this.itemLines = response[0].itemLine;
                                        if (this.cashPayment.hasOwnProperty("supplier")) {
                                            if (this.cashPayment.supplier.hasOwnProperty("name")) {
                                                this.name = this.cashPayment.supplier.name;
                                            }
                                        }
                                    }
                                }
                            })
                            .catch();
                        {
                            this.showLoading = false;
                        }
                    }
                }, 10);
            });
        },
        clear() {
            this.id = undefined;
            this.mSupplier = {}
            this.cashPayment = new CashPaymentModel({});
            let itemLineDS = this.$refs.itemLineDS.kendoWidget();
            this.itemLines = itemLineDS.data([]);
            this.cashPayment.transactionType = this.transactionTypes[0];
            this.name = ""
            this.requestPaymentList = []
            this.generateNumber();
        },
        async loadOtherAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    settingHandler
                        .getOtherAccount()
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                const response = res.data.data;
                                const data = response.filter(
                                    (o) => o.banhjiAccCode === "740010"
                                );
                                window.console.log(data, " this.gainLossAc");
                                if (data.length > 0) {
                                    this.gainLossAcc = data[0].account;
                                }
                                const data_ = response.filter(
                                    (o) => o.banhjiAccCode === "740040"
                                );
                                if (data_.length > 0) {
                                    this.otherRevenueAcc = data_[0].account;
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
            });
        },
        async loadRequestPayment() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const supplier = this.cashPayment.supplier || {}
                    const supplierId = supplier.id || ''
                    if (supplierId) {
                        this.showLoading = true;
                        const strFilter = "?id=" + supplierId + '&status=1';
                        billingHandler.requestPaymentList(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.requestPaymentList = res.data.data;
                            } else {
                                this.showLoading = false;
                            }
                        });
                    }

                }, 10);
            });
        },
        async loadRequestPaymentLines() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const requestPayment = this.cashPayment.requestPayment || {}
                    const reqId = requestPayment.id || ''
                    if (reqId) {
                        this.showLoading = true;
                        const strFilter = "?id=" + reqId + '&detail=1';
                        this.itemLines = []
                        this.cashPayment.itemLine = []
                        billingHandler.requestPaymentList(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.itemLines = res.data.data;
                                this.cashPayment.itemLine = this.itemLines
                                // this.$refs.lineDS.kendoWidget().setDataSource(this.itemLines)
                                // let dataSource = new kendo.data.DataSource({
                                //     data: this.itemLine
                                // });
                                // let grid = $('#grid').data("kendoGrid");
                                // grid.setDataSource(dataSource);

                                this.autoCalculate()
                            } else {
                                this.showLoading = false;
                            }
                        });
                    }

                }, 10);
            });
        },
        async onPaymentRequestChange() {
            this.isEdit = false
            this.checked = true
            const req = this.cashPayment.requestPayment || {}
            if (req.id) {
                await this.loadRequestPaymentLines()
            } else {
                this.itemLines = []
                this.cashPayment.itemLine = []
            }

        },
        onGridCashPayment() {
            const grid = this.$refs.gridCashPayment.kendoWidget();
            this.selectedExpenseIds = grid.selectedKeyNames();
            this.autoCalculate();
        },
        dataBound: function () {
            if (this.checked) {
                $("#gridCashPayment tbody input:checkbox").trigger("click");
                $("#gridCashPayment tbody input:checkbox").prop("disabled", true);
                $(".k-header input:checkbox").prop("disabled", true);
            } else {
                $("#gridCashPayment tbody input:checkbox").prop("disabled", false);
                $(".k-header input:checkbox").prop("disabled", false);
            }
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
                                this.paymentMethod = s[0].paymentOption
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
    watch: {
        id() {
            if (this.$route.params.id === undefined) {
                this.clear();
                this.isView= false;
            } else {
                this.showLoading = true;
                this.initData();
                this.isView= true;
            }
        },
    },
    created: async function() {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.loadObj()
        this.loadPaymentOption();
        this.loadOtherAccount();
        await this.loadSegment()
    },
    mounted: async function () {
        await this.loadPrefix();
        await this.loadSaleFormContent();
        this.loadData(0, this.filter, this.supBaseUrl);
        await this.initGrid(this);
        await this.initData();
        if (this.$route.params.id === undefined) {
            
            this.isView= false;
        } else {
    
            this.isView= true;
        }
    },
    computed: {
        disabledMe() {
            return !!this.$route.params.id;
        },
        showMe() {
            return this.mPaymentOption === "Vendor"; // or some other more complicated logic
        },
        enabled() {
            return this.$route.params.id !== undefined;
        },
        hiddenButton(){
            if(this.$route.query.type =="edit"){
                return true
            }else{
                return false
            }
        }
    },
}
</script>

<style scoped>
.k-dropdown {
    width: 100%;
    margin-top: 3px;
}

.function_wrapper {
    box-shadow: none !important;
}

.v-application--is-ltr .v-text-field .v-input__append-inner {
    margin-top: 0 !important;
}

.v-input__slot {
    background-color: #fff !important;
}

.function_content .label {
    margin-bottom: 10px;
    display: inline-block;
}

.border_radius10 {
    border-radius: 10px !important;
    background-color: #f2f2f2;
}

.pa-3.v-card h4 {
    font-size: 18px;
    color: #333;
}

.pa-3.v-card p {
    font-size: 12px;
    color: #b5b5b5;
}

.attachment_file {
    background-color: #efeded;
    border-radius: 0 !important;
}

.attachment_table.v-data-table table {
    border: thin solid rgba(0, 0, 0, 0.12);
}

.attachment_table table tr th {
    border-left: thin solid rgba(0, 0, 0, 0.12);
    height: 35px;
    border-right: thin solid rgba(0, 0, 0, 0.12);
}

.block_debit,
.block_credit {
    border-bottom: 1px solid #fff;
}

.block_debit p.number,
.block_credit p.number {
    font-size: 25px;
    color: #7f7f7f;
}

.block_debit h5,
.block_credit h5,
.block_difference h5 {
    text-transform: uppercase;
    color: #7f7f7f;
    font-size: 15px;
    font-weight: normal;
}

.block_difference h5 {
    font-size: 18px;
}

.block_difference h5 span {
    font-size: 15px;
}

.custom_grid table th:last-child {
    text-align: right !important;
}

@media (min-width: 1264px) {
    .container {
        max-width: 1080px !important;
    }
}

@media (max-width: 576px) {
    .pt-6.col-sm-5.col-12 {
        padding-top: 0 !important;
    }

    .code_text {
        width: 100%;
    }

    .phone_no_pt {
        padding-top: 0 !important;
    }

    .select_template,
    .save_option {
        margin-bottom: 10px;
    }
}

.hide_small_bar_class {
    max-width: 0;
    transition: 0.5s ease-in;
    flex: 0 0 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: 0.5s ease-in;
    flex: 0 0 100%;
}

.info_add {
    background-color: #ffffff;
}

.small_sidebar {
    height: 98%;
    position: relative;
    padding: 12px;
    background-color: #edf1f5;
}

.iconArrow {
    right: -35px;
    position: absolute;
    bottom: -10px;
}

.iconArrowHide {
    position: absolute;
    right: -7px;
    bottom: -10px;
}

.color_grey {
    color: #808080;
}

.card_green {
    min-height: 70px;
    background-color: #00b050 !important;
    color: #ffffff;
}

.lb_bold {
    font-size: 12px;
}

.detial_smallside_p {
    position: absolute;
    bottom: 10px;
}

.card_background {
    background-color: #edf1f5;
    min-height: 120px;
}

.deposite_input {
    width: 100px;
}

.btn_save_draft {
    color: #ffffff;
    background-color: #00b0f0 !important;
    text-transform: capitalize;
}

.save_option {
    background-color: #203864 !important;
}

.btn_add_small {
    height: 27px !important;
    min-width: 25px !important;
    font-size: 10px;
    padding: 0 22px !important;
    background-color: #00b050 !important;
    color: #ffffff;
    border-radius: 0 !important;
}

.list_site_inv {
    background-color: #92d050;
    color: #ffffff;
    font-size: 12px;
}

.list_site_exp {
    background-color: #c5e0b4;
    color: #000000;
    font-size: 12px;
    line-height: 16px;
    min-height: 40px;
}

.checkbox_inv {
    padding: 2px;
    margin-top: 3px;
    margin-right: 2px;
}

.exp_select {
    font-size: 12px !important;
}

.theme--light.v-data-table td {
    border-bottom: 1px solid #808080;
    border-top: 1px solid #808080;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.b-search:before {
    color: #fff !important;
}
</style>
