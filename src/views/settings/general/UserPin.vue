<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="py-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">

                <h2 class="mb-0">{{ $t('user_pin') }}</h2>
                <v-dialog v-model="dialogm2" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                            {{ $t('create_new') }}
                        </v-btn>
                    </template>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card>
                            <v-card-title>{{ $t('add_pin') }}</v-card-title>
                            <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                            <v-divider/>
                            <v-card-text style="background-color: #EDF1F5; color: #333333;">
                                <v-row>
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <label class="label">{{ $t('name') }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            v-model="p.name"
                                            @change="checkPinName"
                                            outlined
                                            placeholder=""
                                            :rules="[v => !!v || 'name is required']"
                                        />
                                        <label class="label">{{ $t('pin') }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            v-model="p.pinCode"
                                            outlined
                                            placeholder=""
                                            @change="checkPin"
                                            :rules="[v => !!v || 'PIN is required']"
                                            :attributes="{style: 'text-align: center; '}"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show1 ? 'number' : 'password'"
                                            @click:append="show1 = !show1"
                                        />
                                        <label class="label">{{ $t('group') }}</label>
                                        <v-select
                                            class="mt-1"
                                            :placeholder="$t('select_group')"
                                            outlined
                                            v-model="p.groupMember"
                                            :items="groupMemberList"
                                            chips
                                            multiple
                                            item-value="value.id"
                                            item-text="name"
                                            return-object
                                            required
                                        />
                                        <label class="label">{{ $t('function') }}</label>
                                        <v-combobox
                                            v-model="p.menu"
                                            :items="menuList"
                                            item-value="value.id"
                                            item-text="name"
                                            :label="$t('select_function')"
                                            chips
                                            multiple
                                            >
                                        </v-combobox>
                                        <!-- <v-select
                                            id="select_function"
                                            class="mt-1 "
                                            :placeholder="$t('select_function')"
                                            outlined
                                            v-model="p.menu"
                                            :items="menuList"
                                            chips
                                            multiple
                                            item-value="value.id"
                                            item-text="name"
                                            return-object
                                            required
                                        /> -->
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider/>
                            <v-col sm="12" cols="12" class="py-0">
                                <v-card-actions class="pa-4">
                                    <v-row>
                                        <v-col sm="6" cols="6" class="py-0 pl-0">
                                            <v-btn color="black"
                                                outlined
                                                class=" text-capitalize  black--text float-left"
                                                @click="dialogm2 = false">{{ $t('cancel') }}
                                            </v-btn>
                                        </v-col>
                                        <v-col sm="6" cols="6" class="py-0 pr-0">
                                            <v-btn color="secondary"
                                                class="px-3  white--text text-capitalize float-right"
                                                @click="saveClose">
                                                {{ $t('save_close') }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-col>
                        </v-card>
                    </v-form>
                </v-dialog>
            </v-card>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="d in ps" v-bind:key="d.id">
                            <td>{{ d.name }}</td>
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
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            :myLoading="true"/>
    </v-row>
</template>

<script>
import { i18n } from '@/i18n';
import UserPinModel from "@/scripts/model/UserPin"
const loanHandler = require("@/scripts/loanHandler")
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        errors: [],
        groupMemberList: [],
        showLoading: false,
        show1: false,
        //
        valid: true,
        saveOption: '',
        p: new UserPinModel({}),
        ps: [],
        oldps: [],
        edit: false,
        checkPinData: [],
        checkPinNameData: [],
    }),
    props: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    methods: {
        async loadUserPin() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.checkPinData = []
                    this.checkPinNameData = []
                    loanHandler.userPinGet().then(res => {
                        this.ps = res.data.data
                        this.oldps = res.data.data
                        let self = this
                        $.each(this.ps, function(i,v){
                            self.checkPinData.push({
                                pinCode: v.pinCode
                            })
                            self.checkPinNameData.push({
                                name: v.name
                            })
                        })
                    })
                }, 300);
            })
        },
        async loadMemberGroup() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.groupMemberGet().then(res => {
                        this.groupMemberList = res.data.data
                    })
                }, 300);
            })
        },
        async onEditClick(value) {
            this.edit = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.p = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.edit = false
            this.p = new UserPinModel({})
            this.p.id = ''
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
            if(this.edit === false) {
                let dub = this.oldps.filter((obj) => {
                    return obj.name === this.p.name
                })
                if (dub.length > 0) {
                    this.$snotify.error('Dublicate Name')
                    return
                }
            }
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.userPinCreate(new UserPinModel(this.p)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.loadUserPin()
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
        checkPin(){
            window.console.log(this.p.pinCode, this.oldps, this.ps)
            let ex = this.checkPinData.filter((obj) => {
                return obj.pinCode == this.p.pinCode
            })
            if(ex.length > 0){
                this.p.pinCode = ''
                this.$snotify.error('Pin code is exist!')
            }
        },
        checkPinName(){
            let ex = this.checkPinNameData.filter((obj) => {
                return obj.name == this.p.name
            })
            if(ex.length > 0){
                this.p.name = ''
                this.$snotify.error('Pin code is exist!')
            }
        }
    },
    mounted: async function () {
        await this.loadUserPin()
    },
    created: async function () {
        await this.loadMemberGroup()
    },
    computed: {
        menuList(){
            return [
                {id: 1, name: i18n.t('statistics_reports')},
                {id: 2, name: i18n.t('accounting_budgeting')},
                {id: 3, name: i18n.t('saving_credit_business')},
                {id: 4, name: i18n.t('supply_business')},
                {id: 5, name: i18n.t('marketing_business')},
                {id: 6, name: i18n.t('service_business')},
                {id: 7, name: i18n.t('member_share')}
            ]
        },

    },
};
</script>
<style scoped>
.v-application--is-ltr .v-messages {
    text-align: center !important;;
}
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>