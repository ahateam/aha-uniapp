<template>
	<view>
		<image class="top-bg" src="/static/image/bg_c.png" mode="aspectFill"></image>
		<view :style="{ 'padding-top': `calc(${getNavHeight()} - 20rpx)` }"></view>
		<view class="flex-box user-box" :style="dataChangeStatus ? '' : 'padding-bottom: 37rpx;'">
			<view class="flex-box">
				<image class="user-head" :src="constData.oss + imgSrc" mode="aspectFill"></image>
				<view class="btns-box">
					<view class="user-name">{{ name }}</view>
					<view class="money-box">
						<image src="/static/image/icon/icon_star_bg.png" mode="aspectFit"></image>
						<view class="money-text">
							我的评分
							<text>9.5</text>
						</view>
					</view>
				</view>
			</view>
			<view class="flex-box right-box">
				<view class="editor-box btns-box flex-box" @click="navToUser">
					<image src="/static/image/icon/editor.png" mode="aspectFill"></image>
					<text>修改个人资料</text>
				</view>
			</view>
		</view>

		<view class="bill-box" @tap="navToBill">
			<image class="bill-bg" src="/static/image/task/bg_sr.png" mode="widthFix"></image>
			<view class="bill-top">
				<view class="auto-title">
					<view class="flex-box">
						<image src="/static/image/icon/icon_gzqaud.png" mode=""></image>
						<view>总收入 澳元</view>
					</view>
					<view class="bill-money">{{ income }}</view>
				</view>
				<view class="bill-line"></view>
				<view class="auto-title">
					<view class="flex-box">
						<image src="/static/image/icon/icon_gzqaud.png" mode=""></image>
						<view>总收入 澳元</view>
					</view>
					<view class="bill-money">{{ income }}</view>
				</view>
			</view>

			<view class="bill-bottom flex-box">
				<view class="flex-box">
					<view class="bill-icon-box flex-box"><image src="/static/image/icon/ixon_ckmx.png" mode=""></image></view>
					查看明细
				</view>
				<image class="enter-icon" src="/static/image/icon/icon_enter.png" mode=""></image>
			</view>
		</view>

		<view class="tobe-tasker flex-box" @tap="navTasker">
			<image class="tasker-bg" src="/static/image/user/pic_wdrwzrz.png" mode="aspectFit"></image>
			<view style="position: relative;">
				<view class="tasker-top">我的任务者认证</view>
				<view class="tasker-center">来吧, 只有任务者才知道的世界</view>
				<view class="tasker-btn">马上认证</view>
			</view>
		</view>

		<view class="bottom-box">
			<view class="auto-bottom flex-box bottom-line" @tap="navToSafe">
				<view class="bottom-left flex-box">
					<image src="/static/image/icon/icon_cl.png" mode="aspectFit"></image>
					登陆账户安全
				</view>
				<image class="enter-icon" src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
			</view>
			<view class="auto-bottom flex-box" @tap="navToHelp">
				<view class="bottom-left flex-box">
					<image src="/static/image/icon/icon_bzzx.png" mode="aspectFit"></image>
					帮助中心
				</view>
				<image class="enter-icon" src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'user',
	components: {},
	data() {
		return {
			constData: this.$constData,
			userInfo: {},
			// imgSrc: uni.getStorageSync('userHead'),
			imgSrc: '',
			// name: uni.getStorageSync('userName'),
			name: '',
			money: 0,

			income: '', //收入
			payMoney: '' //支出
		};
	},
	methods: {
		navToHelp() {
			uni.navigateTo({
				url: 'helpcenter/helpcenter'
			});
		},

		navToBill() {
			uni.navigateTo({
				url: 'bill/bill'
			});
		},

		navToSafe() {
			uni.navigateTo({
				url: 'userSafe/userSafe'
			});
		},

		navTasker() {
			uni.navigateTo({
				url: 'toBeTasker/toBeTasker'
			});
		},

		navToUser() {
			uni.navigateTo({
				url: './perdata/perdata'
			});
		},

		getNavHeight() {
			return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px';
		},

		getMyExpenditure(cnt) {
			this.$api.getMyExpenditure(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					this.payMoney = this.$util.tryParseJson(res.data.c)[0].taskmoney;
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		getMyIncome(cnt) {
			this.$api.getMyIncome(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					this.income = this.$util.tryParseJson(res.data.c)[0].taskmoney;
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		getUserCurrency(cnt) {
			this.$api.getUserCurrency(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					this.money = this.$util.tryParseJson(res.data.c).currency;
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		}
	},
	onShow() {
		let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
		console.log(userInfo);
		this.name = userInfo.userName;
		this.imgSrc = userInfo.userHead;
		this.money = userInfo.currency;
		// if(userInfo.) //需要判定資料完善顯示提醒

		let cnt = {
			userId: userInfo.userId, // Long 用户id
			count: 1, // Integer
			offset: 0 // Integer
		};
		this.getMyExpenditure(cnt); //支出
		this.getMyIncome(cnt); //收入
		this.getUserCurrency(cnt);
	}
};
</script>

<style lang="scss" scoped>
.top-bg {
	position: absolute;
	top: 0;
	width: 100vw;
	height: 100vh;
}

.user-head {
	width: 150rpx;
	height: 150rpx;
	border-radius: 50%;
	margin-right: 30rpx;
	border: 4rpx solid #ffffff;
}

.user-box {
	position: relative;
	align-items: flex-start !important;
	justify-content: space-between;
	padding: 3rpx 40rpx 0;
}

.user-name {
	font-size: 34rpx;
	color: #ffffff;
	line-height: 48rpx;
}

.btns-box {
	image {
		width: 17rpx;
		height: 20rpx;
		margin-right: 10rpx;
	}
}

.money-box {
	position: relative;
	margin-top: 24rpx;
	color: #ffffff;

	image {
		width: 200rpx;
		height: 45rpx;
		display: block;
	}
}

.money-text {
	position: absolute;
	left: 10rpx;
	bottom: 3rpx;
	font-size: 24rpx;
	line-height: 35rpx;
	vertical-align: bottom;

	text {
		font-size: 30rpx;
		margin-left: 10rpx;
	}
}

.editor-box {
	justify-content: center;
	width: 180rpx;
	font-size: 20rpx;
	height: 50rpx;
	box-sizing: border-box;
	background-color: #0f1b07;
	border-radius: 6rpx;
	color: #ffffff;
}

.flex-box {
	display: flex;
	align-items: center;
}

.right-box {
	position: relative;
	margin-top: 24rpx;
	width: 180rpx;
	justify-content: center;
	align-items: flex-end;
	flex-direction: column;
}

.bill-box {
	position: relative;
	width: 690rpx;
	height: 230rpx;
	margin: 0 auto;
	overflow: hidden;
	border-radius: 6rpx;

	.bill-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}

.bill-top {
	position: relative;
	display: flex;
	align-items: flex-start;
	padding: 43rpx 52rpx 0;
	color: #ffffff;
	font-size: 24rpx;
	line-height: 33rpx;
}

.auto-title {
	image {
		width: 34rpx;
		height: 34rpx;
		margin-right: 26rpx;
	}
}

.bill-money {
	font-size: 40rpx;
	line-height: 47rpx;
	margin: 10rpx 0 0 60rpx;
}

.bill-line {
	border-left: 1rpx solid rgba($color: #ffffff, $alpha: 0.5);
	margin: 7rpx 50rpx 0 105rpx;
	height: 52rpx;
	width: 1rpx;
}

.tobe-tasker {
	position: relative;
	justify-content: space-between;
	background-color: #fee18b;
	border-radius: 6rpx;
	width: 688rpx;
	margin: 30rpx auto;
	padding-left: 30rpx;
	font-size: 26rpx;
	line-height: 50rpx;
	height: 250rpx;
	box-sizing: border-box;
}

.tasker-top {
	font-size: 30rpx;
	color: #333333;
}

.tasker-center {
	color: #666666;
	margin-top: 10rpx;
}

.tasker-btn {
	background-color: #0f1b07;
	width: 164rpx;
	line-height: 60rpx;
	color: #ffffff;
	margin-top: 20rpx;
	text-align: center;
	border-radius: 6rpx;
}

.tasker-bg {
	position: absolute;
	left: 0;
	top: 0;
	width: 688rpx;
	height: 250rpx;
}

.bill-bottom {
	position: absolute;
	justify-content: space-between;
	bottom: 0;
	width: 690rpx;
	height: 80rpx;
	padding: 0 32rpx 0 52rpx;
	backdrop-filter: blur(5px);
	background-color: rgba($color: #ffffff, $alpha: 0.5);
	box-sizing: border-box;
}

.bill-icon-box {
	border-radius: 50%;
	width: 40rpx;
	height: 40rpx;
	background-color: rgba($color: #0f1b07, $alpha: 0.5);
	justify-content: center;
	margin-right: 20rpx;

	image {
		height: 24rpx;
		width: 20rpx;
	}
}

.enter-icon {
	width: 12rpx;
	height: 21rpx;
}

.bottom-box {
	position: relative;
	background-color: #ffffff;
	border-radius: 6rpx;
	margin: 0 auto;
	width: 690rpx;
	box-sizing: border-box;
	padding: 0 10rpx 10rpx;
}

.auto-bottom {
	justify-content: space-between;
	padding: 40rpx 30rpx 40rpx 20rpx;

	&:active {
		background-color: rgba($color: #f9f9f9, $alpha: 1);
	}
}

.bottom-left {
	font-size: 30rpx;
	color: #666666;
	line-height: 42rpx;

	image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 37rpx;
	}
}

.bottom-line {
	border-bottom: 1rpx solid #eef1f2;
}
</style>
