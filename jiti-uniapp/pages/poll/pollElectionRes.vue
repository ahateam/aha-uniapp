<template>
	<view class="title">1.投票标题</view>
	<view class="vote-item">
		<view class="max_text">最多可以选投: 3个选项</view>
		<view class="vote-item-status">
			<text style="color:#40c9c6">表决未完成</text>
			<!-- <span v-if=false style="color: #909399">表决失效</text>
			<text v-if=false style="color: #67C23A">表决成功</text>
			<text v-if=false style="color: #F56C6C">表决失败</text> -->
		</view>
	</view>
	<view class="vote_text">应到总人数：82 人，已参投有效人数：0 人，已投票数：0票，其中弃权人数：0 人，未参投人数：82 人</view>
</template>

<script>
</script>

<style>
	.title{
		width: 98%;
		border-bottom: 2rpx solid #F5F5F5;
		margin: 10rpx auto;
	}
	.vote-item{
		width: 98%;
		height: 40rpx;
		margin: 10rpx auto;
		font-size: 24rpx;
		color: #666;
		display: flex;
		justify-content: space-between;
	}
	.max_text{
		width: 300rpx;
		height: 40rpx;
	}
	.vote_text{
		width: 98%;
		margin: 40rpx auto;
		background-color: #fff7cc;
		border: 2rpx solid ##fceea0;
		border-radius: 5%;
		color: #f56723;
		font-size: 28rpx;
	}
</style>
