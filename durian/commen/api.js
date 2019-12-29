/** 后端接口对接文档*/

import util from 'ahaapi'
import url from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';
let baseUrl = url.baseUrl
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
api.getReplys = function(cnt, callback) {
	util.call(baseUrl + '/posting/getReplys', cnt, callback)
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

// 创建密信 
api.createSecretLetter = function(cnt, callback) {
	util.call(baseUrl + '/secret/createSecretLetter', cnt, callback)
}

// 获取密信 
api.getSecretLetter = function(cnt, callback) {
	util.call(baseUrl + '/secret/getSecretLetter', cnt, callback)
}

// 创建收藏 
api.createUserFavorite = function(cnt, callback) {
	util.call(baseUrl + '/posting/createUserFavorite', cnt, callback)
}

// 取消收藏 
api.delUserFavorite = function(cnt, callback) {
	util.call(baseUrl + '/posting/delUserFavorite', cnt, callback)
}

// 获取收藏列表
api.getUserFavoriteList = function(cnt, callback) {
	util.call(baseUrl + '/posting/getUserFavoriteList', cnt, callback)
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

/* 兴趣 */
//设置用户兴趣 
api.setUserInterest = function(cnt, callback) {
	util.call(baseUrl + '/user/setUserInterest', cnt, callback)
}

/* 用户相关 */
// 修改用户资料 
api.updateUser = function(cnt, callback) {
	util.call(baseUrl + '/user/updateUser', cnt, callback)
}

/* 商城 */
// 商城页商品列表 
api.getGoods = function(cnt, callback) {
	util.call(baseUrl + '/goods/getGoods', cnt, callback)
}

// 查询商品 
api.getGoodsList = function(cnt, callback) {
	util.call(baseUrl + '/goods/getGoodsList', cnt, callback)
}

// 商品id获取商品 
api.getByGoodId = function(cnt, callback) {
	util.call(baseUrl + '/goods/getByGoodId', cnt, callback)
}

// 根据商品名字获取商品 
api.getByGoodsName = function(cnt, callback) {
	util.call(baseUrl + '/goods/getByGoodsName', cnt, callback)
}


// 发布商品 
api.createGoods = function(cnt, callback) {
	util.call(baseUrl + '/goods/createGoods', cnt, callback)
}

// 下订单 
api.createDurianOrder = function(cnt, callback) {
	util.call(baseUrl + '/goods/createDurianOrder', cnt, callback)
}

// 根据买家id查询订单
api.getOrderByBuyerId = function(cnt, callback) {
	util.call(baseUrl + '/goods/getOrderByBuyerId', cnt, callback)
}

// 根据卖家id查询订单
api.getOrderBySellerId = function(cnt, callback) {
	util.call(baseUrl + '/goods/getOrderBySellerId', cnt, callback)
}

// 根据订单id查询订单
api.getOrderByOrderId = function(cnt, callback) {
	util.call(baseUrl + '/goods/getOrderByOrderId', cnt, callback)
}

// 根据商品id查询订单 
api.getOrderByContractId = function(cnt, callback) {
	util.call(baseUrl + '/goods/getOrderByContractId', cnt, callback)
}

//  修改订单状态 
api.setOrderStatus = function(cnt, callback) {
	util.call(baseUrl + '/goods/setOrderStatus', cnt, callback)
}

// 兑换商品 
api.exchangeGoods = function(cnt, callback) {
	util.call(baseUrl + '/goods/exchangeGoods', cnt, callback)
}

// 创建收货地址 
api.createReceivingAddress = function(cnt, callback) {
	util.call(baseUrl + '/goods/createReceivingAddress', cnt, callback)
}

// 修改收货地址 
api.editReceivingAddressById = function(cnt, callback) {
	util.call(baseUrl + '/goods/editReceivingAddressById', cnt, callback)
}

// 查询地址列表 
api.getReceivingAddressListByUserId = function(cnt, callback) {
	util.call(baseUrl + '/goods/getReceivingAddressListByUserId', cnt, callback)
}

// 根据地址id查询地址  
api.getReceivingAddressById = function(cnt, callback) {
	util.call(baseUrl + '/goods/getReceivingAddressById', cnt, callback)
}

/* 商城end */

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


/* 合同  */
// 获取合同列表 
api.getContractList = function(cnt, callback) {
	util.call(baseUrl + '/contract/getContractList', cnt, callback)
}
// 根据合同获取任务 
api.getTaskByContractId = function(cnt, callback) {
	util.call(baseUrl + '/task/getTaskByContractId', cnt, callback)
}

// 根据任务id查询完成记录 
api.getChangeRecordList = function(cnt, callback) {
	util.call(baseUrl + '/task/getChangeRecordList', cnt, callback)
}
export default api
