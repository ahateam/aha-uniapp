<template>
	<view>
		<view class="nav-bar" :style="{ height: navHeight }"></view>
		<view :style="{ 'padding-top': navHeight }"></view>
		<view class="view-title">发布任务</view>

		<view class="content-list">
			<view
				class="list-box"
				:class="{ 'curr-box': currIndex == index }"
				v-for="(item, index) in taskList"
				:key="index"
				@touchstart="changeCurr(index)"
				@touchend="resetStyle()"
				@click="navToAdd(item)"
			>
				<image :src="item.img" mode="aspectFit"></image>
				<view>{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';

let getNumber = 0;

export default {
	name: 'index',
	data() {
		return {
			navHeight: this.getNavHeight(),
			taskList: this.$constData.taskType,
			currIndex: -1,
			userInfo: ''
		};
	},
	watch: {
		isSDKReady(newVal) {
			if (newVal) {
				this.getUserProfile();
			}
		}
	},
	computed: {
		...mapState({
			isLogin: state => state.user.isLogin,
			isSDKReady: state => state.user.isSDKReady
		})
	},
	methods: {
		getNavHeight() {
			return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px';
			uni.getStorageSync('userInfo');
		},

		changeCurr(index) {
			this.currIndex = index;
		},

		resetStyle() {
			this.currIndex = -1;
		},

		navToAdd(item) {
			if (item.src) {
				this.$store.dispatch('setStore').then(res => {
					if (res == 'succ') {
						this.$store.commit('updateType', item.key);
						uni.navigateTo({
							url: item.src,
							success: () => {
								let icon = plus.nativeObj.View.getViewById('icon');
								setTimeout(function() {
									icon.hide();
								}, 100);
							}
						});
					} else {
						uni.showToast({
							title: 'error!',
							icon: 'none'
						});
					}
				});
			}
		},

		getByQualId(cnt) {
			this.$api.getByQualId(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					this.$store.commit('updateQualList', this.$util.tryParseJson(res.data.c));
				} else {
					if (getNumber == 2) {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						});
					} else {
						setTimeout(() => {
							getNumber += 1;
							let cnt1 = {
								count: 100,
								offset: 0
							};
							this.getByQualId(cnt1);
						}, 500);
					}
				}
			});
		}
	},
	onShow() {
		this.$commen.showTabIcon();
	},
	onLoad() {
		if (this.$store.state.task.qualiList.length == 0) {
			let cnt = {
				count: 100,
				offset: 0
			};
			this.getByQualId(cnt);
		}
	}
};
</script>

<style lang="scss" scoped>
.view-title {
	color: #333333;
	font-size: 50rpx;
	margin-left: 30rpx;
}

.nav-bar {
	position: fixed;
	z-index: 1;
	width: 100%;
	background-color: #ffffff;
}

.list-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 0.3s;
	width: 330rpx;
	height: 250rpx;
	margin: 0 30rpx 30rpx 0;
	background-color: $group-color-search;
	border-radius: 4rpx;
	font-size: $group-font-befor;
	color: $group-color;
	line-height: 42rpx;

	image {
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 18rpx;
	}
}

.content-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 40rpx 0 0 30rpx;
}

.curr-box {
	background-color: rgba($color: #182f45, $alpha: 0.2);
}
</style>
