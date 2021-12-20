<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Account Type"
        v-model="accountType"
        :items="accountTypes"
        item-text="name"
        item-value="code"
        @change="emitAccountType();onChanged();"
        return-object
        outlined>
         <template slot='selection' slot-scope='{ item }'>
            {{ item.code }} - {{ item.name }}
        </template>
        <template slot='item' slot-scope='{ item }'>
            {{ item.code }} - {{ item.name }}
        </template>
         </v-select>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AccountTypeDropDownList',
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
        accountTypes: state => state.accounting.accountTypes
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