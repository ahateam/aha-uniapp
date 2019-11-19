<template>
	<view class="body">
		<navBar :back="false" type="transparent" fontColor="#000">
			<view slot="left" class="iconfont icon-fanhui backBtn" @click="navBack"></view>
			<view class="title-box">付款成功</view>
		</navBar>
		<view style="padding-top: 64px;"></view>
		<image class="imgBox" src="/static/image/shop/dhcg.png" mode="aspectFit"></image>
		<view class="titleText">兑换成功</view>
		<view class="tipText">可在我的商品中查看哦</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	export default {
		components: {
			navBar
		},
		data() {
			return {

			};
		},
		methods:{
			navBack(){
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		text-align: center;
	}
	
	.backBtn {
		position: absolute;
		left: 29rpx;
		font-size: 33rpx;
		color: $group-color;
	}

	.title-box {
		font-weight: $group-title-weight;
		font-size: 36rpx;
	}
	
	.imgBox{
		margin-top: 120rpx;
		width: 233rpx;
		height: 327rpx;
	}
	
	.titleText{
		color: #666666;
		font-size: 40rpx;
		line-height: 56rpx;
		margin-top: 60rpx;
	}
	
	.tipText{
		margin-top: 20rpx;
		color: #999999;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
	}
</style>
