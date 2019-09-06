import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');

/********************************** 内容接口 **********************************/
// 获取标签<创建内容，保存为正常（已发布）>

api.getContentTag = function(cnt, callback) {
	util.call(baseUrl + '/contentTag/getContentTag', cnt, callback)
}

//根据标签获取 内容列表
api.getContents = function(cnt, callback) {
	util.call(baseUrl + '/content/getContents', cnt, callback)
}
	
//根据id获取内容
api.getContentById = function(cnt, callback) {
	util.call(baseUrl + '/content/getConntent', cnt, callback)
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
	util.call(baseUrl + '/channel/getChannels', cnt, callback)
}

//根据专栏id获取专栏 
api.getChannlById = function(cnt, callback) {
	util.call(baseUrl + '/channel/getChannlById', cnt, callback)
}

//获取专栏下内容 
api.getContentByChannelId = function(cnt, callback) {
	util.call(baseUrl + '/channel/getContentByChannelId', cnt, callback)
}

//根据专栏id获取专栏内容标签(channlContentTag)
api.getChannlContentTagByChannelId = function(cnt, callback) {
	util.call(baseUrl + '/channel/getChannlContentTagByChannelId', cnt, callback)
}
/********************* 任务接口 ******************************/ 
//获取任务分类导航列表 
api.getContentTagGroupTypes = function(cnt, callback) {
	util.call(baseUrl + '/content/getContentTagGroupTypes', cnt, callback)
}

//获取任务列表 
api.getTask = function(cnt, callback) {
	util.call(baseUrl + '/content/getTask', cnt, callback)
}

//获取本地任务
api.getTaskByGeo = function(cnt, callback) {
	util.call(baseUrl + '/content/getTaskByGeo', cnt, callback)
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
	util.call(baseUrl + '/appraise/createAppraise', cnt, callback)
}

//获取点赞数量 
api.getAppraiseCount = function(cnt, callback) {
	util.call(baseUrl + '/appraise/getAppraiseCount', cnt, callback)
}

//获取评论列表 
api.getCommentByContentId = function(cnt, callback) {
	util.call(baseUrl + '/reply/getReplyList', cnt, callback)
}

//评论 
api.createComment = function(cnt, callback) {
	util.call(baseUrl + '/reply/createReply', cnt, callback)
}
/* ***********************************模板相关 */
//获取模板列表 
api.getTemplate = function(cnt, callback) {
	util.call(baseUrl + '/content/getTemplate', cnt, callback)
}
export default api
