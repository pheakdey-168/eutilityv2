<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-4 no_border" elevation="0">
                <h2 class="font_20">{{ $t("loan_calculator") }}</h2>
                <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <label>{{ $t("type_of_loan") }}</label>
                        <v-select
                            class="mt-1"
                            id="paymentTermSelector"
                            :items="paymentMethod"
                            item-value="id"
                            item-text="name"
                            v-model="loan.paymentMethod"
                            no-data-text="No data found."
                            clearable
                            outlined />
                        <label>{{ $t("loan_term_in_month") }}</label>
                        <v-text-field
                            type="number"
                            class="mt-1"
                            v-model="loan.period"
                            outlined
                            placeholder="Input"
                        />
<!--                        <label>{{ $t("origination_application_fee") }}</label>-->
<!--                        <v-row class="mt-1 mr-0">-->
<!--                            <v-col sm="2" cols="5" class="py-0 pr-0">-->
<!--                                <div class="code_text text-bold">-->
<!--                                    USD-->
<!--                                </div>-->
<!--                            </v-col>-->
<!--                            <v-col sm="10" cols="7" class="py-0 px-0">-->
<!--                                <v-text-field-->
<!--                                    class=" custom-border "-->
<!--                                    outlined-->
<!--                                    :rules="[(v) => !!v || 'Number is required']"-->
<!--                                    required-->
<!--                                />-->
<!--                            </v-col>-->
<!--                        </v-row>-->
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                        <label>{{ $t("loan_amount") }}</label>
                        <v-row class="mt-1 mr-0">
                            <v-col sm="2" cols="5" class="py-0 pr-0">
                                <div class="code_text text-bold">
                                    USD
                                </div>
                            </v-col>
                            <v-col sm="10" cols="7" class="py-0 px-0">
                                <v-text-field
                                    type="number"
                                    class=" custom-border "
                                    v-model="loan.amount"
                                    outlined
                                    :rules="[(v) => !!v || 'Number is required']"
                                    required
                                />
                            </v-col>
                        </v-row>
                        <label>{{ $t("interest_rate_per_month") }}</label>
                        <v-row class="mt-1 mr-0">
                            <v-col sm="2" cols="5" class="py-0 pr-0">
                                <div class="code_text text-bold">
                                    %
                                </div>
                            </v-col>
                            <v-col sm="10" cols="7" class="py-0 px-0">
                                <v-text-field
                                    type="number"
                                    class=" custom-border "
                                    outlined
                                    v-model="loan.interestRate"
                                    :rules="[(v) => !!v || 'Number is required']"
                                    required
                                />
                            </v-col>
                        </v-row>
<!--                        <label>{{ $t("monthly_service_charge") }}</label>-->
<!--                        <v-row class="mt-1 mr-0">-->
<!--                            <v-col sm="2" cols="5" class="py-0 pr-0">-->
<!--                                <div class="code_text text-bold">-->
<!--                                    %-->
<!--                                </div>-->
<!--                            </v-col>-->
<!--                            <v-col sm="10" cols="7" class="py-0 px-0">-->
<!--                                <v-text-field-->
<!--                                    class=" custom-border "-->
<!--                                    outlined-->
<!--                                    :rules="[(v) => !!v || 'Number is required']"-->
<!--                                    v-model="loan.mServiceCharge"-->
<!--                                    required-->
<!--                                />-->
<!--                            </v-col>-->
<!--                        </v-row>-->
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12">
                        <h4 class="text-bold">{{ $t("disclaimer") }}</h4>
                        <p class="mb-2">1. {{ $t("disclaimer_desc1") }}</p>
                        <p class="mb-2">2. {{ $t("disclaimer_desc3") }}</p>
                        <p class="mb-2">3. {{ $t("disclaimer_desc1") }}</p>
                    </v-col>
                    <v-col class="12">
                        <v-btn
                            @click="resetForm"
                            color="black"
                            outlined
                            class="capitalize black--text float-left "
                        >{{ $t("reset") }}
                        </v-btn
                        >
                        <v-btn
                            @click="loanCalculate"
                            color="primary"
                            class="capitalize white--text float-right "
                        >{{ $t("calculate") }}
                        </v-btn
                        >
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
// import kendo from "@progress/kendo-ui";
import kendo from "@progress/kendo-ui";
import saleFormContentHandler from "@/scripts/saleFormContentHandler";

export default {
    data: () => ({
        showLoading: false,
        paymentMethod: [
            {id: 1, name: 'បង់ថយ'},
            {id: 2, name: 'បង់ថេរ'}
        ],
        loanType: "",
        loan: {
            amount: 0,
            period: 12,
            startPaymentDate: 0,
            interestRate: 0,
            mServiceCharge: 0,
            paymentMethod: 1,
            monthlyRepayment: 0,
            totalPayment: 0,
            schdules: [],
            decimal: 2
        },
        totalInterest: 0,
        scheduleAR: [],
        saleFormContent: {},
        totalPayment: 0,
        scheduleData: [],
        numberFormat: 'n0'
    }),
    components: {
        // LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        resetForm(){
            this.loan = {
                amount: 0,
                period: 12,
                startPaymentDate: 0,
                interestRate: 0,
                mServiceCharge: 0,
                paymentMethod: 1,
                monthlyRepayment: 0,
                totalPayment: 0,
                schdules: [],
                decimal: 2
            }
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
                                this.loan.decimal = data[0].decimal
                            }
                        }
                    });
                }, 10);
            });
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
        loanCalculate(){
            if(this.loan.amount <= 0){
                this.alertError('Amount must over 0')
                return
            }
            if(this.loan.paymentMethod == 1){
                this.schedule4()
            }else if(this.loan.paymentMethod == 2){
                this.schedule5()
            }
            this.next();
        },
        next() {
            this.loan.schdules = this.scheduleData
            this.$emit("next", this.loan);
        },
        paymentMethodChange(){
            if(this.loan.paymentMethod == 1){
                this.schedule4()
            }else if(this.loan.paymentMethod == 2){
                this.schedule5()
            }
        },
        schedule4() {
            this.scheduleAR = []
            this.scheduleData = []
            let p = parseFloat(this.loan.amount)
            let t = parseFloat(this.loan.period)
            let ir = parseFloat(this.loan.interestRate)
            let sd = new Date()
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
                    numberFormat: self.numberFormat,
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
            }
            this.totalInterest = kendo.toString(tInterest, this.numberFormat)
            this.loan.totalInterest = tInterest
            this.totalPayment = kendo.toString(tInterest + parseFloat(this.loan.amount), this.numberFormat)
            this.loan.totalPayment = tInterest + parseFloat(this.loan.amount)
            this.addTotal()
            this.scheduleData = this.scheduleAR
        },
        makeBalance(amt) {
            let idx = parseFloat(this.loan.period) - 1
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
            if(parseFloat(this.loan.interestRate) <= 0){
                return
            }
            this.scheduleAR = []
            this.scheduleData = []
            let fprice = this.fixRate(parseFloat(this.loan.amount), ((parseFloat(this.loan.interestRate) * parseFloat(this.loan.period)) / 100), parseFloat(this.loan.period))
            fprice = parseFloat(fprice.toFixed(this.saleFormContent.decimal))
            this.loan.monthlyRepayment = parseFloat(fprice.toFixed(this.saleFormContent.decimal))
            let p = parseFloat(this.loan.amount)
            let t = parseFloat(this.loan.period)
            let sd = new Date()
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
                    numberFormat: self.numberFormat,
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
            this.totalPayment = kendo.toString(tInterest + parseFloat(this.loan.amount), this.numberFormat)
            this.loan.totalPayment = tInterest + parseFloat(this.loan.amount)
            this.addTotal()
            this.scheduleData = this.scheduleAR
        },
        addTotal() {
            this.scheduleAR.push({
                principal_r: '',
                principal: parseFloat(this.loan.amount),
                interest: this.totalInterest,
                total: this.totalPayment,
                date: 'Total',
                numberFormat: this.numberFormat,
                transaction_number: '',
            })
            // window.console.log(this.scheduleAR, 'loan schedule')
        },
    },
    computed: {},
    mounted: async function () {
        this.loadSaleFormContent()
    },
};
</script>
<style scoped>
.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
</style>
