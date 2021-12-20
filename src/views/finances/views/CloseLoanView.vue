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
                                <h2 class="mb-0">{{ $t("close_loan") }}</h2>
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
                                            <v-col sm="9" cols="12" class="py-0">
                                                <v-row>
                                                    <v-col sm="6" cols="12" class="pb-0">
                                                        <label class="label">{{ $t("date") }}</label>
                                                         <h3 class="text-bold pb-2">2020-10-10</h3>

                                                        <label class="label">{{ $t("number") }}</label>
                                                        <h3 class="text-bold pb-2">abc123</h3>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="pb-0">
                                                        <label class="label">{{ $t("loan_number") }}</label>
                                                        <h3 class="text-bold pb-2">1233333</h3>
                                                    </v-col>
                                                </v-row>
                                            </v-col>

                                            <v-col sm="3" cols="12" class="pb-6">
                                                <v-card
                                                        outlined
                                                        style="display: block"
                                                        height="150"
                                                        dense
                                                        class="pa-3"
                                                        color="primary"
                                                >
                                                    <h4 class="mb-0 text-left text-white">
                                                        {{ $t("total_amount") }}
                                                    </h4>
                                                    <h3
                                                            style="font-size: 25px"
                                                            class="py-10 float-right text-right text-white"
                                                    >
                                                        1,000.00
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
                                            <v-simple-table class="attachment_table">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th>{{ $t("no.") }}</th>
                                                        <th>{{ $t("account") }}</th>
                                                        <th>{{ $t("description") }}</th>
                                                        <th>{{ $t("reference_no") }}</th>
                                                        <th>{{ $t("amount") }}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>01</td>
                                                        <td/>
                                                        <td/>
                                                        <td/>
                                                        <td/>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pa-0">
                                        <h3 class="mb-3">{{ $t("relate_cost_receipt") }}</h3>
                                        <!-- For table -->
                                        <template>
                                            <v-simple-table class="attachment_table">
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th>{{ $t("no.") }}</th>
                                                        <th>{{ $t("account") }}</th>
                                                        <th>{{ $t("description") }}</th>
                                                        <th>{{ $t("reference_no") }}</th>
                                                        <th>{{ $t("amount") }}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>01</td>
                                                        <td/>
                                                        <td/>
                                                        <td/>
                                                        <td/>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </template>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
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
    /* Cookie */
    const cookieJS = require("@/cookie.js");
    const { instituteId } = cookieJS.getCookie();

    const accountHandler = require("@/scripts/handler/accounting/account.js");
    const accountTypeHandler = require("@/scripts/handler/accounting/accountType.js");
    const accountGroupHandler = require("@/scripts/handler/accounting/accountGroup.js");
    import LoadingMe from "@/components/Loading";
    import {i18n} from "@/i18n";

    export default {
        name: "Account",
        components: {
            LoadingMe,
        },
        data: () => ({
            menuJDate: false,
            txn_date: new Date().toISOString().substr(0, 10),
            menuJDate1: false,
            txn_date1: new Date().toISOString().substr(0, 10),
            menuJDate2: false,
            txn_date2: new Date().toISOString().substr(0, 10),
            account_types: [],
            parent_accounts: [],
            account_groups: [],
            taxes: [],
            isEdit: false,
            // Form validation
            valid: true,
            compeletLoading: false,
            loadingAlert: false,
            loadingColorAlert: "",
            loadingTextAlert: "",
            saveMode: "",
            numberRules: [
                (v) => !!v || "Number is required",
                (v) => (v && v.length > 5) || "Number must be at least 6 digits",
            ],
            // Obj
            obj: {
                number: "",
                name: "",
                description: "",
                is_taxable: 0,
                status: 1,
                institute: instituteId,
                account_type: undefined,
                account_group: undefined,
                parent_account: undefined,
            },
        }),
        methods: {
            // Load obj according to query string {id}
            loadObj(id) {
                accountHandler.getOne(id).then((res) => {
                    // Bind Obj
                    this.obj = res.data;

                    //Call dependencies
                    this.onAccountTypeChanges();
                });
            },
            // Number
            generateNumber() {
                let obj = this.obj;

                if (obj.account_type !== undefined && obj.parent_account !== undefined) {
                    obj.number = obj.parent_account.number;
                } else if (obj.account_type !== undefined) {
                    obj.number = obj.account_type.number;
                }
            },
            // On Account Type Changes
            onAccountTypeChanges() {
                let obj = this.obj;
                this.alertMessage = false;
                // Clear data
                this.account_groups = [];
                this.parent_accounts = [];
                obj.account_group = undefined;
                obj.parent_account = undefined;

                let accountTypeNumber = obj.account_type.number;
                // Account Group by Account Type
                accountGroupHandler
                    .getByAccountType({
                        params: {
                            acc_type_code: accountTypeNumber,
                        },
                    })
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.account_groups = res.data;
                        }
                    });

                // Parent Account by Account Type
                accountHandler
                    .getParentAccountByAccountTypeNumber(accountTypeNumber)
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.parent_accounts = res.data;
                        }
                    });
            },
            // Shrink Data
            shrinkData() {
                let obj = this.obj,
                    pa = obj.parent_account,
                    ag = obj.account_group;

                // Parent Account
                if (pa !== undefined) {
                    obj.parent_account = {
                        uuid: pa.uuid,
                        number: pa.number,
                        name: pa.name,
                    };
                }
                // Account Group
                if (ag !== undefined) {
                    obj.account_group = {
                        uuid: ag.uuid,
                        name: ag.name,
                    };
                }
            },
            // All Saves
            saveNew() {
                if (this.$refs.form.validate()) {
                    this.saveMode = "saveNew";
                    this.save();
                } else {
                    this.alertError();
                }
            },
            saveClose() {
                if (this.$refs.form.validate()) {
                    this.saveMode = "saveClose";
                    this.save();
                } else {
                    this.alertError();
                }
            },
            cancel() {
                this.$swal({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: "Yes, reset it!",
                }).then((result) => {
                    if (result.value) {
                        this.$refs.form.reset();
                    }
                });
            },
            save() {
                // Shrink Data
                this.shrinkData();

                let self = this,
                    obj = this.obj;
                this.compeletLoading = true;
                // Sync Data
                accountHandler
                    .save(obj)
                    .then(function (response) {
                        if (response) {
                            self.responseStatus(response.status);
                        } else {
                            self.alertError();
                        }
                    })
                    .catch(function (error) {
                        self.alertError(error);
                    });
            },
            // Response Status
            responseStatus(status) {
                switch (status) {
                    case 200: // Ok
                        this.showAlert();
                        // Reset form
                        this.$refs.form.reset();

                        break;
                    case 201: // Duplicate
                        this.alertError("Duplicate entry!");
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
            showAlert() {
                this.compeletLoading = false;
                this.changeAlertStatus();
                this.loadingTextAlert = "Added Successful";
                this.loadingColorAlert = "#3DA72E";
                switch (this.saveMode) {
                    case "saveClose": // Save Close
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
                        window.history.go(-1);
                        break;
                    default:
                        // Save New
                        // this.$swal({
                        // 	position: 'products',
                        // 	icon: 'success',
                        // 	title: 'Your work has been saved',
                        // 	showConfirmButton: false,
                        // 	timer: 1500
                        // })
                        break;
                }
            },
            alertError(msg) {
                if (msg) {
                    // Code here
                } else {
                    msg = "Something went wrong!";
                }
                this.compeletLoading = false;
                this.loadingTextAlert = "Failed!";
                this.loadingColorAlert = "#eb8334";
                this.changeAlertStatus();
                // this.$swal({
                // 	position: 'products',
                // 	icon: 'error',
                // 	title: 'Oops...!',
                // 	text: msg,
                // 	showConfirmButton: true
                // })
            },
        },
        mounted() {
            // Access Query String
            let q = this.$route.params;
            if (q.id !== undefined) {
                // Set Edit Mode
                this.isEdit = true;

                this.loadObj(q.id);
            } else {
                this.isEdit = false;
            }

            // Call Account Type
            accountTypeHandler.getAll().then((res) => {
                this.account_types = res;
            });
        },
        computed: {
            templates() {
                return [{title: i18n.t("default")}, {title: i18n.t("custom")}];
            },
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
        .mb-6 {
            margin-bottom: 0 !important;
        }
    }
</style>
