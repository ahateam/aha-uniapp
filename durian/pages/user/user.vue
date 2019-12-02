<template>
	<view>
		<view :style="{'padding-top':`calc(${getNavHeight()} - 20rpx)` }"></view>
		<view class="left-radius"></view>
		<view class="right-radius"></view>
		<view class="user-box">
			<image class="head-bg" src="/static/image/user/icon_xstx.png" mode="scaleToFill"></image>
			<image class="user-head" :src="imgSrc" mode="aspectFill"></image>
		</view>

		<view class="user-name">
			{{name}}
		</view>

		<view class="btns-box">
			<view class="money-box">
				<image src="/static/image/user/icon_zhaq.png" mode="aspectFill"></image>
				<text>平台币{{money}}</text>
			</view>
			<view class="editor-box" @click="navToUser">
				<image src="/static/image/user/icon_xggrxx.png" mode="aspectFill"></image>
				<text>修改个人资料</text>
			</view>
		</view>

		<view class="content-List">
			<view class="content-box" style="flex-wrap: wrap;" @click="navToView('/pages/user/userApply/userApply')">
				<view class="left-box">
					<image class="left-icon" src="/static/image/user/icon_wdsq.png" mode="aspectFill"></image>
					<text>我的申请</text>
				</view>
				<image class="right-icon" src="/static/image/user/icon_enter.png" mode="aspectFill"></image>
				<view class="apply-info">
					<view class="apply-text">
						<view>{{applyTitle}}</view>
						<view style="margin-top: 16rpx;">最新进展：<text class="apply-hsty">{{applyHsty}}</text></view>
					</view>
					<view class="apply-progress">
						<progress-bar :progress_txt="hstyNumber"></progress-bar>
					</view>
				</view>
			</view>
			<view class="content-box" :class="{'curr-box':listIndex==index}" v-for="(item,index) in contentList" :key="index"
			 @touchstart="currIndex(index)" @touchend="listIndex = -1" @click="navToView(item.path)">
				<view class="left-box">
					<image class="left-icon" :src="item.iconSrc" mode="aspectFill"></image>
					<text>{{item.text}}</text>
				</view>
				<image class="right-icon" src="/static/image/user/icon_enter.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import progressBar from '@/components/chocolate-progress-bar/chocolate-progress-bar.vue'

	export default {
		name: 'user',
		components: {
			progressBar
		},
		name: 'user',
		data() {
			return {
				userInfo: {},
				imgSrc: '',
				name: '',
				money: 0,
				contentList: [{
						text: '我的商品',
						iconSrc: '/static/image/user/icon_wdsp.png',
						path: '/pages/user/userShop/userShop'
					},
					{
						text: '账户安全',
						iconSrc: '/static/image/user/icon_zhaq.png',
						path: '/pages/user/userSafe/userSafe'
					},
					{
						text: '帮助中心',
						iconSrc: '/static/image/user/icon_bzzx.png',
						path: '/pages/user/helpCenter/helpCenter'
					},
					{
						text: '收藏',
						iconSrc: '/static/image/user/icon_scdlr.png',
						path: ''
					}
				],

				listIndex: -1,

				applyTitle: 'Monash大学计算机专业申请',
				applyHsty: '签字已提交',
				hstyNumber: '25'
			}
		},
		methods: {
			currIndex(index) {
				this.listIndex = index
			},

			navToUser() {
				uni.navigateTo({
					url: '/pages/user/userData/userData'
				})
			},

			navToView(url) {
				if (url) {
					uni.navigateTo({
						url: url
					})
				}
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},
		},
		onShow() {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			console.log(userInfo)
			if (userInfo) {
				this.name = userInfo.userName
				this.imgSrc = userInfo.userHead
			}
		}
	}
</script>

<style lang="scss" scoped>
	.padding-top-box {
		padding-top: calc(64px - 20rpx);
	}

	.head-bg {
		position: relative;
		width: 208rpx;
		height: 208rpx;
	}

	.icon-fanhui {
		font-size: 33rpx;
		position: absolute;
		left: 29rpx;
	}

	.user-head {
		position: absolute;
		width: 184rpx;
		height: 184rpx;
		border-radius: 50%;
	}

	.user-box {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.left-radius {
		position: absolute;
		top: calc(64px + 84rpx);
		left: -65rpx;
		opacity: .2;
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
		background: linear-gradient(90deg, #FFE092, #FFBE59);
	}

	.right-radius {
		position: absolute;
		top: calc(64px - 39rpx);
		right: 0;
		opacity: .1;
		width: 70rpx;
		height: 140rpx;
		border-radius: 70rpx 0 0 70rpx;
		background: linear-gradient(90deg, #FFD5D5, #FFABAB);
	}

	.user-name {
		text-align: center;
		font-size: 34rpx;
		color: #333333;
		line-height: 48rpx;
		margin-top: 32rpx;
	}

	.btns-box {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx;
		margin-top: 40rpx;
		line-height: 48rpx;

		image {
			width: 26rpx;
			height: 26rpx;
			margin-right: 10rpx;
		}
	}

	.money-box {
		display: flex;
		margin-right: 50rpx;
		align-items: center;
		justify-content: center;
		width: 180rpx;
		border-radius: 25rpx;
		background-color: #FFF8E5;
		box-sizing: border-box;
		border: 1rpx solid #FFF8E5;
		color: #FFA405;
	}

	.editor-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 180rpx;
		box-sizing: border-box;
		border-radius: 25rpx;
		border: 1rpx solid #00C8BE;
		color: #00C8BE;
	}

	.content-List {
		margin-top: 52rpx;
		padding: 0 40rpx;
		font-size: 30rpx;
		color: #333333;
	}

	.content-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 34rpx 0 34rpx 20rpx;
		border-bottom: 1rpx solid rgba($color: $group-color-border, $alpha: 0.7);
	}

	.left-box {
		display: flex;
		align-items: center;
	}

	.left-icon {
		width: 35rpx;
		height: 35rpx;
		margin-right: 40rpx;
	}

	.right-icon {
		width: 12rpx;
		height: 21rpx;
	}

	.apply-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 596rpx;
		height: 120rpx;
		margin: 30rpx 0 0 74rpx;
		padding: 0 44rpx 0 24rpx;
		background-color: rgba($color: $group-color-search, $alpha: .36);
		border: 1rpx solid rgba($color: #CFDCE9, $alpha: .36);
	}

	.apply-text {
		font-size: 24rpx;
		line-height: 33rpx;
		color: $group-color;
	}

	.apply-hsty {
		color: #00C8BE;
	}

	.curr-box {
		background-color: rgba($color: #999999, $alpha: .1);
	}
</style>
