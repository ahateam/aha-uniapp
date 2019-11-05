/** 后端接口对接文档*/

import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');

//内容列表 
api.getContentsByUser = function(cnt, callback) {
	util.call(baseUrl + '/kkqtUser/getContentsByUser', cnt, callback)
}

//发帖 
api.createPosting = function(cnt, callback) {
	util.call(baseUrl + '/kkqtPosting/createPosting', cnt, callback)
}

//帖子列表 
api.getPostingList = function(cnt, callback) {
	util.call(baseUrl + '/kkqtPosting/getPostingList', cnt, callback)
}

//帖子详情 
api.getPosting = function(cnt, callback) {
	util.call(baseUrl + '/kkqtPosting/getPosting', cnt, callback)
}

//获取评论 
api.getReplys = function(cnt, callback) {
	util.call(baseUrl + '/kkqtPosting/getReplys', cnt, callback)
}

//分享 
api.createUserShare = function(cnt, callback) {
	util.call(baseUrl + '/kkqtPosting/createUserShare', cnt, callback)
}



export default api