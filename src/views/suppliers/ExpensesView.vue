<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col>
					<div class="function_wrapper px-4 pt-3">
						<v-row>
							<v-col
								class="bigSide pr-1"
								sm="8"
								cols="12"
								style="transition: .3s ease-in;"
								:class="{ hide_big_bar_class: isHideBar }"
							>
								<v-form ref="form">
									<div class="function_header">
										<h2 class="mb-0">
											{{ $t("expenses") }} #{{ number }} ({{
												TransactionStatus[expense.is_cleared]
											}})
										</h2>
										<v-icon
											v-if="isHideBar"
											onclick="window.history.go(-1); return false;"
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
												@click="hideSmallSideBar"
												v-if="isHideBar"
											>
												mdi-chevron-left-circle
											</v-icon>
											<v-icon
												size="22"
												class="arr_icon"
												@click="hideSmallSideBar"
												v-if="!isHideBar"
											>
												mdi-chevron-right-circle
											</v-icon>
										</span>
									</div>
									<div class="">
										<!-- Form -->
										<v-row class=" mx-0 grayBg">
											<v-col sm="3" cols="12" class="pb-0">
												<label class="label  mb-0">{{ $t("supplier") }}</label>
												<h3 class="text-bold  py-1">{{ supplier.name }}</h3>
												<label class="label mb-0">{{ $t("date") }}</label>
												<h3 class="text-bold py-1">
													{{ Helper.dateFormat(expense.expense_date) }}
												</h3>
											</v-col>
											<v-col sm="9" cols="12">
												<v-row class=" mr-1">
													<v-col sm="4" cols="12" class="py-1">
														<label class="label mb-0">{{
															$t("bill_number")
														}}</label>
														<h3 class="text-bold py-1">
															{{ expense.bill_number }}
														</h3>
														<label class="label mb-0">{{
															$t("due_date")
														}}</label>
														<h3 class="text-bold py-1">
															{{ Helper.dateFormat(expense.due_date) }}
														</h3>
													</v-col>
													<v-col sm="4" cols="12" class="py-1">
														<label class="label mb-0">{{
															$t("bill_date")
														}}</label>
														<h3 class="text-bold py-1">
															{{ Helper.dateFormat(expense.bill_date) }}
														</h3>
														<label class="label mb-0">{{
															$t("currency")
														}}</label>
														<h3 class="text-bold py-1">{{ currency.code }}</h3>
													</v-col>
													<v-col sm="4" cols="12" class="py-1">
														<label class="label mb-0">{{ $t("term") }}</label>
														<h3 class="text-bold py-1">
															{{ paymentTermName }}
														</h3>
														<label class="label mb-0">{{
															$t("additional_cost_of")
														}}</label>
														<h3 class="text-bold py-1">
															{{ expense.additional_cost_supplier.name }}
														</h3>
													</v-col>
												</v-row>
											</v-col>
										</v-row>
										<!-- Grid -->
										<div class="table_1">
											<v-row class="mx-0 pb-2" color="primary">
												<v-col cols="12">
													<h3 class="text-uppercase color_grey">
														{{ $t("expense_accounts") }}
													</h3>
												</v-col>
												<v-col sm="12" cols="12" class="pa-0">
													<kendo-datasource
														ref="expenseAccountDS"
														:data="expenseEntries"
													/>
													<kendo-grid
														id="expenseGrid"
														ref="expenseGrid"
														class="grid-function"
														:data-source-ref="'expenseAccountDS'"
														:sortable="false"
														:filterable="false"
														:column-menu="true"
														:editable="false"
														:scrollable-virtual="true"
													>
														<kendo-grid-column
															:title="$t('no.')"
															:template="rowNumberTmpl"
															:width="55"
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
															:field="'quantity'"
															:title="$t('qty')"
															:width="160"
															:headerAttributes="{
																style: 'background-color: #EDF1F5',
															}"
														/>
														<kendo-grid-column
															:field="'uom'"
															:title="$t('uom')"
															:template="'<span>#=uom.name||``#</span>'"
															:width="150"
															:headerAttributes="{
																style:
																	'text-align: right; background-color: #EDF1F5',
															}"
															:attributes="{
																style: 'text-align: right;',
															}"
														/>
														<kendo-grid-column
															:field="'price'"
															:title="$t('price')"
															:width="150"
															:template="
																'<span>#=kendo.toString(price, decimalFormat)#</span>'
															"
															:headerAttributes="{
																style:
																	'text-align: right; background-color: #EDF1F5',
															}"
															:attributes="{
																style: 'text-align: right',
															}"
														/>
														<kendo-grid-column
															:field="'amount'"
															:title="$t('amount')"
															:width="150"
															:editable="
																() => {
																	return false;
																}
															"
															:template="
																'<span>#=kendo.toString(amount, decimalFormat)#</span>'
															"
															:headerAttributes="{
																style:
																	'text-align: right; background-color: #EDF1F5',
															}"
															:attributes="{
																style: 'text-align: right',
															}"
														/>
														<kendo-grid-column
															:field="'discount'"
															:title="$t('discount')"
															:template="'<span>#=discount.name||``#</span>'"
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
															:field="'tax_item'"
															:title="$t('tax')"
															:template="'<span>#= tax_item.defaultTax || `` #</span>'"
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
															:field="'class1'"
															:title="$t('class_1')"
															:template="'<span>#=class1.name||``#</span>'"
															:width="200"
															:hidden="!purchaseFormContent.class1"
															:headerAttributes="{
																style: 'background-color: #EDF1F5',
															}"
														/>
														<kendo-grid-column
															:field="'class2'"
															:title="$t('class_2')"
															:template="'<span>#=class2.name||``#</span>'"
															:width="200"
															:hidden="!purchaseFormContent.class2"
															:headerAttributes="{
																style: 'background-color: #EDF1F5',
															}"
														/>
														<kendo-grid-column
															:field="'class3'"
															:title="$t('class_3')"
															:template="'<span>#=class3.name||``#</span>'"
															:width="200"
															:hidden="!purchaseFormContent.class3"
															:headerAttributes="{
																style: 'background-color: #EDF1F5',
															}"
														/>
														<kendo-grid-column
															:field="'class4'"
															:title="$t('class_4')"
															:template="'<span>#=class4.name||``#</span>'"
															:width="200"
															:hidden="!purchaseFormContent.class4"
															:headerAttributes="{
																style: 'background-color: #EDF1F5',
															}"
														/>
														<kendo-grid-column
															:field="'class5'"
															:title="$t('class_5')"
															:template="'<span>#=class5.name||``#</span>'"
															:width="200"
															:hidden="!purchaseFormContent.class5"
															:headerAttributes="{
																style: 'background-color: #EDF1F5',
															}"
														/>
													</kendo-grid>
												</v-col>
											</v-row>
										</div>
										<div class="table_2">
											<v-row
												class="pt-5 pb-2"
												style="background-color: #fff; width: 100%; margin: 10px auto 0;"
											>
												<v-col cols="12">
													<div class="color_gey">
														{{ $t("expense_make_with") }}
														<v-radio-group
															class="custom-radio mt-0 pt-0 hide_form_alert"
															v-model="expense.use_for_option"
															row
															readonly
														>
															<v-radio :label="$t('credit')" :value="0" />
															<v-radio :label="$t('cash')" :value="3" />
															<v-radio
																:label="$t('reimbursement')"
																:value="1"
															/>
															<v-radio :label="$t('cash_advance')" :value="2" />
														</v-radio-group>
													</div>
												</v-col>
												<v-col sm="12" cols="12" class="pa-0">
													<v-text-field
														v-model="expense.transaction_account.name"
														outlined
														readonly
													/>
												</v-col>
											</v-row>
											<!-- table bottom -->
											<v-row style="background-color: #fff;">
												<v-col sm="6" cols="12">
													<div class="pa-2">
														<v-row>
															<v-col sm="6" cols="12">
																<label>{{ $t("message_on_voucher") }}</label>
																<h4 class="text-bold py-2">
																	This will appear on the Voucher
																</h4>
																{{ expense.voucher_note }}
															</v-col>
															<v-col sm="6" cols="12">
																<label>{{ $t("message_for_journal") }}</label>
																<h4 class="text-bold py-2">
																	This will appear on the journal entry
																</h4>
																{{ expense.journal_note }}
															</v-col>
														</v-row>
													</div>
												</v-col>
												<v-col sm="6" cols="12">
													<v-simple-table>
														<template v-slot:default>
															<tbody>
																<tr>
																	<td class="text-left">
																		{{ $t("subtotal") }}
																	</td>
																	<td class="text-center">:</td>
																	<td class="text-left text-bold">
																		{{ numberFormat(subTotal) }}
																	</td>
																</tr>
																<tr>
																	<td class="text-left">
																		{{ $t("discount") }}
																	</td>
																	<td class="text-center">:</td>
																	<td class="text-left  text-bold">
																		({{ numberFormat(discountAmount) }})
																	</td>
																</tr>
																<tr>
																	<td class="text-left">
																		{{ $t("purchase_tax") }}
																	</td>
																	<td class="text-center">:</td>
																	<td class="text-left  text-bold">
																		{{ numberFormat(purchaseTax) }}
																	</td>
																</tr>
																<tr>
																	<td class="text-left">
																		{{ $t("withholding_tax") }}
																	</td>
																	<td class="text-center">:</td>
																	<td class="text-left  text-bold">
																		{{ numberFormat(whdTax) }}
																	</td>
																</tr>
																<tr>
																	<td class="text-left text-uppercase">
																		{{ $t("total") }}
																	</td>
																	<td class="text-center">:</td>
																	<td class="text-left primary--text text-bold">
																		{{ numberFormat(totalAmount) }}
																	</td>
																</tr>
																<tr>
																	<td class="text-left">
																		{{ $t("deposit") }}
																		<span
																			class="float-right primary--text"
																		></span>
																	</td>
																	<td class="text-center">:</td>
																	<td class="text-left">
																		{{ numberFormat(depositAmount) }}
																	</td>
																</tr>
																<tr>
																	<td class="text-left">
																		{{ $t("amount_due") }}
																	</td>
																	<td class="text-center">:</td>
																	<td class="text-left primary--text text-bold">
																		{{ numberFormat(amountDue) }}
																	</td>
																</tr>
															</tbody>
														</template>
													</v-simple-table>
												</v-col>
											</v-row>
										</div>
									</div>
									<v-divider />
									<div class="function_footer mt-0 py-2">
										<p class="float-left  color_grey py-3 mb-0">
											{{ $t("standard_commercial_invoice") }}
										</p>

										<v-btn @click="_print(4)" color="secondary" class="float-right save_option mx-1">
																																{{$t('print')}}
																														</v-btn>
										<!-- <v-btn class="float-right btn_delete mx-1">
																																{{$t('delete')}}
																														</v-btn> -->
										<v-btn
											color="primary"
											class="float-right white--text capitalize mx-1"
											v-show="expense.is_cleared === 0"
											@click="edit"
										>
											{{ $t("edit") }}
										</v-btn>
									</div>
									<v-divider />
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
									class="text-uppercase float-right mt-3"
								>
									<span class="pointer" @click="Help('expense view')">
										{{ $t("help") }}
									</span>
									<v-icon
										onclick="window.history.go(-1); return false;"
										style="cursor: pointer; color: #333; font-size: 40px;"
										class="float-right mt-n1"
										>close
									</v-icon>
								</h3>

								<div
									v-if="!isHideBar"
									class=" small_sidebar mt-13 px-4  grayBg"
								>
									<v-card
										color="primary"
										elevation="0"
										class="pa-2  primary--text text-bold rounded-0"
									>
										<p class="white--text text-bold font_18 text-uppercase">
											{{ $t("expense_amount") }}
										</p>
										<p
											class="number mb-0 text-bold text-right white--text font_18 text-bold"
										>
											{{ numberFormat(amountDue) }}
										</p>
									</v-card>
									<h4 class="my-2 text-uppercase">{{ $t("analysis") }}</h4>
									<v-row>
										<v-col sm="6" cols="6" class="py-1">
											<label class="label">{{ $t("employee") }}</label>
											<h4 class="text-bold py-1">{{ employee.name }}</h4>
										</v-col>
										<v-col sm="6" cols="6" class="py-1">
											<label class="label">{{ $t("segment") }}</label>
											<h4 class="text-bold py-1">{{ segment.name }}</h4>
										</v-col>
										<v-col sm="6" cols="6" class="py-1">
											<label class="label">{{ $t("project") }}</label>
											<h4 class="text-bold py-1">{{ project.name }}</h4>
										</v-col>
										<v-col sm="6" cols="6" class="py-1">
											<label class="label">{{ $t("location") }}</label>
											<h3 class="text-bold py-1">{{ location.name }}</h3>
										</v-col>
										<v-col sm="6" cols="6" class="py-0">
											<label class="label">{{ $t("month_of") }}</label>
											<h4 class="text-bold py-1">{{ expense.month_of }}</h4>
										</v-col>
									</v-row>
									<v-divider class="my-3" />
									<v-row>
										<v-col cols="4" class="py-0 pr-0">
											<div class=" my-1 pa-1 d-flex justify-space-between ">
												<span class="d-flex">
													<span class="pl-1">Related to Cash Advance</span>
												</span>
											</div>
										</v-col>
										<v-col cols="8" class="py-1 pr-3 pl-1">
											<label class="label mb-0 pl-3 pt-2">{{
												$t("cash_advance_no")
											}}</label>
											<span class="pl-1">{{ cashAdvance.number }}</span>
										</v-col>
									</v-row>
									<v-divider class="my-3" />
									<!--                                    <h4 class="my-2 text-uppercase">{{ $t('payment_information') }}</h4>-->
									<!--                                    <v-row>-->
									<!--                                        <v-col sm="6" cols="6" class="py-1">-->
									<!--                                            <label class="label text-bold">{{ $t('payment_status') }}</label>-->
									<!--                                            <v-img width="80%" src="@/assets/images/paid.png"/>-->

									<!--                                        </v-col>-->
									<!--                                        <v-col sm="6" cols="6" class="py-1">-->
									<!--                                            <label class="label text-bold">{{ $t('payment_source') }}</label>-->
									<!--                                            <v-img width="80%" src="@/assets/images/aba2.png"/>-->
									<!--                                        </v-col>-->
									<!--                                    </v-row>-->

									<p class="color_grey mt-6 mb-2">
										{{ $t("transaction_history") }}
									</p>
									<v-simple-table>
										<template v-slot:default>
											<tbody>
												<tr
													v-for="item in transactionHistory"
													v-bind:key="item.id"
												>
													<td class="text-left px-0 font_12">
														{{ item.name }}
													</td>
													<td class="text-center px-0 font_12">
														{{ formatDateTime(item.createdAt) }} &nbsp; ({{
															item.timeSince
														}})
													</td>
												</tr>
											</tbody>
										</template>
									</v-simple-table>
									<!--                                    <p class="mb-1">-->
									<!--                                        {{ $t('last_edited_by') }} :-->
									<!--                                        <span class="text-bold">-->
									<!--											{{-->
									<!--                                                expense.modified_by.first_name === '' ? expense.created_by.first_name + ' ' + expense.created_by.last_name : expense.modified_by.first_name + ' ' + expense.modified_by.last_name-->
									<!--                                            }}-->
									<!--										</span>-->
									<!--                                    </p>-->
									<!--                                    <p class="mb-1">-->
									<!--                                        {{ $t('last_edited_on') }} :-->
									<!--                                        <span class="text-bold">-->
									<!--											{{ expense.modified_date ? expense.modified_date : expense.created_date }}-->
									<!--										</span>-->
									<!--                                    </p>-->
								</div>
							</v-col>
						</v-row>
					</div>
					<LoadingMe
						type="loading"
						:isLoading="showLoading"
						:fullPage="false"
						:myLoading="true"
					/>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
import kendo from "@progress/kendo-ui";
import Helper from "@/helper.js";

const purchaseFormContentHandler = require("@/scripts/purchaseFormContentHandler");
const billingHandler = require("@/scripts/invoice/handler/billingHandler");
import {
	ExpenseModel,
	ExpenseEntryExtendedModel,
	JournalModel,
	AccountModel,
	CurrencyModel,
	UomModel,
	PaymentTermModel,
	CashAdvanceModel,
	SupplierModel,
	ContactModel,
	LocationModel,
	ProjectModel,
	SegmentModel,
	ClassModel,
	PurchaseFormContent,
} from "@/scripts/model/AppModels";
import helper from "@/helper.js";

const { expenseHandler, cashAdvanceHandler } = require("@/scripts/AppHandlers");
const {
	AccountTypeCode,
	TransactionStatus,
	TaxType,
} = require("@/scripts/default_setup/Collections");
import { ShowResource } from "@/observable/store";
// from
const {getFormSetting} = require("@/scripts/settingsHandler.js")
import {print} from "@/form/Purchases.js";
import {i18n} from '@/i18n';

export default {
	name: "ExpensesView",
	components: {
		LoadingMe: () => import("@/components/Loading"),
	},
	props: {
		initExpense: {
			type: ExpenseModel,
		},
	},
	data: () => ({
		// Obj
		expense: new ExpenseModel(),
		employee: new ContactModel(),
		supplier: new SupplierModel(),
		currency: new CurrencyModel(),
		paymentTerm: new PaymentTermModel(),
		depositAccount: new AccountModel(),
		location: new LocationModel(),
		project: new ProjectModel(),
		segment: new SegmentModel(),
		Helper: Helper,
		TransactionStatus: TransactionStatus.EXPENSE,
		// Sources
		cashAdvance: new JournalModel(),
		expenseEntries: [],
		// Other
		subTotal: 0,
		discountAmount: 0,
		purchaseTax: 0,
		whdTax: 0,
		totalAmount: 0,
		supplierDepositAmount: 0,
		depositAmount: 0,
		amountDue: 0,
		hasAdditionalCost: false,
		// Sidebar
		isHideBar: false,
		// LoadingMe
		showLoading: false,
		decimalFormat: "n2",
		purchaseFormContent: PurchaseFormContent,
		depositBalance: 0,
		transactionHistory: [],
	}),
	methods: {
		Help(key_search) {
			ShowResource(key_search);
		},
		async loadTxnHistory() {
			new Promise((resolve) => {
				setTimeout(() => {
					resolve("resolved");
					if (
						this.$route.params.id !== "" ||
						this.$route.params.id !== undefined
					) {
						billingHandler
							.history( this.$route.params.id)
							.then((res) => {
								if (res.data.statusCode === 200) {
									this.transactionHistory = res.data.data;
								}
							})
					}
				}, 10);
			});
		},
		async loadPurchaseFormContent() {
			new Promise((resolve) => {
				setTimeout(() => {
					resolve("resolved");
					purchaseFormContentHandler.list().then((res) => {
						if (res.data.statusCode === 200) {
							const data = res.data.data;
							if (data.length > 0) {
								const supplierSetting = data[0];
								this.purchaseFormContent = supplierSetting;
								if (supplierSetting.hasOwnProperty("decimal")) {
									this.decimalFormat = "n" + supplierSetting.decimal;
									// // Add 2 default lines
									// this.addRow();
									// this.addRow();
								}
							}
						}
					});
				}, 10);
			});
		},
		numberFormat(value) {
			return kendo.toString(value, `${this.decimalFormat}`);
		},
		formatDateTime(value) {
			return kendo.toString(
				new Date(value),
				helper.instituteDateFormat() + ` hh:mm tt`
			);
		},
		// Load journal according to query string {id}
		loadObj() {
			// Access Query String
			let q = this.$route.params;
			if (q.id !== undefined) {
				if (q.id !== this.expense.uuid) {
					this.showLoading = true;
					expenseHandler
						.getOne(q.id)
						.then((res) => {
							// Bind Obj
							this.expense = new ExpenseModel(res.data);
							this.bindData();
						})
						// .finally(function() {
						// 	// self.showLoading = false;
						// });
				}
			}
			// Supplier Setting such as decimal format
			this.loadPurchaseFormContent();
			this.loadTxnHistory();
		},
		async bindData() {
			this.showLoading = true;
			
			// Contacts
			this.supplier = new SupplierModel(this.expense.supplier);
			this.employee = new ContactModel(this.expense.employee);
			this.hasAdditionalCost = Boolean(
				this.expense.additional_cost_supplier.uuid
			);

			// Currency
			this.currency = new CurrencyModel(this.expense.bill_currency);

			// Cash Advance
			if (this.expense.use_for_transaction_uuid !== "") {
				let cashAdvance = await cashAdvanceHandler.getOne(
					this.expense.use_for_transaction_uuid
				);
				this.cashAdvance = new CashAdvanceModel(cashAdvance.data);
			}

			// Payment Term
			let paymentTerms = await this.$store.dispatch("paymentTerms/getList");
			this.paymentTerm = paymentTerms.find(
				(i) => i.id === this.expense.payment_term
			);

			// Entries
			let entries = [],
				subTotal = 0,
                discountAmount = 0,
                purchaseTaxAmount = 0,
                whdTaxAmount = 0,
				taxItems = await this.$store.dispatch("taxes/getList"),
				uoms = await this.$store.dispatch("unitOfMeasurements/getList"),
				clazz = await this.$store.dispatch("classes/getList");

			this.expense.expense_entries.forEach((value) => {
                // Purchase Tax
                if (value.account.account_type.number === AccountTypeCode.PURCHASE_TAX) {
                    purchaseTaxAmount += value.amount;
                }else{
					if (value.amount > 0 && value.account.number !== AccountTypeCode.TAX_RELATED_EXPENSE_CODE) {
						// Subtotal
						subTotal += value.amount;

						let entry = new ExpenseEntryExtendedModel(value);
						entry.decimalFormat = this.decimalFormat;

						// UOM
						entry.uom = new UomModel(
							uoms.find((item) => item.id === value.uom_uuid)
						);

						// Tax
						if(value.hasOwnProperty('tax_item'))
						if(value.tax_item.hasOwnProperty('uuid')){
                            entry.tax_item = taxItems.find((i) => i.id === value.tax_item.uuid);
                                
                            /* Apply Inclusive Tax to amount */
                            if(entry.tax_item.hasOwnProperty('taxType'))
                            if(entry.tax_item.taxType.hasOwnProperty('typeId'))
                            if(entry.tax_item.taxType.typeId === 1 && entry.tax_item.baseAmount.toLowerCase() === TaxType.INCLUSIVE)
                            subTotal += entry.tax_amount;
                        }

						// Classes
						entry.class1 = new ClassModel(
							clazz.find((item) => item.id === value.class_1_uuid)
						);
						entry.class2 = new ClassModel(
							clazz.find((item) => item.id === value.class_2_uuid)
						);
						entry.class3 = new ClassModel(
							clazz.find((item) => item.id === value.class_3_uuid)
						);
						entry.class4 = new ClassModel(
							clazz.find((item) => item.id === value.class_4_uuid)
						);
						entry.class5 = new ClassModel(
							clazz.find((item) => item.id === value.class_5_uuid)
						);

						entries.push(entry);
					} else {
						// Discount
						if (value.account.account_type.number === AccountTypeCode.DISCOUNT) {
							discountAmount += value.amount * -1;
						}

						// WHD Tax
						if (value.account.account_type.number === AccountTypeCode.WHD_TAX) {
							whdTaxAmount += value.amount * -1;
						}

						// Deposit
						if (~AccountTypeCode.PURCHASE_DEPOSITS.indexOf(value.account.account_type.number)) {
							this.depositAmount = value.amount * -1;
							this.depositEntryUuid = value.uuid;
						}

						// Transaction Account (Payable Account / Clearing Account)
						if (value.account.uuid === this.expense.transaction_account.uuid) {
							this.amountDue = value.amount * -1;
						}
					}
				}
			});

			// Bind Expense Entries
			this.expenseEntries = entries;

			// Calculation
            this.subTotal = subTotal;
            this.discountAmount = discountAmount;
            this.purchaseTax = purchaseTaxAmount;
            this.whdTax = whdTaxAmount;
            this.totalAmount = (this.subTotal - this.discountAmount) + whdTaxAmount + purchaseTaxAmount;

			// Sidebar
			let locations = await this.$store.dispatch("locations/getList");
			this.location = new LocationModel(
				locations.find((i) => i.id === this.expense.location_uuid)
			);

			let segments = await this.$store.dispatch("segments/getList");
			this.segment = new SegmentModel(
				segments.find((i) => i.id === this.expense.segment_uuid)
			);

			let projects = await this.$store.dispatch("projects/getList");
			this.project = new ProjectModel(
				projects.find((i) => i.id === this.expense.project_uuid)
			);

			this.showLoading = false;
		},
		// Row Number Template
		rowNumberTmpl(dataItem) {
			let ds = this.$refs.expenseAccountDS.kendoWidget(),
				index = ds.indexOf(dataItem);

			return index + 1;
		},
		getExpense() {
			return new ExpenseModel(this.expense);
		},
		edit() {
			this.$router.replace({
				name: "Expenses",
				params: { initExpense: this.getExpense() },
			});
		},
		hideSmallSideBar() {
			this.isHideBar = !this.isHideBar;
		},
		_print(id) {
			let params = "?formType=Expense"
			let exp_data = {};
			exp_data['itemLines'] = this.expenseEntries;
			exp_data['subTotal'] =this.subTotal ;
			exp_data['discountAmount'] = this.discountAmount;
			exp_data['purchaseTax'] = this.purchaseTax;
			exp_data['whdTax'] = this.whdTax ;
			exp_data['totalAmount'] = this.totalAmount;
			exp_data['supplier'] = this.supplier
			exp_data['currency'] = this.currency
			exp_data['paymentTerm'] = this.paymentTerm
			exp_data['transactionAccount'] =  this.expense.transaction_account
			exp_data['depositAccount'] = this.depositAccount
			exp_data['segement'] = this.segement
			exp_data['location'] = this.location,
			exp_data['decimalFormat'] = this.decimalFormat
			let all_expense = {
				...exp_data,
				...this.expense
			}

			getFormSetting(params).then(res => {
					if (res.data.statusCode === 200) {
							if (res.data.data.length > 0) {
									window.console.log(res.data.data["0"].settings);
									print(all_expense, id, res.data.data["0"].settings);
							}else{
									this.$snotify.error(i18n.t('please_save_form_in_setting'))
							}   
					}
		});
	},
	},
	watch: {
		// call again the method if the route changes
		$route: "loadObj",
		initExpense() {
			if (this.initExpense) {
				this.loadPurchaseFormContent();
				this.expense = this.initExpense;
				this.bindData();
				this.loadTxnHistory();
			}
		},
	},
	mounted: async function() {
		// fetch the data when the view is created and the data is
		// already being observed
		this.loadObj();
		await this.loadTxnHistory();
	},
	computed: {
		paymentTermName() {
			if (this.paymentTerm) {
				return this.paymentTerm.name;
			}
			return "";
		},
		txnStatus() {
			if (this.expense) {
				if (this.expense.hasOwnProperty("status")) {
					const status = this.expense.status;
					let statusText = "";
					switch (status) {
						case 1:
							statusText = "OPEN";
							break;
						case 2:
							statusText = "PARTIALLY PAID";
							break;
						case 3:
							statusText = "PAID";
							break;
						case 4:
							statusText = "VOID";
							break;
					}
					return statusText;
				}
			}
			return "";
		},
		number: {
			get() {
				if (this.expense) {
					if (this.expense.hasOwnProperty("number")) {
						return this.expense.number;
					} else {
						return "";
					}
				} else {
					return "";
				}
			},
		},
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

.bigSide {
	position: relative;
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
	height: 98%;
	position: relative;
	padding: 12px;
	background-color: #edf1f5;
}

.iconArrow {
	right: -27px;
	position: absolute;
	top: 54px;
}

.iconArrowHide {
	position: absolute;
	right: -7px;
	top: 54px;
}

.color_grey {
	color: #808080;
}

.lb_bold {
	font-size: 12px;
}

.detial_smallside_p {
	position: absolute;
	bottom: 10px;
}

.card_background {
	background-color: #f8f8f9;
	min-height: 120px;
}

.deposite_input {
	width: 100px;
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
	font-size: 32px;
	margin-right: 2px;
}

.exp_select {
	font-size: 12px !important;
}

.my_check_box {
	font-size: 47px !important;
}

.btn_delete {
	color: #ffffff;
	background-color: #00b050 !important;
	text-transform: capitalize;
}
</style>
