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
                                    class="bigSide pr-2 py-0"
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
                                    <v-card outlined dense class="px-4 rounded-4 no_border" color="grayBg">
                                        <v-row>
                                            <v-col class="pb-0 pt-3" sm="4" cols="12">
                                                <label class="label  mb-0">{{ $t("supplier") }}</label>
                                                <v-col
                                                    sm="12"
                                                    cols="12"
                                                    class="kendo_dropdown_custom px-0 pb-3 pt-0"
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
                                                        :disabled="disableMe"
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

                                                <label class="label  mb-0">{{
                                                        $t("transaction_date")
                                                    }}</label>
                                                <app-datepicker
                                                    :initialDate="purchase.transactionDate"
                                                    :disabled="disableMe"
                                                    @onChanged="onInvoiceDateChanged"
                                                    @emitDate="txnDate = $event"
                                                />
                                                <label class="label mb-0">{{
                                                        $t("transaction_number")
                                                    }}</label>
                                                <v-row class="mt-1 mr-0">
                                                    <v-col sm="3" cols="3" class="pt-0 pr-0 pb-0">
                                                        <div class="code_text text-bold">
                                                            {{ abbr }}
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
                                                            :disabled="disableMe"
                                                            @click="generateNumber"
                                                        >mdi-qrcode
                                                        </v-icon>
                                                    </v-col>
                                                </v-row>
                                            </v-col>  
                                            <v-col class="pb-0 pt-3" sm="4" cols="12">
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
                                                    :rules="[(v) => !!v['id'] || 'required']"
                                                    @change="onPaymentTermChanged"
                                                    placeholder="Term"
                                                    item-text="name"
                                                    item-value="id"
                                                    return-object
                                                    outlined
                                                />
                                                <label class="label mb-0">{{
                                                        $t("vendor_invoice_date")
                                                    }}</label>
                                                <app-datepicker
                                                    :initialDate="purchase.billDate"
                                                    @emitDate="billDate = $event"
                                                />
                                            </v-col>
                                            <v-col class="pb-0 pt-3" sm="4" cols="12">
                                                <label class="label  mb-0">{{
                                                        $t("due_date")
                                                    }}</label>
                                                <app-datepicker
                                                    :initialDate="purchase.dueDate"
                                                    @emitDate="dueDate = $event"
                                                />
                                                <!-- <label class="label mb-0">{{
                                                        $t("price_level")
                                                    }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="purchase.priceLevel"
                                                    :items="priceLevel"
                                                    item-value="id"
                                                    @change="onPriceLevelChange"
                                                    :disabled="disabledSLP"
                                                    :rules="[(v) => !!v['id'] || 'required']"
                                                    item-text="name"
                                                    return-object
                                                    placeholder="Price Level"
                                                    tage="Default Price Level"
                                                    outlined
                                                /> -->
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
                                                <!-- <v-col
                                                    sm="12"
                                                    col="12"
                                                    class="d-flex justify-space-between pt-0"
                                                >
                                                    <div>
                                                        <p class="label mb-0">{{ $t("currency") }}</p>
                                                        <p class="label mb-0 mt-4">
                                                            {{ currencyCode }}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p class="label mb-0">{{ $t("rate") }}</p>
                                                        <p class="label mb-0 mt-4">
                                                            {{ transactionRate }}
                                                        </p>
                                                    </div>
                                                </v-col> -->
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pb-0 px-4">
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
                                                v-on:databound="dataBound"
                                                :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :command="{ iconClass: 'k-icon k-i-trash', text: ' ',  click: removeRow, className: 'isEditable', }"
                                                    :title="' '"
                                                    :width="70"
                                                    :headerAttributes="{ style:'text-align: left; background-color: #EDF1F5', }"
                                                />
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
                                                    :field="'item'"
                                                    :title="$t('item')"
                                                    :template="itemTemplate"
                                                    :editor="ItemDropDownEditor"
                                                    :attributes="{ class: 'isEditable'}"
                                                    :width="200"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5',}"
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
                                                    :editable=" () => { return false; }"
                                                    :template="'<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'vatTax'"
                                                    :title="$t('tax')"
                                                    :width="200"
                                                    :hidden="true"
                                                    :template="vatTemplate"
                                                    :editor="VatTaxDropDownEditor"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
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
                                                    :field="'class1'"
                                                    :title="$t('class_1')"
                                                    :hidden="!purchaseFormContent.class1"
                                                    :template="'<span>#=class1.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class1"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'class2'"
                                                    :title="$t('class_2')"
                                                    :hidden="!purchaseFormContent.class2"
                                                    :template="'<span>#=class2.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class2"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'class3'"
                                                    :title="$t('class_3')"
                                                    :hidden="!purchaseFormContent.class3"
                                                    :template="'<span>#=class3.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class3"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'class4'"
                                                    :title="$t('class_4')"
                                                    :hidden="!purchaseFormContent.class4"
                                                    :template="'<span>#=class4.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class4"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'class5'"
                                                    :title="$t('class_5')"
                                                    :hidden="!purchaseFormContent.class5"
                                                    :template="'<span>#=class5.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class5"
                                                    :headerAttributes="{
                            style:
                              'text-align: left; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: left' }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pt-1">
                                            <v-btn
                                                class="float-left btn_plus mr-2"
                                                @click="addRow"
                                            >
                                                <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col class="pt-0" sm="5" cols="6">
                                                    <v-card class="no-boxshadow pa-3 rounded-4" color="grayBg">
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
                                                                    placeholder="Address"
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
                                                                    placeholder="Address"
                                                                    outlined
                                                                />
                                                                <label class="label  mb-0">{{
                                                                        $t("pickup_delivery_date_time")
                                                                    }}</label>
                                                                <app-datepicker
                                                                    :initialDate="purchase.deliveryDateTime"
                                                                    @emitDate="deliveryDateTime = $event"
                                                                />
<!-- 
                                                                <label>{{ $t("message_on_invoice") }}</label>
                                                                <v-textarea
                                                                    class="mt-1"
                                                                    v-model="purchase.transactionNote"
                                                                    outlined
                                                                    no-resize
                                                                    height="70px"
                                                                    tage="Message on Purchase"
                                                                    placeholder="This will appear on the Purchase"
                                                                />
                                                                <label>{{ $t("message_on_journal") }}</label>
                                                                <v-textarea
                                                                    class="mt-1"
                                                                    v-model="purchase.journalNote"
                                                                    outlined
                                                                    no-resize
                                                                    height="70px"
                                                                    tage="Message on Order"
                                                                    placeholder="This will appear on the journal"
                                                                /> -->
                                                            </v-col>
                                                        </v-row>
                                                    </v-card>
                                                </v-col>
                                                <v-col class="pt-0" sm="7" cols="6">
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
                                                            <!-- <tr>
                                                                <td class="text-left pr-0">
                                                                    {{ $t("total_tax") }}
                                                                    <v-btn
                                                                        @click="dialogTax = true"
                                                                        color="primary"
                                                                        outlined
                                                                        class="text-white text-bold  float-right text-uppercase"
                                                                        style="height: 30px !important;"
                                                                    >
                                                                        {{ $t("tax") }}
                                                                    </v-btn>
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    {{ numberFormat(purchase.totalTaxAmount) }}
                                                                </td>
                                                            </tr> -->
                                                            <!-- <tr>
                                                                <td class="text-left pr-0" width="240px">
                                                                    <v-select
                                                                        class="mt-3"
                                                                        v-model="purchase.specificDiscountItem"
                                                                        :items="specificDiscountItem"
                                                                        item-text="name"
                                                                        @change="onSpecificDiscountChanged"
                                                                        item-value="id"
                                                                        return-object
                                                                        clearable
                                                                        outlined
                                                                    />
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right">
                                                                    ({{
                                                                        numberFormat(
                                                                            purchase.specificDiscountTotal
                                                                                ? purchase.specificDiscountTotal
                                                                                : 0
                                                                        )
                                                                    }})
                                                                </td>
                                                            </tr> -->
                                                            <!--                                                            <tr>-->
                                                            <!--                                                                <td class="text-left">{{ $t('delivery') }}</td>-->
                                                            <!--                                                                <td class="text-center">:</td>-->
                                                            <!--                                                                <td class="text-right">{{ invoice.deliveryFee }}</td>-->
                                                            <!--                                                            </tr>-->

                                                            <!-- <tr
                                                                v-for="(num, index) in numSelect"
                                                                :key="index"
                                                                class="hide_form_alert"
                                                            >
                                                                <td class="text-left text-uppercase pr-0">
                                                                    <v-btn
                                                                        v-if="num == 1"
                                                                        @click="addSelect"
                                                                        class="float-left mt-2 mr-1 pa-1"
                                                                        small
                                                                    >
                                                                        <v-icon
                                                                            color="primary"
                                                                            size="16"
                                                                            class="ma-1"
                                                                        >
                                                                            mdi-plus
                                                                        </v-icon>
                                                                    </v-btn>
                                                                    <v-btn
                                                                        v-if="num > 1"
                                                                        @click="removeSelect(index)"
                                                                        class="float-left mt-2 mr-1 pa-1"
                                                                        small
                                                                    >
                                                                        <v-icon
                                                                            color="primary"
                                                                            size="16"
                                                                            class="ma-1"
                                                                        >
                                                                            fa-trash
                                                                        </v-icon>
                                                                    </v-btn>
                                                                    <v-select
                                                                        class="my-2 capitalize"
                                                                        v-model="mOtherCharge[index]"
                                                                        :items="otherChargeList"
                                                                        item-text="name"
                                                                        @change="onOtherChargeChange"
                                                                        item-value="id"
                                                                        return-object
                                                                        clearable
                                                                        outlined
                                                                    />
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td
                                                                    class="text-right primary--text text-bold"
                                                                >
                                                                    {{
                                                                        numberFormat(
                                                                            onOtherAmount(mOtherCharge[index])
                                                                        )
                                                                    }}
                                                                </td>
                                                            </tr> -->
                                                            <tr>
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
                                                            <!--                                                            <tr>-->
                                                            <!--                                                                <td class="text-left text-uppercase pr-0">-->
                                                            <!--                                                                    {{ $t("total_after_withholding") }}-->
                                                            <!--                                                                </td>-->
                                                            <!--                                                                <td class="text-center">:</td>-->
                                                            <!--                                                                <td-->
                                                            <!--                                                                    class="text-right primary&#45;&#45;text text-bold"-->
                                                            <!--                                                                    id="total_"-->
                                                            <!--                                                                >-->
                                                            <!--                                                                    {{-->
                                                            <!--                                                                        numberFormat(purchase.totalAfterWithholdingTax)-->
                                                            <!--                                                                    }}-->
                                                            <!--                                                                </td>-->
                                                            <!--                                                            </tr>-->
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
                                                                        min=0
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
                                                            <!-- <tr>
                                                                <td class="text-left">{{ $t("dr") }}</td>
                                                                <td class="text-center">:</td>
                                                                <td
                                                                    class="text-right primary--text text-bold"
                                                                >
                                                                    {{ (purchase.dr) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left">{{ $t("cr") }}</td>
                                                                <td class="text-center">:</td>
                                                                <td
                                                                    class="text-right primary--text text-bold"
                                                                >
                                                                    {{ (purchase.cr) }}
                                                                </td>
                                                            </tr> -->
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
                                            outlined
                                            class="text-capitalize  black--text float-left"
                                            color="primary"
                                            @click="cancel"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <v-btn
                                            class="float-right text-capitalize  white--text"
                                            @click="onSaveClose(false)"
                                            color="primary">
                                            {{ $t("save_close") }}
                                        </v-btn>
                                        <v-btn color="secondary"
                                               style="margin-right: 10px !important"
                                               class="white--text float-right text-capitalize"
                                               @click="onSaveClose(true)" :hidden="hiddenButton">{{ $t("save_new") }}
                                        </v-btn>
                                    </v-card>
                                </v-col>
                                <!-- <v-col
                                    class="smallSide pl-2 pt-0"
                                    sm="4"
                                    style="transition: .3s ease-in;"
                                    :class="{ hide_small_bar_class: isHideBar }"
                                >
                                    <div class="d-flex justify-end">
                                        <h3
                                            style="color: #b3b5bc; font-size:20px;"
                                            v-if="!isHideBar"
                                            class="text-uppercase"
                                        >
                                        <span class="pointer" @click="Help('purchase')">
                                            {{ $t("help") }}
                                        </span>
                                            <v-icon
                                                @click="cancel()"
                                                style="cursor: pointer; color: #333; font-size: 40px;"
                                                class="float-right mt-n1"
                                            >close
                                            </v-icon>
                                        </h3>
                                    </div>
                                    <div
                                        v-if="!isHideBar"
                                        class="small_sidebar rounded-4 mt-2 px-4 pt-4 grayBg"
                                    >
                                        <v-card outlined dense class="pa-3 no_border my_card rounded-4 white--text"
                                                color="primary" height="60px">
                                            <h3 class="text-left font_13 flex-1 text-uppercase">{{
                                                    $t('amount_due')
                                                }}</h3>
                                            <h3 class="text-right flex-1 font_20 niradei_heavy">
                                                {{ numberFormat(purchase.amountDue) }} </h3>
                                        </v-card>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pt-4">
                                                <label class="label mb-0">{{ $t("segment") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="purchase.segment"
                                                    :items="segments"
                                                    item-value="id"
                                                    :rules="[(v) => !!v['id'] || 'required']"
                                                    @change="loadPurchaseOrder"
                                                    :disabled="disabledSLP"
                                                    :item-text="(item) => `${item.code} - ${item.name}`"
                                                    return-object
                                                    tage="Segment"
                                                    placeholder="Segment"
                                                    outlined=""
                                                />
                                                <label class="label mb-0">{{ $t("location") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="purchase.location"
                                                    :items="locations"
                                                    :disabled="disabledSLP"
                                                    @change="loadPurchaseOrder"
                                                    item-value="id"
                                                    :rules="[(v) => !!v['id'] || 'required']"
                                                    :item-text="(item) => `${item.code} - ${item.name}`"
                                                    return-object
                                                    tage="Location"
                                                    placeholder="bu/location"
                                                    outlined=""
                                                />
                                                <label class="label font_14">{{ $t("project") }}</label>
                                                <v-select
                                                    class=" mt-1"
                                                    v-model="purchase.project"
                                                    :items="customerProjects"
                                                    :item-text="(item) => `${item.code} - ${item.name}`"
                                                    item-value="id"
                                                    clearable
                                                    tage="Customer Project"
                                                    placeholder="project"
                                                    outlined
                                                />
                                                <label class="label font_14">{{
                                                        $t("employee")
                                                    }}</label>
                                                <v-col
                                                    sm="12"
                                                    cols="12"
                                                    class="kendo_dropdown_custom pl-0 pr-0 pb-3 pt-0"
                                                >
                                                    <dropdownlist
                                                        :data-items="employees"
                                                        @change="onEmployeeChanged"
                                                        :value="mEmployee"
                                                        :data-item-key="'id'"
                                                        :text-field="'name'"
                                                        :default-item="defaultItem"
                                                        :filterable="true"
                                                        @filterchange="onEmployeeFilterChanged"
                                                    >
                                                    </dropdownlist>
                                                </v-col>
                                                <label class="label">{{ $t("for_month_of") }}</label>
                                                <month-picker
                                                    :initialMonth="monthOf"
                                                    @emitMonth="monthOf = $event"
                                                />
                                            </v-col>
                                        </v-row>
                                        <v-divider/>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pt-1">
                                                <v-row>
                                                    <v-col sm="12" cols="12">
                                                        <label
                                                            class="label text-bold text-uppercase">{{
                                                                $t('tnc_to_be_added')
                                                            }}</label>
                                                        <LoadingMe :isLoading="showLoadingTxn" :fullPage="false"
                                                                   :myLoading="true"
                                                                   type="loading"/>
                                                        <v-row v-for="item in purchaseOrders" v-bind:key="item.id">
                                                            <v-col sm="10" cols="10" class="py-0 pr-0">
                                                                <v-card
                                                                    outlined
                                                                    color="third"
                                                                    class="px-3 py-1 white--text no-boxshadow no_border justify-left d-flex"
                                                                    style=" height: 38px">
                                                                    <p class="mb-0" style="width: 100%">
                                                            <span
                                                                class="pl-3 py-1 float-left">{{
                                                                    item.referenceNo
                                                                }}</span>
                                                                    </p>
                                                                </v-card>
                                                            </v-col>
                                                            <v-col sm="2" cols="2" class="py-0  pl-1">
                                                                <v-btn
                                                                    class="text-white text-bold float-right text-uppercase"
                                                                    outlined
                                                                    icon
                                                                    color="primary"
                                                                    style="height: 30px"
                                                                    @click="addPurchaseOrder(item)">
                                                                    <v-icon>mdi-plus</v-icon>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>

                                                <v-divider/>
                                                <v-row v-if="expenses.length >0">
                                                    <v-col sm="12" cols="12">
                                                        <div class="justify-space-between">
                                                            <label
                                                                class="label lb_bold text-bold text-uppercase">{{
                                                                    $t('additional_cost')
                                                                }}</label>
                                                            <p class="mb-2">{{ $t('total') }}:
                                                                {{ numberFormat(additionalCostTotal) }}</p>
                                                        </div>
                                                        <label class="label mb-0">{{ $t("method") }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="methods"
                                                            @change="onMethodChanged"
                                                            v-model="purchase.additionalCostMethod"
                                                            placeholder="Method"
                                                            return-object
                                                            outlined
                                                        />
                                                        <LoadingMe :isLoading="showLoadingTxnAdditionalCost"
                                                                   :fullPage="false"
                                                                   :myLoading="true"
                                                                   type="loading"/>
                                                        <v-row v-for="(item,i) in expenses" v-bind:key="item.id">
                                                            <v-col sm="10" cols="10" class="py-0 pr-0">
                                                                <v-card
                                                                    outlined
                                                                    color="third"
                                                                    class="px-2 py-2 white--text no-boxshadow d-flex justify-space-between no_border"
                                                                    style=" height: 38px">
                                                                    <p class="ma-0 font_14">
                                                                        {{ item.referenceNo || '' }}</p>
                                                                    <p class="ma-0 font_14">
                                                                        {{ numberFormat(item.exchangeAmount) || 0 }}</p>

                                                                </v-card>
                                                            </v-col>
                                                            <v-col sm="2" cols="1" class="py-0  pl-1">
                                                                <v-checkbox class="ma-0" v-model="chkChecked[i]"
                                                                            :value="item"
                                                                            :disabled="disableMe"
                                                                            @change="onCheckChanged(item)"/>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <p class="pa-3 mb-0 mt-20 detial_smallside_p font_14">
                                        {{ $t("credit_purchase_desc") }}
                                    </p>
                                </v-col> -->
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true"/>
            <v-dialog v-model="dialogTax" max-width="450px">
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("tax_list") }}</v-card-title>
                        <v-icon @click="dialogTax = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="py-0">
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
import paymentTermHandler_ from "@/scripts/paymentterm/handler/paymentTermHandler";
import creditLimitHandler from "@/scripts/creditLimit/handler/creditLimitHandler";
import saleOrderHandler from "@/scripts/transactionHandler";
import Helper from "@/helper";

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
const $ = require("jquery");

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
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const NATURE = 'purchase'
const loanHandler = require("@/scripts/loanHandler")
import {dataStore} from '@/observable/store'
export default {
    name: "CreditPurchase",
    props: ["id", "transactionDate"],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-datepicker": DatePickerComponent,
        // "month-picker": () => import("@/components/custom_templates/MonthPicker"),
        dropdownlist: DropDownList,
    },
    data: () => ({
        isEdit: false,
        showLoadingTxn: false,
        showLoadingTxnAdditionalCost: false,
        mOtherCharge: [],
        mOtherChargeAmount: [],
        purchaseOrders: [],
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
        monthOf: "",
        templates: [
            {title: "Purchase", value: "Purchase"},

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
        methods: ['Qty Based', 'Amount Based'],
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
        taxListDetail: [],
        supplierDiscountItem: [],
        lateFeeList: [],
        loggedUser: {
            id: cookie.creator,
            name: cookie.email,
        },
        exchangeRate: {},
        baseCurrencyCode: "",
        currencyCode: "",
        transactionRate: 1,
        jRaw: [],
        refFrom: [],
        isPriceLevelChanged: false,
        expenses: [],
        additionalCostTotal: 0,
        chkChecked: [],
        accWithholdingExpense: [],
        itemList: [],
        businessCategory: []
    }),
    methods: {
        dataBound: function (e) {
            const grid = kendo.jQuery("#gridItemLine").data("kendoGrid");
            const items = e.sender.items();
            if(grid){
                items.each(function () {
                    let dataItem = grid.dataItem(this);
                    $("tr[data-uid='" + dataItem.uid + "']").find('.isEditable')
                        .each(function () {
                            if (dataItem.isEditable === false) {
                                $(this).addClass("k-state-disabled");
                            }
                        });
                });
            }
        },
        onMethodChanged() {
            if (this.isItem()) {
                this.calculateAdditionalCost()
                this.autoCalculate()
            }
        },
        onCheckChanged() {
            if (this.isItem()) {
                this.additionalCostTotal = 0
                this.jRaw = []
                if (this.chkChecked) {
                    this.chkChecked.forEach(m => {
                        if (m) {
                            const xAmount = m.exchangeAmount || 0
                            this.additionalCostTotal += parseFloat(xAmount)
                        }
                    })
                    this.purchase.additionalCost = this.chkChecked
                    this.purchase.additionalCostTotal = this.additionalCostTotal
                    // if (this.purchase.additionalCostMethod === 'Qty Based') {
                    //     this.percentageApplied()
                    // } else {
                    //     this.amountApplied()
                    // }
                    this.calculateAdditionalCost()
                    this.autoCalculate()
                }
            }
        },
        onPriceLevelChange() {
            this.isPriceLevelChanged = true
            this.loadTransactionRate()
            this.clearUOMItem()
        },
        async clearUOMItem() {
            let ds = this.$refs.itemLineDS.kendoWidget()
            ds.data().map(n => {
                n.set('uom', {})
            })
            this.isPriceLevelChanged = false
        },
        async loadPaymentTermList() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.vendor) {
                        const strFilter = '?id=' + this.vendor.id + '&transactionDate=' + this.purchase.transactionDate + '&type=Vendor'
                        this.purchase.paymentTerm = {}
                        paymentTermHandler_.get(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                const terms = res.data.data
                                this.purchase.paymentTerm = terms.term
                                this.onPaymentTermChanged(0)
                            }
                        });
                    }
                }, 10);
            });
        },
        async loadCreditLimit() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    if (this.vendor) {
                        const strFilter = '?id=' + this.vendor.id + '&transactionDate=' + this.purchase.transactionDate + '&type=Vendor'
                        this.purchase.creditLimit = 0
                        creditLimitHandler.get(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                const credit = res.data.data
                                this.purchase.creditLimit = kendo.parseFloat(credit.amount || 0);
                            }
                        });
                    }
                }, 10);
            });
        },
        async observerClean(obj) {
            return Object.keys(obj).reduce(
                (res, e) => Object.assign(res, {[e]: obj[e]}),
                {}
            );
        },
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
            const vat = dataItem.vatTax || {};
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
            const deduct = parseFloat(this.purchase.depositDeduction || 0)
            if (deduct < 0) {
                this.purchase.depositDeduction = 0
            }
            if (this.purchase.depositDeduction === "" || this.purchase.depositDeduction === undefined) {
                this.purchase.depositDeduction = 0;
            }
            const deduction = parseFloat(this.purchase.depositDeduction) || 0;
            if (deduction > this.purchase.depositAmount) {
                this.purchase.depositDeduction = this.purchase.depositAmount;
            }

            this.autoCalculate();
        },
        async autoCalculate() {
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
                taxListDetail = [],
                discountItem = [],
                discountLine = [],
                inclusiveTax = 0,
                taxTypeId = 0,
                withholdingTaxAmount = 0,
                whTaxAmount = 0,
                itemSubtotal = 0,
                txnItmSubtotal = 0,
                serviceSubtotal = 0,
                itemDiscount = 0,
                serviceDiscount = 0,
                txnDiscount = 0;
            let nature = "";
            this.jRaw = [];
            const rows = ds.data().filter((m) => parseFloat(m.amount) > 0);
            rows.forEach((value) => {
                let modifierPrice = 0, incTax = 0;
                if (value.modifier) {
                    modifierPrice = kendo.parseFloat(value.modifier.price);
                }

                let discount = 0;
                if (value.discountItem) {
                    const disItemField = value.discountItem;
                    let subTo =
                        kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty);
                    discount = this.autoCalculateDiscount(value.discountItem, subTo);
                    value["discountAmount"] = discount;
                    value["discountExchangeAmount"] =
                        discount * kendo.parseFloat(this.purchase.txnRate);
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
                if (value.vatTax) {
                    // window.console.log('Vat Tax', value.tax)
                    let amt =
                        kendo.parseFloat(spTax ? spTax : 0) +
                        kendo.parseFloat(pltax ? pltax : 0) +
                        kendo.parseFloat(otherTax ? otherTax : 0) +
                        (kendo.parseFloat(value.amount ? value.amount : 0) -
                            (discount ? discount : 0));
                    vatTax = this.autoCalculateTax(value.vatTax, amt);
                    vatTax = kendo.parseFloat(vatTax) ? kendo.parseFloat(vatTax) : 0;
                    value["vatTaxAmount"] = vatTax;
                    value["vatTaxExchangeAmount"] =
                        vatTax * kendo.parseFloat(this.purchase.txnRate);
                    const tax = value.vatTax || {};
                    const baseAmount = tax.baseAmount || '';
                    window.console.log(tax, "im tax");
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            incTax = vatTax
                        } else {
                            inclusiveTax += vatTax;
                        }
                    }
                    if (value.vatTax.hasOwnProperty("taxType")) {
                        taxList.push({
                            name: value.vatTax.taxType.name,
                            amount: vatTax,
                            id: value.vatTax.taxType.id,
                        });
                        const vatTax_ = value.vatTax || {}
                        vatTax_['taxAmount_'] = vatTax
                        vatTax_['amount'] = value.amount || 0
                        vatTax_['discount'] = discount || 0
                        vatTax_['txnRate'] = this.purchase.txnRate || 1
                        vatTax_['isVat'] = 1
                        vatTax_.detail = {
                            specificTax: {},
                            publicLightingTax: {},
                            otherTax: {},
                        }
                        taxListDetail.push(vatTax_);
                    }
                    if (value.vatTax.hasOwnProperty("taxType")) {
                        const taxType = value.vatTax.taxType || {};
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
                        if (taxTypeId === 2 && baseAmount.toLowerCase() === 'net') {
                            whTaxAmount += vatTax;
                        }
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
                    const vatTaxField = value.vatTax || {};
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
                totalTax += kendo.parseFloat(spTax ? spTax : 0) + kendo.parseFloat(pltax ? pltax : 0) +
                    kendo.parseFloat(otherTax ? otherTax : 0) +
                    kendo.parseFloat(vatTax ? vatTax : 0);
                subTotal += kendo.parseFloat(value.amount) + modifierPrice - incTax;
                const amount = kendo.parseFloat(value.amount) + modifierPrice;
                const amt = this.excludeVATTaxInclusive(value.vatTax, amount, incTax)
                // const xAmount = (kendo.parseFloat(amt) * kendo.parseFloat(this.purchase.txnRate))
                const additc = value.additionalCost || 0
                const itemAmount = amt
                const itemXAmount = itemAmount * kendo.parseFloat(this.purchase.txnRate);

                const item = value.item;
                const itmType = item.type || "";
                if (itmType === "Variant") {
                    itemSubtotal +=
                        kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty);
                    itemDiscount += kendo.parseFloat(discount);
                } else if (itmType === "Service") {
                    serviceSubtotal +=
                        kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty);
                    serviceDiscount += kendo.parseFloat(discount);
                } else {
                    txnItmSubtotal +=
                        kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty);
                    txnDiscount += kendo.parseFloat(discount);
                }
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
                        const amountWithAddict = (itemAmount + (value.amountApplied || 0))
                        window.console.log('additc', additc, '-', itemAmount)
                        if (item.hasOwnProperty("inventoryAcc")) {
                            if (item.inventoryAcc.hasOwnProperty("id")) {
                                let inventoryAcc = item.inventoryAcc;
                                this.jRaw.push({
                                    id: inventoryAcc.id + "-" + nature,
                                    line: new ItemLineModel(value),
                                    description: this.purchase.journalNote,
                                    account: item.inventoryAcc,
                                    accountId: item.inventoryAcc.id,
                                    amount: amountWithAddict, // qty*avg_cost ,
                                    exchangeAmount: amountWithAddict * (this.purchase.txnRate || 1), //xAmount,
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
                //include Tax Amount
                const amountNodiscount = kendo.parseFloat(value.cost) * kendo.parseFloat(value.qty) - discount;
                const includeTaxAmount = amountNodiscount + vatTax + pltax + spTax + otherTax;
                value["includeTaxAmount"] = includeTaxAmount;
                value["includeTaxExchangeAmount"] = includeTaxAmount * kendo.parseFloat(this.purchase.txnRate);
            });
            //todo: WithholdingTax expense
            this.withholdingExpense(whTaxAmount, this.purchase.txnRate || 1)

            this.purchase.itemSubtotal = itemSubtotal;
            this.purchase.inclusiveTaxAmount = inclusiveTax;
            this.purchase.exchangeItemSubtotal = itemSubtotal * kendo.parseFloat(this.purchase.txnRate);

            this.purchase.serviceSubtotal = serviceSubtotal;
            this.purchase.exchangeServiceSubtotal =
                serviceSubtotal * kendo.parseFloat(this.purchase.txnRate);
            this.purchase.txnItmSubtotal = txnItmSubtotal;
            this.purchase.exchangeTxnItmSubtotal =
                txnItmSubtotal * kendo.parseFloat(this.purchase.txnRate);

            this.purchase.itemDiscount = itemDiscount;
            this.purchase.exchangeItemDiscount =
                itemDiscount * kendo.parseFloat(this.purchase.txnRate);
            this.purchase.serviceDiscount = serviceDiscount;
            this.purchase.exchangeServiceDiscount =
                serviceDiscount * kendo.parseFloat(this.purchase.txnRate);
            this.purchase.txnItmDiscount = txnDiscount;
            this.purchase.exchangeTxnItmDiscount =
                txnDiscount * kendo.parseFloat(this.purchase.txnRate);

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
            this.purchase.total = kendo.parseFloat(total) - discountInvoice + kendo.parseFloat(this.purchase.otherChargeAmount) //- parseFloat(withholdingTaxAmount);
            this.purchase.withholdingTaxAmount = withholdingTaxAmount
            // this.purchase.totalAfterWithholdingTax = kendo.parseFloat(this.purchase.total) - parseFloat(withholdingTaxAmount);
            this.purchase.remainingAmount = kendo.parseFloat(this.purchase.total) - kendo.parseFloat(this.purchase.depositDeduction) - parseFloat(withholdingTaxAmount);
            this.purchase.amountDue = kendo.parseFloat(this.purchase.total) - kendo.parseFloat(this.purchase.depositDeduction) - parseFloat(withholdingTaxAmount);
            this.purchase.exchangeAmount =
                kendo.parseFloat(this.purchase.amountDue) *
                kendo.parseFloat(this.purchase.txnRate);
            // window.console.log('Exchange Amount', this.purchase.exchangeAmount, this.purchase.amountDue)
            this.autoCalculateTaxByType(taxList);
            if (this.purchase.specificDiscountItem) {
                const specificDiscount = this.purchase.specificDiscountItem || {};
                if (specificDiscount.id) {
                    discountItem.push(specificDiscount);
                    discountLine.push({
                        id: specificDiscount.id,
                        name: specificDiscount.name,
                        amount: this.purchase.specificDiscountTotal,
                        exchangeAmount:
                            this.purchase.specificDiscountTotal * this.purchase.txnRate,
                    });
                }
            }
            const uniqueDiscountItem = this.removeDuplicate(discountItem);
            this.shrinkDiscountItem(uniqueDiscountItem, discountLine);
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
                                account: specificDisc.account,
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
            this.taxListDetail = taxListDetail
            this.autoCalculateTaxDetail()
            // todo: end raw Journal
            // window.console.log(JSON.stringify(this.purchase), 'purchase')

            await this.calculateAdditionalCost()
            // todo: cook journal
            this.shrinkData(this.jRaw);
            // const unique = this.removeDuplicate(this.accounts)
            // window.console.log(unique, 'unique')
        },
        withholdingExpense(amount, txnRate) {
            // if (this.isItem()) {
            if (amount > 0) {
                const nature = 'dr'
                const account = this.accWithholdingExpense || []
                if (account.length > 0) {
                    const iacc = account[0]
                    this.jRaw.push({
                        id: iacc.id + "-" + nature,
                        line: new ItemLineModel({}),
                        description: "Withholding Tax Expense",
                        account: iacc,
                        accountId: iacc.id,
                        exchangeAmount: amount * txnRate,
                        amount: amount,
                        type: nature,
                        typeAs: "Withholding",
                    });
                }
            }
            // }
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
                        cr += parseFloat(j.exchangeAmount);
                        break;
                    case "dr":
                        dr += parseFloat(j.exchangeAmount);
                        break;
                    default:
                        break;
                }
            });
            this.purchase.dr = dr;
            this.purchase.cr = cr;
            window.console.log("dr=", dr, "cr=", cr, "dr+cr = ", dr + cr);
            window.console.log(JSON.stringify(uniques), 'uniques')
        },
        shrinkDiscountItem(discountItem, discountLine) {
            let uniqueDiscountItems = [];
            const unique = this.removeDuplicate(discountItem);
            unique.forEach((m) => {
                const found = discountLine.filter((n) => n.id === m.id);
                let amount = 0,
                    exchangeAmount = 0;
                found.map((o) => {
                    amount += o.amount;
                });
                found.map((o) => {
                    exchangeAmount += o.exchangeAmount;
                });
                uniqueDiscountItems.push({
                    id: m.id,
                    name: m.name,
                    amount: amount,
                    exchangeAmount: exchangeAmount,
                });
            });
            this.supplierDiscountItem = uniqueDiscountItems;
            window.console.log(uniqueDiscountItems, "uniqueDiscountItems");
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
                    conversionRate = 1,
                    wac = 0,
                    qoh = 0,
                    amount = 0,
                    xAmount = 0;
                switch (e.field) {
                    case "item":
                        // this.attribute_ = this.attributes.filter(m => m.type.id === dataRow.variant.id)
                        dataRow.set("description", dataRow.item.description);
                        buom = dataRow.item.uom || {};
                        dataRow.set("buom", buom);
                        // dataRow.set('uom', buom)
                        // window.console.log(dataRow.item,'row')
                        // await this.inventoryBalance(dataRow, dataRow.item.id)
                        break;
                    case "cost":
                        try {
                            amount = parseFloat(dataRow.cost) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.purchase.txnRate);

                            dataRow.set("cost", parseFloat(dataRow.cost));
                            dataRow.set("amount", amount);
                            dataRow.set("exchangeAmount", xAmount);
                            // window.console.log('price',dataRow.price)
                        } catch {
                            dataRow.set("cost", 0);
                            dataRow.set("amount", 0);
                            dataRow.set("exchangeAmount", 0);
                        }
                        break;
                    case "uom":
                        if (this.isPriceLevelChanged === false) {
                            try {
                                if (dataRow.uom) {
                                    buom = dataRow.uom.buom || {};
                                    qoh = dataRow.uom.qoh || 0;
                                    conversionRate = dataRow.uom.conversionRate || 1;
                                    wac = dataRow.uom.wac || 0;
                                    dataRow.set("buom", buom);
                                    dataRow.set("wac", wac);
                                    dataRow.set("qoh", qoh);
                                    dataRow.set("conversionRate", parseFloat(conversionRate));
                                    if (dataRow.uom) {
                                        amount =
                                            parseFloat(dataRow.uom.cost) * parseFloat(dataRow.qty);
                                        xAmount = amount * parseFloat(this.purchase.txnRate);

                                        dataRow.set("cost", parseFloat(dataRow.uom.cost));
                                        dataRow.set("amount", amount);
                                        dataRow.set("exchangeAmount", xAmount);
                                    } else {
                                        amount = parseFloat(dataRow.cost) * parseFloat(dataRow.qty);
                                        xAmount = amount * parseFloat(this.purchase.txnRate);

                                        dataRow.set("cost", parseFloat(dataRow.cost));
                                        dataRow.set("amount", amount);
                                        dataRow.set("exchangeAmount", xAmount);
                                    }
                                }
                            } catch (err) {
                                window.console.log("error", err);
                                dataRow.set("buom", {});
                                dataRow.set("conversionRate", 1);
                                dataRow.set("cost", 0);
                                dataRow.set("qoh", 0);
                                dataRow.set("wac", 0);
                                dataRow.set("amount", 0);
                                dataRow.set("exchangeAmount", 0);
                            }
                        }
                        break;
                    case "qty":
                        try {
                            amount = parseFloat(dataRow.cost) * parseFloat(dataRow.qty);
                            xAmount = amount * parseFloat(this.purchase.txnRate);

                            dataRow.set("cost", parseFloat(dataRow.cost));
                            dataRow.set("amount", amount);
                            dataRow.set("exchangeAmount", xAmount);
                        } catch {
                            dataRow.set("cost", 0);
                            dataRow.set("amount", 0);
                            dataRow.set("exchangeAmount", 0);
                        }
                        break;
                    case "otherTax":
                        // window.console.log("--", dataRow)
                        break;
                    default:
                        break;
                }
                if (e.field) {
                    this.autoCalculate();
                    window.console.log('dataRow', dataRow)
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
                                    this.txnDate + "&nature=purchase"
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
            this.itemLine.isEditable = true;
            ds.insert(total, this.itemLine);

            // kendo.jQuery().addClass('edit')
            // this.itemLines.push(this.itemLine)
            // window.console.log('item Line', this.itemLine)
        },
        onPaymentTermChanged() {
            // this.onInvoiceDateChanged();
            if (this.vendor) {
                const paymentTerm = this.purchase.paymentTerm || {}
                const netDue = paymentTerm.netDue || 0;
                const someDate = new Date(this.purchase.transactionDate);
                someDate.setDate(someDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
                this.purchase.dueDate = someDate;
                // window.console.log("im", someDate, netDue);
            }
        },
        async onInvoiceDateChanged() {
            await this.loadPaymentTermList();
            await this.loadCreditLimit();
            await this.loadCustomerBalance(this.vendor.id);
            await this.onPriceLevelChange();

            this.monthOf = kendo.toString(new Date(this.txnDate), 'yyyy-MM')
            // if (this.vendor) {
            //     if (this.purchase.hasOwnProperty("paymentTerm")) {
            //         if (this.purchase.paymentTerm.hasOwnProperty("netDue")) {
            //             const netDue = this.purchase.paymentTerm.netDue;
            //             const someDate = new Date(this.txnDate);
            //             someDate.setDate(someDate.getDate() + parseInt(netDue)); //number  of days to add, e.x. 15 days
            //             this.purchase.dueDate = someDate.toISOString().substr(0, 10);
            //             // window.console.log('im', someDate, netDue)
            //         }
            //     }
            // }
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
                }, 10);
            });
        },
        async loadPriceLevel() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const strFilter = '?&nature=' + NATURE
                    priceLevelHandler.get(strFilter).then((res) => {
                        this.priceLevel = res;
                        if (this.priceLevel.length > 0) {
                            this.purchase.priceLevel = this.priceLevel[0];
                        }
                    });
                }, 10);
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
                }, 10);
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
                }, 10);
            });
        },
        async loadAccount() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    accountHandler.getAll().then((res) => {
                        this.showLoading = false;
                        //Receivable Account
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
                        this.accWithholdingExpense = res.data
                            .filter((m) => parseInt(m.banhjiAccCode) === 843000)
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
                    });
                }, 10);
            });
        },
        async loadPaymentTerm() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    paymentTermHandler.getAll().then((res) => {
                        this.showLoading = false;
                        this.paymentTerms = res.data.data;
                        if (this.paymentTerms.length > 0) {
                            this.purchase.paymentTerm = this.paymentTerms[0];
                        }
                    });
                }, 10);
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
                            } else {
                                this.showLoading = false;
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
                }, 10);
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
                                    // if (this.customerProjects.length > 0) {
                                    //     this.purchase.project = this.customerProjects[0];
                                    // }
                                } else {
                                    this.showLoading = false;
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
                }, 10);
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
                }, 10);
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
                }, 10);
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
                }, 10);
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
            await this.autoCalculate();
            d1.forEach((value, index) => {
                if (
                    value.item == undefined ||
                    value.item.id == undefined ||
                    value.item.id == null ||
                    value.uom == undefined ||
                    value.uom.uom.id == undefined ||
                    value.uom.uom.id == null
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
                                transactionDateTZ: Helper.toISODate(this.txnDate),
                                dueDate: this.purchase.dueDate,
                                monthOf: this.monthOf,
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
                                itemSubtotal: this.purchase.itemSubtotal,
                                exchangeItemSubtotal: this.purchase.exchangeItemSubtotal,
                                serviceSubtotal: this.purchase.serviceSubtotal,
                                exchangeServiceSubtotal: this.purchase.exchangeServiceSubtotal,
                                txnItmSubtotal: this.purchase.txnItmSubtotal,
                                exchangeTxnItmSubtotal: this.purchase.exchangeTxnItmSubtotal,
                                itemDiscount: this.purchase.itemDiscount,
                                exchangeItemDiscount: this.purchase.exchangeItemDiscount,
                                serviceDiscount: this.purchase.serviceDiscount,
                                exchangeServiceDiscount: this.purchase.exchangeServiceDiscount,
                                txnItmDiscount: this.purchase.txnItmDiscount,
                                exchangeTxnItmDiscount: this.purchase.exchangeTxnItmDiscount,
                                withholdingTaxAmount: this.purchase.withholdingTaxAmount || 0,
                                inclusiveTaxAmount: this.purchase.inclusiveTaxAmount || 0,
                                loggedUser: this.loggedUser,
                                saveSend: saveSend,
                                refFrom: this.purchase.refFrom || [],
                                refTo: this.purchase.refTo || [],
                                saleTaxDetail: this.purchase.saleTaxDetail || [],
                                hasAdditionalCost: this.purchase.additionalCost.length > 0,
                                additionalCost: this.purchase.additionalCost || [],
                                additionalCostMethod: this.purchase.additionalCostMethod || '',
                                additionalCostTotal: this.additionalCostTotal || 0,
                                isAutoGenerate: isAutoGenerate,
                                actionType: this.$route.params.id
                                    ? this.$route.query.type
                                    : "new",
                            };
                            if (this.$route.query.type === "recurring") {
                                data.id = "";
                            }
                            this.showLoading = true;
                            billingHandler.createPurchase(data).then((response) => {
                                if (response.data.statusCode === 201) {
                                    // this.close(response.data.data)
                                    // this.$refs.form.reset()
                                    this.showLoading = false;
                                    this.$snotify.success("Successfully");
                                    if (saveSend === true) {
                                        this.clear()
                                    } else {
                                        this.close(response.data.data);
                                    }
                                }
                            }).catch((e) => {
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
                    this.$destroy()
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
            this.purchase.paymentTerm = value.paymentTerm || {};
            this.purchase.priceLevel = value.priceLevel || {};
            const baseCurrency = value.baseCurrency || {};
            if (baseCurrency.hasOwnProperty("code")) {
                this.baseCurrencyCode = " " + baseCurrency.code;
            }
            // this.loadTransactionRate();
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
            this.expenses = []
            this.onInvoiceDateChanged();
            this.loadProjectByCustomer()
            // this.loadCustomerBalance(this.vendor.id);
            // const creditLimit = value.hasOwnProperty("creditLimit")
            //     ? value.creditLimit
            //     : 0;
            // this.purchase.creditLimit = kendo.parseFloat(creditLimit);
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
                this.clear()
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
                                    this.supplierDiscountItem = this.purchase.supplierDiscountItem || []
                                    this.jRaw = this.purchase.jRaw || [];
                                    this.expenses = this.purchase.additionalCost || [];
                                    this.additionalCostTotal = this.purchase.additionalCostTotal || 0;
                                    this.purchaseOrders = this.purchase.refFrom || [];
                                    this.monthOf = kendo.toString(
                                        new Date(this.purchase.monthOf),
                                        "yyyy-MM"
                                    );
                                    for (let i = 0; i < this.mOtherCharge.length - 1; i++) {
                                        this.addSelect();
                                    }
                                    const priceLevel = this.purchase.priceLevel || {}
                                    const currency = priceLevel.currency || {}
                                    const curCode = currency.code || ''
                                    this.currencyCode = curCode;
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
                }, 10);
            });
        },
        clear() {
            // this.loadAccount()
            this.loadPriceLevel()
            this.loadSegment();
            this.loadLocation();
            let ds = this.$refs.itemLineDS.kendoWidget();
            ds.data([]);
            this.id = undefined;
            this.vendor = {}
            this.mEmployee = {}
            this.mOtherCharge = {}
            this.purchaseOrders = []
            this.purchase = new PurchaseModel({});
            this.purchase.transactionType = this.purchaseTypes[0];
            this.monthOf = kendo.toString(new Date(this.purchase.transactionDate), 'yyyy-MM')
            this.addRow();
            this.generateNumber();
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
                    this.loadPurchaseOrder();
                }, 10);
            });
        },
        reload() {
            if (this.$route.params.id !== undefined) {
                this.loadViewCreditPurchase()
            } else {
                this.clear()
            }
        },
        async loadPurchaseOrder() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    let segmentId = "",
                        locationId = '',
                        priceLevelId = "",
                        customerId = "",
                        txnDate = "";
                    if (this.purchase.segment) {
                        segmentId = this.purchase.segment.id;
                    }
                    if (this.purchase.location) {
                        locationId = this.purchase.location.id;
                    }
                    if (this.purchase.supplier) {
                        customerId = this.purchase.supplier.id;
                    }
                    if (this.purchase.priceLevel) {
                        priceLevelId = this.purchase.priceLevel.id;
                    }
                    if (this.purchase.transactionDate) {
                        txnDate = this.purchase.transactionDate;
                    }
                    let strFilter = "";
                    if (
                        segmentId !== "" &&
                        customerId !== "" &&
                        locationId !== "" &&
                        priceLevelId !== "" &&
                        txnDate !== ""
                    ) {
                        strFilter =
                            "?id=" +
                            customerId +
                            "&segId=" +
                            segmentId +
                            "&locId=" +
                            locationId +
                            "&plId=" +
                            priceLevelId +
                            "&date=" +
                            txnDate + '&type=Purchase Order'
                    }
                    if (strFilter !== "") {
                        this.purchase.refFrom = []
                        this.showLoadingTxn = true
                        saleOrderHandler
                            .transactionFilter(strFilter)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoadingTxn = false
                                    this.purchaseOrders = res.data.data;
                                } else {
                                    this.showLoadingTxn = false
                                }
                            })
                    }
                }, 10);
            });
            await this.getExpenseBySupplier()
        },
        addPurchaseOrder(item) {
            if (item) {
                const itemLine = item.itemLines || [];
                this.refFrom.push({
                    id: item.id || '',
                    reference: item.referenceNo || ''
                })
                let ds = this.$refs.itemLineDS.kendoWidget(),
                    total = ds.total();
                itemLine.forEach((o) => {
                    this.itemLine = new ItemLineModel(o);
                    this.itemLine.id = itemLinePrefix + uuid.v1();
                    this.itemLine.decimalFormat = "n" + this.purchaseFormContent.decimal;
                    this.itemLine.sourceTransaction = {
                        id: item.id,
                        referenceNo: item.referenceNo,
                    };
                    this.itemLine.sourceTransactionRef = item.referenceNo;
                    ds.insert(total, this.itemLine);
                });
                this.itemLine = new ItemLineModel({});
                this.autoCalculate();
                const index = this.purchaseOrders.findIndex((itm) => {
                    return item.id === itm.id;
                });
                this.purchaseOrders.splice(index, 1);
                this.purchase.refFrom = this.removeDuplicate(this.refFrom)
            }
        },
        totalQty() {
            let ds = this.$refs.itemLineDS.kendoWidget()
            let qty = 0
            ds.data().filter(n => n.amount > 0).forEach(m => {
                const itm = m.item || {}
                const uom = m.uom || {}
                if (itm.id && uom.uom && itm.type === 'Variant') {
                    qty += (m.qty || 0) * (m.conversionRate || 1)
                }
            })
            window.console.log('qty', qty)
            return qty
        },
        excludeVATTaxInclusive(tax, amount, incTax) {
            if (tax) {
                const baseAmount = tax.baseAmount || '';
                const taxType = tax.taxType || {}
                const taxTypeId = taxType.typeId || 0
                if (baseAmount) {
                    if (baseAmount.toLowerCase() === "inclusive" && taxTypeId === 1) {
                        return amount - incTax
                    }
                }
            }
            return amount
        },
        totalAmount() {
            let ds = this.$refs.itemLineDS.kendoWidget()
            let amount = 0
            ds.data().filter(n => n.amount > 0).forEach(m => {
                const itm = m.item || {}
                const uom = m.uom || {}
                let incluTax = 0
                if (itm.id && uom.uom && itm.type === 'Variant') {
                    const tax = m.vatTax || {}
                    const amount_ = m.amount || 0
                    const baseAmount = tax.baseAmount || '';
                    if (baseAmount) {
                        if (baseAmount.toLowerCase() === "inclusive") {
                            incluTax = this.autoCalculateTax(tax, amount_);
                        }
                    }
                    amount += (amount_ - (incluTax || 0))
                }
            })
            window.console.log('amount x-', amount)
            return amount
        },
        percentageApplied() {
            try {
                const tAmount = this.totalAmount()
                let ds = this.$refs.itemLineDS.kendoWidget()
                ds.data().filter(n => n.amount > 0).forEach(m => {
                    const itm = m.item || {}
                    const uom = m.uom || {}
                    let incluTax = 0
                    if (itm.id && uom.uom && itm.type === 'Variant') {
                        const tax = m.vatTax || {}
                        const amount = m.amount || 0
                        const baseAmount = tax.baseAmount || '';
                        if (baseAmount) {
                            if (baseAmount.toLowerCase() === "inclusive") {
                                incluTax = this.autoCalculateTax(tax, amount);
                            }
                        }
                        const amountAfterTax = amount - (incluTax || 0)
                        const pAmount = amountAfterTax / tAmount
                        m['percentageApplied'] = pAmount
                    }
                })
                window.console.log('Qty Based--', ds.data())
            } catch (e) {
                window.console.log('error', e)
            }
        },
        amountApplied() {
            try {
                let ds = this.$refs.itemLineDS.kendoWidget()
                const adc = this.additionalCostTotal || 0
                ds.data().filter(n => n.amount > 0).forEach(m => {
                    const itm = m.item || {}
                    const uom = m.uom || {}
                    window.console.log('amountApplied==', uom.uom, '---', itm.type)
                    if (itm.id && uom.uom && itm.type === 'Variant') {
                        const percentageApplied = m.percentageApplied || 0
                        window.console.log('percentageApplied--', adc, '---', (percentageApplied * adc))
                        m['amountApplied'] = percentageApplied * adc
                    }

                })
                window.console.log('AMount Based--', ds.data())
            } catch (e) {
                window.console.log('error', e)
            }
        },
        amountAppliedQtyBased() {
            try {
                let ds = this.$refs.itemLineDS.kendoWidget()
                ds.data().filter(n => n.amount > 0).forEach(m => {
                    const itm = m.item || {}
                    const uom = m.uom || {}
                    if (itm.id && uom.uom && itm.type === 'Variant') {
                        const addc = m.additionalCost || 0
                        const qty = (m.qty || 1) * (m.conversionRate || 1)
                        m['amountApplied'] = addc * qty
                    }
                })
                window.console.log('amountAppliedQtyBased Based--', ds.data())
            } catch (e) {
                window.console.log('error', e)
            }
        },
        async calculateAdditionalCost() {
            try {
                // todo: additional Cost
                if (this.purchase.additionalCostMethod === 'Qty Based') {
                    this.percentageApplied()
                } else {
                    this.percentageApplied()
                    this.amountApplied()
                }
                if (this.purchase.additionalCostMethod === 'Qty Based') {
                    const tQty = this.totalQty()
                    const addc = this.additionalCostTotal || 0
                    let ds = this.$refs.itemLineDS.kendoWidget()
                    ds.data().filter(n => n.amount > 0).forEach(m => {
                        const itm = m.item || {}
                        const uom = m.uom || {}
                        if (itm.id && uom.uom && itm.type === 'Variant') {
                            m['additionalCost'] = addc / tQty
                        }
                    })
                    window.console.log('qty based', ds.data())
                } else {
                    let ds = this.$refs.itemLineDS.kendoWidget()
                    ds.data().filter(n => n.amount > 0).forEach(m => {
                        const itm = m.item || {}
                        const uom = m.uom || {}
                        if (itm.id && uom.uom && itm.type === 'Variant') {
                            const amountApplied = m.amountApplied || 0
                            const qty = (m.qty || 0) * (m.conversionRate || 1)
                            m['additionalCost'] = amountApplied / qty
                        }
                    })
                }
                if (this.purchase.additionalCostMethod === 'Qty Based') {
                    this.amountAppliedQtyBased()
                }
                await this.clearingAccount()
            } catch (e) {
                window.console.log('error', e)
            }
        },
        autoCalculateTaxDetail() {
            let ids = []
            this.taxListDetail.forEach(n => {
                ids.push(n.id || '')
            })
            const unique = [...new Set(ids)]
            let result = []
            unique.forEach(m => {
                let amount = 0, row = {}, discount = 0, xDiscount = 0, xAmount = 0, taxAmount = 0, xTaxAmount = 0
                let taxDetail = [], isVat = 0
                const found = this.taxListDetail.filter(n => n.id === m)
                // window.console.log('taxListDetailids', found)
                found.forEach(k => {
                    row = k
                    if (k.isVat === 1) {
                        isVat = 1
                        const detail_ = k.detail || {}
                        taxDetail.push(detail_)

                    }
                    taxAmount += k.taxAmount_ || 0
                    xTaxAmount += (k.taxAmount_ || 0) * (k.txnRate || 1)
                    amount += (k.amount || 0)
                    xAmount += (k.amount || 0) * (k.txnRate || 1)
                    discount += (k.discount || 0)
                    xDiscount += (k.discount || 0) * (k.txnRate || 1)
                })
                let spTaxAmt = 0, spXTaxAmt = 0, plTaxAmt = 0, plXTaxAmt = 0, otTaxAmt = 0, otXTaxAmt = 0,
                    spTaxName = '', plTaxName = '', otTaxName = '',
                    spTaxNameLocale = '', plTaxNameLocale = '', otTaxNameLocale = '',
                    spAccId = '', plAccId = '', otAccId = '',
                    spRate = '', plRate = '', otRate = ''
                taxDetail.forEach(n => {
                    const spTax = n.specificTax || {}
                    const plTax = n.publicLightingTax || {}
                    const otherTax = n.otherTax || {}
                    if (Object.keys(spTax).length > 0) {
                        spTaxAmt += (spTax.taxAmount_ || 0)
                        spXTaxAmt += ((spTax.taxAmount_ || 0) * (spTax.taxRate || 1))
                        spTaxName = spTax.defaultTax || ''
                        spTaxNameLocale = spTax.defaultTaxLocale || ''
                        spAccId = spTax.account ? spTax.account.id : ''
                        spRate = spTax.rate || 1
                    }
                    if (Object.keys(plTax).length > 0) {
                        plTaxAmt += (plTax.taxAmount_ || 0)
                        plXTaxAmt += ((plTax.taxAmount_ || 0) * (plTax.taxRate || 1))
                        plTaxName = plTax.defaultTax || ''
                        plTaxNameLocale = plTax.defaultTaxLocale || ''
                        plAccId = plTax.account ? plTax.account.id : ''
                        plRate = plTax.rate || 1
                    }
                    if (Object.keys(otherTax).length > 0) {
                        otTaxAmt += (otherTax.taxAmount_ || 0)
                        otXTaxAmt += ((otherTax.taxAmount_ || 0) * (plTax.taxRate || 1))
                        otTaxName = otherTax.defaultTax || ''
                        otTaxNameLocale = otherTax.defaultTaxLocale || ''
                        otAccId = otherTax.account ? otherTax.account.id : ''
                        otRate = otherTax.rate || 1
                    }
                })
                if (isVat === 1) {
                    row.detail = {
                        specificTax: {
                            name: spTaxName,
                            nameLocale: spTaxNameLocale,
                            amount: spTaxAmt,
                            exchangeAmount: spXTaxAmt,
                            accountId: spAccId,
                            rate: spRate,
                        },
                        publicLightingTax: {
                            name: plTaxName,
                            nameLocale: plTaxNameLocale,
                            amount: plTaxAmt,
                            exchangeAmount: plXTaxAmt,
                            accountId: plAccId,
                            rate: plRate,
                        },
                        otherTax: {
                            name: otTaxName,
                            nameLocale: otTaxNameLocale,
                            amount: otTaxAmt,
                            exchangeAmount: otXTaxAmt,
                            accountId: otAccId,
                            rate: otRate,
                        }
                    }
                } else {
                    row.detail = {}
                }

                row['amount'] = amount
                row['exchangeAmount'] = xAmount
                row['taxAmount'] = taxAmount
                row['exchangeTaxAmount'] = xTaxAmount
                row['discount'] = discount
                row['exchangeDiscount'] = xDiscount
                row['currency'] = this.purchase.exchangeRate || {}
                result.push(row)
                taxDetail = []
            })
            this.purchase.saleTaxDetail = result
            window.console.log('saleTaxDetail', result)
        },
        async getExpenseBySupplier() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const segment = this.purchase.segment || {}
                    const segmentId = segment.id || ''
                    const location = this.purchase.location || {}
                    const locationId = location.id || ''
                    const supplier = this.purchase.supplier || {}
                    const supplierId = supplier.id || ''
                    const strFilter = '?id=' + supplierId + '&segId=' + segmentId + '&locId=' + locationId;
                    this.expenses = []
                    this.purchase.additionalCostTotal = 0
                    this.showLoadingTxnAdditionalCost = false
                    this.purchase.additionalCost = []
                    billingHandler.listPurchase(strFilter).then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoadingTxnAdditionalCost = true
                            this.showLoadingTxnAdditionalCost = false;
                            this.expenses = res.data.data;
                            this.onMethodChanged()
                        } else {
                            this.showLoadingTxnAdditionalCost = false;
                        }
                    });
                }, 10);
            });
        },
        async clearingAccount() {
            try {
                if (this.isItem()) {
                    /* todo: clearing account for additional cost */
                    const amount = (this.purchase.additionalCostTotal || 0) * -1
                    const xAmount = amount * this.purchase.txnRate || 1
                    const addict = this.purchase.additionalCost || []

                    if (addict.length > 0) {
                        if (addict[0]) {
                            const account = addict[0].account || {}
                            const nature = 'cr'
                            this.jRaw.push({
                                id: account.id + "-" + nature,
                                line: new ItemLineModel(),
                                description: "Additional Cost",
                                account: account,
                                accountId: account.id,
                                amount: amount,
                                exchangeAmount: xAmount,
                                type: nature,
                                typeAs: "clearing",
                            });
                        }
                    }
                }
            } catch (e) {
                window.console.log('error', e)
            }
        },
        isItem() {
            const ds = this.$refs.itemLineDS.kendoWidget()
            const row = ds.data().filter(n => n.amount > 0)
            const found = row.filter(n => n.item.type === 'Variant')
            if (found) {
                return found.length > 0;
            }
            return false
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
        abbr() {
            if (this.purchase) {
                const txnType = this.purchase.transactionType || {}
                const abbr = txnType.abbr || ''
                return abbr
            } else {
                return ''
            }
        },
        validVendor() {
            let vendor = this.vendor;
            return vendor.id !== undefined && vendor.id !== null;
        },
        disableMe() {
            return !!this.$route.params.id;
        },
        hiddenButton() {
            return !!this.$route.params.id;
        },
        disabledSLP() {
            if (this.$route.params.id) {
                const refF = this.purchase.refFrom || []
                if (refF.length > 0) {
                    return !!refF.length > 0
                }
                const adc = this.purchase.additionalCost || []
                if (adc.length > 0) {
                    return !!adc.length > 0
                }
            }
            return false
        },
    },
    watch: {
        // id() {
        //   if (this.$route.params.id === undefined) {
        //     this.clear();
        //   } else {
        //     this.showLoading = true;
        //     this.loadViewCreditPurchase();
        //   }
        // },
        '$route': 'reload'
    },
    created() {
        this.loadTax();
        this.loadPrefix();
        this.loadSegment();
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
        await this.initData()
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
        max-width: 1250px;
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
