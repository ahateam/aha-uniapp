<template>
	<view>
		<view class="flex-box content-box">
			<view v-for="(item, index) in list" :key="index">
				<view class="auto-step flex-box" :class="[{ 'curr-step': index <= currIndex - 1 }, { 'no-border': index == 0 }]">
					<view class="radius-box">{{ index + 1 }}</view>
					<view>{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			tyep: Array,
			default: ['', '', '']
		},
		currIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.flex-box {
	display: flex;
	align-items: center;
}

.content-box {
	justify-content: center;
}

.auto-step {
	position: relative;
	color: #508324;
	font-size: 26rpx;
	line-height: 37rpx;
	padding: 0 33rpx;
	flex-direction: column;
	justify-content: center;

	&::after {
		content: '';
		position: absolute;
		left: -20rpx;
		top: 40rpx;
		height: 1rpx;
		border-top: 2rpx dashed #508324;
		width: 40rpx;
	}
}

.no-border {
	&::after {
		border: none;
	}
}

.curr-step {
	color: #ffcd34;

	&::after {
		border-color: #ffd75b;
	}

	.radius-box {
		background-color: #ffd75b;
	}
}

.radius-box {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 80rpx;
	font-size: 34rpx;
	color: #ffffff;
	margin-bottom: 40rpx;
	background-color: #508324;
}
</style>
