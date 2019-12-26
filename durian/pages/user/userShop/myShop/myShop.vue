<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#000" class="nav-bar">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="title-box">收货信息</view>
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
			<button class="success-btn">已收货</button>
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

	.save-btn {
		color: $group-color;
		font-size: 34rpx;
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
