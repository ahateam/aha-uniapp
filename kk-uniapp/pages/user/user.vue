<template>
	<view class="body">
		<!-- 用户信息 -->
		<view class="userBox">
			<view class="topBox">
				<image class="userhead" :src="userHead" mode="widthFix"></image>
				<view class="leftBox">
					<view class="userName">{{userName}}</view>
					<view class="userView" v-if="boxShow">个人主页
						></view>
					<button type="primary" class="loginBtn" @click="loginBtn" v-else>登录</button>
				</view>
				<view class="rightBox" v-if="boxShow">
					<view class="userMoney">余额 0.00</view>
					<view class="cashMoney">提现 ></view>
				</view>
			</view>
		</view>

		<!-- 任务 -->
		<view class="taskBox" v-if="boxShow">
			<navigator url="/pages/user/userTask/userAddsTask" class="leftTask">
				已发任务
			</navigator>
			<navigator url="/pages/user/userTask/userTask" class="rightTask">
				已领任务
			</navigator>
		</view>

		<view class="bottomBox" v-if="boxShow" v-for="(item,index) in contentList" :key="index">
			<navigator class="autoBoxHeight" :url="item.url">
				<text :class="item.iconClass"></text>
				<text class="bottomTitle">{{item.name}}</text>
				<text class="iconfont kk-xiayibu rightIcon"></text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '您还没有登录',
				userHead: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567487052843&di=cbce4c55f56dc06f7a8941ad4c9a307e&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F69ad7a731f43d4b8729f1a2fbe65c43801ca0f033250-EV1vMf_fw658',
				userId: null,
				
				boxShow: false,

				providerList: [],

				contentList: [{
						name: '消费记录',
						url: '/pages/user/orderList/orderList',
						iconClass: 'iconfont kk-money leftIcon'
					},
					{
						name: '发布',
						url: '/pages/user/plsdContent/plsdContent',
						iconClass: 'iconfont kk-shangchuan leftIcon'
					},
					{
						name: '已购',
						url: '/pages/user/shoppingList/shoppingList',
						iconClass: 'iconfont kk-gouwu leftIcon'
					},
					// {
					// 	name: '登录测试',
					// 	url: '/pages/user/userLogin/userLogin',
					// 	iconClass: 'iconfont kk-gouwu leftIcon'
					// }
				],

			};
		},
		onLoad() {
			this.getProvider()
		},
		methods: {
			/* app登录 */
			appLogin() {
				uni.login({
					success: (res) => {
						uni.showLoading({
							title: '登录中'
						})
						console.log('login success:', res)
						let openId = res.authResult.openid
						uni.setStorageSync('openId', openId)
						this.appGetUserInfo(openId)
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				})
			},

			appGetUserInfo(openId) {
				uni.getUserInfo({
					provider: 'weixin',
					success: (infoRes) => {
						let data = {
							userHead: infoRes.userInfo.avatarUrl
						}
						data = JSON.stringify(data)
						let cnt = {
							wxOpenId: openId,
							name: infoRes.userInfo.nickName,
							ext: data
						}
						console.log(cnt)
						this.WxLogin(cnt)
					}
				})
			},
			/* APP登录end */
			/* 非微信登录 */
			loginBtn() { //获取code
				uni.navigateTo({
					url:'/pages/user/userLogin/userLogin'
				})
				return
				
				let provider = ''
				// #ifdef MP
				provider = this.providerList[0]
				if (provider.id == 'weixin') {
					return
				}
				// #endif

				// #ifdef APP-PLUS
				// this.loginTest()//虚拟登录
				this.appLogin()
				return
				// #endif

				console.log('非微信登录')
				uni.showLoading({
					title: '登录中'
				})
				uni.login({
					// #ifdef MP
					provider: provider.id,
					// #endif

					// #ifdef MP-ALIPAY
					scopes: 'auth_user', //支付宝小程序需设置授权类型 其他默认即可
					// #endif

					success: (res) => {
						console.log('login success:', res)
						// 更新保存在 store 中的登录状态

						// res.code
						if (provider.id == 'toutiao') {
							this.ttGetSessionkey(res.code)
						} else if (provider.id == 'alipay') {
							this.alipayGetSessionkey(res.code)
						}
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				})
			},

			//头条获取openId
			ttGetSessionkey(code) {
				let cnt = {
					code: code
				}
				this.$api.ttGetSessionkey(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						let openId = this.$util.tryParseJson(res.data.c).openid
						uni.setStorageSync('openId', openId)
						this.loginByTtOpenId(openId)
					}
				})
			},
			//头条登录
			loginByTtOpenId(openId) {
				uni.getUserInfo({
					provider: 'weixin',
					success: (infoRes) => {
						let data = {
							userHead: infoRes.userInfo.avatarUrl
						}
						let cnt = {
							ttOpenId: openId,
							name: infoRes.userInfo.nickName,
							ext: data
						}
						this.ttLoginApi(cnt)
					}
				})
			},
			ttLoginApi(cnt) {
				this.$api.loginByTtOpenId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let userData = this.$util.tryParseJson(res.data.c)
						console.log(userData)
						let userId = userData.id
						let userName = userData.name
						let userHead = this.$util.tryParseJson(userData.ext).userHead

						/* 将用户信息存至本地 */
						uni.setStorageSync('userId', userId)
						uni.setStorageSync('userName', userName)
						uni.setStorageSync('userHead', userHead)
						/* end */

						this.userHead = userHead
						this.userName = userName
						this.boxShow = true
						uni.hideLoading()
						uni.showToast({
							title: '已登录！',
							duration: 1000
						})
					} else {
						uni.showToast({
							title: '服务器错误！',
							duration: 1000,
							icon: 'none'
						})
					}
				})
			},
			//支付宝获取openid
			alipayGetSessionkey(code) {
				let cnt = {
					code: code
				}
				this.$api.alipayGetSessionkey(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						let userId = this.$util.tryParseJson(res.data.c).userId
						uni.setStorageSync('openId', userId)
						this.loginAlipay(userId)
					}
				})
			},
			loginAlipay(userId) {
				uni.getUserInfo({
					provider: 'weixin',
					success: (infoRes) => {
						let data = {
							userHead: infoRes.userInfo.avatarUrl
						}
						data = JSON.stringify(data)
						let cnt = {
							user_id: userId,
							name: infoRes.userInfo.nickName,
							ext: data
						}
						this.loginByAlipayOpenId(cnt)
					}
				})
			},
			//支付宝登录
			loginByAlipayOpenId(cnt) {
				this.$api.loginByAlipayOpenId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let userData = this.$util.tryParseJson(res.data.c)
						console.log(userData)
						let userId = userData.id
						let userName = userData.name
						let userHead = this.$util.tryParseJson(userData.ext).userHead

						/* 将用户信息存至本地 */
						uni.setStorageSync('userId', userId)
						uni.setStorageSync('userName', userName)
						uni.setStorageSync('userHead', userHead)
						/* end */

						this.userHead = userHead
						this.userName = userName
						this.boxShow = true
						uni.hideLoading()
						uni.showToast({
							title: '已登录！',
							duration: 1000
						})
					} else {
						uni.showToast({
							title: '服务器错误！',
							duration: 1000,
							icon: 'none'
						})
					}
				})
			},

			/* 非微信登录end****************************/


			// 微信登录star!************************************
			wx() {
				uni.showLoading({
					title: '登录中'
				})
				uni.login({ //通过login获取临时登录凭证code
					provider: 'weixin',
					success: (res) => {
						console.log(res)
						let code = res.code
						let cnt = {
							code: code, // String code
						}
						this.getUserInfo(cnt)
					},
					fail: function(error) {
						uni.showToast({
							title: error,
							icon: 'none',
							duration: 1000,
						})
					}
				})
			},

			//将code传给后端，获取openId以及用户头像等其他信息
			getUserInfo(cnt) {
				this.$api.getAccessToken(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let userInfo = JSON.parse(res.data.c)
						console.log(userInfo)
						let openId = userInfo.openid
						uni.setStorageSync('openId', openId)
						uni.getUserInfo({
							success: (res) => {
								console.log(res)
								console.log(openId)
								let userHead = res.userInfo.avatarUrl
								let userName = res.userInfo.nickName
								let other = {
									userHead: userHead
								}
								let cnt1 = {
									wxOpenId: openId, // String 微信openId
									name: userName, // string 用户名
									ext: JSON.stringify(other), //其他信息
								}
								this.WxLogin(cnt1)
							},
						})
					} else {
						uni.showToast({
							title: res.data.rc,
							icon: 'none',
							duration: 1000,
						})
					}
				})
			},

			WxLogin(cnt) {
				/* 将用户信息上传至服务器获取登录id */
				this.$api.loginByWxOpenId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let userData = this.$util.tryParseJson(res.data.c)
						console.log(userData)
						let userId = userData.id
						let userName = userData.name
						let userHead = this.$util.tryParseJson(userData.ext).userHead
						/* 将用户信息存至本地 */
						uni.setStorageSync('userId', userId)
						uni.setStorageSync('userName', userName)
						uni.setStorageSync('userHead', userHead)
						this.userHead = userHead
						this.userName = userName
						this.boxShow = true
						uni.hideLoading()
						uni.showToast({
							title: '已登录！',
							duration: 1000
						});
					} else {
						console.log(res.data.c)
					}
				})
			},
			//微信登录end!********************************************

			getProvider() {
				uni.getProvider({
					service: 'oauth',
					success: (result) => {
						this.providerList = result.provider.map((value) => {
							let providerName = '';
							switch (value) {
								case 'weixin':
									providerName = '微信登录'
									break;
								case 'qq':
									providerName = 'QQ登录'
									break;
								case 'sinaweibo':
									providerName = '新浪微博登录'
									break;
								case 'xiaomi':
									providerName = '小米登录'
									break;
								case 'alipay':
									providerName = '支付宝登录'
									break;
								case 'baidu':
									providerName = '百度登录'
									break;
								case 'toutiao':
									providerName = '头条登录'
									break;
							}
							return {
								name: providerName,
								id: value
							}
						});
						console.log(this.providerList)
					},
					fail: (error) => {
						console.log('获取登录通道失败', error);
					}
				})
			}
		},
		onShow() {
			let userId = uni.getStorageSync('userId')
			if (userId != '' && userId != '1234567890') {
				this.userName = uni.getStorageSync('userName')
				this.userHead = uni.getStorageSync('userHead')
				this.userId = userId
				this.boxShow = true
			}else{
				console.log('未登录')
			}
		},
	};
</script>

<style lang="scss" scoped>
	.autoBoxHeight {
		height: 60upx;
	}

	.body {
		min-height: 100vh;
		overflow: hidden;
		background-color: rgba(176, 196, 222, 0.1);
		font-size: 36upx;
	}

	.clearBoth {
		clear: both;
	}

	.userBox {
		background: linear-gradient(left, #5ee7df, #b490ca);
		font-size: $list-title;
	}

	.userhead {
		position: absolute;
		top: 50%;
		left: 20upx;
		margin-top: -80upx;
		height: 160upx;
		width: 160upx;
		border-radius: 80px;
		overflow: hidden;
	}

	.loginBtn {
		line-height: 45upx;
		height: 45upx;
		font-size: $list-info;
		background-color: #fff;
		color: #5ee7df;
	}

	.topBox {
		position: relative;
		height: 250upx;
		border-bottom: 1px solid rgba(176, 196, 222, 0.3);
	}

	.leftBox {
		position: absolute;
		left: 210upx;
		top: 50%;
		font-size: 28upx;
		line-height: 32upx;
		margin-top: -49upx;
		text-align: center;
	}

	.rightBox {
		position: absolute;
		right: 40upx;
		top: 50%;
		font-size: 28upx;
		line-height: 32upx;
		margin-top: -49upx;
		padding-left: 70upx;
		border-left: 1px dashed #fff;
	}

	.taskBox {
		background-color: #fff;
		box-sizing: border-box;
		width: 100vw;
		margin-top: 30upx;
		text-align: center;
		line-height: 80upx;
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.bottomBox {
		margin: 20upx 0;
		padding: $box-margin-top $box-margin-left;
		background-color: #fff;
		line-height: 60upx;
		font-size: $list-title;
	}

	.userName {
		color: #fff;
		margin-bottom: 30upx;
		font-size: $list-title;
	}

	.userView {
		margin: 0 auto;
		color: #5ee7df;
		background-color: #fff;
		border-radius: 20px;
		text-align: center;
		padding: 10upx 20upx;
		width: 7em;
	}

	.userMoney {
		color: #fff;
		margin-bottom: 30upx;
	}

	.cashMoney {
		color: #fff;
		border-radius: 20px;
		text-align: center;
		padding: 10upx 20upx;
		border: 1px solid #fff;
	}

	.leftTask {
		display: inline-block;
		width: 49%;
		border-right: 1px solid #f0f0f0;
	}

	.rightTask {
		display: inline-block;
		width: 49%;
	}

	.leftIcon {
		margin-right: 20upx;
		font-size: $list-title-l;
		vertical-align: middle;
	}

	.rightIcon {
		float: right;
		font-size: $list-title-l;
	}

	.bottomTitle {
		line-height: 70upx;
		vertical-align: middle;
	}
</style>
