<template>
	<view>
		<view class="search-box">
			<view class="search-input-box">
				<text class="iconfont icon-iconfonticonfontsousuo1 search-icon"></text>
				<input focus type="text" class="search-input" v-model="text" :placeholder="newInfo" confirm-type="search" @confirm="search" />
			</view>
			<view class="back-text" @click="navBack">取消</view>
		</view>

		<view class="content-list">
			<view style="padding: 15rpx 0;" v-for="(item,index) in contentList" @click="navToContent(item)" :key="index">
				<right-video v-if="item.posting.postingType == constData.groupType[1].key||item.posting.postingType == constData.groupType[3].key"
				 :item="item" :src="constData.oss + getJsonParse(item)" :listLength="getJsonParse(item,true)"></right-video>
				<only-text :item="item" v-else-if="item.posting.postingType == constData.groupType[0].key"></only-text>
			</view>
		</view>
	</view>
</template>

<script>
	import rightVideo from '@/components/find/rightVideo.vue'
	import onlyText from '@/components/find/onlyText.vue'

	export default {
		components: {
			rightVideo,
			onlyText
		},
		data() {
			return {
				constData: this.$constData,
				text: '',
				newInfo: '期末考通关秘籍',

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

			getPostingList(cnt) {
				this.$api.getPostingList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let list = this.$util.tryParseJson(res.data.c)
						this.tryDataList(list)
						uni.stopPullDownRefresh()
					} else {
						console.log('error')
					}
				})
			},
		},

		onLoad() {
			this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
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
</style>
