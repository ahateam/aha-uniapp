<template>
	<view>
		<view class="maincon orgInfo-box">
			<view class="org-item">
				<view class="org-name">机构名称：</view>
				<view class="org-res">经济合作社</view>
			</view>
			<view class="org-item">
				<view class="org-name">组织资金：</view>
				<view class="org-res">￥123121</view>
			</view>
			<view class="org-item">
				<view class="org-name">负债资金：</view>
				<view class="org-res">0</view>
			</view>
			<view class="org-item">
				<view class="org-name">债权资金：</view>
				<view class="org-res">177898</view>
			</view>
			<view class="org-item">
				<view class="org-name">年毛收入：</view>
				<view class="org-res">177898</view>
			</view>
			<view class="org-item">
				<view class="org-name">每股分红：</view>
				<view class="org-res">177898</view>
			</view>
			<view class="org-item">
				<view class="org-name">工作预算：</view>
				<view class="org-res">177898</view>
			</view>
			<view class="org-item">
				<view class="org-name">剩余工作预算：</view>
				<view class="org-res">177898</view>
			</view>
			<view class="org-item">
				<view class="org-name">对外投资：</view>
				<view class="org-res">177898</view>
			</view>
			<view class="org-item">
				<view class="org-name">资产估值：</view>
				<view class="org-res">177898</view>
			</view>
			 <button type="primary">查看资产详情</button>
			<button type="default">返回首页</button>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.org-item{
		width: 100%;
		height: 88rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #DDDDDD;
	}
	.org-item view{
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
	}
	.org-name{
		width: 40%;
	}
	.org-res{
		width: 60%;
		color: #969799;
	}
	image{
		width:650rpx;
	}
	.org-item-img{
		font-size: 30rpx;
		margin-top: 20rpx;
	}
	button{
		margin-top: 40rpx;
	}
</style>
