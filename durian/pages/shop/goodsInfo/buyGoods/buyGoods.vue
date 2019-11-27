<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#000">
			<view slot="left" class="iconfont icon-fanhui backBtn" @click="navBack"></view>
			<view class="title-box">商品兑换</view>
		</navBar>
		<view :style="{'padding-top': getNavHeight()}"></view>
		<view class="tipBox">
			<image src="/static/image/shop/icon_l.png" mode="aspectFit"></image>
			<text>请准确填写收货信息</text>
			<image src="/static/image/shop/icon_r.png" mode="aspectFit"></image>
		</view>

		<view class="autoTitle" style="margin-top: 50rpx;">收货人</view>
		<input type="text" class="autoInput" v-model="name" />

		<view class="autoTitle" style="margin-top: 50rpx;">收货地址</view>
		<input type="text" class="autoInput" v-model="address" />

		<view class="autoTitle">手机号</view>
		<input type="text" class="autoInput" v-model="phone" />

		<view class="autoTitle" style="font-size: 26rpx;">送卖家一句话</view>
		<input type="text" class="autoInput" v-model="remark" />

		<button type="primary" class="bottomBtn" @click="payMoney">去付款</button>
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
				id: '', //商品id
				price: '', //商品价格
				upUserId: '', //卖家id

				name: '', //收货人姓名
				address: '', //地址
				tel: '18772229999', //电话
				remark: '', //备注
				phone: '',
			}
		},

		methods: {
			payMoney() {
				if (this.address == '') {
					uni.showToast({
						title: '请输入地址',
						icon: 'none'
					})
				} else if (this.name == '') {
					uni.showToast({
						title: '请输入收货人姓名',
						icon: 'none'
					})
				} else if (this.tel == '') {
					uni.showToast({
						title: '请输入收货人电话',
						icon: 'none'
					})
				} else {
					let cnt = {
						orderType: this.$constData.orderType[0].key, // Byte 订单类型
						buyerId: uni.getStorageSync('userId'), // Long 买家id
						goodsId: this.id, // Long 商品id
						sellerId: this.upUserId, // Long 卖家id
						goodsNumber: 1, // Integer 商品数量
						payment: this.price, // Double 支付金额
					}
					this.createDurianOrder(cnt)
				}
			},
			navBack() {
				uni.navigateBack()
			},

			createDurianOrder(cnt) {
				this.$api.createDurianOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/shop/shop'
						})
						uni.showToast({
							title: '下单成功'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},
		},
		onLoad(res) {
			this.id = res.id
			this.upUserId = res.upId
			this.price = res.price
		}
	}
</script>

<style lang="scss" scoped>
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

	.tipBox {
		margin-top: 30rpx;
		font-size: $group-font;
		color: #999999;
		text-align: center;

		image {
			width: 141rpx;
			height: 16rpx;
			margin: 0 24rpx;
		}
	}

	.autoTitle {
		position: relative;
		margin-left: 40rpx;
		margin-top: 40rpx;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: $group-color;
	}

	.autoInput {
		margin: 40rpx;
		margin-bottom: 0;
		border: 1rpx solid $group-color-befor;
		border-radius: 6rpx;
		font-size: $group-font-befor;
		height: 88rpx;
		padding: 0 30rpx;
		color: $group-color-article;
	}

	.rightBox {
		position: absolute;
		right: 51rpx;
		color: $group-color-befor;
	}

	.bottomBtn {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: block;
		font-size: 36rpx;
		color: $group-color-w;
		line-height: 102rpx;
		background-color: #00C8BE;
		border-radius: 6rpx;
		margin-top: 100rpx;
		border-radius: 0;

		&:after {
			border: none;
		}
	}
</style>
