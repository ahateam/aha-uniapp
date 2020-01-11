<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#FFF">
			<view slot="right" class="navTitle" @click="navToMobile">验证码登录</view>
		</navBar>
		<image class="bgImg" :src="bgSrc" mode="aspectFill"></image>
		<!-- 标题 -->
		<view class="titleBox">
			密码登录
		</view>
		<!-- 主要功能区 -->
		<phoneInput v-model="phoneNumber" @changeCode="codeFct"></phoneInput>

		<view class="functionBox">
			<image class="areaCode" :src="eyeIcon" mode="aspectFit" @click="changeHidden"></image>
			<input type="number" v-model="passData" placeholder="请输入密码" :password="eyeStatus" minlength="6" />
		</view>

		<button type="primary" class="functionBox codeBtn" @click="login">登录</button>

		<view class="infoBox" @click="navToReset">
			忘记密码
		</view>
		<!-- 下方附属功能 -->
		<otherFct></otherFct>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import otherFct from '@/components/otherFct/otherFct.vue'
	import phoneInput from '@/components/phoneInput/phoneInput.vue'
	//tim 
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			navBar,
			otherFct,
			phoneInput
		},
		computed: {
			...mapState({
				isLogin: state => state.user.isLogin,
				isSDKReady: state => state.user.isSDKReady,
			}),
		},
		watch: {
			isSDKReady(newVal) {
				if (newVal) {
					uni.setStorageSync('page', 'normal')
					uni.reLaunch({
						url: '../index/index'
					})
				}
			}
		},
		data() {
			return {
				areaCode: '86',
				bgSrc: '/static/image/login/passwordBG.png',

				phoneNumber: '',
				passData: '',

				eyeIcon: '/static/image/login/icon_close_eyes.png',
				eyeStatus: true,
				userInfo: '',

			}
		},
		methods: {
			/*登录tim-->等待sdk状态为true后执行跳转*/
			timLogin() {
				let timeOut = Number(this.userInfo.userSigCreateTime) + 604800000
				let timeNow = new Date();
				timeNow = timeNow.getTime()
				if (this.userInfo.userSig && (timeNow < timeOut)) {
					if (!this.$store.state.user.isLogin) {
						this.loginTim();
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户身份失效'
					})
				}
			},
			//登录tim
			loginTim() {
				this.tim
					.login({
						userID: String(this.userInfo.userId),
						userSig: this.userInfo.userSig
					})
					.then(res => {
						this.$store.commit("toggleIsLogin", true);
						this.$store.commit("startComputeCurrent");
						if (this.$store.state.user.isSDKReady) {
							if (this.userInfo.isFirstLogin) {
								uni.hideLoading()
								uni.reLaunch({
									url: '../guide/guide'
								})
							} else {
								uni.reLaunch({
									url: '../index/index'
								})
							}
						}
					})
					.catch(error => {
						setTimeout(() => {
							this.loginTim()
						}, 200)
					});
			},
			codeFct(res) {
				this.areaCode = res
			},

			login() {

				if (this.phoneNumber == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
				} else if (this.passData.length < 6) {
					uni.showToast({
						title: '请输入正确的密码',
						icon: 'none'
					})
				} else {
					uni.showLoading({
						title: 'login...'
					})
					let cnt = {
						phone: this.areaCode + this.phoneNumber, // String 手机号
						pwd: this.passData, // String 密码
						userType: 2
					}
					this.$api.login(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.userInfo = this.$util.tryParseJson(res.data.c)
							console.log(this.userInfo)
							uni.setStorageSync('userInfo', JSON.stringify(this.userInfo))
							this.timLogin()
							// uni.reLaunch({
							// 	url: '../index/index?type='+false
							// })
						} else {
							uni.showToast({
								title: '登录失败，用户名或密码错误',
								icon: 'none'
							})
						}
					})
				}
			},

			changeHidden() {
				if (this.eyeIcon == '/static/image/login/icon_open_eyes.png') {
					this.eyeStatus = true
					this.eyeIcon = '/static/image/login/icon_close_eyes.png'
				} else {
					this.eyeStatus = false
					this.eyeIcon = '/static/image/login/icon_open_eyes.png'
				}
			},

			navToReset() {
				uni.navigateTo({
					url: '/pages/login/resetPhone'
				})
			},

			navToMobile() {
				uni.redirectTo({
					url: '/pages/login/mobile'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	button {
		&:after {
			border: none;
		}
	}

	.bgImg {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
	}

	.navTitle {
		color: #FFFFFF;
		font-size: 30rpx;
		margin-right: 50rpx;
	}

	.titleBox {
		position: relative;
		font-size: 56rpx;
		line-height: 78rpx;
		color: #FFFFFF;
		margin: 184rpx 0 0 90rpx;
	}

	.functionBox {
		position: relative;
		margin: 70rpx 0 0 90rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		border: 1rpx solid #FFFFFF;
		width: 570rpx;
		height: 102rpx;
		font-size: 36rpx;
		line-height: 36rpx;
		color: #FFFFFF;

		input {
			position: absolute;
			left: 183rpx;
			top: 50%;
			margin-top: -0.7rem;
			display: inline-block;
		}
	}

	.areaCode {
		position: absolute;
		left: 30rpx;
		top: 50%;
		margin-top: -20rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.infoBox {
		position: relative;
		width: 750rpx;
		margin-top: 50rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 24rpx;
		line-height: 33rpx;
	}

	.codeBtn {
		margin-top: 60rpx;
		line-height: 102rpx;
		color: #587685;
		background-color: #FFFFFF;
		opacity: 0.8;
	}
</style>
