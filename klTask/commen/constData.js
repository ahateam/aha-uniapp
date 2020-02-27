/**  内部使用常量定义文档*/

const constData = {}

constData.oss = 'https://durian-file.oss-ap-southeast-2.aliyuncs.com/'

constData.module = 1190

constData.taskType = [{
		name: '全案助理',
		key: 0,
		img: '/static/image/icon/addTask/icon_qazl.png',
		src: './addTask/assistant'
	},
	{
		name: '翻译',
		key: 1,
		img: '/static/image/icon/addTask/icon_fy.png',
		src: './addTask/translate'
	},
	{
		name: '表格填写',
		key: 2,
		img: '/static/image/icon/addTask/icon_bgtx.png',
		src: './addTask/form'
	},
	{
		name: '撰写文书',
		key: 3,
		img: '/static/image/icon/addTask/icon_zxws.png',
		src: './addTask/document'
	},
	{
		name: '其他',
		key: 4,
		img: '/static/image/icon/addTask/icon_qt.png',
		src: './addTask/other'
	}
]

constData.codeType = [{
		key: 0,
		val: '登录'
	},
	{
		key: 1,
		val: '注册'
	},
	{
		key: 2,
		val: '重置密码'
	},
	{
		key: 3,
		val: '身份验证'
	}
]

constData.taskWall = [{
		key: 1,
		val: '等待领取',
		icon: '/static/image/icon/task/icon_cg.png'
	},
	{
		key: 2,
		val: '进行中',
		icon: '/static/image/icon/task/icon_cg.png'
	},
	{
		key: 6,
		val: '已成交',
		icon: '/static/image/icon/task/icon_cg.png'
	},
	{
		key: 11,
		val: '已撤销',
		icon: '/static/image/icon/task/icon_cg.png'
	}
]

constData.taskStatus = [{
		key: 0,
		val: '等待接收',
		icon: '/static/image/icon/task/icon_jxz.png'
	},
	{
		key: 1,
		val: '进行中',
		icon: '/static/image/icon/task/icon_jxz.png'
	},
	{
		key: 2,
		val: '未收款',
		icon: '/static/image/icon/task/icon_wfk.png'
	},
	{
		key: 3,
		val: '收款完成',
		icon: '/static/image/icon/task/icon_skwc.png'
	},
	{
		key: 4,
		val: '未完成,等待重新提交',
		icon: '/static/image/icon/task/icon_skwc.png'
	},
	{
		key: 5,
		val: '任务失败',
		icon: '/static/image/icon/task/icon_skwc.png'
	}, {
		key: 6,
		val: '报价未被接收,再接再厉哦',
		icon: '/static/image/icon/task/icon_skwc.png'
	},
]

constData.contractType = [{
		name: '普通合同',
		key: 0
	},
	{
		name: '留学合同',
		key: 1
	}
]

constData.TIM_TYPE = [{
		key: 1,
		value: 'TIM_C2C'
	},
	{
		key: 2,
		value: 'TIM_GROUP'
	},
	{
		key: 3,
		value: 'TIM_SYSTEM'
	}
]

constData.priceType = [{
		key: 0,
		value: '总价'
	},
	{
		key: 1,
		value: '按小时计费'
	}, {
		key: 2,
		value: '任务者报价'
	}
]
export default constData
