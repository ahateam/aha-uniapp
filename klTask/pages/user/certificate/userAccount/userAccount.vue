<template>
	<view id="page">
		<view class="nav-box flex-box" style="margin-bottom: 40rpx;">
			<image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image>
		</view>
		<image class="view-bg" src="/static/image/bg_c.png" mode="aspectFill"></image>
		<load-step :list="list" currIndex="3"></load-step>
		<view class="content-box">
			<view class="view-title auto-title">请提供您的收款信息</view>

			<view class="auto-title">账户名</view>
			<view class="auto-input"><input type="text" v-model="name" /></view>

			<view class="auto-title">BSB</view>
			<view class="auto-input"><input type="text" v-model="bsbNumber" /></view>

			<view class="auto-title">账号</view>
			<view class="auto-input"><input type="text" v-model="account" /></view>

			<view class="auto-title">ABN</view>
			<view class="auto-input"><input type="text" v-model="abnNumber" /></view>

			<view class="radius-btn flex-box" @tap="navNext">
				<image src="/static/image/icon/icon_back_w.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import LoadStep from '@/components/LoadStep.vue';

	export default {
		components: {
			LoadStep
		},
		data() {
			return {
				list: [{
					name: '上传证书'
				}, {
					name: '验证身份'
				}, {
					name: '收款账户'
				}, {
					name: '成为任务者'
				}],
				name: '',
				bsbNumber: '',
				account: '',
				abnNumber: ''
			};
		},
		methods: {
			navNext() {
				if ((this.name != null && this.name.length != 0) && (this.bsbNumber != null && this.bsbNumber.length != 0) && (this
						.account != null && this.account.length != 0) && (this.abnNumber != null && this.abnNumber.length != 0)) {
					let cnt = {
						userId: this.userInfo.userId,
						accountName: this.name,
						BsbNumber: this.bsbNumber,
						account: this.account,
						AbnNumber: this.abnNumber,
						isWorker: true
					}
					this.$api.updateUser(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							console.log("成为任务者")
						} else {
							uni.showToast({
								title: res.data.rm,
								icon: 'none'
							});
						}
					})
				}else{
					uni.showToast({
						title: '请填写您的收款信息',
						icon: 'none'
					});
				}
			},

			navBack() {
				uni.navigateBack();
			}
		},
		onLoad() {
			this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
		}
	};
</script>

<style lang="scss" scoped>
	#page {
		background-color: $group-color-bg;
		min-height: 100vh;
		padding-bottom: 30rpx;
	}

	.flex-box {
		display: flex;
		align-items: center;
	}

	.nav-box {
		position: relative;
		z-index: 1;
		padding-top: $status-height;
		height: 88rpx;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.view-bg {
		position: absolute;
		top: 0;
		z-index: 0;
		width: 100vw;
		height: 100vh;
	}

	.content-box {
		position: relative;
		margin: 70rpx auto 129rpx;
		background-color: #ffffff;
		border-radius: 6rpx;
		padding: 40rpx 30rpx 171rpx;
		width: 690rpx;
		box-sizing: border-box;
	}

	.view-title {
		margin: 0 auto 39rpx;
	}

	.auto-title {
		color: #333333;
		font-size: 30rpx;
		line-height: 42rpx;
	}

	.auto-input {
		box-sizing: border-box;
		height: 88prx;
		width: 630rpx;
		background-color: #f5f7f5;
		border-radius: 6rpx;
		margin: 30rpx 0 50rpx;
		padding: 23rpx 30rpx;

		input {
			font-size: 30rpx;
			line-height: 42rpx;
			color: #333333;
		}
	}

	.radius-btn {
		position: absolute;
		justify-content: center;
		background-color: #0f1b07;
		bottom: -89rpx;
		height: 180rpx;
		width: 180rpx;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 50%;

		image {
			width: 39.2rpx;
			height: 33.6rpx;
			transform: rotateY(180deg);
		}
	}
</style>
