import Vue from 'vue'
import App from './App'
import './commen/icon/iconfont.css'
import util from 'ahaapi'
import api from './commen/api.js'
import constData from './commen/constData.js'
import commen from './commen/commen.js'





Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.prototype.$commen = commen
Vue.prototype.$constData = constData


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
