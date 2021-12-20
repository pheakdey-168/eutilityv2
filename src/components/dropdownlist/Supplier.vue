<template>
	<v-autocomplete
        class="mt-1"
        :loading="loading"
        placeholder="Search Vendor"
        @change="emitSupplier(), onChanged()"
        v-model="supplier"
        :items="suppliers"
        item-text="name"
        item-value="id"
        hide-no-data
        hide-selected
        return-object
        outlined
    ></v-autocomplete>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'SupplierDropDownList',
	props: {
		initSupplier: {
			type: Object,
		},
	},
	data() {
		return {
			supplier: null,
			loading: false
		}
	},
	methods: {
		async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('suppliers/getList');

            this.loading = false;
        },
		emitSupplier() {
			this.$emit('emitSupplier', this.supplier);
		},
		onChanged() {
			this.$emit('onChanged')
		},
	},
	watch: {
		initSupplier() {
			this.supplier = this.initSupplier;
		}
	},
	computed: mapState({
        suppliers: state => state.suppliers.list
    }),
	created() {
        this.loadData();
    },
	mounted() {
		/* Initial Supplier Id */
		this.supplier = this.initSupplier;
	}
}
</script>