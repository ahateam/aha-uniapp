<template>
	<view>
		<view v-if="pageStatus != 'onload'">
			<view class="top-box">
				<image class="top-bg" src="/static/image/task/bg_rwmx.png" mode="aspectFill"></image>
				<view class="top-content">
					<image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image>
					<view class="top-info-box">
						<view class="top-name">{{task.userName}}</view>
						<view class="top-time"><text class="iconfont iconshengri"></text><text>{{getDateTime(task.brithday)}}</text></view>
					</view>
				</view>
				<view class="top-head">
					<image class="top-head-bg" src="/static/image/user/icon_xstx.png" mode="aspectFit"></image>
					<image class="top-head-img" :src="constData.oss + task.userHead" mode="aspectFill"></image>
				</view>
			</view>

			<view class="content-box">
				<!-- <view class="ditor-btn" v-if="task.taskStatus == $constData.taskStatus[0].key" @click="edtiorBtn">
				<image class="btn-bg" src="/static/image/task/bg_xixi.png" mode="aspectFit"></image>
				<view class="btn-content">
					<image src="/static/image/task/icon_gxb.png" mode="aspectFit"></image>
					更新
				</view>
			</view> -->

				<view class="content-title">
					<view class="content-title-text">我的任务</view>
					<image class="content-title-bg" src="/static/image/task/icon_bg_y.png" mode="aspectFit"></image>
				</view>
				<view class="auto-box-white space-box">
					<view class="left-title">任务分类</view>
					<view class="right-info">{{constData.taskType[task.taskType].name}}</view>
				</view>

				<view class="auto-box-white space-box">
					<view class="left-title">任务名称</view>
					<view class="right-info">{{task.taskName}}</view>
				</view>

				<view class="auto-box-white no-border">
					<view class="left-title">任务描述</view>
					<view class="right-info" style="margin-top: 29rpx;">{{task.taskDescribe}}</view>
				</view>

				<view class="block-box" v-if="task.taskStatus == 0">
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">任务发布时间</view>
						<view class="right-info bottom-font">{{getDateTime(task.taskCreateTime)}}</view>
					</view>
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">任务发布者</view>
						<view class="right-info bottom-font">{{task.userName}}</view>
					</view>
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">完成时间</view>
						<view class="right-info bottom-font">{{getDateTime(task.finishDate)}}</view>
					</view>
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">价格</view>
						<view class="right-info bottom-font" style="color: #FFA405;">AUD {{task.taskBudget}}</view>
					</view>
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">接收者所需证书</view>
						<view class="right-info bottom-font">{{task.qualName}}</view>
					</view>
					<view class="auto-box-gray space-box" style="border: none;" v-if="task.fileData">
						<view class="left-title bottom-font">共享文件</view>
						<view class="right-info bottom-font">{{task.taskData.name}}</view>
						<view class="data-box space-box" v-for="(item,index) in task.fileData" :key="index">
							<view>
								<view class="data-title">{{item.name}}</view>
								<view class="data-size">{{item.size}}</view>
							</view>
							<image class="data-icon" src="/static/image/icon/icon_docx.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>

				<view class="block-box" v-else>
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">接收人</view>
						<view class="right-info bottom-font">{{pickUpUser.userName}}</view>
					</view>
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">完成时间</view>
						<view class="right-info bottom-font">{{getDateTime(task.finishDate)}}</view>
					</view>
					<view class="auto-box-gray space-box">
						<view class="left-title bottom-font">完成状态</view>
						<view class="hsty-list">
							<view class="hsty-item" :class="[{'border-none':index == 0},{'left-dot-border':task.historyList.length  == index+1}]"
							 v-for="(item,index) in task.historyList" :key="index">
								<view>
									<view class="hsty-dot" :class="task.historyList.length  == index+1?'curr-dot':''"></view>
									<view class="hsty-text" :class="{'curr-text-color':task.historyList.length  == index+1}">{{getTime(item.changeTime)}}</view>
									<view class="hsty-text hsty-text-right" :class="{'curr-text-color':task.historyList.length  == index+1}">{{item.stepName}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="auto-box-gray space-box" v-if="task.taskStatus < 3&&task.fileData">
						<view class="left-title bottom-font">共享文件</view>
						<view class="right-info bottom-font">{{task.taskData.name}}</view>
						<view class="data-box space-box" v-for="(item,index) in task.fileData" :key="index">
							<view>
								<view class="data-title">{{item.name}}</view>
								<view class="data-size">{{item.size}}</view>
							</view>
							<image class="data-icon" src="/static/image/icon/icon_docx.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="auto-box-gray" style="border: none;padding-bottom: 15rpx;" v-if="task.taskStatus < 3&&task.imgData.length > 0">
						<view class="left-title bottom-font">收回材料</view>
						<view class="data-img-list">
							<view class="data-img-box" v-for="(item,index) in task.imgData" :key="index" :class="{'no-margin':getIndex(index)}">
								<image :src="constData.oss + item" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view class="auto-box-gray space-box" style="border: none;" v-else-if="task.taskStatus == constData.taskStatus[3].key">
						<view class="left-title bottom-font">支付信息</view>
						<view class="right-info bottom-font">{{getTime(task.payTime)}}</view>
						<view class="pay-money-text">-{{task.payPrice}}澳元</view>
					</view>
				</view>
			</view>

			<view v-if="task.taskStatus < 3" class="bottom-btn" :class="task.taskStatus == 0?'':'pay-btn'">
				<button @click="bottomBtn">{{btnName}}</button>
			</view>
		</view>

		<loading :status="pageStatus"></loading>
	</view>
</template>

<script>
	import Loading from '@/components/Loading/Loading.vue'

	export default {
		components: {
			Loading
		},
		data() {
			return {
				constData: this.$constData,
				count: 50,
				offset: 0,

				task: {
					historyList: []
				},

				pageStatus: 'onload',

				pickUpUser: {},

				btnName: '',
			}
		},
		methods: {
			getTime(time) {
				return this.$commen.getNewDate(time)
			},

			withdrawTask() {
				let cnt = {
					taskId: this.task.taskId
				}
				this.$api.withdrawTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '../myTask'
						})
						uni.showToast({
							title: '撤回成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			bottomBtn() {
				let cnt = {}
				switch (this.task.taskStatus) {
					case this.$constData.taskType[0].key:
						this.withdrawTask()
						break;
					default:
						cnt = {

						}
						this.updateTaskByTaskId(cnt)
				}
			},

			getIndex(index) {
				if ((index + 1) % 3 == 0 && index != 0) {
					return true
				}
			},

			getDateTime(time) {
				return this.$commen.getNewDate(time)
			},

			navBack() {
				uni.navigateBack()
			},

			// edtiorBtn() {
			// 	this.$store.commit('editorTask', this.task)
			// 	let src = this.$constData.taskType[this.task.taskType].src
			// 	uni.navigateTo({
			// 		url: src
			// 	})
			// },

			getChangeRecordList(cnt) {
				this.$api.getChangeRecordList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c)
						this.task.historyList = arr.list
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			getUserByTaskId(cnt) {
				this.$api.getUserByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c)
						// console.log(obj)
						if (obj.publishUser.imgData) {
							obj.publishUser.imgData = this.$util.tryParseJson(obj.imgData)
						} else {
							obj.publishUser.imgData = []
						}

						if (obj.publishUser.fileData) {
							obj.publishUser.fileData = this.$util.tryParseJson(obj.publishUser.fileData)
						} else {
							obj.publishUser.fileData = []
						}

						this.task = { ...this.task,
							...obj.publishUser
						}
						this.pickUpUser = obj.pickUpUser
						if (this.task.taskStatus == 0) {
							this.btnName = '撤回'
						} else {
							this.btnName = '付款'
						}
						this.pageStatus = 'succ'

						console.log(this.pickUpUser)
					} else {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						})
					}
				})
			},
		},
		onLoad(res) {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			let cnt = {
				taskId: res.id, // Long 任务id
				userId: userInfo.userId
			}
			this.getUserByTaskId(cnt)

			let cnt1 = {
				taskId: res.id, // Long 任务id
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			this.getChangeRecordList(cnt1)
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.top-box {
		position: relative;
		height: 400rpx;
		width: 100%;
	}

	.top-bg {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
	}

	.top-content {
		position: relative;
	}

	.back-icon {
		display: block;
		width: 33rpx;
		height: 33rpx;
		padding: 70rpx 40rpx 30rpx 20rpx;
	}

	.top-info-box {
		margin-top: 31rpx;
		color: $group-color-w;
		padding-left: 50rpx;
	}

	.top-name {
		font-size: 44rpx;
	}

	.top-time {
		display: flex;
		align-items: center;
		font-size: $group-font;
		line-height: 37rpx;
		margin-top: 20rpx;

		.iconshengri {
			font-size: 30rpx;
			margin-right: 20rpx;
		}
	}

	.top-head {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		right: 42rpx;
		bottom: 113rpx;
		text-align: center;

		.top-head-bg {
			width: 136rpx;
			height: 136rpx;
		}

		.top-head-img {
			position: absolute;
			top: 50%;
			margin-top: -60rpx;
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
	}

	.content-box {
		position: relative;
		top: -70rpx;
		overflow: hidden;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 40rpx 40rpx 0 0;
		padding: 8rpx 0 0;
	}

	.ditor-btn {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 140rpx;
		height: 80rpx;
		right: 0;
		top: 0;
	}

	.btn-bg {
		position: absolute;
		width: 140rpx;
		height: 80rpx;
	}

	.btn-content {
		display: flex;
		align-items: center;
		color: #507787;
		font-size: 26rpx;
		margin-top: -5rpx;

		image {
			width: 42rpx;
			height: 42rpx;
			margin-right: 7rpx;
		}
	}

	.content-title {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #587685;
		font-size: $group-font;
		line-height: 37rpx;
	}

	.content-title-text {
		position: absolute;
		top: 22rpx;
	}

	.content-title-bg {
		width: 229rpx;
		height: 93rpx;
	}

	.auto-box-white {
		position: relative;
		padding: 35rpx 50rpx;
		font-size: $group-font-befor;

		&:after {
			content: '';
			position: absolute;
			bottom: 1rpx;
			left: 50%;
			margin-left: -315rpx;
			width: 630rpx;
			border-bottom: 1rpx solid $group-color-border;
		}
	}

	.no-border {
		&:after {
			border: none;
		}
	}

	.space-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left-title {
		color: #666666;
	}

	.right-info {
		color: #333333;
	}

	.block-box {
		display: block;
		margin: 20rpx auto 0;
		width: 690rpx;
		padding: 0 30rpx;
		background-color: #F8FAFB;
	}

	.auto-box-gray {
		position: relative;
		padding: 30rpx 0rpx;
		width: 630rpx;
		font-size: $group-font-befor;
		border-bottom: 1rpx dotted rgba($color: #CFDCE9, $alpha: .5);
		flex-wrap: wrap;
	}

	.bottom-font {
		font-size: $group-font;
	}

	.data-box {
		width: 630rpx;
		margin: 30rpx 15rpx 0;
		padding: 20rpx;
		background-color: $group-color-w;
		border: 1rpx solid #CFDCE9;
		border-radius: 6rpx;
	}

	.data-title {
		font-size: 28rpx;
		color: $group-color;
		line-height: 30rpx;
	}

	.data-size {
		font-size: 24rpx;
		margin-top: 12rpx;
		line-height: 20rpx;
		color: $group-color-befor;
	}

	.data-icon {
		width: 80rpx;
		height: 80rpx;
	}

	.data-img-list {
		position: relative;
		left: -5rpx;
		display: flex;
		align-items: center;
		padding: 20rpx 0 0;
		flex-wrap: wrap;
	}

	.data-img-box {
		margin: 0 15rpx 15rpx 0;
		width: 200rpx;
		height: 200rpx;
		border-radius: 6rpx;
		border: 1rpx solid $group-color-befor;
		overflow: hidden;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.no-margin {
		margin-right: 0;
	}

	.bottom-btn {
		width: 100%;
		margin-top: -20rpx;
		padding: 0 30rpx 30rpx;
		box-sizing: border-box;

		button {
			background-color: #182F45;
			line-height: 102rpx;
			width: 100%;
			font-size: 36rpx;
			color: $group-color-w;
			border-radius: 4rpx;

			&:after {
				border: none;
			}
		}
	}

	.pay-btn {
		button {
			background-color: #EE455A;
		}
	}

	.hsty-list {
		margin: 50rpx 0 20rpx 10rpx;
		width: 662rpx;
	}

	.hsty-item {
		position: relative;
		width: 100%;
		height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #999999;
		line-height: 40rpx;
		border-left: 1rpx solid $group-color-befor;
		padding-left: 30rpx;
		z-index: 1;
	}

	.hsty-dot {
		position: absolute;
		bottom: -6rpx;
		left: -6rpx;
		width: 12rpx;
		height: 12rpx;
		background-color: #B6C4D2;
		border-radius: 50%;
	}

	.hsty-text {
		position: absolute;
		bottom: -20rpx;
	}

	.hsty-text-right {
		right: 0;
	}

	.border-none {
		height: 1rpx;
	}

	.curr-dot {
		background: #00C8BE;
		border: 4rpx solid #D3F6F6;
		bottom: -10rpx;
		left: -10rpx;
		box-sizing: content-box;
	}

	.curr-text-color {
		color: #00C8BE;
	}

	.left-dot-border {
		border-left: 1rpx dotted #00C8BE;
		z-index: 0;
	}

	.pay-money-text {
		width: 100%;
		color: #EE455A;
		text-align: right;
		font-size: 26rpx;
		margin: 30rpx 0 0;
	}

	.loading-view {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
