<template>
	<view>
		<view class="image-box">
			<image src="../../static/image/1.png"></image>
		</view>
		<view class="money-box">
			<view class="money-title">
				{{userName}} 分红金额
			</view>
			<view class="money-number">
				￥ {{money}}
			</view>
		</view>
		<view class="footer-box">
			<button type="default" @click="toHomePage()">
				返回首页
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				money: 0
			}
		},
		methods: {
			getUserMoney(cnt, shareAmount) {
				this.$api.getORGById(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let info = JSON.parse(res.data.c)
						this.money = parseFloat(info.bonus) * parseFloat(shareAmount)
					}
				})
			},


			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}

		},
		onLoad() {
			let orgUserInfo = JSON.parse(uni.getStorageSync('orgUserInfo'))

			this.userName = orgUserInfo.realName

			let shareAmount = orgUserInfo.shareAmount

			console.log(orgUserInfo)
			console.log('----------------')
			console.log(JSON.parse(uni.getStorageSync('orgInfo')))
			let cnt = {
				orgId: orgUserInfo.orgId
			}
			this.getUserMoney(cnt, shareAmount)

		}
	}
</script>
<style scoped lang="scss">
	.image-box {
		width: auto;
		height: 400rpx;
		text-align: center;

		image {
			width: 250rpx;
			height: 250rpx;
			margin-top: 75rpx;
		}
	}

	.money-box {
		width: auto;


		text-align: center;

		.money-title {
			font-size: 30rpx;
			line-height: 60rpx;
			color: #666;
		}

		.money-number {
			margin-top: 40rpx;
			font-size: 60rpx;
			line-height: 60rpx;
			color: #333;
		}
	}

	.footer-box {
		width: auto;
		padding: 40rpx;

	}
</style>
