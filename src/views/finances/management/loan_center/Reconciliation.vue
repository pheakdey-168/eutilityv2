<template>
    <v-row class="mx-3 white">
        <v-col sm="12" cols="12" class="">
            <v-btn to="" color="primary"
                   class="white--text float-right text-capitalize">
                {{$t('new_reconciliation')}}
            </v-btn>
        </v-col>

        <v-col sm="12" cols="12" class="pt-0">
            <v-data-table
                    :headers="reconcileHeaders"
                    :items="reconcileList"
                    class="elevation-1"
            >
                <template v-slot:item="{ item, index }">
                    <tr>
                        <td style="text-align: center;">{{ index + 1 }}</td>
                        <td class="text-xs-right">{{ helper.dateFormat(item.date) }}</td>
                        <td class="text-xs-right">{{ item.number }}</td>
                        <td style="text-align: right;">{{ Number(item.variance_amount).toLocaleString() }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>

    </v-row>
</template>
<script>
    import kendo from '@progress/kendo-ui'
    import {i18n} from '@/i18n'
    import helper from "@/helper.js"
    // import { JournalModel, JournalEntryModel } from '@/scripts/model/AppModels'
    import {bankAccountHandler, journalHandler, reconcileHandler} from '@/scripts/AppHandlers'

    export default {
        name: "Banking",
        components: {
        },
        data: () => ({
            helper: helper,
            // Search transaction dates
            start_date: "",
            end_date: "",
            journalEntriesDetails: [],
            reconcileList: [],
            bankAccountTypes: [],
            reconcileHeaders: [
                {text: i18n.t('no.')},
                {text: i18n.t('date'), value: 'date'},
                {text: i18n.t('number'), value: 'number'},
                {text: i18n.t('variance'), value: 'variance_amount'},
                {text: i18n.t('action')},
            ],
            // Account information
            bankAccount: [],
            bankAccountDetails: [],
            files: [],
            attachments: [],
            // LoadingMe
            showLoading: true,
            isLoaded: false,
            // Kendo dataSource
            schemaDefinition: {
                model: {id: "uuid"}
            },
            // Group order by account_type_id asc
            groupDefinition: [
                {
                    field: "bank.name",
                    compare: function (a, b) {
                        if (a.items[0].number === b.items[0].number) {
                            return 0;
                        } else if (a.items[0].number > b.items[0].number) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                },
                {
                    field: "type",
                    compare: function (a, b) {
                        if (a.items[0].number === b.items[0].number) {
                            return 0;
                        } else if (a.items[0].number > b.items[0].number) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                },
            ],
        }),
        methods: {
            // On Sorter Changes
            onSorterChanges(val) {
                let today = new Date()

                switch (val) {
                    case "Today":
                        this.start_date = kendo.toString(today, 'yyyy-MM-dd')
                        this.end_date = kendo.toString(today, 'yyyy-MM-dd')

                        break
                    case "This Week":
                        var first = today.getDate() - today.getDay(),
                            last = first + 6;

                        this.start_date = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                        this.end_date = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                        break
                    case "This Month":
                        this.start_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                        this.end_date = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                        break
                    case "This Year":
                        this.start_date = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                        this.end_date = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

                        break
                    default:
                        this.start_date = "";
                        this.end_date = "";
                }
            },
            // Search Transaction
            searchTransaction() {
                let self = this,
                    ba = this.bankAccount,
                    sdate = this.start_date,
                    edate = this.end_date

                if (ba.uuid) {
                    if (sdate && edate) {
                        sdate = kendo.toString(new Date(sdate), 'yyyy-MM-dd') + 'T00:00:00.000Z'

                        edate = new Date(edate)
                        edate = kendo.toString(edate, 'yyyy-MM-dd') + 'T23:59:59.999Z'
                    } else {
                        sdate = 0
                        edate = 0
                    }

                    this.isLoaded = true
                    this.showLoading = true
                    journalHandler.getEntryDetailByAccount(ba.account.uuid, {
                        params: {
                            start_date: sdate,
                            end_date: edate,
                        }
                    })
                        .then(res => {
                            if (res) {
                                this.bankAccountDetails = res
                                this.journalEntriesDetails = res.entries_detail
                            }
                        })
                        .finally(function () {
                            self.showLoading = false
                        })
                }
            },
            // On Account Type Changes
            async onBankTypeChanges(bankType) {
                new Promise(resolve => {
                    resolve('resolved')

                    if (bankType === undefined) {
                        this.bankAccounts = this.bankAccountsBk
                    } else {
                        this.bankAccounts = this.bankAccountsBk.filter(
                            value => value.type === bankType
                        )
                    }
                })
            },
            // On Search Changes
            async onSearchChanges(searchText) {
                new Promise(resolve => {
                    resolve('resolved')

                    if (searchText !== '') {
                        this.bankAccounts = this.bankAccountsBk.filter(
                            value => (~value.number.toLowerCase().indexOf(searchText))
                        )
                    } else {
                        this.bankAccounts = this.bankAccountsBk
                    }
                })
            },
            // On Change item selection
            onBankAccountGridChanges() {
                let grid = kendo.jQuery("#gridBankAccount").data("kendoGrid")
                let selectedItem = grid.dataItem(grid.select())

                if (this.bankAccount.uuid !== selectedItem.uuid) {
                    this.bankAccount = selectedItem
                    this.searchTransaction()
                }
            },
            // Go To Edit Page
            goEdit() {
                let ba = this.bankAccount
                if (ba.uuid) {
                    this.$router.push({name: 'Bank Account', params: {id: ba.uuid}})
                }
            },
            // Load Reconcile
            loadReconcile() {
                reconcileHandler.getAll()
                    .then(res => {
                        if (res.data) {
                            this.reconcileList = res.data
                            this.showLoading = false
                        }
                    })
            },
        },
        mounted() {
            // Call Bank Account List
            bankAccountHandler.getAll()
                .then(res => {
                    if (res) {
                        this.bankAccounts = res.data
                        this.bankAccountsBk = res.data
                        this.showLoading = false
                    }
                })
        },
    };
</script>
<style scoped>
</style>