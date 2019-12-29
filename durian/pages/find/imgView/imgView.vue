<template style="font-size: 26rpx;">
	<view class="body">
		<view v-if="pageStatus != 'onload'">
			<navBar :back="false" class="navBox">
				<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
				<view slot="right" class="rightNav">
					<text class="iconfont icon-xing navMargin" :class="{isfavorite:isfavorite}" @click="createCollect"></text>
					<text class="iconfont icon-fenxiang" @click="share"></text>
				</view>
			</navBar>
			<view :style="opacity">
				<userBox :upName="upName" :time="time" :upHead="upHead"></userBox>
				<view class="textBox">
					{{text}}
				</view>
				<view class="imgList" v-if="imgList.length > 0">
					<image :src="constData.oss + item" mode="aspectFill" v-for="(item,index) in imgList" :key="index" :style="index == 2?'margin:0':''"></image>
				</view>
				<view class="abilityBox">
					<view class="icon-box">
						<image src="/static/image/find/icon_llrs.png" mode="aspectFit"></image>
						<text class="iconText">{{watchNumber}}</text>
					</view>

					<view :class="{currentIcon:isAppraise}" @click="createAppraise">
						<text class="iconfont icon-zan"></text>
						<text class="iconText">{{appraiseCount}}</text>
					</view>

					<view class="currentIcon" @click="sheetStatus = true">
						<text class="iconText">太棒了，打赏！</text>
					</view>
				</view>
			</view>
			<!-- 评论区 -->
			<view class="commentBox" :style="opacity">
				<view class="commentTitle flex-box">
					<view :class="{'curr-title':titleCurr == 0}" @click="changeCommen(0)">大家在说</view>
					<view :class="{'curr-title':titleCurr == 1}" style="margin-left: 15rpx;" @click="changeCommen(1)">密信</view>
				</view>
				<view v-if="titleCurr == 0?commentList.length > 0:secretList.length > 0">
					<comment :comment="commentList" @zan="zan" @createComment="createComment" v-if="titleCurr == 0"></comment>
					<secret :comment="secretList" @createComment="secretComment" v-else></secret>
				</view>
				<view v-if="titleCurr == 0?commentList.length == 0:secretList.length == 0&&commentApi" class="noCommentBox">
					<view class="noComIcon">
						<image src="/static/image/find/bg-ly.png" mode="aspectFit"></image>
						<view class="noComText">
							爱我就留言，不用跪榴莲。
						</view>
					</view>
				</view>
			</view>

			<!-- 评论栏 -->
			<view class="replayBox" :style="opacity" v-if="!replyStatus&&!secretStatus">
				<view class="inputBox">
					<text class="iconfont icon-xie"></text>
					<input type="text" v-model="replayText" placeholder="我也说两句…" />
				</view>
				<button class="submitBtn" @click="submit">公开</button>
				<button class="secretBtn" @click="createSecretLetter">密信</button>
			</view>

			<view class="replayBox" v-else>
				<view class="inputBox" style="width: 520rpx;">
					<text class="iconfont icon-xie"></text>
					<input focus type="text" v-model="replayText" :placeholder="'@'+replyUser.userName" />
				</view>
				<button class="submitBtn" style="right: 30rpx!important;" @click="replyBtn">回复</button>
			</view>


			<uni-load-more :status="titleCurr == 0?commenPageStatus:secretPageStatus" v-if="titleCurr == 0?commentList.length > 0:secretList.length > 0"></uni-load-more>
			<sheet isShowBottom @closeBottom="closeSheet" @changeMoney="changeMoney" v-if="sheetStatus"></sheet>
		</view>
		<loading :status="commenPageStatus"></loading>
	</view>
</template>

<script>
	import userBox from '@/components/find/userBox.vue'
	import comment from '@/components/find/comment.vue'
	import secret from '@/components/find/secret.vue'
	import sheet from '@/components/bbh-sheet/bottomSheet.vue'
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import Loading from '@/components/Loading/Loading.vue'

	export default {
		components: {
			userBox,
			comment,
			sheet,
			navBar,
			uniLoadMore,
			Loading,
			secret
		},
		data() {
			return {
				constData: this.$constData,
				opacity: 'opacity: 0',

				id: '', //文章id

				// 评论分页
				commentApi: false, //是否返回数据
				count: 10,
				offset: 0,
				commenPage: 1,
				commenPageOver: false,
				commenPageStatus: 'onload',


				secretPage: 1,
				secretPageOver: false,
				secretPageStatus: 'loading',

				// 帖子数据
				upName: '', //上传者名字
				upHead: '', //上传者头像
				imgList: [], //图片数据
				text: '', //内容文本
				time: '', //时间

				// 点赞分享观看数据
				watchNumber: '', //观看次数
				appraiseCount: '', //点赞次数
				isAppraise: false, //是否点赞

				titleCurr: 0,

				// 评论
				commentList: [], //评论列表
				replayText: '', //回复文本

				secretList: [], //密信列表

				sheetStatus: false,
				money: 5, //打赏价格

				//收藏
				isfavorite: false, //是否收藏

				userInfo: this.$util.tryParseJson(uni.getStorageSync('userInfo')),

				replyId: '', // 回复的id
				replyUser: {}, // 回复的用户
				replyIndex: '', // 回复列表下标
				replyStatus: false, // 回复的状态
				secretStatus: false, // 密信回复
			}
		},

		onLoad(res) {
			this.id = res.id
			let cnt = {
				id: this.id, // Long 帖子id
				userId: this.userInfo.userId, // Long 当前用户id
				sort: true, // boolean 是否倒序
				count: this.count, // int 
				offset: this.offset, // int 
			}
			this.getPosting(cnt)
			let cnt1 = {
				ownerId: this.id, // Long 帖子id
				userId: this.userInfo.userId, // Long 当前用户id
				sort: true, // Boolean 是否排序
				count: this.count, // int 
				offset: this.offset, // int 
			}
			this.getReplys(cnt1)

			let cnt2 = {
				postingId: this.id, // Long 帖子编号
				userId: this.userInfo.userId, // Long <选填> 浏览帖子用户编号
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			this.getSecretLetter(cnt2)
		},

		methods: {
			createComment(list, index) {
				console.log(list)
				this.replyId = list.reply.sequenceId
				this.replyUser = list.user
				this.replyStatus = true
				this.replyIndex = index
			},

			secretComment(list, index) {
				console.log(list)
				this.replyId = list.reply.sequenceId
				this.replyUser = {
					userName: list.user.userName,
					userId: list.user.userId
				}
				this.secretStatus = true
				this.replyIndex = index
			},

			// 切换密信评论
			changeCommen(e) {
				this.titleCurr = e
			},

			// 收藏按钮
			createCollect() {
				if (this.isfavorite) {
					this.delUserFavorite()
				} else {
					this.createUserFavorite()
				}
			},

			// 删除收藏
			delUserFavorite() {
				let cnt = {
					postingId: this.id, // Long 被关注帖子id
					userId: this.userInfo.userId, // Long 用户id
				}
				this.$api.delUserFavorite(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.isfavorite = false
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			// 创建收藏
			createUserFavorite() {
				let cnt = {
					postingId: this.id, // Long 被关注帖子id
					userId: this.userInfo.userId, // Long 用户id
				}
				this.$api.createUserFavorite(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.isfavorite = true
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			createAppraise() {
				if (this.isAppraise) {
					this.delAppraise(this.id)
				} else {
					this.createUpvote(this.id)
				}
			},

			delAppraise(id, index) {
				let cnt = {
					ownerId: id,
					userId: this.userInfo.userId
				}
				this.$api.delAppraise(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						if (index || index === 0) {
							this.commentList[index].isAppraise = false
							this.commentList[index].appraiseCount -= 1
						} else {
							this.isAppraise = false
							this.appraiseCount -= 1
						}
					}
				})
			},

			createUpvote(id, index) {
				let cnt = {
					ownerId: id, // Long 内容编号/评论编号
					userId: this.userInfo.userId, // Long 用户编号
					value: this.$constData.appraise[0].key //Byte 状态
				}
				this.$api.createAppraise(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						if (index || index === 0) {
							if (this.titleCurr == 0) {
								this.commentList[index].isAppraise = true
								this.commentList[index].appraiseCount += 1
							} else {
								this.secretList[index].isAppraise = true
								this.secretList[index].appraiseCount += 1
							}
						} else {
							this.isAppraise = true
							this.appraiseCount += 1
						}
					} else {
						uni.showToast({
							title: '服务器错误！',
							icon: 'none'
						})
					}
				})
			},

			zan(id, index) {
				if (this.commentList[index].isAppraise) {
					this.delAppraise(id, index)
					return
				}
				this.commentList[index].isAppraise = true
				this.createUpvote(id, index)
			},

			share() {
				uni.share({
					scene: "WXSceneSession",
					type: 0,
					href: `http://weapp.datanc.cn/kkqt/app/android/${this.$constData.version}/kkqt.apk`,
					title: "表揚表揚TA",
					summary: item.posting.postingTextDate,
					imageUrl: this.$util.tryParseJson(item.posting.postingDate)[0],
					success: (res) => {
						uni.showToast({
							title: '分享成功！'
						})
						let cnt1 = {
							userId: uni.getStorageSync('userId'), // Long 用户id
							ownerId: this.id, // Long 内容id
						}
						this.createUserShare(cnt1)
					},
					fail: (err) => {
						uni.showToast({
							title: '分享失败',
							icon: 'none'
						})
					}
				})
			},

			createUserShare(cnt, index) {
				this.$api.createUserShare(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log('成功')
					} else {
						console.log('错误')
					}
				})
			},

			createSecretLetter() {
				let cnt = {
					publishUserId: this.userInfo.userId, // Long 密信发布用户编号
					text: this.replayText, // String 密信内容
					postingId: this.id, // Long 回复帖子编号
				}
				this.$api.createSecretLetter(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '已私信',
							icon: 'none'
						});
						let time = new Date()
						let y = time.getFullYear()
						let m = 1 + time.getMonth()
						let d = time.getDate()

						let data = {
							letterTime: Math.round(new Date()),
							text: this.replayText,
							userName: this.userInfo.userName,
							userHead: this.userInfo.userHead,
							...this.$util.tryParseJson(res.data.c)
						}
						this.secretList.splice(0, 0, data)
						console.log('_________________密信_______________________')
						console.log(this.secretList)
						this.replayText = ''
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			createCommentApi(cnt) {
				this.$api.createComment(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						let totalCount = ''

						if (this.commentList[this.replyIndex].comment.length > 0) {
							totalCount = this.commentList[this.replyIndex].comment[0].totalCount
						}
						totalCount = totalCount * 1 + 1
						let obj = {
							commentInfo: {
								upUserName: this.userInfo.userName,
								text: this.replayText
							},
							totalCount: totalCount
						}
						if (this.replyStatus) {
							this.commentList[this.replyIndex].comment.splice(0, 0, obj)
						} else {
							this.secretList[this.replyIndex].comment.splice(0, 0, obj)
						}
						this.replayText = ''
						this.replyStatus = false
						this.secretStatus = false
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			replyBtn() {
				if (this.replayText) {
					if (this.replyStatus) {
						let cnt = {
							replyId: this.replyId, // Long 一级评论id
							upUserId: this.userInfo.userId, // Long 提交者编号
							upUserHead: this.userInfo.userHead, // String 提交者头像
							upUserName: this.userInfo.userName, // String 提交者昵称
							text: this.replayText, // String 正文
							// toUserId: this.replyUser.userId, // Long <选填> 目标用户编号
							toUserName: this.replyUser.userName, // String <选填> 目标用户昵称
						}

						if (this.replyUser.userId) {
							cnt.toUserId = this.replyUser.userId
						}

						this.createCommentApi(cnt)
					} else if (this.secretStatus) {
						let cnt = {
							publishUserId: this.userInfo.userId, // Long 密信发布用户编号
							text: this.replayText, // String 密信内容
							postingId: this.replyId, // Long 回复帖子编号
						}
						this.$api.createSecretLetter(cnt, (res) => {
							if (res.data.rc == this.$util.RC.SUCCESS) {
								let totalCount = ''
								if (this.secretList[this.replyIndex].comment.length > 0) {
									totalCount = this.secretList[this.replyIndex].comment[0].totalCount
								}
								totalCount = totalCount * 1 + 1
								let obj = {
									commentInfo: {
										upUserName: this.userInfo.userName,
										text: this.replayText
									},
									totalCount: totalCount
								}
								this.secretList[this.replyIndex].comment.splice(0, 0, obj)

								this.replayText = ''
								this.secretStatus = false
							} else {
								uni.showToast({
									title: res.data.rm,
									icon: 'none'
								})
							}
						})
					}
				} else {
					uni.showToast({
						title: '请输入回复内容',
						icon: 'none'
					})
				}
			},

			submit() {
				let cnt = {
					// module: this.$constData.module, // String 隶属
					ownerId: this.id, // Long 内容编号
					upUserId: this.userInfo.userId, // Long 用户编号
					text: this.replayText, // String 评论内容
					// data: [], // String 其他数据
					atUserId: 0, // Long <选填> @对象编号
					atUserName: '0', // String <选填> @对象名称
					title: 'title', // String <选填> 标题
					ext: '0', // String <选填> 扩展
				}
				this.$api.createReply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '评论成功',
							icon: 'none'
						});



						let time = new Date()
						let y = time.getFullYear()
						let m = 1 + time.getMonth()
						let d = time.getDate()

						let data = {
							user: {
								userName: this.userInfo.userName,
								userHead: this.userInfo.userHead
							},
							reply: {
								createTime: Math.round(new Date()),
								text: this.replayText
							}
						}
						this.commentList.splice(0, 0, data)
						console.log(this.commentList)
						this.replayText = ''
					} else {
						uni.showToast({
							title: "评论失败",
							icon: 'none'
						});
					}
				})
			},

			closeSheet() {
				this.sheetStatus = false
			},

			changeMoney(money) {
				this.money = money
			},

			getTime(time) {
				let newData = new Date(time)
				let y = newData.getFullYear()
				let m = newData.getMonth() * 1 + 1
				let d = newData.getDate()
				return `${y}-${m}-${d}`
			},

			getPosting(cnt) {
				this.$api.getPosting(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.opacity = 'opacity:1'
						let data = this.$util.tryParseJson(res.data.c)[0]
						console.log(data)
						this.watchNumber = data.posting.postingPageView
						this.appraiseCount = data.appraiseCount
						this.isAppraise = data.isAppraise
						this.isfavorite = data.isFavorite
						this.upName = data.posting.userName
						this.upHead = data.posting.userHead
						this.text = data.posting.postingTextDate
						this.imgList = this.$util.tryParseJson(data.posting.postingDate)
						this.time = this.getTime(data.posting.postingCreateTime)
					} else {
						console.log('error')
					}
				})
			},

			getSecretLetter(cnt) {
				this.$api.getSecretLetter(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let list = this.$util.tryParseJson(res.data.c)
						this.secretList = list
						console.log('--------------密信列表-----------------')
						console.log(this.secretList)
						if (this.secretList.length < this.count) {
							this.secretPageStatus = 'nomore'
							this.secretPageOver = true
						} else {
							this.secretPageStatus = 'more'
							this.secretPageOver = false
						}
					} else {
						this.secretPageStatus = 'nomore'
						this.secretPageOver = true
						console.log('error')
					}
				})
			},

			getReplys(cnt) {
				this.$api.getReplys(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.commentApi = true
						this.commentList = this.$util.tryParseJson(res.data.c)
						console.log('--------------评论列表-----------------')
						console.log(this.commentList)
						if (this.commentList.length < this.count) {
							this.commenPageStatus = 'nomore'
							this.commenPageOver = true
						} else {
							this.commenPageStatus = 'more'
							this.commenPageOver = false
						}
					} else {
						this.commentApi = true
						this.commenPageStatus = 'nomore'
						this.commenPageOver = true
						console.log('error')
					}
				})
			},

			navBack() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		padding: $group-margin-top $group-margin-left;
		padding-bottom: 109rpx;
		transition: all 0.5s;
	}

	.flex-box {
		display: flex;
		align-items: center;
	}

	.textBox {
		font-size: $group-font;
		color: $group-color-article;
		margin: $group-margin-top 0;
		user-select: text; // 长按复制属性，可能有兼容问题
		caret-color: #00C8BE;
	}

	.imgList {
		display: flex;
		flex-direction: row;
		width: 690rpx;
		// justify-content: space-between;


		image {
			height: 220rpx;
			width: 220rpx;
			margin-right: 15rpx;
			border-radius: 4rpx;
			overflow: hidden;
		}
	}

	.abilityBox {
		padding: 0 44rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: $group-margin-top;
		margin-bottom: $group-margin-top;
		font-size: $group-font;
		color: $group-color-befor;
	}

	.currentIcon {
		color: $group-color-curr;
	}

	.iconfont {
		font-size: $group-font-befor;
		margin-right: 4rpx;
		vertical-align: middle;
	}

	.iconText {
		vertical-align: middle;
	}

	.commentBox {
		padding-top: $group-margin-top;
		border-top: 1rpx rgba($color: $group-color-border, $alpha: 0.8) solid;
	}

	.commentTitle {
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: $group-color-befor;

		.curr-title {
			color: $group-color-article;
			font-weight: 550;
		}
	}

	.replayBox {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		background-color: $group-color-w;
		height: 109rpx;
		border-top: 1rpx solid $group-color-border;
		padding: $group-margin-befor $group-margin-top;
		box-sizing: border-box;

		.inputBox {
			height: 66rpx;
			width: 390rpx;
			border: 1rpx solid $group-color-border;
			border-radius: 6rpx;
			font-size: $group-font;
			color: $group-color-befor;
			padding: 14rpx $group-margin-befor;
			box-sizing: border-box;

			.iconfont {
				position: absolute;
				font-size: $group-font;
				top: 50%;
				margin-top: -0.5em;
			}

			input {
				position: absolute;
				display: inline-block;
				width: 300rpx;
				top: 50%;
				margin-top: -0.8rem;
				margin-left: 56rpx;
				min-height: 1.6rem;
			}
		}

		button {
			position: absolute;
			right: $group-margin-top;
			top: 50%;
			margin-top: -33rpx;
			display: inline-block;
			line-height: 66rpx;
			padding: 0 35rpx;
			font-size: $group-font-befor;
			border-radius: 6rpx;

			&:after {
				border: none;
			}
		}
	}

	.submitBtn {
		right: 180rpx !important;
		color: $group-color-w;
		background-color: #00C8BE;
	}

	.secretBtn {
		color: #8296A0;
		background-color: #CFDCE9;
	}

	.noCommentBox {
		position: relative;
		font-size: $group-font;
		color: $group-color-befor;
		text-align: center;
		line-height: $group-font;
	}

	.noComText {
		margin-top: 59rpx;
	}

	.noComIcon {
		margin-top: 50rpx;
		width: 100%;

		image {
			width: 149rpx;
			height: 196rpx;
		}
	}

	.navBox {

		.iconfont {
			color: $group-color;
			font-size: 34rpx;
		}
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.navMargin {
		margin-right: 66rpx;
	}

	.rightNav {
		margin-right: 50rpx;
	}

	.icon-box {
		display: flex;
		align-items: center;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}

	.isfavorite {
		color: #FFB900 !important;
	}
</style>
