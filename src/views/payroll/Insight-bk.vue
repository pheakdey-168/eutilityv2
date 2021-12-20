<template>
	<v-row class="">
		<v-col class="pb-0" sm="7" cols="12">
			<v-row>
				<v-col sm="6" cols="12">
                    <v-card outlined dense color="secondary" class="pa-3 mb-5 no_border" height="65px">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <h6 class="third--text">10</h6>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <h4 class="white--text text-right font_16 text-uppercase">{{$t('employee_to_pay')}}</h4>
                            </v-col>
                        </v-row>
                    </v-card>
					<v-card outlined dense class="pa-5 no_border text-center" color="grayBg">
						<h3>{{$t('head_count')}}</h3>
						<h2 class="primary">100</h2>
						<template>
							<v-simple-table>
								<template>
									<tbody>
									<tr>
										<td class="text-left greyText--text font_14 text-uppercase">{{$t('male')}}</td>
										<td class="text-right text-bold font_14 text-uppercase">500</td>
									</tr>
                                    <tr>
                                        <td class="text-left greyText--text font_14 text-uppercase">{{$t('female')}}</td>
                                        <td class="text-right text-bold font_14 text-uppercase">8000</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left greyText--text font_14 text-uppercase">{{$t('management')}}</td>
                                        <td class="text-right text-bold font_14 text-uppercase">30%</td>
                                    </tr>
									</tbody>
								</template>
							</v-simple-table>
						</template>
					</v-card>
				</v-col>
				<v-col sm="6" cols="12">
                    <v-card outlined dense color="third" class="pa-3 mb-5 no_border" height="65px">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0">
                                <h6 class="white--text" >10</h6>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0">
                                <h4 class="text-right font_16 text-uppercase">{{$t('days_to_payroll')}}</h4>
                            </v-col>
                        </v-row>
                    </v-card>
					<v-card outlined dense class="pa-5 no_border text-center" color="grayBg">
                        <h3>{{$t('ytd_net_pay')}}</h3>
						<h2 class="primary ">10,500</h2>
                        <template>
                            <v-simple-table>
                                <template>
                                    <tbody>
                                    <tr>
                                        <td class="text-left greyText--text font_14 text-uppercase">{{$t('salary')}}</td>
                                        <td class="text-right text-bold font_14 text-uppercase">%</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left greyText--text font_14 text-uppercase">{{$t('benefit')}}</td>
                                        <td class="text-right text-bold font_14 text-uppercase">%</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left greyText--text font_14 text-uppercase">{{$t('overtime')}}</td>
                                        <td class="text-right text-bold font_14 text-uppercase">%</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
					</v-card>
				</v-col>
			</v-row>
			<v-row>
                <v-col class="pb-0" sm="6" cols="12">
                    <v-card outlined dense class="pa-5 no_border text-center" color="grayBg" height="240px">
                        <h3 >{{$t('ytd_tax_payment')}}</h3>
                        <h2 class="primary py-5">10,000</h2>
                        <v-row>
                            <v-col cols="6">
                                <h3 style="font-size: 30px" class="primary mb-2">%</h3>
                                <p class="mb-0">{{$t('salary')}}</p>
                            </v-col>
                            <v-col cols="6">
                                <h3 style="font-size: 30px" class="primary mb-2">%</h3>
                                <p class="mb-0">{{$t('fringe_benefit')}}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
				<v-col class="pb-0" sm="6" cols="12">
                    <v-card outlined dense color="grayBg" class="pa-4 no_border" min-height="240px">
                        <v-simple-table>
                            <template>
                                <tbody>
                                <tr>
                                    <td class="text-left py-2 greyText--text font_14 text-uppercase">{{$t('paid_via_bank')}}</td>
                                    <td class="text-right text-bold">%</td>
                                </tr>
                                <tr>
                                    <td class="text-left py-2 greyText--text font_14 text-uppercase">{{$t('paid_via_cash')}}</td>
                                    <td class="text-right text-bold">%</td>
                                </tr>
                                <tr>
                                    <td class="text-left py-2 greyText--text font_14 text-uppercase">{{$t('bank_used_for_payroll')}}</td>
                                    <td class="text-right text-bold">%</td>
                                </tr>
                                <tr>
                                    <td class="text-left py-2 greyText--text font_14 text-uppercase">{{$t('%_of_net_pay_for_women')}}</td>
                                    <td class="text-right text-bold">%</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
		<v-col class="pb-0" sm="5" cols="12">
			<v-row>
				<v-col sm="12" cols="12" class="">
                    <v-card outlined dense color="grayBg" class="pa-5 no_border" height="303px">
                        <v-row >
                            <v-col sm="12" cols="12" class="py-0 text-center d-flex justify-space-between">
                                <div>
                                    <h3>{{$t('gross_pay')}}</h3>
                                    <p>{{$t('year_to_data_()')}}</p>
                                </div>
                                <h3 style="font-size: 30px;" class="primary">100,500,000</h3>
                            </v-col>
                        </v-row>
                        <chart ref="chart"
                                :chartArea="chartArea"
                                :legend-visible="false"
                                :series-defaults-labels-visible="true"
                                :series-defaults-labels-background="'transparent'"
                                :series-defaults-labels-template="labelTemplate"
                                :series="series"
                                :tooltip-visible="true"
                                :theme="'sass'">
                        </chart>
					
					</v-card>
				</v-col>
			</v-row>
			<v-row>
                <v-col sm="12" cols="12" class="pb-1">
                    <v-card outlined dense color="grayBg" class="pa-4 no_border" min-height="180px">
                        <h3 class="mb-5" >{{$t('resource_management')}}</h3>
                        <v-simple-table>
                            <template>
                                <tbody>
                                <tr>
                                    <td class="text-left py-2 greyText--text font_14 text-uppercase">{{$t('employee_annaul_attrition')}}</td>
                                    <td class="text-right text-bold">%</td>
                                </tr>
                                <tr>
                                    <td class="text-left py-2 greyText--text font_14 text-uppercase">{{$t('employee_billable_rate')}}</td>
                                    <td class="text-right text-bold">%</td>
                                </tr>
                            
                                </tbody>
                            </template>
                        </v-simple-table>
					</v-card>
				</v-col>
                <v-col sm="12" cols="12" class="">
                    <v-btn width="100%" color="green" class="rounded-0 float-left">
                        <v-icon size="13" class="white--text mr-2">fa fa-lock</v-icon>
                        <span class="white--text text-capitalize">{{$t('connect_bank_payroll_account')}}</span>
                    </v-btn>
				</v-col>
			</v-row>

		</v-col>
	</v-row>

</template>

<script>
    import {i18n} from '@/i18n'
    import { Chart } from '@progress/kendo-charts-vue-wrapper';
	export default {
		components: {
            'chart': Chart
        },
		data: () => ({
            categories: [
                i18n.t('jan'),
                i18n.t('feb'),
                i18n.t('mar'),
                i18n.t('apr'),
                i18n.t('may'),
                i18n.t('jun')
            ],
            labelTemplate: '#= category # #= value #%',
            series: [{
                type: 'pie',
                startAngle: 180,
                data: [
                {
                    category: i18n.t('contracted')+' 29%',
                    value: 9.6,
                    color: '#92D050'
                },
                {
                    category:  i18n.t('fixed_duration_contact')+' 50%',
                    value: 5.2,
                    color: '#70ad47'
                },
                {
                    category:  i18n.t('undefined_duration_contact')+' 14%',
                    value: 3.6,
                    color: '#538233'
                }]
            }],
            chartArea: {
                background: "transparent",
                height: 210,
            },
		}),
		mounted () {
		},
		computed: {
			fields(){
				return [
					'30 '+ i18n.t('days_summary'),
					'60 '+ i18n.t('days_summary'),
				]
			},
		},
	};
</script>
<style scoped>
	.theme--light.v-data-table{
		background-color: transparent !important;
	}
	.v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
		height: 32px !important;
	}
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }

	@media (max-width: 576px){

	}
</style>