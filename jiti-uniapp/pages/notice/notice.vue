<template>
	<view>
		<view class="maincon notice-box">
			<view class="notice-item" @click="toNoticeInfo">
				<view class="notice-text">公告1：这就是公告</view>
			</view>
			<view class="notice-item">
				<view class="notice-text">公告2：这就是公告</view>
			</view>
			<view class="notice-item">
				<view class="notice-text">公告3：这就是公告</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toNoticeInfo(){
				uni.navigateTo({
					url:"NoticeInfo"
				})
			}
		}
	}
</script>

<style>
	.notice-item{
		width: 100%;
		height: 80rpx;
		border-radius: 40rpx;
		margin-bottom: 20rpx;
		box-shadow: 0px 4px 8px rgba(0,0,0,0.08);
		font-size: 32rpx;
		line-height: 80rpx;
	}
	.notice-text{
		margin-left: 20rpx;
	}
</style>
