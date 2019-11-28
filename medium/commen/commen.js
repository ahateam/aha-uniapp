/**  公共方法抽离文档*/

const commen = {}

commen.getNewDate = (time) => {
	let newData = new Date(time)
	let y = newData.getFullYear()
	let m = newData.getMonth() * 1 + 1
	let d = newData.getDate()
	return `${y}-${m}-${d}`
}

commen.showTabIcon = () => {
	// #ifdef APP-PLUS
	let icon = plus.nativeObj.View.getViewById("icon");
	if (icon) {
		setTimeout(function() {
			icon.show();
		}, 100)
	}
	// #endif
}

commen.hiddenTabIcon = () => {
	// #ifdef APP-PLUS
	let icon = plus.nativeObj.View.getViewById("icon");
	setTimeout(function() {
		icon.hide();
	}, 100);
	// #endif
}

export default commen
