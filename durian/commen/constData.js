/**  内部使用常量定义文档*/

const constData = {}

constData.oss = 'http://durian-oss.oss-cn-hangzhou.aliyuncs.com'

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
	
constData.appraise = [
	{
		key:0,
		val:'赞'
	},
	{
		key:1,
		val:'踩'
	}
]

constData.codeType = [
	{
		key:0,
		val:'登录'
	},
	{
		key:1,
		val:'注册'
	},
	{
		key:2,
		val:'重置密码'
	},
	{
		key:3,
		val:'身份验证'
	}
]

constData.goodsType = [
	{
		key:0,
		val:'自由市场'
	},
	{
		key:1,
		val:'平台兑换'
	},
	{
		key:2,
		val:'平台卡片选中'
	}
]

constData.orderType = [
	{
		key:0,
		val:'商品'
	},
	{
		key:1,
		val:'打赏'
	},
	{
		key:2,
		val:'任务'
	}
]

export default constData
