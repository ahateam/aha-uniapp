<template>
	<view class="page">
		<view class="nav-box flex-box">
			<image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">发布任务</view>
		</view>

		<data-input v-model="name" title="任务名称" placeholder="任务名称"></data-input>

		<data-textarea v-model="text" title="任务描述" placeholder="任务描述"></data-textarea>

		<view class="auto-title">
			<view class="right-title">拍照上传</view>
			<text>*</text>
		</view>
		<view class="tip-info">为了更合理的估价,请您上传相关照片,特别是房屋修理和搬运的工作。</view>
		<view class="img-list-box flex-box">
			<image
				v-for="(item, index) in imgList"
				:key="index"
				class="list-img"
				:style="(index + 1) % 3 == 0 ? 'margin-right:0' : ''"
				:src="ossSrc + item"
				mode="aspectFill"
			></image>
			<view class="add-btn flex-box" :style="(imgList.length + 1) % 3 == 0 ? 'margin-right:0' : ''" @click="addImg">
				<image src="/static/image/icon/icon_add_b.png" mode="aspectFit"></image>
			</view>
		</view>

		<view class="bottom-btn" @click="nextBtn">下一步</view>
	</view>
</template>

<script>
import DataInput from '@/components/dataInput/DataInput.vue';
import DataTextarea from '@/components/dataInput/DataTextarea.vue';

export default {
	components: {
		DataInput,
		DataTextarea
	},
	computed: {
		name: {
			get() {
				return this.$store.state.task.taskInfo.title;
			},
			set(val) {
				this.$store.commit('updateTitle', val);
			}
		},
		text: {
			get() {
				return this.$store.state.task.taskInfo.taskDescribe;
			},
			set(val) {
				this.$store.commit('updateTaskDescribe', val);
			}
		},
		imgList() {
			return this.$store.state.task.taskInfo.imgData;
		}
	},
	data() {
		return {
			ossSrc: this.$constData.oss
		};
	},
	methods: {
		nextBtn() {
			uni.navigateTo({
				url: './taskPrice'
			});
		},
		navBack() {
			uni.navigateBack();
		},
		addImg() {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
			let tiemr = new Date();
			let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate() + '/';
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success: res => {
					let imageSrc = res.tempFilePaths[0];
					let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'));
					let nameStr = userInfo.userId + '/' + address + tiemr.getTime() + str;
					// nameStr =  res.tempFilePaths[0]
					console.log(nameStr);
					uni.showLoading({
						title: '上传中'
					});
					this.upLoadImg(imageSrc, nameStr);
				}
			});
		},

		upLoadImg(imageSrc, nameStr) {
			uni.uploadFile({
				url: this.$constData.oss,
				filePath: imageSrc,
				fileType: 'image',
				name: 'file',
				formData: {
					name: nameStr,
					key: nameStr,
					policy: 'eyJleHBpcmF0aW9uIjoiMjAzMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
					OSSAccessKeyId: 'LTAI4FqngBZhahjCXBPUDwSu',
					success_action_status: '200',
					//让服务端返回200,不然，默认会返回204
					signature: 'Wf9Vmi5iwd2rmEH26ERwh8qnVd4='
				},
				success: res => {
					console.log(res);
					uni.hideLoading();
					uni.showToast({
						title: '上传成功',
						icon: 'none'
					});
					//只管这个变量
					this.$store.commit('updateImgData', nameStr);
				},
				fail: err => {
					uni.hideLoading();
					console.log('uploadImage fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	background-color: $group-color-bg;
	min-height: 100vh;
	padding-bottom: 1px;
	box-sizing: border-box;
}

.view-title {
	font-size: 36rpx;
	line-height: 88rpx;
	color: #ffffff;
}

.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	padding-top: var(--status-bar-height);
	justify-content: center;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.auto-title {
	padding: 30rpx 30rpx 0rpx;
	font-size: $group-font-befor;
	line-height: $group-font-befor-line;
	color: #ffffff;

	text {
		color: #ffcd34;
	}
}

.right-title {
	display: inline-block;
	margin-right: 10rpx;
}

.tip-info {
	padding: 30rpx 40rpx 0;
	font-size: $group-font;
	line-height: 36rpx;
	color: #ffffff;
}

.img-list-box {
	flex-wrap: wrap;
	padding: 30rpx;
}

.list-img {
	width: 220rpx;
	height: 220rpx;
	margin: 0 15rpx 15rpx 0;
	border-radius: 6rpx;
	box-sizing: border-box;
}

.add-btn {
	width: 220rpx;
	height: 220rpx;
	background-color: #ffffff;
	margin: 0 15rpx 15rpx 0;
	justify-content: center;
	border-radius: 6rpx;
	box-sizing: border-box;

	image {
		width: 50rpx;
		height: 50rpx;
	}
}

.bottom-btn {
	background-color: #0f1b07;
	border-radius: 6rpx;
	margin: 50rpx auto 20rpx;
	width: 690rpx;
	line-height: 102rpx;
	color: #ffffff;
	font-size: 36rpx;
	text-align: center;
}
</style>
