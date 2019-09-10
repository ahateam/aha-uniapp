import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');

/* get商品 */

//获取商品详细
api.getProduct = function(cnt, callback) {
	util.call(baseUrl + '/shop/getProduct', cnt, callback)
}

//获取商品列表
api.getProducts = function(cnt, callback) {
	util.call(baseUrl + '/shop/getProducts', cnt, callback)
}

//获得推荐商品详细 
api.getRecoProduct = function(cnt, callback) {
	util.call(baseUrl + '/shop/getRecoProduct', cnt, callback)
}

//推荐商品列表
api.getRecoProducts = function(cnt, callback) {
	util.call(baseUrl + '/shop/getRecoProducts', cnt, callback)
}

/* 获取地址 */
//get地址 
api.getAddress = function(cnt, callback) {
	util.call(baseUrl + '/shop/getAddress', cnt, callback)
}

//添加地址 
api.createAddress = function(cnt, callback) {
	util.call(baseUrl + '/shop/createAddress', cnt, callback)
}

/* 订单 */
// 下订单 
api.createOrder = function(cnt, callback) {
	util.call(baseUrl + '/shop/createOrder', cnt, callback)
}


export default api
