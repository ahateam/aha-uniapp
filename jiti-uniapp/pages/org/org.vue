<template>
	<view>
		<view class="org-box">
			<view class="org-base" @click="toOrgInfo">组织基础信息</view>
			<view class="org-base org-assets" @click="toOrgMoney">组织资产信息</view>
		</view>
		<view class="org-box">
			<button type="default">返回首页</button>
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
			toOrgInfo(){
				uni.navigateTo({
					url:"orgInfo",
					
				})
			},
			toOrgMoney(){
				uni.navigateTo({
					url:"orgMoney"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.org-box{
		width: 90%;
		margin: 50rpx auto 100rpx;
	}
	.org-base{
		width: 100%;
		height: 140rpx;
		text-align: center;
		line-height: 140rpx;
		color: #fff;
		font-size: 36rpx;
		background-color: #FFB400;
		border-radius: 20rpx;
	}
	.org-assets{
		background-color: #0A98D5;
		margin-top: 40rpx;
	}
</style>
