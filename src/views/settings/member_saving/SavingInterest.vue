<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('interest_rate') }}</h2>
            <v-dialog v-model="dialogm2" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                    <v-card-title>{{ $t('add_interest_rate') }}</v-card-title>
                    <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    <v-divider/>
                    <v-card-text style="height: 290px; background-color: #EDF1F5; color: #333333;">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <label class="label">{{ $t('name') }}</label>
                                <v-text-field
                                    class="mt-1"
                                    v-model="l.name"
                                    :rules="[v => !!v || 'name is required']"
                                    outlined
                                    placeholder=""
                                />
                                <label class="label">អត្រាការប្រាក់/១ ឆ្នាំ</label>
                                <v-text-field
                                    class="mt-1"
                                    v-model="l.interestRate"
                                    :rules="[v => !!v || 'interest is required']"
                                    outlined
                                    placeholder=""
                                />
                                <label class="label">{{ $t('year') }}</label>
                                <v-text-field
                                    class="mt-1"
                                    v-model="l.year"
                                    outlined
                                    placeholder=""
                                />
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
            <!-- <p class="mb-0">{{ $t('saving_interest_description') }} </p> -->
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">អត្រាការប្រាក់/១ ឆ្នាំ</th>
                            <th class="text-uppercase">{{ $t('year') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="loanp in savingInterests" v-bind:key="loanp.id">
                            <td>{{ loanp.name }}</td>
                            <td class="">{{ loanp.interestRate }}</td>
                            <td>{{ loanp.year }}</td>
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
// import {i18n} from '@/i18n'
import SavingInterestModel from "@/scripts/model/credit/SavingInterest"
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
        //
        valid: true,
        saveOption: '',
        l: new SavingInterestModel({}),
        savingInterests: [],
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
        async loadSavingInterest() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.savingInterestGet().then(res => {
                        this.savingInterests = res.data.data
                    })
                }, 300);
            })
        },
        async onEditClick(value) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.l = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.l = new SavingInterestModel({})
            this.l.id = ''
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
                    loanHandler.savingInterestCreate(new SavingInterestModel(this.l)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.loadSavingInterest()
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
        await this.loadSavingInterest()
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