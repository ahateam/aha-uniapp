<template>
	<view>
		<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" mode="aspectFit" @click="navBack"></image></view>
		<view v-for="(item, index) in list" :key="index">
			<view class="user-list flex-box" @click="navToUser(item)">
				<view class="flex-box">
					<image class="user-head" :src="ossSrc + item.user.userHead" mode="aspectFill"></image>
					{{ item.user.userName }}
				</view>
				<view>{{ item.offer }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderId: '',
			taskId: '',
			list: [],
			ossSrc: this.$constData.oss
		};
	},
	methods: {
		navToUser(item) {
			uni.navigateTo({
				url: `./userView?id=${item.id}&head=${this.ossSrc + item.user.userHead}&taskId=${this.taskId}`
			});
		},

		navBack() {
			uni.navigateBack();
		},

		getTaskApplys(cnt) {
			this.$api.getTaskApplys(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					console.log(this.$util.tryParseJson(res.data.c));
					this.list = this.$util.tryParseJson(res.data.c);
				} else {
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

.user-list {
	padding: 20rpx;
	justify-content: space-between;
}

.user-head {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}
</style>
