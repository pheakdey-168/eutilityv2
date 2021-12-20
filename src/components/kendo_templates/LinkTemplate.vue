<template>
    <span>
        <a @click="onClickLink" style="color: blue !important; cursor: pointer !important;">{{templateArgs.text}}</a>
    </span>
</template>

<script>
import router from '@/router'
export default {
    name: 'LinkTemplate',
    data() {
        return {
            templateArgs: {}
        }
    },
    methods: {
        onClickLink() {
            router.push({ path: this.templateArgs.url });
        }
    },
}
</script>
