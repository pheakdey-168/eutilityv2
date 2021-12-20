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
                        <v-row>
                            <v-col
                                class="bigSide py-0"
                                sm="8"
                                cols="12"
                                style="transition: .3s ease-in;"
                                :class="{ hide_big_bar_class: isHideBar }"
                            >
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-card outlined dense class="no_border">
                                        <h2 class="mb-0">{{ $t("cash_payment") }}</h2>
                                        <v-icon
                                            v-if="isHideBar"
                                            @click="cancel()"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                        <span
                                            style="transition: .3s ease-in; z-index:10;"
                                            :class="{
                        iconArrow: !isHideBar,
                        iconArrowHide: isHideBar,
                      }"
                                        >
                      <v-icon
                          size="22"
                          class="arr_icon"
                          @click="hide_smallsitebar"
                          v-if="isHideBar"
                      >
                        mdi-chevron-left-circle
                      </v-icon>
                      <v-icon
                          size="22"
                          class="arr_icon"
                          @click="hide_smallsitebar"
                          v-if="!isHideBar"
                      >
                        mdi-chevron-right-circle
                      </v-icon>
                    </span>
                                    </v-card>

                                    <v-card
                                        outlined
                                        dense
                                        class="px-3 no_border"
                                        color="grayBg"
                                    >
                                        <v-row>
                                            <v-col sm="7" cols="12" class="pb-0">
                                                <label class="label">{{ $t("search") }}</label>
                                                <v-row>
                                                    <v-col cols="10" class=" py-0 pr-1">
                                                        <v-text-field
                                                            class="mt-1"
                                                            outlined
                                                            :placeholder="$t('search_by_invoice_number')"
                                                        />
                                                    </v-col>
                                                    <v-col cols="2" class="pl-1 py-0">
                                                        <v-text-field class="mt-1" outlined disabled/>
                                                    </v-col>
                                                </v-row>
                                                <label class="label mb-0">{{ $t("segment") }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="suppliers"
                                                    :rules="[
                            (v) => !!v || 'Transaction Currency is required',
                          ]"
                                                    return-object
                                                    tage="Segment"
                                                    outlined
                                                />
                                            </v-col>
                                            <v-col sm="5" cols="12" class="">
                                                <label class="label mb-0">{{ $t("date") }}</label>
                                                <app-datepicker
                                                    :initialDate="journal_date"
                                                    @emitDate="journal_date = $event"
                                                />
                                                <label class="label mb-0">{{
                                                        $t("deposit_currency")
                                                    }}</label>
                                                <v-select
                                                    class="mt-1"
                                                    :items="suppliers"
                                                    placeholder="Deposit Currency"
                                                    outlined
                                                    tage="Deposit Currency"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-card>

                                    <v-row style="background-color: #fff;">
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <kendo-datasource
                                                ref="dataSource"
                                                :data="suppliers_item"
                                            />
                                            <kendo-grid
                                                id="grid"
                                                class="grid-function"
                                                :data-source-ref="'dataSource'"
                                                :sortable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :selected-field="selectedField"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                                @selectionchange="onSelectionChange"
                                                @headerselectionchange="onHeaderSelectionChange"
                                            >
                                                <kendo-grid-column
                                                    :field="'purchase_no'"
                                                    :title="$t('purchase_no')"
                                                    :width="200"
                                                    :template="'<span>#=item.name#</span>'"
                                                    :editor="accountDropDownEditor"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'suppliers_invoice'"
                                                    :title="$t('suppliers_invoice')"
                                                    :width="200"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :width="160"
                                                    :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'account'"
                                                    :title="$t('account')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                />
                                                <kendo-grid-column
                                                    :field="'method'"
                                                    :title="$t('method')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'ref'"
                                                    :title="$t('ref')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'payment'"
                                                    :title="$t('payment')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'discount_value'"
                                                    :title="$t('discount_value')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :field="'discount_amount'"
                                                    :title="$t('discount_amount')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                    :attributes="{
                            style: 'text-align: right',
                          }"
                                                />
                                                <kendo-grid-column
                                                    :command="{
                            iconClass: 'k-icon k-i-trash',
                            text: 'Delete',
                            click: removeRow,
                            class: 'btn-plus',
                          }"
                                                    :title="'&nbsp;'"
                                                    :width="100"
                                                    :headerAttributes="{
                            style:
                              'text-align: right; background-color: #EDF1F5',
                          }"
                                                />
                                            </kendo-grid>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pb-0">
                                            <v-row>
                                                <v-col sm="4" cols="4" class="">
                                                    <template>
                                                        <v-file-input
                                                            class="mt-0 pt-0 "
                                                            sm="3"
                                                            cols="6"
                                                            v-model="files"
                                                            :placeholder="$t('attachment')"
                                                            multiple
                                                            prepend-icon="mdi-paperclip"
                                                        >
                                                            <template v-slot:selection="{ text }">
                                                                <v-chip small label color="primary">
                                                                    {{ text }}
                                                                </v-chip>
                                                            </template>
                                                        </v-file-input>
                                                    </template>
                                                </v-col>
                                                <v-col sm="4" cols="4"/>
                                                <v-col sm="4" cols="4">
                                                    <v-simple-table>
                                                        <template v-slot:default>
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    style="height: 40px;"
                                                                    class="borderTB text-left text-uppercase"
                                                                >
                                                                    {{ $t("total") }}
                                                                </td>
                                                                <td
                                                                    style="height: 40px;"
                                                                    class="borderTB text-center"
                                                                >
                                                                    :
                                                                </td>
                                                                <td
                                                                    style="height: 40px;"
                                                                    class="borderTB text-left color_green text-bold"
                                                                >
                                                                    1,0000.00
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>
                                        </v-col>

                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <v-col sm="6" cols="12" class="pt-0">
                                                    <v-card
                                                        class="no-boxshadow pa-3"
                                                        color="grayBg"
                                                        height="130px"
                                                    >
                                                        <label>{{ $t("msg_on_voucher") }}</label>
                                                        <v-textarea
                                                            class="mt-1"
                                                            outlined
                                                            no-resize
                                                            height="80px"
                                                            rows="3"
                                                            placeholder="This will appear on the invoice"
                                                        />
                                                    </v-card>
                                                </v-col>
                                                <v-col sm="6" cols="12" class="pt-0">
                                                    <v-card
                                                        class="no-boxshadow pa-3"
                                                        color="grayBg"
                                                        height="130px"
                                                    >
                                                        <label>{{ $t("message_for_journal") }}</label>
                                                        <v-textarea
                                                            class="mt-1"
                                                            outlined
                                                            no-resize
                                                            height="80px"
                                                            rows="3"
                                                            placeholder="This will appear on the journal entry"
                                                        />
                                                    </v-card>
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
                                                    color="black"
                                                    outlined
                                                    class="mr-2 text-capitalize  black--text float-left"
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
                                                    <v-list-item-title
                                                    >{{ item.title }}
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            class="text-capitalize  v-btn--outlined float-left"
                                            @click="cancel"
                                        >{{ $t("cancel") }}
                                        </v-btn>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    color="primary"
                                                    class="ml-2 float-right text-capitalize  white--text"
                                                    v-on="on"
                                                >
                                                    {{ $t("save_option") }}
                                                    <v-icon size="" class="ma-1">expand_more</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list rounded>
                                                <v-list-item-group>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title
                                                                v-if="!isEdit"
                                                                @click="saveNew"
                                                            >
                                                                {{ $t("save_new") }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title @click="savePrint"
                                                            >{{ $t("save_print") }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-menu>
                                        <v-btn
                                            color="primary"
                                            class="float-right white--text text-capitalize "
                                        >
                                            {{ $t("save_draft") }}
                                        </v-btn>
                                    </v-card>
                                </v-form>
                            </v-col>

                            <v-col
                                class="smallSide"
                                sm="4"
                                style="transition: .3s ease-in;"
                                :class="{ hide_small_bar_class: isHideBar }"
                            >
                                <h3
                                    style="color: #b3b5bc; font-size:20px;"
                                    v-if="!isHideBar"
                                    class="text-uppercase float-right mt-n3"
                                >
                  <span class="pointer" @click="Help('cash payment')">
                    {{ $t("help") }}
                  </span>
                                    <v-icon
                                        @click="cancel()"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right mt-n1"
                                    >close
                                    </v-icon>
                                </h3>

                                <div
                                    v-if="!isHideBar"
                                    class="small_sidebar mt-9"
                                    style="background-color:#F8F8F9;"
                                >
                                    <v-card
                                        class="pa-3 no-boxshadow"
                                        style="min-height: 70px; background-color: #00b050 !important;"
                                    >
                                        <h3
                                            style="font-size: 18px"
                                            class="text-white text-uppercase mb-2"
                                        >
                                            {{ $t("amount_purchased") }}
                                        </h3>
                                        <h3
                                            class="text-bold float-right text-white"
                                            style="font-size: 22px"
                                        >
                                            200
                                        </h3>
                                    </v-card>

                                    <p class="mb-0 detial_smallside_p">
                                        {{ $t("cash_payment_funct_desc") }}
                                    </p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"
            />
        </v-container>
    </v-app>
</template>

<script>
import {i18n} from "@/i18n";
import LoadingMe from "@/components/Loading";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import {ShowResource} from "@/observable/store";

export default {
    name: "CreditPurchase",
    components: {
        LoadingMe: LoadingMe,
        "app-datepicker": DatePickerComponent,
    },
    data: () => ({
        isEdit: false,
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
        selectedField: "selected",
        bill_date: "",
        alert: false,
        deposite: 1000,
        files: [],
        // Form validation
        valid: true,

        journal_types: [],
        suppliers_item: [],
        expense: ["Equal", "weighted"],
        journal_date: "",
        templates: [
            {title: "Draft"},
            {title: "Open"},
            {title: "Paid"},
            {title: "Partially Paid"},
        ],
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        suppliers: ["Suppliers", "Customer", "Employee"],
        transaction: [
            {
                id: "12",
                name: "Purchase Order",
                no: "No.0024",
                price: "2,50000",
            },
            {
                id: "14",
                name: "Godd Recipt Note",
                no: "No.0024",
                price: "2,50000",
            },
        ],
        item_suppliers: [
            {
                name: "Subtotal",
                value: "10000.00",
            },
            {
                name: "Subtotal",
                value: "10000.00",
            },
            {
                name: "Subtotal",
                value: "10000.00",
            },
            {
                name: "Subtotal",
                value: "10000.00",
            },
            {
                name: "Subtotal",
                value: "10000.00",
            },
        ],
    }),
    methods: {
        Help(key_word) {
            ShowResource(key_word);
        },
        savePrint() {
        },
        saveNew() {
        },
        saveClose() {
        },
        removeRow() {
        },
        generateNumber() {
        },
        errorMessage() {
        },
        addRow() {
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
            }).then((result) => {
                if (result.value) {
                    this.$router.go(-1);
                }
            });
        },
        hide_smallsitebar() {
            if (!this.isHideBar) {
                // this.col_expand = 12
                // this.col_hide = 0
                this.isHideBar = true;
            } else {
                // this.col_expand = 9
                // this.col_hide = 3
                this.isHideBar = false;
            }
        },
    },
    watch: {
        // call again the method if the route changes
    },
    computed: {
        areAllSelected() {
            return this.products.findIndex((item) => item.selected === false) === -1;
        },
        columns() {
            return [
                {
                    field: "selected",
                    width: "50px",
                    headerSelectionValue: this.areAllSelected,
                },
                ...this.suppliers_item,
            ];
        },
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.loadObj()
    },
    mounted() {
    },
};
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
    padding: 0;
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
</style>
