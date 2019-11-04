<template>
	<view class="content">
		<view class="video-wrapper">
			<video class="video" :src="contentObj.url" controls objectFit="contain" :autoplay="false"></video>
		</view>
		<scroll-view class="scroll" scroll-y>
			<view class="scroll-content">
				<view class="introduce-section">
					<text class="title">{{detailData.title}}</text>
					<view class="introduce">
						<text class="introduce">{{contentObj.text}}</text>
						<!-- <text class="yticon icon-xia show-icon"></text> -->
						<button @click="createUserFavorite" class="followBtn" v-if="followStatus == false">关注</button>
						<button @click="delUserFavorite" class="followBtn" v-else-if="followStatus == true">已关注</button>
					</view>

					<!-- 点赞评论等操作 -->
					<view class="actions">
						<view class="action-item">
							<button type="primary" @click="upvote(contentId)">
								<i class="yticon iconfont kk-dianzan" :class="{currentIcon:upvoteStatus}"></i>
								<text>{{contentUpvote}}赞</text>
							</button>
						</view>
						<view class="action-item">
							<button type="primary" open-type="share" @click="shareBtn">
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

				<!-- 所属课程 -->
				<view class="courseText">所属课程</view>
				<view class="courseBox" @click="navToCourse">
					<view class="columnImgBox">
						<image class="columnImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567139311188&di=b309ce828b72d42a2c9318f26f7115c7&imgtype=0&src=http%3A%2F%2Fwww.pclady.com.cn%2Fstyle%2Fmovie%2F0509%2Fpic%2Fbb20050920_shjz_06_thumb.jpg"
						 mode="scaleToFill"></image>
					</view>
					<view class="courseRight">
						<view class="courseText blodFont noPadding">
							{{courseTitle}}
						</view>
						<view class="upName">
							<text>作者:</text><text>{{upInfo.name}}</text>
						</view>
						<view class="payCourse">
							<text class="courseMoney">{{price}}元</text>
							<!-- <text class="courseInfo">233人购买</text> -->
							<button type="primary" @click="navToPay" @click.stop>购买课程</button>
						</view>
					</view>
				</view>

				<!-- 其他内容列表 -->
				<view v-if="courseList.length > 0">
					<view class="courseText">课程内容</view>
					<view v-for="(item,index) in courseList" :key="index" v-if="index < moreCourse">
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

				<comment :comment="comment" @upZan="upZan" @delZan="delZan"></comment>

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
	import comment from '@/components/comment/comment.vue'

	let context = uni.createCanvasContext('firstCanvas')
	let upHead = uni.createCanvasContext('upHeadCanvas')

	export default {
		components: {
			// mixLoading,
			tkiQrcode,
			comment
		},
		data() {
			return {
				constData: this.$constData,
				detailData: {},
				contentObj: {},
				upInfo: {},
				loading: false,
				contentId: '',
				channelId: '',

				moreCourse: 2,

				id1: '',

				courseList: [],
				courseTitle: '',
				courseId: '',
				price: '',

				/* 点赞 */
				type: 0, //分辨点赞对象是文章还是评论 0为文章 1为评论
				commentId: Number, //点赞对象id
				upvoteStatus: false, //是否点赞
				/* 点赞end */

				/* 评论 */
				comment: [], //评论列表
				totalCount: Number, //文章评论数
				contentUpvote: Number, //文章点赞数
				commentContent: '', //评论内容
				/* 评论end */

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

				/* 关注 */
				followStatus: false, //是否关注
				followId: '', //关注者id
				/* 关注end */
			}
		},
		onLoad(res) {
			console.log(res)
			if (res.q) {
				let src = res.q
				let params = this.$commen.getSplit(src)
				this.contentId = params.id
			} else {
				this.contentId = res.id
			}
			this.getContentById()
			this.getAppraiseCount()
			this.judgeAppraise() //获取点赞状态
		},
		methods: {
			judgeAppraise() {
				let cnt = {
					ownerId: this.contentId, // Long 内容编号
					userId: uni.getStorageSync('userId'), // Long 用户编号
					value: this.$constData.appraise[0].key, // Byte 状态0点赞1踩
				}
				this.$api.judgeAppraise(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.upvoteStatus = this.$util.tryParseJson(res.data.c)
					} else {
						console.log('error')
					}
				})
			},

			//取关
			delUserFavorite() {
				let cnt = {
					moduleId: this.$constData.module, // String 模块编号
					id: this.followId, // Long id
				}
				this.$api.delUserFavorite(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '已取消关注',
							icon: 'none'
						})
						this.followStatus = false
					} else {
						uni.showToast({
							title: '服务器错误！',
							icon: 'none'
						})
					}
				})
			},

			//创建关注
			createUserFavorite() {
				let userId = uni.getStorageSync('userId')
				if (userId == '' || userId == '1234567890') {
					uni.showToast({
						title: '登录后可关注',
						icon: 'none'
					})
					return
				}
				let cnt = {
					moduleId: this.$constData.module, // String 模块编号
					concernId: this.upInfo.id, // Long 被关注用户id
					userId: userId, // Long 用户id
				}
				this.$api.createUserFavorite(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.followId = this.$util.tryParseJson(res.data.c).id
						uni.showToast({
							title: '关注成功'
						})
						this.followStatus = true
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
						this.followStatus = true
					}
				})
			},

			//更新讚數
			delZan(index) {
				this.comment[index].appraiseCount -= 1
				this.comment[index].isAppraise = false
			},

			//更新赞数
			upZan(index) {
				this.comment[index].appraiseCount += 1
				this.comment[index].isAppraise = true
			},

			navToCourse() {
				let color = this.$constData.colorData[Math.floor(Math.random() * this.$constData.colorData.length)]
				uni.redirectTo({
					url: `/pages/vip/column/courseView/courseView?channelId=${this.channelId}&id=${this.courseId}&title=${this.courseTitle}&color=${color}`
				})
			},

			/*  分享 */
			//分享按钮
			shareBtn() {
				console.log('点击分享')
				// #ifdef APP-PLUS
				this.appShare()
				// #endif
			},

			//app分享
			appShare() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: `http://weapp.datanc.cn/kkqt/app/android/${this.$constData.version}/kkqt.apk`,
					title: "表揚表揚TA",
					summary: "我正在使用表揚表揚TA，赶紧跟我一起来体验！",
					imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572435385&di=3633a97230e161bda396cb159418e90c&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201210%2F05%2F20121005184845_rSCUj.thumb.700_0.jpeg",
					success: function(res) {
						uni.showToast({
							title: '分享成功！'
						})
					},
					fail: function(err) {
						uni.showToast({
							title: '分享失败',
							icon: 'none'
						})
					}
				})
			},

			/*  分享end */

			/* 分享朋友圈 */
			//开始生成海报
			createHb() {
				uni.showLoading({
					title: '生成中'
				})
				// this.val = `https://wx.zyxhj.cn?id=${this.contentId}&id1=${this.id1}` //值改变后自动调取qrR()
				this.val = `http://weapp.datanc.cn/kkqt/app/android/${this.$constData.version}/kkqt.apk` //值改变后自动调取qrR()
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

				//背景
				let src =
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572340464285&di=588bb4334825a9f4094456ba284d97ad&imgtype=0&src=http%3A%2F%2Ft-1.tuzhan.com%2F897b04c31fa7%2Fc-2%2Fl%2F2014%2F02%2F27%2F02%2F46d9ce1a7cb14bccae06589b9a3fe418.jpg'

				if (imgList.length > 0) {
					uni.downloadFile({
						url: imgList[0].src,
						success: (res) => {
							context.drawImage(res.tempFilePath, 0, 0, 450, 500)
							this.getUpHead()
						},
						fail: (err) => {
							context.drawImage(src, 0, 0, 450, 500)
							this.getUpHead()
						}
					})
				} else {
					uni.downloadFile({
						url: src,
						success: (res) => {
							context.drawImage(res.tempFilePath, 0, 0, 450, 500)
							this.getUpHead()
						},
						fail: (err) => {
							context.drawImage(src, 0, 0, 450, 500)
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
						this.setTimeImg(imgSrc)
					},
					fail: (err) => {
						//头像
						let url =
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572340857731&di=acfd33c7a3844a48d21dedbc2b75d39c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F18%2F20181018162951_kgwzm.thumb.700_0.jpeg'
						this.setTimeImg(url)
					}
				})
			},

			//延时生成图片
			setTimeImg(imgSrc) {
				upHead.arc(50, 50, 50, 0, 2 * Math.PI)
				upHead.clip()
				upHead.drawImage(imgSrc, 0, 0, 100, 100)
				upHead.draw()
				setTimeout(() => {
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
				let text = this.detailData.title
				if(text.length > 11){
					let data = text.substring(0,11)+'···'
					context.fillText(data, 20, 610)
				}else{
					context.fillText(text, 20, 610)
				}
				
				
				
			
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
							this.val = ''
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
						uni.showToast({
							title:'保存成功！'
						})
					},
					fail() {
						uni.showToast({
							title:'保存失败！',
							icon:'none'
						})
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
					// module: this.$constData.module, // String 隶属
					ownerId: this.contentId, // Long 内容编号
					upUserId: userId, // Long 用户编号
					text: this.commentContent, // String 评论内容
					// data: [], // String 其他数据
					atUserId: 12321321321, // Long <选填> @对象编号
					atUserName: '233', // String <选填> @对象名称
					title: 'title', // String <选填> 标题
					ext: '123', // String <选填> 扩展
				}
				this.$api.createReply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '评论成功',
							duration: 1000
						});
						this.hidden = true
						let time = new Date()
						let y = time.getFullYear()
						let m = 1 + time.getMonth()
						let d = time.getDate()

						let data = {
							text: this.commentContent,
							time: `${y}-${m}-${d}`,
							jsAdd: true,
							userHead: uni.getStorageSync('userHead'),
							user: {
								name: uni.getStorageSync('userName'),
							}
						}
						this.comment.splice(0, 0, data)
						console.log(this.comment)
						this.commentContent = ''
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
					// module: this.$constData.module, // String 隶属
					ownerId: this.contentId, // Long 内容编号
					// status: status, // Byte <选填> 审核状态，不填表示全部，STATUS_UNEXAMINED = 0未审核，STATUS_ACCEPT = 1已通过，STATUS_REJECT = 2已回绝
					userId: uni.getStorageSync('userId'), // Long <选填> 当前用户id
					orderDesc: true, // Boolean 是否降序（较新的排前面）
					count: 10, // Integer 
					offset: 0, // Integer 
				};
				this.$api.getCommentByContentId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log('评论接口返回数据')
						console.log(this.$util.tryParseJson(res.data.c))
						console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
						// this.totalCount = this.$util.tryParseJson(res.data.c).totalCount
						// this.contentUpvote = this.$util.tryParseJson(res.data.c).contentUpvote
						let comment = this.$util.tryParseJson(res.data.c)
						for (let i = 0; i < comment.length; i++) {
							comment[i].jsAdd = false
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

			//获取赞数
			getAppraiseCount() {
				let cnt = {
					ownerId: this.contentId, // Long 内容编号
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

			//点赞btn
			upvote(conid, index) {
				let userId = uni.getStorageSync('userId')
				if (userId == '' || userId == '1234567890') {
					uni.showToast({
						title: '请登录',
						duration: 1000,
						icon: 'none'
					})
					return
				}
				if (this.upvoteStatus == true) {
					this.delAppraise(conid)
					return
				}
				this.upvoteStatus = true
				this.commentId = conid
				this.createUpvote(index)
			},

			//点赞
			createUpvote(index) {
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
					ownerId: this.commentId, // Long 内容编号/评论编号
					userId: 0 + userId, // Long 用户编号
					value: this.$constData.appraise[0].key //Byte 状态
				}
				this.$api.createUpvote(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						if (this.$util.tryParseJson(res.data.c).value == 10) {
							uni.showToast({
								title: '请勿重复点赞',
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '点赞成功',
							duration: 1000
						})
						this.contentUpvote += 1
					} else {
						uni.showToast({
							title: res.data.c,
							duration: 1000,
							icon: 'none'
						})
					}
				})
			},

			//取消点赞
			delAppraise(id) {
				let cnt = {
					ownerId: id,
					userId: uni.getStorageSync('userId')
				}
				this.$api.delAppraise(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.upvoteStatus = false
						this.contentUpvote -= 1
					}
				})
			},
			/* 点赞end */

			/* 获取id对应内容 */
			getContentById() {
				let cnt = {
					id: this.contentId, // Long 内容编号
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
						this.channelId = detailData.upChannelId
						this.contentObj = this.$util.tryParseJson(detailData.data)
						console.log(this.contentObj)
						console.log('---------------------------')
						console.log(this.detailData)
						this.getUserById(detailData.upUserId)
						this.getBoolFavoriteUser(detailData.upUserId)

						this.getCommentByContentId()
						this.getChannlContentTagByChannelId()
						this.getCouser()
					}
				}))
			},

			//查询是否关注
			getBoolFavoriteUser(userId) {
				let cnt = {
					moduleId: this.$constData.module, // String 模块编号
					userId: uni.getStorageSync('userId'), // Long 用户id
					concernId: userId, // Long 被关注用户id,true没有关注
					count: 10, // int 
					offset: 0, // int 
				}
				this.$api.getBoolFavoriteUser(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let data = this.$util.tryParseJson(res.data.c)
						this.followStatus = data.bool
						if (this.followStatus == true) {
							this.followId = data.info.id
						}
					} else {
						console.log('失败')
					}
				})
			},

			getCouser() {
				let data = this.detailData.tags
				let key = `t${this.channelId}`
				this.courseTitle = data[key][0]
				this.getContentByChannelId()
			},

			//获取课程id
			getChannlContentTagByChannelId() {
				let cnt = {
					channelId: this.channelId,
					count: 10,
					module: this.$constData.module,
					offset: 0,
					status: this.$constData.contentStatus[4].key
				}
				this.$api.getChannlContentTagByChannelId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c)
						console.log('专栏下标签列表')
						console.log(arr)
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].name == this.courseTitle) {
								this.courseId = arr[i].id
								this.price = arr[i].price
								break
							}
						}
					}
				})
			},

			/* 获取id对应用户 */
			getUserById(id) {
				let cnt = {
					userId: id, //long 用户编号
				}
				this.$api.getUserById(cnt, (res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						this.upInfo = this.$util.tryParseJson(res.data.c)
					}
				}))
			},

			navToPay() {
				let userId = uni.getStorageSync('userId')
				if (userId == '' || userId == '1234567890') {
					uni.switchTab({
						url: '/pages/user/user'
					})
					uni.showToast({
						title: '请登录',
						icon: 'none'
					})
					return
				}
				let cnt = {
					modeuleId: this.$constData.module, // Long 模块编号
					channelId: this.channelId, // Long 专栏id
					channelContentTagId: this.courseId, // Long 课程名id
					userId: userId, // Long 用户id
				}
				this.$api.getChannelContentTagPower(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let paidStatus = this.$util.tryParseJson(res.data.c).resultStatus
						console.log(paidStatus)
						if (paidStatus == true) {
							uni.showToast({
								title: '您已经购买过该课程,感谢支持！',
								icon: 'none'
							})
						} else {
							uni.navigateTo({
								url: `/pages/vip/column/payView/payView?id=${this.channelId}&columnId=${this.courseId}&title=${this.courseTitle}&price=${this.price}`
							})
						}
					}
				})

			},

			// 从专栏id获取课程列表
			getContentByChannelId() {
				let tagJson = `{"t${this.channelId}":"${this.courseTitle}"}`
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
						let arr = this.$util.tryParseJson(res.data.c)

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
			if (url == undefined) {
				url = currentPage.__route__
			}
			var options = currentPage.options //如果要获取url中所带的参数可以查看options 
			var id = options.id
			var id1 = options.id1
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

	.followBtn {
		position: absolute;
		top: $box-margin-top;
		right: $box-margin-left;
		font-size: $list-info;
		background-color: $color-main;
		color: $color-button-back;
		line-height: 2em;

		&:after {
			border: none;
		}
	}

	.currentIcon {
		color: $color-main;
	}
</style>
