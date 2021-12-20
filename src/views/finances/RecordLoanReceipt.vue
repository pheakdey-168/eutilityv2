<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white"
                    >
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t("record_loan_receipt") }}</h2>
                                <v-icon
                                    size="36"
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card
                                outlined
                                dense
                                class="px-4 no_border mb-4"
                                color="grayBg"
                                height="175px"
                            >
                                <v-row>
                                    <v-col sm="6" cols="12" class="py-0 ">
                                        <!-- Date -->
                                        <label class="label">{{ $t("date") }}</label>
                                        <app-datepicker
                                            :initialDate="r.issuedDate"
                                            @emitDate="r.issuedDate = $event"
                                            @onChanged="generateNumber"
                                        />

                                        <!-- Number -->
                                        <label class="label">{{ $t("number") }}</label>
                                        <v-row>
                                            <v-col sm="2" cols="3" class="pb-1 pt-1 pr-0">
                                                <div class="code_text" v-text="r.abbr"></div>
                                            </v-col>
                                            <v-col sm="8" cols="7" class="pb-1 pt-1 pl-0 pr-0">
                                                <v-text-field
                                                    class="custom-border"
                                                    v-model="r.number"
                                                    outlined
                                                    :rules="[(v) => !!v || 'Number is required']"
                                                    required
                                                />
                                            </v-col>
                                            <v-col sm="1" cols="2" class="pb-1 pt-1 pr-0">
                                                <v-icon
                                                    color="black"
                                                    size="30"
                                                    class="border_qrcode"
                                                    @click="onGenerateNumberClicked"
                                                >mdi-qrcode
                                                </v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-col>

                                    <!-- Total Approved Amount -->
                                    <v-col sm="3" cols="12" class="pb-0 pt-4">
                                        <v-card
                                            outlined
                                            style="display: block"
                                            height="140"
                                            dense
                                            class="pa-3"
                                            color="third"
                                        >
                                            <h4 class="mb-0 text-left text-white">
                                                {{ $t("approved_amount") }}
                                            </h4>
                                            <h3
                                                style="font-size: 25px"
                                                class="py-10 float-right text-right text-white"
                                            >
                                                {{ Number(loan.approvedAmount).toLocaleString() }}
                                            </h3>
                                        </v-card>
                                    </v-col>

                                    <!-- Total Amount -->
                                    <v-col sm="3" cols="12" class="pb-0 pt-4">
                                        <v-card
                                            outlined
                                            style="display: block"
                                            height="140"
                                            dense
                                            class="pa-3"
                                            color="third"
                                        >
                                            <h4 class="mb-0 text-left text-white">
                                                {{ $t("total_amount") }}
                                            </h4>
                                            <h3
                                                style="font-size: 25px"
                                                class="py-10 float-right text-right text-white"
                                            >
                                                {{ Number(totalAmount).toLocaleString() }}
                                            </h3>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-card
                                class="px-4 no_border"
                                color="white"
                                outlined>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pb-3 pa-0">
                                        <h3 class="mb-3">{{ $t("cash_bank_receipt") }}</h3>
                                        <template>
                                            <kendo-datasource
                                                ref="cashBankAccountDS"
                                                :data="cashBankAccountEntries"
                                                :change="onDrGridDataSourceChanged"
                                            />
                                            <kendo-grid
                                                id="cashBankAccountGrid"
                                                class="grid-function"
                                                :data-source-ref="'cashBankAccountDS'"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :template="cashBankAccountRowNumberTmpl"
                                                    :width="45"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5;',
                                                        class: 'text-products',
                                                    }"
                                                    :attributes="{
                                                        style: 'text-align: products',
                                                    }"
                                                />
                                                <kendo-grid-column
                                                    :field="'account'"
                                                    :title="$t('account')"
                                                    :width="200"
                                                    :template="'<span>#=account.name||``#</span>'"
                                                    :editor="cashAccountEditor"
                                                    :headerAttributes="{
                                                            style: 'background-color: #EDF1F5',
                                                        }"
                                                />
                                                <kendo-grid-column
                                                    :field="'description'"
                                                    :title="$t('description')"
                                                    :width="200"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5',
                                                    }"
                                                />
                                                <kendo-grid-column
                                                    :field="'ref_number'"
                                                    :title="$t('reference_no')"
                                                    :width="160"
                                                    :headerAttributes="{
                                                        style: 'background-color: #EDF1F5',
                                                    }"
                                                />
                                                <!-- <kendo-grid-column
                                                    :field="'amount'"
                                                    :title="$t('amount')"
                                                    :format="'{0:n}'"
                                                    :width="150"
                                                    :editable="false"
                                                    :headerAttributes="{
                                                        style: 'text-align: right; background-color: #EDF1F5',
                                                    }"
                                                    :attributes="{ style: 'text-align: right; ' }"
                                                /> -->
                                            </kendo-grid>
                                        </template>
                                        <!--                                        <v-row style="background-color: #fff">-->
                                        <!--                                            <v-col sm="1" cols="12" class="py-0">-->
                                        <!--                                                <v-btn color="primary"-->
                                        <!--                                                       class="float-left btn_plus rounded-0 white&#45;&#45;text mt-3"-->
                                        <!--                                                       name="addDrBtn"-->
                                        <!--                                                       @click="onAddRowCashBankAccountClicked">-->
                                        <!--                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>-->
                                        <!--                                                </v-btn>-->
                                        <!--                                            </v-col>-->
                                        <!--                                        </v-row>-->
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pa-0">
                                        <h3 class="mb-3">{{ $t("relate_cost_receipt") }}</h3>
                                        <kendo-datasource
                                            ref="relatedCostDS"
                                            :data="relatedCostEntries"
                                            :change="onCrGridDataSourceChanged"
                                        />
                                        <kendo-grid
                                            id="relatedCostGrid"
                                            class="grid-function"
                                            :data-source-ref="'relatedCostDS'"
                                            :sortable="false"
                                            :filterable="false"
                                            :column-menu="true"
                                            :editable="true"
                                            :scrollable-virtual="true"
                                        >
                                            <kendo-grid-column
                                                :title="$t('no.')"
                                                :template="relatedCostRowNumberTmpl"
                                                :width="45"
                                                :column-menu="false"
                                                :headerAttributes="{
                                                style: 'background-color: #EDF1F5;',
                                                    class: 'text-products',
                                                }"
                                                :attributes="{
                                                    style: 'text-align: products',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'account'"
                                                :title="$t('account')"
                                                :width="200"
                                                :template="'<span>#=account.name||``#</span>'"
                                                :editor="expenseAccountEditor"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'description'"
                                                :title="$t('description')"
                                                :width="200"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'ref_number'"
                                                :title="$t('reference_no')"
                                                :width="160"
                                                :headerAttributes="{
                                                    style: 'background-color: #EDF1F5',
                                                }"
                                            />
                                            <kendo-grid-column
                                                :field="'amount'"
                                                :title="$t('amount')"
                                                :format="'{0:n}'"
                                                :width="150"
                                                :headerAttributes="{
                                                    style: 'text-align: right; background-color: #EDF1F5',
                                                }"
                                                :attributes="{ style: 'text-align: right; ' }"
                                            />
                                            <kendo-grid-column
                                                :command="{
                                                    iconClass: 'k-icon k-i-trash',
                                                    text: 'Delete',
                                                    name: 'destroy',
                                                    class: 'btn-plus',
                                                }"
                                                :title="'&nbsp;'"
                                                :width="100"
                                                :headerAttributes="{
                                                    style: 'text-align: right; background-color: #EDF1F5',
                                                }"
                                            />
                                        </kendo-grid>
                                        <v-row style="background-color: #fff">
                                            <v-col sm="1" cols="12" class="pb-4 pt-0">
                                                <v-btn color="primary"
                                                       class="float-left btn_plus rounded-0 white--text mt-3"
                                                       name="addCrdBtn"
                                                       @click="onAddRowRelatedCostClicked">
                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <!--                                            <v-col sm="4" cols="12" class="pb-0">-->
                                            <!--                                                <template>-->
                                            <!--                                                    <v-file-input-->
                                            <!--                                                        class="mt-0 pt-0"-->
                                            <!--                                                        sm="3"-->
                                            <!--                                                        cols="6"-->
                                            <!--                                                        :placeholder="$t('attachment')"-->
                                            <!--                                                        multiple-->
                                            <!--                                                        prepend-icon="mdi-paperclip"-->
                                            <!--                                                    >-->
                                            <!--                                                        <template v-slot:selection="{ text }">-->
                                            <!--                                                            <v-chip small label color="primary">-->
                                            <!--                                                                {{ text }}-->
                                            <!--                                                            </v-chip>-->
                                            <!--                                                        </template>-->
                                            <!--                                                    </v-file-input>-->
                                            <!--                                                </template>-->
                                            <!--                                            </v-col>-->
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-divider/>

                            <!-- Footer -->
                            <v-card outlined dense class="no_border function_footer">
                                <!-- Warning Message -->
                                <v-alert type="warning"
                                         v-model="alert"
                                         dismissible>
                                    <span v-html="errorMessage"/>
                                </v-alert>

                                <v-btn color="black"
                                       class="text-capitalize  white--text float-left"
                                       ref="btnCancel"
                                       @click="cancel"
                                >{{ $t("cancel") }}
                                </v-btn>
<!--                                <v-btn-->
<!--                                    color="primary"-->
<!--                                    class="ml-2 float-right text-capitalize  white&#45;&#45;text"-->
<!--                                    @click="onSaveOptionClick('saveNew')"-->
<!--                                >{{ $t("save_new") }}-->
<!--                                </v-btn>-->
                                <v-btn
                                    color="primary"
                                    class="float-right white--text text-capitalize "
                                    @click="onSaveOptionClick('saveClose')"
                                >{{ $t("save_close") }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="compeletLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"
            />
            <LoadingMe
                :isLoading="accountLoading"
                :fullPage="true"
                :myLoading="true"
            />
        </v-container>
    </v-app>
</template>

<script>
import kendo from '@progress/kendo-ui';
import LoadingMe from "@/components/Loading";
const { journalHandler } = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")
import {JournalModel, JournalEntryModel, LoanDetailModel} from "@/scripts/model/AppModels";
import {accountHandler, prefixHandler} from "@/scripts/AppHandlers";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import Helper from "@/helper.js";
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
const LoanType = require("@/scripts/default_setup/LoanType.js");
const $ = kendo.jQuery
import RecordLoanReceipt from "@/scripts/financing/model/RecordLoanReceipt"
import currencyHandler from "@/scripts/currency/handler/currencyHandler";
// import billingHandler from "@/scripts/invoice/handler/billingHandler";
const loanHandler = require("@/scripts/financing/handler/loanHandler")

export default {
    name: "RecordLoanReceipt",
    components: {
        LoadingMe,
        "app-datepicker": DatePickerComponent,
    },
    props: {
        initLoan: {},
    },
    data: () => ({
        /* Obj */
        accountLoading: false,
        loan: {},
        journal: {},
        journalEntries: [],
        loanDetail: {},
        // Form validation
        valid: true,
        isEdit: false,
        saveMode: '',
        alert: false,
        errorMessage: '',
        user: Helper.getUser(),
        // LoadingMe
        compeletLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
        // Other
        totalAmount: 0,
        accounts: [],
        cashBankAccountEntries: [],
        relatedCostEntries: [],
        transactionType: {},
        r: new RecordLoanReceipt({}),
        expenseAccounts: [],
        bankAccounts: [],
        errors: [],
        exchangeRate: {},
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        suffix: ''
    }),
    methods: {
        /* Set Default Data */
        async setDefaultData() {
            this.r = new RecordLoanReceipt({})
            this.relatedCostEntries = []
            this.cashBankAccountEntries = []
            // let bankDS = this.$refs.cashBankAccountDS.kendoWidget();
            // bankDS.data().forEach(element => {
            //     bankDS.remove(element)
            // })
            // let relatedCostDS = this.$refs.relatedCostDS.kendoWidget();
            // relatedCostDS.data().forEach(element => {
            //     relatedCostDS.remove(element)
            // })
            this.loadPrefix();
            this.loadTransactionRate()
            this.getJournalNumber()
        },
        onGenerateNumberClicked() {
            this.generateNumber();
        },
        // Number
        // generateNumber() {
        //     this.journal.number = new Date().getTime()
        // },
        /* Auto Calculate */
        autoCalculate() {
            let cbaDS = this.$refs.cashBankAccountDS.kendoWidget(),
                rcDS = this.$refs.relatedCostDS.kendoWidget(),
                total = 0;
            total = parseFloat(this.loan.approvedAmount)

            rcDS.data().forEach(value => {
                total -= value.amount;
            });
            cbaDS.data().forEach(value => {
                value.amount = total
            });
            // window.console.log(cbaDS.data(), 'data')
            this.totalAmount = total
        },
        onDrGridDataSourceChanged() {
            this.autoCalculate();
        },
        onCrGridDataSourceChanged() {
            this.autoCalculate();
        },
        onAddRowCashBankAccountClicked() {
            this.addRow(this.$refs.cashBankAccountDS.kendoWidget());
        },
        onAddRowRelatedCostClicked() {
            this.addRow(this.$refs.relatedCostDS.kendoWidget());
        },
        cashBankAccountRowNumberTmpl(dataItem) {
            let ds = this.$refs.cashBankAccountDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        relatedCostRowNumberTmpl(dataItem) {
            let ds = this.$refs.relatedCostDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        addRow(gridDataSource) {
            let last = gridDataSource.total();
            let je = new JournalEntryModel();
            gridDataSource.insert(last, je);
        },
        addRowT(gridDataSource) {
            let last = gridDataSource.total();
            let je = new JournalEntryModel();
            je.amount = this.loan.approvedAmount
            gridDataSource.insert(last, je);
        },
        // Grid Custom Editor
        cashAccountEditor(container, options) {
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=number# #=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.bankAccounts,
                        group: {
                            field: "account_type.name",
                            compare: function (a, b) {
                                // Order by number
                                if (a.items[0].number === b.items[0].number) {
                                    return 0;
                                } else if (a.items[0].number > b.items[0].number) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            },
                        },
                    }),
                });
        },
        expenseAccountEditor(container, options) {
            kendo.jQuery('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=number# #=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.expenseAccounts,
                        group: {
                            field: "account_type.name",
                            compare: function (a, b) {
                                // Order by number
                                if (a.items[0].number === b.items[0].number) {
                                    return 0;
                                } else if (a.items[0].number > b.items[0].number) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            },
                        },
                    }),
                });
        },
        /* Add Loan Detail */
        addLoanDetail() {
            this.loanDetail = new LoanDetailModel({
                journal_uuid: this.journal.uuid,
                account_uuid: this.loan.loanAccount.uuid,
                description: this.journal.description,
                amount: this.totalAmount,
                date: Helper.toISODate(this.r.issuedDate),
                txn_type: LoanType.RECIEPT,
            })
        },
        async loadTransactionRate() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const date = new Date(this.r.issuedDate).toISOString().substr(0, 10);
                    const code = this.loan.currency.code
                    if (code) {
                        this.showLoading = true;
                        currencyHandler
                            .getLastExchangeRateByDate(date, code)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.exchangeRate = res.data.data[0];
                                }
                            });
                    }
                }, 10);
            });
        },
        /* Add Journal */
        addJournal() {
            let entries = [];

            // Cash Bank Account on Dr
            let cashBankAcctDS = this.$refs.cashBankAccountDS.kendoWidget();
            cashBankAcctDS.data().forEach(element => {
                if (element.amount != 0) {
                    element.currency = this.loan.currency;
                    element.exchange_rate = parseFloat(this.exchangeRate.rate); // Will change later
                    element.exchanged_amount = element.amount * parseFloat(this.exchangeRate.rate);
                    entries.push(element);
                }
            });

            // Related Cost on Dr
            let relatedCostDS = this.$refs.relatedCostDS.kendoWidget();
            relatedCostDS.data().forEach(element => {
                if (element.amount != 0) {
                    element.currency = this.loan.currency;
                    element.exchange_rate = parseFloat(this.exchangeRate.rate); // Will change later
                    element.exchanged_amount = element.amount * parseFloat(this.exchangeRate.rate);
                    entries.push(element);
                }
            });

            // Loan Account on Cr
            let loanEntry = new JournalEntryModel({
                account: this.loan.loanAccount,
                description: this.journal.description,
                amount: this.loan.approvedAmount * -1,
                currency: this.loan.currency,
                exchange_rate: parseFloat(this.exchangeRate.rate), // Will change later
                exchanged_amount: parseFloat(this.loan.approvedAmount) * parseFloat(this.exchangeRate.rate),
            });
            entries.push(loanEntry);
            this.journalEntries = entries;
        },
        shrinkData() {
            // Number combine abbr + number
            // this.journal.number = this.journal.abbr + '-' + this.journal.number

            // Journal Date
            this.journal.journal_date = Helper.toISODate(this.r.issuedDate)

            // Loan Active Date
            this.loan.receiptDate = Helper.toISODate(this.r.issuedDate)

            // User
            if (this.isEdit) {
                this.journal.modified_by = this.user
            } else {
                this.journal.created_by = this.user
            }
        },
        // Validating
        validateForm() {
            let result = true,
                msg = ''

            // Total Amount
            // if (this.loan.approved_amount !== this.totalAmount) {
            //     msg += '<p>' + this.$i18n.t('Total Amount equal to Approved Amount') + '</p>'
            //     result = false;
            // }

            // // Select Account and Amount
            // let please_select_account_line = this.$i18n.t('pls_select_acc_line')
            const band = $("#cashBankAccountGrid").data("kendoGrid"),
                bdata = band.dataSource
            bdata.data().forEach(m => {
                if (m.account.uuid === undefined) {
                    msg += this.$i18n.t('pls_select_acc_line')
                    result = false;
                }
            })
            // window.console.log(dataSource, msg)
            // 	// No Account
            // 	if(value.account.number === '' && value.amount !== 0){
            // 		let rowIndex = index + 1
            // 		msg += '<p>' + please_select_account_line + rowIndex.toString() + '</p>'
            // 		result = false
            // 	}

            // 	// Count Empty Row
            // 	if(value.account.number === '' && value.amount === 0){
            // 		countEmpty++
            // 	}
            // })

            // // Empty Row
            // if(countEmpty === cashBankAccountDS.total()){
            // 	msg += '<p>' + this.$i18n.t('please_acc_ot_record') + '</p>'
            // 	result = false;
            // }

            // Show Alert
            this.errorMessage = msg;
            this.alert = false;
            if (result === false) {
                this.alert = true;
            }

            return result;
        },
        // All Saves
        onSaveOptionClick(mode) {
            if (this.$refs.form.validate() && this.validateForm()) {
                this.saveMode = mode
                this.save()
            } else {
                this.alertError()
            }
        },
        cancel() {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4d4848',
                cancelButtonColor: '#ED1A3A',
                confirmButtonText: 'Yes, discard it!'
            }).then((result) => {
                if (result.value) {
                    this.clear()
                    this.$router.go(-1)
                }
            })
        },
        clear() {
            // Reset Form
            // this.$refs.form.reset();

            this.totalAmount = 0;
            this.cashBankAccountEntries = [];
            this.relatedCostEntries = [];

            // Set default data
            this.setDefaultData()
        },
        removeEmptyLine() {
            let relatedCostDS = this.$refs.relatedCostDS.kendoWidget();
            if(relatedCostDS.data().length > 0) {
                relatedCostDS.data().forEach(element => {
                    if (element != undefined) {
                        if (element.account.uuid === undefined || element.account.uuid == '') {
                            relatedCostDS.remove(element)
                        }
                    }else{
                        relatedCostDS.remove(element)
                    }
                })
            }
        },
        save() {
            let bankDS = this.$refs.cashBankAccountDS.kendoWidget();
            bankDS.data().forEach(element => {
                if (element.account.uuid === undefined || element.account.uuid == '') {
                    this.$snotify.error('Please select a Cash/Bank account')
                    return
                }
            })

            // let self = this;
            this.removeEmptyLine()
            // Shrink Data
            this.shrinkData();

            // Add Loan Detail
            this.addLoanDetail();

            // Add Journal
            this.addJournal();

            // Sync Data
            this.journal.journal_entries = this.journalEntries
            this.accountLoading = true
            let self = this
            let relatedCostDS = this.$refs.relatedCostDS.kendoWidget();
            this.r.loan = this.loan
            this.journal.currency_code = this.loan.currency.code
            // this.journal.number = this.journalNumber
            this.journal.prefix_format = this.journalPrefix
            if(this.loan.hasOwnProperty('segment')){
                this.journal.segment_uuid = this.loan.segment.id
            }
            if(this.loan.hasOwnProperty('location')){
                this.journal.location_uuid = this.loan.location.id
            }
            journalHandler.save(new JournalModel(this.journal))
                .then(function (response) {
                    self.r.journalId = response ? response.data.uuid : ''
                    self.r.journal = JSON.stringify(self.journal)
                    self.r.user = self.user
                    self.r.exchangeRate = self.exchangeRate
                    self.r.cashItemLine = bankDS.data()
                    self.r.relateCostItemLine = relatedCostDS.data()
                    self.r.receivedAmount = self.totalAmount
                    loanHandler.loanReceiptCreate(new RecordLoanReceipt(self.r)).then(response => {
                        self.accountLoading = false
                        if (response.data.statusCode === 201) {
                            self.$snotify.success('Successfully')
                            window.history.go(-1);
                        }
                    }).catch(e => {
                        self.$snotify.error('Something went wrong')
                        self.errors.push(e)
                        window.console.log(e, 'error')
                    })
                })
                .catch(function (error) {
                    Helper.alertErrorMsg(error);
                })
                .finally(() => {
                    self.showLoading = false;
                });
        },
        // Response Status
        responseStatus(status) {
            switch (status) {
                case 200:// Ok
                    this.showAlert()

                    // Reset to default data
                    this.clear();

                    break
                case 201:// Duplicate
                    this.alertError('Duplicate entry!')
                    break
                default:
                    break
            }
        },
        // Sweetalert2
        changeAlertStatus() {
            this.loadingAlert = true
            setTimeout(() => {
                this.loadingAlert = false
            }, 6200);
        },
        showAlert() {
            this.showLoading = false
            this.changeAlertStatus()
            this.loadingTextAlert = "Added Successful"
            this.loadingColorAlert = "#3DA72E"
            switch (this.saveMode) {
                case 'saveClose':// Save Close
                    // this.$swal({
                    // 	position: 'products',
                    // 	icon: 'success',
                    // 	title: 'Your work has been saved',
                    // 	showConfirmButton: true,
                    // }).then((result) => {
                    // 	if (result.value) {
                    // 		window.history.go(-1)

                    // 		return false
                    // 	}
                    // })
                    this.$router.go(-1)
                    break;
                default:// Save New
                    // this.$swal({
                    // 	position: 'products',
                    // 	icon: 'success',
                    // 	title: 'Your work has been saved',
                    // 	showConfirmButton: false,
                    // 	timer: 1500
                    // })
                    break;
            }
            this.saveMode = ''
        },
        alertError(msg) {
            if (msg) {
                this.$swal({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...!',
                    text: msg,
                    showConfirmButton: true
                })
            } else {
                this.showLoading = false
                this.loadingTextAlert = "Failed!"
                this.loadingColorAlert = "#eb8334"
                this.changeAlertStatus()
            }
        },
        async loadPrefix() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    prefixHandler.get("record loan receipt").then((res) => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false;
                            this.transactionType = res.data.data[0];
                            this.generateNumber();
                        }
                    });
                }, 10);
            });
        },
        generateNumber() {
            let data = {
                abbr: this.transactionType.abbr,
                structure: this.transactionType.structure,
                transactionDate: this.r.issuedDate,
                type: "Record Loan Receipt",
            };
            billingHandler
            .lastNumber(data)
            .then((response) => {
                if (response.data.statusCode === 200) {
                    const res = response.data.data;
                    this.suffix = res.suffix;
                    this.getLastNum();
                }
            })
            .catch((e) => {
                this.errors.push(e);
            });
        },
        getLastNum(){
            let d = {
                type: "RecordReceipt",
            };
            loanHandler
                .getLastNumber(d)
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        const res = response.data.data;
                        const lastNumber = this.zeroPad(
                            parseInt(res.lastNumber),
                            this.transactionType.format
                        );
                        this.r.lastNumber = parseInt(res.lastNumber)
                        const number =
                            this.suffix +
                            this.transactionType.numberSeparator +
                            lastNumber;

                        let des = ''
                        if(Object.keys(this.loan).length > 0){
                            des = `Recieve Loan from ${this.loan.financialInstitutions.name} For Loan Number ${this.loan.approveNumber}`;
                        }

                        this.journal = new JournalModel({
                            description: des,
                            transaction_type: LoanType.RECIEPT,
                            journal_type: LoanType.RECIEPT,
                        });
                        this.journal.abbr = this.transactionType.abbr
                        this.loan.activeDate = new Date().toISOString().substr(0, 10);

                        // Add 2 default rows
                        this.addRowT(this.$refs.cashBankAccountDS.kendoWidget());
                        for (let index = 0; index < 2; index++) {
                            this.addRow(this.$refs.relatedCostDS.kendoWidget());
                        }
                        this.journal.number = this.transactionType.abbr + this.transactionType.numberSeparator + number
                        this.r.abbr = this.transactionType.abbr
                        this.r.number = number;
                        this.r.abbrNumber = this.transactionType.abbr + this.transactionType.numberSeparator + number
                    }
                })
                .catch((e) => {
                    window.console.log(e);
                });
        },
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        clearForm(){
            this.r = new RecordLoanReceipt({})
            this.removeEmptyLine()
            setTimeout(() => {
                this.addRow()
                this.addRow()
            }, 500)
        },
        async getJournalNumber() {
            let num = await Helper.generateAccountingNumber(this.journalTxnType, this.r.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
        },
    },
    watch: {
        '$route': 'setDefaultData',
        initLoan() {
            this.loan = this.initLoan
            window.console.log(this.loan, 'loan')
        }
    },
    mounted() {
        if(this.initLoan == undefined){
            window.history.go(-1)
        }else {
            this.loan = this.initLoan;
            /* Initial Loan */
            this.loan = this.initLoan;
            window.console.log(this.loan, 'loan')
            /* Set Default Data */
            this.setDefaultData();
            this.r.loan = this.initLoan;
            /* Call All Accounts */
            this.accountLoading = true
            let self = this
            accountHandler.getAll()
                .then((result) => {
                    this.accountLoading = false
                    this.accounts = result.data;
                    let res = result.data
                    let ex = res.filter((obj) => {
                        return parseInt(obj.account_type.number) >= 33 && parseInt(obj.account_type.number) <= 43
                    })
                    if(ex.length > 0){
                        this.expenseAccounts = ex
                    }
                    let bk = res.filter((obj) => {
                        return parseInt(obj.account_type.number) >= 1 && parseInt(obj.account_type.number) <= 5
                    })
                    if(bk.length > 0){
                        this.bankAccounts = bk
                    }
                }).catch(function (error) {
                self.alertError(error);
            });
        }
    },
    created() {
    }
};
</script>

<style scoped>
.function_content {
    padding: 0 25px 25px;
    border-bottom: 0;
}

.attachment_table.theme--light.v-data-table {
    background-color: transparent !important;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

@media (max-width: 576px) {
    .mb-6 {
        margin-bottom: 0 !important;
    }
}
</style>