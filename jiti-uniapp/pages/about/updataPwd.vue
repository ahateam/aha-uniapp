<template>
	<view class="maincon">
		<view class="up-box">
			<view class="title">
				<view class="user-name">用户名：白曙光</view>
			</view>
			<view class="up-item">
				<view>输入你要设置的新密码</view>
				<input type="text" password="true" placeholder="请输入密码" placeholder-class="place-holder"/>
			</view>
			<view class="up-item">
				<view>再一次输入你要设置的新密码</view>
				<input type="text" password="true" placeholder="请输入密码" placeholder-class="place-holder"/>
			</view>
		</view>
		<button type="primary">确定更改</button>
		<button type="default">取消</button>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	page{
		
	}
	.up-box{
		margin-bottom: 200rpx;
	}
	.title{
		margin-bottom: 100rpx;
	}
	.up-item{
		width: 100%;
		margin: 40rpx auto 40rpx;
		font-size: 36rpx;
	}
	.up-item input{
		margin-top: 20rpx;
		height: 74rpx;
		border-bottom: #ced9ff solid 3rpx;
	}
	
</style>
