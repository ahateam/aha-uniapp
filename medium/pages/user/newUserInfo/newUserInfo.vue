<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">填写个人信息</view>
			<view slot="right" class="next-text" @click="navBack">跳过</view>
		</nav-bar>
		<view class="tip-box">
			<image src="/static/image/icon/icon_l.png" mode="aspectFit"></image>
			<view>请提供客户账户(收款账户)信息</view>
			<image src="/static/image/icon/icon_r.png" mode="aspectFit"></image>
		</view>

		<data-input title="账户名" hiddenIcon v-model="name"></data-input>
		<data-input title="BSB" hiddenIcon v-model="BSB"></data-input>
		<data-input title="账号" hiddenIcon placeholder="Account Number" v-model="accountNumber"></data-input>
		<data-input title="电子邮件地址" hiddenIcon placeholder="用于接收电子账单" v-model="email"></data-input>
		<data-input title="MARN号" hiddenIcon v-model="MARN"></data-input>
		<data-input title="FIER号" hiddenIcon v-model="FIER"></data-input>
		<data-input title="NAATI号" hiddenIcon v-model="NAATI"></data-input>
		<view style="margin-top: 70rpx;"></view>
		<next-btn title="确认" @click="updateUser"></next-btn>
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
				MARN: '',
				FIER: '',
				NAATI: ''
			};
		},
		methods: {
			updateUser() {
				let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
				let cnt = {
					userId: userInfo.userId, // Long 用户编号
				}
				if (this.name) {
					cnt.accountName = this.name
				}
				if (this.BSB) {
					cnt.BsbNumber = this.BSB
				}
				if (this.accountNumber) {
					cnt.account = this.accountNumber
				}
				if (this.email) {
					cnt.email = this.email
				}

				if (this.MARN) {
					cnt.marnNumber = this.MARN
				}

				if (this.FIER) {
					cnt.fierNumber = this.FIER
				}

				if (this.NAATI) {
					cnt.naatiNumber = this.NAATI
				}
				this.$api.updateUser(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '../user'
						})
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						})
						Object.assign(userInfo, cnt)
						uni.setStorageSync('userInfo', userInfo)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			navBack() {
				uni.navigateBack()
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

	.next-text {
		color: $group-color;
		font-size: 34rpx;
		margin-right: 30rpx;
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
</style>
