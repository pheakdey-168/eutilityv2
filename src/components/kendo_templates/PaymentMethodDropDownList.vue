<template>
    <v-select class="mt-1"
        placeholder="Select Method"
        v-model="paymentMethod"
        :items="paymentOptions"
        item-text="name"
        item-value="id"
        @change="emitPaymentMethod"
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
    import { PaymentMethodModel } from "@/scripts/model/AppModels";
    const { paymentOptionHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'PaymentMethodDropDownList',
        props: {
            initPaymentMethod: {
                type: PaymentMethodModel,
            },
        },
        data () {
            return {
                paymentMethod    : new PaymentMethodModel(),
                paymentOptions   : [],
            }
        },
        methods: {
            emitPaymentMethod () {
                this.$emit('emitPaymentMethod', this.paymentMethod);
            },
        },
        watch: {
            initPaymentMethod () {
                this.paymentMethod = this.initPaymentMethod;
            }
        },
        mounted () {
            /* Initial Payment Method */
            this.paymentMethod = this.initPaymentMethod;

            // Call Payment Method List
			paymentOptionHandler.getAll()
			.then(res => {
				if(res){
                    let pmdList = [];
                    res.forEach(value => {
                        let pmd = new PaymentMethodModel(value);
                        pmdList.push(pmd);
                    });
					this.paymentOptions = pmdList;
				}
			})
        }
    }
</script>