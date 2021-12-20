<template>
    <v-select class="mt-1"
        placeholder="Select Term"
        v-model="paymentTerm"
        :items="paymentTerms"
        item-text="name"
        item-value="id"
        @change="emitPaymentTerm"
        return-object
        outlined />
</template>

<script>
    import { PaymentTermModel } from "@/scripts/model/AppModels";
    const { paymentTermHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'PaymentTermDropDownList',
        props: {
            initPaymentTerm: {
                type: PaymentTermModel,
            },
        },
        data () {
            return {
                paymentTerm    : new PaymentTermModel(),
                paymentTerms   : [],
            }
        },
        methods: {
            emitPaymentTerm () {
                this.$emit('emitPaymentTerm', this.paymentTerm);
            },
        },
        watch: {
            initPaymentTerm () {
                this.paymentTerm = this.initPaymentTerm;
            }
        },
        created(){
            // Call Payment Term List
			paymentTermHandler.getAll()
			.then(res => {
				if(res){
					let pmtList = [];
                    res.forEach(value => {
                        let pmt = new PaymentTermModel(value);
                        pmtList.push(pmt);
                    });
					this.paymentTerms = pmtList;
				}
			})
        },
        mounted () {
            /* Initial Payment Term */
            this.paymentTerm = this.initPaymentTerm;
        }
    }
</script>