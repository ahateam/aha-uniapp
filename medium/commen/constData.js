/**  内部使用常量定义文档*/

const constData = {}

constData.oss = 'http://durian-oss.oss-cn-hangzhou.aliyuncs.com'

constData.module = 1190

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

constData.goodsType = [{
		key: 0,
		val: '自由市场'
	},
	{
		key: 1,
		val: '平台兑换'
	},
	{
		key: 2,
		val: '平台卡片选中'
	}
]

constData.orderType = [{
		key: 0,
		val: '商品'
	},
	{
		key: 1,
		val: '打赏'
	},
	{
		key: 2,
		val: '任务'
	}
]

constData.taskStatus = [{
		key: 0,
		val: '已发布',
		icon: '/static/image/icon/task/icon_jxz.png'
	},
	{
		key: 1,
		val: '已接收',
		icon: '/static/image/icon/task/icon_yjs.png'
	},
	{
		key: 2,
		val: '进行中',
		icon: '/static/image/icon/task/icon_jxz.png'
	},
	{
		key: 3,
		val: '未付款',
		icon: '/static/image/icon/task/icon_wfk.png'
	},
	{
		key: 4,
		val: '收款完成',
		icon: '/static/image/icon/task/icon_skwc.png'
	}
]

export default constData
