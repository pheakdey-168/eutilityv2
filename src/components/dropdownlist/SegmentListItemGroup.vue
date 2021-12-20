<template>
    <div>
        <v-select
            :loading="loading"
            v-model="selectedSegments"
            :items="segments"
            item-text="name"
            item-value="id"
            @change="emitSegment"
            multiple
            class="mt-1"
            style="height: 50px !important;"
            outlined
        >
            <template v-slot:prepend-item>
                <v-list-item
                    ripple
                    @click="toggle"
                >
                    <v-list-item-action>
                        <v-icon :color="selectedSegments.length > 0 ? 'indigo darken-4' : ''">
                            {{ icon }}
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Select All
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
            </template>

        </v-select>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SegmentListItemGroup',
    props: {
        initSegment: {
            type: Array,
        },
    },
    data() {
        return {
            selectedSegments: [],
            loading: false
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
            this.$emit('emitSegment', this.selectedSegments);
        },
        toggle() {
            this.$nextTick(() => {
                if (this.likesAllFruit) {
                    this.selectedSegments = [];
                } else {
                    let ids = [];
                    this.segments.forEach(value => {
                        ids.push(value.id);
                    });
                    this.selectedSegments = ids;
                }
                this.emitSegment();
            })
        },
    },
    watch: {
        initSegment() {
            this.selectedSegments = this.initSegment;
        }
    },
    computed: {
        ...mapState({
            segments: state => state.segments.list
        }),
        likesAllFruit() {
            return this.selectedSegments.length === this.segments.length
        },
        likesSomeFruit() {
            return this.selectedSegments.length > 0 && !this.likesAllFruit
        },
        icon() {
            if (this.likesAllFruit) return 'mdi-close-box'
            if (this.likesSomeFruit) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        },
    },
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial Segment */
        this.selectedSegments = this.initSegment;
    }
}
</script>