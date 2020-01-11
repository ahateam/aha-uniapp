<template>
	<view class="contents">
		<nav-bar :back="false" class="navBox">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view>合同签名</view>
		</nav-bar>
		<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
		 @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
		</canvas>
		<view class="caozuo">
			<view class="chongqian" @tap='clearClick'>
				重签
			</view>
			<view class="over" @tap="overSign">
				完成签名
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	let content = null;
	let touchs = [];
	let canvasw = 0;
	let canvash = 0;
	let _that;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = res.windowWidth;
		},
	})
	export default {
		name: '',
		components: {
			navBar
		},
		data() {
			return {
				contractInfo: {},
				toUserInfo: this.$util.tryParseJson(uni.getStorageSync('toUserInfo')),

				imgUrl: '',

				isEnd: false // 是否签名
			}
		},

		methods: {
			navBack() {
				uni.navigateBack()
			},

			overSign() {
				if (this.isEnd) {
					uni.showLoading({
						title: '生成签名中...'
					})
					uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',
						destWidth: 400,
						destHeight: 400,
						success: (res) => {
							//打印图片路径
							console.log(res.tempFilePath)
							console.log('完成签名')
							//设置图片
							uni.showLoading({
								title: '上传签名中...'
							})
							this.upLoadOss(res.tempFilePath)

							// uni.saveImageToPhotosAlbum({
							// 	filePath: res.tempFilePath,
							// 	success: () => {
							// 		uni.showToast({
							// 			title: '已保存至本地',
							// 			icon: 'none'
							// 		})
							// 	}
							// })
						}
					})
				} else {
					uni.showToast({
						title: '请先完成签名',
						icon: "none",
						duration: 1500,
						mask: true
					})
				}

			},

			upLoadOss(imageSrc) {
				let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
				let tiemr = new Date()
				let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate() + '/';
				let str = imageSrc.substr(imageSrc.lastIndexOf('.'))
				let nameStr = userInfo.userId + '/' + address + tiemr.getTime() + str

				uni.uploadFile({
					url: this.$constData.oss,
					filePath: imageSrc,
					fileType: 'image',
					name: 'file',
					formData: {
						name: nameStr,
						'key': nameStr,
						'policy': 'eyJleHBpcmF0aW9uIjoiMjAzMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
						'OSSAccessKeyId': 'LTAI4FqngBZhahjCXBPUDwSu',
						'success_action_status': '200',
						//让服务端返回200,不然，默认会返回204
						'signature': 'Wf9Vmi5iwd2rmEH26ERwh8qnVd4=',
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading()
						uni.showToast({
							title: '上传成功',
							icon: 'none'
						})
						//只管这个变量
						this.imgUrl = this.$constData.oss + nameStr

						let cnt = this.contractInfo
						this.createContractApi(cnt)

						// let cnt = {
						// 	studentId: userInfo.userId, // Long 学生编号
						// 	contractId: this.id, // Long 合同编号
						// 	url: this.$constData.oss + nameStr, // String 学生签名图片地址
						// }
						// this.setStudentAutograph(cnt)
					},
					fail: (err) => {
						console.log('uploadImage fail', err);
						uni.showToast({
							title: '上传失敗',
							icon: 'none'
						})
					}
				})
			},

			createContractApi(cnt) {
				this.$api.createContract(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let id = this.$util.tryParseJson(res.data.c).conId
						let cnt1 = {
							id: id, // Long 编号
							interautoImg: this.imgUrl, // String <选填> 中介签名图片地址
							// studentautoImg: studentautoImg, // String <选填> 学生签名图片地址
						}
						this.setpPDF(cnt1)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			// 画布的触摸移动开始手势响应
			start: function(event) {
				// console.log(event)
				console.log("触摸开始" + event.changedTouches[0].x)
				console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y
				}
				// console.log(point)
				touchs.push(point);

			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				// console.log(point)
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				console.log("触摸结束" + e)
				// 设置为已经签名
				this.isEnd = true
				// 清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}

			},

			// 画布的触摸取消响应
			cancel: function(e) {
				console.log("触摸取消" + e)
			},

			// 画布的长按手势响应
			tap: function(e) {
				console.log("长按手势" + e)
			},

			error: function(e) {
				console.log("画布触摸错误" + e)
			},

			//绘制
			draw: function(touchs) {
				console.log(touchs[0], touchs[1])
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			//清除操作
			clearClick: function() {
				// 设置为未签名
				this.isEnd = false
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
			},

			setpPDF(cnt) {
				this.$api.setpPDF(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
				let message = this.tim.createTextMessage({
					to: String(this.toUserInfo.userId),
					conversationType: this.TIM.TYPES.CONV_C2C,
					payload: {
						text: '合同生成后将自动发送!'
					}
				});
				this.$store.commit('pushCurrentMessageList', message)
				// 2. 发送消息
				let promise = this.tim.sendMessage(message);
				promise.then(function(imResponse) {
					// 发送成功
					console.log(imResponse);

				}).catch(function(imError) {
					// 发送失败
					console.warn('sendMessage error:', imError);
				});
				uni.navigateBack({
					delta: 2
				})
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(res) {
			this.contractInfo = this.$store.state.contract.contractInfo
			console.log(this.contractInfo)
			_that = this
			//获得Canvas的上下文
			content = uni.createCanvasContext('firstCanvas')
			//设置线的颜色
			content.setStrokeStyle("#333")
			//设置线的宽度
			content.setLineWidth(5)
			//设置线两端端点样式更加圆润
			content.setLineCap('round')
			//设置两条线连接处更加圆润
			content.setLineJoin('round')
		},
	}
</script>

<style>
	.ts {
		color: #FF485D;
		font-size: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		padding-left: 20rpx;
	}

	canvas {
		background-color: #DDDDDD;
		width: 700rpx;
		margin: 0 25rpx;
		height: calc(100vw - 50rpx);
	}

	.contents {
		padding-top: 20rpx;
		padding-bottom: 100rpx;
		box-sizing: border-box;
		height: 100vh;
	}

	#signatureImg {
		background-color: #EEEEEE;
	}

	.caozuo {
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		width: 750rpx;
		margin-top: 15rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
	}

	.caozuo view {
		width: 330rpx;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
		border-radius: 6rpx;
	}

	.caozuo view:active {
		background-color: #CCCCCC;
		color: #333333;
	}

	.chongqian {
		background-color: #FF8F58;
	}

	.over {
		background-color: #0599D7;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}
</style>
