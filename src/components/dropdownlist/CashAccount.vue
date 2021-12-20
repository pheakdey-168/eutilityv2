<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Cash Account"
        v-model="account"
        :items="accounts"
        item-text="name"
        item-value="uuid"
        @change="emitAccount(), onChanged()"
        return-object
        outlined>
        <!-- <template slot="selection" slot-scope="{ item }">
            {{ item.number }} - {{ item.name }}
        </template> -->
        <template slot="item" slot-scope="{ item }">
            {{ item.number }} - {{ item.name }}
        </template>
    </v-select>
</template>

<script>
import { mapState } from 'vuex';

const AccountTypeCode = require("@/scripts/default_setup/AccountTypeCode");

export default {
    name: 'CashAccountDropDownList',
    props: {
        initAccount: {
            type: Object,
        },
    },
    data() {
        return {
            account: null,
            loading: false
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('accounting/getAccounts');

            this.loading = false;
        },
        emitAccount() {
            this.$emit('emitAccount', this.account);
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initAccount() {
            this.account = this.initAccount;
        }
    },
    computed: mapState({
        accounts: state => state.accounting.accounts.filter(i => ~AccountTypeCode.CASH_ACCOUNTS.indexOf(i.account_type.code))
    }),
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial Obj */
        this.account = this.initAccount;
    }
}
</script>