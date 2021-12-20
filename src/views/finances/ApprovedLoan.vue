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
                                <h2 class="mb-0">{{ $t("approve_loan") }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="
                                        cursor: pointer;
                                        color: #333;
                                        font-size: 40px;
                                    "
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card
                                outlined
                                dense
                                class="px-4 pb-4 no_border mb-4"
                                color="grayBg"
                            >
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("financial_institutions") }}</label>
                                        <br/>
                                        <h3 class=""
                                        >{{ loan.financialInstitutions.name }} ({{
                                                loan.financialInstitutions.abbr
                                            }})</h3>

                                        <br/>

                                        <label class="label">{{ $t("loan") }}</label>
                                        <br/>
                                        <h3 class="">{{
                                                loan.name
                                            }}</h3>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("appoved_date") }}</label>
                                        <app-datepicker
                                            :initialDate="loan.approveDate"
                                            @emitDate="loan.approveDate = $event"
                                        />

                                        <label class="label">{{ $t("first_payment_date") }}</label>
                                        <app-datepicker
                                            :initialDate="loan.firstPaymentDate"
                                            @emitDate="loan.firstPaymentDate = $event"
                                            @onChanged="paymentMethodChange"
                                        />
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("approve_amount") }}</label>
                                        <!--                                        <v-text-field-->
                                        <!--                                            class="mt-1"-->
                                        <!--                                            outlined-->
                                        <!--                                            required-->
                                        <!--                                            type="number"-->
                                        <!--                                            v-model="loan.approvedAmount"-->
                                        <!--                                            @change="paymentMethodChange"-->
                                        <!--                                        />-->
                                        <vue-numeric
                                            style="width: 100%;font-size: 18px;background-color: #ffff;border-radius: 4px;text-align: right;border: 1px solid #ddd !important; padding: 9px !important; margin-bottom: 15px;"
                                            class="mt-1 mr-2 mt-0 text-bold pa-4"
                                            currency=""
                                            separator=","
                                            v-bind:minus="false"
                                            v-bind:precision="inputDec"
                                            v-model="loan.approvedAmount"
                                            @change="paymentMethodChange"
                                            :rules="[v => !!v || 'Amount is required']"
                                            outlined
                                        >
                                        </vue-numeric>

                                        <label class="label">{{
                                                $t("approved_loan_number")
                                            }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            v-model="loan.approveNumber"
                                            outlined
                                            :rules="[
                                                (v) =>
                                                    !!v || 'Number is required',
                                            ]"
                                            required
                                        />
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <v-card
                                            outlined
                                            dense
                                            class="px-4 pt-4"
                                            style="
                                                background-color: #d5dce4;
                                                border: 0 !important;
                                                background: #fff !important;
                                            "
                                        >
                                            <v-row>
                                                <!-- Col one -->
                                                <v-col
                                                    sm="4"
                                                    cols="12"
                                                    class="py-0"
                                                >
                                                    <label class="label">{{
                                                            $t("duration_months")
                                                        }}</label>
                                                    <v-text-field
                                                        class="mt-1"
                                                        outlined
                                                        v-model="loan.duration"
                                                        @change="paymentMethodChange"
                                                        required
                                                    />
                                                    <label class="label">{{ $t("interest_rate_months") }}</label>
                                                    <v-row>
                                                        <v-col
                                                            sm="10"
                                                            cols="12"
                                                            class="py-0 pr-0"
                                                        >
                                                            <v-text-field
                                                                class="mt-1 "
                                                                outlined
                                                                required
                                                                @change="paymentMethodChange"
                                                                v-model="loan.interestRate"
                                                                append-icon=""
                                                            />
                                                        </v-col>
                                                        <v-col
                                                            sm="2"
                                                            cols="12"
                                                            class="py-2"
                                                        >
                                                            <v-icon
                                                                large
                                                                color=""
                                                                style="font-size: 30px"
                                                            >
                                                                mdi-percent-outline
                                                            </v-icon>
                                                        </v-col>
                                                    </v-row>
                                                    <label class="label">{{ $t("interest_account") }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        id="paymentTermSelector"
                                                        :items="interestAccounts"
                                                        item-value="id"
                                                        item-text="name"
                                                        v-model="loan.interestAccount"
                                                        no-data-text="No data found."
                                                        @change="paymentMethodChange"
                                                        outlined/>
                                                </v-col>
                                                <!-- Col two -->
                                                <v-col
                                                    sm="4"
                                                    cols="12"
                                                    class="py-0"
                                                >
                                                    <label class="label">{{ $t("monthly_repayment") }}</label>
                                                    <v-text-field
                                                        class="mt-1"
                                                        v-model="monthlyRepayment"
                                                        outlined
                                                        required
                                                        disabled
                                                        id="monthlyPayment"
                                                    />
                                                    <label class="label">{{ $t("payment_term") }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        id="paymentTermSelector"
                                                        :items="paymentTerms"
                                                        item-value="id"
                                                        item-text="name"
                                                        v-model="loan.paymentTerm"
                                                        no-data-text="No data found."
                                                        return-object
                                                        outlined/>
                                                    <label class="label">{{ $t("segment") }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        :items="segments"
                                                        item-value="id"
                                                        item-text="name"
                                                        v-model="loan.segment"
                                                        no-data-text="No data found."
                                                        :rules="[ (v) => !!v || 'Segment is required', ]"
                                                        return-object
                                                        outlined/>
                                                </v-col>
                                                <!-- Col three -->
                                                <v-col
                                                    sm="4"
                                                    cols="12"
                                                    class="py-0"
                                                >
                                                    <label class="label">{{
                                                            $t("loan_account")
                                                        }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        tag="loanAccountSelector"
                                                        placeholder="Please select an Account"
                                                        item-text="name"
                                                        :items="loanAccounts"
                                                        v-model="loan.loanAccount"
                                                        no-data-text="No data found."
                                                        return-object
                                                        outlined
                                                        loading="true"
                                                        single-line
                                                    >
                                                        <template
                                                            slot="selection"
                                                            slot-scope="{
                                                                item,
                                                            }"
                                                        >
                                                            {{ item.number }} -
                                                            {{ item.name }}
                                                        </template>
                                                        <template
                                                            slot="item"
                                                            slot-scope="{ item }"
                                                        >
                                                            {{ item.number }} -
                                                            {{ item.name }}
                                                        </template>
                                                    </v-select>
                                                    <label class="label">{{ $t("payment_method") }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        id="paymentTermSelector"
                                                        :items="paymentMethod"
                                                        item-value="id"
                                                        item-text="name"
                                                        v-model="loan.paymentMethod"
                                                        no-data-text="No data found."
                                                        @change="paymentMethodChange"
                                                        outlined/>
                                                    <label class="label">{{ $t("location") }}</label>
                                                    <v-select
                                                        class="mt-1"
                                                        :items="locations"
                                                        item-value="id"
                                                        item-text="name"
                                                        v-model="loan.location"
                                                        no-data-text="No data found."
                                                        :rules="[ (v) => !!v || 'Location is required', ]"
                                                        return-object
                                                        outlined/>
                                                </v-col>
                                            </v-row>
                                            <!-- End from second -->
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <template>
                                            <kendo-datasource
                                                ref="scheduleAR"
                                                :data="scheduleData"/>
                                            <kendo-grid
                                                id="scheduleAR" class="grid-function"
                                                :data-source-ref="'scheduleAR'"
                                                :column-menu="false"
                                                :noRecords="true"
                                                :editable="false"
                                                :groupable="false"
                                                :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :title="$t('no.')"
                                                    :width="55"
                                                    :column-menu="false"
                                                    :template="rowNumberTmpl"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products'}"
                                                    :attributes="{style: 'text-align: center'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'date'"
                                                    :title="$t('date')"
                                                    :template="'<span>#= date!=`Total` ? date : `` #</span>'"
                                                    :width="200"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: left'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'disbursed_amt'"
                                                    :title="$t('principle_remaining')"
                                                    :template="'<span>#= kendo.toString(principal_r, numberFormat) #</span>'"
                                                    :width="200"
                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: right'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'amount_to_be_paid'"
                                                    :title="$t('amount_to_be_paid')"
                                                    :template="'<span>#= kendo.toString(total, numberFormat) #</span>'"
                                                    :width="150"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5' }"
                                                    :attributes="{style: 'text-align: right; font-weight: bold'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'principal_amount'"
                                                    :title="$t('principal_amount')"
                                                    :template="'<span>#= kendo.toString(principal, numberFormat) #</span>'"
                                                    :width="150"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right'}"
                                                />
                                                <kendo-grid-column
                                                    :field="'interest'"
                                                    :title="$t('interest')"
                                                    :template="'<span>#= kendo.toString(interest, numberFormat) #</span>'"
                                                    :width="200"
                                                    :attributes="{style: 'text-align: right'}"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5' }"/>
                                                <kendo-grid-column
                                                    :field="'ending_balance'"
                                                    :title="$t('ending_balance')"
                                                    :template="'<span>#= date!=`Total` ? kendo.toString(principal_r - principal, numberFormat) : `` #</span>'"
                                                    :width="200"
                                                    :attributes="{style: 'text-align: right'}"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                                />
                                            </kendo-grid>
                                        </template>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-divider/>

                            <!-- Footer -->
                            <v-card
                                outlined
                                dense
                                class="no_border function_footer"
                            >
                                <!-- Warning Message -->
                                <v-alert type="warning"
                                         v-model="alert"
                                         dismissible>
                                    <span v-html="errorMessage"/>
                                </v-alert>

                                <v-btn
                                    color="black"
                                    outlined
                                    class="text-capitalize  black--text float-left"
                                    @click="onCancelClicked"
                                >{{ $t("cancel") }}
                                </v-btn>
                                <v-btn
                                    @click="onSaveClicked"
                                    color="primary"
                                    class="ml-2 float-right text-capitalize  white--text"
                                >{{ $t("approve") }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
            />
            <LoadingMe
                :isLoading="showLoadingAcc"
                :fullPage="true"
                :myLoading="true"
            />
        </v-container>
    </v-app>
</template>

<script>
// Import Model
import LoanModel from "@/scripts/financing/model/Loan"

// Companent
import LoadingMe from "@/components/Loading";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";


import kendo from "@progress/kendo-ui"


import saleFormContentHandler from "@/scripts/saleFormContentHandler";
import currencyHandler from "@/scripts/currency/handler/currencyHandler";

const {accountHandler, paymentTermHandler} = require("@/scripts/AppHandlers");
const loanHandler = require("@/scripts/financing/handler/loanHandler")
import VueNumeric from 'vue-numeric'
import settingsHandler from "@/scripts/settingsHandler";
import locationHandler from "@/scripts/locationHandler";

export default {
    name: "ApprovedLoan",
    components: {
        LoadingMe,
        "app-datepicker": DatePickerComponent,
        VueNumeric
    },
    props: {
        initLoan: {},
    },
    data: () => ({
        /* Obj */
        loan: new LoanModel(),
        segments: [],
        locations: [],
        // Form validation
        valid: true,
        isEdit: false,
        saveMode: '',
        alert: false,
        errorMessage: '',
        // LoadingMe
        showLoadingAcc: false,
        isLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
        // Other
        accounts: [],
        paymentTerms: [],
        paymentMethod: [
            {id: 1, name: 'បង់ថយ'},
            {id: 2, name: 'បង់ថេរ'}
        ],
        saleFormContent: {},
        scheduleAR: [],
        scheduleData: [],
        numberFormat: 'n0',
        currencyCode: '',
        interestAccounts: [],
        loanAccounts: [],
        showLoading: false,
        inputDec: 2
    }),
    methods: {
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.scheduleAR.kendoWidget(),
                index = ds.indexOf(dataItem);
            if (index === (this.scheduleAR.length - 1)) {
                return ''
            } else {
                return index + 1
            }
        },
        getLastDayOfTheMonth(date) {
            return new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0
            ).getDate();
        },
        toNumberOfYearMonth(numberOfMonth) {
            // window.console.log(numberOfMonth);
            let year = parseInt(parseInt(numberOfMonth) / 12);
            let month = parseInt(numberOfMonth) - year * 12;
            return {
                year: year,
                month: month,
            };
        },
        onRequestDateChanged() {
            let exDate = new Date(this.loan.approved_date),
                duration = parseInt(this.loan.duration),
                isLastDayOfTheMonth = false,
                lastDay = this.getLastDayOfTheMonth(exDate);

            if (parseInt(lastDay) == parseInt(exDate.getDate())) {
                isLastDayOfTheMonth = true;
            }

            let numOfMonths = duration + exDate.getMonth() + 1;
            let addMonth = this.toNumberOfYearMonth(numOfMonths);
            if (isLastDayOfTheMonth) {
                let month = addMonth.month;
                let year = parseInt(exDate.getFullYear()) + addMonth.year;
                let day = parseInt(
                    this.getLastDayOfTheMonth(new Date(year, month, 0))
                );
                /*
                    using the time to hold back the current time so the that date won't switch to other day
                    base on the ISOTime zoon with +7 for Cambodia.
                    */
                this.loan.first_payment_date = new Date(year, month - 1, day, 12, 0, 0)
                    .toISOString()
                    .substring(0, 10);
            } else {
                this.loan.first_payment_date = new Date(exDate)
                    .toISOString()
                    .substr(0, 10);
            }
        },
        onCancelClicked() {
            this.$swal({
                title: "Are you sure?",
                text: "Error: Transacton not save.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: "Yes, reset it!",
            }).then((result) => {
                if (result.value) {
                    window.history.go(-1)
                    return false
                }
            })
        },
        onSaveClicked() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
            }
            let self = this;
            // Convert date to ISO
            this.loan.approveDate = kendo.toString(new Date(this.loan.approveDate), 'yyyy-MM-dd');
            this.loan.firstPaymentDate = kendo.toString(new Date(this.loan.firstPaymentDate), 'yyyy-MM-dd');
            this.loan.schedules = this.scheduleData
            this.loan.status = "approved"
            this.loan.receiptDate = ''
            this.loan.isEdit = true
            // Sync Data
            this.showLoading = true;
            // window.console.log(this.loan, 'before')
            loanHandler.loanCreate(new LoanModel(this.loan))
                .then(function (response) {
                    if (response) {
                        self.$swal({
                            position: 'products',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: true,
                            confirmButtonColor: '#4d4848',
                            cancelButtonColor: '#ED1A3A',
                            confirmButtonText: 'Yes, discard it!'
                        }).then((result) => {
                            if (result.value) {
                                window.history.go(-1)
                                return false
                            }
                        })
                    } else {
                        self.alertError();
                    }
                })
                .catch(function (error) {
                    self.alertError(error);
                })
                .finally(function () {
                    self.showLoading = false;
                })
        },
        // Response Status
        responseStatus(status) {
            switch (status) {
                case 200: // Ok
                    this.showMsgDialog("", true);
                    // Reset form
                    // this.$refs.form.reset();

                    this.$route.go(-1);
                    //TODO update the loan if when approve successfully.
                    break;
                default:
                    break;
            }
        },
        // Sweetalert2
        changeAlertStatus() {
            this.loadingAlert = true;
            setTimeout(() => {
                this.loadingAlert = false;
            }, 6200);
        },
        showMsgDialog(msg, status) {
            if (msg) {
                // Code here
            } else {
                msg = "Something went wrong!";
            }
            // this.isLoading = false;
            this.showLoading = false;
            this.loadingTextAlert =
                status == false ? "Failed!" : "Added Successful";
            this.loadingColorAlert = status == false ? "#eb8334" : "#3DA72E";
            this.changeAlertStatus();
            if (status) {
                switch (this.saveMode) {
                    case "saveClose":
                        window.history.go(-1);
                        break;
                    default:
                        break;
                }
            }
        },
        paymentMethodChange() {
            if (this.loan.paymentMethod == 1) {
                this.schedule4()
            } else if (this.loan.paymentMethod == 2) {
                this.schedule5()
            }
        },
        schedule4() {
            this.scheduleAR = []
            this.scheduleData = []
            let p = parseFloat(this.loan.approvedAmount)
            let t = parseFloat(this.loan.duration)
            let ir = parseFloat(this.loan.interestRate)
            let sd = this.loan.firstPaymentDate
            //Principle for every month
            let fp = (p / t).toFixed(this.saleFormContent.decimal)
            fp = parseFloat(fp)
            //Total by month
            // eslint-disable-next-line no-unused-vars
            let ft = 0
            let self = this
            let tInterest = 0
            for (let i = 0; i < t; i++) {
                ft += fp
                let ite = (p * ir) / 100;
                ite = parseFloat(ite.toFixed(self.saleFormContent.decimal));
                tInterest += ite;
                //Interest rate
                //date
                let sda = sd;
                if (i > 0) {
                    sd = new Date(sd);
                    sd.setMonth(sd.getMonth() + 1);
                    sda = sd;
                }
                self.scheduleAR.push({
                    principal_r: p,
                    principal: fp,
                    interest: ite,
                    total: ite + fp,
                    date: kendo.toString(sda, "yyyy-MM-dd"),
                    locale: self.currencyCode,
                    numberFormat: self.numberFormat,
                    status: 1
                });
                p = parseFloat((p - fp).toFixed(self.saleFormContent.decimal));
                // console.log(sd);
            }
            //Find balance
            p = parseFloat(p.toFixed(self.saleFormContent.decimal));
            if (p != 0) {
                this.makeBalance(p);
            }
            if (this.scheduleAR.length > 0) {
                this.loan.monthlyRepayment = parseFloat(this.scheduleAR[0].total.toFixed(this.saleFormContent.decimal))
                this.monthlyRepayment = kendo.toString(parseFloat(this.scheduleAR[0].total), `n${this.saleFormContent.decimal}`)
            }
            this.totalInterest = kendo.toString(tInterest, this.numberFormat)
            this.loan.totalInterest = tInterest
            this.totalPayment = kendo.toString(tInterest + parseFloat(this.loan.approvedAmount), this.numberFormat)
            this.loan.totalPayment = tInterest + parseFloat(this.loan.approvedAmount)
            this.addTotal()
            this.scheduleData = this.scheduleAR
        },
        makeBalance(amt) {
            let idx = parseFloat(this.loan.duration) - 1
            let oamt = this.scheduleAR[idx].principal
            let namt = oamt + amt
            namt = parseFloat(namt.toFixed(this.saleFormContent.decimal))
            this.scheduleAR[idx].principal = namt
            this.scheduleAR[idx].total = this.scheduleAR[idx].interest + namt
        },
        fixRate(P, r, t) {
            // var C = 0;
            // var a = P*r;
            // var b = Math.pow((1+r), t);
            //     b = parseFloat(b.toFixed(2));
            // var c = 1/b;
            // var d = 1 - c;
            //     d = parseFloat(d.toFixed(2));
            // C = a/d;
            // console.log(P+"--"+r+"--"+t);
            // return C;
            let l = 1 / t, i = r * l, n = t
            let emi = i * P / [1 - Math.pow((1 + i), -n)]
            return emi
        },
        schedule5() {
            let self = this
            if (parseFloat(this.loan.interestRate) <= 0) {
                return
            }
            this.scheduleAR = []
            this.scheduleData = []
            let fprice = this.fixRate(parseFloat(this.loan.approvedAmount), ((parseFloat(this.loan.interestRate) * parseFloat(this.loan.duration)) / 100), parseFloat(this.loan.duration))
            fprice = parseFloat(fprice.toFixed(this.saleFormContent.decimal))
            this.loan.monthlyRepayment = parseFloat(fprice.toFixed(this.saleFormContent.decimal))
            this.monthlyRepayment = kendo.toString(parseFloat(fprice), `n${this.saleFormContent.decimal}`)
            let p = parseFloat(this.loan.approvedAmount)
            let t = parseFloat(this.loan.duration)
            let sd = this.loan.firstPaymentDate
            let ir = parseFloat(this.loan.interestRate)
            //add 1 hour
            let oldDate = new Date(sd)
            let hour = oldDate.getHours()
            let newDate = oldDate.setHours(hour + 1)
            sd = new Date(newDate)
            let tInterest = 0
            for (let i = 0; i < t; i++) {
                //date
                let start = 0,
                    end = 0,
                    diff = 0,
                    days = 0;
                if (i > 0) {
                    sd = new Date(self.scheduleAR[i - 1].date);
                    sd.setMonth(sd.getMonth() + 1);
                    // let d = new Date(sd);
                    //calculate day
                    start = new Date(self.scheduleAR[i - 1].date);
                    end = new Date(sd);
                    diff = new Date(end - start);
                    days = diff / 1000 / 60 / 60 / 24;
                } else if (i == 0) {
                    //calculate day
                    start = new Date();
                    end = new Date(sd);
                    diff = new Date(end - start);
                    days = diff / 1000 / 60 / 60 / 24;
                }
                if (days < 0) days = 0;
                // let cadate = parseInt(days);
                //interest
                // let ite = p * ((parseFloat(this.interest_rate) * 12) / 100) / 360 * cadate;
                let ite = (p * ir) / 100;
                ite = parseFloat(ite.toFixed(2));
                tInterest += ite;
                let sda = sd;
                self.scheduleAR.push({
                    principal_r: p,
                    principal: fprice - ite,
                    interest: ite,
                    total: fprice,
                    date: kendo.toString(sda, "yyyy-MM-dd"),
                    locale: self.currencyCode,
                    numberFormat: self.numberFormat,
                    status: 1,
                });
                p = parseFloat((p - (fprice - ite)).toFixed(self.saleFormContent.decimal));
            }
            // console.log(p);
            p = parseFloat(p.toFixed(self.saleFormContent.decimal));
            if (p != 0) {
                this.makeBalance(p);
            }
            this.totalInterest = kendo.toString(tInterest, this.numberFormat)
            this.loan.totalInterest = tInterest
            this.totalPayment = kendo.toString(tInterest + parseFloat(this.loan.approvedAmount), this.numberFormat)
            this.totalPayment = tInterest + parseFloat(this.loan.approvedAmount)
            this.addTotal()
            this.scheduleData = this.scheduleAR
        },
        addTotal() {
            this.scheduleAR.push({
                principal_r: '',
                principal: parseFloat(this.loan.approvedAmount),
                interest: this.totalInterest,
                total: this.totalPayment,
                date: 'Total',
                locale: this.currencyCode,
                numberFormat: this.numberFormat,
                transaction_number: '',
            })
            // window.console.log(this.scheduleAR, 'loan schedule')
        },
        async loadSaleFormContent() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    saleFormContentHandler.list().then((res) => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data;
                            if (data.length > 0) {
                                this.saleFormContent = data[0];
                                this.numberFormat = 'n' + this.saleFormContent.decimal
                                this.inputDec = parseInt(this.saleFormContent.decimal)
                            }
                        }
                    });
                }, 10);
            });
        },
        setDefault() {
            this.loan.approvedAmount = this.initLoan.amount
            this.loan.Account = this.accounts[0]
            this.loan.paymentTerm = this.paymentTerms[0]
            this.loan.paymentMethod = 1
            this.currencyCode = this.loan.currency.code
            this.loan.loanAccount = this.loanAccounts[0]
            this.loan.interestAccount = this.interestAccounts[0]
            this.paymentMethodChange()
            this.loadTransactionRate()
        },
        async loadTransactionRate() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    const date = new Date(this.loan.approveDate).toISOString().substr(0, 10);
                    const code = this.loan.currency.code
                    if (code) {
                        this.showLoading = true;
                        currencyHandler
                            .getLastExchangeRateByDate(date, code)
                            .then((res) => {
                                if (res.data.statusCode === 200) {
                                    this.showLoading = false;
                                    this.loan.exchangeRate = res.data.data[0];
                                }
                            });
                    }
                }, 10);
            });
        },
        async loadSegment() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.segments = [];
                    settingsHandler
                        .getSeg()
                        .then((res) => {
                            this.showLoading = true;
                            if (res.data.statusCode === 200) {
                                this.showLoading = false;
                                this.segments = res.data.data;
                                if (this.segments.length > 0) {
                                    this.loan.segment = this.segments[0];
                                }
                                // this.segmentList = res.data.data
                            }
                        })
                        .catch();
                    {
                        this.showLoading = false;
                    }
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
                                    this.loan.location = this.locations[0];
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
    },
    watch: {
        initLoan() {
            this.loan = this.initLoan;
            this.loan.approvedAmount = this.initLoan.amount
            this.loan.Account = this.accounts[0]
            this.loan.paymentTerm = this.paymentTerms[0]
            this.loan.paymentMethod = 1
            this.currencyCode = this.loan.currency.code
            this.setDefault()
            this.paymentMethodChange()
        }
    },
    updated() {
        /* The windo is not close, therefore, created event won't call after use close and select other loan. */
        this.loan = this.initLoan;
    },
    mounted: async function () {
        await this.loadSaleFormContent();
    },
    created() {
        /* Initial Loan */
        window.console.log(this.initLoan, 'loan')
        if (this.initLoan == undefined) {
            window.history.go(-1)
        } else {
            this.loan = this.initLoan
            this.setDefault();
            /* Set Default */
            this.loan.approvedDate = new Date().toISOString().substr(0, 10);
            let self = this;
            /* Call All Accounts */
            this.showLoadingAcc = true
            accountHandler.getAll()
                .then((result) => {
                    self.showLoadingAcc = false
                    let res = result.data;
                    //Receivable Account
                    self.interestAccounts = res.filter(m => m.account_type.number === 42).map(item => {
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
                            type_code: item.type_code
                        }
                    })
                    self.loan.interestAccount = self.interestAccounts[0]
                    self.loanAccounts = res.filter(m => m.account_type.number === 27).map(item => {
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
                            type_code: item.type_code
                        }
                    })
                    self.loan.loanAccount = self.loanAccounts[0]
                });

            /* Call All Payment Term */
            paymentTermHandler.getAll()
                .then((result) => {
                    this.paymentTerms = result.data.data;
                    this.loan.paymentTerm = this.paymentTerms[0]
                });
            this.loadSegment()
            this.loadLocation()
        }
    },
};
</script>

<style scoped>
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
