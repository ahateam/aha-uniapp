<template>
	<view class="body">
		<navBar :back="false" type="transparent" fontColor="#000">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="title-box">付款成功</view>
		</navBar>
		
		<view :style="{'padding-top': getNavHeight()}"></view>
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
			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		text-align: center;
	}
	
	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
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
