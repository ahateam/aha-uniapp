/** 后端接口对接文档*/

import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');

//发帖 
api.createPosting = function(cnt, callback) {
	util.call(baseUrl + '/posting/createPosting', cnt, callback)
}

//帖子列表 
api.getPostingList = function(cnt, callback) {
	util.call(baseUrl + '/posting/getPostingList', cnt, callback)
}

//帖子详情 
api.getPosting = function(cnt, callback) {
	util.call(baseUrl + '/posting/getPosting', cnt, callback)
}

//获取评论 
api.getReplyList = function(cnt, callback) {
	util.call(baseUrl + '/reply/getReplyList', cnt, callback)
}

//分享 
api.createUserShare = function(cnt, callback) {
	util.call(baseUrl + '/posting/createUserShare', cnt, callback)
}

//创建二级回复 
api.createComment = function(cnt, callback) {
	util.call(baseUrl + '/reply/createComment', cnt, callback)
}

//创建回复 
api.createReply = function(cnt, callback) {
	util.call(baseUrl + '/reply/createReply', cnt, callback)
}

// 创建收藏 
api.createUserFavorite = function(cnt, callback) {
	util.call(baseUrl + '/posting/createUserFavorite', cnt, callback)
}

// 取消收藏 
api.delUserFavorite = function(cnt, callback) {
	util.call(baseUrl + '/posting/delUserFavorite', cnt, callback)
}

/** 赞 */
//内容点赞 
api.createAppraise = function(cnt, callback) {
	util.call(baseUrl + '/appraise/createAppraise', cnt, callback)
}

//取消赞 
api.delAppraise = function(cnt, callback) {
	util.call(baseUrl + '/appraise/delAppraise', cnt, callback)
}

/* 登录 */
// 发送验证码
api.sendSms = function(cnt, callback) {
	util.call(baseUrl + '/user/sendSms', cnt, callback)
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

/* 兴趣 */
 //设置用户兴趣 
 api.setUserInterest = function(cnt, callback) {
 	util.call(baseUrl + '/user/setUserInterest', cnt, callback)
 }
export default api
