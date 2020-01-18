/** 本地存储变量*/
// userInfo       登录后的用户信息


/**  内部使用常量定义文档*/

const constData = {}

constData.oss = 'http://durian-file.oss-ap-southeast-2.aliyuncs.com/'

constData.ossClip = '?spm=a2c4g.11186623.2.9.73b7218cJYI9Vf&x-oss-process=video/snapshot,t_3000,f_jpg,w_0,h_0,m_fast'

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
	},
	{
		key: 4,
		val: '分享'
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
		key: -1,
		val: '平台卡片选中'
	}
]

/* 订单 */
//订单类型
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
//订单状态
constData.orderStatus = [{
		key: 0,
		val: '待发货'
	},
	{
		key: 1,
		val: '已发货'
	}, {
		key: 2,
		val: '已收货'
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

constData.shareType = [{
		key: 0,
		value: '代理人分享',
		img: '/static/image/share/0.png'
	},
	{
		key: 1,
		value: '热点文章分享',
		img: '/static/image/share/1.png'
	},
	{
		key: 2,
		value: '校内校外帖子分享',
		img: '/static/image/share/2.png'
	},
	{
		key: 3,
		value: '购买自由商品分享',
		img: '/static/image/share/3.png'
	},
	{
		key: 4,
		value: '购买平台商品分享',
		img: '/static/image/share/4.png'
	},
	{
		key: 5,
		value: '签约成功分享',
		img: '/static/image/share/5.png'
	},
	{
		key: 6,
		value: '获得签证分享',
		img: '/static/image/share/6.png'
	},
	{
		key: 7,
		value: '发布商品分享',
		img: '/static/image/share/7.png'
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

export default constData
