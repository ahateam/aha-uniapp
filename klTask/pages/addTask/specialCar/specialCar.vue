<template>
	<view id="page">
		<image class="view-bg" src="/static/image/bg_c.png" mode="aspectFill"></image>
		<view style="position: relative;">
			<view class="nav-box flex-box">
				<image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image>
				<view class="view-title">发布任务</view>
			</view>
			<view class="content-box">
				<view class="auto-address flex-box">
					<view class="address-left flex-box">
						<view class="left-dot"></view>
						起始地
					</view>
					<view class="get-address">定位</view>
				</view>
				<view class="auto-address flex-box">
					<view class="address-left flex-box">
						<view class="left-dot" style="background-color: #FFCD34;"></view>
						目的地
					</view>
				</view>

				<view class="auto-title">用车时间</view>
				<view class="time-choice flex-box" @tap="showTime = true">{{ time }}</view>

				<view class="auto-title">乘车人数</view>
				<view class="time-choice flex-box"><input type="number" v-model="people" /></view>
			</view>

			<view class="auto-title bottom-title">特别要求</view>
			<data-textarea v-if="!showTime" hiddenTitle v-model="text" placeholder="例如:三个桌子 两个沙发 一个电视机"></data-textarea>

			<view class="bottom-btn" @tap="navNext">下一步</view>
		</view>

		<sen-picker-view :shixian="showTime" @quxiaoButton="showTime = false" @colseBox="showTime = false" @quedingButton="changeTime"></sen-picker-view>
	</view>
</template>

<script>
import SenPickerView from '@/components/sen-pickerview/picker-view-set.vue';
import DataTextarea from '@/components/dataInput/DataTextarea.vue';

export default {
	components: {
		SenPickerView,
		DataTextarea
	},
	data() {
		return {
			time: '',
			showTime: false,
			text: '',
			people: Number,

			imgList: []
		};
	},
	methods: {
		navNext() {
			uni.navigateTo({
				url: 'carPrice'
			});
		},

		changeTime(y, m, d) {
			this.time = `${y}-${m}-${d}`;
			this.showTime = false;
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
	font-size: 30rpx;
	line-height: 42rpx;
	padding-bottom: 30rpx;
}

.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	position: relative;
	z-index: 1;
	padding-top: $status-height;
	height: 88rpx;
	justify-content: center;
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
	padding: 30rpx 30rpx 0;
	box-sizing: border-box;
}

.auto-address {
	justify-content: space-between;
	background-color: #ffffff;
	border-radius: 6rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	width: 690rpx;
	height: 88rpx;
	margin-top: 30rpx;
}

.address-left {
	color: #999999;
}

.left-dot {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background-color: #c4d06a;
	margin-right: 32rpx;
}

.get-address {
	color: #508324;
	font-size: 30rpx;
}

.auto-title {
	margin: 40rpx 0 0 10rpx;
	color: #ffffff;
}

.time-choice {
	border-radius: 6rpx;
	background-color: #ffffff;
	padding: 0 30rpx;
	color: #333333;
	height: 88rpx;
	width: 690rpx;
	box-sizing: border-box;
	margin-top: 30rpx;

	input {
		flex: 1;
	}
}

.bottom-title {
	margin: 40rpx 0 0 40rpx;
}

.bottom-btn {
	background-color: #0f1b07;
	line-height: 102rpx;
	width: 690rpx;
	text-align: center;
	margin: 50rpx auto 0;
	color: #ffffff;
	font-size: 36rpx;
	border-radius: 6rpx;
}
</style>
