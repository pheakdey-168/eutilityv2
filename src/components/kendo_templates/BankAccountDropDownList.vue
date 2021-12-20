<template>
    <v-select class="mt-1"
        placeholder="Select Bank Account"
        v-model="bankAccount"
        :items="bankAccounts"
        item-text="name"
        item-value="uuid"
        @change="emitBankAccount"
        return-object
        outlined />
</template>

<script>
    import { BankAccountModel } from "@/scripts/model/AppModels";
    const { bankAccountHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'BankAccountDropDownList',
        props: {
            initBankAccount: {
                type: Object,
            },
        },
        data () {
            return {
                bankAccount   : new BankAccountModel(),
                bankAccounts  : [],
            }
        },
        methods: {
            emitBankAccount () {
                this.$emit('emitBankAccount', this.bankAccount);
            },
        },
        watch: {
            initBankAccount () {
                this.bankAccount = this.initBankAccount;
            }
        },
        mounted () {
            /* Initial Bank Account Type */
            this.bankAccount = this.initBankAccount;

            // Call Bank Account Type List
			bankAccountHandler.getAll()
			.then(res => {
				this.bankAccounts = res;
			})
        }
    }
</script>