<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card color="white" class="pa-5 no_border" elevation="0">
            <v-row>
              <v-col sm="12" cols="12" class="tab_wrapper pt-0">
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
												<v-icon size="17" class="ma-1">mdi mdi-plus</v-icon>
													{{ $t('new') }}
												<v-icon size="" class="ma-1">expand_more</v-icon>
											</v-btn>
										</span>
                  </template>

                  <v-list width="930px" class="pa-3">
                    <v-row>
                      <v-col sm="4" cols="12" style="border-right: thin solid #ddd;">
                        <v-list-item link route to="member" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('add_member') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link route to="share" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('share') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link route to="dividend" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('dividend') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                      </v-col>
                      <v-col sm="4" cols="12" style="border-right: thin solid #ddd;">
                        <v-list-item link route to="cooperative/saving_account" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('add_saving_account') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link route to="saving_deposit" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('deposit') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link route to="withdraw" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('withdraw') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link route to="close_saving" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('close_saving') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link route to="close_month" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('close_month') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                      </v-col>
                      <v-col sm="4" cols="12" style="border-right: thin solid #ddd;">
                        <v-list-item link route to="loan_agreement" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('loan_agreement') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link route to="close_loans" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('close_loan') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link route to="loan_disbursement" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('loan_disbursement') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link route to="loan_close_month" class="pl-0">
                          <v-list-item-title >
                            <h3 class="primary text-bold pl-3">{{ $t('close_month') }}</h3>
                          </v-list-item-title>
                        </v-list-item>
                      </v-col>
                    </v-row>
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
  name: "Customers",
  components: {
    // Insight: () => import('./Insight'),
    // MembersTabs: () => import('./member/MembersTabs'),
    // Sales: () => import('./sales/Sales'),
    // Price: () => import('./Price'),
    // Setting: () => import('./settings/Settings')
  },
  data: () => ({}),
  watch: {},
  methods: {
    clickMe(data) {
      this.$route.push(data.link);
    }
  }
};
</script>
<style scoped>
.theme--light.v-tabs.tab_setting > .v-tabs-bar {
      padding-top: 0px !important;
  }
.v-menu__content .v-list .v-list-item {
  min-height: 35px !important;
}

.tab_wrapper {
  position: relative;
  display: inherit;
}

.v-tab {
  min-width: 30px;
  font-size: 17px;
  text-transform: capitalize;
}

.v-icon--left {
  margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}
.menuable__content__active{
  left: 448px !important;
}

.dropdown_transactions.v-btn {
  background-color: #2CA01C !important;
  height: 40px !important;
  width: auto !important;
  border-radius: 0 !important;
  padding: 0px 5px 0px 10px !important;
  color: #fff !important;
  right: 12px;
  position: absolute;
  top: 7px;
}

.v-tab--active {
  background-color: #E5EFFA;
  color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
  border-bottom: 1px solid #ddd !important;
}

.v-card__text {
  padding: 0 !important;
}
</style>
