<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#FFF">
			<!-- <view slot="right" class="navTitle" @click="navToMobile">免密登录</view> -->
			<view slot="left" class="iconfont icon-fanhui"></view>
		</navBar>
		<image class="bgImg" :src="bgSrc" mode="aspectFill"></image>
		<!-- 标题 -->
		<view class="titleBox">
			忘记密码
		</view>
		<!-- 主要功能区 -->
		<view class="functionBox">
			<text class="areaCode">
				{{areaCode}}
			</text>
			<input type="number" v-model="phoneNumber" placeholder="请输入手机号码" maxlength="11" />
		</view>

		<button type="primary" class="functionBox codeBtn" @click="navToReset">下一步</button>

	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'


	export default {
		components: {
			navBar
		},
		data() {
			return {
				bgSrc: this.$constData.oss + '/image/phoneBG.png',
				areaCode: '+86',
				
				phoneNumber: '',
			}
		},
		methods: {
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
		margin-top: -18rpx;
	}

	.codeBtn {
		margin-top: 60rpx;
		line-height: 102rpx;
		color: #587685;
		background-color: #FFFFFF;
		opacity: 0.8;
	}
	
	.icon-fanhui{
		font-size: 33rpx;
		color: #FFFFFF;
		position: absolute;
		left: 29rpx;
	}
</style>
