<template>
	<view class="content">
		<view class="video-wrapper">
			<video 
				class="video"
				:src="contentObj.url" 
				controls
				objectFit="fill"
				:autoplay="false"
			></video>
		</view>
		<scroll-view class="scroll" scroll-y>
			<view class="scroll-content">
				<view class="introduce-section">
					<text class="title">{{detailData.title}}</text>
					<view class="introduce">
						<text class="introduce">{{contentObj.text}}</text>
						<!-- <text class="yticon icon-xia show-icon"></text> -->
					</view>
					<view class="actions">
						<view class="action-item">
							<i class="yticon iconfont kk-dianzan"></i>
							<!-- <text class="yticon icon-dianzan-ash"></text> -->
							<text>75</text>
						</view>
						<view class="action-item">
							<i class="yticon iconfont kk-zan"></i>
							<text>6</text>
						</view>
						<view class="action-item">
							<button type="primary" open-type="share">
								<i class="yticon iconfont kk-share"></i>
								<text>分享</text>
							</button>
						</view>
						<view class="action-item">
							<i class="yticon iconfont kk-shoucang1"></i>
							<text>收藏</text>
						</view>
					</view>
				</view>
				
				<!-- 所属课程 -->
				<view class="courseText">所属课程</view>
				<view class="courseBox">
					<view class="columnImgBox">
						<image class="columnImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567139311188&di=b309ce828b72d42a2c9318f26f7115c7&imgtype=0&src=http%3A%2F%2Fwww.pclady.com.cn%2Fstyle%2Fmovie%2F0509%2Fpic%2Fbb20050920_shjz_06_thumb.jpg"
						 mode="scaleToFill"></image>
					</view>
					<view class="courseRight">
						<view class="courseText blodFont noPadding">
							课程名
						</view>
						<view class="upName">
							<text>作者:</text><text>作者名</text>
						</view>
						<view class="payCourse">
							<text class="courseMoney">45元</text>
							<text class="courseInfo">233人购买</text>
							<button type="primary">购买课程</button>
						</view>
					</view>
				</view>
				
				<!-- 其他内容列表 -->
				<view>
					<view class="courseText">课程内容</view>
					<view v-for="(item,index) in courseList" :key="index" v-if="index <moreCourse">
						<view class="lists" @click="navigator(item)">
							<view class="imgBox">
								<image v-if="item.type == constData.contentType[2].key" :src="JSON.parse(item.data).imgList[0].src" mode="aspectFill"></image>
								<image v-else-if="item.type == constData.contentType[1].key" :src="JSON.parse(item.data).imgSrc" mode="aspectFill"></image>
							</view>
							<view class="rightBox">
								<view class="title">{{ item.title }}</view>
								<text class="msg">{{ item.time }}</text>
							</view>
							<view class="clearBoth"></view>
						</view>
					</view>
					<view class="moreCourseBtn">
						<button type="primary" @click="moreCourseBtn()" v-if="moreCourse == 2&&courseList.length>2">查看更多</button>
					</view>
				</view>
				
				<view class="container">
					<!-- 评论 -->
					<view class="s-header">
						<text class="tit">网友评论</text>
					</view>
					<view class="evalution">
						<view class="noEva" v-if="evaList.length == 0">
							还没有人评论哦,快来抢个首发吧~
						</view>
						<view  v-for="(item, index) in evaList" :key="index"
							class="eva-item"
						>
							<image :src="item.src" mode="aspectFill"></image>
							<view class="eva-right">
								<text>{{item.nickname}}</text>
								<text>{{item.time}}</text>
								<view class="zan-box">
									<text>{{item.zan}}</text>
									<text class="yticon iconfont kk-shoucang1"></text>
								</view>
								<text class="content">{{item.content}}</text>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</scroll-view>
		
		<view class="bottom">
			<view class="input-box">
				<text class="yticon icon-huifu"></text>
				<input 
					class="input"
					type="text" 
					placeholder="点评一下把.." 
					placeholder-style="color:#adb1b9;"
				/>
			</view>
			<text class="confirm-btn">提交</text>
		</view>
	</view>
</template>

<script>

	export default {
		components: {
			// mixLoading
		},
		data() {
			return {
				detailData:{},
				contentObj:{},
				upInfo:{},
				loading: false,
				contentId: '',
				id1:'',
				newsList: [],
				evaList: [],
			}
		},
		onLoad(res){
			this.contentId = res.id
			this.id1 = res.id1
			this.getContentById()
		},
		methods: {
			/* 获取id对应内容 */
			getContentById() {
				let cnt = {
					userId: uni.getStorageSync('userId'), // Long 用户编号
					id: this.id1, // String 片区编号
					contentId: this.contentId, // Long 内容编号
				};
				this.$api.getContentById(cnt,(res=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						this.detailData = JSON.parse(res.data.c)
						let time = new Date(this.detailData.createTime)
						let newTime =time.toLocaleString()
						this.detailData.time = newTime
						this.contentObj = JSON.parse(this.detailData.data)
						console.log(this.contentObj)
						console.log(this.detailData)
						// this.getUserById(this.detailData.upUserId)
						this.getContentByChannelId()
					}
				}))
			},
			
			/* 获取id对应用户 */
			// getUserById(id){
			// 	let cnt={
			// 		userId:id,//long 用户编号
			// 	}
			// 	this.$api.getUserById(cnt,(res=>{
			// 		if(res.data.rc == this.$util.RC.SUCCESS){
			// 			console.log(JSON.parse(res.data.c))
			// 			this.upInfo = JSON.parse(res.data.c)
			// 		}
			// 	}))
			// }
			
			// 从专栏id获取课程列表
			getContentByChannelId() {
				let cnt = {
					module: this.$constData.module, // String 隶属
					channelId: this.channelId, // Long 专栏id
					status: 4, // Byte 专栏状态
					count: 10, // Integer 
					offset: 0, // Integer 
				}
				this.$api.getContentByChannelId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = JSON.parse(res.data.c).list
			
						for (let i = 0; i < arr.length; i++) {
							let date = new Date(arr[i].createTime)
							let y = date.getFullYear()
							let m = date.getMonth() + 1
							let d = date.getDate()
							arr[i].time = `${y}年${m}月${d}日`
						}
						this.courseList = arr
						console.log(this.courseList)
					} else {
						this.courseList = []
						console.log('error')
					}
				})
			},
			
			//跳转其他课程详情
			navigator(list) {
				if (list.paid == this.$constData.contentPaid[1].key) {
					uni.showToast({
						title: '购买后可观看',
						duration: 2000,
						icon: 'none'
					});
				}
				let url = ''
				if (list.type == this.$constData.contentType[0].key || list.type == this.$constData.contentType[2].key) {
					url = 'details'
				} else if (list.type == this.$constData.contentType[1].key) {
					url = 'detailsVideo'
				}
				uni.redirectTo({
					url: `/pages/vip/column/${url}/${url}?id=${list.id}&id1=${list._id}`
				})
			},
			
			moreCourseBtn() {
				this.moreCourse = 5;
			},
		},
		onShareAppMessage(res) {
			var pages = getCurrentPages() //获取加载的页面
			var currentPage = pages[pages.length - 1] //获取当前页面的对象
			console.log(currentPage)
			var url = currentPage.route //当前页面url
			if(url == undefined){
				url = currentPage.__route__
			}
			var options = currentPage.options //如果要获取url中所带的参数可以查看options 
			var id = options.id
			var id1 = options.id1
			var src = `${url}?id=${id}&id1=${id1}`
			console.log(src)
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: 'kkqt',
				path: src
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.content{
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
	}
	.video-wrapper{
		height: 422upx;
		
		.video{
			width: 100%;
			height: 100%;
		}
	}
	.scroll{
		flex: 1;
		position: relative;
		background-color: #f8f8f8;
		height: 0;
	}
	.scroll-content{
		display: flex;
		flex-direction: column;
	}
	/* 简介 */
	.introduce-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		line-height: 1.5;
		
		.title{
			font-size: 36upx;
			color: #303133;
			margin-bottom: 16upx;
		}
		.introduce{
			display: flex;
			font-size: 26upx;
			color: #909399;
			
			.show-icon{
				font-size: 34upx;
				padding-left: 10upx;
			}
		}
	}
	/* 点赞等操作 */
	/* 点赞等操作 */
	.actions {
		display: flex;
		justify-content: space-around;
		align-items: center;
		line-height: 1.3;
		padding: 10upx 40upx 20upx;
	
		.action-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24upx;
			color: #999;
	
			button {
				font-size: 24upx;
				color: #999;
				background-color: #fff;
				&:after {
					border: none;
					
				}
			}
		}
	
		.yticon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 52upx;
	
			&.reverse {
				position: relative;
				top: 6upx;
				transform: scaleY(-1);
			}
	
			&.active {
				color: #ec706b;
			}
		}
	
	}
	.mix-loading{
		transform: translateY(140upx);
	}
	.s-header{
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;
		
		&:before{
			content: '';
			width: 0;
			height: 40upx;
			margin-right: 24upx;
			border-left: 6upx solid #ec706b;
		}
	}
	/* 评论 */
	.noEva{
		font-size: 30upx;
		color: #303133;
		padding: 20rpx 30rpx;
	}
	
	.evalution{
		display:flex;
		flex-direction:column;
		background: #fff;
		padding: 20upx 0;
	}
	
	.eva-item{
		display:flex;
		padding: 20upx 30upx;
		position: relative;
		image{
			width: 60upx;
			height: 60upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 24upx;
		}
		&:after{
			content: '';
			position: absolute;
			left: 30upx;
			bottom: 0;
			right: 0;
			height: 0;
			border-bottom: 1px solid #eee;
			transform: translateY(50%);
		}
		&:last-child:after{
			border: 0;
		}
	}
	.eva-right{
		display:flex;
		flex-direction:column;
		flex: 1;
		font-size: 26upx;
		color: #909399;
		position:relative;
		.zan-box{
			display:flex;
			align-items:base-line;
			position:absolute;
			top: 10upx;
			right: 10upx;
			.yticon{
				margin-left: 8upx; 
			}
		}
		.content{
			font-size: 28upx;
			color: #333;
			padding-top:20upx;
		}
	}
	
	/* 底部 */
	.bottom{
		flex-shrink: 0;
		display: flex;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;
		box-shadow: 0 -1px 3px rgba(0,0,0,.04); 
		position: relative;
		z-index: 1;
		
		.input-box{
			display: flex;
			align-items: center;
			flex: 1;
			height: 60upx;
			background: #f2f3f3;
			border-radius: 100px;
			padding-left: 30upx;
			
			.icon-huifu{
				font-size: 28upx;
				color: #909399;
			}
			.input{
				padding: 0 20upx;
				font-size: 28upx;
				color: #303133;
			}
		}
		.confirm-btn{
			font-size: 30upx;
			padding-left: 20upx;
			color: #0d9fff;
		}
	}
	
	.lists {
		position: relative;
		padding: 2vw;
		height: 24vw;
		font-size: 18px;
		padding: $box-margin-top $box-margin-left;
		line-height: 18px;
		background-color: #fff;
	
		.title {
			margin-bottom: 10upx;
			color: $list-title-color;
			font-size: $list-title;
			line-height: $list-title-line;
			font-weight: bold;
			box-sizing: border-box;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2; //需要显示时文本行数
			overflow: hidden;
		}
	
	
		.msg {
			font-size: 14px;
			color: $list-info-color;
		}
	}
	
	.imgBox {
		position: absolute;
		top: 50%;
		margin-top: -10vw;
		width: 20vw;
		height: 20vw;
		border-radius: 5px;
		overflow: hidden;
	
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.rightBox {
		position: absolute;
		margin-left: 24vw;
		margin-right: 20upx;
		top: 50%;
		margin-top: -50upx;
	}
	
	.moreCourseBtn {
		button {
			width: auto;
			font-size: $list-title;
			background: #f0f0f0;
		}
	}
	
	.courseText {
		background: #fff;
		padding: 0 $box-margin-left;
		padding-top: $box-margin-top;
		font-size: $list-title;
		margin-top: 5upx;
	}
	
	.columnImgBox{
		position: absolute;
		top: 50%;
		margin-top: -7vw;
	}
	
	.columnImg {
		
		width: 25vw;
		height: 14vw;
	}
	
	.upName {
		font-size: $list-info;
		color: $list-info-color;
		padding: 15upx 0;
	}
	
	.courseBox {
		position: relative;
		background-color: #fff;
		padding: $box-margin-top $box-margin-left;
	}
	
	.courseRight {
		margin-left: 30vw;
	}
	
	.payCourse {
		position: relative;
		font-size: $list-title;
	
		button {
			position: absolute;
			font-size:$list-info;
			right: 0;
			bottom: -7.5upx;
			display: inline-block;
			line-height: $list-title-line;
			padding: 8upx 15upx;
			background-color: #ec706b;
		}
		.button-hover{
			background-color:rgba(236,112,107,0.5);
			color:rgba(255,255,255,0.5)
		}
	}
	
	.courseMoney {
		font-weight: bold;
		color: #ec706b;
	}
	
	.courseInfo {
		font-size: $list-info;
		color: $list-info-color;
		margin-left: 10upx;
	}
	
	.noPadding {
		padding: 0;
	}
	
	.blodFont{
		font-weight: bold;
	}
</style>
