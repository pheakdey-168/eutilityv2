<template>
    <v-select class="mt-1"
        placeholder="Select Account"
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
    
    export default {
        name: 'AccountDropDownList',
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
					this.accounts = res;
				}
			})
        }
    }
</script>