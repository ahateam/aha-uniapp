/**  公共方法抽离文档*/
import api from './api';

const commen = {}

commen.getNewDate = (time) => {
	let newData = new Date(time)
	let y = newData.getFullYear()
	let m = newData.getMonth() * 1 + 1
	let d = newData.getDate()
	return `${y}-${m}-${d}`
}

/*获取用户相信信息*/


export default commen
