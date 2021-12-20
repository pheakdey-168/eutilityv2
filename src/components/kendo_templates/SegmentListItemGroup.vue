<template>
  <v-container fluid>
    <v-select
      v-model="selectedSegments"
      :items="segments"
      item-text="name"
      item-value="id"
      @change="emitSegment"
      multiple
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
  </v-container>
</template>

<script>
    import { SegmentModel } from "@/scripts/model/AppModels";
    const { segmentHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'SegmentListItemGroup',
        props: {
            initSegment: {
                type: Array,
            },
        },
        data () {
            return {
                segments  : [],
                selectedSegments: [],
            }
        },
        methods: {
            emitSegment () {
                this.$emit('emitSegment', this.selectedSegments);
            },
            toggle () {
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
            initSegment () {
                this.selectedSegments = this.initSegment;
            }
        },
        computed: {
            likesAllFruit () {
                return this.selectedSegments.length === this.segments.length
            },
            likesSomeFruit () {
                return this.selectedSegments.length > 0 && !this.likesAllFruit
            },
            icon () {
                if (this.likesAllFruit) return 'mdi-close-box'
                if (this.likesSomeFruit) return 'mdi-minus-box'
                return 'mdi-checkbox-blank-outline'
            },
        },
        created () {
            // Call Segment List
			segmentHandler.getAll()
			.then(res => {
				if(res){
                    let segmentList = [];
                    res.forEach(value => {
                        let seg = new SegmentModel(value);
                        segmentList.push(seg);
                    });
					this.segments = segmentList;
				}
			})
        },
        mounted () {
            /* Initial Segment */
            this.selectedSegments = this.initSegment;
        }
    }
</script>