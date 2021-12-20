<template>
    <v-select class="mt-1"
        placeholder="Select Supplier"
        v-model="supplier"
        :items="suppliers"
        item-text="name"
        item-value="id"
        @change="emitSupplier"
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
    import { SupplierModel } from "@/scripts/model/AppModels";
    const { supplierHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'SupplierDropDownList',
        props: {
            initSupplier: {
                type: Object,
            },
        },
        data () {
            return {
                supplier   : new SupplierModel(),
                suppliers    : [],
            }
        },
        methods: {
            emitSupplier () {
                this.$emit('emitSupplier', this.supplier);
            },
        },
        watch: {
            initSupplier () {
                this.supplier = this.initSupplier;
            }
        },
        mounted () {
            /* Initial Supplier Id */
            this.supplier = this.initSupplier;

            // Call Supplier List
			supplierHandler.getAll()
			.then(res => {
				if(res){
					this.suppliers = res;
				}
			})
        }
    }
</script>