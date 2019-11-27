const constData = {}

/** 全局的localStorage说明*/
// userInfo   	用户信息
//orgInfo    	用户选择的登录组织的组织信息
//orgUserInfo   用户信息与组织信息都有的对象
//permission  	用户的权限列表['104','112']
//poll			我的投票-选中的单个投票信息
//vote			创建投票模块--单个投票的所有信息
//userPosition  修改成员职务的时候的 被选中用户信息存储

//bankUserInfo 银行用户信息
//bankOrgInfo	用户选择的登录组织的组织信息-银行



//app版本号
 constData.version = 115

/* 投票状态---前端*/
constData.pollStatus = [{
		key: '-1',
		val: '投票未完成'
	},
	{
		key: '0',
		val: '投票失效'
	},
	{
		key: '1',
		val: '成功'
	},
	{
		key: '2',
		val: '失败'
	},
]
/* 投票状态---后端返回*/
constData.voteStatus = [{
		key: '0',
		val: '进行中'
	},
	{
		key: '1',
		val: '未开始'
	},
	{
		key: '4',
		val: '已结束'
	},
]

/**
 * 审批类型
 * */
constData.examineType = [{
	key: 0,
	val: '组织申请'
}, {
	key: 1,
	val: '分户申请'
}, {
	key: 2,
	val: '股权变更申请'
}]
constData.examineStatus = [{
	key: 0,
	val: '等待组织审核'
}, {
	key: 1,
	val: '组织审核通过'
}, {
	key: 2,
	val: '区级初审通过'
}, {
	key: 3,
	val: '审核成功'
}, {
	key: 4,
	val: '审核失败'
}, {
	key: 5,
	val: '等待取证'
}, {
	key: 6,
	val: '已取证'
}]
constData.permission =[
    {key:100,val:'发起投票'},{key:102,val:'职务管理'},{key:104,val:'分户审批'},{key:105,val:'股权变更'},
]

//消息通知类型
constData.tags = [{key:0,val:'vote'},{key:1,val:'examine'}]

//审批分类
constData.examineType=[{key:1,val:'分户申请'},{key:2,val:'股权变更'}]


export default constData
