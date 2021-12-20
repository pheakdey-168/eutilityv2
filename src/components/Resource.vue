<template>
    <div class="box">
        <div v-if="show" class="box_resource">
            <div>
                <div class="headerbox">
                    <v-row class="px-3">
                        <v-col cols="9"  class="pb-0">
                            <v-text-field @keyup="submitSearch" v-model="key" outlined placeholder="Search"/>
                        </v-col>
                        <v-col cols="3" class="pb-0">
                            <v-icon class="float-right mt-1" @click="Close" size="32">close</v-icon>
                        </v-col>
                    </v-row>
                </div>
                <div class="scroll" v-if="resources == ''">
                    <v-row class=" pa-3">
                        <v-col sm="12" class="py-1" cols="12" v-for="sr in searchResult" :key="sr.id">
                            <v-card @click="Detial(sr)" elevation="0" color="white" class="pa-3">
                                <v-row>
                                    <v-col sm="2" cols="12" class="py-0 pr-0">
                                        <img class="res_img" :src="sr.image"/>
                                    </v-col>
                                    <v-col sm="10" cols="12" class="py-0">
                                        <h3>{{sr.title}}</h3>
                                        <p class="mb-0 line_14">{{sr.feature}}</p>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
                <div v-else  class="pa-3 scroll">
                    <h3>{{resources.title}}</h3>
                    <div v-html="resources.content">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import {  data } from '@/observable/store'
import { Search } from '@/scripts/resources/resourceHandle'
export default ({
    name: "RoureceDetial",
    data: ()=> ({
        // show: data.show
        key: '',
        search: '',
        searchResult:  []
    }),
    computed:{
        show(){
            return data.show
        },
        resources(){
            return data.resources
        }
    },
    methods: {
        Close(){
            data.show = false
        },
        Detial(item){
            data.resources = item
        },
        submitSearch(){
            let vm = this
            data.resources = ''
            Search(this.key).then((res) => {
                window.console.log("data result",res)
                if(res.status=="SUCCESS"){
                    vm.searchResult = res.data.Items
                }
            })
        }
    },
    watch: {
    
    }
})
</script>
<style scoped>
    .headerbox{
        background: #fff;
        height: 65px;
        top: 0px;
        left: 0px;
        right: 0px;
    }
    .box_resource{
        border: 1px solid gray;
        position: fixed;
        height: 550px;
        width: 350px;
        box-shadow: 17px -2px 114px -60px rgb(0 0 0 / 75%);
        background: #F8F8F9;
        bottom: 0px;
        right: 0px;
    }
    .scroll{
        height: 100vh;
        overflow-y: scroll;
    }
    .res_img{
        margin: auto;
        display: block;
        height: 50px;
    }
</style>
