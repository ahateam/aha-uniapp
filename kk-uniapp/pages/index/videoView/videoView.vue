<template>
	<view class="content">
		<view class="video-wrapper">
			<video class="video" :src="contentObj.url" controls objectFit="fill" :autoplay="false"></video>
		</view>

		<scroll-view class="scroll" scroll-y>
			<view class="scroll-content">
				<view class="introduce-section">
					<text class="title">{{detailData.title}}</text>
					<view class="introduce">
						<text class="introduce">{{contentObj.text}}</text>
						<!-- <text class="yticon icon-xia show-icon"></text> -->
					</view>
					<!-- 点赞评论等操作 -->
					<view class="actions">
						<view class="action-item">
							<button type="primary" @click="upvote(0,contentId,0)">
								<i class="yticon iconfont kk-dianzan"></i>
								<text>{{contentUpvote}}</text>
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
								<text class="content">{{item.commentContent}}</text>
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
				detailData: {}, //内容全部数据
				contentObj: {}, //文章数据
				upInfo: {}, //上传者数据
				contentId: '', //内容id
				id1: '', //片区id

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
				type: 0, //分辨点赞对象是文章还是评论 0为文章 1为评论
				commentId: Number, //点赞对象id
				/* 点赞end */

				/* 评论 */
				comment: [], //评论列表
				totalCount: Number, //文章评论数
				contentUpvote: Number, //文章点赞数
				commentContent: '', //评论内容
				/* 评论end */
			}
		},
		onLoad(res) {
			if (res.q) {
				let src = res.q
				let params = this.$commen.getSplit(src)
				this.contentId = params.id
				this.id1 = params.id1
			} else {
				this.contentId = res.id
				this.id1 = res.id1
			}
			this.getContentById()
		},
		methods: {
			/* 评论 */
			createComment() {
				let userId = uni.getStorageSync('userId')
				if (userId == '' || userId == '1234567890') {
					uni.showToast({
						title: '登录后可评论',
						icon: 'none'
					})
					return
				}

				let cnt = {
					module: this.$constData.module, // String 隶属
					contentId: this.contentId, // Long 内容编号
					userId: userId, // Long 用户编号
					commentContent: this.commentContent, // String 评论内容
					data: [], // String 其他数据
				};
				this.$api.createComment(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '评论成功',
							duration: 1000
						});
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

			//获取评论列表
			getCommentByContentId() {
				let cnt = {
					module: this.$constData.module, // String 隶属
					contentId: this.contentId, // Long 内容编号
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
			/* 评论end */

			/* 点赞 */
			upvote(vo, conid, e, index) {
				if (vo == 0) {
					this.type = 0;
				} else if (vo == 1) {
					this.type = 1;
				}
				this.commentId = conid
				this.createUpvote(e, index)
			},

			createUpvote(e, index) {
				let userId = uni.getStorageSync('userId')
				if (userId == '' || userId == '1234567890') {
					uni.showToast({
						title: '请登录',
						duration: 1000,
						icon: 'none'
					})
					return
				}
				let cnt = {
					contentId: this.commentId, // Long 内容编号/评论编号
					userId: 0 + userId, // Long 用户编号
					type: this.type, // Byte 评论类型
				};
				this.$api.createUpvote(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '点赞成功',
							duration: 1000
						});
						if (e == 0) {
							this.contentUpvote = 1 + this.contentUpvote
						} else if (e == 1) {
							let a = this.comment[index].commentTotalCount
							this.comment[index].commentTotalCount = 1 + a
						}
					} else {
						uni.showToast({
							title: res.data.c,
							duration: 1000
						});
					}
				})
			},
			/* 点赞end */

			/* 朋友圈分享 */
			//开始生成海报
			createHb() {
				uni.showLoading({
					title: '生成中'
				})
				this.val = `https://wx.zyxhj.cn?id=${this.contentId}&id1=${this.id1}`//值改变后自动调取qrR()
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
				uni.downloadFile({
					url: this.contentObj.imgSrc,
					success: (res) => {
						context.drawImage(res.tempFilePath, 0, 0, 450, 500)
						this.getUpHead()
					}
				})
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
					success: () => {
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


			/* 获取id对应内容 */
			getContentById() {
				let cnt = {
					userId: uni.getStorageSync('userId'), // Long 用户编号
					id: this.id1, // String 片区编号
					contentId: this.contentId, // Long 内容编号
				};
				this.$api.getContentById(cnt, (res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let detailData = this.$util.tryParseJson(res.data.c)
						let a = new Date(detailData.createTime)
						let y = a.getFullYear()
						let m = 1 + a.getMonth()
						let d = a.getDate()
						let time = y + '年' + m + '月' + d + '日'
						detailData.time = time
						this.detailData = detailData
						this.contentObj = this.$util.tryParseJson(detailData.data)
						console.log(this.contentObj)
						console.log('---------------------------')
						console.log(this.detailData)
						this.getUserById(detailData.upUserId)
						this.getCommentByContentId()
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
						this.upInfo = this.$util.tryParseJson(res.data.c)
						console.log(this.upInfo)
					}
				}))
			}
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
	page {
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
	}

	.video-wrapper {
		height: 422upx;

		.video {
			width: 100%;
			height: 100%;
		}
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

			.show-icon {
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

	.mix-loading {
		transform: translateY(140upx);
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
	.noEva {
		font-size: 30upx;
		color: #303133;
		padding: 20rpx 30rpx;
	}

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
</style>
