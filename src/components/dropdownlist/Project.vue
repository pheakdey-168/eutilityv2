<template>
    <v-select
        class="mt-1"
        :loading="loading"
        placeholder="Select Project"
        v-model="project"
        :items="projects"
        item-text="name"
        item-value="id"
        @change="emitProject();onChanged();"
        :disabled="disabled"
        return-object
        clearable
        outlined />
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ProjectDropDownList',
    props: {
        initProject: {
            type: Object,
        },
        initDisabled: {
            type: Boolean,
        },
    },
    data() {
        return {
            project : null,
            loading : false,
            disabled : false,
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('projects/getList')

            this.loading = false;
        },
        emitProject() {
            this.$emit('emitProject', this.project);
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initProject() {
            this.project = this.initProject;
        },
        initDisabled() {
            this.disabled = this.initDisabled;
        },
    },
    computed: mapState({
        projects: state => state.projects.list
    }),
    created() {
        this.loadData();
    },
    mounted() {
        /* Initial obj */
        this.project = this.initProject;
    }
}
</script>