<template>
	<view>
		<view class="header-box">
			<view class="title-box">
				<span v-if="pollInfo.template == '1'" class="poll-icon-color1 iconfont icon-paimingbiaoqian"></span>
				<span v-if="pollInfo.template == '0'" class="poll-icon-color iconfont icon-user-list"></span>
				{{pollInfo.title}}
			</view>
		</view>
		<view class="poll-info">
			<view class="info-status">
				<view class="info-xuantou">
					<span style="color:#40c9c6" v-if="status == '-1'">投票未完成</span>
					<span v-if="status =='0'" style="color: #909399">投票失效</span>
					<span v-if="status =='1'" style="color: #67C23A">投票成功</span>
					<span v-if="status =='2'" style="color: #F56C6C">投票失败</span>

				</view>

			</view>
			<view class="info-text">
				应到总人数：{{quorum}} 人，已参投有效人数：{{ticketCount}} 人，已投票数：{{opsNum}}票，其中弃权人数：{{waiver}} 人，未参投人数：{{quorum-ticketCount}} 人
			</view>
		</view>
		<view v-for="(item,index) in opsList" :key="index">
			<view class="poll-content-active " v-if="status =='1' && item.ballotCount >= passData">
				<view class="poll-content-text-active">
					{{item.title}}
				</view>
				<view class="poll-content-text-num-active">
					{{item.ballotCount}}
				</view>
			</view>
			<view v-else class="poll-content ">
				<view class="poll-content-text">
					{{item.title}}
				</view>
				<view class="poll-content-text-num">
					{{item.ballotCount}}
				</view>
			</view>
		</view>
		<view class="footer-box">
			<button type="default" @click="toBack()">返回上一页</button>
			<button type="default" @click="toBackList()">返回投票列表</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pollRes',
		data() {
			return {
				pollInfo: '',
				pollDetail: '',
				ticketCount: 0,
				quorum: 0,
				waiver: 0,
				opsNum: 0,
				status: -1,
				opsList: [],
				passData: 0,
			}
		},



		methods: {
			/*获取投票详情*/
			getVoteDetail(cnt) {
				this.$api.getVoteDetail(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.pollDetail = this.$util.tryParseJson(res.data.c)
						this.pollInfo = this.pollDetail.vote
						console.log('------------')
						console.log(this.pollDetail)
						this.ticketCount = this.pollDetail.ticketCount
						this.opsList = this.pollDetail.ops
						this.quorum = this.pollDetail.vote.quorum
						//计算弃权人数
						for (let i = 0; i < this.pollDetail.ops.length; i++) {
							if (this.pollDetail.ops[i].title == '弃权') {
								this.waiver += this.pollDetail.ops[i].ballotCount
							}
							this.opsNum += Number(this.pollDetail.ops[i].ballotCount)
						}
						this.getStatus()
					}
				})
			},
			/** 计算投票状态*/
			getStatus() {
				this.successData = []
				let ops = this.pollDetail.ops

				let effectiveRatio = 0
				let failureRatio = 0
				if (this.pollInfo.effectiveRatio == 33) {
					effectiveRatio = 1 / 3
				} else if (this.pollInfo.effectiveRatio == 50) {
					effectiveRatio = 1 / 2
				} else {
					effectiveRatio = 2 / 3
				}
				if (this.pollInfo.failureRatio == 33) {
					failureRatio = 1 / 3
				} else if (this.pollInfo.failureRatio == 50) {
					failureRatio = 1 / 2
				} else {
					failureRatio = 2 / 3
				}


				let passData = Math.ceil(this.quorum * effectiveRatio)
				let failData = Math.ceil(this.quorum * failureRatio)
				this.passData = passData


				if (this.waiver >= failData) { //无效
					this.status = 0
				} else { //有效
					let successType = 0 //默认是不成功

					for (let i = 0; i < ops.length; i++) {
						if (ops[i].ballotCount >= passData) {
							successType = 1 //成功的中间变量
						}
					}

					if (successType == 1) {

						for (let i = 0; i < ops.length; i++) {
							if (ops[i].ballotCount >= passData && this.ticketCount >= failData) {
								this.status = 1 //通过
								this.successData.push(ops[i].title)
							}
						}
					} else {
						if (this.ticketCount == this.quorum) { //人到齐了
							this.status = 2 //失败
						} else {
							this.status = -1 //等待投票
						}
					}
				}

			},
			toBack() {
				uni.navigateBack();
			},
			toBackList() {
				uni.navigateBack({
					delta: 2
				});
			}
		},
		onLoad() {
			let poll = uni.getStorageSync('poll')

			console.log('----------------------')
			// console.log(poll)
			let cnt = {
				voteId: poll
			}
			this.getVoteDetail(cnt)

		},
	}
</script>

<style scoped lang="scss">
	.poll-icon-color {
		color: $jiti-color-purple;
	}

	.poll-icon-color1 {
		color: $jiti-color-blue;
	}

	.header-box {
		width: auto;
		padding: 20rpx;
		border-bottom: 2rpx solid #e8e8e8;
	}

	.title-box {
		width: auto;
		line-height: 50rpx;
		color: #666;
		font-size: 32rpx;

		span {
			margin-right: 15rpx;
		}
	}

	/** poll 基础信息部分*/

	.info-status {
		padding: 20rpx;
		width: auto;
		height: 60rpx;

		.info-xuantou {
			float: left;
			line-height: 60rpx;
			font-size: 28rpx;
			color: #666;
		}

		.info-status-text {
			float: right;
			line-height: 60rpx;
			font-size: 28rpx;
			color: #666;
		}
	}

	.info-text {
		margin: 0 auto;
		width: 90%;
		background: #fff7cc;
		padding: 20rpx;
		border-radius: 15rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		color: #f56723;
	}

	/** 选项列表*/
	.poll-content {
		width: auto;
		padding: 40rpx;
		border-bottom: 1px solid #e8e8e8;
		overflow: hidden;

		.poll-content-text {
			float: left;
			width: 80%;
			line-height: 50rpx;
			color: #666;
			font-size: 28rpx;

		}

		.poll-content-text-num {
			float: left;
			width: 20%;
			line-height: 50rpx;
			color: #666;
			font-size: 28rpx;
			color: #f44;
		}
	}

	.poll-content-active {
		width: auto;
		padding: 40rpx;
		border-bottom: 1px solid #e8e8e8;
		overflow: hidden;
		background: #6CBAF8;

		.poll-content-text-active {
			float: left;
			width: 80%;
			line-height: 50rpx;
			color: #fff;
			font-size: 28rpx;
			background: #6CBAF8;
		}

		.poll-content-text-num-active {
			float: left;
			width: 20%;
			line-height: 50rpx;
			font-size: 28rpx;
			color: #f44;
			background: #6CBAF8;
		}
	}

	/* 底部按钮*/
	.footer-box {
		width: auto;
		margin-top: 40rpx;
		padding: 40rpx;
	}
</style>
