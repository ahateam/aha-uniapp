import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		taskInfo: {
			taskStatus: 0,
			fileData: [],
			imgData: [],
			qualifications: 'MARN号'
		},
	},
	mutations: {
		// 任务标题
		updateTitle(state, taskName) {
			state.taskInfo.taskName = taskName
		},
		// 任务类型
		updataType(state, taskTypeId) {
			state.taskInfo.taskTypeId = taskTypeId
			console.log(state)
		},
		// 任务所需资质
		updataQualifications(state, qualifications) {
			state.taskInfo.qualifications = qualifications
		},
		// 申请人数
		updataApplyNumber(state, applyNumber) {
			state.taskInfo.applyNumber = applyNumber
		},
		// 主申请人国籍
		updataApplicantNationality(state, applicantNationality) {
			state.taskInfo.applicantNationality = applicantNationality
		},
		// 主申请人年龄
		updataApplicantAge(state, applicantAge) {
			state.taskInfo.applicantAge = applicantAge
		},
		// 任务描述
		updataTaskDescribe(state, taskDescribe) {
			state.taskInfo.taskDescribe = taskDescribe
		},
		// 其他说明 
		updataOtherDescribe(state, otherDescribe) {
			state.taskInfo.otherDescribe = otherDescribe
		},
		//   低于18岁副申请人人数
		updataViceApplicantAge(state, viceApplicantAge) {
			state.taskInfo.viceApplicantAge = viceApplicantAge
		},
		// (翻译)页数 
		updataPageNumber(state, pageNumber) {
			state.taskInfo.pageNumber = pageNumber
		},
		// 内容 
		updataTaskcontent(state, Taskcontent) {
			state.taskInfo.Taskcontent = Taskcontent
		},
		// 上传文件
		updataFileData(state, file) {
			state.taskInfo.fileData.push(file)
		},

		//删除文件
		delFileData(state, index) {
			state.taskInfo.fileData.splice(index, 1)
		},

		// 上传图片
		updataImgData(state, img) {
			state.taskInfo.imgData.push(img)
		},

		//删除图片
		delImgData(state, index) {
			state.taskInfo.fileData.splice(index, 1)
		},

		// 任务金额
		updataPayPrice(state, payPrice) {
			state.taskInfo.payPrice = payPrice
		},

		// 任务完成时间 
		updataFinishDate(state, finishDate) {
			state.taskInfo.finishDate = finishDate
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
			state.taskInfo = {
				taskStatus: 0,
				fileData: [],
				imgData: [],
				qualifications: 'MARN号'
			}
		}
	},

})
