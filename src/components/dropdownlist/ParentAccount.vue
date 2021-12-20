<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Parent Account"
        v-model="parentAccount"
        :items="parentAccounts"
        item-text="name"
        item-value="uuid"
        @change="emitParentAccount();onChanged()"
        return-object
        clearable
        outlined>
        <template slot='selection' slot-scope='{ item }'>
            {{ item.number }} - {{ item.name }}
        </template>
        <template slot='item' slot-scope='{ item }'>
            {{ item.number }} - {{ item.name }}
        </template>
    </v-select>
</template>

<script>
import store from "@/store";

export default {
    name: 'ParentAccountDropDownList',
    props: {
        initParentAccount: {
            type: Object,
        },
        initAccountTypeCode: {
            type: Number,
        }
    },
    data() {
        return {
            parentAccount: null,
            parentAccounts: [],
            loading: false
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            
            // Call List
            this.parentAccounts = await this.$store.dispatch('accounting/getAccounts');

            this.loading = false;
        },
        emitParentAccount() {
            this.$emit('emitParentAccount', this.parentAccount);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initParentAccount() {
            this.parentAccount = this.initParentAccount;
        },
        initAccountTypeCode() {
            this.parentAccounts = store.state.accounting.accounts.filter(value => value.account_type.code === this.initAccountTypeCode);
        },
    },
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial Obj */
        this.parentAccount = this.initParentAccount;
    }
}
</script>