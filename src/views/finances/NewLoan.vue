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
                                <h2 class="mb-0">{{ $t("add_new_loan") }}</h2>
                                <v-icon
                                    @click="cancel"
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
                                class="px-4 no_border mb-4"
                                color="grayBg"
                            >
                                <!-- Form -->
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("date") }}</label>
                                        <app-datepicker
                                            :initialDate="loan.issuedDate"
                                            @emitDate="loan.issuedDate = $event"
                                        />

                                        <label class="label"> {{ $t("name") }}</label>
                                        <v-text-field
                                            name="loan"
                                            v-model="loan.name"
                                            class="mt-1"
                                            :rules="[ (v) => !!v || 'Name is required' ]"
                                            outlined
                                            required
                                        />
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("financial_institutions") }}</label>
                                        <v-select
                                            id="bankSelector"
                                            class="mt-1"
                                            tag="financialInstituteSelector"
                                            :items="banks"
                                            item-value="uuid"
                                            item-text="name"
                                            v-model="loan.financialInstitutions"
                                            :rules="[ (v) => !!v || 'Financial institute is required' ]"
                                            no-data-text="No data found."
                                            return-object
                                            outlined
                                            loading="true"
                                            single-line
                                        >
                                            <template slot="selection" slot-scope="{ item }">
                                             {{ item.name }}
                                            </template>
                                            <template slot="item" slot-scope="{ item }">
                                               {{ item.name }}
                                            </template>
                                        </v-select>

                                        <label class="label">{{ $t("type_of_loan") }}</label>
                                        <v-select
                                            class="mt-1"
                                            :items="loanTypes"
                                            item-value="uuid"
                                            item-text="name"
                                            v-model="loan.typeOfLoan"
                                            no-data-text="No data found."
                                            return-object
                                            :rules="[ (v) => !!v || 'Type of loan institute is required' ]"
                                            outlined
                                        >
                                            <template slot="selection" slot-scope="{ item }">
                                                {{ item.code }} - {{ item.name }}
                                            </template>
                                            <template slot="item" slot-scope="{ item }">
                                                {{ item.code }} - {{ item.name }}
                                            </template>
                                        </v-select>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("request_amount") }}</label>
                                        <!--                                        <v-text-field-->
                                        <!--                                            class="mt-1"-->
                                        <!--                                            v-model="loan.amount"-->
                                        <!--                                            outlined-->
                                        <!--                                            required-->
                                        <!--                                        />-->
                                        <vue-numeric
                                            style="width: 100%;font-size: 18px;background-color: #ffff;border-radius: 4px;text-align: right;border: 1px solid #ddd !important; padding: 9px !important; margin-bottom: 15px;"
                                            class="mt-1 mr-2 mt-0 text-bold pa-4"
                                            currency=""
                                            separator=","
                                            v-bind:minus="false"
                                            v-bind:precision="inputDec"
                                            v-model="loan.amount"
                                            :rules="[v => !!v || 'Amount is required']"
                                            outlined
                                        >
                                        </vue-numeric>
                                        <label class="label">{{ $t("loan_currency") }}</label>
                                        <v-select
                                            id="loanCurrency"
                                            class="mt-1"
                                            :items="currencyList"
                                            item-value="uuid"
                                            item-text="code"
                                            v-model="loan.currency"
                                            no-data-text="No data found."
                                            return-object
                                            outlined
                                            loading="true"
                                            :rules="[ (v) => !!v || 'Currency is required' ]"
                                            single-line
                                        >
                                            <template
                                                class="v-serlect"
                                                slot="selection"
                                                slot-scope="{ item }"
                                            >
                                                {{ item.code }} - {{ item.name }}
                                            </template>
                                            <template
                                                class="v-serlect"
                                                slot="item"
                                                slot-scope="{ item }"
                                            >
                                                {{ item.code }} - {{ item.name }}
                                            </template>
                                        </v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <label class="label"> {{ $t("description") }}</label>
                                        <v-textarea no-resize height="90px"
                                                    id="loandDescription"
                                                    class="mt-1"
                                                    outlined
                                                    v-model="loan.description"
                                                    rows="3"
                                                    required
                                        />
                                    </v-col>
                                </v-row>
                                <!-- End form input -->
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
                                <v-btn
                                    outlined
                                    class="text-capitalize  black--text float-left"
                                    color="primary"
                                    ref="btnCancel"
                                    @click="cancel"
                                >{{ $t("cancel") }}
                                </v-btn
                                >
                                <v-btn
                                    @click="onSaveOptionClick(SaveOption.SAVENEW)"
                                    color="primary"
                                    class="ml-2 float-right text-capitalize  white--text"
                                >{{ $t("save_new") }}
                                </v-btn
                                >
                                <v-btn
                                    @click="onSaveOptionClick(SaveOption.SAVECLOSE)"
                                    color="secondary"
                                    class="float-right white--text text-capitalize "
                                >{{ $t("save_close") }}
                                </v-btn
                                >
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="isLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"
            />
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"/>
            <LoadingMe
                :isLoading="bankLoading"
                :fullPage="true"
                :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
// component
import LoadingMe from "@/components/Loading";
// import {i18n} from "@/i18n";
import kendo from "@progress/kendo-ui";
import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
import {CurrencyModel} from "@/scripts/model/AppModels";
// model
import LoanModel from "@/scripts/financing/model/Loan"
// handler
const loanHandler = require("@/scripts/financing/handler/loanHandler")

const {bankHandler, currencyHandler, entityTypeHandler} = require("@/scripts/AppHandlers");
const {LoanStatus, EntityType, SaveOption} = require("@/scripts/default_setup/Collections");

const currencyType = {
    FUNCTIONAL_CURRENCY: 'fun-c',
    TRANSACTION_CURRENCY: 'txn-c',
    REPORTING_CURRENCY: 'rpt-c',
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}
import VueNumeric from 'vue-numeric'
import saleFormContentHandler from "@/scripts/saleFormContentHandler";
export default {
    name: "NewLoan",
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
        loan: new LoanModel({}),
        // Form validation
        valid: true,
        isEdit: false,
        bankLoading: false,
        saveMode: '',
        alert: false,
        errorMessage: '',
        SaveOption: SaveOption,
        // LoadingMe
        isLoading: false,
        loadingAlert: false,
        loadingColorAlert: "",
        loadingTextAlert: "",
        // Other
        banks: [],
        currencies: [],
        loanTypes: [],
        showLoading: false,
        currencyList: [],
        inputDec: 2,
        numberFormat: '',
        saleFormContent: {}
    }),
    methods: {
        /* Set Default Data */
        setDefaultData() {
            this.loan = new LoanModel({})
            this.loan.issuedDate = new Date().toISOString().substr(0, 10)
            this.loan.status = LoanStatus.PENDING
            this.loan.typeOfLoan = this.loanTypes[0]
            this.loan.currency = this.currencyList[0]
        },
        getLastDayOfTheMonth(date) {
            window.console.log(date.getMonth());
            return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        },
        toNumberOfYearMonth(numberOfMonth) {
            window.console.log(numberOfMonth);
            let year = parseInt(parseInt(numberOfMonth) / 12);
            let month = parseInt(numberOfMonth) - year * 12;
            return {
                year: year,
                month: month,
            };
        },
        onRequestDateChanged() {
            this.menuJDate1 = false;
            let exDate = new Date(this.request_date);
            let duration = parseInt(this.loan.duration);
            let isLastDayOfTheMonth = false;
            let lastDay = this.getLastDayOfTheMonth(exDate);
            if (parseInt(lastDay) == parseInt(exDate.getDate())) {
                isLastDayOfTheMonth = true;
            }
            let numOfMonths = duration + exDate.getMonth() + 1;
            let addMonth = this.toNumberOfYearMonth(numOfMonths);
            if (isLastDayOfTheMonth) {
                let month = addMonth.month;
                let year = parseInt(exDate.getFullYear()) + addMonth.year;
                let day = parseInt(this.getLastDayOfTheMonth(new Date(year, month, 0)));
                /*
                using the time to hold back the current time so the that date won't switch to other day
                base on the ISOTime zoon with +7 for Cambodia.
                */
                this.exp_date = new Date(year, month - 1, day, 12, 0, 0)
                    .toISOString()
                    .substring(0, 10);
            } else {
                this.exp_date = new Date(exDate).toISOString().substr(0, 10);
            }
        },
        // All Saves
        onSaveOptionClick(mode) {
            if (this.$refs.form.validate()) {
                this.saveMode = mode
                this.loan.saveOption = mode
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

            this.isEdit = false;

            // Set default data
            this.setDefaultData()
        },
        save() {
            let self = this;
            // Convert date to ISO
            this.loan.issuedDate = kendo.toString(new Date(this.loan.issuedDate), 'yyyy-MM-dd');
            if(this.isEdit == false){
                this.loan.maturityDate = ''
                this.loan.approveDate = ''
                this.loan.firstPaymentDate = ''
                this.loan.number = ''
                this.loan.duration = 0
                this.loan.monthlyRepayment = 0
                this.loan.paymentTerm = {}
                this.loan.receiptDate = ''
            }
            // Sync Data
            this.showLoading = true;
            loanHandler.loanCreate(new LoanModel(this.loan))
                .then(function (response) {
                    if (response) {
                        self.responseStatus(response.status);
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
                case 200:// Ok
                    this.showAlert()

                    // Reset to default data
                    this.clear();

                    break
                case 201:// Duplicate
                    this.showAlert()

                    // Reset to default data
                    this.clear();
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
                    this.$swal({
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
                    break;
                default:// Save New
                    this.$swal({
                        position: 'products',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: true,
                        confirmButtonColor: '#4d4848',
                        cancelButtonColor: '#ED1A3A',
                        confirmButtonText: 'Yes, discard it!'
                    })
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
        async loadCurrencyData() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    currencyHandler.list(currencyType.FUNCTIONAL_CURRENCY).then(response => {
                        if (response.data.statusCode === 200) {
                            this.currencyList = response.data.data
                            if(this.currencyList.length > 0){
                                this.loan.currency = this.currencyList[0]
                            }
                            this.showLoading = false
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
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
    },
    watch: {
        initLoan() {
            this.loan = this.initLoan;
        }
    },
    mounted: async function () {
        await this.loadSaleFormContent();
        // Set Default Data
        if (this.initLoan) {
            this.loan = this.initLoan;
        }

        // Call Bank List
        this.bankLoading = true
        let self = this
        bankHandler.getAll()
            .then((result) => {
                this.banks = result.data;
                self.bankLoading = false
            });

        // Call Loan Type
        entityTypeHandler.getByEntityType(EntityType.LOAN)
            .then((result) => {
                this.loanTypes = result.data;
                window.console.log(result, 'loan type')
                this.loan.typeOfLoan = this.loanTypes[0]
            });

        // Call Currency List
        currencyHandler.getJson().then((result) => {
            let currencylist = Object.values(result.data);
            window.console.log(result, 'currency ')
            currencylist.forEach((value) => {
                let cur = new CurrencyModel(value);
                this.currencies.push(cur);
            });
        });
        await this.loadCurrencyData()
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
    .mb-6 {
        margin-bottom: 0 !important;
    }
}
</style>
