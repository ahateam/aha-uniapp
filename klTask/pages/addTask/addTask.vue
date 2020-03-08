<template>
	<view class="page">
		<image class="view-bg" src="/static/image/bg_c.png" mode="aspectFill"></image>
		<view style="position: relative;">
			<view class="view-title">发布任务</view>
			<view class="view-tip">最近的热门任务</view>
			<view class="content-box">
				<view class="task-type-box">
					<view v-for="(item, index) in list" :key="index">
						<view :style="(index + 1) % 3 == 0 ? 'margin-right:0;' : ''" class="task-type-list" @click="navToAdd(item)">
							<image src="/static/image/login/codeBG.png" mode="aspectFill"></image>
							<view>{{ item.name }}</view>
						</view>
					</view>
				</view>
				<view class="bottom-btn">其他所有</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: '房屋维修'
				},
				{
					name: '翻译业务'
				},
				{
					name: '清洁保洁'
				},
				{
					name: '专车接送'
				},
				{
					name: '搬家搬运'
				},
				{
					name: '签证办理'
				},
				{
					name: '花园维护'
				},
				{
					name: '宠物寄养'
				},
				{
					name: '专业摄影'
				}
			]
		};
	},
	methods: {
		navToAdd(item) {
			this.$store.dispatch('setStore').then(res => {
				if (item.name == '清洁保洁') {
					uni.navigateTo({
						url: 'cleanTask/cleanTask'
					});
				} else if (item.name == '搬家搬运') {
					uni.navigateTo({
						url: 'CarryTask/CarryTask'
					});
				} else if (item.name == '专车接送') {
					uni.navigateTo({
						url: 'specialCar/specialCar'
					});
				} else {
					uni.navigateTo({
						url: './addTaskInfo'
					});
				}
			});
		},
		getTaskTags(cnt) {
			this.$api.getTaskTags(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					console.log(this.$util.tryParseJson(res.data.rc));
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		}
	},
	onLoad() {
		let cnt = {
			groupId: 1, // Long 分类id
			count: 10, // int
			offset: 0 // int
		};
		this.getTaskTags(cnt);
	}
};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: $group-color-bg;
	color: #ffffff;
	box-sizing: border-box;
	padding-bottom: 30rpx;
}

.view-bg {
	position: absolute;
	top: 0;
	z-index: 0;
	width: 100vw;
	height: 100vh;
}

.view-title {
	padding: 128rpx 0 0 40rpx;
	font-size: 50rpx;
	line-height: 70rpx;
}

.view-tip {
	padding: 20rpx 0 0 40rpx;
	font-size: 30rpx;
	line-height: 42rpx;
}

.content-box {
	margin: 70rpx auto 0;
	width: 670rpx;
	padding: 50rpx 40rpx 30rpx;
	background-color: #ffffff;
	border-radius: 6rpx;
	box-sizing: border-box;
}

.task-type-box {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.task-type-list {
	color: #666666;
	font-size: 30rpx;
	line-height: 42rpx;
	text-align: center;
	margin: 0 55rpx 60rpx 0;

	image {
		display: block;
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		margin-bottom: 30rpx;
	}
}

.bottom-btn {
	position: relative;
	left: -10rpx;
	background-color: #0f1b07;
	border-radius: 6rpx;
	text-align: center;
	width: 610rpx;
	margin: 40rpx auto 0;
	line-height: 102rpx;
	font-size: 34rpx;
}
</style>
