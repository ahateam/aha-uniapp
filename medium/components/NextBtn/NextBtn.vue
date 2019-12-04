<template>
	<view>
		<button :class="[{'auto-btn':type == 'primary'},{'wihte-btn':type == 'default'}]" :style="{'border-radius':radius}"
		 @click="click">{{title}}</button>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '下一步'
			},
			type: {
				type: String,
				default: 'primary'
			},
			radius: {
				type: String,
				default: '0'
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
	button {
		display: block;
		width: 100%;
		line-height: 102rpx;
		font-size: 36rpx;
		box-sizing: border-box;

		&:after {
			border: none;
		}
	}

	.button-hover {
		opacity: .7;
	}

	.auto-btn {
		color: $group-color-w;
		background-color: #182F45;
	}

	.wihte-btn {
		color: $group-color;
		background-color: rgba($color: #FFFFFF, $alpha: 0);
		border: 1rpx solid $group-color;
	}
</style>
