<template>
	<view>
		<view class="flex-box body-box">
			<image class="bg-img" src="/static/image/shop/fbcg_g.png" mode="aspectFit"></image>
			<view class="top-title-box">发布成功</view>
			<view class="top-info-box">将你的商品分享出来，会有更多的人关注哦～</view>
			<view class="flex-box share-box">
				<view class="share-btn flex-box" :style="index == 0?'margin-left:0;':''" v-for="(item,index) in list" :key="index">
					<view class="share-icon flex-box">
						<image :src="item.icon" mode="aspectFit"></image>
					</view>
					<view>{{item.name}}</view>
				</view>
			</view>
			<view class="bottom-info">恭喜，大家已经看到你的商品了</br>然后可以在商城的产品清单和我的商品中可见</view>

			<view class="close-btn flex-box" @click="navToHome">
				<image src="/static/image/shop/icon_close.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '聊天',
						icon: '/static/image/icon/icon_lt.png'
					},
					{
						name: '发现',
						icon: '/static/image/icon/icon_fx.png'
					},
					{
						name: '微信',
						icon: '/static/image/icon/icon_wx.png'
					},
					{
						name: '朋友圈',
						icon: '/static/image/icon/icon_pyq.png'
					}
				]
			};
		},
		methods: {
			navToHome() {
				uni.switchTab({
					url: '/pages/shop/shop'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.flex-box {
		display: flex;
		align-items: center;
	}

	.body-box {
		padding-top: calc(var(--status-bar-height) + 88rpx);
		justify-content: center;
		flex-direction: column;
	}

	.bg-img {
		width: 320rpx;
		height: 243rpx;
	}

	.top-title-box {
		color: #333333;
		font-size: 50rpx;
		line-height: 70rpx;
		margin-top: 46rpx;
	}

	.top-info-box {
		color: #333333;
		font-size: 30rpx;
		line-height: 42rpx;
		margin-top: 50rpx;
	}

	.share-box {
		color: #999999;
		font-size: 26rpx;
		line-height: 37rpx;
		justify-content: center;
		padding: 70rpx 30rpx;
		margin: 70rpx 40rpx;
		border: 1rpx solid #EFF0F4;
		border-left: none;
		border-right: none;
	}

	.share-btn {
		justify-content: center;
		flex-direction: column;
		margin-left: 70rpx;
	}

	.share-icon {
		justify-content: center;
		box-sizing: border-box;
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
		border: 1rpx solid #CFDCE9;
		margin-bottom: 24rpx;

		image {
			width: 45rpx;
			height: 45rpx;
		}
	}

	.bottom-info {
		text-align: center;
		color: #999999;
		font-size: 26rpx;
		line-height: 40rpx;
	}

	.close-btn {
		position: fixed;
		bottom: 49rpx;
		justify-content: center;
		padding: 40rpx;

		image {
			width: 36rpx;
			height: 36rpx;
		}
	}
</style>
