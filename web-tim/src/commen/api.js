
import util from 'ahaapi'
let api = {};
console.log('开始调用ctrl');
let baseUrl = 'http://192.168.1.168:8089/durian'

api.getUserSig = function(cnt, callback) {
	util.call(baseUrl + '/user/getUserSig', cnt, callback)
}

export default api
