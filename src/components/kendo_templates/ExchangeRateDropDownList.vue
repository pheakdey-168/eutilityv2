<template>
    <v-select class="mt-1"
        placeholder="Select Currency"
        :rules="[(v) =>!!v ||'Currency is required']"
        @change="emitCurrency"
        v-model="currency"
        :items="currencyExchangeRates"
        item-text="code"
        item-value="sk"
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
    import { ExchangeRateModel } from "@/scripts/model/AppModels";

    const { exchangeRateHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'ExchangeRateDropDownList',
        props: {
            initCurrency: {
                type: Object,
            },
        },
        data () {
            return {
                currency    : new ExchangeRateModel(),
                currencyExchangeRates  : [],
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
			exchangeRateHandler.getAll()
			.then(res => {
				if(res){
                    this.currencyExchangeRates = res;
				}
			})
        }
    }
</script>