<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">账户安全</view>
		</nav-bar>

		<view class="auto-margin flex-box border-bottom">
			<view class="title-info">你已使用({{ loginMethods }})登录</view>
			<view class="set-pass-btn" @click="setPass">设置密码</view>
		</view>

		<view class="phone-box auto-margin flex-box border-bottom">
			<view>手机号</view>
			<view style="color: #333333;">+{{ telData }}</view>
		</view>

		<view class="border-bottom auto-margin">
			<view class="title-info">第三方账号绑定</view>
			<view class="flex-box wx-bind-box">
				<view>微信</view>
				<switch :checked="wxBindStatus" color="#00C8BE" @change="wxBind" style="transform: scale(0.74,0.78)" />
			</view>
		</view>

		<view class="out-login-box"><button class="out-login-btn" @click="outLogin">退出</button></view>
	</view>
</template>

<script>
import navBar from '@/components/zhouWei-navBar/index.vue';

export default {
	name: 'userSafe',
	components: {
		navBar
	},
	data() {
		return {
			loginMethods: '手机号',
			telData: '',
			wxBindStatus: false
		};
	},
	methods: {
		newTel() {
			let telData = this.telData;
			if (telData.length == 13) {
				this.telData = telData.substr(0, telData.length - 7) + '****' + telData.substr(telData.length - 3);
			} else {
				this.telData = telData.substr(0, telData.length - 7) + '****' + telData.substr(telData.length - 2);
			}
		},

		wxBind() {
			this.wxBindStatus = !this.wxBindStatus;
			console.log(this.wxBindStatus);
		},

		navBack() {
			uni.navigateBack();
		},

		setPass() {
			let passWord = uni.getStorageSync('userPass');
			if (passWord) {
				uni.navigateTo({
					url: '/pages/user/userSafe/setNewPass/setNewPass'
				});
			} else {
				uni.navigateTo({
					url: '/pages/user/userSafe/setNewPass/noPass'
				});
			}
		},

		outLogin() {
			// let timSdk = uni.requireNativePlugin('TIM-SdkWX');
			// timSdk.logout(res2 => {
			// 	console.log(res2);
			// 	uni.clearStorageSync();
			// 	this.$commen.clearTabIcon();
			// 	uni.reLaunch({
			// 		url: '/pages/login/mobilePassword'
			// 	});
			// });
			uni.clearStorageSync();
			uni.reLaunch({
				url: '/pages/login/mobilePassword'
			});
		}
	},
	onLoad() {
		let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
		this.telData = userInfo.phone;
		this.newTel();
	}
};
</script>

<style lang="scss" scoped>
.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.view-title {
	color: #333333;
	font-size: 36rpx;
	font-weight: normal;
}

.auto-margin {
	padding: 36rpx 40rpx;
}

.flex-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.set-pass-btn {
	background-color: #f2f5f7;
	color: #24d4d0;

	line-height: 48rpx;
	padding: 0 18rpx;
	border-radius: 4rpx;
	font-size: $group-font;
}

.title-info {
	color: #999999;
	font-size: $group-font-befor;
}

.phone-box {
	font-size: $group-font-befor;
	color: #666666;
}

.border-bottom {
	border-bottom: 1rpx solid $group-color-border;
}

.wx-bind-box {
	font-size: $group-font-befor;
	color: #666666;
	margin-top: $group-margin-top;
}

.out-login-box {
	position: fixed;
	bottom: 0;
	padding: 0 40rpx 40rpx;
}

.out-login-btn {
	width: 670rpx;
	background-color: #182f45;
	line-height: 100rpx;
	color: $group-color-w;
	font-size: 36rpx;
	border-radius: 6rpx;
	padding: 0;

	&:after {
		border: none;
	}
}
</style>
