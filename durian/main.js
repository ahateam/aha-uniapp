import Vue from 'vue'
import App from './App'
import util from 'ahaapi'
import api from './commen/api.js'
import constData from './commen/constData.js'
import commen from './commen/commen.js'
import './static/icon/iconfont.css'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.prototype.$commen = commen
Vue.prototype.$constData = constData


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
