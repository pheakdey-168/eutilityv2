<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('loan_purpose') }}</h2>
            <v-dialog v-model="dialogm2" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                    <v-card-title>{{ $t('add_purpose') }}</v-card-title>
                    <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    <v-divider/>
                    <v-card-text style="height: 290px; background-color: #EDF1F5; color: #333333;">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <label class="label">{{ $t('name') }}</label>
                                <v-text-field
                                    class="mt-1"
                                    v-model="loanPurpose.name"
                                    outlined
                                    placeholder=""
                                />
                                <v-row>
                                    <v-col sm="12" cols="12" class="py-0">
                                        <v-textarea
                                            v-model="loanPurpose.description"
                                            :label="$t('description')"
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
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
            <!-- <p class="mb-0">{{ $t('loan_purpose_description') }} </p> -->
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">{{ $t('description') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="loanp in loanPurposes" v-bind:key="loanp.id">
                            <td>{{ loanp.name }}</td>
                            <td class="">{{ loanp.description }}</td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(loanp)">
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
// const axios = require('axios')
// const apiUrl = require('../../../apiUrl.js')
import {i18n} from '@/i18n'
import LoanPurpose from "@/scripts/model/LoanPurpose"
const loanHandler = require("@/scripts/loanHandler")

export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading: false,
        dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        color: '#3DA72E',
        timeout: 6000,
        x: 'right',
        y: 'top',
        accountTypes: [],
        accountType: {
            name: '',
            nature: '',
            statement_group: '',
            number: 0,
        },
        paymentOptions: [],
        paymentMethod: {
            id: '',
            code: '',
            name: '',
            account: [],
            type: 'pmd',
            digital: 0
        },
        headers: [
            {
                text: i18n.t('name'),
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {text: i18n.t('description'), value: 'description', sortable: false,},
            {text: i18n.t('account_type'), value: 'account_type', sortable: false, align: ' d-none'},
            {text: i18n.t('account_type'), value: 'account_type.name', sortable: false,},
            {text: i18n.t('action'), value: 'actions', sortable: false},
        ],
        option: 1,
        //
        valid: true,
        saveOption: '',
        loanPurpose: new LoanPurpose({}),
        loanPurposes: [],
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
        async loadLoanPurpose() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.purposeGet().then(res => {
                        this.loanPurposes = res.data.data
                    })
                }, 300);
            })
        },
        async onEditClick(value) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.loanPurpose = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.loanPurpose = new LoanPurpose({})
            this.loanPurpose.id = ''
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
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    let data = {
                        "id": this.loanPurpose.id ? this.loanPurpose.id : '',
                        "name": this.loanPurpose.name,
                        "description": this.loanPurpose.description,
                        "saveOption": this.saveOption,
                        "usedDateAt": '',
                        "deletedAt": '',
                        "deleted": 0,
                        "createdAt": new Date().toISOString().substr(0, 10)
                    }
                    loanHandler.purposeCreate(data).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.loadLoanPurpose()
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
        await this.loadLoanPurpose()
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