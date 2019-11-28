<template>
	<view class="auto-box" @click="click">
		<view :hidden="hiddenTitle">
			<text :hidden="hiddenIcon">*</text>
			<view class="right-title">{{title}}</view>
		</view>
		<view class="auto-input" :style="hiddenTitle?'margin-top:0;':''">
			<view>{{value}}</view>
			<image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: String,
			title: String,
			placeholder: String,
			hiddenTitle: {
				//隐藏标题
				type: Boolean,
				default: false
			},
			hiddenIcon: {
				//是否隐藏 '星号'
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			}
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.auto-box {
		padding: 30rpx 30rpx 10rpx;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: #999999;

		text {
			color: #FE5A6E;
		}
	}

	.auto-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 31rpx;
		height: 88rpx;
		border: 1rpx solid $group-color-befor;
		border-radius: 6rpx;
		padding: 0 30rpx;
		color: $group-color-article;

		image {
			width: 12rpx;
			height: 21rpx;
		}
	}

	.right-title {
		display: inline-block;
		margin-left: 10rpx;
	}
</style>
