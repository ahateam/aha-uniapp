<template>
	<view>
		<nav-bar :back="false" class="navBox">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view>待签约合同</view>
			<view slot="right" class="next-btn" @click="toAtutograph">签名</view>
		</nav-bar>
		<view v-if="pageStatus != 'onload'&&!showAutograph">
			<view class="contract-list">
				<view v-for="(item,index) in list" :key="index">
					<view class="contract-box" :class="{'curr-box':currIndex == index}" @click="currContract(index)">
						<view class="title-box">{{item.clientName + item.visasType}}合同</view>
						<view class="time-box">{{getTime(item.createTime)}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="pageStatus"></uni-load-more>
		</view>
		<loading :status="pageStatus"></loading>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import Loading from '@/components/Loading/Loading.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	export default {
		components: {
			navBar,
			Loading,
			uniLoadMore
		},
		data() {
			return {
				pageStatus: 'onload',
				pageOver: false,
				offset: 0,
				count: 10,
				page: 1,

				userInfo: {},
				toUserInfo: {},

				list: [],

				currIndex: -1,

				showAutograph: false,
			};
		},
		methods: {
			toAtutograph() {
				if (this.currIndex == -1) {
					uni.showToast({
						title:'请选择一个合同',
						icon:'none'
					})
				} else {
					let id = this.list[this.currIndex].conId
					uni.navigateTo({
						url: `../toAtutograph/toAtutograph?id=${id}`
					})
				}
			},

			currContract(index) {
				if (this.currIndex == index) {
					this.currIndex = -1
				} else {
					this.currIndex = index
				}
			},

			tryParseList(list) {
				if (list.length < this.count) {
					this.pageStatus = 'nomore'
					this.pageOver = true
				} else {
					this.pageStatus = 'more'
				}

				this.list = this.list.concat(list)
			},

			getContractList(cnt) {
				this.$api.getContractList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.pageStatus = 'nomore'
						let list = this.$util.tryParseJson(res.data.c)
						console.log(list)
						this.tryParseList(list)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			navBack() {
				uni.navigateBack()
			},

			getTime(time) {
				let newTime = new Date(time)
				return this.$commen.dateTimeFliter(newTime)
			}
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.toUserInfo = JSON.parse(uni.getStorageSync('toUserInfo'))

			let cnt = {
				intermediaryId: this.toUserInfo.userId, // Long <选填> 中介编号
				studentId: this.userInfo.userId, // Long <选填> 学生编号
				status: 0, // Byte <选填> 状态
				count: this.count, // Integer
				offset: this.offset, // Integer
			}
			this.getContractList(cnt)
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

	.next-btn {
		color: #587685;
		font-weight: normal;
	}

	.contract-list {
		padding: $group-margin-top $group-margin-left;
	}

	.contract-box {
		box-sizing: border-box;
		border: 1rpx solid #EFF0F4;
		padding: $group-margin-top $group-margin-left;
		margin: 10rpx 0;
	}

	.curr-box {
		background-color: #EFF0F4;
	}

	.title-box {
		color: #333333;
		font-size: $group-font;
		margin-bottom: 10rpx;
	}

	.time-box {
		color: $group-color-befor;
		font-size: $group-font-info;
	}
</style>
