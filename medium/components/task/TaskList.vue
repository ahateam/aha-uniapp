<template>
	<view>
		<!-- 任务栏组件 -->
		<view class="task-box" :class="{'my-task':showStatus()}" v-for="(item,index) in tasks" :key="index" @click="getItem(item)">
			<view class="task-top">
				<view class="task-l-img"></view>
				<view class="task-top-l">{{item.name}}</view>
				<view class="task-top-r">AUD {{item.money}}</view>
			</view>
			<view class="task-center">{{item.infor}}</view>
			<view class="task-bottom">
				<view class="task-bottom-r">
					<text class="task-rec">接收</text>
					<text class="data">{{item.olddata}}</text>
				</view>
				<view class="task-bottom-l">
					<text class="task-recc">完成</text>
					<text class="data">{{item.newsdata}}</text>
				</view>
			</view>
			<view class="status-box" v-if="showStatus()">
				<image :src="taskStatus[item.status].icon" mode="aspectFit"></image>
				<view>{{taskStatus[item.status].val}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['tasks', 'type'],
		data() {
			return {
				taskStatus: this.$constData.taskStatus
			}
		},
		methods: {
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

			getStatus(status) {

			}
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
		border: 0 4rpx 4rpx 0;
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
		flex-wrap: wrap;
		margin-left: 40rpx;
	}

	.task-rec {
		border-radius: 18rpx;
		height: 38rpx;
		background-color: rgba(255, 164, 5, .2);
		font-size: 20rpx;
		line-height: 28rpx;
		color: #FFA405;
		padding: 5rpx 10rpx;
	}

	.task-recc {
		border-radius: 18rpx;
		height: 38rpx;
		background-color: rgba(0, 200, 190, .2);
		font-size: 20rpx;
		line-height: 28rpx;
		color: #00C8BE;
		padding: 5rpx 10rpx;
	}

	.task-bottom-l {
		margin-left: 114rpx;
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
