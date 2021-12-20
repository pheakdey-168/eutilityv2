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
                                <h2 class="mb-0">{{ $t("record_loan_periodic_payment") }}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card height="175px"
                                    outlined
                                    dense
                                    class="px-4 no_border mb-4"
                                    color="grayBg"
                            >
                                <v-row>
                                    <v-col sm="6" cols="12" class="py-0">
                                        <label class="label">{{ $t("date") }}</label>
                                        <app-datepicker
                                            :initialDate="journal.journal_date"
                                            @emitDate="journal.journal_date = $event"
                                        />

                                        <label class="label">{{ $t("number") }}</label>
                                        <v-row>
                                            <v-col sm="2" cols="3" class="pb-1 pt-1 pr-0">
                                                <div class="code_text" v-text="journal.abbr"></div>
                                            </v-col>
                                            <v-col sm="8" cols="7" class="pb-1 pt-1 pl-0 pr-0">
                                                <v-text-field
                                                        class=" custom-border"
                                                        v-model="journal.number"
                                                        outlined
                                                        :rules="[(v) => !!v || 'Number is required']"
                                                        required
                                                />
                                            </v-col>
                                            <v-col sm="2" cols="2" class="pb-1 pt-1 pr-0">
                                                <v-icon
                                                        color="black"
                                                        size="30"
                                                        class="border_qrcode"
                                                        @click="generateNumber"
                                                >mdi-qrcode
                                                </v-icon
                                                >
                                            </v-col>
                                        </v-row>
                                    </v-col>

                                    <v-col sm="3" cols="12" class="pb-0 pt-4">
                                        <v-card
                                            outlined
                                            style="display: block"
                                            height="140px"
                                            dense
                                            class="pa-3"
                                            color="third"
                                        >
                                            <h4 class="mb-0 text-left text-white">
                                                {{ $t("payment_amount") }}
                                            </h4>
                                            <h3
                                                style="font-size: 25px"
                                                class="py-10 float-right text-right text-white"
                                            >
                                                {{ Number(loan.monthly_repayment).toLocaleString() }}
                                            </h3>
                                        </v-card>
                                    </v-col>
                                    <v-col sm="3" cols="12" class="pb-0 pt-4">
                                        <v-card
                                                outlined
                                                style="display: block"
                                                height="140px"
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
                                                ref="cashBankReceiptDS"
                                                :data="cashBankReceiptEntries"
                                                :change="onCashBankReceiptDSChange"
                                            />

                                            <kendo-grid
                                                id="cashBankReceiptGrid"
                                                class="grid-function"
                                                :data-source-ref="'cashBankReceiptDS'"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true"
                                            >
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :template="rowNumberTmpl"
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
                                        </template>
                                    </v-col>
                                    <v-col sm="12" cols="12" class=" pa-0">
                                        <v-row>
                                            <v-col sm="1" cols="12" class="pb-0">
                                                <v-btn color="primary"
                                                    @click="addRow"
                                                    class="float-left btn_plus rounded-0 white--text" name="addCrdBtn">
                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col sm="4" cols="12" class="pb-0">
                                                <template>
                                                    <v-file-input
                                                            class="mt-0 pt-0"
                                                            sm="3"
                                                            cols="6"
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
                                        </v-row>
                                    </v-col>

                                </v-row>
                            </v-card>

                            <v-divider clas="mt-n3"/>
                            
                            <!-- Footer -->
                            <v-card outlined dense class="no_border function_footer">
                                <!-- Warning Message -->
								<v-alert type="warning"
									v-model="alert"
									dismissible>
									<span v-html="errorMessage"/>
								</v-alert>

                                <v-btn
                                    color="black"
                                    class="text-capitalize  white--text float-left"
                                    ref="btnCancel"
                                    @click="cancel"
                                >{{ $t("cancel") }}
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    class="ml-2 float-right text-capitalize  white--text"
                                    @click="onSaveOptionClick('saveNew')"
                                >{{ $t("save_new") }}
                                </v-btn>
                                <v-btn
                                    color="secondary"
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
        </v-container>
    </v-app>
</template>

<script>
    import kendo from '@progress/kendo-ui';
    import LoadingMe from "@/components/Loading";
    // import {i18n} from "@/i18n";
    import {JournalModel, JournalEntryModel, LoanModel, LoanDetailModel} from "@/scripts/model/AppModels";
    import {accountHandler, loanHandler, prefixHandler } from "@/scripts/AppHandlers";
    import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
    import Helper from "@/helper.js";

    const LoanType = require("@/scripts/default_setup/LoanType.js");

    export default {
        name: "RecordLoanPeriodicPayment",
        components: {
            LoadingMe,
            "app-datepicker": DatePickerComponent,
        },
        props: {
            initLoan: {
                type: LoanModel,
            },
        },
        data: () => ({
            /* Obj */
            loan            : {},
            journal         : {},
            journalEntries  : [],
            loanDetail      : {},
            // Form validation
            valid			: true,
			isEdit          : false,
			saveMode 		: '',
			alert 			: false,
            errorMessage	: '',
            user: Helper.getUser(),
            //LoadingMe
            compeletLoading: false,
            loadingAlert: false,
            loadingColorAlert: "",
            loadingTextAlert: "",
            //Other
            totalAmount     : 0,
            accounts        : [],
            cashBankReceiptEntries: [],
        }),
        methods: {
            /* Set Default Data */
            async setDefaultData () {
                const prefixes = await prefixHandler.getAll();
                let prefix = prefixes.data.data.find(item => item.sk === "loan_repayment");
                let des = `Paid on Loan from ${this.loan.bank.name} For Loan Number ${this.loan.number}`;

                this.journal = new JournalModel({
                    description     : des,
                    transaction_type: LoanType.REPAYMENT,
                    journal_type    : LoanType.REPAYMENT,
                    journal_date    : new Date().toISOString().substr(0, 10),
                });

                this.journal.abbr = prefix.abbr;
                this.generateNumber();

                // Add 2 default rows
                this.addRow();
                this.addRow();
            },
            // Number
            generateNumber() {
                this.journal.number = new Date().getTime()
            },
            /* Sum Total Amount on datasource changes */
            onCashBankReceiptDSChange() {
                let ds = this.$refs.cashBankReceiptDS.kendoWidget(),
                    total = 0;
                
                ds.data().forEach(value => {
                    total += value.amount;
                });

                this.totalAmount = total
            },
            rowNumberTmpl(dataItem) {
                let ds = this.$refs.cashBankReceiptDS.kendoWidget(),
                    index = ds.indexOf(dataItem)
                return index + 1
            },
            /* Add New Grid Row */
            addRow () {
                let ds = this.$refs.cashBankReceiptDS.kendoWidget(),
                    last = ds.total(),
                    je = new JournalEntryModel();

                ds.insert(last, je);
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
                        dataTextField: "number",
                        dataValueField: "name",
                        template: "<span>#=number# #=name#</span>",
                        optionLabel: "--- Select ---",
                        dataSource: new kendo.data.DataSource({
                            data: this.accounts,
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
            addLoanDetail () {
                this.loanDetail = new LoanDetailModel({
                    journal_uuid    : this.journal.uuid,
                    account_uuid    : this.loan.account.uuid,
                    description     : this.journal.description,
                    amount          : this.totalAmount,
                    date            : Helper.toISODate(this.journal.journal_date),
                    txn_type        : LoanType.REPAYMENT,
                })
            },
            /* Add Journal */
            addJournal() {
                let entries = [];

                // Loan Account on Dr
                let loanEntry = new JournalEntryModel({
                    account                : this.loan.account,
                    description            : this.journal.description,
                    amount                 : this.totalAmount,
                    currency               : this.loan.currency,
                    exchange_rate          : 1, // Will change later
                    exchanged_amount       : this.totalAmount,
                });
                entries.push(loanEntry);
                
                // Cash Bank Account on Cr
                let ds = this.$refs.cashBankReceiptDS.kendoWidget();
                ds.data().forEach(element => {
                    if (element.amount !== 0) {
                        element.amount = element.amount * -1;
                        element.currency = this.loan.currency;
                        element.exchange_rate = 1; // Will change later
                        element.exchanged_amount = element.amount;
                        
                        entries.push(element);
                    }
                });

                this.journalEntries = entries;
            },
            shrinkData () {
				// Number combine abbr + number
				this.journal.number = this.journal.abbr +'-'+ this.journal.number

				// Journal Date
                this.journal.journal_date = Helper.toISODate(this.journal.journal_date)

				// User
				if(this.isEdit){
					this.journal.modified_by = this.user
				}else{
					this.journal.created_by = this.user
				}
			},
            // Validating
			validateForm () {
				let result = true,
					// cashBankReceiptDS = this.$refs.cashBankReceiptDS.kendoWidget(),
                    msg = '' //countEmpty = 0;
                    
                // Total Amount
                if(this.loan.monthly_repayment !== this.totalAmount){
                    msg += '<p>' + this.$i18n.t('Total Amount equal to Payment Amount') + '</p>'
					result = false;
                }

				// Select Account and Amount
				// let please_select_account_line = this.$i18n.t('pls_select_acc_line')
				// cashBankReceiptDS.data().forEach((value, index) => {
				// 	// No Amount
				// 	if(value.account.number !== '' && value.amount === 0){
				// 		msg += '<p>' + value.account.name + ' no amount.</p>'
				// 		result = false
				// 	}

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
				// if(countEmpty === cashBankReceiptDS.total()){
				// 	msg += '<p>' + this.$i18n.t('please_acc_ot_record') + '</p>'
				// 	result = false;
				// }

				// Show Alert
                this.errorMessage = msg;
                this.alert = false;
				if(result===false){
					this.alert = true;
				}
				
				return result;
			},
			// All Saves
			onSaveOptionClick (mode) {
                if (this.$refs.form.validate() && this.validateForm()) {
                    this.saveMode = mode
                    this.save()
				}else{
					this.alertError()
				}
			},
			cancel () {
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
			clear () {
				// Reset Form
				this.$refs.form.reset();

                this.totalAmount = 0;
                this.cashBankAccountEntries = [];
                this.relatedCostEntries = [];

				// Set default data
				this.setDefaultData()
			},
			save () {
				let self = this;

				// Shrink Data
                this.shrinkData();
                
                // Add Loan Detail
                this.addLoanDetail();

                // Add Journal
                this.addJournal();
                
				// Sync Data
				this.showLoading = true;
				loanHandler.recordTransaction(this.loan.uuid, {
                    loan            : this.loan,
                    loan_detail     : this.loanDetail,
                    journal         : this.journal,
                    journal_entries : this.journalEntries,
                })
				.then(function (response) {
					if(response){
						self.responseStatus(response.status)
					}else{
						self.alertError()
					}
				})
				.catch(function (error) {
					self.alertError(error);
				});
			},
			// Response Status
			responseStatus (status) {
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
			changeAlertStatus(){
				this.loadingAlert = true
				setTimeout(() => {
					this.loadingAlert = false
				}, 6200);
			},
			showAlert () {
				this.showLoading = false
				this.changeAlertStatus()
				this.loadingTextAlert ="Added Successful"
				this.loadingColorAlert ="#3DA72E"
				switch(this.saveMode) {
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
			alertError (msg) {
				if(msg){
					this.$swal({
						position: 'center',
						icon: 'error',
						title: 'Oops...!',
						text: msg,
						showConfirmButton: true
					})
				}else{
					this.showLoading = false
					this.loadingTextAlert ="Failed!"
					this.loadingColorAlert ="#eb8334"
					this.changeAlertStatus()
				}
			},
        },
        watch: {
            initLoan () {
                this.loan = this.initLoan;
            }
        },
        mounted() {
            /* Initial Loan */
            this.loan = this.initLoan;

            /* Set Default Data */
            this.setDefaultData();

            /* Call All Accounts */
            accountHandler.getAll()
            .then((result) => {
                this.accounts = result.data;
            });
        },
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
        ..mb-6 {
            margin-bottom: 0 !important;
        }
    }
</style>
