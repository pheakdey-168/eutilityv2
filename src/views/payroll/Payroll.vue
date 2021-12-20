<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card color="white" class="pa-4 no_border" elevation="0">
                        <v-row>
                            <v-col sm="12" cols="12" class="tab_wrapper py-0">
                                <v-tabs>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-pen</v-icon>
										</span>
                                        <span class="hidden-sm-and-down">
											{{ $t('insight') }}
										</span>
                                    </v-tab>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-pen</v-icon>
										</span>
                                        <span class="hidden-sm-and-down">
											{{ $t('employee') }}
										</span>
                                    </v-tab>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-attachment</v-icon>
										</span>
                                        <span class="hidden-sm-and-down">
											{{ $t('payroll') }}
										</span>
                                    </v-tab>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-attachment</v-icon>
										</span>
                                        <span class="hidden-sm-and-down">
											{{ $t('payment') }}
										</span>
                                    </v-tab>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-attachment</v-icon>
										</span>
                                        <span class="hidden-sm-and-down">
											{{ $t('setting') }}
										</span>
                                    </v-tab>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <Insight/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <EmployeeTabs/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <PayrollTab/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item v-show="steps=4">
                                        <v-card flat>
                                            <v-card-text class="">
                                                <PaymentTab />
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <Setting/>
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
                                    transition="scroll-y-reverse-transition">
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

                                    <v-list>
                                        <v-list-item link route to="employee">
                                            <v-list-item-title>{{ $t('add_new_employee') }}</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item link route to="employment_history">
                                            <v-list-item-title>{{ $t('add_employment_history') }}</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item link route to="import_timecard">
                                            <v-list-item-title>{{ $t('import_timecard') }}</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item link route to="payroll_run">
                                            <v-list-item-title>{{ $t('run_payroll') }}</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item link route to="payroll_payment">
                                            <v-list-item-title>{{ $t('make_payroll_payment') }}</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item link route to="input_timesheet">
                                            <v-list-item-title>{{ $t('input_timesheet') }}</v-list-item-title>
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
        EmployeeTabs: () => import('./employee/EmployeeTabs'),
        Insight: () => import('./Insight'),
        PaymentTab: () => import('./payment/PaymentTab'),
        PayrollTab: () => import('./pay_roll/PayrollTab'),
        Setting: () => import('./settings/Setting'),
    },
    data: () => ({
        steps: 4
    }),
    watch: {},
    methods: {
        clickMe(data) {
            this.$route.push(data.link);
        }
    }
};
</script>
<style scoped>
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
    background-color: #f3f8ff;
    color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

.v-card__text {
    padding: 0 !important;
}
</style>
	