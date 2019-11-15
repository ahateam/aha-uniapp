<template>
	<view class="box">
		<view class="content-box">
			<view class="title-box">
				<span>客服联系方式</span>
			</view>
		</view>
		<view class="customer-row" v-if="customer != null">
			<p class="row">
				<view class="title">客服姓名:</view>
				<view class="content">{{customer.name}}</view>
			</p>
			<p class="row">
				<view class="title">手机号:</view>
				<view class="content">{{customer.phone}}</view>
			</p>
			<p class="row" v-if="customer.Email != null">
				<view class="title">邮箱:</view>
				<view class="content">{{customer.Email}}</view>
			</p>

			<p class="row" v-if="customer.qqNumber != null">
				<view class="title">QQ号:</view>
				<view class="content">{{customer.qqNumber}}</view>
			</p>
			<p class="row" v-if="customer.wxNumber != null">
				<view class="title">微信号:</view>
				<view class="content">{{customer.wxNumber}}</view>
			</p>
		</view>
			<view class="content-box"> 
				<button type="primary" @click="toFeedBack">意见反馈</button>
					<button type="default" @click="toHome">返回首页</button>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customer: {}
			}
		},
		methods: {
			toFeedBack(){
				uni.navigateTo({
				    url: './feedback'
				});
			},
			toHome(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		},
		onLoad() {
			let cnt = {};
			this.$api.getCustomer(cnt, (res) => {
				this.customer = JSON.parse(res.data.c)
			});
		}
	}
</script>

<style lang="scss" scoped>
	.content_box{
		position: fixed;
		bottom: 40rpx;
		text-align: center;
		padding: 20rpx 0;
		width: 100%;
		color: #fff;
		font-size: 28rpx;
		background: $jiti-color-blue;
	}
	.box {
		width: 100%;
		height: 400rpx;
	}

	.customer-row {
		margin-top: 100rpx;
		width: 100%;
		height: auto;
		padding: 0rpx 20%;
		font-size: 30rpx;
	}

	.row {
		width: 100%;
		height: 80rpx;
	}

	.title {
		width: 140rpx;
		float: left;
		text-align: center;
	}

	.content {
		padding-left: 20rpx;
		float: left;
	}
	.content-box {
		width: 94%;
		margin: 0 auto;
	}
	.title-box {
		margin-top: 20rpx;
		width: auto;
		height: 50rpx;
		color: #fff;
		font-size: 32rpx;
		line-height: 50rpx;
		background: $jiti-color-blue;
		padding: 20rpx;
		text-align: center;
	
	}
</style>
