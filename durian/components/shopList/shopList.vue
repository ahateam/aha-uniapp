<template>
	<view>
		<view class="contentList" :style="type == 0?cardBg:''" v-for="(item,index) in list" :key="index" @click="navToInfo(item)">
			<!-- 平台商品背景图片    -->
			<image v-if="type != 0" class="card-img" :src="type == 1?cardImgSrcY:cardImgSrcB" mode=""></image>

			<!-- 标题 -->
			<view class="titleBox" :style="type == 2?'color:#FFFFFF':''">{{item.title}}</view>

			<!-- 价值 -->
			<view class="priceBox" :class="type == 2?'card-bg-B':''" :style="type == 1?cardInfo:''">{{item.price}}</view>

			<!-- 自由商品图片 -->
			<image class="stuty-img" :src="item.src" mode="aspectFill" v-if="type == 0"></image>

			<!-- 平台商品兑换价格 -->
			<view class="cardPrice" :style="type == 2?'color:#FFFFFF':''" v-else-if="type != 0">
				平台币{{item.cardPrice}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list', 'type'],
		data() {
			return {
				cardInfo: 'color:#333333;opacity: .5;',
				cardBg: 'box-shadow: 0 0 15rpx 0 rgba(182, 196, 210, 0.4);border:1rpx solid #CFDCE9',
				cardImgSrcY: '/static/image/shop/bg_gwk_2.png',
				cardImgSrcB: '/static/image/shop/bg_gwk_1.png'
			}
		},
		methods: {
			navToInfo(item) {
				if (this.type == 0) {
					uni.navigateTo({
						url: '/pages/shop/goodsInfo/studyGoods'
					})
				} else {
					uni.navigateTo({
						url: `/pages/shop/goodsInfo/goodsInfo`,
					})
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.contentList {
		position: relative;
		width: 670rpx;
		height: 180rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		padding: 15rpx 20rpx 15rpx 30rpx;
	}

	.stuty-img {
		position: absolute;
		top: 15rpx;
		right: 20rpx;
		width: 150rpx;
		height: 150rpx;
		border-radius: 6rpx;
	}

	.titleBox {
		position: relative;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: #333333;
		margin-top: 25rpx;
		margin-bottom: 20rpx;
		margin-right: 155rpx;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.priceBox {
		position: relative;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: #FFA405;
	}

	.cardPrice {
		position: absolute;
		top: 50%;
		right: 15rpx;
		font-size: 28rpx;
		line-height: 50rpx;
		height: 50rpx;
		margin-top: -25rpx;
		color: #FFA405;
		border-radius: 25rpx;
	}

	.card-img {
		position: absolute;
		width: 714rpx;
		height: 223rpx;
		top: 50%;
		margin-top: -111.5rpx;
		left: -22rpx;
	}

	.card-bg-B {
		color: #FFFFFF;
		opacity: .5;
	}
</style>
