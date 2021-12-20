<template>
  <v-app class="zoom-in">
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card color="white" class="pa-4 no_border" elevation="0">
            <v-row>
              <v-col sm="12" cols="12" class="tab_wrapper py-0">
                <v-tabs v-model="active_tab">
                  <v-row>
                    <v-col
                      sm="10"
                      cols="10"
                      class="py-0 pr-0"
                      style="display: inherit;"
                    >
                      <v-tab>
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("insights") }}
                        </span>
                      </v-tab>
                      <!-- <v-tab  key="2">
                                                <span class="hidden-sm-and-up">
                                                    <v-icon left>mdi-pen</v-icon>
                                                </span>
                                                <span class="hidden-sm-and-down">
                                                    {{$t('options')}}
                                                </span>
                                            </v-tab> -->
                      <v-tab>
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-attachment</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("loans") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-attachment</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("analysis") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="hidden-sm-and-up">
                          <v-icon left>mdi-pen</v-icon>
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("resources") }}
                        </span>
                      </v-tab>
                    </v-col>
                    <v-col sm="2" cols="2" class="px-0">
                      <!-- Dropdown New-->
                      <v-menu
                        nudge-bottom="4"
                        bottom
                        offset-y
                        origin="bottom top"
                        transition="scroll-y-reverse-transition"
                      >
                        <template v-slot:activator="{ on }">
                          <span class="hidden-sm-and-up">
                            <div class="dropdown_transactions">
                              <v-icon v-on="on" left>mdi-plus</v-icon>
                            </div>
                          </span>
                          <span class="hidden-sm-and-down">
                            <v-btn icon v-on="on" class="dropdown_transactions">
                              <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                              {{ $t("new") }}
                              <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                          </span>
                        </template>

                        <v-list>
                          <v-list-item link route to="new_loan">
                            <v-list-item-title>{{
                              $t("add_new_loan")
                            }}</v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="approved_loan">
                            <v-list-item-title>{{
                              $t("approved_loan")
                            }}</v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="record_loan_receipt">
                            <v-list-item-title>{{
                              $t("record_loan_receipt")
                            }}</v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            link
                            route
                            to="record_loan_periodic_payment"
                          >
                            <v-list-item-title>{{
                              $t("record_loan_periodic_payment")
                            }}</v-list-item-title>
                          </v-list-item>
                          <v-list-item link route to="close_loan">
                            <v-list-item-title>{{
                              $t("close_loan")
                            }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Insight @tabActive="tabActive" />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <!-- <v-tab-item>
										<v-card flat>
											<v-card-text class="">
												<Options/>
											</v-card-text>
										</v-card>
									</v-tab-item> -->

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Managerments />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <FinancialRatio />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <Resources />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
                <!-- Dropdown New-->
                <v-menu
                  nudge-bottom="4"
                  bottom
                  offset-y
                  origin="bottom top"
                  transition="scroll-y-reverse-transition"
                >
                  <template v-slot:activator="{ on }">
                    <span class="hidden-sm-and-up">
                      <div class="dropdown_transactions">
                        <v-icon v-on="on" left>mdi-attachment</v-icon>
                        <v-icon size="" class="ma-1">expand_more</v-icon>
                      </div>
                    </span>
                    <span class="hidden-sm-and-down">
                      <v-btn icon v-on="on" class="dropdown_transactions">
                        <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                        {{ $t("new") }}
                        <v-icon size="" class="ma-1">expand_more</v-icon>
                      </v-btn>
                    </span>
                  </template>

                  <v-list>
                    <v-list-item link route to="new_loan">
                      <v-list-item-title>{{
                        $t("add_new_loan")
                      }}</v-list-item-title>
                    </v-list-item>
                    <!-- <v-list-item link route to="approved_loan">
                      <v-list-item-title>{{
                        $t("approved_loan")
                      }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item link route to="record_loan_receipt">
                      <v-list-item-title>{{
                        $t("record_loan_receipt")
                      }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item link route to="record_loan_periodic_payment">
                      <v-list-item-title>{{
                        $t("record_loan_periodic_payment")
                      }}</v-list-item-title>
                    </v-list-item> -->
                    <v-list-item link route to="close_loan">
                      <v-list-item-title>{{
                        $t("close_loan")
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "",
  components: {
    Insight: () => import("./Insight"),
    // Options: () => import('./options/Options'),
    Managerments: () => import("./management/Managerments"),
    Resources: () => import("./resources/Resources"),
    FinancialRatio: () => import("./FinancialRatio"),
  },
  data: () => ({
    active_tab: 0,
  }),
  watch: {},
  methods: {
    clickMe(data) {
      this.$route.push(data.link);
    },
    tabActive(val) {
      this.active_tab = val;
    },
  },
};
</script>
<style scoped>
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}
.dropdown_transactions.v-btn {
  right: 10px !important;
}
.tab_wrapper {
  position: relative;
  display: inherit;
}
.v-tab {
  min-width: 30px;
  font-size: 20px;
  text-transform: capitalize;
}
.v-icon--left {
  margin-right: 0px;
}
.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-tab--active {
  background-color: #e5effa;
  color: #000;
}
.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}
.v-card__text {
  padding: 0 !important;
}
</style>
