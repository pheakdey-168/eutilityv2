<template>
  <v-row>
    <v-col sm="12" cols="12" class="pt-0">
      <h2 class="mb-0 font_20">
        {{ $t("business_financing_approval_factors") }}
      </h2>
      <p class="mb-0">{{ $t("business_financing_approval_factors_desc") }}:</p>
    </v-col>
    <v-col sm="6" cols="12" class="pr-2">
      <v-card color="grayBg" class="pa-4 rounded-4" min-height="247px" elevation="0">
        <div class="d-flex">
          <img style="height: 60px;" src="@/assets/images/speedometer.png" />
          <h2 class="font_20 ml-3">{{ $t("your_personal_credit_scrores") }}</h2>
        </div>
        <p class="mb-0 mt-2">
          {{ $t("your_personal_credit_scrores_desc1") }}
          <a class="link" href="#">Credit Bureau of Cambodia (CBC)</a>
          {{ $t("your_personal_credit_scrores_desc2") }}
        </p>
        <!-- <p class="mb-0">
          {{ $t("your_personal_credit_scrores_desc1") }}
          <a class="link" href="#">Credit Bureau of Cambodia (CBC)</a>
          {{ $t("your_personal_credit_scrores_desc2") }}
        </p> -->
      </v-card>
    </v-col>
    <v-col sm="6" cols="12" class="pl-2">
      <v-card color="grayBg" class="pa-4 rounded-4"  min-height="247px" elevation="0">
        <div class="d-flex">
          <img style="height: 60px;" src="@/assets/images/cash-flow.png" />
          <h2 class="font_20 ml-3">{{ $t("cash_flow_capacity") }}</h2>
        </div>
        <p class="mb-0 mt-2">
          {{ $t("cash_flow_capacity_desc") }}
          <a class="link" href="mailto:financing@banhji.com"
            >financing@banhji.com</a
          >
        </p>
      </v-card>
    </v-col>
    <v-col sm="6" cols="12" class="pt-1 pr-2">
      <v-card color="grayBg" class="pa-4 rounded-4"  min-height="254px" elevation="0">
        <div class="d-flex">
          <img
            style="height: 60px;"
            src="@/assets/images/business-credit-score.png"
          />
          <h2 class="font_20 ml-3">{{ $t("your_business_credit_score") }}</h2>
        </div>
        <p class="mb-0 mt-2">
          {{ $t("your_business_credit_score_desc1") }}
          <a class="link" href="#">Credit Bureau of Cambodia (CBC)</a>
          {{ $t("your_business_credit_score_desc2") }}
        </p>
      </v-card>
    </v-col>
    <v-col sm="6" cols="12" class="pt-1 pl-2">
      <v-card color="grayBg" class="pa-4 rounded-4"  min-height="247px" elevation="0">
        <div class="d-flex">
          <img style="height: 60px;" src="@/assets/images/calendar.png" />
          <h2 class="font_20 ml-3">{{ $t("time_in_business") }}</h2>
        </div>

        <p class="mb-0 mt-2">{{ $t("time_in_business_desc") }}</p>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
// import { ShowResource } from '@/observable/store'
export default {
  data: () => ({}),
  computed: {},
  methods: {},

  components: {},
};
</script>

<style scoped>
.function_footer {
  padding: 15px;
  display: inline-block;
}

.link {
  color: #1976d2 !important;
}

.actionBtn {
  height: 47.2px !important;
}

.text_tip {
  font-size: 9px;
  line-height: 10px;
}
.res_img {
  margin: auto;
  display: block;
  height: 50px;
}
@media (max-width: 576px) {
}
</style>
