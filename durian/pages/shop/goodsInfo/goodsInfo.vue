<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#000">
			<view slot="left" class="iconfont icon-fanhui backBtn" @click="navBack"></view>
			<view class="title-box">商品详情</view>
		</navBar>
		<view style="padding-top: 64px;"></view>
		<view class="bannerBox">
			<swiper class="swiper-box" @change="change" autoplay>
				<swiper-item v-for="(item ,index) in imgList" :key="index">
					<image style="width: 100%;height: 100%;" :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="dotBox">
				<view class="swiperDot" v-for="(item,index) in imgList" :key="index" :class="current == index?'currDot':''"></view>
			</view>
		</view>
		<view class="titleBox">
			商品描述
		</view>
		<view class="infoBox" :style="noMoney?'margin-bottom:120rpx':''">
			{{text}}
			<view class="errInfo" v-if="noMoney&&type == 1">您的平台币当前不够兑换以上商品，还需加把劲哦！</view>
		</view>

		<button class="platformBtn" :style="noMoney?'opacity: 0.5':''" v-if="type == 1" @click="exchange">喜欢，立即兑换</button>

		<view class="stuBtns" v-if="type == 0">
			<button class="topBtn" @click="buyStatus = !buyStatus">立即购买</button>
			<button class="bottomBtn">联系卖家</button>
		</view>
		<sheet :isShow="buyStatus" @closeCenter="buyStatus =! buyStatus" @buyGoods="navToBuy"></sheet>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import sheet from '@/components/shop-sheet/centerSheet.vue'

	export default {
		components: {
			navBar,
			sheet
		},
		data() {
			return {
				type: -1,
				imgList: [
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573030448&di=3a6aa2b4072eb80bf924343e09f8fcb9&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F24%2F20150824231358_NukhZ.thumb.700_0.jpeg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573030448&di=3a6aa2b4072eb80bf924343e09f8fcb9&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F24%2F20150824231358_NukhZ.thumb.700_0.jpeg'
				],
				current: 0,
				text: '此款面值100澳元的Coles购物卡在奥尔本各大coles及商场可以同面值价格购买。',

				noMoney: false,

				buyStatus: false,

			};
		},
		onLoad(res) {
			this.type = res.type
		},
		methods: {
			navToBuy(){
				uni.navigateTo({
					url:'/pages/shop/goodsInfo/buyGoods/buyGoods'
				})
			},
			
			showBuyBox() {
				this.buyStatus = true
			},

			exchange() {
				if (!this.noMoney) {
					uni.redirectTo({
						url: '/pages/shop/goodsInfo/exchange/exchange'
					})
				} else {
					uni.showToast({
						title: '平台币不足！',
						icon: 'none'
					})
				}
			},

			navBack() {
				uni.navigateBack()
			},

			// 轮播图改变触发
			change(e) {
				this.current = e.detail.current;
			},
		}
	}
</script>

<style lang="scss">
	.backBtn {
		position: absolute;
		left: 29rpx;
		font-size: 33rpx;
		color: $group-color;
	}

	.title-box {
		font-weight: $group-title-weight;
		font-size: 36rpx;
	}

	.bannerBox {
		position: relative;
	}

	.swiper-box {
		display: block;
		width: 670rpx;
		height: 300rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 4rpx;
		overflow: hidden;
	}

	.dotBox {
		position: absolute;
		width: 100%;
		top: 280rpx;
		display: flex;
		justify-content: center;
	}

	.swiperDot {
		width: 6rpx;
		height: 6rpx;
		border-radius: 50%;
		background-color: rgba($color: #FFFFFF, $alpha: 0.8);
		transition: all .3s;
		margin-right: 10rpx;
	}

	.currDot {
		width: 16rpx;
		background-color: rgba($color: $group-color-curr, $alpha: 1.0);
	}

	.titleBox {
		font-size: $group-font-befor;
		color: $group-color-article;
		line-height: $group-font-line;
		margin: 40rpx 40rpx 0;
	}

	.infoBox {
		position: relative;
		margin: 30rpx 40rpx 0;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
		margin-bottom: 100rpx;
	}

	.platformBtn {
		display: block;
		width: 690rpx;
		font-size: 36rpx;
		color: $group-color-w;
		line-height: 102rpx;
		margin: 0 auto;
		background-color: $group-color-curr;
		border-radius: 6rpx;

		&:after {
			border: none;
		}
	}

	.stuBtns {
		position: fixed;
		width: 100%;
		display: block;
		bottom: 30rpx;

		button {
			display: block;
			width: 690rpx;
			margin: 0 auto;
			margin-top: 30rpx;

			&:after {
				border: none;
			}
		}
	}

	.topBtn {
		background-color: $group-color-curr;
		border-radius: 6rpx;
		font-size: 36rpx;
		color: $group-color-w;
		line-height: 102rpx;
	}

	.bottomBtn {
		background-color: rgba($color: #FFFFFF, $alpha: 1);
		border: 1rpx solid $group-color-befor;
		border-radius: 6rpx;
		font-size: 36rpx;
		color: $group-color-befor;
		line-height: 102rpx;
	}

	.errInfo {
		position: absolute;
		margin-top: 20rpx;
		font-size: $group-font;
		color: #FE5A6E;
	}
</style>
