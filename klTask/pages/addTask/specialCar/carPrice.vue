<template>
	<view>
		<image class="top-bg" src="/static/image/addTask/pic_zcjs.png" mode="aspectFill"></image>
		<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image></view>
		<view class="bottom-content">
			<view class="auto-box">
				<view>
					<view class="right-title">你的预算</view>
					<text>*</text>
				</view>
				<view class="tip-info">给出预算后，任务者可以还价，或选择由任务者报价</view>
				<view class="auto-input">
					<input type="text" v-model="price" placeholder="输入金额" />
					<view class="price-right-box flex-box">
						<view style="margin-right: 20rpx;">澳元</view>
						<view class="price-btn" :class="{ 'active-price': priceStatus == priceType[0].key }" @tap="priceStatus = priceType[0].key">总价</view>
						<view class="price-btn" :class="{ 'active-price': priceStatus == priceType[1].key }" @tap="priceStatus = priceType[1].key">每小时</view>
					</view>
				</view>
			</view>

			<view class="flex-box bottom-change" @tap="priceStatus = priceType[2].key" :style="priceStatus == priceType[2].key ? 'color:#FFCD34' : ''">
				<image :src="priceStatus == priceType[2].key ? '/static/image/icon/addTask/user-curr.png' : '/static/image/icon/addTask/user.png'" mode="aspectFit"></image>
				由任务者报价
			</view>

			<view class="bottom-btn" @click="nextBtn">发布</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			priceType: this.$constData.priceType,
			showTime: false,
			price: '',
			priceStatus: 0,
			time: '',
			addressInfo: {},
			district: '',
			postalCode: ''
		};
	},
	methods: {
		changeTime(y, m, d) {
			this.time = `${y}-${m}-${d}`;
			this.showTime = false;
		},
		
		getAddress() {
			uni.getLocation({
				geocode: true,
				success: res => {
					this.addressInfo = res;
					this.district = res.address.district;
					if (res.daaress.postalCode) {
						this.postalCode = res.daaress.postalCode;
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		
		navBack() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	padding-top: $status-height;
	height: 88rpx;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.top-bg {
	width: 100vw;
	height: 380rpx;
}

.bottom-content {
	padding: 35rpx 30rpx 30rpx;
}

.auto-box {
	margin-top: 39rpx;
	font-size: $group-font-befor;
	line-height: $group-font-befor-line;
	color: #666666;

	text {
		color: #ffd75d;
	}
}

.auto-input {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 30rpx;
	height: 88rpx;
	border: 1rpx solid #dddfde;
	border-radius: 6rpx;
	padding: 0 30rpx;
	color: $group-color-article;

	image {
		width: 12rpx;
		height: 21rpx;
	}
}

.right-title {
	display: inline-block;
	margin-right: 10rpx;
}

.tip-info {
	color: #999999;
	font-size: 22rpx;
	line-height: 36rpx;
	margin-top: 30rpx;
}

.price-right-box {
	color: #666666;
	font-size: 30rpx;

	.price-btn {
		background-color: #f6f6f6;
		border-radius: 4rpx;
		line-height: 50rpx;
		padding: 0 15rpx;
		font-size: 26rpx;
		color: #999999;
		margin-left: 20rpx;
	}

	.active-price {
		background-color: $group-color-bg;
		color: #ffffff;
	}
}

.bottom-change {
	margin-top: 30rpx;
	color: #999999;
	font-size: $group-font;
	line-height: 37rpx;

	image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
	}
}

.bottom-btn {
	background-color: #0f1b07;
	border-radius: 6rpx;
	margin: 50rpx auto 20rpx;
	width: 690rpx;
	line-height: 102rpx;
	color: #ffffff;
	font-size: 36rpx;
	text-align: center;
}
</style>
