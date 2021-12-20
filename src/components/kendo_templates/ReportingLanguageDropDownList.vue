<template>
    <v-select class="mt-1"
        placeholder="Select"
        v-model="language"
        :items="languages"
        item-text="text"
        item-value="value"
        @change="emitLanguage"
        outlined/>
</template>

<script>
    export default {
        name: 'ReportingLanguageDropDownList',
        props: ["initLanguage"],
        data () {
            return {
                language    : 'english',
                languages   : [
                    { text: 'English', value: 'english' },
                    { text: 'Local', value: 'local' },
                ],
            }
        },
        methods: {
            emitLanguage () {
                this.$emit('emitLanguage', this.language);
            },
        },
        watch: {
            initLanguage () {
                this.language = this.initLanguage;
            }
        },
        mounted () {
            /* Initial Obj */
            this.language = this.initLanguage;
        }
    }
</script>