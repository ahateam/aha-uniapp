<script>
let sdkwx;
export default {
	onLaunch: function() {
		uni.onTabBarMidButtonTap(res => {
			uni.navigateTo({
				url: '/pages/addTask/addTask'
			});
		});
		// 	sdkwx = uni.requireNativePlugin('TIM-SdkWX');
		// 	//初始化
		// 	let appid = 1400294741;
		// 	sdkwx.initSdk(appid);
		// 	//配置样式
		// 	sdkwx.setConfigStyle({
		// 		uikit: {
		// 			//默认参数配置
		// 			//defaultAvatarImage:'/Pandora/apps/__UNI__D0B7EBA/www/static/logo.png', //默认头像
		// 			//defaultGroupAvatarImage:'/Pandora/apps/__UNI__D0B7EBA/www/static/logo.png', //默认群组头像
		// 			//avatarCornerRadius:5.0, //圆角半径
		// 			avatarType: 1 //0矩形直角头像，1矩形直角头像，2圆角头像
		// 		},
		// 		conversation: {
		// 			table: {
		// 				//表格配置
		// 				backgroundColor: '#FFFFFF', //背景颜色
		// 				separatorColor: '#EFF0F4' //分割线颜色
		// 			},
		// 			cell: {
		// 				//单元格配置
		// 				changeColorWhenTouched: true,
		// 				colorWhenTouched: '#EFF0F4',
		// 				color: '#FFFFFF',
		// 				height: 90 //行高度，单位是原生的尺寸
		// 			},
		// 			headImage: {
		// 				//头像配置
		// 				left: 20,
		// 				top: 15,
		// 				bottom: 15
		// 			},
		// 			title: {
		// 				//标题配置
		// 				fontSize: 15,
		// 				color: '#333333',
		// 				left: 15,
		// 				top: 20
		// 			},
		// 			subTitle: {
		// 				//子标题
		// 				fontSize: 13,
		// 				color: '#999999',
		// 				left: 15,
		// 				bottom: 20.5
		// 			},
		// 			time: {
		// 				//时间
		// 				fontSize: 11,
		// 				color: '#999999',
		// 				top: 23,
		// 				right: 20.5
		// 			},
		// 			unRead: {
		// 				//未读图标
		// 				right: 20,
		// 				bottom: 23
		// 			}
		// 		},
		// 		chat: {
		// 			incomming: {
		// 				bubble: '/Pandora/apps/__UNI__D0B7EBA/www/static/logo.png',
		// 				/*bubbleInsets:{
		// 						top:10,left:20,bottom:10,right:10
		// 					},//*/
		// 				//textFontSize:16,
		// 				//textColor:"#FF27A2",
		// 				avatarSize: {
		// 					width: 40,
		// 					height: 40
		// 				}
		// 				/*,
		// 											avatarInsets:{
		// 												top:0,left:20,bottom:0,right:0
		// 											}//*/
		// 			},
		// 			outgoing: {
		// 				//bubble:"/Pandora/apps/__UNI__D0B7EBA/www/static/logo2.png",
		// 				avatarSize: {
		// 					width: 40,
		// 					height: 40
		// 				}
		// 			}
		// 		}
		// 	});
		// 	//监听用户状态，如被强制下线，过期等回调
		// 	sdkwx.addUserStatusCallback(function(res) {
		// 		console.log('监听用户状态');
		// 		console.log(res);
		// 		//退出登录
		// 		sdkwx.logout(function(res2) {
		// 			console.log('退出登录');
		// 			console.log(res2);
		// 			this.$commen.hiddenTabIcon()
		// 			uni.reLaunch({
		// 				url: '/pages/login/mobilePassword'
		// 			});
		// 		});
		// 	});
		// 	//新消息回调
		// 	sdkwx.addMessageCallback(function(res) {
		// 		console.log(res);
		// 	});
		// 	// uni.onTabBarMidButtonTap((res) => {
		// 	// 	let data = getCurrentPages()
		// 	// 	if (data[0].route != 'pages/index/index') {
		// 	// 		uni.navigateTo({
		// 	// 			url: '/pages/index/index'
		// 	// 		})
		// 	// 	}
		// 	// })
	},
	// onUnload: function() {
	// 	console.log('123123');
	// 	sdkwx.removeUserStatusCallback();
	// 	sdkwx.removeMessageCallback();
	// },
	onShow() {
		// #ifdef APP-PLUS
		plus.push.clear();
		// #endif
		console.log('App Show');
	},
	onHide() {
		console.log('App Hide');
	},
	methods: {}
};
</script>

<style lang="scss">
/*每个页面公共css */
.auto-placeholder {
	color: $group-color-befor;
}

/* #ifdef APP-VUE */
input {
	caret-color: #00c8be;
}
/* #endif */
</style>
