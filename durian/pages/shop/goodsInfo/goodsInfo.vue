<template>
	<view class="body">
		<navBar :back="false" type="transparent" fontColor="#000">
			<view slot="left" class="iconfont icon-fanhui backBtn" @click="navBack"></view>
			<view class="title-box">商品详情</view>
		</navBar>

		<image :src="!buyStatus?'/static/image/shop/bg_card_b.png':'/static/image/shop/bg_card_y.png'" mode="aspectFill"
		 class="bg-img"></image>

		<view style="padding-top: 64px;"></view>

		<view class="banner-box">
			<swiper class="swiper-box" autoplay @change="change">
				<swiper-item v-for="(dot,index) in dots" :key="index">
					<image :src="!buyStatus?'/static/image/shop/card_b.png':'/static/image/shop/card_y.png'" class="swiper-img" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="swiper-dot">
				<view class="swiper-re" :class="index == current?'curr-dot':''" v-for="(dot,index) in dots" :key="index"></view>
			</view>
		</view>
		<!-- 平台币plat -->
		<view class="center-box">
			<view class="plat">
				<view class="palt-left">
					<view class="palt-bi">平台币</view><text class="text">{{price}}</text>
				</view>
				<view class="palt-right">
					<text>面值20澳元</text>
				</view>
			</view>
			<view class="text-box">
				{{title}}
			</view>

			<view class="palt-t" v-if="!buyStatus">
				<text>亲，平台币还不够，看看帮助中心怎么兑换平台币吧</text>
			</view>
		</view>
		<!-- 商品描述 -->
		<view style="background-color: #fff;">
			<view class="dest">
				<image src="/static/image/shop/icon_spms_l.png" class="dest-left" mode="aspectFit"></image>
				<text class="dest-cen">商品描述</text>
				<image src="/static/image/shop/icon_spms_r.png" class="dest-right"></image>
			</view>
			<view class="text-p">
				{{text}}
			</view>
		</view>

		<!-- 底部 button 按钮 -->
		<button class="btn" :class="!buyStatus?'noMoney':''" @click="likeBtn">喜欢,立即兑换</button>


		<uni-popup :show="showBox" type="center" :mask-click="true" @change="changeBox">
			<view class="sheet-popup tip-box" @click.stop>
				<view class="sheet-text">
					<view class="class-text">亲， 平台币还不够，</view>
					<view class="class-text">看看帮助中心怎么兑换平台币吧～</view>
				</view>
				<button class="btn-true" @click="navToHelp">确定</button>
				<button class="btn-can" @click="showBox = false">再想想</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	export default {
		components: {
			navBar,
			uniPopup
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

				title: 'Coles购物卡-商品名称字数限制二十一Coles购物卡-商品名称字数限制二十一',
				price: 100,

				showBox: false,
				dots: [{
					name: ''
				}, {
					name: ''
				}, {
					name: ''
				}]

			};
		},
		onLoad(res) {
			this.type = res.type
			//userMony 定义一个用户的钱数
			this.changeStatus()
		},
		methods: {
			changeStatus() {
				let userMoney = 20
				//判断用户的钱数是否大于平台币100的数量 大于平台币 true
				if (this.price > userMoney) {
					this.buyStatus = false
				} else {
					this.buyStatus = true
				}
				console.log(this.buyStatus)
			},

			navToHelp() {
				uni.navigateTo({
					url: '/pages/user/helpCenter/helpCenter'
				})
			},

			likeBtn() {
				if (this.buyStatus) {
					uni.navigateTo({
						url: '/pages/shop/goodsInfo/exchange/exchange'
					})
				} else {
					this.showBox = true
				}
			},

			changeBox(e) {
				console.log(111)
				if (!e.show) {
					this.showBox = false
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
	button {
		&:after {
			border: none;
		}
	}

	.body {
		background-color: rgba($color: #F2F5F7, $alpha: .5);
		min-height: 100vh;
	}

	.swiper-dot {
		position: absolute;
		bottom: 16rpx;
		width: 100%;
		display: flex;
		justify-content: center;

	}

	.swiper-re {
		border-radius: 4rpx;
		width: 8rpx;
		height: 8rpx;
		background-color: #fff;
		margin: 0 10rpx;
		transition: all .3s;
		opacity: .5;
	}

	.curr-dot {
		width: 22rpx;
		height: 8rpx;
		opacity: 1;
	}

	.sheet-popup {
		margin: 500rpx 75rpx;
		background-color: #FFFFFF;
		border-radius: 4rpx;
	}

	.sheet-text {
		margin-bottom: 58rpx;
	}

	.class-text {
		color: #333333;
		font-size: $group-font-befor;

		line-height: 42rpx;
		text-align: center;

	}

	.btn-true {
		width: 250rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #00C8BE;
		border-radius: 4rpx;
		color: #FFFFFF;
		font-size: $group-font-befor;
		display: inline-block;
	}

	.btn-can {
		width: 250rpx;
		height: 80rpx;
		display: inline-block;
		border: 1rpx solid #B6C4D2;
		border-radius: 4rpx;
		color: #587685;
		font-size: $group-font-befor;
		line-height: 80rpx;
		margin-left: 20rpx;
	}



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

	.swiper-box {
		width: 670rpx;
		height: 250rpx;
		margin: 0 auto;
		border-radius: 4rpx;
		overflow: hidden;
	}

	.bg-img {
		position: absolute;
		top: 0;
		width: 100%;
		height: 438rpx;
	}

	.swiper-img {
		width: 100%;
		height: calc(100% + 40rpx);
		display: block;
	}

	// 平台币
	.plat {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 40rpx;
		margin-bottom: 18rpx;
		position: relative;
	}

	.palt-left {
		float: left;
		padding-left: 40rpx;
		overflow: hidden;
	}

	.palt-bi {
		float: left;
		width: 72rpx;
		height: 33rpx;
		font-size: 24rpx;
		line-height: 33rpx;
		color: #FFA405;
		overflow: hidden;
		padding-top: 14rpx;
	}

	.text {

		padding-left: 8rpx;
		margin-top: -12rpx;
		width: 65rpx;
		height: 56rpx;
		color: #FFA405;
		font-size: 40rpx;
		line-height: 54rpx;
	}

	.palt-right {
		border-radius: 4rpx;
		height: 44rpx;
		color: #FFA405;
		font-size: 26rpx;
		line-height: 39rpx;
		padding-right: 40rpx;

		text {
			padding: 4rpx 10rpx;
			background-color: #FFF8E5;
			text-align: center;
		}
	}

	.palt-t {
		height: 50rpx;
		width: 670rpx;
		margin-top: 20rpx;
		margin-left: 40rpx;
		padding-left: 14rpx;
		color: rgba($color: #EE455A, $alpha: .9);
		font-size: 24rpx;
		line-height: 50rpx;
		background-color: rgba($color: #EE455A, $alpha: .08);
		border-radius: 6rpx;
	}


	.text-box {
		margin: 0 auto;
		width: 670rpx;
		height: 42rpx;
		color: #333333;
		font-size: $group-font-befor;
		line-height: 42rpx;
		//文字超出...
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	//商品描述
	.dest {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		padding: $group-margin-top 0;
	}

	.dest-left {
		width: 141rpx;
		height: 18rpx;
		margin-right: 29rpx;
	}

	.dest-cen {
		height: 40rpx;
		line-height: 40rpx;
		color: #587685;
		font-size: $group-font-befor;
	}

	.dest-right {
		width: 141rpx;
		height: 18rpx;
		margin-left: 29rpx;
	}

	.text-p {
		margin: 0 auto;
		width: 670rpx;
		font-size: $group-font-befor;
		line-height: 42rpx;
		color: #666666;
		padding-bottom: 50rpx;
	}

	.btn {
		width: 100%;
		height: 102rpx;
		border-radius: 0;
		background-color: #00C8BE;
		color: #FFFFFF;
		font-size: 36rpx;
		line-height: 102rpx;
		position: fixed;
		bottom: 0;
	}

	.noMoney {
		background-color: rgba($color: #00C8BE, $alpha: .5);
	}

	.tip-box {
		padding: 60rpx 40rpx 40rpx;
	}

	.banner-box {
		position: relative;
		margin-top: 19rpx;
	}

	.center-box {
		background-color: #fff;
		padding-bottom: $group-margin-top;
	}
</style>
