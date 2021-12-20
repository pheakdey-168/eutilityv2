<template>
    <v-select class="mt-1"
        placeholder="Select Cash Account"
        v-model="account"
        :items="accounts"
        item-text="name"
        item-value="uuid"
        @change="emitAccount"
        return-object
        outlined>
        <template slot="selection" slot-scope="{ item }">
            {{ item.number }} - {{ item.name }}
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.number }} - {{ item.name }}
        </template>
    </v-select>
</template>

<script>
    import { AccountModel } from "@/scripts/model/AppModels";
    const { accountHandler } = require("@/scripts/AppHandlers");
    const { AccountTypeCode } = require("@/scripts/default_setup/Collections");
    
    export default {
        name: 'CashAccountDropDownList',
        props: {
            initAccount: {
                type: Object,
            },
        },
        data () {
            return {
                account    : new AccountModel(),
                accounts   : [],
            }
        },
        methods: {
            emitAccount () {
                this.$emit('emitAccount', this.account);
            },
        },
        watch: {
            initAccount () {
                this.account = this.initAccount;
            }
        },
        mounted () {
            /* Initial Obj */
            this.account = this.initAccount;

            // Call Obj List
			accountHandler.getAll()
			.then(res => {
				if(res){
                    let objList = [];
                    res.forEach(value => {
                        if(~AccountTypeCode.CASH_ACCOUNTS.indexOf(value.account_type.code)) { // Filter only Cash Account
                            let obj = new AccountModel(value);
                            objList.push(obj);
                        }
                    });
					this.accounts = objList;
				}
			})
        }
    }
</script>