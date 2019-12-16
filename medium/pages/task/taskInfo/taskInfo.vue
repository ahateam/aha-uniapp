<template>
	<view style="padding-bottom: 30rpx;">
		<view class="top-box">
			<image class="top-bg" src="/static/image/task/bg_rwmx.png" mode="aspectFill"></image>
			<view class="top-content">
				<image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image>
				<view class="top-info-box">
					<view class="top-name">{{task.userName}}</view>
					<view class="top-time"><text class="iconfont iconshengri"></text><text>{{task.userTime}}</text></view>
				</view>
			</view>
			<view class="top-head">
				<image class="top-head-bg" src="/static/image/user/icon_xstx.png" mode="aspectFit"></image>
				<image class="top-head-img" :src="task.userHead" mode="aspectFill"></image>
			</view>
		</view>

		<view class="content-box">
			<view class="content-title">
				<view class="content-title-text">任务明细</view>
				<image class="content-title-bg" src="/static/image/task/icon_bg_y.png" mode="aspectFit"></image>
			</view>

			<view class="auto-box-white space-box">
				<view class="left-title">任务发布者</view>
				<view class="right-info">{{task.taskType}}</view>
			</view>
			<view class="auto-box-white space-box">
				<view class="left-title">任务名称</view>
				<view class="right-info">{{task.taskName}}</view>
			</view>
			<view class="auto-box-white no-border">
				<view class="left-title">任务描述</view>
				<view class="right-info" style="margin-top: 29rpx;">{{task.taskDescribe}}</view>
			</view>

			<view class="block-box">
				<view class="auto-box-gray space-box">
					<view class="left-title bottom-font">任务发布者</view>
					<view class="right-info bottom-font">{{task.userName}}</view>
				</view>
				<view class="auto-box-gray space-box">
					<view class="left-title bottom-font">发布时间</view>
					<view class="right-info bottom-font">{{getDateTime(task.taskCreateTime)}}</view>
				</view>
				<view class="auto-box-gray space-box">
					<view class="left-title bottom-font">价格</view>
					<view class="right-info bottom-font" style="color: #FFA405;">AUD {{task.taskBudget}}</view>
				</view>
				<view class="auto-box-gray space-box">
					<view class="left-title bottom-font">完成时间</view>
					<view class="right-info bottom-font">{{getDateTime(task.finishDate)}}</view>
				</view>

				<view class="auto-box-gray space-box" style="border: none;">
					<view class="left-title bottom-font">接受者所需证书</view>
					<view class="right-info bottom-font">{{task.qualifications}}</view>
				</view>
			</view>
		</view>

		<view class="bottom-btn">
			<button @click="acceptTask">接任务</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageStatus: 'loading',

				task: {
					// userName: '张曦',
					// userTime: '2019-10-08',
					// userHead: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574775543939&di=34f1f8a709ce6958adff33a33c218451&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Fface%2F97ea0b38bc4afa00e0b00b9035eb31368fa94f11.jpg',
					// taskType: '全案助理',
					// taskTitle: '500签证全案助理',
					// taskText: '请帮忙填写签证相关内容，我是第一次申请，需要准备的资料还很多，听朋友说你们是专业的，拜托你们啦！',
					// taskTime: '2019-10-08',
					// taskPrice: 'AUD 300',
					// taskData: {
					// 	name: '翻译证书',
					// 	dataName: '我的成绩单.docx',
					// 	dataSize: '216K'
					// }
				}
			}
		},
		methods: {
			// 接收任务
			acceptTask() {
				uni.navigateTo({
					url: `../acceptTask/acceptTask?id=${this.task.taskId}`
				})
			},

			navBack() {
				uni.navigateBack()
			},

			getUserByTaskId(cnt) {
				this.$api.getUserByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c)
						console.log(obj)
						console.log('______________________________________')
						this.task = { ...this.task,
							...obj.publishUser
						}
						console.log(this.task)
					} else {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						})
					}
				})
			},

			getDateTime(time) {
				return this.$commen.getNewDate(time)
			},
		},
		onLoad(res) {
			let cnt = {
				taskId: res.id, // Long 任务id
			}
			this.getUserByTaskId(cnt)
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
		padding: 70rpx 0 0 20rpx;
	}

	.top-info-box {
		margin-top: 61rpx;
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
		background-color: #FFFFFF;
		width: 100%;
		border-radius: 40rpx 40rpx 0 0;
		padding-top: 8rpx;
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
		padding: 0 15rpx;
		background-color: #F8FAFB;
	}

	.auto-box-gray {
		position: relative;
		padding: 30rpx 15rpx;
		width: 660rpx;
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
		margin-top: -20rpx;
		width: 100%;

		button {
			margin: 0 auto;
			background-color: #EE455A;
			line-height: 102rpx;
			width: 690rpx;
			font-size: 36rpx;
			color: $group-color-w;
			border-radius: 6rpx;

			&:after {
				border: none;
			}
		}
	}
</style>
