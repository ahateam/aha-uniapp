<template>
	<view id="page">
		<view class="nav-box flex-box" style="margin-bottom: 40rpx;">
			<image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image>
		</view>
		<image class="view-bg" src="/static/image/bg_c.png" mode="aspectFill"></image>
		<load-step :list="list" currIndex="2"></load-step>
		<view class="content-box">
			<view class="auto-title flex-box">
				ID
				<text class="icon-right">*</text>
			</view>
			<view class="file-list flex-box" v-for="(item, index) in idList" :key="index">
				<view>
					<view class="file-tile">{{ item.name }}</view>
					<view>{{ item.size }}</view>
				</view>
				<image src="/static/image/icon/icib_zyzs.png" mode="aspectFit"></image>
			</view>
			<view class="auto-tip">请上传你的ID证明(驾照或护照)</view>

			<view class="up-file-btn" @tap="upFile(3)">上传文件</view>
			<view class="radius-btn flex-box" @tap="navNext"><image src="/static/image/icon/icon_back_w.png" mode="aspectFit"></image></view>
			
			<l-file ref="lFile" @up-success="onSuccess"></l-file>
		</view>
	</view>
</template>

<script>
import LoadStep from '@/components/LoadStep.vue';
import lFile from '@/components/l-file/l-file.vue';

export default {
	components: {
		LoadStep,
		lFile
	},
	data() {
		return {
			list: [{ name: '上传证书' }, { name: '验证身份' }, { name: '收款账户' }, { name: '成为任务者' }],
			fileType: '',
			idList: []
		};
	},
	methods: {
		navNext() {
			console.log(2333);
			uni.navigateTo({
				url: '../userAccount/userAccount'
			});
		},

		navBack() {
			uni.navigateBack();
		},

		upFile(e) {
			this.fileType = e;
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
			let time = new Date();
			this.$refs.lFile.upload({
				// #ifdef APP-PLUS
				currentWebview: this.$mp.page.$getAppWebview(),
				// #endif
				url: this.$constData.oss,
				front: `${userInfo.userId}/${time.getFullYear()}${time.getMonth() * 1 + 1}${time.getDate()}`
			});
		},

		onSuccess(res) {
			// console.log('上传成功回调', JSON.stringify(res));
			// console.log('文件上传的地址不包含url')
			// console.log(res.frontFileName)
			// console.log('文件上传的完整地址，包含url')
			// console.log(res.fileUrl)
			if (res.frontFileName != 'index.html') {
				let fileName = res.frontFileName.substr(res.frontFileName.lastIndexOf('/') + 1);
				let obj = {
					name: fileName,
					url: res.frontFileName,
					size: res.fileSize
				};
				let cnt = {
					localFileUrl: obj.url, // String OSS文件路径
					userId: this.userInfo.userId, // Long 用户id
					type: 3 // Byte 上传文件类型（专业证书：0，无犯罪记录：1，ID：3）
				};
				this.uploadFile(cnt, obj);
			}
		},

		uploadFile(cnt, obj) {
			this.$api.uploadFile(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					this.idList.splice(this.idList.length, 0);
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
#page {
	background-color: $group-color-bg;
	min-height: 100vh;
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

.content-box {
	position: relative;
	margin: 70rpx auto 129rpx;
	background-color: #ffffff;
	border-radius: 6rpx;
	padding: 40rpx 30rpx 171rpx;
	width: 690rpx;
	box-sizing: border-box;
}

.auto-title {
	color: #333333;
	font-size: 34rpx;
	line-height: 48rpx;

	.icon-right {
		font-size: 30rpx;
		color: #ffcd34;
	}
}

.auto-tip {
	color: #666666;
	font-size: 26rpx;
	line-height: 37rpx;
	margin-top: 34rpx;
}

.up-file-btn {
	margin: 49rpx auto 80rpx;
	background-color: #f1f1f1;
	border-radius: 4rpx;
	border: 1rpx solid #d6d6d6;
	box-sizing: border-box;
	text-align: center;
	color: #666666;
	font-size: 30rpx;
	line-height: 86rpx;
	width: 630rpx;

	&:active {
		opacity: 0.7;
	}
}

.radius-btn {
	position: absolute;
	justify-content: center;
	background-color: #0f1b07;
	bottom: -89rpx;
	height: 180rpx;
	width: 180rpx;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 50%;

	image {
		width: 39.2rpx;
		height: 33.6rpx;
		transform: rotateY(180deg);
	}
}

.file-list {
	justify-content: space-between;
	margin-top: 50rpx;
	padding: 20rpx;
	font-size: $group-font;
	line-height: 20rpx;
	color: #999999;
	background-color: #f9fafb;
	border: 1rpx solid #d6d6d6;
	border-radius: 6rpx;

	image {
		width: 79rpx;
		height: 79rpx;
	}
}
</style>
