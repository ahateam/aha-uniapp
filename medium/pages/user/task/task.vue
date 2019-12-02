<template>
	<view class="page">
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">任务总览</view>
		</nav-bar>
		<view class="box">
			<view class="title white">我发布的</view>
			<view class=" list-box white">
				<view class="list">
					<image src="/static/image/user/1574922875(1).png" mode=""></image>
					<view class="">已付款</view>
					<view class="list-red">1</view>
				</view>
				<view class="list">
					<image src="/static/image/user/1574922875(1).png" mode=""></image>
					<view class="">已付款</view>
					<view class="list-red">1</view>
				</view>
				<view class="list">
					<image src="/static/image/user/1574922875(1).png" mode=""></image>
					<view class="">已付款</view>
					<view class="list-red">1</view>
				</view>
				<view class="list">
					<image src="/static/image/user/1574922875(1).png" mode=""></image>
					<view class="">已付款</view>
					<view class="list-red">1</view>
				</view>
			</view>
		</view>
		<!-- dsadsad-->
		<view class="box">
			<view class="title white">我接收的</view>
			<view class=" list-box white uni-flex-just">
				<view class="list">
					<image src="/static/image/user/1574922875(1).png" mode=""></image>
					<view class="">已付款</view>
					<view class="list-red">1</view>
				</view>
				<view class="list">
					<image src="/static/image/user/1574922875(1).png" mode=""></image>
					<view class="">已付款</view>
					<view class="list-red">1</view>
				</view>
				<view class="list">
					<image src="/static/image/user/1574922875(1).png" mode=""></image>
					<view class="">已付款</view>
					<view class="list-red">1</view>
				</view>
			</view>
		</view>
		<view class="title white">游览历史</view>
		<view class="history">
			<view class="">
				<image class="history-img" src="/static/image/icon/icon_l.png" mode="aspectFit"></image>
			</view>
			<view>2019-10-01</view>
			<view class="">
				<image class="history-img" src="/static/image/icon/icon_r.png" mode="aspectFit"></image>
			</view>
		</view>
		
		
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
	.history{
		display: flex;
		justify-content: center;
	
	}
	.history >view{
		margin: 20rpx 25rpx;
		color: #999999;
		font-size: 26rpx;
		
	}
	.history-img{
		width: 140.35rpx;
		height: 1rpx;
		color: #B6C4D2;
		
	}
	.box {
		margin-bottom: 20rpx;
	}

	.list-box {
		display: flex;
		flex-direction: row;
	}

.uni-flex-just{
	display: flex;
	justify-content: space-between;
}
	.list {
		width: 136rpx;
		margin-left: 52rpx;
		position: relative;
		margin-bottom: 30rpx;
	}

	.list>image {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 20rpx;
		margin-top: 29rpx;
		margin-left: 25rpx;
	}

	.list>text {
		font-size: 28rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #666666;
	}

	.list-red {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 3rpx solid #EE455A;
		position: absolute;
		top: 0;
		left: 70rpx;
		color: #EE455A;
		font-size: 22rpx;
		text-align: center;
	}

	.page {
		background-color: #F2F5F7;
	}

	.white {
		background-color: #FFFFFF;
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

	// 导航 end
	.title {
		padding: 30rpx 0 30rpx 40rpx;
		color: #333333;
		font-size: 34rpx;
	}
</style>
