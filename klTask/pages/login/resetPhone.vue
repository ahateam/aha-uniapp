<template>
	<view>
		<navBar :back="false" type="transparent"><image slot="left" class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image></navBar>
		<image class="bgImg" :src="bgSrc" mode="aspectFill"></image>
		<!-- 标题 -->
		<view class="titleBox">忘记密码</view>
		<!-- 主要功能区 -->
		<phoneInput v-model="phoneNumber" @changeCode="codeFct"></phoneInput>

		<login-btn @click="navToReset" name="下一步"></login-btn>
	</view>
</template>

<script>
import navBar from '@/components/zhouWei-navBar/index.vue';
import phoneInput from '@/components/phoneInput/phoneInput.vue';
import loginBtn from '@/components/otherFct/loginBtn.vue';

export default {
	name: 'resetPhone',
	components: {
		navBar,
		phoneInput,
		loginBtn
	},
	data() {
		return {
			bgSrc: '/static/image/login/phoneBG.png',
			areaCode: '86',

			phoneNumber: ''
		};
	},
	methods: {
		inputFct(res) {
			this.phoneNumber = res;
		},

		codeFct(res) {
			this.areaCode = res;
		},

		navBack() {
			uni.navigateBack();
		},

		navToReset() {
			if (this.phoneNumber == '') {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
			} else {
				uni.redirectTo({
					url: `./code?tell=${this.areaCode}${this.phoneNumber}&type=${this.$constData.codeType[2].key}`
				});
			}
		},

		navToMobile() {
			uni.redirectTo({
				url: '/pages/login/mobile'
			});
		}
	}
};
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
	color: #ffffff;
	font-size: 30rpx;
	margin-right: 50rpx;
}

.titleBox {
	position: relative;
	font-size: 56rpx;
	line-height: 78rpx;
	color: #ffffff;
	margin: 184rpx 0 0 90rpx;
}

.functionBox {
	position: relative;
	margin: 70rpx 0 0 90rpx;
	box-sizing: border-box;
	border-radius: 6rpx;
	border: 1rpx solid #ffffff;
	width: 570rpx;
	height: 102rpx;
	font-size: 36rpx;
	line-height: 36rpx;
	color: #ffffff;

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

.code-btn {
	margin-top: 60rpx;
	line-height: 102rpx;
	color: #587685;
	background-color: #ffffff;
	opacity: 0.8;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}
</style>
