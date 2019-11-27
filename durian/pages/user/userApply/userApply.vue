<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#FFFFFF">
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
		</navBar>
		<image class="bg-img" src="/static/image/user/bg_wdsq.png" mode="widthFix"></image>
		<view :style="{'padding-top': getNavHeight()}"></view>
		<view style="position: relative;">
			<view class="title-text">我的申请</view>
			<view class="title-info">{{school}}大学{{major}}专业申请</view>
		</view>

		<view class="content-box">
			<view class="auto-box top-list" v-for="(item,index) in datas" :key="index">
				<view class="left-title">{{item.name}}</view>
				<view>{{item.value}}</view>
			</view>

			<view class="auto-box schedule-box">
				<view class="left-title" style="line-height: 42rpx;">最新进展</view>
				<view class="schedule-line-box">
					<view class="succ-line" :style="{flex:succLine}" :class="succLine >= 100 ? 'radius':''">
						<view class="succ-number" :style="{right: - succLine.toString().length / 2 + 'em'}">{{succLine}}%</view>
					</view>
					<view class="schedule-line" :style="{flex:100 - succLine}">
						<view class="cut-line" v-if="succLine > 0 && succLine < 100"></view>
					</view>
				</view>

				<view class="thing-box">
					{{thingTime}} {{thingText}}
				</view>

				<button class="pay-btn" @click="payBtn">支付 </button>
			</view>

			<view class="auto-box history-box">
				<view class="left-title" style="line-height: 42rpx;">历史进展</view>
				<view class="hsty-list">
					<view class="hsty-item" :class="[{'border-none':index + 1 == historyList.length&&moreStatus},{'border-none':index == 2&&!moreStatus},{'left-dot-border':!item.status}]"
					 v-for="(item,index) in historyList" :key="index" :hidden="!moreStatus&&index > 2">
						<view>
							<view class="hsty-dot" :class="!item.status?'curr-dot':''"></view>
							<view class="hsty-text">{{item.time}}</view>
							<view class="hsty-text hsty-text-right">{{item.text}}</view>
						</view>
					</view>
				</view>
				<view class="more-box">
					<button class="more-btn" @click="moreBtn" v-if="!moreStatus">查看更多</button>
					<button class="more-btn" @click="closeBtn" v-if="moreStatus">收起</button>
				</view>
			</view>

			<view class="auto-box data-box">
				<view class="left-title">我的资料</view>
				<view class="data-list">
					<view>
						<view class="data-name">
							{{dataName}}
						</view>
						<view class="data-size">
							{{dataSize}}
						</view>
					</view>
					<image src="/static/image/user/icon_docx.png" mode="scaleToFill"></image>
				</view>
			</view>

			<view class="pay-hsty-box">
				<view class="left-title">支付历史</view>
				<view class="pay-list" v-for="(item,index) in payHstyList" :key="index">
					<view class="pay-info-box">
						<view class="left-line"></view>
						<view class="pay-title">{{item.title}}</view>
						<view class="pay-money">{{item.money}}</view>
					</view>
					<view class="pay-time-box">
						<view class="iconfont icon-tupianx"></view>
						<view>{{item.time}}</view>
					</view>
				</view>
			</view>
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
				school: 'Monash', //学校
				major: '计算机', //专业
				time: '2018年3月5日', //时间
				visa: '500学生签证', //签证


				datas: [{
						name: '申请日期',
						value: ''
					},
					{
						name: '学校',
						value: ''
					},
					{
						name: '专业',
						value: ''
					},
					{
						name: '签证',
						value: ''
					}
				],

				succLine: 15,

				thingTime: '2019-10-01',
				thingText: '等待支付学费',


				historyList: [{
						time: '2019-10-05',
						text: '提交签证申请',
						status: false
					},
					{
						time: '2019-10-03',
						text: '收到offer',
						status: true
					},
					{
						time: '2019-10-01',
						text: '上传材料',
						status: true
					},
					{
						time: '2019-10-01',
						text: '上传材料',
						status: true
					},
					{
						time: '2019-10-01',
						text: '上传材料',
						status: true
					}
				],
				moreStatus: false,

				dataName: '我的本科成绩单.Docx',
				dataSize: '216K',

				payHstyList: [{
					title: 'Monash大学计算机专业',
					money: 'AUD 1000',
					time: '2019-10-9'
				}]
			}
		},
		methods: {
			closeBtn() {
				this.moreStatus = false
			},

			moreBtn() {
				this.moreStatus = true
			},

			// 支付按钮
			payBtn() {
				this.succLine += 5
			},

			navBack() {
				uni.navigateBack()
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},
		},
		onLoad() {
			this.datas[0].value = this.time
			this.datas[1].value = this.school
			this.datas[2].value = this.major
			this.datas[3].value = this.visa
		}
	}
</script>

<style lang="scss" scoped>
	button {
		&:after {
			border: none;
		}
	}

	.icon-fanhui {
		font-size: 33rpx;
		position: absolute;
		left: 29rpx;
	}

	.bg-img {
		position: absolute;
		width: 100%;
	}

	.title-text {
		margin: 40rpx 0 0 40rpx;
		font-size: 40rpx;
		line-height: 56rpx;
		color: $group-color-w;
	}

	.title-info {
		margin: 20rpx 0 0 40rpx;
		color: $group-color-w;
		font-size: $group-font;
		line-height: 37rpx;
	}

	.content-box {
		position: relative;
		margin-top: 50rpx;
		padding-top: 6rpx;
		width: 100%;
		background-color: $group-color-w;
		border-radius: 40rpx 40rpx 0 0;
		min-height: 50vh;
	}

	.auto-box {
		display: flex;
		margin: 0 40rpx;
		font-size: $group-font-befor;
		color: #333333;
		border-bottom: 1rpx solid #EFF0F4;
	}

	.top-list {
		line-height: 109rpx;
		justify-content: space-between;
	}

	.left-title {
		color: #666666;
	}

	.schedule-box {
		display: block;
		padding: 33rpx 0 30rpx;
	}

	.schedule-line-box {
		display: flex;
		margin-top: 72rpx;
		height: 16rpx;
		width: 100%;
		background-color: #F2F5F7;
		border-radius: 12.5rpx;
	}

	.succ-line {
		position: relative;
		background: linear-gradient(90deg, #FAD961, #FFA405);
		border-radius: 12.5rpx 0 0 12.5rpx;
		transition: all .3s;
	}

	.succ-number {
		position: absolute;
		top: -56rpx;
		// right: -1em;
		font-size: 26rpx;
		color: #FFA405;
		line-height: 30rpx;
	}

	.schedule-line {
		position: relative;
		// background-color: red;
		border-radius: 0 12.5rpx 12.5rpx 0;
	}

	.radius {
		border-radius: 12.5rpx;
	}

	.cut-line {
		position: absolute;
		top: 0;
		left: -5rpx;
		width: 0;
		height: 0;
		border: 6rpx solid;
		border-color: #FFF transparent transparent;
	}

	.thing-box {
		margin-top: 30rpx;
		text-align: center;
		font-size: 28rpx;
		line-height: 40rpx;
		color: #587685;
	}

	.pay-btn {
		display: block;
		margin: 0 auto;
		margin-top: 30rpx;
		width: 250rpx;
		line-height: 70rpx;
		background-color: #FE5A6E;
		border-radius: 6rpx;
		color: $group-color-w;
		font-size: $group-font-befor;
	}

	.button-hover {
		opacity: .7;
	}

	.history-box {
		padding: 30rpx 40rpx 34rpx 40rpx;
		display: block;
		margin: 0;
	}

	.hsty-list {
		margin: 50rpx 0 0 10rpx;
	}

	.hsty-item {
		position: relative;
		width: 100%;
		height: 80rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #999999;
		line-height: 40rpx;
		border-left: 1rpx solid $group-color-befor;
		padding-left: 30rpx;
	}

	.hsty-dot {
		position: absolute;
		top: -6rpx;
		left: -6rpx;
		width: 12rpx;
		height: 12rpx;
		background-color: #B6C4D2;
		border-radius: 50%;
	}

	.hsty-text {
		position: absolute;
		top: -20rpx;
	}

	.hsty-text-right {
		right: 0;
	}

	.border-none {
		height: 1rpx;
	}

	.curr-dot {
		background: #00C8BE;
		border: 4rpx solid #D3F6F6;
		top: -10rpx;
		left: -10rpx;
	}

	.more-box {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.more-btn {
		display: inline-block;
		padding: 6rpx 28rpx;
		margin: 50rpx auto 0;
		line-height: 37rpx;
		color: $group-color;
		font-size: 26rpx;
		border-radius: 25rpx;
		border: 1rpx solid #CFDCE9;
		background-color: rgba($color: #FFFFFF, $alpha: 0);
	}

	.data-box {
		padding: 30rpx 40rpx;
		display: block;
		margin: 0;
	}

	.data-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		margin-top: 30rpx;
		border: 1rpx solid #CFDCE9;
		border-radius: 6rpx;
		padding: 0 20rpx;

		image {
			width: 80rpx;
			height: 80rpx;
		}
	}

	.data-name {
		font-size: 28rpx;
		color: $group-color;
		line-height: 30rpx;
		margin-bottom: 12rpx;
	}

	.data-size {
		font-size: 24rpx;
		color: $group-color-befor;
		line-height: 20rpx;
	}

	.pay-hsty-box {
		padding: 30rpx 30rpx 40rpx;
	}

	.pay-list {
		margin-top: 30rpx;
		padding: 40rpx 0;
		border: 1rpx solid #F2F5F7;
		box-shadow: 0 0 15rpx 0 rgba($color: #B6C4D2, $alpha: .4)
	}

	.pay-info-box {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40rpx 0 0;
		line-height: 48rpx;
	}

	.left-line {
		position: absolute;
		left: 0;
		border-radius: 0 4rpx 4rpx 0;
		background-color: #00C8BE;
		width: 5rpx;
		height: 40rpx;
	}

	.pay-title {
		color: #333333;
		font-size: 34rpx;
		padding-left: 40rpx;
	}

	.pay-money {
		color: #FFA405;
		font-size: 26rpx;
	}

	.pay-time-box {
		display: flex;
		align-items: center;
		margin: 30rpx 0 0 40rpx;
		color: #666666;
		font-size: 28rpx;

		.iconfont {
			font-size: 26rpx;
			color: #B6C4D2;
			margin-right: 20rpx;
		}
	}

	.left-dot-border {
		border-left: 1rpx dotted #00C8BE;
	}
</style>
