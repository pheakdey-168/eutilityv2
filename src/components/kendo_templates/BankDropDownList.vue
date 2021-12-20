<template>
    <v-select class="mt-1"
        placeholder="Select Bank"
        v-model="bank"
        :items="banks"
        item-text="name"
        item-value="uuid"
        @change="emitBank"
        return-object
        outlined />
</template>

<script>
    import { BankModel } from "@/scripts/model/AppModels";
    const { bankHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'BankDropDownList',
        props: {
            initBank: {
                type: Object,
            },
        },
        data () {
            return {
                bank   : new BankModel(),
                banks  : [],
            }
        },
        methods: {
            emitBank () {
                this.$emit('emitBank', this.bank);
            },
        },
        watch: {
            initBank () {
                this.bank = this.initBank;
            }
        },
        mounted () {
            /* Initial Bank Id */
            this.bank = this.initBank;

            // Call Bank List
			bankHandler.getAll()
			.then(res => {
				if(res){
					this.banks = res;
				}
			})
        }
    }
</script>