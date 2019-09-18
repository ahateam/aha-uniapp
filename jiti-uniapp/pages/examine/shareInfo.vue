<template>
	<view>
		<view class="main-box">
			<view class="content-box" v-if="oldData != ''">
				<view class="title-box">
					<span>原始用户信息</span>
				</view>
				<view class="list-box">
					<view class="user-box">
						<view class="user-name">
							姓名
						</view>
						<view class="user-card">
							{{oldData.user.realName}}
						</view>

					</view>
					<view class="user-box">
						<view class="user-name">
							身份证
						</view>
						<view class="user-card">
							{{oldData.user.idNumber}}
						</view>
					</view>
					<view class="user-box">
						<view class="user-name">
							手机号
						</view>
						<view class="user-card">
							{{oldData.user.mobile}}
						</view>
					</view>
					<view class="user-box">
						<view class="user-name">
							股份数
						</view>
						<view class="user-card">
							<span style="color: #63a35c;"> {{oldData.orgUser.shareAmount}}</span>
						</view>
					</view>
					<view class="user-box">
						<view class="user-name">
							资源股
						</view>
						<view class="user-card">
							<span style="color: #63a35c;" v-if="oldData.orgUser.resourceShares"> {{oldData.orgUser.resourceShares}}</span>
							<span style="color: #63a35c;" v-else> 0</span>
						</view>
					</view>
					<view class="user-box">
						<view class="user-name">
							资产股
						</view>
						<view class="user-card">
							<span style="color: #63a35c;" v-if="oldData.orgUser.assetShares"> {{oldData.orgUser.assetShares}}</span>
							<span style="color: #63a35c;" v-else> 0</span>
						</view>
					</view>
				</view>
				<view class="title-box1">
					<span>股权变更后用户信息</span>
				</view>
				<view class="list-box">
					<view class="user-box">
						<view class="user-name">
							姓名
						</view>
						<view class="user-card">
							{{newData.user.realName}}
						</view>

					</view>
					<view class="user-box">
						<view class="user-name">
							身份证
						</view>
						<view class="user-card">
							{{newData.user.idNumber}}
						</view>
					</view>
					<view class="user-box">
						<view class="user-name">
							手机号
						</view>
						<view class="user-card">
							{{newData.user.mobile}}
						</view>
					</view>
					<view class="user-box">
						<view class="user-name">
							股份数
						</view>
						<view class="user-card">
							<span style="color: #f44;"> {{newData.orgUser.shareAmount}}</span>
						</view>
					</view>
					<view class="user-box">
						<view class="user-name">
							资源股
						</view>
						<view class="user-card">
							<span style="color: #f44;" v-if="newData.orgUser.resourceShares"> {{newData.orgUser.resourceShares}}</span>
							<span style="color: #f44;" v-else> 0</span>
						</view>
					</view>
					<view class="user-box">
						<view class="user-name">
							资产股
						</view>
						<view class="user-card">
							<span style="color: #f44;" v-if="newData.orgUser.assetShares"> {{newData.orgUser.assetShares}}</span>
							<span style="color: #f44;" v-else> 0</span>
						</view>
					</view>
				</view>
			</view>

			<view class="footer-box">
				<button type="primary" v-if="isEdit" @click="eidtBtn">审批通过 </button>
				<button type="default" @click="toBack">返回上一页</button>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name: 'shareInfo',
		data() {
			return {
				info: '',
				oldData: '',
				newData: '',
				isEdit: false,

			}
		},
		methods: {
			eidtBtn() {
				let cnt = {
					examineId: this.info.id, // Long 任务编号
					orgId: JSON.parse(uni.getStorageSync('orgUserInfo')).orgId, // Long 组织编号
					status: 1, // Byte 状态
				}
				this.$api.examineShareCerNo(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							icon: 'success',
							title: '审批成功，请等待区级审批',
							duration: 1500
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '操作失败',
							duration: 1500
						})
					}
					uni.navigateBack()
				})
			},
			toBack() {
				uni.navigateBack()
			}
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.info))

			this.oldData = JSON.parse(this.info.data).oldData[0]
			this.newData = JSON.parse(this.info.data).newData[0]

			console.log(this.oldData)

			let permissions = uni.getStorageSync('permission')
			if (permissions.indexOf('105') >= 0) {
				this.isEdit = true
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-box {
		background: #fff;
	}

	.title-box {
		margin-top: 20rpx;
		width: auto;
		height: 50rpx;
		color: #fff;
		font-size: 32rpx;
		line-height: 50rpx;
		background: $jiti-color-blue;
		padding: 20rpx;
		text-align: center;

	}

	.title-box1 {
		margin-top: 40rpx;
		width: auto;
		height: 50rpx;
		color: #fff;
		font-size: 32rpx;
		line-height: 50rpx;
		background: $jiti-color-purple;
		padding: 20rpx;
		text-align: center;
	}


	.content-box {
		width: 94%;
		margin: 0 auto;
	}

	.list-box {

		border-bottom: 1px solid #eee;
		padding: 1rpx;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
	}

	.text-msg {
		font-size: 28rpx;
		color: #666;
		line-height: 40rpx;
	}

	.user-box {
		border-bottom: 1px;
		width: auto;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #666;
	}

	.user-name {
		float: left;
		width: 30%;
		height: 60rpx;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.user-card {
		float: left;
		width: 70%;
		height: 60rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}

	.footer-box {
		width: 94%;
		margin: 0 auto;
		padding: 40rpx 0;
		text-align: center;
	}
</style>
