<template>
	<view class="otherFct">
		<view class="otherTitle">
			其他登录方式
		</view>
		<view class="otherLogin" @click="loginWx">
			<view class="iconfont icon-wechat"></view>
		</view>
		<view class="tipBox">
			登录即代表同意<text class="navTip" @click="navToTip(0)">用户协议</text>和<text class="navTip" @click="navToTip(1)">隐私政策</text>
		</view>
	</view>
</template>

<script>
	
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			//微信登录
			loginWx(){
				uni.showToast({
					title:'功能开发中',
					icon:'none'
				})
			},
			
			//跳转条约页
			navToTip(e){
				if(e == 0){
					uni.navigateTo({
						url:'/pages/login/Treaty/Treaty'
					})
				}else{
					uni.navigateTo({
						url:'/pages/login/Treaty/secret'
					})
				}
				
			},
		}
	}
	
</script>

<style lang="scss" scoped>
	.otherFct {
		position: absolute;
		width: 750rpx;
		text-align: center;
		bottom: 0;
		color: #FFFFFF;
	}
	
	.otherTitle {
		font-size: 30rpx;
		line-height: 42rpx;
		margin-bottom: 34rpx;
	}
	
	.otherLogin {
		border-radius: 50%;
		border: 1rpx solid #B6C4D2;
		box-sizing: border-box;
		display: inline-block;
		width: 100rpx;
		height: 100rpx;
		margin-bottom: 73rpx;
	
		.iconfont {
			line-height: 100rpx;
			font-size: 46rpx;
		}
	}
	
	.tipBox {
		margin-bottom: 51rpx;
		color: rgba($color: #FFFFFF, $alpha: 0.5);
		font-size: 24rpx;
		line-height: 33rpx;
	}
	
	.navTip {
		color: #64BCCC;
		margin: 0 10rpx;
	}
</style>
