const taskModules = {
	state: {
		taskInfo: {
			taskStatus: 0,
			fileData: [],
			imgData: [],
			qualifications: '',
			qualName: '',
			house: 0,
			totlet: 0
		}, //任务信息
		qualiList: [], //资质列表
	},
	mutations: {
		// 任务标题
		updateTitle(state, title) {
			state.taskInfo.title = title
		},
		// 任务类型
		updateType(state, taskType) {
			state.taskInfo.taskType = taskType
		},

		// 清洁房间数量
		updataHouse(state, house) {
			state.taskInfo.house = house
		},

		// 清洁卫生间数量
		updataTotlet(state, totlet) {
			state.taskInfo.totlet = totlet
		},

		// 出发地
		updaTaskFrom(state, address) {
			state.taskInfo.fromAddress = address
			let newTaskInfo = { ...state.taskInfo
			};
			state.taskInfo = null
			state.taskInfo = newTaskInfo
		},

		// 目的地
		updaTaskTo(state, address) {
			state.taskInfo.toAddress = address
			let newTaskInfo = { ...state.taskInfo
			};
			state.taskInfo = null
			state.taskInfo = newTaskInfo
		},

		// 任务描述
		updateTaskDescribe(state, taskDescribe) {
			state.taskInfo.taskDescribe = taskDescribe
		},
		// 内容 
		updateTaskcontent(state, Taskcontent) {
			state.taskInfo.Taskcontent = Taskcontent
		},
		// 上传文件
		updateFileData(state, file) {
			state.taskInfo.fileData.push(file)
		},

		//删除文件
		delFileData(state, index) {
			state.taskInfo.fileData.splice(index, 1)
		},

		// 上传图片
		updateImgData(state, img) {
			state.taskInfo.imgData.push(img)
		},

		//删除图片
		delImgData(state, index) {
			state.taskInfo.imgData.splice(index, 1)
		},

		// 任务金额
		updatePayPrice(state, taskBudget) {
			state.taskInfo.taskBudget = taskBudget
		},

		// 任务完成时间 
		updateFinishDate(state, finishDate) {
			state.taskInfo.finishDate = finishDate
			let newTaskInfo = { ...state.taskInfo
			};
			state.taskInfo = null
			state.taskInfo = newTaskInfo
		},

		// 计算属性get()不同步时,强制刷新页面
		resSetTaskInfo(state) {
			let newTaskInfo = { ...state.taskInfo
			};
			state.taskInfo = null
			state.taskInfo = newTaskInfo
		},

		// 初始化store的数据
		reSetStore(state) {
			state.taskInfo = (({
				qualifications,
				qualName
			}) => ({
				qualifications,
				qualName
			}))(state.taskInfo)

			state.taskInfo = {
				taskStatus: 0,
				fileData: [],
				imgData: [],
				house: 0,
				totlet: 0,
				...state.taskInfo,
			}
		},

		editorTask(state, taskInfo) {
			if (!taskInfo.fileData) {
				taskInfo.fileData = []
			}
			if (!taskInfo.imgData) {
				taskInfo.imgData = []
			}
			state.taskInfo = taskInfo
		},
	},
	actions: {
		setStore({
			commit
		}) {
			return new Promise((resolve, reject) => {
				commit('reSetStore')
				resolve('succ')
				reject('error')
			})
		},

		editorTask({
			commit
		}, taskInfo) {
			return new Promise((resolve, reject) => {
				commit('editorTask', taskInfo)
				resolve('succ')
				reject('error')
			})
		}
	},
}

export default taskModules
