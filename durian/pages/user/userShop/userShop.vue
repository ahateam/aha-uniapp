<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#000">
			<view slot="left" class="iconfont icon-fanhui backBtn" @click="navBack"></view>
			<view class="title-box">我的商品</view>
		</navBar>
		<view style="padding: 64rpx;"></view>
		<!-- 商品列表切换导航 -->
		<view class="trans">
			<view class="trans-l" @click="change" :style="!buy?'color:#587685;':'color:#FFFFFF;'">
				<image class="pt-img" :src="buy?'/static/image/shop/bg_spqd_p.png':'/static/image/shop/icon_jyl.png'" mode="scaleToFill"></image>
				<text>商品清单</text>
			</view>
			<view class="trans-l" style="margin-left: 31rpx;" @click="change" :style="!buy?'color:#FFFFFF;':'color:#587685;'">
				<image class="pt-img" :src="buy?'/static/image/shop/icon_jyl.png':'/static/image/shop/bg_spqd_p.png'" mode="scaleToFill"></image>
				<text>交易历史</text>
			</view>
		</view>
		<!-- 中间背景 -->
		<view class="bg-color"></view>
		<!-- 购买清单 -->
		<view class="buy-box">
			<view class="buy" :hidden="!buy">
				购买清单
			</view>
			<view class="buy" :hidden="buy">
				交易清单
			</view>
			<image src="/static/image/shop/icon_sx.png" mode="aspectFit"></image>
		</view>

		<view class="content-img" v-if="contentList.length == 0">
			<image src="/static/image/shop/gmqd.png" mode="aspectFit"></image>
			<view class="content-no">
				暂无清单
			</view>
		</view>
		
		<view v-else>
			
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
				buy: true, //开启
				contentList: []
			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},
			change() {
				//定义一个变量
				let clickright = 0;
				if (clickright == this.buy) {
					this.buy = true
				} else {
					this.buy = false
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.trans {
		margin: 30rpx;
		padding-top: 30rpx;
		overflow: hidden;

	}

	.trans-l {
		position: relative;
		display: inline-block;
		border-radius: 4rpx;
		width: 330rpx;
		height: 145rpx;

		text {
			position: absolute;
			height: 42rpx;
			line-height: 42rpx;
			top: 50%;
			margin-top: -21rpx;
			left: 69rpx;
			font-size: 30rpx;
		}


	}


	.bg-color {
		width: 100%;
		height: 20rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		background-color: #F2F5F7;
	}

	//购买清单
	.buy-box {
		display: flex;
		justify-content: space-between;
		padding-left: 40rpx;
		padding-right: 45rpx;
		margin-bottom: 126rpx;
	}

	.buy {
		color: #333333;
		font-size: 30rpx;
		height: 42rpx;
		line-height: 42rpx;
	}

	.buy-box>image {
		width: 30rpx;
		height: 30rpx;
		color: #587685;
	}

	//图片的中间
	.content-img {
		margin-top: 120rpx;
		text-align: center;
	}

	.content-img>image {
		width: 222rpx;
		height: 293rpx;
		margin-bottom: 60rpx;
	}

	// 图片下面的文字
	.content-no {
		height: 42rpx;
		line-height: 42rpx;
		color: #B6C4D2;


	}

	.pt-img {
		width: 100%;
		height: 100%;
	}
</style>
