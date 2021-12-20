<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Currency"
        v-model="currency"
        :items="currencies"
        item-text="name"
        item-value="code"
        @change="emitCurrency();onChanged();"
        return-object
        outlined>
        <template slot="selection" slot-scope="{ item }">
            {{ item.code }} - {{ item.name }}
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.code }} - {{ item.name }}
        </template>
    </v-select>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'CurrencyDropDownList',
    props: {
        initCurrency: {
            type: Object,
        },
    },
    data() {
        return {
            currency : null,
            loading : false,
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('currencies/getList')

            this.loading = false;
        },
        emitCurrency() {
            this.$emit('emitCurrency', this.currency);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initCurrency() {
            this.currency = this.initCurrency;
        }
    },
    computed: mapState({
        currencies: state => state.currencies.list
    }),
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial obj */
        this.currency = this.initCurrency;
    }
}
</script>