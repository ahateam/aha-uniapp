import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		taskInfo:{
			name:'',
			text:'',
		},
	},
	// mutations:{
	// 	setName:function(state,newName){
	// 		state.name = newName
	// 		console.log(state.name)
	// 	},
	// 	setText:function(state,newText){
	// 		state.text = newText
	// 		console.log(state.text)
	// 	}
	// },
	
})