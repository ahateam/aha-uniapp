<template>
	<view class="page">
		<!-- 顶部选项卡 -->
		<view class="nav-box">
			<view class="view-title">我的任务</view>
			<view class="flex-box nav-list">
				<view
					class="top-options flex-box"
					:class="[{ active: currIndex == index }, index == 0 ? 'top-left-icon' : 'top-right-icon']"
					:style="index == 0 ? 'margin-left:0;' : ''"
					v-for="(item, index) in navList"
					:key="index"
					@click="topoption(index)"
				>
					<view>{{ item.text }}</view>
					<image :src="currIndex == index ? item.currImg : item.img" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 顶部选项卡 end -->
		<task-list :tasks="tasks" @getItem="navToInfo" type="1" :myOrder="currIndex == 1"></task-list>
		<!-- 任务栏  task==任务栏-->
	</view>
</template>

<script>
import TaskList from '@/components/task/TaskList.vue';

export default {
	components: {
		TaskList
	},
	data() {
		return {
			count: 10,
			offset: 0,
			page: 1,
			pageStatus: 'loading',
			pageOver: false,
			clickTab: true,

			userInfo: {},

			currIndex: 0,
			navList: [
				{
					text: '我发布的',
					img: '/static/image/mytask/icon_wfbd.png',
					currImg: '/static/image/mytask/icon_wjsd_p.png',
					child: null,
					pageStatus: 'loading',
					page: 1,
					pageOver: false
				},
				{
					text: '我接收的',
					img: '/static/image/mytask/icon_wfbd.png',
					currImg: '/static/image/mytask/icon_wjsd_p.png',
					child: null,
					pageStatus: 'loading',
					page: 1,
					pageOver: false
				}
			],
			// 我的任务信息列表

			tasks: []
		};
	},
	methods: {
		navToInfo(item) {
			let taskType = '';
			let taskId = '';
			console.log(taskId);
			if (this.currIndex == 1) {
				taskType = 'taskInfo';
				taskId = item.task.id;
			} else {
				taskType = 'myTask';
				taskId = item.id;
			}
			console.log(taskId);

			uni.navigateTo({
				url: `/pages/myTask/taskInfo/${taskType}?id=${taskId}&orderId=${item.id}`,
				success: () => {
					// #ifdef APP-PLUS
					setTimeout(() => {
						this.$commen.hiddenTabIcon();
					}, 100);
					// #endif
				}
			});
		},

		topoption(index) {
			if (this.pageStatus != 'loading') {
				this.currIndex = index;
				if (this.navList[index].child) {
					this.tasks = this.navList[index].child;
					this.pageStatus = this.navList[index].pageStatus;
					this.pageOver = this.navList[index].pageOver;
				} else {
					this.tasks = [];
					let cnt = {
						count: this.count, // Integer
						offset: this.offset // Integer
					};
					if (index == 0) {
						cnt.upUserId = this.userInfo.userId;
						this.getTasks(cnt);
					} else {
						cnt.id = this.userInfo.userId;
						this.getUserTask(cnt);
					}
				}
			}
		},

		getUserTask(cnt) {
			this.$api.getUserTask(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					uni.stopPullDownRefresh();
					let list = this.$util.tryParseJson(res.data.c);
					this.tryData(list);
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		getTasks(cnt) {
			this.$api.getTasks(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					uni.stopPullDownRefresh();
					let list = this.$util.tryParseJson(res.data.c).list;
					this.tryData(list);
				} else {
					this.pageStatus = 'error';
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		tryData(list) {
			if (list.length < this.count) {
				this.pageOver = true;
				this.pageStatus = 'nomore';
			} else {
				this.pageOver = false;
				this.pageStatus = 'more';
			}
			this.navList[this.currIndex].pageOver = this.pageOver;
			this.navList[this.currIndex].pageStatus = this.pageStatus;

			this.tasks = this.tasks.concat(list);
			this.navList[this.currIndex].child = this.tasks;

			console.log(this.tasks);
		}
	},

	onShow() {
		uni.removeStorageSync('taskInfo');
	},

	onLoad() {
		let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
		this.userInfo = userInfo;
		let cnt = {
			module: this.$constData.module, // Long <选填> 模块编号
			upUserId: userInfo.userId, // Long <选填> 创建者编号
			count: this.count, // Integer
			offset: this.offset // Integer
		};
		this.getTasks(cnt);
	},

	onPullDownRefresh() {
		this.page = 1;
		this.navList[this.currIndex].page = 1;
		this.pageStatus = 'loading';
		this.tasks = [];

		let cnt = {
			count: this.count, // Integer
			offset: this.offset // Integer
		};
		if (this.currIndex == 0) {
			cnt.upUserId = this.userInfo.userId;
			this.getTasks(cnt);
		} else {
			cnt.id = this.userInfo.userId;
			this.getUserTask(cnt);
		}
	},
	onReachBottom() {
		if (!this.pageOver) {
			this.page += 1;
			this.navList[this.currIndex].page += 1;
			this.pageStatus = 'loading';

			let cnt = {
				count: this.count, // Integer
				offset: (this.page - 1) * this.count // Integer
			};
			if (this.currIndex == 0) {
				cnt.upUserId = this.userInfo.userId;
				this.getTasks(cnt);
			} else {
				cnt.id = this.userInfo.userId;
				this.getUserTask(cnt);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
view {
	box-sizing: border-box;
}

.page {
	background-color: $group-color-bg;
	padding-bottom: 1rpx;
	min-height: 100vh;
}

.view-title {
	color: #ffffff;
	font-size: 48rpx;
	line-height: 50rpx;
	padding-top: 90rpx;
}

.nav-box {
	position: relative;
	padding: 0 29rpx 30rpx;
	border-radius: 0 0 20rpx 20rpx;
}

.flex-box {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.nav-list {
	margin-top: 40rpx;
}

.top-options {
	padding: 0 40rpx;
	height: 130rpx;
	width: 330rpx;
	background-color: $group-color-search;
	color: $group-color;
	font-size: $group-font-befor;
	border-radius: 4rpx;
	transition: all 0.3s;
}

.active {
	color: #ffffff;
	background: #0f1b07;
}

.top-left-icon {
	image {
		width: 60rpx;
		height: 66rpx;
	}
}

.top-right-icon {
	image {
		width: 70rpx;
		height: 76rpx;
	}
}
</style>
