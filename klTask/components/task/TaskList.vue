<template>
	<view>
		<!-- 任务栏组件 -->
		<view class="task-box" :class="{ 'my-task': showStatus() && item.updateTime }" v-for="(item, index) in tasks" :key="index" @click="getItem(item)">
			<view>
				<view class="task-top flex-box">
					<view class="task-l-img"></view>
					<view class="task-top-l">{{ myOrder ? item.taskTitle : item.title }}</view>
				</view>
				<view class="task-address auto-font flex-box">
					<image src="/static/image/icon/position.png" mode="aspectFit"></image>
					<view>
						BOX HILL
						<text>(距我10公里)</text>
					</view>
				</view>

				<view class="flex-box task-time auto-font" v-if="showStatus() && item.updateTime">
					<view class="left-icon"></view>
					接收时间
					<text>{{ getTime(item.updateTime) }}</text>
				</view>

				<view class="flex-box task-time auto-font">
					<view class="left-icon"></view>
					完成时间
					<text>{{ getTime(myOrder ? item.task.finishTime : item.finishTime) }}</text>
				</view>

				<view class="flex-box task-time auto-font" v-if="!showStatus()">
					<view class="left-icon"></view>
					收到报价
					<text>0</text>
				</view>

				<view class="flex-box status-box" :style="!item.acceptTime ? 'margin-top: 30rpx;' : ''" v-if="showStatus()">
					<image :src="getIcon(item)" mode="aspectFit"></image>
					<view>{{ getStatus(item) }}</view>
				</view>
			</view>
			<view class="flex-box right-box" :style="showStatus() ? 'margin-top:40rpx' : ''">
				<image class="user-head" src="/static/image/login/codeBG.png" mode="aspectFill" v-if="!showStatus()"></image>
				<view class="stats-zero flex-box" :class="{ 'float-right': showStatus() }" v-if="(myOrder ? item.task.advanceType : item.advanceType) != 2">
					<view class="price-box">{{ myOrder ? item.task.advanceAmount : item.advanceAmount }}</view>
					<view v-if="(myOrder ? item.task.advanceType : item.advanceType) == 0">澳元/总价</view>
					<view v-if="(myOrder ? item.task.advanceType : item.advanceType) == 1">澳元/小时</view>
				</view>
				<view class="stats-one" v-else>由任务人报价</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'TaskList',
	props: ['tasks', 'type', 'myOrder'],
	data() {
		return {
			taskStatus: this.$constData.taskStatus,
			status: 0
		};
	},
	methods: {
		getIcon(item) {
			if (this.myOrder) {
				return this.taskStatus[item.status].icon;
			} else {
				let obj = this.$constData.taskWall.find(i => i.key == item.status);
				return obj.icon;
			}
		},

		getStatus(item) {
			if (this.myOrder) {
				return this.taskStatus[item.status].val;
			} else {
				let obj = this.$constData.taskWall.find(i => i.key == item.status);
				return obj.val;
			}
		},

		getTime(time) {
			return this.$commen.getNewDate(time);
		},

		getItem(item) {
			this.$emit('getItem', item);
		},

		showStatus() {
			if (this.type == 1) {
				return true;
			} else {
				return false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.flex-box {
	display: flex;
	align-items: center;
}

.task-box {
	display: flex;
	justify-content: space-between;
	background-color: #ffffff;
	width: 690rpx;
	height: 300rpx;
	margin: 30rpx;
	box-shadow: 0 0 15rpx 0 rgba($color: #b6c4d2, $alpha: 0.4);
	border-radius: 6rpx;
	transition: all 0.3s;
	padding-right: 50rpx;
	box-sizing: border-box;

	&:active {
		background-color: rgba($color: #f9f9f9, $alpha: 0.9);
	}
}

.task-top {
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
	background-color: $group-color-btn;
}

.task-top-l {
	height: 48rpx;
	line-height: 48rpx;
	font-size: 34rpx;
	color: #333333;
	padding: 40rpx 0 30rpx 40rpx;
}

.task-top-r {
	height: 42rpx;
	line-height: 42rpx;
	color: #ffa405;
	font-size: 30rpx;
	padding-top: 49rpx;
	padding-right: 30rpx;
}

.auto-font {
	color: #666666;
	font-size: $group-font;
	line-height: 37rpx;
}

.task-address {
	margin-left: 30rpx;

	image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
	}

	text {
		margin-left: 20rpx;
	}
}

.left-icon {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background-color: #c4d06a;
	margin: 0 22rpx;
}

.task-time {
	margin: 20rpx 0 0 16rpx;

	text {
		margin-left: 20rpx;
	}
}

.my-task {
	height: 388rpx;
}

.status-box {
	margin: 50rpx 0 0 40rpx;
	color: $group-color-btn;
	font-size: $group-font;
	line-height: 37rpx;

	image {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}
}

.right-box {
	flex-direction: column;
	margin-top: 50rpx;
	// justify-content: center;
}

.user-head {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
}

.stats-zero {
	flex-direction: column;
	font-size: 20rpx;
	color: #999999;
	line-height: 28rpx;
	margin-top: 10rpx;
}

.float-right {
	align-items: flex-end;
}

.price-box {
	font-size: 50rpx;
	color: #ffcd34;
	line-height: 58rpx;
}

.stats-one {
	color: #ffcd34;
	font-size: 24rpx;
	line-height: 33rpx;
	margin-top: 20rpx;
}
</style>
