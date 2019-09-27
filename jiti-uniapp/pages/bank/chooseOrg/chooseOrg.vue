<template>
	<view>
		<view class="content">
			<view class="maincon choose-box">

				<view v-if="orgList.length>0">
					<view class="choose-item" v-for="(item,index) in orgList" :key="index" @click="chooseOrgBtn(item)">
						<view class="title">{{item.name}}</view>
						<view class="line"></view>
						<view class="org-address"> {{item.address}} </view>
					</view>
				</view>
				<view v-else class="msg-text">
					当前用户暂无银行信息
				</view>

			</view>
		</view>
		<view class="footer-box">
			<button type="warn" @click="toLogin()">
				注销登录
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				offset: 0,
				count: 10,
				page: 1,
				orgList: [],
				pageOver: false,
				userInfo: '',
			}
		},
		methods: {
			toLogin() {
				uni.clearStorageSync();
				uni.reLaunch({
					url: '../../login/login'
				})
			},
			getUserORGs(cnt) {
				uni.showLoading({
					title: '加载中'
				});
				this.$api.getUserORGs(cnt, (res) => {
					let data = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						data = this.$util.tryParseJson(res.data.c)
					} else {
						data = []

					}
					this.orgList = this.orgList.concat(data)

					if (data.length < this.count) {
						this.pageOver = true
					} else {
						this.pageOver = false
					}
					uni.hideLoading()

				})
			},

			/** 选择机构二次登录*/
			loginInORG(cnt) {
				this.$api.loginInORG(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let info = JSON.parse(res.data.c)
						let arr = []
						for (let i = 0; i < info.permissions.length; i++) {
							arr.push(info.permissions[i].id)
						}
						uni.setStorageSync('bankOrgInfo', JSON.stringify(info))
						uni.setStorageSync('permission', JSON.stringify(arr))

						uni.navigateTo({
							url: '../vote/vote'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '进入银行失败'
						})
					}
				})
			},

			/** 选中机构*/
			chooseOrgBtn(item) {
				let cnt = {
					orgId: item.id,
					userId: this.userInfo.id,
				};
				this.loginInORG(cnt)
			},


		},
		onLoad() {

			if (uni.getStorageSync('bankOrgInfo')) {
				uni.navigateTo({
					url: '../vote/vote'
				})
			}
			this.userInfo = JSON.parse(uni.getStorageSync('bankUserInfo'))
			let cnt = {
				offset: this.offset,
				count: this.count,
				userId: this.userInfo.id,
				level: 5
			}
			this.getUserORGs(cnt)

		},

		/**分页*/
		onReachBottom() {
			this.page = this.page + 1
			let cnt = {
				offset: (this.page - 1) * this.count,
				count: this.count,
				userId: this.userInfo.id,
				level: 5
			}
			if (this.pageOver == false) {
				this.getUserORGs(cnt)
			} else {
				uni.showToast({
					icon: 'none',
					title: '已加载全部',
					duration: 1500
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 90%;
		margin: 0 auto;
	}

	.choose-item {
		margin: 20rpx 0;

		padding: 40rpx 40rpx;
		background-color: $jiti-color-blue;
		border-radius: 20rpx;
	}

	.choose-item view {

		color: #FFFFFF;
	}

	.title {
		font-size: 32rpx;
	}

	.line {
		width: 60rpx;
		height: 8rpx;
		background-color: #FFFFFF;
	}

	.org-address {
		margin-top: 15rpx;
		font-size: 24rpx;
	}

	.msg-text {
		text-align: center;
		font-size: 32rpx;
		color: #666;
		line-height: 50rpx;
	}

	.footer-box {
		width: auto;
		padding: 40rpx;
	}
</style>
