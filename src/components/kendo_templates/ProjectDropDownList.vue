<template>
    <v-select class="mt-1"
        placeholder="Select Project"
        v-model="projectId"
        :items="projects"
        item-text="name"
        item-value="id"
        @change="emitProjectId"
        outlined>
        <template slot="selection" slot-scope="{ item }">
            {{ item.code }} - {{ item.name }}
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.code }} - {{ item.name }}
        </template>
    </v-select>
</template>

<script>
    const { projectHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'ProjectDropDownList',
        props: ['initProjectId'],
        data () {
            return {
                projectId   : '',
                projects    : [],
            }
        },
        methods: {
            emitProjectId () {
                this.$emit('emitProjectId', this.projectId);
            },
        },
        watch: {
            initProjectId () {
                this.projectId = this.initProjectId;
            }
        },
        mounted () {
            /* Initial Project Id */
            this.projectId = this.initProjectId;

            // Call Project List
			projectHandler.getAll()
			.then(res => {
				if(res){
					this.projects = res;
				}
			})
        }
    }
</script>