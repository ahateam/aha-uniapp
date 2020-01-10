<template>
	<view>
		<view v-if="pageStatus != 'onload'">
			<view class="top-box">
				<image class="top-bg" src="/static/image/task/bg_rwmx.png" mode="aspectFill"></image>
				<view class="top-content">
					<image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image>
					<view class="top-info-box">
						<view class="top-name">{{task.userName}}</view>
						<view class="top-time"><text class="iconfont iconshengri"></text><text>{{getDateTime(task.brithday)}}</text></view>
					</view>
				</view>
				<view class="top-head">
					<image class="top-head-bg" src="/static/image/user/icon_xstx.png" mode="aspectFit"></image>
					<image class="top-head-img" :src="constData.oss + task.userHead" mode="aspectFill"></image>
				</view>
			</view>

			<view class="content-box">
				<view class="content-title">
					<view class="content-title-text">任务明细</view>
					<image class="content-title-bg" src="/static/image/task/icon_bg_y.png" mode="aspectFit"></image>
				</view>

				<view class="auto-box-white space-box">
					<view class="left-title">任务分类</view>
					<view class="right-info">{{constData.taskType[task.taskType].name}}</view>
				</view>

				<view class="auto-box-white space-box">
					<view class="left-title">任务名称</view>
					<view class="right-info">{{task.taskName}}</view>
				</view>

				<view class="auto-box-white no-border">
					<view class="left-title">任务描述</view>
					<view class="right-info" style="margin-top: 29rpx;">{{task.taskDescribe}}</view>
				</view>

				<view class="block-box">
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">任务发布者</view>
						<view class="right-info bottom-font">{{task.userName}}</view>
					</view>
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">完成时间</view>
						<view class="right-info bottom-font">{{getDateTime(task.finishDate)}}</view>
					</view>
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">最新状态</view>
						<view class="right-info bottom-font" style="color: #24D4D0;">{{taskStatus}}</view>
					</view>
					<view class="auto-box-gray space-box" v-if="task.fileData.length > 0">
						<view class="left-title bottom-font">共享文件</view>
						<view class="right-info bottom-font">{{task.taskData.name}}</view>
						<view class="data-box space-box" v-for="(item,index) in task.fileData" :key="index" @click="downFile(item)">
							<view>
								<view class="data-title">{{item.name}}</view>
								<view class="data-size">{{item.size}}</view>
							</view>
							<image class="data-icon" src="/static/image/icon/icon_docx.png" mode="aspectFit"></image>
						</view>
						<view class="data-img-list">
							<view class="data-img-box" v-for="(item,index) in task.imgData" :key="index" @tap="watchImg(index)" :class="{'no-margin':getIndex(index)}">
								<image :src="constData.oss + item" mode="aspectFill"></image>
							</view>
						</view>
					</view>

					<view class="auto-box-gray" style="border: none;padding-bottom: 15rpx;" v-if="task.taskStatus > constData.taskStatus[2].key&&task.translateFileData.length > 0||task.taskStatus < constData.taskStatus[2].key">
						<view class="left-title bottom-font">提交完成文件</view>
						<view class="data-img-list">
							<view class="data-img-box" v-for="(item,index) in task.translateFileData" :key="index" :class="{'no-margin':getIndex(index)}">
								<image :src="constData.oss + item" mode="aspectFill"></image>
								<view class="iconfont iconguanbi" @click.stop="delImg(index)" v-if="task.taskStatus < constData.taskStatus[2].key"></view>
							</view>
							<view :class="{'no-margin':task.translateFileData.length == 2||task.translateFileData.length == 5||task.translateFileData.length == 8}"
							 class="iconfont iconjia data-img-box" @tap="upLoad" v-if="task.taskStatus < constData.taskStatus[2].key"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="fixed-btn" v-if="task.taskStatus < constData.taskStatus[2].key">
				<next-btn title="确定" @click="changeTask"></next-btn>
			</view>
		</view>

		<loading :status="pageStatus"></loading>
	</view>
</template>

<script>
	import NextBtn from '@/components/NextBtn/NextBtn.vue'
	import Loading from '@/components/Loading/Loading.vue'

	export default {
		components: {
			NextBtn,
			Loading
		},
		data() {
			return {
				constData: this.$constData,
				pageStatus: 'onload',

				task: {},
				taskStatus: ''
			}
		},
		methods: {
			changeTask() {
				if (this.task.translateFileData.length > 0) {
					let cnt = {
						taskId: this.task.taskId, // Long 任务id
						taskStatus: this.$constData.taskStatus[2].key, // Byte <选填> 任务状态
						translateFileData: JSON.stringify(this.task.translateFileData), // String <选填> 翻译文件地址
					}
					this.updateTaskByTaskId(cnt)
				} else {
					uni.showToast({
						title: '请上传完成文件',
						icon: 'none'
					})
				}

			},

			delImg(index) {
				this.task.translateFileData.splice(index, 1)
			},

			upLoad() {
				let tiemr = new Date()
				let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate() + '/';
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (res) => {
						let imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr = this.userInfo.userId + '/' + address + tiemr.getTime() + str
						// nameStr =  res.tempFilePaths[0]
						console.log(nameStr)
						uni.showLoading({
							title: '上传中'
						})
						this.upLoadImg(imageSrc, nameStr)
					}
				})
			},

			// 上传至服务器
			upLoadImg(imageSrc, nameStr) {
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
						this.task.translateFileData.push(nameStr)
						console.log(this.task)
					},
					fail: (err) => {
						uni.hideLoading()
						console.log('uploadImage fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						})
					}
				})
			},

			watchImg(index) {
				let list = []
				this.task.imgData.map((item, index) => {
					list.push(this.$constData.oss + item)
				})
				uni.previewImage({
					current: index,
					urls: list,
					longPressActions: {
						itemList: ['保存图片'],
						success: (data) => {
							if (data.tapIndex == 0) {
								uni.saveImageToPhotosAlbum({
									filePath: list[data.index],
									success: (res) => {
										uni.showToast({
											title: '保存成功！',
											icon: 'none'
										})
									}
								})
							}
						},
						fail: (err) => {
							console.log(err.errMsg);
						}
					}
				});
			},

			downFile(item) {
				uni.showLoading({
					title: '下载中...'
				})
				uni.downloadFile({
					url: this.$constData.oss + item.url,
					success: (res) => {
						uni.hideLoading()
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							success: (res) => {
								console.log('打开文档成功');
							},
							fail(err) {
								console.log(err)
							}
						});
					},
					fail: (err) => {
						uni.showModal({
							title: err
						})
					}
				})
			},

			getDateTime(time) {
				return this.$commen.getNewDate(time)
			},

			getIndex(index) {
				if ((index + 1) % 3 == 0 && index != 0) {
					return true
				}
			},

			navBack() {
				uni.navigateBack()
			},

			updateTaskByTaskId(cnt) {
				this.$api.updateTaskByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '../myTask'
						})
						uni.showToast({
							title: '已提交文件',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			getChangeRecordList(cnt) {
				this.$api.getChangeRecordList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c).list
						console.log('状态栏')
						console.log(arr)
						this.taskStatus = arr[arr.length - 1].stepName
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			getUserByTaskId(cnt) {
				this.$api.getUserByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c)
						if (obj.publishUser.imgData) {
							obj.publishUser.imgData = this.$util.tryParseJson(obj.publishUser.imgData)
						} else {
							obj.publishUser.imgData = []
						}

						if (obj.publishUser.fileData) {
							obj.publishUser.fileData = this.$util.tryParseJson(obj.publishUser.fileData)
						} else {
							obj.publishUser.fileData = []
						}

						if (obj.publishUser.translateFileData) {
							obj.publishUser.translateFileData = this.$util.tryParseJson(obj.publishUser.translateFileData)
						} else {
							obj.publishUser.translateFileData = []
						}

						this.task = { ...this.task,
							...obj.publishUser
						}
						this.pickUpUser = obj.pickUpUser
						if (this.task.taskStatus == 0) {
							this.btnName = '撤回'
						} else {
							this.btnName = '付款'
						}
						this.pageStatus = 'succ'
					} else {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						})
					}
				})
			}
		},

		onLoad(res) {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			this.userInfo = userInfo
			let cnt = {
				taskId: res.id, // Long 任务id
				userId: userInfo.userId
			}
			this.getUserByTaskId(cnt)

			let cnt1 = {
				taskId: res.id, // Long 任务id
				count: 50, // Integer 
				offset: 0, // Integer 
			}
			this.getChangeRecordList(cnt1)
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.top-box {
		position: relative;
		height: 400rpx;
		width: 100%;
	}

	.top-bg {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
	}

	.top-content {
		position: relative;
	}

	.back-icon {
		display: block;
		width: 33rpx;
		height: 33rpx;
		padding: 70rpx 40rpx 30rpx 20rpx;
	}

	.top-info-box {
		margin-top: 31rpx;
		color: $group-color-w;
		padding-left: 50rpx;
	}

	.top-name {
		font-size: 44rpx;
	}

	.top-time {
		display: flex;
		align-items: center;
		font-size: $group-font;
		line-height: 37rpx;
		margin-top: 20rpx;

		.iconshengri {
			font-size: 30rpx;
			margin-right: 20rpx;
		}
	}

	.top-head {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		right: 42rpx;
		bottom: 113rpx;
		text-align: center;

		.top-head-bg {
			width: 136rpx;
			height: 136rpx;
		}

		.top-head-img {
			position: absolute;
			top: 50%;
			margin-top: -60rpx;
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
	}

	.content-box {
		position: relative;
		top: -70rpx;
		background-color: #FFFFFF;
		width: 100%;
		border-radius: 40rpx 40rpx 0 0;
		padding-top: 8rpx;
	}

	.content-title {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #587685;
		font-size: $group-font;
		line-height: 37rpx;
	}

	.content-title-text {
		position: absolute;
		top: 22rpx;
	}

	.content-title-bg {
		width: 229rpx;
		height: 93rpx;
	}

	.auto-box-white {
		position: relative;
		padding: 35rpx 50rpx;
		font-size: $group-font-befor;

		&:after {
			content: '';
			position: absolute;
			bottom: 1rpx;
			left: 50%;
			margin-left: -315rpx;
			width: 630rpx;
			border-bottom: 1rpx solid $group-color-border;
		}
	}

	.no-border {
		&:after {
			border: none;
		}
	}

	.space-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left-title {
		color: #666666;
	}

	.right-info {
		color: #333333;
	}

	.block-box {
		display: block;
		margin: 20rpx auto 0;
		width: 690rpx;
		padding: 0 15rpx;
		background-color: #F8FAFB;
	}

	.auto-box-gray {
		position: relative;
		padding: 30rpx 15rpx;
		width: 660rpx;
		font-size: $group-font-befor;
		border-bottom: 1rpx dotted rgba($color: #CFDCE9, $alpha: .5);
		flex-wrap: wrap;
	}

	.bottom-font {
		font-size: $group-font;
	}

	.data-box {
		width: 630rpx;
		margin: 30rpx 15rpx 0;
		padding: 20rpx;
		background-color: $group-color-w;
		border: 1rpx solid #CFDCE9;
		border-radius: 6rpx;
	}

	.data-title {
		font-size: 28rpx;
		color: $group-color;
		line-height: 30rpx;
	}

	.data-size {
		font-size: 24rpx;
		margin-top: 12rpx;
		line-height: 20rpx;
	}

	.data-icon {
		width: 80rpx;
		height: 80rpx;
	}

	.data-img-list {
		position: relative;
		display: flex;
		align-items: center;
		left: -5rpx;
		padding: 20rpx 0 0;
		flex-wrap: wrap;

		.iconjia {
			color: rgba($color: #587685, $alpha: .5);
			font-size: 50rpx;
			text-align: center;
			line-height: 200rpx;
		}
	}



	.data-img-box {
		position: relative;
		margin: 0 15rpx 15rpx 0;
		width: 200rpx;
		height: 200rpx;
		border-radius: 6rpx;
		border: 1rpx solid $group-color-befor;
		overflow: hidden;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.no-margin {
		margin-right: 0;
	}

	.fixed-btn {
		// position: fixed;
		// bottom: 0;
		width: 100%;
	}

	.loading-view {
		position: fixed;
		z-index: 3;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.iconguanbi {
		position: absolute;
		right: 8rpx;
		top: 8rpx;
		width: 38rpx;
		height: 38rpx;
		border-radius: 50%;
		background-color: #EE455A;
		color: $group-color-w;
		font-size: 17rpx;
		line-height: 38rpx;
		text-align: center;
	}
</style>
