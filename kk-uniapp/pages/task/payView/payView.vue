<template>
	<view>
		<view class="showMoney">
			<view v-if="type == 0">￥{{money}}元</view>
			<view v-else-if="type == 1">
				<input type="number" v-model="money" placeholder="请输入支付金额" />
			</view>
		</view>
		<view class="bottonBox">
			<button class="payBtn" type="primary" @click="payMoney">支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '',
				id: '',
				taskId: '',
				type: 0, //0为平台预付款 1为任务全款预付款
				providerList: [],

			}
		},
		onLoad(options) {
			this.id = options.id
			this.taskId = options.taskId
			this.type = options.type
			if (this.type == 1) {
				this.money = ''
			} else if (this.type == 0) {
				this.money = 0.01
			}
			this.getProvider()
		},
		methods: {
			//支付宝支付
			apppayEarnestMoney() {
				let cnt = {
					body: '任务创建预付款', // String 对一笔交易的具体描述信息
					subject: '表扬表扬ta', // String 商品的标题/交易标题/订单标题/订单关键字等
					totalAmount: this.money, // String 订单总金额，单位为元，精确到小数点后两位
				}
				this.$api.creatAlipayOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(res.data.c)
						uni.requestPayment({
							provider: this.$constData.providerList[5].id,
							orderInfo: this.$util.tryParseJson(res.data.c),
							success: (res) => {
								console.log(res)
								let cnt1 = this.$store.state.createFoodTask.data
								if (this.type == 0) {
									this.createTask(cnt1)
								} else if (this.type == 1) {
									this.dealTask()
								}
							},
							fail: (error) => {
								console.log(error)
							}
						})
					} else {
						uni.showToast({
							title: '创建订单失败',
							icon: 'none'
						})
					}
				})
			},

			//支付平台信誉定金
			payEarnestMoney() {
				let provider = this.providerList[0]
				let cnt = {}
				console.log(provider)
				if (provider.id == this.$constData.providerList[5].id) {
					cnt.userId = uni.getStorageSync('openId') // String 支付宝买方用户userId
					cnt.price = this.money // double 支付金额
					cnt.payCount = '任务创建预付款' // String 商品的标题/交易标题/订单标题/订单关键字等
					this.creatAlipayAppletOrder(cnt, provider)
				} else if (provider.id == this.$constData.payInfoList[0].id) {
					cnt.openId = uni.getStorageSync('openId') // String 微信用户openId
					cnt.totalFee = this.money * 100 //int 支付金额，单位为分，单位为分
					cnt.body = '任务创建预付款' // String 商品描述
					this.doUnifiedOrder(cnt, provider)
				} else if (provider.id == this.$constData.payInfoList[1].id) {
					cnt.userId = uni.getStorageSync('openId') // String 支付宝买方用户userId
					cnt.price = this.money // double 支付金额
					cnt.payCount = '任务创建预付款' // String 商品的标题/交易标题/订单标题/订单关键字等
					provider.id = this.$constData.providerList[5].id
					this.creatAlipayAppletOrder(cnt, provider)
				}
			},

			//微信小程序支付
			doUnifiedOrder(cnt, provider) {
				this.$api.doUnifiedOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let wx = this.$util.tryParseJson(res.data.c)
						uni.requestPayment({
							provider: provider.id,
							timeStamp: wx.timeStamp + '',
							nonceStr: wx.nonceStr,
							package: wx.package,
							signType: 'MD5',
							paySign: wx.paySign,
							success: (res) => {
								console.log(res)
								let cnt1 = this.$store.state.createFoodTask.data
								this.createTask(cnt1)
							},
							fail: (error) => {
								console.log(error)
							}
						})
					}
				})
			},

			//支付宝小程序支付
			creatAlipayAppletOrder(cnt, provider) {
				this.$api.creatAlipayAppletOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.requestPayment({
							provider: provider.id,
							orderInfo: res.data.c,
							success: (res) => {
								console.log(res)
								let cnt1 = this.$store.state.createFoodTask.data
								this.createTask(cnt1)
							},
							fail: (error) => {
								console.log(error)
							}
						})
					} else {
						uni.showToast({
							title: '失败！',
							icon: 'none'
						})
					}
				})
			},

			//创建订单
			createTask(cnt) {
				this.$api.createTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$store.state.createFoodTask.data = ''
						uni.switchTab({
							url: '/pages/task/task'
						})
						uni.showToast({
							title: '提交成功'
						})
					} else {
						uni.showToast({
							title: '错误！',
							icon: 'none'
						})
					}
				})
			},

			//任务成交
			dealTask() {
				let cnt = {
					id: this.id, // Long 订单id
					taskId: this.taskId, // Long 任务id
				}
				this.$api.TaskApplyConfirm(cnt, (res) => { //全额定金支付,双方第一次握手
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/task/task'
						});
						uni.showToast({
							title: '提交成功'
						})
					} else {
						uni.showToast({
							title: '不太行',
							icon: 'none'
						})
					}
				})
			},

			payMoney() {
				if (this.money == '') {
					uni.showToast({
						title: '请输入金额',
						icon: 'none'
					})
					return
				}
				// #ifdef APP-PLUS
				this.apppayEarnestMoney()
				// #endif

				// #ifdef MP
				this.payEarnestMoney()
				// #endif
			},
			//获取通道
			getProvider() {
				uni.getProvider({
					service: 'payment',
					success: (result) => {
						this.providerList = result.provider.map((value) => {
							let providerName = '';
							switch (value) {
								case 'weixin':
									providerName = '微信支付'
									break;
									// case 'qq':
									// 	providerName = 'QQ支付'
									// 	break;
									// case 'sinaweibo':
									// 	providerName = '新浪微博'
									// 	break;
									// case 'xiaomi':
									// 	providerName = '小米'
									// 	break;
								case 'alipay':
									providerName = '支付宝'
									break;
								case 'baidu':
									providerName = '百度'
									break;
								case 'toutiao':
									providerName = '头条'
									break;
								case 'appleiap':
									providerName = '苹果应用内支付'
									break;
							}
							return {
								name: providerName,
								id: value
							}
						});
						console.log(this.providerList)
					},
					fail: (error) => {
						console.log('获取登录通道失败', error);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.showMoney {
		width: 100vw;
		height: 56.25vw;
		text-align: center;
		font-size: $list-title-l;
		line-height: 56.25vw;
		background-color: #f0f0f0;

		input {
			font-size: $list-title-l;
			height: 56.25vw;
		}
	}

	.bottonBox {
		margin-top: $box-margin-top;
		text-align: center;
	}

	.payBtn {
		width: 50vw;
	}
</style>
