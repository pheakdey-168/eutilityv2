<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" class="pa-2">
                    <v-card
                            outlined
                            dense
                            class="pa-6 no_border rounded-sm"
                            color="white"
                    >
                        <v-card height="25" outlined dense class="no_border">
                            <h3 class="mb-0 font_26 float-left">{{$t(title)}}</h3>
                            <v-icon
                                    @click="Close"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right mt-n2"
                            >close
                            </v-icon>
                        </v-card>
                        <v-card outlined dense class=" no_border" color="white">
                            <slot name="content">

                            </slot>
                        </v-card>
                        <v-divider class="mt-4"/>
                        <v-card outlined dense class="no_border  function_footer">
                             <slot name="footer">

                             </slot>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
    export default {
        props: ['title'],
        name: "Layout",
    
        methods: {
            Close(){
                this.$emit('Close')
            }
        }
    };
</script>

<style scoped>

</style>
