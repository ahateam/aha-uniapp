<template>
	<view class="page">
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">任务总览</view>
		</nav-bar>
		<view class="box">
			<view class="title white">我发布的</view>
			<view class=" list-box white">
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_yfk.png" mode="aspectFit"></image>
						<view class="list-red white">1</view>
					</view>
					<view>已付款</view>
				</view>
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_yfp.png" mode="aspectFit"></image>
						<view class="list-red white">1</view>
					</view>
					<view>已分配</view>
				</view>
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_cg.png" mode="aspectFit"></image>
						<view class="list-red white">1</view>
					</view>
					<view>草稿</view>

				</view>
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_ddfp.png" mode="aspectFit"></image>
						<view class="list-red white">1</view>
					</view>
					<view>等待分配</view>
				</view>
			</view>
		</view>
		<!-- dsadsad-->
		<view class="box">
			<view class="title white">我接收的</view>
			<view class=" list-box white uni-flex-just">
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_jxz.png" mode="aspectFit"></image>
						<view class="list-red white">1</view>
					</view>
					<view>进行中</view>

				</view>
				<view class="list">
					<view class="top-img-box">
						<view class="list-red white">1</view>
						<image class="status-icon" src="/static/image/icon/user/task/icon_wcwsk.png" mode="aspectFit"></image>
					</view>
					<view>完成未收款</view>
				</view>
				<view class="list">
					<view class="top-img-box">
						<image class="status-icon" src="/static/image/icon/user/task/icon_ysk.png" mode="aspectFit"></image>
						<view class="list-red white">1</view>
					</view>
					<view>已收款</view>

				</view>
			</view>
		</view>
		<view class="title white">游览历史</view>
		<view class="history">
			<image class="history-img" src="/static/image/icon/icon_l.png" mode="aspectFit"></image>
			<view>2019-10-01</view>
			<image class="history-img" src="/static/image/icon/icon_r.png" mode="aspectFit"></image>
		</view>

		<other-task-list :tasks="taskList"></other-task-list>

	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import OtherTaskList from '@/components/task/OtherTaskList.vue'

	export default {
		name: 'assistant',
		components: {
			navBar,
			OtherTaskList
		},
		data() {
			return {
				taskList: [
					{
						name: '全案助理',
						money: 100,
						infor: '500签证全案',
						time: '2019-10-10'
					},
					{
						name: '翻译',
						money: 300,
						infor: '学生成绩单翻译',
						time: '2019-10-10'
					}
				]
			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.history {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.history>view {
		margin: 20rpx 23rpx;
		color: #999999;
		font-size: 26rpx;
	}

	.history-img {
		width: 141rpx;
		height: 16rpx;
	}

	.top-img-box {
		position: relative;
		width: 60rpx;
		margin: 0 auto;
	}

	.box {
		margin-bottom: 20rpx;
	}

	.list-box {
		display: flex;
	}

	.uni-flex-just {
		justify-content: center;
	}

	.list {
		flex: 1;
		position: relative;
		margin-bottom: 30rpx;
		text-align: center;
	}

	.status-icon {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 20rpx;
		margin-top: 19rpx;
	}

	.list>text {
		font-size: 28rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #666666;
	}

	.list-red {
		position: absolute;
		top: 0;
		right: -18rpx;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 3rpx solid #EE455A;
		box-shadow: 0 0 0 3rpx $group-color-w;
		color: #EE455A;
		font-size: 22rpx;
		line-height: 36rpx;
		text-align: center;
	}

	.page {
		background-color: #F2F5F7;
		min-height: 100vh;
	}

	.white {
		background-color: #FFFFFF;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.view-title {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	// 导航 end
	.title {
		padding: 30rpx 0 30rpx 40rpx;
		color: #333333;
		font-size: 34rpx;
	}
</style>
