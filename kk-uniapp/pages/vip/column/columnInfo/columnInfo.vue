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
		<view class="contentBox">

			<!-- 课程列表 -->
			<view v-for="(item,index) in list" :key="index">
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
			</view>
		</view>
		<view class="bottomBtn">
			<button type="primary" >立即支付</button>
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
				curry: 0,
				constData: this.$constData,
				list: {}, //内容列表

				id: '',
				titleText: '',
				titleTime: '',
				color: '',

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
			//跳转支付页
			navToPay(){
				uni.navigateTo({
					url: `/pages/vip/column/payView/payView?id=${this.id}`
				})
			},
			//跳转详情
			navigator(list) {
				if (list.paid == this.$constData.contentPaid[1].key) {
					uni.showToast({
						title: '购买后可观看',
						duration: 1500,
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
			// 从专栏id获取课程列表
			getContentByChannelId() {
				let cnt = {
					module: this.$constData.module, // String 隶属
					channelId: this.id, // Long 专栏id
					status: 4, // Byte 专栏状态
					count: 10, // Integer 
					offset: 0, // Integer 
				}
				this.$api.getContentByChannelId(cnt, (res) => {
					let arr = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.list = JSON.parse(res.data.c).list
					} else {
						arr = []
						console.log('error')
					}
				})
			},
			getTime(e) {
				let t = parseInt(e)
				let a = new Date(t)
				let y = a.getFullYear()
				let m = 1 + a.getMonth()
				let d = a.getDate()
				let time = y + '年' + m + '月' + d + '日'
				this.titleTime = time
			}
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id
			this.titleText = options.title
			this.color = options.color
			this.getTime(options.time)
			this.getContentByChannelId()
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
		color: $list-info-color;
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
		}
	}
</style>
