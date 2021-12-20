<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Cash Account Type"
        v-model="accountType"
        :items="accountTypes"
        item-text="name"
        item-value="uuid"
        @change="emitAccountType();onChanged();"
        return-object
        outlined/>
</template>

<script>
import { mapState } from 'vuex';

const { AccountTypeCode } = require("@/scripts/default_setup/Collections");

export default {
    name: 'CashAccountTypeDropDownList',
    props: {
        initAccountType: {
            type: Object,
        },
    },
    data() {
        return {
            accountType : null,
            loading : false
        }
    },
    methods: {
        async loadData () {
            this.loading = true;

            // Call List
            await this.$store.dispatch('accounting/getTypes');

            this.loading = false;
        },
        emitAccountType() {
            this.$emit('emitAccountType', this.accountType);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initAccountType() {
            this.accountType = this.initAccountType;
        }
    },
    computed: mapState({
        accountTypes: state => state.accounting.accountTypes.filter(i => ~AccountTypeCode.CASH_ACCOUNTS.indexOf(i.code))
    }),
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial Account Type */
        this.accountType = this.initAccountType;
    }
}
</script>