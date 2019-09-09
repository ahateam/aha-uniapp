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
				<view class="info-status-text">
					最多选投:{{activeNums}} 项
				</view>
			</view>
			<view class="info-text">
				应到总人数：{{quorum}} 人，已参投有效人数：{{ticketCount}} 人，已投票数：{{opsNum}}票，其中弃权人数：{{waiver}} 人，未参投人数：{{quorum-ticketCount}} 人
			</view>
		</view>
		<view class="poll-content">
			<view class="poll-content-text">
				{{pollInfo.remark}}
			</view>
		</view>
		<view class="poll-item-box">
			<view v-for="(item,index) in pollOptions" :key="index">
				<view v-for="(item1,index1) in optionActive" :key="index1">
					<!-- 未被选中的选项样式 -->
					<view v-if="index ==index1 && item1==false" @click="voteBtn(item,item1,index1)">
						<view class="poll-item poll-item-unActive">
							{{item.title}}
						</view>
					</view>
					<!-- 被选中的选项样式 -->
					<view v-if="index ==index1 && item1==true" @click="voteBtn(item,item1,index1)">
						<view class="poll-item poll-item-active">
							{{item.title}}
						</view>
					</view>
				</view>
			</view>
			<view style="clear: both;"></view>
		</view>
		<view class="poll-btn">
			222
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pollInfo',
		data() {
			return {
				pollInfo: {},
				pollDetail: {},
				pollOptions: [],
				optionActive: [],

				/*初始化投票统计信息*/
				quorum: 0, //应到人数
				opsNum: 0, //已投票数
				waiver: 0, //弃权人数
				ticketCount: 0, //已投人数
				activeNums: 0, //最大可选的选项数
				/* 初始化选项状态相关*/
				isPollShow: false, //是否已经投票
				isBtnShow: false, //是否显示提交投票按钮
				/*初始化投票状态相关*/
				status:-1,
				successData:[],

			}
		},
		methods: {

			/*获取投票详情*/
			getVoteDetail(cnt) {
				this.$api.getVoteDetail(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.pollDetail = this.$util.tryParseJson(res.data.c)
						console.log('------------')
						console.log(this.pollDetail)
						this.ticketCount = this.pollDetail.ticketCount
						this.quorum = this.pollDetail.vote.quorum
						//计算弃权人数
						for (let i = 0; i < this.pollDetail.ops.length; i++) {
							if (this.pollDetail.ops[i].title == '弃权') {
								this.waiver += this.pollDetail.ops[i].ballotCount
							}
							this.opsNum += this.pollDetail.ops[i].ballotCount
						}
					}
				})
			},
			/*获取投票的选项列表*/
			getVoteOptions(cnt) {
				this.$api.getVoteOptions(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.pollOptions = this.$util.tryParseJson(res.data.c)
						let cnt = {
							voteId: this.pollInfo.id,
							userId: JSON.parse(uni.getStorageSync('userInfo')).id,
						}
						console.log(cnt)
						this.getVoteTicket(cnt)
					}
				})
			},

			/*获取用户的选票*/
			getVoteTicket(cnt) {
				this.$api.getVoteTicket(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let userTicket = this.$util.tryParseJson(res.data.c)
						if (!userTicket) { //没有投票
							this.voteShow = false //未投票
							this.subBtnShow = true //显示投票按钮
							//设置为所有的选项均为未投票
							for (let i = 0; i < this.pollOptions.length + 1; i++) {
								this.optionActive.push(false)
							}
						} else { //已经投票了的需要打标记
							this.voteShow = true //已投票
							this.subBtnShow = false //隐藏投票按钮
							//设置为所有的选项均为未投票
							for (let i = 0; i < this.pollOptions.length + 1; i++) {
								this.optionActive.push(false)
							}
							//已投选项的id列表
							let selection = JSON.parse(userTicket.selection)
							if (selection.length == 0) {
								console.log('弃权')
							} else {
								//已经投票的所有选项打上对应的标记
								for (let i = 0; i < selection.length; i++) { //投有效票的展示
									for (let j = 0; j < voteOptionArr.length; j++) {
										if (selection[i] == voteOptionArr[j].id) {
											this.optionActive[j] = true
										}
									}
								}
							}
						}
					}
					this.getStatus()
				})
			},

			/** 点击选项*/
			voteBtn(item, item1, index1) {
				if (item.title == '弃权') { //单击弃权按钮
					for (let i = 0; i < this.optionActive.length; i++) {
						this.$set(this.optionActive, i, false)
					}
					if (item1 == false) {
						this.$set(this.optionActive, index1, true)
						this.activeNums = 1
					} else {
						this.$set(this.optionActive, index1, false)
						this.activeNums = this.pollInfo.choiceCount
					}
				} else { //非弃权按钮
					let count = 0
					for (let i = 0; i < this.optionActive.length; i++) {
						if (this.optionActive[i] == true) {
							count = count + 1
						}
					}
					if (item1 == false) {
						if (count == this.activeNums) {
							uni.showToast({
								icon:'none',
								title: '选项数量不能超出限制',
								duration: 500
							});
						} else {
							this.$set(this.optionActive, index1, true)
						}
					} else {
						this.$set(this.optionActive, index1, false)
					}
				}
			},
			
			/** 计算投票状态*/
			getStatus(){
				  this.successData = []
                let ops = this.pollDetail.ops
			
				let  passData = Math.ceil((this.quorum *(parseFloat(this.pollInfo.effectiveRatio)/100)))
                let  failData =  Math.ceil(this.quorum *(parseFloat(this.pollInfo.failureRatio)/100))
				
				
				
                if(this.waiver >=failData){     //无效
                    this.status = 0
                }else{                          //有效
                    let  successType = 0  //默认是不成功
					
                    for(let i=0;i<ops.length;i++){
                        if(ops[i].ballotCount >= passData) {
                            successType = 1         //成功的中间变量
                        }
                    }
					
                    if(successType == 1){
						
                        for(let i=0;i<ops.length;i++){
                            if(ops[i].ballotCount >= passData && this.ticketCount >= failData  ){
                                this.status = 1                 //通过
                                this.successData.push(ops[i].title)
                            }
                        }
                    }else{
                        if(this.ticketCount ==this.quorum){     //人到齐了
                            this.status = 2             //失败
                        }else{
                            this.status = -1             //等待投票
                        }
                    }
                }
				
			}




		},
		onLoad() {
			let poll = uni.getStorageSync('poll')
			this.pollInfo = JSON.parse(poll)
			this.activeNums = this.pollInfo.choiceCount
			console.log(this.pollInfo)

			let cnt = {
				voteId: this.pollInfo.id
			}
			this.getVoteDetail(cnt)
			this.getVoteOptions(cnt)
			
		}

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

	.poll-content {
		width: auto;
		padding: 40rpx;

		.poll-content-text {
			width: auto;
			line-height: 40rpx;
			color: #666;
			font-size: 28rpx;
		}
	}

	/** 投票列表项相关*/
	.poll-item-box {
		width: auto;
		margin-top: 10rpx;

		.poll-item {
			float: left;
			margin: 20rpx 0 0 40rpx;
			padding: 20rpx 40rpx;
			font-size: 28rpx;
			border-radius: 15rpx;
		}
	}

	.poll-item-unActive {
		background: #fff;
		color: $jiti-color-blue;
		border: 2rpx solid $jiti-color-blue;
	}

	.poll-item-active {
		background: $jiti-color-blue;
		color: #fff;
		border: 2rpx solid $jiti-color-blue;
	}

	/* 按钮相关*/
	.poll-btn {
		padding: 20rpx;
		margin-top: 40rpx;
	}
</style>
