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

/* 任务相关 */
// 查詢任務 
api.getTaskList = function(cnt, callback) {
	util.call(baseUrl + '/task/getTaskList', cnt, callback)
}

// 发布任务
api.createTask = function(cnt, callback) {
	util.call(baseUrl + '/task/createTask', cnt, callback)
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
export default api
