<template>
	<view class="body">
		<navBar :back="false" bgColor="#ec706b" fontColor="#FFFFFF" title="夸夸其谈">
			<view slot="right" class="iconfont kk-jia addBtn" @click="navToAdd"></view>
		</navBar>
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tagsList" :key="index" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="'tab'+index" @click="changeTag(index)">{{item.name}}</view>
		</scroll-view>
		<view style="padding-top: 90upx;"></view>
		<view v-for="(item,index) in contents" :key="index" @click="navToInfo(item)">
			<view v-if="item.type == constData.contentType[1].key||item.type == constData.contentType[2].key">
				<view v-if="item.show == constData.contentShow[0].key">
					<trans-video :title="item.title" :upName="item.user.name" :imgSrc="item.imgList[0].src" :time="item.time" :type="item.type"></trans-video>
				</view>

				<view v-else-if="item.show == constData.contentShow[1].key">
					<right-video :title="item.title" :upName="item.user.name" :imgSrc="item.imgList[0].src" :time="item.time" :type="item.type"></right-video>
				</view>

				<view v-else-if="item.show == constData.contentShow[2].key&&item.type == constData.contentType[2].key">
					<three-img :title="item.title" :upName="item.user.name" :imgList="item.imgList" :time="item.time" :type="item.type"></three-img>
				</view>
			</view>
			<view v-else-if="item.type == constData.contentType[0].key">
				<only-text :title="item.title" :upName="item.user.name" :time="item.time"></only-text>
			</view>
		</view>
		<uni-load-more :status="pageStatus"></uni-load-more>
		<!-- <uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger"></uni-fab> -->
	</view>
</template>

<script>
	import transVideo from '@/components/video/transVideo.vue'
	import onlyText from '@/components/article/onlyText.vue'
	import rightVideo from '@/components/video/rightVideo.vue'
	import threeImg from '@/components/article/threeImg.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue'
	import navBar from '@/components/zhouWei-navBar/index.vue'

	let windowWidth = 0

	export default {
		components: {
			transVideo,
			onlyText,
			rightVideo,
			threeImg,
			uniLoadMore,
			uniFab,
			navBar
		},
		data() {
			return {
				versionStatus: 0, //版本状态

				constData: this.$constData, //全局变量引入，防止头条html中报错

				tagsList: [], //标签列表
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离,
				tagActiveId: '400548885618571', //默认标签id-全部

				userId: '',

				contents: [], //显示列表
				tagName: '', //当前选中标签名字

				//上拉加载 ---分页
				offset: 0,
				count: 10,
				page: 1,

				pageStatus: '', //加载状态 more（loading前）、loading（loading中）、noMore（没有更多了）

				//悬浮按钮组件数据
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: "#007AFF"
				},
				content: []
			}
		},
		onLoad() { // created() mounted()

			this.getVersionStatus()

			windowWidth = uni.getSystemInfoSync().windowWidth;
			if (!uni.getStorageSync('userId')) {
				uni.setStorageSync('userId', '1234567890')
			}

			this.userId = uni.getStorageSync('userId')

			// console.log(this.constData)

		},
		methods: {
			//获取版本
			getVersionStatus() {
				let cnt = {}
				this.$api.getVersionStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let status = this.$util.tryParseJson(res.data.c)
						this.versionStatus = status
						uni.setStorageSync('versionStatus', status)
						/* 获取标签列表*/
						let cnt = {
							moduleId: this.constData.module, // String 隶属
							status: this.constData.tagStatus[1].key, // Byte 标签状态
							group: this.constData.tagGroupType[0].val, // String 标签
							count: 500, // Integer 
							offset: 0, // Integer 
						}
						this.getTagsList(cnt)
						// this.returnTabBar()
						/* 根据默认标签获取内容列表*/
					}
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

			navToAdd() {
				let userId = uni.getStorageSync('userId')
				
				if (userId == '' || userId == '1234567890') {
					uni.switchTab({
						url: '/pages/user/user'
					})
					uni.showToast({
						title: '请登录',
						icon: 'none',
						duration: 1000
					})
					return
				}
				uni.navigateTo({
					url: '/pages/index/addArticle/addArticle'
				})
			},

			//按钮点击跳转
			trigger(e) {
				if (this.userId == '' || this.userId == '1234567890') {
					uni.switchTab({
						url: '/pages/user/user'
					})
					uni.showToast({
						title: '请登录',
						icon: 'none',
						duration: 1000
					})
					return
				}
				console.log(e)
				if (e.item.url == '/pages/index/addContent/addContent?type=1') {
					uni.navigateTo({
						url: '/pages/index/addArticle/addArticle'
					})
				} else if (e.item.url == '/pages/index/addContent/addContent?type=0') {
					uni.navigateTo({
						url: '/pages/index/addVideo/addVideo'
					})
				}
			},

			//获取发布按钮数据
			returnTabBar() {
				let cnt = {}
				this.$api.returnTabBar(cnt, (res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.content = this.$util.tryParseJson(res.data.c)
					} else {
						this.content = []
					}
				}))
			},

			/* 获取标签列表*/
			getTagsList(cnt) {
				this.$api.getContentTag(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let tagsList = this.$util.tryParseJson(res.data.c)
						for (let i = 0; i < tagsList.length; i++) {
							tagsList[i].pageOver = false
							tagsList[i].page = 1
						}
						this.tagsList = tagsList
						console.log('标签列表:')
						console.log(this.tagsList)
						let cnt1 = {
							module: this.constData.module, // String 所属模块
							// tags: this.tagActiveId,
							status: parseInt(this.constData.contentStatus[4].key),
							count: this.count,
							offset: this.offset,
							power: this.$constData.contentPaid[0].key
						}
						this.getContentsByTag(cnt1)
					} else {
						this.tagsList = []
					}
				})
			},

			/*根据标签获取内容列表*/
			getContentsByTag(cnt) {
				let index = this.tabCurrentIndex
				if (this.tagsList[index].pageOver === true) {
					return
				}
				this.pageStatus = 'loading'
				this.$api.getContents(cnt, (res) => {
					let list = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						list = this.$util.tryParseJson(res.data.c)
						for (let i = 0; i < list.length; i++) {
							let show = this.$util.tryParseJson(list[i].data).show
							list[i].show = show
							if (list[i].type == this.$constData.contentType[2].key) {
								let imgList = this.$util.tryParseJson(list[i].data).imgList
								list[i].imgList = imgList
							}
							if (list[i].type == this.$constData.contentType[1].key) {
								let imgList = [{
									src: this.$util.tryParseJson(list[i].data).imgSrc
								}]
								list[i].imgList = imgList
								// if(this.versionStatus == this.$constData.showStatus[0].key){
								// 	list[i].type = 999
								// }
							}

							let time = new Date(list[i].createTime)
							let y = time.getFullYear()
							let m = 1 * time.getMonth() + 1
							let d = time.getDate()
							list[i].time = `${y}-${m}-${d}`
						}
						this.tryDataList(list)
						uni.stopPullDownRefresh()
					} else {
						this.tagsList[index].pageOver = true //结束拉取
						this.tagsList[index].pageStatus = 'nomore'
						this.pageStatus = this.tagsList[index].pageStatus
						let obj = this.$util.tryParseJson(JSON.stringify(this.tagsList[index]))
						obj.child = []
						this.$nextTick(function() {
							this.tagsList.splice(index, 1, obj)
						})
					}
				})
			},

			/* 添加新数据进数组并显示 */
			tryDataList(list) {
				let index = this.tabCurrentIndex
				if (list.length < this.count) { //判断长度是否为等于设定this.count，是则可能还有剩余数据，否则无
					this.tagsList[index].pageOver = true //结束拉取
					this.tagsList[index].pageStatus = 'nomore'
				} else {
					this.tagsList[index].pageOver = false
					this.tagsList[index].pageStatus = 'more'
				}

				this.pageStatus = this.tagsList[index].pageStatus //改变'uni-load-more'组件的状态

				let arr = this.contents.concat(list)
				this.contents = arr
				console.log(this.contents)
				let obj = this.$util.tryParseJson(JSON.stringify(this.tagsList[index]))
				obj.child = arr
				this.$nextTick(function() {
					this.tagsList.splice(index, 1, obj)
				})
			},

			/* 触发改变选中标签 */
			async changeTag(_index) {
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

				if (this.tagsList[_index].child) {
					this.pageStatus = this.tagsList[_index].pageStatus
					this.contents = this.tagsList[_index].child
					console.log(this.contents)
					return
				}

				this.contents = []
				if (this.tagName == '关注') {
					let cnt1 = {
						moduleId: this.$constData.module, // String 模块编号
						userId: uni.getStorageSync('userId'), // Long 用户id
						count: this.count, // int 
						offset: this.offset, // int 
					}
					this.getAUserFavorite(cnt1)
					return
				}

				let cnt = {
					module: this.constData.module, // String 所属模块
					status: this.constData.contentStatus[4].key, // Byte <选填> 状态
					power: this.constData.contentPaid[0].key, // Byte <选填> 是否付费
					// type: type, // Byte <选填> 类型
					tags: `{"homeCotent":"${this.tagName}"}`, // String <选填> 标签
					count: this.count, // Integer
					offset: this.offset, // Integer
				}
				this.getContentsByTag(cnt)
			},

			//获取关注者内容
			getAUserFavorite(cnt) {
				let index = this.tabCurrentIndex
				if (this.tagsList[index].pageOver === true) {
					return
				}
				this.pageStatus = 'loading'
				this.$api.getAUserFavorite(cnt, (res) => {
					let list = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						list = this.$util.tryParseJson(res.data.c)
						for (let i = 0; i < list.length; i++) {
							let show = this.$util.tryParseJson(list[i].data).show
							list[i].show = show
							if (list[i].type == this.$constData.contentType[2].key) {
								let imgList = this.$util.tryParseJson(list[i].data).imgList
								list[i].imgList = imgList
							}
							if (list[i].type == this.$constData.contentType[1].key) {
								let imgList = [{
									src: this.$util.tryParseJson(list[i].data).imgSrc
								}]
								list[i].imgList = imgList
								// if(this.versionStatus == this.$constData.showStatus[0].key){
								// 	list[i].type = 999
								// }
							}

							let time = new Date(list[i].createTime)
							let y = time.getFullYear()
							let m = 1 * time.getMonth() + 1
							let d = time.getDate()
							list[i].time = `${y}-${m}-${d}`
						}
						this.tryDataList(list)
						uni.stopPullDownRefresh()
					} else {
						this.tagsList[index].pageOver = true //结束拉取
						this.tagsList[index].pageStatus = 'nomore'
						this.pageStatus = this.tagsList[index].pageStatus
						let obj = this.$util.tryParseJson(JSON.stringify(this.tagsList[index]))
						obj.child = []
						this.$nextTick(function() {
							this.tagsList.splice(index, 1, obj)
						})
					}
				})
			},

			/* 跳转至详情 */
			navToInfo(info) {
				if (info.type == this.constData.contentType[2].key || info.type == this.constData.contentType[0].key) {
					if (info.upChannelId) {
						uni.navigateTo({
							url: `/pages/vip/column/details/details?id=${info.id}`
						})
					} else {
						uni.navigateTo({
							url: `/pages/index/articleView/articleView?id=${info.id}`
						})
					}

				} else if (info.type == this.constData.contentType[1].key) {
					// uni.navigateTo({
					// 	url: `/pages/index/videoView/videoView?id=${info.id}&id1=${info._id}`
					// })
					if (info.upChannelId) {
						uni.navigateTo({
							url: `/pages/vip/column/detailsVideo/detailsVideo?id=${info.id}`
						})
					} else {
						uni.navigateTo({
							url: `/pages/index/videoView/videoView?id=${info.id}`
						})
					}
				}
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.page = 1
			this.tagsList[this.tabCurrentIndex].page = 1
			this.contents = []
			this.tagsList[this.tabCurrentIndex].pageOver = false
			let cnt = {
				module: this.constData.module, // String 所属模块
				status: this.constData.contentStatus[4].key, // Byte <选填> 状态
				power: this.constData.contentPaid[0].key, // Byte <选填> 是否付费
				// type: type, // Byte <选填> 类型
				count: this.count, // Integer
				offset: this.offset, // Integer
			}
			if (this.tagName == '关注') {
				let cnt1 = {
					moduleId: this.$constData.module, // String 模块编号
					userId: uni.getStorageSync('userId'), // Long 用户id
					count: this.count, // int 
					offset: this.offset, // int 
				}
				this.getAUserFavorite(cnt1)
				return
			} else if (this.tagName != '' && this.tagName != '全部') {
				cnt.tags = `{"homeCotent":"${this.tagName}"}`
			}
			this.getContentsByTag(cnt)
		},
		//上滑加载更多
		onReachBottom() {
			this.page += 1
			this.tagsList[this.tabCurrentIndex].page = this.page
			let cnt = {
				module: this.constData.module, // String 所属模块
				status: this.constData.contentStatus[4].key, // Byte <选填> 状态
				power: this.constData.contentPaid[0].key, // Byte <选填> 是否付费
				// type: type, // Byte <选填> 类型
				count: this.count, // Integer
				offset: (this.page - 1) * this.count, // Integer
			}
			if (this.tagName == '关注') {
				let cnt1 = {
					moduleId: this.$constData.module, // String 模块编号
					userId: uni.getStorageSync('userId'), // Long 用户id
					count: this.count, // int 
					offset: (this.page - 1) * this.count, // Integer
				}
				this.getAUserFavorite(cnt1)
				return
			} else if (this.tagName != '' && this.tagName != '全部') {
				cnt.tags = `{"homeCotent":"${this.tagName}"}`
			}
			this.getContentsByTag(cnt)
		},

	}
</script>

<style lang="scss" scoped>
	page,
	.body {
		background-color: #f8f8f8;
		min-height: 100vh;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: fixed;
		// top: 64px;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			position: relative;
			display: inline-block;
			width: 150upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;

			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
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

	.item-box {
		width: 750rpx;
		height: 200rpx;
		background: #fff;
		margin-top: 10rpx;
	}

	.addBtn {
		// font-size: ;
		color: #FFFFFF;
		padding: 0 20upx;
	}
</style>
