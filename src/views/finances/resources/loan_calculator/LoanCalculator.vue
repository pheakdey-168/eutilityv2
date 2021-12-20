<template>
    <v-row>
        <v-col sm="12" cols="12" class="py-0">
            <v-tabs class="tabs_2" v-model="active_tabs">
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-uppercase text-left">
            {{ $t("input") }}
          </span>
                </v-tab>
                <v-tab>
          <span class="hidden-sm-and-up">
            <v-icon left>mdi-pen</v-icon>
          </span>
                    <span class="hidden-sm-and-down text-uppercase">
            {{ $t("result") }}
          </span>
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="py-0 px-0">
                            <Input @next="getResult($event)"/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="py-0 px-0">
                            <Result @back="Back" :result="result"/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "",
    data: () => ({
        isHide: false,
        active_tabs: 0,
        result: null,
    }),
    props: {},
    methods: {
        Back(){
            this.active_tabs = 0
        },
        getResult($event) {
            window.console.log("event", $event)
            this.active_tabs = 1
            this.result = $event
        },
        hideTabs() {
            this.isHide = !this.isHide;
        },
    },
    components: {
        Input: () => import("./Input"),
        Result: () => import("./Result"),
    },
};
</script>
<style scoped>
.arr_icon {
    color: #2ca01c;
}

.arr_icon1 {
    color: #4c9aff;
    color: #2ca01c;
}

.v-tab {
    min-width: 30px;
    font-size: 16px;
    text-transform: capitalize;
}

.v-tab--active {
    background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
    font-weight: 700;
    color: #000;
    background-color: #ffffff !important;
    border-bottom: 4px solid #92d050;
    border-left: none;
}

.tabs_2 .v-tab--active {
    background-color: #f8f8f9 !important;
    border-bottom: 4px solid #92d050;
    border-left: none;
}

/* .v-tab--active {
    } */

p {
    color: rgba(0, 0, 0, 0.87);
}
</style>
