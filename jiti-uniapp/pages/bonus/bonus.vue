<template>
	<view>
		<view class="box">
			<view class="money-box">
				<view class="money-img">
					<image src="../../static/mon.png" mode="aspectFit"></image>
				</view>
				<view class="money-text">我的分红总额</view>
				<view class="money-num">￥0.00</view>
			</view>
		</view>
		<button type="default">返回首页</button>
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
<style scoped lang="scss">
	.box{
		display: flex;
		justify-content: center;
		align-items: center;	
	}
	.money-box{
		width: 386rpx;
	}
	.money-img{
		width: 100%;
		height: 350rpx;
	}
	.money-img image{
		width: 400rpx
	}
	.money-text{
		width: 100%;
		height: 40rpx;
		color: #666666;
		text-align: center;
		margin-top: 40rpx;
	}
	.money-num{
		width: 100%;
		height: 100rpx;
		color: #666666;
		text-align: center;
		margin-top: 40rpx;
		font-size: 60rpx;
	}
	button{
		width: 90%;
		margin: 60rpx auto;
	}
</style>
