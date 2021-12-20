<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Segment"
        v-model="segment"
        :items="segments"
        item-text="name"
        item-value="id"
        @change="emitSegment();onChanged();"
        return-object
        outlined />
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SegmentDropDownList',
    props: {
        initSegment: {
            type: Object,
        },
    },
    data() {
        return {
            segment : null,
            loading : false,
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('segments/getList')

            this.loading = false;
        },
        emitSegment() {
            this.$emit('emitSegment', this.segment);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initSegment() {
            this.segment = this.initSegment;
        }
    },
    computed: mapState({
        segments: state => state.segments.list
    }),
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial obj */
        this.segment = this.initSegment;
    }
}
</script>