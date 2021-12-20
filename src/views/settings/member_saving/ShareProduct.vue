<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('share') }}</h2>
            <v-dialog v-model="dialogm2" max-width="700px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>{{ $t('add_share') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                        <v-divider/>
                        <v-card-text style="height: 600px; background-color: #EDF1F5; color: #333333;">
                            <v-row>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('currency') }}</label>
                                    <v-select
                                        class="mt-1"
                                        :items="currencyList"
                                        placeholder="select"
                                        :disabled="edit"
                                        item-text="name"
                                        :rules="[v => !!v || 'Currency is required']"
                                        v-model="p.currency"
                                        return-object
                                        outlined/>
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('type_of_share') }}</label>
                                    <v-select
                                        class="mt-1"
                                        :items="typeOfShareList"
                                        placeholder="select"
                                        item-text="name"
                                        :rules="[v => !!v || 'Type of share is required']"
                                        v-model="p.typeOfShare"
                                        return-object
                                        outlined/>
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="p.name"
                                        outlined
                                        placeholder=""
                                        :rules="[v => !!v || 'Name is required']"
                                    />
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('abbr') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="p.abbr"
                                        outlined
                                        placeholder=""
                                        :rules="[v => !!v || 'Abbr is required']"
                                    />
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('year_for') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="p.year"
                                        :disabled="edit"
                                        outlined
                                        placeholder=""
                                        :rules="[v => !!v || 'Year is required']"
                                    />
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('number_of_share') }}</label>
                                    <v-row>
                                        <v-col sm="1" cols="12" class="py-0">
                                            <v-checkbox
                                                v-model="p.allowShareAmount"
                                                hide-details
                                                class="shrink mr-2 mt-0"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col sm="11" cols="12" class="py-0">
                                            <v-text-field
                                                :disabled="!p.allowShareAmount"
                                                class="mt-1"
                                                v-model="p.shareAmount"
                                                outlined
                                                placeholder=""
                                                :rules="[v => !!v || 'Share amount is required']"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('price_per_share') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="p.pricePerShare"
                                        outlined
                                        placeholder=""
                                        :rules="[v => !!v || 'Price is required']"
                                    />
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label  mb-0">{{$t('cash_account')}}</label>
                                    <v-select
                                        class="mt-1"
                                        :items="cashAccounts"
                                        placeholder="select"
                                        :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                        tage=""
                                        v-model="p.cashAccount"
                                        return-object
                                        outlined/>
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label">{{ $t('dividend_account') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="dividendAccounts"
                                        :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                        item-value="name"
                                        v-model="p.dividendAccount"
                                    />
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label  mb-0">{{$t('share_account')}}</label>
                                    <v-select
                                        class="mt-1"
                                        :items="capitalAccounts"
                                        placeholder="select"
                                        :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                        tage=""
                                        v-model="p.capitalAccount"
                                        return-object
                                        outlined/>
                                </v-col>
                                <v-col sm="6" cols="12" class="pb-0">
                                    <label class="label  mb-0">{{$t('maximum_share_')}}</label>
                                    <v-row>
                                        <v-col sm="1" cols="12" class="py-0">
                                            <v-checkbox
                                                v-model="p.allowMaxSell"
                                                hide-details
                                                class="shrink mr-2 mt-0"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col sm="6" cols="12" class="py-0 pr-2">
                                            <v-text-field
                                                :disabled="!p.allowMaxSell"
                                                class="mt-1"
                                                v-model="p.maxSellAmount"
                                                outlined
                                                placeholder=""
                                            />
                                        </v-col>
                                        <v-col sm="5" cols="12" class="py-0 pl-0">
                                            <v-select
                                                :disabled="!p.allowMaxSell"
                                                class="mt-1"
                                                :items="maxSellTyps"
                                                :placeholder="$t('select')"
                                                item-text="name"
                                                item-value="id"
                                                v-model="p.maxSellType"
                                                outlined/>
                                        </v-col>
                                    </v-row>
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
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">{{ $t('share_amount') }}</th>
                            <th class="text-uppercase">{{ $t('price_per_share') }}</th>
                            <th class="text-uppercase">{{ $t('year') }}</th>
                            <th class="text-uppercase">{{ $t('type_of_share') }}</th>
                            <th class="text-uppercase">{{ $t('currency') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="d in ps" v-bind:key="d.id">
                            <td>{{ d.name ? d.name : '' }}</td>
                            <td>{{ d.shareAmount }}</td>
                            <td>{{ d.pricePerShare }}</td>
                            <td class="">{{ d.year }}</td>
                            <td class="">{{ d.typeOfShare ? d.typeOfShare.name : '' }}</td>
                            <td>{{ d.currency ? d.currency.code : '' }}</td>
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
import PricePerShareModel from "@/scripts/model/PricePerShare"
const accountHandler = require("@/scripts/accountHandler")
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
        currencyList: [],
        maxSellTyps: [
            {id: '$', name: 'ហ៊ុន'},
            {id: '%', name: '%'}
        ],
        //
        valid: true,
        saveOption: '',
        p: new PricePerShareModel({}),
        ps: [],
        oldps: [],
        edit: false,
        typeOfShareList: [],
        cashAccounts: [],
        capitalAccounts: [],
        dividendAccounts: [],
        accountName: 'name',
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    methods: {
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        // Cash Account
                        this.cashAccounts = res.filter(m => m.account_type.number === 1).map(itm => {
                            return {
                                id: itm.uuid,
                                uuid: itm.uuid,
                                name: itm.name,
                                local_name: itm.local_name,
                                number: itm.number,
                                is_taxable: itm.is_taxable,
                                banhjiAccCode: itm.banhjiAccCode,
                                group_code: itm.group_code,
                                parent_account: itm.parent_account,
                                type_code: itm.type_code
                            }
                        })
                        // Capital Account
                        this.capitalAccounts = res.filter(m => m.account_type.number === 30).map(item => {
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
                        // Dividend Account
                        this.dividendAccounts = res.filter(m => m.account_type.number === 29).map(item => {
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
                    })
                }, 300);
            })
        },
        async loadPrice() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.pricePerShareGet().then(res => {
                        this.ps = res.data.data
                        this.oldps = res.data.data
                    })
                }, 300);
            })
        },
        async loadTypeOfShare() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.typeOfShareGet().then(res => {
                        this.typeOfShareList = res.data.data
                    })
                }, 300);
            })
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
                    this.p = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.edit = false
            this.p = new PricePerShareModel({})
            this.p.id = ''
            this.p.currency = this.currencyList[0]
            this.p.typeOfShare = this.typeOfShareList[0]
            this.p.cashAccount = this.cashAccounts[0]
            this.p.capitalAccount = this.capitalAccounts[0]
            this.p.dividendAccount = this.dividendAccounts[0]
            window.console.log(this.p)
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
            /*if(this.edit === false) {
                let dub = this.oldps.filter((obj) => {
                    return obj.year === this.p.year
                })
                if (dub.length > 0) {
                    this.$snotify.error('Dublicate Year')
                    return
                }
            }*/
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.pricePerShareCreate(new PricePerShareModel(this.p)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.loadPrice()
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
        async loadAccountName() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    loanHandler.accountNameGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            window.console.log(res)
                            if(res.data.data.length > 0) {
                                this.accountName = res.data.data[0].name
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        close() {
            this.dialogm2 = false
        },
        clear() {
        },
    },
    mounted: async function () {
        await this.loadPrice()
        await this.loadCurrencyData()
    },
    created: async function () {
        await this.loadAccountName()
        await this.loadAccount()
        await this.loadTypeOfShare()
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