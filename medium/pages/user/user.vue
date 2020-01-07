<template>
	<view>
		<view :style="{'padding-top':`calc(${getNavHeight()} - 20rpx)` }"></view>
		<view class="user-box" :style="dataChangeStatus?'':'padding-bottom: 37rpx;'">
			<view class="flex-box">
				<image class="user-head" :src="constData.oss + imgSrc" mode="aspectFill"></image>
				<view class="btns-box">
					<view class="user-name">{{name}}</view>
					<view class="money-box">
						<image src="/static/image/icon/user/icon_ptb.png" mode="aspectFill"></image>
						<text>平台币{{money}}</text>
					</view>
				</view>
			</view>
			<view class="flex-box right-box">
				<view class="editor-box btns-box" @click="navToUser">
					<image src="/static/image/icon/user/edior.png" mode="aspectFill"></image>
					<text>修改个人资料</text>
				</view>
				<view class="tip-box flex-box right-box" :hidden="dataChangeStatus">
					<view class="tip-radius flex-box">
						<view class="radius-samll"></view>
					</view>
					<view class="tip-line"></view>
					<view class="tip-card-box">
						<image class="tip-card" src="/static/image/icon/user/tips.png" mode="aspectFit"></image>
						<view class="tip-text">完善个人信息，可以获得更多的任务哦</view>
					</view>
				</view>
			</view>
		</view>

		<view class="content-List">
			<view class="content-box" @click="navToView('./bill/bill')" v-if="income != '' &&payMoney !=''">
				<view class="left-box">
					<image class="left-icon" src="/static/image/icon/user/icon_gzqaud.png" mode="aspectFill"></image>
					<view>共赚取{{income}}澳元</view>
					<view class="pay-info">支出{{payMoney}}澳元</view>
					<view class="pay-info pay-btn">明细</view>
				</view>
				<image class="right-icon" src="/static/image/icon/icon_enter.png" mode="aspectFill"></image>
			</view>

			<view class="content-box" v-for="(item,index) in contentList" :key="index" @click="navToView(item.path)">
				<view class="left-box">
					<image class="left-icon" :src="item.iconSrc" mode="aspectFill"></image>
					<text>{{item.text}}</text>
				</view>
				<image class="right-icon" src="/static/image/icon/icon_enter.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'user',
		components: {},
		data() {
			return {
				constData: this.$constData,
				userInfo: {},
				// imgSrc: uni.getStorageSync('userHead'),
				imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575299763852&di=29607e81f528164e31fa7e0fde3e8c2f&imgtype=0&src=http%3A%2F%2F04imgmini.eastday.com%2Fmobile%2F20191022%2F2019102213_68c92b59f9a34b9b85fd586fa71112bc_7805_cover_mwpm_03201609.jpg',
				// name: uni.getStorageSync('userName'),
				name: '印第安老斑鸠',
				money: 0,
				contentList: [{
						text: '任务总览及浏览历史',
						iconSrc: '/static/image/icon/user/icon_rwzljllls.png',
						path: './task/task'
					},
					{
						text: '收款账户',
						iconSrc: '/static/image/icon/user/icon_skzh.png',
						path: './newUserInfo/setUserInfo'
					},
					{
						text: '账户安全',
						iconSrc: '/static/image/icon/user/icon_zhaq.png',
						path: './userSafe/userSafe'
					},
					{
						text: '帮助中心',
						iconSrc: '/static/image/icon/user/icon_bzzx.png',
						path: './helpcenter/helpcenter'
					}
				],

				applyTitle: 'Monash大学计算机专业申请',
				applyHsty: '签字已提交',
				hstyNumber: '25',
				dataChangeStatus: false,

				income: '', //收入
				payMoney: '', //支出
			}
		},
		methods: {
			navToUser() {
				uni.navigateTo({
					url: './perdata/perdata',
					success: () => {
						this.$commen.hiddenTabIcon()
					}
				})
			},

			navToView(url) {
				if (url) {
					uni.navigateTo({
						url: url,
						success: () => {
							this.$commen.hiddenTabIcon()
						}
					})
				}
			},
			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			getMyExpenditure(cnt) {
				this.$api.getMyExpenditure(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.payMoney = this.$util.tryParseJson(res.data.c)[0].taskmoney
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			getMyIncome(cnt) {
				this.$api.getMyIncome(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.income = this.$util.tryParseJson(res.data.c)[0].taskmoney
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			}
		},
		onShow() {
			this.$commen.showTabIcon()
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			console.log(userInfo)
			this.name = userInfo.userName
			this.imgSrc = userInfo.userHead
			this.money = userInfo.currency
			// if(userInfo.) //需要判定資料完善顯示提醒

			let cnt = {
				userId: userInfo.userId, // Long 用户id
				count: 1, // Integer 
				offset: 0, // Integer
			}
			this.getMyExpenditure(cnt) //支出
			this.getMyIncome(cnt) //收入
		}
	}
</script>

<style lang="scss" scoped>
	.padding-top-box {
		padding-top: calc(64px - 20rpx);
	}

	.icon-fanhui {
		font-size: 33rpx;
		position: absolute;
		left: 29rpx;
	}

	.user-head {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		margin-right: 30rpx;
	}

	.user-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 3rpx 40rpx 0;
	}

	.user-name {
		font-size: 34rpx;
		color: $group-color;
		line-height: 48rpx;
	}

	.btns-box {
		image {
			width: 17rpx;
			height: 20rpx;
			margin-right: 10rpx;
		}
	}

	.money-box {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 25rpx;
		background-color: #FFF8E5;
		box-sizing: border-box;
		border: 1rpx solid #FFF8E5;
		color: #FFA405;
		margin-top: 22rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		padding: 0 10rpx 0 4rpx;

		image {
			width: 26rpx;
			height: 26rpx;
			margin-right: 6rpx;
		}
	}

	.editor-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 180rpx;
		font-size: 20rpx;
		height: 50rpx;
		box-sizing: border-box;
		border-radius: 25rpx;
		border: 1rpx solid #00C8BE;
		color: #00C8BE;
	}

	.content-List {
		margin-top: 52rpx;
		padding: 0 40rpx;
		font-size: 30rpx;
		color: #333333;
	}

	.content-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 34rpx 0 34rpx 20rpx;
		border-bottom: 1rpx solid rgba($color: $group-color-border, $alpha: 0.7);
		
		&:active{
			background-color: rgba($color: #f9f9f9, $alpha: .9);
		}
	}

	.left-box {
		display: flex;
		align-items: center;
	}

	.left-icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 37rpx;
	}

	.right-icon {
		width: 12rpx;
		height: 21rpx;
	}

	.apply-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 596rpx;
		height: 120rpx;
		margin: 30rpx 0 0 74rpx;
		padding: 0 44rpx 0 24rpx;
		background-color: rgba($color: $group-color-search, $alpha: .36);
		border: 1rpx solid rgba($color: #CFDCE9, $alpha: .36);
	}

	.apply-text {
		font-size: 24rpx;
		line-height: 33rpx;
		color: $group-color;
	}

	.apply-hsty {
		color: #00C8BE;
	}

	.flex-box {
		display: flex;
		align-items: center;
	}

	.right-box {
		position: relative;
		width: 180rpx;
		justify-content: center;
		align-items: flex-end;
		flex-direction: column;
	}

	.tip-radius {
		position: relative;
		justify-content: center;
		z-index: 1;
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		// background-color: rgba($color: #00C8BE, $alpha: .1);
		margin-right: 77rpx;
	}

	.radius-content {
		width: 22rpx;
		height: 22rpx;
		border-radius: 50%;
		// background-color: rgba($color: #00C8BE, $alpha: .2);
	}

	.radius-samll {
		position: absolute;
		width: 14rpx;
		height: 14rpx;
		border-radius: 50%;
		background-color: #00C8BE;
		box-shadow:
			0 0 0 4rpx rgba($color: #00C8BE, $alpha: .2), 0 0 0 8rpx rgba($color: #00C8BE, $alpha: .1);
	}

	.tip-box {
		position: absolute;
		bottom: -15rpx;
	}

	.tip-line {
		position: absolute;
		top: 15rpx;
		width: 0;
		height: 73rpx;
		border-left: 2rpx solid #D3F6F6;
		right: 90rpx;
	}

	.tip-card-box {
		position: absolute;
		bottom: -125rpx;
	}

	.tip-card {
		display: block;
		width: 482rpx;
		height: 71rpx;
	}



	.tip-text {
		position: absolute;
		top: 23rpx;
		left: 20rpx;
		color: #00C8BE;
		font-size: 26rpx;
		line-height: 37rpx;
	}

	.pay-info {
		color: $group-color-befor;
		font-size: 26rpx;
		margin-left: 30rpx;
	}

	.pay-btn {
		background-color: $group-color-search;
		width: 92rpx;
		line-height: 48rpx;
		border-radius: 6rpx;
		text-align: center;
	}
</style>
