<template>
    <v-select class="mt-1"
        placeholder="Select Currency"
        :rules="[(v) =>!!v ||'Currency is required']"
        @change="emitCurrency"
        v-model="currency"
        :items="currencies"
        item-text="name"
        item-value="code"
        return-object
        required
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
    import { CurrencyModel } from "@/scripts/model/AppModels";

    const { currencyHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'CurrencyDropDownList',
        props: {
            initCurrency: {
                type: Object,
            },
        },
        data () {
            return {
                currency    : new CurrencyModel(),
                currencies  : [],
            }
        },
        methods: {
            emitCurrency () {
                this.$emit('emitCurrency', this.currency);
            },
        },
        watch: {
            initCurrency () {
                this.currency = this.initCurrency;
            }
        },
        mounted () {
            /* Initial Currency */
            this.currency = this.initCurrency;

            // Call Currency List
			currencyHandler.getAll()
			.then(res => {
                this.currencies = res;
			})
        }
    }
</script>