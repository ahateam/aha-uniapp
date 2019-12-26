<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#000" class="nav-bar">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="nav-title">商品详情</view>
		</navBar>
		<view :style="{'padding-top': getNavHeight()}"></view>

		<view class="bannerBox">
			<swiper class="swiper-box" @change="change" autoplay>
				<swiper-item v-for="(item ,index) in imgList" :key="index">
					<image style="width: 100%;height: 100%;" :src="constData.oss + item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="dotBox">
				<view class="swiperDot" v-for="(item,index) in imgList" :key="index" :class="current == index?'currDot':''"></view>
			</view>
		</view>

		<view class="title-box">
			{{title}}
		</view>

		<view class="price-box">
			<text style="margin-right: 0.3em;">AUD</text>{{price}}
		</view>

		<view class="border-box"></view>

		<view class="titleBox">
			<image src="/static/image/shop/icon_spms_l.png" mode="aspectFit"></image>
			商品描述
			<image src="/static/image/shop/icon_spms_r.png" mode="aspectFit"></image>
		</view>

		<view class="infoBox">
			{{text}}
		</view>

		<view class="bottom-box">
			<button class="left-btn">
				<image class="mes-icon" src="/static/image/icon/icon-mes.png" mode="aspectFit"></image>联系卖家
			</button>
			<button class="right-btn" @click="buyStatus = !buyStatus">
				<image class="mes-icon" src="/static/image/icon/icon_shop.png" mode="aspectFit"></image>立即购买
			</button>
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
				constData: this.$constData,
				id: '',
				upId: '',

				title: '',
				price: '',
				imgList: [],
				current: 0,
				text: '',

				noMoney: false,

				buyStatus: false,

			};
		},
		onLoad(res) {
			this.id = res.id
			let cnt = {
				goodsId: this.id, // Long 商品id
			}
			this.getByGoodId(cnt)
		},
		methods: {
			getByGoodId(cnt) {
				this.$api.getByGoodId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let data = this.$util.tryParseJson(res.data.c)
						this.title = data.goodsName
						this.price = data.goodsPrice
						this.imgList = this.$util.tryParseJson(data.goodsData)
						this.text = data.goodsDescribe
						this.upId = data.senderId
						console.log(data)
					} else {
						console.log('error')
					}
				})
			},

			navToBuy() {
				uni.navigateTo({
					url: `/pages/shop/goodsInfo/buyGoods/buyGoods?id=${this.id}&upId=${this.upId}&price=${this.price}`
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

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},
		}
	}
</script>

<style lang="scss">
	.nav-bar {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: $group-color-w;
		height: calc(var(--status-bar-height) + 44px);
		text-align: center;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.nav-title {
		font-weight: $group-title-weight;
		font-size: 36rpx;
	}

	.bannerBox {
		position: relative;
	}

	.swiper-box {
		width: 670rpx;
		height: 670rpx;
		margin: 20rpx auto 0;
		border-radius: 4rpx;
		border: 1rpx solid $group-color-befor;
		overflow: hidden;
	}

	.dotBox {
		position: absolute;
		width: 100%;
		bottom: 14rpx;
		display: flex;
		justify-content: center;
	}

	.swiperDot {
		width: 8rpx;
		height: 8rpx;
		border-radius: 4rpx;
		background-color: rgba($color: $group-color-w, $alpha: 0.5);
		transition: all .3s;
		margin-right: 20rpx;
	}

	.currDot {
		width: 22rpx;
		background-color: rgba($color: $group-color-w, $alpha: 1.0);
	}

	.title-box {
		width: 670rpx;
		margin: 30rpx auto 0;
		color: #333333;
		font-size: 34rpx;
		line-height: 48rpx;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.price-box {
		color: #FFA405;
		font-size: 30rpx;
		width: 670rpx;
		margin: 20rpx auto 0;
	}

	.border-box {
		width: 100%;
		height: 0;
		border-bottom: 20rpx solid $group-color-search;
		margin: 30rpx 0;
	}

	.titleBox {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $group-font-befor;
		color: $group-color-article;
		line-height: $group-font-line;
		margin: 0rpx 40rpx;

		image {
			width: 141rpx;
			height: 18rpx;
			margin: 0 29rpx;
		}
	}

	.infoBox {
		position: relative;
		margin: 30rpx 40rpx 0;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
		margin-bottom: 120rpx;
	}

	.bottom-box {
		position: fixed;
		width: 100%;
		display: flex;
		bottom: 0rpx;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 0;
			font-size: $group-font-befor;

			&:after {
				border: none;
			}
		}
	}

	.left-btn {
		width: 300rpx;
		background-color: $group-color-w;
		box-sizing: border-box;
		border-top: 1rpx solid $group-color-search;
		color: $group-color;
		line-height: 102rpx;
	}

	.mes-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 14rpx;
	}

	.right-btn {
		width: 450rpx;
		background-color: #00C8BE;
		color: $group-color-w;
		line-height: 102rpx;
	}

	.errInfo {
		position: absolute;
		margin-top: 20rpx;
		font-size: $group-font;
		color: #FE5A6E;
	}
</style>
