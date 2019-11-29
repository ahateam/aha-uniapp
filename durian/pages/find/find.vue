<template>
	<view class="body">
		<view :style="{'padding-top': getNavHeight()}"></view>

		<view class="topBox auto-margin">
			<view class="title_box" @click="navTest">
				发现
			</view>
			<view class="searchBox" @click="navToAdd">
				<text class="iconfont icon-iconfonticonfontsousuo1 searchIcon"></text>
				<text class="iconText" style="vertical-align: bottom;">发现新鲜事</text>
			</view>
		</view>
		<!-- 导航栏 -->
		<view class="navBox auto-margin">
			<view class="navList" v-for="(item,index) in navList" :key="index" :style="index==1?'margin-right:0;':''" @click="changeNav(index)">
				<image :src="item.imgSrc" mode="aspectFill"></image>
				<view class="mask" :class="{displayBox:index == navCurrtent}"></view>
				<view class="navTitle">
					{{item.name}}
				</view>
				<!-- 選中样式 -->
				<view class="currNav" :class="{displayBox:index == navCurrtent}">
					<image src="/static/image/find/icon_xt.png" mode="aspectFit"></image>
				</view>
				<!-- the end -->
			</view>
		</view>

		<!-- 标签栏 -->
		<view class="tagBox auto-margin">
			<view class="tagsList" :class="{currTag:index == navList[navCurrtent].tagCurrtent}" v-for="(item,index) in navList[navCurrtent].tagList"
			 :key="index" :style="index != 0?'margin-left:30rpx':''" @click="changeTag(index)">{{item.name}}</view>
		</view>

		<view>
			<view class="listBox" :class="{autoList:index != 0}" v-for="(item,index) in contentList" :key="index" @click="navToContent(item)">
				<trans-video :item="item" v-if="item.posting.postingType == constData.groupType[3].key"></trans-video>

				<img-box v-if="item.posting.postingType == constData.groupType[1].key" :item="item" :imgList="$util.tryParseJson(item.posting.postingDate)"></img-box>

				<only-text :item="item" v-if="item.posting.postingType == constData.groupType[0].key"></only-text>

				<view class="abilityBox" @click.stop>
					<view class="icon-box">
						<image src="/static/image/find/icon_llrs.png" mode="aspectFit"></image>
						<text class="iconText">{{item.posting.postingPageView}}</text>
					</view>

					<view class="icon-box" :class="{currentIcon:item.isAppraise}" @click="createAppraise(item,index)">
						<image :src="item.isAppraise?'/static/image/find/icon_z_p.png':'/static/image/find/icon_z.png'" mode="aspectFit"></image>
						<text class="iconText">{{item.appraiseCount}}</text>
					</view>

					<view class="icon-box" @click="shareBtn(item,index)">
						<image src="/static/image/find/icon_zf.png" mode="aspectFit"></image>
						<text class="iconText">{{item.posting.postingShareNumber}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="add-btn" @click="navToAdd">
			<view>
				<!-- <image src="/static/image/user/icon_xggrxx.png" mode="aspectFit"></image> -->
				<view class="iconfont icon-xie"></view>
				<view>
					发帖
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ImgBox from '@/components/find/ImgBox.vue'
	import transVideo from '@/components/find/TransVideo.vue'
	import onlyText from '@/components/find/onlyText.vue'

	export default {
		components: {
			ImgBox,
			transVideo,
			onlyText
		},
		data() {
			return {
				constData: this.$constData,
				count: 10,
				offset: 0,
				page: 1,


				navList: [{
						name: '校内向外',
						imgSrc: '/static/image/find/bg_xnxw.png',
						tagList: [{
								name: '只看校内'
							},
							{
								name: '只看校外'
							}
						],
						tagCurrtent: 0,
					},
					{
						name: '热点',
						imgSrc: '/static/image/find/bg_rd.png',
						tagList: [{
								name: '最新'
							},
							{
								name: '精选'
							}
						],
						tagCurrtent: 0,
					}
				],
				navCurrtent: 0,

				contentList: [],

				/* 分享 */
				shareBox: false,
				shareData: {},
				shareIndex: 0,
				/* end */

				userInfo: this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			}
		},
		methods: {
			navToAdd() {
				uni.navigateTo({
					url: '/pages/find/createView/createView'
				})
			},

			createAppraise(item, index) {
				let id = item.posting.postingId
				if (this.contentList[index].isAppraise) {
					this.delAppraise(id, index)
				} else {
					this.contentList[index].isAppraise = true
					this.createUpvote(index, id)
				}
			},

			delAppraise(id, index) {
				let cnt = {
					ownerId: id,
					userId: this.userInfo.userId
				}
				this.$api.delAppraise(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentList[index].isAppraise = false
						this.contentList[index].appraiseCount -= 1
					} else {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					}
				})
			},

			createUpvote(index, id) {
				let cnt = {
					ownerId: id, // Long 内容编号/评论编号
					userId: this.userInfo.userId, // Long 用户编号
					value: this.$constData.appraise[0].key //Byte 状态
				}
				this.$api.createAppraise(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentList[index].upvoteStatus = true
						this.contentList[index].appraiseCount += 1
					} else {
						uni.showToast({
							title: '服务器错误！',
							icon: 'none'
						})
					}
				})
			},

			navTest() {
				uni.navigateTo({
					url: '/pages/shareView/shareView'
				})
			},

			shareBtn(item, index) {
				this.shareData = item
				this.shareIndex = index

				uni.navigateTo({
					url: '/pages/shareView/shareView'
				})
			},

			wxShare() {
				let item = this.shareData
				let index = this.shareIndex
				let imgSrc = ''
				if (item.posting.postingType == this.$constData.groupType[1].key) {
					imgSrc = item.posting.postingDate[0]
				} else {
					imgSrc =
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573727184965&di=94d6c6315581a3056ec469a499361e49&imgtype=0&src=http%3A%2F%2Fimgs.qunarzz.com%2Fp%2Ftts1%2F1603%2Fa3%2F5b79a7b9f9989ff7.jpg'
				}

				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: `http://weapp.datanc.cn/kkqt/app/android/${this.$constData.version}/kkqt.apk`,
					title: "表揚表揚TA",
					summary: item.posting.postingTextDate,
					imageUrl: imgSrc,
					success: (res) => {
						uni.showToast({
							title: '分享成功！'
						})
						let cnt1 = {
							userId: this.userInfo.userId, // Long 用户id
							ownerId: item.posting.postingId, // Long 内容id
						}
						this.createUserShare(cnt1, index)
					},
					fail: (err) => {
						console.log(err)
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
						this.contentList[index].isShare = true
						this.contentList[index].posting.postingShareNumber += 1
					} else {
						console.log('错误')
					}
				})
			},

			changeNav(index) {
				this.navCurrtent = index
			},

			changeTag(index) {
				this.navList[this.navCurrtent].tagCurrtent = index
			},

			newTime(time) {
				return this.$commen.getNewDate(time)
			},
			navToContent(item) {
				if (item.posting.postingType == this.$constData.groupType[3].key) {
					uni.navigateTo({
						url: `/pages/find/videoView/videoView?id=${item.posting.postingId}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/find/imgView/imgView?id=${item.posting.postingId}`
					})
				}

			},

			getPostingList(cnt) {
				this.$api.getPostingList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.contentList = this.$util.tryParseJson(res.data.c)
						console.log(this.contentList)
						uni.stopPullDownRefresh()
					} else {
						console.log('error')
					}
				})
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},
		},

		onLoad() {
			let cnt = {
				moduleId: this.$constData.module, // String 模块
				sort: true, // boolean 是否倒序
				userId: this.userInfo.userId, // long <选填> 用户id
				// type: type, // Byte <选填> 类型
				// status: status, // Byte <选填> 状态编号
				// power: power, // Byte <选填> 权力
				// upUserId: upUserId, // Long <选填> 上传用户编号
				// upChannelId: upChannelId, // Long <选填> 上传专栏编号
				// tags: tags, // JSONObject <选填> 标签
				count: this.count, // int 
				offset: this.offset, // int
			}
			this.getPostingList(cnt)
		},

		onPullDownRefresh() {
			let cnt = {
				moduleId: this.$constData.module, // String 模块
				sort: true, // boolean 是否倒序
				// type: type, // Byte <选填> 类型
				// status: status, // Byte <选填> 状态编号
				// power: power, // Byte <选填> 权力
				// upUserId: upUserId, // Long <选填> 上传用户编号
				// upChannelId: upChannelId, // Long <选填> 上传专栏编号
				// tags: tags, // JSONObject <选填> 标签
				userId: this.userInfo.userId, // Long <选填> 当前用户编号
				count: this.count, // int 
				offset: this.offset, // int
			}
			this.contentList = []
			this.getPostingList(cnt)
		}
	}
</script>

<style lang="scss" scoped>
	// @font-face {
	// 	font-family: 'appleFont';
	// 	src: url('~@/static/font/appleFont.ttf'), ;
	// }
	.auto-margin {
		padding: 0 $group-margin-left;
	}

	.topBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title_box {
		font-size: $group-font-big;
		line-height: $group-font-big-line;
		font-weight: $group-title-weight;
		color: #333333;
	}

	.searchBox {
		width: 231rpx;
		line-height: 40rpx;
		box-sizing: border-box;
		display: inline-block;
		padding: 10rpx 20rpx;
		background-color: $group-color-search;
		border-radius: 4rpx;
		font-size: 28rpx;
		color: $group-color-befor;


		.searchIcon {
			font-size: $group-font;
			margin-right: $group-margin-s;
			vertical-align: middle;
		}
	}

	.iconText {
		vertical-align: middle;
	}

	.navBox {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 120rpx;
		margin-top: 34rpx;
		margin-bottom: 24rpx;
	}

	.navList {
		position: relative;
		flex: 1;
		color: $group-color-w;
		margin-right: 20rpx;

		image {
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 6rpx;
			overflow: hidden;
		}
	}

	.beforCurr {
		position: absolute;
		right: 45rpx;
		top: -9rpx;
		width: 0;
		height: 0;
		border: 5rpx solid;
		border-color: transparent transparent #F7E6B6;
		transition: all 0.3s;
		opacity: 0;
	}

	.currNav {
		position: absolute;
		right: $group-margin-s;
		top: -5rpx;
		width: 40rpx;
		height: 40rpx;
		transition: all 0.3s;
		opacity: 0;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.displayBox {
		opacity: 1 !important;
	}

	.mask {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #64BCCC, $alpha: 0.6);
		border-radius: 6rpx;
	}

	.navTitle {
		position: relative;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: $group-color-w;
		padding: 40rpx;
	}

	.listBox {
		padding: $group-margin-top $group-margin-left;
	}

	.autoList {
		border-top: 20rpx rgba($color: $group-color-border, $alpha: 0.8) solid;
	}

	.abilityBox {
		padding: 0 44rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 16rpx;
		font-size: $group-font;
		color: #999999;
	}

	.currentIcon {
		color: #FE5A6E;
	}

	.iconfont {
		font-size: $group-font-befor;
		margin-right: $group-margin-s;
		vertical-align: middle;
	}

	.iconText {
		vertical-align: middle;
	}

	.tagBox {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.tagsList {
		position: relative;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: #333333;
		padding: 4rpx 20rpx;
		padding-bottom: 26rpx;

		&:after {
			content: '';
			position: absolute;
			left: 50%;
			bottom: 0;
			transition: all 0.3s;
			width: 0;
			height: 0;
			margin-left: -10rpx;
			transition: all .3;
			background-color: #24D4D0;
			border-radius: 25rpx;
		}
	}

	.currTag {
		&:after {
			width: 20rpx;
			height: 6rpx;
		}
	}

	.add-btn {
		position: fixed;
		bottom: 50rpx;
		right: 50rpx;
		width: 110rpx;
		height: 110rpx;
		background: linear-gradient(225deg, #01E9DE, #00C8BE);
		border-radius: 50%;
		box-shadow: 0 2rpx 36rpx 0 #00C8BE;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;

		.icon-xie {
			font-size: 30rpx;
			margin: 0;
		}
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


	.hiddenBox {
		position: absolute;
		top: -10000px;
	}
</style>
