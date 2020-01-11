<template>
	<view class="auto-box">
		<view :hidden="hiddenTitle">
			<text :hidden="hiddenIcon">*</text>
			<view class="right-title">{{title}}</view>
			<view class="max-tip" v-if="textLength == 500">
				<image src="/static/image/icon/icon_ts_r.png" mode="aspectFit"></image>
				请输入500个以内的字符
			</view>
		</view>
		<view class="auto-input" :style="hiddenTitle?'margin-top:0;':''">
			<textarea class="textarea" :hidden="inputHidden" type="text" :value="value" :placeholder="placeholder"
			 placeholder-style="color:#B6C4D2;" @input="onInput" maxlength="500" />
			<view class="text-tip">(<text>{{textLength}}</text>/500)</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'DataTextarea',
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
				textLength:0,
			}
		},
		methods: {
			onInput(e) {
				//传出值
				this.$emit('input', e.target.value)
				this.textLength = e.target.value.length
			},
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
		flex-wrap: wrap;
		justify-content: flex-end;
		box-sizing: border-box;
		margin-top: 31rpx;
		height: 193rpx;
		border: 1rpx solid $group-color-befor;
		border-radius: 6rpx;
		padding: 30rpx 30rpx 20rpx;
		color: $group-color-article;

		.textarea {
			width: 630rpx;
			caret-color: #00C8BE;
			height: 108rpx;
		}
	}
	
	.text-tip{
		position: relative;
		display: flex;
		color: $group-color-befor;
		font-size: 22rpx;
		line-height: 30rpx;
		margin-top: 5rpx;
		
		text{
			color: $group-color;
		}
	}

	.right-title {
		display: inline-block;
		margin-left: 10rpx;
	}
	
	.max-tip{
		display: inline-flex;
		align-items: center;
		color: #FE5A6E;
		font-size: 22rpx;
		margin-left: 30rpx;
		
		image{
			width: 22rpx;
			height: 22rpx;
			margin-right: 10rpx;
		}
	}
</style>
