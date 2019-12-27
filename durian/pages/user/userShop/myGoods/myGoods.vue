<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#333" class="nav-bar">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="title-nav">买家信息</view>
		</navBar>

		<view :style="{'padding-top': getNavHeight()}"></view>

		<view class="tip-box">
			买家信息
		</view>

		<view class="auto-box" v-for="(item,index) in froms" :key="index">
			<view class="title-box">{{item.name}}</view>
			<view class="auto-info">
				{{item.value}}
			</view>
		</view>

		<view class="express-box" style="margin-top: -30rpx;">
			<view class="title-box">快递公司</view>
			<view>{{express.name}}</view>
		</view>

		<view class="express-box" style="padding-bottom: 234rpx;">
			<view class="title-box">快递单号</view>
			<view>{{express.id}}</view>
		</view>

		<view class="bottom-box">
			<button class="success-btn" @click="setOrderStatus">已发货</button>
			<button class="nomrl-btn">联系买家</button>
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
				id: '',

				froms: [{
						name: '收货人',
						value: ''
					},
					{
						name: '收货地址',
						value: ''
					},
					{
						name: '手机号',
						value: ''
					},
					{
						name: '买家送你的一句话',
						value: ''
					}
				],
				express: {
					name: '顺丰速运',
					id: '8000049957229'
				}

			}
		},
		methods: {
			setOrderStatus() {
				let shippingInfo = {
					name: this.express.name,
					id: this.express.id
				}

				let cnt = {
					orderId: this.id, // Long 订单id
					status: this.$constData.orderStatus[1].key, // Byte 订单状态
					shippingInfo: shippingInfo, // JSONObject <选填> 快递信息
				}
				this.$api.setOrderStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '../../user'
						})
						uni.showToast({
							title: '已发货',
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

			navBack() {
				uni.navigateBack()
			},

			saveBtn() {
				console.log('save')
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			getOrderByOrderId(cnt) {
				this.$api.getOrderByOrderId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c)
						if (obj.remark) {
							this.froms[3].value = obj.remark
						} else {
							this.froms[3].value = '(无)'
						}
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			getReceivingAddressById(cnt) {
				this.$api.getReceivingAddressById(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let obj = this.$util.tryParseJson(res.data.c)
						this.froms[0].value = obj.addressUserName
						this.froms[1].value = obj.address
						this.froms[2].value = obj.addressPhone
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
			this.id = res.id
			let cnt = {
				orderId: res.id, // Long 订单id
			};
			this.getOrderByOrderId(cnt)

			let cnt1 = {
				addressId: res.addressId, // Long 收货地址id
			};
			this.getReceivingAddressById(cnt1)
		}
	}
</script>

<style lang="scss" scoped>
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

	.title-nav {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	.tip-box {
		line-height: 60rpx;
		font-size: $group-font-befor;
		background-color: $group-color-search;
		padding-left: 40rpx;
		color: #666666;
		margin-bottom: 30rpx;
	}

	.auto-box {
		margin-bottom: 30rpx;
		font-size: 30rpx;
		line-height: 42rpx;
		padding: 0 30rpx;
	}

	.title-box {
		color: #999999;
	}

	.auto-info {
		padding: 30rpx 0rpx;
		border-bottom: 1rpx solid rgba($color: $group-color-befor, $alpha: .7);
	}

	.bottom-box {
		position: fixed;
		display: flex;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		bottom: 0;
		width: 100%;
		padding: 0 30rpx 30rpx;
		font-size: 36rpx;
		line-height: 102rpx;

		button {
			width: 690rpx;

			&:after {
				border: none;
			}
		}
	}

	.success-btn {
		background-color: #00C8BE;
		color: $group-color-w;
		border-radius: 6rpx;
		margin-bottom: 30rpx;
	}

	.nomrl-btn {
		background-color: $group-color-w;
		box-sizing: border-box;
		border: 1rpx solid $group-color;
		color: $group-color;
	}

	.express-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx;
		color: #666666;
		height: 103rpx;
		border-bottom: 1rpx solid rgba($color: $group-color-border, $alpha: .7);
	}
</style>
