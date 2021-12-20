<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white"
                    >
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col
                                    class=" py-0"
                                    sm="12"
                                    cols="12"
                                    style="transition: .3s ease-in;"
                                    :class="{ hide_big_bar_class: isHideBar }"
                                >
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t("purchase") }}</h2>

                                        <v-icon
                                            @click="cancel()"
                                            style="cursor: pointer;  font-size: 40px;"
                                            color="grey"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                        <span
                                            class="pointer float-right help"
                                            @click="Help('purchase')"
                                        >
                                          {{ $t("help") }}
                                        </span>
                                    </v-card>
                                    <v-card outlined dense class="px-4 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t("supplier") }}</label>
                                                <v-col
                                                    sm="12"
                                                    cols="12"
                                                    class="kendo_dropdown_custom px-0 pb-5 pt-0"
                                                >
                                                    <dropdownlist
                                                        :data-items="vendorList"
                                                        @change="onChange"
                                                        :value="vendor"
                                                        :data-item-key="dataItemKey"
                                                        :text-field="textField"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        :required="true"
                                                        :valid="validVendor"
                                                        @filterchange="onFilterChange"
                                                    >
                                                    </dropdownlist>
                                                </v-col>
                                                <div hidden>
                                                    <label class="label mb-0">{{
                                                            $t("purchase_type")
                                                        }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        :items="purchaseTypes"
                                                        item-value="id"
                                                        item-text="name"
                                                        v-model="purchase.transactionType"
                                                        @change="onInvoiceTypeChanged"
                                                        :rules="[
                                                          (v) => !!v || 'Transaction Currency is required',
                                                        ]"
                                                        return-object
                                                        outlined
                                                    />
                                                </div>

                                                <label class="label  mb-0">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="purchase.transactionDate"
                                                    :disabled="disableMe"
                                                    @onChanged="onInvoiceDateChanged"
                                                    @emitDate="txnDate = $event"
                                                />
                                                <label class="label mb-0">{{ $t("number") }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="pt-0 pr-0 pb-0">
                                                        <div class="code_text text-bold">
                                                            {{ purchase.transactionType.abbr }}
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1 pb-0">
                                                        <v-text-field
                                                            class=" custom-border "
                                                            v-model="purchase.number"
                                                            outlined
                                                            readonly
                                                            :rules="[(v) => !!v || 'Number is required']"
                                                            required
                                                        />
                                                    </v-col>
                                                    <v-col sm="2" cols="2" class="pt-0 px-0 pb-0">
                                                        <v-icon
                                                            color="black"
                                                            size="30"
                                                            class="border_qrcode"
                                                            @click="generateNumber"
                                                        >mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col sm="4" cols="12">
                                                <label class="label mb-0">{{
                                                        $t("suppliers_invoice_no")
                                                    }}</label>
                                                <v-text-field
                                                    class="mt-1 mr-0"
                                                    outlined
                                                    v-model="purchase.billNo"
                                                    tage="Vendor Invoice Number."
                                                    :rules="[(v) => !!v || 'required']"
                                                    required
                                                />
                                                <label class="label mb-0">{{ $t("term") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="purchase.paymentTerm"
                                                    :items="paymentTerms"
                                                    @change="onPaymentTermChanged"
                                                    placeholder="Term"
                                                    item-text="name"
                                                    item-value="id"
                                                    return-object
                                                    outlined
                                                />
                                                <label class="label mb-0">{{ $t("segment") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="purchase.segment"
                                                    :items="segments"
                                                    item-value="id"
                                                    disabled
                                                    :item-text="(item) => `${item.code} - ${item.name}`"
                                                    return-object
                                                    tage="sub Of"
                                                    placeholder="Sub Of"
                                                    outlined=""
                                                />
                                            </v-col>

                                            <v-col sm="4" cols="12" class="">
                                                <label class="label  mb-0">{{ $t("due_date") }}</label>
                                                <app-datepicker
                                                    :initialDate="purchase.dueDate"
                                                    @emitDate="dueDate = $event"
                                                />
                                                <label class="label mb-0">{{ $t("bill_date") }}</label>
                                                <app-datepicker
                                                    :initialDate="purchase.billDate"
                                                    @emitDate="billDate = $event"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-row class="pt-0" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0 px-4">
                                            <kendo-datasource
                                                ref="itemLineDS"
                                                :data="itemLines"
                                                :change="dataSourceChanged"
                                            />
                                            <kendo-grid
                                                id="gridItemLine"
                                                class="grid-function"
                                                :data-source-ref="'itemLineDS'"
                                                :sortable="false"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :column-menu="false"
                                                    :template="rowNumberTmpl"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5;',
                                                    class: 'text-products',
                                                  }"
                                                    :attributes="{ style: 'text-align: products' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'serviceDate'"
                                                    :title="$t('date_from')"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.serviceDate"
                                                    :template="
                            '<span>#= kendo.toString(new Date(serviceDate), dateFormat)#</span>'
                          "
                                                    :editor="ServiceDateEditor"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'serviceDateTo'"
                                                    :title="$t('date_to')"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.serviceDateTo"
                                                    :template="
                            '<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'
                          "
                                                    :editor="ServiceDateToEditor"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('item')"
                                                    :template="itemTemplate"
                                                    :editor="ItemDropDownEditor"
                                                    :width="200"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :template="'<span>#=description#</span>'"
                                                    :width="200"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('qty')"
                                                    :format="'{0:n}'"
                                                    :template="'<span>#=qty#</span>'"
                                                    :width="80"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :title="$t('uom')"
                                                    :width="100"
                                                    :template="UOMTemplate"
                                                    :editor="UOMDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'cost'"
                                                    :title="$t('cost')"
                                                    :width="200"
                                                    :template="
                            '<span>#=kendo.toString(cost || 0, decimalFormat)#</span>'
                          "
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="200"
                                                    :editable="
                            () => {
                              return false;
                            }
                          "
                                                    :template="
                            '<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'
                          "
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.discountItem"
                                                    :template="discountItemTemplate"
                                                    :editor="DiscountItemDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: 'Delete',
                            click: removeRow,
                            class: 'btn-plus',
                          }"
                                                    :title="$t('action')"
                                                    :width="200"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col sm="5" cols="12" class="pt-0 px-4">
                                                    <v-btn
                                                        class="float-left rounded-0 btn_plus mr-2"
                                                        @click="addRow"
                                                    >
                                                        <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                    </v-btn>

                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col class="pt-0" sm="5" cols="12">
                                                    <v-card class="no-boxshadow pa-3" color="grayBg">
                                                        <v-row>
                                                            <v-col class="py-0 pa-4" sm="12" cols="12">
                                                                <label class="label mb-0">{{
                                                                        $t("billing_address")
                                                                    }}</label>
                                                                <v-select
                                                                    class="mt-1"
                                                                    v-model="purchase.billingAddress"
                                                                    :items="billingAddress"
                                                                    item-value="id"
                                                                    item-text="name"
                                                                    tage="Billing Address"
                                                                    placeholder="USA"
                                                                    outlined
                                                                />
                                                                <label class="label mb-0">{{
                                                                        $t("pickup_delivery_address")
                                                                    }}</label>
                                                                <v-select
                                                                    class="mt-1"
                                                                    v-model="purchase.deliveryAddress"
                                                                    :items="deliveryAddress"
                                                                    item-value="id"
                                                                    item-text="name"
                                                                    tage="Pickup/ Delivery Address"
                                                                    placeholder="USA"
                                                                    outlined
                                                                />
                                                                <label class="label  mb-0">{{
                                                                        $t("pickup_delivery_date_time")
                                                                    }}</label>
                                                                <app-datepicker
                                                                    :initialDate="purchase.deliveryDateTime"
                                                                    @emitDate="deliveryDateTime = $event"
                                                                />

                                                            </v-col>
                                                        </v-row>
                                                    </v-card>
                                                </v-col>
                                                <v-col class="pt-0" sm="7" cols="12">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td class="text-left pr-0">
                                                                    {{ $t("subtotal") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(purchase.subTotal) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left pr-0">
                                                                    {{ $t("general_discount") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    ({{ numberFormat(purchase.discountTotal) }})
                                                                </td>
                                                            </tr>

                                                            <tr style="background: #e1efd9">
                                                                <td class="text-left text-uppercase pr-0">
                                                                    {{ $t("total") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td
                                                                    class="text-right primary--text text-bold"
                                                                    id="total"
                                                                >
                                                                    {{ numberFormat(purchase.total) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left pr-0">
                                                                    {{ $t("deposit") }}
                                                                    <span class="float-right primary--text">{{
                                                                            numberFormat(purchase.depositAmount)
                                                                        }}</span>
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right hide_form_alert">
                                                                    <v-text-field
                                                                        class=" text-right float-right deposite_input"
                                                                        v-model="purchase.depositDeduction"
                                                                        @change="onDepositDeductionChange"
                                                                        min="0"
                                                                        type="number"
                                                                        tage="Deposit"
                                                                        width="80"
                                                                        outlined
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">
                                                                    {{ $t("amount_due") }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td
                                                                    class="text-right primary--text text-bold"
                                                                >
                                                                    {{ numberFormat(purchase.remainingAmount) }}
                                                                </td>
                                                            </tr>
                                                            <tr hidden>
                                                                <td class="text-left">{{ $t("dr") }}</td>
                                                                <td class="text-center">:</td>
                                                                <td
                                                                    class="text-right primary--text text-bold"
                                                                >
                                                                    {{ numberFormat(purchase.dr) }}
                                                                </td>
                                                            </tr>
                                                            <tr hidden>
                                                                <td class="text-left">{{ $t("cr") }}</td>
                                                                <td class="text-center">:</td>
                                                                <td
                                                                    class="text-right primary--text text-bold"
                                                                >
                                                                    {{ numberFormat(purchase.cr) }}
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
                                        <v-alert type="warning" v-model="alert" dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    class="mr-2 float-left select_template"
                                                    v-on="on"
                                                >
                                                    {{ $t("select_template") }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item
                                                    v-for="(item, index) in templates"
                                                    :key="index"
                                                >
                                                    <v-list-item-title>{{
                                                            item.title
                                                        }}
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            class="text-capitalize  v-btn--outlined float-left"
                                            @click="cancel"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <v-btn
                                            class="float-right text-capitalize  white--text"
                                            @click="onSaveClose(false)"
                                            color="primary"
                                        >
                                            {{ $t("save_close") }}
                                        </v-btn>
                                    </v-card>
                                </v-col>
                                <!-- <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                       :class="{'hide_small_bar_class':isHideBar}">
                                  <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                      class="text-uppercase float-right mt-n3">
                                                      <span class="pointer" @click="Help('purchase')">
                                                          {{ $t('help') }}
                                                      </span>
                                    <v-icon
                                        @click="cancel()"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                  </h3>
                                  <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 pt-4 grayBg">
                                    <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                            min-height="60px" color="primary">
                                      <h3 style="font-size: 18px" class="text-white text-uppercase">
                                        {{ $t('amount_due') }}</h3>
                                      <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                        {{ numberFormat(purchase.amountDue) }}</h3>
                                    </v-card>
                                    <v-row>
                                      <v-col sm="12" cols="12" class="pt-3">
                                        <label class="label mb-0">{{ $t('segment') }}</label>
                                        <v-select class="mt-1"
                                                  v-model="purchase.segment"
                                                  :items="segments"
                                                  item-value="id"
                                                  :item-text="item =>`${item.code} - ${item.name}`"
                                                  return-object
                                                  tage="sub Of"
                                                  placeholder="Sub Of"
                                                  outlined=""/>
                                        <label class="label mb-0">{{ $t('location') }}</label>
                                        <v-select class="mt-1"
                                                  v-model="purchase.location"
                                                  :items="locations"
                                                  item-value="id"
                                                  :item-text="item =>`${item.code} - ${item.name}`"
                                                  return-object
                                                  tage="Location"
                                                  placeholder="bu/location"
                                                  outlined=""/>
                                        <label class="label font_14">{{ $t('project') }}</label>
                                        <v-select class=" mt-1"
                                                  v-model="purchase.project"
                                                  :items="customerProjects"
                                                  :item-text="item =>`${item.code} - ${item.name}`"
                                                  item-value="id"
                                                  tage="Customer Project"
                                                  placeholder="project"
                                                  outlined
                                        />
                                        <label class="label font_14">{{ $t('employee') }}</label>
                                        <v-col sm="12" cols="12"
                                               class="kendo_dropdown_custom pl-0 pr-0 pb-3 pt-0">
                                          <dropdownlist
                                              :data-items="employees"
                                              @change="onEmployeeChanged"
                                              :value="mEmployee"
                                              :data-item-key="'id'"
                                              :text-field="'name'"
                                              :default-item="defaultItem"
                                              :filterable="true"
                                              @filterchange="onEmployeeFilterChanged">
                                          </dropdownlist>
                                        </v-col>
                                        <label class="label">{{ $t('for_month_of') }}</label>
                                        <month-picker :initialMonth="purchase.monthOf"
                                                      @emitMonth="monthOf = $event"/>

                                      </v-col>
                                    </v-row>
                                    <v-divider/>
                                  </div>
                                  <p class="mb-0 mt-20 detial_smallside_p font_14">{{ $t('sale_order_funct_desc') }}</p>
                                </v-col> -->
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true"/>
            <v-dialog v-model="dialogTax" max-width="450px">
                <v-card>
                    <v-card-title>{{ $t("tax_list") }}</v-card-title>
                    <v-icon class="btn_close" @click="dialogTax = false">close</v-icon>
                    <v-divider/>
                    <v-card-text
                        style="height: 240px; background-color: #EDF1F5; color: #333;"
                    >
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                        <tr
                                            v-for="(value, name) in taxListTotal"
                                            v-bind:key="name"
                                        >
                                            <td class="text-left" width="180px">{{ name }}</td>
                                            <td class="text-center">:</td>
                                            <td class="text-right">
                                                {{ numberFormat(value) }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left" width="180px">
                                                {{ $t("total") }}
                                            </td>
                                            <td class="text-center">:</td>
                                            <td class="text-right">
                                                {{ numberFormat(purchase.totalTaxAmount) }}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
// import kendo from "@progress/kendo-ui"
import {i18n} from "@/i18n";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import PurchaseModel from "@/scripts/purchase/model/Purchase";
import ItemLineModel from "@/scripts/purchase/model/ItemLine";
import {uuid} from "vue-uuid";
import {DropDownList} from "@progress/kendo-vue-dropdowns";
import kendo from "@progress/kendo-ui";
import PurchaseFormContentModel from "@/scripts/model/PurchaseFormContent";
import {ShowResource} from "@/observable/store";
import {dataStore} from '@/observable/store'
const loanHandler = require("@/scripts/loanHandler")

const supplierHandler = require("@/scripts/supplierHandler");
// import kendo from "@progress/kendo-ui";

const projectHandler = require("@/scripts/projectHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");

// const settingsHandler = require("@/scripts/settingsHandler");
const employeeHandler = require("@/scripts/employeeHandler");
const locationHandler = require("@/scripts/locationHandler");
const paymentTermHandler = require("@/scripts/paymentTermHandler");
const accountHandler = require("@/scripts/handler/accounting/accountHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
const uomPriceHandler = require("@/scripts/uomPriceHandler");
const discountItemHandler = require("@/scripts/discountItemHandler");
const settingHandler = require("@/scripts/settingHandler");
const otherChargeHandler = require("@/scripts/otherChargeHandler");
const purchaseFormContentHandler = require("@/scripts/purchaseFormContentHandler");
const prefixHandler = require("@/scripts/prefixHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");

const purchaseModel = new PurchaseModel({});
const itemLineModel = new ItemLineModel({});
const purchaseFormContentModel = new PurchaseFormContentModel({});
const $ = kendo.jQuery;

const textField = "numberName";
const keyField = "id";
const defaultItem = {[textField]: "Select vendor...", [keyField]: null};
const emptyItem = {[textField]: "loading ..."};
const pageSize = 10;
const itemLinePrefix = "lin-";
const loadingData = [];
while (loadingData.length < pageSize) {
    loadingData.push({...emptyItem});
}
const {ClassEditor} = require("@/scripts/kendo_editor/Collections");
const DISCOUNT_TYPE = "?type=Purchase";
const TRANSACTION_TYPE = "Purchase";
export default {
    name: "CreditPurchase",
    props: ["id", "transactionDate"],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        // 'month-picker': () => import('@/components/custom_templates/MonthPicker'),
        dropdownlist: DropDownList,
    },
    data: () => ({
        isEdit: false,
        mOtherCharge: [],
        mOtherChargeAmount: [],
        numSelect: [1],
        dialogTax: false,
        vendorList: [],
        showLoading: false,
        bill_date: "",
        alert: false,
        files: [],
        // Form validation
        valid: true,
        itemLines: [],
        txnDate: new Date().toISOString().substr(0, 10),
        billDate: new Date().toISOString().substr(0, 10),
        invoiceDate: new Date().toISOString().substr(0, 10),
        monthOf: new Date().toISOString().substr(0, 7),
        templates: [
            {title: "Draft"},
            {title: "Open"},
            {title: "Partially Closed"},
            {title: "Closed"},
        ],
        isHideBar: false,
        vendor: {},
        defaultItem: defaultItem,
        purchase: purchaseModel,
        transactionType: ["Invoice", "Commercial Invoice", "Tax Invoice"],
        cusBaseUrl: supplierHandler.search(),
        empBaseUrl: employeeHandler.search(),
        init: {method: "GET", accept: "application/json", headers: []},
        pendingRequest: undefined,
        requestStarted: false,
        skip: 0,
        tempSkip: null,
        total: 0,
        filter: "",
        referenceNo: "",
        filter_: "",
        textField: "numberName",
        dataItemKey: "id",
        segments: [],
        employees: [],
        mEmployee: {},
        customerProjects: [],
        billingAddress: [],
        deliveryAddress: [],
        deliveryDateTime: new Date().toISOString().substr(0, 10),
        priceLevel: [],
        locations: [],
        paymentTerms: [],
        accPayable: [],
        currencies: [],
        itemLine: itemLineModel,
        uoms: [],
        tax: [],
        specificDiscountItem: [],
        otherChargeList: [],
        depositBalance: 0,
        schemaDefinition: {
            model: {
                id: "id",
            },
        },
        purchaseFormContent: purchaseFormContentModel,
        ClassEditor: ClassEditor,
        taxListTotal: {},
        purchaseTypes: [],
        supplierDiscountItem: [],
        lateFeeList: [],
        loggedUser: {
            id: "cf3d10ab-bce6-47b3-8405-b448c23dad84",
            name: "Mr. Inspector",
        },
        exchangeRate: {},
        baseCurrencyCode: "",
        currencyCode: "",
        transactionRate: 1,
        jRaw: [],
        itemList: [],
        businessCategory: []
    }),
    methods: {
        Help(key_search) {
            ShowResource(key_search);
        },
        AmountEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    decimals: 30,
                    format: `${this.purchaseFormContent.decimal}`,
                });
        },
        vatTemplate(dataItem) {
            const vat = dataItem.tax;
            if (vat) {
                return `<span>${vat.defaultTax ? vat.defaultTax : ``}</span>`;
            } else {
                return ``;
            }
        },
        itemTemplate(dataItem) {
            const item = dataItem.item;
            if (item) {
                return `<span>${item.name ? item.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        UOMTemplate(dataItem) {
            const uom = dataItem.uom;
            if (uom) {
                return `<span>${uom.uom ? uom.uom.name : ``}</span>`;
            } else {
                return ``;
            }
        },
        discountItemTemplate(dataItem) {
            const discountItem = dataItem.discountItem;
            if (discountItem) {
                return `<span>${discountItem.code ? discountItem.code : ``} - ${
                    discountItem.name ? discountItem.name : ``
                }</span>`;
            } else {
                return ``;
            }
        },
        addSelect() {
            let amount_num = this.numSelect.length;
            let num = this.numSelect[amount_num - 1];
            let new_num = num + 1;
            let lenghtItem = this.specificDiscountItem.length;
            if (new_num <= lenghtItem) {
                this.numSelect.push(new_num);
            }
        },
        removeSelect(index) {
            this.numSelect.splice(index, 1);
            // window.console.log(index, this.numSelect)
            // this.selectDiscount.splice(index,1)
            // window.console.log("remove",this.selectDiscount)
            // this.selectDiscount = this.selectDiscount.filter(item =>  item.id != val.id);
        },
        onOtherChargeChange() {
            let otherCharge = 0;
            this.mOtherCharge.forEach((m) => {
                otherCharge += this.autoCalculateDiscount(m, this.purchase.subTotal);
            });
            this.purchase.otherChargeAmount = otherCharge;
            this.autoCalculate();
        },
        onOtherAmount(value) {
            return this.autoCalculateDiscount(value, this.purchase.subTotal);
        },
        onSpecificDiscountChanged() {
            this.purchase.specificDiscountTotal = 0;
            if (this.purchase.specificDiscountItem) {
                // window.console.log('-changed', this.purchase.specificDiscountItem)
                this.purchase.specificDiscountTotal =
                    this.autoCalculateDiscount(
                        this.purchase.specificDiscountItem,
                        this.purchase.subTotal
                    ) || 0;
                this.purchase.total =
                    kendo.parseFloat(this.purchase.subTotal) -
                    (kendo.parseFloat(this.purchase.discountTotal) +
                        kendo.parseFloat(this.purchase.totalTaxAmount)) -
                    this.autoCalculateDiscount(
                        this.purchase.specificDiscountItem,
                        this.purchase.subTotal
                    );
            }
            this.autoCalculate();
        },
        empImpl(dataItem) {
            let empIds = [];
            dataItem.employee.forEach((m) => {
                empIds.push(m.firstName + " - " + m.lastName);
            });
            // window.console.log(empIds.join(', '))
            return `<span>${empIds.join(", ")}</span>`;
        },
        uomTmp(dataItem) {
            window.console.log(dataItem);
            return dataItem;
        },
        onInvoiceTypeChanged() {
            if (this.$route.params.id === null || this.$route.params.id === "") {
                this.generateNumber();
            }
        },
        autoCalculateTaxByType(tax) {
            // return by a key
            const groupAll = (list) =>
                list.reduce((tax, item) => {
                    const taxAmount = tax[item.name] || 0;
                    return Object.assign({}, tax, {
                        [item.name]: taxAmount + parseFloat(item.amount),
                    });
                }, {});
            this.taxListTotal = groupAll(tax);
            window.console.log("nimol", groupAll(tax));
        },
        onDepositDeductionChange() {
            if (
                this.purchase.depositDeduction === "" ||
                this.purchase.depositDeduction === undefined
            ) {
                this.purchase.depositDeduction = 0;
            }
            const deduction = parseFloat(this.purchase.depositDeduction) || 0;
            if (deduction > this.purchase.depositAmount) {
                this.purchase.depositDeduction = this.purchase.depositAmount;
            }
            this.autoCalculate();
        },
        autoCalculate() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                subTotal = 0,
                totalTax = 0,
                discountTotal = 0,
                spTax = 0,
                pltax = 0,
                otherTax = 0,
                vatTax = 0,
                discountInvoice = 0,
                taxList = [],
                discountItem = [],
                inclusiveTax = 0,
                taxTypeId = 0,
                withholdingTaxAmount = 0;
            let nature = "";
            this.jRaw = [];
            const rows = ds.data().filter((m) => parseFloat(m.amount) > 0);
            rows.forEach((value) => {
                let modifierPrice = 0;
                if (value.modifier) {
                    modifierPrice = kendo.parseFloat(value.modifier.price);
                }

                let discount = 0;
                if (value.discountItem) {
                    const disItemField = value.discountItem;
                    let subTo =
                        kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty);
                    discount = this.autoCalculateDiscount(value.discountItem, subTo);
                    if (value.discountItem.hasOwnProperty("id")) {
                        discountItem.push(value.discountItem);
                    }
                    discountTotal += discount ? discount : 0;
                    if (discount * -1 > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    if (disItemField.account) {
                        if (disItemField.account.hasOwnProperty("id")) {
                            this.jRaw.push({
                                id: disItemField.account.id + "-" + nature,
                                line: new ItemLineModel(value),
                                description: "Purchase Discount",
                                account: disItemField.account,
                                accountId: disItemField.account.id,
                                amount: discount * -1,
                                exchangeAmount:
                                    discount * kendo.parseFloat(this.purchase.txnRate) * -1,
                                type: nature,
                                typeAs: "discount",
                            });
                        }
                    }
                }
                if (value.tax) {
                    // window.console.log('Vat Tax', value.tax)
                    let amt =
                        kendo.parseFloat(spTax ? spTax : 0) +
                        kendo.parseFloat(pltax ? pltax : 0) +
                        kendo.parseFloat(otherTax ? otherTax : 0) +
                        (kendo.parseFloat(value.amount ? value.amount : 0) -
                            (discount ? discount : 0));
                    vatTax = this.autoCalculateTax(value.tax, amt);
                    vatTax = kendo.parseFloat(vatTax) ? kendo.parseFloat(vatTax) : 0;
                    const tax = value.tax;
                    const baseAmount = tax.baseAmount;
                    window.console.log(tax, "im tax");
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            inclusiveTax += vatTax;
                        }
                    }
                    if (value.tax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.tax.taxType.name,
                            amount: vatTax,
                            id: value.tax.taxType.id,
                        });
                    }
                    if (value.tax.hasOwnProperty("taxType")) {
                        const taxType = value.tax.taxType || {};
                        taxTypeId = taxType.typeId || 0;
                    }
                    let taxAmount = vatTax;
                    let taxDescription = "";
                    if (taxTypeId === 1) {
                        nature = "dr";
                        taxAmount = vatTax;
                        taxDescription = "Purchase Tax";
                    } else if (taxTypeId === 2) {
                        withholdingTaxAmount += vatTax;
                        nature = "cr";
                        taxAmount = vatTax * -1;
                        taxDescription = "Withholding Tax";
                    } else if (taxTypeId === 10) {
                        nature = "cr";
                        taxAmount = 0;
                        taxDescription = "No Tax";
                    }
                    if (taxAmount > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    const vatTaxField = value.tax;
                    if (taxAmount !== 0) {
                        if (vatTaxField) {
                            if (vatTaxField.account) {
                                if (vatTaxField.account.hasOwnProperty("id")) {
                                    this.jRaw.push({
                                        id: vatTaxField.account.id + "-" + nature,
                                        line: new ItemLineModel(value),
                                        description: taxDescription,
                                        account: vatTaxField.account,
                                        accountId: vatTaxField.account.id,
                                        amount: taxAmount,
                                        exchangeAmount:
                                            taxAmount * kendo.parseFloat(this.purchase.txnRate),
                                        type: nature,
                                        typeAs: "tax",
                                    });
                                }
                            }
                        }
                    }
                }
                totalTax +=
                    kendo.parseFloat(spTax ? spTax : 0) +
                    kendo.parseFloat(pltax ? pltax : 0) +
                    kendo.parseFloat(otherTax ? otherTax : 0) +
                    kendo.parseFloat(vatTax ? vatTax : 0);
                subTotal +=
                    kendo.parseFloat(value.amount) + modifierPrice - inclusiveTax;

                const amt =
                    kendo.parseFloat(value.amount) + modifierPrice - inclusiveTax;
                // const xAmount = (kendo.parseFloat(amt) * kendo.parseFloat(this.purchase.txnRate))

                const itemAmount = amt + withholdingTaxAmount;
                const itemXAmount =
                    itemAmount * kendo.parseFloat(this.purchase.txnRate);

                const item = value.item;
                if (amt > 0) {
                    nature = "dr";
                } else {
                    nature = "cr";
                }
                if (item) {
                    if (item.type === "Service") {
                        const plan = item.isPan || false;
                        if (plan) {
                            if (item.hasOwnProperty("deferredIncomeAcc")) {
                                if (item.deferredIncomeAcc.hasOwnProperty("id")) {
                                    let deferredInAcc = item.deferredIncomeAcc;
                                    this.jRaw.push({
                                        id: deferredInAcc.id + "-" + nature,
                                        line: new ItemLineModel(value),
                                        description: this.purchase.journalNote,
                                        account: deferredInAcc,
                                        accountId: deferredInAcc.id,
                                        amount: itemAmount * -1, // qty*avg_cost ,
                                        exchangeAmount: itemXAmount, //,
                                        type: nature,
                                        typeAs: "item",
                                    });
                                }
                            }
                        } else {
                            if (item.hasOwnProperty("costOfGoodsSoldAcc")) {
                                if (item.costOfGoodsSoldAcc.hasOwnProperty("id")) {
                                    let costOfGoodsSoldAcc = item.costOfGoodsSoldAcc;
                                    this.jRaw.push({
                                        id: costOfGoodsSoldAcc.id + "-" + nature,
                                        line: new ItemLineModel(value),
                                        description: this.purchase.journalNote,
                                        account: item.costOfGoodsSoldAcc,
                                        accountId: item.costOfGoodsSoldAcc.id,
                                        amount: itemAmount, // qty*avg_cost ,
                                        exchangeAmount: itemXAmount, //xAmount,
                                        type: nature,
                                        typeAs: "item",
                                    });
                                }
                            }
                        }
                    } else if (item.type === "Variant") {
                        if (item.hasOwnProperty("inventoryAcc")) {
                            if (item.inventoryAcc.hasOwnProperty("id")) {
                                let inventoryAcc = item.inventoryAcc;
                                this.jRaw.push({
                                    id: inventoryAcc.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    description: this.purchase.journalNote,
                                    account: item.inventoryAcc,
                                    accountId: item.inventoryAcc.id,
                                    amount: itemAmount, // qty*avg_cost ,
                                    exchangeAmount: itemXAmount, //xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                    } else if (item.type === "Fixed Asset") {
                        if (item.hasOwnProperty("assetAcc")) {
                            if (item.assetAcc.hasOwnProperty("id")) {
                                let assetAcc = item.assetAcc;
                                this.jRaw.push({
                                    id: assetAcc.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    description: this.purchase.journalNote,
                                    account: item.assetAcc,
                                    accountId: item.assetAcc.id,
                                    amount: itemAmount, // qty*avg_cost ,
                                    exchangeAmount: itemXAmount, //xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                    } else if (item.type === "Transaction Item") {
                        if (item.hasOwnProperty("account")) {
                            if (item.account.hasOwnProperty("id")) {
                                this.jRaw.push({
                                    id: item.account.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    description: this.purchase.journalNote,
                                    account: item.account,
                                    accountId: item.account.id,
                                    amount: itemAmount, // qty*avg_cost ,
                                    exchangeAmount: itemXAmount, //xAmount,
                                    type: nature,
                                    typeAs: "item",
                                });
                            }
                        }
                    }
                }
            });

            let total =
                kendo.parseFloat(subTotal) -
                kendo.parseFloat(discountTotal) +
                kendo.parseFloat(totalTax);
            this.purchase.subTotal = subTotal;
            this.purchase.totalTaxAmount = kendo.parseFloat(totalTax);
            this.purchase.discountTotal = kendo.parseFloat(discountTotal);
            if (this.purchase.specificDiscountItem) {
                discountInvoice = this.autoCalculateDiscount(
                    this.purchase.specificDiscountItem,
                    kendo.parseFloat(subTotal)
                );
                discountInvoice = discountInvoice ? discountInvoice : 0;
            }
            // this.onOtherChargeChange()
            this.purchase.total =
                kendo.parseFloat(total) -
                discountInvoice +
                kendo.parseFloat(this.purchase.otherChargeAmount);
            this.purchase.remainingAmount =
                kendo.parseFloat(this.purchase.total) -
                kendo.parseFloat(this.purchase.depositDeduction) -
                parseFloat(withholdingTaxAmount);
            this.purchase.amountDue =
                kendo.parseFloat(this.purchase.total) -
                kendo.parseFloat(this.purchase.depositDeduction) -
                parseFloat(withholdingTaxAmount);
            this.purchase.exchangeAmount =
                kendo.parseFloat(this.purchase.amountDue) *
                kendo.parseFloat(this.purchase.txnRate);
            // window.console.log('Exchange Amount', this.purchase.exchangeAmount, this.purchase.amountDue)
            this.autoCalculateTaxByType(taxList);
            this.supplierDiscountItem = this.removeDuplicate(discountItem);
            // window.console.log('discount ', this.customerDiscountItem)
            // todo: raw Journal
            const apAcc = this.purchase.apAcc || {};
            if (this.purchase.amountDue * -1 > 0) {
                nature = "dr";
            } else {
                nature = "cr";
            }
            if (apAcc) {
                if (apAcc.hasOwnProperty("id")) {
                    this.jRaw.push({
                        id: apAcc.id + "-" + nature,
                        line: new ItemLineModel({}),
                        description: this.purchase.journalNote,
                        account: apAcc,
                        accountId: apAcc.id,
                        exchangeAmount: this.purchase.exchangeAmount * -1,
                        amount: this.purchase.amountDue * -1,
                        type: nature,
                        typeAs: "ap",
                    });
                }
            }
            const specificDisc = this.purchase.specificDiscountItem;
            if (this.purchase.specificDiscountTotal * -1 > 0) {
                nature = "dr";
            } else {
                nature = "cr";
            }
            // window.console.log(specificDisc, 'specificDisc', this.purchase.specificDiscountTotal)
            if (specificDisc) {
                if (specificDisc.hasOwnProperty("account")) {
                    if (specificDisc.account) {
                        if (specificDisc.hasOwnProperty("id")) {
                            this.jRaw.push({
                                id: specificDisc.account.id + "-" + nature,
                                line: new ItemLineModel({}),
                                description: "Purchase Discount",
                                account: specificDisc,
                                accountId: specificDisc.account.id,
                                exchangeAmount:
                                    kendo.parseFloat(this.purchase.specificDiscountTotal) *
                                    kendo.parseFloat(this.purchase.txnRate) *
                                    -1,
                                amount: this.purchase.specificDiscountTotal * -1,
                                type: nature,
                                typeAs: "discount",
                            });
                        }
                    }
                }
            }

            if (this.purchase.depositDeduction * -1 > 0) {
                nature = "dr";
            } else {
                nature = "cr";
            }
            if (this.purchase.depositDeduction) {
                if (this.purchase.depositDeduction > 0) {
                    const purchaseDepositAcc = this.vendor.purchaseDepositAcc || {};
                    if (purchaseDepositAcc) {
                        if (purchaseDepositAcc.hasOwnProperty("id")) {
                            this.jRaw.push({
                                id: purchaseDepositAcc.id + "-" + nature,
                                description: "Purchase Deposit",
                                line: new ItemLineModel({}),
                                account: purchaseDepositAcc,
                                accountId: purchaseDepositAcc.id,
                                exchangeAmount: this.purchase.exchangeDepositDeduction * -1,
                                amount: this.purchase.depositDeduction * -1,
                                type: nature,
                                typeAs: "deposit",
                            });
                        }
                    }
                }
            }
            if (this.mOtherCharge.length > 0) {
                let otherCharge = 0;
                this.mOtherCharge.forEach((m) => {
                    otherCharge = this.autoCalculateDiscount(m, this.purchase.subTotal);
                    if (otherCharge > 0) {
                        nature = "dr";
                    } else {
                        nature = "cr";
                    }
                    if (m) {
                        if (m.hasOwnProperty("account")) {
                            if (m.account.hasOwnProperty("id")) {
                                const account = m.account;
                                if (account) {
                                    if (account.hasOwnProperty("id")) {
                                        this.jRaw.push({
                                            id: account.id + "-" + nature,
                                            line: new ItemLineModel({}),
                                            description: "Other Charge",
                                            account: account,
                                            accountId: account.id,
                                            exchangeAmount:
                                                otherCharge * kendo.parseFloat(this.purchase.txnRate),
                                            amount: otherCharge,
                                            type: nature,
                                            typeAs: "otherCharge",
                                        });
                                    }
                                }
                            }
                        }
                    }
                });
                // this.purchase.otherChargeAmount = otherCharge
                window.console.log(this.mOtherCharge);
            }
            // todo: end raw Journal
            // window.console.log(JSON.stringify(this.purchase), 'purchase')
            this.shrinkData(this.jRaw);
            // const unique = this.removeDuplicate(this.accounts)
            // window.console.log(unique, 'unique')
        },
        shrinkData(obj) {
            const uniques = this.removeDuplicate(
                obj
            ); /*[...new Set(accountId.map(i => {
                return {
                    id_: i.id_,
                    id: i.id,
                    type: i.type
            }))]*/
            uniques.forEach((n) => {
                const found = obj.filter((m) => m.id === n.id);
                let amount = 0;
                found.forEach((z) => {
                    amount += parseFloat(z.amount || 0);
                });
                n.amount = parseFloat(amount); //this.numberFormat(amount)
                n.exchangeAmount = parseFloat(
                    parseFloat(amount * parseFloat(this.purchase.txnRate))
                ); //this.numberFormat(amount * parseFloat(this.purchase.txnRate)) //.toFixed(this.saleFormContent.decimal)
            });
            this.jRaw = uniques;
            let dr = 0,
                cr = 0;
            this.jRaw.forEach((j) => {
                switch (j.type) {
                    case "cr":
                        cr += parseFloat(j.amount);
                        break;
                    case "dr":
                        dr += parseFloat(j.amount);
                        break;
                    default:
                        break;
                }
            });
            this.purchase.dr = dr;
            this.purchase.cr = cr;
            window.console.log("dr=", dr, "cr=", cr, "dr+cr = ", dr + cr);
            // window.console.log(JSON.stringify(uniques), 'uniques')
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
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(value, `n${this.purchaseFormContent.decimal}`);
        },
        autoCalculateDiscount(discountItem, subTotal) {
            if (discountItem) {
                const nature = discountItem.nature;
                const amount = discountItem.amount;
                if (nature === "Amount") {
                    return kendo.parseFloat(amount);
                } else if (nature === "Percentage") {
                    return subTotal * (kendo.parseFloat(amount) / 100);
                }
            }
        },
        autoCalculateTax(tax, amount) {
            if (tax) {
                var formula = tax.formula;
                var inAmt = kendo.parseFloat(amount);
                var nAmt = kendo.parseFloat(amount);
                var taxBase = kendo.parseFloat(tax.taxBase) / 100;
                var rate = kendo.parseFloat(tax.rate) / 100;
                var total = eval(formula);
                window.console.log(inAmt, nAmt, taxBase, rate, formula, total);
                return total;
            }
            // return 0
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0],
                    buom = {},
                    conversionRate = 1;
                switch (e.field) {
                    case "item":
                        window.console.log(dataRow,'item change')
                        // this.attribute_ = this.attributes.filter(m => m.type.id === dataRow.variant.id)
                        dataRow.set("description", dataRow.item.purchaseDescription);
                        break;
                    case "cost":
                        try {
                            dataRow.set("cost", parseFloat(dataRow.cost));
                            dataRow.set(
                                "amount",
                                parseFloat(dataRow.cost) * parseFloat(dataRow.qty)
                            );
                            // window.console.log('price',dataRow.price)
                        } catch (e) {
                            window.console.log("cost", dataRow.cost, e);
                            dataRow.set("cost", 0);
                            dataRow.set("amount", 0);
                        }
                        break;
                    case "uom":
                        try {
                            buom = dataRow.uom.buom || {};
                            conversionRate = dataRow.uom.conversionRate || 1;
                            dataRow.set("cost", parseFloat(dataRow.uom.cost));
                            dataRow.set("buom", buom);
                            dataRow.set("conversionRate", parseFloat(conversionRate));
                            dataRow.set(
                                "amount",
                                parseFloat(dataRow.uom.cost) * parseFloat(dataRow.qty)
                            );
                        } catch {
                            dataRow.set("cost", 0);
                            dataRow.set("buom", {});
                            dataRow.set("conversionRate", 1);
                            dataRow.set("amount", 0);
                        }
                        break;
                    case "qty":
                        try {
                            dataRow.set("cost", parseFloat(dataRow.cost));
                            dataRow.set(
                                "amount",
                                parseFloat(dataRow.cost) * parseFloat(dataRow.qty)
                            );
                        } catch {
                            dataRow.set("cost", 0);
                            dataRow.set("amount", 0);
                        }
                        break;
                    case "otherTax":
                        // window.console.log("--", dataRow)
                        break;
                    default:
                        break;
                }
                if (e.field) {
                    // window.console.log('dataRow', dataRow)
                    this.autoCalculate();
                }
            }
        },
        ServiceDateEditor(container, options) {
            kendo
                .jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker();

            // let ds = this.$refs.itemLineDS.kendoWidget()
            // window.console.log(ds.data())
            // // const dateString = kendo.toString((new Date(options.model.items.serviceDate)), this.itemLine.dateFormat)
            // // const dateString = kendo.toString(options.model.items.serviceDate)
            // const $input = $("<input value=" + options.model.serviceDate + " />").appendTo(container)
            // $input.kendoDatePicker()
            // // $input.appendTo(container)
            // // options.model.items.serviceDate = dateString
            // window.console.log($input)
        },
        ServiceDateToEditor(container, options) {
            kendo
                .jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDatePicker();
        },
        ItemDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate:
                        '<div class="dropdown-header k-widget k-header">' +
                        "<span>Items </span>" +
                        "<span></span>" +
                        "</div>",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: this.itemList,
                });
        },
        UOMDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "uom.name",
                    dataValueField: "uom.id",
                    cascadeFrom: "item",
                    template: "<span>#=uom.name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: uomPriceHandler.uomPriceByPriceLevelURL(
                                    "id=" +
                                    options.model.item.id +
                                    "&plId=" +
                                    this.purchase.priceLevel.id +
                                    "&date=" +
                                    this.txnDate
                                ),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    // name: {type: "string"},
                                    // sku: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                        // data: this.variants
                    }),
                });
        },
        DiscountItemDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "id",
                    cascadeFrom: "item",
                    template: "<span>#=code# - #=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: discountItemHandler.getURL(DISCOUNT_TYPE),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    // name: {type: "string"},
                                    // sku: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                    }),
                });
        },
        VatTaxDropDownEditor(container, options) {
            kendo
                .jQuery('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "defaultTax",
                    dataValueField: "id",
                    template: "<span>#=defaultTax#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.tax,
                    }),
                });
        },
        EmployeeDropDownEditor(container, options) {
            kendo
                .jQuery('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoMultiSelect({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    suggest: true,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "id",
                    headerTemplate:
                        '<div class="dropdown-header k-widget k-header">' +
                        "<span>Employee </span>" +
                        "<span></span>" +
                        "</div>",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        serverFiltering: true,
                        transport: {
                            read: {
                                url: employeeHandler.searchURL(),
                            },
                            dataType: "json",
                        },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {type: "string"},
                                    name: {type: "string"},
                                    firstName: {type: "string"},
                                    lastName: {type: "string"},
                                },
                            },
                            data: function (response) {
                                return response.data;
                            },
                            total: function (response) {
                                return response.data.count;
                            },
                        },
                    }),
                });
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        addRow() {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                total = ds.total();
            this.itemLine.id = itemLinePrefix + uuid.v1();
            this.itemLine.decimalFormat = "n" + this.purchaseFormContent.decimal;
            ds.insert(total, this.itemLine);
            // this.itemLines.push(this.itemLine)
            // window.console.log('item Line', this.itemLine)
        },
        onPaymentTermChanged() {
            this.onInvoiceDateChanged();
        },
        onInvoiceDateChanged() {
            if (this.vendor) {
                if (this.purchase.hasOwnProperty("paymentTerm")) {
                    if (this.purchase.paymentTerm.hasOwnProperty("netDue")) {
                        const netDue = this.purchase.paymentTerm.netDue;
                        const someDate = new Date(this.txnDate);
                        someDate.setDate(someDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
                        this.purchase.dueDate = someDate.toISOString().substr(0, 10);
                        // window.console.log('im', someDate, netDue)
                    }
                }
            }
            if (this.$route.params.id === undefined) {
                this.generateNumber();
            }
            this.loadTransactionRate();
        },
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("purchase").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.purchaseTypes = res.data.data;
                            if (this.purchaseTypes.length > 0) {
                                this.purchase.transactionType = this.purchaseTypes[0];
                                if (this.$route.params.id === undefined) {
                                    this.generateNumber();
                                }
                            }
                        }
                    });
                }, 100);
            });
        },
        async loadPriceLevel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    priceLevelHandler.get().then((res) => {
                        this.priceLevel = res;
                        if (this.priceLevel.length > 0) {
                            this.purchase.priceLevel = this.priceLevel[0];
                        }
                    });
                }, 100);
            });
        },
        async loadDiscountItem() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    discountItemHandler.list(DISCOUNT_TYPE).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.specificDiscountItem = res.data.data;
                        }
                    });
                }, 100);
            });
        },
        async loadOtherCharge() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    otherChargeHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            this.otherChargeList = res.data.data;
                        }
                    });
                }, 100);
            });
        },
        async loadAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    accountHandler.getAll().then((res) => {
                        this.showLoading = false;
                        //Receivable Account
                        window.console.log(res, 'account ')
                        this.accPayable = res.data
                            .filter((m) => m.account_type.number === 18)
                            .map((itm) => {
                                return {
                                    id: itm.uuid,
                                    uuid: itm.uuid,
                                    name: itm.name,
                                    local_name: itm.local_name,
                                    number: itm.number,
                                    is_taxable: itm.is_taxable,
                                    banhjiAccCode: itm.banhjiAccCode,
                                    group_code: itm.group_code,
                                    parent_account: itm.parent_account,
                                    type_code: itm.type_code,
                                    account_type: itm.account_type,
                                };
                            });
                        if (this.accPayable.length > 0) {
                            this.purchase.apAcc = this.accPayable[0];
                        }
                    });
                }, 100);
            });
        },
        async loadPaymentTerm() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    paymentTermHandler.getAll().then((res) => {
                        this.showLoading = false;
                        this.paymentTerms = res.data.data;
                        window.console.log(this.paymentTerms, 'pay term')
                        if (this.paymentTerms.length > 0) {
                            this.purchase.paymentTerm = this.paymentTerms[0];
                        }
                    });
                }, 100);
            });
        },
        async loadLocation() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.locations = [];
                    locationHandler
                        .list()
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.locations = res.data.data;
                                if (this.locations.length > 0) {
                                    this.purchase.location = this.locations[0];
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 100);
            });
        },
        async loadProjectByCustomer() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.vendor) {
                        // projectHandler.getBySupplier(this.vendor.id).then(res => {
                        projectHandler
                            .list()
                            .then((res) => {
                                this.showLoading = true;
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.customerProjects = res.data.data;
                                    if (this.customerProjects.length > 0) {
                                        this.purchase.project = this.customerProjects[0];
                                    }
                                }
                            })
                            .catch();
                        {
                            this.showLoading = false;
                        }
                    }
                }, 100);
            });
        },
        async loadCustomerBalance(id) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = id + "?type=bal";
                    this.purchase.currentBalance = 0;
                    billingHandler
                        .balance(strFilter)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data;
                                if (data.length > 0) {
                                    this.purchase.currentBalance = data[0].balance;
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 100);
            });
        },
        async loadCustomerDepositBalance(id) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = id + "?type=dep";
                    this.purchase.depositAmount = 0;
                    this.purchase.depositDeduction = 0;
                    billingHandler
                        .balance(strFilter)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data;
                                if (data.length > 0) {
                                    const amountDeposit = data[0].balance;
                                    window.console.log(amountDeposit, "bala");
                                    this.purchase.depositAmount =
                                        amountDeposit / this.purchase.txnRate;
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 100);
            });
        },
        creditLimitUsage(balance, creditLimit) {
            return (
                kendo.toString(
                    (balance / creditLimit) * 100,
                    `n${this.purchaseFormContent.decimal}`
                ) + " %"
            );
        },
        async loadEmployeeCenter() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.employees = [];
                    employeeHandler
                        .center(undefined)
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.employees = res.data.data;
                                if (this.employees.length > 0) {
                                    this.purchase.employee = this.employees[0];
                                }
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 100);
            });
        },
        async loadTax() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    settingHandler.get().then((res) => {
                        const taxes = res;
                        this.tax = taxes.filter(
                            (m) =>
                                (m.taxType.typeId === 1 ||
                                    m.taxType.typeId === 10 ||
                                    m.taxType.typeId === 2) &&
                                m.transactionType === "Purchase"
                        ); // valuable tax
                    });
                }, 100);
            });
        },
        async onSaveClose(saveSend) {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            if (this.transactionRate === 0) {
                this.$snotify.error(i18n.t("set_exchange_rate"));
                return;
            }

            let id = "";
            if (this.vendor.hasOwnProperty("id")) {
                id = this.vendor.id || "";
            }
            if (id === "") {
                this.$snotify.error("vendor is required");
                return;
            }
            if (this.purchase.billNo == "") {
                this.$snotify.error("Vendor Invoice No is required");
                return;
            }
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            let ds = this.$refs.itemLineDS.kendoWidget();
            let d1 = ds.data();
            let dataValidate = 0;
            d1.forEach((value, index) => {
                if (
                    value.item == undefined ||
                    value.item.id == undefined ||
                    value.item.id == null ||
                    value.uom == undefined ||
                    value.uom.id == undefined ||
                    value.uom.id == null
                ) {
                    this.$snotify.error(
                        "Please check Item or UOM  on row " + (index + 1)
                    );
                } else {
                    dataValidate += 1;
                }
            });
            if (d1.length == dataValidate) {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        let isAutoGenerate = 1;
                        if (this.$route.params.id) {
                            const tranDate = new Date(this.txnDate);
                            const tranDateInvoice = new Date(this.purchase.transactionDate);
                            const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                            const tranDateInvoiceM =
                                tranDateInvoice.getFullYear() + tranDateInvoice.getMonth();
                            if (tranDateM === tranDateInvoiceM) {
                                isAutoGenerate = 0;
                            }
                        }
                        this.autoCalculate();
                        let itemLineDS = this.$refs.itemLineDS.kendoWidget();
                        const dataRow = itemLineDS
                            .data()
                            .filter((o) => o.amount > 0)
                            .map((n) => {
                                return new ItemLineModel(n);
                            });
                        if (dataRow.length > 0) {
                            let data = {
                                id: this.purchase.id ? this.purchase.id : "",
                                uuid: this.purchase.uuid ? this.purchase.uuid : "",
                                journal_uuid: this.purchase.journal_uuid
                                    ? this.purchase.journal_uuid
                                    : "",
                                jRaw: this.jRaw,
                                type: TRANSACTION_TYPE,
                                number: this.purchase.number,
                                abbr: this.purchase.transactionType.abbr,
                                transactionDate: this.txnDate,
                                dueDate: this.purchase.dueDate,
                                monthOf: this.purchase.monthOf,
                                paymentCode: this.purchase.paymentCode,
                                billNo: this.purchase.billNo,
                                billDate: this.billDate,
                                supplier: this.purchase.supplier,
                                transactionType: this.purchase.transactionType,
                                paymentTerm: this.purchase.paymentTerm,
                                discountPromotion: {},
                                apAcc: this.purchase.apAcc,
                                currency: this.purchase.currency,
                                txnRate: this.purchase.txnRate,
                                rate: 1,
                                exchangeRate: this.purchase.exchangeRate,
                                exchangeAmount: this.purchase.exchangeAmount,
                                priceLevel: this.purchase.priceLevel,
                                itemLines: dataRow,
                                segment: this.purchase.segment,
                                location: this.purchase.location,
                                project: this.purchase.project,
                                employee: this.purchase.employee,
                                billingAddress: this.purchase.billingAddress,
                                deliveryAddress: this.purchase.deliveryAddress,
                                deliveryDateTime: this.purchase.deliveryDateTime,
                                transactionNote: this.purchase.transactionNote,
                                journalNote: this.purchase.journalNote,
                                subTotal: this.purchase.subTotal,
                                total: this.purchase.total,
                                discountTotal: this.purchase.discountTotal,
                                specificDiscountTotal: this.purchase.specificDiscountTotal,
                                deliveryFee: this.purchase.deliveryFee,
                                totalTaxAmount: this.purchase.totalTaxAmount,
                                depositAmount: this.purchase.depositAmount,
                                depositDeduction: this.purchase.depositDeduction,
                                remainingAmount: this.purchase.remainingAmount,
                                amountDue: this.purchase.amountDue,
                                currentBalance: this.purchase.currentBalance,
                                balance: this.purchase.balance,
                                creditLimit: this.purchase.creditLimit,
                                saveOption: this.purchase.saveOption,
                                status: 1,
                                approvedBy: this.purchase.approvedBy,
                                formTemplate: {},
                                specificDiscountItem: this.purchase.specificDiscountItem,
                                otherCharge: this.mOtherCharge,
                                otherChargeAmount: this.purchase.otherChargeAmount,
                                taxListTotal: this.taxListTotal,
                                supplierDiscountItem: this.supplierDiscountItem,
                                createdAt: this.purchase.createdAt,
                                loggedUser: this.loggedUser,
                                saveSend: saveSend,
                                isAutoGenerate: isAutoGenerate,
                                actionType: this.$route.params.id
                                    ? this.$route.query.type
                                    : "new",
                            };
                            if (this.$route.query.type === "recurring") {
                                data.id = "";
                            }
                            this.showLoading = true;
                            billingHandler
                                .createPurchase(data)
                                .then((response) => {
                                    if (response.data.statusCode === 201) {
                                        // this.close(response.data.data)
                                        // this.$refs.form.reset()
                                        this.showLoading = false;
                                        this.$snotify.success("Successfully");
                                        this.close(response.data.data);
                                    }
                                })
                                .catch((e) => {
                                    this.showLoading = false;
                                    this.$snotify.error("Something went wrong");
                                    this.errors.push(e);
                                });
                        }
                    }, 50);
                });
            }
        },
        async loadPurchaseFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    purchaseFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.purchaseFormContent = data[0];
                                this.decimalFormat = "n" + this.purchaseFormContent.decimal;
                                this.initData();
                            }
                        }
                    });
                }, 50);
            });
        },
        close(data) {
            if (this.$route.params.id === undefined) {
                this.$router.push({
                    name: "Vendors",
                    params: {
                        data: data,
                    },
                });
            } else {
                window.history.go(-1);
                // this.$router.push({
                //     path: "invoice_view",
                //     name: "Invoice View",
                //     params: {
                //         data: data,
                //     }
                // })
            }
            // window.console.log(data, 'data')
        },
        saveNew() {
        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#gridItemLine").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
                this.autoCalculate();
            }
        },
        generateNumber() {
            if (this.$route.params.id) {
                const tranDate = new Date(this.txnDate);
                const tranDateInvoice = new Date(this.purchase.transactionDate);
                const tranDateM = tranDate.getFullYear() + tranDate.getMonth();
                const tranDateInvoiceM =
                    tranDateInvoice.getFullYear() + tranDateInvoice.getMonth();
                if (tranDateM === tranDateInvoiceM) {
                    this.purchase.referenceNo = this.referenceNo;
                    return;
                }
            }

            if (this.txnDate !== "" && this.purchaseTypes.length > 0) {
                let data = {
                    abbr: this.purchase.transactionType.abbr,
                    structure: this.purchase.transactionType.structure,
                    transactionDate: this.txnDate,
                    sequcencing: this.purchase.transactionType.sequcencing,
                    type: "Purchase",
                    entity: 1,
                };
                billingHandler
                    .lastNumber(data)
                    .then((response) => {
                        if (response.data.statusCode === 200) {
                            const res = response.data.data;
                            const lastNumber = this.zeroPad(
                                parseInt(res.lastNumber),
                                this.purchase.transactionType.format
                            );
                            const number =
                                res.suffix +
                                this.purchase.transactionType.numberSeparator +
                                lastNumber;
                            this.purchase.number = number;
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
        suffix(transactionDate) {
            return kendo.toString(new Date(transactionDate), `yymm`);
        },
        errorMessage() {
        },
        accountDropDownEditor() {
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
        hideSmallSidebar() {
            this.isHideBar = !this.isHideBar;
        },
        requestData(skip, filter, baseUrl) {
            const url = baseUrl + `?filter=${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.afterFetch);
        },
        requestData_(skip, filter, baseUrl) {
            const url = baseUrl + `/${filter}`;
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.afterFetch_);
        },
        onChange(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.vendor = value;
            this.purchase.supplier = value;
            // window.console.log(this.purchase.customer, 'Changed')
            // this.invoice = value
            this.purchase.apAcc = value.hasOwnProperty("apAcc") ? value.apAcc : {};
            this.purchase.paymentTerm = value.hasOwnProperty("paymentTerm")
                ? value.paymentTerm
                : {};
            this.purchase.priceLevel = value.hasOwnProperty("priceLevel")
                ? value.priceLevel
                : {};
            const baseCurrency = value.hasOwnProperty("baseCurrency")
                ? value.baseCurrency
                : {};
            if (baseCurrency.hasOwnProperty("code")) {
                this.baseCurrencyCode = " " + baseCurrency.code;
            }
            this.loadTransactionRate();
            this.billingAddress = value.hasOwnProperty("billingAddress")
                ? value.billingAddress
                : [];
            this.deliveryAddress = value.hasOwnProperty("deliveryAddress")
                ? value.deliveryAddress
                : [];
            if (this.billingAddress.length > 0) {
                this.purchase.billingAddress = this.billingAddress[0];
            }
            if (this.deliveryAddress.length > 0) {
                this.purchase.deliveryAddress = this.deliveryAddress[0];
            }
            this.onInvoiceDateChanged();
            // this.loadProjectByCustomer()
            this.loadCustomerBalance(this.vendor.id);
            const creditLimit = value.hasOwnProperty("creditLimit")
                ? value.creditLimit
                : 0;
            this.purchase.creditLimit = kendo.parseFloat(creditLimit);
            // window.console.log(value, 'value')
        },
        onEmployeeChanged(event) {
            const value = event.value;
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.mEmployee = value;
            this.purchase.employee = value;
        },
        afterFetch(json) {
            this.vendorList = json.data;
        },
        afterFetch_(json) {
            this.employees = json.data;
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            this.requestData(0, filter, this.cusBaseUrl);
            this.filter = filter;
        },
        onEmployeeFilterChanged(event) {
            const filter = event.filter.value;
            this.requestData_(0, filter, this.empBaseUrl);
            this.filter_ = filter;
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadViewCreditPurchase();
            } else {
                this.addRow();
            }
        },
        async loadViewCreditPurchase() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true;
                    if (this.$route.params.id) {
                        billingHandler
                            .viewPurchase(this.$route.params.id)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.purchase = res.data.data[0];
                                    this.referenceNo = this.purchase.referenceNo;
                                    this.txnDate = new Date(this.purchase.transactionDate);
                                    this.vendor = this.purchase.supplier;
                                    this.mEmployee = this.purchase.employee;
                                    this.taxListTotal = this.purchase.taxListTotal;
                                    this.itemLines = this.purchase.itemLines;
                                    this.mOtherCharge = this.purchase.otherCharge;
                                    this.jRaw = this.purchase.jRaw || [];
                                    for (let i = 0; i < this.mOtherCharge.length - 1; i++) {
                                        this.addSelect();
                                    }
                                    const priceLevel = this.purchase.hasOwnProperty("priceLevel")
                                        ? this.purchase.priceLevel
                                        : {};
                                    if (priceLevel.hasOwnProperty("currency")) {
                                        if (priceLevel.currency.hasOwnProperty("code")) {
                                            this.currencyCode = priceLevel.currency.code;
                                        }
                                    }
                                    // this.loadProjectByCustomer()
                                    if (this.vendor) {
                                        if (this.vendor.hasOwnProperty("id")) {
                                            this.loadCustomerBalance(this.vendor.id);
                                        }
                                    }
                                    if (this.$route.query.type === "recurring") {
                                        if (this.$route.params.hasOwnProperty("transactionDate")) {
                                            window.console.log("type", this.$route.params);
                                            this.purchase.transactionDate = new Date(
                                                this.$route.params.transactionDate
                                            );
                                            this.txnDate = new Date(
                                                this.$route.params.transactionDate
                                            );
                                            this.onInvoiceDateChanged();
                                            this.generateNumber();
                                        }
                                    }
                                }
                            })
                            .catch();
                        {
                            this.showLoading = false;
                        }
                    }
                }, 500);
            });
        },
        clear() {
            this.id = undefined;
            this.purchase = new PurchaseModel({});
            this.itemLines = [];
            this.purchase.transactionType = this.purchaseTypes[0];
            this.generateNumber();
            this.addRow();
        },
        async loadTransactionRate() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const date = new Date(this.txnDate).toISOString().substr(0, 10);
                    const priceLevel = this.purchase.priceLevel;
                    let code = "";
                    if (priceLevel.hasOwnProperty("currency")) {
                        if (priceLevel.currency.hasOwnProperty("code")) {
                            code = priceLevel.currency.code;
                        }
                    }
                    if (code !== undefined || code !== "") {
                        this.showLoading = true;
                        currencyHandler
                            .getLastExchangeRateByDate(date, code)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.exchangeRate = res.data.data[0];
                                    this.currencyCode = this.exchangeRate.code || "";
                                    this.transactionRate = this.exchangeRate.rate || 0;
                                    this.purchase.txnRate = this.exchangeRate.rate || 0;
                                    this.purchase.exchangeRate = this.exchangeRate || {};
                                    if (this.transactionRate === 0) {
                                        this.$snotify.error(i18n.t("set_exchange_rate"));
                                        return;
                                    }
                                    this.showLoading = false;
                                    this.loadCustomerDepositBalance(this.vendor.id);
                                }
                            });
                    }
                }, 100);
            });
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
                            window.console.log(s, 'segment')
                            if (s.length > 0) {
                                this.segments.push(s[0].segment)
                                this.purchase.segment = s[0].segment
                                this.businessCategory = []
                                if (s[0].productCategories.length > 0) {
                                    let self = this
                                    $.each(s[0].productCategories, function (i, v) {
                                        self.businessCategory.push(v.category.id)
                                    })
                                }
                                if (s[0].serviceCategories.length > 0) {
                                    let self = this
                                    $.each(s[0].serviceCategories, function (i, v) {
                                        self.businessCategory.push(v.category.id)
                                    })
                                }
                                this.loadItem()
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
        async loadItem() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    productVariantHandler.itemSearchURLBySegment({category: this.businessCategory}).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if(res.data.data.length > 0){
                                let self = this
                                this.itemList = []
                                $.each(res.data.data, function(i,v){
                                    if($.inArray(v.category.id, self.businessCategory) != -1) {
                                        self.itemList.push(v)
                                    }
                                })
                            }
                            window.console.log(this.itemList)
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
    },
    computed: {
        validVendor() {
            let vendor = this.vendor;
            return vendor.id !== undefined && vendor.id !== null;
        },
        disableMe() {
            return !!this.$route.params.id;
        },
    },
    watch: {
        id() {
            if (this.$route.params.id === undefined) {
                this.clear();
            } else {
                this.showLoading = true;
                this.loadViewCreditPurchase();
            }
        },
    },
    created: async function () {
        this.loadTax();
        this.loadPrefix();
        await this.loadSegment();
        this.loadLocation();
        this.loadProjectByCustomer();
    },
    mounted: async function () {
        this.requestData(0, this.filter, this.cusBaseUrl);
        await this.loadDiscountItem();
        await this.loadEmployeeCenter();
        await this.loadPaymentTerm();
        await this.loadAccount();
        await this.loadPriceLevel();
        await this.loadOtherCharge();
        await this.loadPurchaseFormContent();
    },
};
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

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
