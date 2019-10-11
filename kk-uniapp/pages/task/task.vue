<template>
	<view>
		<view v-if="versionStatus == constData.showStatus[1].key">
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
				<view v-for="(item, index) in contentTagGroupData" :key="index" class="nav-item" :class="{ current: index === currentSort }"
				 @click="changeNav(item.type,index)" :id="'tab'+index">
					{{ item.name }}
				</view>
			</scroll-view>
			<view style="padding-top: 90upx;"></view>
			<!-- { primary: index == tagCurrent } -->
			<view class="tagBox">
				<uni-tag v-for="(item,index) in contentTagData" class="tags" :type="index == tagCurrent?'primary':''" :text="item.name"
				 :key="index" @click="getTaskByTag(index)"></uni-tag>
			</view>

			<view class="fab-box" @click="navToBtn">
				<text class="iconfont kk-jia"></text>
			</view>

			<view v-for="(item,index) in contentData" :key="index" @click="navToTask(item)">
				<task-list-box v-if="item.type == constData.templateType[4].key" :title="item.title" text="陪吃任务" :name="item.user.name"
				 :head="item.user.head"></task-list-box>
				<task-list-box v-if="item.type == constData.templateType[1].key" :title="item.title" :text="item.detail" :name="item.user.name"
				 :head="item.user.head"></task-list-box>
			</view>
			<uni-load-more :status="pageStatus"></uni-load-more>
		</view>

		<view v-if="versionStatus == constData.showStatus[0].key">
			<view class="imgBox">
				<image src="/static/image/fa7458191873625b892e7956c1efa7b.jpg" mode="widthFix"></image>
			</view>
			<view class="testText">
				员工对任务重要性（Task Significance）的认知是员工就其工作对他人产生正面影响的一种判断，它影响员工的行为、态度和绩效（Grant,
				2008;Organ,2006）。任务重要性体现的是一种角色内的贡献。具体地，任务重要性通过工作经历的意义（Meaningfulness）和责任感（Sense
				ofresponsibility）等关键心理状态（Criticalpsychologicalstates）影响工作绩效。当员工感觉到自己的工作任务是重要的，会表现出一种积极的团队精神以提高组织效率。而随着效率的提高，对企业的贡献越大，员工在雇佣关系上的谈判会变得强势，因此可能会提出一些要求（例如改善工作环境、更多自主决策权等），而只要这些要求不超过离职所带来的损失，雇主最好的决策是尽量满足该员工的要求。
			</view>
		</view>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import taskListBox from '@/components/task/taskListBox.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	let windowWidth = 0
	export default {
		components: {
			uniTag,
			taskListBox,
			uniLoadMore
		},

		data() {
			return {
				constData: this.$constData, //全局变量
				page: 1,
				count: 10,
				offset: 0,
				pageStatus: 'loading',
				pageOver: false,

				// 导航栏数据
				scrollLeft: 0,
				contentTagGroupData: [], //导航栏列表
				currentSort: 0, //导航栏选中下标
				type: '全部', //当前选中类型

				//标签
				contentTagData: {},
				tagName: '', //当前选中标签
				tagCurrent: -1, //当前选中标签下标

				//内容
				contentData: [], //内容列表


				versionStatus: '', //版本号
			}
		},

		onLoad() {
			// #ifdef MP
			// this.versionStatus = uni.getStorageSync('versionStatus')
			this.versionStatus = this.$constData.showStatus[1].key
			if (this.versionStatus == this.$constData.showStatus[0].key) {
				return
			}
			// #endif

			// #ifdef APP-PLUS
			this.versionStatus = this.$constData.showStatus[1].key
			// #endif

			windowWidth = uni.getSystemInfoSync().windowWidth
			this.getContentTagGroupTypes()
		},
		methods: {
			//跳转至创建任务界面
			navToBtn() {
				if (uni.getStorageSync('userId') == '1234567890') {
					uni.switchTab({
						url: '/pages/user/user'
					})
					uni.showToast({
						title: '请登录',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/task/createList/createList'
				})
			},

			//跳转至任务详情

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

			//导航栏改变内容
			async changeNav(e, index) {
				this.contentData = []
				this.currentSort = index

				this.type = e
				this.tagName = ''
				this.tagCurrent = -1

				if (this.contentTagGroupData[index].child) {
					this.contentData = this.contentTagGroupData[index].child
					this.pageStatus = this.contentTagGroupData[index].pageStatus
					this.pageOver = this.contentTagGroupData[index].pageOver
					this.page = this.contentTagGroupData[index].page
					return
				} else {
					this.page = 1
					this.contentTagGroupData[index].page = 1
				}
				// let cnt = {
				// 	status: this.$constData.tagStatus[1].key,
				// 	module: this.$constData.module,
				// 	keyword: this.type,
				// 	count: 10,
				// 	offset: 0
				// }
				// this.getTags(cnt)

				//获取可滑动总宽度
				let width = 0
				let nowWidth = 0
				for (let i = 0; i <= e; i++) {
					let result = await this.getElSize('tab' + e)
					width += result.width
					if (i === e) {
						nowWidth = result.width
					}
				}
				if (width - nowWidth / 2 > windowWidth / 2) {
					//如果当前项越过中心点，将其放在屏幕中心
					this.scrollLeft = width - nowWidth / 2 - windowWidth / 2
				} else {
					this.scrollLeft = 0
				}
				//计算移动宽度结束

				let cnt1 = {
					module: this.$constData.module,
					// status: this.$constData.taskWallStatus[0].key,
					// tags: '', // String 标签  如无此条件  为null
					count: 10,
					offset: 0
				}
				if (e != 'a') {
					cnt1.type = e
				}
				this.getTask(cnt1)

			},

			//定位
			// getAddress() {
			// 	uni.getLocation({
			// 		type: 'wgs84',
			// 		success: (res) => {
			// 			console.log('当前位置的经度：' + res.longitude);
			// 			console.log('当前位置的纬度：' + res.latitude);
			// 			this.position = res.latitude + ',' + res.longitude
			// 			console.log(this.position)
			// 			this.getNearTask()
			// 		}
			// 	});
			// },

			//获取附近任务
			// getNearTask() {
			// 	let cnt = {
			// 		module: this.$constData.module, // String 隶属
			// 		point: this.position, // String 用户坐标
			// 		meter: 1000, // int 距离用户距离
			// 		count: 10, // Integer 
			// 		offset: 0, // Integer 
			// 		status: this.$constData.taskWallStatus[1].key, // Byte <选填> 状态  如无此条件  为null
			// 	}
			// 	this.$api.getTaskByGeo(cnt, (res) => {
			// 		if (res.data.rc == this.$util.RC.SUCCESS) {
			// 			this.contentData = this.$util.tryParseJson(res.data.c)
			// 			console.log(this.contentData)
			// 		}
			// 	})
			// },

			//标签改变内容
			getTaskByTag(e) {
				this.tagCurrent = e
				this.page = 1
				this.tagName = this.contentTagData[e].name
				let cnt = {
					module: this.$constData.module,
					status: this.$constData.taskWallStatus[1].key,
					// type: this.type, // Byte 类型  如无此条件  为null
					tags: this.tagName, // String 标签  如无此条件  为null
					count: this.count,
					offset: this.offset
				}
				let typeData = this.$constData.taskType
				for (let i = 0; i < typeData.length; i++) {
					if (this.type == typeData[i].val) {
						cnt.type = typeData[i].key
					}
				}
				this.getTask(cnt)
			},

			// 获取标签
			getTags(cnt) {
				this.$api.getTags(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentTagData = this.$util.tryParseJson(res.data.c)
						console.log(this.contentTagData)
					} else {
						uni.showToast({
							title: '服务器好像在睡觉哦',
							icon: 'none',
							duration: 1000
						})
					}
				})
			},

			// 获取导航栏数据
			getContentTagGroupTypes() {
				let list = [{
						type: 'a',
						name: '全部'
					},
					{
						type: this.$constData.taskType[0].key,
						name: this.$constData.taskType[0].val
					},
					{
						type: this.$constData.taskType[1].key,
						name: this.$constData.taskType[1].val
					},
					{
						type: this.$constData.taskType[2].key,
						name: this.$constData.taskType[2].val
					},
					{
						type: this.$constData.taskType[3].key,
						name: this.$constData.taskType[3].val
					}
				]

				this.contentTagGroupData = list

				let cnt1 = {
					module: this.$constData.module, // Long 模块编号
					// ask: ask, // Byte <选填> 诉求分类（0求表扬，1求陪玩，2求分享，3求制作）
					// type: type, // Byte <选填> 类型
					count: this.count, // int 
					offset: this.offset, // int 
				}
				this.getTask(cnt1)
			},

			getTask(cnt) {
				this.pageStatus = 'loading'
				this.$api.getHomeTasks(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let list = this.$util.tryParseJson(res.data.c).list
						for (let i = 0; i < list.length; i++) {
							if (list[i].user) {
								list[i].user.head = this.$util.tryParseJson(list[i].user.ext).userHead
							}
							list[i].detail = this.$util.tryParseJson(list[i].detail).text
						}
						this.tryDataList(list)
					} else {
						uni.showToast({
							title: '错误！',
							duration: 1000,
							icon: 'none'
						})
					}
				})
			},
			tryDataList(list) {
				let index = this.currentSort
				console.log(list.length,this.count)
				if (list.length < this.count) { //判断长度是否为等于设定this.count，是则可能还有剩余数据，否则无
					this.contentTagGroupData[index].pageOver = true //结束拉取
					this.contentTagGroupData[index].pageStatus = 'nomore'
					console.log('结束拉取数据')
					console.log(this.contentTagGroupData[index].pageStatus)
				} else {
					this.contentTagGroupData[index].pageOver = false
					this.contentTagGroupData[index].pageStatus = 'more'
				}
				this.pageStatus = this.contentTagGroupData[index].pageStatus //改变'uni-load-more'组件的状态
				this.pageOver = this.contentTagGroupData[index].pageOver
				
				let arr = this.contentData.concat(list)
				this.contentData = arr

				let obj = this.$util.tryParseJson(JSON.stringify(this.contentTagGroupData[index]))
				obj.child = arr
				this.$nextTick(function() {
					this.contentTagGroupData.splice(index, 1, obj)
				})
				console.log(this.pageStatus)
				uni.stopPullDownRefresh()
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.contentData = []
			this.page = 1
			this.contentTagGroupData[this.currentSort].page = 1
			let cnt = {
				module: this.$constData.module, // Long 模块编号
				// ask: ask, // Byte <选填> 诉求分类（0求表扬，1求陪玩，2求分享，3求制作）
				// type: type, // Byte <选填> 类型
				count: this.count, // int 
				offset: this.offset, // int 
			}
			if (this.currentSort > 0) {
				cnt.type = this.type
			}
			this.getTask(cnt)
		},
		//上滑加载
		onReachBottom: function() {
			if (this.pageOver == true) {
				return
			}
			this.pageStatus = 'loading'
			this.page += 1
			this.contentTagGroupData[this.currentSort].page += 1
			let cnt = {
				module: this.$constData.module, // Long 模块编号
				// ask: ask, // Byte <选填> 诉求分类（0求表扬，1求陪玩，2求分享，3求制作）
				// type: type, // Byte <选填> 类型
				count: this.count, // int 
				offset: (this.page - 1) * this.count, // int 
			}
			if (this.currentSort > 0) {
				cnt.type = this.type
			}
			this.getTask(cnt)
		},
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		position: fixed;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 150upx;
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
				transition: 0.3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 30%;
			}
		}
	}

	.tagBox {
		margin: 5px 2vw;
	}

	.tags {
		margin-right: 5px;
		font-size: $list-info;
	}

	.fab-box {
		position: fixed;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		z-index: 2;
		right: 30rpx;
		bottom: 60rpx;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		background: #007AFF;
		width: 110rpx;
		height: 110rpx;
		color: #ffffff;

		text {
			font-size: 40rpx;
		}
	}

	.testText {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.imgBox {
		width: 100vw;

		image {
			display: block;
			width: 80vw;
			padding: $box-margin-top;
			margin: 0 auto;
		}
	}
</style>
