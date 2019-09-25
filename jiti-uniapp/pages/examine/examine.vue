<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tagsList" :key="index" class="nav-item" :class="{current: item.id === tabCurrentIndex}"
			 @click="changeTag(item.id)">{{item.name}}</view>
		</scroll-view>

		<view class="content-box">
			<view v-if="list.length>0">
				<view v-for="(item,index) in list" :key="index">
					<view class="item-box" @click="toExamineInfo(item)">
						<view class="item-box-text">
							<view class="item-box-title">{{titleFilter(item)}}</view>
							<view class="item-box-time">{{timeFilter(item)}}</view>
						</view>
						<view class="item-box-status">{{statusFilter(item)}}</view>
						<view style="clear: both;"></view>
					</view>
				</view>
			</view>
			<view class="item-box" style="font-size: 28rpx;" v-else>
				暂无审批信息
			</view>
			<view class="footer-box">
				<button type="default" @click="toHomePage()">
					返回首页
				</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: 'examine',
		data() {
			return {
				tagsList: [{
						id: 1,
						name: "分户审批"
					},
					{
						id: 2,
						name: "股权变更"
					}
				], //标签列表
				tabCurrentIndex: 1, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离,
				//上拉加载 ---分页
				offset: 0,
				count: 10,
				page: 1,
				permissions: [],
				user: '',
				list: [],

			}
		},

		methods: {
			/* 触发改变选中标签*/
			changeTag(id) {
				this.tabCurrentIndex = id
				this.page = 1
				this.list = []
				let cnt = {
					orgId: this.user.orgId, // Long 组织编号
					userId: this.user.id, // Long 用户编号
					permissionIds: this.permissions, // String 用户角色
					type: this.tabCurrentIndex, // Byte 查询的审核类型
					count: this.count, // Integer
					offset: this.offset, // Integer
				}
				this.getExamineByPer(cnt)
			},

			/** 获取我的审批列表*/
			getExamineByPer(cnt) {
				this.$api.getExamineByPer(cnt, (res) => {
					let arr = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						arr = this.$util.tryParseJson(res.data.c)
					} else {
						arr = []
					}
					this.list = this.list.concat(arr)
					console.log(this.list)
				})
			},
			titleFilter(item) {

				let data = JSON.parse(item.data).newData
				let str = ''
				if (item.type == 1) {
					if (data[0][0].familyMaster == undefined) {
						str = '暂无'
					} else {
						str = data[0][0].familyMaster
					}
					return '家庭户户主： ' + str
				} else {
					if (data[0].user.realName == undefined) {
						str = '暂无'
					} else {
						str = data[0].user.realName
					}
					return '股权变更用户： ' + str
				}

			},
			timeFilter(item) {
				let timer = new Date(item.examineDate).toLocaleDateString() + ' ' + new Date(item.examineDate).toLocaleTimeString('chinese', {hour12: false})
				return '操作时间: ' + timer
			},
			statusFilter(item) {
				for (let i = 0; i < this.$constData.examineStatus.length; i++) {
					if (this.$constData.examineStatus[i].key == item.status) {
						return this.$constData.examineStatus[i].val
					}
				}

			},

			/* 跳转详情页*/
			toExamineInfo(item) {
				console.log(item)
				let infoData = encodeURIComponent(JSON.stringify(item))
				if (this.tabCurrentIndex == 1) {
					uni.navigateTo({
						url: './familyInfo?info=' + infoData,
					})
				} else {
					uni.navigateTo({
						url: './shareInfo?info=' + infoData,
					})
				}
			},
			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		},
		onShow() {
			this.permissions = JSON.parse(uni.getStorageSync('permission'))

			this.list = []
			this.page = 1

			this.user = JSON.parse(uni.getStorageSync('orgUserInfo'))
			let cnt = {
				orgId: this.user.orgId, // Long 组织编号
				userId: this.user.id, // Long 用户编号
				permissionIds: this.permissions, // String 用户角色
				type: this.tabCurrentIndex, // Byte 查询的审核类型
				count: this.count, // Integer
				offset: this.offset, // Integer
			}
			this.getExamineByPer(cnt)

		},
		onReachBottom() {
			this.page = this.page + 1
			let cnt = {
				orgId: this.user.orgId, // Long 组织编号
				userId: this.user.id, // Long 用户编号
				permissionIds: this.permissions, // String 用户角色
				type: this.tabCurrentIndex, // Byte 查询的审核类型
				count: this.count, // Integer
				offset: (this.page - 1) * this.count // Integer
			}
			this.getExamineByPer(cnt)
		}
	}
</script>

<style lang="scss">
	/* 顶部tabbar */
	.nav-bar {
		position: fixed;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 50%;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 50%;
			}
		}
	}

	.content-box {
		width: auto;
		padding: 90rpx 30rpx 30rpx 30rpx;
	}

	.item-box {
		width: auto;
		margin-top: 20rpx;
		padding: 30rpx;
		border-bottom: 1px solid #e8e8e8;
	}

	.item-box-text {
		float: left;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 65%;

		.item-box-title {
			line-height: 50rpx;
			font-size: 28rpx;
			color: #666;
		}

		.item-box-time {
			line-height: 40rpx;
			font-size:20rpx;
			color: #666;
		}

	}

	.item-box-status {
		float: left;
		width: 35%;
		line-height: 90rpx;
		font-size: 28rpx;
		color: #f44;
	}

	.footer-box {
		width: auto;
		padding: 40rpx;

	}
</style>
