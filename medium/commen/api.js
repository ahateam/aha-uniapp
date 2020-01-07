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
api.getTaskList = function(cnt, callback) {
	util.call(baseUrl + '/task/getTaskList', cnt, callback)
}

// 根据id查询任务 
api.findByTaskId = function(cnt, callback) {
	util.call(baseUrl + '/task/findByTaskId', cnt, callback)
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
	util.call(baseUrl + '/task/createTask', cnt, callback)
}

// 接取任务 
api.acceptTask = function(cnt, callback) {
	util.call(baseUrl + '/task/acceptTask', cnt, callback)
}

// 修改任务 
api.updateTaskByTaskId = function(cnt, callback) {
	util.call(baseUrl + '/task/updateTaskByTaskId', cnt, callback)
}

// 删除任务 
api.deletDurianTaskByTaskId = function(cnt, callback) {
	util.call(baseUrl + '/task/deletDurianTaskByTaskId', cnt, callback)
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

export default api
