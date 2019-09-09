<template>
	<view>
		<view class="maincon">
			<view class="family-box">
				<view class="title-text">原始家庭户信息</view>
				<view class="family-card">
					<view class="family-item">
						<view class="name-title">原始家庭户1：</view>
						<view class="name-res">晓华</view>
					</view>
					<view class="item-box">
						<view class="item-box-text">
							<view class="box-text1">李旭</view>
							<view class="box-text2">253523199902130256</view>
						</view>
						<view class="details-text">*</view>
					</view>
				</view>
			</view>
			
			<view class="family-box">
				<view class="title-text">分户操作后家庭户信息</view>
				<view class="family-card">
					<view class="family-item">
						<view class="name-title">分户操作后家庭户1：</view>
							<view class="name-res">晓华</view>
					</view>
					<view class="item-box">
						<view class="item-box-text">
							<view class="box-text1">晓华</view>
							<view class="box-text2">253523199902130256</view>
						</view>
						<view class="details-text">移入</view>
					</view>
					<view class="item-box">
						<view class="item-box-text">
							<view class="box-text1">晓华</view>
							<view class="box-text2">253523199902130256</view>
						</view>
						<view class="details-text">移入</view>
					</view>
				</view>
			</view>
			<button type="primary">审批通过</button>
			<button type="default">返回首页</button>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.family-box{
		width: 100%;
		margin-bottom: 40rpx;
	}
	.title-text{
		width: 100%;
		height: 60rpx;
		font-size: 34rpx;
		line-height: 60rpx;
		color: #44BB00;
	}
	.family-card{
		width: 100%;
		font-size: 28rpx;
		box-shadow: 0px 4px 8px rgba(0,0,0,0.08);
	}
	.family-item{
		width: 100%;
		height:60rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #DDDDDD;
	}
	.name-title{
		width: 40%;
		margin-left: 20rpx;
		line-height: 60rpx;
	}
	.name-res{
		width: 60%;
		line-height: 60rpx;

	}
	.item-box{
		width: 100%;
		height: 102rpx;
		background: #fff;
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #DDDDDD;
	}
	.item-box-text{
		width: 65%;
		margin-left: 20rpx;
	}
	.item-box-text view{
		height: 51rpx;
		line-height: 51rpx;
	}
	.box-text1{
		font-size: 28rpx;
	}
	.box-text2{
		font-size: 24rpx;
	}
	.details-text{
		width: 35%;
		height: 102rpx;
		text-align: center;
		line-height: 102rpx;
		color: red;
		font-size: 28rpx;
	}
</style>
