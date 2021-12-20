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
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 25px"
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
                                <!-- Form -->
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("date") }}</label>
                                        <h3 class="text-bold pb-2">2020-10-10</h3>

                                        <label class="label"> {{ $t("name") }}</label>
                                        <h3 class="text-bold pb-2">Vnachhai</h3>

                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{$t("financial_institutions")}}</label>
                                         <h3 class="text-bold pb-2">ABA</h3>

                                        <label class="label">{{ $t("type_of_loan") }}</label>
                                        <h3 class="text-bold pb-2">lOAN</h3>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("request_amount") }}</label>
                                        <h3 class="text-bold pb-2">3000</h3>

                                        <label class="label">{{ $t("loan_currency") }}</label>
                                         <h3 class="text-bold pb-2">USA</h3>
                                        
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <label class="label"> {{ $t("description") }}</label>
                                        <h3 class="text-bold pb-2">My description</h3>
                                    </v-col>
                                </v-row>
                                <!-- End form input -->
                            </v-card>
                            <!-- Footer -->
                            <v-divider class="mt-1" />
                            <v-card outlined dense class="no_border function_footer py-2">
                                <v-btn
                                class="float-right save_option mx-1 capitalize"
                                color="primary"
                                >
                                {{ $t("print") }}
                                </v-btn>
                                <v-btn
                                class="float-right mx-1 white--text capitalize"
                                color="blue"
                                >
                                {{ $t("delete") }}
                                </v-btn>
                                <v-btn
                                class="float-right mx-1 white--text capitalize"
                                color="lightBlue"
                                >
                                {{ $t("edit") }}
                                </v-btn>
                            </v-card>
                            <v-divider />
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
        </v-container>
    </v-app>
</template>

<script>
    import LoadingMe from "@/components/Loading";
    // import {i18n} from "@/i18n";
    import dateHelper from "@/helper";
    // import DatePickerComponent from "@/components/custom_templates/DatePickerComponent";
    import { LoanModel, CurrencyModel } from "@/scripts/model/AppModels";

    const { bankHandler, loanHandler, currencyHandler, entityTypeHandler } = require("@/scripts/AppHandlers");
    const { LoanStatus, EntityType, SaveOption } = require("@/scripts/default_setup/Collections");

    export default {
        name: "NewLoan",
        components: {
            LoadingMe,
            // "app-datepicker": DatePickerComponent,
        },
        props: {
            initLoan: {
                type: LoanModel,
            },
        },
        data: () => ({
            /* Obj */
            loan            : {},
            // Form validation
            valid			: true,
			isEdit          : false,
			saveMode 		: '',
			alert 			: false,
            errorMessage	: '',
            SaveOption      : SaveOption,
            // LoadingMe
            isLoading: false,
            loadingAlert: false,
            loadingColorAlert: "",
            loadingTextAlert: "",
            // Other
            banks           : [],
            currencies      : [],
            loanTypes       : [],
        }),
        methods: {
            /* Set Default Data */
            setDefaultData () {
                this.loan = new LoanModel({
                    date    : new Date().toISOString().substr(0, 10),
                    status  : LoanStatus.PENDING,
                })
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
			onSaveOptionClick (mode) {
                if (this.$refs.form.validate()) {
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

                this.isEdit = false;

				// Set default data
				this.setDefaultData()
			},
			save () {
                let self = this;
                
                // Convert date to ISO
                this.loan.date = dateHelper.toISODate(this.loan.date);
                
				// Sync Data
				this.showLoading = true;
				loanHandler.save(this.loan)
				.then(function (response) {
					if(response){
						self.responseStatus(response.status);
					}else{
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
        mounted () {
            // Set Default Data
            if(this.initLoan){
                this.loan = this.initLoan;
            }else{
                this.setDefaultData();
            }
            
            // Call Bank List
            bankHandler.getAll()
            .then((result) => {
                this.banks = result.data;
            });

            // Call Loan Type
            entityTypeHandler.getByEntityType(EntityType.LOAN)
            .then((result) => {
                this.loanTypes = result.data;
            });

            // Call Currency List
            currencyHandler.getJson().then((result) => {
                let currencylist = Object.values(result.data);
                currencylist.forEach((value) => {
                    let cur = new CurrencyModel(value);
                    this.currencies.push(cur);
                });
            });
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
