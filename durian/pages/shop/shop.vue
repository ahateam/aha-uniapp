<template>
	<view class="body">
		<view :style="{'padding-top': getNavHeight()}"></view>
		<view v-if="netStatus == 0">
			<view class="topBox">
				<view class="title_box">
					商城
				</view>
				<view class="add-box" @click="navToAdd">
					<text class="iconfont icon-jia add-icon"></text>
					<text class="iconText">我要发布商品</text>
				</view>
			</view>

			<view class="search-box" @click="navToSearch">
				<text class="iconfont icon-iconfonticonfontsousuo1 search-icon"></text>
				<text>{{searchTxet}}</text>
			</view>

			<view class="title-box">平台兑换</view>
			<view class="noShop" v-if="contentList.length == 0">
				<image src="/static/image/shop/zwdh.png" mode="aspectFill"></image>
				<view style="margin-top: 30rpx;">暂无兑换</view>
			</view>
			<shopList :list="contentList" @change="change" @changeEnd="changeEnd" @emitItem="navToInfo"></shopList>

			<view class="title-box">自由市场</view>
			<view class="noShop" v-if="studyList.length == 0">
				<image src="/static/image/shop/zwdh.png" mode="aspectFill"></image>
				<view style="margin-top: 30rpx;">暂无商品</view>
			</view>
			<shopList :list="studyList" @emitItem="navToInfo"></shopList>
		</view>

		<view v-if="netStatus == 404" class="error-view">
			<image class="net-error-img" src="/static/image/shop/mwl.png" mode="aspectFit"></image>
			<view class="error-text">网管去吃榴莲了，请稍后重试</view>
			<button class="error-btn" @click="getGoodsAgin">点击重试</button>
		</view>
	</view>
</template>

<script>
	import shopList from '@/components/shopList/shopList.vue'

	export default {
		components: {
			shopList
		},
		data() {
			return {
				netStatus: 0,
				page: 1,
				count: 10,
				offset: 0,
				pageOver: false,
				// 平台商品列表
				contentList: [{
						goodsName: 'Coles购物卡',
						goodsPrice: '(面值233澳元)',
						cardPrice: '100',
						goodsType: 1
					},
					{
						goodsName: 'Coles购物卡',
						goodsPrice: '(面值233澳元)',
						cardPrice: '100',
						goodsType: 1
					}
				],
				// 学生商品列表
				studyList: [],

				searchTxet: '期末考通关秘籍',

			}
		},
		methods: {
			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			change(index) {
				this.contentList[index].goodsType = 2
			},

			changeEnd(index) {
				this.contentList[index].goodsType = 1
			},

			getGoods(cnt) {
				this.$api.getGoods(cnt, (res) => {
					uni.stopPullDownRefresh()
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let data = this.$util.tryParseJson(res.data.c)
						console.log(data)
						if (data.platform.length < this.count && data.free.length < this.count) {
							this.pageOver = true
						}
						this.contentList = this.contentList.concat(data.platform)
						this.studyList = this.studyList.concat(data.free)
						this.netStatus = 0
					} else {
						this.netStatus = 404
					}
				})
			},

			getGoodsAgin() {
				let cnt = {
					count: 5, // Integer 
					offset: 0, // Integer 
				}
				this.getGoods(cnt)
			},

			navToInfo(item) {
				if (item.goodsType == this.$constData.goodsType[0].key) {
					uni.navigateTo({
						url: `/pages/shop/goodsInfo/studyGoods?id=${item.goodsId}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/shop/goodsInfo/goodsInfo?id=${item.goodsId}`,
					})
				}
			},

			navToAdd() {
				uni.navigateTo({
					url: '/pages/shop/addGoods/addGoods'
				})
			},

			navToSearch() {
				uni.navigateTo({
					url: '/pages/shop/search/search'
				})
			}
		},
		onLoad() {
			let cnt = {
				count: this.count, // Integer 
				offset: this.offset, // Integer 
			}
			this.getGoods(cnt)
		},
		// 下拉
		onPullDownRefresh() {
			this.page = 1
			this.contentList = []
			this.studyList = []
			let cnt = {
				count: this.count, // Integer
				offset: this.offset, // Integer 
			}
			this.getGoods(cnt)
		},
		// 上拉加载
		onReachBottom() {
			if (this.pageOver) {
				console.log('结束拉取')
			} else {
				this.page += 1
				let cnt = {
					count: this.count, // Integer
					offset: (this.page - 1) * this.count, // Integer 
				}
				this.getGoods(cnt)
			}

		}
	}
</script>

<style lang="scss" scoped>
	.body {
		padding: 0 $group-margin-left 20rpx;
		// font-family: 'appleFont';
	}

	.topBox {
		position: relative;
	}

	.title_box {
		font-size: $group-font-big;
		line-height: $group-font-big-line;
		font-weight: $group-title-weight;
		color: #333333;
	}

	.add-box {
		position: absolute;
		right: 0;
		top: $group-margin-s;
		height: $group-font-big;
		box-sizing: border-box;
		display: inline-block;
		font-size: $group-font-befor;
		color: $group-color;
		overflow: hidden;
		padding: 7rpx $group-margin-befor;

		.add-icon {
			font-size: 18rpx;
			margin-right: 9rpx;
			vertical-align: middle;
			font-weight: bold;
		}
	}


	.iconText {
		vertical-align: middle;
	}

	.search-box {
		display: flex;
		align-items: center;
		margin: 0 auto;
		margin-top: $group-margin-top;
		box-sizing: border-box;
		width: 670rpx;
		height: 70rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		color: #B6C4D2;
		background-color: #F2F5F7;
		border-radius: 4rpx;
	}

	.search-icon {
		font-size: 28rpx;
		margin-right: 15rpx;
	}

	.noShop {
		margin-top: 79rpx;
		text-align: center;
		font-size: $group-font-befor;
		color: $group-color-befor;

		image {
			width: 211rpx;
			height: 239rpx;
		}
	}

	.title-box {
		font-size: $group-font-befor;
		color: #333333;
		font-weight: $group-title-weight;
		margin-top: $group-margin-top;
	}

	.error-view {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;

		.button-hover {
			opacity: .7;
		}
	}

	.net-error-img {
		width: 351rpx;
		height: 222rpx;
		margin-bottom: 98rpx;
	}

	.error-text {
		font-size: $group-font-befor;
		color: $group-color-befor;
		line-height: $group-font-befor-line;
		margin-bottom: 80rpx;
	}

	.error-btn {
		background-color: $group-color-w;
		color: $group-color;
		line-height: 70rpx;
		width: 220rpx;
		border: 1rpx solid $group-color-befor;
		border-radius: 4rpx;
		padding: 0;

		&:after {
			border: none;
		}
	}
</style>
