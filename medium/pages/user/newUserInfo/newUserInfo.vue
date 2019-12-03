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

	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import DataInput from '@/components/dataInput/DataInput.vue'

	export default {
		components: {
			navBar,
			DataInput
		},
		data() {
			return {

			};
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
