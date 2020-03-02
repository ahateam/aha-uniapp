<template>
	<view id="page">
		<image class="view-bg" src="/static/image/bg_c.png" mode="aspectFill"></image>
		<view style="position: relative;">
			<view class="nav-box flex-box">
				<image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image>
				<view class="view-title">发布任务</view>
			</view>
			<view class="content-box">
				<view class="auto-address flex-box">
					<view class="address-left flex-box">
						<view class="left-dot"></view>
						起始地
					</view>
					<view class="get-address">定位</view>
				</view>
				<view class="auto-address flex-box">
					<view class="address-left flex-box">
						<view class="left-dot" style="background-color: #FFCD34;"></view>
						目的地
					</view>
				</view>

				<view class="auto-title">搬运时间</view>
				<view class="time-choice flex-box" @tap="showTime = true">{{ time }}</view>
			</view>

			<view class="auto-title bottom-title">需要搬什么呢？</view>
			<data-textarea v-if="!showTime" hiddenTitle v-model="text" placeholder="例如:三个桌子 两个沙发 一个电视机"></data-textarea>

			<view class="auto-title bottom-title">拍照上传</view>
			<view class="bottom-info">为了更合理的估价,请您上传相关照片,特别是房屋修理和搬运的工作。</view>
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
		</view>

		<view class="bottom-btn" @tap="navNext">下一步</view>

		<sen-picker-view :shixian="showTime" @quxiaoButton="showTime = false" @colseBox="showTime = false" @quedingButton="changeTime"></sen-picker-view>
	</view>
</template>

<script>
import SenPickerView from '@/components/sen-pickerview/picker-view-set.vue';
import DataTextarea from '@/components/dataInput/DataTextarea.vue';

export default {
	components: {
		SenPickerView,
		DataTextarea
	},
	data() {
		return {
			time: '',
			showTime: false,
			text: '',

			imgList: []
		};
	},
	methods: {
		navNext() {
			uni.navigateTo({
				url: 'CarryPrice'
			});
		},

		changeTime(y, m, d) {
			this.time = `${y}-${m}-${d}`;
			this.showTime = false;
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
					// this.$store.commit('updateImgData', nameStr);
					this.imgList.splice(this.imgList.length, 0, nameStr);
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
		},
		
		navBack(){
			uni.navigateBack()
		}
	}
};
</script>

<style lang="scss" scoped>
#page {
	background-color: $group-color-bg;
	min-height: 100vh;
	font-size: 30rpx;
	line-height: 42rpx;
	padding-bottom: 30rpx;
}

.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	position: relative;
	z-index: 1;
	padding-top: $status-height;
	height: 88rpx;
	justify-content: center;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.view-bg {
	position: absolute;
	top: 0;
	z-index: 0;
	width: 100vw;
	height: 100vh;
}

.view-title {
	color: #ffffff;
	font-size: 36rpx;
	line-height: 50rpx;
}

.content-box {
	padding: 30rpx 30rpx 0;
	box-sizing: border-box;
}

.auto-address {
	justify-content: space-between;
	background-color: #ffffff;
	border-radius: 6rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	width: 690rpx;
	height: 88rpx;
	margin-top: 30rpx;
}

.address-left {
	color: #999999;
}

.left-dot {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background-color: #c4d06a;
	margin-right: 32rpx;
}

.get-address {
	color: #508324;
	font-size: 30rpx;
}

.auto-title {
	margin: 40rpx 0 0 10rpx;
	color: #ffffff;
}

.time-choice {
	border-radius: 6rpx;
	background-color: #ffffff;
	padding: 0 30rpx;
	color: #333333;
	height: 88rpx;
	width: 690rpx;
	box-sizing: border-box;
	margin-top: 30rpx;
}

.bottom-title {
	margin: 40rpx 0 0 40rpx;
}

.bottom-info {
	font-size: 26rpx;
	line-height: 36rpx;
	padding: 30rpx 40rpx;
	box-sizing: border-box;
	color: #ffffff;
}

.img-list {
	padding: 0 30rpx;
	flex-wrap: wrap;
}

.img-list-box {
	flex-wrap: wrap;
	padding: 0 30rpx;
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
	line-height: 102rpx;
	width: 690rpx;
	text-align: center;
	margin: 50rpx auto 0;
	color: #ffffff;
	font-size: 36rpx;
	border-radius: 6rpx;
}
</style>
