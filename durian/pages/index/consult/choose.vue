<template>
	<view class="body">
		<view class="topBox"><view class="title_box">咨询</view></view>
		<view class="contentList">
			<button class="contentBox" v-for="(item, index) in contentList" :key="index" :style="index % 2 == 1 ? 'margin-right:0;' : ''" @click="navToConsult">
				{{ item.name }}
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			contentList: [
				{
					name: '升学转学'
				},
				{
					name: '留学'
				},
				{
					name: '移民'
				},
				{
					name: '陪读'
				},
				{
					name: '工作'
				},
				{
					name: '短期培训'
				},
				{
					name: '投资'
				},
				{
					name: '探亲旅游'
				},
				{
					name: '商务考察'
				},
				{ name: '其他' }
			]
		};
	},
	onLoad() {
		// uni.setStorageSync('userId', 1234567890)
		console.log(uni.getStorageSync('userInfo'));
		if (!uni.getStorageSync('userInfo')) {
			uni.reLaunch({
				url: '../login/mobile'
			});
		}
	},
	methods: {
		navToConsult() {
			uni.showLoading({
				title: '查找中介中'
			});
			let cnt = {};
			this.getUserInter(cnt);
		},

		getUserInter(cnt) {
			this.$api.getUserInter(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					uni.hideLoading()
					let toUserInfo = this.$util.tryParseJson(res.data.c);
					uni.redirectTo({
						url: '../chat?type=' + this.$constData.TIM_TYPE[0].key + '&conversationId=' + toUserInfo.userId
					});
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.body {
	margin: 0 $group-margin-top;
}

.topBox {
	position: relative;
}

.title_box {
	font-size: $group-font-big;
	line-height: $group-font-big-line;
	font-weight: $group-title-weight;
	color: #333333;
}

.contentList {
	display: flex;
	margin-top: 25rpx;
	flex-wrap: wrap;
	align-items: center;

	.button-hover {
		background-color: #00c8be;
		color: #ffffff;
	}
}

.contentBox {
	border-radius: 4rpx;
	width: 330rpx;
	line-height: 130rpx;
	font-size: 34rpx;
	color: #869ca7;
	margin: 15rpx 0;
	margin-right: 30rpx;
	transition: all 0.2s;

	&:after {
		border: none;
	}
}
</style>
