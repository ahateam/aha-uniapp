<template>
	<view>
		<view class="nav-bar" :style="{'height':navHeight}"></view>
		<view :style="{'padding-top':navHeight}"></view>
		<view class="view-title">发布任务</view>

		<view class="content-list">
			<view class="list-box" :class="{'curr-box':currIndex == index}" v-for="(item,index) in list" :key="index"
			 @touchstart="changeCurr(index)" @touchend="resetStyle()" @click="navToAdd(item)">
				<image :src="item.img" mode="aspectFit"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				navHeight: this.getNavHeight(),
				list: [{
					name: '全案助理',
					img: '/static/image/icon/addTask/icon_qazl.png',
					src: './addTask/assistant'
				}, {
					name: '翻译',
					img: '/static/image/icon/addTask/icon_fy.png',
					src: './addTask/translate'
				}, {
					name: '表格填写',
					img: '/static/image/icon/addTask/icon_bgtx.png',
					src: './addTask/form'
				}, {
					name: '撰写文书',
					img: '/static/image/icon/addTask/icon_zxws.png',
					src: './addTask/document'
				}, {
					name: '其他',
					img: '/static/image/icon/addTask/icon_qt.png',
					src: './addTask/other'
				}],
				currIndex: -1,

			}
		},
		onLoad() {

		},
		methods: {
			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},

			changeCurr(index) {
				this.currIndex = index
			},

			resetStyle() {
				this.currIndex = -1
			},

			navToAdd(item) {
				if (item.src) {
					uni.navigateTo({
						url: item.src
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-title {
		color: #333333;
		font-size: 50rpx;
		margin-left: 30rpx;
	}

	.nav-bar {
		position: fixed;
		z-index: 1;
		width: 100%;
		background-color: #FFFFFF;
	}

	.list-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: all .3s;
		width: 330rpx;
		height: 250rpx;
		margin: 0 30rpx 30rpx 0;
		background-color: $group-color-search;
		border-radius: 4rpx;
		font-size: $group-font-befor;
		color: $group-color;
		line-height: 42rpx;

		image {
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 18rpx;
		}
	}

	.content-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 40rpx 0 0 30rpx;
	}

	.curr-box {
		background-color: rgba($color: #182F45, $alpha: .2);
	}
</style>
