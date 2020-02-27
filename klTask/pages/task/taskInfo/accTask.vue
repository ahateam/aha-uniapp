<template>
	<view>
		<view class="nav-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image></view>
		<image class="top-bg" src="/static/image/task/pic_sybj.png" mode="aspectFill"></image>
		<view class="top-info-box">
			<view class="top-info">预算(总价)</view>
			<view class="price-box" v-if="advanceType != 2">
				<text>{{ price }}</text>
				&nbsp;澳元
			</view>
			<view class="tip-box" v-else>由任务人报价</view>
		</view>
		<view class="bottom-box">
			<view style="margin-left: 10rpx;">你的报价</view>

			<view class="auto-input flex-box">
				<input type="number" v-model="price" />
				<view class="right-box">澳元</view>
			</view>
			<view class="auto-info flex-box">
				<view class="flex-box">
					<view class="left-dot"></view>
					<view>平台服务费</view>
				</view>
				<view>{{ getPrice(0) }} 澳元</view>
			</view>
			<view class="auto-info flex-box">
				<view class="flex-box">
					<view class="left-dot"></view>
					<view>你会收到</view>
				</view>
				<view>{{ getPrice(1) }} 澳元</view>
			</view>
			<view style="margin: 50rpx 0 0 20rpx;">为什么这个任务非你莫属？</view>
			<view class="auto-input area-box">
				<textarea v-model="text" maxlength="200" />
				<view>{{ text.length }}/200</view>
			</view>
			<view class="bottom-btn" @click="accPrice">提交报价</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			price: '',
			text: '',
			taskId: '',
			advanceType: '',
			off: 0.1
		};
	},
	methods: {
		getPrice(e) {
			if (this.price) {
				if (e) {
					return this.price * (1 - this.off).toFixed(2);
				} else {
					return this.price * this.off.toFixed(2);
				}
			} else {
				return '';
			}
		},

		accPrice() {
			let cnt = {
				taskId: this.taskId, // Long 任务id
				userId: this.$util.tryParseJson(uni.getStorageSync('userInfo')).userId, // Long 用户id
				taskTitle: uni.getStorageSync('accTaskTitle'),
				data: this.text,
				offer: this.price
			};
			this.$api.createTaskApply(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					uni.navigateTo({
						url: `../accSuccess/accSuccess`
					});
					uni.showToast({
						title: '接收成功',
						icon: 'none'
					});
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		navBack() {
			uni.navigateBack();
		}
	},
	onLoad(res) {
		this.taskId = res.id;
		this.advanceType = res.advanceType;
		if (res.advanceType != 2) {
			this.price = res.price;
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
	padding-top: $status-height;
	height: 88rpx;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 30rpx;
	width: 33rpx;
	height: 33rpx;
}

.auto-input {
	justify-content: space-between;
	padding: 30rpx;
	border-radius: 6rpx;
	border: 1rpx solid #dddfde;
	margin-top: 30rpx;

	.right-box {
		font-size: 30rpx;
		color: #666666;
	}

	input {
		flex: 1;
		color: #ffcd34;
	}

	textarea {
		width: 100%;
		height: 102rpx;
	}
}

.area-box {
	position: relative;
	padding-bottom: 60rpx;
	font-size: 30rpx;
	line-height: 36rpx;

	view {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		color: #999999;
		font-size: 22rpx;
		line-height: 30rpx;
	}
}

.bottom-btn {
	margin: 40rpx auto;
	width: 690rpx;
	line-height: 102rpx;
	background-color: #0f1b07;
	color: #ffffff;
	font-size: 30rpx;
	text-align: center;
	border-radius: 6rpx;
}

.top-bg {
	width: 100vw;
	height: 320rpx;
}

.top-info-box {
	position: absolute;
	top: 158rpx;
	color: #ffffff;
}

.top-info {
	font-size: 26rpx;
	line-height: 37rpx;
	margin: 0 0 0 58rpx;
}

.price-box {
	margin: 10rpx 0 0 58rpx;
	font-size: 30rpx;
	font-weight: 600;
	line-height: 42rpx;
	vertical-align: bottom;

	text {
		font-size: 50rpx;
		line-height: 58rpx;
		font-weight: 700;
		margin-right: 10rpx;
	}
}

.tip-box {
	font-size: 30rpx;
	font-weight: 600;
	line-height: 42rpx;
	margin: 20rpx 0 0 58rpx;
}

.bottom-box {
	padding: 40rpx 30rpx 0;
	color: #333333;
	font-size: 34rpx;
	line-height: 48rpx;
}

.auto-info {
	justify-content: space-between;
	color: #999999;
	font-size: $group-font;
	line-height: 37rpx;
	padding: 30rpx 0;
	border-bottom: 1rpx solid rgba($color: #dddfde, $alpha: 0.8);
}

.left-dot {
	background-color: #d6d6d6;
	border-radius: 50%;
	width: 12rpx;
	height: 12rpx;
	margin: 12rpx 22rpx;
}
</style>
