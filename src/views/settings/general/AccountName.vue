<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row style="border-bottom: 1px solid gainsboro;">
                    <v-col sm="12" cols="12" class="py-0">
                        <h2>{{$t('default_account_language')}}</h2>
                    </v-col>
                    <v-col sm="8" cols="8" class="kendo_dropdown_custom py-0">
                        <p>{{$t('dis_default_account_language')}}</p>
                    </v-col>

                    <v-col sm="4" cols="4" class="kendo_dropdown_custom py-0">
                        <v-select
                            class="mt-1"
                            v-model="n.name"
                            :items="nameList"
                            item-value="id"
                            item-name="name"
                            :item-text="item =>`${item.name}`"
                            outlined=""/>
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
import { i18n } from '@/i18n';
import AccountNameModel from "@/scripts/model/credit/AccountName"
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
        n: new AccountNameModel({}),
        decimals: [],
        currencyList: [],
        edit: false,
        segment: {},
        // nameList: [
        //     {id: "local_name", name: i18n.t('khmer_lang')},
        //     {id: "name", name: i18n.t('english_lang')}
        // ]
    }),
    props: {},
    computed: {
        nameList() {
            return [
                {id: "local_name", name: i18n.t('khmer_lang')},
                {id: "name", name: i18n.t('english_lang')}
            ]
        }
    },
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    created() {
    },
    methods: {
        async loadSingleName() {
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
                                this.n = res.data.data[0]
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
                    window.console.log(this.n)
                    loanHandler.accountNameCreate(new AccountNameModel(this.n)).then(response => {
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
        await this.loadSingleName()
    },
    
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.k-grid th {
    padding: 8px 12px;
    border-width: 0 0 1px 1px;
    white-space: break-spaces !important;
    text-align: center !important;
}
</style>
