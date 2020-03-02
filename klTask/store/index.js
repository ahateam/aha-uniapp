import Vue from 'vue'
import Vuex from 'vuex'
import task from './modules/task'
import user from './modules/userInfo.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},

	mutations: {},

	modules: {
		task,
		user
	}
})
