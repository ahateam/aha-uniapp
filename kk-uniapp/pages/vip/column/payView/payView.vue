<template>
	<view class="body">
		<view class="titleBox">
			<image class="img" :src="src" mode="scaleToFill"></image>
			<view class="titleText">
				<view>{{title}}</view>
				<view class="money">￥{{money}}</view>
			</view>
		</view>

		<view class="offBox">
			<view>优惠券</view>
			<view class="rightBox">
				<!-- <text class="offMoney">-￥{{offMoney}}</text> -->
				<text class="iconfont kk-xiayibu"></text>
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



		<view class="errInfo">
			<view>·您将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请斟酌确认。</view>
			<view>·购买后可在“已购”区查看和使用。</view>
		</view>

		<view class="bottomBtn">
			<button type="primary" @click="navToPay">￥{{money}}/立即支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				columnId: '',

				src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567139311188&di=b309ce828b72d42a2c9318f26f7115c7&imgtype=0&src=http%3A%2F%2Fwww.pclady.com.cn%2Fstyle%2Fmovie%2F0509%2Fpic%2Fbb20050920_shjz_06_thumb.jpg',
				title: '',
				money: 999,
				offMoney: '5',
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
						value: '0',
						name: '支付宝支付',
						id: this.$constData.payInfoList[5].id,
						iconName: 'kk-big-Pay',
						style: 'color:#1296db'
					},
					{
						value: '1',
						name: '微信支付',
						id: this.$constData.payInfoList[0].id,
						iconName: 'kk-weixinzhifu',
						style: 'color:#24af41'
					},
				],

				current: 0,
				payMethod: 0,

			};
		},
		onLoad(res) {
			this.id = res.id
			this.columnId = res.columnId
			this.title = res.title
			this.money = res.price
		},
		methods: {
			radioChange(evt) {
				this.payMethod = evt.target.value
				console.log(this.payMethod)
			},

			//购买课程star
			navToPay() {
				// #ifdef APP-PLUS
				this.appPayColumn()
				// #endif
				// #ifdef MP
				this.mpPayColumn()
				// #endif
			},

			//小程序购买课程
			mpPayColumn() {
				if (this.items[this.payMethod].id == this.$constData.payInfoList[0].id) {
					this.wxPay()
				} else if (this.items[this.payMethod].id == this.$constData.payInfoList[5].id) {
					this.alipay()
				}
			},

			//app购买课程
			appPayColumn() {
				if (this.payMethod == 0) {
					this.appAlipay()
				}else if(this.payMethod == 1){
					uni.showToast({
						title:'暂不支持此支付方式',
						icon:'none'
					})
				}
			},

			appAlipay() {
				let taskData = {
					goodsId: this.columnId, //商品id
					goodsName: this.title, //商品名字
					userName: uni.getStorageSync('userName') //用户名字
				}
				let cnt = {
					body: '购买课程', // String 对一笔交易的具体描述信息
					subject: this.title, // String 商品的标题/交易标题/订单标题/订单关键字等
					totalAmount: this.money, // String 订单总金额，单位为元，精确到小数点后两位
					attach: JSON.stringify(taskData), // String 商家附加数据（jsonobject格式-goodsId-goodsName-userName）
				}
				this.$api.creatAlipayOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.requestPayment({
							provider: this.$constData.providerList[5].id,
							orderInfo: this.$util.tryParseJson(res.data.c),
							success: (res) => {
								let cnt1 = {
									modeuleId: this.$constData.module, // Long 模块编号
									channelId: this.id, // Long 专栏id
									ChannelContentTagId: this.columnId, // Long 课程名id
									userId: uni.getStorageSync('userId'), // Long 用户id
								}
								this.PayChannelContentTag(cnt1)
							},
							fail: (error) => {
								uni.showToast({
									title: '支付未成功',
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

			//微信小程序
			wxPay() {
				let taskData = {
					goodsId: this.columnId, //商品id
					goodsName: this.title, //商品名字
					userName: uni.getStorageSync('userName') //用户名字
				}
				let cnt = {
					openId: uni.getStorageSync('openId'),
					totalFee: this.money * 100, //int 支付金额，单位为分，单位为分
					body: this.title, // String 商品描述
					attach: JSON.stringify(taskData)
				}
				this.doUnifiedOrder(cnt)
			},
			// 微信支付接口
			doUnifiedOrder(cnt) {
				this.$api.doUnifiedOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let wx = this.$util.tryParseJson(res.data.c)
						uni.requestPayment({
							provider: this.items[this.payMethod].id,
							timeStamp: wx.timeStamp + '',
							nonceStr: wx.nonceStr,
							package: wx.package,
							signType: 'MD5',
							paySign: wx.paySign,
							success: (res) => {
								console.log(res)
								let cnt1 = {
									modeuleId: this.$constData.module, // Long 模块编号
									channelId: this.id, // Long 专栏id
									ChannelContentTagId: this.columnId, // Long 课程名id
									userId: uni.getStorageSync('userId'), // Long 用户id
								}
								this.PayChannelContentTag(cnt1)
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

			//支付宝小程序
			alipay() {
				let taskData = {
					goodsId: this.columnId, //商品id
					goodsName: this.title, //商品名字
					userName: uni.getStorageSync('userName') //用户名字
				}
				let cnt = {
					userId: uni.getStorageSync('openId'),
					price: this.money, //int 支付金额，单位为分，单位为分
					payCount: this.title, // String 商品描述
					attach: JSON.stringify(taskData)
				}
				this.creatAlipayAppletOrder(cnt)
			},

			//支付宝支付api
			creatAlipayAppletOrder(cnt) {
				this.$api.creatAlipayAppletOrder(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.requestPayment({
							provider: provider.id,
							orderInfo: res.data.c,
							success: (res) => {
								let cnt1 = {
									modeuleId: this.$constData.module, // Long 模块编号
									channelId: this.id, // Long 专栏id
									ChannelContentTagId: this.columnId, // Long 课程名id
									userId: uni.getStorageSync('userId'), // Long 用户id
								}
								this.PayChannelContentTag(cnt1)
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
							title: '创建订单失败',
							icon: 'none'
						})
					}
				})
			},

			// 支付成功 添加用户可查看状态
			PayChannelContentTag(cnt) {
				this.$api.PayChannelContentTag(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.navigateBack()
						uni.showToast({
							title: '购买成功'
						})
					} else {
						uni.showToast({
							title: '错误！请联系客服',
							icon: 'none'
						})
					}
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.body {
		background-color: #f6f6f8;
		min-height: 100vh;
	}

	.titleBox {
		position: relative;
		padding: $box-margin-top $box-margin-left;
		display: flex;
		flex-direction: row;
		background-color: #fff;
		margin-bottom: 2px;

		.img {
			display: flex;
			width: 15vw;
			height: 18vw;
			margin-right: $box-margin-left;
		}

		.titleText {
			position: absolute;
			top: 50%;
			margin-top: -58upx;
			left: 21vw;
			font-size: $list-title;
			line-hight: $list-title-line;
			font-weight: bold;

			.money {
				margin-top: $box-margin-top;
				color: #fb6c04;
			}
		}
	}

	.offBox {
		position: relative;
		background-color: #fff;
		padding: $box-margin-top $box-margin-left;
		font-size: $list-info;
		margin-bottom: 10upx;

		.rightBox {
			color: $list-info-color;

			.offMoney {
				color: #fb6c04;
			}
		}
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

	.errInfo {
		padding: $box-margin-top $box-margin-left;
		font-size: $uni-font-size-sm;
		color: #aaa;

		view {
			margin-bottom: 10upx;
		}
	}

	.bottomBtn {
		position: fixed;
		width: 100vw;
		bottom: 0;

		button {
			width: 100%;
			border-radius: 0;
			font-size: $list-title;
			line-height: 100upx;
			background-color: #ec706b;
		}

		.button-hover {
			background-color: rgba(236, 112, 107, 0.5);
			color: rgba(255, 255, 255, 0.5)
		}
	}
</style>
