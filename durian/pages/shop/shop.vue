<template>
	<view class="body">
		<view class="topBox">
			<view class="title_box">
				商城
			</view>
			<view class="searchBox" @click="navToAdd">
				<text class="iconfont icon-jia searchIcon"></text>
				<text class="iconText">我要发布商品</text>
			</view>
		</view>
		<view class="noShop">
			<image src="/static/image/noShop.png" mode="aspectFill"></image>
			<view style="margin-top: 81rpx;">暂无商品</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},

		onLoad() {},

		methods: {}
	}
</script>

<style lang="scss" scoped>
	.body {
		padding: 0 $group-margin-left;
		// font-family: 'appleFont';
	}

	.topBox {
		position: relative;
	}

	.title_box {
		font-size: $group-font-big;
		line-height: $group-font-big-line;
		font-weight: $group-title-weight;
		color: $group-color;
	}

	.searchBox {
		position: absolute;
		right: 0;
		top: $group-margin-s;
		height: $group-font-big;
		box-sizing: border-box;
		display: inline-block;
		font-size: $group-font;
		color: $group-color-curr;
		overflow: hidden;
		padding: 7rpx $group-margin-befor;

		.searchIcon {
			font-size: $group-font;
			margin-right: 9rpx;
			vertical-align: middle;
		}
	}

	.iconText {
		vertical-align: middle;
	}
	
	.noShop{
		margin-top: 250rpx;
		text-align: center;
		font-size: $group-font-befor;
		color: $group-color-befor;
		image{
			width: 140rpx;
			height: 140rpx;
		}
	}
</style>
