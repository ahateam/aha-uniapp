<template>
	<view class="content">
		<view class="sheet" :class="{sheetShow:isShowBottom,sheeHide:!isShowBottom}" @touchmove.stop.prevent="moveHandle"
		 @click="closeSheet()">
			<view class="sheetView" :class="{sheetView_active:isShowBottom}" @click.stop="stopEvent()">
				<view class="titleBox">打赏是种境界，我会更努力的</view>
				<view class="moneyBox" :class="{currMoney:index == current}" v-for="(item,index) in moneyList" @click="changeMoney(index,item.money)"
				 :key="index">
					<text style="font-size: 50rpx;margin-right: 10rpx;">{{item.money}}</text>元
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "bottomSheet",
		props: {
			isShowBottom: Boolean
		},

		data() {
			return {
				moneyList: [{
						money: '5'
					},
					{
						money: '10'
					},
					{
						money: '20'
					},
					{
						money: '50'
					}
				],
				current: 0,
			}
		},

		methods: {
			closeSheet() {
				this.$emit('closeBottom');
			},
			stopEvent() { //@click.stop防止事件冒泡

			},
			moveHandle() { //不让页面滚动

			},
			changeMoney(index, money) {
				this.current = index
				this.$emit('changeMoney', money)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* sheet弹窗 */
	.sheet {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 120%;
		left: 0rpx;
		bottom: 0rpx;
		right: 0rpx;
		background: rgba(0, 0, 0, 0.3);
		z-index: 10000;
	}
	
	.titleBox{
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: #666666;
		width: 100vw;
		text-align: center;
		margin-bottom: 60rpx;
	}

	/* 显示时候的动画默认0.5s */
	.sheetView {
		width: 100%;
		height: 0rpx;
		position: absolute;
		bottom: 0rpx;
		background: white;
		z-index: 10001;
		transition: all 0.5s;
		border-radius: 40rpx 40rpx 0 0;
		padding: 60rpx 60rpx 80rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.sheetShow {
		top: 0rpx !important;
	}

	/* 关闭时的动画，时间自己可以设置0.5s*/
	.sheeHide {
		top: 120% !important;
		transition: all 0.5s;
	}

	/* 项目需求根据设计稿要展示的高度,超出这个高度就自动滚动*/
	.sheetView_active {
		height: 506rpx;
	}

	.moneyBox {
		font-size: 26rpx;
		width: 291rpx;
		height: 102rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		border: 1rpx $group-color-curr solid;
		color: $group-color-curr;
		line-height: 102rpx;
		text-align: center;
		font-weight: normal;
		transition: all 0.3s;
		margin-bottom: 60rpx;
	}
	
	.currMoney{
		background-color: $group-color-curr;
		border-color: $group-color-curr;
		color: $group-color-w;
	}
</style>
