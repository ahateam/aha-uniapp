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
//投票接口
api.vote = function (cnt,callback) {
    util.call(baseUrl+'/vote/vote', cnt, callback)
}


/** 我的审批*/
api.getExamineByPer = function (cnt,callback) {
    util.call(baseUrl+'/org/getExamineByPer', cnt, callback)
}
//有审批权限的用户进行--分户审批
api.editExamine = function (cnt,callback) {
    util.call(baseUrl+'/org/editExamine', cnt, callback)
}
//有审批权限的用户进行--股权变更审批
api.examineShareCerNo = function (cnt,callback) {
    util.call(baseUrl+'/org/examineShareCerNo', cnt, callback)
}

/*我的分红*/
//获取机构的详细信息--获取每股分红金额
api.getORGById = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGById', cnt, callback)
}

/* 集体资产*/
//资产列表
api.queryAssets = function (cnt,callback) {
    util.call(baseUrl+'/asset/queryAssets', cnt, callback)
}
//获取机构下的所有的分组tree
api.getTagGroupTree = function (cnt,callback) {
    util.call(baseUrl+'/org/getTagGroupTree', cnt, callback)
}
//根据分组获取资产列表
api.getAssetsByGroups = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssetsByGroups', cnt, callback)
}
	
/*个人信息*/
//获取用户角色信息
api.getSysORGUserRoles = function (cnt,callback) {
    util.call(baseUrl+'/org/getSysORGUserRoles', cnt, callback)
}
//修改用户密码
api.editUserPassword = function (cnt,callback) {
    util.call(baseUrl+'/org/editUserPassword', cnt, callback)
}
//修改用户的（解绑/绑定）手机号
 api.editUserMobile = function (cnt,callback) {
     util.call(baseUrl+'/org/editUserMobile', cnt, callback)
 }
 
 
 /**公告信息*/
 //获取公告列表
api.getNoticeByRoleGroup = function (cnt,callback) {
     util.call(baseUrl+'/org/getNoticeByRoleGroup', cnt, callback)
 }
 
 
 /*创建投票*/
 //获取系统默认的职务 列表
 api.getSysORGUserRoles = function (cnt,callback) {
      util.call(baseUrl+'/org/getSysORGUserRoles', cnt, callback)
}
//创建投票
 api.createVote = function (cnt,callback) {
      util.call(baseUrl+'/vote/createVote', cnt, callback)
}
//修改投票
 api.editVote = function (cnt,callback) {
      util.call(baseUrl+'/vote/editVote', cnt, callback)
}
//获取选项列表
 api.getVoteOptions = function (cnt,callback) {
      util.call(baseUrl+'/vote/getVoteOptions', cnt, callback)
}
//新增选项列表
 api.addVoteOption = function (cnt,callback) {
      util.call(baseUrl+'/vote/addVoteOption', cnt, callback)
}
//删除投票选项
api.delVoteOption = function (cnt,callback) {
       util.call(baseUrl+'/vote/delVoteOption', cnt, callback)
 }
 
 //搜索成员-根据身份证号
api.getORGUsersLikeIDNumber = function (cnt,callback) {
       util.call(baseUrl+'/org/getORGUsersLikeIDNumber', cnt, callback)
 }
 //搜索成员-根据成员姓名
 api.getORGUsersLikeRealName = function (cnt,callback) {
        util.call(baseUrl+'/org/getORGUsersLikeRealName', cnt, callback)
  }
export default api
