const userModules = {
	state: {
		userInfo: {
			skillList: [],
			text: ''
		}
	},
	mutations: {
		updataSkillList(state, skillList) {
			state.userInfo.skillList = skillList
			console.log(state)
		},

		updataText(state, text) {
			state.userInfo.text = text
			console.log(state)
		},
	},
	actions: {

	},
}

export default userModules
