<template>
	<view class="page">
		<nav-bar :back="false" style="position: relative;">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">收支明细</view>
		</nav-bar>
		<view class="flex-box white">
			<!--top-public 公用宽高 边距等-->
			<view class="flex-box top-public" v-for="(item,index) in list" :key="index" :class="{'curr-box':currIndex == index}"
			 @click="currNav(index)">
				{{item.name}}
			</view>
		</view>
		<!-- 内容区域 -->
		<view v-if="currIndex == 0">
			<view class="content-box white" v-for="(item,index) in incomeList" :key="index">
				<view class="content">
					<view class="content-left">{{item.title}}</view>
					<view class="content-right">{{item.price}}</view>
				</view>
				<view v-if="item.openStatus">
					<view class="content">
						<view class="content-left-color">客户</view>
						<view class="content-right-color">{{item.acceptUser.name}}</view>
					</view>
					<view class="content">
						<view class="content-left-color">收款时间</view>
						<view class="content-right-color">{{item.payTime}}</view>
					</view>
					<view class="content">
						<view class="content-left-color">已收款项</view>
						<view class="content-right concolor content-right-color">
							<image class="instruc" src="/static/image/task/icon_yskx_g.png" mode="aspectFit"></image>{{item.payMoney}}
						</view>
					</view>
					<view class="content">
						<view class="content-left-color">应收款项</view>
						<view class="content-right-color ">{{item.price}}</view>
					</view>
					<view class="content task-text">
						<view class="content-left-color">任务发布人</view>
						<view class="content-right-color">
							<image class="headx" :src="item.upUser.head" mode="widthFix"></image>
							<text>{{item.upUser.name}}</text>
						</view>
					</view>
				</view>
				<!-- 隐藏box -->
				<view class="content more-box" style="padding-left: 0;" v-if="!item.openStatus" @click="changeTaskShow(index,0)">
					<view class="content-cen"> 查看完整任务</view>
					<image class="more-btn" src="/static/image/icon/user/task/icon_ckwzrw.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>

		<view v-else>
			<view class="content-box white" v-for="(item,index) in payList" :key="index">
				<view class="content">
					<view class="content-left">{{item.title}}</view>
					<view class="content-right">{{item.price}}</view>
				</view>
				<view v-if="item.openStatus">
					<view class="content">
						<view class="content-left-color pay-content-left-text">客户</view>
						<view class="content-left-color">{{item.upUser.name}}</view>
					</view>
					<view class="content">
						<view class="content-left-color pay-content-left-text">付款时间</view>
						<view class="content-left-color">{{item.payTime}}</view>
					</view>
					<view class="content">
						<view class="content-left-color pay-content-left-text">金额</view>
						<view class="content-left-color">{{item.payMoney}}</view>
					</view>
					<view class="content task-text">
						<view class="content-left-color pay-content-left-text">任务接收人</view>
						<view class="content-left-color" style="position: relative;">
							<image class="headx" :src="item.acceptUser.head" mode="widthFix"></image>
							<text>{{item.acceptUser.name}}</text>
						</view>
					</view>
				</view>
				<!-- 隐藏box -->
				<view class="content more-box" style="padding-left: 0;" v-if="!item.openStatus">
					<view class="content-cen" @click="changeTaskShow(index,1)"> 查看完整任务</view>
					<image class="more-btn" src="/static/image/icon/user/task/icon_ckwzrw.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>

		<view class="content-box white">
			<view class="content">
				<view class="content-left-color" :class="{'pay-content-left-text':currIndex == 1}">任务总数</view>
				<view class="content-right-color">{{currIndex == 0?incomeList.length:payList.length}}</view>
			</view>
			<view class="content">
				<view class="content-left-color" v-if="currIndex == 0">收入总计</view>
				<view class="content-left-color pay-content-left-text" v-else>支出总计</view>
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
				currIndex: 0,
				list: [{
						name: '我的收入'
					},
					{
						name: '我的支出'
					}
				],

				incomeList: [{
						title: '500全案助理',
						upUser: {
							name: '小铭'
						},
						payTime: '2019-10-10',
						payMoney: 'AUD 250',
						price: 'AUD 300',
						acceptUser: {
							name: '阿芬',
							head: '/static/image/icon/icon_docx.png',
						},
						openStatus: true
					},
					{
						title: '500全案助理',
						upUser: {
							name: '小铭'
						},
						payTime: '2019-10-10',
						payMoney: 'AUD 250',
						price: 'AUD 300',
						acceptUser: {
							name: '阿芬',
							head: '/static/image/icon/icon_docx.png',
						},
						openStatus: false
					}
				],

				payList: [{
					title: '500全案助理',
					upUser: {
						name: '小铭'
					},
					payTime: '2019-10-10',
					payMoney: 'AUD 250',
					price: 'AUD 300',
					acceptUser: {
						name: '阿芬',
						head: '/static/image/icon/icon_docx.png',
					},
					openStatus: true
				}, ]
			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},
			currNav(index) {
				this.currIndex = index
			},

			changeTaskShow(index, e) {
				if (e) {
					this.payList[index].openStatus = true
				} else {
					this.incomeList[index].openStatus = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-cen {
		font-size: 26rpx;
		color: #587685;
	}

	.content-b {
		height: 37rpx;
		line-height: 37rpx;
		color: #B6C4D2;
		padding-bottom: 30rpx;
		margin-left: 10rpx;
	}

	.page {
		background-color: #F2F5F7;
		min-height: 100vh;
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

	.flex-box {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-public {
		width: 330rpx;
		height: 88rpx;
		margin: 30rpx;
		font-size: 30rpx;
		box-sizing: border-box;
		border-radius: 4rpx;
		background-color: #F2F5F7;
		color: #587685;
	}

	.curr-box {
		color: #FFFFFF;
		background-color: #182F45;
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
		padding: 30rpx 10rpx;
		margin: 0 30rpx;
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
		height: 42rpx;
		line-height: 42rpx;
		position: relative;
	}

	.pay-content-left-text {
		color: #999999;
	}


	.headx {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		position: absolute;
		top: -3rpx;
		left: -60rpx;
	}

	.more-btn {
		width: 18.5rpx;
		height: 30rpx;
		margin-left: 19rpx;
	}

	.more-box {
		justify-content: center;
		align-items: center;
	}
</style>
