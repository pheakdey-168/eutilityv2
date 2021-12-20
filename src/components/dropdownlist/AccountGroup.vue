<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Account Group"
        v-model="accountGroup"
        :items="accountGroups"
        item-text="name"
        item-value="uuid"
        @change="emitAccountGroup();onChanged()"
        return-object
        outlined>
         <template slot='selection' slot-scope='{ item }'>
            {{ item.code }} - {{ item.name }}
        </template>
        <template slot='item' slot-scope='{ item }'>
            {{ item.code }} - {{ item.name }}
        </template>
         </v-select>
</template>

<script>
import store from "@/store";

export default {
    name: 'AccountGroupDropDownList',
    props: {
        initAccountGroup: {
            type: Object,
        },
        initAccountTypeCode: {
            type: Number,
        }
    },
    data() {
        return {
            accountGroup : null,
            accountGroups : [],
            loading : false
        }
    },
    methods: {
        async loadData () {
            this.loading = true;

            // Call List
            this.accountGroups = await this.$store.dispatch('accounting/getGroups');

            this.loading = false;
        },
        initialData(){
            this.accountGroup = this.initAccountGroup;
        },
        emitAccountGroup() {
            this.$emit('emitAccountGroup', this.accountGroup);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initAccountGroup() {
            this.initialData();
        },
        initAccountTypeCode() {
            this.accountGroups = store.state.accounting.groups.filter(value => value.account_type.code === this.initAccountTypeCode);
        },
    },
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial Obj */
        this.initialData();
    }
}
</script>