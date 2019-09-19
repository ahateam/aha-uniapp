const constData = {}

/** 全局的localStorage说明*/
// userInfo   	用户信息
//orgInfo    	用户选择的登录组织的组织信息
//orgUserInfo   用户信息与组织信息都有的对象
//permission  	用户的权限列表['104','112']
//poll			我的投票-选中的单个投票信息

/* 投票状态*/
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


export default constData
