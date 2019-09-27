<template>
	<view>
		<view class="list-box" v-for="(item,index) in list" :key="index" @click="toInfo(item)">
			<view class="list-title">
				{{item.title}}
			</view>
			<view class="list-content">
				{{timerFilter(item.createTime)}}
			</view>
		</view>
		<view class="footer-box">
			<button type="default" @click="toHomePage()">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: '',
				page: 1,
				count: 10,
				groups: '',
				list: [],

			}
		},
		methods: {
			toNoticeInfo() {
				uni.navigateTo({
					url: "NoticeInfo"
				})
			},

			//请求公告列表
			getNoticeByRoleGroup(cnt) {
				uni.showLoading({
					title: '加载中'
				});
				this.$api.getNoticeByRoleGroup(cnt, (res) => {
					let arr = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						arr = this.$util.tryParseJson(res.data.c)
					} else {
						arr = []
					}
					this.list = this.list.concat(arr)
					
					uni.hideLoading()
				})
			},
			timerFilter(timer) {
				let date = new Date(timer)
				let dateData = date.toLocaleDateString()
				return dateData
			},

			//跳转详情
			toInfo(item) {
				let info = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: './noticeInfo?info=' + info
				})
			},
			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}

		},
		onShow() {
			this.list = []
			this.page = 1
			this.userInfo = JSON.parse(uni.getStorageSync('orgInfo'))
			let groups = []
			if (this.userInfo.groups == undefined || this.userInfo.groups == '' || this.userInfo.groups.length == 0) {
				groups[0] = 102
			} else {
				groups = this.userInfo.groups
			}
			this.groups = groups

			let cnt = {
				orgId: this.userInfo.orgId, // Long 组织编号
				roles: this.userInfo.orgRoles, // String 角色编号 [102,103,104]
				groups: this.groups, // String 分组编号 [1111111,555555,111]
				count: this.count, // Integer
				offset: (this.page - 1) * this.count, // Integer
			}
			this.getNoticeByRoleGroup(cnt)


		},

		/**分页*/
		onReachBottom() {
			this.page = this.page + 1

			let cnt = {
				orgId: this.userInfo.orgId, // Long 组织编号
				roles: this.userInfo.orgRoles, // String 角色编号 [102,103,104]
				groups: this.groups, // String 分组编号 [1111111,555555,111]
				count: this.count, // Integer
				offset: (this.page - 1) * this.count, // Integer
			}
			this.getNoticeByRoleGroup(cnt)

		}
	}
</script>

<style scoped lang="scss">
	.list-box {
		width: auto;
		margin-top: 20rpx;
		padding: 30rpx;
		border-bottom: 1px solid #e8e8e8;
		overflow: hidden
	}

	.list-title {
		float: left;
		width: 75%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list-content {
		float: left;
		width: 25%;
		line-height: 50rpx;
		font-size: 24rpx;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.poll-icon-color1 {
		color: $jiti-color-blue;
	}

	.footer-box {
		margin-top: 30rpx;
		width: auto;
		padding: 40rpx;

	}
</style>
