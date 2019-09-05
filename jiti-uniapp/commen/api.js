import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');

//身份证登录
api.loginByIdNumber = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByIdNumber', cnt, callback)
}

//正常登录
api.loginByMobileAndPwd = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByMobileAndPwd', cnt, callback)
}


//根据用户请求机构列表
api.getUserORGs = function (cnt,callback) {
    util.call(baseUrl+'/org/getUserORGs', cnt, callback)
}

//根据用户选择机构
api.loginInORG = function (cnt,callback) {
    util.call(baseUrl+'/org/loginInORG', cnt, callback)
}

/** 投票模块*/
//获取未投的投票列表
api.getNotVoteByUserRoles = function (cnt,callback) {
    util.call(baseUrl+'/vote/getNotVoteByUserRoles', cnt, callback)
}
//获取用户已投的投票列表
api.getVoteByUserRoles = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteByUserRoles', cnt, callback)
}
//获取全部投票列表
api.getVotes = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVotes', cnt, callback)
}
//投票详情-计算票数
api.getVoteDetail = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteDetail', cnt, callback)
}
//投票的选项列表
api.getVoteOptions = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteOptions', cnt, callback)
}
//获取用户的选票
api.getVoteTicket = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteTicket', cnt, callback)
}




export default api
