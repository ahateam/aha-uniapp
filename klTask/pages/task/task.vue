<template>
	<view class="page">
		<view :style="{ 'padding-top': getStatusHeight() }"></view>
		<!-- 顶部选项卡 -->
		<view class="top-title" @click="test">所有任务</view>
		<view class="search-box">
			<image src="/static/image/icon/search.png" mode="aspectFit"></image>
			<input type="text" placeholder="清洁打扫卧室" />
		</view>
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
		</view>

		<!-- 顶部选项卡 end -->
		<task-list :tasks="tasks" @getItem="navToInfo" :coords="coords"></task-list>
		<!-- 任务栏  task==任务栏-->
		<uni-load-more :status="pageStatus" color="#ffffff"></uni-load-more>
	</view>
</template>

<script>
import TaskList from '@/components/task/TaskList.vue';
import navBar from '@/components/zhouWei-navBar/index.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

let bitmap = null;

// let sdkwx = uni.requireNativePlugin('TIM-SdkWX');

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

			tasks: [],
			coords: {}
		};
	},

	methods: {
		test() {
			uni.navigateTo({
				url: '../addTask/addTask'
			});
		},

		getStatusHeight() {
			let height = uni.getSystemInfoSync()['statusBarHeight'];
			return height + 'px';
		},

		navToInfo(item) {
			uni.navigateTo({
				url: `/pages/task/taskInfo/taskInfo?id=${item.id}`,
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
						status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
						count: this.count, // Integer
						offset: this.offset, // Integer
						userId: this.userInfo.userId, // 用户id
						module: this.$constData.module // Long <选填> 模块编号
						// ask: ask, // Byte <选填> 诉求分类（0求表扬，1求陪玩，2求分享，3求制作）
						// centerPoint: centerPoint, // String <选填> 任务人位置
						// moneySort: moneySort, // Byte <选填> 按金额排序
						// createTimeSort: createTimeSort, // Byte <选填> 按时间排序
						// distanceSort: distanceSort // Byte <选填> 按距离排序r
					};
					if (index == 1) {
						cnt.moneySort = 0;
					} else if (index == 2) {
						cnt.createTimeSort = 0;
					} else if (index == 3) {
						cnt.distanceSort = 1;
						if (this.coords) {
							cnt.centerPoint = `${this.coords.latitude},${this.coords.longitude}`;
						}
					}
					this.getTasks(cnt);
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

		getTasks(cnt) {
			this.$api.getTasks(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					console.log('-----------------list-------------------');
					console.log(this.$util.tryParseJson(res.data.c).list);
					uni.stopPullDownRefresh();
					let list = this.$util.tryParseJson(res.data.c).list;
					this.tryParseData(list);
				} else {
					uni.stopPullDownRefresh();
					this.pageStatus = 'error';
					console.log(res.data);
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
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
		},

		getList() {
			let cnt = {
				module: this.$constData.module, // Long <选填> 模块编号
				status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
				count: this.count, // Integer
				offset: this.offset, // Integer
				userId: this.userInfo.userId
			};
			// if (this.coords) {
			// 	cnt.centerPoint = `${this.coords.latitude},${this.coords.longitude}`;
			// }
			this.getTasks(cnt);
		}
	},
	onShow() {
		// this.$commen.showTabIcon();
	},
	onLoad() {
		let list = [{ name: '金额', key: 0 }, { name: '发布日期', key: 1 }, { name: '离我最近', key: 2 }];
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
			// this.timLogin();// tim登录
			// #ifdef APP-PLUS
			plus.geolocation.getCurrentPosition(
				res => {
					this.coords = res.coords;
					this.getList();
				},
				e => {
					console.log(e.message);
					this.getList();
				},
				{ geocode: true }
			);
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
			module: this.$constData.module, // Long <选填> 模块编号
			status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
			count: this.count, // Integer
			offset: this.offset, // Integer
			userId: this.userInfo.userId
		};
		if (this.currIndex == 1) {
			cnt.moneySort = 0;
		} else if (this.currIndex == 2) {
			cnt.createTimeSort = 0;
		} else if (this.currIndex == 3) {
			cnt.distanceSort = 1;
			if (this.coords) {
				cnt.centerPoint = `${this.coords.latitude},${this.coords.longitude}`;
			}
		}
		// if (this.currIndex != 0) {
		// 	cnt.taskType = this.tagList[this.currIndex].key; // Byte <选填> 任务类型
		// }
		console.log(cnt);
		this.getTasks(cnt);
	},
	onReachBottom() {
		if (!this.pageOver) {
			this.page += 1;
			this.tagList[this.currIndex].page += 1;
			this.pageStatus = 'loading';
			let cnt = {
				status: this.$constData.taskWall[0].key, // Byte <选填> 状态（是否删除）
				count: this.count, // Integer
				offset: (this.page - 1) * this.count, // Integer
				userId: this.userInfo.userId
			};
			if (this.currIndex == 1) {
				cnt.moneySort = 0;
			} else if (this.currIndex == 2) {
				cnt.createTimeSort = 0;
			} else if (this.currIndex == 3) {
				cnt.distanceSort = 1;
				if (this.coords) {
					cnt.centerPoint = `${this.coords.latitude},${this.coords.longitude}`;
				}
			}
			this.getTasks(cnt);
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	background-color: $group-color-bg;
	padding-bottom: 1rpx;
	min-height: calc(100vh - 1rpx);
}

.top-title {
	padding: 38rpx 0 0 40rpx;
	font-size: 46rpx;
	color: #ffffff;
	line-height: 50rpx;
}

.search-box {
	display: flex;
	align-items: center;
	margin: 30rpx;
	padding: 12rpx 20rpx;
	background-color: #ffffff;
	border-radius: 6rpx;

	image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	input {
		font-size: 30rpx;
		line-height: 42rpx;
		color: #999999;
	}
}

.nav-box {
	position: relative;
	padding-left: 30rpx;
}

.top-option {
	white-space: nowrap;
	width: 100%;
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
	line-height: 70rpx;
	background-color: rgba($color: $group-color-btn, $alpha: 0.1);
	color: $group-color-btn-curr;
	font-size: 26rpx;
	border-radius: 6rpx;
	margin: 2rpx 21rpx 0 0rpx;
	width: 157rpx;
	text-align: center;

	view {
		box-sizing: border-box;
		padding: 0 30rpx;
	}
}

.active {
	display: inline-block;
	line-height: 66rpx;
	color: #ffffff;
	background-color: rgba($color: $group-color-btn-curr, $alpha: 0.5);
	font-size: 26rpx;
	margin: 2rpx 21rpx 0 0rpx;
}
</style>
