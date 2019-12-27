<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#000" class="nav-bar">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="title-nav">收货信息</view>
			<view slot="right" class="save-btn" v-if="status == constData.orderStatus[0].key" @click="changeaddress">保存</view>
		</navBar>
		<view :style="{'padding-top': getNavHeight()}"></view>

		<view class="tip-box">
			收货信息
		</view>

		<view class="auto-box" v-for="(item,index) in froms" :key="index">
			<view class="title-box">
				<text class="left-icon">*</text>{{item.name}}
			</view>
			<view class="auto-input">
				<input type="text" v-model="item.value" />
			</view>
		</view>

		<view class="bottom-box">
			<button class="success-btn" @click="setOrderStatus">已收货</button>
			<button class="nomrl-btn">联系卖家</button>
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
				constData: this.$constData,
				id: '', // 订单id
				status: '', //订单状态
				addressId: '', // 地址id

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
					}
				]
			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},

			saveBtn() {
				console.log('save')
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			changeaddress() {
				let cnt = {
					addressId: this.addressId, // Long 收货地址id
					address: this.froms[1].value, // String 地址信息
					addressPhone: this.froms[2].value, // String 收货电话
					addressUserName: this.froms[0].value, // String 收货人姓名
					addressStatus: 1, // Byte 是否默认收货地址
					userId: this.userInfo.userId, // Long 用户id
				}
				this.$api.editReceivingAddressById(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '已保存',
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

			setOrderStatus() {
				let cnt = {
					orderId: this.id, // Long 订单id
					status: this.$constData.orderStatus[2].key, // Byte 订单状态
				}
				this.$api.setOrderStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '../../user'
						})
						uni.showToast({
							title: '已收货',
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

			getOrderByOrderId(cnt) {
				this.$api.getOrderByOrderId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
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
						this.status = obj.orderStatus
						this.addressId = obj.addressId
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

			this.id = res.id
			// let cnt = {
			// 	orderId: res.id, // Long 订单id
			// };
			// this.getOrderByOrderId(cnt)

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

	.title-nav {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.save-btn {
		color: $group-color;
		font-size: 34rpx;
		margin-right: 30rpx;
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
		margin-bottom: 40rpx;
		font-size: 30rpx;
		line-height: 42rpx;
		padding: 0 30rpx;
	}

	.title-box {
		color: #999999;
		margin-bottom: 30rpx;
	}

	.left-icon {
		color: #FE5A6E;
		margin-right: 10rpx;
	}

	.auto-input {
		padding: 23rpx 30rpx;
		border-radius: 6rpx;
		border: 1rpx solid $group-color-befor;
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
</style>
