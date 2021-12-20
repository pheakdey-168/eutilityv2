<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-card
            outlined
            dense
            class="pa-4 no_border rounded-sm"
            color="white"
          >
            <v-row>
              <v-col
                class="bigSide py-0"
                sm="12"
                cols="12"
                style="transition: .3s ease-in;"
                :class="{ hide_big_bar_class: isHideBar }"
              >
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card outlined dense class="no_border">
                    <h2>{{ $t("individual_supplier") }}</h2>
                    <v-icon
                      @click="cancel()"
                      style="cursor: pointer; color: #333; font-size: 40px;"
                      class="float-right"
                      >close
                    </v-icon>
                  </v-card>
                  <v-card
                    outlined
                    dense
                    class="px-3 no_border mb-3"
                    color="grayBg"
                  >
                    <v-row>
                      <v-col sm="6" cols="12" class="pb-0">
                        <label class="label  mb-0">{{
                          $t("supplier_type")
                        }}</label>
                        <v-select
                          :items="supplierTypes"
                          placeholder="Vendor Type"
                          item-text="name"
                          class="mt-1"
                          tage="Customer Type"
                          v-on:change="supplierTypeChange"
                          v-model="supplier.supplierType"
                          item-value="id"
                          :rules="[(v) => !!v || $t('is_required')]"
                          return-object
                          outlined
                        />

                        <label class="label mb-0">{{
                          $t("supplier_name")
                        }}</label>
                        <v-text-field
                          class="mt-1"
                          v-model="supplier.name"
                          outlined
                          :rules="[(v) => !!v || 'Name is required']"
                          required
                        />

                        <label class="label  mb-0" style="">{{
                          $t("registered_date")
                        }}</label>
                        <app-datepicker
                          :initialDate="supplier.registeredDate"
                          @emitDate="registeredDate = $event"
                        />
                      </v-col>
                      <v-col sm="6" cols="12" class="pb-0">
                        <label class="label mb-0">{{ $t("number") }}</label>
                        <v-row class="mt-1 pb-0">
                          <v-col sm="2" cols="3" class="pt-0 pr-0 pb-0">
                            <div class="code_text text-uppercase">
                              {{
                                supplier.supplierType
                                  ? supplier.supplierType.abbr
                                  : ""
                              }}
                            </div>
                          </v-col>
                          <v-col sm="10" cols="8" class="pt-0 pl-0 pr-1 pb-0">
                            <v-text-field
                              class="disable_alert custom-border "
                              v-model="supplier.number"
                              outlined
                              :rules="[(v) => !!v || 'Number is required']"
                              required
                            />
                          </v-col>
                          <!--                          <v-col sm="2" cols="2" class="pt-0 pb-0">-->
                          <!--                            <v-icon-->
                          <!--                                color="black"-->
                          <!--                                size="30"-->
                          <!--                                class="border_qrcode"-->
                          <!--                                @click="supplierTypeChange"-->
                          <!--                            >mdi-qrcode-->
                          <!--                            </v-icon>-->
                          <!--                          </v-col>-->
                        </v-row>

                        <label class="label mb-0">{{
                          $t("alternative_name")
                        }}</label>
                        <v-text-field
                          class="mt-1"
                          tage="Alternative Name"
                          v-model="supplier.alternativeName"
                          outlined
                        />
                        <label class="mb-0 text-uppercase">{{
                          $t("consumer_id")
                        }}</label>
                        <v-text-field
                          class="mt-1"
                          tage="Banhji id"
                          v-model="supplier.consumerId"
                          outlined
                        />
                      </v-col>
                    </v-row>
                  </v-card>

                  <!-- Grid -->
                  <v-tabs slider-color="#ffffff" class="individual_tabs">
                    <v-tab>
                      <span class=" text-uppercase">
                        {{ $t("contact_address") }}
                      </span>
                    </v-tab>
                    <v-tab>
                      <span class="text-uppercase">
                        {{ $t("payment_billing") }}
                      </span>
                    </v-tab>
                    <!-- <v-tab>
                      <span class="text-uppercase">
                        {{ $t("account_tax") }}
                      </span>
                    </v-tab>
                    <v-tab>
                      <span class="text-uppercase">
                        {{ $t("note") }}
                      </span>
                    </v-tab>
                    <v-tab>
                      <span class=" text-uppercase">
                        {{ $t("image") }}
                      </span>
                    </v-tab> -->

                    <v-tab-item eager>
                      <v-row>
                        <v-col class="py-0" sm="6" cols="12">
                          <p class="color_grey">{{ $t("funct_contract_vendor") }}</p>
                          <label class="label mb-0">{{ $t("gender") }}</label>
                          <v-select
                            class="mt-1"
                            :items="genderItem"
                            item-text="name"
                            item-value="name"
                            tage="Gender"
                            v-model="gender"
                            placeholder="Male"
                            outlined
                          >
                          </v-select>
                          <label class="mb-0">{{ $t("phone_number") }}</label>
                          <v-text-field
                            class="mt-1"
                            tage="Phone Number"
                            v-model="phone"
                            outlined
                          />
                          <label class="mb-0">{{ $t("email") }}</label>
                          <v-text-field
                            class="mt-1"
                            tage="Email"
                            v-model="email"
                            outlined
                          />

                          <label class="mb-0">{{ $t("dob") }}</label>
                          <app-datepicker
                            :initialDate="dob"
                            @emitDate="dob = $event"
                          />
                        </v-col>
                        <v-col class="py-0" sm="6" cols="12">
                          <v-dialog v-model="dialogM2" max-width="500px">
                            <template v-slot:activator="{ on }">
                              <v-btn
                                color="primary"
                                rounded
                                class=" float-right mb-4"
                                @click="onNewAddressClick"
                                v-on="on"
                              >
                                {{ $t("add_new_address") }}
                              </v-btn>
                            </template>
                            <v-card>
                              <div class="modal_header">
                                <v-card-title>{{ $t("address") }}</v-card-title>
                                <v-icon @click="dialogM2 = false">
                                  close
                                </v-icon>
                              </div>
                              <v-card-text class="modal_text_content">
                                <v-row>
                                  <v-col class="pb-0" sm="6" cols="12">
                                    <label class="mb-0">{{
                                      $t("address_name")
                                    }}</label>
                                    <v-text-field
                                      class="mt-1"
                                      v-model="address.name"
                                      tage="Address Name"
                                      outlined
                                    />
                                    <label class="label mb-0">{{
                                      $t("address_type")
                                    }}</label>
                                    <v-select
                                      class="mt-1"
                                      :items="addressType"
                                      v-model="address.type"
                                      outlined
                                      tage="Address Type"
                                    />
                                    <label class="mb-0">{{
                                      $t("country")
                                    }}</label>
                                    <v-select
                                      class="disable_alert my-1"
                                      :items="countries"
                                      tage="Address Country"
                                      v-model="address.country"
                                      item-value="abbreviation"
                                      :item-text="
                                        (item) =>
                                          `${item.abbreviation} - ${item.country}`
                                      "
                                      return-object
                                      outlined
                                    />
                                  </v-col>
                                  <v-col class="pb-0" sm="6" cols="12">
                                    <label class="mb-0">{{
                                      $t("address_line_1")
                                    }}</label>
                                    <v-text-field
                                      class="mt-1"
                                      v-model="address.line1"
                                      tage="Address Line 1"
                                      outlined
                                    />
                                    <label class="mb-0">{{
                                      $t("address_line_2")
                                    }}</label>
                                    <v-text-field
                                      class="mt-1"
                                      v-model="address.line2"
                                      outlined
                                      tage="Address Line 2"
                                    />
                                  </v-col>
                                </v-row>
                              </v-card-text>
                              <v-card-actions
                                class="modal_footer d-flex justify-space-between"
                              >
                                <v-btn
                                  outlined
                                  colo="primary"
                                  class=" black--text "
                                  @click="dialogM2 = false"
                                  >{{ $t("cancel") }}
                                </v-btn>
                                <v-btn
                                  @click="onSaveCloseAddress"
                                  color="primary"
                                  class="white--text"
                                >
                                  {{ $t("save_close") }}
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                          <v-simple-table
                            class="exchange-table my-4"
                            style="clear: right;"
                          >
                            <kendo-datasource
                              ref="gridAddressDS"
                              :data="addresses"
                            />
                            <kendo-grid
                              id="gridAddress"
                              class="grid-function"
                              :data-source-ref="'gridAddressDS'"
                              :editable="false"
                              :scrollable-virtual="true"
                            >
                              <kendo-grid-column
                                :field="'no'"
                                :title="$t('no')"
                                :template="rowNumberTmpl"
                                :width="40"
                                :column-menu="false"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5;',
                                  class: 'text-center',
                                }"
                                :attributes="{ style: 'text-align: center' }"
                              />
                              <kendo-grid-column
                                :field="'name'"
                                :attributes="{ class: 'tb_name_td' }"
                                :title="$t('name')"
                                :width="50"
                                :template="'<span>#=name#</span>'"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="'type'"
                                :title="$t('type')"
                                :width="90"
                                :template="'<span>#=type#</span>'"
                                :headerAttributes="{
                                  style: 'background-color: #EDF1F5',
                                }"
                              />
                              <kendo-grid-column
                                :field="''"
                                :title="$t('action')"
                                :width="70"
                                :command="[
                                  {
                                    iconClass: 'k-icon k-i-edit',
                                    text: 'Edit',
                                    click: goEditAddress,
                                  },
                                ]"
                                :headerAttributes="{
                                  style:
                                    'text-align: left; background-color: #EDF1F5',
                                }"
                              />
                            </kendo-grid>
                          </v-simple-table>
                          <!-- <v-row>
                                                      <v-col sm="8">
                                                        <p class="color_grey">
                                                          {{ $t("all_longitude") }}
                                                        </p>
                                                      </v-col>
                                                      <v-col sm="4">
                                                        <v-btn color="primary">{{
                                                          $t("view_map")
                                                        }}</v-btn>
                                                      </v-col>
                                                    </v-row>
                                                    <v-row>
                                                      <v-col sm="6">
                                                        <label class="mb-0">{{ $t("longitude") }}</label>
                                                        <v-text-field
                                                          class="mt-1"
                                                          tage="Longitude"
                                                          v-model="longitude"
                                                          placeholder="Longitude"
                                                          outlined
                                                        />
                                                      </v-col>
                                                      <v-col sm="6">
                                                        <label class="mb-0">{{ $t("latitude") }}</label>
                                                        <v-text-field
                                                          class="mt-1"
                                                          placeholder="Latitude"
                                                          tage="Latitude"
                                                          v-model="latitude"
                                                          outlined
                                                        />
                                                      </v-col>
                                                    </v-row> -->
                        </v-col>
                      </v-row>
                    </v-tab-item>
                    <!-- item 2 -->
                    <v-tab-item eager>
                      <p class="color_grey">
                        {{ $t("default_payment_bill_in_funct") }}
                      </p>
                      <v-row>
                        <v-col class="py-0" sm="6" cols="12">
                          <label class="mb-0">{{ $t("price_level") }}</label>
                          <v-select
                            class="mt-1"
                            v-model="supplier.priceLevel"
                            :items="priceLevel"
                            item-value="id"
                            item-text="name"
                            return-object
                            placeholder="Price Level"
                            tage="Default Price Level"
                            :rules="[(v) => !!v || $t('is_required')]"
                            outlined
                          />
                          <!--                          <label class="label mb-0">{{-->
                          <!--                              $t("default_payment_term")-->
                          <!--                            }}</label>-->
                          <!--                          <v-select-->
                          <!--                              class="mt-1"-->
                          <!--                              :items="paymentTerms"-->
                          <!--                              tage="Default Payment Term"-->
                          <!--                              placeholder="Payment Term"-->
                          <!--                              item-text="name"-->
                          <!--                              item-value="id"-->
                          <!--                              v-model="mPaymentTerm"-->
                          <!--                              :rules="[(v) => !!v || $t('is_required')]"-->
                          <!--                              return-object-->
                          <!--                              outlined-->
                          <!--                          />-->
                          <!--                          <label class="mb-0"-->
                          <!--                          >{{ $t("credit_limit") }} (-->
                          <!--                            {{ baseCurrencyCode }} )</label-->
                          <!--                          >-->
                          <!--                          <v-text-field-->
                          <!--                              class="mt-1"-->
                          <!--                              outlined-->
                          <!--                              tage="Credit Limit"-->
                          <!--                              v-model="creditLimit"-->
                          <!--                              placeholder="10000000"-->
                          <!--                          />-->
                          <!--                          <label class="mb-0">{{-->
                          <!--                              $t("default_payment_option")-->
                          <!--                            }}</label>-->
                          <!--                          <v-select-->
                          <!--                              class="mt-1"-->
                          <!--                              :items="paymentOptions"-->
                          <!--                              tage="Default Payment Method"-->
                          <!--                              placeholder="Cash"-->
                          <!--                              :item-text="(item) => `${item.code} - ${item.name}`"-->
                          <!--                              v-model="mPaymentMethod"-->
                          <!--                              item-value="id"-->
                          <!--                              :rules="[(v) => !!v || $t('is_required')]"-->
                          <!--                              return-object-->
                          <!--                              outlined-->
                          <!--                          />-->

                          <label class="mb-0">{{ $t("cash_payment") }}</label>
                          <v-select
                            class="mt-1"
                            :items="cashPayment"
                            tage="Cash Payment"
                            :rules="[(v) => !!v || 'Cash payment is required']"
                            :item-text="(item) => `${item.code} - ${item.name}`"
                            v-model="supplier.cashPayment"
                            return-object
                            outlined
                          />
                          <label class="label">{{
                            $t("cheque_payment")
                          }}</label>
                          <v-select
                            class="mt-1"
                            outlined
                            return-object
                            id=""
                            :items="chequePayment"
                            item-text="name"
                            tage="PaymentOption"
                            item-value="id"
                            clearable
                            v-model="supplier.chequePayment"
                          />
                          <label class="label">{{
                            $t("bank_disbursement")
                          }}</label>
                          <v-select
                            class="mt-1"
                            outlined
                            return-object
                            id=""
                            :items="bankDisbursement"
                            item-text="name"
                            tage="PaymentOption"
                            item-value="id"
                            clearable
                            v-model="supplier.bankDisbursement"
                          />
                        </v-col>

                        <v-col class="py-0" sm="6" cols="12">
                          <v-row>
                            <v-col cols="12" class="py-0">
                              <v-dialog
                                v-model="dialogVendorBank"
                                max-width="500px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-btn
                                    disabled
                                    rounded
                                    @click="onNewAddressClick"
                                    class="btn_create_new float-right mb-4"
                                    v-on="on"
                                  >
                                    {{ $t("vendor_bank_info") }}
                                  </v-btn>
                                </template>
                                <v-card elevation="0">
                                  <div class="modal_header">
                                    <v-card-title
                                      >{{ $t("vendor_bank_info") }}
                                    </v-card-title>
                                    <v-icon @click="dialogVendorBank = false">
                                      close
                                    </v-icon>
                                  </div>
                                  <v-card-text class="modal_text_content">
                                    <v-row class="mt-3">
                                      <v-col cols="12" sm="6" class="pb-0">
                                        <label class="mb-0">{{
                                          $t("info_name")
                                        }}</label>
                                        <v-text-field class="mt-1" outlined />
                                        <label class="label mb-0">{{
                                          $t("bank")
                                        }}</label>
                                        <v-select class="mt-1" outlined />
                                        <label class="mb-0">{{
                                          $t("type_of_account")
                                        }}</label>
                                        <v-text-field class="mt-1" outlined />
                                      </v-col>
                                      <v-col sm="6" cols="12" class="pb-0">
                                        <label class="mb-0">{{
                                          $t("account_name")
                                        }}</label>
                                        <v-text-field class="mt-1" outlined />
                                        <label class="mb-0">{{
                                          $t("account_number")
                                        }}</label>
                                        <v-text-field class="mt-1" outlined />
                                        <label class="mb-0">{{
                                          $t("name_on_check")
                                        }}</label>
                                        <v-text-field class="mt-1" outlined />
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                  <v-card-actions
                                    class="modal_footer d-flex justity-space-between"
                                  >
                                    <v-btn
                                      outlined
                                      color="primary"
                                      class="black--text "
                                      @click="dialogVendorBank = false"
                                      >{{ $t("cancel") }}
                                    </v-btn>
                                    <v-btn class="white--text " color="primary">
                                      {{ $t("save_close") }}
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-col>
                            <v-col cols="12" class="py-0">
                              <kendo-datasource
                                ref="gridbankAddressDS"
                                :data="[]"
                              />
                              <kendo-grid
                                id="gridbankAddress"
                                class="grid-function"
                                :data-source-ref="'gridbankAddressDS'"
                                :editable="false"
                              >
                                <kendo-grid-column
                                  :field="'no'"
                                  :title="$t('no')"
                                  :template="rowNumberTmpl"
                                  :width="40"
                                  :column-menu="false"
                                  :headerAttributes="{
                                    style: 'background-color: #EDF1F5;',
                                    class: 'text-center',
                                  }"
                                  :attributes="{ style: 'text-align: center' }"
                                />
                                <kendo-grid-column
                                  :field="'name'"
                                  :attributes="{ class: 'tb_name_td' }"
                                  :title="$t('name')"
                                  :width="140"
                                  :template="'<span>#=name#</span>'"
                                  :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                />
                                <kendo-grid-column
                                  :field="'type'"
                                  :title="$t('type')"
                                  :width="100"
                                  :template="'<span>#=type#</span>'"
                                  :headerAttributes="{
                                    style: 'background-color: #EDF1F5',
                                  }"
                                />
                                <kendo-grid-column
                                  :field="''"
                                  :title="$t('action')"
                                  :width="80"
                                  :command="[
                                    {
                                      iconClass: 'k-icon k-i-edit',
                                      text: 'Edit',
                                      click: goEditAddress,
                                    },
                                  ]"
                                  :headerAttributes="{
                                    style:
                                      'text-align: left; background-color: #EDF1F5',
                                  }"
                                />
                              </kendo-grid>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-tab-item>
                    <!-- item3 -->
                    <v-tab-item eager>
                      <v-row>
                        <v-col class="py-0" cols="12">
                          <p class="color_grey">
                            {{ $t("inv_vendor_func_tax") }}
                          </p>
                        </v-col>
                        <v-col class="py-0" sm="6" cols="12">
                          <label class="label mb-0">{{
                            $t("account_payable")
                          }}</label>
                          <v-select
                            class="mt-1"
                            v-model="mAccPayable"
                            :items="accPayable"
                            item-value="id"
                            :item-text="
                              (item) => `${item.number} - ${item.name}`
                            "
                            return-object
                            placeholder="Account Payable"
                            tage="Account Payable"
                            :rules="[(v) => !!v || $t('is_required')]"
                            outlined
                          >
                          </v-select>
                          <label class="label mb-0">{{
                            $t("purchase_deposit")
                          }}</label>
                          <v-select
                            class="mt-1"
                            v-model="mAccDeposit"
                            :items="accDeposit"
                            item-value="id"
                            :item-text="
                              (item) => `${item.number} - ${item.name}`
                            "
                            return-object
                            tage="Sale Deposit"
                            :rules="[(v) => !!v || $t('is_required')]"
                            placeholder="Sale Deposit Account"
                            outlined
                          >
                          </v-select>
                        </v-col>
                        <v-col class="py-0" sm="6" cols="12">
                          <!-- <label class="label mb-0">{{
                                                      $t("default_purchase_tax")
                                                    }}</label>
                                                    <v-select
                                                      class="mt-1"
                                                      v-model="purchaseTax"
                                                      :items="vat"
                                                      item-value="id"
                                                      item-text="defaultTax"
                                                      return-object
                                                      tage="Default Purchase Tax"
                                                      placeholder="VAT (10%)"
                                                      outlined
                                                    >
                                                    </v-select>
                                                    <label class="label mb-0">{{
                                                      $t("default_witholding_tax")
                                                    }}</label>
                                                    <v-select
                                                      class="mt-1"
                                                      v-model="mWitholdingTax"
                                                      :items="defaultTaxOnShipping"
                                                      item-value="id"
                                                      item-text="defaultTax"
                                                      return-object
                                                      tage="Default Witholding Tax"
                                                      placeholder="VAT (10%)"
                                                      outlined
                                                    >
                                                    </v-select> -->
                          <label class="label mb-0">{{
                            $t("settlement_discount")
                          }}</label>
                          <v-select
                            class="mt-1"
                            v-model="mAccDiscount"
                            :items="accDiscount"
                            item-value="id"
                            :item-text="
                              (item) => `${item.number} - ${item.name}`
                            "
                            return-object
                            :rules="[(v) => !!v || $t('is_required')]"
                            tage="Settlement Discount"
                            placeholder="Receipt Settlement Discount"
                            outlined=""
                          />
                          <label class="label mb-0">{{
                            $t("expense_account")
                          }}</label>
                          <v-select
                            class="mt-1"
                            v-model="expenseAcc"
                            :items="expenseAccs"
                            item-value="id"
                            :item-text="
                              (item) => `${item.number} - ${item.name}`
                            "
                            return-object
                            placeholder="Expense Account"
                            outlined=""
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-tab-item>
                    <v-tab-item eager>
                      <editor
                        ref="vendorIndvoiceNote"
                        :resizable-content="true"
                        :resizable-toolbar="true"
                        :value="supplier.noteOnInvoice"
                        style="height:120px"
                        class="mt-1"
                        rows="10"
                        cols="30"
                      />
                    </v-tab-item>
                    <v-tab-item eager>
                      <v-col sm="12" class="py-0">
                        <h2 class="font_20 width_100">
                          {{ $t("default_image") }}
                        </h2>
                        <v-row>
                          <v-col sm="5" cols="12" lass="py-0">
                            <p class="color_grey font_14">
                              {{ $t("add_funct_prod_variant_desc3") }}
                            </p>
                          </v-col>
                          <v-col sm="7" cols="12" class="py-0">
                            <v-img width="100px" height="150px" :src="src" />
                            <label>
                              <input
                                type="file"
                                name="image"
                                id="image"
                                :rules="fileSizeRules"
                                accept=".png, .jpg, .jpeg"
                                ref="fileupload"
                                @change="onFileChange"
                              />
                            </label>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-tab-item>
                  </v-tabs>

                  <v-divider class="mt-4" />
                  <v-card outlined dense class="no_border function_footer">
                    <v-btn
                      color="primary"
                      outlined
                      @click="cancel"
                      class="text-capitalize  black--text float-left"
                    >
                      {{ $t("cancel") }}
                    </v-btn>
                    <v-btn
                      color="primary"
                      @click="onSaveClose"
                      class="ml-2 float-right text-capitalize  white--text"
                    >
                      {{ $t("save_close") }}
                    </v-btn>
                    <!--                    <v-btn-->
                    <!--                        color="secondary"-->
                    <!--                        class="float-right white&#45;&#45;text text-capitalize "-->
                    <!--                    >-->
                    <!--                      {{ $t("save_new") }}-->
                    <!--                    </v-btn>-->
                  </v-card>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true" />
    </v-container>
  </v-app>
</template>

<script>
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import { uuid } from "vue-uuid";
import SupplierModel from "@/scripts/model/Supplier";
import { i18n } from "@/i18n";
import { Editor } from "@progress/kendo-editor-vue-wrapper";

const supplierModel = new SupplierModel({});
const accountHandler = require("@/scripts/handler/accounting/accountHandler");
const supplierHandler = require("@/scripts/supplierHandler");
const supplierTypeHandler = require("@/scripts/supplierTypeHandler");
const settingHandler = require("@/scripts/settingHandler");
const paymentOptionHandler = require("@/scripts/paymentOptionHandler");
const settingsHandler = require("@/scripts/settingsHandler");
const otherHandler = require("@/scripts/otherHandler");
const priceLevelHandler = require("@/scripts/priceLevelHandler");
// import {DropDownList} from '@progress/kendo-vue-dropdowns'
import kendo from "@progress/kendo-ui";
import { PAYMENT_OPINION_TYPE } from "@/scripts/default_setup/Setting";
import PaymentOptionModel from "@/scripts/model/PaymentOption";

const $ = require("jquery");
const textField = "name";
const keyField = "id";
const defaultItem = { [textField]: "Select supplier...", [keyField]: null };
const emptyItem = { [textField]: "loading ..." };
const pageSize = 10;

const loadingData = [];
while (loadingData.length < pageSize) {
  loadingData.push({ ...emptyItem });
}

const instituteHandler = require("@/scripts/instituteHandler");
const OPTION_TYPE = "Supplier";
const strFilter = "?optionType=" + OPTION_TYPE;
const strFilterTerm = "?type=pmt-supplier";

/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

export default {
  name: "IndividualSupplier",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    "app-datepicker": DatePickerComponent,
    editor: Editor,
  },
  data: () => ({
    isHideBar: false,
    showLoading: false,
    dialogVendorBank: false,
    dialogM2: false,
    alert: false,
    addressType: ["Billing", "Delivery", "Contact"],
    deliveryMethod: [],
    genderItem: supplierHandler.gender(),
    valid: true,
    supplier: supplierModel,
    supplierTypes: [],
    subOfSupplierItem: [],
    subOfSupplier: [],
    billByParent: [],
    contactAddress: [],
    paymentBilling: [],
    accountTax: [],
    supplierList: [],
    tax: [],
    vat: [],
    purchaseTax: {},
    customerBillToItem: [],
    customerBillTo: [],
    countries: [],
    address: {
      id: "",
      name: "",
      type: "",
      country: {},
      line1: "",
      line2: "",
    },
    paymentOptions: [],
    paymentTerms: [],
    mPaymentMethod: {},
    mPaymentTerm: {},
    accPayable: [],
    mAccPayable: {},
    accDeposit: [],
    mAccDeposit: {},
    accDiscount: [],
    mAccDiscount: {},
    priceLevel: [],
    mPriceLevel: {},
    registeredDate: new Date().toISOString().substr(0, 10),
    imgFile: "",
    src: "",
    fileSizeRules: [
      (files) =>
        !files ||
        !files.some((file) => file.size > 1024 * 1024) ||
        "Image size should be less than 1 MB!",
    ],
    newClick: false,
    popupSettings: {
      height: "250px",
    },
    defaultItem: defaultItem,
    baseUrl: supplierHandler.search(),
    init: { method: "GET", accept: "application/json", headers: [] },
    pendingRequest: undefined,
    requestStarted: false,
    skip: 0,
    tempSkip: null,
    total: 0,
    filter: "",
    textField: "name",
    dataItemKey: "id",
    baseCurrencyCode: "",
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    cashPayment: [],
    chequePayment: [],
    bankDisbursement: [],
    expenseAcc: {},
    expenseAccs: [],
  }),
  methods: {
    async loadInstituteInfo() {
      new Promise((resolve) => {
        setTimeout(() => {
          instituteHandler.getOneCompany(cookie.instituteId).then((res) => {
            const company = res;
            if (company.hasOwnProperty("baseCurrency")) {
              if (company.baseCurrency.hasOwnProperty("code")) {
                this.baseCurrencyCode = company.baseCurrency.code;
              }
            }
          });
          resolve("resolved");
        }, 10);
      });
    },
    close(data) {
      if (this.$route.params.query !== undefined) {
        window.console.log(this.$route.params.query, "id--");
        window.history.go(-1);
      } else {
        // window.console.log(data, 'id-cus--')
        this.$router.push({
          name: "Vendors",
          params: {
            data: data,
          },
        });
      }
    },
    requestData(skip, filter) {
      const url = this.baseUrl + `?filter=${filter}`;
      // `search?$filter='${filter}'&$skip=${skip}&$top=${pageSize}&$count=true`;
      this.requestStarted = true;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.afterFetch);
    },
    onChange(event) {
      const value = event.value;
      if (value && value[textField] === emptyItem[textField]) {
        return;
      }
      this.supplier.subOfSupplier = value;
    },
    afterFetch(json) {
      this.supplierList = json.data;
    },
    onFilterChange(event) {
      const filter = event.filter.value;
      // this.resetCach();
      this.requestData(0, filter);
      // this.dataItems = loadingData;
      // this.skip = 0;
      this.filter = filter;
    },
    onNewAddressClick() {
      this.newClick = true;
      this.address = {};
    },
    async loadCountry() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          otherHandler.country().then((res) => {
            this.showLoading = false;
            this.countries = res;
          });
        }, 10);
      });
    },
    onSaveCloseAddress() {
      if (this.addresses) {
        if (this.newClick) {
          this.address.id = uuid.v1();
          this.addresses.push({
            id: this.address.id,
            name: this.address.name,
            type: this.address.type,
            country: this.address.country,
            line1: this.address.line1,
            line2: this.address.line2,
          });
        } else {
          const addr = this.address;
          const index = this.addresses.findIndex((item) => {
            return addr.id === item.id;
          });
          if (index < 0) {
            this.addresses.push(addr);
          } else {
            this.addresses.splice(index, 1, addr);
          }
        }
      }
      this.dialogM2 = false;
    },
    goEditAddress(e) {
      this.newClick = false;
      e.preventDefault();
      let grid = kendo.jQuery("#gridAddress").data("kendoGrid");
      let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
      this.address = dataItem;
      this.mCountry = dataItem.country;
      this.dialogM2 = true;
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.gridAddressDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    onFileChange(e) {
      // const file = e.target.files[0];
      let input = e.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        if (input.files[0].size > 1024 * 1024) {
          e.preventDefault();
          alert("File too big (> 1MB)");
          this.src = "";
          this.imgFile = "";
          this.$refs.fileupload.value = null;
        } else {
          // create a new FileReader to read this image and convert to base64 format
          let reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onloadend = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.imgFile = e.target.result;
          };
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsBinaryString(input.files[0]);
          // this.url = input.files[0]
          this.src = URL.createObjectURL(e.target.files[0]);
        }
      }
    },
    async loadPriceLevel() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const strFilter = "?nature=purchase";
          priceLevelHandler.get(strFilter).then((res) => {
            this.priceLevel = res;
          });
        }, 10);
      });
    },
    async initData() {
      // window.console.log('me', this.customer)
      if (this.$route.params.id !== undefined) {
        await this.loadSingleSupplier();
      } else {
        // this.clear()
      }
    },
    clear() {
      this.supplier = new SupplierModel();
    },
    supplierTypeChange() {
      // window.console.log('cus type changed', this.customer.type)
      if (this.supplier.hasOwnProperty("supplierType")) {
        const supplierType = this.supplier.supplierType || {};
        this.purchaseTax = supplierType.purchaseTax || {};
        this.mAccDeposit = supplierType.purchaseDepositAcc || {};
        this.mAccDiscount = supplierType.purchaseDiscountAcc || {};
        this.mAccPayable = supplierType.apAcc || {};
        // Load Prefix
        this.supplier.number = this.pad(1, 6);
        window.console.log('supplierType.priceLevel', this.supplier)
        this.supplier.priceLevel = supplierType.priceLevel || {};
        this.supplier.chequePayment = supplierType.chequePayment || {};
        this.supplier.cashPayment = supplierType.cashPayment || {};
        this.supplier.bankDisbursement = supplierType.bankDisbursement || {};
      }
      // let match = this.customerItem.filter(m => m.supplierType.name === this.supplierType.name).map(item => {
      //     return {
      //         id: item.uuid,
      //     }
      // })
      // window.console.log(match.length)
      // let num = match.length + 1
      // this.customer.number = this.pad(num, 6)
      // // window.console.log(this.pad(num, 6))
      // window.console.log(this.customer.number)
      // Vue.nextTick()
    },
    pad(value, length) {
      return ("0".repeat(length) + value).slice(-length);
    },
    removeRow() {},
    numberChange() {
      let oldnum = this.supplier.number;
      let match1 = this.customerItem
        .filter((m) => m.number === this.supplier.number)
        .map((item) => {
          return {
            id: item.uuid,
          };
        });
      if (match1.length > 0) {
        this.supplier.number = oldnum;
        // this.supplierTypeChange()
        this.$snotify.error("Number is exist!");
      }
    },
    errorMessage() {},
    addRow() {},
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
          this.clear()
          this.$router.go(-1);
        }
      });
    },
    async onSaveClose() {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        this.$snotify.error(
          "Field is required, please check field each of tabs!"
        );
        return;
      }
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          // window.console.log(this.mShipVAT)
          const editorNote = this.$refs.vendorIndvoiceNote.kendoWidget();
          this.supplier.noteOnInvoice = editorNote.value();
          let data =  new SupplierModel({
            id: this.supplier.id ? this.supplier.id : "",
            name: this.supplier.name,
            alternativeName: this.supplier.alternativeName,
            supplierType: this.supplier.supplierType,
            type: "Individual",
            number: this.supplier.number,
            subOfSupplier: this.supplier.subOfSupplier,
            registeredDate: this.supplier.registeredDate,
            consumerId: this.supplier.consumerId,
            taxId: "",
            contactAddress: {
              gender: this.gender,
              phoneNumber: this.phone,
              email: this.email,
              dob: this.dob,
              address: this.addresses,
              latitude: this.latitude,
              longitude: this.longitude,
              website: "",
              description: "",
            },
            paymentBilling: {
              paymentTerm: this.mPaymentTerm,
              paymentOption: this.mPaymentMethod,
              assignTo: {},
              creditLimit: this.creditLimit,
              priceLevel: this.supplier.priceLevel || {},
              bankName: this.bankName,
              bankAccountName: this.bankAccountName,
              bankAccountNumber: this.bankAccountNumber,
              bankAccountCheque: this.bankCheque,
            },
            accountTax: {
              apAcc: this.mAccPayable,
              purchaseDepositAcc: this.mAccDeposit,
              purchaseDiscountAcc: this.mAccDiscount,
              purchaseTax: this.purchaseTax,
              expenseAcc: this.expenseAcc,
            },
            noteOnInvoice: this.supplier.noteOnInvoice,
            file: this.imgFile,
            image: this.supplier.image,
            attachFile: {},
            loggedUser: this.loggedUser,
            priceLevel: this.supplier.priceLevel,
            cashPayment: new PaymentOptionModel(
              this.supplier.cashPayment || {}
            ),
            chequePayment: new PaymentOptionModel(
              this.supplier.chequePayment || {}
            ),
            bankDisbursement: new PaymentOptionModel(
              this.supplier.bankDisbursement || {}
            ),
          });
          this.showLoading = true;
          // window.console.log(data, 'data')
          supplierHandler
            .create(data)
            .then((response) => {
              if (response.data.statusCode === 201) {
                this.showLoading = false;
                // this.loadCustomerType()
                this.clear()
                this.close(response.data.data);
                // this.$refs.form.reset()
                this.$snotify.success("Successfully");
              } else {
                this.showLoading = false;
              }
            })
            .catch(() => {
              this.showLoading = false;
              this.$snotify.error("Something went wrong");
            });
        }, 10);
      });
    },
    async loadSupplierType() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          supplierTypeHandler.get().then((res) => {
            this.supplierTypes = res.filter((m) => {
              return m.nature.name.includes("Individual");
            });
            // // window.console.log(res)
            // if (this.supplierTypes.length > 0) {
            //   this.supplier["supplierType"] = this.supplierTypes[0];
            //   this.supplierTypeChange();
            // }
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
            if (this.accPayable.length > 0) {
              this.mAccPayable = this.accPayable[0];
            }
            //Deposit Account
            this.accDeposit = res.data
              .filter(
                (m) =>
                  m.account_type.number === 9 || m.account_type.number === 17
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
            if (this.accDeposit.length > 0) {
              this.mAccDeposit = this.accDeposit[0];
            }
            //Discount Account
            this.accDiscount = res.data
              .filter((m) => m.account_type.number === 40)
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
            if (this.accDiscount.length > 0) {
              this.mAccDiscount = this.accDiscount[0];
            }
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
              this.expenseAcc = this.expenseAccs[0];
            }
          });
        }, 10);
      });
    },
    async loadTax() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingHandler.get().then((res) => {
            this.showLoading = false;
            this.tax = res;
            let vAT = this.tax.filter(
              (m) => m.taxType.typeId === 1 && m.transactionType === "Purchase"
            ); // valuable tax
            this.vat = vAT; // valuable tax
            if (this.vat.length > 0) {
              this.purchaseTax = this.vat[0];
            }

            let vATs = this.tax.filter((m) => m.taxType.typeId === 2); // WitholdingTax
            this.defaultTaxOnShipping = vATs; // valuable tax
            if (this.defaultTaxOnShipping.length > 0) {
              this.mWitholdingTax = this.defaultTaxOnShipping[0];
            }
          });
        }, 10);
      });
    },
    async loadPaymentOption() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");

          paymentOptionHandler.list(strFilter).then((res) => {
            this.paymentOptions = [];
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              const data = res.data.data || [];
              this.cashPayment = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.CASH_PAYMENT
              );
              this.bankDisbursement = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.BANK_DISBURSEMENT
              );
              this.chequePayment = data.filter(
                (m) => m.type === PAYMENT_OPINION_TYPE.CHEQUE_PAYMENT
              );
            }
          });
        }, 10);
      });
    },

    async loadPaymentTerm() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          settingsHandler.getPaymentTerm(strFilterTerm).then((res) => {
            this.showLoading = false;
            this.paymentTerms = [];
            if (res.data.statusCode === 200) {
              this.paymentTerms = res.data.data;
              if (this.paymentTerms.length > 0) {
                this.mPaymentTerm = this.paymentTerms[0];
              }
            }
          });
        }, 10);
      });
    },
    async loadSingleSupplier() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          if (this.$route.params.id) {
            this.showLoading = true;
            supplierHandler.get(this.$route.params.id).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                // let checkOldNote = res.data.data[0].noteOnInvoice;
                // if (typeof checkOldNote == "object") {
                //   res.data.data[0].noteOnInvoice = "";
                // }
                this.supplier = res.data.data[0];
                // this.mPaymentTerm = this.supplier.paymentBilling.hasOwnProperty("paymentTerm") ? this.supplier.paymentBilling.paymentTerm : {};
                // this.mPaymentMethod = this.supplier.paymentBilling.hasOwnProperty("paymentOption") ? this.supplier.paymentBilling.paymentOption : {};
                // this.mPriceLevel = this.supplier.paymentBilling.hasOwnProperty("priceLevel") ? this.supplier.paymentBilling.priceLevel : {};
                this.mAccPayable = this.supplier.accountTax.hasOwnProperty(
                  "apAcc"
                )
                  ? this.supplier.accountTax.apAcc
                  : {};
                this.mAccDiscount = this.supplier.accountTax.hasOwnProperty(
                  "purchaseDiscountAcc"
                )
                  ? this.supplier.accountTax.purchaseDiscountAcc
                  : {};
                this.mAccDeposit = this.supplier.accountTax.hasOwnProperty(
                  "purchaseDepositAcc"
                )
                  ? this.supplier.accountTax.purchaseDepositAcc
                  : {};
                this.purchaseTax = this.supplier.accountTax.hasOwnProperty(
                  "purchaseTax"
                )
                  ? this.supplier.accountTax.purchaseTax
                  : {};
                this.expenseAcc = this.supplier.accountTax.hasOwnProperty(
                  "expenseAcc"
                )
                  ? this.supplier.accountTax.expenseAcc
                  : {};
                this.supplier.priceLevel = this.supplier.priceLevel || {};

                const hasImg = this.supplier.hasOwnProperty("image");
                this.src = "";
                let imgUrl = "";
                if (hasImg) {
                  if (this.supplier.image.hasOwnProperty("default")) {
                    imgUrl = this.supplier.image.default.thumb;
                    this.src =
                      "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" +
                      imgUrl;
                  }
                }
              }
            });
          }
        }, 10);
      });
    },
    async loadTaxAndAccountByCustomerType() {},
    async loadSubOfSupplier() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          supplierHandler.list().then((res) => {
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.supplierList = res.data.data;
            }
          });
        }, 10);
      });
    },
  },
  watch: {
    $route: "loadSingleSupplier",
  },
  mounted: async function() {
    this.requestData(0, this.filter);
    await this.loadTax();
    await this.loadPaymentOption();
    // await this.loadPaymentTerm();
    await this.loadSupplierType();
    await this.initData();
  },
  created: async function() {
    await this.loadAccount();
    await this.loadPriceLevel();
    await this.loadCountry();
    await this.loadInstituteInfo();
  },
  computed: {
    virtual: function() {
      return {
        pageSize: pageSize,
        // @ts-ignore
        skip: this.skip,
        // @ts-ignore
        total: this.total,
      };
    },
    creditLimit: {
      get() {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (this.supplier.paymentBilling.hasOwnProperty("creditLimit")) {
            return this.supplier.paymentBilling.creditLimit;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (this.supplier.paymentBilling.hasOwnProperty("creditLimit")) {
            this.supplier.paymentBilling.creditLimit = value;
          }
        }
      },
    },
    addresses: {
      get() {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("address")) {
            return this.supplier.contactAddress.address;
          } else {
            return [];
          }
        } else {
          return [];
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("address")) {
            this.supplier.contactAddress.address.push(value);
          }
        }
      },
    },
    gender: {
      get() {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("gender")) {
            return this.supplier.contactAddress.gender;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("gender")) {
            this.supplier.contactAddress.gender = value;
          }
        }
      },
    },
    email: {
      get() {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("email")) {
            return this.supplier.contactAddress.email;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("email")) {
            this.supplier.contactAddress.email = value;
          }
        }
      },
    },
    dob: {
      get() {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("dob")) {
            return this.supplier.contactAddress.dob;
          } else {
            return new Date().toISOString().substr(0, 10);
          }
        } else {
          return new Date().toISOString().substr(0, 10);
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("dob")) {
            this.supplier.contactAddress.dob = value;
          }
        }
      },
    },
    latitude: {
      get() {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("latitude")) {
            return this.supplier.contactAddress.latitude;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("latitude")) {
            this.supplier.contactAddress.latitude = value;
          }
        }
      },
    },
    longitude: {
      get() {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("longitude")) {
            return this.supplier.contactAddress.longitude;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("longitude")) {
            this.supplier.contactAddress.longitude = value;
          }
        }
      },
    },
    phone: {
      get() {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("phoneNumber")) {
            return this.supplier.contactAddress.phoneNumber;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("contactAddress")) {
          if (this.supplier.contactAddress.hasOwnProperty("phoneNumber")) {
            this.supplier.contactAddress.phoneNumber = value;
          }
        }
      },
    },
    bankName: {
      get() {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (this.supplier.paymentBilling.hasOwnProperty("bankName")) {
            return this.supplier.paymentBilling.bankName;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (this.supplier.paymentBilling.hasOwnProperty("bankName")) {
            this.supplier.paymentBilling.bankName = value;
          }
        }
      },
    },
    bankAccountName: {
      get() {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (this.supplier.paymentBilling.hasOwnProperty("bankAccountName")) {
            return this.supplier.paymentBilling.bankAccountName;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (this.supplier.paymentBilling.hasOwnProperty("bankAccountName")) {
            this.supplier.paymentBilling.bankAccountName = value;
          }
        }
      },
    },
    bankAccountNumber: {
      get() {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (
            this.supplier.paymentBilling.hasOwnProperty("bankAccountNumber")
          ) {
            return this.supplier.paymentBilling.bankAccountNumber;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (
            this.supplier.paymentBilling.hasOwnProperty("bankAccountNumber")
          ) {
            this.supplier.paymentBilling.bankAccountNumber = value;
          }
        }
      },
    },
    bankCheque: {
      get() {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (
            this.supplier.paymentBilling.hasOwnProperty("bankAccountCheque")
          ) {
            return this.supplier.paymentBilling.bankAccountCheque;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      set(value) {
        if (this.supplier.hasOwnProperty("paymentBilling")) {
          if (
            this.supplier.paymentBilling.hasOwnProperty("bankAccountCheque")
          ) {
            this.supplier.paymentBilling.bankAccountCheque = value;
          }
        }
      },
    },
  },
  destroyed() {
    // this.resetCach()
  },
};
</script>

<style scoped>
.k-dropdown {
  width: 100%;
  margin-top: 2px;
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

.color_green {
  color: #03b154;
}

@media (min-width: 1264px) {
  .container {
    /* max-width: 1250px; */
    max-width: 1080px;
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
  max-width: 0%;
  transition: 0.5s ease-in;
  flex: 0 0 0%;
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
  height: 95%;
  margin-top: 15.4%;
  position: relative;
  padding: 10px;
  background-color: #edf1f5;
}

.iconArrow {
  margin-right: -17px;
  right: 35.8%;
  top: 7%;
  position: absolute;
}

.iconArrowHide {
  top: 7%;
  position: absolute;
  right: 8.6%;
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

.v-tab--active {
  background-color: #f8f8f9 !important;
  border-left: none;
}
.v-tab.v-tab {
    color: inherit;
    font-size: 16px !important;
}

.blue_block {
  background-color: #e2f0d9;
  min-height: 100px;
}

.v-tabs {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  background: #ffffff;

  width: 100%;
  border: 2px solid #dae0e8;
}

.v-window__container {
  padding: 14px !important;
}

.btn_round_new {
  background-color: #00b050 !important;
  color: #ffffff;
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
  border-bottom: 1px solid #000 !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: 1px solid #000 !important;
}

.v-slide-group__content {
  background-color: #f8f8f9 !important;
}

.v-tab--active {
  background-color: #ffffff !important;
  border-left: none;
}
</style>
