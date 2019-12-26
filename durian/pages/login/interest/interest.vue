<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#869CA7">
			<!-- <view slot="right" class="navTitle" @click="navToMobile">免密登录</view> -->
			<image slot="left" class="back-icon" @click="navBack" src="/static/image/icon/icon_fh.png" mode="aspectFit"></image>
			<view slot="right" class="next-btn" @click="navHome">跳过</view>
		</navBar>
		<view :style="{'padding-top':getNavHeight()}"></view>

		<view class="title-box">
			告诉我们你的兴趣吧
		</view>

		<view class="portBox" v-for="(item,index) in interList" :key="index" @click="choiceInter(index)">
			<image :src="item.imgSrc" mode="aspectFill"></image>
			<view class="portText">
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		components: {
			navBar
		},
		data() {
			return {
				interList: [{
						name: '留学',
						imgSrc: '/static/image/interest/bg_lx.png'
					},
					{
						name: '移民',
						imgSrc: '/static/image/interest/bg_ym.png'
					}
				]
			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},

			navHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			choiceInter(e) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}


	.title-box {
		margin: 50rpx 0 0 40rpx;
		font-size: 36rpx;
		color: #333333;
		padding-bottom: 10rpx;
	}

	.portBox {
		position: relative;
		display: flex;
		align-items: center;
		margin: $group-margin-top auto 0;
		width: 690rpx;
		height: 320rpx;
		border-radius: 6rpx;
		overflow: hidden;
		color: $group-color-w;
		font-size: 50rpx;

		image {
			position: absolute;
			width: 100%;
			height: 100%;
		}
	}

	.portText {
		position: relative;
		width: 100%;
		text-align: right;
		margin-right: 80rpx;
	}

	.next-btn {
		font-size: 30rpx;
	}
</style>
