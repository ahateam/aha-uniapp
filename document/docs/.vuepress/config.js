module.exports = {
	//页面顶部title
	title: 'AHA-uniapp项目指南',
	//页面描述
	description: 'Technology pursues art and art challenges technology',

	base:'/document/',
	head: [
		['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
		['link', { rel: 'icon', href: `./hero.png` }]
	],
	theme: 'reco',
	themeConfig: {
		// 博客设置
		// //首页风格
		// type: 'blog',

		/** 配置左侧导航栏*/

		//导航栏
		nav: require('./navBar.js'),
		//侧边栏
		sidebar: require('./sideBar.js'),

		// /* 分类标签*/
		// category: {
		// 	location: 2, // 在导航栏菜单中所占的位置，默认2
		// 	text: 'Category' // 默认文案 “分类”
		// },
		// tag: {
		// 	location: 3, // 在导航栏菜单中所占的位置，默认3
		// 	text: 'Tag' // 默认文案 “标签”
		// },



		/* 项目附属信息 */
		// 备案号
		// record: '京ICP备17067634号-1',
		// 项目开始时间，只填写年份
		startYear: '2019',
		// author
		author: 'aha-team【遵义小红椒技术团队】',


	},
}
