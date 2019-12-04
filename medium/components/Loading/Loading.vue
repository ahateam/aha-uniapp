<template>
	<view class="loading-box">
		<view class="radius"></view>
		<view>加载中</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loading-box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		padding-top: 50rpx;

		font-size: $group-font;
		color: #999999;
	}

	.radius {
		position: relative;
		top: -50rpx;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-color: #00C8BE;
		animation: float .54s linear infinite;
		margin-bottom: 5rpx;
	}

	@keyframes float {
		0% {
			top: -50rpx;
		}

		25% {
			top: -45rpx;
		}

		38% {
			top: -10rpx;
		}

		50% {
			top: 0rpx;
		}

		63% {
			top: -18rpx;
		}

		75% {
			top: -28rpx;
		}

		100% {
			top: -50rpx;
		}
	}
</style>
