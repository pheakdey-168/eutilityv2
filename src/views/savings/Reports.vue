<template>
    <v-app>
        <v-container>
            
            <v-card color="white" class="pa-4 no_border" elevation="0">
                <v-icon
                    onclick="window.history.go(-1); return false;"
                    style="cursor: pointer; color: #333; font-size: 40px;position: absolute;right: 5px;z-index: 1;"
                    class="float-right"
                >close
                </v-icon>
                <ListOfSaving/>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
export default {
    data: () => ({}),
    props: {},
    methods: {
        clickMe(data) {
            // alert(data.link)
            this.$router.push(`${data.link}`);
            //this.$event.target.classList.toggle(active)
            //eslint-disable-next-line no-console
            console.log(data.link)
            //eslint-disable-next-line no-console
            //console.log(data)
        }
    },
    components: {
        ListOfSaving: () => import('./reports/ListOfSaving')
    },
};
</script>
<style scoped>
.v-tab {
    justify-content: left;
    font-size: 16px;
}

.v-tab--active {
    background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
    font-weight: 700;
    color: #000;
}

.v-tab--active {
    background-color: #ffffff !important;
    border-bottom: 4px solid #92d050;
    border-left: none;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

</style>