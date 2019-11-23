<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#464042">
			<!-- <view slot="right" class="navTitle" @click="navToMobile">免密登录</view> -->
			<image slot="left" class="back-icon" @click="navBack" src="/static/image/icon/icon_fh.png" mode="aspectFit"></image>
			<view class="nav-title">谁可以看</view>
			<button slot="right" class="next-btn" @click="changeStatus">完成</button>
		</navBar>
		<view style="padding-top: 64px;"></view>

		<view class="status-list">
			<view class="flex-box" v-for="(item,index) in statusList" :key="index" @click="choiceSee(index)">
				<image class="choice-icon" :class="{'curr-icon':index == statusCurr}" src="/static/image/icon/icon_choose.png" mode="aspectFit"></image>
				<view class="right-text">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		name: 'canSee',
		components: {
			navBar
		},
		data() {
			return {
				statusList: [{
						name: '所有',
					},
					{
						name: '仅校内可见'
					},
					{
						name: '仅校外可见'
					}
				],
				statusCurr: 0,

			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},
			changeStatus() {
				uni.setStorageSync('createStatus', this.statusCurr)
				this.navBack()
			},

			choiceSee(e) {
				this.statusCurr = e
			},
		},
		onLoad() {
			this.statusCurr = uni.getStorageSync('createStatus')
		}
	}
</script>

<style lang="scss" scoped>
	.back-icon {
		width: 33rpx;
		height: 33rpx;
		position: absolute;
		left: 29rpx;
	}

	.status-list {
		line-height: 120rpx;
		font-size: $group-font-befor;
		color: #666666;
	}

	.flex-box {
		display: flex;
		align-items: center;
	}

	.choice-icon {
		width: 24rpx;
		height: 20rpx;
		opacity: 0;
		padding: 0 30rpx 0 40rpx;
		transition: all .3s;
	}

	.right-text {
		width: 100%;
		padding-left: 4rpx;
		border-bottom: 1rpx solid $group-color-border;
	}

	.curr-icon {
		opacity: 1;
	}

	.next-btn {
		line-height: 60rpx;
		font-size: $group-font-befor;
		color: $group-color-w;
		border-radius: 4rpx;
		background-color: #24D4D0;
		padding: 0 20rpx;

		&:after {
			border: none;
		}
	}

	.nav-title {
		font-weight: normal;
		font-size: 36rpx
	}
</style>
