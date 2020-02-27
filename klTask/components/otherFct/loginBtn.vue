<template>
	<view>
		<button class="functionBox code-btn" @click="click">{{ name }}</button>
	</view>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: '确定'
		}
	},
	methods: {
		click() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
.functionBox {
	position: relative;
	margin: 70rpx 0 0 90rpx;
	box-sizing: border-box;
	border-radius: 6rpx;
	width: 570rpx;
	height: 102rpx;
	font-size: 36rpx;
	line-height: 36rpx;
	color: #ffffff;

	input {
		position: absolute;
		left: 139rpx;
		top: 50%;
		margin-top: -0.7rem;
		display: inline-block;
	}

	&:after {
		border: none;
	}
}

.code-btn {
	margin-top: 60rpx;
	line-height: 102rpx;
	background-color: $group-color-bg;
}
</style>
