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
		<view v-if="contentData.length == 0" class="noThing">
			没有获取到数据呢
		</view>
		<view style="position: relative;" v-for="(item,index) in contentData" :key="index" @click="navToTask(item)">
			<task-list-box v-if="item.type == constData.templateType[4].key" :title="item.title" text="陪吃任务" :name="item.user.name"
			 :head="item.user.ext.userHead"></task-list-box>
			<task-list-box v-if="item.type == constData.templateType[1].key" :title="item.title" :text="item.detail.text" :name="item.user.name"
			 :head="item.user.ext.userHead"></task-list-box>
			<view class="taskStatus">
				{{item.status}}
			</view>
		</view>
	</view>
</template>

<script>
	import taskListBox from '@/components/task/taskListBox.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue'

	let windowWidth = 0
	export default {
		components: {
			taskListBox,
			uniTag
		},
		data() {
			return {
				constData: this.$constData,
				navsList: [{
						name: '已发任务',
						child: [{
								name: '未领取',
								status: this.$constData.taskWallStatus[1].key,
								page: 1,
							},
							{
								name: '未指派',
								status: this.$constData.taskWallStatus[2].key,
								page: 1,
							},
							{
								name: '未接单',
								status: this.$constData.taskWallStatus[9].key,
								page: 1,
							},
							{
								name: '进行中',
								status: this.$constData.taskWallStatus[4].key,
								page: 1,
							},
							{
								name: '未确认',
								status: this.$constData.taskWallStatus[5].key,
								page: 1,
							},
							{
								name: '作品不满意',
								status: this.$constData.taskWallStatus[7].key,
								page: 1,
							}
						],
						tagCurrent: 0,
					},
					{
						name: '历史任务',
						child: [{
								name: '已完成',
								status: this.$constData.taskWallStatus[6].key,
								page: 1,
							},
							{
								name: '已关闭',
								status: this.$constData.taskWallStatus[3].key,
								page: 1,
							},
							{
								name: '审核未通过',
								status: this.$constData.taskWallStatus[10].key,
								page: 1,
							}
						],
						tagCurrent: 0,
					}
				], //标签列表
				navCurrentIndex: 0,

				contentData: [],

				userId: uni.getStorageSync('userId'),
				count: 10,
				offset: 0,
				page: 1,
				pageOver: false, //是否结束拉取
			}
		},
		onLoad() {
			uni.showLoading({
				title: '获取数据中'
			})
			let cnt = {
				module: this.$constData.module, // Long 模块编号
				// ask: ask, // Byte <选填> 诉求分类（0求表扬，1求陪玩，2求分享，3求制作）
				// type: type, // Byte <选填> 类型
				status: this.$constData.taskWallStatus[1].key, // Byte <选填> 状态
				upUserId: this.userId, // Long <选填> 创建者编号
				// tags: tags, // String <选填> 标签
				// title: title, // String <选填> 标题
				count: this.count, // int 
				offset: this.offset, // int 
			}
			this.getTask(cnt)
		},
		methods: {
			//导航栏改变内容
			changeNav(index) {
				this.navCurrentIndex = index
				let arr = this.navsList[index]
				this.page = arr.child[arr.tagCurrent].page
				this.pageOver = arr.child[arr.tagCurrent].pageOver
				this.contentData = []

				if (arr.child[arr.tagCurrent].child) {
					this.contentData = arr.child[arr.tagCurrent].child
					return
				}

				let cnt = {
					upUserId: this.userId, // Long 用户id
					status: arr.child[arr.tagCurrent].status, //int
					count: this.count, // int 
					offset: this.offset, // int 
					module: this.$constData.module, // Long 模块编号
				}
				this.getTask(cnt)
			},

			changeTag(index, status) {
				let arr = this.navsList[this.navCurrentIndex]
				arr.tagCurrent = index
				this.contentData = []
				if (arr.child[index].child) {
					this.contentData = arr.child[index].child
					return
				}
				let cnt = {
					upUserId: this.userId, // Long 用户id
					status: status, //int
					count: this.count, // int 
					offset: this.offset, // int 
					module: this.$constData.module, // Long 模块编号
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
				if (item.type == this.$constData.templateType[1].key) {
					uni.navigateTo({
						url: `/pages/task/taskView/VideoTask?id=${item.id}`
					})
				}
				if (item.type == this.$constData.templateType[4].key) {
					uni.navigateTo({
						url: `/pages/task/taskView/foodTask?id=${item.id}`
					})
				}
			},

			getTask(cnt) {
				this.$api.getTasks(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.stopPullDownRefresh()
						let status = this.$constData.taskWallStatus
						let arr = this.$util.tryParseJson(res.data.c).list
						console.log(arr)
						for (let i = 0; i < arr.length; i++) {

							arr[i].detail = this.$util.tryParseJson(arr[i].detail)
							if (arr[i].user) {
								arr[i].user.ext = this.$util.tryParseJson(arr[i].user.ext)
							}
							switch (arr[i].status) {
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
						this.contentData = this.contentData.concat(arr)
						let navList = this.navsList[this.navCurrentIndex]
						navList.child[navList.tagCurrent].child = this.contentData
						// this.navsList[this.navCurrentIndex].child.split(navList.tagCurrent,1,this.content)
						uni.hideLoading()
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
				module: this.$constData.module, // Long 模块编号
				// ask: ask, // Byte <选填> 诉求分类（0求表扬，1求陪玩，2求分享，3求制作）
				// type: type, // Byte <选填> 类型
				status: arr.child[index].status, // Byte <选填> 状态
				upUserId: this.userId, // Long <选填> 创建者编号
				// tags: tags, // String <选填> 标签
				// title: title, // String <选填> 标题
				count: this.count, // int 
				offset: this.offset, // int 
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
			// padding: 0 10upx;
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
