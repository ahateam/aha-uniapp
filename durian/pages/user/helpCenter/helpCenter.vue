<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#333333">
			<!-- <view slot="right" class="navTitle" @click="navToMobile">免密登录</view> -->
			<image slot="left" class="back-icon" @click="navBack" src="/static/image/icon/icon_fh.png" mode="aspectFit"></image>
			<view>帮助中心</view>
		</navBar>
		<view style="padding-top: 64px;"></view>

		<view class="help-title">产品重要功能说明</view>
		<view class="help-list flex-box" v-for="(item,index) in helpList" :key="index" @click="navToHelp(item.src)">
			<view class="flex-box">
				<image class="left-icon" :src="item.img" mode="aspectFit"></image>
				<text>{{item.title}}</text>
			</view>
			<image class="next-icon" src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		name: 'helpCenter',
		components: {
			navBar
		},
		data() {
			return {
				helpList: [{
						title: '如何获取平台币',
						src: '/pages/user/helpCenter/',
						img: '/static/image/user/one.png'
					},
					{
						title: '如何跟踪自己的申请',
						src: '/pages/user/helpCenter/',
						img: '/static/image/user/two.png'
					}
				]
			}
		},
		methods: {
			navToHelp(src) {
				uni.navigateTo({
					url: src
				})
			},
			navBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.back-icon {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		left: 29rpx;
	}

	.help-title {
		color: #333333;
		font-size: $group-font-befor;
		margin: 40rpx 0 0 60rpx;
	}

	.help-list {
		margin: 30rpx 40rpx;
		padding-right: 30rpx;
		background-color: $group-color-search;
		line-height: 100rpx;
		font-size: $group-font-befor;
		color: $group-color;
	}

	.flex-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.next-icon {
		width: 21rpx;
		height: 21rpx;
	}

	.left-icon {
		height: 100rpx;
		width: 120rpx;
		margin-right: 13rpx;
	}
</style>
