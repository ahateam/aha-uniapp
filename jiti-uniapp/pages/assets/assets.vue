<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in groups" :key="index" class="nav-item" :class="{current: item.groupId === tabCurrentIndex}"
			 @click="changeTag(item.groupId)">{{item.keyword}}</view>
		</scroll-view>

		<view class="content-box">
			<view v-if="list.length>0">
				<view v-for="(item,index) in list" :key="index">
					<view class="item-box" @click="toAssetInfo(item)">
						<view class="item-box-text">
							<view class="item-box-title">{{item.name}}</view>
							<view class="item-box-time">{{item.location}}</view>
						</view>
						<view class="item-box-status"> 详情</view>
						<view style="clear: both;"></view>
					</view>
				</view>
			</view>
			<view class="item-box" style="font-size: 28rpx;" v-else>
				暂无资产信息
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
		data() {
			return {


				scrollLeft: 0, //顶部选项卡左滑距离,
				tagActiveId: '400548885618571', //默认标签id-全部

				userId: '',

				contents: [0, 1, 2, 3], //内容列表

				//上拉加载 ---分页


				pageOver: false, //还能不能分页



				orgId: '',
				tabCurrentIndex: 0, //当前选项卡id
				list: [],
				groups: [],
				page: 1,
				offset: 0,
				count: 10,



			}
		},

		methods: {
			/* 触发改变选中标签*/
			changeTag(id) {
				this.tabCurrentIndex = id
				this.page = 1
				this.list = []
				if (id == 0) {
					let cnt = {
						orgId: this.orgId,
						count: this.count,
						offset: this.offset
					}
					this.queryAssets(cnt)
				} else {
					let groups = [this.tabCurrentIndex]
					let cnt = {
						orgId: this.orgId, // Long 组织编号
						groups: groups, // JSONArray <选填> 分组,String[]格式
						count: this.count, // Integer 
						offset: this.offset, // Integer 
					}
					this.getAssetsByGroups(cnt)
				}
			},

			//根据分组id获取资产列表
			getAssetsByGroups(cnt) {
				this.$api.getAssetsByGroups(cnt, (res) => {
					let arr = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						arr = JSON.parse(res.data.c)
					} else {
						arr = []
					}
					this.list = this.list.concat(arr)
				})
			},
			//获取所有的资产列表
			queryAssets(cnt) {
				this.$api.queryAssets(cnt, (res) => {
					let arr = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						arr = JSON.parse(res.data.c)
					} else {
						arr = []
					}
					this.list = this.list.concat(arr)
				})
			},

			//获取分组列表
			getTagGroupTree(cnt) {
				this.$api.getTagGroupTree(cnt, (res) => {
					this.groups = JSON.parse(res.data.c)
					let obj1 = {
						keyword: "组织资产",
						groupId: 102
					}
					let obj = {
						keyword: "全部资产",
						groupId: 0
					}
					this.groups.unshift(obj1)
					this.groups.unshift(obj)
				})
			},
			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			toAssetInfo(item){
				let info = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'./assetsInfo?info='+info
				})
			}
		},


		onLoad() {
			this.orgId = JSON.parse(uni.getStorageSync('orgUserInfo')).orgId
			let cnt = {
				orgId: this.orgId,
				count: this.count,
				offset: this.offset
			}
			let cnt1 = {
				orgId: this.orgId,
				groupId: 100
			}
			this.queryAssets(cnt)
			this.getTagGroupTree(cnt1)
		},
		/**分页*/
		onReachBottom() {
			this.page = this.page + 1
			if (this.tabCurrentIndex == 0) {
				let cnt = {
					orgId: this.orgId,
					count: this.count,
					offset: (this.page - 1) * this.count, // Integer 
				}
				this.queryAssets(cnt)
			} else {
				let groups = [this.tabCurrentIndex]
				let cnt = {
					orgId: this.orgId, // Long 组织编号
					groups: groups, // JSONArray <选填> 分组,String[]格式
					count: this.count, // Integer 
					offset: (this.page - 1) * this.count, // Integer 
				}
				this.getAssetsByGroups(cnt)
			}
		}

	}
</script>

<style scoped lang="scss">
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
			width: 150upx;
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
		width: 80%;

		.item-box-title {
			line-height: 50rpx;
			font-size: 28rpx;
			color: #666;
		}

		.item-box-time {
			line-height: 40rpx;
			font-size: 24rpx;
			color: #666;
		}

	}

	.item-box-status {
		float: left;
		width: 20%;
		line-height: 90rpx;
		font-size: 28rpx;
		color: $jiti-color-blue;
	}

	.footer-box {
		width: auto;
		padding: 40rpx;

	}
</style>
