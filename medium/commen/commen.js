/**  公共方法抽离文档*/

const commen = {}

// 时间戳转换为 YYYY-MM-DD
commen.getNewDate = (time) => {
	let newData = new Date(time)
	let y = newData.getFullYear()
	let m = newData.getMonth() * 1 + 1
	if (m < 10) {
		m = 0 + '' + m
	}
	let d = newData.getDate()
	if (d < 10) {
		d = 0 + '' + d
	}
	return `${y}-${m}-${d}`
}

commen.getFullDate = (time) => {
	let newData = new Date(time)
	return commen.dateTimeFliter(newData)
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
	let icon = plus.nativeObj.View.getViewById("icon");
	setTimeout(function() {
		icon.hide();
	}, 100);
}

commen.clearTabIcon = () => {
	let icon = plus.nativeObj.View.getViewById("icon");
	setTimeout(function() {
		icon.close();
	}, 100);
}

/**
 * @timestamp type:Unix时间戳
 * @return *未超过1年* -- '1年/月/周/天/小时/分钟前'  *超过1年* -- '2010-10-10'
 **/
commen.getTimeAgo = (timestamp) => {
	// 补全为13位
	var arrTimestamp = (timestamp + '').split('');
	for (var start = 0; start < 13; start++) {
		if (!arrTimestamp[start]) {
			arrTimestamp[start] = '0';
		}
	}
	timestamp = arrTimestamp.join('') * 1;
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - timestamp;

	// 如果本地时间反而小于变量时间
	if (diffValue < 0) {
		return '不久前';
	}
	// 计算差异时间的量级
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;

	// 数值补0方法
	var zero = function(value) {
		if (value < 10) {
			return '0' + value;
		}
		return value;
	};

	// 使用
	if (monthC > 4) {
		// 超过1年，直接显示年月日
		return (function() {
			var date = new Date(timestamp);
			return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate());
		})();
	} else if (monthC >= 1) {
		return parseInt(monthC) + "月前";
	} else if (weekC >= 1) {
		return parseInt(weekC) + "周前";
	} else if (dayC >= 1) {
		return parseInt(dayC) + "天前";
	} else if (hourC >= 1) {
		return parseInt(hourC) + "小时前";
	} else if (minC >= 1) {
		return parseInt(minC) + "分钟前";
	}
	return '刚刚';
}

/**@dateTimeFliter 转换格林日期时间格式为常用日期格式
 * @time[必填] 						Date  		格林日期格式
 * @part[可选,默认:0]				Number      选择返回日期时间部分  列:0:返回所有 1:只返回日期  2:只返回时间
 * @dateComplete[可选,默认:true] 	Boolean 	日期位数不足是否添0补齐:true:补齐,false:不补齐
 * @timeComplete[可选,默认:true] 	Boolean 	时间位数不足是否添0补齐:true:补齐,false:不补齐
 * @dateConnector[可选,默认:-] 		String 		年月日连接符  例: - : /
 * @timeConnector[可选,默认::] 		String 		时间连接符   例: - : /
 * @hour12[可选,默认:false]          Boolean     是否返回12小时制时间   例: true:返回12小时制时间   false:返回24小时制时间
 * @return   '2019-11-25 15:05:54'  String    返回示例
 * **/
commen.dateTimeFliter = function(time, part = 0, dateComplete = true, timeComplete = true, dateConnector = '-',
	timeConnector = ':', hour12 = false) {

	let year = time.getFullYear()
	let month = time.getMonth() + 1
	let day = time.getDate()
	let hour = time.getHours()
	let minute = time.getMinutes()
	let second = time.getSeconds()
	let dateStr = ''
	let timeStr = ''
	//转换日期
	if (dateComplete) { //添0补齐
		if (month < 10) {
			month = '0' + month
		}
		if (day < 10) {
			day = '0' + day
		}
	}
	dateStr = year + dateConnector + month + dateConnector + day
	//转换时间
	//修改小时制
	if (hour12) {
		if (hour > 12) {
			hour = hour - 12
			if (timeComplete) {
				if (hour < 10) {
					hour = '下午 ' + '0' + hour
				} else {
					hour = '下午 ' + hour
				}
			}
		} else {
			if (timeComplete) {
				if (hour < 10) {
					hour = '上午 ' + '0' + hour
				} else {
					hour = '上午 ' + hour
				}
			}
		}
	} else {
		if (hour < 10) {
			hour = 0 + '' + hour
		}
	}
	//判断分钟与秒
	if (timeComplete) { //添0补齐
		if (minute < 10) {
			minute = '0' + minute
		}
		if (second < 10) {
			second = '0' + second
		}
	}
	timeStr = hour + timeConnector + minute + timeConnector + second
	//合成输出值
	if (part == 0) {
		return dateStr + ' ' + timeStr
	} else if (part == 1) {
		return dateStr
	} else if (part == 2) {
		return timeStr
	}
	return '传参有误'
}


export default commen
