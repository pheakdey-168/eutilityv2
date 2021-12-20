<template>
    <v-row>
        <v-col sm="12" cols="12" class="py-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <h2 class="mb-0 ">{{ $t('currency_decimal') }}</h2>
                <v-dialog v-model="dialogm2" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                            {{ $t('create_new') }}
                        </v-btn>
                    </template>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card>
                            <v-card-title>{{ $t('add_decimal') }}</v-card-title>
                            <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                            <v-divider/>
                            <v-card-text style="height: 290px; background-color: #EDF1F5; color: #333333;">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <label class="label">{{ $t('currency') }}</label>
                                        <v-select
                                            class="mt-1"
                                            :items="currencyList"
                                            placeholder="select"
                                            item-text="name"
                                            :disabled="edit"
                                            v-model="decimal.currency"
                                            return-object
                                            outlined/>
                                        <label class="label">{{ $t('decimal') }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            v-model="decimal.decimal"
                                            outlined
                                            placeholder=""
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider/>
                            <v-card-actions class="pa-4">
                                <v-row>
                                    <v-col sm="6" cols="6" class="py-0">
                                        <v-btn color="black"
                                            outlined
                                            class=" text-capitalize  black--text float-left"
                                            @click="dialogm2 = false">{{ $t('cancel') }}
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="6" cols="6" class="py-0">
                                        <v-btn color="secondary"
                                            class="px-3  white--text text-capitalize float-right"
                                            @click="saveClose">
                                            {{ $t('save_close') }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>

                        </v-card>
                    </v-form>
                </v-dialog>
            </v-card>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('currency') }}</th>
                            <th class="text-uppercase">{{ $t('decimal') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="d in decimals" v-bind:key="d.id">
                            <td>{{ d.currency ? d.currency.code : '' }}</td>
                            <td class="">{{ d.decimal }}</td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(d)">
                                    <v-icon class="white--text" size="12">fa fa-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{ $t('edit') }}</span>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            :myLoading="true"/>
    </v-row>
</template>

<script>
import Decimal from "@/scripts/model/Decimal"
const loanHandler = require("@/scripts/loanHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const currencyType = {
    FUNCTIONAL_CURRENCY: 'fun-c',
    TRANSACTION_CURRENCY: 'txn-c',
    REPORTING_CURRENCY: 'rpt-c',
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading: false,
        dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        errors: [],
        //
        valid: true,
        saveOption: '',
        decimal: new Decimal({}),
        decimals: [],
        currencyList: [],
        edit: false,
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
        async loadDecimal() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.decimalGet().then(res => {
                        this.decimals = res.data.data
                    })
                }, 300);
            })
        },
        currencyChange(){
            window.console.log(this.decimal)
        },
        async loadCurrencyData() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    currencyHandler.list(currencyType.FUNCTIONAL_CURRENCY).then(response => {
                        if (response.data.statusCode === 200) {
                            this.currencyList = response.data.data
                            this.showLoading = false
                            window.console.log(this.currencyList, 'currency list')
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async onEditClick(value) {
            this.edit = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.decimal = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.edit = false
            this.decimal = new Decimal({})
            this.decimal.id = ''
            this.clear()
        },
        saveClose() {
            this.saveOption = "saveClose"
            this.save()
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            let dub = this.decimals.filter((obj) => {return obj.currency.code == this.decimal.currency.code})
            if(dub.length > 0 && this.edit == false){
                this.$snotify.error('Dublicate Currency')
                return
            }
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    window.console.log(this.decimal)
                    loanHandler.decimalCreate(new Decimal(this.decimal)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.loadDecimal()
                            this.$refs.form.reset()
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        window.console.log(e)
                    })
                }, 300);
            })
        },
        close() {
            this.dialogm2 = false
        },
        clear() {
        },
    },
    mounted: async function () {
        await this.loadCurrencyData()
        await this.loadDecimal()
    }
};
</script>
<style scoped>
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>