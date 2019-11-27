<template>
	<view>
		<view class="maincon orgInfo-box">
			<view class="org-item">
				<view class="org-name">机构名称：</view>
				<view class="org-res">{{info.name}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">机构地址：</view>
				<view class="org-res">{{info.address}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">机构股份：</view>
				<view class="org-res">{{info.shareAmount}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">机构资源股：</view>
				<view class="org-res">{{info.resourceShares}}</view>
			</view>
			<view class="org-item">
				<view class="org-name">机构资产股：</view>
				<view class="org-res">{{info.assetShares}}</view>
			</view>
			<view class="org-item-img">
				<view class="org-name">集体经济代码证书：</view>
				<view class="org-iamge-box">
					<image :src="getOssFile(info.imgOrg)" mode="aspectFit"></image>
				</view>
			</view>
			<view class="org-item-img">
				<view class="org-name">集体经济授权证书：</view>
				<view class="org-iamge-box">
					<image :src="getOssFile(info.imgAuth)" mode="aspectFit"></image>
				</view>
			</view>
		</view>

		<view class="footer-box">
			<button type="default" @click="toBack()">
				返回上一页
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'orgInfo',
		data() {
			return {
				info: '',
			}
		},
		methods: {
			getORGById(cnt) {
				this.$api.getORGById(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.info = JSON.parse(res.data.c)
					}
					console.log(this.info)
				})
			},
			toBack() {
				uni.navigateBack()
			},
			getOssFile(url){
				return this.$commen.getOssUrl(url)
			}
		},
		onLoad() {
			let orgId = JSON.parse(uni.getStorageSync('orgUserInfo')).orgId
			let cnt = {
				orgId: orgId
			}
			this.getORGById(cnt)
		}
	}
</script>

<style scoped lang="scss">
	.org-item {
		width: 100%;
		height: 88rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #DDDDDD;
	}

	.org-item view {
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
	}

	.org-name {
		width: 40%;
	}

	.org-res {
		width: 60%;
		color: #969799;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.org-iamge-box {}

	.org-item-img {
		font-size: 30rpx;
		margin-top: 20rpx;
	}

	.footer-box {
		width: auto;
		padding: 40rpx;

	}
</style>
