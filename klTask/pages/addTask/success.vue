<template>
	<view class="page">
		<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image></view>
		<image class="top-bg" src="/static/image/addTask/pic_fbcg.png" mode="aspectFit"></image>
		<view class="view-title">发布成功</view>
		<view class="tip-info">任务发布成功，在我的任务里可查看</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		navBack() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	height: 100vh;
	background-color: $group-color-bg;
	color: #ffffff;
	text-align: center;
}

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

.top-bg {
	width: 100vw;
	height: 510rpx;
}

.view-title {
	font-size: 50rpx;
	line-height: 70rpx;
	margin-top: 40rpx;
}

.tip-info {
	font-size: 30rpx;
	line-height: 42rpx;
	margin-top: 30rpx;
}
</style>
