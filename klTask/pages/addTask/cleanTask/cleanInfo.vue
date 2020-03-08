<template>
	<view>
		<image class="top-bg" src="/static/image/addTask/pic_qjbj.png" mode="aspectFill"></image>
		<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image></view>
		<view class="bottom-content">
			<view>
				<view class="flex-box title-box">
					<view>
						请输入清洁地址的区域和邮编
						<text>*</text>
					</view>
					<view class="gps-btn" @click="getAddress">定位</view>
				</view>
				<view class="address-box flex-box">
					<view>区域</view>
					<input v-model="district.address" />
					<view class="center-line"></view>
					<view>邮编</view>
					<input type="text" v-model="postalCode" />
				</view>
			</view>

			<view class="auto-box" @click="showTime = true">
				<view>
					<view class="right-title">完成时间</view>
					<text>*</text>
				</view>

				<view class="auto-input">
					<view v-if="time">{{ time }}</view>
					<view style="color: #D6D6D6;" v-else>选择日期</view>
					<!-- <image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image> -->
				</view>
			</view>

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

		<sen-picker-view :shixian="showTime" @quxiaoButton="showTime = false" @colseBox="showTime = false" @quedingButton="changeTime"></sen-picker-view>
	</view>
</template>

<script>
import SenPickerView from '@/components/sen-pickerview/picker-view-set.vue';

export default {
	components: {
		SenPickerView
	},
	computed: {
		district: {
			get() {
				if (this.$store.state.task.taskInfo.fromAddress.pos) {
					let cnt = {
						address: this.$store.state.task.taskInfo.fromAddress.pos
					};
					this.getMapName(cnt);
				}
				return this.$store.state.task.taskInfo.fromAddress;
			},
			set(val) {
				this.$store.commit('updaTaskFrom', val);
			}
		}
	},
	data() {
		return {
			priceType: this.$constData.priceType,
			userInfo: this.$util.tryParseJson(uni.getStorageSync('userInfo')),
			showTime: false,
			price: '',
			priceStatus: 0,
			time: '',
			postalCode: '',
			need: 0
		};
	},
	methods: {
		nextBtn() {
			let detail = {
				house: this.$store.state.task.taskInfo.hose,
				totlet: this.$store.state.task.taskInfo.totlet,
				need: this.need,
				address: this.$store.state.task.taskInfo.fromAddress,
				postalCode: this.postalCode
			};
			let tag = ['清洁保洁'];
			let time = this.time + ' 23:59:59';
			let cnt = {
				module: this.$constData.module, // Long 模块编号
				type: 0, // Byte 类型（0图文,1视频,2gif表情,3音频,4描述）
				upUserId: this.userInfo.userId, // Long 创建者
				tags: JSON.stringify(tag), // String <选填> 标签
				title: '清洁任务', // String 标题
				detail: JSON.stringify(detail), // String 需求详细
				// deposit: deposit, // Double <选填> 保证金
				// advanceAmount: advanceAmount, // Double <选填> 预付款
				pos: this.$store.state.task.taskInfo.pos, // String <选填> 位置
				finishTime: time, // Date <选填> 任务完成时间
				advanceType: this.priceStatus, // Byte <选填> 预算金额类型
				ask: 1
			};
			if (this.priceStatus != this.$constData.priceType[2].key) {
				cnt.advanceAmount = this.price;
			}
			this.createTask(cnt);
		},

		createTask(cnt) {
			this.$api.createTask(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					console.log(this.$util.tryParseJson(res.data.c));
					uni.navigateTo({
						url: '../success'
					});
				} else {
					console.log(res);
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		changeTime(y, m, d) {
			this.time = `${y}-${m}-${d}`;
			this.showTime = false;
		},

		getAddress() {
			uni.navigateTo({
				url: '../webView/webView?type=pos'
			});
		},
		getMapName(cnt) {
			this.$api.getMapName(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					this.postalCode = this.$util.tryParseJson(res.data.c).postal_code;
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
		this.need = res.need;
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

.title-box {
	justify-content: space-between;
	color: #666666;
	font-size: $group-font-befor;
	line-height: $group-font-befor-line;
	padding: 15rpx 10rpx 0;

	text {
		color: #ffd75d;
		margin-left: 10rpx;
	}
}

.gps-btn {
	color: $group-color-btn;
}

.address-box {
	padding: 8rpx 30rpx 10rpx;
	border: 1rpx solid #dddfde;
	border-radius: 6rpx;
	margin-top: 31rpx;
	font-size: 30rpx;

	input {
		width: 210rpx;
		margin-left: 24rpx;
	}
}

.center-line {
	width: 1rpx;
	height: 70rpx;
	border-left: 1rpx solid $group-color-border;
	margin-right: 30rpx;
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
