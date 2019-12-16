<template>
	<view>
		<!-- 任务栏组件 -->
		<view class="task-box" :class="{'my-task':showStatus()}" v-for="(item,index) in tasks" :key="index" @click="getItem(item)">
			<view class="task-top">
				<view class="task-l-img"></view>
				<view class="task-top-l">{{taskType[item.taskType].name}}</view>
				<view class="task-top-r">AUD {{item.taskBudget}}</view>
			</view>
			<view class="task-center">{{item.taskDescribe}}</view>
			<view class="task-bottom">
				<view class="task-bottom-box" v-if="item.olddata">
					<view class="task-rec">接收</view>
					<view class="data">{{item.olddata}}</view>
				</view>
				<view class="task-bottom-box">
					<view class="task-recc">完成</view>
					<view class="data">{{getTime(item.finishDate)}}</view>
				</view>
			</view>
			<view class="status-box" v-if="showStatus()">
				<!-- <image :src="taskStatus[item.status].icon" mode="aspectFit"></image> -->
				<image :src="getIcon(item)" mode="aspectFit"></image>
				<!-- <view>{{taskStatus[item.status].val}}</view> -->
				<view>{{getStatus(item)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['tasks', 'type', 'myTask'],
		data() {
			return {
				taskStatus: this.$constData.taskStatus,
				taskType: this.$constData.taskType
			}
		},
		methods: {
			getIcon(item) {
				if (item.status == this.$constData.taskWall[2].key) {
					return this.$constData.taskWall[2].icon
				} else if (item.taskStatus == this.taskStatus[1].key) {
					if (this.myTask) {
						return this.taskStatus[1].icon[0]
					} else {
						return this.taskStatus[1].icon[1]
					}
				} else {
					return this.taskStatus[item.taskStatus].icon
				}
			},

			getStatus(item) {
				if (item.status == this.$constData.taskWall[2].key) {
					return this.$constData.taskWall[2].val
				} else if (item.taskStatus == this.taskStatus[0].key) {
					return this.taskStatus[0].val
				} else {
					if (this.myTask) {
						return this.taskStatus[item.taskStatus].val[0]
					} else {
						return this.taskStatus[item.taskStatus].val[1]
					}
				}
			},

			getTime(time) {
				return this.$commen.getNewDate(time)
			},

			getItem(item) {
				this.$emit('getItem', item)
			},

			showStatus() {
				if (this.type == 1) {
					return true
				} else {
					return false
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.task-box {
		background-color: #FFFFFF;
		width: 690rpx;
		height: 260rpx;
		margin: 30rpx;
		box-shadow: 0 0 15rpx 0 rgba($color: #B6C4D2, $alpha: .4);
	}

	.task-top {
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.task-l-img {
		width: 5rpx;
		height: 40rpx;
		position: absolute;
		top: 45rpx;
		left: 0;
		border-radius: 0 4rpx 4rpx 0;
		background-color: #24D4D0;
	}

	.task-top-l {
		height: 48rpx;
		line-height: 48rpx;
		font-size: 34rpx;
		color: #464042;
		padding: 40rpx 0 30rpx 40rpx;

	}

	.task-top-r {
		height: 42rpx;
		line-height: 42rpx;
		color: #FFA405;
		font-size: 30rpx;
		padding-top: 49rpx;
		padding-right: 30rpx;
	}

	.task-center {
		height: 40rpx;
		color: #666666;
		font-size: 28rpx;
		line-height: 40rpx;
		margin: 0rpx 0 30rpx 40rpx;
	}

	.task-bottom {
		display: flex;
		justify-content: flex-start;
		justify-content: space-between;
		padding: 0 66rpx 0 40rpx;
	}

	.task-bottom-box {
		display: flex;
		align-items: center;
	}

	.task-rec {
		border-radius: 18rpx;
		background-color: rgba(255, 164, 5, .2);
		font-size: 20rpx;
		line-height: 28rpx;
		color: #FFA405;
		padding: 5rpx 10rpx;
	}

	.task-recc {
		border-radius: 18rpx;
		background-color: rgba(0, 200, 190, .2);
		font-size: 20rpx;
		line-height: 28rpx;
		color: #00C8BE;
		padding: 5rpx 10rpx;
	}

	.data {
		height: 40rpx;
		color: #666666;
		font-size: 28rpx;
		line-height: 40rpx;
		margin-left: 20rpx;
	}

	.my-task {
		height: 320rpx;
	}

	.status-box {
		display: flex;
		align-items: center;
		margin: 30rpx 0 0 40rpx;
		color: $group-color-befor;
		font-size: $group-font;

		image {
			width: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
		}
	}
</style>
