/**  公共方法抽离文档*/

const commen = {}

commen.getNewDate = (time) => {
	let newData = new Date(time)
	let y = newData.getFullYear()
	let m = newData.getMonth() * 1 + 1
	let d = newData.getDate()
	return `${y}-${m}-${d}`
}

export default commen
