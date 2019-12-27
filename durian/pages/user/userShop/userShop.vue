<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#000" class="nav-bar">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="title-box">我的商品</view>
		</navBar>

		<view :style="{'padding-top': getNavHeight()}"></view>
		<!-- 商品列表切换导航 -->
		<view class="trans">
			<view class="trans-box" @click="changeNav(index)" :style="index == navCurr?'color:#FFFFFF;':'color:#587685;'" v-for="(item ,index) in navList"
			 :key="index">
				<image class="pt-img" :src="index == navCurr?'/static/image/shop/bg_spqd_p.png':'/static/image/shop/icon_jyl.png'"
				 mode="scaleToFill"></image>
				<text>{{item.name}}</text>
			</view>
		</view>

		<!-- 分割线 -->
		<view class="bg-color"></view>

		<view class="buy-box">
			<view class="buy" :hidden="buy">
				购买清单
			</view>
			<view class="buy" :hidden="!buy">
				交易清单
			</view>
			<image src="/static/image/shop/icon_sx.png" mode="aspectFit" @click="filterStatus = !filterStatus"></image>
			<view class="filter-box" :hidden="!filterStatus" @click="filterStatus = false">
				<view @click="moneyFilter = !moneyFilter">按金额</view>
				<view @click="timeFilter = !timeFilter">按日期</view>
			</view>
		</view>

		<view class="content-img" v-if="contentList.length == 0&&myGoods.length == 0">
			<image src="/static/image/shop/gmqd.png" mode="aspectFit"></image>
			<view class="content-no">
				暂无清单
			</view>
		</view>
		<view class="content-list" v-else>
			<view class="nullList" v-if="contentList.length == 0">
				<image src="/static/image/shop/gmqd.png" mode="aspectFit"></image>
				<view class="content-no">
					暂无清单
				</view>
			</view>

			<!-- 购买列表 -->
			<shop-list :list="contentList" @change="changeShop" @changeEnd="changeShopEnd" @emitItem="navToInfo"></shop-list>
			<view class="buy" style="margin-top: 40rpx;">我的商品</view>

			<view class="nullList" v-if="myGoods.length == 0" style="padding-bottom: 40rpx;">
				<image src="/static/image/shop/gmqd.png" mode="aspectFit"></image>
				<view class="content-no">
					暂无清单
				</view>
			</view>

			<!-- 我的商品列表 -->
			<shop-list showTime :list="myGoods" @change="changeGoods" @changeEnd="changeGoodsEnd" @emitItem="navToOrder"></shop-list>
			<view class="more-text" v-if="myGoods.length > 0">
				<text>查看更多</text>
				<text class="iconfont icon-xiayibu"></text>
			</view>

			<view class="no-more" v-if="pageOver && myGoods.length > 0">
				<text class="left-line"></text>
				<text>底都被你看穿了</text>
				<text class="right-line"></text>
			</view>
		</view>

		<uni-popup type="center" :show="moneyFilter" @change="changeFilter">
			<view class="price-choice-box">
				<view class="price-title">
					筛选条件
				</view>
				<view class="price-content">
					<view class="price-section-title">价格范围</view>
					<view class="price-section">AUD {{smallPrice}} - AUD {{bigPrice}} +</view>
					<view style="margin-top: 120rpx;">
						<RangeSlider :width="570" :height="50" :blockSize="50" :min="0" :max="5000" background-color="#F2F5F7"
						 activeColor="#FFA405" :values="sectionPrice" @rangechange="onRangeChange">
							<view slot="minBlock" class="range-slider-block"></view>
							<!-- 左边滑块的内容 -->
							<view slot="maxBlock" class="range-slider-block"></view>
							<!-- 右边滑块的内容 -->
						</RangeSlider>
					</view>
				</view>
				<view class="price-btn">
					<button type="primary" @click="changeList">确定</button>
				</view>
			</view>
		</uni-popup>

		<uni-popup type="center" :show="timeFilter" @change="changeFilter">
			time！！！！
		</uni-popup>

		<view class="transparentBg" :hidden="!filterStatus" @click="filterStatus = false"></view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import shopList from '@/components/shopList/shopList.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import RangeSlider from '@/components/range-slider/range-slider.vue';

	export default {
		components: {
			navBar,
			shopList,
			uniPopup,
			RangeSlider
		},
		data() {
			return {
				count: 10,
				offset: 0,
				buyPage: 1,
				buyStatus: 'onload',
				buyOver: false,

				sellOver: false,
				sellPage: 1,
				sellStatus: 'onload',

				navList: [{
						name: '商品清单'
					},
					{
						name: '交易历史'
					}
				],
				navCurr: 0,

				buy: false, //开启
				contentList: [],
				myGoods: [],

				filterStatus: false,
				moneyFilter: false,
				timeFilter: false,

				sectionPrice: [0, 1000],
				smallPrice: 0,
				bigPrice: 1000,
			}
		},
		methods: {
			changeList() {
				let cnt = {
					sellerId: this.userInfo.userId, // Long <选填> 发布者id
					buyerId: this.userInfo.userId, // Long 买家id
					// startTime: startTime, // String <选填> 起始时间
					// endTime: endTime, // String <选填> 结束时间
					startMoney: this.smallPrice, // Double <选填> 起始金额
					endMoney: this.bigPrice, // Double <选填> 结束金额
					count: this.count, // Integer 
					offset: this.offset, // Integer 
				}
				this.getOrderBySellerId(cnt)
				this.getOrderByBuyerId(cnt)

				this.moneyFilter = false
			},

			onRangeChange(e) {
				let start = e.originalValue.minValue
				let end = e.originalValue.maxValue
				this.smallPrice = Math.round(start)
				this.bigPrice = Math.round(end)
			},

			changeFilter(e) {
				if (!e.show) {
					this.moneyFilter = false
					this.timeFilter = false
				}
			},

			closeFilterBox() {
				this.filterStatus = false
			},

			navToOrder(item) {
				uni.navigateTo({
					url: `./myGoods/myGoods?id=${item.orderId}&addressId=${item.addressId}`
				})
			},

			navToInfo(item) {
				uni.navigateTo({
					url: `./myShop/myShop?id=${item.orderId}&addressId=${item.addressId}`
				})
			},

			changeShop(index, type) {
				if (type != 0) {
					this.changeCard(index, 0)
				}
			},

			changeShopEnd(index, type) {
				if (type != 0) {
					this.changeCardEnd(index, 0)
				}
			},

			changeGoods(index, type) {
				if (type != 0) {
					this.changeCard(index, 1)
				}
			},

			changeGoodsEnd(index, type) {
				if (type != 0) {
					this.changeCardEnd(index, 1)
				}
			},

			changeCard(index, e) {
				if (e == 0) {
					this.contentList[index].goodsType = 2
				} else {
					this.myGoods[index].goodsType = 2
				}
			},

			changeCardEnd(index, e) {
				if (e == 0) {
					this.contentList[index].goodsType = 1
				} else {
					this.myGoods[index].goodsType = 1
				}
			},

			navBack() {
				uni.navigateBack()
			},

			changeNav(e) {
				if (this.buyStatus != 'loading' && this.sellStatus != 'loading') {
					this.navCurr = e
					if (e == 1) {
						this.buy = true
					} else {
						this.buy = false
					}

					if (this.navList[e].buyChild) {
						this.contentList = this.navList[e].buyChild
						this.buyPage = this.navList[e].buyPage
						this.buyStatus = this.navList[e].buyStatus
						this.buyOver = this.navList[e].buyOver
					} else {
						let cnt = {
							buyerId: this.userInfo.userId, // Long 买家id
							count: this.count, // Integer 
							offset: this.offset, // Integer 
						}
						this.buyStatus = 'loading'
						this.getOrderByBuyerId(cnt)
					}

					if (this.navList[e].sellChild) {
						this.myGoods = this.navList[e].sellChild
						this.sellPage = this.navList[e].sellPage
						this.sellStatus = this.navList[e].sellStatus
						this.sellOver = this.navList[e].sellOver
					} else {
						let cnt1 = {
							sellerId: this.userInfo.userId, // Long <选填> 发布者id
							count: this.count, // Integer 
							offset: this.offset, // Integer 
						}
						this.sellStatus = 'loading'
						this.getOrderBySellerId(cnt1)
					}
				}
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			tryListPush(obj) {
				if (obj.completed.length < this.count && obj.ongoing.length < this.count) {
					this.buyOver = true
					this.buyStatus = 'nomore'
				} else {
					this.buyOver = false
					this.buyStatus = 'more'
				}
				if (this.navCurr == 0) {
					this.contentList = obj.ongoing
				} else {
					this.contentList = obj.completed
				}
				this.navList[this.navCurr].buyChild = this.contentList
				this.navList[this.navCurr].buyOver = this.buyOver
				this.navList[this.navCurr].buyStatus = this.buyStatus
			},

			tryObjPush(obj) {
				console.log(obj)
				if (obj.completed.length < this.count && obj.ongoing.length < this.count) {
					this.sellOver = true
					this.sellStatus = 'nomore'
				} else {
					this.sellOver = false
					this.sellStatus = 'more'
				}
				if (this.navCurr == 0) {
					this.myGoods = obj.ongoing
				} else {
					this.myGoods = obj.completed
				}
				this.navList[this.navCurr].sellChild = this.myGoods
				this.navList[this.navCurr].sellOver = this.sellOver
				this.navList[this.navCurr].sellStatus = this.sellStatus
			},

			getOrderByBuyerId(cnt) {
				this.$api.getOrderByBuyerId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c)
						// this.contentList = list
						this.tryListPush(obj)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
						this.buyStatus = 'error'
					}
				})
			},

			getOrderBySellerId(cnt) {
				this.$api.getOrderBySellerId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c)
						this.tryObjPush(obj)
					} else {
						this.sellStatus = 'error'
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},
		},
		onLoad() {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			this.userInfo = userInfo
			let cnt = {
				sellerId: userInfo.userId, // Long <选填> 发布者id
				buyerId: userInfo.userId, // Long 买家id
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			this.getOrderBySellerId(cnt)
			this.getOrderByBuyerId(cnt)
		}
	}
</script>

<style lang="scss" scoped>
	.trans {
		margin: 30rpx 0 30rpx 30rpx;
		padding-top: 30rpx;
		overflow: hidden;
	}

	.nav-bar {
		position: fixed;
		z-index: 2;
		background-color: $group-color-w;
		height: 64px;
		width: 100%;
		box-sizing: border-box;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.trans-box {
		position: relative;
		display: inline-block;
		border-radius: 4rpx;
		width: 330rpx;
		height: 145rpx;
		margin-right: 30rpx;

		text {
			position: absolute;
			line-height: $group-font-befor-line;
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
		position: relative;
		display: flex;
		justify-content: space-between;
		padding-left: 40rpx;
		padding-right: 45rpx;

		image {
			width: 30rpx;
			height: 30rpx;
			color: #587685;
		}
	}

	.buy {
		color: #333333;
		font-size: 30rpx;
		line-height: $group-font-befor-line;
	}

	//图片的中间
	.content-img {
		margin-top: 120rpx;
		text-align: center;

		image {
			width: 222rpx;
			height: 293rpx;
			margin-bottom: 60rpx;
		}
	}

	// 图片下面的文字
	.content-no {
		line-height: $group-font-befor-line;
		color: #B6C4D2;


	}

	.pt-img {
		width: 100%;
		height: 100%;
	}

	.nullList {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 80rpx;

		image {
			width: 222rpx;
			height: 293rpx;
			margin-bottom: 60rpx;
			display: block;
		}
	}

	.content-list {
		padding: 0 40rpx;
		color: #333333;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
	}

	.more-text {
		text-align: center;
		color: $group-color;
		font-size: $group-font;
		line-height: 37rpx;
		margin: 40rpx 0;

		iconfont {
			font-size: 22rpx;
			line-height: 37rpx;
		}
	}

	.no-more {
		margin: 40rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $group-color-befor;
		font-size: $group-font;
	}

	.right-line,
	.left-line {
		width: 80rpx;
		height: 1rpx;
		margin: 0 40rpx;
	}

	.left-line {
		background: linear-gradient(90deg, rgba($color: #DCE4EB, $alpha: 0), rgba($color: #B6C4D2, $alpha: .8));
	}

	.right-line {
		background: linear-gradient(270deg, rgba($color: #DCE4EB, $alpha: 0), rgba($color: #B6C4D2, $alpha: .8));
	}

	.filter-box {
		position: absolute;
		top: -156rpx;
		right: 30rpx;
		z-index: 2;
		width: 138rpx;
		height: 135rpx;
		line-height: 67.5rpx;
		color: $group-color-w;
		font-size: $group-font;
		text-align: center;
		background-color: #182F45;
		border-radius: 6rpx;

		&:after {
			content: '';
			position: absolute;
			bottom: -26rpx;
			right: 20rpx;
			z-index: 1;
			width: 0;
			height: 0;
			border: 17rpx solid;
			border-color: #182F45 transparent transparent;
		}
	}

	.price-choice-box {
		width: 670rpx;
		height: 680rpx;
		background-color: $group-color-w;
		border-radius: 8rpx;
	}

	.price-title {
		text-align: center;
		color: #333333;
		font-size: 36rpx;
		line-height: 110rpx;
		border-bottom: 1rpx solid $group-color-border;
	}

	.price-content {
		padding: 29rpx 50rpx 90rpx;
		border-bottom: 1rpx solid $group-color-border;
	}

	.price-section-title {
		color: #333333;
		font-size: 30rpx;
		line-height: 42rpx;
	}

	.price-section {
		color: #999999;
		font-size: $group-color;
		line-height: 37rpx;
		margin-top: 60rpx;
	}

	.price-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 140rpx;
		width: 100%;

		button {
			line-height: 80rpx;
			width: 590rpx;
			background-color: #00C8BE;
			border-radius: 4rpx;
			color: $group-color-w;
			font-size: $group-font-befor;

			&:after {
				border: none;
			}
		}
	}

	.transparentBg {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
</style>
