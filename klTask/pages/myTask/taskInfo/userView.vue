<template>
	<view>
		<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image></view>
		<image :src="userHead" mode="widthFix"></image>
		<view class="bottom-btn" @click="TaskApplyConfirm">接受报价，马上付款</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderId: '',
			taskId: '',
			userHead: ''
		};
	},
	methods: {
		TaskApplyConfirm() {
			let cnt = {
				id: this.orderId, // Long 订单id
				taskId: this.taskId // Long 任务id
			};
			this.$api.TaskApplyConfirm(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					uni.switchTab({
						url: '../myTask'
					});
					uni.showToast({
						title: '成功',
						icon: 'none'
					});
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		navBack() {
			uni.navigateBack();
		}
	},
	onLoad(res) {
		this.orderId = res.id;
		this.taskId = res.taskId;
		this.userHead = res.head;
	}
};
</script>

<style lang="scss" scoped>
.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	padding-top: var(--status-bar-height);
	height: 88rpx;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.bottom-btn {
	margin: 20rpx auto;
	width: 690rpx;
	line-height: 102rpx;
	background-color: #0f1b07;
	color: #ffffff;
	font-size: 30rpx;
	text-align: center;
	border-radius: 6rpx;
}
</style>
