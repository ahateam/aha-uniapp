<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">帮助中心</view>
		</nav-bar>
		<view class="top">产品重要功能说明</view>

		<view class="content-list" v-for="(item,index) in list" :key="index">
			<view class="con-list-left">
				<image class="con-list-img" :src="item.src" mode="widthFix"></image>
				<view class="">{{item.text}}</view>
			</view>
			<image class="jian-tou" src="/static/image/icon/icon_enter.png" mode="widthFix"></image>
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
				list: [{
						src: '/static/image/user/1.png',
						text: '如何保证自己的费用按时收取'
					},
					{
						src: '/static/image/user/2.png',
						text: '什么人可以发布任务'
					},
					{
						src: '/static/image/user/3.png',
						text: '对中介的各种要求等等'
					}
				]
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
	.top {
		color: #333333;
		font-size: 30rpx;
		height: 42rpx;
		padding: 40rpx 0 10rpx 60rpx;
	}

	.content-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #F2F5F7;
		margin: 30rpx;
	}

	.con-list-img {
		width: 120rpx;
		height: 100rpx;
	}

	.con-list-left {
		display: flex;
		align-items: center;
	}

	.con-list-left>view {
		height: 42rpx;
		line-height: 42rpx;
		color: #587685;
		font-size: 30rpx;
		padding-left: 13rpx;
	}

	.jian-tou {
		display: block;
		width: 12rpx;
		height: 21rpx;
		padding-right: 30rpx;
	}

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
