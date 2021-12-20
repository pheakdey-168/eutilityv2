<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row style="border-bottom: 1px solid gainsboro;">
                    <v-col sm="12" cols="12" class="py-0">
                        <h2>{{ $t('penalty_account') }}</h2>
                    </v-col>
                    <v-col sm="8" cols="8" class="kendo_dropdown_custom py-0">
                        <p>{{$t('description')}}</p>
                    </v-col>

                    <v-col sm="4" cols="4" class="kendo_dropdown_custom py-0">
                        <v-select
                        class="mt-1"
                        :items="revenueAccounts"
                        placeholder="select"
                        item-text="name"
                        tage=""
                        v-model="p.Account"
                        return-object
                        outlined/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <div class="function_footer">

                            <v-btn color="primary"
                                   @click="save"
                                   class="float-right  white--text text-capitalize mr-3 "
                            >
                                {{ $t('save') }}
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import PenaltyModel from "@/scripts/model/credit/Penalty"
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
        p: new PenaltyModel({}),
        revenueAccounts: [],
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
                        //revenue Account
                        this.revenueAccounts = res.filter(m => m.account_type.number === 32).map(item => {
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
        async loadSinglePenalty() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.penaltyGet().then(res => {
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
                    loanHandler.penaltyCreate(new PenaltyModel(this.p)).then(response => {
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
        await this.loadSinglePenalty()
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