<template>
	<view class="page">
		<nav-bar :back="false" style="position: relative;">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">收支明细</view>
		</nav-bar>
		<view class="top-box white">
			<!--top-public 公用宽高 边距等-->
			<view class="top-public" v-for="(item,index) in list" :key="index" :class="cut == index?'top-left ':'top-right'"
			 @click="cut">
				{{item.name}}
			</view>
			<!-- <view class="top-right top-public">
				我的支付
			</view> -->
		</view>
		<!-- 内容区域 -->
		<view class="content-box ">
			<view class="content white">
				<view class="content-left">500全案助理</view>
				<view class="content-right">AUD 300</view>
			</view>
			<view class="content white">
				<view class="content-left-color">客户</view>
				<view class="content-right-color">AUD 300</view>
			</view>
			<view class="content white">
				<view class="content-left-color">收款时间</view>
				<view class="content-right-color">2019-1-2</view>
			</view>
			<view class="content white">
				<view class="content-left-color">已收款项</view>
				<view class="content-right concolor content-right-color">
					<image class="instruc" src="/static/image/task/icon_yskx_g.png" mode=""></image>AUD 250
				</view>
			</view>
			<view class="content white">
				<view class="content-left-color">应收款项</view>
				<view class="content-right-color ">AUD 300</view>
			</view>
			<view class="content white task-text">
				<view class="content-left-color">任务发布人</view>
				<view class="content-right-color">
					<image class="headx" src="/static/image/icon/icon_docx.png" mode="widthFix"></image>
					<text>阿盼</text>
				</view>
			</view>
		</view>
		<view class="content-box ">
			<view class="content white">
				<view class="content-left">500全案助理</view>
				<view class="content-right">AUD 300</view>
			</view>
			<view class="content white" style="padding-left: 0;">
				<view class="content-cen"> 查看完整任务图</view>
			</view>
		</view>
		<view class="content-box ">
			<view class="content white">
				<view class="content-left-color">任务总数</view>
				<view class="content-right-color">2</view>
			</view>
			<view class="content white">
				<view class="content-left-color">收入总计</view>
				<view class="content-right">AUD 600 <text class="content-b"> (含GST)</text></view>
			</view>
		</view>

	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		name: 'assistant',
		components: {
			navBar
		},
		data() {
			return {
				cuts: true,
				list: [{
						name: '我的收入',
					},
					{
						name: '我的支出',
					}
				]
			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},
			cut() {
				this.cut = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-cen {
		font-size: 26rpx;
		color: #587685;
		width: 100%;
		text-align: center;
	}

	.content-b {
		height: 37rpx;
		line-height: 37rpx;
		color: #B6C4D2;
		padding-bottom: 30rpx;
	}

	// .bottom {
	// 	margin-bottom: 78rpx;
	// }

	.page {
		background-color: #F2F5F7;
	}

	.white {
		background-color: #FFFFFF;
	}

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

	.top-box {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-public {
		width: 330rpx;
		height: 88rpx;
		padding: 23rpx;
		text-align: center;
		margin: 30rpx;
		line-height: 88rpx;
		font-size: 30rpx;
	}

	.top-left {
		color: #FFFFFF;
		background-color: #182F45;
	}

	.top-right {
		background-color: #F2F5F7;
		color: #587685;
	}

	// 内容区域
	.content-box {
		width: 690rpx;
		margin: 0 30rpx;
		display: inline-block;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 6rpx;
		box-shadow: 0px 4px 20px 0px rgba(182, 196, 210, 0.4), 0px 0px 1px 0px rgba(0, 0, 0, 0.05);
	}

	.content {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0 30rpx 40rpx;
		border-bottom: 1rpx solid rgba($color: #587685, $alpha: .1);
	}

	.content-left {
		height: 42rpx;
		line-height: 42rpx;
		font-size: 30rpx;
		border-bottom: #000000;
	}

	.content-right {
		display: inline-block;
		height: 42rpx;
		line-height: 42rpx;
		color: #FFA405;
		font-size: 30rpx;
		padding-right: 30rpx;
	}

	.content-size {
		display: inline;
		font-size: 26rpx;
		color: #666666;
	}

	.content-right>.instruc {
		width: 27rpx;
		height: 15rpx;
		margin-right: 15rpx;

	}

	.concolor {
		color: #00C8BE !important;
	}

	.content-left-color {
		color: #666666;
		height: 42rpx;
		line-height: 42rpx;
		font-size: 26rpx;
	}

	.content-right-color {
		color: #333333;
		font-size: 26rpx;
		padding-right: 30rpx;
		height: 42rpx;
		line-height: 42rpx;
		position: relative;
	}

	.headx {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		position: absolute;
		top: -3rpx;
		left: -66rpx;
	}
</style>
