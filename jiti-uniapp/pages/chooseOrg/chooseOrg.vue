<template>
	<view>
		<view class="maincon choose-box">

			<view class="choose-item" v-for="(item,index) in orgList" :key="index" @click="chooseOrgBtn(item)">
				<view class="title">{{item.name}}</view>
				<view class="line"></view>
				<view class="org-address"> {{item.address}} </view>
			</view>

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
					console.log('---------------')
					console.log(this.orgList)
				})
			},

			/** 选择机构二次登录*/
			loginInORG(cnt) {
				this.$api.loginInORG(cnt, (res) => {

					console.log(JSON.parse(res.data.c))
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let info = JSON.parse(res.data.c)
						let arr = []
						for (let i = 0; i < info.permissions.length; i++) {
							arr.push(info.permissions[i].id)
						}
						uni.setStorageSync('orgInfo', JSON.stringify(info))
						uni.setStorageSync('permission', JSON.stringify(arr))

						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						console.log('11111')
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
			
			if(uni.getStorageSync('orgInfo') && uni.getStorageSync('permission')){
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
			
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			let cnt = {
				offset: this.offset,
				count: this.count,
				userId: this.userInfo.id,
				level: 4
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
				level: 4
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
	.choose-item {
		margin: 20rpx 0;
		width: 660rpx;
		padding: 40rpx 10rpx;
		background-color: #40c9c6;
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
</style>
