<template>
	<view>
		<view class="titleBox" :style="fixedBox+';'+'background:'+color">
			<view class="title">
				<view class="titleText">{{titleText}}</view>
				<view class="titleTime">{{titleTime}}</view>
			</view>
			<view class="cardHead"></view>
		</view>

		<view class="tagBox" :style="fixeTag">
			<view v-for="(item,index) in tagList" class="tags" :key="index">
				<UniTag :text="item.name" :type="index == curry?'primary':''" @click="changeContent(index,item)"></UniTag>
			</view>
		</view>
		<view class="contentBox" id="salyt">
			<!-- 课程列表 -->
			<view v-for="(item,index) in list" :key="index">
				<view class="lists" @click="navigator(item)">
					<view class="powerInfo" v-if="item.power == constData.contentPaid[0].key">免费课程</view>
					<view class="powerInfo" v-if="item.power == constData.contentPaid[1].key">付费课程</view>
					<view class="imgBox">
						<image v-if="item.type == constData.contentType[2].key" :src="JSON.parse(item.data).imgList[0].src" mode="aspectFill"></image>
						<image v-else-if="item.type == constData.contentType[1].key" :src="JSON.parse(item.data).imgSrc" mode="aspectFill"></image>
					</view>
					<view class="rightBox">
						<view class="title">{{ item.title }}</view>
						<text class="msg">{{ item.time }}</text>
					</view>
					<view class="clearBoth"></view>
				</view>
			</view>
		</view>

		<view class="bottomBtn" v-if="payOrNo&&power == 1">
			<button type="primary" @click="navToPay">立即支付{{price}}￥</button>
		</view>

	</view>
</template>

<script>
	import UniTag from '@/components/uni-tag/uni-tag.vue'
	export default {
		components: {
			UniTag,
		},
		data() {
			return {
				curry: 0, //选中标签下标
				constData: this.$constData, //引入全局变量

				id: '', //专栏id
				ChannelContentTagId: '', //课程id
				titleText: 'Tony', //标题
				titleTime: '', //专栏创建时间
				color: '',

				fixedBox: '',
				fixeTag: '',
				windowHeight: '',

				list: [],
				tagList: [],

				tagName: '',
				price: '', //课程价格
				power: 0, //

				payOrNo: false, //是否购买
			}
		},
		methods: {
			//跳转支付页
			navToPay() {
				let userId = uni.getStorageSync('userId')
				if (userId == '' || userId == '1234567890') {
					uni.switchTab({
						url: '/pages/user/user'
					})
					uni.showToast({
						title: '请登录',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: `/pages/vip/column/payView/payView?id=${this.id}&columnId=${this.ChannelContentTagId}&title=${this.tagName}&price=${this.price}`
				})
			},

			//路由跳转
			navigator(list) {
				let url = ''
				console.log(list)
				if (list.power == this.$constData.contentPaid[1].key) {
					this.getChannelContentTagPower(list)
				} else if (list.power == this.$constData.contentPaid[0].key) {
					if (list.type == this.$constData.contentType[0].key || list.type == this.$constData.contentType[2].key) {
						url = 'details'
					} else if (list.type == this.$constData.contentType[1].key) {
						url = 'detailsVideo'
					}
					uni.navigateTo({
						url: `/pages/vip/column/${url}/${url}?id=${list.id}`
					})
				}
			},

			getChannelContentTagPower(list) {
				let cnt = {
					modeuleId: this.$constData.module, // Long 模块编号
					channelId: this.id, // Long 专栏id
					channelContentTagId: this.ChannelContentTagId, // Long 课程名id
					userId: uni.getStorageSync('userId'), // Long 用户id
				}
				this.$api.getChannelContentTagPower(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let paidStatus = this.$util.tryParseJson(res.data.c).resultStatus
						if (paidStatus) {
							let url = ''
							if (list.type == this.$constData.contentType[0].key || list.type == this.$constData.contentType[2].key) {
								url = 'details'
							} else if (list.type == this.$constData.contentType[1].key) {
								url = 'detailsVideo'
							}
							uni.navigateTo({
								url: `/pages/vip/column/${url}/${url}?id=${list.id}`
							})
						} else {
							uni.showToast({
								title: '购买课程可观看',
								icon: 'none'
							});
						}
					} else {
						console.log(res.data.c)
					}
				})
			},

			//获取专栏下标签
			getChannlContentTagByChannelId() {
				let cnt = {
					module: this.$constData.module, // String 模块编号
					channelId: parseInt(this.id), // Long 专栏编号
					status: this.$constData.contentStatus[4].key, // Byte <选填> 内容状态
					count: 500, // Integer 
					offset: 0, // Integer 
				}
				this.$api.getChannlContentTagByChannelId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tagList = this.$util.tryParseJson(res.data.c)
						console.log(this.tagList)
						this.tagName = this.tagList[0].name
						this.price = this.tagList[0].price
						this.power = this.tagList[0].power
						this.ChannelContentTagId = this.tagList[0].id
						let tagJson = `{"t${this.id}":"${this.tagName}"}`
						let cnt1 = {
							module: this.$constData.module, // String 隶属
							upChannelId: this.id, // Long 专栏id
							status: this.$constData.contentStatus[4].key, // Byte 专栏状态
							tags: this.$util.tryParseJson(tagJson),
							count: 10, // Integer 
							offset: 0, // Integer 
						}
						this.getContentByChannelId(cnt1)
						this.getPayStatus()
					}
				})
			},

			//获取当前课程是否购买状态
			getPayStatus() {
				let cnt = {
					modeuleId: this.$constData.module, // Long 模块编号
					channelId: this.id, // Long 专栏id
					channelContentTagId: this.ChannelContentTagId, // Long 课程名id
					userId: uni.getStorageSync('userId'), // Long 用户id
				}
				this.$api.getChannelContentTagPower(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let paidStatus = this.$util.tryParseJson(res.data.c).resultStatus

						if (paidStatus) {
							this.payOrNo = false
						} else {
							this.payOrNo = true
						}
						// console.log('购买状态'+this.payOrNo)
					} else {
						console.log(res.data.c)
					}
				})
			},

			// 从专栏id获取课程列表
			getContentByChannelId(cnt) {
				this.$api.getContents(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.list = JSON.parse(res.data.c)
						console.log(this.list)
					} else {
						console.log('error')
					}
				})
			},

			changeContent(e, f) {
				this.curry = e
				this.tagName = f.name
				this.price = f.price
				this.power = f.power
				this.ChannelContentTagId = this.tagList[e].id
				this.getPayStatus()
				let tagJson = `{t${this.id}:"${this.tagName}"}`
				let cnt = {
					module: this.$constData.module, // String 模块
					// type: type, // Byte <选填> 类型
					status: this.$constData.contentStatus[4].key, // Byte <选填> 状态编号
					// power: power, // Byte <选填> 权力
					// upUserId: upUserId, // Long <选填> 上传用户编号
					upChannelId: this.id, // Long <选填> 上传专栏编号
					tags: tagJson, // JSONObject <选填> 标签
					count: 10, // int 
					offset: 0, // int
				}
				this.getContentByChannelId(cnt)
			},

			// 将时间格式化
			changeTime(e) {
				var t = parseInt(e)
				var a = new Date(t)
				var y = a.getFullYear()
				var m = 1 + a.getMonth()
				var d = a.getDate()
				var time = y + '年' + m + '月' + d + '日'
				this.titleTime = time
			}
		},



		onPageScroll: function() {
			// 顶部跟随
			var _this = this;
			uni.createSelectorQuery()
				.select('#salyt')
				.boundingClientRect(function(rects) {
					if (rects.top <= 40) {
						_this.fixedBox = 'position:fixed;top:0;z-index:1;margin-top:' + _this.windowHeight + 'px ';
						_this.fixeTag = 'position:fixed;top:10px;z-index:2;'
					} else if (rects.top > 1) {
						_this.fixedBox = '';
						_this.fixeTag = ''
					}
				})

				.exec();
		},


		onLoad(options) {
			// 获取屏幕高度
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.windowHeight)
					this.windowHeight = -0.15 * res.windowHeight + 10
				}
			})
			console.log(options)
			this.id = options.id
			this.titleText = options.title
			this.color = options.color
			this.changeTime(options.time)

			this.getChannlContentTagByChannelId()
		},
	}
</script>

<style lang="scss" scoped>
	.titleBox {
		position: relative;
		width: 100vw;
		height: 15vh;
		overflow: hidden;
		color: #fff;
		line-height: 0;
		float: left;

		// image {
		// 	width: 100vw;
		// 	height: 45vh;
		// }

		.title {
			position: absolute;
			bottom: 40upx;
			left: 0;
			width: 88vw;
			padding: $box-margin-top $box-margin-left;
			font-size: $list-title;

			.titleText {
				color: rgb(234, 242, 248);
				font-size: $list-title-l;
				font-weight: bold;
			}

			.titleTime {
				margin-top: $list-title-l;
				color: rgb(212, 228, 245);
				font-size: $list-info;
			}

		}
	}

	.tagBox {
		position: absolute;
		top: 15vh;
		background-color: #fff;
		width: 100vw;
		height: 75upx;
	}

	.tags {
		display: inline-block;
		margin: 0 10upx 10upx;
		font-size: $list-title;
	}

	.titleContent {
		font-size: 18px;
		line-height: 20px;
		margin-top: 10px;
		letter-spacing: 1px;
		margin-bottom: 30px;
		color: darkgray
	}

	.cardHead {
		position: absolute;
		bottom: -15upx;
		width: 100vw;
		border-radius: 20px;
		height: 30upx;
		background-color: #fff;
	}

	.contentBox {
		position: absolute;
		top: 20vh;
		width: 100vw;
		margin: 0 auto;
		border-radius: 20px;
		overflow: hidden;
		padding: 10px 0;
	}

	.lists {
		position: relative;
		padding: $box-margin-top $box-margin-left;
		height: 24vw;
		font-size: $list-title;

		.title {
			margin-bottom: 50upx;
			color: $list-title-color;
			font-size: $list-title;
			line-height: $list-title-line;
			box-sizing: border-box;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2; //需要显示时文本行数
			overflow: hidden;
		}


		.msg {
			font-size: 14px;
			color: #dcdcdc;
		}
	}

	.imgBox {
		position: absolute;
		top: 50%;
		margin-top: -10vw;
		width: 20vw;
		height: 20vw;
		border-radius: 5px;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.rightBox {
		position: absolute;
		margin-left: 24vw;
		margin-right: 20upx;
		top: 50%;
		margin-top: -50upx;
	}

	.bottomBtn {
		position: fixed;
		width: 100vw;
		bottom: 0;

		button {
			width: 100%;
			border-radius: 0;
			font-size: $list-title;
			background-color: #ec706b;
		}

		.button-hover {
			background-color: rgba(236, 112, 107, 0.5);
			color: rgba(255, 255, 255, 0.5)
		}

	}

	.powerInfo {
		position: absolute;
		top: $box-margin-top;
		right: $box-margin-left;
		font-size: $list-info;
		color: $list-info-color;
	}
</style>
