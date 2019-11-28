<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">任务总览</view>
		</nav-bar>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		name: 'assistant',
		components: {
			navBar
		},
		data() {
			return {

			}
		},
		methods: {
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
</style>
