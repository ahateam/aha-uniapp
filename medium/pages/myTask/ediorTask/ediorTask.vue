<template>
	<view>
		<view class="succ-view" v-if="pageStatus == 'succ'">
			<nav-bar :back="false">
				<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
				<view class="view-title">我的任务</view>
				<view slot="right" class="del-text" @click="delBoxShow = true">删除</view>
			</nav-bar>
			<view style="margin-top: 10rpx;"></view>
			<data-input :inputHidden="aptitudesStatus||delBoxShow" disabled v-model="type" :hiddenIcon="true" title="任务分类"></data-input>

			<data-input :inputHidden="aptitudesStatus||delBoxShow" v-model="title" :hiddenIcon="true" title="任务名称"></data-input>

			<data-textarea :inputHidden="aptitudesStatus||delBoxShow" v-model="taskInfo" :hiddenIcon="true" placeholder="请输入任务描述"
			 title="任务描述"></data-textarea>

			<choice-input :value="aptitudes" title="任务接收者所需资质" :hiddenIcon="true" @click="openAts"></choice-input>

			<data-input :inputHidden="aptitudesStatus||delBoxShow" v-model="taskInfo" :hiddenIcon="true" title="和接收者共享的文件"></data-input>

			<view class="up-file">
				<view class="auto-title">文件上传</view>
				<uni-swipe-action>
					<uni-swipe-action-item :options="options" v-for="(item,index) in fileList" :key="index" btnMargin="20rpx 0 0 20rpx"
					 @click="delFile(index)">
						<view class="up-file-btn file-list">
							<view>
								<view class="file-name">{{item.name}}</view>
								<view class="file-size">{{item.size}}</view>
							</view>
							<image src="/static/image/icon/icon_docx.png" mode="aspectFit"></image>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<button class="up-file-btn" @click="upFile">点击上传</button>
			</view>


			<view class="up-file" style="padding-right: 0;">
				<view class="auto-title" style="margin-bottom: 30rpx;">其他文件</view>
				<button class="uploding-img" @click="upImgStar" v-if="imgList.length == 0">
					<image src="/static/image/icon/icon_pzsc.png" mode="aspectFit"></image>
					<view>上传照片</view>
				</button>
				<view class="img-list" v-else>
					<view class="img-list-box" v-for="(item,index) in imgList" :key="index">
						<image :src="item" mode="aspectFill"></image>
						<view class="iconfont iconguanbi" @click.stop="delImg(index)"></view>
					</view>
					<view class="iconfont iconjia img-list-box" @click="upImgStar"></view>
				</view>
			</view>

			<data-input :inputHidden="aptitudesStatus||delBoxShow" v-model="remark" :hiddenIcon="true" title="特别提醒"></data-input>

			<view class="bottom-btn">
				<next-btn @click="nextBtn"></next-btn>
			</view>
		</view>



		<l-file ref="lFile" @up-success="onSuccess"></l-file>

		<uni-popup :show="aptitudesStatus" type="bottom" @change="changePopup">
			<view class="aptitudes-list">
				<view class="aptitudes-border" :class="[{'no-border':index == aptitudesList.length - 2},{'bottom-popup-box':index == aptitudesList.length - 1},{'curr-box':index == aptitudesCurr}]"
				 @click="choiceAptitudes(item)" v-for="(item,index) in aptitudesList" :key="index" @touchstart="changeAts(index)"
				 @touchend="aptitudesCurr = -1">{{item.qualName}}</view>
			</view>
		</uni-popup>

		<uni-popup :show="delBoxShow" type="center" @change="changePopup">
			<view class="popup-box">
				<view>确定删除任务吗</view>
				<view class="popup-btn-box">
					<button class="succ-btn" @click="delTask">确定</button>
					<button class="colse-btn" @click="delBoxShow = false">再想想</button>
				</view>
			</view>
		</uni-popup>

		<view class="loading-view" :style="pageStatus == 'succ'?'opacity:0;pointer-events: none;':''">
			<loading></loading>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import DataInput from '@/components/dataInput/DataInput.vue'
	import ChoiceInput from '@/components/dataInput/ChoiceInput.vue'
	import DataTextarea from '@/components/dataInput/DataTextarea.vue'
	import NextBtn from '@/components/NextBtn/NextBtn.vue'
	import lFile from '@/components/l-file/l-file.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import Loading from '@/components/Loading/Loading.vue'

	export default {
		name: 'summary',
		components: {
			navBar,
			DataInput,
			ChoiceInput,
			uniPopup,
			DataTextarea,
			NextBtn,
			lFile,
			uniSwipeAction,
			uniSwipeActionItem,
			Loading
		},

		computed: {
			title: {
				get() {
					return this.$store.state.task.taskInfo.taskName
				},
				set(value) {
					this.$store.commit('updateTitle', value)
					this.$store.commit('resSetTaskInfo')
				}
			},

			taskInfo: {
				get() {
					return this.$store.state.task.taskInfo.taskDescribe
				},
				set(value) {
					this.$store.commit('updateTaskDescribe', value)
				}
			},

			aptitudes() {
				return this.$store.state.task.taskInfo.qualName
			},

			imgList() {
				return this.$store.state.task.taskInfo.imgData
			},

			fileList() {
				return this.$store.state.task.taskInfo.fileData
			},

			remark: {
				get() {
					return this.$store.state.task.taskInfo.otherDescribe
				},
				set(value) {
					this.$store.commit('updateOtherDescribe', value)
					this.$store.commit('resSetTaskInfo')
				}
			},

			aptitudesList() {
				return this.$store.state.task.qualiList
			}
		},
		data() {
			return {
				pageStatus: 'loading',

				type: '',
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#EE455A',
						fontSize: '26rpx'
					}
				}],
				formType: '',
				aptitudesCurr: -1,
				aptitudesStatus: false,
				delBoxShow: false
			}
		},
		methods: {
			delTask() {
				let cnt = {
					taskId: this.$store.state.task.taskInfo.taskId, // Long 任务id
				}
				this.$api.deletDurianTaskByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/myTask/myTask'
						})
						uni.showToast({
							title: '删除成功!'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			changeAts(index) {
				this.aptitudesCurr = index
			},

			choiceAptitudes(item) {
				this.$store.commit('updateQualifications', item)
				this.aptitudesStatus = false
			},

			openAts() {
				this.aptitudesStatus = true
			},

			upFile() {
				let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
				let time = new Date()

				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: this.$constData.oss,
					front: `${userInfo.userId}/${time.getFullYear()}${time.getMonth() * 1 + 1}${time.getDate()}`,
				});
			},

			onSuccess(res) {
				// console.log('上传成功回调', JSON.stringify(res));
				// console.log('文件上传的地址不包含url')
				// console.log(res.frontFileName)
				// console.log('文件上传的完整地址，包含url')
				// console.log(res.fileUrl)
				if (res.frontFileName != 'index.html') {
					let fileName = res.frontFileName.substr(res.frontFileName.lastIndexOf('/') + 1)
					let obj = {
						name: fileName,
						url: res.frontFileName,
						size: res.fileSize
					}
					this.$store.commit('updateFileData', obj)
				}
			},

			delFile(index) {
				this.$store.commit('delFileData', index)
			},

			delImg(index) {
				this.imgList.splice(index, 1)
			},

			upImgStar() {
				let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
				let tiemr = new Date()
				let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate() + '/';
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (res) => {
						let imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr = userInfo.userId + '/' + address + tiemr.getTime() + str
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
						'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
						'OSSAccessKeyId': 'LTAI4FqngBZhahjCXBPUDwSu',
						'success_action_status': '200',
						//让服务端返回200,不然，默认会返回204
						'signature': '5n38HJgZyzC55khl0sPEf2oATtQ=',
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading()
						uni.showToast({
							title: '上传成功',
							icon: 'success'
						})
						//只管这个变量
						this.$store.commit('updateImgData', this.$constData.oss + nameStr)
					},
					fail: (err) => {
						console.log('uploadImage fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						})
					}
				})
			},

			nextBtn() {
				if (this.$store.state.task.taskInfo.taskName && this.$store.state.task.taskInfo.otherDescribe) {
					uni.navigateTo({
						url: `../../index/summary/createTask?ediotr=1`
					})
				} else {
					uni.showToast({
						title: '请将资料填写完整',
						icon: 'none'
					})

				}
			},

			changePopup(e) {
				if (!e.show) {
					this.aptitudesStatus = false
					this.delBoxShow = false
				}
			},

			navBack() {
				uni.navigateBack()
			},

			getUserByTaskId(cnt) { // 取出全部屬性
				this.$api.getUserByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c).publishUser
						obj.finishDate = this.$commen.getFullDate(obj.finishDate)
						if (obj.imgData) {
							obj.imgData = this.$util.tryParseJson(obj.imgData)
						}
						if (obj.fileData) {
							obj.fileData = this.$util.tryParseJson(obj.fileData)
						}
						obj.finishDate = this.$commen.getFullDate(obj.finishDate)
						console.log(obj.finishDate)
						let {
							userHead,
							userName,
							brithday,
							...newObj
						} = obj
						this.$store.dispatch('editorTask', newObj).then((res) => {
							this.type = this.$constData.taskType[newObj.taskType].name
							this.pageStatus = 'succ'
							this.$store.commit('resSetTaskInfo')
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

		},
		onLoad(res) {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			let cnt = {
				taskId: res.id, // Long 任务id
				userId: userInfo.userId, // Long <选填> 用户id
			}
			this.getUserByTaskId(cnt)
		},
	}
</script>

<style lang="scss" scoped>
	button {
		&:after {
			border: none;
		}
	}

	.button-hover {
		opacity: .7;
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

	.del-text {
		font-size: 34rpx;
		color: $group-color;
		margin-right: 30rpx;
	}

	.aptitudes-list {
		border-radius: 40rpx 40rpx 0 0;
		overflow: hidden;
		background-color: #FFF;
		color: #333333;
		font-size: 36rpx;
		text-align: center;
		line-height: 120rpx;
	}

	.aptitudes-border {
		border-bottom: 1rpx solid $group-color-border;
	}

	.no-border {
		border: none;
	}

	.curr-box {
		background-color: #F2F5F7;
	}

	.bottom-popup-box {
		color: #999999;
		border-top: 20rpx solid $group-color-search;
		border-bottom: none;
	}

	.bottom-btn {
		margin-top: 80rpx;
	}

	.uploding-img {
		display: flex;
		margin: 0 auto;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 220rpx;
		width: 690rpx;
		background-color: $group-color-search;
		border-radius: 4rpx;
		color: $group-color;
		font-size: $group-font-befor;

		image {
			width: 39rpx;
			height: 31rpx;
			margin-bottom: 20rpx;
		}
	}

	.up-file {
		padding: 30rpx 30rpx 10rpx;
		font-size: $group-font-befor;
	}

	.auto-title {
		margin-left: 10rpx;
		color: #666666;
	}

	.up-file-btn {
		margin-top: 30rpx;
		width: 690rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: $group-font-befor;
		text-align: center;
		background-color: $group-color-search;
		color: $group-color;
		border-radius: 4rpx;
		box-sizing: border-box;
	}

	.file-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		font-size: 28rpx;
		line-height: 30rpx;

		image {
			width: 79rpx;
			height: 79rpx;
		}
	}

	.file-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.file-size {
		margin-top: 12rpx;
		font-size: 24rpx;
		color: $group-color-befor;
		line-height: 20rpx;
		text-align: left;
	}

	.img-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		box-sizing: border-box;

		.iconjia {
			color: $group-color;
			font-size: 50rpx;
			line-height: 220rpx;
			text-align: center;
		}
	}

	.img-list-box {
		position: relative;
		width: 220rpx;
		height: 220rpx;
		border-radius: 6rpx;
		border: 1rpx solid $group-color-befor;
		margin: 0 15rpx 15rpx 0;
		box-sizing: border-box;
		overflow: hidden;

		image {
			width: 220rpx;
			height: 220rpx;
			border-radius: 6rpx;
			display: block;
		}

		.iconguanbi {
			position: absolute;
			right: 10rpx;
			top: 10rpx;
			width: 38rpx;
			height: 38rpx;
			border-radius: 50%;
			background-color: #EE455A;
			color: $group-color-w;
			font-size: 17rpx;
			line-height: 38rpx;
			text-align: center;
		}
	}

	.popup-box {
		width: 600rpx;
		height: 322rpx;
		box-sizing: border-box;
		padding: 70rpx 40rpx 40rpx;
		font-size: $group-font-befor;
		line-height: 42rpx;
		background-color: $group-color-w;
		border-radius: 4rpx;
		text-align: center;
	}

	.popup-btn-box {
		display: flex;
		margin-top: 90rpx;
		line-height: 80rpx;

		button {
			width: 250rpx;
			margin: 0 20rpx;
			box-sizing: border-box;
			color: $group-color;
			border-radius: 0;

			&:after {
				border: none;
			}
		}
	}

	.succ-btn {
		background-color: #00C8BE;
		color: $group-color-w !important;
	}

	.colse-btn {
		background: #FFFFFF;
		border: 1rpx solid $group-color-befor;
	}

	.loading-view {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 1;
		transition: all .8s;
	}

	.succ-view {
		// transition: all 1s;
		// opacity: 0;
	}
</style>
