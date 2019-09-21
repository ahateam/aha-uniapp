<template>
	<view>
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tagsList" :key="index" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="'tab'+index" @click="changeTag(index,item.status)">{{item.name}}</view>
		</scroll-view>
		<view style="padding-top: 90upx;"></view>
		<view v-if="contentData == 0" class="noThing">
			没有获取到数据呢
		</view>
		<view style="position: relative;" v-for="(item,index) in contentData" :key="index" @click="navToTask(item)">
			<task-list-box v-if="item.task.type == 0" :title="item.task.title" text="陪吃任务" :name="item.task.user.name" :head="item.task.user.head"></task-list-box>
			<task-list-box v-if="item.task.type == 1" :title="item.task.title" :text="item.task.detail.text" :name="item.task.user.name" :head="item.task.user.head"></task-list-box>
			<view class="taskStatus">
				{{item.task.status}}
			</view>
		</view>
	</view>
</template>

<script>
	import taskListBox from '@/components/task/taskListBox.vue'
	
	let windowWidth = 0
	
	export default {
		components: {
			taskListBox
		},
		data() {
			return {
				tagsList:[
					{
						name:'进行中',
						status:this.$constData.taskStatus[1].key
					},
					{
						name:'待审核',
						status:this.$constData.taskStatus[2].key
					},
					{
						name:'已完成',
						status:this.$constData.taskStatus[3].key
					},
					{
						name:'未通过',
						status:this.$constData.taskStatus[4].key
					},
					{
						name:'已关闭',
						status:this.$constData.taskStatus[5].key
					}
				],//标签列表
				tabCurrentIndex:0,
				
				contentData: [],//内容列表
				userId: uni.getStorageSync('userId'),
				count: 10,
				offset: 0,
			}
		},
		onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth;
			uni.showLoading({
				title:'获取数据中'
			})
			let cnt = {
				id: this.userId, // Long 用户id
				status:this.$constData.taskStatus[1].key,//int
				count: this.count, // int
				offset: this.offset, // int
			}
			this.getTask(cnt)
		},
		methods: {
			async changeTag(_index,status) {
				this.tabCurrentIndex = _index
				this.tagName = this.tagsList[_index].name
				this.page = this.tagsList[_index].page
			
				let width = 0;
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= _index; i++) {
					let result = await this.getElSize('tab' + _index)
					width += result.width
					if (i === _index) {
						nowWidth = result.width
					}
				}
				if (width - nowWidth / 2 > windowWidth / 2) {
					//如果当前项越过中心点，将其放在屏幕中心
					this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
				} else {
					this.scrollLeft = 0;
				}
			
				// if (undefined != this.tagsList[_index].child) {
				// 	this.pageStatus = this.tagsList[_index].pageStatus
				// 	this.contents = this.tagsList[_index].child
				// 	console.log(this.contents)
				// 	return
				// }
			
				let cnt = {
					id: this.userId, // Long 用户id
					status:status,//int
					count: this.count, // int 
					offset: this.offset, // int 
				}
				this.contents = []
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
				if (item.type == 1) {
					uni.navigateTo({
						url: `/pages/task/taskView/VideoTask?id=${item.id}`
					})
				}
				if (item.type == 0) {
					uni.navigateTo({
						url: `/pages/task/taskView/foodTask?id=${item.id}`
					})
				}
			},

			getTask(cnt) {
				this.$api.getUserTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let status = this.$constData.taskWallStatus
						let arr = this.$util.tryParseJson(res.data.c)
						for (let i = 0; i < arr.length; i++) {
							arr[i].task.detail = this.$util.tryParseJson(arr[i].task.detail)
							switch (arr[i].task.status) {
								case status[0].key:
									arr[i].task.status = '尚未审核'
									break;
								case status[1].key:
									arr[i].task.status = '等待领取'
									break;
								case status[2].key:
									arr[i].task.status = '已领取，等待确认'
									break;
								case status[3].key:
									arr[i].task.status = '未过审'
									break;
								case status[4].key:
									arr[i].task.status = '进行中'
									break;
								case status[5].key:
									arr[i].task.status = '作品已上传'
									break;
								case status[6].key:
									arr[i].task.status = '已完成'
									break;
								case status[7].key:
									arr[i].task.status = '作品不满意'
									break;
							}
						}
						this.contentData = arr
						uni.hideLoading()
						console.log(arr)
					}
				})
			}
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
	
	.noThing{
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
</style>
