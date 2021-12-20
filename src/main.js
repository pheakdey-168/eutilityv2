import Vue from 'vue'
import './assets/styles/main.css'
import './assets/styles/snotify.css'
// Import font
import './assets/banhji-accounting/style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { i18n } from './i18n'
import { Trans } from './plugins/Translation'
import DatetimePicker from 'vuetify-datetime-picker'
import { BarcodesInstaller } from '@progress/kendo-barcodes-vue-wrapper'
//Kendo
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
// import $ from 'jquery'
import { DataSource, DataSourceInstaller } from '@progress/kendo-datasource-vue-wrapper'
import { Grid, GridColumn, GridInstaller } from '@progress/kendo-grid-vue-wrapper'
import {  ChartInstaller } from '@progress/kendo-charts-vue-wrapper';
import { ListBox, ListBoxInstaller } from '@progress/kendo-listbox-vue-wrapper';
// import JSZip from 'jszip'

import fullscreen from 'vue-fullscreen'
import VueSweetalert2 from 'vue-sweetalert2'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import store from './store'

const options = {
  toast: {
    position: SnotifyPosition.rightBottom
  }
}

Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans)

Vue.config.productionTip = false
Vue.use(DatetimePicker)
export const eventBus = new Vue();
//Kendo
Vue.use(GridInstaller)
Vue.use(DataSourceInstaller)
Vue.use(ChartInstaller)
Vue.use(ListBoxInstaller)
// notification
Vue.use(Snotify,options)

Vue.use(fullscreen)
Vue.use(VueSweetalert2)
Vue.use(BarcodesInstaller)
import excel from 'vue-excel-export'

Vue.use(excel)
new Vue({
	vuetify,
	i18n,
	store,
	router,
	render: h => h(App),
	components: {
		Grid,
		GridColumn,
		DataSource,
		ListBox
	},
}).$mount('#app')
