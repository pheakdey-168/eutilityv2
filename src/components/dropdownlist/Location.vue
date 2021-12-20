<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Location"
        v-model="location"
        :items="locations"
        item-text="name"
        item-value="id"
        @change="emitLocation();onChanged();"
        return-object
        outlined />
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'LocationDropDownList',
    props: {
        initLocation: {
            type: Object,
        },
    },
    data() {
        return {
            location : null,
            loading : false,
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('locations/getList')

            this.loading = false;
        },
        emitLocation() {
            this.$emit('emitLocation', this.location);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initLocation() {
            this.location = this.initLocation;
        }
    },
    computed: mapState({
        locations: state => state.locations.list
    }),
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial obj */
        this.location = this.initLocation;
    }
}
</script>