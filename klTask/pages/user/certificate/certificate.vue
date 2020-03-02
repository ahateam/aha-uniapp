<template>
	<view id="page">
		<view class="nav-box flex-box" style="margin-bottom: 40rpx;">
			<image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image>
		</view>
		<image class="view-bg" src="/static/image/bg_c.png" mode="aspectFill"></image>
		<load-step :list="list" currIndex="1"></load-step>
		<view class="content-box">
			<view class="auto-title flex-box">
				<image src="/static/image/icon/icib_zyzs.png" mode="aspectFit"></image>
				专业证书
			</view>
			<view class="auto-tip">请上传你的专业证书License,有机会获得更多任务哦</view>
			<view class="file-list flex-box" v-for="(item, index) in certificate" :key="index">
				<view>
					<view class="file-tile">{{ item.name }}</view>
					<view>{{ item.size }}</view>
				</view>
				<image src="/static/image/icon/icib_zyzs.png" mode="aspectFit"></image>
			</view>
			<view class="up-file-btn" @tap="upFile(0)">上传文件</view>

			<view class="auto-title flex-box">
				<image src="/static/image/icon/icib_zyzs.png" mode="aspectFit"></image>
				无犯罪记录
			</view>
			<view class="auto-tip flex-box">
				请上传你的无犯罪记录证明(Police Check)
				<view class="police-btn"></view>
			</view>
			<view class="file-list flex-box" v-for="(item, index) in policeFile" :key="index">
				<view>
					<view class="file-tile">{{ item.name }}</view>
					<view>{{ item.size }}</view>
				</view>
				<image src="/static/image/icon/icib_zyzs.png" mode="aspectFit"></image>
			</view>
			<view class="up-file-btn" @tap="upFile(1)">上传文件</view>

			<view class="auto-title">自我简介</view>
			<view class="auto-tip">可以让发布任务的人更了解你哦</view>
			<view class="text-area">
				<textarea adjust-position maxlength="200" v-model="text" placeholder="举个例子:我对家具组装和电器修理很有经验，已经在墨尔本5年。" />
				<view class="number-box">({{ text.length }}/200)</view>
			</view>

			<view class="radius-btn flex-box" @tap="navNext"><image src="/static/image/icon/icon_back_w.png" mode="aspectFit"></image></view>
		</view>

		<view class="next-text" @tap="navNext">跳过</view>

		<l-file ref="lFile" @up-success="onSuccess"></l-file>
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
	computed: {
		text: {
			get() {
				return this.$store.state.user.userInfo.text;
			},
			set(val) {
				this.$store.commit('updataText', val);
			}
		}
	},
	data() {
		return {
			userInfo: {},
			list: [{ name: '上传证书' }, { name: '验证身份' }, { name: '收款账户' }, { name: '成为任务者' }],
			fileType: 0,
			certificate: [],
			policeFile: []
		};
	},
	methods: {
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
				let type = '';
				if (this.fileType == 0) {
					type = 0;
				} else {
					type = 1;
				}
				let cnt = {
					localFileUrl: obj.url + `?size=${obj.size}`, // String OSS文件路径
					userId: this.userInfo.userId, // Long 用户id
					type: type // Byte 上传文件类型（专业证书：0，无犯罪记录：1，ID：3）
				};
				this.uploadFile(cnt, obj);
			}
		},

		navNext() {
			let cnt = {
				userId:this.userInfo.userId,
				introduction:this.text
			}
			this.$api.updateUser(cnt);
			uni.navigateTo({
				url: 'userID/userID'
			});
		},

		navBack() {
			uni.navigateBack();
		},

		uploadFile(cnt, obj) {
			this.$api.uploadFile(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					if (this.fileType == 0) {
						this.certificate.splice(this.certificate.length, 0, obj);
					} else {
						this.policeFile.splice(this.policeFile.length, 0, obj);
					}
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		}
	},
	onLoad() {
		this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
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

	image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
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

.police-btn {
	margin-left: 10rpx;
	color: #ffffff;
	font-size: 26rpx;
	line-height: 50rpx;
	background-color: #0f1b07;
	border-radius: 6rpx;
	width: 132rpx;
	line-height: 50rpx;

	&:active {
		opacity: 0.7;
	}
}

.text-area {
	position: relative;
	margin-top: 40rpx;
	padding: 30rpx 30rpx 70rpx;
	background-color: #f5f7f5;
	border-radius: 6rpx;

	textarea {
		width: 100%;
		height: 160rpx;
		font-size: 26rpx;
		line-height: 40rpx;
	}

	.number-box {
		position: absolute;
		right: 30rpx;
		bottom: 20rpx;
		color: #999999;
		font-size: 22rpx;
		line-height: 30rpx;
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

.next-text {
	color: #ffffff;
	font-size: 30rpx;
	line-height: 42rpx;
	text-align: center;
	width: 100%;
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

.file-tile {
	color: #666666;
	font-size: 28rpx;
	line-height: 30rpx;
	margin-bottom: 12rpx;
}
</style>
