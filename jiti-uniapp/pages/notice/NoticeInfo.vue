<template>
	<view>
		<view class="maincon noticeInfo-box">
			<view class="title">
				公告标题
			</view>
			<view class="content">
				公告内容abcdefg
			</view>
			
				<button type="primary" @click="back">我知道了</button>
			
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
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	.title{
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		border-bottom: #F1F1F1 2rpx solid;
	}
	.content{
		margin-top: 20rpx;
		font-size: 32rpx;
	}
	button{
		margin-top: 200rpx;
	}
</style>
