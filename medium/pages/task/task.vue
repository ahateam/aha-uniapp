<template>
	<view class="page">
		<nav-bar class="nav-top-box" type="transparent" :back="false" :style="{ height: getStatusHeight() }"><view class="view-title">所有任务</view></nav-bar>
		<view :style="{ 'padding-top': getStatusHeight() }"></view>
		<!-- 顶部选项卡 -->

		<view class="nav-box">
			<scroll-view class="top-option" scroll-x="true" scroll-left="0" scroll-with-animation :scroll-into-view="'nav' + currIndex">
				<view
					class="top-options"
					:id="'nav' + index"
					:class="currIndex == index ? 'active' : ''"
					:style="index == 0 ? 'margin-left:0;' : ''"
					v-for="(item, index) in tagList"
					:key="index"
					@click="currTag(index, item)"
				>
					<view>{{ item.name }}</view>
				</view>
			</scroll-view>
			<view class="nav-shadow"></view>
		</view>

		<!-- 顶部选项卡 end -->
		<task-list :tasks="tasks" @getItem="navToInfo"></task-list>
		<!-- 任务栏  task==任务栏-->
		<uni-load-more :status="pageStatus"></uni-load-more>
	</view>
</template>

<script>
import TaskList from '@/components/task/TaskList.vue';
import navBar from '@/components/zhouWei-navBar/index.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

let bitmap = null;

let sdkwx = uni.requireNativePlugin('TIM-SdkWX');

export default {
	components: {
		TaskList,
		navBar,
		uniLoadMore
	},
	data() {
		return {
			count: 10,
			offset: 0,
			page: 1,
			pageOver: false,
			pageStatus: 'loading',

			userInfo: '',
			clickTab: true,
			currIndex: 0,
			tagList: [],
			// 我的任务信息列表

			tasks: []
		};
	},

	methods: {
		getStatusHeight() {
			let height = uni.getSystemInfoSync()['statusBarHeight'];
			return 44 + height + 'px';
		},

		navToInfo(item) {
			uni.navigateTo({
				url: `/pages/task/taskInfo/taskInfo?id=${item.taskId}`,
				success: () => {
					setTimeout(() => {
						this.$commen.hiddenTabIcon();
					}, 100);
				}
			});
		},

		currTag(index, item) {
			if (!(this.pageStatus == 'loading')) {
				this.currIndex = index;
				if (this.tagList[index].child) {
					this.tasks = this.tagList[index].child;
					this.pageOver = this.tagList[index].pageOver;
					this.pageStatus = this.tagList[index].pageStatus;
				} else {
					this.tasks = [];
					this.pageStatus = 'loading';
					let cnt = {
						// taskStatus: taskStatus, // Byte <选填> 任务状态
						status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
						taskType: item.key, // Byte <选填> 任务类型
						count: this.count, // Integer
						offset: this.offset // Integer
					};
					this.getTaskList(cnt);
				}
			}
		},

		createtab() {
			// 设置水平居中位置
			console.log('1111');
			let leftPos = Math.ceil((plus.screen.resolutionWidth - 58) / 2);
			let view = new plus.nativeObj.View('icon', {
				bottom: '2px',
				left: leftPos + 'px',
				width: '58px',
				height: '66.99px'
			});
			view.drawBitmap(bitmap, {
				tag: 'font',
				id: 'icon',
				src: '/static/tabIcon/tab-add-task.png',
				position: {
					top: '0px',
					left: '5px',
					width: '100%',
					height: '100%'
				}
			});
			view.addEventListener(
				'click',
				function(e) {
					uni.switchTab({
						url: '/pages/index/index'
					});
				},
				false
			);
			view.show();
		},

		tryParseData(list) {
			if (list.length < this.count) {
				this.pageOver = true;
				this.pageStatus = 'nomore';
			} else {
				this.pageOver = false;
				this.pageStatus = 'more';
			}
			this.tagList[this.currIndex].pageStatus = this.pageStatus;
			this.tagList[this.currIndex].pageOver = this.pageOver;

			this.tasks = this.tasks.concat(list);
			this.tagList[this.currIndex].child = this.tasks;
		},

		getTaskList(cnt) {
			this.$api.getTaskList(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					console.log('-----------------list-------------------');
					console.log(this.$util.tryParseJson(res.data.c));
					uni.stopPullDownRefresh();
					let list = this.$util.tryParseJson(res.data.c);
					this.tryParseData(list);
				} else {
					uni.stopPullDownRefresh();
					this.pageStatus = 'error';
				}
			});
		},

		timLogin() {
			//登录
			let userId = String(this.userInfo.userId);
			let userSig = this.userInfo.userSig; //参考腾讯官方文档
			sdkwx.login(userId, userSig, function(res) {
				console.log(res);
				if (res.code == 0 || res.code == '0') {
					let busiId = '17378'; //busiId腾讯后台生成
					//设置推送token
					sdkwx.setToken(busiId, function(res2) {
						console.log(res);
					});
				}
			});
		}
	},
	onShow() {
		this.$commen.showTabIcon();
	},
	onLoad() {
		let list = [...this.$constData.taskType];
		let array = [];
		list.map((item, index) => {
			array.push(
				Object.assign({}, item, {
					pageStatus: 'loading',
					pageOver: false,
					page: 1
				})
			);
		});

		let obj = {
			name: '全部',
			key: -1
		};
		array.splice(0, 0, obj);
		this.tagList = array;

		if (uni.getStorageSync('userInfo')) {
			this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
			this.timLogin();
			let cnt = {
				status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
				count: this.count, // Integer
				offset: this.offset // Integer
			};
			this.getTaskList(cnt);
			// tim登录

			// #ifdef APP-PLUS
			if (!plus.nativeObj.Bitmap('bmp1')) {
				bitmap = new plus.nativeObj.Bitmap('bmp1');
				bitmap.loadBase64Data(
					'data:image/png;base64,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',
					function() {},
					function(e) {}
				);
				this.createtab();
			}
			// #endif
		} else {
			uni.reLaunch({
				url: '../login/mobilePassword'
			});
		}
	},
	onPullDownRefresh() {
		this.tasks = [];
		this.pageStatus = 'loading';
		this.pageOver = false;
		this.page = 1;
		this.tagList[this.currIndex].page = 1;

		let cnt = {
			status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
			count: this.count, // Integer
			offset: this.offset // Integer
		};
		if (this.currIndex != 0) {
			cnt.taskType = this.tagList[this.currIndex].key; // Byte <选填> 任务类型
		}
		this.getTaskList(cnt);
	},
	onReachBottom() {
		if (!this.pageOver) {
			this.page += 1;
			this.tagList[this.currIndex].page += 1;
			this.pageStatus = 'loading';
			let cnt = {
				status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
				count: this.count, // Integer
				offset: (this.page - 1) * this.count // Integer
			};
			if (this.currIndex != 0) {
				cnt.taskType = this.tagList[this.currIndex].key; // Byte <选填> 任务类型
			}
			this.getTaskList(cnt);
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	background-color: #f2f5f7;
	padding-bottom: 1rpx;
	min-height: calc(100vh - 1rpx);
}

.nav-top-box {
	position: fixed;
	width: 100vw;
	background-color: $group-color-w;
	z-index: 1;
}

.view-title {
	color: $group-color-article;
	font-size: 36rpx;
	line-height: 50rpx;
	font-weight: $group-title-weight;
}

.nav-box {
	position: relative;
	background-color: #ffffff;
	padding-left: 29rpx;
}

.top-option {
	white-space: nowrap;
	width: 100%;
	background-color: #ffffff;
	border-radius: 4rpx;
	color: rgba($color: #000000, $alpha: 1);
}

.nav-shadow {
	position: absolute;
	z-index: 5;
	right: 0;
	top: 50%;
	margin-top: -40rpx;
	width: 68rpx;
	height: 80rpx;
	background: linear-gradient(90deg, rgba($color: #ffffff, $alpha: 0), #ffffff);
	pointer-events: none;
}

.top-options {
	display: inline-block;
	line-height: 66rpx;
	background-color: #ffffff;
	color: #587685;
	font-size: 26rpx;
	border-radius: 4rpx;
	border: 1rpx solid #587685;
	margin: 41rpx 10rpx 30rpx 29rpx;

	view {
		box-sizing: border-box;
		padding: 0 30rpx;
	}
}

.active {
	display: inline-block;
	line-height: 66rpx;
	color: #ffffff;
	background-color: #182f45;
	font-size: 26rpx;
	margin: 41rpx 10rpx 30rpx 29rpx;
}
</style>
