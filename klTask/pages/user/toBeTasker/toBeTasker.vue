<template>
	<view id="page">
		<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image></view>
		<image class="view-bg" src="/static/image/bg_c.png" mode="widthFix"></image>
		<view class="content-box">
			<image class="bg-img" src="/static/image/user/pic_cwrwz.png" mode="aspectFit"></image>
			<view class="top-info">
				<view class="title-box">成为任务者</view>
				<view class="auto-top">终于等到你了，我们又多了一名</view>
				<view class="auto-top">得力干将，大家一起努力！</view>
				<view class="top-tip">From:考拉APP</view>
			</view>

			<view class="bottom-info">
				<view class="bottom-title">有几点提示一定要注意哦!</view>
				<view class="auto-bottom flex-box" v-for="(item, index) in list" :key="index">
					<view class="bottom-dot"></view>
					<view class="bottom-text">{{ item }}</view>
					<view class="bottom-dot"></view>
				</view>
			</view>
		</view>

		<view class="bottom-btn" @tap="navNext"><image src="/static/image/icon/icon_back_w.png" mode="aspectFit"></image></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: ['对他人要友善哦，不要着急', '一定要注意自己的安全哦', '一定要遵守澳洲当地的法律']
		};
	},
	methods: {
		navNext() {
			uni.navigateTo({
				url: 'choiceSkill'
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

.content-box {
	position: relative;
	margin: 60rpx auto 50rpx;
	width: 690rpx;
	height: 880rpx;
}

.bg-img {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
}

.top-info {
	position: relative;
	padding: 151rpx 61rpx 0 192rpx;
	color: #0f1b07;
	font-size: 30rpx;
	line-height: 40rpx;
}

.title-box {
	font-size: 50rpx;
	line-height: 70rpx;
	color: #333333;
	margin-bottom: 30rpx;
	text-align: right;
}

.auto-top {
	padding: 20rpx 0;
	border-bottom: 1rpx dotted #dddfde;
	width: 430rpx;
}

.top-tip {
	text-align: right;
	font-size: 18rpx;
	line-height: 30rpx;
	color: #dddfde;
}

.bottom-info {
	position: relative;
	padding: 118rpx 0 0 70rpx;
	color: #ffbb00;
	font-size: $group-font;
	line-height: 33rpx;
}

.bottom-title {
	font-size: 30rpx;
	padding: 0 0 30rpx 6rpx;
	font-size: 30rpx;
	line-height: 42rpx;
}

.auto-bottom {
	padding-top: 20rpx;
}

.bottom-dot {
	width: 6rpx;
	height: 6rpx;
	border-radius: 50%;
	background-color: #ffbb00;
}

.bottom-text {
	margin: 0 22rpx 0 20rpx;
}

.bottom-btn {
	position: relative;
	margin: 0 auto;
	box-sizing: border-box;
	width: 300rpx;
	height: 140rpx;
	color: #ffffff;
	font-size: 33rpx;
	text-align: center;
	line-height: 140rpx;
	background-color: #0f1b07;
	border-radius: 70rpx;
	image {
		width: 33rpx;
		height: 28rpx;
		transform: rotateY(180deg);
	}
}
</style>
