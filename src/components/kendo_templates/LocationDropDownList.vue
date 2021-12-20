<template>
    <v-select class="mt-1"
        placeholder="Select Location"
        v-model="locationId"
        :items="locations"
        item-text="name"
        item-value="id"
        @change="emitLocationId"
        outlined>
        <template slot="selection" slot-scope="{ item }">
            {{ item.code }} - {{ item.name }}
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.code }} - {{ item.name }}
        </template>
    </v-select>
</template>

<script>
    const { locationHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'LocationDropDownList',
        props: ['initLocationId'],
        data () {
            return {
                locationId   : '',
                locations    : [],
            }
        },
        methods: {
            emitLocationId () {
                this.$emit('emitLocationId', this.locationId);
            },
        },
        watch: {
            initLocationId () {
                this.locationId = this.initLocationId;
            }
        },
        mounted () {
            /* Initial Location Id */
            this.locationId = this.initLocationId;

            // Call Location List
			locationHandler.getAll()
			.then(res => {
				this.locations = res;
			})
        }
    }
</script>