<template>
	<view>
		<!-- <navBar :back="false" type="transparent" fontColor="#FFF">
			<view slot="right" class="navTitle" @click="navToMobile">免密登录</view>
		</navBar> -->
		<image class="bgImg" :src="bgSrc" mode="aspectFill"></image>
		<!-- 标题 -->
		<view class="titleBox">
			重置密码
		</view>
		<!-- 主要功能区 -->
		<view class="functionBox">
			<image class="areaCode" :src="eyeIcon" mode="aspectFit" @click="changeHidden(0)"></image>
			<input type="number" v-model="passData" :password="eyeStatus" placeholder="请输入至少6位新密码" minlength="6" />
		</view>

		<view class="functionBox">
			<image class="areaCode" :src="eyeIcon1" mode="aspectFit" @click="changeHidden(1)"></image>
			<input type="number" v-model="passDataAgin" placeholder="确认密码" :password="eyeStatus1" minlength="6" />
		</view>

		<button type="primary" class="functionBox codeBtn" @click="navToCode">保存</button>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		components: {
			navBar,
		},
		data() {
			return {
				bgSrc: '/static/image/login/passwordBG.png',

				passData: '',
				passDataAgin: '',

				eyeIcon: '/static/image/login/icon_close_eyes.png',
				eyeStatus: true,

				eyeIcon1: '/static/image/login/icon_close_eyes.png',
				eyeStatus1: true,
			}
		},
		methods: {
			navToCode() {
				if (this.passData.length < 6) {
					uni.showToast({
						title: '请输入正确密码',
						icon: 'none'
					})
				} else if (this.passData != this.passDataAgin) {
					uni.showToast({
						title: '密码不相同',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '保存成功'
					})
					uni.redirectTo({
						url:'/pages/login/mobilePassword'
					})
				}
			},

			changeHidden(e) {
				if (e == 0) {
					if (this.eyeIcon == '/static/image/login/icon_open_eyes.png') {
						this.eyeStatus = true
						this.eyeIcon = '/static/image/login/icon_close_eyes.png'
					} else {
						this.eyeStatus = false
						this.eyeIcon = '/static/image/login/icon_open_eyes.png'
					}
				} else {
					if (this.eyeIcon1 == '/static/image/login/icon_open_eyes.png') {
						this.eyeStatus1 = true
						this.eyeIcon1 = '/static/image/login/icon_close_eyes.png'
					} else {
						this.eyeStatus1 = false
						this.eyeIcon1 = '/static/image/login/icon_open_eyes.png'
					}
				}

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
			left: 139rpx;
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

	.codeBtn {
		margin-top: 60rpx;
		line-height: 102rpx;
		color: #587685;
		background-color: #FFFFFF;
		opacity: 0.8;
	}
</style>
