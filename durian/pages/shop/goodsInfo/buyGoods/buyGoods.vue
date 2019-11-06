<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#000">
			<view slot="left" class="iconfont icon-fanhui backBtn" @click="navBack"></view>
			<view class="title-box">商品兑换</view>
		</navBar>
		<view style="padding-top: 64px;"></view>
		<view class="tipBox">
			<text class="leftLine"></text>
			<text>给卖家留个地址个电话吧</text>
			<text class="rightLine"></text>
		</view>

		<view class="autoTitle" style="margin-top: 50rpx;">收货地址</view>
		<input type="text" class="autoInput" v-model="address" />

		<view class="autoTitle">手机号<text class="rightBox">{{newTel()}}</text></view>

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
				address: '', //地址
				tel: '18772229999', //电话
				remark: '', //备注
			}
		},
		methods: {
			payMoney() {
				if (this.address == '') {
					uni.showToast({
						title: '请输入地址',
						icon: 'none'
					})
				} else {
					uni.switchTab({
						url: '/pages/shop/shop'
					})
					uni.showToast({
						title: '购买成功'
					})
				}
			},

			newTel() {
				let arr = this.tel.split('')
				let newNumber = ''
				for (let i = 0; i < arr.length; i++) {
					if (i > 3 && i < 8) {
						arr[i] = '*'
					}
					newNumber = newNumber + arr[i]
				}
				return newNumber
			},
			navBack() {
				uni.navigateBack()
			},
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
		color: $group-color-befor;
		text-align: center;
	}

	.leftLine,
	.rightLine {
		position: relative;
		border-right: 1rpx solid $group-color-befor;
		margin: 0 24rpx;

		&:after {
			content: '';
			position: absolute;
			left: -139.5rpx;
			top: 50%;
			margin-top: -0.5rpx;
			width: 140rpx;
			height: 1rpx;
			border-bottom: 1px solid;
			border-image: linear-gradient(to right, rgba($color: #DCE4EB, $alpha: 0), #B6C4D2) 0 0 1;
		}
	}

	.rightLine {
		border: none;
		border-left: 1rpx solid $group-color-befor;

		&:after {
			content: '';
			position: absolute;
			left: 0;
			border-image: linear-gradient(to right, #B6C4D2, rgba($color: #DCE4EB, $alpha: 0)) 0 0 1;
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
		margin: 30rpx;
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
		display: block;
		width: 690rpx;
		font-size: 36rpx;
		color: $group-color-w;
		line-height: 102rpx;
		margin: 0 auto;
		background-color: $group-color-curr;
		border-radius: 6rpx;
		margin-top: 100rpx;

		&:after {
			border: none;
		}
	}
</style>
