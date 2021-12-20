<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="text-uppercase" style="width: 50%;">{{ $t('name') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ name }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('type') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ type }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('number') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ number }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('saving_status') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{status}}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('products') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ product }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('saving_type') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ savingType }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('interest_rate') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ interest }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('days_in_year') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ dayInYear }}</td>
                    </tr>
                    <tr>
                        <td class="third white--text text-uppercase mt-5" style="width: 50%;">{{ $t('saving') }}</td>
                        <td class="third  white--text text-center">:</td>
                        <td class="third white--text text-left text-bold mt-5">{{ numberFormat(deposit) }}</td>
                    </tr>
                    <tr>
                        <td class="third white--text text-uppercase">{{ $t('interest') }}</td>
                        <td class="third  white--text text-center">:</td>
                        <td class="third white--text text-left text-bold">{{ numberFormat(interestAmount) }}</td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('withdraw') }}</td>
                        <td class=" secondary white--text text-center">:</td>
                        <td class="secondary white--text text-left text-bold mt-5">{{ numberFormat(withdraw) }}</td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase mt-5">{{ $t('currency') }}</td>
                        <td class=" secondary white--text text-center">:</td>
                        <td class="secondary white--text text-left text-bold mt-5">{{ currencyCode }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script>

import kendo from "@progress/kendo-ui"
import {i18n} from "../../../../i18n";

const loanHandler = require("@/scripts/loanHandler")
// const $ = require("jquery")

export default {
    name: "SavingAccountInfo",
    props: {savingAccount: {}},
    computed: {
        name() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('name')) {
                    return this.savingAccount.name
                }
            }
            return ''
        },
        type() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('type')) {
                    return i18n.t(this.savingAccount.type.toLowerCase())
                }
            }
            return ''
        },
        number() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('number')) {
                    return this.savingAccount.number
                }
            }
            return ''
        },
        product() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('product')) {
                    return this.savingAccount.product
                }
            }
            return ''
        },
        savingType() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('savingType')) {
                    return this.savingAccount.savingType
                }
            }
            return ''
        },
        interest() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('interestRate')) {
                    return this.savingAccount.interestRate.name
                }
            }
            return ''
        },
        currencyCode() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('currencyCode')) {
                    return this.savingAccount.currencyCode
                }
            }
            return ''
        },
        dayInYear() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('dayInYear')) {
                    return this.savingAccount.dayInYear
                }
            }
            return ''
        },
        deposit() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('depositAmount')) {
                    return this.savingAccount.depositAmount
                }
            }
            return 0
        },
        interestAmount() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('interestAmount')) {
                    return this.savingAccount.interestAmount
                }
            }
            return 0
        },
        withdraw() {
            if (this.savingAccount) {
                if (this.savingAccount.hasOwnProperty('withdrawAmount')) {
                    return this.savingAccount.withdrawAmount
                }
            }
            return 0
        },
        status() {
            if(this.savingAccount){
                if(this.savingAccount.hasOwnProperty('status'))
                {
                    let status = 'active'
                    if(this.savingAccount.status == 0){
                        status = 'close'
                    }
                    return i18n.t(status)
                }
            }
            return ''
        }
    },
    data: () => ({
        decimals: {},
    }),
    watch: {},
    methods: {
        numberFormat(value) {
            if (this.currencyCode) {
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                return kendo.toString(value, 'n' + fo)
            }
        },
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
    },
    mounted: async function () {
        await this.loadDecimal()
    }
}
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
}

.theme--light.v-data-table {
    background-color: transparent !important;
    border-top: thin solid #ddd;
    border-bottom: thin solid #ddd;
    border-radius: 0 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
}

.v-application .third,
.v-application .secondary {
    border-color: #fff !important;
}
</style>