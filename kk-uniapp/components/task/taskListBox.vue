<template>
	<view class="body">
		<view class="titleBox">{{title}}</view>
		<!-- <view class="rightBox">{{money}}元</view> -->
		<view class="contentBox">{{text}}</view>
		<view class="bottomBox" v-if="head">
			<view class="headImg">
				<image :src="head" mode="aspectFill"></image>
			</view>
			<text class="nameBox">{{name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['title', 'text', 'name', 'state', 'head'],
		data() {
			return {};
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		position: relative;
		padding: $box-margin-top $box-margin-left;
	}

	.titleBox {
		font-size: $list-title;
		width: 65vw;
		// font-weight: bold;
		word-break: break-all;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rightBox {
		position: absolute;
		color: red;
		font-size: 32upx;
		right: 20upx;
		top: 0;
	}

	.contentBox {
		font-size: $list-info;
		margin: 15upx 0;
		margin-left: 15upx;
		color: $list-info-color;
		word-break: break-all;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.headImg {
		position: absolute;
		top: 50%;
		margin-top: -10px;
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 100px;
		overflow: hidden;

		image {
			width: 20px;
		}
	}

	.nameBox {
		position: absolute;
		color: $list-info-color;
		top: 50%;
		margin-top: -8px;
		font-size: $list-info;
		margin-left: 25px;
		line-height: 16px;
	}

	.bottomBox {
		position: relative;
		height: 50upx;
	}
</style>
