<template>
	<view>
		<nav-bar :back="false" type="transparent" fontColor="#333333" class="nav-bar">
			<view slot="left" class="iconfont icon-fanhui backBtn" @click="navBack"></view>
			<view class="title-nav">买家信息</view>
		</nav-bar>
		<view style="padding: 64rpx;"></view>

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
			<button class="success-btn">已发货</button>
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
				froms: [{
						name: '收货人',
						value: '王尼玛'
					},
					{
						name: '收货地址',
						value: '四川省成都外北熊猫大道1375号'
					},
					{
						name: '手机号',
						value: '13452667890'
					},
					{
						name: '买家送你的一句话',
						value: '亲，记得赶紧发货哦'
					}
				],
				express: {
					name: '顺丰速运',
					id: '8000049957229'
				}

			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},

			saveBtn() {
				console.log('save')
			}
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
