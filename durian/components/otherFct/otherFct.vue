<template>
	<view class="otherFct">
		<view class="otherTitle">其他登录方式</view>
		<view class="loginIcon">
			<view class="otherLogin" @click="loginWx"><view class="iconfont icon-wechat"></view></view>
			<view class="otherLogin" @click="loginQQ"><view class="iconfont icon-qq"></view></view>
		</view>
		<view class="tipBox">
			登录即代表同意
			<text class="navTip" @click="navToTip(0)">用户协议</text>
			和
			<text class="navTip" @click="navToTip(1)">隐私政策</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		wxLogin(cnt) {
			this.$api.wxLogin(cnt, res => {
				console.log(res);
				if (res.data.rc == this.$util.RC.SUCCESS) {
					console.log(this.$util.tryParseJson(res.data.c));
					uni.hideLoading();
					uni.setStorageSync('userInfo', res.data.c);
					uni.switchTab({
						url: '/pages/task/task'
					});
				} else {
					uni.hideLoading();
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		//微信登录
		loginWx() {
			uni.showLoading({
				title: 'login...'
			});
			uni.login({
				provider: 'weixin',
				success: res => {
					console.log(res);
					uni.getUserInfo({
						provider: 'weixin',
						success: res1 => {
							console.log(res1);
							let cnt = {
								wxOpenid: res.authResult.openid, // String 微信oppenId
								name: res1.userInfo.nickName, // String 用户名
								head: res1.userInfo.avatarUrl, // String 头像
								userType: 1 // Byte 用户类型
							};
							this.wxLogin(cnt);
						}
					});
				},
				fail: err => {
					console.log(err);
					uni.hideLoading();
				}
			});
		},

		loginQQ() {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			});
		},

		//跳转条约页
		navToTip(e) {
			if (e == 0) {
				uni.navigateTo({
					url: '/pages/login/Treaty/Treaty'
				});
			} else {
				uni.navigateTo({
					url: '/pages/login/Treaty/secret'
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.otherFct {
	position: absolute;
	width: 750rpx;
	text-align: center;
	bottom: 0;
	color: #ffffff;
}

.otherTitle {
	font-size: 30rpx;
	line-height: 42rpx;
	margin-bottom: 34rpx;
}

.otherLogin {
	border-radius: 50%;
	border: 1rpx solid #b6c4d2;
	box-sizing: border-box;
	display: inline-block;
	width: 100rpx;
	height: 100rpx;
	margin-bottom: 73rpx;

	.iconfont {
		line-height: 100rpx;
		font-size: 46rpx;
	}
}

.tipBox {
	margin-bottom: 51rpx;
	color: rgba($color: #ffffff, $alpha: 0.5);
	font-size: 24rpx;
	line-height: 33rpx;
}

.navTip {
	color: #64bccc;
	margin: 0 10rpx;
}

.loginIcon {
	display: flex;
	justify-content: space-between;
	padding: 0 217rpx;
}
</style>
