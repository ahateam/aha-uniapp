/** 后端接口对接文档*/

import util from 'ahaapi'
import url from './url'

let baseUrl = url.baseUrl
let api = {};
console.log('开始调用ctrl');

/* 登录 */
// 发送验证码
api.sendSms = function(cnt, callback) {
	util.call(baseUrl + '/user/sendSms', cnt, callback)
}

// 密码 
api.login = function(cnt, callback) {
	util.call(baseUrl + '/user/login', cnt, callback)
}

//绑定手机号
api.bindingPhone = function(cnt, callback) {
	util.call(baseUrl + '/user/bindingPhone', cnt, callback)
}

// 验证码登录 
api.loginByCode = function(cnt, callback) {
	util.call(baseUrl + '/user/loginByCode', cnt, callback)
}

// 微信登录 
api.wxLogin = function(cnt, callback) {
	util.call(baseUrl + '/user/wxLogin', cnt, callback)
}

// 设置密码 
api.setPwd = function(cnt, callback) {
	util.call(baseUrl + '/user/setPwd', cnt, callback)
}

// 验证码设置密码 
api.forgetPwd = function(cnt, callback) {
	util.call(baseUrl + '/user/forgetPwd', cnt, callback)
}

/* 用户相关 */
// 修改用户资料 
api.updateUser = function(cnt, callback) {
	util.call(baseUrl + '/user/updateUser', cnt, callback)
}

// 修改用户收款账户信息 
api.editUserAccountById = function(cnt, callback) {
	util.call(baseUrl + '/user/editUserAccountById', cnt, callback)
}

// 获取用户平台币 
api.getUserCurrency = function(cnt, callback) {
	util.call(baseUrl + '/user/getUserCurrency', cnt, callback)
}

// 查询用户支出金额 
api.getMyExpenditure = function(cnt, callback) {
	util.call(baseUrl + '/task/getMyExpenditure', cnt, callback)
}

// 查询用户收入金额
api.getMyIncome = function(cnt, callback) {
	util.call(baseUrl + '/task/getMyIncome', cnt, callback)
}

/* 任务相关 */
// 查詢任務 
api.getTasks = function(cnt, callback) {
	util.call(baseUrl + '/cltask/getTasks', cnt, callback)
}

// 查询已接任务 
api.getUserTask = function(cnt, callback) {
	util.call(baseUrl + '/cltask/getUserTask', cnt, callback)
}

// 根据id查询任务 
api.getTask = function(cnt, callback) {
	util.call(baseUrl + '/cltask/getTask', cnt, callback)
}

// 撤销任务 
api.revokeTask = function(cnt, callback) {
	util.call(baseUrl + '/cltask/revokeTask', cnt, callback)
}

// 查询报价列表 
api.getTaskApplys = function(cnt, callback) {
	util.call(baseUrl + '/cltask/getTaskApplys', cnt, callback)
}

// 查寻订单详情 
api.getTaskApply = function(cnt, callback) {
	util.call(baseUrl + '/cltask/getTaskApply', cnt, callback)
}

// 通过报价 
api.TaskApplyConfirm = function(cnt, callback) {
	util.call(baseUrl + '/cltask/TaskApplyConfirm', cnt, callback)
}

// 上传作品 	
api.editApplyTaskData = function(cnt, callback) {
	util.call(baseUrl + '/cltask/editApplyTaskData', cnt, callback)
}

// 任务是否满意 
api.editApplyWorks = function(cnt, callback) {
	util.call(baseUrl + '/cltask/editApplyWorks', cnt, callback)
}

// 根据id查询任务(附带用户信息) 
api.getUserByTaskId = function(cnt, callback) {
	util.call(baseUrl + '/task/getUserByTaskId', cnt, callback)
}

// 任务总览
api.getAllTask = function(cnt, callback) {
	util.call(baseUrl + '/task/getAllTask', cnt, callback)
}

//  任务浏览记录 
api.getBrowsingHistoryList = function(cnt, callback) {
	util.call(baseUrl + '/task/getBrowsingHistoryList', cnt, callback)
}

// 任务完成记录
api.getChangeRecordList = function(cnt, callback) {
	util.call(baseUrl + '/task/getChangeRecordList', cnt, callback)
}

// 撤回任务 
api.withdrawTask = function(cnt, callback) {
	util.call(baseUrl + '/task/withdrawTask', cnt, callback)
}

// 发布任务
api.createTask = function(cnt, callback) {
	util.call(baseUrl + '/cltask/createTask', cnt, callback)
}

// 接取任务 
api.createTaskApply = function(cnt, callback) {
	util.call(baseUrl + '/cltask/createTaskApply', cnt, callback)
}

// 修改任务 
api.updateTaskByTaskId = function(cnt, callback) {
	util.call(baseUrl + '/task/updateTaskByTaskId', cnt, callback)
}

// 删除任务 
api.deletDurianTaskByTaskId = function(cnt, callback) {
	util.call(baseUrl + '/task/deletDurianTaskByTaskId', cnt, callback)
}

// 查询任务标签列表(所有标签) 
api.getTaskTags = function(cnt, callback) {
	util.call(baseUrl + '/cltask/getTaskTags', cnt, callback)
}

// 查询语种 
api.getLanguage = function(cnt, callback) {
	util.call(baseUrl + '/task/getLanguage', cnt, callback)
}

// 查询资质 
api.getByQualId = function(cnt, callback) {
	util.call(baseUrl + '/task/getByQualId', cnt, callback)
}

/*tim 聊天*/
//获取用户tim聊天的userSig	
api.getUserSig = function(cnt, callback) {
	util.call(baseUrl + '/user/getUserSig', cnt, callback)
}
//随机获取一个中介用户信息
api.getUserInter = function(cnt, callback) {
	util.call(baseUrl + '/user/getUserInter', cnt, callback)
}
//根据用户id获取用户详细信息
api.getUserInfo = function(cnt, callback) {
	util.call(baseUrl + '/user/getUserInfo', cnt, callback)
}

// 合同
// 创建合同 
api.createContract = function(cnt, callback) {
	util.call(baseUrl + '/contract/createContract', cnt, callback)
}

// 生成pdf 
api.setpPDF = function(cnt, callback) {
	util.call(baseUrl + '/contract/setpPDF', cnt, callback)
}

/* 帮助中心 */
// 帮助中心列表 
api.getAutoReplyList = function(cnt, callback) {
	util.call(baseUrl + '/help/getAutoReplyList', cnt, callback)
}

// 根据id查帮助文案 
api.getAutoReply = function(cnt, callback) {
	util.call(baseUrl + '/help/getAutoReply', cnt, callback)
}

/* 订单 */
// 创建订单 
api.createDurianOrder = function(cnt, callback) {
	util.call(baseUrl + '/goods/createDurianOrder', cnt, callback)
}

/* 评论 */
// 评论列表 
api.getReplys = function(cnt, callback) {
	util.call(baseUrl + '/posting/getReplys', cnt, callback)
}

// 一级评论 
api.createReply = function(cnt, callback) {
	util.call(baseUrl + '/reply/createReply', cnt, callback)
}

/* 评价 */
// 获取用户评价 
api.getEvaluateList = function(cnt, callback) {
	util.call(baseUrl + '/evaluate/getEvaluateList', cnt, callback)
}

/* 文件 */
 // 上传文件 
 api.uploadFile = function(cnt, callback) {
 	util.call(baseUrl + '/cltask/uploadFile', cnt, callback)
 }
export default api