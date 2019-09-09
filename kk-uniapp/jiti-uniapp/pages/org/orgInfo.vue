<template>
	<view>
		<view class="maincon orgInfo-box">
			<view class="org-item">
				<view class="org-name">机构名称：</view>
				<view class="org-res">经济合作社</view>
			</view>
			<view class="org-item">
				<view class="org-name">机构地址：</view>
				<view class="org-res">贵州省遵义市</view>
			</view>
			<view class="org-item">
				<view class="org-name">机构股份：</view>
				<view class="org-res">177898</view>
			</view>
			<view class="org-item-img">
				<view class="org-name">集体经济代码证书：</view>
				<view class="org-res">
					<image src="../../static/a.jpg" mode="aspectFit"></image>
				</view>
			</view>
			<view class="org-item-img">
				<view class="org-name">集体经济授权证书：</view>
				<view class="org-res">
					<image src="../../static/a.jpg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
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
</style>
