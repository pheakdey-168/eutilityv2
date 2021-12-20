<template>
    <v-select class="mt-1"
        placeholder="Select Bank Account Type"
        v-model="bankAccountTypeId"
        :items="bankAccountTypes"
        item-text="name"
        item-value="uuid"
        @change="emitBankAccountTypeId"
        outlined />
</template>

<script>
    const { bankAccountHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'BankAccountTypeDropDownList',
        props: ['initBankAccountTypeId'],
        data () {
            return {
                bankAccountTypeId : '',
                bankAccountTypes  : [],
            }
        },
        methods: {
            emitBankAccountTypeId () {
                this.$emit('emitBankAccountTypeId', this.bankAccountTypeId);
            },
        },
        watch: {
            initBankAccountTypeId () {
                this.bankAccountTypeId = this.initBankAccountTypeId;
            }
        },
        mounted () {
            /* Initial Bank Account Type */
            this.bankAccountTypeId = this.initBankAccountTypeId;

            // Call Bank Account Type List
			bankAccountHandler.getAllTypes()
			.then(res => {
				this.bankAccountTypes = res;
			})
        }
    }
</script>