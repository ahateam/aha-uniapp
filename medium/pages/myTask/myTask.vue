<template>
	<view class="page">
		<view class="test" :style="{height:getStatusHeight()}"></view>
		<!-- 顶部选项卡 -->
		<view class="nav-box">
			<view class="view-title">我的任务</view>
			<view class="flex-box nav-list">
				<view class="top-options flex-box" :class="[{active:currIndex == index},index == 0?'top-left-icon':'top-right-icon']"
				 :style="index == 0?'margin-left:0;':''" v-for="(item,index) in navList" :key="index" @click="topoption(index)">
					<view>{{item.text}}</view>
					<image :src="currIndex == index?item.currImg:item.img" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 顶部选项卡 end -->
		<task-list :tasks="tasks" @getItem="navToInfo" :type="1"></task-list>
		<!-- 任务栏  task==任务栏-->
	</view>
</template>

<script>
	import TaskList from '@/components/task/TaskList.vue'

	export default {
		components: {
			TaskList
		},
		data() {
			return {
				clickTab: true,
				currIndex: 0,
				navList: [{
						text: '我发布的',
						img: '/static/image/icon/task/icon_wfbd.png',
						currImg: '/static/image/icon/task/icon_wfbd_p.png'
					},
					{
						text: '我接收的',
						img: '/static/image/icon/task/icon_wjsd.png',
						currImg: '/static/image/icon/task/icon_wjsd_p.png'
					}
				],
				// 我的任务信息列表

				tasks: [{
						name: '全案助理',
						money: 100,
						infor: '500签证全案',
						olddata: '2019-10-01',
						newsdata: '2019-10-09',
						status: 0
					},
					{
						name: '翻译',
						money: 300,
						infor: '学生成绩单翻译',
						olddata: '2019-10-01',
						newsdata: '2019-10-09',
						status: 1
					},
					{
						name: '拽写文书',
						money: 300,
						infor: '学生个人陈述验证',
						olddata: '2019-10-01',
						newsdata: '2019-10-09',
						status: 2
					},
					{
						name: '其他',
						money: 300,
						infor: '学生个人陈述验证',
						olddata: '2019-10-01',
						newsdata: '2019-10-09',
						status: 3
					}
				],
			}
		},
		methods: {
			getStatusHeight() {
				return uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			navToInfo(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/myTask/taskInfo/taskInfo',
					success: () => {
						let icon = plus.nativeObj.View.getViewById("icon");
						setTimeout(function() {
							icon.hide();
						}, 100);
					}
				})
			},

			topoption(index) {
				this.currIndex = index
			},

		},
		onShow() {
			this.$commen.showTabIcon()
		},
		onLoad() {

		}
	}
</script>

<style lang="scss" scoped>
	.test {
		position: fixed;
		z-index: 999;
		top: 0;
		width: 100%;
		background-color: #FFFFFF;
	}

	view {
		box-sizing: border-box;
	}

	.page {
		background-color: #F2F5F7;
		padding-bottom: 1rpx;
	}

	.view-title {
		color: #333333;
		font-size: 50rpx;
		line-height: 70rpx;
		padding-top: 128rpx;
	}

	.nav-box {
		position: relative;
		background-color: #FFFFFF;
		padding: 0 29rpx 30rpx;
	}

	.flex-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-list {
		margin-top: 40rpx;
	}

	.top-options {
		padding: 0 40rpx;
		height: 130rpx;
		width: 330rpx;
		background-color: $group-color-search;
		color: $group-color;
		font-size: $group-font-befor;
		border-radius: 4rpx;
		transition: all .3s;
	}

	.active {
		color: #FFFFFF;
		background: linear-gradient(90deg, #35536F, #11273B);
	}

	.top-left-icon {
		image {
			width: 60rpx;
			height: 66rpx;
		}
	}

	.top-right-icon {
		image {
			width: 70rpx;
			height: 76rpx;
		}
	}
</style>
