<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">帮助中心</view>
		</nav-bar>
		<view class="title-box">{{title}}</view>
		<view class="text-box">{{text}}</view>
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
				title: '',
				text: ''
			};
		},
		methods: {
			getAutoReply(cnt) {
				this.$api.getAutoReply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c)
						this.title = obj.tag
						this.text = obj.context
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			navBack() {
				uni.navigateBack()
			}
		},
		onLoad(res) {
			let cnt = {
				autoReplyId: res.id, // Long 自动回复编号
			}
			this.getAutoReply(cnt)
		}
	}
</script>

<style lang="scss" scoped>
	.view-title {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.title-box {
		font-size: 35rpx;
		padding: 20rpx $group-margin-left 0;
	}

	.text-box {
		padding: $group-margin-top $group-margin-left;
		font-size: $group-font;
	}
</style>
