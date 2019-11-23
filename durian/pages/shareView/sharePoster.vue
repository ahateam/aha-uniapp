<template>
	<view>
		<view class="bg-view">
			<view class="title-box">
				<image class="back-icon" @click="navBack" src="/static/image/icon/icon_fh.png" mode="aspectFit"></image>
				<image class="app-icon" src="/static/image/user/icon_docx.png" mode="aspectFit"></image>
				<view class="title-text">
					<view>榴莲</view>
					<view class="title-bottom">留学生联合会APP</view>
				</view>
			</view>

			<image class="poster-img" :src="imgSrc" mode="aspectFit"></image>

			<view class="poster-tip">
				保存图片到相册打开榴莲APP即可见<br />
				<view class="poster-tip-bottom">
					本次分享30天内有效
				</view>
			</view>

			<button class="save-btn" @click="savePoster">保存图片</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc: uni.getStorageSync('posterImg')
			};
		},
		methods: {
			savePoster() {
				uni.downloadFile({
					url: this.imgSrc,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.showToast({
								title: '保存成功'
							})
						}
					}
				})
			},

			navBack() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bg-view {
		background-color: rgba($color: #010101, $alpha: .5);
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		padding-bottom: 102rpx;
	}

	.title-box {
		display: flex;
		align-items: center;
		padding-top: 49rpx;
	}

	.back-icon {
		width: 50rpx;
		height: 50rpx;
		margin-left: 20rpx;
	}

	.app-icon {
		width: 80rpx;
		height: 80rpx;
		margin: 0 20rpx 0 176rpx;
	}

	.title-text {
		font-size: 32rpx;
		line-height: 32rpx;
		color: $group-color-w;
	}

	.title-bottom {
		font-size: 20rpx;
		line-height: 30rpx;
		margin-top: 10rpx;
	}

	.poster-img {
		margin: 51rpx 50rpx 0;
		height: 891rpx;
		width: 650rpx;
		border-radius: 40rpx;
	}

	.poster-tip {
		text-align: center;
		font-size: 26rpx;
		line-height: 30rpx;
		color: rgba($color: #FFFFFF, $alpha: .5);
		margin-top: 50rpx;
	}

	.poster-tip-bottom {
		font-size: 24rpx;
		margin-top: 16rpx;
	}

	.save-btn {
		position: fixed;
		bottom: 0;
		line-height: 102rpx;
		width: 100%;
		font-size: 36rpx;
		color: $group-color-w;
		background-color: #00C8BE;
		border-radius: 6rpx;

		&:after {
			border: none;
		}
	}
</style>
