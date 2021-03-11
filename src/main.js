import Vue from 'vue'
import App from './App.vue'
import store from './store'
import localizeFilter from '@/filters/localize.filter'
import 'material-design-icons-iconfont'
import router from './router'


import './assets/scss/main.scss'

Vue.filter('localize', localizeFilter)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
