<template>
	<view class="input-box">
		<view class="auto-btn" @tap="reduceBtn">-</view>
		<view class="number-box" :class="{ 'zoer-color': much == 0 }">{{ much }}</view>
		<view class="auto-btn" @tap="addBtn">+</view>
	</view>
</template>

<script>
export default {
	props: {
		much: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {};
	},
	methods: {
		reduceBtn() {
			if (this.much > 0) {
				this.$emit('reduceBtn');
			}
		},

		addBtn() {
			this.$emit('addBtn');
		}
	}
};
</script>

<style lang="scss" scoped>
.auto-btn {
	background-color: rgba($color: #508324, $alpha: 0.2);
	border-radius: 4rpx;
	color: rgba($color: #0f1b07, $alpha: 0.5);
	font-size: 40rpx;
	line-height: 88rpx;
	text-align: center;
	width: 190rpx;

	&:active {
		background-color: rgba($color: #508324, $alpha: 0.7);
	}
}

.input-box {
	display: flex;
	align-items: center;
}

.number-box {
	flex: 1;
	margin: 0 10rpx;
	border-radius: 6rpx;
	background-color: #ffffff;
	text-align: center;
	line-height: 88rpx;
}

.zoer-color {
	color: #999999;
}
</style>
