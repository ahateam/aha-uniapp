<template>
	<view>
		<view class="titleBox" :style="'background:'+color">
			<view class="title">
				<view class="titleText">{{titleText}}</view>
				<view class="titleTime">{{titleTime}}</view>
			</view>
			<view class="cardHead"></view>
		</view>

		<!-- 头条监听不了值的变化 不能在变化之后去更新视图  list 字符串-->
		<button type="primary" @click="pushdata">sadasdsad</button>
		<view class="contentBox" v-if="newDataList1.length && newDataList1.length>0">

			<!-- 课程列表 -->
			<!-- <view v-for="(item,index) in list" :key="index">
				<view class="lists" @click="navigator(item)">
					<view class="imgBox">
						<image v-if="item.type == constData.contentType[2].key" :src="JSON.parse(item.data).imgList[0].src" mode="aspectFill"></image>
						<image v-else-if="item.type == constData.contentType[1].key" :src="JSON.parse(item.data).imgSrc" mode="aspectFill"></image>
					</view>
					<view class="rightBox">
						<view class="title">{{ item.title }}</view>
						<text class="msg">{{ item.time }}</text>
					</view>
					<view class="paidInfo">
						<view v-if="item.paid == constData.contentPaid[0].key">
							免费观看
						</view>
						<view v-else-if="item.paid == constData.contentPaid[1].key">
							<i class="iconfont kk-suo"></i>
						</view>
					</view>
					<view class="clearBoth"></view>
				</view>
			</view> -->
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
				dataitem: '111',
				curry: 0,
				constData: {},

				id: '',
				titleText: 'Tony',
				titleTime: '',
				type: 3,
				color: '',

				fixedBox: '',
				fixeTag: '',
				windowHeight: '',
				newDataList1: [],
				list: [1, 2, 2, 3],
				tagList: [{
						name: '全部',
						type: 2
					},
					{
						name: '免费',
						type: 0
					},
					{
						name: '付费',
						type: 1
					}
				],

			}
		},
		methods: {
			//路由跳转
			navigator(list) {
				if (list.paid == this.$constData.contentPaid[1].key) {
					uni.showToast({
						title: '购买后可观看',
						duration: 2000,
						icon: 'none'
					});
				}
				let url = ''
				if (list.type == this.$constData.contentType[0].key || list.type == this.$constData.contentType[2].key) {
					url = 'details'
				} else if (list.type == this.$constData.contentType[1].key) {
					url = 'detailsVideo'
				}
				uni.navigateTo({
					url: `/pages/vip/column/${url}/${url}?id=${list.id}&id1=${list._id}`
				})
			},
			pushdata() {
				console.log('1111111111111111111111111111')
				console.log(this.dataitem)
			},
			// 从专栏id获取课程列表
			getContentByChannelId() {

				let cnt = {
					module: 'kkqt', // String 隶属
					channelId: this.id, // Long 专栏id
					status: 4, // Byte 专栏状态
					count: 10, // Integer 
					offset: 0, // Integer 
				}

				// 
				// 				let cnt1 = {
				// 					c: JSON.stringify(cnt)
				// 				}
				// 				let that = this
				// 				uni.request({
				// 						url: 'http://192.168.1.181:8053/content/content/getContentByChannelId',
				// 						data: cnt1,
				// 						header: {
				// 							"Content-Type": "text/plain"
				// 						},
				// 						method: 'POST',
				// 						success: (res) => {
				// 							// let arr = JSON.parse(res.data.c)
				// 							that.newDataList1 = JSON.parse(res.data.c).list
				// 							console.log('11111')
				// 							console.log(that.newDataList1)
				// 							this.dataitem = '22222'
				// 							this.pushdata()
				// 						},
				// 						fail: (err) => {
				// 							console.log(err)
				// 						}
				// 					}
				// 
				// 				)





				this.$api.getContentByChannelId(cnt, (res) => {
					let arr = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						arr = JSON.parse(res.data.c).list
						console.log('12321321213213213213')

					} else {
						arr = []
						console.log('error')
					}

					this.list = arr
					console.log(this)
					console.log(this.list.length)

					this.$nextTick(function() {
						console.log(this.list) // => '已更新'
					})

				})
			},
		},
		onLoad(options) {

			console.log('222')
			console.log(options)
			this.id = options.id

			this.getContentByChannelId()
				console.log('11111')
				this.titleText = options.title
				this.color = options.color
				var t = parseInt(options.time)
				var a = new Date(t)
				var y = a.getFullYear()
				var m = 1 + a.getMonth()
				var d = a.getDate()
				var time = y + '年' + m + '月' + d + '日'
				this.titleTime = time
				this.constData = this.$constData
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

		image {
			width: 100vw;
			height: 45vh;
		}

		.title {
			position: absolute;
			bottom: 40upx;
			left: 0;
			width: 88vw;
			padding: $box-margin-top $box-margin-left;

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
		top: 13vh;
		width: 100vw;
		height: 100vh;
		margin: 0 auto;
		border-radius: 20px;
		overflow: hidden;
		padding: 10px 0;
	}

	.lists {
		position: relative;
		padding: 2vw;
		height: 24vw;
		font-size: 18px;
		line-height: 18px;

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

	.paidInfo {
		position: absolute;
		right: 20upx;
		top: 50%;
		font-size: $list-info;
		margin-top: -20upx;
	}
</style>
