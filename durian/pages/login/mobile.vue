<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#FFF">
			<view slot="right" class="navTitle" @click="navToPassLogin">密码登录</view>
		</navBar>
		<image class="bgImg" :src="bgSrc" mode="aspectFill"></image>
		<!-- 标题 -->
		<view class="titleBox">
			手机号登录
			<view class="titleInfo">
				榴莲出国-记录你的澳洲征程
			</view>
		</view>
		<!-- 主要功能区 -->
		<phoneInput v-model="phoneNumber" @changeCode="codeFct"></phoneInput>
		
		<button type="primary" class="functionBox codeBtn" @click="navToCode">获取验证码</button>

		<view class="infoBox">
			未注册手机验证后自动登录
		</view>
		<!-- 下方附属功能 -->
		<otherFct></otherFct>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import otherFct from '@/components/otherFct/otherFct.vue'
	import phoneInput from '@/components/phoneInput/phoneInput.vue'

	export default {
		components: {
			navBar,
			otherFct,
			phoneInput
		},
		data() {
			return {
				areaCode: '+86',
				bgSrc: this.$constData.oss + '/image/mobileBG.png',
				phoneNumber: '',
			}
		},
		methods: {
			codeFct(res){
				this.areaCode = res
			},
			
			navToCode() {
				if (this.phoneNumber.length < 10) {
					uni.showToast({
						title: '请输入正确的号码',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: `./code?phone=${this.areaCode}${this.phoneNumber}`
					})
				}
			},
			
			navToPassLogin(){
				uni.redirectTo({
				    url: '/pages/login/mobilePassword'
				})
			}
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

	.titleInfo {
		margin-top: 10rpx;
		font-size: 34rpx;
		line-height: 48rpx;
		color: rgba($color: #FFFFFF, $alpha: 0.5);
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

	.codeBtn {
		margin-top: 60rpx;
		line-height: 102rpx;
		color: #587685;
		background-color: #FFFFFF;
		opacity: 0.8;
	}

	.infoBox {
		position: relative;
		width: 750rpx;
		margin-top: 50rpx;
		text-align: center;
		color: rgba($color: #FFFFFF, $alpha: 0.5);
		font-size: 24rpx;
		line-height: 33rpx;
	}
</style>
