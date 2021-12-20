<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col sm="12" cols="12">
                    <v-card color="white" class="pa-4  pt-0 no_border" elevation="0">
						<v-row>
							<v-col sm="12" cols="12" class="tab_wrapper py-0">
								<v-card-text class="">
									<FinancialRatio/>
								</v-card-text>
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
			FinancialRatio: () => import('./FinancialRatio'),
		},
		data: () => ({
			active_tab: 0
		}),
		watch: {
		},
		methods: {
			clickMe(data) {
				this.$route.push(data.link);
			},
			tabActive(val){
				this.active_tab = val
			}
		}
	};
</script>
<style scoped>
	.v-menu__content .v-list .v-list-item{
		min-height: 35px !important;
	}
	.tab_wrapper{
		position: relative;
		display: inherit;
	}
	.v-tab{
		min-width: 30px;
		font-size: 20px;
		text-transform: capitalize;
	}
	.v-icon--left {
		margin-right: 0px;
	}
	.theme--light.v-tabs > .v-tabs-bar{
		border-bottom: 1px solid #ddd !important;
	}
	.dropdown_transactions.v-btn{
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
	.v-tab--active{
		background-color: #E5EFFA;
		color: #000;
	}
	.theme--light.v-tabs >>> .v-tabs-bar{
		border-bottom: 1px solid #ddd !important;
	}
	.v-card__text{
		padding: 0 !important;
	}
</style>
	