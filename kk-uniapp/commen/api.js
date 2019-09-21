import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');

//获取版本 
api.getVersionStatus = function(cnt, callback) {
	util.call(baseUrl + '/task/getVersionStatus', cnt, callback)
}

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
//获取任务墙任务列表 
api.getHomeTasks = function(cnt, callback) {
	util.call(baseUrl + '/task/getHomeTasks', cnt, callback)
}

//获取任务列表 
api.getTasks = function(cnt, callback) {
	util.call(baseUrl + '/task/getTasks', cnt, callback)
}

//获取任务 
api.getTask = function(cnt, callback) {
	util.call(baseUrl + '/task/getTask', cnt, callback)
}

//获取接取的任务 
api.getUserTask = function(cnt, callback) {
	util.call(baseUrl + '/task/getUserTask', cnt, callback)
}

//创建任务 
api.createTask = function(cnt, callback) {
	util.call(baseUrl + '/task/createTask', cnt, callback)
}

//接取任务（创建接单  
api.createTaskApply = function(cnt, callback) {
	util.call(baseUrl + '/task/createTaskApply', cnt, callback)
}

//接任务过审 
api.TaskApplyConfirm = function(cnt, callback) {
	util.call(baseUrl + '/task/TaskApplyConfirm', cnt, callback)
}

//获取任务下接单列表 
api.getTaskApplys = function(cnt, callback) {
	util.call(baseUrl + '/task/getTaskApplys', cnt, callback)
}

//获取接单者详情
api.getTaskApply = function(cnt, callback) {
	util.call(baseUrl + '/task/getTaskApply', cnt, callback)
}

//上传任务作品 
api.editApplyTaskData = function(cnt, callback) {
	util.call(baseUrl + '/task/editApplyTaskData', cnt, callback)
}

//<选择作品是否满意（true：满意，false：不满意）>
api.editApplyWorks = function(cnt, callback) {
	util.call(baseUrl + '/task/editApplyWorks', cnt, callback)
}
/************************ 用户相关接口 **************************/
//根据id获取用户
api.getUserById = function(cnt, callback) {
	util.call(baseUrl + '/weixin/getUserById', cnt, callback)
}

//微信获取用户openid
api.getAccessToken = function(cnt, callback) {
	util.call(baseUrl + '/weixin/getAccessToken', cnt, callback)
}
//微信登录 
api.loginByWxOpenId = function(cnt, callback) {
	util.call(baseUrl + '/weixin/loginByWxOpenId', cnt, callback)
}

//头条获取openid  
api.ttGetSessionkey = function(cnt, callback) {
	util.call(baseUrl + '/otherLogin/ttGetSessionkey', cnt, callback)
}

//头条登录
api.loginByTtOpenId = function(cnt, callback) {
	util.call(baseUrl + '/otherLogin/loginByTtOpenId', cnt, callback)
}

//支付宝获取openid 
api.alipayGetSessionkey = function(cnt, callback) {
	util.call(baseUrl + '/otherLogin/alipayGetSessionkey', cnt, callback)
}

//支付宝登录
api.loginByAlipayOpenId = function(cnt, callback) {
	util.call(baseUrl + '/otherLogin/loginByAlipayOpenId', cnt, callback)
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
/************************************模板相关 */
//获取模板列表 
api.getTemplates = function(cnt, callback) {
	util.call(baseUrl + '/task/getTemplates', cnt, callback)
}

//获取模板
api.getTemplate = function(cnt, callback) {
	util.call(baseUrl + '/task/getTemplate', cnt, callback)
}
export default api
