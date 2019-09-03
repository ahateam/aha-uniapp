import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');

/********************************** 内容接口 **********************************/
// <创建内容，保存为正常（已发布）>
api.getTags = function(cnt, callback) {
	util.call(baseUrl + '/content/getTags', cnt, callback)
}

//根据标签获取 内容列表
api.getContents = function(cnt, callback) {
	util.call(baseUrl + '/content/getContents', cnt, callback)
}
	
//根据id获取内容
api.getContentById = function(cnt, callback) {
	util.call(baseUrl + '/content/getContentById', cnt, callback)
}

// <获取发布类型> 
api.returnTabBar = function(cnt, callback) {
	util.call(baseUrl + '/content/returnTabBar', cnt, callback)
}

//添加内容 
api.addContent = function(cnt, callback) {
	util.call(baseUrl + '/content/addContent', cnt, callback)
}

/********************* 专栏接口 ******************************/ 
//获取专栏列表 
api.getChannel = function(cnt, callback) {
	util.call(baseUrl + '/content/getChannel', cnt, callback)
}

//获取专栏下内容 
api.getContentByChannelId = function(cnt, callback) {
	util.call(baseUrl + '/content/getContentByChannelId', cnt, callback)
}

/************************ 用户相关接口 **************************/
//根据id获取用户
api.getUserById = function(cnt, callback) {
	util.call(baseUrl + '/content/getUserById', cnt, callback)
}

//获取用户openid
api.getAccessToken = function(cnt, callback) {
	util.call(baseUrl + '/wxOa/getAccessToken', cnt, callback)
}
//登录 
api.loginByWxOpenId = function(cnt, callback) {
	util.call(baseUrl + '/content/loginByWxOpenId', cnt, callback)
}

/*************************************** 点赞评论接口 ********************************************/
//点赞 
api.createUpvote = function(cnt, callback) {
	util.call(baseUrl + '/content/createUpvote', cnt, callback)
}

//获取评论列表 
api.getCommentByContentId = function(cnt, callback) {
	util.call(baseUrl + '/content/getCommentByContentId', cnt, callback)
}

//评论 
api.createComment = function(cnt, callback) {
	util.call(baseUrl + '/content/createComment', cnt, callback)
}

export default api
