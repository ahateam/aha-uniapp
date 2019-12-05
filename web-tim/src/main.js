import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import tim from './commen/tim/tim'
import TIM from 'tim-js-sdk'
import api from './commen/api'
import constData from './commen/constData'
import commen from './commen/commen'
import './assets/icon/iconfont.css'
import Vant from 'vant';
import 'vant/lib/index.css'
Vue.use(Vant);


window.tim = tim
window.TIM = TIM
window.store = store
Vue.config.productionTip = false
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$constData = constData
Vue.prototype.$commen = commen




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
