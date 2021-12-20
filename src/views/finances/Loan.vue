<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <div class="function_wrapper">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <div class="function_header pb-0">
                                <h2 class="mb-0">{{$t('close_loan')}}</h2>
                                <v-icon
                                        onclick="window.history.go(-1); return false;"
                                        style="cursor: pointer; color: #333; font-size: 40px;"
                                        class="float-right"
                                >close
                                </v-icon>
                            </div>
                            <v-row>
                                <v-col sm="12" cols="12">
                                    <div class="function_content">
                                        <v-row>
                                            <v-col sm="9" cols="12" class="py-0">
                                                <v-row>
                                                    <v-col sm="6" cols="12" class="pb-0">
                                                        <label class="label">{{$t('date')}}</label>
                                                        <v-menu
                                                                v-model="menuJDate"
                                                                :close-on-content-click="false"
                                                                max-width="290">
                                                            <template v-slot:activator="{ on,attrs }">
                                                                <v-text-field class=" mt-2 mb-3"
                                                                              v-model="txn_date"
                                                                              readonly
                                                                              outlined
                                                                              append-icon="event"
                                                                              v-on="on"
                                                                              v-bind="attrs"
                                                                              @click:clear="txn_date = undefined"
                                                                              @click:append="menuJDate = true"
                                                                              required
                                                                />
                                                            </template>
                                                            <v-date-picker
                                                                    v-model="txn_date"
                                                                    @change="menuJDate = false"
                                                                    no-title
                                                            />
                                                        </v-menu>
                                                        <label class="label">{{$t('number')}}</label>
                                                        <v-row>
                                                            <v-col sm="2" cols="3" class="pb-1 pt-2 pr-0">
                                                                <div class="code_text" v-text="obj.abbr"></div>
                                                            </v-col>
                                                            <v-col sm="8" cols="7" class="pb-1 pt-2 pl-0">
                                                                <v-text-field class=" custom-border"
                                                                              v-model="obj.number"
                                                                              outlined
                                                                              :rules="[v => !!v || 'Number is required']"
                                                                              required/>
                                                            </v-col>
                                                            <v-col sm="2" cols="2" class="pb-1 pt-2 pl-0">
                                                                <v-icon color="black" size="30" class="border_qrcode" @click="generateNumber">mdi-qrcode</v-icon>
                                                            </v-col>
                                                        </v-row>

                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="pb-0">

                                                        <label class="label">{{$t('financial_institutions')}}</label>
                                                        <v-select class=" mt-2 mb-3"
                                                                  :disabled="obj.account_type === undefined"
                                                                  :items="parent_accounts"
                                                                  item-value="number"
                                                                  item-text="name"
                                                                  v-model="obj.parent_account"
                                                                  no-data-text="No data found."
                                                                  return-object
                                                                  outlined
                                                        >
                                                            <!-- <template slot='selection' slot-scope='{ item }'>
                                                                {{ item.number }} - {{ item.name }}
                                                            </template> -->
                                                            <template slot='item' slot-scope='{ item }'>
                                                                {{ item.number }} - {{ item.name }}
                                                            </template>
                                                        </v-select>

                                                        <label class="label">{{$t('loan_number')}}</label>
                                                        <v-select class=" mt-2"
                                                                  :disabled="obj.account_type === undefined"
                                                                  :items="parent_accounts"
                                                                  item-value="number"
                                                                  item-text="name"
                                                                  v-model="obj.parent_account"
                                                                  no-data-text="No data found."
                                                                  return-object
                                                                  clearable
                                                                  outlined
                                                        >
                                                            <template slot='selection' slot-scope='{ item }'>
                                                                {{ item.number }} - {{ item.name }}
                                                            </template>
                                                            <template slot='item' slot-scope='{ item }'>
                                                                {{ item.number }} - {{ item.name }}
                                                            </template>
                                                        </v-select>
                                                    </v-col>
                                                </v-row>
                                            </v-col>

                                            <v-col sm="3" cols="12" class="pb-0">
                                                <v-card outlined style="display: block" height="150" dense class="pa-3" color="primary">
                                                    <h4 class="mb-0 text-left text-white">{{ $t('total_amount') }}</h4>
                                                    <h3 style="font-size: 25px"  class="py-10 float-right text-right text-white">1,000.00</h3>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-col>
                            </v-row>

                            <v-row style="background-color: rgb(255, 255, 255); width: 100%; margin: 0 auto 0px;">
                                <v-col sm="12" cols="12" class="pb-3 pa-0">
                                    <p class="mb-3">{{$t('loan_information')}}</p>
                                    <template>
                                        <v-simple-table class="attachment_table">
                                            <template v-slot:default>
                                                <thead>
                                                <tr>
                                                    <th>{{$t('no.')}}</th>
                                                    <th>{{$t('account')}}</th>
                                                    <th>{{$t('description')}}</th>
                                                    <th>{{$t('reference_no')}}</th>
                                                    <th>{{$t('amount')}}</th>
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
                                    <v-row style="background-color: #fff;">
                                        <v-col sm="1" cols="12" class="pb-0">
                                            <v-btn class="float-left btn_plus" >
                                                <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="12" cols="12" class="py-0">
                                    <p class="mb-3">{{$t('cash_used_for_payment')}}</p>
                                    <template>
                                        <v-simple-table class="attachment_table">
                                            <template v-slot:default>
                                                <thead>
                                                <tr>
                                                    <th>{{$t('no.')}}</th>
                                                    <th>{{$t('account')}}</th>
                                                    <th>{{$t('description')}}</th>
                                                    <th>{{$t('reference_no')}}</th>
                                                    <th>{{$t('amount')}}</th>
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
                                    <v-row style="background-color: #fff;">
                                        <v-col sm="3" cols="12" class="pb-0">
                                            <v-btn class="float-left btn_plus" >
                                                <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                            </v-btn>
                                            <v-btn class="float-left ml-3 add_account mr-3" to="account">
                                                {{$t('add_account')}}
                                            </v-btn>
                                        </v-col>
                                        <v-col sm="4" cols="12" class="pb-0">
                                            <template>
                                                <v-file-input class="mt-0 pt-0 " sm="3" cols="6"
                                                              :placeholder="$t('attactment')"
                                                              multiple
                                                              prepend-icon="mdi-paperclip"
                                                >
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip
                                                                small
                                                                label
                                                                color="primary"
                                                        >
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                            </template>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>

                            <div class="function_footer">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="mr-2 float-left select_template" v-on="on" >
                                            {{$t('select_template')}}
                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item v-for="(item, index) in templates" :key="index" >
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-btn class="float-left  btn_cancel" @click="cancel">{{$t('cancel')}}</v-btn>
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="ml-2 float-right save_option" v-on="on" >
                                            {{$t('save_option')}}
                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list rounded>
                                        <v-list-item-group >
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title v-if="!isEdit" @click="saveNew">{{$t('save_new')}}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title >{{$t('save_print')}}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title >{{$t('save_draft')}}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-menu>
                                <v-btn class="float-right btn_save_close" @click="saveClose">{{$t('save_close')}}</v-btn>

                            </div>
                        </v-form>
                    </div>
                </v-col>
            </v-row>
            <LoadingMe
                    :isLoading="compeletLoading"
                    :fullPage="true"
                    :myLoading="true"
                    :alertMessage="loadingAlert"
                    :color="loadingColorAlert"
                    :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
    /* Cookie */
    const cookieJS = require("@/cookie.js");
    const { instituteId } = cookieJS.getCookie();

    const accountHandler = require("@/scripts/handler/accounting/account.js")
    const accountTypeHandler = require("@/scripts/handler/accounting/accountType.js")
    const accountGroupHandler = require("@/scripts/handler/accounting/accountGroup.js")
    import LoadingMe from '@/components/Loading'
    import {i18n} from '@/i18n'
    export default {
        name: "Account",
        components: {
            LoadingMe
        },
        data: () => ({
            menuJDate	: false,
            txn_date	: new Date().toISOString().substr(0, 10),
            menuJDate1	: false,
            txn_date1	: new Date().toISOString().substr(0, 10),
            menuJDate2	: false,
            txn_date2	: new Date().toISOString().substr(0, 10),
            account_types: [],
            parent_accounts: [],
            account_groups: [],
            taxes: [],
            isEdit: false,
            // Form validation
            valid: true,
            compeletLoading: false,
            loadingAlert: false,
            loadingColorAlert: '',
            loadingTextAlert: '',
            saveMode: '',
            numberRules: [
                v => !!v || 'Number is required',
                v => (v && v.length > 5) || 'Number must be at least 6 digits',
            ],
            // Obj
            obj: {
                number: '',
                name: '',
                description: '',
                is_taxable: 0,
                status: 1,
                institute: instituteId,
                account_type: undefined,
                account_group: undefined,
                parent_account: undefined
            },
        }),
        methods: {
            // Load obj according to query string {id}
            loadObj(id) {
                accountHandler.getOne(id)
                    .then(res => {
                        // Bind Obj
                        this.obj = res.data;

                        //Call dependencies
                        this.onAccountTypeChanges();
                    })
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
                this.alertMessage = false
                // Clear data
                this.account_groups = [];
                this.parent_accounts = [];
                obj.account_group = undefined;
                obj.parent_account = undefined;

                let accountTypeNumber = obj.account_type.number;
                // Account Group by Account Type
                accountGroupHandler.getByAccountType({
                    params: {
                        acc_type_code: accountTypeNumber
                    }
                }).then(res => {
                    if (res.data.length > 0) {
                        this.account_groups = res.data
                    }
                });

                // Parent Account by Account Type
                accountHandler.getParentAccountByAccountTypeNumber(accountTypeNumber)
                    .then(res => {
                        if (res.data.length > 0) {
                            this.parent_accounts = res.data
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
                    }
                }
                // Account Group
                if (ag !== undefined) {
                    obj.account_group = {
                        uuid: ag.uuid,
                        name: ag.name,
                    }
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
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4d4848',
                    cancelButtonColor: '#ED1A3A',
                    confirmButtonText: 'Yes, reset it!'
                }).then((result) => {
                    if (result.value) {
                        this.$refs.form.reset();
                    }
                })
            },
            save() {
                // Shrink Data
                this.shrinkData();

                let self = this,
                    obj = this.obj;
                this.compeletLoading = true
                // Sync Data
                accountHandler.save(obj)
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
                    case 200:// Ok
                        this.showAlert();
                        // Reset form
                        this.$refs.form.reset();

                        break;
                    case 201:// Duplicate
                        this.alertError('Duplicate entry!');
                        break;
                    default:
                        break;
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
                this.compeletLoading = false
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
                        window.history.go(-1)
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
            },
            alertError(msg) {
                if (msg) {
                    // Code here
                } else {
                    msg = 'Something went wrong!';
                }
                this.compeletLoading = false
                this.loadingTextAlert = "Failed!"
                this.loadingColorAlert = "#eb8334"
                this.changeAlertStatus()
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
            accountTypeHandler.getAll()
                .then(res => {
                    this.account_types = res;
                })
        },
        computed: {
            templates(){
				return [
					{ title: i18n.t('default')  },
					{ title: i18n.t('custom') },
				] 
			},
        },
    };
</script>
<style scoped>
    .function_content {
        padding: 0 25px 25px;
        border-bottom: 0;
    }
    .attachment_table.theme--light.v-data-table{
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