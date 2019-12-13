<template>
	<view class="page">
		<view class="status-nav" :style="{height:getStatusHeight()}"></view>
		<!-- 顶部选项卡 -->
		<view class="nav-box">
			<view class="view-title">我的任务</view>
			<view class="flex-box nav-list">
				<view class="top-options flex-box" :class="[{active:currIndex == index},index == 0?'top-left-icon':'top-right-icon']"
				 :style="index == 0?'margin-left:0;':''" v-for="(item,index) in navList" :key="index" @click="topoption(index)">
					<view>{{item.text}}</view>
					<image :src="currIndex == index?item.currImg:item.img" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 顶部选项卡 end -->
		<task-list :tasks="tasks" @getItem="navToInfo" type="1"></task-list>
		<!-- 任务栏  task==任务栏-->
	</view>
</template>

<script>
	import TaskList from '@/components/task/TaskList.vue'

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
				navList: [{
						text: '我发布的',
						img: '/static/image/icon/task/icon_wfbd.png',
						currImg: '/static/image/icon/task/icon_wfbd_p.png',
						child: null,
						pageStatus: 'loading',
						page: 1,
						pageOver: false
					},
					{
						text: '我接收的',
						img: '/static/image/icon/task/icon_wjsd.png',
						currImg: '/static/image/icon/task/icon_wjsd_p.png',
						child: null,
						pageStatus: 'loading',
						page: 1,
						pageOver: false
					}
				],
				// 我的任务信息列表

				tasks: [],
			}
		},
		methods: {
			getStatusHeight() {
				return uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			navToInfo(item) {
				console.log(item)
				let taskType = ''
				if (this.currIndex == 1) {
					taskType = 'taskInfo'
				} else {
					taskType = 'myTask'
				}
				uni.navigateTo({
					url: `/pages/myTask/taskInfo/${taskType}?id=${item.taskId}`,
					success: () => {
						// #ifdef APP-PLUS
						setTimeout(() => {
							this.$commen.hiddenTabIcon()
						}, 100);
						// #endif
					}
				})

			},

			topoption(index) {
				if (this.pageStatus != 'loading') {
					this.currIndex = index
					if (this.navList[index].child) {
						this.tasks = this.navList[index].child
					} else {
						this.tasks = []
						let cnt = {
							count: this.count, // Integer 
							offset: this.offset, // Integer 
						}
						if (index == 0) {
							cnt.pickUpUserId = this.userInfo.userId // Long 发布者id
						} else {
							cnt.pickUpUserId = this.userInfo.userId // Long <选填> 接受者用户id
						}
						this.getTaskList(cnt)
					}
				}
			},

			getTaskList(cnt) {
				this.$api.getTaskList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.stopPullDownRefresh()
						let list = this.$util.tryParseJson(res.data.c)
						console.log(list)
						this.tryData(list)
					} else {
						console.log('error')
					}
				})
			},

			tryData(list) {
				if (list.length < this.count) {
					this.pageOver = true
					this.pageStatus = 'nomore'
				} else {
					this.pageOver = false
					this.pageStatus = 'more'
				}
				this.navList[this.currIndex].pageOver = this.pageOver
				this.navList[this.currIndex].pageStatus = this.pageStatus

				this.tasks = this.tasks.concat(list)
				this.navList[this.currIndex].child = this.tasks
			}
		},
		onShow() {
			this.$commen.showTabIcon()
		},
		onLoad() {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			this.userInfo = userInfo
			let cnt = {
				// taskStatus: taskStatus, // Byte <选填> 任务状态
				// status: status, // Byte <选填> 状态（是否删除）
				publishUserId: userInfo.userId, // Long <选填> 发布者id
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			this.getTaskList(cnt)
		},
		onPullDownRefresh() {
			this.page = 1
			this.navList[this.currIndex].page = 1
			this.pageStatus = 'loading'
			this.tasks = []

			let cnt = {
				// taskStatus: taskStatus, // Byte <选填> 任务状态
				// status: status, // Byte <选填> 状态（是否删除）
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			if (this.currIndex == 0) {
				cnt.publishUserId = this.userInfo.userId
			} else {
				cnt.pickUpUserId = this.userInfo.userId
			}

			this.getTaskList(cnt)
		},
		onReachBottom() {
			if (!this.pageOver) {
				this.page += 1
				this.navList[this.currIndex].page += 1
				this.pageStatus = 'loading'

				let cnt = {
					count: this.count, // Integer
					offset: (this.page - 1) * this.count, // Integer 
				}

				if (this.currIndex == 0) {
					cnt.publishUserId = this.userInfo.userId
				} else {
					cnt.pickUpUserId = this.userInfo.userId
				}

				this.getTaskList(cnt)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status-nav {
		position: fixed;
		z-index: 999;
		top: 0;
		width: 100%;
		background-color: #FFFFFF;
	}

	view {
		box-sizing: border-box;
	}

	.page {
		background-color: #F2F5F7;
		padding-bottom: 1rpx;
		min-height: 100vh;
	}

	.view-title {
		color: #333333;
		font-size: 50rpx;
		line-height: 70rpx;
		padding-top: 128rpx;
	}

	.nav-box {
		position: relative;
		background-color: #FFFFFF;
		padding: 0 29rpx 30rpx;
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
		transition: all .3s;
	}

	.active {
		color: #FFFFFF;
		background: linear-gradient(90deg, #35536F, #11273B);
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
