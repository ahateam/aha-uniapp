/** 本地存储变量*/
// userInfo       登录后的用户信息


/**  内部使用常量定义文档*/

const constData = {}

constData.oss = 'https://durian-file.oss-ap-southeast-2.aliyuncs.com/'

constData.module = 1190


constData.groupType = [{
		key: 0,
		val: '纯文本'
	},
	{
		key: 1,
		val: '图文'
	},
	{
		key: 2,
		val: '音频'
	},
	{
		key: 3,
		val: '视频'
	}
]

constData.appraise = [{
		key: 0,
		val: '赞'
	},
	{
		key: 1,
		val: '踩'
	}
]

constData.codeType = [{
		key: '0',
		val: '登录'
	},
	{
		key: '1',
		val: '注册'
	},
	{
		key: '2',
		val: '重置密码'
	},
	{
		key: '3',
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

/**咨询类型 */
constData.consultType = [{
		id: 1,
		title: '升学转学'
	},
	{
		id: 2,
		title: '留学'
	},
	{
		id: 3,
		title: '移民'
	},
	{
		id: 4,
		title: '陪读'
	},
	{
		id: 5,
		title: '工作'
	},
	{
		id: 6,
		title: '短期培训'
	},
	{
		id: 7,
		title: '投资'
	},
	{
		id: 8,
		title: '探亲旅游'
	},
	{
		id: 9,
		title: '商务考察'
	},
	{
		id: 10,
		title: '其他'
	},
]

// 任务可见状态
constData.postingStatus = [{
		key: 0,
		val: '公开'
	},
	{
		key: 1,
		val: '仅校内可见'
	},
	{
		key: 2,
		val: '仅校外可见'
	}
]

export default constData
