import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import tim from './commen/tim/tim'
import TIM from 'tim-js-sdk'
import api from './commen/api'
import axios from 'axios'
axios.defaults.headers = {
  "Content-Type": "text/plain"
}
window.tim = tim
window.TIM = TIM
Vue.config.productionTip = false
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$api = api
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
