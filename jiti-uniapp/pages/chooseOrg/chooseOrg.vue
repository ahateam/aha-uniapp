<template>
	<view>
		<view class="maincon choose-box">
			<view class="choose-item">
				<view class="title">新一代经济合作社</view>
				<view class="line"></view>
				<view class="org-address">贵州省遵义市黄花冈区北京路514号</view>
			</view>
			<view class="choose-item">
				<view class="title">新一代经济合作社</view>
				<view class="line"></view>
				<view class="org-address">贵州省遵义市黄花冈区北京路514号</view>
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
</style>
