const constData = {}

/** 全局的localStorage说明*/
// userInfo   	用户信息
//orgInfo    	用户选择的登录组织的组织信息
//permission  	用户的权限列表['104','112']
//poll			我的投票-选中的单个投票信息

/* 投票状态*/
constData.pollStatus=[
	{key:'-1',val:'投票未完成'},
	{key:'0',val:'投票失效'},
	{key:'1',val:'成功'},
	{key:'2',val:'失败'},
]

export default constData