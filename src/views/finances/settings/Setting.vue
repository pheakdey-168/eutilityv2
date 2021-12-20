<template>
	<v-row class="">
		<v-col sm="12" cols="12">
            <v-tabs vertical class="tab_setting" slider-color="grayBg" slider-size="7">
				<v-tab>
					<span class="hidden-sm-and-up">
						<v-icon left>mdi-pen</v-icon>
					</span>
					<span class="hidden-sm-and-down text-capitalize">
						{{$t('type_of_loan')}}
					</span>
				</v-tab>
				<v-tab-item>
					<v-card flat>
						<v-card-text class="py-0">
							<TypeOfLoans/>
						</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</v-col>
	</v-row>
</template>

<script>


	export default {
		data: () => ({
		}),
		props: {
		},
		methods: {
			clickMe(data) {
				// alert(data.link)
				this.$router.push(`${data.link}`);
				//this.$event.target.classList.toggle(active)
				//eslint-disable-next-line no-console
				console.log(data.link)
				//eslint-disable-next-line no-console
				//console.log(data)
			}
		},
		components: {
			TypeOfLoans : ()=> import('./TypeOfLoans')
        },
	};
</script>
<style scoped>
	.v-tab{
		justify-content: left;
	}
	.v-tab--active{
		background-color: rgb(255, 255, 255);
	}
    .v-tab--active{
        background-color: #ffffff !important;
        border-bottom: 4px solid #92d050;
        border-left: none;
    }
	.tab_setting .v-tab--active{
		font-weight: 700;
		color: #000;
	}
	
	@media (max-width: 576px){
		
	}
</style>