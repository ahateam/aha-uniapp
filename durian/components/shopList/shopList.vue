<template>
	<view>
		<view class="contentList" :style="item.type == 1?cardBg:''" v-for="(item,index) in list" :key="index">
			<!-- <image src="" mode=""></image> -->
			<view class="titleBox">{{item.title}}</view>
			<view class="priceBox" :style="item.type == 1?cardInfo:''">{{item.price}}</view>
			<image :src="item.src" mode="aspectFill" v-if="item.type == 0"></image>
			<view class="cardPrice" v-else-if="item.type == 1">
				平台币{{item.cardPrice}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['list'],
		data() {
			return {
				cardInfo:'color:#B6C4D2',
				cardBg:'background:linear-gradient(120deg, #DCE4EB, #B6C4D2);'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contentList {
		position: relative;
		width: 670rpx;
		height: 180rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
		background-color: #F9FAFB;
		border-radius: 6rpx;
		padding: 15rpx 20rpx 15rpx 30rpx;

		image {
			position: absolute;
			top: 15rpx;
			right: 20rpx;
			width: 150rpx;
			height: 150rpx;
			border-radius: 6rpx;
		}
	}

	.titleBox {
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: $group-color-article;
		margin-top: 25rpx;
		margin-bottom: 20rpx;
		margin-right: 155rpx;
		word-break:keep-all;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	
	.priceBox{
		font-size: 28rpx;
		line-height: 40rpx;
		color: $group-color-curr;
	}
	
	.cardPrice{
		position: absolute;
		top: 50%;
		right: 20rpx;
		font-size: 28rpx;
		line-height: 50rpx;
		height: 50rpx;
		padding: 0 20rpx;
		margin-top: -25rpx;
		color: $group-color-curr;
		border: 1rpx solid $group-color-curr;
		border-radius: 25rpx;
	}
</style>
