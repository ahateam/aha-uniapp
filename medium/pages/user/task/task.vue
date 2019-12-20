<template>
	<view class="page">
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">任务总览</view>
		</nav-bar>
		<view class="box">
			<view class="title white">我发布的</view>
			<view class=" list-box white">
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_yfk.png" mode="aspectFit"></image>
						<view class="list-red white" v-if="myTask.paid">{{myTask.paid}}</view>
					</view>
					<view>已付款</view>
				</view>
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_yfp.png" mode="aspectFit"></image>
						<view class="list-red white" v-if="myTask.onging">{{myTask.onging}}</view>
					</view>
					<view>已分配</view>
				</view>
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_cg.png" mode="aspectFit"></image>
						<view class="list-red white" v-if="myTask.draft">{{myTask.draft}}</view>
					</view>
					<view>草稿</view>

				</view>
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_ddfp.png" mode="aspectFit"></image>
						<view class="list-red white" v-if="myTask.ready">{{myTask.ready}}</view>
					</view>
					<view>等待分配</view>
				</view>
			</view>
		</view>
		<!-- dsadsad-->
		<view class="box">
			<view class="title white">我接收的</view>
			<view class=" list-box white uni-flex-just">
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_jxz.png" mode="aspectFit"></image>
						<view class="list-red white" v-if="accTask.onging">{{accTask.onging}}</view>
					</view>
					<view>进行中</view>

				</view>
				<view class="list">
					<view class="top-img-box">
						<view class="list-red white" v-if="accTask.nopay">{{accTask.nopay}}</view>
						<image class="status-icon" src="/static/image/icon/user/task/icon_wcwsk.png" mode="aspectFit"></image>
					</view>
					<view>完成未收款</view>
				</view>
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_ysk.png" mode="aspectFit"></image>
						<view class="list-red white" v-if="accTask.paid">{{accTask.paid}}</view>
					</view>
					<view>已收款</view>
				</view>
			</view>
		</view>
		<view class="title white">浏览历史</view>
		<view v-for="(item,index) in histyList" :key="index">
			<view class="history">
				<image class="history-img" src="/static/image/icon/icon_l.png" mode="aspectFit"></image>
				<view>{{item.date}}</view>
				<image class="history-img" src="/static/image/icon/icon_r.png" mode="aspectFit"></image>
			</view>
			<other-task-list :tasks="item.child" @getItem="navToTask"></other-task-list>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import OtherTaskList from '@/components/task/OtherTaskList.vue'

	export default {
		name: 'assistant',
		components: {
			navBar,
			OtherTaskList
		},
		data() {
			return {
				myTask: {
					paid: 0,
					onging: 0,
					ready: 0,
					draft: 0
				},

				accTask: {
					onging: 0,
					nopay: 0,
					paid: 0
				},

				histyList: [],

				userInfo: {},
			}
		},
		methods: {
			navToTask(item) {
				let src = ''
				if (item.publishUserId == this.userInfo.userId) {
					if (item.status == this.$constData.taskWall[2].key) {
						src = '/pages/myTask/ediorTask/ediorTask'
						uni.showLoading({
							title: '数据拉取中...'
						})
						let cnt = {
							taskId: item.taskId, // Long 任务id
							userId: this.userInfo.userId, // Long <选填> 用户id
						}
						this.getUserByTaskId(cnt, item)
						if (this.$store.state.task.qualiList.length == 0) {
							let cnt1 = {
								count: 100,
								offset: 0
							}
							this.getByQualId(cnt1)
						}
						return
					} else {
						src = `/pages/myTask/taskInfo/myTask?id=${item.taskId}`
					}
				} else if (item.pickUpUserId == this.userInfo.userId) {
					src = `/pages/myTask/taskInfo/taskInfo?id=${item.taskId}`
				} else {
					src = `/pages/task/taskInfo/taskInfo?id=${item.taskId}`
				}

				uni.navigateTo({
					url: src
				})
			},

			navBack() {
				uni.navigateBack()
			},

			getUserByTaskId(cnt, item) { // 取出全部屬性
				this.$api.getUserByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c).publishUser
						obj.finishDate = this.$commen.getFullDate(obj.finishDate)
						if (obj.imgData) {
							obj.imgData = this.$util.tryParseJson(obj.imgData)
						}
						if (obj.fileData) {
							obj.fileData = this.$util.tryParseJson(obj.fileData)
						}
						obj.finishDate = this.$commen.getFullDate(obj.finishDate)
						console.log(obj.finishDate)
						let {
							userHead,
							userName,
							brithday,
							...newObj
						} = obj
						this.$store.dispatch('editorTask', newObj).then((res) => {
							uni.hideLoading()
							uni.navigateTo({
								url: `/pages/myTask/ediorTask/ediorTask?id=${item.taskId}`,
								success: () => {
									// #ifdef APP-PLUS
									setTimeout(() => {
										this.$commen.hiddenTabIcon()
									}, 100);
									// #endif
								}
							})
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			tryListData(arr) {
				let list = [{
					date: '',
					child: []
				}]
				arr.map((item, index) => {
					if (list[0].date == '') {
						list[0].date = item.date
						list[0].child.splice(0, 0, item)
					} else if (item.date == list[list.length - 1].date) {
						list[list.length - 1].child.splice(list.length, 0, item)
					} else {
						let obj = {
							date: item.date,
							child: [item]
						}
						list.splice(list.length, 0, obj)
					}
				})
				this.histyList = list
				console.log(this.histyList)
			},

			getBrowsingHistoryList(cnt) {
				this.$api.getBrowsingHistoryList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c)
						this.tryListData(arr)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			getAllTask(cnt, e) {
				this.$api.getAllTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c)
						console.log(arr)
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].count > 99) {
								arr[i].count == '···'
							}
							if (arr[i].taskStatus == this.$constData.taskStatus[3].key) {
								if (e) {
									this.myTask.paid = arr[i].count
								} else {
									this.accTask.paid = arr[i].count
								}
							}
							if (arr[i].taskStatus == this.$constData.taskStatus[2].key) {
								if (e) {
									this.myTask.nopay = arr[i].count
								} else {
									this.accTask.nopay = arr[i].count
								}
							} else if (arr[i].taskStatus == this.$constData.taskStatus[1].key) {
								if (e) {
									this.myTask.onging = arr[i].count
								} else {
									this.accTask.onging = arr[i].count
								}
							} else if (arr[i].taskStatus == this.$constData.taskStatus[0].key) {
								if (e) {
									this.myTask.ready = arr[i].count
								} else {
									this.accTask.ready = arr[i].count
								}
							} else if (arr[i].title == '草稿') {
								this.myTask.draft = arr[i].count
							}
						}
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			getByQualId(cnt) {
				this.$api.getByQualId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$store.commit('updateQualList', this.$util.tryParseJson(res.data.c))
					} else {
						if (getNumber == 2) {
							uni.showToast({
								title: '服务器错误',
								icon: 'none'
							})
						} else {
							setTimeout(() => {
								getNumber += 1
								let cnt1 = {
									count: 100,
									offset: 0
								}
								this.getByQualId(cnt1)
							}, 500)
						}
					}
				})
			}
		},
		onLoad() {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			this.userInfo = userInfo
			let cnt = {
				userId: userInfo.userId, // Long 用戶id
				isPublishUser: true, // boolean 是否为发布者
			}
			this.getAllTask(cnt, true)

			let cnt1 = {
				userId: userInfo.userId, // Long 用戶id
				isPublishUser: false, // boolean 是否为发布者
			}
			this.getAllTask(cnt1, false)

			let cnt2 = {
				// taskId: taskId, // Long <选填> 任务id
				userId: userInfo.userId, // Long 用户id
				count: 10, // Integer 
				offset: 0, // Integer 
			}
			this.getBrowsingHistoryList(cnt2)
		}
	}
</script>

<style lang="scss" scoped>
	.history {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.history>view {
		margin: 20rpx 23rpx;
		color: #999999;
		font-size: 26rpx;
	}

	.history-img {
		width: 141rpx;
		height: 16rpx;
	}

	.top-img-box {
		position: relative;
		width: 60rpx;
		margin: 0 auto;
	}

	.box {
		margin-bottom: 20rpx;
	}

	.list-box {
		display: flex;
	}

	.uni-flex-just {
		justify-content: center;
	}

	.list {
		flex: 1;
		position: relative;
		margin-bottom: 30rpx;
		text-align: center;
	}

	.status-icon {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 20rpx;
		margin-top: 19rpx;
	}

	.list>text {
		font-size: 28rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #666666;
	}

	.list-red {
		position: absolute;
		top: 0;
		right: -18rpx;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 3rpx solid #EE455A;
		box-shadow: 0 0 0 3rpx $group-color-w;
		color: #EE455A;
		font-size: 22rpx;
		line-height: 36rpx;
		text-align: center;
	}

	.page {
		background-color: #F2F5F7;
		min-height: 100vh;
	}

	.white {
		background-color: #FFFFFF;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.view-title {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	// 导航 end
	.title {
		padding: 30rpx 0 30rpx 40rpx;
		color: #333333;
		font-size: 34rpx;
	}
</style>
