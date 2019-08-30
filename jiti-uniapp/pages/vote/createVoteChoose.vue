<template>
	<view>
		<view class="maincon choose-box">
			<view class="choose-item">
				<view class="title">普通投票表决</view>
				<view class="line"></view>
				<view class="org-address">创建普通投票表决事件入口</view>
			</view>
			<view class="choose-item xuanju">
				<view class="title">选举表决事件</view>
				<view class="line"></view>
				<view class="org-address">创建选举表决事件的入口</view>
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
			
		}
	}
</script>

<style>
	.choose-item{
		width: 660rpx;
		height: 200rpx;
		background-color: #0A98D5;
		border-radius: 20rpx;
	}
	.choose-item view{
		margin: 20rpx;
		color: #FFFFFF;
	}
	.title{
		padding-top: 40rpx;
		font-size: 32rpx;
	}
	.line{
		width: 60rpx;
		height: 8rpx;
		background-color: #FFFFFF;
	}
	.org-address{
		font-size: 24rpx;
	}
	.xuanju{
		background-color: #40c9c6;
	}
		
</style>
