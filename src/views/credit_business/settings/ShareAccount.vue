<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('share_account') }}</h2>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <label class="label  mb-0">{{$t('cash_account')}}</label>
                <v-select
                    class="mt-1"
                    :items="cashAccounts"
                    placeholder="select"
                    item-text="name"
                    tage=""
                    v-model="p.cashAccount"
                    return-object
                    outlined/>
                <label class="label  mb-0">{{$t('capital_account')}}</label>
                <v-select
                    class="mt-1"
                    :items="capitalAccounts"
                    placeholder="select"
                    item-text="name"
                    tage=""
                    v-model="p.capitalAccount"
                    return-object
                    outlined/>
                <label class="label  mb-0">{{$t('dividend_account')}}</label>
                <v-select
                    class="mt-1"
                    :items="dividendAccounts"
                    placeholder="select"
                    item-text="name"
                    tage=""
                    v-model="p.dividendAccount"
                    return-object
                    outlined/>
                <v-btn color="secondary" class="float-right white--text text-capitalize"
                       @click="save">
                    {{ $t('save') }}
                </v-btn>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import ShareAccountModel from "@/scripts/model/credit/ShareAccount"
const accountHandler = require("@/scripts/accountHandler")
const loanHandler = require("@/scripts/loanHandler")

export default {
    components: {},
    data: () => ({
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
        p: new ShareAccountModel({}),
        cashAccounts: [],
        capitalAccounts: [],
        dividendAccounts: [],
        edit: false,
        segment: {},
        segments: []
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
                        this.dividendAccounts = res.filter(m => m.account_type.number === 19).map(item => {
                            return {
                                id: item.uuid,
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
        async loadSingleShareAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.shareAccountGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if(res.data.data.length > 0) {
                                this.p = res.data.data[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async save() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    loanHandler.shareAccountCreate(new ShareAccountModel(this.p)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
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
        await this.loadSingleShareAccount()
    },
    created: async function () {
        await this.loadAccount()
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