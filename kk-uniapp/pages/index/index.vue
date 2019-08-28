<template>
	<view class="body">
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tagsList" :key="item.id" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="item.id" @click="changeTag(index)">{{item.name}}</view>
		</scroll-view>
		<view v-for="(item,index) in contents" :key="index" @click="navToInfo(item)">
			<view v-if="item.type == constData.contentType[1].key||item.type == constData.contentType[2].key">
				<view v-if="item.show == constData.contentShow[0].key">
					<trans-video :title="item.title" :upName="item.user.name" :imgSrc="item.imgList[0].src" time="1小时前" :type="item.type"></trans-video>
				</view>

				<view v-else-if="item.show == constData.contentShow[1].key">
					<right-video :title="item.title" :upName="item.user.name" :imgSrc="item.imgList[0].src" time="1小时前" :type="item.type"></right-video>
				</view>

				<view v-else-if="item.show == constData.contentShow[2].key&&item.type == constData.contentType[2].key">
					<three-img :title="item.title" :upName="item.user.name" :imgList="item.imgList" time="1小时前" :type="item.type"></three-img>
				</view>
			</view>
			<view v-else-if="item.type == constData.contentType[0].key">
				<only-text :title="item.title" :upName="item.user.name" time="1小时前"></only-text>
			</view>
		</view>
		<uni-load-more :status="pageStatus"></uni-load-more>
	</view>
</template>

<script>
	import transVideo from '@/components/video/transVideo.vue'
	import onlyText from '@/components/article/onlyText.vue'
	import rightVideo from '@/components/video/rightVideo.vue'
	import threeImg from '@/components/article/threeImg.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	import constData from '@/commen/constData.js'

	export default {
		components: {
			transVideo,
			onlyText,
			rightVideo,
			threeImg,
			uniLoadMore,
		},
		data() {
			return {
				constData: {}, //全局变量引入

				tagsList: [], //标签列表
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离,
				tagActiveId: '400548885618571', //默认标签id-全部

				userId: '',

				contents: [], //显示列表
				tagName:'',

				//上拉加载 ---分页
				offset: 0,
				count: 10,
				page: 1,

				pageStatus: '', //加载状态 more（loading前）、loading（loading中）、noMore（没有更多了）
			}
		},
		onLoad() { // created() mounted()
			this.constData = constData

			if (!uni.getStorageSync('userId')) {
				uni.setStorageSync('userId', '1234567890')
			}

			this.userId = uni.getStorageSync('userId')

			// console.log(this.$constData)
			/* 获取标签列表*/
			let cnt = {
				module: this.$constData.module, // String 隶属
				status: this.$constData.tagStatus[1].key, // Byte 标签状态
				keyword: '首页', // String 标签
				count: 500, // Integer 
				offset: 0, // Integer 
			}
			this.getTagsList(cnt)

		},
		methods: {
			/* 获取标签列表*/
			getTagsList(cnt) {
				this.$api.getTags(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let tagsList = this.$util.tryParseJson(res.data.c)
						for(let i =0;i<tagsList.length;i++){
							tagsList[i].pageOver = false
							tagsList[i].page = 1
						}
						this.tagsList = tagsList
						/* 根据默认标签获取内容列表*/
						let cnt1 = {
							userId: this.userId, // Long 用户编号
							module: this.$constData.module, // String 所属模块
							// tags: this.tagActiveId,
							status: this.$constData.contentStatus[4].key,
							count: this.count,
							offset: this.offset
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
							let show = JSON.parse(list[i].data).show
							list[i].show = show
							if (list[i].type == 5) {
								let imgList = JSON.parse(list[i].data).imgList
								list[i].imgList = imgList
							}
							if (list[i].type == 3) {
								let imgList = [{
									src: JSON.parse(list[i].data).imgSrc
								}]
								list[i].imgList = imgList
							}
						}
						this.tryDataList(list)
						uni.stopPullDownRefresh()
					} else {
						list = []
					}

				})

			},
			
			/* 添加新数据进数组并显示 */
			tryDataList(list){
				let index = this.tabCurrentIndex
				if (list.length < this.count) {//判断长度是否为等于设定this.count，是则可能还有剩余数据，否则无
					this.tagsList[index].pageOver = true//结束拉取
					this.tagsList[index].pageStatus = 'nomore'
				} else {
					this.tagsList[index].pageOver = false
					this.tagsList[index].pageStatus = 'more'
				}
				
				this.pageStatus = this.tagsList[index].pageStatus//改变'uni-load-more'组件的状态
				
				let arr = this.contents.concat(list)
				this.contents = arr
				console.log(this.contents)
				let obj = JSON.parse(JSON.stringify(this.tagsList[index]))
				obj.child = arr
				this.$nextTick(function() {
					this.tagsList.splice(index, 1, obj)
				})
			},

			/* 触发改变选中标签*/
			changeTag(_index) {
				this.tabCurrentIndex = _index
				this.tagName = this.tagsList[_index].name
				this.page = this.tagsList[_index].page
				
				if(undefined != this.tagsList[_index].child){
					this.pageStatus = this.tagsList[_index].pageStatus
					this.contents = this.tagsList[_index].child
					console.log(this.contents)
					return
				}
				
				let cnt = {
					userId: this.userId, // Long 用户编号
					module: this.$constData.module, // String 所属模块
					status: this.$constData.contentStatus[4].key, // Byte <选填> 状态
					// paid: this.$constData.contentPaid[0].key, // Byte <选填> 是否付费
					// type: type, // Byte <选填> 类型
					tags: this.tagName, // String <选填> 标签
					count: this.count, // Integer
					offset: this.offset, // Integer
				}
				this.contents = []
				this.getContentsByTag(cnt)
			},
			
			/* 跳转至详情 */
			navToInfo(info){
				console.log(info)
				if(info.type == this.$constData.contentType[2].key||info.type == this.$constData.contentType[0].key){
					uni.navigateTo({
						url:`/pages/index/articleView/articleView?id=${info.id}&id1=${info._id}`
					})
				}else if(info.type == this.$constData.contentType[1].key){
					uni.navigateTo({
						url:`/pages/index/videoView/videoView?id=${info.id}&id1=${info._id}`
					})
				}
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.page = 1
			this.tagsList.page = 1
			this.contents = []
			this.tagsList[this.tabCurrentIndex].pageOver = false
			let cnt ={
				userId: this.userId, // Long 用户编号
				module: this.$constData.module, // String 所属模块
				status: this.$constData.contentStatus[4].key, // Byte <选填> 状态
				// paid: this.$constData.contentPaid[0].key, // Byte <选填> 是否付费
				// type: type, // Byte <选填> 类型
				count: this.count, // Integer
				offset: this.offset, // Integer
			}
			if(this.tagName!='' && this.tagName!= '全部' ){
				cnt.tags = this.tagName
			}
			this.getContentsByTag(cnt)
		},
		//上滑加载更多
		onReachBottom: function() {
			this.page += 1
			this.tagsList[this.tabCurrentIndex].page = this.page
			let cnt ={
				userId: this.userId, // Long 用户编号
				module: this.$constData.module, // String 所属模块
				status: this.$constData.contentStatus[4].key, // Byte <选填> 状态
				// paid: this.$constData.contentPaid[0].key, // Byte <选填> 是否付费
				// type: type, // Byte <选填> 类型
				count: this.count, // Integer
				offset:(this.page-1)*this.count, // Integer
			}
			if(this.tagName!=''&&this.tagName!='全部'){
				cnt.tags = this.tagName
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
		position: relative;
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

	.item-box {
		width: 750rpx;
		height: 200rpx;
		background: #fff;
		margin-top: 10rpx;
	}
</style>
