<template>
	<view>
		<!-- 任务栏组件 -->
		<view class="task-box" v-for="(item,index) in tasks" :key="index" @click="getItem(item)">
			<view class="task-content">
				<view class="task-top">
					<view class="task-l-img"></view>
					<view class="task-top-l">{{item.name}}</view>
					<view class="task-top-r">AUD {{item.money}}</view>
				</view>
				<view class="task-center flex-box">
					<image class="left-icon" src="/static/image/icon/addTask/icon_bgtx.png" mode="aspectFit"></image>
					<view>{{item.infor}}</view>
				</view>
				<view class="task-center flex-box" style="justify-content: space-between;">
					<view class="flex-box">
						<image class="left-icon" src="/static/image/icon/addTask/icon_bgtx.png" mode="aspectFit"></image>
						<view>{{item.time}}</view>
					</view>
					<image class="right-icon" src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['tasks', 'type'],
		data() {
			return {

			}
		},
		methods: {
			getItem(item) {
				this.$emit('getItem', item)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.task-box {
		padding: 30rpx;
	}

	.task-content {
		background-color: #FFFFFF;
		box-shadow: 0 0 15rpx 0 rgba($color: #B6C4D2, $alpha: .4);
		width: 690rpx;
		height: 250rpx;
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
		height: 42rpx;
		line-height: 42rpx;
		font-size: 30rpx;
		color: #464042;
		padding: 40rpx 0 30rpx 40rpx;

	}

	.task-top-r {
		line-height: 42rpx;
		color: #FFA405;
		font-size: 30rpx;
		padding-top: 49rpx;
		padding-right: 30rpx;
	}

	.task-center {
		color: #666666;
		font-size: 26rpx;
		line-height: 37rpx;
		margin: 0rpx 0 30rpx 40rpx;

		.left-icon {
			width: 26rpx;
			height: 26rpx;
			margin-right: 20rpx;
		}
	}

	.flex-box {
		display: flex;
		align-items: center;
	}

	.right-icon {
		width: 20rpx;
		height: 20rpx;
		padding-right: 47rpx;
	}
</style>
