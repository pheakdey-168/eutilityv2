<template>
    <v-select class="mt-1"
        :loading="loading"
        placeholder="Select Term"
        v-model="paymentTerm"
        :items="paymentTerms"
        item-text="name"
        item-value="id"
        @change="emitPaymentTerm();onChanged()"
        return-object
        outlined/>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'PaymentTermPurchase',
    props: {
        initPaymentTerm: {
            type: Object,
        },
    },
    data() {
        return {
            paymentTerm: null,
            type: '',
            loading: false
        }
    },
    methods: {
        async initialize () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('paymentTerms/getList');

            this.loading = false;
        },
        initialData(){
            this.paymentTerm = this.initPaymentTerm;
        },
        emitPaymentTerm() {
            this.$emit('emitPaymentTerm', this.paymentTerm);
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initPaymentTerm : "initialData"
    },
    computed: mapState({
        paymentTerms: state => state.paymentTerms.list.filter((i) => i.type.toLowerCase() === "pmt-supplier")
    }),
	created() {
        this.initialize();
    },
    mounted() {
        /* Initial Payment Term */
        this.initialData();
    }
}
</script>