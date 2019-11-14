<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#587685">
			<!-- <view slot="right" class="navTitle" @click="navToMobile">免密登录</view> -->
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
			<view slot="right" class="next-btn">跳过</view>
		</navBar>
		<view style="padding-top: 64px;"></view>

		<view class="title-box">
			告诉我们你的兴趣吧
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	
	export default {
		components:{
			navBar
		},
		data() {
			return {

			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-fanhui {
		font-size: 33rpx;
		position: absolute;
		left: 29rpx;
	}
	

	.title-box {
		margin:50rpx 0 10rpx 40rpx;
		font-size: 36rpx;
		color: #333333;
	}
	
	.next-btn{
		
	}
</style>
