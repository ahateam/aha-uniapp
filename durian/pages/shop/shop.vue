<template>
	<view class="body">
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
		<shopList :list="contentList" :type="1"></shopList>

		<view class="title-box">自由市场</view>
		<view class="noShop" v-if="studyList.length == 0">
			<image src="/static/image/shop/zwdh.png" mode="aspectFill"></image>
			<view style="margin-top: 30rpx;">暂无商品</view>
		</view>
		<shopList :list="studyList" :type="0"></shopList>
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
				// 平台商品列表
				contentList: [{
					title: 'Coles购物卡',
					price: '(面值233澳元)',
					cardPrice: '100'
				}],

				// 学生商品列表
				studyList: [{
					title: '联想小新Pro 13标压锐龙版',
					src: 'https://p1.lefile.cn/product/adminweb/2019/09/19/JwqNf6gO94RbJxobKIE9ig6Er-6597.jpg',
					price: 'AUD 2333'
				}],

				searchTxet: '期末考通关秘籍',

			}
		},

		onLoad() {},

		methods: {
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
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		padding: 0 $group-margin-left;
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
</style>
