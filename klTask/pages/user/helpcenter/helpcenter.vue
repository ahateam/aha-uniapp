<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">帮助中心</view>
		</nav-bar>
		<view class="top">产品重要功能说明</view>

		<view class="content-list" v-for="(item,index) in list" :key="index" @click="navToInfo(item)">
			<view class="con-list-left">
				<view class="img-font-box">
					<image class="con-list-img" src="/static/image/icon/help_bg.png" mode="widthFix"></image>
					<view class="img-font" :style="index + 1 > 9?'width:90rpx':''">{{index + 1}}</view>
					<view class="clip-box"></view>
				</view>
				<view class="text-box">{{item.tag}}</view>
			</view>
			<image class="jian-tou" src="/static/image/icon/icon_enter.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				count: 10,
				offset: 0,
				page: 1,
				pageStatus: 'onload',
				pageOver: false,

				list: []
			}
		},
		methods: {
			navToInfo(item) {
				console.log(item)
				uni.navigateTo({
					url: `./helpInfo?id=${item.autoReplyId}`
				})
			},

			navBack() {
				uni.navigateBack()
			},

			getAutoReplyList(cnt) {
				this.$api.getAutoReplyList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let list = this.$util.tryParseJson(res.data.c)
						if (list.length < this.count) {
							this.pageStatus = 'nomore'
							this.pageOver = true
						} else {
							this.pageStatus = 'more'
							this.pageOver = false
						}
						this.list = this.list.concat(list)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			}
		},
		onLoad() {
			let cnt = {
				// tag: tag, // String <选填> 问题
				type: 0, // Byte 类型（0:帮助 / 1:智能客服）
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			this.getAutoReplyList(cnt)
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		color: #333333;
		font-size: 30rpx;
		height: 42rpx;
		padding: 40rpx 0 10rpx 60rpx;
	}

	.content-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #F2F5F7;
		margin: 30rpx;
		overflow: hidden;
		transition: all .3s;
		
		&:active{
			opacity: .6;
		}
	}

	.con-list-img {
		width: 120rpx;
		height: 100rpx;
		display: block;
	}

	.con-list-left {
		display: flex;
		align-items: center;
	}

	.text-box {
		position: relative;
		z-index: 1;
		height: 42rpx;
		line-height: 42rpx;
		color: $group-color;
		font-size: 30rpx;
		padding-left: 13rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.jian-tou {
		display: block;
		width: 12rpx;
		height: 21rpx;
		padding-right: 30rpx;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.view-title {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	.img-font-box {
		position: relative;
		color: $group-color;
		font-size: 50rpx;
	}

	.img-font {
		position: absolute;
		top: 0;
		line-height: 100rpx;
		text-align: center;
		width: 90%;
	}

	.clip-box {
		position: absolute;
		bottom: 0;
		left: 32rpx;
		width: 0;
		height: 0;
		border: 100rpx solid;
		border-left: 88rpx solid;
		border-color: transparent transparent $group-color-search;
	}
</style>
