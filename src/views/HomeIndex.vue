<template>
	<div id="app">
		<v-app id="inspire" class="custom_theme">
			<!-- <Header/> -->
			<v-main>
				<router-view/>
				<vue-snotify/>
				<!-- <Footer/> -->
				<Resource/>
			</v-main>
		</v-app>
	</div>
</template>

<script>
	// import Header from '@/components/HeaderApp.vue';
	// import Footer from '@/components/Footer'
	const instituteHandler = require("@/scripts/instituteHandler.js");

	export default {
		name: "DashboardIndex",
		components: {
			// Header,
			// Footer
            Resource: ()=> import('@/components/Resource')
		},
		data: () => ({
		}),		
		created () {
			// Initial Institute
			instituteHandler.init();
		},
	};
</script>