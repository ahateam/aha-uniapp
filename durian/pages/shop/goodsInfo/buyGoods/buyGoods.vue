<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#000">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
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
				remark: '', //备注
				phone: '', //电话
				userInfo: '',

				addressId: '',

				free: false
			}
		},

		methods: {
			payMoney() {
				if (this.addressId) {
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
					} else if (this.phone == '') {
						uni.showToast({
							title: '请输入收货人电话',
							icon: 'none'
						})
					} else {
						if (this.name != this.addressInfo.addressUserName || this.address != this.addressInfo.address || this.phone !=
							this.addressInfo.addressPhone) {
							/* 如果修改了地址信息则修改地址再下订单 */
							let cnt = {
								addressId: this.addressId, // Long 收货地址id
								address: this.address, // String 地址信息
								addressPhone: this.phone, // String 收货电话
								addressUserName: this.name, // String 收货人姓名
								addressStatus: 1, // Byte 是否默认收货地址
								userId: this.userInfo.userId, // Long 用户id
							}
							this.editReceivingAddressById(cnt)
						} else {
							let cnt = {
								orderType: this.$constData.orderType[0].key, // Byte 订单类型
								buyerId: this.userInfo.userId, // Long 买家id
								goodsId: this.id, // Long 商品id
								sellerId: this.upUserId, // Long 卖家id
								goodsNumber: 1, // Integer 商品数量
								payment: this.price, // Double 支付金额
								addressId: this.addressId, // Long 收货地址id
								addressName: this.address, // String 收货地址名称
							}
							if (this.remark) {
								cnt.remark = this.remark // String 备注
							}
							if (this.free) {
								this.exchangeGoods(cnt)
							} else {
								this.createDurianOrder(cnt)
							}
						}
					}
				} else {
					let cnt = {
						address: this.address, // String 地址信息
						addressPhone: this.phone, // String 收货电话
						addressUserName: this.name, // String 收货人姓名
						addressStatus: 1, // Byte 是否默认收货地址
						userId: this.userInfo.userId, // Long 用户id
					}
					this.createReceivingAddress(cnt)
				}
			},
			navBack() {
				uni.navigateBack()
			},

			editReceivingAddressById(cnt) {
				this.$api.editReceivingAddressById(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let cnt1 = {
							orderType: this.$constData.orderType[0].key, // Byte 订单类型
							buyerId: this.userInfo.userId, // Long 买家id
							goodsId: this.id, // Long 商品id
							sellerId: this.upUserId, // Long 卖家id
							goodsNumber: 1, // Integer 商品数量
							payment: this.price, // Double 支付金额
							addressId: this.addressId, // Long 收货地址id
							addressName: this.address, // String 收货地址名称
						}
						if (this.remark) {
							cnt1.remark = this.remark // String 备注
						}
						if (this.free) {
							this.exchangeGoods(cnt1)
						} else {
							this.createDurianOrder(cnt1)
						}
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			createReceivingAddress(cnt) {
				this.$api.createReceivingAddress(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						this.addressId = this.$util.tryParseJson(res.data.c).addressId
						let cnt1 = {
							orderType: this.$constData.orderType[0].key, // Byte 订单类型
							buyerId: this.userInfo.userId, // Long 买家id
							goodsId: this.id, // Long 商品id
							sellerId: this.upUserId, // Long 卖家id
							goodsNumber: 1, // Integer 商品数量
							payment: this.price, // Double 支付金额
							addressId: this.addressId, // Long 收货地址id
							addressName: this.address, // String 收货地址名称
						}
						if (this.remark) {
							cnt1.remark = this.remark // String 备注
						}
						if (this.free) {
							this.exchangeGoods(cnt1)
						} else {
							this.createDurianOrder(cnt1)
						}
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			createDurianOrder(cnt) {
				this.$api.createDurianOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/shop/shop'
						})
						uni.showToast({
							title: '下单成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			exchangeGoods(cnt) {
				this.$api.exchangeGoods(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/shop/shop'
						})
						uni.showToast({
							title: '下单成功',
							icon: 'none'
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

			getReceivingAddressListByUserId(cnt) {
				this.$api.getReceivingAddressListByUserId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let list = this.$util.tryParseJson(res.data.c)
						if (list.length > 0) {
							console.log(list)
							this.addressId = list[0].addressId
							this.name = list[0].addressUserName
							this.address = list[0].address
							this.phone = list[0].addressPhone

							this.addressInfo = list[0]
						}
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			}
		},
		onLoad(res) {
			this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))

			let cnt = {
				userId: this.userInfo.userId, // Long 用户id
				count: 5, // Integer 
				offset: 0, // Integer
			}
			this.getReceivingAddressListByUserId(cnt)

			this.id = res.id
			this.upUserId = res.upId
			this.price = res.price
			this.phone = this.userInfo.phone.substr(2)
			if (res.free) {
				this.free = true
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
