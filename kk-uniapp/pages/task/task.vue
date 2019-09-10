<template>
	<view>
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item, index) in contentTagGroupData" :key="index" class="nav-item" :class="{ current: index === currentSort }"
			 @click="changeNav(index)" :id="'tab'+index">
				{{ item.type }}
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

		<view v-for="(item,index) in contentData" :key="index" @click="navToTask">
			<task-list-box :title="item.title" :text="item.text" :name="item.user.name" :money="item.money" head="233"></task-list-box>
		</view>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import taskListBox from '@/components/task/taskListBox.vue'

	let windowWidth = 0
	export default {
		components: {
			uniTag,
			taskListBox
		},

		data() {
			return {
				page: 1,
				count: 10,
				offset: 0,

				// 导航栏数据
				scrollLeft: 0,
				contentTagGroupData: [{
						type: '全部',
					},
					{
						type: '测试'
					}
				], //导航栏列表
				currentSort: 0, //导航栏选中下标
				type: '全部', //当前选中类型

				//标签
				contentTagData: {},
				tagName: '', //当前选中标签
				tagCurrent: -1, //当前选中标签下标

				//内容
				contentData: [{
						title: '任务标题1',
						text: 'asdasd'
					},
					{
						title: '任务标题2',
						text: 'asdasd'
					}
				], //内容列表

			}
		},
		onLoad() {
			windowWidth = uni.getSystemInfoSync().windowWidth

			// this.getContentTagGroupTypes()

			// let cnt = {
			// 	status: this.$constData.tagStatus[1].key,
			// 	module: this.$constData.module,
			// 	keyword: this.type,
			// 	count: 10,
			// 	offset: 0
			// }
			// this.getTags(cnt)

			let cnt1 = {
				module: this.$constData.module,
				status: this.$constData.taskWallStatus[1].key,
				// level: level, // Byte <选填> 任务等级
				// type: '', // Byte 类型  如无此条件  为null
				// tags: '', // String 标签  如无此条件  为null
				count: 10,
				offset: 0
			}
			this.getTask(cnt1)
		},
		methods: {
			//跳转至创建任务界面
			navToBtn() {
				uni.navigateTo({
					url: '/pages/task/createList/createList'
				})
			},
			
			//跳转至任务详情
				
			navToTask(){
				uni.navigateTo({
					url: '/pages/task/taskView/VideoTask'
				})
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
			async changeNav(e) {
				this.currentSort = e
				this.page = 1
				this.type = this.contentTagGroupData[e].type
				this.tagName = ''
				this.tagCurrent = -1
				let cnt = {
					status: this.$constData.tagStatus[1].key,
					module: this.$constData.module,
					keyword: this.type,
					count: 10,
					offset: 0
				}
				this.getTags(cnt)
				let width = 0
				let nowWidth = 0
				//获取可滑动总宽度

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

				let cnt1 = {
					module: this.$constData.module,
					status: this.$constData.taskWallStatus[1].key,
					// tags: '', // String 标签  如无此条件  为null
					count: 10,
					offset: 0
				}
				let typeData = this.$constData.taskType
				for (let i = 0; i < typeData.length; i++) {
					if (this.type == '本地') {
						this.getAddress()
						return
					} else if (this.type == '全部') {
						this.getTask(cnt1)
						return
					} else if (this.type == typeData[i].val) {
						cnt1.type = typeData[i].key
						this.getTask(cnt1)
					}
				}
			},

			//定位
			getAddress() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						this.position = res.latitude + ',' + res.longitude
						console.log(this.position)
						this.getNearTask()
					}
				});
			},

			//获取附近任务
			getNearTask() {
				this.more = 0
				let cnt = {
					module: this.$constData.module, // String 隶属
					point: this.position, // String 用户坐标
					meter: 1000, // int 距离用户距离
					count: 10, // Integer 
					offset: 0, // Integer 
					status: this.$constData.taskWallStatus[1].key, // Byte <选填> 状态  如无此条件  为null
				}
				this.$api.getTaskByGeo(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentData = this.$util.tryParseJson(res.data.c)
						console.log(this.contentData)
					}
				})
			},

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
					count: 10,
					offset: 0
				}
				let typeData = this.$constData.taskType
				for (let i = 0; i < typeData.length; i++) {
					if (this.type == typeData[i].val) {
						cnt.type = typeData[i].key
					}
				}
				this.$api.getTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentData = this.$util.tryParseJson(res.data.c)
					}
				})
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
				let cnt = {
					module: this.$constData.module, // Long 模板编号
					group: this.$constData.tagGroupType[2].val, // String 分组
					status: this.constData.tagStatus[1].key, // Byte 状态
					count: 50, // Integer 
					offset: 0, // Integer 
				}
				this.$api.getContentTag(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentTagGroupData = this.$util.tryParseJson(res.data.c)
						console.log('导航栏数据↓↓')
						console.log(this.contentTagGroupData)
					} else {
						uni.showToast({
							title: '服务器好像在睡觉哦',
							icon: 'none',
							duration: 1000
						})
					}
				})
			},

			getTask(cnt) {
				this.$api.getTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						this.contentData = this.$util.tryParseJson(res.data.c)
					} else {
						uni.showToast({
							title: '错误！',
							duration: 1000,
							icon: 'none'
						})
					}
				})
			},

		}
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
</style>
