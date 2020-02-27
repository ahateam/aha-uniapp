<template>
	<view class="loading-box" :style="status != 'onload'?'opacity:0;pointer-events: none;':''">
		<view class="radius"></view>
		<view>加载中</view>
	</view>
</template>

<script>
	export default {
		name: 'Loading',
		props: {
			status: {
				type: String,
				default: 'onload'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading-box {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		opacity: 1;
		transition: all .8s;

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
