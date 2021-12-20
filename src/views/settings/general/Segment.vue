<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('segment') }}</h2>
            <div class="function_footer">
                <template>
                    <v-select class="mt-1"
                        v-model="s.segment"
                        :items="segments"
                        item-value="id"
                        :item-text="item =>`${item.code} - ${item.name}`"
                        return-object
                        outlined=""/>
                    <v-btn color="primary" class="float-right white--text text-capitalize"
                        @click="save">
                        {{ $t('save') }}
                    </v-btn>
                </template>
            </div>
        </v-col>
        
    </v-row>
</template>

<script>
import SegmentModel from "@/scripts/model/credit/Segment"
const settingsHandler = require("@/scripts/settingsHandler")
const loanHandler = require("@/scripts/loanHandler")

export default {
    components: {},
    data: () => ({
        dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        errors: [],
        //
        valid: true,
        saveOption: '',
        s: new SegmentModel({}),
        decimals: [],
        currencyList: [],
        edit: false,
        segment: {},
        segments: []
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    created() {
    },
    methods: {
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    settingsHandler.getSeg().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.segments = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadSingleSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    loanHandler.segmentGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            window.console.log(res)
                            if(res.data.data.length > 0) {
                                this.s = res.data.data[0]
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async save() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    loanHandler.segmentCreate(new SegmentModel(this.s)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        window.console.log(e)
                    })
                }, 300);
            })
        },
        close() {
            this.dialogm2 = false
        },
        clear() {
        },
    },
    mounted: async function () {
        await this.loadSingleSegment()
        await this.loadSegment()
    }
};
</script>
<style scoped>
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>