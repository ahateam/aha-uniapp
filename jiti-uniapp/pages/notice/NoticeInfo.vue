<template>
	<view>
		<view class="header-box">
			<view class="title-box">
				<span  class="poll-icon-color1 iconfont icon-gonggao1"></span>
			
				{{info.title}}
			</view>
		</view>
		<view class="content-timer">
				{{timer}}
		</view>
		<view class="content-box">
			{{info.content}}
		</view>
		<view class="footer-box">
			<button type="default" @click="toBack()">返回上一页</button>
		</view>
	</view>
</template>

<script>
	export default{
		name:'noticeInfo',
		data(){
			return{
				info:'',
				timer:'',
			}
		},
		methods:{
			toBack(){
				uni.navigateBack()
			},
			
		},
		onLoad(option){
			let info = JSON.parse(decodeURIComponent(option.info))
			this.info = info
			let date = new Date(info.createTime)
			this.timer = date.toLocaleDateString()
			console.log(info)
		}
	}
</script>

<style scoped lang="scss">
	.header-box {
		width: auto;
		padding: 20rpx;

	}
	
	.title-box {
		width: auto;
		line-height: 50rpx;
		color: #666;
		font-size: 32rpx;
	
		span {
			margin-right: 15rpx;
		}
	}
	.content-timer{
		width: auto;
		padding: 10rpx;
		margin-top: 10rpx;
		padding-right:60rpx; 
		line-height: 40rpx;
		font-size: 24rpx;
		color: $jiti-color-blue;
		text-align: right;
		border-bottom: 1px solid #eee;
		
	}
	.content-box{
		padding: 40rpx;
		color: #666;
		font-size: 28rpx;
	}
	.footer-box {
		margin-top: 30rpx;
		width: auto;
		padding: 40rpx;
	
	}
</style>
