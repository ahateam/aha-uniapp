import Vue from 'vue'
import Vuex from 'vuex'
import conversation from './modules/conversation'
import group from './modules/group'
import user from './modules/user'
import friend from './modules/friend'
import blacklist from './modules/blacklist'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		current: Date.now(), // 当前时间
		intervalID: 0,
		message: undefined,
		taskInfo: {
			taskStatus: 0,
			fileData: [],
			imgData: [],
			qualifications: '',
			qualName: '',
		}, //任务信息
		qualiList: [], //资质列表

	},
	mutations: {
		// 任务标题
		updateTitle(state, taskName) {
			state.taskInfo.taskName = taskName
		},
		// 任务类型
		updateType(state, taskType) {
			state.taskInfo.taskType = taskType
		},

		// （表格、文书）具体类别
		updateCategory(state, taskCategory) {
			state.taskInfo.taskCategory = taskCategory
		},

		// 任务所需资质
		updateQualifications(state, item) {
			state.taskInfo.qualifications = item.qualId
			state.taskInfo.qualName = item.qualName
		},
		// 申请人数
		updateApplyNumber(state, applyNumber) {
			state.taskInfo.applyNumber = applyNumber
		},
		// 主申请人国籍
		updateApplicantNationality(state, applicantNationality) {
			state.taskInfo.applicantNationality = applicantNationality
		},
		// 主申请人年龄
		updateApplicantAge(state, applicantAge) {
			state.taskInfo.applicantAge = applicantAge
		},
		// 任务描述
		updateTaskDescribe(state, taskDescribe) {
			state.taskInfo.taskDescribe = taskDescribe
		},
		// 其他说明 
		updateOtherDescribe(state, otherDescribe) {
			state.taskInfo.otherDescribe = otherDescribe
		},
		//   低于18岁副申请人人数
		updateViceApplicantAge(state, viceApplicantAge) {
			state.taskInfo.viceApplicantAge = viceApplicantAge
		},
		// (翻译)页数 
		updatePageNumber(state, pageNumber) {
			state.taskInfo.pageNumber = pageNumber
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
			state.taskInfo.fileData.splice(index, 1)
		},

		// 任务金额
		updatePayPrice(state, taskBudget) {
			state.taskInfo.taskBudget = taskBudget
		},

		// 任务完成时间 
		updateFinishDate(state, finishDate) {
			state.taskInfo.finishDate = finishDate
		},

		// 计算属性get()不同步时,强制刷新页面
		resSetTaskInfo(state) {
			let newTaskInfo = { ...state.taskInfo
			};
			state.taskInfo = null
			state.taskInfo = newTaskInfo
		},

		// 获取资质列表
		updateQualList(state, list) {
			state.qualiList = list
			state.taskInfo.qualifications = list[0].qualId
			state.taskInfo.qualName = list[0].qualName
			let obj = {
				qualId: '',
				qualName: '不需要',
			}
			state.qualiList.push(obj)
		},

		// 翻译任务原语种 
		updateOldLanguage(state, oldLanguage) {
			state.taskInfo.oldLanguage = oldLanguage
		},

		updateNewLanguage(state, newLanguage) {
			state.taskInfo.newLanguage = newLanguage
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
				...state.taskInfo
			}
		},

		//tim
		startComputeCurrent(state) {
			state.intervalID = setInterval(() => {
				state.current = Date.now()
			}, 1000)
		},
		stopComputeCurrent(state) {
			clearInterval(state.intervalID)
			state.intervalID = 0
		},
		showMessage(state, options) {
			if (state.message) {
				state.message.close()
			}
			state.message = Message({
				message: options.message,
				type: options.type || 'success',
				duration: options.duration || 2000,
				offset: 40
			})
		}
	},
	modules: {
		conversation,
		group,
		friend,
		blacklist,
		user
	}

})
