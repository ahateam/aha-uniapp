<template>
	<view>
		<navBar :back="false" type="transparent"></navBar>
		<view class="padding-top-box"></view>
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
				<text>平台币400</text>
			</view>
			<view class="editor-box" @click="navToUser">
				<image src="/static/image/user/icon_xggrxx.png" mode="aspectFill"></image>
				<text>修改个人资料</text>
			</view>
		</view>

		<view class="content-List">
			<view class="content-box" v-for="(item,index) in contentList" :key="index" @click="navToView(item.path)">
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
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		components: {
			navBar
		},
		name: 'user',
		data() {
			return {
				imgSrc: 'https://img-blog.csdn.net/20180629153527977?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0OTg1NzE1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
				name: '土耳其的鸟',
				contentList: [{
						text: '我的申请',
						iconSrc: '/static/image/user/icon_wdsq.png',
						path: ''
					},
					{
						text: '我的商品',
						iconSrc: '/static/image/user/icon_wdsp.png',
						path: ''
					},
					{
						text: '账户安全',
						iconSrc: '/static/image/user/icon_zhaq.png',
						path: '/pages/user/userSafe/userSafe'
					},
					{
						text: '帮助中心',
						iconSrc: '/static/image/user/icon_bzzx.png',
						path: ''
					},
					{
						text: '收藏',
						iconSrc: '/static/image/user/icon_scdlr.png',
						path: ''
					}
				]
			}
		},
		methods: {
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
		right: -70rpx;
		opacity: .1;
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
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
		width: 22rpx;
		height: 22rpx;
	}
</style>
