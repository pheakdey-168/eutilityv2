<template>
    <v-select class="mt-1"
        placeholder="Select Segment"
        v-model="segmentId"
        :items="segments"
        item-text="name"
        item-value="id"
        @change="emitSegmentId"
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
    const { segmentHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'SegmentDropDownList',
        props: ['initSegmentId'],
        data () {
            return {
                segmentId   : '',
                segments    : [],
            }
        },
        methods: {
            emitSegmentId () {
                this.$emit('emitSegmentId', this.segmentId);
            },
        },
        watch: {
            initSegmentId () {
                this.segmentId = this.initSegmentId;
            }
        },
        mounted () {
            /* Initial Segment Id */
            this.segmentId = this.initSegmentId;

            // Call Segment List
			segmentHandler.getAll()
			.then(res => {
				if(res){
					this.segments = res;
				}
			})
        }
    }
</script>