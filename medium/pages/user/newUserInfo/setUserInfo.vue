<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">收款账户信息</view>
		</nav-bar>
		<view class="tip-box">
			<image src="/static/image/icon/icon_l.png" mode="aspectFit"></image>
			<view class="info-text">请提供客户账户(收款账户)信息</view>
			<image src="/static/image/icon/icon_r.png" mode="aspectFit"></image>
		</view>

		<data-input title="账户名" hiddenIcon v-model="name"></data-input>
		<data-input title="BSB" hiddenIcon v-model="BSB"></data-input>
		<data-input title="账号" hiddenIcon placeholder="Account Number" v-model="accountNumber"></data-input>
		<data-input title="电子邮件地址" hiddenIcon placeholder="用于接收电子账单" v-model="email"></data-input>
		<view class="fixed-box">
			<next-btn title="保存" @click="editUserAccountById"></next-btn>
		</view>

	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import DataInput from '@/components/dataInput/DataInput.vue'
	import NextBtn from '@/components/NextBtn/NextBtn.vue'

	export default {
		components: {
			navBar,
			DataInput,
			NextBtn
		},
		data() {
			return {
				name: '',
				BSB: '',
				accountNumber: '',
				email: '',
			};
		},
		methods: {
			editUserAccountById() {
				let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
				if (this.name && this.BSB && this.accountNumber && this.email) {
					let cnt = {
						userId: userInfo.userId, // Long 用户id
						accountName: this.name, // String 收款账户名
						BsbNumber: this.BSB, // String BSB号
						account: this.accountNumber, // String 收款账户号
						email: this.email, // String <选填> 电子邮件
					}
					this.$api.updateUser(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							Object.assign(userInfo, cnt)
							uni.setStorageSync('userInfo', JSON.stringify(userInfo))
							uni.switchTab({
								url: '../user'
							})
							uni.showToast({
								title: '已保存',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: res.data.rm,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showToast({
						title: '请将资料填写完整！',
						icon: 'none'
					})
				}
			},

			navBack() {
				uni.navigateBack()
			}
		},
		onLoad() {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			if (userInfo.accountName) {
				this.name = userInfo.accountName
			}
			if (userInfo.BsbNumber) {
				this.BSB = userInfo.BsbNumber
			}
			if (userInfo.account) {
				this.accountNumber = userInfo.account
			}
			if (userInfo.email) {
				this.email = userInfo.email
			}
		}
	}
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

	.tip-box {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;

		image {
			width: 140rpx;
			height: 14rpx;
		}
	}

	.info-text {
		font-size: 28rpx;
		color: #999999;
	}

	.fixed-box {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
