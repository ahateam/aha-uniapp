<template>
	<view>
		<view class="search-box">
			<view class="search-input-box">
				<text class="iconfont icon-iconfonticonfontsousuo1 search-icon"></text>
				<input focus type="text" class="search-input" v-model="text" :placeholder="newInfo" confirm-type="search" @confirm="search" />
			</view>
			<view class="back-text" @click="navBack">取消</view>
		</view>

		<view class="content-list">
			<shopList :list="contentList" @change="change" @changeEnd="changeEnd" @emitItem="navToInfo"></shopList>
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
				text: '',
				newInfo: '期末考通关秘籍',

				count: 10,
				offset: 0,
				page: 1,
				pageStatus: 'onload',

				contentList: []
			};
		},
		methods: {
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

			search() {
				let cnt = {
					goodsName: this.text, // String 商品名称
					count: this.count, // Integer 
					offset: this.offset, // Integer 
				}
				this.getByGoodsName(cnt)
			},

			navBack() {
				uni.navigateBack()
			},

			change(index) {
				if (this.contentList[index].goodsType == this.$constData.goodsType[1].key) {
					this.contentList[index].goodsType = this.$constData.goodsType[2].key
				}
			},

			changeEnd(index) {
				if (this.contentList[index].goodsType == this.$constData.goodsType[2].key) {
					this.contentList[index].goodsType = this.$constData.goodsType[1].key
				}
			},

			getByGoodsName(cnt) {
				this.$api.getByGoodsName(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c)
						if (arr.length < this.count) {
							this.pageStatus = 'nomore'
							this.pageOver = true
						} else {
							this.pageStatus = 'more'
							this.pageOver = false
						}
						this.contentList = this.contentList.concat(arr)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		display: flex;
		align-items: center;
		padding: 50rpx 30rpx 0;
		font-size: $group-font-befor;
	}

	.search-input-box {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		background-color: $group-color-search;
		width: 600rpx;
		height: 70rpx;
		padding: 0 30rpx;
		border-radius: 4rpx;
		margin-right: 30rpx;
	}

	.search-icon {
		font-size: 28rpx;
		margin-right: 15rpx;
	}

	.search-input {
		font-size: 28rpx;
		flex: 1;
	}

	.back-text {
		color: $group-color;
	}

	.content-list {
		padding: 40rpx;
	}
</style>
