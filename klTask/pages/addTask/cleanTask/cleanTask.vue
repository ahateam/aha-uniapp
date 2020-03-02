<template>
	<view id="page">
		<image class="view-bg" src="/static/image/bg_c.png" mode="widthFix"></image>
		<view style="position: relative;">
			<view class="nav-box flex-box">
				<image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image>
				<view class="view-title">发布任务</view>
			</view>
			<view class="content-box">
				<view class="auto-title">
					清洁类别
					<text>*</text>
				</view>
				<view class="choice-box flex-box">
					<view>家庭清洁</view>
					<image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>

				<view class="auto-title">
					房间数量
					<text>*</text>
				</view>
				<view class="number-input"><number-input @reduceBtn="houseNumber--" @addBtn="houseNumber++" :much="houseNumber"></number-input></view>

				<view class="auto-title">卫生间数量</view>
				<view class="number-input"><number-input @reduceBtn="TOILET--" @addBtn="TOILET++" :much="TOILET"></number-input></view>

				<view class="auto-title">清洁厨房吗</view>
				<view class="btn-box flex-box">
					<view class="auto-btn" :class="{ 'curr-btn': need }" @tap="need = true">需要</view>
					<view class="auto-btn" :class="{ 'curr-btn': !need }" @tap="need = false">不要</view>
				</view>

				<view class="bottom-btn" @tap="navNext">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
import NumberInput from '@/components/NumberInput/NumberInput.vue';

export default {
	components: {
		NumberInput
	},
	data() {
		return {
			houseNumber: 0,
			TOILET: 0,
			need: true
		};
	},
	methods: {
		navNext() {
			uni.navigateTo({
				url: 'cleanInfo'
			});
		},

		navBack() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
#page {
	background-color: $group-color-bg;
	min-height: 100vh;
}

.nav-box {
	position: relative;
	z-index: 1;
	padding-top: $status-height;
	height: 88rpx;
	justify-content: center;
}

.flex-box {
	display: flex;
	align-items: center;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.view-bg {
	position: absolute;
	top: 0;
	z-index: 0;
	width: 100vw;
	height: 100vh;
}

.view-title {
	color: #ffffff;
	font-size: 36rpx;
	line-height: 50rpx;
}

.content-box {
	padding: 0 30rpx;
	font-size: 30rpx;
	line-height: 42rpx;
}

.auto-title {
	color: #ffffff;
	margin: 40rpx 0 0 10rpx;

	text {
		color: #ffcd34;
		margin-left: 10rpx;
	}
}

.choice-box {
	background-color: #ffffff;
	border-radius: 6rpx;
	color: #333333;
	justify-content: space-between;
	padding: 22rpx 30rpx;
	box-sizing: border-box;
	margin-top: 30rpx;

	image {
		width: 12rpx;
		height: 21rpx;
	}
}

.number-input {
	margin-top: 40rpx;
}

.btn-box {
	margin-top: 40rpx;
	justify-content: space-between;
}

.auto-btn {
	width: 330rpx;
	line-height: 88rpx;
	border-radius: 6rpx;
	background-color: rgba($color: #ffffff, $alpha: 0.5);
	color: #666666;
	font-size: 26rpx;
	text-align: center;
}

.curr-btn {
	background-color: #ffffff;
}

.bottom-btn {
	background-color: #0f1b07;
	border-radius: 6rpx;
	color: #ffffff;
	width: 690rpx;
	line-height: 102rpx;
	font-size: 36rpx;
	text-align: center;
	margin-top: 50rpx;

	&:active {
		opacity: 0.7;
	}
}
</style>
