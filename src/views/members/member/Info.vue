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
                        <td class="text-uppercase">{{ $t('group') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{ group }}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('accumulated_saving_interest') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{numberFormat(acInterest)}}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('approved_loan_amount') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{numberFormat(appLoan)}}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('outstanding_loan_balance') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{numberFormat(outstandingLoan)}}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('total_loan_payment') }}</td>
                        <td class="text-center">:</td>
                        <td class="text-left text-bold">{{numberFormat(loanPayment)}}</td>
                    </tr>
                    <tr>
                        <td class="third white--text text-uppercase mt-5" style="width: 50%;">{{ $t('share') }}</td>
                        <td class="third white--text text-center">:</td>
                        <td class="third white--text text-left text-bold mt-5">{{numberFormat(shareAmount)}}</td>
                    </tr>
<!--                    <tr>-->
<!--                        <td class="third  white&#45;&#45;text text-uppercase">{{ $t('share_price') }}</td>-->
<!--                        <td class="third  white&#45;&#45;text text-center">:</td>-->
<!--                        <td class="third  white&#45;&#45;text text-left text-bold">{{numberFormat(sharePrice)}}</td>-->
<!--                    </tr>-->
                    <tr>
                        <td class=" secondary white--text text-uppercase mt-5">{{ $t('saving') }}</td>
                        <td class=" secondary white--text text-center">:</td>
                        <td class=" secondary white--text text-left text-bold mt-5">{{numberFormat(savingAmount)}}</td>
                    </tr>
                    <tr>
                        <td class="secondary white--text text-uppercase">{{ $t('loan') }}</td>
                        <td class="secondary white--text text-center">:</td>
                        <td class="secondary white--text text-left text-bold">{{loan}}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <router-link
                        v-show="routerTo==''?false:true"
                        :to="{path: routerTo, query: { type: 'edit'} }">
                        <v-btn width="200" color="primary"
                               class="rounded-pill white--text float-right text-capitalize">
                            {{ $t('edit_member_info') }}
                        </v-btn>
                    </router-link>

                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import { i18n } from '@/i18n';
import kendo from "@progress/kendo-ui";

const loanHandler = require("@/scripts/loanHandler")
export default {
    name: "MemberInfo",
    props: {member: {}},
    computed: {
        name() {
            if (this.member) {
                // window.console.log(this.member, 'member')
                if (this.member.hasOwnProperty('fullName')) {
                    return this.member.fullName
                }
            }
            return ''
        },
        shareAmount() {
            if (this.member) {
                if (this.member.hasOwnProperty('shareAmount')) {
                    return this.member.shareAmount - this.member.withdrawShare
                }
            }
            return ''
        },
        sharePrice() {
            if (this.member) {
                if (this.member.hasOwnProperty('shareAmount')) {
                    // window.console.log(this.member)
                    return ((this.member.shareAmount  - this.member.withdrawShare) * this.member.sharePrice)
                }
            }
            return ''
        },
        savingAmount() {
            if (this.member) {
                if (this.member.hasOwnProperty('savingAmount')) {
                    return this.member.savingAmount
                }
            }
            return ''
        },
        acInterest() {
            if (this.member) {
                if (this.member.hasOwnProperty('accumulatedSavingInterest')) {
                    return this.member.accumulatedSavingInterest
                }
            }
            return ''
        },
        appLoan() {
            if (this.member) {
                if (this.member.hasOwnProperty('approvedLoanAmount')) {
                    return this.member.approvedLoanAmount
                }
            }
            return ''
        },
        loan() {
            if (this.member) {
                if (this.member.hasOwnProperty('loan')) {
                    return this.member.loan
                }
            }
            return ''
        },
        loanPayment() {
            if (this.member) {
                if (this.member.hasOwnProperty('loanPayment')) {
                    return this.member.loanPayment
                }
            }
            return ''
        },
        outstandingLoan() {
            if (this.member) {
                if (this.member.hasOwnProperty('approvedLoanAmount')) {
                    return this.member.outstandingLoanBalance < 0 ? 0 : this.member.outstandingLoanBalance
                }
            }
            return ''
        },
        type() {
            if (this.member) {
                if (this.member.hasOwnProperty('memberType')) {
                    return i18n.t(this.member.memberType.name.toLowerCase())
                }
            }
            return ''
        },
        group() {
            if (this.member) {
                if (this.member.hasOwnProperty('group')) {
                    return this.member.group.hasOwnProperty('name') ? this.member.group.name : this.member.group
                }
            }
            return ''
        },
        routerTo() {
            if (this.member.hasOwnProperty('id')) {
                return 'member' + `/${this.member ? this.member.id : ''}`
            }
            return ''
        },
        currencyCode() {
            if (this.member) {
                if (this.member.hasOwnProperty('priceLevel')) {
                    if(this.member.hasOwnProperty('currency')) {
                        return this.member.priceLevel.currency.code
                    }
                }
            }
            return ''
        },
    },
    data: () => ({
        decimals: [],
    }),
    watch: {},
    methods: {
        numberFormat(value) {
            // if (this.currencyCode) {
            //     let dec = this.decimals.filter((obj) => {
            //         return obj.currency.code == this.currencyCode
            //     })
            //     let fo = 0
            //     if (dec.length > 0) {
            //         fo = dec[0].decimal
            //     }
            return kendo.toString(value, 'n2')
            // }
        },
        numberFormatA(value) {
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

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
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

.v-application .secondary,
.v-application .third {
    border-color: #fff !important;
}
</style>