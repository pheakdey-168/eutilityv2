<template>
    <v-row class="white">
        <v-col sm="12" cols="12" class="py-0">
            <p class="mb-2">{{$t('file_type')}} [PDF, JPG, JPEG, TIFF, PNG, GIF]</p>
            <template>
                <v-file-input
                    v-model="files"
                    :placeholder="$t('attachments')"
                    multiple
                    prepend-icon="mdi-paperclip"
                >
                    <template v-slot:selection="{ text }">
                        <v-chip
                            small
                            label
                            color="primary"
                        >
                            {{ text }}
                        </v-chip>
                    </template>
                </v-file-input>
            </template>

            <v-simple-table class="attachment_table mb-3" >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>{{$t('file_name')}}</th>
                            <th>{{$t('description')}}</th>
                            <th>{{$t('date')}}</th>
                            <th class="text-center"/>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in attachments" :key="item.file">
                            <td>{{ item.file }}</td>
                            <td>{{ item.desc }}</td>
                            <td>{{ item.date }}</td>
                            <td class="text-center">
                                <v-btn color="primary" class="mr-2 pa-0">
                                    <v-icon size="" class="ma-1">edit</v-icon>
                                </v-btn>
                                <v-btn color="primary" class="mr-2 pa-0">
                                    <v-icon size="" class="ma-1">delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table> 
            <v-btn class="btn_save_att">
                <v-icon size="15" class="mr-2">fa-check</v-icon>
                {{$t('save')}}
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
    export default {
        name: "",
        data() {
            return {
                files: [],
                attachments: [],
            }
        },
        methods: {}
    }
</script>
<style scoped>
</style>