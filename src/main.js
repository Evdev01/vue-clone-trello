import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'material-design-icons-iconfont'
import router from './router'


import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
