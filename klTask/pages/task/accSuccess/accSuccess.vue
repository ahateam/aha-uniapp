<template>
	<view class="page">
		<view class="nav-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image></view>
		<view style="position: relative;">
			<image class="bg-img" src="/static/image/task/pic_bjtjcg.png" mode="aspectFill"></image>
			<view class="bg-font">恭喜 ! 🎉</view>
		</view>
		<view class="flex-box bottom-info">
			<view>报价已经交给 @莉莉亚·贝达</view>
			<view>请耐心等待</view>
			<view class="tip-box">你也可以在-我的任务-我接收的 查看此次报价的最新消息。如果“昵称”接受了新的报价，我们会第一时间给你发送消息。</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		navBack() {
			uni.switchTab({
				url: '../task'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	background-color: $group-color-curr;
	color: #ffffff;
	min-height: 100vh;
}

.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	position: absolute;
	top: 0;
	padding-top: $status-height;
	height: 88rpx;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 30rpx;
	width: 33rpx;
	height: 33rpx;
}

.bg-img {
	width: 100vw;
	height: 780rpx;
	margin-top: 121rpx;
}

.bg-font {
	position: absolute;
	bottom: 0;
	text-align: center;
	width: 100%;
	font-size: 50rpx;
	line-height: 70rpx;
}

.bottom-info {
	flex-direction: column;
	justify-content: center;
	margin-top: 31rpx;
	font-size: 30rpx;
	line-height: 42rpx;
}

.tip-box {
	margin-top: 60rpx;
	font-size: 26rpx;
	line-height: 37rpx;
	width: 600rpx;
}
</style>
