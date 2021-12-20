<template>
    <v-row >
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("business_recovery_guarantee") }}</h2>
            <p class="mb-2">{{$t('business_recovery_guarantee_desc1')}}</p>
            <p class="mb-2">{{$t('business_recovery_guarantee_desc2')}} <a class="link" href="#">CGCC</a> {{$t('website')}}</p>
        </v-col>
    </v-row>
</template>
<script>
    // import { ShowResource } from '@/observable/store'
    export default {
        data: () => ({
        }),
        computed:{
          
        },
        methods:{
      
        },
       
        components: {
            
        },
    };
</script>

<style scoped>
    .function_footer {
        padding: 15px;
        display: inline-block;
    }
    .link{
        color: #1976d2 !important;
    }

    p {
        color: rgba(0, 0, 0, 0.87);
    }

    .actionBtn {
        height: 47.2px !important;
    }

    .text_tip {
        font-size: 9px;
        line-height: 10px;
    }
    .res_img{
        margin: auto;
        display: block;
        height: 50px;
    }
    @media (max-width: 576px) {
    }
</style>
