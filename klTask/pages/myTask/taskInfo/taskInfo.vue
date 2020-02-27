<template>
	<view>
		<view v-if="pageStatus != 'onload'">
			<view class="top-box">
				<image class="top-bg" src="/static/image/task/bg_rwmx.png" mode="aspectFill"></image>
				<view class="top-content">
					<image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @tap="navBack"></image>
					<view class="top-info-box">
						<view class="top-name">{{ task.userName }}</view>
						<view class="top-time">
							<text class="iconfont iconshengri"></text>
							<text>{{ getDateTime(task.brithday) }}</text>
						</view>
					</view>
				</view>
				<view class="top-head">
					<image class="top-head-bg" src="/static/image/user/icon_xstx.png" mode="aspectFit"></image>
					<image class="top-head-img" :src="constData.oss + task.userHead" mode="aspectFill"></image>
				</view>
			</view>

			<view class="content-box">
				<!-- <view class="ditor-btn" v-if="task.taskStatus == $constData.taskStatus[0].key" @tap="edtiorBtn">
				<image class="btn-bg" src="/static/image/task/bg_xixi.png" mode="aspectFit"></image>
				<view class="btn-content">
					<image src="/static/image/task/icon_gxb.png" mode="aspectFit"></image>
					更新
				</view>
			</view> -->

				<view class="content-title">
					<view class="content-title-text">我的任务</view>
					<image class="content-title-bg" src="/static/image/task/icon_bg_y.png" mode="aspectFit"></image>
				</view>

				<view class="auto-box-white space-box">
					<view class="left-title">任务名称</view>
					<view class="right-info">{{ task.title }}</view>
				</view>

				<view class="auto-box-white no-border">
					<view class="left-title">任务描述</view>
					<view class="right-info" style="margin-top: 29rpx;">{{ JSON.parse(task.detail).text }}</view>
				</view>
			</view>

			<button type="primary" @click="editApplyTaskData">任务完成 申请收款</button>

			<view>任务者留言</view>
			<view><comment :comment="commentList"></comment></view>

			<view v-if="task.status < constData.taskStatus[3].key" class="bottom-btn" :class="task.taskStatus == constData.taskStatus[0].key ? '' : 'pay-btn'">
				<button @tap="bottomBtn">{{ btnName }}</button>
			</view>

			<input style="padding: 10rpx;border: 1rpx solid #333333;" type="text" v-model="text" />
			<button type="primary" @click="createReply">留言</button>
		</view>

		<loading :status="pageStatus"></loading>
	</view>
</template>

<script>
import NextBtn from '@/components/NextBtn/NextBtn.vue';
import Loading from '@/components/Loading/Loading.vue';
import lFile from '@/components/l-file/l-file.vue';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';
import comment from '@/components/comment/comment.vue';

export default {
	components: {
		NextBtn,
		Loading,
		uniSwipeActionItem,
		uniSwipeAction,
		lFile,
		comment
	},
	data() {
		return {
			constData: this.$constData,
			pageStatus: 'onload',

			orderId: '',

			task: {},
			taskStatus: '',

			text: '',

			commentList: []
		};
	},
	methods: {
		createReply() {
			let cnt = {
				ownerId: this.task.id, // Long 持有者编号
				upUserId: this.userInfo.userId, // Long 提交者编号
				atUserId: this.task.upUserId, // Long @对象编号
				atUserName: '无', // String @对象名称
				text: this.text // String 正文
				// ext: ext // String <选填> 扩展
			};
			this.$api.createReply(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					let data = {
						user: {
							userName: this.userInfo.userName,
							userHead: this.userInfo.userHead
						},
						reply: {
							createTime: Math.round(new Date()),
							text: this.text
						}
					};
					this.commentList.splice(0, 0, data);
					this.text = '';
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		editApplyTaskData() {
			let cnt = {
				id: this.orderId, // Long 任务订单id
				taskDate: '无' // String 上传作品数据
			};
			this.$api.editApplyTaskData(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					uni.showToast({
						title: '请求已提交',
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

		getDateTime(time) {
			return this.$commen.getNewDate(time);
		},

		getIndex(index) {
			if ((index + 1) % 3 == 0 && index != 0) {
				return true;
			}
		},

		navBack() {
			uni.navigateBack();
		},

		updateTaskByTaskId(cnt) {
			this.$api.updateTaskByTaskId(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					uni.switchTab({
						url: '../myTask'
					});
					uni.showToast({
						title: '已提交文件',
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

		getChangeRecordList(cnt) {
			this.$api.getChangeRecordList(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					let arr = this.$util.tryParseJson(res.data.c).list;
					console.log('状态栏');
					console.log(arr);
					this.taskStatus = arr[arr.length - 1].stepName;
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		getTask(cnt) {
			this.$api.getTask(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					let obj = this.$util.tryParseJson(res.data.c);
					this.task = obj;
					this.pageStatus = 'succ';
					console.log(obj);
				} else {
					console.log(res.data.c);
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		getReplys(cnt) {
			this.$api.getReplys(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					console.log('评论列表-------------');
					this.commentList = this.$util.tryParseJson(res.data.c);
					console.log(this.commentList);
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
		console.log(res);
		this.orderId = res.orderId;
		let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
		this.userInfo = userInfo;
		let cnt = {
			id: res.id // Long 任务id
		};

		console.log(res);
		this.getTask(cnt);

		let cnt1 = {
			ownerId: res.id, // Long 帖子id
			userId: userInfo.userId, // Long 当前用户id
			sort: true, // Boolean 是否排序
			// upUserId: upUserId, // Long <选填> 创建者id
			// toUserId: toUserId, // Long <选填> 目标用户id
			// status: status, // Byte <选填> 状态
			count: 10, // int
			offset: 0 // int
		};
		this.getReplys(cnt1);
	}
};
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}

button {
	&:after {
		border: none;
	}
}

.top-box {
	position: relative;
	height: 400rpx;
	width: 100%;
}

.top-bg {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
}

.top-content {
	position: relative;
}

.back-icon {
	display: block;
	width: 33rpx;
	height: 33rpx;
	padding: 70rpx 40rpx 30rpx 20rpx;
}

.top-info-box {
	margin-top: 31rpx;
	color: $group-color-w;
	padding-left: 50rpx;
}

.top-name {
	font-size: 44rpx;
}

.top-time {
	display: flex;
	align-items: center;
	font-size: $group-font;
	line-height: 37rpx;
	margin-top: 20rpx;

	.iconshengri {
		font-size: 30rpx;
		margin-right: 20rpx;
	}
}

.top-head {
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	right: 42rpx;
	bottom: 113rpx;
	text-align: center;

	.top-head-bg {
		width: 136rpx;
		height: 136rpx;
	}

	.top-head-img {
		position: absolute;
		top: 50%;
		margin-top: -60rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
}

.content-box {
	position: relative;
	top: -70rpx;
	background-color: #ffffff;
	width: 100%;
	border-radius: 40rpx 40rpx 0 0;
	padding-top: 8rpx;
}

.content-title {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #587685;
	font-size: $group-font;
	line-height: 37rpx;
}

.content-title-text {
	position: absolute;
	top: 22rpx;
}

.content-title-bg {
	width: 229rpx;
	height: 93rpx;
}

.auto-box-white {
	position: relative;
	padding: 35rpx 50rpx;
	font-size: $group-font-befor;

	&:after {
		content: '';
		position: absolute;
		bottom: 1rpx;
		left: 50%;
		margin-left: -315rpx;
		width: 630rpx;
		border-bottom: 1rpx solid $group-color-border;
	}
}

.no-border {
	&:after {
		border: none;
	}
}

.space-box {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.left-title {
	color: #666666;
}

.right-info {
	color: #333333;
}

.block-box {
	display: block;
	margin: 20rpx auto 0;
	width: 690rpx;
	padding: 0 15rpx;
	background-color: #f8fafb;
}

.auto-box-gray {
	position: relative;
	padding: 30rpx 15rpx;
	width: 660rpx;
	font-size: $group-font-befor;
	border-bottom: 1rpx dotted rgba($color: #cfdce9, $alpha: 0.5);
	flex-wrap: wrap;
}

.bottom-font {
	font-size: $group-font;
}

.data-box {
	width: 630rpx;
	margin: 30rpx 15rpx 0;
	padding: 20rpx;
	background-color: $group-color-w;
	border: 1rpx solid #cfdce9;
	border-radius: 6rpx;
}

.data-title {
	font-size: 28rpx;
	color: $group-color;
	line-height: 30rpx;
}

.data-size {
	font-size: 24rpx;
	margin-top: 12rpx;
	line-height: 20rpx;
}

.data-icon {
	width: 80rpx;
	height: 80rpx;
}

.data-img-list {
	position: relative;
	display: flex;
	align-items: center;
	left: -5rpx;
	padding: 20rpx 0 0;
	flex-wrap: wrap;

	.iconjia {
		color: rgba($color: #587685, $alpha: 0.5);
		font-size: 50rpx;
		text-align: center;
		line-height: 200rpx;
	}
}

.data-img-box {
	position: relative;
	margin: 0 15rpx 15rpx 0;
	width: 200rpx;
	height: 200rpx;
	border-radius: 6rpx;
	border: 1rpx solid $group-color-befor;
	overflow: hidden;

	image {
		width: 200rpx;
		height: 200rpx;
	}
}

.no-margin {
	margin-right: 0;
}

.fixed-btn {
	// position: fixed;
	// bottom: 0;
	width: 100%;
}

.loading-view {
	position: fixed;
	z-index: 3;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.iconguanbi {
	position: absolute;
	right: 8rpx;
	top: 8rpx;
	width: 38rpx;
	height: 38rpx;
	border-radius: 50%;
	background-color: #ee455a;
	color: $group-color-w;
	font-size: 17rpx;
	line-height: 38rpx;
	text-align: center;
}

.up-file-btn {
	margin-top: 30rpx;
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	font-size: $group-font-befor;
	text-align: center;
	background-color: $group-color-search;
	color: $group-color;
	border-radius: 4rpx;
	box-sizing: border-box;
}

.file-list {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120rpx;
	padding: 20rpx;
	margin-top: 20rpx;
	font-size: 28rpx;
	line-height: 30rpx;

	image {
		width: 79rpx;
		height: 79rpx;
	}
}

.file-name {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.file-size {
	margin-top: 12rpx;
	font-size: 24rpx;
	color: $group-color-befor;
	line-height: 20rpx;
	text-align: left;
}
</style>
