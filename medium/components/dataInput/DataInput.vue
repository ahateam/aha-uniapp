<template>
	<view class="auto-box">
		<view :hidden="hiddenTitle">
			<text :hidden="hiddenIcon">*</text>
			<view class="right-title">{{title}}</view>
		</view>
		<view class="auto-input" :style="hiddenTitle?'margin-top:0;':''">
			<input :hidden="inputHidden" type="text" :value="value" :placeholder="placeholder" @input="onInput" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: String,
			title: String,
			placeholder: String,
			inputHidden: {
				//隐藏input
				type: Boolean,
				default: false
			},
			hiddenTitle: {
				//隐藏标题
				type: Boolean,
				default: false
			},
			maxlength: {
				//最大长度
				type: [Number, String],
				default: 150,
			},
			hiddenIcon: {
				//是否隐藏 '星号'
				type: Boolean,
				default: false
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		data() {
			return {

			}
		},
		methods: {
			onInput(e) {
				//传出值
				this.$emit('input', e.target.value)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.auto-box {
		padding: 30rpx 30rpx 10rpx;
		font-size: $group-color-befor;
		line-height: $group-font-befor-line;
		color: #999999;

		text {
			color: #FE5A6E;
		}
	}

	.auto-input {
		display: flex;
		align-items: center;
		margin-top: 31rpx;
		height: 88rpx;
		border: 1rpx solid $group-color-befor;
		border-radius: 6rpx;
		padding: 0 30rpx;

		input {
			flex: 1;
			color: $group-color-article;
		}
	}

	.right-title {
		display: inline-block;
		margin-left: 10rpx;
	}
</style>
