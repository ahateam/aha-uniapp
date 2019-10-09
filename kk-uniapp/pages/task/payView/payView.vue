<template>
	<view>
		<view class="showMoney">
			<view v-if="type == 0">￥{{money}}元</view>
			<view v-else-if="type == 1">
				<input type="number" v-model="money" placeholder="请输入支付金额" />
			</view>
		</view>

		<view class="payTitle">
			支付方式<text class="textInfo">(可以任选支付方式)</text>
		</view>
		<view class="payMethod">
			<radio-group @change="radioChange">
				<!-- #ifdef MP -->
				<label class="payList" v-for="(item, index) in items" :key="item.value">
					<text :class="'iconfont payIcon '+item.iconName " :style="item.style"></text>
					<text class="payName">{{item.name}}</text>
					<radio class="rightBox" :value="item.value" :checked="index === current" />
				</label>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<label class="payList" v-for="(item, index) in appItems" :key="item.value">
					<text :class="'iconfont payIcon '+item.iconName " :style="item.style"></text>
					<text class="payName">{{item.name}}</text>
					<radio class="rightBox" :value="item.value" :checked="index === current" />
				</label>
				<!-- #endif -->
			</radio-group>
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
				title: '',

				items: [
					// {
					// 	value: '0',
					// 	name: '余额',
					// 	iconName:'kk-money',
					// 	style:'color:#fb6c04'
					// },
					// #ifdef MP-WEIXIN
					{
						value: '0',
						name: '微信支付',
						id: this.$constData.payInfoList[0].id,
						iconName: 'kk-weixinzhifu',
						style: 'color:#24af41'
					},
					// #endif
					// #ifdef MP-ALIPAY
					{
						value: '1',
						name: '支付宝支付',
						id: this.$constData.payInfoList[5].id,
						iconName: 'kk-big-Pay',
						style: 'color:#1296db'
					},
					// #endif
				],
				appItems: [
					// {
					// 	value: '0',
					// 	name: '余额',
					// 	iconName:'kk-money',
					// 	style:'color:#fb6c04'
					// },
					{
						value: '1',
						name: '支付宝支付',
						id: this.$constData.payInfoList[5].id,
						iconName: 'kk-big-Pay',
						style: 'color:#1296db'
					},
					{
						value: '0',
						name: '微信支付',
						id: this.$constData.payInfoList[0].id,
						iconName: 'kk-weixinzhifu',
						style: 'color:#24af41'
					}
				],
				payMethod: 1,
				current: 0,
			}
		},
		onLoad(options) {
			this.id = options.id
			this.taskId = options.taskId
			this.type = options.type
			if (this.type == 1) {
				this.money = ''
				this.title = options.title
			} else if (this.type == 0) {
				this.money = 0.01
			}
			this.getProvider()
		},
		methods: {
			radioChange(evt) {
				this.payMethod = evt.target.value
				console.log(evt.target)
			},

			//支付宝支付
			apppayEarnestMoney() {
				let cnt = {}
				let taskData = {
					goodsId: '', //商品id
					goodsName: '', //商品名字
					userName: uni.getStorageSync('userName'), //用户名字
					userId: uni.getStorageSync('userId') //用户编号
				}
				if (this.type == 0) {
					taskData.goodsName = '创建任务预付款'
				} else {
					taskData.goodsId = this.id
					taskData.goodsName = this.title
				}
				if (this.type == 0) {
					cnt = {
						body: '任务创建预付款', // String 对一笔交易的具体描述信息
						subject: '表扬表扬ta', // String 商品的标题/交易标题/订单标题/订单关键字等
						totalAmount: this.money, // String 订单总金额，单位为元，精确到小数点后两位
						attach: JSON.stringify(taskData), // String 商家附加数据（jsonobject格式-goodsId-goodsName-userName）
					}
				} else {
					cnt = {
						body: '任务交易款', // String 对一笔交易的具体描述信息
						subject: '表扬表扬ta', // String 商品的标题/交易标题/订单标题/订单关键字等
						totalAmount: this.money, // String 订单总金额，单位为元，精确到小数点后两位
						attach: JSON.stringify(taskData), // String 商家附加数据（jsonobject格式-goodsId-goodsName-userName）
					}
				}
				if (this.payMethod == 1) {
					this.appAlipay(cnt)
				} else {
					uni.showToast({
						title: '暂不支持此方式',
						icon: 'none'
					})
				}
			},

			appAlipay(cnt) {
				this.$api.creatAlipayOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log('你要找的在下面：')
						console.log(res.data.c)
						uni.requestPayment({
							provider: this.$constData.providerList[5].id,
							orderInfo: this.$util.tryParseJson(res.data.c).body,
							success: () => {
								let cnt1 = {
									outTradeNo:this.$util.tryParseJson(res.data.c).outTradeNo
								}
								this.updatePayOrder(cnt1)
								let cnt2 = this.$store.state.createFoodTask.data
								if (this.type == 0) {
									this.createTask(cnt2)
								} else if (this.type == 1) {
									this.dealTask()
								}
							},
							fail: (error) => {
								uni.showToast({
									title: '支付失败',
									icon: 'none'
								})
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
				let taskData = {
					goodsId: '', //商品id
					goodsName: '', //商品名字
					userName: uni.getStorageSync('userName'), //用户名字
					userId:uni.getStorageSync('userId')
				}

				if (this.type == 0) {
					taskData.goodsName = '创建任务预付款'
				} else {
					taskData.goodsId = this.id
					taskData.goodsName = this.title
				}

				console.log(provider)
				if (provider.id == this.$constData.providerList[5].id) {
					cnt = {
						userId: uni.getStorageSync('openId'), // String 支付宝买方用户userId
						price: this.money, // double 支付金额
						payCount: '任务创建预付款', // String 商品的标题/交易标题/订单标题/订单关键字等
						attach: JSON.stringify(taskData), // String 商家附加数据（jsonobject格式-goodsId-goodsName-userName）
					}
					this.creatAlipayAppletOrder(cnt, provider)
				} else if (provider.id == this.$constData.payInfoList[0].id) {
					cnt = {
						openId: uni.getStorageSync('openId'), // String 微信用户openId
						totalFee: this.money * 100, //int 支付金额，单位为分，单位为分
						body: '任务创建预付款', // String 商品描述
						attach: JSON.stringify(taskData), // String 商家附加数据（jsonobject格式-goodsId-goodsName-userName）
					}
					this.doUnifiedOrder(cnt, provider)
				} else {
					uni.showToast({
						title: '暂不支持',
						icon: 'none'
					})
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
								let cnt1 = {
									outTradeNo:wx.outTradeNo
								}
								this.updatePayOrder(cnt1)
								console.log(res)
								if (this.type == 0) {
									let cnt2 = this.$store.state.createFoodTask.data
									this.createTask(cnt2)
								} else {
									this.dealTask()
								}
							},
							fail: (error) => {
								uni.showToast({
									title: '支付失败',
									icon: 'none'
								})
							}
						})
					} else {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						})
					}
				})
			},

			//支付宝小程序支付
			creatAlipayAppletOrder(cnt, provider) {
				this.$api.creatAlipayAppletOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(res.data.c)
						uni.requestPayment({
							provider: provider.id,
							orderInfo: res.data.c,
							success: (res) => {
								let cnt1 = {
									transactionId:res.data.c
								}
								this.updatePayOrder(cnt1)
								console.log(res)
								if (this.type == 0) {
									let cnt2 = this.$store.state.createFoodTask.data
									this.createTask(cnt2)
								} else {
									this.dealTask()
								}
							},
							fail: (error) => {
								uni.showToast({
									title: '支付失败！',
									icon: 'none'
								})
							}
						})
					} else {
						uni.showToast({
							title: '创建订单失败！',
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
							title: '已提交，待审核'
						})
					} else {
						uni.showToast({
							title: '错误！请联系客服',
							icon: 'none'
						})
					}
				})
			},
			
			//更新订单状态
			updatePayOrder(cnt){
				this.$api.updatePayOrder(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						console.log('订单更新成功')
					}else{
						console.log('订单更新失败')
					}
				})
			},

			//任务成交
			dealTask() {
				let cnt = {
					id: this.id, // Long 订单id
				}
				this.$api.editTaskApplyStatusAssigned(cnt, (res) => { //全额定金支付,双方第一次握手
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/task/task'
						})
						uni.showToast({
							title: '已指派，等待对方确认',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '错误！请联系客服',
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

	.rightBox {
		position: absolute;
		right: $box-margin-left;
		top: $box-margin-top;
		font-size: $list-info;
	}

	.payTitle {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
		line-hight: $list-title-line;

		.textInfo {
			font-size: $list-info;
			line-hight: $list-title-line;
			color: $list-info-color;
		}
	}

	.payList {
		position: relative;
		padding: $box-margin-top $box-margin-left;
		background-color: #fff;
		display: block;
		margin-bottom: 1px;
	}

	.payName {
		margin-left: 10upx;
		font-size: $list-info;
		vertical-align: middle;
	}

	.payIcon {
		font-size: $list-title-l;
		vertical-align: middle;
	}
</style>
