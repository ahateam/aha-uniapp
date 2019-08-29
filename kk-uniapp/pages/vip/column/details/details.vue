<template>
	<view class="content">

		<scroll-view class="scroll" scroll-y>
			<view class="scroll-content">
				<view class="introduce-section">
					<text class="title">{{detailData.title}}</text>
					<view class="introduce">

						<text>{{upInfo.name}}</text>
						<!-- <text>105阅读</text> -->
						<text>{{detailData.time}}</text>
					</view>
					<view class="articleInfo">
						<view v-for="(item,index) in flow" :key="index">
							<view v-if="item.type == 'textarea'">
								<rich-text :nodes="item.value"></rich-text>
							</view>
							<view class="contentImg" v-else-if="item.type == 'img'">
								<image :src="item.value" mode="widthFix"></image>
							</view>
						</view>
					</view>

					<view class="actions">
						<view class="action-item">
							<i class="yticon iconfont kk-dianzan"></i>
							<!-- <text class="yticon icon-dianzan-ash"></text> -->
							<text>75</text>
						</view>
						<view class="action-item">
							<i class="yticon iconfont kk-zan"></i>
							<text>6</text>
						</view>
						<view class="action-item">
							<button type="primary" open-type="share">
								<i class="yticon iconfont kk-share"></i>
								<text>分享</text>
							</button>
						</view>
						<view class="action-item">
							<i class="yticon iconfont kk-shoucang1"></i>
							<text>收藏</text>
						</view>
					</view>
				</view>

				<view class="container" v-show="loading === false">
					<!-- 评论 -->
					<view class="s-header">
						<text class="tit">网友评论</text>
					</view>
					<view class="evalution">
						<view class="noEva" v-if="evaList.length == 0">
							还没有人评论哦,快来抢个首发吧~
						</view>
						<view v-for="(item, index) in evaList" :key="index" class="eva-item">
							<image :src="item.src" mode="aspectFill"></image>
							<view class="eva-right">
								<text>{{item.nickname}}</text>
								<text>{{item.time}}</text>
								<view class="zan-box">
									<text>{{item.zan}}</text>
									<text class="yticon iconfont kk-shoucang1"></text>
								</view>
								<text class="content">{{item.content}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 加载图标 -->
				<!-- <mixLoading class="mix-loading" v-if="loading"></mixLoading> -->
			</view>
		</scroll-view>

		<view class="bottom">
			<view class="input-box">
				<text class="yticon icon-huifu"></text>
				<input class="input" type="text" placeholder="点评一下把.." placeholder-style="color:#adb1b9;" />
			</view>
			<text class="confirm-btn">提交</text>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				detailData: {},
				flow: {},
				upInfo: {},
				loading: false,
				contentId: '',
				id1: '',
				newsList: [],
				evaList: [],
			}
		},
		onLoad(res) {
			console.log(res)
			this.contentId = res.id
			this.id1 = res.id1
			this.getContentById()
		},
		methods: {
			//获取评论列表
			// async loadEvaList(){
			// 	this.evaList = await json.evaList;
			// }

			/* 获取id对应内容 */
			getContentById() {
				let cnt = {
					userId: uni.getStorageSync('userId'), // Long 用户编号
					id: this.id1, // String 片区编号
					contentId: this.contentId, // Long 内容编号
				};
				this.$api.getContentById(cnt, (res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.detailData = JSON.parse(res.data.c)
						let time = new Date(this.detailData.createTime)
						let newTime = time.toLocaleString()
						this.detailData.time = newTime
						this.flow = JSON.parse(this.detailData.data).editor
						console.log(this.detailData)
						this.getUserById(this.detailData.upUserId)
					}
				}))
			},

			/* 获取id对应用户 */
			getUserById(id) {
				let cnt = {
					userId: id, //long 用户编号
				}
				this.$api.getUserById(cnt, (res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(JSON.parse(res.data.c))
						this.upInfo = JSON.parse(res.data.c)
					}
				}))
			}
		},
		onShareAppMessage(res) {
			var pages = getCurrentPages() //获取加载的页面
			var currentPage = pages[pages.length - 1] //获取当前页面的对象
			console.log(currentPage)
			var url = currentPage.route //当前页面url
			if(url == undefined){
				url = currentPage.__route__
			}
			var options = currentPage.options //如果要获取url中所带的参数可以查看options 
			var id = options.id
			var id1 = options.id1
			var src = `${url}?id=${id}&id1=${id1}`
			console.log(src)
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: 'kkqt',
				path: src
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
	}

	.scroll {
		flex: 1;
		position: relative;
		background-color: #f8f8f8;
		height: 0;
	}

	.scroll-content {
		display: flex;
		flex-direction: column;
	}

	/* 简介 */
	.introduce-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		line-height: 1.5;

		.title {
			font-size: 36upx;
			color: #303133;
			margin-bottom: 16upx;
		}

		.introduce {
			display: flex;
			font-size: 26upx;
			color: #909399;

			text {
				margin-right: 16upx;
			}
		}
	}

	/* 点赞等操作 */
	.actions {
		display: flex;
		justify-content: space-around;
		align-items: center;
		line-height: 1.3;
		padding: 10upx 40upx 20upx;

		.action-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24upx;
			color: #999;

			button {
				font-size: 24upx;
				color: #999;
				background-color: #fff;
				&:after {
					border: none;
					
				}
			}
		}

		.yticon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 52upx;

			&.reverse {
				position: relative;
				top: 6upx;
				transform: scaleY(-1);
			}

			&.active {
				color: #ec706b;
			}
		}

	}

	.s-header {
		padding: 20upx 30upx;
		font-size: 30upx;
		color: #303133;
		background: #fff;
		margin-top: 16upx;

		&:before {
			content: '';
			width: 0;
			height: 40upx;
			margin-right: 24upx;
			border-left: 6upx solid #ec706b;
		}
	}

	/* 评论 */
	.evalution {
		display: flex;
		flex-direction: column;
		background: #fff;
		padding: 20upx 0;
	}

	.eva-item {
		display: flex;
		padding: 20upx 30upx;
		position: relative;

		image {
			width: 60upx;
			height: 60upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 24upx;
		}

		&:after {
			content: '';
			position: absolute;
			left: 30upx;
			bottom: 0;
			right: 0;
			height: 0;
			border-bottom: 1px solid #eee;
			transform: translateY(50%);
		}

		&:last-child:after {
			border: 0;
		}
	}

	.eva-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-size: 26upx;
		color: #909399;
		position: relative;

		.zan-box {
			display: flex;
			align-items: base-line;
			position: absolute;
			top: 10upx;
			right: 10upx;

			.yticon {
				margin-left: 8upx;
			}
		}

		.content {
			font-size: 28upx;
			color: #333;
			padding-top: 20upx;
		}
	}

	/* 底部 */
	.bottom {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		height: 90upx;
		padding: 0 30upx;
		box-shadow: 0 -1px 3px rgba(0, 0, 0, .04);
		position: relative;
		z-index: 1;

		.input-box {
			display: flex;
			align-items: center;
			flex: 1;
			height: 60upx;
			background: #f2f3f3;
			border-radius: 100px;
			padding-left: 30upx;

			.icon-huifu {
				font-size: 28upx;
				color: #909399;
			}

			.input {
				padding: 0 20upx;
				font-size: 28upx;
				color: #303133;
			}
		}

		.confirm-btn {
			font-size: 30upx;
			padding-left: 20upx;
			color: #0d9fff;
		}
	}

	.noEva {
		font-size: 30upx;
		color: #303133;
		padding: 20rpx 30rpx;
	}

	.contentImg {
		image {
			width: 100%;
		}
	}

	.articleInfo {
		margin-top: 20upx;
	}
</style>
