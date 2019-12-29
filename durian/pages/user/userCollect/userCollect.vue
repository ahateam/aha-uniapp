<template>
	<view>
		<nav-bar :back="false" fontColor="#333333" class="nav-box" title="收藏">
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
		</nav-bar>
		<!-- <view :style="{'padding-top': getNavHeight()}"></view> -->
		<view class="content-list">
			<view style="padding: 15rpx 0;" v-for="(item,index) in contentList" @click="navToContent(item)" :key="index">
				<right-video v-if="item.posting.postingType == constData.groupType[1].key||item.posting.postingType == constData.groupType[3].key"
				 :item="item" :src="constData.oss + getJsonParse(item)" :listLength="getJsonParse(item,true)" :tagType="tagCurrtent == 0?'new':''"></right-video>
				<only-text :item="item" v-else-if="item.posting.postingType == constData.groupType[0].key" :tagType="tagCurrtent == 0?'new':''"></only-text>
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
			<view class="no-list" v-if="contentList.length == 0">
				<image src="/static/image/user/scwk.png" mode="aspectFit"></image>
				<view style="margin-top: 81rpx;">啥都没有啊</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import rightVideo from '@/components/find/rightVideo.vue'
	import onlyText from '@/components/find/onlyText.vue'

	export default {
		components: {
			navBar,
			rightVideo,
			onlyText
		},
		data() {
			return {
				constData: this.$constData,
				count: 10,
				offset: 0,
				page: 1,
				pageStatus: 'onload',
				contentList: [],
				userInfo: {}
			};
		},
		methods: {

			getJsonParse(item, e) {
				if (e) {
					return this.$util.tryParseJson(item.posting.postingDate).length
				} else if (item.posting.postingType == this.$constData.groupType[3].key) {
					return this.$util.tryParseJson(item.posting.postingDate)
				} else if (item.posting.postingType == this.$constData.groupType[1].key) {
					return this.$util.tryParseJson(item.posting.postingDate)[0]
				}
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

			search() {
				let cnt = {
					moduleId: this.$constData.module, // String 模块
					sort: true, // boolean 是否倒序
					userId: this.userInfo.userId, // long <选填> 用户id
					count: this.count, // int 
					offset: this.offset, // int
					text: this.text, // String <选填> 文本内容
				}
				this.contentList = []
				this.getPostingList(cnt)
			},

			navBack() {
				uni.navigateBack()
			},

			change(index) {
				if (this.contentList[index].goodsType == this.$constData.goodsType[1].key) {
					this.contentList[index].goodsType = this.$constData.goodsType[2].key
				}
			},

			changeEnd(index) {
				if (this.contentList[index].goodsType == this.$constData.goodsType[2].key) {
					this.contentList[index].goodsType = this.$constData.goodsType[1].key
				}
			},

			tryDataList(list) {
				if (list.length < this.count) {
					this.pageOver = true
					this.pageStatus = 'nomore'
				} else {
					this.pageStatus = 'more'
					this.pageOver = false
				}
				this.contentList = this.contentList.concat(list)
				console.log(this.contentList)
			},

			getUserFavoriteList(cnt) {
				this.$api.getUserFavoriteList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let list = this.$util.tryParseJson(res.data.c)
						console.log(list)
						this.tryDataList(list)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			shareBtn(item, index) {
				this.shareData = item
				this.shareIndex = index

				uni.navigateTo({
					url: '/pages/shareView/shareView'
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
		},

		onLoad() {
			this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))

			let cnt = {
				userId: this.userInfo.userId, // Long 用户id
				count: this.count, // Integer 
				offset: this.offset, // Integer 
				// isShowShare: 1, // Byte <选填> 是否加载分享等信息
			};
			this.getUserFavoriteList(cnt)
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		display: flex;
		align-items: center;
		padding: 50rpx 30rpx 0;
		font-size: $group-font-befor;
	}

	.search-input-box {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		background-color: $group-color-search;
		width: 600rpx;
		height: 70rpx;
		padding: 0 30rpx;
		border-radius: 4rpx;
		margin-right: 30rpx;
	}

	.search-icon {
		font-size: 28rpx;
		margin-right: 15rpx;
	}

	.search-input {
		font-size: 28rpx;
		flex: 1;
	}

	.back-text {
		color: $group-color;
		padding: 20rpx 0;
	}

	.content-list {
		padding: 40rpx;
	}

	.title {
		position: relative;
		font-size: $group-font;
		color: $group-color;
		line-height: $group-font-line;
		margin-top: 30rpx;
		box-sizing: border-box;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; //需要显示时文本行数
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.no-list {
		padding-top: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #999999;
		font-size: 30rpx;

		image {
			width: 205rpx;
			height: 299rpx;
		}
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

	// .iconfont {
	// 	font-size: $group-font-befor;
	// 	margin-right: $group-margin-s;
	// 	vertical-align: middle;
	// }

	.icon-box {
		display: flex;
		align-items: center;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}

	.iconText {
		vertical-align: middle;
	}
</style>
