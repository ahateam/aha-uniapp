<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tagsList" :key="index" class="nav-item" :class="{current: item.key === tabCurrentIndex}"
			 @click="changeTag(item.key)">{{item.val}}</view>
		</scroll-view>


		<view class="content-box">
			<view class="loading-box" v-if="tabCurrentIndex ==0">
				<view v-if="voteList.length>0">
					<view v-for="(item,index) in voteList" :key="index">

						<view class="vote-item-box" @click="checkItemBtn(item)">
							<view class="vote-item-title">
								<view class="vote-item-note">
									<span v-if="item.template == '1'">
										<i class="poll-icon-color1 iconfont icon-paimingbiaoqian"></i>
									</span>
									<span v-if="item.template == '0'">
										<i class="poll-icon-color iconfont icon-user-list"></i>
									</span>
								</view>
								<view class="vote-item-text">
									<view class="vote-item-status status-success-color" v-if="item.status == voteStatus[0].key ">{{voteStatus[0].val}}</view>
									<view class="vote-item-status status-warning-color" v-else-if="item.status == voteStatus[1].key ">{{voteStatus[1].val}}</view>
									<view class="vote-item-status status-danger-color" v-else-if="item.status == voteStatus[2].key ">{{voteStatus[2].val}}</view>
									<view class="vote-item-title-box">{{item.title}}</view>
								</view>
							</view>

							<view class="vote-item-content">
								<view :class="item.template=='0'?'vote-item-btn poll-box-bg1':'vote-item-btn poll-box-bg'" v-if="item.status == '0' ">
									<span>
										投票
									</span>
								</view>

								<view :class="item.template=='0'?'vote-item-btn poll-box-bg1':'vote-item-btn poll-box-bg'" v-if="item.status == '1' ">
									<span>
										详情
									</span>
								</view>
								<view :class="item.template=='0'?'vote-item-btn poll-box-bg1':'vote-item-btn poll-box-bg'" v-if="item.status != '0'  && item.status != '1'">
									<span>
										结果
									</span>
								</view>
								<view class="vote-item-info">{{item.remark}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="vote-totle">
					暂无投票列表信息
				</view>
			</view>
			<view class="load-box" v-if="tabCurrentIndex ==1">
				<view v-if="voteList.length>0">
					<view v-for="(item,index) in voteList" :key="index">
						<view class="vote-item-box" @click="checkItemBtn(item)">
							<view class="vote-item-title">
								<view class="vote-item-note">
									<span v-if="item.template == '1'">
										<i class="poll-icon-color1 iconfont icon-paimingbiaoqian"></i>
									</span>
									<span v-if="item.template == '0'">
										<i class="poll-icon-color iconfont icon-user-list"></i>
									</span>
								</view>
								<view class="vote-item-text">
									<view class="vote-item-status status-success-color" v-if="item.status == voteStatus[0].key ">{{voteStatus[0].val}}</view>
									<view class="vote-item-status status-warning-color" v-else-if="item.status == voteStatus[1].key ">{{voteStatus[1].val}}</view>
									<view class="vote-item-status status-danger-color" v-else-if="item.status == voteStatus[2].key ">{{voteStatus[2].val}}</view>
									<view class="vote-item-title-box">{{item.title}}</view>
								</view>
							</view>

							<view class="vote-item-content">

								<view :class="item.template=='0'?'vote-item-btn poll-box-bg1':'vote-item-btn poll-box-bg'">
									<span>
										结果
									</span>
								</view>
								<view class="vote-item-info">{{item.remark}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="vote-totle">
					暂无投票列表信息
				</view>
			</view>
			<view class="load-box" v-if="tabCurrentIndex ==2">
				<view v-if="voteList.length>0">
					<view v-for="(item,index) in voteList" :key="index">
						<view class="vote-item-box" @click="checkItemBtn(item)">
							<view class="vote-item-title">
								<view class="vote-item-note">
									<span v-if="item.template == '1'">
										<i class="poll-icon-color1 iconfont icon-paimingbiaoqian"></i>
									</span>
									<span v-if="item.template == '0'">
										<i class="poll-icon-color iconfont icon-user-list"></i>
									</span>
								</view>
								<view class="vote-item-text">
									<view class="vote-item-status status-success-color" v-if="item.status == voteStatus[0].key ">{{voteStatus[0].val}}</view>
									<view class="vote-item-status status-warning-color" v-else-if="item.status == voteStatus[1].key ">{{voteStatus[1].val}}</view>
									<view class="vote-item-status status-danger-color" v-else-if="item.status == voteStatus[2].key ">{{voteStatus[2].val}}</view>
									<view class="vote-item-title-box">{{item.title}}</view>
								</view>
							</view>

							<view class="vote-item-content">
								<view :class="item.template=='0'?'vote-item-btn poll-box-bg1':'vote-item-btn poll-box-bg'">
									<span>
										详情
									</span>
								</view>

								<view class="vote-item-info">{{item.remark}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="vote-totle">
					暂无投票列表信息
				</view>
			</view>


		</view>

		<view class="footer-box">
			<button type="default" @click="toHomePage()">
				返回首页
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagsList: [{
					key: 0,
					val: '等待参与'
				}, {
					key: 1,
					val: '已参与'
				}, {
					key: 2,
					val: '全部投票'
				}], //标签列表
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离,
				orgUserInfo: '',
				//上拉加载 ---分页
				offset: 0,
				count: 10,
				page: 1,
				pageOver: false, //还能不能分页
				voteList: [],
				voteStatus: this.$constData.voteStatus


			}
		},
		methods: {
			//请求所有的投票列表
			getVotes(cnt) {
				uni.showLoading({
					title: '加载中'
				});
				this.$api.getVotes(cnt, res => {
					let data = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						data = this.$util.tryParseJson(res.data.c)
					} else {
						data = []
					}
					this.voteList = this.voteList.concat(data)

					if (data.length < this.count) {
						this.pageOver = true;
					} else {
						this.pageOver = false
					}
					uni.hideLoading()
				});
			},
			/*请求未投票的列表*/
			getNotVoteByUserRoles(cnt) {
				uni.showLoading({
					title: '加载中'
				});
				this.$api.getNotVoteByUserRoles(cnt, res => {
					let data = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let resData = this.$util.tryParseJson(res.data.c)
						data = resData.data
						this.offset = resData.offset
					} else {
						data = []
					}
					this.voteList = this.voteList.concat(data);
					console.log('----------voteList----------')
					console.log(this.voteList)
					uni.hideLoading()

				});
			},
			//请求已投票的列表
			getVoteByUserRoles(cnt) {
				uni.showLoading({
					title: '加载中'
				});
				this.$api.getVoteByUserRoles(cnt, res => {
					console.log(JSON.parse(res.data.c));
					let data = [];
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let resData = this.$util.tryParseJson(res.data.c);
						data = resData.data
						this.offset = resData.offset
					} else {
						data = [];
					}
					this.voteList = this.voteList.concat(data);
					uni.hideLoading()
				});
			},


			/* 触发改变选中标签*/
			changeTag(_index) {

				this.tabCurrentIndex = _index
				this.page = 1;
				this.offset = 0;
				this.voteList = [];
				this.loading = false;
				this.pageOver = false;
				if (_index == 0) {
					let cnt = {
						orgId: this.orgUserInfo.orgId, // Long 组织编号
						userId: this.orgUserInfo.id, // Long 用户编号
						roles: this.orgUserInfo.orgRoles, // String 角色
						count: this.count,
						offset: this.offset
					};
					this.getNotVoteByUserRoles(cnt);
				} else if (_index == 1) {
					let cnt = {
						orgId: this.orgUserInfo.orgId, // Long 组织编号
						userId: this.orgUserInfo.id, // Long 用户编号
						roles: this.orgUserInfo.orgRoles, // String 角色
						count: this.count,
						offset: this.offset
					};
					this.getVoteByUserRoles(cnt);
				} else if (_index == 2) {
					let cnt = {
						orgId: this.orgUserInfo.orgId, // Long 组织编号
						count: this.count, // Integer
						offset: this.offset // Integer
					};
					this.getVotes(cnt);
				}
			},

			/** 选中投票*/
			checkItemBtn(item) {
				console.log(item)
				uni.setStorageSync('poll', item.id);
				uni.navigateTo({
					url: './pollInfo'
				});
			},

			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}

		},
		onShow() {

			this.voteList = []
			this.page = 1
			this.tabCurrentIndex = 0
			this.offset = 0
			this.orgUserInfo = JSON.parse(uni.getStorageSync('orgUserInfo'))

			let cnt = {
				orgId: this.orgUserInfo.orgId, // Long 组织编号
				userId: this.orgUserInfo.id, // Long 用户编号
				roles: this.orgUserInfo.orgRoles, // String 角色
				count: this.count,
				offset: (this.page - 1) * this.count
			}

			this.getNotVoteByUserRoles(cnt)

		},

		/**分页*/
		onReachBottom() {
			// 异步更新数据
			if (this.tabCurrentIndex == 0) {

				this.page = this.page + 1;
				let cnt = {
					orgId: this.orgUserInfo.orgId, // Long 组织编号
					userId: this.orgUserInfo.id, // Long 用户编号
					roles: this.orgUserInfo.orgRoles, // String 角色
					count: this.count,
					offset: this.offset
				};
				this.getNotVoteByUserRoles(cnt);


			} else if (this.tabCurrentIndex == 1) {

				this.page = this.page + 1;
				let cnt = {
					orgId: this.orgUserInfo.orgId, // Long 组织编号
					userId: this.orgUserInfo.id, // Long 用户编号
					roles: this.orgUserInfo.orgRoles, // String 角色
					count: this.count,
					offset: this.offset
				};
				this.getVoteByUserRoles(cnt);



			} else if (this.tabCurrentIndex == 2) {
				this.page = this.page + 1;
				let cnt = {
					orgId: this.orgUserInfo.orgId, // Long 组织编号
					count: this.count, // Integer
					offset: (this.page - 1) * this.count
				};
				this.getVotes(cnt);


			}
		}



	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: fixed;
		z-index: 10;
		height: 90rpx;
		white-space: nowrap;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 33%;
			height: 90rpx;
			text-align: center;
			line-height: 90rpx;
			font-size: 30rpx;
			color: #303133;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4rpx solid #007aff;
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

	.poll-icon-color {
		color: $jiti-color-purple;
	}

	.poll-icon-color1 {
		color: $jiti-color-blue;
	}

	.poll-box-bg {
		background: $jiti-color-blue;
	}

	.poll-box-bg1 {
		background: $jiti-color-purple;
	}

	.vote-item-box {
		width: 96%;
		margin: 0 auto;
		height: 140rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		padding: 30rpx 0 20rpx 20rpx;
		box-shadow: 0 0 40rpx #ccc;

		.vote-item-title {
			width: 100%;
			height: 60rpx;
			border-bottom: 1px solid #ddd;

			.vote-item-note {
				float: left;
				width: 60rpx;
				height: 60rpx;

				i {
					font-size: 40rpx;
				}
			}

			.vote-item-text {
				width: auto;
				height: 60rpx;
				margin-left: 60rpx;
				text-align: left;
				font-size: 28rpx;
				color: #333;
				line-height: 60rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.vote-item-status {
					float: right;
					width: 100rpx;
					height: 60rpx;
					font-size: 24rpx;
				
					text-align: center;
				}

				.vote-item-title-box {
					width: auto;
					height: 60rpx;
					margin-right: 120rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.vote-item-content {
			width: auto;
			height: 80rpx;

			.vote-item-btn {
				float: right;
				padding: 0 10rpx;
				height: 50rpx;
				font-size: 24rpx;
				color: #666;
				text-align: center;
				line-height: 50rpx;
				border-radius: 25rpx 0 0 25rpx;
				color: #fff;
				margin-top: 30rpx;
			}

			.vote-item-info {
				width: auto;
				height: 80rpx;
				margin-right: 120rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #666;
				font-size: 28rpx;
				line-height: 120rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.vote-totle {
		width: auto;
		padding: 40rpx;
		font-size: 32rpx;
		color: #f66;
		text-align: center;
	}

	.footer-box {
		width: auto;
		padding: 40rpx;

	}
	
	.status-success-color{
		color: $jiti-color-success;
	}
	.status-warning-color{
		color: $jiti-color-warning;
	}
	.status-danger-color{
		color: $jiti-color-danger;
	}
</style>
