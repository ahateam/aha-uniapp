<template>
	<view class="content">
		<scroll-view class="scroll" scroll-y>
			<view class="scroll-content">
				<view class="introduce-section">
					<text class="title">{{detailData.title}}</text>
					<view class="introduce">

						<text>{{upInfo.name}}</text>
						<!-- <text>105阅读</text> -->
						<text>{{detailData.time}}</text>
					</view>
					<view class="articleInfo">
						<view v-for="(item,index) in flow" :key="index">
							<view v-if="item.type == 'textarea'">
								<rich-text :nodes="item.value"></rich-text>
							</view>
							<view class="contentImg" v-else-if="item.type == 'img'">
								<image :src="item.value" mode="widthFix"></image>
							</view>
						</view>
					</view>

					<!-- 点赞分享 -->
					<view class="actions">
						<view class="action-item">
							<button type="primary" @click="upvote(contentId)">
								<i class="yticon iconfont kk-dianzan"></i>
								<text>{{contentUpvote}}赞</text>
							</button>
						</view>
						<view class="action-item">
							<button type="primary" open-type="share">
								<i class="yticon iconfont kk-share"></i>
								<text>分享</text>
							</button>
						</view>

						<view class="action-item">
							<button type="primary" @click="createHb">
								<i class="yticon iconfont kk-friendzone centerBox"></i>
								<text>朋友圈</text>
							</button>
						</view>

						<view class="action-item">
							<button type="primary">
								<i class="yticon iconfont kk-shoucang1"></i>
								<text>收藏</text>
							</button>
						</view>
					</view>
					<!-- 点赞分享end -->
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
							{{courseTitle}}
						</view>
						<view class="upName">
							<text>作者:</text><text>作者名</text>
						</view>
						<view class="payCourse">
							<text class="courseMoney">45元</text>
							<text class="courseInfo">233人购买</text>
							<button type="primary" @click="navToPay">购买课程</button>
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
						<view class="noEva" v-if="comment.length == 0">
							还没有人评论哦,快来抢个首发吧~
						</view>
						<view v-for="(item, index) in comment" :key="index" class="eva-item">
							<image :src="item.userHead" mode="aspectFill"></image>
							<view class="eva-right">
								<text>{{item.user.name}}</text>
								<text>{{item.time}}</text>
								<view class="zan-box" @click="upvote(0,item.id,1,index)">
									<text>{{item.commentTotalCount}}</text>
									<text class="yticon iconfont kk-shoucang1"></text>
								</view>
								<text class="content">{{item.text}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="poster" v-if="posterShow" @click="hiddenPoster">
			<view class="posterImg" @click.stop>
				<image ref="posterImg" :src="posterImg " mode="widthFix" @click="showImg"></image>
			</view>
			<view class="posterBtn">
				<view class="stopBtn" @click.stop>
					<button type="primary" @click="saveImg">保存图片至本地</button>
				</view>
			</view>
		</view>

		<tki-qrcode class="hiddenBox" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background"
		 :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
		 :usingComponents="true" @result="qrR" />
		<canvas class="hiddenBox canvasBox" canvas-id="firstCanvas"></canvas>
		<canvas class="hiddenBox upHeadBox" canvas-id="upHeadCanvas"></canvas>

		<view class="bottom">
			<view class="input-box">
				<text class="yticon icon-huifu"></text>
				<input class="input" type="text" placeholder="点评一下把.." v-model="commentContent" placeholder-style="color:#adb1b9;" />
			</view>
			<text class="confirm-btn" @click="createComment">提交</text>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	let context = uni.createCanvasContext('firstCanvas')
	let upHead = uni.createCanvasContext('upHeadCanvas')

	export default {
		components: {
			tkiQrcode,
		},
		data() {
			return {
				detailData: {}, //内容数据
				flow: {}, //文章
				upInfo: {}, //up信息
				contentId: '', //内容id
				courseList: [], //课程列表
				channelId: '', //内容上专栏id
				constData: this.$constData, //全局变量引入
				moreCourse: 2, //课程列表展示数量
				channelTitle: '', //专栏标题
				courseTitle: '', //课程标题

				/* 分享朋友圈 */
				val: '', // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'px', // 单位
				background: '#FFFFFF', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '/static/logo.png', // 二维码图标
				iconsize: 30, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64

				posterImg: '',
				posterShow: false, //控制分享页的显示
				/* 分享朋友圈end */

				/* 点赞 */
				commentId: Number, //点赞对象id
				/* 点赞end */

				/* 评论 */
				comment: {}, //评论列表
				totalCount: Number, //文章评论数
				contentUpvote: Number, //文章点赞数
				commentContent: '', //评论内容
				/* 评论end */
			}
		},
		onLoad(res) {
			console.log(res)
			let src = ''
			if (res.q) {
				src = res.q
				let params = this.$commen.getSplit(src)
				this.contentId = params.id
			} else {
				this.contentId = res.id
			}
			this.getContentById()
			this.getAppraiseCount()

		},
		methods: {
			/* 分享朋友圈 */
			//开始生成海报
			createHb() {
				uni.showLoading({
					title: '生成中'
				})
				this.val = `https://wx.zyxhj.cn?id=${this.contentId}&id1=${this.id1}` //值改变后自动调取qrR()
			},

			qrR(res) { //生成二维码的图片地址
				this.src = res
				this.createCanvas()
			},

			// 生成背景
			createCanvas() {
				//生成背景
				context.setFillStyle('#FFFFFF')
				context.fillRect(0, 0, 450, 800)
				let imgList = this.$util.tryParseJson(this.detailData.data).imgList
				let bgImg = ''
				if (imgList.length > 0) {
					uni.downloadFile({
						url: imgList[0].src,
						success: (res) => {
							context.drawImage(res.tempFilePath, 0, 0, 450, 500)
							this.getUpHead()
						}
					})
				}
			},

			//生成up圆形头像
			getUpHead() {
				let img = this.$util.tryParseJson(this.upInfo.ext).userHead
				console.log(img)
				console.log('头像地址')
				let imgSrc = ''
				uni.downloadFile({
					url: img,
					success: (res) => {
						imgSrc = res.tempFilePath
						console.log(imgSrc)
						upHead.arc(50, 50, 50, 0, 2 * Math.PI)
						upHead.clip()
						upHead.drawImage(imgSrc, 0, 0, 100, 100)
						upHead.draw()
						setTimeout(() => { //延时生成图片
							uni.canvasToTempFilePath({
								x: 0,
								y: 0,
								width: 100,
								height: 100,
								destWidth: 100,
								destHeight: 100,
								canvasId: 'upHeadCanvas',
								success: (res) => {
									// 在H5平台下，tempFilePath 为 base64
									context.drawImage(res.tempFilePath, 20, 520, 50, 50)
									this.createPoster()
								},
								fail: (error) => {
									console.log(error)
								}
							})
						}, 400)
					}
				})
			},

			//最终生成海报
			createPoster() {
				// 二维码图片
				context.drawImage(this.src, 280, 520, 150, 150)

				// 文字
				context.setFillStyle('#000000')
				context.font = '18px Arial'
				context.fillText(this.upInfo.name, 80, 550)

				context.font = '20px Arial'
				context.fillText(this.detailData.title, 20, 610)

				context.font = '16px Arial'
				context.setFillStyle('#aaa')
				context.fillText('长按扫码查看详情', 20, 650)

				//生成画布
				context.draw()

				// let that = this

				setTimeout(() => { //延时生成图片
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: 450,
						height: 690,
						destWidth: 450,
						destHeight: 690,
						canvasId: 'firstCanvas',
						success: (res) => {
							uni.hideLoading()
							// 在H5平台下，tempFilePath 为 base64
							this.posterImg = res.tempFilePath
							console.log(this.posterImg)
						}
					})
					this.showHb()
				}, 300)
			},

			// 展示海报
			showHb() {
				this.posterShow = true
			},

			//保存图片至本地
			saveImg() {
				uni.saveImageToPhotosAlbum({
					filePath: this.posterImg,
					success: function() {
						console.log('save success');
					}
				});
			},

			hiddenPoster() {
				this.posterShow = false
			},

			showImg() {
				uni.previewImage({
					urls: [this.posterImg]
				})
			},
			/* 分享朋友圈end */

			/* 评论 */
			//获取评论列表
			getCommentByContentId() {
				let cnt = {
					// module: this.$constData.module, // String 隶属
					ownerId: this.contentId, // Long 内容编号
					// status: status, // Byte <选填> 审核状态，不填表示全部，STATUS_UNEXAMINED = 0未审核，STATUS_ACCEPT = 1已通过，STATUS_REJECT = 2已回绝
					orderDesc: true, // Boolean 是否降序（较新的排前面）
					count: 10, // Integer 
					offset: 0, // Integer 
				};
				this.$api.getCommentByContentId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log('评论接口返回数据')
						console.log(this.$util.tryParseJson(res.data.c))
						console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
						this.totalCount = this.$util.tryParseJson(res.data.c).totalCount
						this.contentUpvote = this.$util.tryParseJson(res.data.c).contentUpvote
						let comment = this.$util.tryParseJson(res.data.c).list
						for (let i = 0; i < comment.length; i++) {
							let time = new Date(comment[i].createTime)
							let y = time.getFullYear()
							let m = 1 + time.getMonth()
							let d = time.getDate()
							comment[i].time = `${y}-${m}-${d}`
							if (comment[i].user != undefined) {
								comment[i].userHead = this.$util.tryParseJson(comment[i].user.ext).userHead
							} else {
								comment[i].userHead = ''
							}
						}
						this.comment = comment
					} else {
						uni.showToast({
							title: '评论获取失败',
							icon: 'none',
							duration: 1000
						})
					}
				})
			},

			//创建评论
			createComment() {
				let userId = uni.getStorageSync('userId')
				// if (userId == '' || userId == '1234567890') {
				// 	uni.showToast({
				// 		title: '登录后可评论',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				let cnt = {
					// module: this.$constData.module, // String 隶属
					ownerId: this.contentId, // Long 内容编号
					upUserId: userId, // Long 用户编号
					text: this.commentContent, // String 评论内容
					// data: [], // String 其他数据
					atUserId: 12321321321, // Long <选填> @对象编号
					atUserName: '233', // String <选填> @对象名称
					title: 'title', // String <选填> 标题
					ext: '123', // String <选填> 扩展
				};
				this.$api.createComment(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '评论成功',
							duration: 1000
						});
						this.hidden = true
						this.commentContent = ''
						setTimeout(function() {
							this.getCommentByContentId()
						}, 4000);
					} else {
						uni.showToast({
							title: "评论失败",
							duration: 1000
						});
					}
				})
			},

			//跳转支付页面
			navToPay() {
				uni.navigateTo({
					url: '/pages/vip/column/payView/payView'
				});
			},


			/* 评论end */

			/* 点赞相关 */
			//获取赞数
			getAppraiseCount() {
				let cnt = {
					ownerId: this.contentId, // Long 内容编号
					// userId: userId, // Long <选填> 用户编号
					value: this.$constData.appraise[0].key, // String <选填> 状态
				}
				this.$api.getAppraiseCount(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
						console.log(this.$util.tryParseJson(res.data.c).totalCount)
						this.contentUpvote = this.$util.tryParseJson(res.data.c).totalCount
					} else {
						console.log('erorr')
					}
				})
			},

			//点赞
			upvote(conid, index) {
				this.commentId = conid
				this.createUpvote(index)
			},
			createUpvote(index) {
				let userId = uni.getStorageSync('userId')
				// if (userId == '' || userId == '1234567890') {
				// 	uni.showToast({
				// 		title: '请登录',
				// 		duration: 1000,
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				let cnt = {
					ownerId: this.commentId, // Long 内容编号/评论编号
					userId: 0 + userId, // Long 用户编号
					value: this.$constData.appraise[0].key //Byte 状态
				}
				this.$api.createUpvote(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '点赞成功',
							duration: 1000
						})
					} else {
						uni.showToast({
							title: res.data.c,
							duration: 1000,
							icon: 'none'
						})
					}
				})
			},
			/* 点赞end */

			moreCourseBtn() {
				this.moreCourse = 5;
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
			/* 获取课程对应专栏 */
			getChannel() {
				let cnt = {
					id: this.channelId, //专栏id
				}
				this.$api.getChannlById(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log('专栏信息')
						this.channelTitle = this.$util.tryParseJson(res.data.c).title
						console.log(this.channelTitle)
						this.getCouser()
					} else {
						console.log('专栏获取失败')
					}
				})

			},
			getCouser() {
				let data = this.detailData.tags
				let key = this.channelTitle
				this.courseTitle = data[key][0]
				this.getContentByChannelId()
			},
			// 从专栏id获取课程列表
			getContentByChannelId() {
				let tagJson = `{"${this.channelTitle}":"${this.courseTitle}"}`
				let cnt = {
					module: this.$constData.module, // String 隶属
					upChannelId: this.channelId, // Long 专栏id
					tags: this.$util.tryParseJson(tagJson), // Long 专栏内容标签
					status: 4, // Byte 专栏状态
					count: 10, // Integer 
					offset: 0, // Integer 
				}
				this.$api.getContents(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = JSON.parse(res.data.c)
						
						for (let i = 0; i < arr.length; i++) {
							let date = new Date(arr[i].createTime)
							let y = date.getFullYear()
							let m = date.getMonth() + 1
							let d = date.getDate()
							arr[i].time = `${y}年${m}月${d}日`
						}
						this.courseList = arr
						console.log(this.courseList)
						console.log('课程列表')
					} else {
						this.courseList = []
						console.log('error')
					}
				})
			},
			/* 获取id对应内容 */
			getContentById() {
				let cnt = {
					id: this.contentId, // Long 内容编号
				}
				this.$api.getContentById(cnt, (res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let detailData = JSON.parse(res.data.c)
						let a = new Date(detailData.createTime)
						let y = a.getFullYear()
						let m = 1 + a.getMonth()
						let d = a.getDate()
						let time = y + '年' + m + '月' + d + '日'
						detailData.time = time
						console.log(detailData)
						console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
						this.detailData = detailData
						this.channelId = detailData.upChannelId
						this.flow = JSON.parse(detailData.data).editor
						this.getUserById(detailData.upUserId)
						this.getCommentByContentId()
						this.getChannel()
					}
				}))
			},

			/* 获取id对应用户 */
			getUserById(id) {
				let cnt = {
					userId: id, //long 用户编号
				}
				this.$api.getUserById(cnt, (res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(JSON.parse(res.data.c))
						this.upInfo = JSON.parse(res.data.c)
					}
				}))
			},

		},
		onShareAppMessage(res) {
			var pages = getCurrentPages() //获取加载的页面
			var currentPage = pages[pages.length - 1] //获取当前页面的对象
			console.log(currentPage)
			var url = currentPage.route //当前页面url
			if (url == undefined) {
				url = currentPage.__route__
			}
			var options = currentPage.options //如果要获取url中所带的参数可以查看options 
			var id = options.id
			var src = `${url}?id=${id}`
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
	page {
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
	}

	.scroll {
		flex: 1;
		position: relative;
		background-color: #f8f8f8;
		height: 0;
	}

	.scroll-content {
		display: flex;
		flex-direction: column;
	}

	/* 简介 */
	.introduce-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		line-height: 1.5;

		.title {
			font-size: 36upx;
			color: #303133;
			margin-bottom: 16upx;
		}

		.introduce {
			display: flex;
			font-size: 26upx;
			color: #909399;

			text {
				margin-right: 16upx;
			}
		}
	}

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

	.s-header {
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;

		&:before {
			content: '';
			width: 0;
			height: 40upx;
			margin-right: 24upx;
			border-left: 6upx solid #ec706b;
		}
	}

	/* 评论 */
	.evalution {
		display: flex;
		flex-direction: column;
		background: #fff;
		padding: 20upx 0;
	}

	.eva-item {
		display: flex;
		padding: 20upx 30upx;
		position: relative;

		image {
			width: 60upx;
			height: 60upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 24upx;
		}

		&:after {
			content: '';
			position: absolute;
			left: 30upx;
			bottom: 0;
			right: 0;
			height: 0;
			border-bottom: 1px solid #eee;
			transform: translateY(50%);
		}

		&:last-child:after {
			border: 0;
		}
	}

	.eva-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-size: 26upx;
		color: #909399;
		position: relative;

		.zan-box {
			display: flex;
			align-items: base-line;
			position: absolute;
			top: 10upx;
			right: 10upx;

			.yticon {
				margin-left: 8upx;
			}
		}

		.content {
			font-size: 28upx;
			color: #333;
			padding-top: 20upx;
		}
	}

	/* 底部 */
	.bottom {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;
		box-shadow: 0 -1px 3px rgba(0, 0, 0, .04);
		position: relative;
		z-index: 1;

		.input-box {
			display: flex;
			align-items: center;
			flex: 1;
			height: 60upx;
			background: #f2f3f3;
			border-radius: 100px;
			padding-left: 30upx;

			.icon-huifu {
				font-size: 28upx;
				color: #909399;
			}

			.input {
				padding: 0 20upx;
				font-size: 28upx;
				color: #303133;
			}
		}

		.confirm-btn {
			font-size: 30upx;
			padding-left: 20upx;
			color: #0d9fff;
		}
	}

	.noEva {
		font-size: 30upx;
		color: #303133;
		padding: 20rpx 30rpx;
	}

	.contentImg {
		image {
			width: 100%;
		}
	}

	.articleInfo {
		margin-top: 20upx;
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

	.columnImgBox {
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
			font-size: $list-info;
			right: 0;
			bottom: -7.5upx;
			display: inline-block;
			line-height: $list-title-line;
			padding: 8upx 15upx;
			background-color: #ec706b;
		}

		.button-hover {
			background-color: rgba(236, 112, 107, 0.5);
			color: rgba(255, 255, 255, 0.5)
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

	.blodFont {
		font-weight: bold;
	}


	.hiddenBox {
		position: absolute;
		top: -10000px;
	}

	.canvasBox {
		width: 450px;
		height: 800px;
	}

	.upHeadBox {
		width: 100px;
		height: 100px;
	}

	.poster {
		position: fixed;
		z-index: 3;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.posterImg {
		position: absolute;
		top: 20px;
		width: 85vw;
		left: 50%;
		margin-left: -42.5vw;

		image {
			width: 100%;
		}
	}

	.posterBtn {
		position: absolute;
		bottom: 20px;
		font-size: $list-title;
		width: 100vw;

		.stopBtn {
			width: 50vw;
			margin: 0 auto;
		}
	}
</style>
