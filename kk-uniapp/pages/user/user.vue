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
					<button open-type="getUserInfo" type="primary" class="loginBtn" @getuserinfo="wx()" v-else>登录</button>
				</view>
				<view class="rightBox" v-if="boxShow">
					<view class="userMoney">余额 0.00</view>
					<view class="cashMoney">提现 ></view>
				</view>
			</view>
		</view>
		<!-- 任务 -->
		<view class="taskBox" v-if="boxShow">
			<navigator url="/pages/index/user/Published/Published" class="leftTask">
				已发任务
			</navigator>
			<navigator url="/pages/index/user/receivedTask/receivedTask" class="rightTask">
				已领任务
			</navigator>
		</view>

		<view class="bottomBox" v-if="boxShow">
			<navigator class="autoBoxHeight" url="/pages/index/user/plsdContent/plsdContent">
				<text class="iconfont kk-shangchuan leftIcon"></text>
				<text class="bottomTitle">发布</text>
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
				userInfo: Object,
				boxShow: false,

			};
		},
		methods: {
			// 微信登录
			wx() {
				uni.showLoading({
					title: '登录中'
				})
				uni.clearStorageSync()
				console.log('清理完成')
				uni.login({//通过login获取临时登录凭证code
					provider: 'weixin',
					success: (res) => {
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
			getUserInfo(cnt){
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
			
			WxLogin(cnt){
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
						console.log('失敗')
					}
				})
			},
			
			// 根据用户id获取信息
			getUserById() {
				let cnt = {
					userId: this.userId,
				}
				this.$api.getUserById(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.userInfo = this.$util.tryParseJson(res.data.c)
						console.log(this.userInfo)
						this.userName = this.userInfo.name
						this.userHead = this.$util.tryParseJson(this.userInfo.ext).userHead
					} else {
						console.log('获取失败')
					}
				})
			},
			
		},
		onShow() {
			if (this.userId != '') {
				let userId = uni.getStorageSync('userId')
				let userName = uni.getStorageSync('userName')
				let userHead = uni.getStorageSync('userHead')
				if (userId != '' && userId != '1234567890') {
					this.userId = 0 + userId
					this.userName = userName
					this.userHead = userHead
					this.getUserById()
					this.boxShow = true
				} else {
					console.log('咩都牟')
				}
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
		font-size: 28upx;
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
		color: #5ee7df;
		background-color: #fff;
		border-radius: 20px;
		text-align: center;
		padding: 10upx 20upx;
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
	
	.leftIcon{
		margin-right: 20upx;
		font-size: $list-title-l;
		vertical-align: middle;
	}
	
	.rightIcon{
		float: right;
		font-size: $list-title-l;
	}
	
	.bottomTitle{
		line-height: 70upx;
		vertical-align: middle;
	}
</style>
