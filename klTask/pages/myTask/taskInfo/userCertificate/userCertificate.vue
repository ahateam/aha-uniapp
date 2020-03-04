<template>
	<view id="page">
		<image class="top-bg" src="/static/image/mytask/bg_fxdlr.png" mode="aspectFit"></image>
		<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image></view>
		<view class="user-box flex-box">
			<image class="top-head" :src="constData.oss + itemUserInfo.userHead" mode="aspectFill"></image>
			<view class="user-info">
				<view class="top-name">{{ itemUserInfo.userName }}</view>
				<view class="tag-list flex-box">
					<view class="tag-dot"></view>
					<view class="tag-box flex-box" v-for="(item, index) in itemUserInfo.hobbyTag" :key="index">
						<view style="margin-right: 10rpx;">{{ item }}</view>
						<view class="tag-dot"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-box">
			<view class="bottom-title">
				<view class="title-raidus"></view>
				<view style="position: relative;">自我简介</view>
			</view>
			<view class="bottom-info">{{ text }}</view>
			<view class="auto-box">
				<view class="auto-title flex-box">
					<view>身份ID</view>
					<image src="/static/image/icon/icon_yskx_gr.png" mode="aspectFit"></image>
				</view>
				<view class="ID-box flex-box">
					<view v-for="(item, index) in itemUserInfo.certificate.idCard" :key="index">
						<view class="file-list flex-box" v-if="!getFormat(item.name)">
							<view class="file-info">
								<view class="file-tile">{{ item.name }}</view>
								<view>{{ item.size }}</view>
							</view>
							<image src="/static/image/icon/icib_zyzs.png" mode="aspectFit"></image>
						</view>
						<image class="ID-img" :src="constData.oss + item.url" mode="aspectFill" v-else></image>
					</view>
				</view>
			</view>

			<view class="auto-box">
				<view class="auto-title flex-box">
					<view>专业证书License</view>
					<image src="/static/image/icon/icon_yskx_gr.png" mode="aspectFit"></image>
				</view>
				<view class="file-list flex-box" v-for="(item, index) in itemUserInfo.certificate.license" :key="index">
					<view class="file-info">
						<view class="file-tile">{{ item.name }}</view>
						<view>{{ item.size }}</view>
					</view>
					<image src="/static/image/icon/icib_zyzs.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="auto-box">
				<view class="auto-title flex-box">
					<view>无犯罪记录(Police Check)</view>
					<image src="/static/image/icon/icon_yskx_gr.png" mode="aspectFit"></image>
				</view>
				<view class="file-list flex-box" v-for="(item, index) in itemUserInfo.certificate.policeCheck" :key="index">
					<view class="file-info">
						<view class="file-tile">{{ item.name }}</view>
						<view>{{ item.size }}</view>
					</view>
					<image src="/static/image/icon/icib_zyzs.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userId: '',
			itemUserInfo: {},
			constData: this.$constData,
			text: uni.getStorageSync('itemUserText')
		};
	},
	methods: {
		getFormat(name) {
			let newName = name.substr(name.indexOf('.'));
			newName = name.toLowerCase();
			var reg = /\.(png|jpg|gif|jpeg|webp)$/;
			console.log(reg.test(newName));
			return reg.test(newName);
		},

		getUserInfo(cnt) {
			this.$api.getUserInfo(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					let userInfo = this.$util.tryParseJson(res.data.c);
					userInfo.hobbyTag = this.$util.tryParseJson(userInfo.hobbyTag);
					if (userInfo.certificate) {
						userInfo.certificate = this.$util.tryParseJson(userInfo.certificate);
						if (userInfo.certificate.idCard) {
							let array = userInfo.certificate.idCard.split(',');
							userInfo.certificate.idCard = this.tryObj(array);
						}
						if (userInfo.certificate.license) {
							let array = userInfo.certificate.license.split(',');
							userInfo.certificate.license = this.tryObj(array);
						}
						if (userInfo.certificate.policeCheck) {
							let array = userInfo.certificate.policeCheck.split(',');
							userInfo.certificate.policeCheck = this.tryObj(array);
						}
					}
					this.itemUserInfo = userInfo;
					console.log(this.itemUserInfo);
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		navBack() {
			uni.navigateBack();
		},

		tryObj(array) {
			let newArray = [];
			array.map(item => {
				if (item.indexOf('?') != -1) {
					let name = item.substr(1 + item.lastIndexOf('/'));
					name = name.substr(0, name.indexOf('?'));
					let obj = {
						name: name,
						size: item.substr(item.indexOf('?') + 6),
						url: item.substr(0, item.indexOf('?'))
					};
					newArray.push(obj);
				} else {
					let obj = {
						name: item.substr(item.lastIndexOf('/') + 1),
						url: item
					};
					newArray.push(obj);
				}
			});
			return newArray;
		}
	},
	onLoad(res) {
		this.userId = res.userId;

		let cnt = {
			userId: this.userId // Long 用户id
		};
		this.getUserInfo(cnt);
	}
};
</script>

<style lang="scss" scoped>
#page {
	background-color: #a0bf5f;
}

.top-bg {
	position: absolute;
	top: 0;
	width: 100vw;
	height: 536rpx;
	z-index: 0;
}

.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	position: relative;
	padding-top: var(--status-bar-height);
	height: 88rpx;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.user-box {
	position: relative;
	margin-top: 47rpx;
	color: #ffffff;
	padding-bottom: 69rpx;
}

.top-head {
	border-radius: 50%;
	width: 120rpx;
	height: 120rpx;
	box-sizing: border-box;
	border: 1rpx solid #ffffff;
	margin: 0 0 0 40rpx;
}

.user-info {
	margin-left: 30rpx;
	font-size: $group-font;
	line-height: 30rpx;
}

.top-name {
	font-size: 44rpx;
	line-height: 62rpx;
	margin-bottom: 30rpx;
}

.tag-list {
	flex-wrap: wrap;
}

.tag-box {
	margin-left: 10rpx;
	color: #ffffff;
}

.tag-dot {
	background-color: #ffffff;
	border-radius: 50%;
	width: 6rpx;
	height: 6rpx;
}

.bottom-box {
	position: relative;
	border-radius: 20rpx 20rpx 0 0;
	background-color: #ffffff;
}

.bottom-title {
	position: relative;
	padding: 67rpx 0 0 40rpx;
	color: #333333;
	font-size: 30rpx;
	line-height: 42rpx;
}

.title-raidus {
	position: absolute;
	opacity: 0.5;
	background-image: linear-gradient(#ffd78d, #ffb700);
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
	bottom: -4prx;
	left: 20rpx;
}

.bottom-info {
	color: #999999;
	font-size: 28rpx;
	line-height: 36rpx;
	padding: 30rpx 0;
	margin: 0 40rpx;
	border-bottom: 1rpx solid #eff0f4;
}

.auto-box {
	padding: 30rpx 0;
	border-bottom: 1rpx solid #eff0f4;
	width: 670rpx;
	margin: 0 auto;
	box-sizing: border-box;
}

.auto-title {
	position: relative;
	justify-content: space-between;
	color: 30rpx;
	line-height: 42rpx;
	color: #333333;

	image {
		width: 27rpx;
		height: 15rpx;
	}
}

.file-list {
	justify-content: space-between;
	margin: 30rpx 0 0;
	padding: 20rpx;
	font-size: $group-font;
	line-height: 20rpx;
	color: #999999;
	background-color: #f9f9f9;
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

.file-info {
	width: 550rpx;
}

.ID-box {
	justify-content: center;
}

.ID-img {
	display: inline-block;
	width: 328rpx;
	height: 206rpx;
	margin: 30rpx 14rpx 0 0;
	border-radius: 6rpx;
}
</style>
