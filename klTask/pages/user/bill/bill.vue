<template>
	<view id="page">
		<view class="nav-box flex-box">
			<image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image>
			<view class="view-title">收支明细</view>
		</view>
		<image class="view-bg" src="/static/image/bg_c.png" mode="widthFix"></image>
		<view class="flex-box white">
			<!--top-public 公用宽高 边距等-->
			<view class="flex-box top-public" v-for="(item, index) in list" :key="index" :class="{ 'curr-box': currIndex == index }" @click="currNav(index)">{{ item.name }}</view>
		</view>
		<view class="tag-list flex-box">
			<view class="tag-box" @tap="choiceTime(index)" :class="{ 'curr-tag': currTag == index }" v-for="(item, index) in tagList" :key="index">{{ item.name }}</view>
		</view>
		<view class="content-box white">
			<view class="content">
				<view class="content-left-color" :class="{ 'pay-content-left-text': currIndex == 1 }">任务总数</view>
				<view class="content-right-color">{{ currIndex == 0 ? incomeList[0].tasknum : payList[0].tasknum }}</view>
			</view>
			<view class="content">
				<view class="content-left-color" v-if="currIndex == 0">收入总计</view>
				<view class="content-left-color pay-content-left-text" v-else>支出总计</view>
				<view class="content-right">AUD {{ currIndex == 0 ? incomeList[0].income : payList[0].income }}</view>
			</view>
		</view>

		<!-- 内容区域 -->
		<view v-if="currIndex == 0">
			<view v-for="(item, index) in incomeList" :key="index">
				<view class="content-box white" v-if="index != 0">
					<view class="content">
						<view class="content-left">{{ item.taskTitle }}</view>
					</view>
					<view class="content">
						<view class="content-left-color">完成时间</view>
						<view class="content-right-color">{{ getTime(item.finishTime) }}</view>
					</view>
					<view class="content">
						<view class="content-left-color">收入金额</view>
						<view class="content-right concolor content-right-color">
							<image class="instruc" src="/static/image/icon/icon_yskx_g.png" mode="aspectFit"></image>
							{{ item.money }} 澳元
						</view>
					</view>
					<view class="content task-text">
						<view class="content-left-color">任务发布人</view>
						<view class="content-right-color">
							<!-- <image class="headx" :src="constData.oss + item.pickUserHead" mode="widthFix"></image> -->
							<text>@{{ item.userName }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-else>
			<view v-for="(itm, idx) in payList" :key="idx">
				<view class="content-box white" v-if="idx != 0">
					<view class="content">
						<view class="content-left">{{ itm.taskName }}</view>
						<view class="content-right">{{ itm.money }} 澳元</view>
					</view>
					<view class="content">
						<view class="content-left-color">完成时间</view>
						<view class="content-right-color">{{ getTime(itm.finishTime) }}</view>
					</view>
					<view class="content task-text">
						<view class="content-left-color">任务发布人</view>
						<view class="content-right-color">
							<!-- <image class="headx" :src="constData.oss + item.pickUserHead" mode="widthFix"></image> -->
							<text>@{{ itm.userName }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import navBar from '@/components/zhouWei-navBar/index.vue';

export default {
	name: 'assistant',
	components: {
		navBar
	},
	data() {
		return {
			constData: this.$constData,
			userInfo: {},

			currIndex: 0,
			list: [
				{
					name: '我的收入',
					pageStatus: 'loading',
					pageOver: false,
					page: 1,
					tagCurr: 0
				},
				{
					name: '我的支出',
					pageStatus: 'loading',
					pageOver: false,
					page: 1,
					tagCurr: 0
				}
			],

			currTag: 0,
			tagList: [{ name: '所有时间' }, { name: '近三个月', type: 0 }, { name: '一个月内', type: 1 }],

			page: 1,
			pageStatus: 'onload',
			pageOver: false,

			incomeList: [],

			payList: []
		};
	},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		currNav(index) {
			this.currIndex = index;
			this.currTag = this.list[index].tagCurr;

			if (this.list[index].child) {
				this.page = this.list[index].page;
				this.pageStatus = this.list[index].pageStatus;
				this.pageOver = this.list[index].pageOver;
				if (index == 0) {
					this.incomeList = this.list[index].child;
				} else {
					this.payList = this.list[index].child;
				}
			} else {
				let cnt = {
					userId: this.userInfo.userId // Long 用户id
				};
				this.myExpend(cnt);
			}
		},

		choiceTime(index) {
			this.currTag = index;
			this.list[this.currIndex].tagCurr = index;

			let cnt = {
				userId: this.userInfo.userId // Long 用户id
			};
			if (index == 1) {
				cnt.type = 0;
			} else if (index == 2) {
				cnt.type = 1;
			}

			if (this.currIndex == 0) {
				this.incomeList = [];
				this.myIncome(cnt);
			} else {
				this.payList = [];
				this.myExpend(cnt);
			}
		},

		getTime(time) {
			return this.$commen.getNewDate(time);
		},

		myExpend(cnt) {
			this.$api.myExpend(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					let list = this.$util.tryParseJson(res.data.c);
					this.tryList(list);
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		myIncome(cnt) {
			this.$api.myIncome(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					let list = this.$util.tryParseJson(res.data.c);
					this.tryList(list);
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		},

		tryList(list) {
			console.log(list);
			if (list.length < this.count) {
				this.pageStatus = 'nomore';
				this.pageOver = true;
			} else {
				this.pageStatus = 'more';
				this.pageOver = false;
			}
			if (this.currIndex == 0) {
				this.incomeList = this.incomeList.concat(list);
				this.list[0].pageOver = this.pageOver;
				this.list[0].pageStatus = this.pageStatus;
				this.list[0].child = this.incomeList;
			} else {
				this.payList = this.payList.concat(list);
				this.list[1].pageOver = this.pageOver;
				this.list[1].pageStatus = this.pageStatus;
				this.list[1].child = this.payList;
				console.log(this.payList);
			}
		}
	},
	onLoad() {
		let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
		this.userInfo = userInfo;
		let cnt = {
			userId: userInfo.userId // Long 用户id
			// type: type // Byte <选填> 时间范围（一个月内：0，近三个月：1）
		};
		this.myIncome(cnt); //收入
	}
};
</script>

<style lang="scss" scoped>
.white {
	background-color: #ffffff;
}

#page {
	background-color: $group-color-bg;
	min-height: 100vh;
}

.nav-box {
	position: relative;
	z-index: 1;
	padding-top: $status-height;
	height: 88rpx;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.view-bg {
	position: absolute;
	top: 0;
	z-index: 0;
	width: 100vw;
	height: 100vh;
}

.view-title {
	color: #ffffff;
	font-size: 36rpx;
	font-weight: normal;
}

.flex-box {
	display: flex;
	align-items: center;
	justify-content: center;
}

.top-public {
	position: relative;
	width: 330rpx;
	height: 88rpx;
	margin: 30rpx;
	font-size: 30rpx;
	box-sizing: border-box;
	border-radius: 4rpx;
	background-color: #ffffff;
	color: #0f1b07;
}

.tag-list {
	position: relative;
	width: 100%;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 30rpx;
	color: #ffffff;
	line-height: 70rpx;
	font-size: 28rpx;
}

.tag-box {
	background-color: rgba($color: #ffffff, $alpha: 0.2);
	border-radius: 35rpx;
	width: 200rpx;
	box-sizing: border-box;
	text-align: center;
}

.curr-tag {
	background-color: rgba($color: #ffffff, $alpha: 0.8);
	color: #508324;
}

.curr-box {
	color: #ffffff;
	background-color: #0f1b07;
}

// 内容区域
.content-box {
	position: relative;
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
	border-bottom: 1rpx solid rgba($color: #587685, $alpha: 0.1);
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
	color: #ffa405;
	font-size: 30rpx;
}

.content-right > .instruc {
	width: 27rpx;
	height: 15rpx;
	margin-right: 15rpx;
}

.concolor {
	color: #ffcd34 !important;
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
</style>
