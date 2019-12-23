<template>
	<view class="body">
		<navBar :back="false" class="navBox">
			<view slot="left" class="iconfont icon-fanhui backIcon" @click="navBack"></view>
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
			<view class="commentTitle">
				大家在说
			</view>
			<view v-if="commentList.length > 0">
				<comment :comment="commentList" @zan="zan"></comment>
			</view>
			<view v-if="commentList.length == 0&&commentApi" class="noCommentBox">
				<view class="noComIcon">
					<image src="/static/image/find/bg-ly.png" mode="aspectFit"></image>
					<view class="noComText">
						爱我就留言，不用跪榴莲。
					</view>
				</view>
			</view>
		</view>

		<!-- 评论栏 -->
		<view class="replayBox" :style="opacity">
			<view class="inputBox">
				<text class="iconfont icon-xie"></text>
				<input type="text" v-model="replayText" placeholder="我也说两句…" />
			</view>
			<button class="submitBtn" @click="submit">发表</button>
		</view>

		<uni-load-more :status="pageStatus" v-if="commentApi == false||commentList.length > 0&&commentApi == true"></uni-load-more>
		<sheet isShowBottom @closeBottom="closeSheet" @changeMoney="changeMoney" v-if="sheetStatus"></sheet>
	</view>
</template>

<script>
	import userBox from '@/components/find/userBox.vue'
	import comment from '@/components/find/comment.vue'
	import sheet from '@/components/bbh-sheet/bottomSheet.vue'
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	export default {
		components: {
			userBox,
			comment,
			sheet,
			navBar,
			uniLoadMore
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
				page: 1,
				pageOver: false,
				pageStatus: 'loading',

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

				// 评论
				commentList: [], //评论列表
				replayText: '', //回复文本

				sheetStatus: false,
				money: 5, //打赏价格

				//收藏
				isfavorite: false, //是否收藏

				userInfo: this.$util.tryParseJson(uni.getStorageSync('userInfo'))
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
				orderDesc: true, // Boolean 是否排序
				count: this.count, // int 
				offset: this.offset, // int 
			}
			this.getReplyList(cnt1)
		},

		methods: {
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
						uni.showToast({
							title: '已收藏'
						})
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
							this.commentList[index].isAppraise = true
							this.commentList[index].appraiseCount += 1
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

			submit() {
				// let userId = uni.getStorageSync('userId')
				// if (userId == '' || userId == '1234567890') {
				// 	uni.showToast({
				// 		title: '登录后可评论',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
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
				};
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

						let userHead = {
							userHead: this.userInfo.userHead
						}

						userHead = JSON.stringify(userHead)

						let data = {
							user: {
								name: this.userInfo.userName,
								ext: userHead
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
							duration: 1000
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

			getReplyList(cnt) {
				this.$api.getReplyList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.commentApi = true
						this.commentList = this.$util.tryParseJson(res.data.c)
						console.log(this.commentList)
						if (this.commentList.length < this.count) {
							this.pageStatus = 'nomore'
							this.pageOver = true
						} else {
							this.pageStatus = 'more'
						}
					} else {
						this.commentApi = true
						this.pageStatus = 'nomore'
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
		color: $group-color-article;
		font-weight: 550;
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
			width: 560rpx;
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
				width: 480rpx;
				top: 50%;
				margin-top: -0.7rem;
				margin-left: 56rpx;
			}
		}
	}

	.submitBtn {
		position: absolute;
		right: $group-margin-top;
		top: 50%;
		margin-top: -33rpx;
		display: inline-block;
		line-height: 66rpx;
		padding: 0 $group-margin-befor;
		font-size: $group-font-befor;
		color: $group-color-w;
		border-radius: 6rpx;
		background-color: $group-color-curr;

		&:after {
			border: none;
		}
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

	.backIcon {
		position: absolute;
		left: 0;
		margin-left: 29rpx;
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
