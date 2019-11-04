<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#FFF">
			<view slot="right" class="navTitle" @click="navToMobile">免密登录</view>
		</navBar>
		<image class="bgImg" :src="bgSrc" mode="aspectFill"></image>
		<!-- 标题 -->
		<view class="titleBox">
			密码登录
		</view>
		<!-- 主要功能区 -->
		<view class="functionBox">
			<text class="areaCode">
				{{areaCode}}
			</text>
			<input type="number" v-model="phoneNumber" placeholder="输入手机号码" maxlength="11" />
		</view>

		<view class="functionBox">
			<text class="iconfont areaCode" :class="eyeIcon" @click="changeHidden"></text>
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

	export default {
		components: {
			navBar,
			otherFct
		},
		data() {
			return {
				areaCode: '+86',
				bgSrc: this.$constData.oss + '/image/passwordBG.png',

				phoneNumber: '',
				passData: '',

				eyeIcon: 'icon-yanjing_yincang_o',
				eyeStatus: true,

			}
		},
		methods: {
			login() {
				if (this.phoneNumber.length < 10) {
					uni.showToast({
						title: '请输入正确的号码',
						icon: 'none'
					})
				} else if (this.passData.length < 6) {
					uni.showToast({
						title: '请输入正确的密码',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '登录'
					})
				}
			},

			changeHidden() {
				if (this.eyeIcon == 'icon-yanjing_yincang_o') {
					this.eyeStatus = false
					this.eyeIcon = 'icon-yanjing_xianshi_o'
				} else {
					this.eyeStatus = true
					this.eyeIcon = 'icon-yanjing_yincang_o'
				}
			},

			navToReset() {
				uni.redirectTo({
					url: '/pages/login/resetPassword'
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
	button{
		&:after{
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
		margin-top: -18rpx;
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
