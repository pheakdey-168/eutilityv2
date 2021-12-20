<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{$t('bank_account')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px" eager>
                <template v-slot:activator="{ on }">
                    <v-btn color="third" class="rounded-pill text-capitalize white--text float-right" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>{{$t('bank_account')}}</v-card-title>
                    <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    <v-divider/>
                    <v-card-text style="height: 210px; background-color: #EDF1F5; color: #333;">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <label class="label">{{$t('bank_name')}}</label>
                                    <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="bankList"
                                        :rules="[v => !!v || $t('bank_name_require')]"
                                        item-text="name"
                                        item-value="id"
                                        v-model="selectBankName"
                                        @change="bankName"
                                        outlined
                                        return-object/>

                                    <label class="label">{{$t('bank_account')}}</label>
                                    <v-select class="mt-1"
                                        id="acc_type_selector"
                                        :items="bankAcountList"
                                        :rules="[v => !!v || $t('bank_account_require')]"
                                        :item-text="item =>`${item.account} ( ${item.currency} )`"
                                        item-value="id"
                                        v-model="selectBankAccount"
                                        outlined
                                        return-object/>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="pa-5">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="black" outlined class=" text-capitalize rounded-pill black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn color="secondary" class="px-3 rounded-pill white--text text-capitalize" @click="onSaveClose">{{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
            <p class="mb-0">{{$t('bank_account_desc')}} </p>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{$t('bank')}}</th>
                            <th class="text-uppercase">{{$t('bank_account_number')}}</th>
                            <th style="width: 50px;"/>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="paybank in payrollBank" v-bind:key="paybank.id">
                                <td>{{ paybank.bankName ? paybank.bankName: '' }}</td>
                                <td class="text-bold">{{ paybank.account?paybank.account.account:'' }}</td>
                                <td>
                                    <v-btn class="btn_edit_setting" @click="onEditClick(paybank)">
                                        <v-icon class="white--text" size="12">fa fa-pen</v-icon>
                                        <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script>
    import BankPayroll from '@/scripts/model/BankPayroll'
    const bankModel = new BankPayroll({})
    const payrollHandler = require("@/scripts/payrollHandler")
    const bankAccountHandler  = require("@/scripts/bankAccountHandler")
    export default {
        components: {},
        data: () => ({
            dialogm1: '',
            dialogm2: false,
            compeletLoading: true,
            isFullpage: false,
            snackbar: false,
            textStatus: 'Success',
            valid: true,
            color: '#3DA72E',
            timeout: 6000,
            x: 'right',
            y: 'top',
            payrollBank: [],
            bankList: [],
            bankAcountList: [],
            bankPayroll: bankModel,
            selectBankName: {},
            selectBankAccount: '',

        }),
        props: {},
        computed: {},
        watch: {
            dialogm2(val) {
                val || this.close()
            },
        },
        created() {
        },
        methods: {
            async onEditClick(value) {
                this.selectBankName = value.name
                this.selectBankAccount = value.account
                this.bankPayroll = value
                this.dialogm2       = true
                this.bankName()
            },
            onNewClick() {
                this.option = 1
                this.clear()
            },
            async onSaveClose() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.validate()
                    return
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "id": this.bankPayroll.id ? this.bankPayroll.id : '',
                            "bank": this.selectBankName,
                            "bankAccount": this.selectBankAccount,
                        }
                        payrollHandler.createBank(data).then(response => {
                            if (response.data.statusCode === 201) {
                                const res = response.data
                                const index = this.payrollBank.findIndex(item => {
                                    return (res.data.id === item.id)
                                })
                                if (this.payrollBank.length === 0) {
                                    this.loadPayrollBank()
                                } else {
                                    if (index < 0) {
                                        this.payrollBank.push(res.data)
                                    } else {
                                        this.payrollBank.splice(index, 1, res.data)
                                    }
                                }
                                this.$snotify.success('Success')
                                this.clear()
                                this.close()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            close() {
                this.dialogm2 = false
            },
            clear() {
                this.selectBankAccount = ''
                this.selectBankName = ''
            },
            async loadPayrollBank(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getBank().then(res => {
                            this.payrollBank = res.data.data
                        })
                    }, 300);
                })
            },
            async loadBank() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        bankAccountHandler.getAll().then(res => {
                            const results = Array.from(new Set(res.map(s=>s.bank.uuid))).map(uuid=>{
                                return {
                                    id: uuid,
                                    name: res.find(s=>s.bank.uuid==uuid).bank.name,
                                }
                            })
                            this.bankList = results
                        })
                    }, 300);
                })
            },
            bankName(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        bankAccountHandler.getAll().then(res => {
                            const results = res.filter(ac => ac.bank.uuid  ==  this.selectBankName.id).map(acb=>{
                                return {
                                    id: acb.uuid,
                                    account: acb.number,
                                    currency: acb.currency.code
                                }
                            });
                            this.bankAcountList = results
                        })
                    }, 300);
                })
            }
        },
        mounted: async function () {
            this.loadPayrollBank()
            this.loadBank()
            this.bankName()
        }
    };
</script>
<style scoped>
    .acc_group header {
        height: 10px !important;
    }

    table.acc_group tr td {
        border-bottom: 1px solid #ccc;
        padding: 8px;
        vertical-align: middle;
    }

    table.acc_group tr td:first-child {
        font-weight: 700;
    }

    table.acc_group tr td:last-child {
        text-align: center;
    }

    .v-card__actions .v-btn.v-btn {
        padding: 0 16px;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        font-family: 'Krasar-Bold', serif;
        color: #000 !important;
        border-top: 1px solid #000 !important;
        border-bottom: 1px solid #000 !important;
        font-size: 15px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
        color: #000 !important;
        padding: 5px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
        border-bottom: 1px solid #000 !important;
    }

    .function_footer {
        padding: 15px;
        display: inline-block;
    }

    @media (max-width: 576px) {

    }
</style>