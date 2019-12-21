<template>
	<view class="body">
		<view class="userBox">
			<image :src="constData.oss + item.posting.userHead" mode="aspectFill"></image>
			<view class="rightBox">
				<view>{{item.posting.userName}}</view>
				<view class="time">{{newTime(item.posting.postingCreateTime)}}</view>
			</view>
		</view>

		<view class="title">{{item.posting.postingTextDate}}</view>

		<view class="img-box" v-if="imgList.length > 3&&imgList.length < 9&&imgList.length != 6 ||imgList.length == 2">
			<view style="line-height: 0;" v-for="(item,index) in imgList" :key="index">
				<image v-if="index < 4" style="width:328rpx;height: 328rpx;" :style="(index + 1) % 2 == 0?'margin-right:0;':''"
				 :src="constData.oss + item" mode="aspectFill"></image>
			</view>
		</view>

		<view class="img-box" v-else>
			<view style="line-height: 0;" v-for="(item,index) in imgList" :key="index">
				<image :style="(index + 1) % 3 == 0?'margin-right:0;':''" :src="constData.oss + item" mode="aspectFill" v-if="index < 9"></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['item','imgList'],
		data() {
			return {
				constData: this.$constData
			}
		},
		methods: {
			newTime(time) {
				return this.$commen.getNewDate(time)
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
		font-size: $group-font-befor;
		color: #333333;
		line-height: $group-font-line;
		margin-top: 30rpx;
		box-sizing: border-box;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4; //需要显示时文本行数
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.img-box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 30rpx;

		image {
			width: 214rpx;
			height: 214rpx;
			margin: 0 14rpx 14rpx 0;
		}
	}

	.videoBtn {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.2);
		width: 100%;
		height: 100%;
		top: 0;

		image {
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -30upx;
			margin-top: -30upx;
			width: 60upx;
			height: 60upx;
		}
	}

	.userBox {
		position: relative;
		font-size: $group-font;
		line-height: $group-font-line;
		color: $group-color;

		image {
			position: absolute;
			top: 50%;
			margin-top: -30rpx;
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			overflow: hidden;
		}
	}

	.rightBox {
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

	.imgNum {
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: rgba($color: #587685, $alpha: 0.8);
		width: 64rpx;
		height: 30rpx;
		border-radius: 4rpx 0 4rpx 0;
		color: $group-color-w;
		font-size: $group-font-info;
		line-height: 30rpx;
		text-align: center;

		.iconfont {
			font-size: $group-font-info;
			line-height: 30rpx;
			margin-right: 6rpx;
		}
	}
</style>
