<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
		</view>
		<!-- #ifdef H5 -->
		<button class="confirm-btn" open-type="getUserInfo" @click="h5Login">登录</button>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<button class="confirm-btn" open-type="getUserInfo" @getuserinfo="wx()">登录</button>
		<!-- #endif -->
	</view>
</template>

<script>

	export default {
		data() {
			return {
				mobile: '',
				password: '',
				logining: false
			}
		},
		methods: {
			//h5登录
			h5Login(){
				uni.setStorageSync('userId', 1234567890)
				uni.navigateBack()
				uni.showToast({
					title: '已登录！',
					duration: 1000
				})
			},
			
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
						uni.hideLoading()
						uni.navigateBack()
						uni.showToast({
							title: '已登录！',
							duration: 1000
						})
					} else {
						console.log('失敗')
					}
				})
			},
			
		
		},
	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
