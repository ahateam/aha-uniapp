<template>
	<view>
		<view class="maincon">
			
			<view class="share-box">
				<view class="title-text">原始用户信息</view>
				<view class="share-card">
					<view class="share-item">
						<view class="name-title">姓名：</view>
							<view class="name-res">晓华</view>
					</view>
					<view class="share-item">
						<view class="name-title">身份证号：</view>
							<view class="name-res">253523199902130256</view>
					</view>
					<view class="share-item">
						<view class="name-title">手机号：</view>
							<view class="name-res">18312361236</view>
					</view>
					<view class="share-item">
						<view class="name-title">股份数：</view>
							<view class="name-res">184</view>
					</view>
				</view>
			</view>
			
			<view class="share-box">
				<view class="title-text">股权变更后用户信息</view>
				<view class="share-card">
					<view class="share-item">
						<view class="name-title">姓名：</view>
							<view class="name-res">晓华</view>
					</view>
					<view class="share-item">
						<view class="name-title">身份证号：</view>
							<view class="name-res">253523199902130256</view>
					</view>
					<view class="share-item">
						<view class="name-title">手机号：</view>
							<view class="name-res">18312361236</view>
					</view>
					<view class="share-item">
						<view class="name-title">股份数：</view>
							<view class="name-res">184</view>
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
	.share-box{
		margin-bottom: 40rpx;
		width: 100%;
	}
	.title-text{
		font-size: 36rpx;
		color: #44BB00;
		margin-bottom: 20rpx;
	}
	.share-card{
		width: 100%;
		font-size: 28rpx;
		box-shadow: 0px 4px 8px rgba(0,0,0,0.08);
	}
	.share-item{
		width: 100%;
		height: 88rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #DDDDDD;
	}
	.share-item view{
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
	}
	.name-title{
		width: 40%;
		margin-left: 20rpx;
	}
	.name-res{
		width: 60%;
	}
</style>
