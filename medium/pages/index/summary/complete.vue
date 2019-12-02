<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">发布成功</view>
		</nav-bar>

		<view class="content-box">
			<image src="/static/image/bg-ly.png" mode="aspectFit"></image>
			<view class="data-title">发布成功</view>
			<view class="data-info">您可在我的任务里查看</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		components: {
			navBar
		},
		data() {
			return {

			};
		},
		methods: {
			navBack() {
				uni.switchTab({
					url: '/pages/index/index'
				})
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

	.content-box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 161rpx;

		image {
			width: 200rpx;
			height: 226rpx;
		}
	}

	.data-title {
		margin-top: 101rpx;
		font-size: 40rpx;
		color: #333333;
		line-height: 56rpx;
	}

	.data-info {
		margin-top: 20rpx;
		font-size: $group-font-befor;
		color: #999999;
		line-height: 42rpx;
	}
</style>
