<template>
	<view>
		<view v-if="pageStatus != 'onload'">
			<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image></view>
			<image class="view-bg" src="/static/image/bg_c.png" mode="aspectFill"></image>

			<view style="position: relative;"><task-list :tasks="tasks" type="1"></task-list></view>
			<view class="bottom-box">
				<image class="title-bg" src="/static/image/mytask/pic_bj.png" mode="aspectFit"></image>
				<view class="list-title">收到{{ tasks[0].applyNum }}个报价</view>
				<view class="list-box">
					<view v-for="(item, index) in list" :key="index">
						<view class="user-list flex-box" @click="navToUser(item)">
							<view class="flex-box">
								<image class="user-head" :src="ossSrc + item.user.userHead" mode="aspectFill"></image>
								<view style="margin-left: 30rpx;">
									<view class="user-name">{{ item.user.userName }}</view>
									<view>{{ getTimeAgo(item) }}</view>
								</view>
							</view>
							<view>
								<view class="price-box">{{ item.offer }}</view>
								<view>澳元/总价</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<loading :status="pageStatus"></loading>
	</view>
</template>

<script>
import Loading from '@/components/Loading/Loading.vue';
import TaskList from '@/components/task/TaskList.vue';

export default {
	components: {
		Loading,
		TaskList
	},
	data() {
		return {
			pageStatus: 'onload',

			orderId: '',
			taskId: '',
			list: [],
			ossSrc: this.$constData.oss,

			tasks: uni.getStorageSync('taskInfo')
		};
	},
	methods: {
		navToUser(item) {
			uni.setStorageSync('itemUserText', item.data);
			uni.navigateTo({
				url: `./userView?id=${item.id}&userId=${item.user.userId}&taskId=${this.taskId}`
			});
		},

		navBack() {
			uni.navigateBack();
		},

		getTimeAgo(item) {
			return this.$commen.getTimeAgo(item.createTime);
		},

		getTaskApplys(cnt) {
			this.$api.getTaskApplys(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					console.log(this.$util.tryParseJson(res.data.c));
					this.list = this.$util.tryParseJson(res.data.c);
					this.pageStatus = 'succc';
				} else {
					this.pageStatus = 'error';
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		}
	},
	onLoad(res) {
		this.taskId = res.id;
		let cnt = {
			taskId: res.id, // Long 任务编号
			// status: status, // Byte <选填> 状态
			// userId: userId, // Long <选填> 接单者编号
			count: 10, // int
			offset: 0 // int
		};
		this.getTaskApplys(cnt);
	}
};
</script>

<style lang="scss" scoped>
.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	position: relative;
	z-index: 1;
	padding-top: var(--status-bar-height);
	height: 88rpx;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.view-bg {
	position: absolute;
	top: 0;
	z-index: 0;
	width: 100vw;
	height: 50vh;
	overflow: hidden;
}

.user-list {
	justify-content: space-between;
	height: 140rpx;
	font-size: 20rpx;
	color: #999999;
	line-height: 20rpx;
	border-bottom: 1rpx solid #eff0f4;
}

.user-head {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}

.bottom-box {
	margin-top: 10rpx;
	position: relative;
	background-color: #ffffff;
	border-radius: 20rpx 20rpx 0 0;
	min-height: calc(100vh - var(--status-bar-height) - 470rpx);
}

.list-title {
	position: relative;
	padding: 60rpx 0 0 50rpx;
	color: #333333;
	font-size: 34rpx;
	line-height: 48rpx;
}

.title-bg {
	position: absolute;
	right: 11rpx;
	top: 20rpx;
	width: 569rpx;
	height: 105rpx;
}

.list-box {
	margin: 40rpx 50rpx 0;
	border-top: 1rpx solid #eff0f4;
}

.user-name {
	font-size: $group-font;
	line-height: 37rpx;
	color: #333333;
	margin-bottom: 12rpx;
}

.price-box {
	color: #ffa405;
	font-size: 40rpx;
	line-height: 47rpx;
	margin-bottom: 10rpx;
}
</style>
