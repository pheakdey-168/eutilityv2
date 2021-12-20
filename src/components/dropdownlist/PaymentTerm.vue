<template>
    <v-select class="mt-1"
        :loading="loading"
        placeholder="Select Term"
        v-model="paymentTerm"
        :items="paymentTerms"
        item-text="name"
        item-value="id"
        @change="emitPaymentTerm();emitType();onChanged()"
        return-object
        outlined/>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'PaymentTermDropDownList',
    props: {
        initPaymentTerm: {
            type: Object,
        },
        initType: {
            type: String,
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
        async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('paymentTerms/getList');

            this.loading = false;
        },
        emitPaymentTerm() {
            this.$emit('emitPaymentTerm', this.paymentTerm);
        },
        emitType() {
            this.$emit('emitType', this.type);
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initPaymentTerm() {
            this.paymentTerm = this.initPaymentTerm;
        },
        initType() {
            this.type = this.initType;
        }
    },
    computed: mapState({
        paymentTerms: state => state.paymentTerms.list
    }),
	created() {
        this.loadData();
    },
    mounted() {
        /* Initial Payment Term */
        this.paymentTerm = this.initPaymentTerm;
        this.type = this.initType;
    }
}
</script>