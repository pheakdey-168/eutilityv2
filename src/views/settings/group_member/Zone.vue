<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('commune') }}</h2>
            <v-dialog v-model="dialogm2" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>{{ $t('add_zone') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                        <v-divider/>
                        <v-card-text style="height: 320px; background-color: #EDF1F5; color: #333333;">
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="block.name"
                                        outlined
                                        placeholder=""
                                    />
                                    <label class="label">{{ $t('block') }}</label>
                                    <v-select
                                        class="mt-1"
                                        :items="mainBlockList"
                                        placeholder="select"
                                        item-text="name"
                                        :disabled="edit"
                                        v-model="block.mainBlock"
                                        @change="mainBlockChange"
                                        return-object
                                        outlined/>
                                    <label class="label">{{ $t('sub_block') }}</label>
                                    <v-select
                                        class="mt-1"
                                        :items="subBlockList"
                                        placeholder="select"
                                        item-text="name"
                                        :disabled="edit"
                                        v-model="block.subBlock"
                                        return-object
                                        outlined/>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions class="pa-4">
                            <v-row>
                                <v-col sm="6" cols="6" class="py-0">
                                    <v-btn color="black"
                                           outlined
                                           class=" text-capitalize  black--text float-left"
                                           @click="dialogm2 = false">{{ $t('cancel') }}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0">
                                    <v-btn color="secondary"
                                           class="px-3  white--text text-capitalize float-right"
                                           @click="saveClose">
                                        {{ $t('save_close') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>

                    </v-card>
                </v-form>
            </v-dialog>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">{{ $t('block') }}</th>
                            <th class="text-uppercase">{{ $t('sub_block') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="d in blocks" v-bind:key="d.id">
                            <td>{{ d.name }}</td>
                            <td>{{ d.hasOwnProperty('mainBlock') ? d.mainBlock.name !== '' ? d.mainBlock.name : '' : '' }}</td>
                            <td>{{ d.hasOwnProperty('subBlock') ? d.subBlock.name !== '' ? d.subBlock.name : '' : '' }}</td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(d)">
                                    <v-icon class="white--text" size="12">fa fa-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{ $t('edit') }}</span>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import BlockModel from "@/scripts/model/group_member/Zone"
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
        block: new BlockModel({}),
        blocks: [],
        mainBlockList: [],
        subBlockList: [],
        oldSubBlock: [],
        edit: false,
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
        async loadBlock() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.zoneGet().then(res => {
                        this.blocks = res.data.data
                    })
                }, 300);
            })
        },
        async loadMainBlock() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.mainBlockGet().then(res => {
                        this.mainBlockList = res.data.data
                    })
                }, 300);
            })
        },
        mainBlockChange() {
            this.block.subBlock = {}
            if(this.block.mainBlock) {
                let old = this.oldSubBlock.filter((obj) => {
                    return obj.mainBlock.id === this.block.mainBlock.id
                })
                this.subBlockList = old
            }
        },
        async loadSubBlock() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.subBlockGet().then(res => {
                        this.subBlockList = res.data.data
                        this.oldSubBlock = res.data.data
                    })
                }, 300);
            })
        },
        async onEditClick(value) {
            this.edit = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.block = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.edit = false
            this.block = new BlockModel({})
            this.block.id = ''
            this.clear()
        },
        saveClose() {
            this.saveOption = "saveClose"
            this.save()
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    if(this.block.hasOwnProperty('mainBlock')){
                        this.block.mainBlockID = this.block.mainBlock.id
                    }
                    if(this.block.hasOwnProperty('subBlock')){
                        this.block.subBlockID = this.block.subBlock.id
                    }
                    loanHandler.zoneCreate(new BlockModel(this.block)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.loadBlock()
                            this.$refs.form.reset()
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
        await this.loadBlock()
        await this.loadMainBlock()
        await this.loadSubBlock()
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