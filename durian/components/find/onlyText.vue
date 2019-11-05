<template>
	<view class="body">
		<view class="userBox">
			<image :src="upHead" mode="aspectFill"></image>
			<view class="rightBox">
				<view>{{upName}}</view>
				<view class="time">{{time}}</view>
			</view>
		</view>
		
		<view class="title">{{title}}</view>
	</view>
</template>

<script>
	export default {
		props: ['title', 'upName', 'time', 'type','upHead'],
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		min-height: 170rpx;
	}

	.title {
		font-size: $group-font;
		color: $group-color;
		line-height: $group-font-line;
		margin-top: 30rpx;
		box-sizing: border-box;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; //需要显示时文本行数
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.userBox {
		position: relative;
		font-size: $group-font;
		line-height: $group-font-line;
		color: $group-color;
		
		image{
			position: absolute;
			top: 50%;
			margin-top: -30rpx;
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			overflow: hidden;
		}
	}
	
	.rightBox{
		margin-left: 80rpx;
		font-size: $group-font;
		line-height: $group-font-line;
	}

	.time {
		font-size: $group-font-info;
		line-height: $group-font-info;
		color: $group-color-befor;
		margin-top: $group-margin-s;
	}
</style>
