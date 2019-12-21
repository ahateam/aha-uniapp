<template>
	<view>
		<view class="contentList" :style="item.goodsType == constData.goodsType[0].key?cardBg:''" v-for="(item,index) in list"
		 :key="index" @touchstart="change(index,item)" @touchend="changeEnd(index,item,true)" @click="navToInfo(item)">
			<!-- 平台商品背景图片    -->
			<image v-if="item.goodsType != constData.goodsType[0].key" class="card-img" :src="item.goodsType == constData.goodsType[1].key?cardImgSrcY:cardImgSrcB"
			 mode="aspectFill"></image>
			<image v-if="item.goodsType != constData.goodsType[0].key" class="card-img-tag" :src="item.goodsType == constData.goodsType[1].key?cardImgSrcYbg:cardImgSrcBbg"
			 mode=""></image>
			<!-- 标题 -->
			<view class="titleBox" :style="item.goodsType == constData.goodsType[2].key?'color:#FFFFFF':''">{{item.goodsName}}</view>

			<!-- 价值 -->
			<view class="priceBox" :class="item.goodsType == constData.goodsType[2].key?'card-bg-B':''" :style="item.goodsType == constData.goodsType[1].key?cardInfo:''">
				<text v-if="item.goodsType == constData.goodsType[0].key" style="margin-right: 0.3em;">AUD</text>
				{{item.goodsPrice}}
			</view>

			<!-- 自由商品图片 -->
			<view class="stuty-img" v-if="item.goodsType == constData.goodsType[0].key">
				<image :src="constData.oss + getImgSrc(item.goodsData)" mode="aspectFill"></image>
			</view>

			<!-- 平台商品兑换价格 -->
			<view class="cardPrice" :style="item.goodsType == constData.goodsType[2].key?'color:#FFFFFF':''" v-else-if="item.goodsType != constData.goodsType[0].key">
				平台币{{item.cardPrice}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		data() {
			return {
				cardInfo: 'color:#333333;opacity: .5;',
				cardBg: 'box-shadow: 0 0 15rpx 0 rgba(182, 196, 210, 0.4);border:1rpx solid #CFDCE9',
				cardImgSrcY: '/static/image/shop/bg_gwk_2.png',
				cardImgSrcYbg: '/static/image/shop/btn_y.png',
				cardImgSrcB: '/static/image/shop/bg_gwk_1.png',
				cardImgSrcBbg: '/static/image/shop/btn_g.png',
				constData: this.$constData
			}
		},
		methods: {
			getImgSrc(arr) {
				return this.$util.tryParseJson(arr)[0]
			},

			change(index,item) {
				this.$emit('change', index,item.goodsType)
			},

			changeEnd(index,item) {
				this.$emit('changeEnd', index,item.goodsType)
			},

			navToInfo(item) {
				this.$emit('emitItem', item)
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

		image {
			width: 100%;
			height: 100%;
		}
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
		transition: all .3s;
	}

	.priceBox {
		position: relative;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: #FFA405;
		transition: all .3s;
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
		transition: all .3s;
	}

	.card-img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.card-img-tag {
		position: absolute;
		right: 0;
		top: 55rpx;
		width: 170rpx;
		height: 60rpx;
	}

	.card-bg-B {
		color: #FFFFFF;
		opacity: .5;
	}
</style>
