<template>
	<view>
		<view v-if="toUserInfo">
			<view class="nav-box">
				<div class="nav-box">
					<div class="back-btn" @click="backBtn()">
						<i class="iconfont icon-fanhui"></i>
					</div>
					<div class="title-box">{{toUserInfo.userName}}</div>
				</div>
			</view>
			<view class="message-list">
				<list :TIM="TIMDATA"></list>
			</view>
		</view>
	</view>

</template>
<script>
	import list from './tim/list'
	import client from '../../commen/tim/ossTim.js'
	export default {
		name: 'msssage',
		data() {
			return {
				toUserInfo: '',
				TIMDATA: null
			}
		},
		components: {
			list
		},
		methods: {
			getUserInfo(id) {
				let cnt = {
					userId: id
				}
				this.$api.getUserInfo(cnt, (res) => {
					console.log(res)
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.toUserInfo = this.$util.tryParseJson(res.data.c)
						uni.setStorageSync('toUserInfo', res.data.c)

					} else {
						uni.showToast({
							icon: '该用户不在线，请重新选择...'
						})
						uni.navigateBack()
					}
				})

			},

			backBtn() {
				uni.removeStorageSync('toUserId');
				uni.removeStorageSync('toUserInfo');
				uni.switchTab({
					url: './index'
				})
			}
		},
		mounted() {
			console.log(client)
			this.TIMDATA = this.TIM
			let toUserId = uni.getStorageSync('toUserId')

			this.getUserInfo(toUserId)


		}
	}
</script>
<style scoped lang="scss">
	.nav-box {
		width: 100%;
		height: 88rpx;
		background: #fff;
	}

	.back-btn {
		float: left;
		width: 50rpx;
		height: 50rpx;
		padding: 19rpx 20rpx;
	}

	.back-btn i {
		width: 50rpx;
		height: 50rpx;
		font-size: 32rpx;
		line-height: 50rpx;
		text-align: center;
		color: #587685;
	}

	.title-box {
		float: left;
		width: 560rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 36rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.nav-box {
		position: fixed;
		top: 0;
		padding-top: var(--status-bar-height);
		height: calc(var(--status-bar-height) + 88rpx);
		box-sizing: border-box;
		width: 100%;
		z-index: 100;
		background: #fff;
	}

	.message-list {
		padding-top: 88rpx;
	}
</style>
