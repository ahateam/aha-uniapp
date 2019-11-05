<template>
	<view>
		<view class="contentList" v-for="(item,index) in list" :key="index">
			<view class="titleBox">{{item.title}}</view>
			<view class="priceBox">{{item.price}}</view>
			<image :src="item.src" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:['list'],
		data() {
			return {

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
</style>
