<template>
	<view>
		<view v-if="pageStatus != 'onload'">
			<image class="top-bg" src="/static/image/share/bg_fxdlr.png" mode="widthFix"></image>
			<view class="nav-bar flex-box">
				<image class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
				<view class="iconfont icon-xing" @click="likeAgent"></view>
			</view>
			<view class="agent-box">
				<image class="agent-head" :src="constData.oss + userInfo.userHead" mode="aspectFill"></image>
				<image class="agent-icon" src="/static/image/icon/icon_dlr_xz.png" mode="aspectFit"></image>
			</view>
			<view class="auto-box agent-name flex-box">{{ userInfo.userName }}</view>
			<view v-for="(item, index) in list" :key="index">
				<view class="auto-box flex-box" v-if="item.id">
					<view class="left-name">{{ item.name }}</view>
					<view>{{ item.id }}</view>
				</view>
			</view>
			<view class="bottom-btn" @click="newMess">立即咨询</view>
		</view>
		<loading :status="pageStatus"></loading>
	</view>
</template>

<script>
import Loading from '@/components/Loading/Loading.vue';

export default {
	components: {
		Loading
	},
	data() {
		return {
			userInfo: {},
			pageStatus: 'onload',
			constData: this.$constData,

			list: [
				{
					name: 'MARN号',
					id: ''
				},
				{
					name: 'FIER号',
					id: ''
				},
				{
					name: 'NAATI号',
					id: ''
				}
			]
		};
	},
	methods: {
		newMess() {
			uni.navigateTo({
				url: `/pages/index/chat?conversationId=${this.userInfo.userId}&type=${this.$constData.TIM_TYPE[0].key}`
			});
		},
		navBack() {
			uni.navigateBack();
		},
		likeAgent() {},
		getUserInfo(cnt) {
			this.$api.getUserInfo(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					this.userInfo = this.$util.tryParseJson(res.data.c);
					this.list[0].id = this.userInfo.marnNumber;
					this.list[1].id = this.userInfo.fierNumber;
					this.list[2].id = this.userInfo.naatiNumber;
					console.log(this.userInfo);
					this.pageStatus = true;
				} else {
					console.log(2333);
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		}
	},
	onLoad(res) {
		console.log(res);
		let cnt = {
			userId: res.id
		};
		this.getUserInfo(cnt);
	}
};
</script>

<style lang="scss" scoped>
.top-bg {
	position: absolute;
	width: 100vw;
	height: 316rpx;
}

.flex-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.nav-bar {
	position: relative;
	padding: var(--status-bar-height) 0 0;
	height: 88rpx;
}

.back-icon {
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.icon-xing {
	font-size: 34rpx;
	padding: 28rpx 38rpx;
	color: $group-color;
}

.agent-box {
	position: relative;
	width: 120rpx;
	height: 120rpx;
	margin: 48rpx 40rpx 0;
}

.agent-head {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
}

.agent-icon {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 27rpx;
	height: 39rpx;
}

.auto-box {
	height: 120rpx;
	margin: 0 40rpx;
	width: 670rpx;
	color: #333333;
	font-size: $group-font-befor;
	line-height: $group-font-befor-line;
	border-bottom: 1rpx solid $group-color-border;
}

.agent-name {
	font-size: 40rpx;
	margin-top: 20rpx;
}

.left-name {
	color: #666666;
}

.bottom-btn {
	margin: 100rpx auto 0;
	width: 690rpx;
	background-color: #00c8be;
	line-height: 102rpx;
	color: $group-color-w;
	font-size: 36rpx;
	text-align: center;
	border-radius: 6rpx;

	&:active {
		opacity: 0.8;
	}
}
</style>
