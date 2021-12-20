<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Account"
        v-model="account"
        :items="accounts"
        item-text="name"
        item-value="uuid"
        @change="emitAccount"
        return-object
        clearable
        outlined>
        <template slot="selection" slot-scope="{ item }">
            {{ item.number }} - {{ item.name }}
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.number }} - {{ item.name }}
        </template>
    </v-select>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AccountDropDownList',
    props: {
        initAccount: {
            type: Object,
        },
    },
    data() {
        return {
            account : null,
            loading : false,
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
    },
    watch: {
        initAccount() {
            this.account = this.initAccount;
        },
    },
    computed: mapState({
        accounts: state => state.accounting.accounts
    }),
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial obj */
        this.account = this.initAccount;
    }
}
</script>