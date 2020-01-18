const shareModules = {
	state: {
		shareInfo: {}
	},
	mutations: {
		updateShareInfo(state, shareInfo) {
			state.shareInfo = shareInfo
		},
		clearShareInfo(state) {
			state.shareInfo = {}
		}
	}
}

export default shareModules
