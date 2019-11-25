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

export default api
