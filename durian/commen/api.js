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
	util.call(baseUrl + '/posting/getReplyList', cnt, callback)
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


export default api