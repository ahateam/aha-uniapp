<template>
	<view class="page">
		<image class="top-bg" src="/static/image/mytask/bg_fxdlr.png" mode="aspectFit"></image>
		<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image></view>
		<image class="top-head" :src="constData.oss + itemUserInfo.userHead" mode="aspectFill"></image>
		<view class="flex-box top-name">
			<view>{{ itemUserInfo.userName }}</view>
			<view class="task-cplt">已完成{{ getTaskNumber() }}个任务</view>
		</view>

		<view class="tags-content flex-box" v-if="itemUserInfo.hobbyTag.length > 0">
			<view class="tag-box flex-box" v-for="(item, index) in itemUserInfo.hobbyTag" :key="index">
				<view class="tag-dot"></view>
				<view style="margin-left: 10rpx;">{{ item }}</view>
			</view>
			<view class="tag-dot"></view>

			<view class="score-box">
				<image src="/static/image/mytask/icon_star.png" mode="aspectFit"></image>
				<view class="score-text flex-box">
					评分
					<text>{{ getScore() }}</text>
				</view>
			</view>
		</view>

		<view style="position: relative;" @tap="navToCer">
			<view class="certificate flex-box">
				<image src="/static/image/icon/icon_dlr_xz.png" mode="aspectFit"></image>
				查看任务者证书
			</view>
		</view>

		<view class="top-title">
			<image src="/static/image/mytask/bg_bt.png" mode="aspectFill"></image>
			<view style="position: relative;">为什么选择此任务者？</view>
		</view>

		<view class="top-info">{{ text }}</view>

		<view class="bottom-box">
			<view class="bottom-title">
				<image src="/static/image/mytask/bg_bt_b.png" mode="aspectFit"></image>
				<view style="position: relative;">最近发布的任务</view>
			</view>

			<view class="user-list-box">
				<view v-for="(item, index) in exaluateList" :key="index">
					<view class="eva-top flex-box">
						<view class="flex-box">
							<image :src="constData.oss + item.upUserHead" mode="aspectFill"></image>
							<view>
								<view class="eva-name">{{ item.upUserName }}</view>
								<view>{{ getTimeAgo(item) }}</view>
							</view>
						</view>
						<view class="eva-score flex-box">
							评分
							<view>{{ item.evaluate.score }}</view>
						</view>
					</view>
					<view class="eva-bottom">
						<view class="task-title flex-box">
							<image src="/static/image/icon/icon_rw.png" mode="aspectFit"></image>
							<view>{{ item.taskTitle }}</view>
						</view>
						<view class="eva-info">{{ item.evaluate.content }}</view>
					</view>
				</view>
			</view>

			<view class="bottom-btn" @click="TaskApplyConfirm">接受报价，马上付款</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			constData: this.$constData,
			orderId: '',
			taskId: '',
			userId: '',
			itemUserInfo: {},
			text: uni.getStorageSync('itemUserText'),
			exaluateList: []
		};
	},
	methods: {
		getTimeAgo(item) {
			return this.$commen.getTimeAgo(item.evaluate.evaluateCreateTime);
		},

		getTaskNumber() {
			if (this.exaluateList.length > 0) {
				return this.exaluateList[0].finishTaskNum;
			} else {
				return '0';
			}
		},

		getScore() {
			if (this.exaluateList.length > 0) {
				return this.exaluateList[0].avgScore;
			} else {
				return '0';
			}
		},

		TaskApplyConfirm() {
			let cnt = {
				id: this.orderId, // Long 订单id
				taskId: this.taskId // Long 任务id
			};
			this.$api.TaskApplyConfirm(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					uni.switchTab({
						url: '../myTask'
					});
					uni.showToast({
						title: '成功',
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

		navToCer() {
			uni.navigateTo({
				url: `userCertificate/userCertificate?userId=${this.userId}`
			});
		},

		navBack() {
			uni.navigateBack();
		},

		getUserInfo(cnt) {
			this.$api.getUserInfo(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					let userInfo = this.$util.tryParseJson(res.data.c);
					userInfo.hobbyTag = this.$util.tryParseJson(userInfo.hobbyTag);
					this.itemUserInfo = userInfo;
					console.log(this.itemUserInfo);
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		getEvaluateList(cnt) {
			this.$api.getEvaluateList(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					this.exaluateList = this.$util.tryParseJson(res.data.c);
					console.log(this.exaluateList);
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		}
	},
	onLoad(res) {
		this.orderId = res.id;
		this.taskId = res.taskId;
		this.userId = res.userId;

		let cnt = {
			userId: this.userId // Long 用户id
		};
		this.getUserInfo(cnt);

		let cnt1 = {
			toUserId: this.userId, // Long 被评价者id
			count: 10, // Integer
			offset: 0 // Integer
		};
		this.getEvaluateList(cnt1);
	}
};
</script>

<style lang="scss" scoped>
.page {
	background-color: #a0bf5f;
}

.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	position: relative;
	padding-top: var(--status-bar-height);
	height: 88rpx;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.bottom-btn {
	margin: 20rpx auto;
	width: 690rpx;
	line-height: 102rpx;
	background-color: #0f1b07;
	color: #ffffff;
	font-size: 30rpx;
	text-align: center;
	border-radius: 6rpx;
}

.top-bg {
	position: absolute;
	top: 0;
	width: 100vw;
	height: 536rpx;
	z-index: 0;
}

.top-head {
	border-radius: 50%;
	width: 120rpx;
	height: 120rpx;
	box-sizing: border-box;
	border: 1rpx solid #ffffff;
	margin: 47rpx 0 0 40rpx;
}

.top-name {
	padding: 50rpx 0 0 40rpx;
	font-size: 40rpx;
	color: #ffffff;
	line-height: 56rpx;
}

.task-cplt {
	margin-left: 20rpx;
	padding: 0 10rpx;
	border: 1rpx solid #ffcd34;
	border-radius: 4rpx;
	font-size: 20rpx;
	line-height: 38rpx;
	color: #ffcd34;
}

.tags-content {
	position: relative;
	margin: 30rpx 0 0 50rpx;
	font-size: $group-font;
	line-height: 30rpx;
}

.tag-box {
	margin-right: 10rpx;
	color: #ffffff;
}

.tag-dot {
	background-color: #ffffff;
	border-radius: 50%;
	width: 6rpx;
	height: 6rpx;
}

.score-box {
	position: absolute;
	right: 50rpx;
	bottom: -2rpx;
	justify-content: flex-end;

	image {
		position: absolute;
		bottom: 51rpx;
		right: 0;
		width: 89rpx;
		height: 69rpx;
	}
}

.score-text {
	align-items: flex-end;
	font-size: 20rpx;
	line-height: 28rpx;
	color: #ffcd34;

	text {
		display: block;
		font-size: 40rpx;
		line-height: 47rpx;
		margin: 0 0 0 20rpx;
		transform: translateY(5rpx);
	}
}

.certificate {
	display: inline-flex;
	margin: 40rpx;
	background-color: #0f1b07;
	border-radius: 4rpx;
	height: 50rpx;
	padding: 0 20rpx;
	font-size: $group-font;
	color: #ffffff;

	image {
		width: 20rpx;
		height: 29rpx;
		margin-right: 16rpx;
	}
}

.top-title {
	position: relative;
	margin: 18rpx 0 0 40rpx;
	color: #ffffff;
	font-size: 34rpx;
	line-height: 40rpx;

	image {
		position: absolute;
		width: 256rpx;
		height: 101rpx;
		left: -28rpx;
		top: -25rpx;
	}
}

.top-info {
	color: #ffffff;
	font-size: 28rpx;
	line-height: 40rpx;
	padding: 40rpx 30rpx 50rpx 40rpx;
}

.bottom-box {
	border-radius: 20rpx 20rpx 0 0;
	background-color: #ffffff;
}

.bottom-title {
	position: relative;
	padding: 67rpx 0 0 40rpx;
	color: #333333;
	font-size: 34rpx;
	line-height: 48rpx;

	image {
		position: absolute;
		width: 256rpx;
		height: 101rpx;
		left: 12rpx;
		top: 50rpx;
	}
}

.user-list-box {
	margin-top: 20rpx;
	padding: 0 40rpx;
}

.eva-top {
	justify-content: space-between;
	font-size: 20rpx;
	line-height: 20rpx;
	color: #999999;
	padding-top: 30rpx;

	image {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 22rpx;
	}
}

.eva-name {
	font-size: $group-font;
	line-height: 37rpx;
	color: #333333;
}

.eva-score {
	align-items: flex-end;
	color: #fdcc33;
	line-height: 28rpx;

	view {
		margin-left: 10rpx;
		color: #fdcc33;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 35rpx;
		transform: translateY(2rpx);
	}
}

.eva-bottom {
	margin: 30rpx 0 0 80rpx;
	padding-bottom: 30rpx;
	border-bottom: 1rpx solid #eff0f4;
}

.task-title {
	margin-left: 2rpx;

	image {
		width: 34rpx;
		height: 34rpx;
		margin-right: 12rpx;
	}

	view {
		color: #999999;
		font-size: 26rpx;
		line-height: 37rpx;
	}
}

.eva-info {
	margin-top: 20rpx;
	color: #666666;
	font-size: 28rpx;
	line-height: 40rpx;
}
</style>
