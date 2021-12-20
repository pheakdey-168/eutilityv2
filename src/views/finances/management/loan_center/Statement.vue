<template>
    <v-row class="mx-3 white">
        <v-col sm="6" cols="12">
            <p >{{$t('updated_on')}} {{ lastUpdated }}</p>
        </v-col>
        <v-col sm="6" cols="12" >
            <v-btn to="" color="primary"
                   class="white--text float-right text-capitalize ml-3">{{$t('fetch_new_feeds')}}
            </v-btn>
            <v-btn to="" color="primary"
                   class="white--text float-right text-capitalize">{{$t('import')}}
            </v-btn>
        </v-col>
        <v-col sm="12" cols="12" class="pt-0">
            <div class="reports_table">
                <v-data-table
                        :headers="headers"
                        :items="bankStatements"
                        class="elevation-1"
                >
                    <!-- Date -->
                    <template v-slot:item.date="{ item }">
                        <span>{{ helper.dateFormat(item.date) }}</span>
                    </template>
                </v-data-table>
            </div>
        </v-col>


    </v-row>
</template>
<script>
    import helper from "@/helper.js"
    import { i18n } from '@/i18n'
    import { bankStatementHandler } from "@/scripts/AppHandlers"

    export default {
        name: "BankStatement",
        props: {
            initBankAccount: {
                type: Object,
            },
        },
        data () {
            return {
                helper          : helper,
                lastUpdated     : new Date(),
                bankStatements  : [],
                headers         : [
                    { text: i18n.t('date'), value: 'date' },
                    { text: i18n.t('bank_detail'), value: 'description' },
                    { text: i18n.t('amount'), value: 'amount' },
                    { text: i18n.t('source'), value: 'source' },
                    { text: i18n.t('status'), value: 'status' },
                    { text: i18n.t('action') },
                ],
            }
        },
        methods: {
            loadBankStatement () {
                let ba = this.initBankAccount

                if(ba.uuid){
                    bankStatementHandler.getByBankAccountId(ba.uuid)
                    .then(res => {
                        if (res.data) {
                            this.bankStatements = res.data
                        }
                    })
                }
            }
        },
        watch: {
            initBankAccount: "loadBankStatement"
        },
    }
</script>
<style scoped>
</style>