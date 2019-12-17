<template>
	<view>
		<nav-bar :back="false" type="transparent" fontColor="#869CA7">
			<image slot="left" class="back-icon" @click="navBack" src="/static/image/icon/icon_fh.png" mode="aspectFit"></image>
			<view class="view-title">接收任务</view>
		</nav-bar>

		<view :style="{'padding-top':getStatusHeight()}"></view>

		<view class="view-tip">
			<image src="/static/image/icon/icon_l.png" mode="aspectFit"></image>
			<view>请提供客户账户(收款账户)信息</view>
			<image src="/static/image/icon/icon_r.png" mode="aspectFit"></image>
		</view>


		<data-input v-model="name" title="账户名" :inputHidden="popupShow" placeholder=" "></data-input>
		<data-input v-model="BSB" title="BSB" :inputHidden="popupShow" placeholder=" "></data-input>
		<data-input v-model="account" title="账号" :inputHidden="popupShow" placeholder="Account Number"></data-input>
		<data-input v-model="email" title="电子邮件地址" :inputHidden="popupShow" placeholder="用于接收电子账单"></data-input>

		<view class="bottom-tip">
			请确保上述信息的准确性，以防您的收款延误哦~
		</view>

		<button class="bottom-btn" @click="popupShow = true">接收任务</button>

		<uni-popup :show="popupShow" type="center" @change="change">
			<view class="popup-box">
				<view>确定接收任务吗</view>
				<view class="popup-btn-box">
					<button class="succ-btn" @click="editUserAccountById()">确定</button>
					<button class="colse-btn" @click="popupShow = false">再想想</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import DataInput from '@/components/dataInput/DataInput.vue'

	export default {
		components: {
			navBar,
			uniPopup,
			DataInput
		},
		data() {
			return {
				taskId: '',

				name: '',
				BSB: '',
				account: '',
				email: '',

				testData: '',

				popupShow: false
			}
		},
		methods: {
			change(e) {
				if (!e.show) {
					this.popupShow = false
				}
			},

			// 修改账户信息
			editUserAccountById() {
				let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
				let cnt = {
					userId: userInfo.userId, // Long 用户id
					accountName: this.name, // String 收款账户名
					BsbNumber: this.BSB, // String BSB号
					account: this.account, // String 收款账户号
				}
				this.$api.editUserAccountById(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						Object.assign(userInfo, cnt)
						uni.setStorageSync('userInfo', JSON.stringify(userInfo))
						this.acceptTask(userInfo)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})

			},

			acceptTask(userInfo) {
				let cnt = {
					taskId: this.taskId, // Long 任务id
					userId: userInfo.userId, // Long 用户id
				}
				this.$api.acceptTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '../task'
						})
						uni.showToast({
							title: '接收成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			getStatusHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			navBack() {
				uni.navigateBack()
			}
		},

		onLoad(res) {
			this.taskId = res.id
		}
	}
</script>

<style lang="scss" scoped>
	.back-icon {
		width: 33rpx;
		height: 33rpx;
	}

	.view-title {
		font-size: 36rpx;
		color: #464042;
		line-height: 50rpx;
		font-weight: $group-title-weight;
	}

	.view-tip {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 14rpx;
		font-size: $group-font;
		line-height: 37rpx;
		color: #999999;

		image {
			width: 140.3rpx;
			height: 14rpx;
			margin: 0 20rpx;
		}
	}

	.bottom-tip {
		position: relative;
		margin: 28rpx 30rpx 0;
		border-radius: 6rpx;
		color: #FFA405;
		font-size: $group-font;
		line-height: 60rpx;
		padding: 0 43rpx 0 30rpx;
		background-color: rgba($color: #FFA405, $alpha: .1);

		&:after {
			content: '';
			position: absolute;
			top: -16rpx;
			left: 20rpx;
			border: 8rpx solid;
			border-color: transparent transparent rgba($color: #FFA405, $alpha: .1);
		}
	}

	.bottom-btn {
		position: fixed;
		display: block;
		width: 100%;
		bottom: 0;
		font-size: 36rpx;
		color: $group-color-w;
		line-height: 102rpx;
		border-radius: 6rpx;
		background-color: #182F45;

		&:after {
			border: none;
		}
	}

	.popup-box {
		width: 600rpx;
		height: 322rpx;
		box-sizing: border-box;
		padding: 70rpx 40rpx 40rpx;
		font-size: $group-font-befor;
		line-height: 42rpx;
		background-color: $group-color-w;
		border-radius: 4rpx;
		text-align: center;
	}

	.popup-btn-box {
		display: flex;
		margin-top: 90rpx;
		line-height: 80rpx;

		button {
			width: 250rpx;
			margin: 0 20rpx;
			box-sizing: border-box;
			color: $group-color;
			border-radius: 0;

			&:after {
				border: none;
			}
		}
	}

	.succ-btn {
		background-color: #00C8BE;
		color: $group-color-w !important;
	}

	.colse-btn {
		background: #FFFFFF;
		border: 1rpx solid $group-color-befor;
	}
</style>
