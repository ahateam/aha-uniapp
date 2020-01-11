<template>
	<view>
		<view class="loading-box">
			<view class="left"></view>
			<view class="right"></view>
		</view>
		<view class="text-box">刷新中</view>
	</view>
</template>

<script>
	export default {
		name: 'LoadingIcons',
		props: {
			status: {
				type: String,
				default: 'onload'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-box {
		color: #999999;
		font-size: $group-font;
		text-align: center;
	}

	.loading-box {
		margin: 0 auto 20rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.left,
	.right {
		position: relative;
		width: 35rpx;
		height: 35rpx;
		border-radius: 50%;

	}

	.left {
		background-color: #000000;
		animation: left .8s linear infinite;
	}

	.right {
		background-color: #00C8BE;
		animation: right .8s linear infinite;
	}

	@-webkit-keyframes left {
		0% {
			left: 0px;
			z-index: 0;
		}

		50% {
			left: 35rpx;
			z-index: 0;
		}

		51% {
			left: 34.9rpx;
			z-index: 1;
		}

		100% {
			left: 0px;
			z-index: 1
		}
	}

	@-webkit-keyframes right {
		0% {
			left: 0px;
			z-index: 1
		}

		50% {
			left: -35rpx;
			z-index: 1
		}

		51% {
			left: -34.9rpx;
			z-index: 0;
		}

		100% {
			left: 0px;
			z-index: 0;
		}
	}
</style>
