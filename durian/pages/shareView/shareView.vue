<template>
	<view>
		<view class="bg-view">
			<view class="share-top">
				<image class="share-img" src="/static/image/interest/bg_lx.png" mode="aspectFill"></image>
				<view class="share-info">
					<view class="user-box">
						<view class="share-user">
							<image class="head-img" :src="shareHead" mode="aspectFill"></image>
							<text>{{shareName}}</text>
						</view>
						<view class="share-text">{{shareText}}</view>
					</view>
					<image class="code-img" :src="src" mode="aspectFit"></image>
				</view>
			</view>

			<view class="bottom-box">
				<view class="bottom-title">分享</view>
				<view class="bottom-list">
					<view class="bottom-list-box" v-for="(item,index) in shareList" :key="index">
						<view class="bottom-img">
							<image :src="item.imgSrc" mode="aspectFit"></image>
						</view>
						<view>{{item.name}}</view>
					</view>
				</view>
				<button class="close-btn">
					取消
				</button>
			</view>
		</view>

		<qrcode class="hidden-box" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background"
		 :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
		 :usingComponents="true" @result="qrR" />
	</view>
</template>

<script>
	import qrcode from '@/components/tki-qrcode/tki-qrcode.vue'

	export default {
		name: 'shareView',
		components: {
			qrcode
		},
		data() {
			return {
				width: '', //屏幕宽度
				height: '', //屏幕高度

				// shareName: uni.getStorageSync('userName'),
				// shareHead: uni.getStorageSync('userHead'),
				shareName: '奥术大师',
				shareHead: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574423321164&di=bbd9ca7a5c229c6ef9923a3fe8f24d75&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20150714%2Ftooopen_sy_133978098392.jpg',
				shareText: '我刚刚在「榴莲」APP发了…12312321',

				/* 二维码 */
				val: '', // 要生成的二维码值
				size: '300', // 二维码大小
				unit: 'px', // 单位
				background: '#FFFFFF', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				// icon: '/static/logo.png', // 二维码图标
				// iconsize: 30, // 二维码图标大小
				// lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				/* end */

				shareList: [{
						name: '聊天',
						imgSrc: '/static/image/icon/icon-mes.png',
					},
					{
						name: '发现',
						imgSrc: '/static/image/icon/icon-mes.png',
					},
					{
						name: '微信',
						imgSrc: '/static/image/icon/icon-mes.png',
					},
					{
						name: '朋友圈',
						imgSrc: '/static/image/icon/icon-mes.png',
					}
				]
			}
		},
		methods: {
			qrR(res) {
				console.log(res)
				this.src = res
			},
			getPx(e) {
				return this.width / 750 * e
			}
		},
		onReady() {
			this.val = 'https://www.baidu.com'
			uni.getSystemInfo({
				success: (res) => {
					this.width = res.screenWidth
					this.height = res.screenHeight
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.bg-view {
		background-color: rgba($color: #010101, $alpha: .5);
		width: 100%;
		height: 100vh;
	}

	.share-top {
		position: absolute;
		top: 60rpx;
		left: 50rpx;
		overflow: hidden;
		background-color: $group-color-w;
		width: 650rpx;
		height: 740rpx;
		border-radius: 40rpx;

	}

	.share-img {
		width: 100%;
		height: 500rpx;
		display: block;
	}

	.share-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333333;
		margin-top: 40rpx;
		font-size: 32rpx;
		line-height: 40rpx
	}

	.share-user {
		display: flex;
		align-items: center;
		color: #587685;
		font-size: 26rpx;
	}

	.share-text {
		margin-top: 33rpx;
		font-size: 32rpx;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.head-img {
		overflow: hidden;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.user-box {
		width: 418rpx;
		margin-left: 40rpx;
	}

	.hidden-box {
		position: fixed;
		top: -1000px;
	}

	.code-img {
		width: 102rpx;
		height: 102rpx;
		margin-right: 50rpx;
	}

	.bottom-box {
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		width: 100%;
		height: 458rpx;
		background-color: $group-color-w;
		font-size: 30rpx;
		color: #999999;
		border-radius: 40rpx 40rpx 0 0;
		padding-top: 40rpx;
		line-height: 42rpx;

		.button-hover {
			opacity: .7;
		}
	}

	.bottom-title {
		color: #333333;
		text-align: center;
	}

	.bottom-list {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 77rpx;
		font-size: 26rpx;
		padding-bottom: 30rpx;
		border-bottom: 20rpx solid #F9F9F9;
	}

	.bottom-list-box {
		text-align: center;
		margin: 0 35rpx;
	}

	.bottom-img {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 100rpx;
		height: 100rpx;
		margin-bottom: 14rpx;
		background-color: rgba($color: #F2F5F7, $alpha: .5);
		border: 1rpx solid rgba($color: #CFDCE9, $alpha: .5);

		image {
			width: 42rpx;
			height: 42rpx;
		}
	}

	.close-btn {
		background-color: $group-color-w;
		width: 100%;
		line-height: 98rpx;
		border-radius: 0;

		&:after {
			border: none;
		}
	}
</style>
