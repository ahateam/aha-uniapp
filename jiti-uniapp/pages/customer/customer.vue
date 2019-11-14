<template>
	<view class="box">
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
		<navigator url="/pages/customer/feedback" class="content_box">
				意见反馈
		</navigator>
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

		},
		onLoad() {
			let cnt = {};
			this.$api.getCustomer(cnt, (res) => {
				this.customer = JSON.parse(res.data.c)
			});
		}
	}
</script>

<style>
	.content_box{
		position: fixed;
		bottom: 40rpx;
		text-align: center;
		width: 100%;
		color: #404040;
		font-size: 28rpx;
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
</style>
