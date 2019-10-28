<template>
	<view>
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in navsList" :key="index" class="nav-item" :class="{current: index === navCurrentIndex}"
			 :id="'tab'+index" @click="changeNav(index)">{{item.name}}</view>
		</scroll-view>
		<view style="padding-top: 90upx;"></view>
		<view class="tagsList" v-for="(item,index) in navsList[navCurrentIndex].child" :key="index">
			<uni-tag :type="navsList[navCurrentIndex].tagCurrent == index?'primary':'default'" :text="item.name" @click="changeTag(index,item.status)"></uni-tag>
		</view>
		<view v-if="contentData == 0" class="noThing">
			没有获取到数据呢
		</view>
		<view style="position: relative;" v-for="(item,index) in contentData" :key="index" @click="navToTask(item)">
			<task-list-box class="taskBox" v-if="item.task.type == constData.templateType[4].key" :title="item.taskTitle" text="陪吃任务"
			 :name="item.task.user.name" :head="item.task.user.head"></task-list-box>
			<task-list-box class="taskBox" v-if="item.task.type == constData.templateType[1].key" :title="item.taskTitle" :text="item.task.detail.text"
			 :name="item.task.user.name" :head="item.task.user.head"></task-list-box>
			<view class="taskStatus">
				{{item.status}}
			</view>
		</view>
	</view>
</template>

<script>
	import taskListBox from '@/components/task/taskListBox.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue'

	export default {
		components: {
			taskListBox,
			uniTag
		},
		data() {
			return {
				constData: this.$constData,
				navsList: [{
						name: '未完成任务',
						child: [{
								name: '全部',
								status: -1,
								page: 1,
							},
							{
								name: '领取任务',
								status: this.$constData.taskStatus[0].key,
								page: 1,
							},
							{
								name: '未接单',
								status: this.$constData.taskStatus[7].key,
								page: 1,
							},
							{
								name: '进行中',
								status: this.$constData.taskStatus[1].key,
								page: 1,
							},
							{
								name: '未确认',
								status: this.$constData.taskStatus[2].key,
								page: 1,
							},
							{
								name: '作品未通过',
								status: this.$constData.taskStatus[4].key,
								page: 1,
							}
						],
						tagCurrent: 0,
					},
					{
						name: '历史任务',
						child: [{
								name: '已完成',
								status: this.$constData.taskStatus[3].key,
								// status: 3,
								page: 1,
							},
							{
								name: '已关闭',
								status: this.$constData.taskStatus[5].key,
								// status: 5,
								page: 1,
							}
						],
						tagCurrent: 0,
					}
				], //标签列表
				navCurrentIndex: 0,

				contentData: [], //内容列表
				userId: uni.getStorageSync('userId'),
				count: 10,
				offset: 0,
			}
		},
		onLoad() {
			uni.showLoading({
				title: '获取数据中'
			})
			let cnt = {
				id: this.userId, // Long 用户id
				count: this.count, // int
				offset: this.offset, // int
			}
			this.getTask(cnt)
		},
		methods: {
			//导航栏改变显示内容
			changeNav(index) {
				let arr = this.navsList[index]
				this.navCurrentIndex = index
				this.contentData = []
				this.page = arr.child[arr.tagCurrent].page

				if (arr.child[arr.tagCurrent].child) {
					this.contentData = arr.child[arr.tagCurrent].child
					return
				}

				let cnt = {
					id: this.userId, // Long 用户id
					// status: arr.child[arr.tagCurrent].status, //int
					count: this.count, // int
					offset: this.offset, // int
				}
				if (index != 0) {
					cnt.status = arr.child[arr.tagCurrent].status //int
				}
				this.getTask(cnt)
			},

			//标签改变显示内容
			changeTag(index, status) {
				let arr = this.navsList[this.navCurrentIndex]
				arr.tagCurrent = index
				this.contentData = []

				if (arr.child[index].child) {
					this.contentData = arr.child[index].child
					return
				}

				let cnt = {
					id: this.userId, // Long 用户id
					// status: status, //int
					count: this.count, // int 
					offset: this.offset, // int 
				}
				if (index != 0) {
					cnt.status = status
				}
				this.getTask(cnt)
			},

			//获得元素的size
			getElSize(id) {
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},

			navToTask(item) {
				if (item.task.type == this.$constData.templateType[1].key) {
					console.log('11111')
					uni.navigateTo({
						url: `/pages/task/taskView/VideoTask?id=${item.task.id}`
					})
				}
				if (item.task.type == this.$constData.templateType[4].key) {
					uni.navigateTo({
						url: `/pages/task/taskView/foodTask?id=${item.task.id}`
					})
				}
			},

			getTask(cnt) {
				this.$api.getUserTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						let status = this.$constData.taskWallStatus
						let arr = this.$util.tryParseJson(res.data.c)
						console.log(arr)
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].task) {
								arr[i].task.detail = this.$util.tryParseJson(arr[i].task.detail)
								switch (arr[i].task.status) {
									case status[0].key:
										arr[i].status = '尚未审核'
										break;
									case status[1].key:
										arr[i].status = '等待领取'
										break;
									case status[2].key:
										arr[i].status = '已领取，等待确认'
										break;
									case status[3].key:
										arr[i].status = '已关闭'
										break;
									case status[4].key:
										arr[i].status = '进行中'
										break;
									case status[5].key:
										arr[i].status = '作品已上传'
										break;
									case status[6].key:
										arr[i].status = '已完成'
										break;
									case status[7].key:
										arr[i].status = '作品不满意'
										break;
									case status[8].key:
										arr[i].status = '拒绝任务完成申请'
										break;
									case status[9].key:
										arr[i].status = '指派中'
										break;
									case status[10].key:
										arr[i].status = '审核未通过'
										break;
								}

							}
						}
						this.contentData = this.contentData.concat(arr)
						let navList = this.navsList[this.navCurrentIndex]
						navList.child[navList.tagCurrent].child = this.contentData
						console.log(this.contentData)
					}
				})
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.contentData = []
			let arr = this.navsList[this.navCurrentIndex]
			let index = arr.tagCurrent

			let cnt = {
				id: this.userId, // Long 用户id
				count: this.count, // int
				offset: this.offset, // int
			}
			if (index != 0) {
				cnt.status = arr.child[index].status //int
			}
			this.getTask(cnt)
		}
	}
</script>

<style lang="scss" scoped>
	.taskStatus {
		position: absolute;
		right: $box-margin-left;
		top: $box-margin-top;
		font-size: $list-info;
		color: $list-info-color;
	}

	.noThing {
		font-size: $list-title;
		padding: $box-margin-top $box-margin-left;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: fixed;
		top: 0;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 50vw;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 50%;
			}
		}
	}

	.tagsList {
		padding: 15upx;
		display: inline-block;
		font-size: $list-info;
		font-weight: bold;
	}
</style>
