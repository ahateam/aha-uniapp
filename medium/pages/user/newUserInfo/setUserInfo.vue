<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">收款账户信息</view>
		</nav-bar>
		<view class="tip-box">
			<image src="/static/image/icon/icon_l.png" mode="aspectFit"></image>
			<view>请提供客户账户(收款账户)信息</view>
			<image src="/static/image/icon/icon_r.png" mode="aspectFit"></image>
		</view>

		<data-input title="账户名" hiddenIcon v-model="name"></data-input>
		<data-input title="BSB" hiddenIcon v-model="BSB"></data-input>
		<data-input title="账号" hiddenIcon placeholder="Account Number" v-model="accountNumber"></data-input>
		<data-input title="电子邮件地址" hiddenIcon placeholder="用于接收电子账单" v-model="email"></data-input>
		<view class="fixed-box">
			<next-btn title="保存"></next-btn>
		</view>

	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import DataInput from '@/components/dataInput/DataInput.vue'
	import NextBtn from '@/components/NextBtn/NextBtn.vue'

	export default {
		components: {
			navBar,
			DataInput,
			NextBtn
		},
		data() {
			return {
				name: '',
				BSB: '',
				accountNumber: '',
				email: '',
			};
		},
		methods: {
			navBack() {
				uni.navigateBack()
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

	.view-title {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	.tip-box {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;

		image {
			width: 140rpx;
			height: 14rpx;
		}
	}

	.fixed-box {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
