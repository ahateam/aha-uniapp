<template>
	<view>
		<view class="modelBox" v-if="isShow" @touchmove.stop.prevent="moveHandle" @click="closeMysheet()">
			<view class="modelSheet" @click.stop="otherClick()">
				<view class="sheetTitle">购买后不能退货哦</view>
				<button class="yesBtn" @click="buyBtn">确认</button>
				<button class="offBtn" @click="offBtn">再想想</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "centerSheet",
		props: {
			isShow: {
				type: Boolean
			}
		},
		methods: {
			buyBtn() {
				this.$emit('buyGoods')
				this.$emit('closeCenter')
			},

			offBtn() {
				this.$emit('closeCenter')
			},

			moveHandle() { //阻止蒙版底部的滑动
				return
			},
			otherClick() { //弹窗的点击事件，阻止事件冒泡

			},
			closeMysheet() {
				this.$emit("closeCenter");
			}
		}
	}
</script>
<style lang="scss" scoped>
	.modelBox {
		position: fixed;
		z-index: 999;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba($color: #010101, $alpha: .4);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modelSheet {
		width: 600rpx;
		background-color: #FFF;
		text-align: center;
		border-radius: 8rpx;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 70rpx 40rpx 50rpx;

		button {
			width: 250rpx;
			line-height: 80rpx;
			border-radius: 6rpx;

			&:after {
				border: none;
			}
		}
	}

	.sheetTitle {
		width: 100%;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: #333333;
		margin-bottom: 90rpx;
	}

	.yesBtn {
		color: $group-color-w;
		background-color: #00C8BE;
	}

	.offBtn {
		color: $group-color-befor;
		background-color: $group-color-w;
		border: 1rpx solid $group-color-befor;
		box-sizing: border-box;
	}
</style>
