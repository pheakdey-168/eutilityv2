<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Donor"
        v-model="donor"
        :items="donors"
        item-text="name"
        item-value="id"
        @change="emitDonor();onChanged();"
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
import { mapState } from 'vuex'

export default {
    name: 'DonorDropDownList',
    props: {
        initDonor: {
            type: Object,
        },
    },
    data() {
        return {
            donor : null,
            loading : false,
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('customers/getList')

            this.loading = false;
        },
        emitDonor() {
            this.$emit('emitDonor', this.donor);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initDonor() {
            this.donor = this.initDonor;
        }
    },
    computed: mapState({
        donors: state => state.customers.list.filter(i=>i.isDonor === true)
    }),
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial obj */
        this.donor = this.initDonor;
    }
}
</script>