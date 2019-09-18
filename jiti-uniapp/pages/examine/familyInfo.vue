<template>
	<view>
		<view class="main-box">
			<view class="content-box">
				<view class="title-box">
					<span>原始家庭户信息</span>
				</view>
				<view class="list-box">
					<!--一个原始户都没-->
					<view v-if="oldData.length == 0">
						<view class="text-msg">
							暂无原始家庭户信息
						</view>
					</view>
					<!--多个原始户-->
					<view v-else-if="Array.isArray(oldData[0])">
						<view v-for="(item,index) in oldData" :key="index">
							<view class="text-msg">原始家庭户{{index+1}} : {{item[0].familyMaster}} </view>
							<view v-for="(item1,index1) in item" :key="index1">
								<view class="user-box">
									<view class="user-name">
										{{item1.realName}}
									</view>
									<view class="user-card">
										{{item1.idNumber}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<!--只有一个原始户-->
					<view v-else>
						<view class="text-msg">原始家庭户1: {{oldData[0].familyMaster}} </view>
						<view v-for="(item,index) in oldData" :key="index">
							<view class="user-box">
								<view class="user-name">
									{{item.realName}}
								</view>
								<view class="user-card">
									{{item.idNumber}}
								</view>
							</view>
						</view>
					</view>

				</view>
				<view class="title-box1">
					<span>分户操作后家庭户信息</span>
				</view>
				<view class="list-box">
					<view v-for="(item,index) in newData" :key="index">
						<view class="text-msg">分户操作后家庭户{{index+1}}: {{item[0].familyMaster}} </view>
						<view v-for="(item1,index1) in item " :key="index1">


							<!--  <van-panel :title="nameFilter(item1)" :desc="numberFilter(item1)" :status="userTabFilter(item1)">
                            </van-panel> -->

							<view class="new-item">
								<view class="new-left">
									<view class="new-title">
										{{nameFilter(item1)}}
									</view>
									<view class="new-card">
										{{numberFilter(item1)}}
									</view>
								</view>
								<view class="new-right" v-if="item1.userTab ==0">
									{{userTabFilter(item1)}}
								</view>
								<view class="new-right-active" v-if="item1.userTab ==1">
									{{userTabFilter(item1)}}
								</view>
								<view style="clear: both;"></view>
							</view>
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
		name: 'familyInfo',
		data() {
			return {
				info: '',
				oldData: '',
				newData: '',
				isEdit: false,

			}
		},
		methods: {
			nameFilter(item) {
				let str = item.realName
				return str
			},
			numberFilter(item) {
				let str = item.idNumber
				return str
			},
			userTabFilter(item) {
				if (item.userTab === 0) {
					return '移出'
				}
				if (item.userTab === 1) {
					return '移入'
				}

				if (item.userTab == undefined || item.userTab === '') {
					return ''
				}

			},
			eidtBtn() {
				let cnt = {
					examineId: this.info.id, // Long 任务编号
					orgId: JSON.parse(uni.getStorageSync('orgUserInfo')).orgId, // Long 组织编号
					status: 1, // Byte 状态
				}
				this.$api.editExamine(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							icon:'success',
							title: '审批成功，请等待区级审批',
							duration: 1500
						})
					} else {
						uni.showToast({
							icon:'none',
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
			this.oldData = JSON.parse(this.info.data).oldData
			this.newData = JSON.parse(this.info.data).newData
			let permissions = uni.getStorageSync('permission')
			if (permissions.indexOf('104') >= 0) {
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
		padding: 20rpx;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
	}

	.text-msg {
		font-size: 28rpx;
		color: #666;
		line-height: 40rpx;
		margin-top: 20rpx;
		padding: 10rpx;
		border-left: 4rpx solid $jiti-color-blue;
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

	.new-item {
		width: 94%;
		margin: 0 auto;
		padding: 20rpx 30rpx;
		border-bottom: 1px solid #e8e8e8;
	}

	.new-left {
		float: left;
		width: 80%;
		height: 90rpx;

	}

	.new-right {
		float: left;
		width: 20%;
		height: 90rpx;
	}

	.new-title {
		width: auto;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #666;

	}

	.new-card {
		width: auto;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #666;
	}

	.new-right {
		line-height: 90rpx;
		font-size: 32rpx;
		color: $jiti-color-red;
	}

	.new-right-active {
		line-height: 90rpx;
		font-size: 32rpx;
		color: $jiti-color-blue;
	}
</style>
