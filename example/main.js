import Vue from 'vue'
import App from './App.vue'
import PdfJsVue from '../lib'

Vue.use(PdfJsVue)

Vue.config.productionTip = false

new Vue({render: h => h(App)}).$mount('#app')
