<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card color="white" class="pa-4 no_border" elevation="0">
            <v-row>
              <v-col sm="12" cols="12" class="tab_wrapper py-0">
                <v-tabs v-model="active_in_tabs">
                  <v-row>
                    <v-col
                      sm="10"
                      cols="10"
                      class="py-0 pr-0"
                      style="display: inherit;"
                    >
                      <v-tab>
                        <span class="hidden-sm-and-up">
                            {{ $t("suppliers") }}
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("suppliers") }}
                        </span>
                      </v-tab>
                      <v-tab>
                        <span class="hidden-sm-and-up">
                          {{ $t("payable") }}
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("payable") }}
                        </span>
                      </v-tab>
                      <!-- <v-tab>
                        <span class="hidden-sm-and-up">
                            {{ $t("purchase") }}
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("purchase") }}
                        </span>
                      </v-tab> -->
                      <v-tab>
                        <span class="hidden-sm-and-up">
                              {{ $t("expense") }}
                        </span>
                        <span class="hidden-sm-and-down">
                          {{ $t("expense") }}
                        </span>
                      </v-tab>
                    </v-col>
                    <v-col sm="2" cols="2" class="px-0">
                      <!-- Dropdown New-->
                      <!-- <v-menu
                        nudge-bottom="4"
                        nudge-left="40"
                        bottom
                        offset-y
                        origin="bottom top"
                        transition="scroll-y-reverse-transition"
                      >
                        <template v-slot:activator="{ on }">
                          <span class="hidden-sm-and-up">
                            <div class="dropdown_transactions ml-6">
                              <v-icon v-on="on" left>mdi-plus</v-icon>
                            </div>
                          </span>
                          <span class="hidden-sm-and-down">
                            <v-btn
                              icon
                              v-on="on"
                              class="dropdown_transactions"
                              style="right: 0;"
                            >
                              <v-icon size="17" class="ma-1">mdi-plus</v-icon>
                              {{ $t("new") }}
                              <v-icon size="" class="ma-1">expand_more</v-icon>
                            </v-btn>
                          </span>
                        </template>


                        <v-list width="250px" class="pa-3 mr-4">
                          <v-row>
                            <v-col
                              sm="12"
                              cols="12"
                            >
                              <v-list-item
                                link
                                route
                                to="credit_purchase"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("purchase") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="mb-3 greyText--text pl-3 font_12 float-left"
                              >
                                {{ $t("credit_purchase_desc") }}
                              </p>
                              <v-list-item
                                link
                                route
                                to="expenses"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("expenses") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="mb-3 greyText--text font_12 pl-3 float-left"
                              >
                                {{ $t("expenses_desc") }}
                              </p>

                              <v-list-item
                                link
                                route
                                to="cash_payment"
                                class="pl-0"
                              >
                                <v-list-item-title>
                                  <h3 class="primary--text text-bold pl-3">
                                    {{ $t("cash_payment") }}
                                  </h3>
                                </v-list-item-title>
                              </v-list-item>
                              <p
                                class="mb-3 greyText--text font_12 pl-3 float-left"
                              >
                                {{ $t("cash_payment_desc") }}
                              </p>
                            </v-col>
                          </v-row>
                        </v-list>
                      </v-menu> -->
                    </v-col>
                  </v-row>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <SupplierDirectory />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <BalanceDetail />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <!-- <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <PurchaseByVendor />
                      </v-card-text>
                    </v-card>
                  </v-tab-item> -->
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text class="">
                        <ExpneseService />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { data } from "@/observable/store";
export default {
  name: "",
  components: {
    SupplierDirectory: () => import("./SupplierDirectory"),
    // PurchaseByVendor: () => import("./PurchaseByVendor"),
    BalanceDetail: () => import("./BalanceDetail"),
    ExpneseService: () => import("./ExpneseService")
  },
  data: () => ({
    // active_tab: data.vendor_tab.main
    active_in_tabs: data.vendor_tab_main,
  }),
  computed: {
    active_tab() {
      return data.vendor_tab_main;
    },
  },
  watch: {
    active_tab() {
      window.console.log("is change", this.active_tab);
      this.active_in_tabs = this.active_tab;
    },
    active_in_tabs() {
      data.vendor_tab_main = this.active_in_tabs;
    },
  },
  methods: {
    clickMe(data) {
      this.$route.push(data.link);
    },
  },
};
</script>
<style scoped>
/* .v-menu__content{
  top: 141px !important;
  left: 1098px !important;
} */
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
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

.menuable__content__active {
  right: 40px !important;
  left: auto !important;
}
.v-card__text {
  padding: 0 !important;
}
</style>
