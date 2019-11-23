<template>
	<view>
		<view class="bg-view">
			<view class="share-top" @click="navToPost">
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
				<button class="close-btn" @click="navBack">
					取消
				</button>
			</view>
		</view>

		<qrcode class="hidden-box" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background"
		 :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
		 :usingComponents="true" @result="qrR" />
		<canvas class="hidden-box canvas-box" canvas-id="firstCanvas"></canvas>
		<canvas class="hidden-box upHead-box" canvas-id="upHeadCanvas"></canvas>
	</view>
</template>

<script>
	import qrcode from '@/components/tki-qrcode/tki-qrcode.vue'

	let context = uni.createCanvasContext('firstCanvas')
	let upHead = uni.createCanvasContext('upHeadCanvas')


	// let w = 325
	// let h = 445.5
	let x = 0
	let y = 0
	let r = 30
	let w = 650
	let h = 891

	export default {
		name: 'shareView',
		components: {
			qrcode
		},
		data() {
			return {
				shareName: uni.getStorageSync('userName'),
				shareHead: uni.getStorageSync('userHead'),
				// shareName: '奥术大师',
				// shareHead: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574423321164&di=bbd9ca7a5c229c6ef9923a3fe8f24d75&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20150714%2Ftooopen_sy_133978098392.jpg',
				shareText: '我刚刚在「榴莲」APP成功获得签证…',

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
				loadMake: false, // 组件加载完成后自动生成二维码
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
				],

				posterImg: '',
			}
		},
		methods: {
			navToPost() {
				if (this.posterImg == '') {
					uni.showLoading({
						title: '海报生成中...'
					})
				} else {
					uni.navigateTo({
						url: './sharePoster'
					})
				}
			},

			navBack() {
				uni.navigateBack()
			},

			qrR(res) {
				console.log(res)
				this.src = res
				this.createHb()
			},

			createHb() {
				// context.setStrokeStyle('#FFFFFF')
				context.setStrokeStyle('transparent')
				// 左上角
				context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

				// border-top
				context.moveTo(x + r, y)
				context.lineTo(x + w - r, y)
				context.lineTo(x + w, y + r)
				// 右上角
				context.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

				// border-right
				context.lineTo(x + w, y + h - r)
				context.lineTo(x + w - r, y + h)
				// 右下角
				context.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

				// border-bottom
				context.lineTo(x + r, y + h)
				context.lineTo(x, y + h - r)
				// 左下角
				context.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

				// border-left
				context.lineTo(x, y + r)
				context.lineTo(x + r, y)

				// 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
				context.stroke()
				context.clip()
				//生成背景
				context.setFillStyle('#FFFFFF')
				context.fillRect(0, 0, w, h)

				let src =
					'http://tmp/touristappid.o6zAJsxuJcZsaFhgPrbETZGlPbPc.Uu8vt3LvqosJ4c2b35102913e90135f5ad501930af21.jpg'
				uni.downloadFile({
					url: src,
					success: (res) => {
						context.drawImage(res.tempFilePath, 0, 0, w, 500)
						this.getUpHead()
					},
					fail: (err) => {
						context.drawImage(src, 0, 0, w, 500)
						this.getUpHead()
					}
				})
			},

			//生成up圆形头像
			getUpHead() {
				let img = uni.getStorageSync('userHead')
				console.log(img)
				console.log('头像地址')
				let imgSrc = ''
				uni.downloadFile({
					url: img,
					success: (res) => {
						imgSrc = res.tempFilePath
						console.log(imgSrc)
						this.setTimeImg(imgSrc)
					},
					fail: (err) => {
						//头像
						let url =
							'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572340857731&di=acfd33c7a3844a48d21dedbc2b75d39c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F18%2F20181018162951_kgwzm.thumb.700_0.jpeg'
						this.setTimeImg(url)
					}
				})
			},

			//延时生成图片
			setTimeImg(imgSrc) {
				upHead.arc(100, 100, 100, 0, 2 * Math.PI)
				upHead.clip()
				upHead.drawImage(imgSrc, 0, 0, 200, 200)
				upHead.draw()
				setTimeout(() => {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: 200,
						height: 200,
						destWidth: 200,
						destHeight: 200,
						canvasId: 'upHeadCanvas',
						success: (res) => {
							// 在H5平台下，tempFilePath 为 base64
							context.drawImage(res.tempFilePath, 40, 539, 60, 60)
							this.createPoster()
						},
						fail: (error) => {
							uni.showToast({
								title: '海报生成失败',
								icon: 'none'
							})
						}
					})
				}, 400)
			},

			//最终生成海报
			createPoster() {
				// 二维码图片
				context.drawImage(this.src, 498, 749, 102, 102)

				// 文字
				context.setFillStyle('#587685')
				context.font = '26px Arial'
				context.fillText(uni.getStorageSync('userName'), 120, 576.4)

				context.font = '32px Arial'
				let text = this.shareText
				if (text.length > 17) {
					let data = text.substring(0, 17) + '···'
					context.fillText(data, 40, 661)
				} else {
					context.fillText(text, 40, 661)
				}

				context.font = '24px Arial'
				context.setFillStyle('#666666')
				context.fillText('使用榴莲APP', 40, 775)
				context.fillText('扫一扫查看内容详情', 40, 819)

				context.fillRect(0, 709, w, 1)
				context.setFillStyle('#CFDCE9')
				context.stroke()
				//生成画布
				context.draw()

				// let that = this

				setTimeout(() => { //延时生成图片
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: w,
						height: h,
						destWidth: w,
						destHeight: h,
						canvasId: 'firstCanvas',
						success: (res) => {
							uni.hideLoading()
							// 在H5平台下，tempFilePath 为 base64
							this.posterImg = res.tempFilePath
							console.log(this.posterImg)
							uni.setStorageSync('posterImg',this.posterImg)
							this.val = ''
							uni.hideLoading()
						}
					})
				}, 300)
			},
		},
		onLoad() {
			this.val = 'https://www.baidu.com'
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

	.canvas-box {
		width: 650px;
		height: 891px;
	}

	.upHead-box {
		width: 200px;
		height: 200px;
	}
</style>
