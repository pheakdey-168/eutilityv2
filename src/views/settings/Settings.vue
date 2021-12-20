<template>
	<v-app>
		<v-container>
			<v-row>
				<v-col sm="12" cols="12" class="pt-4">
                    <v-card color="white" class="pa-4 no_border pb-0" elevation="0">
						<v-row>
							<v-col sm="12" cols="12" class="py-0">
								<h2 class="mb-0 font_20">{{ $t('settings') }}</h2>
								<v-icon 
									onclick="window.history.go(-1); return false;" 
									style="cursor: pointer; color: #333; font-size: 40px;"
									class="float-right"
								>close</v-icon>
							</v-col>
							<v-col sm="12" cols="12" class=" py-0">
								<v-card flat>
									<v-card-text class="">
										<SettingTab/>
									</v-card-text>
								</v-card>
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
			SettingTab: () => import('./SettingTab'),


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
	