<template>
	<view class="body">
		<view class="userBox">
			<image :src="constData.oss + upHead" mode="aspectFill"></image>
			<view class="rightBox">
				<view>{{upName}}</view>
				<view class="time">{{time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['upName', 'time', 'upHead'],
		data() {
			return {
				id: 123456,
				constData: this.$constData
			}
		},
		methods: {
			zan() {
				this.$emit('zan', this.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		position: relative;
		width: 100%;
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

	.zan-box {
		position: absolute;
		right: 0;
		top: 50%;
		margin-top: calc(-40rpx/2);
		font-size: $group-font;
		line-height: $group-font-line;
		color: $group-color-befor;

		.iconfont {
			margin-right: $group-margin-s;
		}
	}

	.iconCurr {
		color: $group-color-curr;
	}
</style>
