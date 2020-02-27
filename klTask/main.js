import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import util from 'ahaapi'
import api from './commen/api.js'
import constData from './commen/constData.js'
import commen from './commen/commen.js'
import store from './store/index.js'
// import './static/icon/iconfont.css'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.prototype.$commen = commen
Vue.prototype.$constData = constData
Vue.prototype.$store = store



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
