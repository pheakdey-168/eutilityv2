<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="8" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t('purchase') }} #{{ purchase.referenceNo }}
                                            ({{ invoiceStatus }})</h2>

                                        <v-icon v-if="isHideBar"
                                                onclick="window.history.go(-1); return false;"
                                                style="cursor: pointer; font-size: 40px;"
                                                color="grey"
                                                class="float-right"
                                        >close
                                        </v-icon>
                                        <span style="transition: .3s ease-in; z-index:10;"
                                              :class="{'iconArrow': !isHideBar,'iconArrowHide': isHideBar }">
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hideSmallSideBar"
                                                    v-if="isHideBar"> mdi-chevron-left-circle
                                            </v-icon>
                                            <v-icon size="22"
                                                    class="arr_icon"
                                                    @click="hideSmallSideBar"
                                                    v-if="!isHideBar"> mdi-chevron-right-circle
                                            </v-icon>
										</span>
                                    </v-card>
                                    <v-card outlined dense class="px-3 no_border" color="grayBg">
                                        <v-row>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <label class="label  mb-0">{{ $t('supplier') }}</label>
                                                <h3 class="text-bold  py-1">{{ supplierName }}</h3>

                                                <!--                                                <label class="label mb-0">{{ $t('invoice_type') }}</label>-->
                                                <!--                                                <h3 class="text-bold py-1">{{ transactionType }}</h3>-->
                                                <label class="label mb-0">{{ $t('transaction_date') }}</label>
                                                <h3 class="text-bold py-1">{{ transactionDate }}</h3>
                                            </v-col>
                                            <v-col sm="8" cols="12" class="pr-1">
                                                <p class="mb-0 ml-n3 color_grey">{{ $t('additional_information') }}</p>
                                                <v-row class="info_add mr-2 py-3">
                                                    <v-col sm="4" cols="12" class="py-1">
                                                        <label class="label mb-0">{{ $t('term') }}</label>
                                                        <h3 class="text-bold py-1">{{ paymentTerm }}</h3>
                                                        <label class="label mb-0">{{ $t('account') }}</label>
                                                        <h3 class="text-bold py-1">{{ accountPayable }}</h3>
                                                    </v-col>
                                                    <v-col sm="4" cols="12" class="py-1">
                                                        <label class="label mb-0">{{ $t('due_date') }}</label>
                                                        <h3 class="text-bold py-1">{{ dueDate }}</h3>
                                                        <label class="label mb-0">{{ $t('currency') }}</label>
                                                        <h3 class="text-bold py-1">{{ currency }}</h3>
                                                    </v-col>
                                                    <v-col sm="4" cols="12" class="py-1">
                                                        <!--                                                        <label class="label mb-0">{{ $t('discount_promotion') }}</label>-->
                                                        <!--                                                        <h3 class="text-bold py-1">1% 10 Net 30</h3>-->
                                                        <label class="label mb-0">{{ $t('price_level') }}</label>
                                                        <h3 class="text-bold py-1">{{ priceLevel }}</h3>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row class="pt-3" style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pt-0">
                                            <LoadingMe
                                                :isLoading="showLoading"
                                                :fullPage="false"
                                                type="loading"
                                                :myLoading="true"/>
                                            <kendo-datasource ref="itemLineDS"
                                                              :data="itemLines"/>
                                            <kendo-grid id="gridItemLine" class="grid-function"
                                                        :data-source-ref="'itemLineDS'"
                                                        :sortable="false"
                                                        :column-menu="true"
                                                        :editable="false"
                                                        :noRecords="true"
                                                        :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :column-menu="false"
                                                    :template="rowNumberTmpl"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5;',
                                                                    class: 'text-products'
                                                                }"
                                                    :attributes="{
                                                                    style: 'text-align: products'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'serviceDate'"
                                                    :title="$t('date_from')"
                                                    :width="160"
                                                    :hidden="!purchaseFormContent.serviceDate"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDate), dateFormat)#</span>'"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'serviceDateTo'"
                                                    :title="$t('date_to')"
                                                    :width="160"
                                                    :hidden="!purchaseFormContent.serviceDateTo"
                                                    :template="'<span>#= kendo.toString(new Date(serviceDateTo), dateFormat)#</span>'"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'item'"
                                                    :title="$t('item')"
                                                    :template="itemTemplate"
                                                    :width="200"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :template="'<span>#=description#</span>'"
                                                    :width="160"
                                                    :headerAttributes="{
                                                                    style: 'background-color: #EDF1F5'
                                                                }"/>
                                                <kendo-grid-column
                                                    :field="'qty'"
                                                    :title="$t('qty')"
                                                    :format="'{0:n}'"

                                                    :template="'<span>#=qty#</span>'"
                                                    :width="80"
                                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :field="'uom'"
                                                    :title="$t('uom')"
                                                    :width="100"
                                                    :template="UOMTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'cost'"
                                                    :title="$t('cost')"
                                                    :width="100"
                                                    :template="'<span>#=kendo.toString(cost || 0, decimalFormat)#</span>'"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="200"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: right'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'discountItem'"
                                                    :title="$t('discount_item')"
                                                    :width="200"
                                                    :hidden="!purchaseFormContent.discountItem"
                                                    :template="discountItemTemplate"
                                                    :headerAttributes="{
                                                                        style: 'text-align: left; background-color: #EDF1F5'
                                                                    }"
                                                    :attributes="{
                                                                        style: 'text-align: left'
                                                                    }"/>
                                                <kendo-grid-column
                                                    :field="'vatTax'"
                                                    :title="$t('tax')"
                                                    :hidden="true"
                                                    :width="150"
                                                    :template="vatTemplate"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>

                                                <kendo-grid-column
                                                    :field="'class1'"
                                                    :title="$t('class_1')"
                                                    :hidden="!purchaseFormContent.class1"
                                                    :template="'<span>#=class1.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class1"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'class2'"
                                                    :title="$t('class_2')"
                                                    :hidden="!purchaseFormContent.class2"
                                                    :template="'<span>#=class2.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class2"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'class3'"
                                                    :title="$t('class_3')"
                                                    :hidden="!purchaseFormContent.class3"
                                                    :template="'<span>#=class3.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class3"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'class4'"
                                                    :title="$t('class_4')"
                                                    :hidden="!purchaseFormContent.class4"
                                                    :template="'<span>#=class4.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class4"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                                <kendo-grid-column
                                                    :field="'class5'"
                                                    :title="$t('class_5')"
                                                    :hidden="!purchaseFormContent.class5"
                                                    :template="'<span>#=class5.name || ``#</span>'"
                                                    :width="200"
                                                    :editor="ClassEditor.class5"
                                                    :headerAttributes="{ style: 'text-align: left; background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: left' }"/>
                                            </kendo-grid>

                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="12" cols="12">
                                                    <v-row>
                                                        <v-col sm="7" cols="6">
                                                            <v-card class="no-boxshadow pa-3" color="grayBg">
                                                                <v-row>
                                                                    <v-col sm="6" cols="12">
                                                                        <label>{{ $t('billing_address') }}</label>
                                                                        <h4 class="text-bold font_16 py-2">
                                                                            {{ billingAddress }}</h4>
                                                                        <label>{{ $t('message_on_invoice') }}</label>
                                                                        <h4 class="text-bold py-2 font_16">
                                                                            {{ transactionNote }}</h4>
                                                                    </v-col>
                                                                    <v-col sm="6" cols="12">
                                                                        <label>{{
                                                                                $t('pickup_delivery_address')
                                                                            }}</label>
                                                                        <h4 class="text-bold py-2 font_16">
                                                                            {{ deliveryAddress }}</h4>
                                                                        <label>{{ $t('message_on_journal') }}</label>
                                                                        <h4 class="text-bold py-2 font_16">
                                                                            {{ journalNote }}</h4>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-card>
                                                        </v-col>
                                                        <v-col sm="5" cols="6">
                                                            <v-simple-table>
                                                                <template v-slot:default>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="text-left">{{ $t('subtotal') }}</td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ numberFormat(purchase.subTotal) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left">{{
                                                                                $t('general_discount')
                                                                            }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            ({{ numberFormat(purchase.discountTotal) }})
                                                                        </td>
                                                                    </tr>
                                                                    <!--                                                                    <tr>-->
                                                                    <!--                                                                        <td class="text-left">{{ $t('delivery') }}</td>-->
                                                                    <!--                                                                        <td class="text-center">:</td>-->
                                                                    <!--                                                                        <td class="text-right">1,0000.00</td>-->
                                                                    <!--                                                                    </tr>-->
                                                                    <!-- <tr>
                                                                        <td class="text-left">{{ $t('total_tax') }}
                                                                            <v-btn @click="dialogTax=true"
                                                                                   color="primary"
                                                                                   class="text-white text-bold rounded-0 float-right text-uppercase"
                                                                                   style="height: 30px !important;">
                                                                                {{ $t('tax') }}
                                                                            </v-btn>
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ numberFormat(purchase.totalTaxAmount) }}
                                                                        </td>
                                                                    </tr> -->
                                                                    <!-- <tr>
                                                                        <td class="text-left">{{ specificDiscount }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            ({{
                                                                                numberFormat(purchase.specificDiscountTotal)
                                                                            }})
                                                                        </td>
                                                                    </tr> -->
                                                                    <tr v-for="item in purchase.otherCharge"
                                                                        v-bind:key="item.id">
                                                                        <td class="text-left text-uppercase">
                                                                            {{ item.name }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ otherCharge(item) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left text-uppercase">
                                                                            {{ $t('total') }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right primary--text text-bold">
                                                                            {{ numberFormat(purchase.total) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left">{{ $t('deposit') }} <span
                                                                            class="float-right primary--text">{{
                                                                                numberFormat(purchase.depositAmount)
                                                                            }}</span>
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{
                                                                                numberFormat(purchase.depositDeduction)
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left">{{ $t('remaining') }}</td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right primary--text text-bold">
                                                                            {{ numberFormat(purchase.remainingAmount) }}
                                                                        </td>
                                                                    </tr>

                                                                    </tbody>
                                                                </template>
                                                            </v-simple-table>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-divider/>
                                    <v-card outlined dense class="no_border function_footer py-2">
                                        <p class="float-left py-2 mb-0  color_grey">
                                            {{ $t('standard_commercial_invoice') }}</p>
                                        <v-btn @click="_print(1)" class="float-right save_print mx-1">
                                            {{ $t('print') }}
                                        </v-btn>
                                        <div v-if="isVisible">
                                            <v-btn class="float-right btn_delete mx-1"
                                                   @click="onDeleteInvoice('delete')">
                                                {{ $t('delete') }}
                                            </v-btn>
                                            <v-btn class="float-right btn_save_draft mx-1"
                                                   @click="onEditInvoice('edit')">
                                                {{ $t('edit') }}
                                            </v-btn>
                                        </div>
                                    </v-card>
                                    <v-divider/>
                                </v-form>
                            </v-col>
                            <v-col class="smallSide" sm="4" style="transition: .3s ease-in;"
                                   :class="{'hide_small_bar_class':isHideBar}">
                                <h3 style="color: #b3b5bc; font-size:20px;" v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3">Help
                                    <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div v-if="!isHideBar" class="small_sidebar mt-9 px-4 grayBg">
                                    <v-card class="pa-3 no-boxshadow"
                                            color="primary"
                                            style="min-height: 70px;">
                                        <h3 style="font-size: 18px" class="text-white text-uppercase mb-2">
                                            {{ $t('amount_due') }}</h3>
                                        <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                            {{ numberFormat(purchase.amountDue) }}</h3>
                                    </v-card>
                                    <v-row>
                                        <v-col sm="12" cols="12">
                                            <h4 class="my-2 text-uppercase">{{ $t('analysis') }}</h4>
                                            <v-row>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('segment') }}</label>
                                                    <h4 class="text-bold py-1">{{ segment }}</h4>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('location') }}</label>
                                                    <h4 class="text-bold py-1">{{ location }}</h4>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('employee') }}</label>
                                                    <h4 class="text-bold py-1">{{ employee }}</h4>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="py-1">
                                                    <label class="label">{{ $t('project') }}</label>
                                                    <h4 class="text-bold py-1">{{ project }}</h4>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="py-0">
                                                    <label class="label">{{ $t('bill_number') }}</label>
                                                    <h4 class="text-bold py-1">{{ billNo }}</h4>
                                                    <label class="label">{{ $t('ref_from') }}</label>
                                                    <div v-for="itm in purchase.refFrom" v-bind:key="itm.id">
                                                        <h4 class="text-bold d-block py-2">
                                                            <router-link
                                                                :to="{ path: '/en/purchase_order_view/'+ itm.id}">
                                                                {{ itm.reference || '' }}
                                                            </router-link>
                                                        </h4>
                                                    </div>
                                                </v-col>
                                                <v-col sm="6" cols="6" class="py-0">
                                                    <label class="label">{{ $t('bill_date') }}</label>
                                                    <h4 class="text-bold py-1">{{ billDate }}</h4>
                                                    <label class="label">{{ $t('ref_to') }}</label>
                                                    <div v-for="itm in purchase.refTo" v-bind:key="itm.id">
                                                        <h4 class="text-bold d-block py-2">
                                                            <router-link :to="{ path: '/en/sale_order_view/'+ itm.id}">
                                                                {{ itm.reference || '' }}
                                                            </router-link>
                                                        </h4>
                                                    </div>
                                                </v-col>

                                            </v-row>
                                            <div class="mt-3"
                                                 style="height:3px; background-color:#ffffff;width:100%;"></div>
                                            <v-col sm="12" cols="12" v-if="isVisible">
                                                <v-dialog v-model="dialogM3" max-width="550px">
                                                    <!-- <template v-slot:activator="{ on }">
                                                        <v-card
                                                            class="third text-bold rounded-0  no-boxshadow"
                                                            v-on="on">
                                                            <p class="text-center pa-2 color_white mb-1">
                                                                {{ $t('make_recurring_purchase') }}</p>
                                                        </v-card>
                                                    </template> -->
                                                    <v-card>
                                                        <div class="modal_header">
                                                            <v-card-title>{{ $t('recurring_purchase') }}</v-card-title>
                                                            <v-icon class="btn_close" @click="dialogM3 = false">close
                                                            </v-icon>
                                                        </div>
                                                        <v-card-text cl ass="modal_text_content">
                                                            <v-row class="pt-4">
                                                                <v-col sm="12" cols="12" class="">
                                                                    <v-row class="info_add mr-0">
                                                                        <v-col cols="12" class="py-0">
                                                                            <label
                                                                                class="label mb-0">{{
                                                                                    $t('name')
                                                                                }}</label>
                                                                            <v-text-field
                                                                                v-model="recurring.name"
                                                                                outlined
                                                                            />
                                                                        </v-col>
                                                                        <v-col sm="6" cols="12">
                                                                            <label
                                                                                class="label mb-0">{{
                                                                                    $t('recurring_everyday')
                                                                                }}</label>
                                                                            <v-row>
                                                                                <v-col cols="12" class="py-0">
                                                                                    <v-select class="mt-1"
                                                                                              v-model="recurring.frequency"
                                                                                              :items="recurringPeriod"
                                                                                              :rules="[v => !!v || 'Term  is required']"
                                                                                              return-object
                                                                                              outlined
                                                                                    />
                                                                                </v-col>
                                                                                <v-col cols="12" class="py-0">
                                                                                    <label
                                                                                        class="label mb-0">{{
                                                                                            $t('no_of_recurring')
                                                                                        }}</label>
                                                                                    <v-text-field
                                                                                        v-model="recurring.noOfRecurring"
                                                                                        type="number"
                                                                                        outlined
                                                                                    />
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-col>
                                                                        <v-col sm="6" cols="12">
                                                                            <label
                                                                                class="label mb-0">{{
                                                                                    $t('start_date')
                                                                                }}</label>
                                                                            <app-datepicker
                                                                                :initialDate="recurring.txnStartDate"
                                                                                @emitDate="recurringInvoiceDate = $event"/>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>

                                                            </v-row>
                                                        </v-card-text>
                                                        <v-divider/>
                                                        <v-card-actions class="modal_footer">
                                                            <v-btn class="btn_cancel"
                                                                   @click="dialogM3 = false">{{ $t('cancel') }}
                                                            </v-btn>
                                                            <v-btn class="btn_save_close"
                                                                   @click="onSaveCloseRecurring">
                                                                {{ $t('save_close') }}
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-col>


                                            <!-- <p class="color_grey mt-6 mb-2">{{ $t('additional_cost') }}</p>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                    <tr v-for="item in purchase.additionalCost"
                                                        v-bind:key="item.id">
                                                        <td class="text-left px-0 font_12">{{ item.referenceNo || '' }}
                                                        </td>
                                                        <td class="text-center px-0 font_12">{{
                                                                numberFormat(item.exchangeAmount || 0)
                                                            }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table> -->
                                            <p class="color_grey mt-6 mb-2">{{ $t('transaction_history') }}</p>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                    <tr v-for="item in invoiceHistory"
                                                        v-bind:key="item.id">
                                                        <td class="text-left px-0 font_12">{{
                                                                item.name
                                                            }}
                                                        </td>
                                                        <td class="text-center px-0 font_12">{{
                                                                formatDateTime(item.createdAt)
                                                            }} &nbsp; ({{ item.timeSince }})
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>
            <v-dialog v-model="dialogTax" max-width="450px">

                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t('tax_list') }}</v-card-title>
                        <v-icon @click="dialogTax = false">close</v-icon>
                    </div>
                    <v-card-text cl ass="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                        <tr v-for="(value, name) in purchase.taxListTotal" v-bind:key="name">
                                            <td class="text-left" width="180px">{{ name }}</td>
                                            <td class="text-center">:</td>
                                            <td class="text-right">
                                                {{ numberFormat(value) }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-left" width="180px">{{ $t('total') }}</td>
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
import PurchaseModel from "@/scripts/purchase/model/Purchase"
import PurchaseFormContentModel from "@/scripts/model/PurchaseFormContent"
import RecurringModel from "@/scripts/purchase/model/Recurring"
import kendo from "@progress/kendo-ui";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";

const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const recurringHandler = require("@/scripts/invoice/handler/recurringHandler")
const purchaseFormContentHandler = require("@/scripts/purchaseFormContentHandler")
const purchaseModel = new PurchaseModel({})
const purchaseFormContentModel = new PurchaseFormContentModel({})
const recurringModel = new RecurringModel({})
const {ClassEditor} = require("@/scripts/kendo_editor/Collections")
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

const {getFormSetting} = require("@/scripts/settingsHandler.js")
import {print} from "@/form/Purchases.js";
import {i18n} from '@/i18n';

export default {
    name: "CreditPurchaseView",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        showLoading: true,
        dialogM3: false,
        dialogTax: false,
        alert: false,
        is_invoice_opened: true,
        files: [],
        valid: true,
        itemLines: [],
        recurringInvoiceDate: new Date().toISOString().substr(0, 10),
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        billingNumber: 1,
        billingLabel: '',
        billingMethod: ["Fixed Payment", "Equal Payment"],
        recurringPeriod: ["Monthly", "Quarterly", 'Semi-Annually', 'Annually'],
        renewSetting: ["Open", "Fixed"],
        mRenewSetting: "Open",
        mMethod: 'Equal Payment',
        mRecurringPeriod: 'Monthly',
        taxListTotal: [],
        purchase: purchaseModel,
        ClassEditor: ClassEditor,
        recurring: recurringModel,
        dateFormat: purchaseModel.dateFormat,
        purchaseFormContent: purchaseFormContentModel,
        // invoiceScheduleList: [],
        invoiceHistory: [],
        loggedUser: {
            id: cookie.creator,
            name: cookie.email,
        },
        reason: ''

    }),
    methods: {
        hideMultiplePaymentBtn() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('status')) {
                    if (this.purchase.status === 1) {
                        return true
                    }
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        async onSaveCloseRecurring() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const data = {
                        id: this.recurring.id,
                        name: this.recurring.name,
                        txnId: this.purchase.id,
                        supplier: this.purchase.supplier,
                        amount: this.purchase.total,
                        referenceNo: this.purchase.referenceNo,
                        transactionType: this.purchase.transactionType,
                        transactionDate: this.purchase.transactionDate,
                        txnStartDate: this.recurringInvoiceDate,
                        frequency: this.recurring.frequency,
                        noOfRecurring: this.recurring.noOfRecurring,
                        type: 'Recurring Purchase',
                        status: 1
                    }
                    recurringHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            // this.invoiceScheduleList = response.data.data
                            this.dialogM3 = false
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300)
            })
        },
        numberFormat(value) {
            return kendo.toString(value, `n${this.purchaseFormContent.decimal}`)
        },
        formatDate(value) {
            return kendo.toString(new Date(value), this.dateFormat)
        },
        formatDateTime(value) {
            return kendo.toString(new Date(value), this.dateFormat + ` hh:mm tt`)
        },
        paymentCode(code) {
            return code.replace('psc-', '')
        },
        status(value) {
            let statusText = ''
            switch (value) {
                case 1:
                    statusText = 'OPEN'
                    break
                case 2:
                    statusText = 'PARTIALLY PAID'
                    break
                case 3:
                    statusText = 'PAID'
                    break
                case 4:
                    statusText = 'VOID'
                    break
            }
            return statusText
        },
        amountFormat(value) {
            return kendo.toString(value.amount, `n${this.purchaseFormContent.decimal}`)
        },
        priceFormat(value) {
            return kendo.toString(value.price, `n${this.purchaseFormContent.decimal}`)
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.itemLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        vatTemplate(dataItem) {
            const vat = dataItem.vatTax || {}
            if (vat) {
                return `<span>${vat.defaultTax ? vat.defaultTax : ``}</span>`
            } else {
                return ``
            }
        },
        itemTemplate(dataItem) {
            const item = dataItem.item
            if (item) {
                return `<span>${item.name ? item.name : ``}</span>`
            } else {
                return ``
            }
        },
        UOMTemplate(dataItem) {
            const uom = dataItem.uom
            if (uom) {
                return `<span>${uom.uom ? uom.uom.name : ``}</span>`
            } else {
                return ``
            }
        },
        saleUnitTemplate(dataItem) {
            const saleUnit = dataItem.saleUnit
            if (saleUnit) {
                return `<span>${saleUnit.name ? saleUnit.name : ``}</span>`
            } else {
                return ``
            }
        },
        discountItemTemplate(dataItem) {
            const discountItem = dataItem.discountItem
            if (discountItem) {
                return `<span>${discountItem.code ? discountItem.code : ``} - ${discountItem.name ? discountItem.name : ``}</span>`
            } else {
                return ``
            }
        },
        empImpl(dataItem) {
            let empIds = []
            dataItem.employee.forEach(m => {
                empIds.push(m.firstName + ' - ' + m.lastName)
            })
            // window.console.log(empIds.join(', '))
            return `<span>${empIds.join(', ')}</span>`
        },
        async loadPurchaseFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    purchaseFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.purchaseFormContent = data[0]
                            }
                        }
                    })
                }, 300)
            })
        },
        async loadInvoiceHistory() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    billingHandler.history(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.invoiceHistory = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadViewCreditPurchase() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    billingHandler.viewPurchase(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.purchase = res.data.data[0]
                            this.itemLines = this.purchase.itemLines
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        // async loadPaymentScheduleList() {
        //     new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve('resolved')
        //             this.showLoading = true
        //             billingHandler.scheduleList(this.$route.params.id).then(res => {
        //                 if (res.data.statusCode === 200) {
        //                     this.showLoading = false
        //                     this.invoiceScheduleList = res.data.data
        //                 }
        //             }).catch()
        //             {
        //                 this.showLoading = false
        //             }
        //         }, 300)
        //     })
        // },
        clear() {

        },
        accountDropDownEditor() {
        },
        hideSmallSideBar() {
            this.isHideBar = !this.isHideBar;
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadViewCreditPurchase()
                // await this.loadPaymentScheduleList()
                await this.loadInvoiceHistory()
            }
        },
        autoCalculateDiscount(discountItem, subTotal) {
            if (discountItem) {
                const nature = discountItem.nature
                const amount = discountItem.amount
                if (nature === 'Amount') {
                    return kendo.parseFloat(amount)
                } else if (nature === 'Percentage') {
                    return (subTotal * (kendo.parseFloat(amount) / 100))
                }
            }
        },
        otherCharge(obj) {
            if (this.purchase) {
                const amount = this.autoCalculateDiscount(obj, this.purchase.subTotal)
                return this.numberFormat(amount)
            }
            return 0
        },
        onEditInvoice(type) {
            const id = this.$route.params.id
            this.$router.push({
                path: 'credit_purchase/' + id,
                name: 'Credit Purchase',
                params: {id: id},
                query: {type: type}
            })
            // window.console.log(this.$router.currentRoute)

            // const data = {
            //     query: {type: 'edit'},
            //     params: {id: id}
            // }
            // let args = {
            //     text: '',
            //     url: `invoice/${id}`,
            //     data: data,
            // }
            // return {
            //     template: LinkTemplate,
            //     templateArgs: args
            // }
        },
        onDeleteInvoice() {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                input: 'text',
                inputPlaceholder: 'Input some reason',
                showCancelButton: true,
                confirmButtonColor: '#4d4848',
                cancelButtonColor: '#ED1A3A',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.reason = result.value
                    this.onDeletePurchase(this.reason)
                    // this.clear()
                    // this.$router.go(-1)
                }
            })
        },
        async onDeletePurchase(reason) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const txnId = this.$route.params.id
                    if (txnId) {
                        const data = {
                            id: txnId,
                            reason: reason,
                            loggedUser: this.loggedUser,
                            transactionDate: this.transactionDate,
                            supplier: this.purchase.supplier,
                            actionType: 'delete'
                        }
                        billingHandler.createPurchase(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$snotify.success('Successfully')
                                this.close(data)
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }

                }, 300);
            })
        },
        close(data) {
            this.$router.push({
                name: 'Vendors', params: {
                    data: data
                }
            })
        },
        reloadData(value) {
            window.console.log('reload' + value, this.$route.params)
        },
        _print(id) {
            let params = "?formType=Purchase Voucher"
            getFormSetting(params).then(res => {
                if (res.data.statusCode === 200) {
                    if (res.data.data.length > 0) {
                        window.console.log(res.data.data["0"].settings);
                        print(this.purchase, id, res.data.data["0"].settings);
                    } else {
                        this.$snotify.error(i18n.t('please_save_form_in_setting'))
                    }
                }
            });
        },
    },
    computed: {
        'isVisible':
            {
                get() {
                    if (this.purchase) {
                        if (this.purchase.hasOwnProperty('status')) {
                            return this.purchase.status === 1;
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }
            },
        paymentOptionKHQR() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('paymentOptionKHQR')) {
                    if (this.purchase.paymentOptionKHQR.hasOwnProperty('id')) {
                        return this.purchase.paymentOptionKHQR.code + '-' + this.purchase.paymentOptionKHQR.name
                    }
                }
            }
            return '-'
        },
        paymentOptionWBMobile() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('paymentOptionWBMobile')) {
                    if (this.purchase.paymentOptionWBMobile.hasOwnProperty('id')) {
                        return this.purchase.paymentOptionWBMobile.code + '-' + this.purchase.paymentOptionWBMobile.name
                    }
                }
            }
            return '-'
        },
        paymentOptionOnline() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('paymentOptionOnline')) {
                    if (this.purchase.paymentOptionOnline.hasOwnProperty('id')) {
                        return this.purchase.paymentOptionOnline.code + '-' + this.purchase.paymentOptionOnline.name
                    }
                }
            }
            return '-'
        },
        transactionType() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('transactionType')) {
                    if (this.purchase.transactionType.hasOwnProperty('id')) {
                        return this.purchase.transactionType.name
                    }
                }
            }
            return ''
        },
        paymentTerm() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('paymentTerm')) {
                    if (this.purchase.paymentTerm.hasOwnProperty('id')) {
                        return this.purchase.paymentTerm.name
                    }
                }
            }
            return ''
        },
        accountPayable() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('apAcc')) {
                    if (this.purchase.apAcc.hasOwnProperty('id')) {
                        return this.purchase.apAcc.name
                    }
                }
            }
            return ''
        },
        dueDate() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('dueDate')) {
                    return kendo.toString(new Date(this.purchase.dueDate), this.dateFormat)
                }
            }
            return ''
        },
        transactionDate() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('transactionDate')) {
                    return kendo.toString(new Date(this.purchase.transactionDate), this.dateFormat)
                }
            }
            return ''
        },
        supplierName() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('supplier')) {
                    if (this.purchase.supplier.hasOwnProperty('id')) {
                        return this.purchase.supplier.name
                    }
                }
            }
            return ''
        },
        currency() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('priceLevel')) {
                    if (this.purchase.priceLevel.hasOwnProperty('currency')) {
                        return this.purchase.priceLevel.currency.code
                    }
                }
            }
            return ''
        },
        priceLevel() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('priceLevel')) {
                    if (this.purchase.priceLevel.hasOwnProperty('id')) {
                        return this.purchase.priceLevel.name
                    }
                }
            }
            return ''
        },
        segment() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('segment')) {
                    if (this.purchase.segment.hasOwnProperty('id')) {
                        return this.purchase.segment.name
                    }
                }
            }
            return ''
        },
        location() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('location')) {
                    if (this.purchase.location.hasOwnProperty('id')) {
                        return this.purchase.location.name
                    }
                }
            }
            return ''
        },
        billNo() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('billNo')) {
                    return this.purchase.billNo
                }
            }
            return ''
        },
        billDate() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('billDate')) {
                    return this.purchase.billDate
                }
            }
            return ''
        },
        project() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('project')) {
                    if (this.purchase.project.hasOwnProperty('id')) {
                        return this.purchase.project.name
                    }
                }
            }
            return ''
        },
        employee() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('employee')) {
                    if (this.purchase.employee.hasOwnProperty('id')) {
                        return this.purchase.employee.firstName + ' - ' + this.purchase.employee.lastName
                    }
                }
            }
            return ''
        },
        billingAddress() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('billingAddress')) {
                    if (this.purchase.billingAddress.hasOwnProperty('id')) {
                        return this.purchase.billingAddress.name
                    }
                }
            }
            return ''
        },
        deliveryAddress() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('deliveryAddress')) {
                    if (this.purchase.deliveryAddress.hasOwnProperty('id')) {
                        return this.purchase.deliveryAddress.name
                    }
                }
            }
            return ''
        },
        transactionNote() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('transactionNote')) {
                    return this.purchase.transactionNote
                }
            }
            return ''
        },
        journalNote() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('journalNote')) {
                    return this.purchase.journalNote
                }
            }
            return ''
        },
        deliveryDateTime() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('deliveryDateTime')) {
                    return kendo.toString(new Date(this.purchase.deliveryDateTime), this.dateFormat)
                }
            }
            return ''
        },
        specificDiscount() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('specificDiscountItem')) {
                    if (this.purchase.specificDiscountItem.hasOwnProperty('id')) {
                        return this.purchase.specificDiscountItem.name
                    }

                }
            }
            return ''
        },

        invoiceStatus() {
            if (this.purchase) {
                if (this.purchase.hasOwnProperty('status')) {
                    const status = this.purchase.status
                    let statusText = ''
                    switch (status) {
                        case 1:
                            statusText = 'OPEN'
                            break
                        case 2:
                            statusText = 'PARTIALLY PAID'
                            break
                        case 3:
                            statusText = 'PAID'
                            break
                        case 4:
                            statusText = 'VOID'
                            break
                    }
                    return statusText
                }
            }
            return ''
        },
    },
    activated() {
        // this.visibleMe = this.hideMultiplePaymentBtn()
        // window.console.log(this.visibleMe, 'Activated')
    },
    watch: {
        id() {
            if (this.$route.params.id === undefined) {
                this.clear()
            } else {
                this.showLoading = true
                this.loadViewCreditPurchase()
                // this.loadPaymentScheduleList()
                this.loadInvoiceHistory()
            }
        },
        // isVisible(value) {
        //     this.visibleMe = value
        //     window.console.log('isVisible', value)
        // }
        // '$route': 'reloadData'/**/
    },
    mounted: async function () {
        await this.loadPurchaseFormContent()
        await this.initData()
    },
}
</script>

<style scoped>
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
    background-color: #F2F2F2;
}

.pa-3.v-card h4 {
    font-size: 18px;
    color: #333;
}

.pa-3.v-card p {
    font-size: 12px;
    color: #B5B5B5;
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
    transition: .5s ease-in;
    flex: 0 0 0;
}

.hide_big_bar_class {
    max-width: 100%;
    transition: .5s ease-in;
    flex: 0 0 100%;
}

.info_add {
    background-color: #ffffff;
}

.small_sidebar {
    height: 98%;
    position: relative;
    padding: 12px;
    background-color: #EDF1F5;
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
    background-color: #EDF1F5;
    min-height: 120px;
}

.deposite_input {
    width: 100px;
}


.checkbox_inv {
    padding: 2px;
    margin-top: 3px;
    margin-right: 2px;
}

.exp_select {
    font-size: 12px !important;
}


</style>