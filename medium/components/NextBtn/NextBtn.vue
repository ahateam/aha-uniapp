<template>
	<view>
		<button class="auto-btn" @click="click">{{title}}</button>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '下一步'
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
	.auto-btn {
		display: block;
		width: 100%;
		line-height: 102rpx;
		border-radius: 0;
		color: $group-color-w;
		font-size: 36rpx;
		background-color: #182F45;

		&:after {
			border: none;
		}
	}
</style>
