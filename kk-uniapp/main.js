import Vue from 'vue'
import App from './App'

import store from './commen/store.js'
import api from './commen/api.js'
import util from 'ahaapi'
import constData from './commen/constData.js'
import commen from './commen/commen.js'
import './static/icon/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.prototype.$commen = commen
Vue.prototype.$constData = constData
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
