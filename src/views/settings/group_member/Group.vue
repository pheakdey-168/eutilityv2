<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('group') }}</h2>
            <v-dialog v-model="dialogm2" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>{{ $t('add_group') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                        <v-divider/>
                        <v-card-text style="height: 520px; background-color: #EDF1F5; color: #333333;">
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="block.name"
                                        outlined
                                        :rules="[v => !!v || 'Name is required']"
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
                                        @change="subBlockChange"
                                        return-object
                                        outlined/>
                                    <label class="label">{{ $t('zone') }}</label>
                                    <v-select
                                        class="mt-1"
                                        :items="zoneList"
                                        placeholder="select"
                                        item-text="name"
                                        :disabled="edit"
                                        v-model="block.zone"
                                        return-object
                                        outlined/>
                                    <label class="label">{{ $t('banking_day') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="block.bankingDay"
                                        outlined
                                        aria-valuemax="31"
                                        aria-valuemin="1"
                                        placeholder=""
                                    />
                                    <label style="float: left;">{{ $t('allow_saving_account') }}</label>
                                    <p style="float: right">
                                        <v-switch
                                            v-model="block.allowSaving"
                                            color="primary"
                                            :label="block.allowSaving ? 'YES' : 'NO'"
                                        />
                                    </p>
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
                            <th class="text-uppercase">{{ $t('zone') }}</th>
                            <th class="text-uppercase">{{ $t('banking_day') }}</th>
                            <th class="text-uppercase">{{ $t('allow_saving_account') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="d in blocks" v-bind:key="d.id">
                            <td>{{ d.name }}</td>
                            <td>{{ d.hasOwnProperty('mainBlock') ? d.mainBlock.name !== '' ? d.mainBlock.name : '' : '' }}</td>
                            <td>{{ d.hasOwnProperty('subBlock') ? d.subBlock.name !== '' ? d.subBlock.name : '' : '' }}</td>
                            <td>{{ d.hasOwnProperty('zone') ? d.zone.name !== '' ? d.zone.name : '' : '' }}</td>
                            <td>{{ d.hasOwnProperty('bankingDay') ? d.bankingDay : '' }}</td>
                            <td>{{ d.hasOwnProperty('allowSaving') ? d.allowSaving === true ? 'YES' : 'NO' : 'NO' }}</td>
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
import BlockModel from "@/scripts/model/group_member/GroupMember"
const loanHandler = require("@/scripts/loanHandler")
const instituteHandler = require("@/scripts/instituteHandler")
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies
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
        zoneList: [],
        oldZone: [],
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
                    loanHandler.groupMemberGet().then(res => {
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
        subBlockChange() {
            this.block.zone = {}
            if(this.block.subBlock) {
                let old = this.oldZone.filter((obj) => {
                    return obj.subBlock.id === this.block.subBlock.id
                })
                this.zoneList = old
            }
        },
        async loadZone() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.zoneGet().then(res => {
                        this.zoneList = res.data.data
                        this.oldZone = res.data.data
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
        async onNewClick() {
            await this.loadMainBlock()
            await this.loadSubBlock()
            await this.loadZone()
            this.edit = false
            this.block = new BlockModel({})
            this.block.id = ''
            await this.loadInstitute()
            this.clear()
        },
        loadInstitute(){
            instituteHandler.getOneCompany(instituteId).then(res => {
                if(Object.keys(res.province).length > 0){
                    this.block.mainBlock = res.provice
                }
                if(Object.keys(res.district).length > 0){
                    this.block.subBlock = res.district
                }
                if(Object.keys(res.commune).length > 0){
                    this.block.zone = res.commune
                }
            })
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
                    if(this.block.hasOwnProperty('zone')){
                        this.block.zoneID = this.block.zone.id
                    }
                    loanHandler.groupMemberCreate(new BlockModel(this.block)).then(response => {
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